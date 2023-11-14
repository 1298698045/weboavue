<template>
    <div class="weekWrap">
        <div class="weekCalendar">
            <div class="weekCalendarHead">
                <div class="timeZone">
                    姓名
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
                                <div class="roomName">{{item.calendar.Name}}</div>
                            </td>
                            <td v-for="(row, idx) in weekList" :key="idx" :class="{'active':isToDay(row)}">
                                <a-popconfirm trigger="hover" cancelText="编辑" okText="删除"
                                v-for="(col, colIdx) in item.calendarItems" :key="colIdx">
                                    <template #icon></template>
                                    <template #title>
                                        <div class="meetingMessageWrap">
                                            <div class="meetingHead">
                                                <div class="meetingLogo">
                                                    <img :src="require('@/assets/img/meeting.png')" alt="">
                                                </div>
                                                <p class="meetingName">{{col.Subject}}</p>
                                            </div>
                                            <div class="meetingBody">
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        被分配人：
                                                        <span class="OwningUserName">{{col.OwningUserName}}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        地址：
                                                        <span class="TelePhone">{{col.Location || ''}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        联系电话：
                                                        <span class="OwningUserName">{{ col.Phone }}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        分配人：
                                                        <span class="TelePhone">{{col.CreatedByName || ''}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        开始：
                                                        <span class="OwningUserName">{{col.StartDateTime}}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        结束：
                                                        <span class="TelePhone">{{col.EndDateTime}}</span>
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
                                    <div class="meetingBox" v-if="showMeeting(col,row)">
                                        <div class="meetingItem">
                                            <p>{{dayjs(col.StartDateTime).format("HH:mm")}} {{col.Subject}}</p>
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
        var date = dayjs(col.StartDateTime).format("YYYY-MM-DD");
        return date == row ? true : false;
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

    const getQuery = () => {
        let startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
        let endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
        proxy.$get(Interface.scheduleTable.list, {
            startTime: startTime,
            endTime: endTime,
            scope: "dept",
            deptid: "",
            calendarType: ""
        }).then(res => {
            data.roomList = res.listData;
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