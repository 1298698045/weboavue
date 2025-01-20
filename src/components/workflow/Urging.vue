<template>
    <div>
        <a-modal v-model:open="props.isShow" width="600px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    催办提醒
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <a-form-item label="通知方式" name="noticeMethod">
                            <a-checkbox-group v-model:value="formState.noticeMethod">
                                <a-checkbox value="web" name="type">站内消息</a-checkbox>
                                <a-checkbox value="app" name="type">移动消息</a-checkbox>
                                <a-checkbox value="sms" name="type">短信消息</a-checkbox>
                            </a-checkbox-group>
                        </a-form-item>
                        <a-form-item label="催办消息：" name="Description">
                            <a-textarea :rows="3" v-model:value="formState.Description" />
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">发送催办</a-button>
                    <a-button @click="handleCancel">取消</a-button>
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
        computed
    } from "vue";
    import { PieChartOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        paramsData: Object,
        isShow: Boolean,
        processInstanceId: String
    });
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);

    const data = reactive({
        top:0,
    });
    const { top } = toRefs(data);
    
    const formState = reactive({
        Description:"",
        noticeMethod: ['web'],
        web: true,
        app: false,
        sms: false
    })
    const modelContentRef = ref(null);

    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 180) / 2 + 'px';
    });

    const setTop = computed(() => ({
        top: `calc(50% - ${data.top})`
    }));


    const getBoolean = (name) => {
        let boolean = formState.noticeMethod.some(item=>item == name);
        return boolean;
    }

    const handleSubmit = () => {
        let web = getBoolean('web');
        let app = getBoolean('app');
        let sms = getBoolean('sms');

        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: props.processInstanceId,
                    noticeMessageChannel: {
                        web: web,
                        app: app,
                        sms: sms
                    },
                    description: formState.Description
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.workflow.notice, d).then((res) => {
            if(res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS'){
                message.success("催办成功！");
                handleCancel();
            }else {
                message.error("催办失败！");
            }
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
            height: 300px !important;
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