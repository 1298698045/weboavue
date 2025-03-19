<template>
    <div class="searchQuery">
        <div class="panelFilter">
            <div class="panelHeader">
                <div class="flex" style="align-items: center;">
                    <h2 class="panelTitle">高级搜索</h2>
                    <a-button type="link" @click="handleSetField">字段设置</a-button>
                </div>
                <div class="right-options">
                    <a-button class="ml10" @click="handleSave">搜索</a-button>
                    <a-button type="link" @click="handleCloseModal">
                        <CloseOutlined style="color:rgb(116, 116, 116)" />
                    </a-button>
                </div>
            </div>
            <div class="panelBody">
                <div class="search-form">
                    <a-form :model="list" ref="formRef" :label-col="labelCol" labelAlign="left">
                        <div class="form-item" v-for="(item, index) in filterableColumns" :key="index">
                            <a-form-item class="formItem" name="item.column" :label="item.label"
                                v-if="item.dataType=='S'">
                                <a-input :placeholder="'请输入'+item.label" v-model:value="list[item.column]"></a-input>
                            </a-form-item>
                            <a-form-item class="formItem" :label="item.label"
                                v-if="item.dataType=='L' || item.dataType=='LT' || item.dataType=='DT'">
                                <a-select :placeholder="'请选择'+item.label" mode="multiple"
                                    v-model:value="list[item.column]">
                                    <a-select-option v-for="(row, idx) in item.options" :key="idx"
                                        :value="row.value">{{row.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item class="formItem" :label="item.label" v-if="item.dataType=='D'">
                                <div class="time-box">
                                    <a-select :placeholder="'请选择'+item.label" v-model:value="list[item.column]">
                                        <a-select-option value="today">今天</a-select-option>
                                        <a-select-option value="yesterday">昨天</a-select-option>
                                        <a-select-option value="tomorrow">明天</a-select-option>
                                        <a-select-option value="this-week">本周</a-select-option>
                                        <a-select-option value="this-month">本月</a-select-option>
                                        <a-select-option value="last-month">上月</a-select-option>
                                        <a-select-option value="next-month">下月</a-select-option>
                                        <a-select-option value="this-year">今年</a-select-option>
                                        <a-select-option value="last-year">去年</a-select-option>
                                        <a-select-option value="birthday-this-month">本月生日</a-select-option>
                                        <a-select-option value="自定义">自定义</a-select-option>
                                    </a-select>
                                    <div class="date" v-if="list[item.column] == '自定义'">
                                        <a-range-picker v-model:value="item.timeValue" valueFormat="YYYY-MM-DD" />
                                    </div>
                                </div>
                            </a-form-item>
                            <a-form-item class="formItem" :label="item.label"
                                v-if="['O', 'Y', 'U', 'Y_MD'].includes(item.dataType)">
                                <a-select :placeholder="'请选择'+item.label" v-model:value="list[item.column]" allowClear
                                    :filter-option="filterOption" showSearch @search="(e)=>{searchlookup(e, item)}"
                                    @dropdownVisibleChange="(e)=>{searchlookup(e, item)}">

                                    <template #suffixIcon>
                                        <SearchOutlined style="color: #181818;" @click="handleOpenLook(item)">
                                        </SearchOutlined>
                                    </template>
                                    <a-select-option v-for="(row,idx) in search[item.column]" :key="idx" :value="row.ID"
                                        :label="row.Name">{{row.Name}}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                    </a-form>
                </div>
            </div>
        </div>
        <SetSearchField v-if="isSetSearchField && searchLayoutId!=''" :isShow="isSetSearchField"
            :sObjectName="sObjectName" :searchLayoutId="searchLayoutId" @cancel="isSetSearchField = false"
            @success="getSearchFilter"></SetSearchField>
        <Lookup-filter v-if="isLookup" :isShow="isLookup" :field="localId" :entityApiName="sObjectName"
            :lookEntityApiName="lookEntityApiName" :objectTypeCode="objectTypeCode" @cancel="isLookup=false"
            @select="handleSelectData"></Lookup-filter>

    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits, defineExpose } from "vue";
    import { CloseOutlined, SearchOutlined } from "@ant-design/icons-vue";
    import SetSearchField from "./SetSearchField.vue";
    import LookupFilter from "@/components/commonModal/LookupFilter.vue";
    
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        sObjectName: String,
        filterId: String
    });
    const emit = defineEmits(['cancel', 'load']);
    const formRef = ref(null);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const data = reactive({
        isSetSearchField: false,
        searchLayoutId: "",
        filterableColumns: [],
        list: {},
        filterCondition: {
            // sort: "1",
            // attribute: "CreatedBy",
            // column: "CreatedBy",
            // label: "创建人",
            // operator: "eq-userid",
            // logical: "等于",
            // picklistValues: [],
            // isEditable: false,
            // operands: [],
            // id: 1
        },
        attributes: [],
        search: {},
        isLookup: false,
        localId: "",
        lookEntityApiName: "",
        objectTypeCode: ""
    })
    const { isSetSearchField, searchLayoutId, filterableColumns, list, attributes, search, isLookup, localId, lookEntityApiName, objectTypeCode } = toRefs(data);

    const filterOption = (input, option) => {
        return option.label.toLowerCase().includes(input.toLowerCase());
    };

    const getAttributes = () => {
        proxy.$get(Interface.objFieldData, {
            entityApiName: props.sObjectName
        }).then(res => {
            data.attributes = res.attributes;
            getSearchFilter();
        })
    }
    getAttributes();

    const getPickerList = (name) => {
        let filterValues = [];
        let row = data.attributes.find(item => item.name == name);
        if (row) {
            filterValues = row.filterValues;
        }
        return filterValues;
    }

    const getSearchFilter = () => {
        let obj = {
            actions: [{
                id: "4105;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: props.sObjectName
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.listView.getSearchFilter, d).then(res => {
            let { filterableColumns, searchLayoutId } = res.actions[0].returnValue;
            data.filterableColumns = filterableColumns;
            data.searchLayoutId = searchLayoutId;
            filterableColumns.forEach(item => {
                data.list[item.column] = "";
                if (item.dataType == 'D') {
                    item.timeValue = [];
                }
                if (['L', 'LT', 'DT'].includes(item.dataType)) {
                    data.list[item.column] = [];
                    item.options = getPickerList(item.column);
                }
                if (['Y'].includes(item.dataType)) {
                    data.search[item.column] = [];
                }
            })
        })
    };

    const searchlookup = (search, item) => {
        let row = data.attributes.find(v => v.name == item.column);
        let targetApiName;
        let objectTypeCode;
        if (row) {
            targetApiName = row.referencedEntity.EntityName;
            objectTypeCode = row.referencedEntity.EntityObjectTypeCode;
        }
        let obj = {
            actions: [{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: props.sObjectName,
                    fieldApiName: item.column,
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: targetApiName,
                    body: {
                        sourceRecord: {
                            apiName: props.sObjectName,
                            fields: {
                                Id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup, d).then(res => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data.search[item.column] = arr;
        })
    }

    const handleOpenLook = (item) => {
        console.log(item);
        data.localId = item.column;
        let row = data.attributes.find(v => v.name == item.column);
        if (row) {
            data.lookEntityApiName = row.referencedEntity.EntityName;
            data.objectTypeCode = row.referencedEntity.EntityObjectTypeCode;
        }
        data.isLookup = true;
    };

    const handleSelectData = (e) => {
        console.log(e);
        data.isLookup = false;
        let localId = data.localId;
        let isExist = data.search[localId].some(item => item.ID == e.LIST_RECORD_ID);
        if (!isExist) {
            data.search[localId].push({
                ID: e.LIST_RECORD_ID,
                Name: e.Name
            })
        };
        data.list[localId] = e.LIST_RECORD_ID;
    };

    const handleSetField = () => {
        data.isSetSearchField = true;
    }

    const handleCloseModal = () => {
        emit("cancel", false);
    }
    const handleSave = () => {
        // let filterQuery = "";
        // for(let key in data.list){
        //     filterQuery += "\n"+key + "\teq\t" + data.list[key]
        // }
        // console.log("filterQuery", filterQuery);
        console.log('data.filterableColumns', data.filterableColumns);
        console.log('data.list', data.list);
        let filterCondition = [];
        data.filterableColumns.forEach((item, index) => {
            let sort = index + 1;
            let value = data.list[item.column];
            if (Array.isArray(value)) {
                value = value.join(',')
            }
            let operands = [value];
            if(value == ''){
                operands = [];
            }
            if (item.dataType == 'D' && value == '自定义') {
                console.log("timeValue", item.timeValue);
                if(item.timeValue.length){
                    let startDate = item.timeValue[0];
                    let endDate = item.timeValue[1] + ' 23:59:59';
                    let startObj = {
                        attribute: item.column,
                        column: item.column,
                        label: item.label,
                        operator: "ge",
                        logical: "AND",
                        picklistValues: [],
                        isEditable: false,
                        operands: [startDate]
                    }
                    let endObj = {
                        attribute: item.column,
                        column: item.column,
                        label: item.label,
                        operator: "le",
                        logical: "AND",
                        picklistValues: [],
                        isEditable: false,
                        operands: [endDate]
                    }
                    filterCondition.push(startObj);
                    filterCondition.push(endObj);
                }

            }else {
                let obj = {
                    attribute: item.column,
                    column: item.column,
                    label: item.label,
                    operator: "eq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: operands
                }
                if(operands.length > 0){
                    filterCondition.push(obj);
                }
            }
        });
        data.filterCondition = filterCondition;
        console.log("filterCondition", filterCondition);
        emit("load", filterCondition);
    };

</script>
<style lang="less" scoped>
    .searchQuery {
        width: 100%;
        height: 100%;
        position: relative;

        .panelFilter {
            height: 100%;

            .panelHeader {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px;
                background: #fff;
                border-bottom: 1px solid rgb(229, 229, 229);

                .panelTitle {
                    font-weight: inherit;
                    font-size: 16px;
                }
            }

            .panelBody {
                padding: 12px;
                background: #fff;
                height: calc(100% - 57px);
                font-size: 14px;
                overflow: auto;

                .time-box {
                    .date {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>
<style lang="less">
    :where(.css-dev-only-do-not-override-kqecok).ant-form-item {
        margin-bottom: 10px !important;
    }

    /* .search-form .ant-form-row {
        display: block !important;
    } */
</style>