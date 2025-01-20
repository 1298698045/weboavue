<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    加签
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
                        <a-form-item label="需要加签节点" name="toActivityId" :rules="{required: true, message: '请选择需要加签的节点'}">
                            <a-select v-model:value="formState.toActivityId" @change="changeNodes">
                                <a-select-option v-for="(row,idx) in nodes" :key="idx"
                                    :value="row.id">{{row.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="加签类型">
                            <a-radio-group v-model:value="formState.insertType" name="radioGroup">
                                <a-radio value="51">仅签字不流转</a-radio>
                                <a-radio value="52">需要流转</a-radio>
                              </a-radio-group>
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
                        <a-form-item label="办理期限：" name="deadline">
                            <a-input v-model:value="formState.deadline"></a-input>
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
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";

    const formRef = ref(null);
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        paramsData: Object,
        isShow: Boolean,
        processInstanceId: String,
        processInstanceName: String,
        processId: String,
        ruleLogId: String,
        toActivityID: String
    });
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);
    
    const formState = reactive({
        ProcessName: "",
        toActivityId: "",
        Remark: "",
        insertType: "51",
        description: "",
        deadline: "",
        toActivityName: ""
    });


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
    const dataSource = ref([]);
    const columnsList = toRaw(columns);
    const data = reactive({
        nodes: [],
        isMultipleUser: false,
        selectedRowKeys: [],
        height: document.documentElement.clientHeight - 300,
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

    const handleSearch = (e) => {
        dataSource.value = data.recordUsers.filter(item=>{
            return item.name.indexOf(data.searchVal) != -1;
        })
    };

    const handleAddPeople = () => {
        data.isMultipleUser = true;
    }

    const handleUserParams = (e) => {
        dataSource.value.push({
            key: e.id,
            userName: e.name,
            BusinessUnitIdName: e.BusinessUnitIdName
        })
        data.isRadioUser = false;
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
            if(props.toActivityID){
                formState.toActivityId = props.toActivityID;
                const row = data.nodes.find(item=>item.id == formState.toActivityId);
                formState.toActivityName = row.name;
            }
        })
    }
    getProcessNodes();

    onMounted(()=>{
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 340;
        });
    })

    const changeNodes = (e) => {
        const row = data.nodes.find(item=>item.id == formState.toActivityId);
        formState.toActivityName = row.name;
    }
    
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
            const transitions = [
                {
                    deadline: formState.deadline,
                    insertType: formState.insertType,
                    toActivityId: formState.toActivityId,
                    toActivityName: formState.toActivityName,
                    toUsers: toUsers
                }
            ];
            let obj = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        ruleLogId: props.ruleLogId,
                        processId: props.processId,
                        processInstanceId: props.processInstanceId,
                        fromActivityId: props.toActivityID,
                        fromActivityName: props.processInstanceName,
                        description: formState.description,
                        transitions: transitions,
                        // toUsers: toUsers,
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            };
            proxy.$post(Interface.workflow.countersign, d).then(res=>{
                if(res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS'){
                    message.success("加签成功！");
                    handleCancel();
                }else {
                    message.error("加签失败！");
                }
            })
        }).catch((err) => {
            console.log("error", err);
        });
        
    }
    const handleCancel = () => {
        emit("update-status",false);
    };

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
        }
    }
}
.ant-modal div[aria-hidden="true"] {
		display: none !important
}

</style>