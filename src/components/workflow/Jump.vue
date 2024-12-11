<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    跳转
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <a-form
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <a-form-item label="当前节点名称">
                            <p>	{{ processInstanceName }}</p>
                        </a-form-item>
                        <a-form-item label="跳转到节点" name="toActivityId" :rules="{required: true, message: '请选择跳转到节点'}">
                            <a-select v-model:value="formState.toActivityId" @change="changeNode">
                                <a-select-option v-for="(row,idx) in nodes" :key="idx"
                                    :value="row.id">{{row.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="办理人员：">
                            <div class="flex">
                                <a-input placeholder="请输入搜索字符" v-model:value="searchVal" @change="handleSearch"></a-input>
                                <a-button type="link" @click="handleAddPeople">添加人员</a-button>
                            </div>
                            <div class="peopleBox">
                                <a-table :row-selection="rowSelection" size="small" :pagination="pagination" style="height: 100%;" :dataSource="dataSource" :columns="columns">
                                    <template #bodyCell="{ column,index }">
                                        <template v-if="column.key === 'operation'">
                                            <span class="iconTop" @click="arrowup(index)">
                                                <ArrowUpOutlined />
                                            </span>
                                            <span class="iconTop" @click="arrowdown(index)">
                                                <ArrowDownOutlined />
                                            </span>
                                        </template>
                                    </template>
                                </a-table>
                            </div>
                        </a-form-item>
                        <a-form-item label="备注" name="description">
                            <a-textarea :rows="3" v-model:value="formState.description" />
                        </a-form-item>
                    </a-form>
                </div>
                <MultipleUsers v-if="isMultipleUser" :isShow="isMultipleUser" @cancel="isMultipleUser=false" @select="handleSelectUsers" />
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                    <a-button @click="handleCancel">关闭</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref,
        reactive,
        watch,
        h,
        defineComponent,
        onMounted,
        defineProps,
        toRefs,
        getCurrentInstance,
        defineExpose,
        defineEmits,
        toRaw,
        computed
    } from "vue";
    import { PieChartOutlined, ArrowUpOutlined, ArrowDownOutlined  } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";

    import Interface from "@/utils/Interface.js";
    import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";

    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const props = defineProps({
        paramsData: Object,
        isShow: Boolean,
        processInstanceId: String,
        processInstanceName: String,
        processId: String,
        ruleLogId: String
    });
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);
    
    const formState = reactive({
        ProcessName: "",
        toActivityId: "",
        toActivityName: "",
        Remark: "",
        description: ""
    })
    const columns = [
        {
            title: "姓名",
            dataIndex: "name",
            align: "center",
            width: 100,
        },
        {
            title: "部门",
            dataIndex: "businessUnitIdName",
            align: "center",
            width: 100,
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 80,
            align: "center"
        },
    ]
    const dataSource = ref([
        
    ]);
    const columnsList = toRaw(columns);
    const data = reactive({
        nodes: [],
        isMultipleUser: false,
        selectedRowKeys: [],
        height: document.documentElement.clientHeight - 340,
        pagination: {
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            showTotal: (total) => `共 ${total} 条数据`, // 展示总共有几条数据
        },
        searchVal: "",
        recordUsers: []
    })
    const { nodes, isMultipleUser, selectedRowKeys, height, pagination, searchVal, recordUsers } = toRefs(data);
    const rowSelection = computed(()=>{
        return {
            onChange: (selectedRowKeys, selectedRows) => {
                data.selectedRowKeys = selectedRowKeys;
            },
            selectedRowKeys: data.selectedRowKeys,
            preserveSelectedRowKeys: true
        }
    });
    const handleAddPeople = () => {
        data.isMultipleUser = true;
    }
    const handleSearch = (e) => {
        dataSource.value = data.recordUsers.filter(item=>{
            return item.name.indexOf(data.searchVal) != -1;
        })
    };
    const handleSelectUsers = (params) => {
        let addUsers = params.map(item=>{
            item.key = item.id;
            return item;
        });
        addUsers.forEach(item=>{
            let isBook = dataSource.value.some(row=>row.key == item.key);
            if(!isBook){
                dataSource.value.push(item);
                data.selectedRowKeys.push(item.key);
            }
        });

        data.recordUsers = JSON.parse(JSON.stringify(dataSource.value));
        data.isMultipleUser = false;
    }

    const arrowup=(index)=>{
        if(index!=0){
            let list=dataSource.value;
            let a=list[index];
            let b=list[index-1];
            list[index-1]=a;
            list[index]=b;
            dataSource.value=list;
        }
    }
    const arrowdown=(index)=>{
        if(index!=dataSource.value.length-1){
            let list=dataSource.value;
            let a=list[index];
            let b=list[index+1];
            list[index+1]=a;
            list[index]=b;
            dataSource.value=list;
        }
    }
    const getProcessNodes = () => {
        let d = {
            filterId: "",
            entityType: "WFStep",
            filterQuery: "ProcessId\teq\t" + props.processId
        }
        proxy.$get(Interface.list2, d).then(res=>{
            let list = res.nodes;
            let temp = [];
            list.forEach(item=>{
                temp.push({
                    id: item.id,
                    name: item.Name.textValue
                })
            });
            data.nodes = temp;
        })
    }
    getProcessNodes();

    const changeNode = (e) => {
        let row = data.nodes.find(item=>item.id==formState.toActivityId);
        formState.toActivityName = row.name;
    }

    onMounted(()=>{
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 340;
        });
    })
    
    const handleSubmit = () => {
        formRef.value.validate().then(() => {
            let toUsers = [];
            if(dataSource.value.length == 0){
                message.error("请添加办理人员！");
                return false;
            }
            const list = dataSource.value.filter(item=>{
                return data.selectedRowKeys.find(row=>{
                    return item.key == row;
                })
            });
            if(list.length == 0){
                message.error("请选择办理人员！");
                return false;
            }
            list.forEach(item=>{
                toUsers.push({
                    id: item.id,
                    name: item.name
                });
            });
            let obj = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        ruleLogId: props.ruleLogId,
                        processInstanceId: props.processInstanceId,
                        toActivityId: formState.toActivityId,
                        toActivityName: formState.toActivityName,
                        toUsers: toUsers,
                        description: formState.description
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            };
            proxy.$post(Interface.workflow.jump, d).then(res=>{
                if(res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS'){
                    message.success("跳转成功！");
                    handleCancel();
                }else {
                    message.error("跳转失败！");
                }
            })
        }).catch((err) => {
            console.log("error", err);
        });
                
    }
    const handleCancel = () => {
        emit("update-status",false);
    }
    defineExpose({isModal})
</script>
<style lang="less">
    .ant-modal-content{
    padding: 0 !important;
    .ant-modal-header{
        border-bottom: 2px solid #e5e6eb;
        padding: 12px;
        font-size: 16px;
        color: #000;
        text-align: center;
    }
    .ant-modal-footer{
        border-top: 2px solid #e5e6eb;
        padding: 16px 20px;
        box-sizing: border-box;
    }
    .modalContainer{
        .modalCenter{
            padding: 10px 15px;
            box-sizing: border-box;
            height: 300px;
            overflow-y: auto;
            .form-tip {
                font-size: 12px;
                margin-bottom: 12px;
                color: #606266;
            }
            .ProcessName {
                color: var(--textColor);
            }
            .form-tip1 {
                font-size: 12px;
                color: red;
                line-height: 8px;
                margin-top: 10px;
                margin-bottom: 7px;
            }
            .processTitle .ant-form-item-required{
                color: red !important;
            }
            .flex{
                display: flex;
                align-items: center;
            }
            .peopleBox{
                /* height: 200px; */
                border: 1px solid #e2e3e5;
                margin-top: 20px;
                border-radius: 3px;
                .iconTop{
                    color: #3399ff;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
            :where(.css-dev-only-do-not-override-kqecok).ant-form-item{
                margin-bottom: 10px;
            }
            :where(.css-dev-only-do-not-override-kqecok).ant-form-item .ant-form-item-control-input-content p{
                width: auto;
                font-size: 14px;
                display: inline-block;
                flex: unset;
                padding: 0 !important;
            }
        }
    }
}
.ant-modal div[aria-hidden="true"] {
		display: none !important
}

</style>