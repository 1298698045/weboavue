<template>
    <a-calendar :value="props.currentDate" :locale="locale" @select="handleSelectCalendar">
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
                                            <p class="meetingName">{{item.Subject}}</p>
                                        </div>
                                        <div class="meetingBody">
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    召集人：
                                                    <span class="OwningUserName">{{item.Who}}</span>
                                                </div>
                                                <div class="meetingInfoItem">
                                                    联系电话：
                                                    <span class="TelePhone">{{item.TelePhone || ''}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    会议室：
                                                    <span class="OwningUserName">{{ item.Where }}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    会议设备：
                                                    <span class="OwningUserName"></span>
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
                                                <a-button type="link">更多详细信息</a-button>
                                            </div>
                                        </div>
                                    </div>
                                </template>                                
                                <li class="messageItem" :style="{background:backFn(getListData(current))}" @click.stop="handleDetail(item, current)">
                                    <!-- <a-badge status="success" :text="item.Subject" /> -->
                                    <p class="name123">{{item.Subject}}</p>
                                    <p class="time">
                                        {{item.StartDateTime}}~{{item.EndDateTime}}
                                        &nbsp; {{item.Who}} 预约
                                    </p>
                                </li>
                            </a-popconfirm>
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

    import { SearchOutlined, DeleteOutlined, RedoOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import { Lunar, Solar, HolidayUtil } from "lunar-javascript";
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
        let month = date.format("MM");
        let currentMonth = data.monthValue.format('MM');
        return month != currentMonth ? true : false;
    }
    const formRef = ref();
    const monthFormat = 'YYYY/MM';
    const data = reactive({
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
        meetingId: "",
        isMeetingDetail: false
    });
    const props = defineProps({
        currentDate:String,
        startDateTime:String,
        endDateTime:String,
        calendarType:String
    })
    const emit = defineEmits(['handleSelectCalendar','handleDetail']);
    const { activeKey, statusList, statusCurrent, searchVal, meetingList,
         monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, isNewMeeting, isRepeatMeeting, paramsTime,
         meetingId, isMeetingDetail} = toRefs(data);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"]
    const backFn = (list) => {
        var len = list.length;
        var index = Math.floor(Math.random() * len);
        return colors[index];
    }
    
    // 选择日期
    const handleSelectCalendar = (e,info) => {
        console.log(e.format("YYYY-MM-DD"),info);
        emit("handleSelectCalendar", e);
    }
    const handleDetail= (e) => {
        emit("handleDetail", e);
    }
    const today = dayjs();

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
                    "queryMeetings": true
                }

            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.meeting.getall,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.length){
                        let meetingItems = res.actions[0].returnValue;
                        let obj = {};
                        meetingItems.forEach(item=>{
                            let daydate = dayjs(item.StartDateTime).format('DD');
                            console.log("daydate",daydate);
                            if(!obj[daydate]){
                                obj[daydate] = [];
                            }
                            obj[daydate].push(item);
                        })
                        data.meetingList = obj;
                        console.log("obj",obj)
            }
        })
    }
    getQuery();
    defineExpose({getQuery})
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
    .lunarDisabled{
        color: rgba(0, 0, 0, 0.25);
    }
    .festivals,.holiday{
        font-size: 12px;
        padding-right: 10px;
        color: red;
    }
    .calendarWrap :deep .ant-tabs-nav-operations{
        display: none !important;
    }
    .calendarWrap :deep .ant-tabs-nav-wrap{
        display: block !important;
    }
</style>