<template>
    <div class="calendarWrap">
        <div class="leftBox">
            <div class="tabsWrap">
                <a-tabs v-model:activeKey="activeKey">
                    <a-tab-pane key="1" tab="会议状态"></a-tab-pane>
                    <a-tab-pane key="2" tab="人员组织"></a-tab-pane>
                </a-tabs>
            </div>
            <ul class="meetingStatelist" v-if="activeKey=='1'">
                <li class="statusItem" :class="{'active':statusCurrent==index}" v-for="(item,index) in statusList" :key="index"
                    @click="handleStatus(item,index)">{{ item.label }}</li>
            </ul>
            <div class="peopleOrgBody" v-else>
                <a-input-search v-model:value="searchVal" placeholder="请输入" style="width: 100%" @search="onSearch" />
                <div class="userTree">
                    <a-tree blockNode :tree-data="userListTree"></a-tree>
                </div>
            </div>
        </div>
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
            <div class="calendarBody">
                <a-calendar :value="currentDate" :locale="locale" v-if="calendarType==2" @select="handleSelectCalendar">
                    <template #headerRender>
                        <div>
                            
                        </div>
                    </template>
                    <template #dateCellRender="{ current }">
                        <ul class="events">
                            <a-popconfirm
                                trigger="hover"
                                cancelText="编辑"
                                okText="删除"
                                @cancel="handleEditMeeting(item,current)"
                                v-for="(item,index) in getListData(current)" :key="index"
                            >   
                                <template #icon></template>
                                <template #title>
                                    <div class="meetingMessageWrap">
                                        <div class="meetingHead">
                                            <div class="meetingLogo">
                                                <img :src="require('@/assets/img/meeting.png')" alt="">
                                            </div>
                                            <p class="meetingName">{{item.Name}}</p>
                                        </div>
                                        <div class="meetingBody">
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    召集人：
                                                    <span class="OwningUserName">{{item.CreatedByName}}</span>
                                                </div>
                                                <div class="meetingInfoItem">
                                                    联系电话：
                                                    <span class="TelePhone">{{item.TelePhone || ''}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    会议室：
                                                    <span class="OwningUserName">{{ item.RoomIdName }}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    会议设备：
                                                    <span class="OwningUserName">jackliu3</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    开始：
                                                    <span class="OwningUserName">{{item.ScheduledStart}}</span>
                                                </div>
                                                <div class="meetingInfoItem">
                                                    结束：
                                                    <span class="TelePhone">{{item.ScheduledEnd}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    备注：
                                                    <span class="OwningUserName">{{item.Description}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <a-button type="link">更多详细信息</a-button>
                                            </div>
                                        </div>
                                    </div>
                                </template>                                
                                <li class="messageItem" :style="{background:backFn(getListData(current))}">
                                    <!-- <a-badge status="success" :text="item.Name" /> -->
                                    <p class="name123">{{item.Name}}</p>
                                    <p class="time">
                                        {{item.ScheduledStartTime}}~{{item.ScheduledEndTime}}
                                        &nbsp; {{item.CreatedByName}} 预约
                                    </p>
                                </li>
                            </a-popconfirm>
                        </ul>
                    </template>
                </a-calendar>
                <DayCalendar v-if="calendarType==0" :currentTime="currentTime" @openWeekNew="handleOpenWeekNew"/>
                <WeekVue v-if="calendarType==1" :week="week"  @openWeekNew="handleOpenWeekNew" />
            </div>
        </div>
        <NewMeeting :isShow="isNewMeeting" :meetingId="meetingId" v-if="isNewMeeting" @cancel="cancelNewMeeting" @selectVal="handleNewMeetingVal" :paramsTime="paramsTime" />
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

    import WeekVue from "@/components/meeting/meetingCalendar/Week.vue";
    import DayCalendar from "@/components/meeting/meetingCalendar/DayCalendar.vue";

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
        calendarType: 2,
        currentTime: dayjs(),
        startWeekTime: "",
        endWeekTime: "",
        week: [],
        isNewMeeting: false,
        isRepeatMeeting: false,
        paramsTime: {
            date: "",
            time: ""
        },
        meetingId: ""
    });
    const { activeKey, statusList, statusCurrent, searchVal, userListTree, meetingList,
         monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, isNewMeeting, isRepeatMeeting, paramsTime,
         meetingId} = toRefs(data);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"]
    const backFn = (list) => {
        var len = list.length;
        var index = Math.floor(Math.random() * len);
        return colors[index];
    }
    const formState = reactive({
        type: ""
    })
    // 周日历-新建
    const handleOpenWeekNew = (params) => {
        console.log("weekparams", params);
        data.paramsTime = params;
        if(params.meetingId){
            data.meetingId = params.meetingId;
        }
        data.isNewMeeting =  true;
    }
    // 选择日期
    const handleSelectCalendar = (e,info) => {
        console.log(e.format("YYYY-MM-DD"),info);
        data.paramsTime.date = e.format("YYYY-MM-DD");
        data.isNewMeeting = true;
    }
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
    }
    const getQuery = ()=> {
        let startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
        let endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
        proxy.$get(Interface.meeting.getall,{
            startTime: startTime,
            endTime: endTime,
            MeetingType: "",
            employeeId: "",
            StatusCode: ""
        }).then(res=>{
            let meetingItems = res.returnValue.meetings[0].meetingItems;
            let obj = {};
            meetingItems.forEach(item=>{
                let daydate = dayjs(item.ScheduledStartDate).format('DD');
                console.log("daydate",daydate);
                if(!obj[daydate]){
                    obj[daydate] = [];
                }
                obj[daydate].push(item);
            })
            data.meetingList = obj;
            console.log("obj",obj)
        })
    }
    getQuery();
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
    // 编辑日历会议
    const handleEditMeeting = (item,e) => {
        data.paramsTime.date = e.format('YYYY-MM-DD');
        data.meetingId = item.MeetingId;
        data.isNewMeeting = true;
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
    .meetingMessageWrap{
        width: 300px;
        .meetingHead{
            display: flex;
            align-items: center;
            .meetingLogo{
                width: 32px;
                height: 32px;
                background: var(--backColor);
                border-radius: 4px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .meetingName{
                margin-left: 20px;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .meetingBody{
            margin-top: 10px;
            .meetingInfo{
                display: flex;
                .meetingInfoItem{
                    flex: 1;
                    font-size: 12px;
                }
                :deep .ant-btn{
                    padding: 0;
                }
            }
        }
    }
    :deep .ant-picker-content tbody tr td:first-child{
        background: #f9f9f9;
    }
    :deep .ant-picker-content tbody tr td:last-child{
        background: #f9f9f9;
    }
</style>