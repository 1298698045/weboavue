<template>
  <div class="wrappper PrintDutyShiftWrap">
    <div class="calendarBody">
      <div class="calendarLeft">
        <CalendarVue :SelectPeopleObj="SelectPeopleObj" />
      </div>
    </div>
  </div>
</template>
<script setup>
// import "@/style/oldIcon/iconfont.css";
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
} from "vue";
import {
  SearchOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import ListView from "@/components/meeting/meetingCalendar/List.vue";
import CalendarVue from "@/components/Dutyshift/DeptShiftAdmin/Calendar.vue";
import { message } from "ant-design-vue";

// 新建
import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
// 重复会议
import NewRepeatMeeting from "@/components/meeting/meetingCalendar/NewRepeatMeeting.vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const data = reactive({
  current: 1,
  isNewMeeting: false,
  isRepeatMeeting: false,
  searchVal: "",
  pageTitle: route.query.name || "",
  isshowCalendar: true,
  SelectPeopleObj: { id: "" },
});
const {
  SelectPeopleObj,
  pageTitle,
  current,
  isNewMeeting,
  isRepeatMeeting,
  searchVal,
  isshowCalendar,
} = toRefs(data);
watch(
  () => route.query.name,
  (newVal, oldVal) => {}
);
onMounted(() => {
  // nextTick(()=>{
  // })
  getData();
  setTimeout(function () {
    window.print();
  }, 1000);
});
const getData = () => {
  //data.pageTitle = route.query.name;
};
// 关闭新建
const cancelNewMeeting = (e) => {
  data.isNewMeeting = e;
};
const handleNewMeetingVal = (e) => {
  data.isNewMeeting = false;
};
// 新建会议
const handleAddMeeting = () => {
  data.isNewMeeting = true;
};
// 新建重复会议
const handleAddRepeatMeeting = () => {
  data.isRepeatMeeting = true;
};
// 关闭重复会议弹窗
const cancelRepeatMeeting = (e) => {
  data.isRepeatMeeting = e;
};
const handleRepeatMeetingVal = (e) => {
  data.isRepeatMeeting = false;
};
</script>
<style lang="less" scoped>
.wrappper {
  width: 100%;
  height: 100%;
  .calendarBody {
    display: flex;
    height: calc(~"100% - 52px");
    .leftMenuWrapper {
      min-width: 115px;
      width: 115px;
      height: 100%;
      padding: 8px 8px;
      border-right: 1px solid #e5e6eb;
      background: #fff;
      .leftTabMenu {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        color: #4e5969;
        background: #fff;
        cursor: pointer;
        box-sizing: border-box;
        margin-bottom: 4px;
        border-radius: 2px;
        &.active {
          color: var(--textColor);
          background: #f2f3f5;
        }
        .iconfont {
          padding-left: 10px;
          font-size: 14px;
        }
        .name {
          padding-left: 8px;
        }
        &:hover {
          background: #f2f3f5;
        }
        &.active:hover {
          font-weight: bold;
        }
      }
    }
    .schedual {
      width: 200px;
      height: 100%;
      background: #fff;
      .schedualbtn {
        width: 100%;
        border: 1px solid #dedede;
        //border-left: 0;
        margin-top: 56px;
        height: calc(~"100% - 55px");
        .attdpeople-head {
          width: 100%;
          font-size: 14px;
          height: 45px;
          border-bottom: 1px solid #dedede;
          .attdpeople-head-title {
            background-color: #f9f9f9;
            padding: 5px;
            height: 44px;
            line-height: 37px;
            padding-left: 12px;
            position: relative;
          }
          .attdpeople-head-title input {
            float: right;
            height: 30px;
            line-height: 30px;
            //text-indent: 10px;
            margin-right: 7px;
            margin-top: 3px;
            border-radius: 4px;
          }
          .attdpeople-head-seach-input {
            width: 260px;
            border-radius: 4px !important;
          }
          .attdpeople-head-seach-icon {
            color: #aaa;
            font-size: 18px;
            position: absolute;
            right: 20px;
            top: 14px;
          }
        }
        .attdpeople-section {
          overflow: auto;
          height: calc(~"100% - 84px") !important;
          ul {
            display: block;
            margin-top: 5px;
            .attdpeople-item {
              line-height: 28px;
              cursor: pointer;
              margin-left: 0;
              padding-left: 20px;
            }
            .attdpeople-item:hover,
            .attdpeople-item.active {
              background-color: #f9f9f9;
              color: #108def;
            }
            .attdpeople-item span {
              display: inline-block;
              width: 32%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 30px;
              line-height: 40px;
            }
          }
        }
        #attachFiles {
          width: 100%;
          font-size: 14px;
          height: 40px;
          border-top: 1px solid #dedede;

          .attdpeople-head-title {
            background-color: #f9f9f9;
            padding: 5px;
            height: 39px;
            line-height: 30px;
            padding-left: 12px;
            border-bottom: 1px solid #dedede;
          }
        }
      }
    }
    .calendarLeft {
      flex: 1;
      height: 100%;
      background: #fff;
      margin-right: -1px;
    }
    .calendarRight {
      width: 400px;
      height: 100%;
      background: #fff;
      .attdpeople {
        width: 100%;
        border: 1px solid #dedede;
        //border-left: 0;
        margin-top: 56px;
        height: calc(~"100% - 61px");
        .attdpeople-head {
          width: 100%;
          font-size: 14px;
          height: 45px;
          border-bottom: 1px solid #dedede;
          .attdpeople-head-title {
            background-color: #f9f9f9;
            padding: 5px;
            height: 44px;
            line-height: 37px;
            padding-left: 12px;
            position: relative;
          }
          .attdpeople-head-title input {
            float: right;
            height: 30px;
            line-height: 30px;
            //text-indent: 10px;
            margin-right: 7px;
            margin-top: 3px;
            border-radius: 4px;
          }
          .attdpeople-head-seach-input {
            width: 260px;
            border-radius: 4px !important;
          }
          .attdpeople-head-seach-icon {
            color: #aaa;
            font-size: 18px;
            position: absolute;
            right: 20px;
            top: 14px;
          }
        }
        .attdpeople-section {
          overflow: auto;
          height: calc(~"100% - 84px") !important;
          ul {
            display: block;
            margin-top: 5px;
            .attdpeople-item {
              line-height: 28px;
              cursor: pointer;
              margin-left: 0;
              padding-left: 20px;
            }
            .attdpeople-item:hover,
            .attdpeople-item.active {
              background-color: #f9f9f9;
              color: #108def;
            }
            .attdpeople-item span {
              display: inline-block;
              width: 32%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 30px;
              line-height: 40px;
            }
          }
        }
        #attachFiles {
          width: 100%;
          font-size: 14px;
          height: 40px;
          border-top: 1px solid #dedede;

          .attdpeople-head-title {
            background-color: #f9f9f9;
            padding: 5px;
            height: 39px;
            line-height: 30px;
            padding-left: 12px;
            border-bottom: 1px solid #dedede;
          }
        }
      }
    }
    .calendarCenter {
      :deep .calendarHeader {
        position: relative;
        left: -200px;
        width: calc(~"100% + 200px");
      }
    }
    :deep .fc-theme-standard th {
      background: #f9f9f9 !important;
    }
  }
}
.loadingWrap {
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  .loadinglabel {
    font-size: 22px;
    margin-left: 25px;
  }
}
.PrintDutyShiftWrap {
  overflow: hidden;
  width: 800px;
  margin: 0 auto;
  :deep .calendarWrap .rightBox .calendarBody {
    height: 100%;
  }
  :deep .MeetingFullCalendarWrap {
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
  }
}
</style>
