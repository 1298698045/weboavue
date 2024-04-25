<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>备注</div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <div class="sectionTitle">考勤信息</div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="部门" name="unitId" :rules="[{ required: true, message: '请选择人员'}]">
                                        <a-input disabled v-model:value="formState.unitId"></a-input>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="年份" name="YearNumber" :rules="[{ required: true, message: '请选择开始日期'}]">
                                        <a-input disabled v-model:value="formState.YearNumber"></a-input>
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item label="月份" name="MonthNumber" :rules="[{ required: true, message: '请选择结束日期'}]">
                                        <a-input disabled v-model:value="formState.MonthNumber"></a-input>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="备注" name="Description">
                                        <a-textarea v-model:value="formState.Description" placeholder="" :rows="4" />
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="留言" name="LeaveMessage">
                                        <a-textarea v-model:value="formState.LeaveMessage" placeholder="" :rows="4" />
                                    </a-form-item>
                                </div>
                            </div>
                        </div>
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
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        toRaw,
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import dayjs from 'dayjs';

    import { message } from "ant-design-vue";
    import { useStore } from "vuex";
    let store = useStore();
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        unitId: Object,
        yearNumber: [String, Number],
        monthNumber: [String, Number],
    });
    const formRef = ref();
    const emit = defineEmits(["cancel","writesave"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        height: "",
        attdTypes: [],
        employeeId: ""
    });
    let startDate = dayjs(new Date).startOf('month').format('YYYY-MM-DD');
    let endDate = dayjs(new Date).endOf('month').format('YYYY-MM-DD');
    const { height, attdTypes, employeeId } = toRefs(data);
    const formState = reactive({
        unitId: "",
        YearNumber: "",
        MonthNumber: "",
        Description: "",
        LeaveMessage: ""
    });
    data.height = document.documentElement.clientHeight - 300;
    formState.YearNumber = props.yearNumber;
    formState.MonthNumber = props.monthNumber;
    formState.unitId = props.unitId.name;
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });
    
    const handleSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log("values", formState, toRaw(formState));
                let d = {
                    objectTypeCode: 10,
                    YearNumber: formState.YearNumber,
                    MonthNumber: formState.MonthNumber,
                    Description: formState.Description,
                    LeaveMessage: formState.LeaveMessage,
                    unitId: props.unitId.id
                };
                proxy.$get(Interface.attd.remarksAttd, d).then((res) => {
                    message.success("保存成功！");
                    emit("cancel", false);
                    formRef.value.resetFields();
                });
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
</script>
<style lang="less">
    @import url("@/style/modal.less");


    .section {
        .sectionTitle {
            height: 30px;
            background-color: rgb(243, 242, 242);
            line-height: 30px;
            border-radius: 4px;
            padding-left: 15px;
            margin-bottom: 12px;
            /* margin: 2rem 2rem 0.5rem 2rem; */
        }

        .sectionRow {
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;

            .sectionItem {
                flex: 1;
                margin-right: 20px;

                .ant-row {
                    display: block !important;
                }
            }

            .sectionItem:last-child {
                margin-right: 0;
            }
        }
    }


    .ant-form-item {
        position: relative;
    }

    .selectIcon {
        position: absolute;
        right: 10px;
        top: 5px;
    }
</style>
<style scoped>
    :where(.css-dev-only-do-not-override-kqecok).ant-picker {
        width: 100%;
    }
</style>