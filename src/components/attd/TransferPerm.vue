<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>选择被转移人</div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <div class="sectionTitle">基本信息</div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="姓名" name="EmployeeId" :rules="[{ required: true, message: '请选择姓名'}]">
                                        <a-select v-model:value="formState.EmployeeId" allowClear :default-active-first-option="false" :filter-option="false" showSearch
                                         @dropdownVisibleChange="(e)=>{searchlookup(e, 30020, 'EmployeeId')}" @change="changeEmployee">
                                            <template #suffixIcon></template>
                                            <a-select-option v-for="(item, index) in search.EmployeeId" :key="index" :value="item.ID">{{item.Name}}</a-select-option>
                                        </a-select>
                                        <div class="selectIcon">
                                            <SearchOutlined class="ant-select-suffix" @click="handleOpenLook(30020, 'EmployeeId')" />
                                        </div>
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item label="隶属部门" name="BusinessUnitId" :rules="[{ required: true, message: '请选择隶属部门'}]">
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
        <radio-dept :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <radio-user :isShow="isRadioUser" @cancel="cancelUserModal" @selectVal="handleUserParams" :localId="localId"></radio-user>
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
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import { message } from "ant-design-vue";
    import { useStore } from "vuex";
    let store = useStore();
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
    });
    const formRef = ref();
    const emit = defineEmits(["cancel"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        height: '',
        search: {
            EmployeeId: [],
            BusinessUnitId: []
        },
        isRadioDept: false,
        isRadioUser: false,
        localId: ""
    });
    const { height, search, isRadioDept, isRadioUser, localId } = toRefs(data);
    const formState = reactive({
        EmployeeId: "",
        BusinessUnitId: ""
    });
    // data.height = document.documentElement.clientHeight - 300;
    onMounted(() => {
        // window.addEventListener("resize", (e) => {
        //     data.height = document.documentElement.clientHeight - 300;
        // });
    });
    const searchlookup = (e, attribute, field) => {
        console.log(e);
        if(e){
            proxy.$get(Interface.uilook, {
                Lktp: 10020,
                Lksrch: search,
            })
            .then((res) => {
                let listData = res.listData;
                data.search[field] = listData;
            });
        }
    };
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
    const handleUserParams = (params) => {
        console.log("userData", params);
        console.log("赋值字段", data.localId);
        data.isRadioUser = false;
        formState[data.localId] = params.id;
        var isEmpty = data.search[data.localId].some((item) => item.ID == params.id);
        if (!isEmpty) {
            data.search[data.localId].push({
                ID: params.id,
                Name: params.name,
            });
        }
    };
    const changeEmployee = (e) => {
        proxy.$get(Interface.detail, {
            id: e,
            ObjTypeCode: 30020
        }).then(res=>{

        })
    };
    const handleSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log("values", formState, toRaw(formState));
                let d = {
                    EmployeeId: formState.EmployeeId,
                    BusinessUnitId: formState.BusinessUnitId
                };
                proxy.$get(Interface.attd.empChange, d).then((res) => {
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