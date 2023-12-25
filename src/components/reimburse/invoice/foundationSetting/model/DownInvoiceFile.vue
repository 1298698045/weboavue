<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    下载发票文件规则
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="nsd dlg">
                        <div class="nsdHeader">
                            <a-checkbox v-model:checked="checked">全选</a-checkbox>
                            <div class="op-bar">
                                <div class="btn del"> × </div>
                                <div class="btn"> + </div>
                            </div>
                        </div>
                        <ul class="nsdContent">
                            <draggable :list="listData" group="people" itemKey="list">
                                <template #item="{ element, index }">
                                    <li class="name-rule-item">
                                        <a-checkbox class="item check"
                                            v-model:checked="checked">{{element}}</a-checkbox>
                                        <HolderOutlined class="item move" />
                                        <a-select class="item">
                                            <a-select-option value="表单字段">表单字段</a-select-option>
                                            <a-select-option value="固定字段">固定字段</a-select-option>
                                        </a-select>
                                        <a-select class="item">
                                            <a-select-option value="表单字段">表单字段</a-select-option>
                                            <a-select-option value="固定字段">固定字段</a-select-option>
                                        </a-select>
                                    </li>
                                </template>
                            </draggable>
                        </ul>
                    </div>
                    <div class="nsd-browser">
                        <div class="nsd-dlg-browser-title">预览</div>
                        <table class="browserTable">
                            <colgroup>
                                <col width="120">
                                <col width="554">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>表单字段</th>
                                    <th>表单字段</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>发票类型</td>
                                    <td>开票日期</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <!-- <a-button @click="handleCancel">取消</a-button> -->
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
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
    const labelCol = ref({ style: { width: '100px' } });
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

    .nsd {
        background: #fff;
        border: 1px solid #e5e5e5;
        margin-bottom: 20px;
        margin: 30px;

        .nsdHeader {
            padding: 16px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;

            .op-bar {
                .btn {
                    display: inline-block;
                    color: #85b4f1;
                    border: 1px solid #85b4f1;
                    width: 16px;
                    height: 16px;
                    text-align: center;
                    margin-left: 10px;
                    line-height: 16px;
                }
            }
        }

        .nsdContent {
            .name-rule-item {
                padding: 8px 16px;
                border-top: 1px solid #e5e5e5;
                display: flex;
                flex-flow: row nowrap;

                .item {
                    margin-right: 10px;
                    line-height: 30px;
                }

                .item.check {
                    min-width: 42px;
                }

                .ant-select {
                    width: 140px;
                }

                .ant-select {
                    margin-right: 120px;
                }

                .item.move {
                    cursor: move;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }
    }

    .nsd-browser {
        background: #fff;
        border: 1px solid #e5e5e5;
        margin: 30px;

        .nsd-dlg-browser-title {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #111;
            line-height: 14px;
            font-weight: 500;
            margin: 20px;
        }

        .browserTable {
            width: 100%;
            border-collapse: collapse;
            thead {
                tr {
                    color: #909399;
                    font-weight: 500;
                    background: #f4f4f4;
                    th{
                        height: 47px;
                        padding: 0 10px;
                        text-align: left;
                    }
                }
            }

            td {
                height: 47px;
                padding: 0 10px;
            }
        }
    }
</style>