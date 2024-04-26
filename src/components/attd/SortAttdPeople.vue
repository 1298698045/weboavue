<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    人员排序
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" style="height: auto;">
                    <div class="search">
                        <a-input-search></a-input-search>
                    </div>
                    <div class="selectBox">
                        <div class="leftPeople" ref="contentRef">
                            <a-checkbox-group v-model:value="selectedKeys" style="width: 100%;">
                                <div class="peopleRow" v-for="(item, index) in listData" :key="index" :ref="(el) => {setFieldRef(el, item, index);}">
                                    <a-checkbox :value="item.EmployeeId">{{item.Name}} ({{item.EmployeeNo}})</a-checkbox>
                                </div>
                            </a-checkbox-group>
                        </div>
                        <div class="sortBox">
                            <a-button size="small" @click="selectedKeys.length && handleMoveUp()" :type="selectedKeys.length > 0 ? 'primary' : 'default' "><UpOutlined /></a-button>
                            <a-button size="small" @click="selectedKeys.length && handleMoveDown()" :type="selectedKeys.length > 0 ? 'primary' : 'default' "><DownOutlined /></a-button>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">保存排序</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, nextTick } from "vue";
    import { SearchOutlined, DeleteOutlined, UpOutlined, DownOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        unitId: String,
        yearNumber: [String, Number],
        monthNumber: [String, Number],
        peoples: Array
    })
    const emit = defineEmits(['cancel','sortOk']);
    const contentRef = ref(null);
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    
    const data = reactive({
        listData: [],
        selectedKeys: []
    })
    const { listData, selectedKeys } = toRefs(data);
    let itemRefs = [];
    data.listData =  JSON.parse(JSON.stringify(props.peoples));

    const handleMoveUp = () => {
        let firstSelectedIndex = data.listData.findIndex(item=>data.selectedKeys[0] == item.EmployeeId);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.selectedKeys.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = data.listData.findIndex(row=>row.EmployeeId==item);
                data.listData.splice(currentIndex, 1);
                let item2 = props.peoples.find(row=>row.EmployeeId==item);
                data.listData.splice(currentIndex - 1, 0, item2);
            }
        }
    }
    const handleMoveDown = () => {
        const lastSelectedIndex = data.listData.indexOf(item=>data.selectedKeys[data.selectedKeys.length - 1]==item.EmployeeId);
          if (lastSelectedIndex < data.listData.length - 1) {
            
            const itemsToMove = data.selectedKeys.slice().reverse();
            let top = itemsToMove.length * 40;
            for (const item of itemsToMove) {
              const currentIndex = data.listData.findIndex(row=>row.EmployeeId==item);
              data.listData.splice(currentIndex, 1);
              let item2 = props.peoples.find(row=>row.EmployeeId==item);
              data.listData.splice(currentIndex + 1, 0, item2);
              nextTick(()=>{
                // contentRef.value.scrollTop = contentRef.value.scrollTop + top;
              })
            }
        }
    }
    const setFieldRef = (el, item, index) => {
        if(el && el!=null){
            itemRefs.push({
                id: index,
                el
            })
        };
    };

    const handleSubmit = ()=> {
        let d = {
            objectTypeCode: null,
            unitId: props.unitId,
            YearNumber: props.yearNumber,
            MonthNumber: props.monthNumber,
            EmployeeId: data.listData.map(item=>item.EmployeeId).join(",")
        }
        proxy.$get(Interface.attd.sortAttd, d).then(res=>{
            message.success("排序保存成功!");
            emit("sortOk", false);
        })
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    /deep/ :where(.css-dev-only-do-not-override-kqecok).ant-transfer{
        justify-content: center;
    }
    .selectBox{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }
    .leftPeople{
        flex: 1;
        height: 300px;
        border: 1px solid #e2e3e5;
        overflow: hidden;
        overflow-y: auto;
    }
    .peopleRow{
        width: 100%;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e2e3e5;
    }
    .peopleRow:last-child{
        border-bottom: 0;
    }
    .sortBox{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        gap: 5px;
    }
</style>