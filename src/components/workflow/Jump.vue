<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    跳转
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <a-form
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <div>
                            <a-form-item label="当前节点名称">
                                <p>	{{ processInstanceName }}</p>
                            </a-form-item>
                            <a-form-item label="跳转指定节点" name="toActivityId" :rules="{required: true, message: '请选择退回节点'}">
                                <!-- <a-select v-model:value="formState.toActivityId" :show-search="true" :filter-option="filterOption" @change="changeNode">
                                    <a-select-option v-for="(row,idx) in nodes" :key="idx"
                                        :value="row.id" :label="row.name">{{row.name}}</a-select-option>
                                </a-select> -->
                                <div class="nodes-list">
                                    <a-radio-group v-model:value="formState.toActivityId" @change="changeNodes" style="width: 100%;">
                                        <div class="node-item" v-for="(item, index) in nodes" :key="index">
                                            <a-radio :value="item.toActivityId" :style="radioStyle">
                                                <!-- <span class="select-icon">
                                                    <CheckOutlined />
                                                </span> -->
                                                <span class="node-name">{{item.toActivityName}}</span>
                                            </a-radio>
                                        </div>
                                    </a-radio-group>
                                </div>
                            </a-form-item>
                            <a-form-item label="办理人员：">
                                <div class="flex">
                                    <a-input placeholder="请输入搜索字符" v-model:value="searchVal" @change="handleSearch"></a-input>
                                    <a-button type="link" @click="handleAddPeople">添加人员</a-button>
                                </div>
                                <div class="peopleBox">
                                    <a-table :row-selection="rowSelection" size="small" :pagination="false" style="height: 100%;" :dataSource="dataSource" :columns="columns">
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
                        <a-form-item label="办理期限：" name="deadline">
                            <a-input v-model:value="formState.deadline"></a-input>
                        </a-form-item>
                        <a-form-item label="办理类型：" name="activityTypeCode">
                            <a-select v-model:value="formState.activityTypeCode">
                                <a-select-option value="1">仅执行不流转</a-select-option>
                                <a-select-option value="2">执行流转</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="留言：" name="description">
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
        computed,
        toRaw
    } from "vue";
    import { PieChartOutlined, ArrowUpOutlined, ArrowDownOutlined, CheckOutlined } from "@ant-design/icons-vue";
    import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";
    import { message } from "ant-design-vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        isShow: Boolean,
        ruleLogId: String,
        processId: String,
        processInstanceId: String,
        processInstanceName: String,
        fromActivityId: String,
        toActivityID: String
    });

    const formRef = ref();
    const modelContentRef = ref(null);
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const radioStyle = reactive({
        display: 'flex',
        width: "100%",
    })
    const emit = defineEmits(['update-status','ok']);
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
        noticeMethod: 'b',
        toActivityId: "",
        deadline: "",
        activityTypeCode: ""
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
        recordUsers: [],
        height: document.documentElement.clientHeight - 300,
    });
    const { top, nodes, isMultipleUser, selectedRowKeys, pagination, searchVal, recordUsers, height } = toRefs(data);

    const filterOption = (input, option) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    };

    const rowSelection = computed(()=>{
        return {
            onChange: (selectedRowKeys, selectedRows) => {
                data.selectedRowKeys = selectedRowKeys;
            },
            selectedRowKeys: data.selectedRowKeys,
            preserveSelectedRowKeys: true
        }
    });

    const getReturnActivities = () => {
        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    ruleLogId: props.ruleLogId,
                    processInstanceId: props.processInstanceId,
                    fromActivityId: props.toActivityID
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.workflow.getReturnActivities, d).then(res=>{
            data.nodes = res.actions[0].returnValue.transitions;
        })
    };
    getReturnActivities();

    const changeNodes = (e) => {
        console.log("forms", formState.toActivityId);
        const row = data.nodes.find(item=>item.toActivityId == formState.toActivityId);
        formState.toActivityName = row.toActivityName;
        if(row.participants.length){
            row.participants.forEach(item=>{
                let isBook = dataSource.value.some(v=>v.key == item.Id);
                if(!isBook){
                    dataSource.value.push({
                        id: item.UserId,
                        key: item.UserId,
                        name: item.Name,
                        businessUnitIdName: item.BusinessUnitIdName
                    });
                    data.selectedRowKeys.push(item.UserId);
                }
            })
        }
    }

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
    // getProcessNodes();

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

    const handleSubmit = async () => {
        let toUsers = [];

        const validate = async () => {
           return new Promise((resolve, reject)=>{
               formRef.value.validate().then((res) => {
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
                //    console.log("toUsers", toUsers);
                   resolve(true);
               }).catch(err=>{
                   console.log("err", err);
                   reject("err");
                   return false;
               })
           })
        }

        const run = await validate();

        console.log("toUsers", toUsers);

        const transitions = [
            {
                deadline: formState.deadline,
                activityTypeCode: formState.activityTypeCode,
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
                    description: formState.description,
                    // deadline: formState.deadline,
                    transitions: transitions
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        
        proxy.$post(Interface.workflow.jump, d).then(res=>{
            if(res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS'){
                message.success("跳转成功！");
                emit("update-status", false);
                emit("ok", false);
            }else {
                message.error("跳转失败！");
            }
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
            height: 500px;
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
.nodes-list{
    width: 100%;
    height: 200px;
    border: 1px solid #d9d9d9;
    overflow-y: auto;
    border-radius: 4px;
    .node-item{
        padding: 10px 20px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        &:hover{
            background: #f4f4f4;
            cursor: pointer;
        }
        .select-icon{
            color: #3399ff;
            font-weight: bold;
            width: 50px;
            text-align: center;
        }
    }
}
</style>