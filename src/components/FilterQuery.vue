<template>
    <div class="filterWrap">
        <p class="label">查询条件</p>
        <div class="filterList">
            <div class="fileterRow" v-for="(filter,filterIdx) in filterList" :key="filterIdx">
                <a-form>
                    <a-form-item class="formItem" label="逻辑运算符">
                        <a-select v-model:value="filter.logical" placeholder="请选择逻辑运算符">
                            <a-select-option value="AND">与</a-select-option>
                            <a-select-option value="OR">或</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item class="formItem" label="字段">
                        <a-select v-model:value="filter.field" placeholder="请选择字段"
                            @change="(e)=>changeField(e, filter, item)">
                            <a-select-option v-for="(field,fieldIdx) in attributes"
                                :value="field.fieldName">{{field.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item class="formItem" label="运算符">
                        <a-select v-model:value="filter.operator" placeholder="请选择运算符">
                            <a-select-option v-for="(row,rowIdx) in filter.operatorList"
                                :value="row.operator">{{row.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item class="formItem" label="值">
                        <div v-if="filter.dType=='DateTime'">
                            <a-date-picker v-model:value="filter.value" />
                        </div>
                        <div v-else-if="filter.dType=='Numeric'">
                            <a-input type="Number" v-model:value="filter.value"></a-input>
                        </div>
                        <div v-else-if="filter.dType=='Picklist'||filter.dType=='L'">
                            <a-select mode="multiple" v-model:value="filter.value" placeholder="请选择">
                                <a-select-option v-for="v in filter.options" :key="v.value" :value="v.value">
                                    {{v.label}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div v-else-if="filter.dType=='BusinessUnit'" style="position: relative;">
                            <a-select allowClear v-model:value="filter.value" placeholder="请选择"
                                :default-active-first-option="false" :filter-option="false" showSearch
                                @search="e=>searchlookup(filter, e)"
                                @dropdownVisibleChange="e=>searchlookup(filter, '')">
                                <template #suffixIcon></template>
                                <a-select-option v-for="v in filter.options" :key="v.ID" :value="v.ID">{{ v.Name
                                    }}</a-select-option>
                            </a-select>
                            <i class="iconfont icon-sousuo pointer"
                                @click="handleOpenLook(filter, filterIdx)"></i>
                        </div>
                        <div v-else>
                            <a-input v-model:value="filter.value"></a-input>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <div>
            <a-button :icon="h(PlusOutlined)" @click="handleAddFilter"></a-button>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, h, computed } from "vue";
        import {
        EllipsisOutlined, PlusOutlined
    } from "@ant-design/icons-vue";
    const emit = defineEmits(['params']);
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        attributes: [],
        objectCodeList: [],
        jsonFilter: [],
        filterList: [{
            operator: "",
            field: "",
            logical: "",
            operatorList: [],
            operatorType: "",
            dType: "",
            value: "",
            label: "",
            Lktp: "",
            options: [],
            deptText: ""
        }],
        isRadioDept: false,
        filterExpression: [],
        filterIdx: '', // 记录筛选器下标
    });
    const { attributes, objectCodeList, filterExpression, jsonFilter, filterList, isRadioDept, filterIdx } = toRefs(data);
    const getConfig = () => {
        proxy.$get(Interface.design.attrs, {
            objTypeCode: ""
        }).then(res => {
            data.attributes = res.attributes;
        });
    }
    getConfig();
    watch(()=>data.filterList,(newVal,oldVal)=>{
        console.log("newVal",newVal)
        let result = [];
        if (newVal && newVal.length > 0) {
            newVal.forEach(function (v) {
                let value = v.value;
                if (!Array.isArray(v.value)) {
                    value = [v.value];
                }
                result.push({
                    logical: v.logical,
                    attribute: v.field,
                    label: v.label,
                    operator: v.operator,
                    operands: value,
                    column: v.field
                });
            });
        }
        let filterExpression = JSON.stringify(result);
        console.log("filterExpression",filterExpression);
        data.filterExpression = filterExpression;
        emit("params", filterExpression);
    },{deep: true, immediate: true})
    const getLook = () => {
        proxy.$get(Interface.design.look, {
            Lktp: 100000
        }).then(res => {
            data.objectCodeList = res.listData;
        })
    }
    getLook();
    // 查询条件-搜索
    const searchlookup = (filter, searchVal) => {
        console.log("filter", filter);
        var res = getEntityLookup(filter.Lktp || 10, searchVal);
        res.then(response => {
            filter.options = response.listData;
        })
    }
    const handleOpenLook = (filter, filterIdx) => {
        data.filterIdx = filterIdx;
        if (filter.Lktp == 8) {

        } else {
            data.isRadioDept = true;
        }
    }
    // 关闭单选部门弹窗
    const cancelDeptModal = (e) => {
        data.isRadioDept = e;
    }
    const handleDeptParams = (params) => {
        console.log("params", params);
        let index = data.filterList[data.filterIdx].options.findIndex(item => params.ID == item.ID);
        if (index == -1) {
            data.filterList[data.filterIdx].options.push(params);
        }
        data.filterList[data.filterIdx].value = params.ID;
        data.isRadioDept = false;
    }
    // 添加查询条件
    const handleAddFilter = () => {
        var obj = Object.assign({}, data.filterList[0]);
        Object.keys(obj).forEach(function (key) {
            obj[key] = '';
        });
        data.filterList.push(obj);
    }
    const getOperator = (field, item) => {
        console.log(field, item, '123123');
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.operator || '';
    }
    const getDType = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.dType || '';
    }
    const getOperatorType = (operator, list) => {
        if (list) {
            var row = list.find(function (v) {
                return v.operator == operator;
            });
            return row.operatorType;
        } else {
            return '';
        }
    }
    const getLktp = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.referencedEntityObjectTypeCode || '';
    }
    const getEntityLookup = async (Lktp, lksrch) => {
        var response;
        var d = {
            Lktp: Lktp,
            lksrch: lksrch
        }
        await proxy.$get(Interface.design.look, {}).then(res => {
            response = res;
        })
        return response;
    }
    const getFilterValues = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.filterValues || [];
    }
    const changeField = (e, item, parentItem) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == e;
        });
        item.field = e;
        item.dType = row.dType;
        item.operatorList = row.operator;
        item.label = row.label;
        item.Lktp = row.referencedEntityObjectTypeCode;
        item.options = row.filterValues;
        item.condition = '';
        item.value = '';
    }
</script>
<style lang="less" scoped>
    .formItem {
        margin-bottom: 10px;

        :deep .ant-row {
            display: block !important;
        }
    }

    .formRow {
        display: flex;

        .formItem {
            flex: 1;
        }
    }
    .filterWrap {
        .ant-form {
            display: flex;

            .formItem {
                flex: 1;
                margin-right: 5px;
            }

            .formItem:last-child {
                margin-right: 0;
            }
        }
    }

    .icon-sousuo {
        position: absolute;
        top: 3px;
        right: 10px;
        cursor: pointer;
    }
</style>