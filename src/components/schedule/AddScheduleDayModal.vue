<template>
    <div class="weekWrap AddScheduleDayModal">
        <div class="weekCalendar">
            <div class="weekCalendarHead">
                <div class="timeZone">
                    时间
                </div>
                <div class="calendarDayHeaders">
                    <div class="weekDayHeadItem">
                        <span class="arrowIcon" @click="handlePrevDay">
                            <LeftOutlined />
                        </span>
                        <!-- <a-date-picker v-model:value="currentDate" @change="changeTime" format="YYYY-MM-DD" picker="date" /> -->
                        &nbsp;{{ currentDate }}&nbsp;
                        <span class="arrowIcon" @click="handleNextDay">
                            <RightOutlined />
                        </span>
                    </div>
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

                    <div class="calendarDay">
                        <div class="eventList"  @click="(e)=>{calendarDayChange(e,currentDate)}" :class="{'active':isToDay(currentDate)}" :style="{height: height+'px'}">
                            <template v-for="(row,idx) in scheduleList[currentDate]" :key="idx">
                                <div class="eventItem" :style="{top:countTop(row),height:countHeight(row)}">
                                    <!-- <p>{{row.Subject}}</p> -->
                                    <p>{{row.StartDateTime_time}}-{{row.EndDateTime_time}}</p>
                                    <!-- <p>{{row.CreatedByName}}</p> -->
                                </div>
                            </template>
                        </div>
                    </div>
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

    import { SearchOutlined, DeleteOutlined,LeftOutlined,RightOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['calendarDayChange']);

    const props = defineProps({
        currentTime: String,
        startDateTime:String,
        endDateTime:String,
        calendarType:String,
    })

    const data = reactive({
        height: "",
        weekList: [],
        scheduleList: {},
        times: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
            "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        currentDate: '',
        paramsTime: {
            date: "",
            time: ""
        }
    });
    watch(()=>props.currentTime,(newVal,oldVal)=>{
        data.currentDate = dayjs(newVal).format("YYYY-MM-DD");
        console.log("data.currentDate",data.currentDate);
    },{deep: true, immediate: true})
    const weeks = toRaw(['周日', '周一', '周二', '周三', '周四', '周五', '周六']);
    const { height, weekList, scheduleList, times, currentDate, paramsTime } = toRefs(data);
    const weekRef = ref(null);
    onMounted(() => {
        data.height = weekRef.value.scrollHeight;
        data.currentDate=props.currentTime;
    })

    const today = dayjs();
    const week = [];
    for (let i = 0; i < 7; i++) {
        const date = today.startOf('week').add(i - 1, 'day');
        // console.log("date",date.format("YYYY-MM-DD"))
        var time = date.format("YYYY-MM-DD");
        week.push(time);
    }

    const calendarDayChange = (e, item) => {
        let layerY = e.layerY;
        let index = Math.floor(layerY/30/2);
        let startTime = data.times[index > 0 ?  index-1 : index];
        data.paramsTime.date = item;
        let obj = {
            date: item,
            time: startTime
        }
        emit("calendarDayChange", obj);
    }
    // 日-切换日期
    const changeTime = (e) => {
        data.currentDate=dayjs(e).format("YYYY-MM-DD");
        nextTick(()=>{
            let startTime = data.paramsTime.time;
            data.paramsTime.date = data.currentDate;
            let obj = {
                date: data.currentDate,
                time: startTime
            }
            emit("calendarDayChange", obj);
        })
    }
    
    const handleNextDay = () => {
        var date = new Date(data.currentDate);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        data.currentDate=(dayjs(new Date(year, month, day + 1)).format("YYYY-MM-DD"));
        changeTime(data.currentDate);
    }
    const handlePrevDay = () => {
        var date = new Date(data.currentDate);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        data.currentDate=(dayjs(new Date(year, month, day - 1)).format("YYYY-MM-DD"));
        changeTime(data.currentDate);
    }
    // 判断是否是今天
    const isToDay = (time) => {
        const currentTime = dayjs(new Date()).format("YYYY-MM-DD");
        return currentTime == time ? true : false;
    }
    
    // data.currentDate = dayjs(new Date()).format("YYYY-MM-DD");
    // const week2 = week.map(date => {
    //     if (date.isSame(today, 'day')) {
    //         return '今天';
    // } else {
    //     return date.format('MM.DD');
    //     }
    // });

    //console.log("week", week);
    data.weekList = week;
    // const countTop = (row) => {
    //     let index = data.times.findIndex(item => item == row.ScheduledStartTime);
    //     // console.log("index",index);
    //     return (index + 1) * 2 * 30 + "px";
    // }
    const countTop = (row) => {
        var time = dayjs(row.StartDateTime).get('hour');
        let index = data.times.findIndex(item => item.split(':')[0] == time);
        // console.log("index:",index);
        return (index + 1) * 2 * 30 + "px";
    }
    const countHeight = (row) => {
        //console.log("dayjs(row.EndDateTime).get('hour')",dayjs(row.EndDateTime).get('hour'));
        let index = data.times.findIndex(item => item.split(':')[0] == dayjs(row.StartDateTime).get('hour'));
        let endIndex = data.times.findIndex(item => item.split(':')[0] == dayjs(row.EndDateTime).get('hour'));
        //console.log("endIndex",index,endIndex);
        let num = endIndex - index;
        return num * 60 + 'px';
    }
    const getQuery = (calendarItem) => {
        if(calendarItem){}else{
            let StartDateTime = dayjs(new Date()).startOf("day").format("YYYY-MM-DD");
            let EndDateTime = dayjs(new Date()).endOf("day").format("YYYY-MM-DD");
            let hour = (new Date()).getHours() + 1;
            hour = hour < 10 ? '0' + hour : hour;
            let StartDateTime_time = hour+':00';
            let hour2 = (new Date()).getHours() + 2;
            hour2 = hour2 < 10 ? '0' + hour2 : hour2;
            let EndDateTime_time = hour2+':00';
            calendarItem={
                Id:'',
                Subject: '',
                What: '',
                Who: '',
                StartDateTime: StartDateTime+' '+StartDateTime_time,
                EndDateTime: EndDateTime+' '+EndDateTime_time,
                IsAllDayEvent: false,
                IsPrivate: false,
                IsRecurrence2:false,
                sobjectType: "Event"
            }
        }
        let obj = {};
        let daydate = dayjs(calendarItem.StartDateTime).format('YYYY-MM-DD');
        if(!obj[daydate]){
            obj[daydate] = [];
        }
        calendarItem.StartDateTime=calendarItem.StartDateTime?dayjs(calendarItem.StartDateTime).format("YYYY-MM-DD HH:mm"):'';
        calendarItem.EndDateTime=calendarItem.EndDateTime?dayjs(calendarItem.EndDateTime).format("YYYY-MM-DD HH:mm"):'';
        calendarItem.StartDateTime_time=calendarItem.StartDateTime?dayjs(calendarItem.StartDateTime).format("HH:mm"):'';
        calendarItem.EndDateTime_time=calendarItem.EndDateTime?dayjs(calendarItem.EndDateTime).format("HH:mm"):'';
        data.paramsTime.date = props.currentTime;
        data.paramsTime.time = calendarItem.StartDateTime_time;
        obj[daydate].push(calendarItem);
        data.scheduleList = obj;
    }
    getQuery();
    defineExpose({getQuery});
</script>
<style lang="less" scoped>
    .weekWrap {
        width: 100%;
        height: 100%;
.arrowIcon{
    cursor: pointer;
}
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
</style>