<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    重命名
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form :model="formState">
                        <a-form-item label="名称" :rules="[{ required: true, message: '请输入列表名称!' }]">
                            <a-input v-model:value="formState.name" />
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, computed
    } from "vue";
    import { SearchOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName: String,
        objTypeCode: String,
        id: String,
        name: String,
        fieldName: String
    })
    const emit = defineEmits(['cancel', 'success']);
    const modelContentRef = ref(null);

    const data = reactive({
        listData: [],
        top: ""
    })
    const { listData, top } = toRefs(data);
    const formState = reactive({
        name: ""
    });
    console.log(props)
    if(props.name){
        formState.name = props.name;
    }
    const handleSearch = (val) => {
        console.log('val', val);
        getPeople(val)
    }
    const handleChange = (e) => {
    }
    onMounted(() => {
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: data.top
    }));


    const handleCancel = () => {
        emit("cancel", false);
    }
    const handleSubmit = () => {
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: props.sObjectName,
                        objTypeCode: props.objTypeCode,
                        fields: {
                            [props.fieldName]: formState.name
                        }
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.edit, d).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                emit("success", false);
                message.success("重命名成功");
            }
            else {
                if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                    message.error(res.actions[0].errorMessage);
                }
                else {
                    message.error("重命名失败");
                }
            }
            setTimeout(function () {
                emit("cancel", false);
            }, 100)
        })
    }

</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .modalCenter {
        height: auto !important;
    }
</style>