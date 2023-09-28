<template>
    <div>
        <a-modal v-model:open="props.isShow" width="550px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    委派
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter">
                    <a-form
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <!-- <div class="form-tip">请输入流程事务标题，建立事务</div> -->
                        <a-form-item label="当前节点名称：" name="ProcessName">
                            <div class="ProcessName">{{ formState.ProcessName || '' }}</div>
                        </a-form-item>
                        <a-form-item name="BusinessUnitId" label="代理人：" :rules="[{ required: true, message: '请选择发起部门' }]">
                            <a-select v-model:value="formState.BusinessUnitId">
                                <a-select-option v-for="(item,index) in formState.BusinessUnitList" :key="index" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="通知代理人：" name="Description">
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
        BusinessUnitList: []
    })
    onMounted(()=>{
        formState.ProcessName = props.paramsData.InstanceIdName;
    })
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
        }
    }
}
</style>