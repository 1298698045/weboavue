<template>
    <div class="monthWrap" :style="{width:props.width+'px'}">
        <div class="monthCalendar">
            <div class="monthCalendarHead">
                <div class="timeZone">会议室</div>
                <div class="calendarDayHeaders" ref="headRef">
                    <div class="monthDayHeadItem" v-for="(item,index) in monthDayList" :key="index">
                        {{item}}
                    </div>
                </div>
            </div>
            <div class="monthCalendarBody">
                <div class="calendarFixed" :style="{height:height+'px'}" ref="leftRef">
                    <strong v-for="(item,index) in roomList" :key="index" :style="{height: item.height+'px'}">
                        <span>{{item.Name}}</span>
                    </strong>
                </div>
                <div class="tableWrap" ref="contentRef">
                    <div class="scroll" :style="{width: width+'px'}">
                        <table>
                            <tbody>
                                <tr v-for="(item,index) in roomList" :key="index"  :ref="(el) => setItemRefs(el, item, index)">
                                    <td v-for="(row,idx) in monthDayList" :key="idx">
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
                                                                <span
                                                                    class="OwningUserName">{{col.CreatedByName}}</span>
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
                                                                <span
                                                                    class="OwningUserName">{{col.ScheduledStart}}</span>
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
                                            <div class="meetingBox" v-if="showMeeting(col,row)">
                                                <div class="meetingItem">
                                                    <p class="name">{{col.Name}}</p>
                                                    <p>{{col.ScheduledStartTime}}-{{col.ScheduledEndTime}}
                                                        {{col.CreatedByName}}预约</p>
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
    const itemRefs = [];
    const data = reactive({
        monthDayList: [],
        roomList: [],
        width: 0,
        height: 0
    });
    const props = defineProps({
        width: [String, Number]
    })
    const { monthDayList, roomList, width, height } = toRefs(data);
    const contentRef = ref(null);
    const headRef = ref(null);
    const leftRef = ref(null);
    onMounted(() => {
        console.log("contentRef", contentRef.value.clientWidth);
        data.height = contentRef.value.clientHeight;
        contentRef.value.addEventListener("scroll", (e) => {
            let left = e.target.scrollLeft;
            let top = e.target.scrollTop;
            headRef.value.scrollLeft = left;
            leftRef.value.scrollTop = top;
        })
    })
    const setItemRefs = (el,item,index) => {
        if(el && el!=null){
            itemRefs.push({
                id: index,
                el
            })
        }
    }
    const getMeetingRoom = () => {
        proxy.$get(Interface.meetingRoom.roomList, {}).then(res => {
            data.roomList = res.listData.map(item=>{
                item.height = 0;
                return item;
            });
            nextTick(()=>{
                data.roomList.forEach((item,index)=>{
                    console.log('itemRefs', itemRefs[index].el.clientHeight);
                    item.height = itemRefs[index].el.clientHeight;
                })
            })
        })
    }
    getMeetingRoom();
    const getDaysArrayByMonth = (year,month) => {
        // //获取当前月份包含的天数
        // var daysInMonth = dayjs().daysInMonth();
        // var arrDays = [];
        // //循环获取月份里的日期
        // while (daysInMonth) {
        //     var current = dayjs().date(daysInMonth);
        //     arrDays.push(current);
        //     daysInMonth--;
        // }
        // return arrDays;
        const startOfMonth = dayjs(`${year}-${month}-01`).startOf('month');
        const endOfMonth = dayjs(`${year}-${month}-01`).endOf('month');
        const daysInMonth = [];
        let currentDay = startOfMonth;

        while (currentDay.isBefore(endOfMonth) || currentDay.isSame(endOfMonth, 'date')) {
            daysInMonth.push(currentDay.format('YYYY-MM-DD'));
            currentDay = currentDay.add(1, 'day');
        }
        return daysInMonth;

    }
    const schedule = getDaysArrayByMonth(new Date().getFullYear(), new Date().getMonth()+1);
    console.log("schedule",schedule);
    // let temp = [];
    // schedule.forEach(function (item) {
    //     console.log(item.format("DD/MM"));
    //     temp.unshift(item.format("MM-DD"));
    // });
    data.monthDayList = schedule;
    data.width = data.monthDayList.length * 145;

    const showMeeting = (col,row) => {
        // console.log(col,row);
        var date = dayjs(col.ScheduledStartDate).format("MM-DD")
        return date == row ? true : false;
    }
</script>
<style lang="less" scoped>
    .monthWrap {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .monthCalendar {
            width: 100%;
            height: 100%;

            .monthCalendarHead {
                line-height: 42px;
                background: #fff;
                border-bottom: 1px solid #e5e6eb;
                display: flex;
                align-items: center;

                .timeZone {
                    min-width: 145px;
                    width: 145px;
                    text-align: center;
                    border-right: 1px solid rgb(221, 219, 218);
                    box-sizing: content-box;
                }

                .calendarDayHeaders {
                    flex: 1;
                    display: flex;
                    flex-wrap: nowrap;
                    overflow: auto;

                    .monthDayHeadItem {
                        min-width: 145px;
                        text-align: center;
                    }
                }

                .calendarDayHeaders::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                    background-color: transparent;
                }

                .calendarDayHeaders::-webkit-scrollbar-thumb {
                    border-radius: 0;
                    -webkit-box-shadow: none;
                }

                .calendarDayHeaders::-webkit-scrollbar-track {
                    -webkit-box-shadow: transparent;
                    background-color: transparent;
                }
            }

            .monthCalendarBody {
                width: 100%;
                height: 100%;
                position: relative;

                .calendarFixed {
                    position: absolute;
                    width: 145px;
                    background: #f5f6f9;
                    overflow: auto;
                    &::-webkit-scrollbar {
                        width: 0;
                        height: 0;
                        background-color: transparent;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 0;
                        -webkit-box-shadow: none;
                    }

                    &::-webkit-scrollbar-track {
                        -webkit-box-shadow: transparent;
                        background-color: transparent;
                    }
                    strong {
                        width: 145px;
                        font-weight: normal;
                        display: block;
                        padding: 10px 0 0 0;
                        height: 71px;
                        border-bottom: 1px solid rgb(221, 219, 218);
                        text-align: center;
                        vertical-align: middle;
                        box-sizing: border-box;
                    }

                    strong:first-child {
                        border-top: none;
                    }
                }

                .tableWrap {
                    width: calc(~"100% - 145px");
                    height: calc(~"100% - 45px");
                    overflow: auto;
                    margin-left: 145px;
                    table {
                        border-collapse: collapse;

                        tr {
                            td {
                                min-width: 145px;
                                height: 71px;
                                border: 1px solid rgb(221, 219, 218);
                                .meetingItem {
                                    width: 100%;
                                    background: var(--backColor);
                                    color: #fff;
                                    text-align: left;
                                    padding: 2px 5px;
                                    cursor: pointer;
                                    font-size: 10px;
                                    border-radius: 3px;
                                    margin-top: 2px;
                                }
                            }

                            &:first-child {
                                td {
                                    border-top: none;
                                }
                            }
                        }
                    }
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
</style>