<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    审批通过流转
                 </div>
            </template>
            <div class="modalContainer">
                <a-tabs v-model:activeKey="activeKey">
                    <a-tab-pane key="1" tab="审批流转"></a-tab-pane>
                    <a-tab-pane key="2" tab="留言"></a-tab-pane>
                </a-tabs>
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <a-form
                        v-if="activeKey=='1'"
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <a-form-item label="操作类型：">
                            <a-radio-group v-model:value="formState.operationType">
                                <a-radio :value="1">提交流转</a-radio>
                                <!-- <a-radio value="2">跳转</a-radio> -->
                              </a-radio-group>
                        </a-form-item>
                        <a-form-item label="下一环节：" v-if="splitType!=2">
                            <a-radio-group v-model:value="activityId" @change="changeActivity">
                                <a-radio :value="item.ToActivityId" v-for="(item, index) in transitions">{{item.To.name}}</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item label="办理节点" v-if="splitType==2">
                        </a-form-item>
                        <div class="collapseItem" v-for="(item, parentIndex) in transitions" :key="parentIndex">
                            <div class="collapseHead">
                                <a-form-item :label="item.To.name">
                                    <a-checkbox v-model:checked="item.isMatched"></a-checkbox>
                                </a-form-item>
                                <div class="arrow" @click="item.isCollapse=!item.isCollapse">
                                    <DownOutlined v-if="item.isCollapse" />
                                    <UpOutlined v-else />
                                </div>
                            </div>
                            <div class="collapseBody" v-if="item.isCollapse">
                                <a-form-item label="办理人员：">
                                    <div class="flex">
                                        <a-input :disabled="!item.isMatched" v-model:value="item.searchVal" placeholder="请输入搜索字符"></a-input>
                                        <a-button :disabled="!item.isMatched" type="link" @click="item.isMatched && handleAddPeople(item, parentIndex)" v-if="item.addPeople">添加人员</a-button>
                                    </div>
                                    <div class="peopleBox">
                                        <a-table :disabled="!item.isMatched" :row-selection="rowSelection" size="small" :pagination="pagination" style="height: 100%;" :dataSource="item.peopleList" :columns="columns">
                                            <template #bodyCell="{ column,index }">
                                                <template v-if="column.key === 'operation'">
                                                    <span class="iconTop" @click="arrowup(item, index)">
                                                        <ArrowUpOutlined />
                                                    </span>
                                                    <span class="iconTop" @click="arrowdown(item, index)">
                                                        <ArrowDownOutlined />
                                                    </span>
                                                </template>
                                            </template>
                                        </a-table>
                                    </div>
                                </a-form-item>
                            </div>
                        </div>
                        <a-form-item label="办理工作日：">
                            <a-input></a-input>
                        </a-form-item>
                        <a-form-item label="提醒方式" name="noticeMethod">
                            <a-checkbox-group v-model:value="formState.noticeMethod">
                                <a-checkbox value="1" name="type">系统消息</a-checkbox>
                                <a-checkbox value="2" name="type">手机短信</a-checkbox>
                              </a-checkbox-group>
                        </a-form-item>
                    </a-form>
                    <a-form v-if="activeKey=='2'">
                        <a-form-item label="留言:" name="Description">
                            <a-textarea :rows="3" v-model:value="formState.description" />
                        </a-form-item>
                    </a-form>
                </div>
                <radio-user :isShow="isRadioUser" v-if="isRadioUser" @cancel="cancelUserModal" @selectVal="handleUserParams"></radio-user>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">提交流转</a-button>
                    <a-button @click="handleCancel">取消关闭</a-button>
                </div>
            </template>
        </a-modal>
        <MultipleUsers :isShow="isMultipleUser" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
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
        toRaw
    } from "vue";
    import { PieChartOutlined, ArrowUpOutlined, ArrowDownOutlined, UpOutlined, DownOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";

    const { proxy } = getCurrentInstance();
    const props = defineProps({
        paramsData: Object,
        isShow: Boolean,
        ruleLogId: [String, Number],
        processId: String,
        processInstanceId: String,
        toActivityID: String
    });
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);
    
    const formState = reactive({
        operationType: 1,
        ProcessName: "",
        BusinessUnitId:"",
        Title:"",
        Priority:"0",
        description:"",
        BusinessUnitList: [],
        noticeMethod: [],
    })
    const data = reactive({
        activeKey: '1',
        height: document.documentElement.clientHeight - 390,
        isRadioUser: false,
        selectedRowKeys: [],
        pagination: {
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            showTotal: (total) => `共 ${total} 条数据`, // 展示总共有几条数据
        },
        transitions: [],
        splitType: "", // 分支类型
        activityId: "", // 节点id
        addPeople: true,
        recordData: {},
        fromActivityId: "",
        isMultipleUser: false
    })
    const { activeKey,height,isRadioUser,selectedRowKeys,pagination, transitions, splitType, 
        activityId, addPeople, recordData, fromActivityId, isMultipleUser } = toRefs(data);
    const columns = [
        {
            title: "姓名",
            dataIndex: "userName",
            align: "center",
            width: 100,
        },
        {
            title: "部门",
            dataIndex: "BusinessUnitIdName",
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
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: record => ({
        //     disabled: record.name === 'Disabled User',
        //     name: record.name,
        // }),
    };

    onMounted(()=>{
        formState.ProcessName = props.paramsData.InstanceIdName;
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 390;
        });
    });


    const changeActivity = (e) => {
        data.activityId = e.target.value;
        let index = data.transitions.findIndex(item=>item.ToActivityId == data.activityId);
        getPermission(data.activityId, index);
    }

    // 获取权限
    const getPermission = (activityId, index) => {
        let obj = {
            actions:[{
                id: "562;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    processId: props.processId,
                    activityId: activityId
                }
            }]
        };

        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.workflow.getPermission, d).then(res=>{
            let permission = res.actions[0].returnValue;
            let { flowPermission } = permission;
            data.addPeople = flowPermission.addPeople;
            data.transitions[index].addPeople = flowPermission.addPeople;
        });
    }

    // 获取节点转移路径
    const getTransitions = () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    processId: props.processId,
                    activityId: props.toActivityID,
                    processInstanceId: props.processInstanceId,
                    ruleLogId: props.ruleLogId
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.workflow.getTransitions, d).then(res=>{
            console.log("getTransitions", res);
            let { splitType, transitions, fromActivityId } = res.actions[0].returnValue;
            data.fromActivityId = fromActivityId;
            data.splitType = splitType;
            data.transitions = transitions.map(item=>{
                item.searchVal = "";
                item.addPeople = false;
                item.peopleList = [];
                item.selectPeoples = [];
                item.isCollapse = true;
                return item;
            });

            if(splitType!=2){
                data.activityId = transitions[0].ToActivityId;
                getPermission(data.activityId, 0);
                getParticipators(0);
            }else {
                data.transitions.forEach((item,index)=>{
                    let activityId = item.ToActivityId;
                    getPermission(activityId, index)
                })
            }
        })
    };
    getTransitions();

    // 获取节点办理人员
    const getParticipators = () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    processId: props.processId,
                    instanceId: props.processInstanceId,
                    activityId: data.activityId,
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.workflow.getParticipators, d).then(res=>{
            console.log("getParticipators", res);
        })
    };
    
    const handleAddPeople = (item, index) => {
        data.recordData = {
            item,
            index
        }
        data.isRadioUser = true;
    }
    const cancelUserModal = (e) => {
        data.isRadioUser = e;
    }
    const handleUserParams = (e) => {
        let obj = {
            key: e.id,
            userName: e.name,
            BusinessUnitIdName: e.BusinessUnitIdName
        }
        dataSource.value.push({
            key: e.id,
            userName: e.name,
            BusinessUnitIdName: e.BusinessUnitIdName
        })
        let { index } = data.recordData;
        data.transitions[index].peopleList.push(obj);
        data.isRadioUser = false;
    }
    const arrowup=(item, index)=>{
        if(index != 0){
            let list = item.peopleList;
            let a = list[index];
            let b = list[index-1];
            list[index-1] = a;
            list[index] = b;
            item.peopleList = list;
        }
    }
    const arrowdown=(item, index)=>{
        if(index != item.peopleList.length-1){
            let list = item.peopleList;
            let a = list[index];
            let b = list[index+1];
            list[index+1] = a;
            list[index] = b;
            item.peopleList = list;
        }
    }

    const cancelDeptModal = () => {

    };

    const handleDeptParams = () => {

    };
    
    const handleSubmit = () => {
        let transitions = [];
        
        if(data.splitType==2){
            let isNodeSelect = data.transitions.some(item=>item.isMatched==true);
            if(isNodeSelect){
                data.transitions.forEach(item=>{
                    if(item.isMatched && item.peopleList.length == 0){
                        message.error('请选择人员!');
                        throw error("请选择人员!");
                    }
                })
            }
            if(!isNodeSelect){
                message.error('请选择节点!');
                return false;
            }

        }else {
            if(data.activityId==""){
                message.error('请选择节点!');
                return false;
            }
        }

        console.log("data.transitions2:", data.transitions);

        data.transitions.forEach(item=>{
            if(item.isMatched){
                console.log("item.peopleList", item.peopleList);
                let toUsers = item.peopleList.map(row=>{
                    row.id = row.key;
                    row.name = row.userName;
                    let { BusinessUnitIdName, key, userName, ...rest } = row;
                    return rest;
                });
                let nodeObj = {
                    ruleId: item.ID,
                    toActivityId: item.ToActivityId,
                    toActivityName: item.To.name,
                    toUsers: toUsers
                };
                transitions.push(nodeObj);
            }
        })



        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    ruleLogId: props.ruleLogId,
                    processInstanceId: props.processInstanceId,
                    fromActivityId: data.fromActivityId,
                    description: formState.description,
                    deadline: 3,
                    transitions: transitions
                }
            }]
        };

        let d = {
            message: JSON.stringify(obj)
        };

        proxy.$post(Interface.workflow.agree, d).then(res=>{

        })




        // handleCancel();
    }
    const handleCancel = () => {
        emit("update-status",false);
    }

    defineExpose({isModal})
</script>
<style lang="less" scoped>
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
                margin-top: 10px;
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
.collapseItem{
    background: #e2e3e5;
    border-radius: 4px;
    padding: 10px 16px 16px 0;
    margin-bottom: 16px;
    .collapseHead{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .arrow{
            cursor: pointer;
        }
    }
}
</style>