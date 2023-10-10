<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    选择要显示的字段
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter">
                    <div class="selectBox">
                        <a-transfer
                            v-model:target-keys="targetKeys"
                            v-model:selected-keys="selectedKeys"
                            :data-source="listData"
                            :list-style="{
                                width: '260px',
                                height: '280px',
                            }"
                            :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                            show-search
                            :titles="['可用项目', '所选项目']"
                            :render="item => item.title"
                            :disabled="disabled"
                            @change="handleChange"
                            @selectChange="handleSelectChange"
                            @scroll="handleScroll"
                        />
                        <div class="sortBox">
                            <a-button :icon="h(UpOutlined)" size="small" @click="selectedKeys.length && handleMoveUp()" :type="selectedKeys.length > 0 ? 'primary' : 'default' "></a-button>
                            <a-button :icon="h(DownOutlined)" size="small" @click="selectedKeys.length && handleMoveDown()" :type="selectedKeys.length > 0 ? 'primary' : 'default' "></a-button>
                        </div>
                    </div>
                    <ul class="filterSearch">
                        <li class="row" v-for="(item,index) in list" :key="index">
                            <div class="fieldCol">
                                <span class="required">*</span>
                                <span class="label">排序字段</span>
                                <a-select
                                    v-model:value="item.sortField"
                                    style="width: 200px"
                                    @focus="focus"
                                    @change="handleChange"
                                    >
                                    <a-select-option :value="item.name" v-for="(item,index) in listData" :key="index">{{item.title}}</a-select-option>
                                </a-select>
                            </div>
                            <div class="fieldCol">
                                <span class="required">*</span>
                                <span class="label">排序方式</span>
                                <a-radio-group v-model:value="item.sortMethod">
                                    <a-radio value="ASC">升序</a-radio>
                                    <a-radio value="DESC">降序</a-radio>
                                </a-radio-group>
                            </div>
                            <div class="fieldCol">
                                <span class="iconDel" @click="handleDelteField(item,index)">
                                    <DeleteOutlined />
                                </span>
                            </div>
                        </li>
                        <a-button type="link" @click="handleAddRowField">添加排序字段</a-button>
                    </ul>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">前台导出</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">后台导出</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, h } from "vue";
    import { SearchOutlined, DeleteOutlined, UpOutlined, DownOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel']);
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {

    }
    const data = reactive({
        listData: [],
        targetKeys: [],
        selectedKeys: [],
        list:[
            {
                sortField: "",
                sortMethod: ""
            }
        ]
    })
    const { listData, targetKeys, selectedKeys, list } = toRefs(data);
    const mockData = [];
    for (let i = 0; i < 20; i++) {
        mockData.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            // disabled: i % 3 < 1,
        });
    }
    const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
    const disabled = ref(false);
    // const targetKeys = ref(oriTargetKeys);
    // const selectedKeys = ref(['1', '4']);
    const handleChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
    const handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };

    const handleMoveUp = () => {
        let firstSelectedIndex = data.targetKeys.findIndex(item=>item==data.selectedKeys[0]);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.selectedKeys.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = data.targetKeys.indexOf(item);
                data.targetKeys.splice(currentIndex, 1);
                data.targetKeys.splice(currentIndex - 1, 0, item);
            }
        }
    }
    const handleMoveDown = () => {
        const lastSelectedIndex = data.targetKeys.indexOf(data.selectedKeys[data.selectedKeys.length - 1]);
          if (lastSelectedIndex < data.targetKeys.length - 1) {
            const itemsToMove = data.selectedKeys.slice().reverse();
            for (const item of itemsToMove) {
              const currentIndex = data.targetKeys.indexOf(item);
              data.targetKeys.splice(currentIndex, 1);
              data.targetKeys.splice(currentIndex + 1, 0, item);
            }
        }
    }

    const getQuery = ()=> {
        proxy.$get(Interface.entityFilter,{}).then(res=>{
            console.log('entityFilter',res);
            let attributes = res.entity.attributes.map(item=>{
                item.title = item.label + item.name;
                item.key = item.name;
                return item;
            });
            data.listData = attributes;
            let ColumnSet = res.filter[0].ColumnSet.split(',');
            // let temp = data.listData.filter(item=>{
            //     return ColumnSet.find(row=>{
            //         return row == item.key;
            //     })
            // })
            data.targetKeys = ColumnSet;
        })
    }
    const handleAddRowField = () => {
        data.list.push(
            {
                sortField: "",
                sortMethod: ""
            }
        )
    }
    const handleDelteField = (item,index) => {
        data.list.splice(index,1);
    }
    getQuery();
</script>
<style lang="less">
    @import url('@/style/modal.less');
    :where(.css-dev-only-do-not-override-kqecok).ant-transfer{
        justify-content: center;
    }
    .filterSearch{
        padding-top: 1px;
        margin: 10px auto;
        .row{
            display: flex;
            margin-top: 10px;
            align-items: center;
            justify-content: center;
            .fieldCol{
                margin-left: 20px;
                .label{
                    padding: 0 10px 0 5px;
                }
                .iconDel{
                    font-size: 16px;
                    cursor: pointer;
                }
                .iconDel:hover{
                    color: var(--hoverColor);
                }
            }
            .fieldCol:first-child{
                margin-left: 0;
            }
        }
        .ant-btn{
            margin-top: 20px;
            margin-left: 60px;
        }
    }
    .selectBox{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sortBox{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        gap: 5px;
    }
</style>