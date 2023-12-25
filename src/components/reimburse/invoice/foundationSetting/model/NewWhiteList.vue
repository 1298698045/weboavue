<template>
    <div>
        <a-modal v-model:open="props.isShow" width="600px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    新建白名单
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <a-form :model="formState" :label-col="labelCol">
                        <a-form-item label="校验内容">
                            <a-select placeholder="抬头*税号">
                                <a-select-option value="表单字段">表单字段</a-select-option>
                                <a-select-option value="固定字段">固定字段</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="发票类型">
                            <a-select placeholder="请选择">
                                <a-select-option value="表单字段">表单字段</a-select-option>
                                <a-select-option value="固定字段">固定字段</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="特殊字符忽略">
                            <a-switch />
                        </a-form-item>
                        <a-form-item label="企业名称">
                            <a-input placeholder="请输入"></a-input>
                        </a-form-item>
                        <a-form-item label="税号">
                            <a-input placeholder="请输入"></a-input>
                        </a-form-item>
                        <a-form-item label="生效开始时间">
                            <a-date-picker show-time placeholder="请选择日期" @change="onChange" @ok="onOk" />
                        </a-form-item>
                        <a-form-item label="生效结束时间">
                            <a-date-picker show-time placeholder="请选择日期" @change="onChange" @ok="onOk" />
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
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, toRaw
    } from "vue";
    import { SearchOutlined, DownOutlined, UserOutlined, HolderOutlined } from "@ant-design/icons-vue";
    import draggable from 'vuedraggable';
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const formRef = ref();
    const labelCol = ref({ style: { width: '150px', textAlign: 'left' } });
    const props = defineProps({
        isShow: Boolean
    })
    import { message } from "ant-design-vue";

    const emit = defineEmits(['cancel']);
    const handleCancel = () => {
        emit("cancel", false);
    }
    const data = reactive({
        height: document.documentElement.clientHeight - 300,
        listData: [1, 2]
    })
    const { height, listData } = toRefs(data);
    const formState = reactive({
        name: ""
    })
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });
    const handleSubmit = () => {
        formRef.value.validate().then(() => {
            console.log('values', formState, toRaw(formState));
            var obj = {
                params: {
                    recordRep: {
                        objTypeCode: 100201,
                        fields: {
                            ContentTypeCode: 1,
                            Title: formState.name,
                            FolderId: {
                                Id: formState.column
                            }
                        }
                    }
                }
            }
            let messages = JSON.stringify(obj);
            proxy.$get(Interface.saveRecord, {
                message: messages
            }).then(res => {
                message.success("保存成功！");
                emit("cancel", false);
                let url = router.resolve({
                    name: "InformationEditor",
                    query: {
                        id: 123,
                        objectTypeCode: 100201,
                        FolderId: "123131313"
                    }
                })
                window.open(url.href);
            })
        }).catch(error => {
            console.log('error', error);
        });
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .ant-radio-wrapper {
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .ant-form{
        margin: 30px;
    }
</style>