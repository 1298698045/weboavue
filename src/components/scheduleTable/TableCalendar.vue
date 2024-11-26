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
                            <li :class="{'active':calendarType==0}" @click="calendarTypeChange(0)">日</li>
                            <li :class="{'active':calendarType==1}" @click="calendarTypeChange(1)">周</li>
                            <li :class="{'active':calendarType==2}" @click="calendarTypeChange(2)">月</li>
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
                    <a-button :disabled="currentTimeNow==dayjs(currentTime).format('YYYY-MM-DD')" class="ml10" v-if="calendarType==0" @click="backNowTime(0)">今天</a-button>
                    <a-button :disabled="currentStartWeekTime==dayjs(startWeekTime).format('YYYY-MM-DD')&&currentEndWeekTime==dayjs(endWeekTime).format('YYYY-MM-DD')" class="ml10" v-if="calendarType==1" @click="backNowTime(1)">本周</a-button>
                    <a-button :disabled="currentMonthValue==dayjs(monthValue).format('YYYY-MM')" class="ml10" v-if="calendarType==2" @click="backNowTime(2)">本月</a-button>

                    <a-button class="ml10" :icon="h(RedoOutlined)" @click="calendarTypeChange(calendarType);" title="刷新"></a-button>
                </div>
               
                <div class="btnOptions">
                    <!-- <a-button type="primary" @click="handleAddMeeting">新建会议</a-button>
                    <a-button type="primary" class="ml10" @click="handleAddRepeatMeeting">新建重复会议</a-button> -->
                </div>
            </div>
            <div class="calendarBody" ref="contentRef">
                <!-- <DayCalendar v-if="calendarType==0"/>
                <WeekVue v-if="calendarType==1" :week="week" />
                <MonthCalendar v-if="calendarType==2" :width="width" /> -->
                <TableFullCalendar ref="FullCalendarWrap" :calendarView="calendarView" :id="id" :currentTime="currentTime"  @openNew="handleOpenNew" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" @selectVal="handleNewScheduleVal" />
            </div>
        </div>
        <AddSchedule :isShow="isAddSchedule" :id="id" v-if="isAddSchedule" :paramsTime="paramsTime" @cancel="cancelAddSchedule" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" @selectVal="handleNewScheduleVal" :calendarType="formState.type" />
        <ImportSchedule :isShow="isImport"  @cancel="cancelImport" />
        <ShareCalendar :isShow="isShare"  @cancel="cancelShare" :fileParams="fileParams" />
        <ScheduleDetailModal :isShow="isScheduleDetail" v-if="isScheduleDetail" :id="id" @cancel="isScheduleDetail=false" @selectVal="handleNewScheduleVal" @handleDelete="handleDelete" @edit="handleOpenEdit" />
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName" :recordId="id" :objTypeCode="objectTypeCode" :external="external" />
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

    import TableFullCalendar from "@/components/scheduleTable/TableFullCalendar.vue";
    // 新建
    import AddSchedule from "@/components/schedule/AddSchedule.vue";
    import ShareCalendar from "@/components/schedule/ShareCalendar.vue";
    import ImportSchedule from "@/components/schedule/ImportSchedule.vue";
    // 详情
    import ScheduleDetailModal from "@/components/schedule/ScheduleDetailModal.vue";
    import { SearchOutlined, DeleteOutlined, RedoOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import Delete from "@/components/listView/Delete.vue";
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const monthFormat = 'YYYY/MM';
    const data = reactive({
        activeKey: "1",
        statusCurrent: 0,
        searchVal: "",
        userListTree: [],
        meetingList: {},
        monthValue: dayjs(new Date()),
        calendarType: 2,
        calendarView:'resourceTimelineMonth',
        currentTime: dayjs(),
        startWeekTime: "",
        endWeekTime: "",
        week: [],
        width: 0,
        isSchedule: false,
        isAddSchedule: false,
        isShare: false,
        isImport: false,
        fileParams: {},
        paramsTime: {
            date: "",
            time: "",
            end:"",
            endDate:""
        },
        isCollapsed: false,
        isScheduleDetail: false,
        id: "",
        startTime:'',
        endTime:'',
        objectTypeCode:'4200',
        sObjectName:'ActivityPointer',
        isDelete: false,
        deleteDesc: '确定要删除吗？',
        external:false,
    });
    const { activeKey, statusCurrent, searchVal, userListTree, meetingList,
         monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, widthisSchedule, isAddSchedule,
         isShare, isImport, fileParams, paramsTime, isCollapsed,isScheduleDetail,id,startTime,endTime,objectTypeCode,sObjectName,isDelete,deleteDesc,external,calendarView} = toRefs(data);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"]
    const contentRef = ref(null);
    const FullCalendarWrap=ref(null);
    onMounted(()=>{
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
        //console.log("contentRef",contentRef.value.clientWidth)
        data.width = contentRef.value.clientWidth;
    })
    const calendarTypeChange=(e)=>{
        data.calendarType=e;
        if(e==2){
            data.startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
            data.endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
            data.calendarView='resourceTimelineMonth';
            // nextTick(()=>{
            //     MonthCalendarWrap.value.getQuery();
            // })
        }
        else if(e==1){
            data.startTime = dayjs(data.startWeekTime).format("YYYY-MM-DD");
            data.endTime = dayjs(data.endWeekTime).format("YYYY-MM-DD");
            data.calendarView='resourceTimelineWeek';
            // nextTick(()=>{
            //     WeekVueWrap.value.getQuery();
            // })
        }
        else if(e==0){
            data.startTime = dayjs(data.currentTime || new Date()).startOf("day").format("YYYY-MM-DD");
            data.endTime = dayjs(data.currentTime || new Date()).endOf('day').format('YYYY-MM-DD');
            data.calendarView='resourceTimeGridDay';
            // nextTick(()=>{
            //     DayCalendarWrap.value.getQuery();
            // })
        }
        nextTick(()=>{
            FullCalendarWrap.value.getQuery();
        })
    }
    const backFn = (list) => {
        var len = list.length;
        var index = Math.floor(Math.random() * len);
        return colors[index];
    }
    const formState = reactive({
        type: ""
    })
    // 周/日历 点击单元格新建
    const handleOpenNew = (params) => {
        data.id='';
        data.paramsTime = params;
        data.isAddSchedule = true;
    }
    // 月历 点击单元格新建
    const handleSelectCalendar = (e,info) => {
        data.id='';
        data.paramsTime={
            date: e.format("YYYY-MM-DD"),
            time: ""
        }
        data.isAddSchedule = true;
    }
    // 日-切换日期
    const changeTime = (e) => {
        data.currentTime = dayjs(e);
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
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

    const currentMonthValue=dayjs(new Date()).format("YYYY-MM");
    const currentTimeNow = dayjs(new Date()).format("YYYY-MM-DD");
    const week0 = data.week;
    const currentStartWeekTime = dayjs(data.week[0]).format("YYYY-MM-DD");
    const currentEndWeekTime = dayjs(data.week[data.week.length-1]).format("YYYY-MM-DD");
    
    const backNowTime=(e)=>{
        if(e==2){
            currentDate.value = dayjs(new Date());
            data.monthValue=dayjs(new Date(), monthFormat);
        }
        else if(e==1){
            data.week=week0;
            data.startWeekTime = dayjs(week0[0]).format("YYYY-MM-DD");
            data.endWeekTime = dayjs(week0[week0.length-1]).format("YYYY-MM-DD");
        }
        else if(e==0){
            data.currentTime=dayjs(new Date());
        }
        nextTick(()=>{
            calendarTypeChange(e);
        })
    }

    watch(week,(newVal,oldVal)=>{
        data.startWeekTime = dayjs(newVal[0]);
        data.endWeekTime = dayjs(newVal[newVal.length-1]);
    },{deep: true, immediate: true})
    // 周-切换日期
    const changeStartTime = (e) => {
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const changeEndTime = (e) => {
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    // 周-上周
    const handlePrevWeek = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            const date = dayjs(data.endWeekTime).startOf('week').add(i - 8, 'day');
            var time = date.format("YYYY-MM-DD");
            temp.push(time);
        }
        //console.log("temp",temp);
        data.week = temp;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    // 周-下周
    const handleNextWeek = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            const date = dayjs(data.endWeekTime).startOf('week').add(i + 6, 'day');
            var time = date.format("YYYY-MM-DD");
            temp.push(time);
        }
        //console.log("temp",temp);
        data.week = temp;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const handleStatus = (item, index) => {
        data.statusCurrent = index;
    }
    const onSearch = (e) => {
        data.isScheduleDetail = false;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const currentDate = ref(dayjs());
    const getListData = value => {
        let date = value.format('YYYY-MM-DD');
        // console.log("date",date);
        return data.meetingList[date] || [];
    };
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
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const getQuery = ()=> {
        data.startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
        data.endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
    }
    getQuery();
    // 关闭新建
    const cancelNewSchedule = (e) => {
        data.isSchedule = e;
    }
    const cancelAddSchedule = (e) => {
        data.isAddSchedule = e;
    }
    // 新建
    const handleAddSchedule = () => {
        // data.isSchedule =  true;
        data.isAddSchedule = true;
    }
    // 日历-点击日期创建
    const selectCalendar = (date, {source}) => {
        //console.log("e", date.format("YYYY-MM-DD"), source);
        data.paramsTime.date = date.format("YYYY-MM-DD");
        data.isAddSchedule = true;
    };
    const cancelImport = (e) => {
        data.isImport = e;
    }
    const cancelShare = (e) => {
        data.isShare = e;
    }
    const openShare = () => {
        data.isShare = true;
    }
    const openImport = () => {
        data.isImport = true;
    }
    const handleCollapsed = () => {
        data.isCollapsed = !data.isCollapsed;
    }
    //详情
    const handleDetail = (item, date) => {
        data.id=item.Id;
        nextTick(()=>{
            data.isScheduleDetail = true;
        })
    }
    // 编辑
    const handleOpenEdit = (e) => {
        data.paramsTime={
            date: "",
            time: ""
        }
        if(e.paramsTime){
            data.paramsTime=e.paramsTime
        }
        data.id=e.Id;
        data.isAddSchedule = true;
    }
    //删除
    const handleDelete = (e) => {
        data.id=e.Id;
        data.isDelete = true;
    }
    //删除关闭
    const cancelDelete = (e) => {
        data.isDelete = false;
    };
    const handleNewScheduleVal = (e) => {
        data.isAddSchedule = false;
        onSearch();
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
        /* background: #f2f3f5; */
        background: #fff;
        height: 32px;
        padding-top: 1px;
        margin-left: 15px;
        box-sizing: content-box;
        .calendar-typechook{
            display: flex;
            height: 100%;
            li{
                cursor: pointer;
                /* padding: 3px 9px;
                margin: 0 4px;
                margin-top: 3px; */
                width: 100%;
                height: 100%;
                margin: 0;
                display: inline-block;
                text-align: center;
                line-height: 32px;
                &.active{
                    font-weight: 700;
                    background: var(--backColor);
                    border-radius: 4px;
                    /* color: var(--textColor); */
                    color: #fff;
                }
            }
        }
    }
</style>