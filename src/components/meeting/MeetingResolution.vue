<template>
    <div>
        <a-table :scroll="{ x: '1400px' | true }"  :columns="columns" :data-source="dataList" :pagination="false">
            <template #bodyCell="{ column, record, index }">
                
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


    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        columns: [
            {
                title: "决议内容",
                dataIndex: "1",
                key: "1"
            },
            {
                title: "表决票数",
                dataIndex: "2",
                key: "2"
            }
        ],
        dataList: [
        ],
        
        search: {},
        localId: "",
        recordVal: {}
    });
    const field = {};
    const { columns, dataList, search, localId, recordVal } = toRefs(data);
</script>
<style lang="less" scoped>
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