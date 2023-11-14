<template>
    <div class="calendarWrap">
        <div class="rightBox">
            <div class="calendarHeader">
                <div class="form">
                    <div class="formItem">
                        <span class="label">日程类型：</span>
                        <a-select v-model:value="formState.type" style="width: 200px;">
                            <a-select-option value="0">工作安排</a-select-option>
                            <a-select-option value="1">个人便笺</a-select-option>
                        </a-select>
                    </div>
                    <div class="calendar-selectlist">
                        <div class="calendar-typechook">
                            <li :class="{'active':calendarType==0}" @click="calendarType=0">日</li>
                            <li :class="{'active':calendarType==1}" @click="calendarType=1">周</li>
                            <li :class="{'active':calendarType==2}" @click="calendarType=2">月</li>
                        </div>
                    </div>
                    <div class="formItem ml10" v-if="calendarType==0">
                        <a-date-picker v-model:value="currentTime" @change="changeTime" />
                    </div>
                    <div class="formItem ml10 pickerTime" v-if="calendarType==1">
                        <span class="arrowIcon" @click="handlePrevWeek">
                            <LeftOutlined />
                        </span>
                        <a-date-picker v-model:value="startWeekTime" @change="changeStartTime" />
                        ~
                        <a-date-picker v-model:value="endWeekTime" @change="changeEndTime" />
                        <span class="arrowIcon" @click="handleNextWeek">
                            <RightOutlined />
                        </span>
                    </div>
                    <div class="formItem ml10" v-if="calendarType==2">
                        <a-date-picker v-model:value="monthValue" :format="monthFormat" picker="month" @change="changeMonth" />
                    </div>
                    <a-button disabled class="ml10" v-if="calendarType==0">今天</a-button>
                    <a-button disabled class="ml10" v-if="calendarType==1">本周</a-button>
                    <a-button disabled class="ml10" v-if="calendarType==2">本月</a-button>

                    <a-button class="ml10" :icon="h(RedoOutlined)"></a-button>
                </div>
               
                <div class="btnOptions">
                    <!-- <a-button type="primary" @click="handleAddMeeting">新建会议</a-button>
                    <a-button type="primary" class="ml10" @click="handleAddRepeatMeeting">新建重复会议</a-button> -->
                </div>
            </div>
            <div class="calendarBody" ref="contentRef">
                <DayCalendar v-if="calendarType==0"/>
                <WeekVue v-if="calendarType==1" :week="week" />
                <MonthCalendar v-if="calendarType==2" :width="width" />
            </div>
        </div>
        <NewMeeting :isShow="isNewMeeting" @cancel="cancelNewMeeting" @selectVal="handleNewMeetingVal" />
        <NewRepeatMeeting :isShow="isRepeatMeeting" @cancel="cancelRepeatMeeting" @selectVal="handleRepeatMeetingVal" />
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
        nextTick
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

    import WeekVue from "@/components/scheduleTable/TableWeekCalendar.vue";
    import DayCalendar from "@/components/scheduleTable/TableDayCalendar.vue";
    import MonthCalendar from "@/components/scheduleTable/TableMonthCalendar.vue";

    // 新建
    import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
    // 重复会议
    import NewRepeatMeeting from "@/components/meeting/meetingCalendar/NewRepeatMeeting.vue";
    import { SearchOutlined, DeleteOutlined, RedoOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const monthFormat = 'YYYY/MM';
    const data = reactive({
        activeKey: "1",
        statusList: [
            {
                label: "全部",
                value: ""
            },
            {
                label: "草稿",
                value: "0"
            },
            {
                label: "已发布",
                value: "1"
            },
            {
                label: "已完成",
                value: "2"
            },
            {
                label: "已取消",
                value: "3"
            },
        ],
        statusCurrent: 0,
        searchVal: "",
        userListTree: [],
        meetingList: {},
        monthValue: dayjs(new Date(), monthFormat),
        calendarType: 0,
        currentTime: dayjs(),
        startWeekTime: "",
        endWeekTime: "",
        week: [],
        isNewMeeting: false,
        isRepeatMeeting: false,
        width: 0
    });
    const { activeKey, statusList, statusCurrent, searchVal, userListTree, meetingList,
         monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, isNewMeeting, isRepeatMeeting, width} = toRefs(data);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"]
    const contentRef = ref(null);
    onMounted(()=>{
        console.log("contentRef",contentRef.value.clientWidth)
        data.width = contentRef.value.clientWidth;
    })
    const backFn = (list) => {
        var len = list.length;
        var index = Math.floor(Math.random() * len);
        return colors[index];
    }
    const formState = reactive({
        type: ""
    })
    // 日-切换日期
    const changeTime = (e) => {
        data.currentTime = dayjs(e);
    }
    const today = dayjs();
    for (let i = 0; i < 7; i++) {
        const date = today.startOf('week').add(i - 1, 'day');
        // console.log("date",date.format("YYYY-MM-DD"))
        var time = date.format("YYYY-MM-DD");
        data.week.push(time);
    }
    data.startWeekTime = dayjs(data.week[0]);
    data.endWeekTime = dayjs(data.week[data.week.length-1]);
    watch(week,(newVal,oldVal)=>{
        data.startWeekTime = dayjs(newVal[0]);
        data.endWeekTime = dayjs(newVal[newVal.length-1]);
    },{deep: true, immediate: true})
    // 周-切换日期
    const changeStartTime = (e) => {
        
    }
    const changeEndTime = (e) => {

    }
    // 周-上周
    const handlePrevWeek = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            const date = dayjs(data.endWeekTime).startOf('week').add(i - 8, 'day');
            var time = date.format("YYYY-MM-DD");
            temp.push(time);
        }
        console.log("temp",temp);
        data.week = temp;
    }
    // 周-下周
    const handleNextWeek = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            const date = dayjs(data.endWeekTime).startOf('week').add(i + 6, 'day');
            var time = date.format("YYYY-MM-DD");
            temp.push(time);
        }
        console.log("temp",temp);
        data.week = temp;
    }
    const handleStatus = (item, index) => {
        data.statusCurrent = index;
    }
    const onSearch = (e) => {

    }



    const currentDate = ref(null);

    const getMonthData = value => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    const changeMonth = (e) => {
        data.monthValue = dayjs(e, monthFormat);
        // console.log("data.monthValue",data.monthValue.format("YYYY-MM"));
        // console.log('dayjs---', data.monthValue)
        window.dayjs = dayjs;
        currentDate.value = dayjs(e);
        getQuery();
    }
    // 关闭新建
    const cancelNewMeeting = (e) => {
        data.isNewMeeting = e;
    }
    const handleNewMeetingVal = (e) => {
        data.isNewMeeting = false;
    }
    // 新建会议
    const handleAddMeeting = () => {
        data.isNewMeeting =  true;
    }
    // 新建重复会议
    const handleAddRepeatMeeting = () => {
        data.isRepeatMeeting =  true;
    }
    // 关闭重复会议弹窗
    const cancelRepeatMeeting = (e) => {
        data.isRepeatMeeting = e;
    }
    const handleRepeatMeetingVal = (e) => {
        data.isRepeatMeeting = false;
    }
</script>
<style lang="less" scoped>
    .calendarWrap {
        width: 100%;
        height: 100%;
        display: flex;

        .leftBox {
            width: 220px;
            height: 100%;
            border-right: 1px solid #e5e6eb;
            padding: 15px 0;

            .tabsWrap {
                padding: 0 15px;
            }

            .meetingStatelist {
                line-height: 30px;
                margin-top: 15px;
                padding: 0 15px;

                .statusItem {
                    padding-left: 20px;
                    cursor: pointer;
                    margin-bottom: 4px;

                    &:hover {
                        background: #f2f3f5;
                        color: var(--textColor);
                        font-weight: 700;
                    }

                    &.active {
                        background: #f2f3f5;
                        font-weight: 700;
                        color: var(--textColor);
                    }
                }
            }

            .peopleOrgBody {
                margin-top: 15px;
                padding: 0 15px;

                .userTree {
                    margin-top: 10px;
                }
            }
        }

        .rightBox {
            flex: 1;

            .calendarHeader {
                width: 100%;
                padding: 12px;
                border-bottom: 1px solid #e5e6eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .form{
                    display: flex;
                    .formItem{
                        &.pickerTime{
                            display: flex;
                            align-items: center;
                            .arrowIcon{
                                cursor: pointer;
                            }
                            .ant-picker{
                                border: none;
                            }
                        }
                    }
                }
            }
            .calendarBody{
                width: 100%;
                height: calc(~"100% - 60px");
                overflow: auto;
            }
        }
    }

    .events {
        list-style: none;
        margin: 0;
        padding: 0;
        .messageItem{
            background: #2977f6;
            padding: 5px;
            color: #fff;
            border-radius: 3px;
            margin-bottom: 3px;
            font-size: 12px;
        }
    }

    .events .ant-badge-status {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        font-size: 12px;
    }

    .notes-month {
        text-align: center;
        font-size: 28px;
    }

    .notes-month section {
        font-size: 28px;
    }
    .ant-picker-content{
        border-collapse: collapse;
    }
    :deep .ant-picker-content tr td{
        border: 1px solid #e2e3e5;
    }
    :deep :where(.css-dev-only-do-not-override-kqecok).ant-picker-calendar.ant-picker-calendar-full .ant-picker-calendar-date{
        border-top:none;
    }
    :deep .ant-picker-content thead tr{
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    :deep .ant-picker-content thead tr th{
        border: 1px solid #e2e3e5;
    }
    .calendar-selectlist{
        width: 122px;
        border: 1px solid #e5e6eb;
        border-radius: 4px;
        background: #f2f3f5;
        height: 32px;
        padding-top: 1px;
        margin-left: 15px;
        box-sizing: content-box;
        .calendar-typechook{
            display: flex;
            li{
                cursor: pointer;
                padding: 3px 9px;
                margin: 0 4px;
                margin-top: 3px;
                &.active{
                    font-weight: 700;
                    background: #fff;
                    border-radius: 4px;
                    color: var(--textColor);
                }
            }
        }
    }
</style>