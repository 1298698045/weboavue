<template>
    <div class="calendarWrap">
        <div class="rightBox">
            <div class="calendarHeader">
                <div class="form">
                    <div class="formItem">
                        <span class="label">会议类型：</span>
                        <a-select v-model:value="formState.type" style="width: 200px;">
                            <a-select-option value="0">例会</a-select-option>
                            <a-select-option value="1">学术会议</a-select-option>
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
                <!-- <DayCalendar ref="DayCalendarWrap" v-if="calendarType==0" :currentTime="currentTime" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @openNew="handleOpenNew" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" />
                <WeekVue ref="WeekVueWrap" v-if="calendarType==1" :week="week" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @openNew="handleOpenNew" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" />
                <MonthCalendar ref="MonthCalendarWrap" v-if="calendarType==2" :width="width" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @openNew="handleOpenNew" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" /> -->
                <MeetingRoomFullCalendar ref="FullCalendarWrap" :calendarView="calendarView" :id="meetingId" :currentTime="currentTime"  @openNew="handleOpenNew" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" @selectVal="handleNewMeetingVal" />
            </div>
        </div>
        <NewMeeting :isShow="isNewMeeting" :meetingId="meetingId" v-if="isNewMeeting" @cancel="cancelNewMeeting" @selectVal="handleNewMeetingVal" :paramsTime="paramsTime" :calendarType="formState.type" />
        <NewRepeatMeeting :isShow="isRepeatMeeting" @cancel="cancelRepeatMeeting" @selectVal="handleRepeatMeetingVal" />
        <MeetingDetailModal :isShow="isMeetingDetail" v-if="isMeetingDetail" :meetingId="meetingId" @cancel="isMeetingDetail=false" @edit="handleOpenEdit" @handleDelete="handleDelete" />
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName" :recordId="meetingId" :objTypeCode="objectTypeCode" :external="external" />
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

    import WeekVue from "@/components/meeting/meetingRoom/WeekRoom.vue";
    import DayCalendar from "@/components/meeting/meetingRoom/DayCalendarRoom.vue";
    import MonthCalendar from "@/components/meeting/meetingRoom/MonthCalendarRoom.vue";
    import MeetingRoomFullCalendar from "@/components/meeting/meetingRoom/MeetingRoomFullCalendar.vue";
    import {getMeetingRoom} from "@/components/meeting/meetingRoom/MonthCalendarRoom.vue";
    // 会议详情
    import MeetingDetailModal from "@/components/meeting/MeetingDetailModal2.vue";
    // 新建
    import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
    // 重复会议
    import NewRepeatMeeting from "@/components/meeting/meetingCalendar/NewRepeatMeeting.vue";
    import { SearchOutlined, DeleteOutlined, RedoOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import Delete from "@/components/listView/Delete.vue";
    const { proxy } = getCurrentInstance();
    const contentRef = ref(null);
    const MonthCalendarWrap=ref(null);
    const DayCalendarWrap=ref(null);
    const WeekVueWrap=ref(null);
    onMounted(()=>{
        //console.log("contentRef",contentRef.value.clientWidth)
        data.width = contentRef.value.clientWidth;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    })
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
        calendarView:'resourceTimeGridDay',
        currentTime: dayjs(),
        startWeekTime: "",
        endWeekTime: "",
        week: [],
        isNewMeeting: false,
        isRepeatMeeting: false,
        width: 0,
        startTime:'',
        endTime:'',
        paramsTime: {
            date: "",
            time: ""
        },
        meetingId: "",
        isMeetingDetail: false,
        objectTypeCode:'5000',
        sObjectName:'MeetingRec',
        isDelete: false,
        deleteDesc: '确定要删除吗？',
        external:false,
    });

    const { activeKey, statusList, statusCurrent, searchVal, userListTree, meetingList,
         monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, isNewMeeting, isRepeatMeeting, width,startTime,endTime, paramsTime,
         meetingId,isMeetingDetail,objectTypeCode,sObjectName,isDelete,deleteDesc,external,calendarView} = toRefs(data);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"]
    const FullCalendarWrap=ref(null);
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
        data.meetingId='';
        data.paramsTime = params;
        data.isNewMeeting =  true;
    }
    // 月历 点击单元格新建
    const handleSelectCalendar = (e,info) => {
        data.meetingId='';
        data.paramsTime={
            date: e.format("YYYY-MM-DD"),
            time: ""
        }
        data.isNewMeeting = true;
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
        data.isMeetingDetail = false;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const getPeople = () => {
        proxy.$get(Interface.meeting.userTree, {}).then(res => {
            let list = res.returnValue.map(item => {
                item.key = item.id;
                item.title = item.name;
                return item;
            });
            data.userListTree = list;
        })
    }
    getPeople();


    const currentDate = ref(dayjs());
    const getListData = value => {
        // console.log("value:", value.date());
        // let listData;
        // switch (value.date()) {
        //     case 8:
        //         listData = [
        //             {
        //                 type: 'warning',
        //                 content: 'This is warning event.',
        //             },
        //             {
        //                 type: 'success',
        //                 content: 'This is usual event.',
        //             },
        //         ];
        //         break;
        //     case 10:
        //         listData = [
        //             {
        //                 type: 'warning',
        //                 content: 'This is warning event.',
        //             },
        //             {
        //                 type: 'success',
        //                 content: 'This is usual event.',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event.',
        //             },
        //         ];
        //         break;
        //     case 15:
        //         listData = [
        //             {
        //                 type: 'warning',
        //                 content: 'This is warning event',
        //             },
        //             {
        //                 type: 'success',
        //                 content: 'This is very long usual event。。....',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event 1.',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event 2.',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event 3.',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event 4.',
        //             },
        //         ];
        //         break;
        //     default:
        // }
        // return listData || [];
        let date = value.date();
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
        // proxy.$get(Interface.meeting.getall,{
        //     startTime: startTime,
        //     endTime: endTime,
        //     MeetingType: "",
        //     employeeId: "",
        //     StatusCode: ""
        // }).then(res=>{
        //     let meetingItems = res.returnValue.meetings[0].meetingItems;
        //     let obj = {};
        //     meetingItems.forEach(item=>{
        //         let daydate = dayjs(item.ScheduledStartDate).format('DD');
        //         console.log("daydate",daydate);
        //         if(!obj[daydate]){
        //             obj[daydate] = [];
        //         }
        //         obj[daydate].push(item);
        //     })
        //     data.meetingList = obj;
        //     console.log("obj",obj)
        // })
    }
    getQuery();
    // 关闭新建
    const cancelNewMeeting = (e) => {
        data.isNewMeeting = false;
    }
    const handleNewMeetingVal = (e) => {
        data.isNewMeeting = false;
        onSearch();
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
    // 编辑日历会议
    const handleEditMeeting = (item,e) => {
        data.paramsTime.date = e.format('YYYY-MM-DD');
        data.meetingId = item.MeetingId;
        data.isNewMeeting = true;
    }
    const handleDetail = (item, date) => {
        data.meetingId=item.Id;
        nextTick(()=>{
            data.isMeetingDetail = true;
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
        data.meetingId=e.Id;
        data.isNewMeeting = true;
    }
    //删除
    const handleDelete = (e) => {
        data.meetingId=e.Id;
        data.isDelete = true;
    }
    //删除关闭
    const cancelDelete = (e) => {
        data.isDelete = false;
    };
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