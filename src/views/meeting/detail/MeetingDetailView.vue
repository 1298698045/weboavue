<template>
  <div class="meetingDetailViewWrap" :style="{ height: height + 'px' }">
    <div class="detail-header">
      <div class="icon-circle-base">
        <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
      </div>
      <div class="leftBox">
        <div class="title">
          <div>
            <span>{{ detail.Title }}&nbsp;</span>
          </div>
        </div>
        <div class="tabWrap">
          <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
            <a-tab-pane v-for="(item, index) in tabs" :key="index">
              <template #tab>
                <span>
                  {{ item.label }}
                </span>
              </template>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="rightBox">
        <!-- <a-button type="primary" class="ml10" @click="handleEdit">编辑</a-button>
        <a-button class="ml10" @click="handleDelete">删除</a-button>
        <a-button class="ml10" @click="openFullSign(0)">大屏签到</a-button>
        <a-button class="ml10" @click="openFullSign(1)">大屏签退</a-button> -->
        <template v-for="(item, index) in actionList1" :key="index">
          <template v-if="Array.isArray(item)">
            <a-button v-for="(row, idx) in item" :key="idx" type="primary" class="ml10"
              @click="handleClickBtn(row.devNameOrId || row.apiName)">{{ row.label }}</a-button>
          </template>
          <a-button type="primary" class="ml10" @click="handleClickBtn(item.devNameOrId || item.apiName)" v-else>{{
            item.label
          }}</a-button>
        </template>
        <a-dropdown :trigger="['hover']" class="ml10" :getPopupContainer="getPopupContainer"
          v-if="actionList2 && actionList2.length">
          <span class="btn-drop">
            <UnorderedListOutlined style="color: #1d2129" />
          </span>
          <template #overlay>
            <a-menu style="width: 100px;">
              <!-- <a-menu-item @click="handleNotes"> 备注 </a-menu-item>
              <a-menu-item @click="openFullSign0"> 大屏签到 </a-menu-item>
              <a-menu-item @click="openFullSign1"> 大屏签退 </a-menu-item>
              <a-menu-item @click="printMeetingPeoplelst0"> 打印参会人员 </a-menu-item>
              <a-menu-item @click="printMeetingPeoplelst1"> 打印未参会人员 </a-menu-item> -->
              <a-menu-item v-for="(item, index) in actionList2" :key="index"
                @click="handleClickBtn(item.devNameOrId || item.apiName)"> {{ item.label }} </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="detail-scroll">
      <div class="detail-bd">
        <div class="tabContainer" v-if="activeKey == 0">
          <Topics v-if="TopicsShow" :id="data.id" :type="'page'" :detailData="detailData" />
        </div>
        <div class="tabContainer" v-if="activeKey == 1">
          <MeetingSummary :id="data.id" :type="'page'" :RegardingObjectName="detail.Title" />
        </div>
        <div class="tabContainer" v-if="activeKey == 2">
          <Participants ref="PersonnelLst" :load="refreshPeople" :id="data.id" :type="'page'" />
        </div>
        <div class="tabContainer" v-if="activeKey == 3">
          <MeetingResolution :id="data.id" :type="'page'" />
        </div>
        <div class="tabContainer" v-if="activeKey == 4">
          <Task :id="data.id" :type="'page'" :RegardingObjectIdName="detail.Title" :RegardingObjectTypeCode="'5000'" />
        </div>
        <div class="tabContainer containerForm" v-if="activeKey == 5">
          <div class="tableBox">
            <DetailInfo class="DetailInfo" :id="data.id" :objectTypeCode="objectTypeCode"
              :entityApiName="sObjectName" />
          </div>
          <!-- <div class="rightAside">
            <div class="panel">
              <div class="panel-head">
                <div class="panel-title">附件 (0)</div>
                <div class="panel-btn">
                  <a-button type="link">上传附件</a-button>
                </div>
              </div>
              <div class="panel-bd">
                <a-collapse
                  v-model:activeKey="current"
                  :expand-icon-position="expandIconPosition"
                >
                  <a-collapse-panel
                    :header="item.Name"
                    v-for="(item, index) in fileCategorys"
                    :key="index"
                  >
                    <template #extra><PlusOutlined /></template>
                  </a-collapse-panel>
                </a-collapse>
                <div class="files">
                  <div class="fileItem">
                    <div class="lImg">
                      <img :src="require('@/assets/img/filetype/pdf.png')" />
                    </div>
                    <div class="rInfo">
                      <p class="name rowEllipsis">
                        测试文件
                      </p>
                      <div class="optionLink">
                        <span class="link">查看</span> ·
                        <span class="link">下载</span>
                      </div>
                      <div class="time">2023/11/7 10:10 · 36.7k</div>
                    </div>
                    <div class="icon">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <DownOutlined />
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item>
                              <a href="javascript:;">标记分类</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;">重命名</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;">删除</a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="tabContainer" v-if="activeKey == 6">
          <RelatedAttachment :id="data.id" :type="'page'" :RegardingObjectIdName="detail.Title"
            :RegardingObjectTypeCode="'5000'" :entityName="sObjectName" />
        </div>
        <div class="tabContainer" v-if="activeKey == 7">
          <Comment :title="'会议讨论'" :id="data.id" :RegardingObjectTypeCode="'5000'" />
        </div>
        <div class="tabContainer" v-if="activeKey == 8">
          <div class="detailContent">
          </div>
        </div>
        <div class="tabContainer" v-if="activeKey == 9">
          <MeetingShare :id="data.id" :type="'page'" :RegardingObjectIdName="detail.Title"
            :RegardingObjectTypeCode="'5000'" :title="'会议'" />
        </div>
      </div>
    </div>
    <InfoNotes v-if="isNotes" :isShow="isNotes" :id="data.id" :objectTypeCode="objectTypeCode" @cancel="cancelNotes" />
    <MeetingRemind v-if="isRemind" :isShow="isRemind" :id="data.id" @cancel="cancelRemind"
      :RegardingObjectIdName="detail.Title" :RegardingObjectTypeCode="objectTypeCode" />
    <MeetingRelease v-if="isRelease" :isShow="isRelease" :id="data.id" @cancel="isRelease = false"
      :RegardingObjectIdName="detail.Title" />
    <!-- <ChangeStatus
      :isShow="isStatus"
      :id="id"
      :objectTypeCode="objectTypeCode"
      @cancel="cancelStatus"
    /> -->
    <InfoAddClass v-if="isAddClass" :isShow="isAddClass" :id="id" :objectTypeCode="objectTypeCode"
      @cancel="cancelAddClass" />
    <RadioUser v-if="isUserModal" :isShow="isUserModal" @cancel="cancelUser" @selectVal="getUserData" />
    <NewMeeting :isShow="isNewMeeting" :meetingId="data.id" v-if="isNewMeeting" @cancel="cancelNewMeeting"
      @selectVal="handleNewMeetingVal" :paramsTime="paramsTime" />
    <DeleteModal v-if="isDelete" :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="deleteOk"
      :sObjectName="sObjectName" :recordId="data.id" :objTypeCode="objectTypeCode" :external="external" />
    <CommonConfirm
      v-if="isConfirm"
      :isShow="isConfirm"
      :text="confirmText"
      :title="confirmTitle"
      @cancel="isConfirm = false"
      @ok="confirmOk"
      :id="data.id"
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
  getCurrentInstance, onUpdated, defineProps, defineExpose,
  defineEmits, provide,
  toRaw,
} from "vue";
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  DeleteFilled,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import Related from "@/components/detail/Related.vue";
import Info from "@/components/detail/Info.vue";
import InfoNotes from "@/components/commonModal/RelatedNote.vue";
import ChangeStatus from "@/components/information/ChangeStatus.vue";
import InfoAddClass from "@/components/information/InfoAddClass.vue";
import AffiliatedColumn from "@/components/information/AffiliatedColumn.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import DeleteModal from "@/components/listView/Delete.vue";
import Interface from "@/utils/Interface.js";

// 基本信息
import DetailInfo from "@/components/detail/DetailInfo.vue";
// 会议纪要
import MeetingSummary from "@/components/meeting/MeetingSummary.vue";
// 参会人员
import Participants from "@/components/meeting/Participants2.vue";
// 会议议题
import Topics from "@/components/meeting/meetingCalendar/Topics2.vue";
// 会议任务
import Task from "@/components/meeting/meetingCalendar/Task.vue";
// 会议服务
import Service from "@/components/meeting/Service.vue";
// 会议决议
import MeetingResolution from "@/components/meeting/MeetingResolution2.vue";
// 相关讨论
import Comment from "@/components/detail/Comment2.vue";
// 会议共享
import MeetingShare from "@/components/share/ShareList.vue";
// 新建、编辑会议
import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
// 会议提醒
import MeetingRemind from "@/components/meeting/MeetingRemind.vue";
// 会议发布
import MeetingRelease from "@/components/meeting/MeetingRelease.vue";
// 附件
import RelatedAttachment from "@/components/commonTab/RelatedAttachment.vue";
// 确认弹窗
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
const { proxy } = getCurrentInstance();

const route = useRoute();
const router = useRouter();
const emit = defineEmits(['handleDelete']);
const props = defineProps({
  meetingId: {
    type: String,
    default: ""
  }
});
//provide("meetingId", data.id);
const PersonnelLst = ref();
const data = reactive({
  tabs: [
    {
      label: "会议概况",
    },
    {
      label: "会议纪要",
    },
    {
      label: "参会人员",
    },
    {
      label: "会议决议",
    },
    {
      label: "会议任务",
    },
    {
      label: "详细信息",
    },
    {
      label: '附件',
    },
    {
      label: "会议讨论",
    },
    {
      label: "相关",
    },
    {
      label: "共享",
    },
  ],
  activeKey: 0,
  id: route.query.id,
  objectTypeCode: '5000',
  sObjectName: 'MeetingRec',
  detail: {},
  isNotes: false,
  isStatus: false,
  isRemind: false,
  isAddClass: false,
  isUserModal: false,
  fileCategorys: [],
  files: [],
  content: '',
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  external: false,
  paramsTime: {
    date: "",
    time: ""
  },
  isNewMeeting: false,
  actionList1: [],
  actionList2: [],
  height: document.documentElement.clientHeight - 70,
  detailData: {},
  TopicsShow: false,
  isRelease: false,
  isConfirm: false,
  confirmText: "",
  confirmTitle: "",
});
const {
  isConfirm,
  confirmText,
  confirmTitle,
  tabs,
  activeKey,
  id,
  objectTypeCode,
  detail,
  detailData,
  isNotes,
  isStatus,
  isRemind,
  isAddClass,
  isUserModal,
  fileCategorys,
  files,
  content,
  sObjectName,
  isDelete,
  deleteDesc,
  external,
  paramsTime,
  isNewMeeting,
  actionList1,
  actionList2,
  height,
  TopicsShow,
  isRelease
} = toRefs(data);
const changeTabs = (e) => {
  data.activeKey = e;
};
const current = ref([]);
const expandIconPosition = ref("start");
const handleClick = (event) => {
  // If you don't want click extra trigger collapse, you can prevent this:
  event.stopPropagation();
};
const getDetail = () => {
  // proxy
  //   .$get(Interface.information.detail, {
  //     id: data.id,
  //     objectTypeCode: data.objectTypeCode,
  //   })
  //   .then((res) => {
  //     console.log("res", res);
  //     data.detail = res.actions[0].returnValue.record;
  //   });
  let d = {
    actions: [{
      id: "4270;a",
      descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: data.id,
        apiName: data.sObjectName,
        objTypeCode: data.objectTypeCode
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.detail, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.fields) {
      let fields = res.actions[0].returnValue.fields;
      data.detailData = fields;
      data.TopicsShow = true;
      if (fields.Name && fields.Name.value) {
        data.detail.Title = fields.Name.value;
        data.deleteDesc = "确定要删除 " + fields.Name.value + " 吗";
      }
    }
  })
};

// const getActions = () => {
//     proxy.$get(Interface.listView.actions, {
//       entityApiName: data.sObjectName,
//       entityType: data.entityType
//     }).then(res=>{
//       let actions = [{devNameOrId:'handleEdit',label:'编辑'},{devNameOrId:'handleDelete',label:'删除'},{devNameOrId:'openFullSign0',label:'大屏签到'},{devNameOrId:'openFullSign1',label:'大屏签退'}];
//       if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
//          actions = res.actions[0].returnValue;
//       }
//       data.actionList = actions;
//     })
// }
const getActions = () => {
  let obj = {
    actions: [{
      id: "13285;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: data.id,
        entityApiName: data.sObjectName,
        sections: ["PAGE"]
      }
    }]
  }
  let d = {
    message: JSON.stringify(obj)
  }
  data.actionList1 = [];
  data.actionList2 = [];
  proxy.$post(Interface.detailObj.actions, d).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.actions) {
      let actionList = res.actions[0].returnValue.actions;
      for (var i = 0; i < actionList.length; i++) {
        let item = actionList[i];
        // if (item.isSeparator) {
        //   temp.push([item]);
        // } else {
        //   if (Array.isArray(temp[temp.length - 1])) {
        //     temp[temp.length - 1].push(item);
        //   } else {
        //     temp.push(item);
        //   }
        // }
        if (i <= 2) {
          data.actionList1.push(item);
        }
        else {
          data.actionList2.push(item);
        }
      }
      //let temp1 = [{ devNameOrId: 'handleEdit', label: '编辑' }, { devNameOrId: 'handleRelease', label: '发布' }, { devNameOrId: 'handleRemind', label: '提醒' }, { devNameOrId: 'handleDelete', label: '删除' }];
      console.log('actionList1:', data.actionList1);
      console.log('actionList2:', data.actionList2);
    }
  })
}

const getFileClass = () => {
  proxy
    .$get(Interface.information.attachmentCategory, {
      ObjectTypeCode: data.objectTypeCode,
    })
    .then((res) => {
      data.fileCategorys = res.returnValue.records;
    });
};
//getFileClass();
const getFiles = () => {
  proxy
    .$get(Interface.information.files, {
      id: data.id,
    })
    .then((res) => {
      data.files = res.listData;
    });
};
//getFiles();
// 关闭更改状态
const cancelStatus = (e) => {
  data.isStatus = e;
};
const cancelNotes = (e) => {
  data.isNotes = e;
};
const cancelRemind = (e) => {
  data.isRemind = false;
};
const cancelAddClass = (e) => {
  data.isAddClass = e;
};
// 更改状态
const changeStatus = () => {
  data.isStatus = true;
};
//编辑
const handleEdit = () => {
  data.isNewMeeting = true;
}
const cancelNewMeeting = (e) => {
  data.isNewMeeting = false;
}
const handleNewMeetingVal = (e) => {
  data.isNewMeeting = false;
  data.activeKey = 7;
  setTimeout(function () {
    data.activeKey = 0;
  }, 10)
}
//删除
const handleDelete = (e) => {
  data.isDelete = true;
  //emit('handleDelete', {Id:data.id});
}
const deleteOk = (e) => {
  window.close();
  //emit('handleDelete', {Id:data.id});
};
const cancelDelete = (e) => {
  data.isDelete = false;
};
//发布
const handleRelease = () => {
  data.isRelease = true;
}
// 预览
const handlePreview = () => {
  let url = router.resolve({
    name: "PreviewContent",
    query: {
      id: data.id,
      objectTypeCode: data.objectTypeCode,
    },
  });
  window.open(url.href);
};
// 提醒
const handleRemind = () => {
  data.isRemind = true;
};
// 备注
const handleNotes = () => {
  data.isNotes = true;
};
// 添加分类
const handleAddClass = () => {
  data.isAddClass = true;
};
const cancelUser = (e) => {
  data.isUserModal = e;
};
const getUserData = (params) => {
  console.log("params", params);
  cancelUser(false);
};

const openFullSign = (num) => {
  //window.open('http://192.168.1.200:82/apps/meetings/dynamicSign.aspx?id=8f9c33e1-52a4-4dcd-9ade-9e95484a6f1a');
  let link = '/Meeting/checkin/screen';
  let name = 'CheckinScreen';
  if (num * 1 == 1) {
    link = '/Meeting/checkout/screen';
    name = 'CheckoutScreen';
  }
  let url = router.resolve({
    path: link,
    name: name,
    query: {
      id: data.id,
      exitQcode: num
    },
  });
  window.open(url.href);
}
const printMeetingPeoplelst = (type) => {
  let url = router.resolve({
    path: '/printMeetingPeoplelst',
    name: "PrintMeetingPeoplelst",
    query: {
      id: data.id,
      type: type
    },
  });
  window.open(url.href);
}
const refreshPeople = (e) => {
  if (PersonnelLst.value && PersonnelLst.value.getQuery) {
    PersonnelLst.value.getQuery();
  }
}
const handleClickBtn = (devNameOrId) => {
  if (typeof (eval(devNameOrId)) == "function") {
    var result = eval(devNameOrId + "();");
  } else {

  }
}
const getPopupContainer = (triggerNode) => {
  return triggerNode.parentNode || document.body;
}
//编辑
const Edit =()=>{
  handleEdit();
}
window.Edit = Edit;
//删除
const Delete =()=>{
  handleDelete();
}
window.Delete = Delete;
//发布
const MeetingRecRelease =()=>{
  handleRelease();
}
window.MeetingRecRelease = MeetingRecRelease;
//提醒
const MeetingRecRemind =()=>{
  handleRemind();
}
window.MeetingRecRemind = MeetingRecRemind;
//备注
const MeetingRecNotes =()=>{
  handleNotes();
}
window.MeetingRecNotes = MeetingRecNotes;
//大屏签到
const MeetingRecFullCheckIn =()=>{
  openFullSign(0);
}
window.MeetingRecFullCheckIn = MeetingRecFullCheckIn;
//大屏签退
const MeetingRecFullCheckOut =()=>{
  openFullSign(1);
}
window.MeetingRecFullCheckOut = MeetingRecFullCheckOut;
//打印参会人员
const MeetingRecPrintAttendPeople =()=>{
  printMeetingPeoplelst(0);
}
window.MeetingRecPrintAttendPeople = MeetingRecPrintAttendPeople;
//打印未参会人员
const MeetingRecPrintNotAttendPeople =()=>{
  printMeetingPeoplelst(1);
}
window.MeetingRecPrintNotAttendPeople = MeetingRecPrintNotAttendPeople;
//取消会议
const CancelMeeting =()=>{
  data.confirmTitle = "取消会议"
  data.confirmText = "确定要取消会议吗？";
  data.isConfirm = true;
}
window.CancelMeeting = CancelMeeting;
//确认回调
const confirmOk = (id) => {
  data.isConfirm = false;
  if (data.confirmTitle == "取消会议") {
    return
    let obj = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordId: id,
            apiName: "MeetingRec",
            objTypeCode: 5000,
          },
        },
      ],
    };
    let d = {
      message: JSON.stringify(obj),
    };
    proxy.$post(Interface.delete, d).then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state == "SUCCESS"
      ) {
        message.success("取消成功");
        setTimeout(function () {
          // let reUrl = router.resolve({
          //   path: "/lightning/o/Content/home",
          //   query: {},
          // });
          // window.open(reUrl.href);
          window.close();
        }, 1000);
      } else {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].errorMessage
        ) {
          message.success(res.actions[0].errorMessage);
        } else {
          message.error("删除失败");
        }
      }
    });
  }
};
onMounted(() => {
  data.id = route.query.id;
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 70;
  });
  getDetail();
  getActions();
})
</script>
<style lang="less" scoped>
.meetingDetailViewWrap {
  width: 100%;
  height: 100%;
  background: #f0f2f6;
  overflow: auto;
  position: relative;
  top: 70px;

  .icon-circle-base {
    position: absolute !important;
    top: 15px;
    left: 15px;
    width: 40px;
    height: 40px;
    background: #0079de;
    border-radius: 50%;
    margin-right: 0px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 10px;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .detail-header {
    width: 100%;
    height: 71px;
    position: fixed;
    top: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e6eb;
    box-shadow: 0px 2px 8px 0px rgba(237, 239, 243, 1);
    z-index: 99 !important;
    padding: 6px 20px 0 20px;

    .ant-tabs-nav {
      margin: 0;
    }

    .leftBox {
      min-width: 695px;
      margin-left: 45px;

      .backText {
        color: var(--textColor);
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        padding-right: 10px;
      }

      .title {
        // margin-top: 5px;
        // height: 48px;
        display: flex;
        align-items: center;
        color: #1d2129;
        font-size: 18px;
        font-weight: bold;
        margin-left: 5px;
      }

      .ant-tabs .ant-tabs-nav::before {
        display: none;
      }

      .ant-tabs-tab {
        padding: 9px 8px !important;
        margin-right: 24px !important;
      }
    }

  }

  .detail-scroll {
    //overflow: auto;
    height: calc(~"100% - 159px");

    //margin-top: 71px;
    // overflow: auto;
    .detail-bd {
      // padding: 24px;
      height: 100%;
    }

    .tabContainer {
      min-height: 197px;
      height: auto;
      display: flex;
      position: relative;
      padding: 22px;
      height: auto;
      padding-bottom: 20px;

      .tableBox {
        // flex: 1;
        background: #fff;
        border-radius: 4px;
        margin-right: 12px;
        width: calc(~"100% - 5px");
        //overflow: hidden;
        padding: 20px 15px;
        margin-right: 5px;
        height: 100%;
      }

      .tableBox.active {
        width: 100%;
      }
    }
  }

  .detail-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    height: 64px;
    box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
    z-index: 99;

    .flexEnd {
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
    }
  }
}

.meetingDetailViewWrap .rightBox {
  display: flex;

  .btn-drop {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    color: #999999;
  }

  .btn-drop:hover {
    color: rgb(78, 89, 105);
    background: #f2f3f5;
  }

  .ant-btn {
    margin-top: 12px;
  }
}

.meetingDetailViewWrap .rightAside {
  min-width: 20%;
  max-width: 20%;
  position: absolute;
  height: 100%;
  right: 0;
  // background: #fff;
  padding: 0 10px;

  // overflow-y: auto;
  .panel {
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 16px;
    cursor: pointer;
    overflow: auto;

    .panel-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 19px;

      .panel-title {
        font-size: 16px;
        color: #1d2129;
        font-weight: bold;
      }
    }

    .panel-bd {
      .empty {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        color: #666;

        img {
          width: 50px;
        }

        .emptyDesc {
          font-size: 14px;
        }
      }

      .relevantList {
        .relevantItem {
          width: 100%;
          position: relative;
          padding: 13px 8px;
          border-bottom: 1px solid #e5e6eb;

          .relevantTitle {
            width: 75%;
            font-size: 14px;
            color: #1d2129;
          }

          .relevantTimerInfo {
            font-size: 12px;
            color: #86909c;
            padding-top: 10px;
          }

          .anticon-delete {
            position: absolute;
            right: 10px;
            top: 25px;
            font-size: 16px;
          }
        }

        .relevantItem:hover {
          background: #f2f3f5 !important;
        }
      }
    }
  }

  .asideScroll {
    height: 100%;
    overflow-y: auto;
  }

  .arrowIcon {
    position: absolute;
    top: 50%;
    z-index: 999;
    width: 16px;
    height: 60px;
    background: url("~@/assets/img/right.png") center center no-repeat;
    cursor: pointer;
    left: 1px;
  }

  .arrowIcon.rightIcon:hover {
    background: url("~@/assets/img/right_hover.png") center center no-repeat;
  }

  .arrowIcon.leftIcon {
    top: 50%;
    left: inherit !important;
    right: 0;
    background: url("~@/assets/img/left.png") center center no-repeat;

    &:hover {
      background: url("~@/assets/img/left_hover.png") center center no-repeat;
    }
  }
}

.meetingDetailViewWrap .leftContent {
  width: calc(~"80% - 5px");
  height: 100%;
  border-right: 1px solid #e2e3e5;
  overflow: hidden;
  overflow-y: auto;

  &.active {
    width: calc(~"100% - 24px");
  }
}

.meetingDetailViewWrap .detail-header {
  top: 0px;
}

:where(.css-dev-only-do-not-override-kqecok).ant-collapse {
  border: none !important;
  background: #fff;
}

:where(.css-dev-only-do-not-override-kqecok).ant-collapse>.ant-collapse-item {
  border-bottom: none !important;
  background: #f3f2f2;
  margin-bottom: 8px;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-collapse .ant-collapse-content {
  border-top: none !important;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-collapse>.ant-collapse-item>.ant-collapse-header {
  padding: 6px 16px !important;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-collapse .ant-collapse-content>.ant-collapse-content-box {
  padding: 0 !important;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-collapse>.ant-collapse-item:last-child,
:where(.css-dev-only-do-not-override-kqecok).ant-collapse>.ant-collapse-item:last-child>.ant-collapse-header {
  border-radius: 0 !important;
}

.panel {
  overflow: hidden;
}

.files {
  width: 100%;

  .fileItem {
    width: 100%;
    display: flex;
    padding: 10px 5px;

    &:hover {
      cursor: pointer;
      background: #eee;
    }

    .lImg {
      width: 40px;
      height: 40px;
      min-width: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .rInfo {
      flex: 1;
      margin-left: 10px;
      overflow: hidden;

      .name {
        width: 60%;
        font-size: 14px;
      }

      .optionLink {
        .link {
          color: var(--textColor);
        }
      }

      .time {
        font-size: 12px;
        color: #b8bbcc;
      }
    }
  }
}

.meetingDetailViewWrap {
  overflow: auto;

  .detail-scroll {
    height: calc(~"100% - 22px");
  }

  .detailContent {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    overflow: auto;
  }

  :deep .ant-tabs-tab {
    padding: 9px 8px !important;
    margin-right: 24px !important;
  }

  .detail-header {
    border: none !important;

    .leftBox .title {
      line-height: 25px !important;
    }
  }
}

.ant-dropdown .ant-dropdown-menu {
  padding: 0 !important;
  right: 0px;
  position: absolute;
  top: -2px;
  width: max-content !important;
}
</style>
