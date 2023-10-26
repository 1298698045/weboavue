<template>
    <div>
        <a-form :model="formState" ref="formRef">
            <div class="section" v-for="(item, index) in layoutList" :key="index">
                <div class="sectionTitle">{{ item.title }}</div>
                <div class="sectionRow" v-for="(row, idx) in item.rows" :key="idx">
                    <div class="sectionItem" v-for="(attribute, attributeIdx) in row.attributes" :key="attributeIdx">
                        <a-form-item :name="attribute.targetValue"
                            v-if="['L', 'LT', 'DT'].includes(attribute.attributes.type)" :label="attribute.label"
                            :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]">
                            <a-select allowClear v-model:value="formState[attribute.targetValue]"
                                :placeholder="'请选择' + attribute.label">
                                <a-select-option v-for="(option, optionIdx) in select[
                          attribute.targetValue
                        ] && select[attribute.targetValue].values" :key="optionIdx" :value="option.value">{{
                                    option.label }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :name="attribute.targetValue" v-else-if="
                      ['O', 'Y', 'U', 'Y_MD'].includes(
                        attribute.attributes.type
                      )
                    " :label="attribute.label" :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]">
                            <a-select allowClear v-model:value="formState[attribute.targetValue].Id"
                                :default-active-first-option="false" :filter-option="false" showSearch @search="
                        (e) => {
                          searchlookup(e, attribute);
                        }
                      " @dropdownVisibleChange="
                        (e) => {
                          searchlookup('', attribute);
                        }
                      " :placeholder="'请选择' + attribute.label">
                                <template #suffixIcon></template>
                                <a-select-option v-for="(option, optionIdx) in search[
                          attribute.targetValue
                        ]" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                            </a-select>
                            <div class="selectIcon">
                                <SearchOutlined class="ant-select-suffix" @click="handleOpenLook(attribute)" />
                            </div>
                            <!-- <a-button @click="handleOpenLook(attribute)">搜索</a-button> -->
                        </a-form-item>
                        <a-form-item :name="attribute.targetValue" v-else-if="attribute.attributes.type == 'D'"
                            :label="attribute.label" :rules="[
                            {
                              required: attribute.attributes.required,
                              message: '请选择' + attribute.label,
                            },
                          ]">
                            <a-date-picker valueFormat="YYYY-MM-DD" :placeholder="'请选择' + attribute.label"
                                v-model:value="formState[attribute.targetValue]" />
                        </a-form-item>
                        <a-form-item :name="attribute.targetValue" v-else-if="attribute.attributes.type == 'X'"
                            :label="attribute.label" :rules="[
                            {
                              required: attribute.attributes.required,
                              message: '请输入' + attribute.label,
                            },
                          ]">
                            <a-textarea :rows="4" v-model:value="formState[attribute.targetValue]" />
                        </a-form-item>
                        <a-form-item :name="attribute.targetValue" v-else :label="attribute.label" :rules="[
                        {
                          required: attribute.attributes.required,
                          message: '请输入' + attribute.label,
                        },
                      ]">
                            <a-input v-model:value="formState[attribute.targetValue]"></a-input>
                        </a-form-item>
                    </div>
                </div>
            </div>
        </a-form>
        <!-- <TEditor /> -->
        <radio-dept :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <multiple-dept :isShow="isMultipleDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <radio-user :isShow="isRadioUser" @cancel="cancelUserModal" @selectVal="handleUserParams"
            :localId="localId"></radio-user>
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
    import MultipleDept from "@/components/commonModal/MultipleDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import MultipleUser from "@/components/commonModal/MultipleUser.vue";
    import { message } from "ant-design-vue";

    import TEditor from "@/components/TEditor.vue";

    const getContent = (v) => {
        formState.contents = v;
    };
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    console.log(document.documentElement.clientHeight);
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
        title: "新建部门变动",
        layoutList: [],
        list: {},
        select: {},
        search: {},
        height: document.documentElement.clientHeight - 300,
        isRadioDept: false,
        isMultipleDept: false,
        isRadioUser: false,
        localId: "",
        isMultipleUser: true,
    });
    const {
        title,
        layoutList,
        list,
        select,
        search,
        height,
        isRadioDept,
        isRadioUser,
        isMultipleDept,
        localId,
        isMultipleUser,
    } = toRefs(data);
    const formState = reactive({});

    const getConfig = () => {
        proxy.$get(Interface.meeting.config, {}).then((res) => {
            let picklistValuesMap = res.context.picklistValuesMap;
            
            let componentDef = res.actions[0].returnValue.componentDef;
            data.layoutList = componentDef.sections;
            let record = res.actions[0].returnValue.record;
            data.list = JSON.parse(JSON.stringify(record));
            componentDef.lookupAttributes.forEach((item) => {
                data.search[item.name] = [
                    { ID: data.list[item.name].Id, Name: data.list[item.name].Name },
                ];
                data.list[item.name] = {
                    Id: data.list[item.name].Id,
                    Name: data.list[item.name].Name,
                };
            });
            console.log("data.search", data.search);
            for (var key in data.list) {
                formState[key] = data.list[key];
            }
            console.log("formState", formState);
            // data.layoutList.forEach(item=>{
            //     item.rows.forEach(row=>{
            //         row.attributes.forEach(col=>{
            //             if(col.attributes.type=='L'){
            //                 data.select[col.localId] = {
            //                     values: picklistValuesMap[col.localId]
            //                 };
            //                 console.log("data.select[col.localId]", data.select[col.localId])
            //             }
            //         })
            //     })
            // })
        });
    };
    getConfig();
    const getPickerList = () => {
        proxy.$get(Interface.picklist, {}).then((res) => {
            data.select = res.actions[0].returnValue.picklistFieldValues;
        });
    };
    getPickerList();

    const searchlookup = (search, attribute) => {
        console.log(search, attribute);
        proxy
            .$get(Interface.uilook, {
                Lktp: attribute.attributes.sObjectType,
                Lksrch: search,
            })
            .then((res) => {
                let listData = res.listData;
                data.search[attribute.targetValue] = listData;
            });
    };

    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });

    const cancelDeptModal = (params) => {
        data.isRadioDept = params;
        data.isMultipleDept = params;
    };
    // 弹框选中部门
    const handleDeptParams = (params) => {
        console.log("deptData", params);
        data.isRadioDept = false;
        data.isMultipleDept = false;
        // 单选部门赋值
        var isEmpty = data.search[data.localId].some((item) => item.ID == params.ID);
        if (!isEmpty) {
            data.search[data.localId].push({
                ID: params.ID,
                Name: params.Name,
            });
        }
        formState[data.localId].Id = params.ID;
    };

    const cancelUserModal = (params) => {
        data.isRadioUser = params;
    };
    // 关闭用户多选弹窗
    const cancelMuUserModal = (params) => {
        data.isMultipleUser = params;
    };
    const handleUserParams = (params) => {
        console.log("userData", params);
        console.log("赋值字段", data.localId);
        data.isRadioUser = false;
        formState[data.localId].Id = params.id;
        var isEmpty = data.search[data.localId].some((item) => item.ID == params.id);
        if (!isEmpty) {
            data.search[data.localId].push({
                ID: params.id,
                Name: params.name,
            });
        }
    };
    // 多选用户
    const handleMuUserParams = (params) => { };
    // 查找类型打开弹窗
    const handleOpenLook = (attribute) => {
        let localId = attribute.localId;
        data.localId = localId;
        let sObjectType = attribute.attributes.sObjectType;
        if (sObjectType == 30020) {
            data.isRadioUser = true;
        } else if (sObjectType == 10) {
            data.isRadioDept = true;
        }
    };

    const handleSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log("values", formState, toRaw(formState));
                let obj = {
                    params: {
                        objTypeCode: 30027,
                        fields: formState,
                        id: "",
                    },
                };
                var messages = JSON.stringify(obj);
                proxy.$get(Interface.saveRecord, { message: messages }).then((res) => {
                    message.warning("保存成功！");
                    emit("cancel", false);
                });
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
</script>
<style lang="less">
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

    :where(.css-dev-only-do-not-override-kqecok).ant-picker {
        width: 100%;
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