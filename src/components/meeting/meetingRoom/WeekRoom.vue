<template>
    <div class="weekWrap">
        <div class="weekCalendar">
            <div class="weekCalendarHead">
                <div class="timeZone">
                    会议室
                </div>
                <div class="calendarDayHeaders">
                    <div class="weekDayHeadItem" v-for="(item,index) in weekList" :key="index">{{item}} ({{ weeks[index]
                        }})</div>
                </div>
            </div>
            <div class="weekCalendarBody" ref="weekRef">
                <table>
                    <tbody>
                        <tr v-for="(item,index) in roomList" :key="index">
                            <td>
                                <div class="roomName">{{item.Name}}</div>
                            </td>
                            <td v-for="(row, idx) in weekList" :key="idx" :class="{'active':isToDay(row)}">
                                <a-popconfirm trigger="hover" cancelText="编辑" okText="删除"
                                v-for="(col, colIdx) in item.Reserves" :key="colIdx">
                                    <template #icon></template>
                                    <template #title>
                                        <div class="meetingMessageWrap">
                                            <div class="meetingHead">
                                                <div class="meetingLogo">
                                                    <img :src="require('@/assets/img/meeting.png')" alt="">
                                                </div>
                                                <p class="meetingName">{{col.Name}}</p>
                                            </div>
                                            <div class="meetingBody">
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        召集人：
                                                        <span class="OwningUserName">{{col.CreatedByName}}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        联系电话：
                                                        <span class="TelePhone">{{col.TelePhone || ''}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        会议室：
                                                        <span class="OwningUserName">{{ col.RoomIdName }}</span>
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
                                                        <span class="OwningUserName">{{col.ScheduledStart}}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        结束：
                                                        <span class="TelePhone">{{col.ScheduledEnd}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        备注：
                                                        <span class="OwningUserName">{{col.Description}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <a-button type="link">更多详细信息</a-button>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="meetingBox" v-if="showMeeting(col, row)">
                                        <div class="meetingItem">
                                            <p class="name">{{col.Name}}</p>
                                            <p>{{col.ScheduledStartTime}}-{{col.ScheduledEndTime}} {{col.CreatedByName}}预约</p>
                                        </div>
                                    </div>
                                </a-popconfirm>
                            </td>
                        </tr>
                    </tbody>
                </table>
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

    const props = defineProps({
        week: Array
    })
    const data = reactive({
        height: "",
        weekList: [],
        meetingList: {},
        times: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
            "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        roomList: []

    });
    const showMeeting = (col, row) => {
        return col.ScheduledStartDate == row ? true : false;
    }
    const weeks = toRaw(['周日', '周一', '周二', '周三', '周四', '周五', '周六']);
    const { height, weekList, meetingList, times, roomList } = toRefs(data);
    const weekRef = ref(null);
    onMounted(() => {
        data.height = weekRef.value.scrollHeight;
    })

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

    const getMeetingRoom = () => {
        proxy.$get(Interface.meetingRoom.roomList,{}).then(res=>{
            console.log("res",res);
            data.roomList = res.listData;
        })
    }
    getMeetingRoom();

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
<style lang="less" scoped>
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
                    width: 12.5%;
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
                width: 100%;
                height: calc(~"100% - 43px");
                overflow: auto;
                background: #fff;
                table{
                    width: 100%;
                    border-collapse: collapse;
                    tr {
                        td{
                            border: 1px solid #dedede;
                            width: 12.5%;
                            height: 50px;
                            text-align: center;
                            padding-bottom: 10px;
                            vertical-align: middle;
                            box-sizing: content-box;
                            .roomName{
                                padding: 5px;
                                box-sizing: content-box;
                            }
                            .meetingItem {
                                width: 100%;
                                background: var(--backColor);
                                color: #fff;
                                text-align: left;
                                padding: 2px 5px;
                                cursor: pointer;
                                font-size: 12px;
                                border-radius: 3px;
                                margin-top: 2px;
                            }
                        }
                        td:first-child{
                            background: #f0f2f6;
                        }
                        td.active{
                            background: #fefae6;
                        }
                    }
                    tr:first-child{
                        td{
                            border-top: none;
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