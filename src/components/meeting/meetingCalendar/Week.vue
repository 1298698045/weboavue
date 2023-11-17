<template>
    <div class="weekWrap">
        <div class="weekCalendar">
            <div class="weekCalendarHead">
                <div class="timeZone">
                    时间
                </div>
                <div class="calendarDayHeaders">
                    <div class="weekDayHeadItem" v-for="(item,index) in weekList" :key="index">{{item}} ({{ weeks[index]
                        }})</div>
                </div>
            </div>
            <div class="weekCalendarBody" ref="weekRef">
                <div class="timeBox">
                    <strong></strong>
                    <strong>
                        <span>06:00</span>
                    </strong>
                    <strong>
                        <span>07:00</span>
                    </strong>
                    <strong>
                        <span>08:00</span>
                    </strong>
                    <strong>
                        <span>09:00</span>
                    </strong>
                    <strong>
                        <span>10:00</span>
                    </strong>
                    <strong>
                        <span>11:00</span>
                    </strong>
                    <strong>
                        <span>12:00</span>
                    </strong>
                    <strong>
                        <span>13:00</span>
                    </strong>
                    <strong>
                        <span>14:00</span>
                    </strong>
                    <strong>
                        <span>15:00</span>
                    </strong>
                    <strong>
                        <span>16:00</span>
                    </strong>
                    <strong>
                        <span>17:00</span>
                    </strong>
                    <strong>
                        <span>18:00</span>
                    </strong>
                    <strong>
                        <span>19:00</span>
                    </strong>
                    <strong>
                        <span>20:00</span>
                    </strong>
                    <strong>
                        <span>21:00</span>
                    </strong>
                    <strong>
                        <span>22:00</span>
                    </strong>
                    <strong>
                        <span>23:00</span>
                    </strong>
                </div>
                <div class="weekRightDay">

                    <div class="calendarDay" v-for="(item,index) in weekList" :key="index">
                        <div class="eventList" @click="(e)=>{handleSelectTime(e,item)}" :ref="(el)=>setItemRefs(el, item, index)"  :class="{'active':isToDay(item)}" :style="{height: height+'px'}">
                            <a-popconfirm trigger="hover" @cancel="handleEditMeeting(item, row)" cancelText="编辑" okText="删除"
                                v-for="(row,idx) in meetingList[item]" :key="idx">
                                <template #icon></template>
                                <template #title>
                                    <div class="meetingMessageWrap">
                                        <div class="meetingHead">
                                            <div class="meetingLogo">
                                                <img :src="require('@/assets/img/meeting.png')" alt="">
                                            </div>
                                            <p class="meetingName">{{row.Name}}</p>
                                        </div>
                                        <div class="meetingBody">
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    召集人：
                                                    <span class="OwningUserName">{{row.CreatedByName}}</span>
                                                </div>
                                                <div class="meetingInfoItem">
                                                    联系电话：
                                                    <span class="TelePhone">{{row.TelePhone || ''}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    会议室：
                                                    <span class="OwningUserName">{{ row.RoomIdName }}</span>
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
                                                    <span class="OwningUserName">{{row.ScheduledStart}}</span>
                                                </div>
                                                <div class="meetingInfoItem">
                                                    结束：
                                                    <span class="TelePhone">{{row.ScheduledEnd}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <div class="meetingInfoItem">
                                                    备注：
                                                    <span class="OwningUserName">{{row.Description}}</span>
                                                </div>
                                            </div>
                                            <div class="meetingInfo">
                                                <a-button type="link">更多详细信息</a-button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <div class="eventItem" :style="{top:countTop(row)}">
                                    <p>{{row.Name}}</p>
                                    <p>{{row.ScheduledStartTime}}-{{row.ScheduledEndTime}} {{row.CreatedByName}}预约</p>
                                </div>
                            </a-popconfirm>
                        </div>
                    </div>
                    <!-- <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div> -->
                </div>
            </div>
        </div>
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
        nextTick,
        toRaw
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

    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['openWeekNew']);

    const props = defineProps({
        week: Array
    })
    const data = reactive({
        height: "",
        weekList: [],
        meetingList: {},
        times: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
            "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
            paramsTime: {
                date: "",
                time: ""
            },
            meetingId: ""

    });
    const weeks = toRaw(['周日', '周一', '周二', '周三', '周四', '周五', '周六']);
    const { height, weekList, meetingList, times, paramsTime, meetingId } = toRefs(data);
    const weekRef = ref(null);
    onMounted(() => {
        data.height = weekRef.value.scrollHeight;
    })
    const itemRefs = [];

    const setItemRefs = (el, item, index) => {
        if(el && el!=null){
            itemRefs.push({
                id: index,
                el
            })
        }
    }
    const handleEditMeeting = (item,row) => {
        console.log(item,row);
        data.paramsTime.date = row.ScheduledStartDate;
        data.paramsTime.time = row.ScheduledStartTime;
        data.paramsTime.meetingId = row.MeetingId;
        emit("openWeekNew", data.paramsTime);
    }
    const handleSelectTime = (e, item) => {
        console.log('e',e,item);
        let layerY = e.layerY;
        console.log("layerY",layerY, data.height);
        console.log("counth", Math.floor(layerY/30/2));
        let index = Math.floor(layerY/30/2);
        console.log("datatime", data.times[index > 0 ?  index-1 : index]);
        let startTime = data.times[index > 0 ?  index-1 : index];
        data.paramsTime.date = item;
        data.paramsTime.time = startTime;
        let obj = {
            date: item,
            time: startTime
        }
        // console.log("paramsTime",data.paramsTime);
        emit("openWeekNew", obj);
    }
    const today = dayjs();
    const week = [];
    for (let i = 0; i < 7; i++) {
        const date = today.startOf('week').add(i - 1, 'day');
        // console.log("date",date.format("YYYY-MM-DD"))
        var time = date.format("YYYY-MM-DD");
        week.push(time);
    }

    // 判断是否是今天
    const isToDay = (time) => {
        const currentTime = dayjs(new Date()).format("YYYY-MM-DD");
        return currentTime == time ? true : false;
    }

    // const week2 = week.map(date => {
    //     if (date.isSame(today, 'day')) {
    //         return '今天';
    // } else {
    //     return date.format('MM.DD');
    //     }
    // });

    // console.log("week", week);
    watch(()=>props.week,(newVal,oldVal)=>{
        data.weekList = newVal;
    },{deep: true, immediate: true})
    const countTop = (row) => {
        let index = data.times.findIndex(item => item == row.ScheduledStartTime);
        // console.log("index",index);
        return (index + 1) * 2 * 30 + "px";
    }



    const getQuery = () => {
        let startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
        let endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
        proxy.$get(Interface.meeting.getall, {
            startTime: startTime,
            endTime: endTime,
            MeetingType: "",
            employeeId: "",
            StatusCode: ""
        }).then(res => {
            let meetingItems = res.returnValue.meetings[0].meetingItems;
            let obj = {};
            meetingItems.forEach(item => {
                let daydate = dayjs(item.ScheduledStartDate).format('YYYY-MM-DD');
                console.log("daydate", daydate);
                if (!obj[daydate]) {
                    obj[daydate] = [];
                }
                obj[daydate].push(item);
            })
            data.meetingList = obj;
            console.log("obj", obj)
        })
    }
    getQuery();
</script>
<style lang="less">
    .weekWrap {
        width: 100%;
        height: 100%;

        .weekCalendar {
            height: 100%;

            .weekCalendarHead {
                line-height: 42px;
                background: #fff;
                border-bottom: 1px solid #e5e6eb;
                display: flex;
                align-items: center;

                .timeZone {
                    width: 80px;
                    text-align: center;
                }

                .calendarDayHeaders {
                    flex: 1;
                    display: flex;

                    .weekDayHeadItem {
                        flex: 1;
                        text-align: center;
                    }
                }
            }

            .weekCalendarBody {
                height: calc(~"100% - 43px");
                overflow: auto;
                background: #fff;
                display: flex;

                .timeBox {
                    width: 80px;
                    height: 100%;
                    background: #f0f2f6;
                    text-align: center;

                    strong {
                        display: block;
                        height: 60px;
                        border-top: 1px solid rgb(221, 219, 218);
                        padding: 10px 0 0 0;
                        font-size: .8125rem;
                        color: rgb(62, 62, 60);
                        font-weight: normal;
                        box-sizing: border-box;
                        background: #f0f2f6;
                        border-right: 1px solid rgb(221, 219, 218);

                        &:first-child {
                            border-top: 0;
                        }

                        span {
                            position: relative;
                            top: -20px;
                            padding: 6px;
                            background: #f0f2f6;
                        }
                    }
                }

                .weekRightDay {
                    flex: 1;
                    display: flex;

                    .calendarDay {
                        flex: 1;
                        text-align: center;
                        .eventList {
                            height: 1000px;
                            margin: 0;
                            padding: 0;
                            position: relative;
                            box-sizing: content-box;
                            border-left: 1px solid rgb(221, 219, 218);
                            border-bottom: 1px solid rgb(221, 219, 218);
                            background: linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1.01px);
                            background-size: 100% 30px;
                            border-width: 1px;
                            border-color: #eee;
                            border-right: none;
                            cursor: pointer;
                            &:last-child {
                                border-right: 1px solid #eee;
                            }

                            &.active {
                                background-color: rgb(254, 250, 230);
                                background-size: 100% 30px;
                            }

                            .eventItem {
                                width: 100%;
                                height: 60px;
                                background: var(--backColor);
                                color: #fff;
                                position: absolute;
                                text-align: left;
                                padding: 5px;
                                cursor: pointer;
                            }
                        }
                    }
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
</style>