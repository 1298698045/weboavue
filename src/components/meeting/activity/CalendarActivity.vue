<template>
    <div class="calendarWrap">
        <div class="rightBox">
            <div class="calendarHeader">
                <div class="form">
                    <div class="formItem">
                        <span class="label">活动类型：</span>
                        <a-select v-model:value="formState.type" style="width: 200px;" @change="(e)=>{formState.type=e;calendarTypeChange(calendarType);}">
                            <a-select-option value="志愿者活动">志愿者活动</a-select-option>
                            <a-select-option value="其他">其他</a-select-option>
                        </a-select>
                    </div>
                    <div class="calendar-selectlist">
                        <div class="calendar-typechook">
                            <li :class="{ 'active': calendarType == 0 }" @click="calendarTypeChange(0)">日</li>
                            <li :class="{ 'active': calendarType == 1 }" @click="calendarTypeChange(1)">周</li>
                            <li :class="{ 'active': calendarType == 2 }" @click="calendarTypeChange(2)">月</li>
                        </div>
                    </div>
                    <div class="formItem ml10" v-if="calendarType == 0">
                        <a-date-picker v-model:value="currentTime" @change="changeTime" />
                    </div>
                    <div class="formItem ml10 pickerTime" v-if="calendarType == 1">
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
                    <div class="formItem ml10" v-if="calendarType == 2">
                        <a-date-picker v-model:value="monthValue" :format="monthFormat" picker="month"
                            @change="changeMonth" />
                    </div>
                    <a-button :disabled="currentTimeNow == dayjs(currentTime).format('YYYY-MM-DD')" class="ml10"
                        v-if="calendarType == 0" @click="backNowTime(0)">今天</a-button>
                    <a-button
                        :disabled="currentStartWeekTime == dayjs(startWeekTime).format('YYYY-MM-DD') && currentEndWeekTime == dayjs(endWeekTime).format('YYYY-MM-DD')"
                        class="ml10" v-if="calendarType == 1" @click="backNowTime(1)">本周</a-button>
                    <a-button :disabled="currentMonthValue == dayjs(monthValue).format('YYYY-MM')" class="ml10"
                        v-if="calendarType == 2" @click="backNowTime(2)">本月</a-button>

                    <a-button class="ml10" :icon="h(RedoOutlined)" @click="calendarTypeChange(calendarType);"
                        title="刷新"></a-button>
                    <div class="statusWrap">
                        <div class="statusItem">
                            <span class="statusColor" style="background: #0070d2;"></span>
                            <span class="statusText">未审批</span>
                        </div>
                        <div class="statusItem">
                            <span class="statusColor" style="background: #f7aa2d;"></span>
                            <span class="statusText">审批中</span>
                        </div>
                        <div class="statusItem">
                            <span class="statusColor" style="background: #81cf9f;"></span>
                            <span class="statusText">审批完成</span>
                        </div>
                        <div class="statusItem">
                            <span class="statusColor" style="background: #b3b3b3;"></span>
                            <span class="statusText">已拒绝</span>
                        </div>
                    </div>
                </div>

                <div class="btnOptions">
                    <!-- <a-button type="primary" @click="handleAddMeeting">新建会议</a-button>
                    <a-button type="primary" class="ml10" @click="handleAddRepeatMeeting">新建重复会议</a-button> -->
                </div>
            </div>
            <div class="calendarBody">
                <!-- <a-calendar :value="currentDate" :locale="locale" v-if="calendarType==2">
                    <template #headerRender>
                        <div>
                            
                        </div>
                    </template>
<template #dateCellRender="{ current }">
                        <p class="lunar" style="text-align: right;" :class="{'lunarDisabled':getlunarClass(current)}"><span class="holiday" v-if="getHolidayVal(current)">{{ getHolidayVal(current) }}</span><span class="festivals" v-if="getFestivals(current)">{{getFestivals(current)}}</span>{{ getlunarVal(current) }}</p>
                        <ul class="events">
                            <a-popconfirm
                                trigger="hover"
                                cancelText="编辑"
                                okText="删除"
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
                                                    发布人：
                                                    <span class="OwningUserName">{{item.CreatedByName}}</span>
                                                </div>
                                                <div class="meetingInfoItem">
                                                    部门：
                                                    <span class="TelePhone">{{item.BusinessunitName || ''}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    联系电话：
                                                    <span class="OwningUserName"></span>
                                                </div>
                                                <div class="meetingInfoItem">
                                                    活动目标：
                                                    <span class="OwningUserName"></span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    开始：
                                                    <span class="OwningUserName">{{item.ProposedStart}}</span>
                                                </div>
                                                <div class="meetingInfoItem">
                                                    结束：
                                                    <span class="TelePhone">{{item.ProposedEnd}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    活动内容：
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
    <p class="name123">{{dayjs(item.ProposedStart).format('HH:mm')}} {{item.Name}}</p>
</li>
</a-popconfirm>
</ul>
</template>
</a-calendar>
<DayCalendar v-if="calendarType==0" :currentTime="currentTime" />
<WeekVue v-if="calendarType==1" :week="week" /> -->
                <ActivityFullCalendar ref="FullCalendarWrap" :calendarView="calendarView"
                    :id="activityId" :currentTime="currentTime" @openNew="handleOpenNew" :startDateTime="startTime"
                    :endDateTime="endTime" :ActivityType="formState.type" @handleDetail="handleDetail"
                    @openEdit="handleOpenEdit" @handleDelete="handleDelete" @selectVal="handleNewActivityVal" />
            </div>
        </div>
        <NewActivity :isShow="isNewActivity" :activityId="activityId" v-if="isNewActivity" @cancel="cancelNewActivity"
            @selectVal="handleNewActivityVal" :paramsTime="paramsTime" :ActivityType="formState.type" />
        <MeetingDetailModal :isShow="isMeetingDetail" v-if="isMeetingDetail" :activityId="activityId"
            @cancel="isMeetingDetail = false" @edit="handleOpenEdit" @handleDelete="handleDelete" />
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName"
            :recordId="activityId" :objTypeCode="objectTypeCode" :external="external" />
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

import WeekVue from "@/components/meeting/activity/WeekCalendayActivity.vue";
import DayCalendar from "@/components/meeting/activity/DayCalendayActivity.vue";

import ActivityFullCalendar from "@/components/meeting/activity/ActivityFullCalendar.vue";
// 详情
import MeetingDetailModal from "@/components/meeting/MeetingDetailModal2.vue";
// 新建
import NewActivity from "@/components/meeting/activity/NewActivity.vue";
import Delete from "@/components/listView/Delete.vue";
import { SearchOutlined, DeleteOutlined, RedoOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
import { Lunar, Solar, HolidayUtil } from "lunar-javascript";
onMounted(() => {
    nextTick(() => {
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
    monthValue: dayjs(new Date()),
    calendarType: 2,
    calendarView: 'dayGridMonth',
    currentTime: dayjs(),
    startWeekTime: "",
    endWeekTime: "",
    week: [],
    isNewActivity: false,
    isRepeatMeeting: false,
    paramsTime: {
        date: "",
        time: "",
        end: "",
        endDate: ""
    },
    activityId: "",
    isMeetingDetail: false,
    startTime: '',
    endTime: '',
    objectTypeCode: '5000',
    sObjectName: 'MeetingRec',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external: false,
});
const { activeKey, statusList, statusCurrent, searchVal, userListTree, meetingList, 
    monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, isNewActivity, isRepeatMeeting, paramsTime,
    activityId, isMeetingDetail, startTime, endTime, objectTypeCode, sObjectName, isDelete, deleteDesc, external, calendarView } = toRefs(data);
const colors = ["#3399ff", "#f0854e", "#61cc53", "#eb3d85"]
const FullCalendarWrap = ref(null);
const calendarTypeChange = (e) => {
    data.calendarType = e;
    if (e == 2) {
        data.startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
        data.endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
        data.calendarView = 'dayGridMonth';
        // nextTick(()=>{
        //     MonthCalendarWrap.value.getQuery();
        // })
    }
    else if (e == 1) {
        data.startTime = dayjs(data.startWeekTime).format("YYYY-MM-DD");
        data.endTime = dayjs(data.endWeekTime).format("YYYY-MM-DD");
        data.calendarView = 'timeGridWeek';
        // nextTick(()=>{
        //     WeekVueWrap.value.getQuery();
        // })
    }
    else if (e == 0) {
        data.startTime = dayjs(data.currentTime || new Date()).startOf("day").format("YYYY-MM-DD");
        data.endTime = dayjs(data.currentTime || new Date()).endOf('day').format('YYYY-MM-DD');
        data.calendarView = 'timeGridDay';
        // nextTick(()=>{
        //     DayCalendarWrap.value.getQuery();
        // })
    }
    nextTick(() => {
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
    data.activityId = '';
    data.paramsTime = params;
    data.isNewActivity = true;
}
// 月历 点击单元格新建
const handleSelectCalendar = (e, info) => {
    data.activityId = '';
    data.paramsTime = {
        date: e.format("YYYY-MM-DD"),
        time: ""
    }
    data.isNewActivity = true;
}
// 日-切换日期
const changeTime = (e) => {
    data.currentTime = dayjs(e);
    nextTick(() => {
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
data.endWeekTime = dayjs(data.week[data.week.length - 1]);

const currentMonthValue = dayjs(new Date()).format("YYYY-MM");
const currentTimeNow = dayjs(new Date()).format("YYYY-MM-DD");
const week0 = data.week;
const currentStartWeekTime = dayjs(data.week[0]).format("YYYY-MM-DD");
const currentEndWeekTime = dayjs(data.week[data.week.length - 1]).format("YYYY-MM-DD");

const backNowTime = (e) => {
    if (e == 2) {
        currentDate.value = dayjs(new Date());
        data.monthValue = dayjs(new Date());
    }
    else if (e == 1) {
        data.week = week0;
        data.startWeekTime = dayjs(week0[0]).format("YYYY-MM-DD");
        data.endWeekTime = dayjs(week0[week0.length - 1]).format("YYYY-MM-DD");
    }
    else if (e == 0) {
        data.currentTime = dayjs(new Date());
    }
    nextTick(() => {
        calendarTypeChange(e);
    })
}

watch(week, (newVal, oldVal) => {
    data.startWeekTime = dayjs(newVal[0]);
    data.endWeekTime = dayjs(newVal[newVal.length - 1]);
}, { deep: true, immediate: true })
// 周-切换日期
const changeStartTime = (e) => {
    nextTick(() => {
        calendarTypeChange(data.calendarType);
    })
}
const changeEndTime = (e) => {
    nextTick(() => {
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
    nextTick(() => {
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
    nextTick(() => {
        calendarTypeChange(data.calendarType);
    })
}
const handleStatus = (item, index) => {
    data.statusCurrent = index;
}
const onSearch = (e) => {
    data.isMeetingDetail = false;
    nextTick(() => {
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
    window.dayjs = dayjs;
    currentDate.value = dayjs(e);
    getQuery();
    nextTick(() => {
        calendarTypeChange(data.calendarType);
    })
}
const getQuery = () => {
    data.startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
    data.endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
    // proxy.$get(Interface.meetingActivity.calendarList,{
    //     startTime: startTime,
    //     endTime: endTime,
    //     MeetingType: "",
    //     employeeId: "",
    //     StatusCode: ""
    // }).then(res=>{
    //     let listData = res.listData;
    //     let obj = {};
    //     listData.forEach(item=>{
    //         item.CampaignActivityList.forEach(row=>{
    //             let daydate = dayjs(row.ProposedStart).format('DD');
    //             console.log("daydate",daydate);
    //             if(!obj[daydate]){
    //                 obj[daydate] = [];
    //             }
    //             row.BusinessunitId = item.BusinessunitId;
    //             row.BusinessunitName = item.Name;
    //             obj[daydate].push(row);
    //         })
    //     })
    //     data.meetingList = obj;
    //     console.log("obj",obj)
    // })
}
getQuery();
// 关闭新建
const cancelNewActivity = (e) => {
    data.isNewActivity = false;
}
const handleNewActivityVal = (e) => {
    data.isNewActivity = false;
    onSearch();
}
// 新建会议
const handleAddMeeting = () => {
    data.isNewActivity = true;
}
// 新建重复会议
const handleAddRepeatMeeting = () => {
    data.isRepeatMeeting = true;
}
// 关闭重复会议弹窗
const cancelRepeatMeeting = (e) => {
    data.isRepeatMeeting = e;
}
const handleRepeatMeetingVal = (e) => {
    data.isRepeatMeeting = false;
}
// 编辑日历会议
const handleEditMeeting = (item, e) => {
    data.paramsTime.date = e.format('YYYY-MM-DD');
    data.activityId = item.activityId;
    data.isNewActivity = true;
}
const handleDetail = (item, date) => {
    data.activityId = item.Id;
    nextTick(() => {
        data.isMeetingDetail = true;
    })
}
// 编辑
const handleOpenEdit = (e) => {
    data.paramsTime = {
        date: "",
        time: ""
    }
    if (e.paramsTime) {
        data.paramsTime = e.paramsTime
    }
    data.activityId = e.Id;
    data.isNewActivity = true;
}
//删除
const handleDelete = (e) => {
    data.activityId = e.Id;
    data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
    data.isDelete = false;
};
defineExpose({ handleOpenNew });
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
        flex-direction: column;
        display: flex;
        :deep .ant-btn {
            margin-top: 0px;
        }
        :deep .ant-picker .ant-picker-input{
            width: 96px;
        }
        .calendarHeader {
            width: 100%;
            padding: 12px;
            border-bottom: 1px solid #e5e6eb;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .form {
                display: flex;

                .formItem {
                    &.pickerTime {
                        display: flex;
                        align-items: center;

                        .arrowIcon {
                            cursor: pointer;
                        }

                        .ant-picker {
                            border: none;
                        }
                    }
                }
            }

            .statusWrap {
                display: flex;

                .statusItem {
                    display: flex;
                    align-items: center;
                    margin-left: 10px;

                    .statusColor {
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background: #2977f6;
                        margin: 0 5px;
                    }
                }
            }
        }

        .calendarBody {
            height: calc(~"100% - 60px");
            overflow: auto;
        }
    }
}

.events {
    list-style: none;
    margin: 0;
    padding: 0;

    .messageItem {
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

.ant-picker-content {
    border-collapse: collapse;
}

:deep .ant-picker-content tr td {
    border: 1px solid #e2e3e5;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-picker-calendar.ant-picker-calendar-full .ant-picker-calendar-date {
    border-top: none;
}

:deep .ant-picker-content thead tr {
    height: 30px;
    line-height: 30px;
    text-align: center;
}

:deep .ant-picker-content thead tr th {
    border: 1px solid #e2e3e5;
}

.calendar-selectlist {
    width: 122px;
    border: 1px solid #e5e6eb;
    border-radius: 4px;
    /* background: #f2f3f5; */
    background: #fff;
    height: 32px;
    padding-top: 0px;
    margin-left: 15px;
    box-sizing: content-box;

    .calendar-typechook {
        display: flex;
        height: 100%;

        li {
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

            &.active {
                font-weight: 700;
                background: var(--backColor);
                border-radius: 4px;
                /* color: var(--textColor); */
                color: #fff;
            }
        }
    }
}

.meetingMessageWrap {
    width: 300px;

    .meetingHead {
        display: flex;
        align-items: center;

        .meetingLogo {
            width: 32px;
            height: 32px;
            background: var(--backColor);
            border-radius: 4px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .meetingName {
            margin-left: 20px;
            font-size: 16px;
            font-weight: bold;
        }
    }

    .meetingBody {
        margin-top: 10px;

        .meetingInfo {
            display: flex;

            .meetingInfoItem {
                flex: 1;
                font-size: 12px;
            }

            :deep .ant-btn {
                padding: 0;
            }
        }
    }
}

:deep .ant-picker-content tbody tr td:first-child {
    background: #f9f9f9;
}

:deep .ant-picker-content tbody tr td:last-child {
    background: #f9f9f9;
}

.lunarDisabled {
    color: rgba(0, 0, 0, 0.25);
}

.festivals,
.holiday {
    font-size: 12px;
    padding-right: 10px;
    color: red;
}
</style>