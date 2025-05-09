<template>
    <div class="cardItem widgetItem" :class="themeType">
        <div class="card-header" v-if="themeType=='modern'">
            <div class="header-title">{{item.name}}</div>
        </div>
        <template v-if="themeType=='default'">
            <div class="item-default-header">
                <span class="item-default-header-title">
                    <span class="title-font">{{item.name}}</span>
                </span>
                <span class="toolbar">
                    <ul>
                        <li>
                            <a href="javascript:void(0);" name="refreshbtn" title="刷新">
                                <img :src="require('@/assets/img/refresh_wev8.png')" border="0" alt="">
                            </a>
                        </li>
                        <li style="width: 34px;">
                            <a href="javascript:void(0);">
                                <img class="imgMore" :src="require('@/assets/img/more_wev8.png')" border="0" alt="" title="更多" @click="gotoMore">
                            </a>
                        </li>
                    </ul>
                </span>
            </div>
        </template>
        <template v-if="themeType=='light'">
            <div class="dashGridItem">
                <h2 class="defaultHeading">
                    <div class="gridHeader truncation" :title="item.name">{{item.name}}</div>
                    <div class="gridTitle truncation"></div>
                </h2>
                <div class="table-container" style="height: calc(100% - 90px);">
                    <div class="calendar-wrapper">
                        <a-calendar :locale="locale" v-model:value="date" :fullscreen="false" @panelChange="onPanelChange" @change="changeCalendar">
                            <template #dateCellRender="{ current }">
                                <span class="tagRadius" v-if="getIsRecord(current)"></span>
                            </template>
                        </a-calendar>
                        <div class="planDataEvent">
                            <div class="dataEvent" v-for="item in listData" @click="handlePreview(item)">
                                <div class="dataEvent1"></div>
                                <div class="cus_dataEvent2">
                                    <div class="dataEvent2_1">{{moment(item.ScheduledStart).format("hh:mm")}}-{{moment(item.ScheduledEnd).format("hh:mm")}}</div>
                                </div>
                                <div class="dataEvent3">{{item.Subject}}</div>
                            </div>
                        </div>
                        <div class="addDataEvent" @click="handleAddSchedule">
                            <PlusCircleOutlined />
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <span>
                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.8 2H33.3c-1 0-1.3.9-.5 1.7l4.9 4.9-9 9c-.5.5-.5 1.3 0 1.9l3.7 3.7c.5.5 1.3.5 1.9 0l9.1-9.1 4.9 4.9c.8.8 1.7.5 1.7-.5V3.1c0-.6-.6-1.1-1.2-1.1zM3.5 50h15.4c1 0 1.3-1.1.5-1.9l-4.9-5 9-9.1c.5-.5.5-1.4 0-1.9l-3.7-3.7c-.5-.5-1.3-.5-1.9 0l-9 9-5-4.9C3 31.7 2 32 2 33v15.4c0 .7.8 1.6 1.5 1.6zM50 48.8V33.3c0-1-.9-1.3-1.7-.5l-4.9 4.9-9-9c-.5-.5-1.3-.5-1.9 0l-3.7 3.7c-.5.5-.5 1.3 0 1.9l9.1 9.1-4.9 4.9c-.8.8-.5 1.7.5 1.7h15.4c.6 0 1.1-.6 1.1-1.2zM2 3.5v15.4c0 1 1.1 1.3 1.9.5l5-4.9 9.1 9c.5.5 1.4.5 1.9 0l3.7-3.7c.5-.5.5-1.3 0-1.9l-9-9 4.9-5C20.3 3 20 2 19 2H3.6C2.9 2 2 2.8 2 3.5z"></path></svg>
                    </span>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="card-body">
                <div class="calendar-wrapper">
                    <a-calendar :locale="locale" v-model:value="date" :fullscreen="false" @panelChange="onPanelChange" @change="changeCalendar">
                        <template #dateCellRender="{ current }">
                            <span style="display: inline-block;width: 6px;height: 8px;">
                                <span class="tagRadius" v-if="getIsRecord(current)"></span>
                            </span>
                        </template>
                    </a-calendar>
                    <div class="planDataEvent">
                        <div class="dataEvent" v-for="item in listData" @click="handlePreview(item)">
                            <div class="dataEvent1"></div>
                            <div class="cus_dataEvent2">
                                <div class="dataEvent2_1">{{moment(item.ScheduledStart).format("hh:mm")}}-{{moment(item.ScheduledEnd).format("hh:mm")}}</div>
                            </div>
                            <div class="dataEvent3">{{item.Subject}}</div>
                        </div>
                    </div>
                    <div class="addDataEvent" @click="handleAddSchedule">
                        <PlusCircleOutlined />
                    </div>
                </div>
            </div>
            <div class="card-foot"></div>
        </template>
        <AddSchedule :isShow="isAddSchedule" v-if="isAddSchedule" :paramsTime="paramsTime" @cancel="cancelAddSchedule" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" @selectVal="handleNewScheduleVal" :calendarType="calendarType" />
        <ScheduleDetailModal :isShow="isScheduleDetail" v-if="isScheduleDetail" :id="scheduleId" @cancel="isScheduleDetail=false" />
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, getCurrentInstance } from "vue";
    import { PlusCircleOutlined } from '@ant-design/icons-vue';
    import Table from "./Table.vue";
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
    dayjs.locale("zh-cn");
    import calendar from "dayjs/plugin/calendar";
    import weekday from "dayjs/plugin/weekday";
    import localeData from "dayjs/plugin/localeData";
    import AddSchedule from "@/components/schedule/AddSchedule.vue";
    import ScheduleDetailModal from "@/components/schedule/ScheduleDetailModal2.vue";

    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    import moment from "moment";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useStore } from "vuex";
    const store = useStore();
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String,
        dashboardId: String
    });

    const data = reactive({
        date: "",
        tabs: [
            {
                displayName: "日程",
                listComponent: {
                    dataList: []
                }
            },
            {
                displayName: "会议",
                listComponent: {
                    dataList: []
                }
            },
            {
                displayName: "活动",
                listComponent: {
                    dataList: []
                }
            }
        ],
        current: 0,
        listData: [],
        isAddSchedule: false,
        paramsTime: {
            date: "",
            time: "",
            end:"",
            endDate:""
        },
        objectTypeCode: "4200",
        sObjectName: "ActivityPointer",
        calendarType: '2',
        isScheduleDetail: false,
        scheduleId: "",
        eventList: [],
        year: "",
        month: "",
        startDateTime: "",
        endDateTime: ""
    });
    const { date, tabs, current, listData, isAddSchedule, paramsTime, objectTypeCode, 
        sObjectName, calendarType, isScheduleDetail, scheduleId, eventList, year, month, startDateTime, endDateTime  } = toRefs(data);
    const newDate = new Date();
    data.year = newDate.getFullYear();
    data.month = newDate.getMonth() + 1;

    const onPanelChange = (e) => {
        
    };
    const changeCalendar = (e) => {
        let date = dayjs(e).format('YYYY-MM-DD');
        data.year = dayjs(e).format('YYYY');
        data.month = dayjs(e).format('MM');
        data.startDateTime = date;
        data.endDateTime = date;
        getEventsStati();
        getScheduleList();
    }
    const handleItemTab = (item, index) => {
        data.current = index;
    };

    const getIsRecord = (current) => {
        let isBook = false;
        let currentDate = dayjs(current).format("YYYY-MM-DD");
        let row = data.eventList.find(item=>item.date == currentDate);
        if(row && row.quantity > 0){
            isBook = true;
        }
        return isBook;
    };

    const getEventsStati = () => {
        
        let obj = {
            actions:[{
                id: "",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    year: data.year,
                    month: data.month
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.getEventsStati, d).then(res=>{
            data.eventList = res.actions[0].returnValue;
        })
    }
    getEventsStati();

    const getScheduleList = () => {
        let obj = {
            actions:[{
                id: "",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    startDateTime: data.startDateTime,
                    endDateTime: data.endDateTime,
                    queryType: "day",
                    calendarType: '',
                    queryEvents: true,
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.schedule.list, d).then(res=>{
            let calendarItems = res.actions[0].returnValue[0].calendarItems;
            let temp = [];
            calendarItems.forEach(item=>{
                let obj = {
                    scheduleId: item.Id,
                    ScheduledStart: item.StartDateTime,
                    ScheduledEnd: item.EndDateTime,
                    Subject: item.Subject
                };
                temp.push(obj);
            });
            data.listData = temp;
        })
    };

    const getQuery = async () => {
        let obj = {
            actions:[{
                id: "",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    dashboardId: props.dashboardId,
                    componentId: props.item.id
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.portal.loadComponents, d).then(res=>{
            let { componentData, dashboardComponentMetadata } = res.actions[0].returnValue;
            let { rows, rowCount } = componentData;
            data.listData = rows;
        });
    };
    getQuery();

    const handleAddSchedule = () => {
        data.isAddSchedule = true;
    }
    const cancelAddSchedule = () => {
        data.isAddSchedule = false;
    }
    const handleNewScheduleVal = () => {
        data.isAddSchedule = false;
        getQuery();
    };

    const handlePreview = (item) => {
        // console.log("item", item);
        data.scheduleId = item.ActivityId;
        data.isScheduleDetail = true;
    }

    const gotoMore = () => {
        let { moreUrl } = props.item.properties;
        const url = router.resolve({path: "/lightning/o/Event/home"});
        window.open(url.href);
    }

</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);
    .tabContainer.flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tabContainer {
        border-bottom: 1px solid #e5e6eb;

        .tabList {
            height: 40px;
            line-height: 40px;
            cursor: pointer;

            .tab {
                font-size: 14px;
                color: #4e5969;
                padding: 0 8px;
                float: left;
                width: auto !important;

                &:hover {
                    .tabHover {
                        background: #f2f3f5;
                    }
                }

                .tabHover {
                    border-radius: 2px;
                    padding: 0 8px !important;
                    box-sizing: border-box;
                    background: transparent;
                    display: inline-block;
                    height: 29px;
                    line-height: 29px;

                    .bottom {
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: var(--textColor);
                        top: 33px;
                        left: 1px;
                    }

                    .tabText {
                        position: relative;

                        .num.active {
                            color: #f53f3f;
                        }
                    }
                }
            }

            .tab.active {
                .tabHover {
                    .tabText {
                        color: var(--textColor);
                        font-weight: 700;
                    }

                    .tabText::before {
                        content: "";
                        display: inline-block;
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: var(--textColor);
                        top: 29px;
                        left: 0;
                        transition: all 0.5s;
                    }
                }

                &:hover {
                    .tabHover {
                        background: transparent;
                    }
                }
            }
        }
    }

    .tabContainer.notBorder {
        border: none;
    }


    /* 默认 */

    .planDataEvent{
        height: 120px;
        overflow-y: auto;
        .dataEvent{
            border: 0 solid #f3f2f2;
            line-height: 36px;
            border-width: 0;
            border-bottom: 0;
            float: left;
            height: 36px;
            width: 100%;
            margin-bottom: 4px;
            cursor: pointer;
            .dataEvent1{
                line-height: 36px;
                float: left;
                height: 36px;
                width: 4px;
                background: #119800 !important;
            }
            .cus_dataEvent2{
                margin-left: 0;
                line-height: 36px;
                float: left;
                height: 36px;
                background: #f5f5f5;
                .dataEvent2_1{
                    margin-left: 10px;
                    margin-right: 10px;
                    float: left;
                }
            }
            .dataEvent3{
                margin-left: 5px;
                padding-left: 12px;
                height: 36px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .addDataEvent{
        font-size: 23px;
        text-align: center;
        cursor: pointer;
        color: #0d96f6;
    }
    .tagRadius{
        width: 6px;
        height: 6px;
        background: #3399ff;
        border-radius: 50%;
        display: inline-block;
    }
</style>