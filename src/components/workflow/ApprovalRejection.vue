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
                        <a-form-item label="退回类型：" name="noticeMethod">
                            <a-radio-group v-model:value="formState.noticeMethod">
                                <a-radio value="1">退回上一环节</a-radio>
                                <a-radio value="2">退回发起人</a-radio>
                                <a-radio value="3">退回指定节点</a-radio>
                              </a-radio-group>
                        </a-form-item>
                        <a-form-item label="留言：" name="Description">
                            <a-textarea :rows="3" v-model:value="formState.Description" />
                        </a-form-item>
                    </a-form>
                </div>
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
        computed
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
    const data = reactive({
        top:0,
    });
    const {
        top
    } = toRefs(data);
    const formState = reactive({
        ProcessName: "",
        BusinessUnitId:"",
        Title:"",
        Priority:"0",
        Description:"",
        BusinessUnitList: [],
        noticeMethod: []
    })
    const modelContentRef = ref(null);
    onMounted(()=>{
        formState.ProcessName = props.paramsData.InstanceIdName;
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 200) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: `calc(50% - ${data.top})`
    }));
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