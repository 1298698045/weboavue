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
                            <p>	{{paramsData.ProcessIdName}}</p>
                        </a-form-item>
                        <a-form-item label="需要加签节点">
                            <a-select v-model:value="formState.toActivityId">
                                <a-select-option v-for="(row,idx) in nodes" :key="idx"
                                    :value="row.StepID">{{row.Name}}</a-select-option>
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
                                <a-input placeholder="请输入搜索字符"></a-input>
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
                        <a-form-item label="备注" name="Remark">
                            <a-textarea :rows="3" v-model:value="formState.Remark" />
                        </a-form-item>
                    </a-form>
                </div>
                <radio-user :isShow="isRadioUser" v-if="isRadioUser" @cancel="cancelUserModal" @selectVal="handleUserParams"></radio-user>
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
        toRaw
    } from "vue";
    import { PieChartOutlined, ArrowUpOutlined, ArrowDownOutlined  } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";

    const { proxy } = getCurrentInstance();
    const props = defineProps({
        paramsData: Object,
        isShow: Boolean
    });
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);
    
    const formState = reactive({
        ProcessName: "",
        toActivityId: "",
        Remark: "",
        insertType: "51"
    })
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
    const data = reactive({
        nodes: [],
        isRadioUser: false,
        selectedRowKeys: [],
        height: document.documentElement.clientHeight - 340,
        pagination: {
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            showTotal: (total) => `共 ${total} 条数据`, // 展示总共有几条数据
        },
    })
    const { nodes, isRadioUser, selectedRowKeys,height,pagination } = toRefs(data);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            data.selectedRowKeys = selectedRowKeys;

        },
        // getCheckboxProps: record => ({
        //     disabled: record.name === 'Disabled User',
        //     name: record.name,
        // }),
    };
    const handleAddPeople = () => {
        data.isRadioUser = true;
    }
    const cancelUserModal = (e) => {
        data.isRadioUser = e;
    }
    const handleUserParams = (e) => {
        dataSource.value.push({
            key: e.id,
            userName: e.name,
            BusinessUnitIdName: e.BusinessUnitIdName
        })
        data.isRadioUser = false;
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
        proxy.$get(Interface.flow.processNodes,{
            ProcessId: props.paramsData.ProcessId,
        }).then(res=>{
            data.nodes = res.rows;
        })
    }
    getProcessNodes();
    onMounted(()=>{
        // formState.ProcessName = props.paramsData.InstanceIdName;
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 340;
        });
    })
    defineExpose({isModal})
    const handleSubmit = () => {
        formRef.value.validate().then(() => {
            // console.log("values", formState, toRaw(formState));
            var obj = {
                processId: props.processId,
                processInstanceId: props.paramsData.ProcessInstanceId,
                toActivityId: formState.toActivityId,
                toUserIds: data.selectedRowKeys.join(','),
                participators: data.selectedRowKeys.join(','),
                memo: "",
                Remark: formState.Remark,
                insertType: formState.insertType
            }
            proxy.$get(Interface.flow.insertapprove,obj).then(res=>{
                message.success("加签成功！");
                handleCancel();
            })
        }).catch((err) => {
            console.log("error", err);
        });
        
    }
    const handleCancel = () => {
        emit("update-status",false);
    }
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