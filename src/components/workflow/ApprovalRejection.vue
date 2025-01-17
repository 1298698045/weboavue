<template>
    <div>
        <a-modal v-model:open="props.isShow" width="600px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    审批拒绝
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <!-- <a-form-item label="退回类型：" name="noticeMethod">
                            <a-radio-group v-model:value="formState.noticeMethod">
                                <a-radio value="p">退回上一环节</a-radio>
                                <a-radio value="s">退回发起人</a-radio>
                                <a-radio value="b">退回指定节点</a-radio>
                              </a-radio-group>
                        </a-form-item> -->
                        <template v-if="formState.noticeMethod=='b'">
                            <div>
                                <a-form-item label="退回节点" name="toActivityId" :rules="{required: true, message: '请选择退回节点'}">
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
                            </div>
                        </template>
                        <a-form-item label="留言：" name="description">
                            <a-textarea :rows="3" v-model:value="formState.description" />
                        </a-form-item>
                    </a-form>
                </div>
                <MultipleUsers v-if="isMultipleUser" :isShow="isMultipleUser" @cancel="isMultipleUser=false" @select="handleSelectUsers" />
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">提交拒绝</a-button>
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
        computed,
        toRaw
    } from "vue";
    import { PieChartOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons-vue";
    import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";
    import { message } from "ant-design-vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        isShow: Boolean,
        ruleLogId: String,
        processId: String,
        processInstanceId: String,
        fromActivityId: String,
        toActivityId: String
    });

    const formRef = ref();
    const modelContentRef = ref(null);
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);
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

    const formState = reactive({
        description:"",
        noticeMethod: 'p',
        toActivityId: ""
    })

    const data = reactive({
        top:0,
        nodes: [],
        isMultipleUser: false,
        selectedRowKeys: [],
        pagination: {
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            showTotal: (total) => `共 ${total} 条数据`, // 展示总共有几条数据
        },
        searchVal: "",
        recordUsers: []
    });
    const { top, nodes, isMultipleUser, selectedRowKeys, pagination, searchVal, recordUsers  } = toRefs(data);
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
    };

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
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 200) / 2 + 'px';
    });

    const setTop = computed(() => ({
        top: `calc(50% - ${data.top})`
    }));

    const handleSubmit = () => {
        // let toUsers = [];
        // if(formState.noticeMethod == 'b'){
        //     formRef.value.validate().then((res) => {
        //         if(dataSource.value.length == 0){
        //             message.error("请添加办理人员！");
        //             return false;
        //         }
        //         const list = dataSource.value.filter(item=>{
        //             return data.selectedRowKeys.find(row=>{
        //                 return item.key == row;
        //             })
        //         });
        //         if(list.length == 0){
        //             message.error("请选择办理人员！");
        //             return false;
        //         }
        //         list.forEach(item=>{
        //             toUsers.push({
        //                 id: item.id,
        //                 name: item.name
        //             });
        //         });
        //         console.log("toUsers", toUsers);
        //     }).catch(err=>{
        //         console.log("err", err);

        //         return false;
        //     })
        // };

        

        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    ruleLogId: props.ruleLogId,
                    processInstanceId: props.processInstanceId,
                    fromActivityId: props.toActivityId,
                    description: formState.description,
                    deadline: 3,
                    // transitions: []
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };

        proxy.$post(Interface.workflow.disagree, d).then(res=>{

        })
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
            height: 200px;
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
        }
    }
}
</style>