<template>
  <div class="weekWrap AddScheduleDayModal2">
    <div ref="weekRef">
      <FullCalendar
        class="fullCalendar"
        ref="fullCalendarDay"
        :options="calendarOptions"
      >
        <template #eventContent="arg">
          <div
            class="my-custom-event"
            :style="{
              background: arg.event.backgroundColor,
              color: arg.event.textColor,
              borderColor: arg.event.borderColor,
            }"
          >
            <a-popconfirm
              placement="topLeft"
              trigger="hover"
              cancelText="取消"
              okText="查看"
              @confirm="handleDetail(arg.event)"
              :z-index="20000"
              overlayClassName="meeting-popover"
            >
              <template #icon></template>
              <template #title>
                <div class="meetingMessageWrap">
                  <div class="meetingHead">
                    <div class="meetingLogo">
                      <img :src="require('@/assets/img/meeting.png')" alt="" />
                    </div>
                    <p class="meetingName">{{ arg.event.title }}</p>
                  </div>
                  <div class="meetingBody">
                    <div class="meetingInfo">
                      <div class="meetingInfoItem">
                        标题：
                        <span class="Subject">{{
                          arg.event.extendedProps.name
                        }}</span>
                      </div>
                    </div>
                    <div class="meetingInfo">
                      <div class="meetingInfoItem">
                        用车时间：
                        <span class="StartDateTime">{{
                          dayjs(arg.event.start).format("YYYY-MM-DD HH:mm")
                        }}</span
                        >&nbsp;&nbsp;止&nbsp;&nbsp;<span class="EndDateTime">{{
                          dayjs(arg.event.end).format("YYYY-MM-DD HH:mm")
                        }}</span>
                      </div>
                    </div>
                    <div class="meetingInfo">
                      <div class="meetingInfoItem">
                        用车人：
                        <span class="AppUserIdName">{{
                          arg.event.extendedProps.AppUserIdName
                        }}</span>
                      </div>
                      <div class="meetingInfoItem">
                        车辆名称：
                        <span class="TelePhone">{{
                          arg.event.extendedProps.vehicleIdName
                        }}</span>
                      </div>
                    </div>
                    <div class="meetingInfo">
                      <div class="meetingInfoItem">
                        开始地点：
                        <span class="Where">{{
                          arg.event.extendedProps.startFrom || ""
                        }}</span>
                      </div>
                    </div>
                    <div class="meetingInfo">
                      <div class="meetingInfoItem">
                        去往地点：
                        <span class="Where">{{
                          arg.event.extendedProps.destination || ""
                        }}</span>
                      </div>
                    </div>

                    <div class="meetingInfo">
                      <div class="meetingInfoItem">
                        审批状态：
                        <span
                          class="StatusCodeName"
                          v-if="arg.event.extendedProps.StatusCode == '0'"
                          style="color: #0070d2"
                          >{{
                            arg.event.extendedProps.StatusCodeName || "待审批"
                          }}</span
                        >
                        <span
                          class="StatusCodeName"
                          v-else-if="arg.event.extendedProps.StatusCode == '1'"
                          style="color: #f7aa2d"
                          >{{
                            arg.event.extendedProps.StatusCodeName || "流转中"
                          }}</span
                        >
                        <span
                          class="StatusCodeName"
                          v-else-if="arg.event.extendedProps.StatusCode == '3'"
                          style="color: #31ba6a"
                          >{{
                            arg.event.extendedProps.StatusCodeName ||
                            "审批已完成"
                          }}</span
                        >
                        <span
                          class="StatusCodeName"
                          v-else-if="arg.event.extendedProps.StatusCode == '5'"
                          style="color: #b3b3b3"
                          >{{
                            arg.event.extendedProps.StatusCodeName || "已拒绝"
                          }}</span
                        >
                        <span class="StatusCodeName" v-else>{{
                          arg.event.extendedProps.StatusCodeName || ""
                        }}</span>
                      </div>
                    </div>
                    <div class="meetingInfo">
                      <div class="meetingInfoItem">
                        用车事由：
                        <span
                          class="What"
                          v-html="arg.event.extendedProps.Description || ''"
                        ></span>
                      </div>
                    </div>
                    <div class="meetingInfo meetingInfo1">
                      <a-button
                        type="link"
                        @click.stop="handleDetailView(arg.event.id)"
                        >详细信息</a-button
                      >
                    </div>
                  </div>
                </div>
              </template>
              <div class="eventItem">
                <p>
                  {{ dayjs(arg.event.start).format("HH:mm") }}-{{
                    dayjs(arg.event.end).format("HH:mm")
                  }}&nbsp;&nbsp;&nbsp;{{ arg.event.title }}
                </p>
                <!-- <p>{{dayjs(arg.event.start).format("HH:mm")}}-{{dayjs(arg.event.end).format("HH:mm")}}</p>
                                        <p>{{arg.event.CreatedByName}}</p> -->
              </div>
            </a-popconfirm>
          </div>
        </template>
      </FullCalendar>
    </div>
    <ScheduleDetailModal
      :isShow="isScheduleDetail"
      v-if="isScheduleDetail"
      :id="detailId"
      @cancel="isScheduleDetail = false"
      @selectVal="handleNewScheduleVal"
      @handleDelete="handleDelete"
      @edit="handleOpenEdit"
    />
    <MeetingDetailModal
      :isShow="isMeetingDetail"
      v-if="isMeetingDetail"
      :meetingId="detailId"
      @cancel="isMeetingDetail = false"
      @edit="handleOpenEdit"
      @handleDelete="handleDelete"
    />
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
  toRaw,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
import calendar from "dayjs/plugin/calendar";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);

import {
  SearchOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import zhCnLocale from "@fullcalendar/core/locales/zh-cn";
import ScheduleDetailModal from "@/components/schedule/ScheduleDetailModal.vue";
import MeetingDetailModal from "@/components/meeting/MeetingDetailModal2.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const emit = defineEmits(["calendarDayChange"]);
const colors = ["#3399ff", "#f0854e", "#61cc53", "#eb3d85"];
const props = defineProps({
  id: String,
  currentTime: String,
  startDateTime: String,
  endDateTime: String,
  DestinationTypeCode: String,
  objectTypeCode: String,
});

const data = reactive({
  height: "",
  weekList: [],
  scheduleList: {},
  times: [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
  currentDate: "",
  paramsTime: {
    date: "",
    time: "",
  },
  detailId: "",
  isScheduleDetail: false,
  isMeetingDetail: false,
  calendarOptions: {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin], //需要加载的插件
    initialView: "timeGridDay", //初始视图
    initialDate: props.currentTime,
    height: "auto",
    locale: zhCnLocale, //语言汉化
    selectable: true,
    editable: true,
    forceEventDuration: true,
    droppable: true,
    // dropAccept: ".eventListItems", //可被拖进
    dayMaxEventRows: 99, //事件最大展示列数
    nowIndicator: true,
    fixedWeekCount: false, //因为每月起始日是星期几不固定，导致一个月的行数会不固定，是否固定行数
    // drop: null, //外部拖拽进的事件方法
    handleWindowResize: true,
    windowResizeDelay: 100,
    allDaySlot: false, // 关闭全天选项,
    dayMaxEvents: 6,
    moreLinkContent: "+ 更多",
    slotEventOverlap: false,
    aspectRatio: 2, //宽高比
    // 最小时间
    slotMinTime: "06:00:00",
    // 最大时间
    slotMaxTime: "24:00:00",
    slotDuration: "00:30:00",
    slotLabelFormat: {
      hour: "2-digit",
      minute: "2-digit",
      meridiem: false,
      hour12: false, // 设置时间为24小时
    },
    selectMirror: true,
    customButtons: {
      myCustomButton: {
        text: "看板",
        click: function () {
          isWeekViewShow.value = true;
        },
      },
    },
    headerToolbar: {
      left: "today prev next",
      center: "title",
      //right: "myCustomButton,dayGridMonth,timeGridWeek,timeGridDay"
    }, //日历上方的按钮和title
    events: [
      // {
      //     backgroundColor: "#1055BC",
      //     borderColor: "#1055BC",
      //     end: "2024-08-06 23:00:00",
      //     id: "001",
      //     start: "2024-08-06 22:00:00",
      //     textColor: "#FFF",
      //     title: "测试"
      // }
    ], //绑定展示事件
    // 自定义展示内容
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    },
    // eventContent: event => {},
    eventDidMount: (info) => {
      //calendarDayChange2(info,'eventDidMount');
    },
    //点击日期info是单元格的信息
    dateClick: (info) => {
      //calendarDayChange2(info,'点击日期');
    },
    //事件的点击
    eventClick: (info) => {
      calendarDayChange2(info, "事件的点击");
    },
    // 移动事件或者拓展事件时间触发函数 返回数组 item._context.options.events Array 当前所有事件
    eventsSet: (info) => {
      // calendarDayChange2(info,'移动事件或者拓展事件');
    },
    // 滑动选择时触发
    select: (info) => {
      calendarDayChange2(info, "滑动选择时触发");
    },
    // 时间调整结束后触发
    eventResize: (info) => {
      calendarDayChange2(info, "时间调整结束后触发");
    },
    // 拖动触发
    eventDrop: (info) => {
      calendarDayChange2(info, "拖动触发");
    },
    // 切换视图时触发
    datesSet: (view) => {},
  },
});
watch(
  () => props.currentTime,
  (newVal, oldVal) => {
    data.currentDate = dayjs(newVal).format("YYYY-MM-DD");
    //console.log("data.currentDate",data.currentDate);
  },
  { deep: true, immediate: true }
);
const weeks = toRaw(["周日", "周一", "周二", "周三", "周四", "周五", "周六"]);
const {
  height,
  weekList,
  scheduleList,
  times,
  currentDate,
  paramsTime,
  calendarOptions,
  detailId,
  isScheduleDetail,
  isMeetingDetail,
} = toRefs(data);
const weekRef = ref(null);
const fullCalendarDay = ref(null);
onMounted(() => {
  data.height = weekRef.value.scrollHeight;
  data.currentDate = props.currentTime;
  //getQuery();
});

const today = dayjs();
const week = [];
for (let i = 0; i < 7; i++) {
  const date = today.startOf("week").add(i - 1, "day");
  // console.log("date",date.format("YYYY-MM-DD"))
  var time = date.format("YYYY-MM-DD");
  week.push(time);
}

const calendarDayChange = (e, item) => {
  let layerY = e.layerY;
  let index = Math.floor(layerY / 30 / 2);
  let startTime = data.times[index > 0 ? index - 1 : index];
  data.paramsTime.date = item;
  let obj = {
    date: item,
    time: startTime,
  };
  emit("calendarDayChange", obj);
};
const calendarDayChange2 = (info, text) => {
  console.log(text, info);
  let start = "";
  let end = "";
  if (text == "滑动选择时触发" && info.start) {
    start = info.start;
    end = info.end;
  }
  // if(text=='移动事件或者拓展事件'&&info[0]){
  //     start=info[0].startStr;
  //     end=info[0].endStr;
  // }
  if (
    (text == "事件的点击" ||
      text == "拖动触发" ||
      text == "时间调整结束后触发") &&
    info.event
  ) {
    start = info.event.startStr;
    end = info.event.endStr;
  }
  let startDate = dayjs(start).format("YYYY-MM-DD");
  let endDate = dayjs(end).format("YYYY-MM-DD");
  let startTime = dayjs(start).format("HH:mm");
  let endTime = dayjs(end).format("HH:mm");
  data.paramsTime.date = startDate;
  let obj = {
    date: startDate,
    time: startTime,
    end: endTime,
    endDate: endDate,
  };
  // if(data.paramsTime.endDate){
  //     obj.endDate=data.paramsTime.endDate;
  // }
  //console.log(start,end,obj)
  if (start && end) {
    emit("calendarDayChange", obj);
  }
};
// 日-切换日期
const changeTime = (e) => {
  data.currentDate = dayjs(e).format("YYYY-MM-DD");
  nextTick(() => {
    let startTime = data.paramsTime.time;
    data.paramsTime.date = data.currentDate;
    let obj = {
      date: data.currentDate,
      time: startTime,
    };
    emit("calendarDayChange", obj);
  });
};

const handleNextDay = () => {
  var date = new Date(data.currentDate);
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  data.currentDate = dayjs(new Date(year, month, day + 1)).format("YYYY-MM-DD");
  changeTime(data.currentDate);
};
const handlePrevDay = () => {
  var date = new Date(data.currentDate);
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  data.currentDate = dayjs(new Date(year, month, day - 1)).format("YYYY-MM-DD");
  changeTime(data.currentDate);
};
// 判断是否是今天
const isToDay = (time) => {
  const currentTime = dayjs(new Date()).format("YYYY-MM-DD");
  return currentTime == time ? true : false;
};

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
  var time = dayjs(row.StartDateTime).get("hour");
  let index = data.times.findIndex((item) => item.split(":")[0] == time);
  // console.log("index:",index);
  return (index + 1) * 2 * 30 + "px";
};
const countHeight = (row) => {
  //console.log("dayjs(row.EndDateTime).get('hour')",dayjs(row.EndDateTime).get('hour'));
  let index = data.times.findIndex(
    (item) => item.split(":")[0] == dayjs(row.StartDateTime).get("hour")
  );
  let endIndex = data.times.findIndex(
    (item) => item.split(":")[0] == dayjs(row.EndDateTime).get("hour")
  );
  //console.log("endIndex",index,endIndex);
  let num = endIndex - index;
  return num * 60 + "px";
};
const getOtherData = (daydate, id) => {
  let d = {
    actions: [
      {
        id: "5764;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          startDateTime: daydate,
          endDateTime: daydate,
          calendarType: "day",
          queryMeetings: true,
        },
      },
    ],
  };
  let url = Interface.vehicle.calendarList;
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.length
    ) {
      let vehicleList = res.actions[0].returnValue;
      let obj = {};
      vehicleList.forEach((item, index) => {
        item.vehicleUseItems.forEach((item1, index1) => {
          let daydate = dayjs(item1.startTime).format("YYYY-MM-DD");
          if (!obj[daydate]) {
            obj[daydate] = [];
          }
          item1.startTime = item1.startTime
            ? dayjs(item1.startTime).format("YYYY-MM-DD HH:mm:ss")
            : "";
          item1.endTime = item1.endTime
            ? dayjs(item1.endTime).format("YYYY-MM-DD HH:mm:ss")
            : "";
          obj[daydate].push(item1);
          let remainder = index % 4;
          let event = {
            id: item1.Id || item1.id,
            title: item1.name || "",
            start: item1.startTime,
            end: item1.endTime,
            name: item1.name || "",
            AppUserIdName: item1.appUserIdName || "",
            vehicleIdName: item.vehicle ? item.vehicle.name : "",
            startFrom: item1.startFrom || "",
            destination: item1.destination || "",
            Telephone: item1.Telephone || "",
            StatusCodeName: item1.StatusCodeName || item1.statusCodeName || "",
            StatusCode: item1.StatusCode || item1.statusCode || "",
            Description: item1.Description || item1.description || "",
            editable: false,
            backgroundColor: "#aaa", // 该事件的背景颜色
            borderColor: "#aaa", // 该事件的边框颜色
            textColor: "#FFF", // 该事件的文字颜色
          };
          //console.log(item1.Id)
          //data.calendarOptions.events.push(event);

          // data.calendarOptions.events.push(event);
          if (
            item1.Id &&
            item1.Id !== id &&
            JSON.stringify(data.calendarOptions.events).indexOf(event.id) == -1
          ) {
            // if(fullCalendarDay.value.getApi().view.calendar.getEventById(item1.Id)){
            //     fullCalendarDay.value.getApi().view.calendar.getEventById(item1.Id).remove();
            // }
            data.calendarOptions.events.push(event);
            //fullCalendarDay.value.getApi().view.calendar.addEvent(event);
          }
        });
      });
      //data.meetingList = obj;
    }
  });
};
const getQuery = (calendarItem) => {
  if (calendarItem) {
  } else {
    let StartDateTime = dayjs(new Date()).startOf("day").format("YYYY-MM-DD");
    let EndDateTime = dayjs(new Date()).endOf("day").format("YYYY-MM-DD");
    let hour = new Date().getHours() + 1;
    hour = hour < 10 ? "0" + hour : hour;
    let StartDateTime_time = hour + ":00";
    let hour2 = new Date().getHours() + 2;
    hour2 = hour2 < 10 ? "0" + hour2 : hour2;
    let EndDateTime_time = hour2 + ":00";
    calendarItem = {
      Id: props.id ? "" : "001",
      name: "",
      Description: "",
      AppUserIdName: "",
      StartDateTime: StartDateTime + " " + StartDateTime_time,
      EndDateTime: EndDateTime + " " + EndDateTime_time,
      Telephone: "",
      StatusCodeName: "",
      StatusCode: "0",
      IsAllDayEvent: false,
      IsPrivate: false,
      sobjectType: "Event",
      vehicleIdName: "",
      startFrom: "",
      destination: "",
    };
  }
  let daydate = dayjs(calendarItem.StartDateTime).format("YYYY-MM-DD");

  calendarItem.StartDateTime = calendarItem.StartDateTime
    ? dayjs(calendarItem.StartDateTime).format("YYYY-MM-DD HH:mm:ss")
    : "";
  calendarItem.EndDateTime = calendarItem.EndDateTime
    ? dayjs(calendarItem.EndDateTime).format("YYYY-MM-DD HH:mm:ss")
    : "";
  calendarItem.StartDateTime_time = calendarItem.StartDateTime
    ? dayjs(calendarItem.StartDateTime).format("HH:mm")
    : "";
  calendarItem.EndDateTime_time = calendarItem.EndDateTime
    ? dayjs(calendarItem.EndDateTime).format("HH:mm")
    : "";
  data.paramsTime.date = calendarItem.StartDateTime;
  data.paramsTime.time = calendarItem.StartDateTime_time;
  data.paramsTime.end = calendarItem.EndDateTime_time;
  data.paramsTime.endDate = calendarItem.EndDateTime
    ? dayjs(calendarItem.EndDateTime).format("YYYY-MM-DD")
    : "";

  let event = {
    id: calendarItem.Id,
    title: calendarItem.name || "",
    start: calendarItem.StartDateTime,
    end: calendarItem.EndDateTime,
    name: calendarItem.name || "",
    vehicleIdName: calendarItem.vehicleIdName || "",
    startFrom: calendarItem.startFrom || "",
    destination: calendarItem.destination || "",
    AppUserIdName: calendarItem.AppUserIdName || "",
    Telephone: calendarItem.Telephone || "",
    StatusCodeName:
      calendarItem.StatusCodeName || calendarItem.statusCodeName || "",
    StatusCode: calendarItem.StatusCode || calendarItem.statusCode || "",
    Description: calendarItem.Description || "",
    editable: true,
    backgroundColor: "#1055BC", // 该事件的背景颜色
    borderColor: "#1055BC", // 该事件的边框颜色
    textColor: "#FFF", // 该事件的文字颜色
  };
  console.log(event, 0);
  nextTick(() => {
    if (
      typeof fullCalendarDay != "undefined" &&
      fullCalendarDay &&
      fullCalendarDay.value
    ) {
      //console.log(fullCalendarDay,'fullCalendarDay');
      // if(fullCalendarDay.value.getApi().view.calendar.getEventById('001')){
      //     fullCalendarDay.value.getApi().view.calendar.getEventById('001').remove();
      // }
      // if(fullCalendarDay.value.getApi().view.calendar.getEventById(event.id)){
      //     fullCalendarDay.value.getApi().view.calendar.getEventById(event.id).remove();
      // }
      //fullCalendarDay.value.getApi().view.calendar.addEvent(event);
      if (
        calendarItem.Id &&
        JSON.stringify(data.calendarOptions.events).indexOf(event.id) == -1
      ) {
        data.calendarOptions.events.push(event);
      }
      //fullCalendarDay.value.getApi().gotoDate(props.currentTime);
      setTimeout(function () {
        fullCalendarDay.value.getApi().gotoDate(props.currentTime);
      }, 200);
      document.getElementsByClassName("fc-prev-button")[0].title = "上一天";
      document.getElementsByClassName("fc-next-button")[0].title = "下一天";
    }
  });
  if (calendarItem.Id) {
    getOtherData(daydate, calendarItem.Id);
  }
};

defineExpose({ getQuery });
//详情
const handleDetail = (e) => {
  data.detailId = e.id;
  handleDetailView(e.id);
  //   nextTick(() => {
  //     if (props.objectTypeCode == "5000") {
  //       data.isMeetingDetail = true;
  //     } else if (props.objectTypeCode == "4200") {
  //       data.isScheduleDetail = true;
  //     } else {
  //       data.isScheduleDetail = true;
  //     }
  //   });
};
//详情页
const handleDetailView = (id) => {
  //window.open("/#/lightning/r/meeting/view?id=" + (id || ""));
  let url = router.resolve({
    path: "/lightning/r/Record/view",
    query: {
      entityType: "VehicleUse",
      objectTypeCode: 20503,
      id: id,
    },
  });
  window.open(url.href);
};
</script>
<style lang="less" scoped>
.weekWrap {
  width: 100%;
  height: 100%;
  .arrowIcon {
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
          font-size: 0.8125rem;
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
            background: linear-gradient(
              rgba(0, 0, 0, 0.1) 1px,
              transparent 1.01px
            );
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
      margin-left: 15px;
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
.AddScheduleDayModal2 {
  div {
    height: 100%;
  }
  :deep .fc .fc-view-harness {
    height: calc(100% - 50px);
    overflow: auto;
  }
  :deep .fc .fc-toolbar-title {
    font-size: 17px;
  }
  :deep .fc .fc-button-group {
    display: none;
  }
  :deep .fc .fc-toolbar.fc-header-toolbar {
    height: 50px;
    margin-bottom: 0;
  }
  :deep .fc-button {
    position: absolute;
  }
  :deep .fc-header-toolbar {
    position: relative;
  }
  :deep .fc-next-button {
    top: 13px;
    right: 100px;
    background: #fff;
    border: none;
    color: #333;
    padding: 0;
  }
  :deep .fc-nextYear-button {
    top: 13px;
    right: 80px;
    background: #fff;
    border: none;
    color: #333;
    padding: 0;
  }
  :deep .fc-prev-button {
    top: 13px;
    left: 88px;
    background: #fff;
    border: none;
    color: #333;
    padding: 0;
  }
  :deep .fc-prevYear-button {
    top: 13px;
    left: 70px;
    background: #fff;
    border: none;
    color: #333;
    padding: 0;
  }
  :deep .fc-today-button {
    top: 10px;
    left: 18px;
    border-radius: 2px;
    background-color: #1677ff;
    border-color: #1677ff;
    font-size: 14px;
    height: 32px;
    padding: 4px 10px;
  }
  :deep .fc .fc-scrollgrid-section-sticky > * {
    // position: relative;
    border-top: 1px solid #dedede;
  }
  :deep .fc .fc-button:disabled {
    opacity: 0.3 !important;
  }
  :deep .fc .fc-button:not(:disabled).fc-button-active:focus,
  :deep .fc .fc-button:not(:disabled):active:focus {
    box-shadow: none !important;
  }
  :deep .fc-button:focus,
  :deep .fc-button:active {
    box-shadow: none !important;
  }
  :deep .fc .fc-button:not(:disabled).fc-button-active,
  :deep .fc .fc-button:not(:disabled):active {
    background: #fff;
    border: none !important;
    color: #333;
  }
  :deep .fc-event-time {
    font-size: 12px !important;
    margin-left: 6px !important;
  }
  :deep .fc-event-title {
    font-size: 12px !important;
    margin-left: 6px !important;
  }
  :deep .fc-timegrid-slots colgroup {
    background: #f0f2f6;
  }
}
.meetingMessageWrap {
  line-height: 30px !important;
  width: 360px;
  .meetingInfo1 {
    margin-top: 5px;
  }
  .meetingInfoItem {
    font-size: 14px !important;
    display: flex;
  }
}
.fullCalendar{
    :deep .fc-timegrid-body{
        width: 100% !important;
        table{
            width: 100% !important;
        }
    }
}
</style>
