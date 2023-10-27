<template>
    <div>
        <div class="headerOption">
            <a-button class="ml10" :icon="h(PlusOutlined)" @click="handleAddRow"></a-button>
            <a-button class="ml10" :icon="h(DeleteOutlined)" @click="handleDeleteRow"></a-button>
            <a-button class="ml10" :icon="h(CopyOutlined)" @click="handleCopyRow"></a-button>
        </div>
        <a-table :row-selection="rowSelection" :scroll="{ x: '1400px' | true }"  :columns="columns" :data-source="dataList" :pagination="false">
            <template #bodyCell="{ column, record, index }">
                <template v-if="column.dType === 'S'">
                    <a-input style="width: 150px;" v-model:value="dataList[index][column.dataIndex]" @change="(e)=>handleInp(e,record, column, index)"></a-input>
                </template>
                <template v-else-if="column.dType === 'N'">
                    <div style="width: 50px;">{{ index+1 }}</div>
                </template>
                <template v-else-if="column.dType === 'U' || column.dType === 'O'">
                    <div class="searchItem">
                        <a-select
                            allowClear
                            :default-active-first-option="false"
                            :filter-option="false"
                            showSearch
                            @search="(e)=>{searchlookup(e, column, record, index)}"
                            style="width: 150px;"
                            @dropdownVisibleChange="(e)=>{searchlookup('', column, record, index)}"
                            v-model:value="record[column.key]">
                            <a-select-option
                                v-for="(option, optionIdx) in search[column.key]"
                                :key="optionIdx"
                                :value="option.ID"
                            >{{ option.Name }}</a-select-option>
                        </a-select>
                        <div class="selectIcon">
                            <SearchOutlined
                              class="ant-select-suffix"
                              @click="handleOpenLook(column,record,index)"
                            />
                        </div>
                    </div>
                </template>
                <template v-else-if="column.dType === 'D'">
                    <a-date-picker  style="width: 150px;" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="dataList[index][column.dataIndex]" @change="(e)=>handleDatePicker(e, record, column, index)" />
                </template>
                <template v-else-if="column.dType === 'L' || column.dType === 'LT' || column.dType === 'DT'">
                    <a-select
                        style="width: 150px;"
                        v-model:value="record[column.key]">
                        <a-select-option :value="item.value" v-for="(item,index) in selectPickers[column.key]" :key="index">{{item.label}}</a-select-option>
                    </a-select>
                </template>
                <template v-else-if="column.dType === 'F'">
                    <a-date-picker style="width: 160px;" show-time  format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" v-model:value="dataList[index][column.dataIndex]"  @change="(e)=>handleTimePicker(e, record, column, index)" />
                </template>
            </template>
        </a-table>
        <radio-dept
            :isShow="isRadioDept"
            @cancel="cancelDeptModal"
            @selectVal="handleDeptParams"
          />
          <radio-user
            :isShow="isRadioUser"
            @cancel="cancelUserModal"
            @selectVal="handleUserParams"
            :localId="localId"
          ></radio-user>
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
        h
    } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';
    
    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    import { SearchOutlined, DeleteOutlined, PlusOutlined, CopyOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";


    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        columns: [
            
        ],
        dataList: [
        ],
        
        selectPickers: {
            StatusCode: [
                {
                    label: "草稿",
                    value: "0"
                },
                {
                    label: "审批中",
                    value: "1"
                },
                {
                    label: "审批通过",
                    value: "2"
                }
            ]
        },
        search: {},
        isRadioDept: false,
        isRadioUser: false,
        localId: "",
        recordVal: {}
    });
    const field = {};
    const { columns, dataList, selectPickers, search, isRadioDept, isRadioUser, localId, recordVal } = toRefs(data);
    // S
    const handleInp = (e,record, column, index) => {
        console.log("e",e,e.target.value, record, column);
        data.dataList[index][column.dataIndex] = e.target.value;
    }
    // D
    const handleDatePicker =  (e,record, column, index) => 
    {
        data.dataList[index][column.dataIndex] = e;
    }
    // F 时间
    const handleTimePicker = (e,record, column, index) => 
    {   
        console.log("e",e)
        data.dataList[index][column.dataIndex] = e;
    }
    const cancelDeptModal = (params) => {
        data.isRadioDept = params;
    };
    const cancelUserModal = (params) => {
        data.isRadioUser = params;
    };
    // 弹框选中部门
    const handleDeptParams = (params) => {
        console.log("deptData", params);
    };
    // 弹框选用户
    const handleUserParams = (params) => {
        console.log("userData", params);
        // console.log("赋值字段", data.localId);
        // data.isRadioUser = false;
        // formState[data.localId].Id = params.id;
        // var isEmpty = data.search[data.localId].some((item) => item.ID == params.id);
        // if (!isEmpty) {
        //     data.search[data.localId].push({
        //     ID: params.id,
        //     Name: params.name,
        //     });
        // }
        let { index, field} = data.recordVal;
        var isEmpty = data.search[field].some((item) => item.ID == params.id);
        if (!isEmpty) {
            data.search[field].push({
                ID: params.id,
                Name: params.name,
            });
        }
        data.dataList[index][field] = params.id;
        data.isRadioUser = false;
    };
    const getRelated = () => {
        proxy.$get(Interface.meeting.relatedrecords,{}).then(res=>{
            console.log("res",res);
            let record = res.actions[0].returnValue;
            let listItems = record.listItems;
            let recordIds = record.recordIds;
            data.columns = listItems.MeetingAudience.map(item=>{
                item.title = item.title;
                item.dataIndex = item.field;
                item.key = item.field;
                field[item.field] = "";
                if(item.dType=='U'){
                    data.search[item.field] = [];
                }
                return item;
            })
        })
        
    }
    getRelated();
    // 添加
    const handleAddRow = () => {
        for(let key in field){
            field[key] = '';
        }
        const copyField = JSON.parse(JSON.stringify(field));
        data.dataList.push(copyField);
    }
    // 删除
    const handleDeleteRow = () => {

    }
    // 复制
    const handleCopyRow = () => {
        data.columns.forEach(item=>{
            if(item.dType=='D' || data.dataList[0][item.dataIndex]){
                console.log("data.dataList[0][item.dataIndex]",data.dataList[0][item.dataIndex]);
            }
        })
        console.log("data.dataList[0]:",data.dataList[0]);
        let row = JSON.parse(JSON.stringify(data.dataList[0]));
        data.dataList.push(row);
        console.log("data", data.dataList)
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const searchlookup = (e, column, record, index) => {
        proxy.$get(Interface.uilook, {
            Lktp: column.sobjectType,
            Lksrch: e,
        }).then((res) => {
            let listData = res.listData;
            data.search[column.dataIndex] = listData;
        });
    }
    // 查询-弹窗
    const handleOpenLook = (attribute, record, index) => {
        let localId = attribute.dataIndex;
        data.localId = localId;
        data.recordVal = {
            index: index,
            field: attribute.dataIndex
        }
        let sObjectType = attribute.sobjectType;
        if (sObjectType == 30020) {
            data.isRadioUser = true;
        } else if (sObjectType == 10) {
            data.isRadioDept = true;
        }else {
            data.isRadioUser = true;
        }
    }
</script>
<style lang="less">
    .searchItem{
        position: relative;
        .selectIcon{
            position: absolute;
            right: 10px;
            top: 5px;
        }
    }
    .headerOption{
        text-align: right;
        padding-bottom: 20px;
    }
</style>