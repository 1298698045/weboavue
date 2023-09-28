<template>
    <div>
        <a-modal v-model:open="props.isShow" width="550px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
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
                <div class="modalCenter">
                    <a-form
                        v-if="activeKey=='1'"
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <a-form-item label="操作类型：" name="noticeMethod">
                            <a-radio-group v-model:value="formState.noticeMethod">
                                <a-radio value="1">提交流转</a-radio>
                                <a-radio value="2">跳转</a-radio>
                              </a-radio-group>
                        </a-form-item>
                        <a-form-item label="下一环节：" name="noticeMethod">
                            <a-radio-group v-model:value="formState.noticeMethod">
                                <a-radio value="1">部门领导</a-radio>
                              </a-radio-group>
                        </a-form-item>
                        <a-form-item name="BusinessUnitId" label="办理人员：" :rules="[{ required: true, message: '请选择发起部门' }]">
                            <a-select v-model:value="formState.BusinessUnitId">
                                <a-select-option v-for="(item,index) in formState.BusinessUnitList" :key="index" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item name="BusinessUnitId" label="办理工作日：">
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
                            <a-textarea :rows="3" />
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">提交流转</a-button>
                    <a-button @click="handleCancel">取消关闭</a-button>
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
        defineEmits
    } from "vue";
    import { PieChartOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        paramsData: Object,
        isShow: Boolean
    });
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);
    const handleSubmit = () => {
        handleCancel();
    }
    const handleCancel = () => {
        emit("update-status",false);
    }
    const formState = reactive({
        ProcessName: "",
        BusinessUnitId:"",
        Title:"",
        Priority:"0",
        Description:"",
        BusinessUnitList: [],
        noticeMethod: []
    })
    const data = reactive({
        activeKey: '1'
    })
    const { activeKey } = toRefs(data);
    onMounted(()=>{
        formState.ProcessName = props.paramsData.InstanceIdName;
    })
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
        }
    }
}
</style>