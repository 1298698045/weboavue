<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    调出人员
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter">
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item name="EmployeeId" label="姓名" :rules="[{ required: true, message: '请选择姓名' }]">
                                       <a-select disabled mode="multiple" v-model:value="formState.EmployeeId">
                                            <template #suffixIcon></template>
                                            <a-select-option v-for="(item, index) in search.EmployeeId" :key="index" :value="item.ID">{{item.Name}}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item name="TransferType" label="调出类型" :rules="[{ required: true, message: '请选择调出类型' }]">
                                        <a-select v-model:value="formState.TransferType">
                                            <a-select-option v-for="(item, index) in select.TransferType" :value="item.value">{{ item.label }}</a-select-option>
                                       </a-select>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item name="StartDate" label="调出日期" :rules="[{ required: true, message: '请选择调出日期' }]">
                                        <a-date-picker  v-model:value="formState.StartDate" valueFormat="YYYY-MM-DD" />
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item name="BusinessUnitId" label="调入科室" :rules="[{ required: true, message: '请选择调入科室' }]">
                                        <a-select v-model:value="formState.BusinessUnitId" allowClear :default-active-first-option="false" :filter-option="false" showSearch
                                         @dropdownVisibleChange="(e)=>{searchlookup(e, 10, 'BusinessUnitId')}">
                                            <template #suffixIcon></template>
                                            <a-select-option v-for="(item, index) in search.BusinessUnitId" :key="index" :value="item.ID">{{item.Name}}</a-select-option>
                                        </a-select>
                                        <div class="selectIcon">
                                            <SearchOutlined class="ant-select-suffix" @click="handleOpenLook(10, 'BusinessUnitId')" />
                                        </div>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item name="Description" label="调出原因">
                                        <a-textarea placeholder="请输入内容" :rows="4" v-model:value="formState.Description" />
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
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                </div>
            </template>
        </a-modal>
        <radio-dept :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" :localId="localId" />
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
    import { message } from "ant-design-vue";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import dayjs from 'dayjs';

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    console.log(document.documentElement.clientHeight);
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
        height: document.documentElement.clientHeight - 300,
        search: {
            EmployeeId: [],
            BusinessUnitId: []
        },
        select: {},
        isRadioDept: false,
        isRadioUser: false,
        localId: ""
    });
    const {
        height, search, select, isRadioDept, isRadioUser, localId
    } = toRefs(data);

    let startDate = dayjs(new Date).startOf('month').format('YYYY-MM-DD');

    const formState = reactive({
        EmployeeId: [],
        FromBusinessUnitId: { Id: '' },
        BusinessUnitId: "",
        TransferType: "49",
        StartDate: startDate,
        Description:""
    });
    
    const getDetail = () => {
        proxy.$get('/localData/attd/entity.detail.get.json', {
            ObjTypeCode: "30033"
        }).then(res=>{
            data.select = res.context.picklistValuesMap;
        })
    };
    getDetail();

    const searchlookup = (e, attribute, field) => {
        if(e){
            proxy.$get(Interface.uilook, {
                Lktp: 10020,
                Lksrch: search,
            })
            .then((res) => {
                let listData = res.listData;
                data.search[field] = listData;
                if(field=='EmployeeId'){
                    if(props.empSelects.length){
                        console.log("props.empSelects",props.empSelects);
                        formState.EmployeeId = props.empSelects.map(item=>item.Name);
                    }
                }
            });
        }
    };

    searchlookup(true, 30020, 'EmployeeId');
    searchlookup(true, 10, 'BusinessUnitId');
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });
    const handleOpenLook = (sObjectType, localId) => {
        data.localId = localId;
        if (sObjectType == 30020 || sObjectType==8) {
            data.isRadioUser = true;
        } else if (sObjectType == 10) {
            data.isRadioDept = true;
        }else {
            data.isLookup = true;
        }
    };
    const handleDeptParams = (params) => {
        console.log("userData", params);
        console.log("赋值字段", data.localId);
        data.isRadioDept = false;
        formState[data.localId] = params.ID;
        var isEmpty = data.search[data.localId].some((item) => item.ID == params.ID);
        if (!isEmpty) {
            data.search[data.localId].push({
                ID: params.ID,
                Name: params.Name,
            });
        }
    };
    const cancelDeptModal = () => {
        data.isRadioDept = false;
    }
    const handleSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log("values", formState, toRaw(formState));
                let d = {
                    yearNumber: "",
                    monthNumber: "",
                    objectTypeCode: 10,
                    unitId: "63a1820f-e332-4c71-bfb5-39677c7ecdd8",
                    outDate: formState.startDate,
                    Destition: formState.Destition,
                    employeeIds: props.empSelects.map(item=>item.EmployeeId).join(','),
                    FromDept: "",
                    ToDept: formState.BusinessUnitId,
                    BusinessUnitId: formState.BusinessUnitId
                };
                proxy.$get(Interface.attd.transferout, d).then((res) => {
                    formRef.value.resetFields();
                    message.success("保存成功！");
                    emit("cancel", false);
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