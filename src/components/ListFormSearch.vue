<template>
    <div class="formSearch" ref="formSearchRef">
        <a-form ref="formRef" :model="formState" name="basic" autocomplete="off" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <!-- <a-form-item label="标题" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="发起人" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item> -->
            <div class="searchItem" v-for="(item,index) in searchFields" :key="index">
                <template v-if="index<4">
                    <a-form-item :name="item.column" :label="item.label" v-if="item.dataType=='S'||item.dataType=='X'">
                        <a-input class="radiusNone" :placeholder="item.label" v-model:value="formState[item.column]" />
                    </a-form-item>
                    <a-form-item :name="item.column" :label="item.label" v-if="item.dataType=='N'">
                        <a-input type="number" class="radiusNone" :placeholder="item.label" v-model:value="formState[item.column]" />
                    </a-form-item>
                    <!-- <a-form-item :name="item.column" :label="item.label" v-if="item.dataType=='N'">
                        <a-input-number v-model:value="formState[item.column]" :min="1" :max="100" />
                        <a-input-number v-model:value="formState[item.column]" :min="1" :max="100" />
                    </a-form-item> -->
                    <a-form-item :name="item.column" :label="item.label"
                        v-else-if="item.dataType=='L'||item.dataType=='LT'||item.dataType=='DT'||item.dataType=='status'||item.dataType=='Priority'">
                        <a-select v-model:value="formState[item.column]" :placeholder="item.label" @change="handleChange">
                            <!-- <a-select-option value="jack">Jack</a-select-option>
                            <a-select-option value="lucy">Lucy</a-select-option>
                            <a-select-option value="disabled" disabled>Disabled</a-select-option>
                            <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
                            <a-select-option v-for="(row, idx) in item.picklistValues" :key="idx" :value="row.value">{{ row.label }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item class="formTime" :name="item.column" :label="item.label" v-else-if="item.dataType=='F'||item.dataType=='D'">
                        <!--  v-if="item.dateTypeCurrent.value=='default'" v-model:value="formState[item.column]" -->
                        <a-range-picker style="border-right: none;" class="radiusNone" valueFormat="YYYY-MM-DD" :disabled="item.dateTypeCurrent&&item.dateTypeCurrent.value=='default'?false:true" @change="(e)=>{changeRangeDate(e,item)}" />
                        <a-dropdown class="radiusNone">
                            <template #overlay>
                            <a-menu>
                                <a-menu-item v-for="(row,idx) in timeoperator" :key="idx" @click="changeDateType(item,row)">
                                    {{row.label}}
                                </a-menu-item>
                            </a-menu>
                            </template>
                            <a-button class="downBtn">
                            {{item.dateTypeCurrent?item.dateTypeCurrent.label:'自定义'}}
                            <DownOutlined />
                            </a-button>
                        </a-dropdown>
                    </a-form-item>
                    <a-form-item class="searchItem" :name="item.column" :label="item.label" v-else-if="['O', 'Y', 'U', 'Y_MD'].includes(item.dataType)">
                        <a-select v-model:value="formState[item.column]" @dropdownVisibleChange="(e)=>{searchlookup(e, item)}">
                            <template #suffixIcon></template>
                            <a-select-option v-for="(row, idx) in search[item.column]" :key="idx" :value="row.value">{{ row.label }}</a-select-option>
                        </a-select>
                        <div class="selectSearchIcon" @click="handleOpenLook(item)">
                            <SearchOutlined class="lookupIcon" />
                        </div>
                    </a-form-item>
                </template>
            </div>
            <a-form-item class="formitembtn">
                <a-button type="primary"  class="radiusNone" html-type="submit">搜索</a-button>
                <a-button style="margin-left: 10px" class="radiusNone" @click="resetForm">重置</a-button>
            </a-form-item>
        </a-form>
        <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <radio-user v-if="isRadioUser" :isShow="isRadioUser" @cancel="cancelUserModal" @selectVal="handleUserParams"
            :localId="fieldName"></radio-user>
        <Lookup-filter v-if="isLookup" :isShow="isLookup" :entityApiName="entityApiName" :objectTypeCode="objectTypeCode"
        :field="fieldName" :lookEntityApiName="lookEntityApiName"  @cancel="isLookup=false;"></Lookup-filter>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, defineExpose, nextTick, defineProps, watch } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import moment from "moment";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import LookupFilter from "@/components/commonModal/LookupFilter.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const formState = reactive({
    });
    
    const props = defineProps({
        isCollapsed: false,
        SearchFields:[Array],
        objectTypeCode: [String, Number],
        entityApiName: {
            type: String,
            default: "HREmployee"
        }
    });
    watch(()=>props.isCollapsed,(newVal,oldVal)=>{
        nextTick(()=>{
            emit("update-height", formSearchRef.value.clientHeight);
        })
    }, {deep: true});
    // 搜索
    const onFinish = (values) => {
        console.log('Success:', values);
        var filterQuery = "";
        data.searchFields.forEach(item=>{
            if(values[item.column]!=''&&values[item.column]!='undefined'&&values[item.column]!=undefined){
                if(item.dataType=='F'||item.dataType=='D'){
                    if(item.dateTypeCurrent&&item.dateTypeCurrent.value=='default'){
                        if(values[item.column].length){
                            filterQuery += "\n" + item.column + "\tbetween\t" + values[item.column];
                        }
                    }else {
                        filterQuery += "\n" + item.column + "\t" + values[item.column];
                    }
                }else if(item.dataType=='S'||item.dataType=='X'){
                    filterQuery += "\n" + item.column + "\tcontains\t" + values[item.column];
                }else {
                    filterQuery += "\n" + item.column + "\teq\t" + values[item.column];
                }
            }
        })
        // console.log("filterQuery:", filterQuery);
        // emit("search", values);
        emit("search", filterQuery);
    };
    // 重置
    const resetForm = () => {
        formRef.value.resetFields();
        emit("search", "")
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const timeoperator = [{
        label: '今天',
        value: 'today',
    }, {
        label: '昨天',
        value: 'yesterday',
    }, {
        label: '明天',
        value: 'tomorrow',
    }, {
        label: '本周',
        value: 'this-week',
    }, {
        label: '本月',
        value: 'this-month',
    }, {
        label: '上月',
        value: 'last-month',
    }, {
        label: '下月',
        value: 'next-month',
    }, {
        label: '今年',
        value: 'this-year',
    }, {
        label: '去年',
        value: 'last-year',
    }, {
        label: '本月生日',
        value: 'birthday-this-month',
    },{
        label: '自定义',
        value: 'default',
    }]
    const data = reactive({
        searchFields: [],
        defaultSearchFields:[
            {
                "Name": "Title",
                "Label": "标题",
                "dataType": "S",
                "ReferencedEntityObjectTypeCode": 0,
                "PicklistValues": []
            },
            {
                "Name": "BusinessUnitId",
                "Label": "部门",
                "dataType": "O",
                "ReferencedEntityObjectTypeCode": 10,
                "PicklistValues": []
            },
            {
                "Name": "StatusCode",
                "Label": "状态",
                "dataType": "L",
                "ReferencedEntityObjectTypeCode": 100201,
                "PicklistValues": [
                {
                    "label": "草稿",
                    "value": "0"
                },
                {
                    "label": "已发布",
                    "value": "1"
                },
                {
                    "label": "审批未通过",
                    "value": "2"
                }
                ]
            },
            {
                "Name": "CreatedOn",
                "Label": "创建时间",
                "dataType": "F",
                "ReferencedEntityObjectTypeCode": 0,
                "PicklistValues": []
            }
        ],
        dateType: "default",
        dateText: "自定义",
        fieldName: "",
        isRadioUser: false,
        isRadioDept: false,
        isLookup: false,
        search: {},
        lookEntityApiName: ""
    })
    
    const { searchFields, dateType, dateText, isRadioUser, isRadioDept, isLookup, fieldName, search, lookEntityApiName } = toRefs(data);
    const formSearchRef = ref();
    const emit = defineEmits(['update-height', 'search'])
    const changeDateType = (item,row) => {
        console.log(item,row);
        item.dateTypeCurrent = row;
        if(row.value!='default'){
            formState[item.column] = row.value;
        }else {
            formState[item.column] = [];
        }
    }

    const changeRangeDate = (e,item) => {
        //console.log("e",e,item);
        if(e){
            formState[item.column]=e.join(',');
        }
        else{
            formState[item.column]='';
        }
    }
    const getSearchLayout = () => {
            if(props.SearchFields&&props.SearchFields.length){
                data.searchFields = props.SearchFields;
            }
            else{
                // data.searchFields = data.defaultSearchFields;
                let obj = {
                    actions: [{
                        id: "138;a",
                        descriptor: "",
                        callingDescriptor: "UNKNOWN",
                        params: {
                            targetApiName: props.entityApiName,
                            q: "",
                            searchType: "",
                            objectApiName: props.entityApiName,
                            fieldApiName: '',
                            body: "",
                        }
                    }]
                };
                let d = {
                    message: JSON.stringify(obj)
                };
                proxy.$post(Interface.lookupObj.column, d).then(res=>{
                    let { filterableColumns } = res.actions[0].returnValue;
                    filterableColumns.forEach(item=>{
                        // item.DataType=item.dataType;
                        // item.Label=item.label;
                        // item.Name=item.column;
                        // item.PicklistValues=item.picklistValues;
                        item.dateTypeCurrent={value:'default'};
                        item.ReferencedEntityObjectTypeCode=0;
                        formState[item.column] = "";
                    })
                    data.searchFields=filterableColumns;
                    emit("update-height", formSearchRef.value.clientHeight)
                })
            }
            nextTick(()=>{
                emit("update-height", formSearchRef.value.clientHeight);
            })
            data.searchFields.forEach(item => {
                formState[item.column] = "";
                if(item.dataType=='F'||item.dataType=='D'){
                    item.dateTypeCurrent = {
                        value: "default",
                        label: "自定义"
                    }
                    formState[item.column] = [];
                }else if(['O', 'Y', 'U', 'Y_MD'].includes(item.dataType)){
                    data.search[item.column] = [];
                }
            })
    }
    const handleChange = () => {

    }
    const changeDate = (e, item) => {
        let time = moment(e).format("YYYY-MM-DD");
        // console.log(e, item, time);
    }
    onMounted(() => {
        getSearchLayout();
    })
    defineExpose({ resetForm,getSearchLayout })

    const searchlookup = (e, item) => {
        console.log(e, item);
        let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: props.entityApiName,
                    fieldApiName: item.column,
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: item.targetApiName,
                    body: {
                        sourceRecord: {
                            apiName: props.entityApiName,
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
        proxy.$post(Interface.lookup, d).then((res) => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    value: item.fields.Id.value,
                    label: item.fields.Name.value
                })
            });
            data.search[item.column] = arr;
        });
    };

    const handleOpenLook = (item) => {
        console.log("item", item);
        data.fieldName = item.column;
        // let objTypeCode = item.ReferencedEntityObjectTypeCode;
        // if(objTypeCode==30020 || objTypeCode==8){
        //     data.isRadioUser = true;
        // }else if(objTypeCode==10){
        //     data.isRadioDept = true;
        // }else {
        //     data.isLookup = true;
        // }
        data.lookEntityApiName = item.targetApiName;
        if(item.targetApiName=='SystemUser'){
            data.isRadioUser = true;
        }else if(item.targetApiName == 'BusinessUnit'){
            data.isRadioDept = true;
        }else {
            data.isLookup = true;
        }
    };

    const cancelDeptModal = () => {
        data.isRadioDept = false;
    };
    const cancelUserModal = () => {
        data.isRadioUser = false;

    };
    const handleDeptParams = (e) => {
        //console.log('e123', e);
        if(data.search[data.fieldName]){}else{
            data.search[data.fieldName]=[];
        }
        let isBook = data.search[data.fieldName].some(item=>item.value == e.ID);
        if(!isBook){
            data.search[data.fieldName].push({
                label: e.Name,
                value: e.ID
            })
        }
        formState[data.fieldName] = e.ID;
        data.isRadioDept = false;
    };
    const handleUserParams = (e) => {
        //console.log('handleUserParams', e, data.fieldName);
        if(data.search[data.fieldName]){}else{
            data.search[data.fieldName]=[];
        }
        let isBook = data.search[data.fieldName].some(item=>item.value == e.id);
        if(!isBook){
            data.search[data.fieldName].push({
                label: e.name,
                value: e.id
            })
        }
        formState[data.fieldName] = e.id;
        data.isRadioUser = false;
    };
</script>
<style lang="less">
    .formSearch {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        /* background: #f7fbfe; */
        .ant-form {
            display: flex;
            flex-wrap: wrap;

            /* align-items: center; */
            .ant-form-item {
                width: 200px;
                margin-right: 10px;
                margin-bottom: 10px !important;

                .ant-form-item-control-input-content {
                    display: flex;
                }
                .ant-form-item-label{
                    label{
                        color: #666666 !important;
                    }
                }
            }

            .ant-form-item.formTime {
                width: auto;
                .ant-picker{
                    width: 200px;
                }
            }

            .ant-form-item.formitembtn {
                width: auto;
            }
            .downBtn{
                width: 80px;
                padding: 0;
            }
        }
    }
    .searchItem{
        position: relative;
        .selectSearchIcon{
            position: absolute;
            right: 5px;
            top: 5px;
            z-index: 99;
            cursor: pointer;
            .lookupIcon{
                color: rgba(0, 0, 0, 0.25);
            }
        }
    }
</style>
<style>
    .formSearch :where(.css-dev-only-do-not-override-kqecok).ant-select-single .ant-select-selector{
        border-radius: 0 !important;
    }
    .formSearch .ant-form .ant-form-item.formTime .ant-picker{
        width: 210px;
    }
    .formSearch :where(.css-dev-only-do-not-override-kqecok).ant-picker-range .ant-picker-range-separator{
        padding: 0 3px;
    }
    .formSearch :where(.css-dev-only-do-not-override-kqecok).ant-picker .ant-picker-input >input:placeholder-shown{
        text-align: center;
    }
</style>