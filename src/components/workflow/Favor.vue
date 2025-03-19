<template>
    <div>
        <a-modal v-model:open="props.isShow" width="600px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    收藏
                </div>
            </template>
            <div class="modalContainer Favor" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form ref="formRef" :label-col="labelCol" :model="formState">
                        <a-form-item label="收藏" name="IsFavorite">
                            <!-- <a-input type="checkbox" v-model:checked="formState.IsFavorite" class="switchItem"></a-input> -->
                            <a-switch v-model:checked="formState.IsFavorite" class="switchItem" />
                        </a-form-item>
                        <a-form-item label="备注：" name="Description" class="Description">
                            <a-textarea :rows="3" v-model:value="formState.Description" />
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
import { PieChartOutlined } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
    paramsData: Object,
    isShow: Boolean,
    id: String,
    objTypeCode: String,
    objName: String
});
let data = reactive({ top: 0, userId: '', id: '' })
const { top, id } = toRefs(data);
const isModal = ref(true);
const labelCol = ref({ style: { width: '100px' } });
const emit = defineEmits(['update-status']);

const handleSubmit = () => {
    let url = Interface.create;
    let d = {
        actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'FavoriteObject',
                    objTypeCode: '6060',
                    fields: {
                        Name: props.objName,
                        ObjectId: props.id,
                        ObjectTypeCode: props.objTypeCode,
                        Description: formState.Description || '',
                        CreatedBy: data.userId
                    }
                }
            }
        }]
    };
    if (data.id) {

        if (!formState.IsFavorite) {
            let obj = {
                actions: [{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: data.id,
                        apiName: 'FavoriteObject',
                        objTypeCode: '6060',
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            };
            proxy.$post(Interface.delete, d).then(res => {
                if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                    message.success("取消收藏成功");
                    handleCancel();
                } else {
                    if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                        message.success(res.actions[0].errorMessage);
                    }
                    else {
                        message.error("取消收藏失败");
                    }
                }
            })
            return
        }
        else {
            d.actions[0].params.recordId = data.id;
            url = Interface.edit;
        }
    }
    else{
        if (!formState.IsFavorite) {
            handleCancel();
            return
        }
    }
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
            message.success("收藏成功！");
            handleCancel();
        }
        else {
            if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
                message.success(res.actions[0].errorMessage);
            }
            else {
                message.success("收藏失败！");
            }
        }
        
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
    IsFavorite: true
})
const modelContentRef = ref(null);
const getData = () => {
    let filterQuery = '\nObjectId\teq\t' + props.id + '\nCreatedBy\teq\t' + data.userId;
    proxy.$post(Interface.list2, {
        filterId: '',
        objectTypeCode: '6060',
        entityName: '',
        filterQuery: filterQuery,
        search: '',
        page: 1,
        rows: 10,
        sort: 'CreatedOn',
        order: 'DESC',
        displayColumns: 'Name,Description'
    }).then(res => {
        if (res && res.nodes && res.nodes.length) {
            formState.IsFavorite = true;
            data.id = res.nodes[0].id;
            formState.Description = res.nodes[0].Description ? res.nodes[0].Description.value : '';
        } else {
            formState.IsFavorite = false;
            formState.Description = '';
        }
    })
}
onMounted(() => {
    //formState.ProcessName = props.paramsData.InstanceIdName;
    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        data.userId = userInfo.userId;
    }
    let h = modelContentRef.value.clientHeight;
    data.top = (h + 180) / 2 + 'px';
    getData();
})
const setTop = computed(() => ({
    top: `calc(50% - ${data.top})`
}));
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

    .Favor {
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
                width: 50px !important;
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