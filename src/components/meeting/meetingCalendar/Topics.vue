<template>
    <div>
        <div class="headerOption">
            <a-button class="ml10" :icon="h(PlusOutlined)" @click="handleAddRow"></a-button>
            <a-button class="ml10" :icon="h(DeleteOutlined)" @click="handleDeleteRow"></a-button>
            <a-button class="ml10" :icon="h(CopyOutlined)" @click="handleCopyRow"></a-button>
        </div>
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="dataList" :pagination="false">
            <template #bodyCell="{ column, record, index }">
                <template v-if="column.dType === 'S'">
                    <a-input style="width: 150px;" v-model="record[column.key]" @change="(e)=>handleInp(e,record, column)"></a-input>
                </template>
                <template v-else-if="column.dType === 'N'">
                    <div style="width: 50px;">{{ index+1 }}</div>
                </template>
                <template v-else-if="column.dType === 'U' || column.dType === 'O'">
                    <a-select
                        style="width: 150px;"
                        v-model="record[column.key]">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </template>
                <template v-else-if="column.dType === 'D'">
                    <a-date-picker  style="width: 150px;" v-model="record[column.key]" />
                </template>
                <template v-else-if="column.dType === 'L' || column.dType === 'LT' || column.dType === 'DT'">
                    <a-select
                        style="width: 150px;"
                        v-model="record[column.key]">
                        <a-select-option :value="item.value" v-for="(item,index) in selectPickers[column.key]" :key="index">{{item.label}}</a-select-option>
                    </a-select>
                </template>
            </template>
        </a-table>
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
    import { SearchOutlined, DeleteOutlined, PlusOutlined, CopyOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
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
        }
    });
    const field = {};
    const { columns, dataList, selectPickers } = toRefs(data);
    const handleInp = (e,record, column) => {
        console.log("e",e, record, column);
        // record[column.key] = '123';
    }
    const getRelated = () => {
        proxy.$get(Interface.meeting.relatedrecords,{}).then(res=>{
            console.log("res",res);
            let record = res.actions[0].returnValue;
            let listItems = record.listItems;
            let recordIds = record.recordIds;
            data.columns = listItems.MeetingItem.map(item=>{
                item.title = item.title;
                item.dataIndex = item.field;
                item.key = item.field;
                field[item.field] = "";
                return item;
            })
        })
    }
    getRelated();
    // 添加
    const handleAddRow = () => {
        data.dataList.push(field);
    }
    // 删除
    const handleDeleteRow = () => {

    }
    // 复制
    const handleCopyRow = () => {
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
</script>
<style lang="less">
</style>