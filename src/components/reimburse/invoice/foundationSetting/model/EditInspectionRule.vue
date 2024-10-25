<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    编辑查验规则
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="formWrap">
                        <a-form :model="formState" :label-col="labelCol">
                            <div class="formRow">
                                <a-form-item label="查验频率" :rules="[{ required: true, message: '请选择查验频率!' }]">
                                    <a-select style="width: 100px;">
                                        <a-select-option value="每天">每天</a-select-option>
                                        <a-select-option value="每周">每周</a-select-option>
                                        <a-select-option value="每月">每月</a-select-option>
                                        <a-select-option value="每年">每年</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="formRow">
                                <div>
                                    <a-form-item label="开始日期" :rules="[{ required: true, message: '请选择开始日期!' }]">
                                        <a-date-picker v-model:value="value1" />
                                    </a-form-item>
                                    <div class="tips">如果设置开始日期是当天，则从次日开始生效，否则将从设定的日期开始执行查验规则
                                        查验时间
                                        请选择日期</div>
                                </div>
                            </div>
                            <div class="formRow">
                                <a-form-item label="查验时间" :rules="[{ required: true, message: '请选择开始日期!' }]">
                                    <a-time-picker v-model:value="value" />
                                </a-form-item>
                            </div>
                            <div class="formRow">
                                <a-form-item label="查验范围" :rules="[{ required: true, message: '请选择开始日期!' }]">
                                    <a-form-item label="发票类型">
                                        <a-select style="width: 260px;">
                                            <a-select-option value="增值税专用发票">增值税专用发票</a-select-option>
                                            <a-select-option value="增值税普通发票">增值税普通发票</a-select-option>
                                            <a-select-option value="增值税电子普通发票">增值税电子普通发票</a-select-option>
                                            <a-select-option value="增值税普通发票（卷票）">增值税普通发票（卷票）</a-select-option>
                                            <a-select-option value="增值税电子普通发票（通行费）">增值税电子普通发票（通行费）</a-select-option>
                                            <a-select-option value="机动车销售统一发票">机动车销售统一发票</a-select-option>
                                            <a-select-option value="二手车销售统一发票">二手车销售统一发票</a-select-option>
                                            <a-select-option value="增值税电子专用发票">增值税电子专用发票</a-select-option>
                                            <a-select-option value="电子发票（增值税专用发票）">电子发票（增值税专用发票）</a-select-option>
                                            <a-select-option value="电子发票（普通发票）">电子发票（普通发票）</a-select-option>


                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="查验状态">
                                        <a-select style="width: 260px;">
                                            <a-select-option value="有效已查验">有效已查验</a-select-option>
                                            <a-select-option value="有效">有效</a-select-option>
                                            <a-select-option value="未查验">未查验</a-select-option>
                                            <a-select-option value="查验失败">查验失败</a-select-option>
                                            <a-select-option value="无效">无效</a-select-option>
                                            <a-select-option value="校验失败">校验失败</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="报销状态">
                                        <a-select style="width: 260px;">
                                            <a-select-option value="未报销">未报销</a-select-option>
                                            <a-select-option value="报销中">报销中</a-select-option>
                                            <a-select-option value="已报销">已报销</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="价税合计">
                                        <a-input style="width: 260px;"></a-input>
                                    </a-form-item>
                                    <a-form-item label="开票日期" name="invoiceTime">
                                        <a-select v-model:value="formState.invoiceTime" style="width: 100px;margin-right: 10px;">
                                            <a-select-option value="当日">当日</a-select-option>
                                            <a-select-option value="自定义">自定义</a-select-option>
                                        </a-select>
                                        <span v-if="formState.invoiceTime=='自定义'">
                                            最近 <a-input-number v-model:value="value1" addon-after="天"></a-input-number>
                                        </span>
                                    </a-form-item>
                                    <a-form-item label="录入日期" name="entityTime">
                                        <a-select v-model:value="formState.entityTime" style="width: 100px;margin-right: 10px;">
                                            <a-select-option value="当日">当日</a-select-option>
                                            <a-select-option value="自定义">自定义</a-select-option>
                                        </a-select>
                                        <span v-if="formState.entityTime=='自定义'">
                                            最近 <a-input-number v-model:value="value1" addon-after="天"></a-input-number>
                                        </span>
                                    </a-form-item>
                                </a-form-item>
                            </div>
                        </a-form>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">保存</a-button>
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
    const labelCol = ref({ style: { width: '150px', textAlign: 'left'} });
    const props = defineProps({
        isShow: Boolean
    })
    import { message } from "ant-design-vue";

    const emit = defineEmits(['cancel']);
    const handleCancel = () => {
        emit("cancel", false);
    }
    const data = reactive({
        height: document.documentElement.clientHeight - 500,
        listData: [1, 2]
    })
    const { height, listData } = toRefs(data);
    const formState = reactive({
        name: "",
        invoiceTime: "",
        entityTime: ""
    })
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 500;
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
                    name: "visualEditor",
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
    .formWrap{
        margin: 10px 16px;
        height: calc(~"100% - 20px");
        border: 1px solid #e5e5e5;
        overflow: auto;
        .formRow{
            min-height: 50px;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            /* align-items: center; */
            padding-left: 20px;
            padding-top: 10px;
            .ant-form-item{
                margin-bottom: 0 !important;
            }
            .tips{
                font-size: 12px;
                color: #999;
                line-height: 30px;
                font-weight: 400;
                padding-left: 16px;
                height: 30px;
            }
            .ant-form-item{
                .ant-form-item{
                    margin-bottom: 10px !important;
                }
            }
        }
        .formRow:last-child{
            border-bottom: none;
        }
    }
</style>