<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>批量设置考勤</div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <div class="sectionTitle">基本信息</div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="人员" name="employeeIds" :rules="[{ required: true, message: '请选择人员'}]">
                                        <a-input disabled v-model:value="formState.employeeIds"></a-input>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="考勤类型" name="leaveType" :rules="[{ required: true, message: '请选择考勤类型'}]">
                                        <a-select v-model:value="formState.leaveType" @change="changeAttdType">
                                            <a-select-option v-for="(item, index) in attdTypes" :key="index" :value="item.code">{{item.name}}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item label="天数" name="leaveDays" :rules="[{ required: true, message: '请选择天数'}]">
                                        <a-select v-model:value="formState.leaveDays">
                                            <a-select-option value="1">1天</a-select-option>
                                            <a-select-option value="0.5">0.5天</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="开始日期" name="startDate" :rules="[{ required: true, message: '请选择开始日期'}]">
                                        <a-date-picker v-model:value="formState.startDate" valueFormat="YYYY-MM-DD" />
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item label="结束日期" name="endDate" :rules="[{ required: true, message: '请选择结束日期'}]">
                                        <a-date-picker v-model:value="formState.endDate" valueFormat="YYYY-MM-DD" />
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="包括周末和节假日" name="InCludeWeekendHoliday">
                                        <a-checkbox v-model:checked="formState.InCludeWeekendHoliday" disabled></a-checkbox>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="备注" name="description">
                                        <a-textarea v-model:value="formState.description" placeholder="" :rows="4" />
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
        empSelects: Array
    });
    const formRef = ref();
    const emit = defineEmits(["cancel"]);
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
        employeeIds: "",
        leaveDays: '1',
        startDate: startDate,
        endDate: endDate,
        description: '',
        InCludeWeekendHoliday:true,
    });
    data.height = document.documentElement.clientHeight - 300;
    if(props.empSelects.length){
        formState.employeeIds = props.empSelects.map(item=>item.Name).join(',');
        data.employeeId = props.empSelects.map(item=>item.EmployeeId).join(',');
    }
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });
    const getAttdTypes = (e, attribute, field) => {
        proxy.$get(Interface.attd.leavetypeList, {
                
        }).then((res) => {
            data.attdTypes = res.listData;
        });
    };
    getAttdTypes();

    const changeAttdType = (e) => {
        proxy.$get(Interface.attd.attdRule, {
            leaveTypes: e
        }).then(res=>{
            console.log('res',res);
        })
    };
    const handleSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log("values", formState, toRaw(formState));
                let d = {
                    leaveDays: formState.leaveDays,
                    startDate: formState.startDate,
                    endDate: formState.endDate,
                    description: formState.description,
                    InCludeWeekendHoliday: formState.InCludeWeekendHoliday,
                    employeeIds: formState.employeeIds,
                    leaveType: formState.leaveType,
                    employeeId: data.employeeId,
                    unitId: "",
                    objectTypeCode: 10,
                    isCustom: 1
                };
                proxy.$get(Interface.attd.batchAddAttd, d).then((res) => {
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