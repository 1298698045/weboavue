<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    传阅
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <a-form
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
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
                        <a-form-item label="留言：" name="Description">
                            <a-textarea :rows="3" v-model:value="formState.Description" />
                        </a-form-item>
                        <a-form-item label="提醒方式" name="noticeMethod">
                            <a-checkbox-group v-model:value="formState.noticeMethod">
                                <a-checkbox value="web" name="type">站内消息</a-checkbox>
                                <a-checkbox value="app" name="type">移动消息</a-checkbox>
                                <a-checkbox value="sms" name="type">短信消息</a-checkbox>
                            </a-checkbox-group>
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
        nextTick,
        computed
    } from "vue";
    import { PieChartOutlined, ArrowUpOutlined, ArrowDownOutlined  } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";

    const { proxy } = getCurrentInstance();


    const props = defineProps({
        isShow: Boolean,
        processInstanceId: String,
        processInstanceName: String
    });

    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);


    const formState = reactive({
        Description:"",
        noticeMethod: ['web']
    })

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

    const rowSelection = computed(()=>{
        return {
            onChange: (selectedRowKeys, selectedRows) => {
                data.selectedRowKeys = selectedRowKeys;
            },
            selectedRowKeys: data.selectedRowKeys,
            preserveSelectedRowKeys: true
        }
    })

    const handleSearch = (e) => {
        dataSource.value = data.recordUsers.filter(item=>{
            return item.name.indexOf(data.searchVal) != -1;
        })
    };

    const handleAddPeople = () => {
        data.isMultipleUser = true;
    };

    const handleUserParams = (e) => {
        dataSource.value.push({
            key: e.id,
            userName: e.name,
            BusinessUnitIdName: e.BusinessUnitIdName
        })
        data.isMultipleUser = false;
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
    onMounted(()=>{
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 340;
        });
    });

    const getBoolean = (name) => {
        let boolean = formState.noticeMethod.some(item=>item == name);
        return boolean;
    }

    const handleSubmit = () => {
        let web = getBoolean('web');
        let app = getBoolean('app');
        let sms = getBoolean('sms');

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
                    processInstanceId: props.processInstanceId,
                    name: props.processInstanceName,
                    noticeMessageChannel: {
                        web: web,
                        app: app,
                        sms: sms
                    },
                    toUsers: toUsers,
                    description: formState.Description
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };

        proxy.$post(Interface.workflow.forward, d).then(res=>{
            if(res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS'){
                message.success("传阅成功！");
                handleCancel();
            }else {
                message.error("传阅失败！");
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