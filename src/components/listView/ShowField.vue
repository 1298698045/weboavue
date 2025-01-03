<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    选择要显示的字段
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" style="height: auto;">
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
                            <a-button size="small" @click="selectedKeys.length && handleMoveUp()" :type="selectedKeys.length > 0 ? 'primary' : 'default' "><UpOutlined /></a-button>
                            <a-button size="small" @click="selectedKeys.length && handleMoveDown()" :type="selectedKeys.length > 0 ? 'primary' : 'default' "><DownOutlined /></a-button>
                        </div>
                    </div>
                    <ul class="filterSearch">
                        <li class="row" v-for="(item,index) in list" :key="index">
                            <div class="fieldCol">
                                <span class="required">*</span>
                                <span class="label">排序字段</span>
                                <a-select
                                    v-model:value="item.name"
                                    style="width: 200px"
                                    >
                                    <a-select-option :value="item.name" v-for="(item,index) in listData" :key="index">{{item.title}}</a-select-option>
                                </a-select>
                            </div>
                            <div class="fieldCol">
                                <span class="required">*</span>
                                <span class="label">排序方式</span>
                                <a-radio-group v-model:value="item.sort">
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
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, computed } from "vue";
    import { SearchOutlined, DeleteOutlined, UpOutlined, DownOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName:String,
        recordId:String
    })
    const emit = defineEmits(['cancel','load']);
    const modelContentRef = ref(null);
    
    const data = reactive({
        listData: [],
        targetKeys: [],
        selectedKeys: [],
        list:[
            {
                label:'',
                name: "",
                sort: ""
            }
        ],
        top: ""
    })
    const { listData, targetKeys, selectedKeys, list, top } = toRefs(data);
    const formState = reactive({
        name: "",
        apiname: "",
        resource: "",
        role: []
    })
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
        // console.log('targetKeys: ', nextTargetKeys);
        // console.log('direction: ', direction);
        // console.log('moveKeys: ', moveKeys);
        if(direction == 'right'){
            const currentKeys = nextTargetKeys.filter(key => !moveKeys.includes(key));
            currentKeys.push(...moveKeys);
            data.targetKeys = currentKeys;
        }
    };
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        // console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
    const handleScroll = (direction, e) => {
        // console.log('direction:', direction);
        // console.log('target:', e.target);
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
    const getData = ()=> {
        proxy.$get(Interface.listView.getListView, {
            id: props.recordId
            }).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                    let item = res.actions[0].returnValue;
                    formState.apiname=item.apiName||'';
                    formState.name=item.label||'';
                    let visibility=item.visibility||'GLOBAL';
                    if(visibility=='PRIVATE'){
                        formState.resource='1';
                    }else if(visibility=='GLOBAL'){
                        formState.resource='2';
                    }else if(visibility=='SHARED'){
                        formState.resource='3';
                    }
                    let ColumnSetList=item.displayColumns;
                    if(ColumnSetList&&ColumnSetList.length){
                        let ColumnSet=ColumnSetList.map(item=>{
                            return item.column
                        })
                        // data.selectedKeys = ColumnSet;
                        data.targetKeys = ColumnSet;
                    }
                    let sortlist=item.orderedOrderBy;
                    if(sortlist&&sortlist.length){
                        data.list=sortlist;
                    }
                    
                }
            })
    }
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
        let visibility='GLOBAL';
        if(formState.resource=='1'){
            visibility='PRIVATE';
        }else if(formState.resource=='2'){
            visibility='GLOBAL';
        }else if(formState.resource=='3'){
            visibility='SHARED';
        }

        let isEmptySort = data.list.every(item=>{
            return item.name == '' || item.sort == ''
        });
        if(isEmptySort){
            message.error("排序字段和排序方式不能为空！");
            return false;
        }
        let url = Interface.listView.updateListView;
            let d = {
                actions:[{
                    id: "6970;a",
                    descriptor: "serviceComponent://ui.force.components.controllers.lists.listViewManager.ListViewManagerController/ACTION$updateListView",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        entityKeyPrefixOrApiName: props.sObjectName,
                        listViewIdOrName:props.recordId,
                        label: formState.name||'',
                        visibility: visibility,
                        developerName: formState.apiname||'',
                        displayColumnApiNames: data.targetKeys,
                        listViewFieldCriteria: null,
                        listViewScope: null,
                        shareIds: null,
                        orderedByInfo: data.list
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then(res => {
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state=='SUCCESS'){
                    message.success("保存成功");
                    emit("load", false);
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].errorMessage){
                        message.success(res.actions[0].errorMessage);
                    }
                    else{
                        message.error("保存失败");
                    }
                }
                setTimeout(function(){
                    emit("cancel", false);
                },1000)
            })
    }

    const getQuery = ()=> {
        let d={
            entityApiName:props.sObjectName
        }
        proxy.$get(Interface.entityFilter,d).then(res=>{
            console.log('entityFilter',res);
            let attributes = res.attributes.map(item=>{
                item.title = item.label + item.name;
                item.key = item.name;
                return item;
            });
            data.listData = attributes;
            // let ColumnSet = res.filter[0].ColumnSet.split(',');
            // let temp = data.listData.filter(item=>{
            //     return ColumnSet.find(row=>{
            //         return row == item.key;
            //     })
            // })
            // data.targetKeys = ColumnSet;
        })
    }
    const handleAddRowField = () => {
        data.list.push(
            {
                label:'',
                name: "",
                sort: ""
            }
        )
    }
    const handleDelteField = (item,index) => {
        data.list.splice(index,1);
    }
    getQuery();
    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126-186) / 2 + 'px';
        getData();
    })
    const setTop = computed(() => ({
        top: data.top
    }));
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
    :where(.css-dev-only-do-not-override-kqecok).ant-btn.ant-btn-sm{
        font-size: 12px !important;
        padding: 0px 5px !important;
    }
</style>