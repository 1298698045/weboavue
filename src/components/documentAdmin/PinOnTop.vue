<template>
    <div>
        <a-modal v-model:open="props.isShow" width="600px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    文档置顶
                </div>
            </template>
            <div class="modalContainer PinOnTop" ref="PinOnTopRef">
                <div class="modalCenter">
                    <a-form ref="formRef" :label-col="labelCol" :model="formState">
                        <a-form-item label="文档置顶" name="IsTop">
                            <!-- <a-input type="checkbox" v-model:checked="formState.IsTop" class="switchItem"></a-input> -->
                            <a-switch v-model:checked="formState.IsTop" class="switchItem" />
                        </a-form-item>
                        <a-form-item label="置顶截止：" name="RestTime" class="RestTime" v-if="formState.IsTop">
                            <a-date-picker v-model:value="formState.RestTime" valueFormat="YYYY-MM-DD HH:mm:ss"
                                show-time placeholder="置顶截至时间" />
                        </a-form-item>

                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
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
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
dayjs.locale('zh-cn');
import calendar from 'dayjs/plugin/calendar';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
import { message } from "ant-design-vue";
import { PieChartOutlined } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const props = defineProps({
    paramsData: Object,
    isShow: Boolean,
    id: String,
    objTypeCode: String,
});
let data = reactive({ top: 0, })
const { top } = toRefs(data);
const isModal = ref(true);
const labelCol = ref({ style: { width: '100px' } });
const emit = defineEmits(['update-status']);
const handleSubmit = () => {
    let url = Interface.edit;
    let d = {
        actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'Content',
                    objTypeCode: 100201,
                    fields: {
                        IsTop: formState.IsTop ? 1 : 0,
                        EndTopDate: formState.RestTime || '',
                    }
                }
            }
        }]
    };
    if (props.id) {
        d.actions[0].params.recordId = props.id;
    }
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
            message.success("操作成功！");
        }
        else {
            if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
                message.success(res.actions[0].errorMessage);
            }
            else {
                message.success("操作失败！");
            }
        }
        handleCancel();
    });
}
const handleCancel = () => {
    emit("update-status", false);
}
const formState = reactive({
    ProcessName: "",
    BusinessUnitId: "",
    Title: "",
    Priority: "0",
    Description: "",
    BusinessUnitList: [],
    IsTop: true,
    RestTime: '',
    RestTime1: '',
    RestTime2: ''
})
const PinOnTopRef = ref(null);
const getData = () => {
    let d = {
        actions: [{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: props.id,
                apiName: 'Content',
                objTypeCode: '100201',
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail, obj).then(res => {
        if (res && res.actions && res.actions[0]) {
            let record = res.actions[0].returnValue.fields;
            formState.IsTop = record.IsTop ? record.IsTop.value * 1 == 1 ? true : false : '';
            formState.RestTime = record.EndTopDate ? dayjs(record.EndTopDate.value).format("YYYY-MM-DD HH:mm:ss") : '';
        }
    })
}
onMounted(() => {
    //formState.ProcessName = props.paramsData.InstanceIdName;
    let h = PinOnTopRef.value.clientHeight;
    data.top = (h + 180) / 2 + 'px';
    getData();
})
const setTop = computed(() => ({
    top: `calc(50% - ${data.top})`
}));
const changeRangeDate = (e) => {
    if (e && e.length) {
        formState.RestTime = e.join(',');
        formState.RestTime1 = e[0];
        formState.RestTime2 = e[1];
    }
    else {
        formState.RestTime = '';
    }
}
defineExpose({ isModal })
</script>
<style lang="less">
.ant-modal-content {
    padding: 0 !important;

    .ant-modal-header {
        border-bottom: 2px solid #e5e6eb;
        padding: 12px;
        font-size: 16px;
        color: #000;
        text-align: center;
    }

    .ant-modal-footer {
        border-top: 2px solid #e5e6eb;
        padding: 16px 20px;
        box-sizing: border-box;
    }

    .PinOnTop {
        .modalCenter {
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

            .processTitle .ant-form-item-required {
                color: red !important;
            }

            .ant-form-horizontal .ant-form-item-label {
                width: 90px !important;
                margin-top: 10px;
            }

            .ant-form-item .ant-form-item-control-input-content {
                flex: unset;
                line-height: 55px;
            }

            textarea.ant-input {
                width: 510px !important;
                display: inline-block;
            }

            .switchItem {
                position: relative;
                top: -4px;
            }

            .ant-form-item-control {
                justify-content: flex-start !important;
            }
        }
    }
}
</style>