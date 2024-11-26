<template>
    <a-calendar :value="props.currentDate" :locale="locale" @select="openNew">
                    <template #headerRender>
                        <div>
                            
                        </div>
                    </template>
                    <template #dateCellRender="{ current }">
                        <p class="lunar" style="text-align: right;" :class="{'lunarDisabled':getlunarClass(current)}"><span class="holiday" v-if="getHolidayVal(current)">{{ getHolidayVal(current) }}</span><span class="festivals" v-if="getFestivals(current)">{{getFestivals(current)}}</span>{{ getlunarVal(current) }}</p>
                        <ul class="events">
                            <template v-for="(item,index) in getListData(current)" :key="index">
                                <a-popconfirm
                                trigger="hover"
                                cancelText="删除"
                                okText="编辑"
                                @confirm="openEdit(item)"
                                @cancel="handleDelete(item)">
                                    <template #icon></template>
                                    <template #title>
                                        <div class="meetingMessageWrap">
                                            <div class="meetingHead">
                                                <div class="meetingLogo">
                                                    <img :src="require('@/assets/img/meeting.png')" alt="">
                                                </div>
                                                <p class="meetingName">{{item.Subject}}</p>
                                            </div>
                                            <div class="meetingBody">
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        被分配人：
                                                        <span class="OwningUserName">{{item.Who}}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        地址：
                                                        <span class="TelePhone">{{item.Location || ''}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        联系电话：
                                                        <span class="OwningUserName">{{ item.Phone }}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        分配人：
                                                        <span class="TelePhone">{{item.CreatedByName || ''}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        开始：
                                                        <span class="OwningUserName">{{item.StartDateTime}}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        结束：
                                                        <span class="TelePhone">{{item.EndDateTime}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        备注：
                                                        <span class="OwningUserName">{{item.Description}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <a-button type="link" @click.stop="handleDetail(item, current)">更多详细信息</a-button>
                                                </div>
                                            </div>
                                        </div>
                                    </template>                                
                                    <li class="messageItem" :style="{background:backFn(getListData(current))}" @click.stop="handleDetail(item, current)">
                                        <p class="time">
                                            {{dayjs(item.StartDateTime).format("hh:mm")}}
                                            &nbsp; {{item.Subject}} 
                                        </p>
                                    </li>
                                </a-popconfirm>
                            </template>
                            
                        </ul>
                    </template>
                </a-calendar>
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

    import WeekVue from "@/components/schedule/calendar/ScheduleWeek.vue";
    import DayCalendar from "@/components/schedule/calendar/ScheduleDay.vue";

    // 新建
    import NewSchedule from "@/components/schedule/NewSchedule.vue";
    import AddSchedule from "@/components/schedule/AddSchedule.vue";
    import ShareCalendar from "@/components/schedule/ShareCalendar.vue";
    import ImportSchedule from "@/components/schedule/ImportSchedule.vue";

    import { SearchOutlined, DeleteOutlined, RedoOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import { getLunar } from 'chinese-lunar-calendar'
    // console.log('getLunar', getLunar(2023, 6, 27)); 

    import { Lunar, Solar, HolidayUtil } from "lunar-javascript";

    // 是否调休
    //console.log('HolidayUtil', HolidayUtil.getHoliday(2024,2,29));

    //console.log('HolidayUtil', HolidayUtil.getHoliday(2024,2,18).isWork());


    // var d = HolidayUtil.getHoliday(2024,2,29);
    // console.log('isWork', d.isWork());

    //console.log('Solar', Solar.fromDate(new Date("2024-12-24")).getFestivals());

    // 转阴历
    // console.log("转阴历", Solar.fromDate(new Date('2024-2-10')).getLunar());

    let lunar2 = Solar.fromDate(new Date('2024-2-9')).getLunar();
    //console.log("lunar2", lunar2)
    let year = lunar2.getYear();
    let month = lunar2.getMonth();
    let day = lunar2.getDay();
    //console.log(year, month ,day)
    // 获取农历节日
    let festival = Lunar.fromYmd(year, month, day).getFestivals();
    //console.log('Lunar', festival);
    // 节气
    //console.log("Lunar.fromYmd-getJieQi", Lunar.fromYmd(2024, 3, 1).getJieQi())
    // 获取农历日期
    const getlunarVal = (date) => {
        // console.log("val", date.format("YYYY-MM-DD"));
        let dateStr = date.format("YYYY-MM-DD");
        let lunarDay = Lunar.fromDate(new Date(dateStr)).getDayInChinese();
        return lunarDay;
    };
    // 获取节日
    const getFestivals = (date) => {
        let festival = '';
        let dateStr = date.format("YYYY-MM-DD");
        let SolarFestival = Solar.fromDate(new Date(dateStr)).getFestivals();
        let lunar2 = Solar.fromDate(new Date(dateStr)).getLunar();
        let year = lunar2.getYear();
        let month = lunar2.getMonth();
        let day = lunar2.getDay();
        let LunarFestival = Lunar.fromYmd(year, month, day).getFestivals();
        let LunarJieQi = Lunar.fromYmd(year, month, day).getJieQi();
        if(SolarFestival && SolarFestival.length){
            SolarFestival.forEach(item=>{
                festival += item;
            });
        };
        if(LunarFestival && LunarFestival.length){
            LunarFestival.forEach(item=>{
                festival += item;
            });
        }
        if(LunarJieQi){
            festival += LunarJieQi;
        }
        return festival;
    };
    // 假期
    const getHolidayVal = (date) => {
        let holiday = '';
        let dateStr = date.format("YYYY-MM-DD");
        let d = HolidayUtil.getHoliday(dateStr);
        if(d && d!=null){
            let isWork = d.isWork();
            if (isWork) {
                holiday = '班';
            }else {
                holiday = '休';
            }
        }else {
            let weekend = new Date(dateStr).getDay();
            // if (weekend == 0 || weekend == 6) {
            //     holiday = '休';
            // }
        }
        return holiday;
    };
    const getlunarClass = (date) => {
        let month = dayjs(date).format('MM');
        let currentMonth = dayjs(props.currentDate).format('MM');
        return month != currentMonth ? true : false;
    }
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const monthFormat = 'YYYY/MM';
    const props = defineProps({
        currentDate:[Object],
        startDateTime:String,
        endDateTime:String,
        calendarType:String
    })
    const emit = defineEmits(['openNew','handleDetail','openEdit','handleDelete']);
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
        scheduleList: {},
        monthValue: dayjs(new Date()),
        calendarType: 2,
        currentTime: dayjs(),
        startWeekTime: "",
        endWeekTime: "",
        week: [],
        isSchedule: false,
        isAddSchedule: false,
        isShare: false,
        isImport: false,
        fileParams: {},
        paramsTime: {
            date: "",
            time: ""
        },
        isCollapsed: false
    });
    const { activeKey, statusList, statusCurrent, searchVal, userListTree, scheduleList,
         monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, isSchedule, isRepeatMeeting, isAddSchedule,
         isShare, isImport, fileParams, paramsTime, isCollapsed} = toRefs(data);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"]
    const backFn = (list) => {
        var len = list.length;
        var index = Math.floor(Math.random() * len);
        return colors[index];
    }
    
    // 新建会议
    const openNew = (e,info) => {
        //console.log(e.format("YYYY-MM-DD"),info);
        emit("openNew", e);
    }
    // 编辑会议
    const openEdit = (item) => {
        emit("openEdit", item);
    }
    // 删除会议
    const handleDelete = (item) => {
        emit("handleDelete", item);
    }
    const handleDetail= (e) => {
        emit("handleDetail", e);
    }

    const today = dayjs();

    const currentDate = ref(dayjs());
    const getListData = value => {
        //let date = value.format('YYYY-MM-DD');
        // console.log("date",date);
        let date = dayjs(value).format('YYYY-MM-DD');
        return data.scheduleList[date] || [];
    };
    const getQuery = ()=> {
        let d = {
            actions:[{
                "id": "5764;a",
                "descriptor": "",
                "callingDescriptor": "UNKNOWN",
                "params": {
                    "startDateTime": props.startDateTime,
                    "endDateTime": props.endDateTime,
                    "calendarType": 'month',
                    "queryEvents": true
                }

            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        data.scheduleList =[];
        proxy.$post(Interface.schedule.list,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.length){
                        let scheduleItems = res.actions[0].returnValue[0].calendarItems;
                        let obj = {};
                        scheduleItems.forEach(item=>{
                            let daydate = dayjs(item.StartDateTime).format('YYYY-MM-DD');
                            //console.log("daydate",daydate);
                            if(!obj[daydate]){
                                obj[daydate] = [];
                            }
                            item.StartDateTime=item.StartDateTime?dayjs(item.StartDateTime).format("YYYY-MM-DD HH:mm"):'';
                            item.EndDateTime=item.EndDateTime?dayjs(item.EndDateTime).format("YYYY-MM-DD HH:mm"):'';
                            obj[daydate].push(item);
                        })
                        data.scheduleList = obj;
                        //console.log("obj",obj)
            }
        })
    }
    //getQuery();
    defineExpose({getQuery});
</script>
<style lang="less" scoped>
    .headerCalendar{
        border-bottom: 1px solid #e5e6eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 10px;
    }
    .calendarWrap {
        width: 100%;
        /* height: calc(~"100% - 49px"); */
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
            position: relative;
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
                margin-left: 15px;
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
    :deep .ant-picker-content thead tr th:first-child{
        color: red;
    }
    :deep .ant-picker-content thead tr th:last-child{
        color: red;
    }
    .lunarDisabled{
        color: rgba(0, 0, 0, 0.25);
    }
    .festivals,.holiday{
        font-size: 12px;
        padding-right: 10px;
        color: red;
    }
</style>
<style>
    .ant-tabs .ant-tabs-tab{
        padding: 12px 12px !important;
    }
</style>