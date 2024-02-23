<template>
    <div>
        <div class="headerOption">
            <a-button type="primary">大屏签到</a-button>
            <a-button type="primary" class="ml10">大屏签退</a-button>
            <a-button type="primary" class="ml10">签到二维码</a-button>
            <a-button type="primary" class="ml10">签退二维码</a-button>
            <a-button type="primary" class="ml10">打印参会人员</a-button>
            <a-button type="primary" class="ml10">打印未参会人员</a-button>
        </div>
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
        h,
        inject
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
                title: "姓名",
                dataIndex: "OwningUserName",
                key: "OwningUserName"
            },
            {
                title: "部门",
                dataIndex: "BusinessUnitIdName",
                key: "BusinessUnitIdName"
            },
            {
                title: "签到时间",
                dataIndex: "Checkin",
                key: "Checkin"
            },
            {
                title: "签到地址",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "签退时间",
                dataIndex: "Checkout",
                key: "Checkout"
            },
            {
                title: "接受状态",
                dataIndex: "StatusInfo",
                key: "StatusInfo"
            },
            {
                title: "签到状态",
                dataIndex: "CheckinInfo",
                key: "CheckinInfo"
            },
            {
                title: "原因",
                dataIndex: "Description",
                key: "Description"
            }
        ],
        dataList: [
        ],
        
        search: {},
        localId: "",
        recordVal: {},
        meetingId: inject("meetingId")
    });
    const field = {};
    const { columns, dataList, search, localId, recordVal, meetingId } = toRefs(data);
    const getQuery = () => {
        proxy.$get(Interface.meeting.meetingPeople,{
            Meetingid: data.meetingId
        }).then(res=>{
            data.dataList = res.rows;
        })
    };
    getQuery();
</script>
<style lang="less" scoped>
    .headerOption{
        text-align: right;
        padding-bottom: 20px;
    }
</style>