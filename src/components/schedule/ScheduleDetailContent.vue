<template>
    <div class="meetingDetailWrap">
      <div class="detail-header">
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
          <template v-for="(item, index) in actionList" :key="index">
              <template v-if="Array.isArray(item)">
                <a-button
                  v-for="(row, idx) in item"
                  :key="idx"
                  type="primary"
                  class="ml10"
                  @click="handleClickBtn(row.devNameOrId)"
                  >{{ row.label }}</a-button
                >
              </template>
              <a-button type="primary" class="ml10" @click="handleClickBtn(item.devNameOrId)" v-else>{{ item.label }}</a-button>
          </template>
          <a-dropdown :trigger="['hover']" class="ml10">
            <span class="btn-drop">
              <UnorderedListOutlined style="color: #1d2129" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item key="4" @click="handleNotes"> 备注 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="detail-scroll">
        <div class="detail-bd">
          <div class="tabContainer containerForm" v-if="activeKey == 0">
            <div class="tableBox">
              <DetailInfo class="DetailInfo" :id="props.id" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
            </div>
            <div class="rightAside">
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
                      <!-- <p>{{ text }}</p> -->
                      <template #extra><PlusOutlined /></template>
                    </a-collapse-panel>
                    <!-- <a-collapse-panel key="3" header="This is panel header 3" collapsible="disabled">
                                          <p>{{ text }}</p>
                                          <template #extra><PlusOutlined /></template>
                                      </a-collapse-panel> -->
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
            </div>
          </div>
          <div class="tabContainer" v-if="activeKey == 1">
            <div class="detailContent">
              <Comment :isTitle="false" :id="props.id"  />
            </div>
          </div>
          <div class="tabContainer" v-if="activeKey == 2">
            <div class="detailContent">
              <ScheduleShare :id="props.id" />
            </div>
          </div>
        </div>
      </div>
      <InfoNotes
        :isShow="isNotes"
        :id="props.id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelNotes"
      />
      <ChangeStatus
        :isShow="isStatus"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelStatus"
      />
      <InfoRemind
        :isShow="isRemind"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelRemind"
      />
      <InfoAddClass
        :isShow="isAddClass"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelAddClass"
      />
      <RadioUser
        :isShow="isUserModal"
        @cancel="cancelUser"
        @selectVal="getUserData"
      />
      <AddSchedule :isShow="isAddSchedule" :id="props.id" v-if="isAddSchedule" @cancel="cancelAddSchedule" @selectVal="handleAddScheduleVal" :paramsTime="paramsTime" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" :calendarType="formState.type" />
      <DeleteModal :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="deleteOk" :sObjectName="sObjectName" :recordId="props.id" :objTypeCode="objectTypeCode" :external="external" />
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
    defineEmits,provide,
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
  import InfoRemind from "@/components/information/InfoRemind.vue";
  import InfoAddClass from "@/components/information/InfoAddClass.vue";
  import AffiliatedColumn from "@/components/information/AffiliatedColumn.vue";
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import DeleteModal from "@/components/listView/Delete.vue";
  import Interface from "@/utils/Interface.js";
  
  // 基本信息
  import DetailInfo from "@/components/detail/DetailInfo.vue";
  // 相关讨论
  import Comment from "@/components/detail/Comment.vue";
  // 共享
  import ScheduleShare from "@/components/meeting/MeetingShare.vue";
  import AddSchedule from "@/components/schedule/AddSchedule.vue";
  const { proxy } = getCurrentInstance();
  
  const route = useRoute();
  const router = useRouter();
  const emit = defineEmits(['handleDelete']);
  const props = defineProps({
      id: {
          type: String,
          default: ""
      }
  });
  provide("id", props.id);
  const PersonnelLst = ref();
  const formState = reactive({
        type: ""
  })
  const data = reactive({
    tabs: [
      {
        label: "基本信息",
      },
      {
        label: "相关讨论",
      },
      {
        label: "共享权限",
      },
    ],
    activeKey: 0,
    id: route.query.id,
    objectTypeCode:'4200',
    sObjectName:'ActivityPointer',
    detail: {},
    isNotes: false,
    isStatus: false,
    isRemind: false,
    isAddClass: false,
    isUserModal: false,
    fileCategorys: [],
    files: [],
    content:'',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
    paramsTime:{
        date: "",
        time: ""
    },
    isAddSchedule: false,
    actionList:[]
  });
  const {
    tabs,
    activeKey,
    id,
    objectTypeCode,
    detail,
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
    isAddSchedule,
    actionList
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
              actions:[{
                  id: "4270;a",
                  descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                  callingDescriptor: "UNKNOWN",
                  params: {
                  recordId: props.id,
                  apiName:data.sObjectName,
                  objTypeCode: data.objectTypeCode
                  }
              }]
          };
          let obj = {
              message: JSON.stringify(d)
          }
          proxy.$post(Interface.detail,obj).then(res=>{
              if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
              let fields=res.actions[0].returnValue.fields;
              data.detail.Title=fields.Subject.value;
              }
          })
  };
  getDetail();
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
                      recordId: props.id,
                      entityApiName: data.sObjectName,
                      sections: ["PAGE"]
                  }
              }]
          }
          let d = {
              message: JSON.stringify(obj)
          }
          proxy.$post(Interface.detailObj.actions, d).then(res => {
              data.actions = res.actions[0].returnValue;
              let actionList = res.actions[0].returnValue;
              var temp = [];
              for (var i = 0; i < actionList.length; i++) {
                  let item = actionList[i];
                  if (item.isSeparator) {
                      temp.push([item]);
                  } else {
                      if (Array.isArray(temp[temp.length - 1])) {
                          temp[temp.length - 1].push(item);
                      } else {
                          temp.push(item);
                      }
                  }
              }
              let temp1 = [{devNameOrId:'handleEdit',label:'编辑'},{devNameOrId:'handleDelete',label:'删除'},{devNameOrId:'openFullSign0',label:'大屏签到'},{devNameOrId:'openFullSign1',label:'大屏签退'}];
              data.actionList = temp;
          })
      }
  getActions();
  const getFileClass = () => {
    proxy
      .$get(Interface.information.attachmentCategory, {
        ObjectTypeCode: data.objectTypeCode,
      })
      .then((res) => {
        data.fileCategorys = res.returnValue.records;
      });
  };
  getFileClass();
  const getFiles = () => {
    proxy
      .$get(Interface.information.files, {
        id: data.id,
      })
      .then((res) => {
        data.files = res.listData;
      });
  };
  getFiles();
  // 关闭更改状态
  const cancelStatus = (e) => {
    data.isStatus = e;
  };
  const cancelNotes = (e) => {
    data.isNotes = e;
  };
  const cancelRemind = (e) => {
    data.isRemind = e;
  };
  const cancelAddClass = (e) => {
    data.isAddClass = e;
  };
  // 更改状态
  const changeStatus = () => {
    data.isStatus = true;
  };
  const handleEdit = () =>{
      data.isAddSchedule=true;
    }
    const Edit = () =>{
      data.isAddSchedule=true;
    }
    const cancelAddSchedule = (e) => {
        data.isAddSchedule = false;
    }
    const handleAddScheduleVal = (e) => {
        data.isAddSchedule = false;
        data.activeKey=7;
        setTimeout(function(){
          data.activeKey=0;
        },10)
    }
  const handleDelete= (e) => {
    //data.isDelete = true;
    emit('handleDelete', {Id:props.id});
  }
  const Delete= (e) => {
    //data.isDelete = true;
    emit('handleDelete', {Id:props.id});
  }
  const deleteOk = (e) => {
    emit('handleDelete', {Id:props.id});
  };
  const cancelDelete = (e) => {
    data.isDelete = false;
  };
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
  
  const openFullSign= (num) => {
          //window.open('http://192.168.1.200:82/apps/meetings/dynamicSign.aspx?id=8f9c33e1-52a4-4dcd-9ade-9e95484a6f1a');
          let link='/Meeting/checkin/screen';
          let name='CheckinScreen';
          if(num*1==1){
            link='/Meeting/checkout/screen';
            name='CheckoutScreen';
          }
          let url = router.resolve({
              path:link,
              name: name,
              query: {
                  id: props.id,
                  exitQcode:num
              },
          });
          window.open(url.href);
  }
  const openFullSign0=()=>{
    openFullSign(0);
  }
  const openFullSign1=()=>{
    openFullSign(1);
  }
  const printMeetingPeoplelst= (type) => {
          let url = router.resolve({
              path:'/printMeetingPeoplelst',
              name: "PrintMeetingPeoplelst",
              query: {
                  id: props.id,
                  type:type
              },
          });
          window.open(url.href);
    }
  const printMeetingPeoplelst0=()=>{
    printMeetingPeoplelst(0);
  }
  const printMeetingPeoplelst1=()=>{
    printMeetingPeoplelst(1);
  }
  const refreshPeople=(e)=>{
      if(PersonnelLst.value&&PersonnelLst.value.getQuery){
          PersonnelLst.value.getQuery();
      }
  }
  const handleClickBtn = (devNameOrId) => {
    if (typeof (eval(devNameOrId)) == "function") {
        var result = eval(devNameOrId + "();");
    }else {
  
    }
  }

  //发布
const handleRelease=()=>{
  data.isRelease=true;
}
window.handleEdit=handleEdit;
window.handleRemind=handleRemind;
window.handleRelease=handleRelease;
window.handleDelete=handleDelete;
  </script>
  <style lang="less" scoped>
  .meetingDetailWrap{
      width: 100%;
      height: 100%;
      background: #f0f2f6;
      overflow: auto;
      .detail-header{
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
          .ant-tabs-nav{
              margin: 0;
          }
          .leftBox {
              min-width: 695px;
              .backText{
                  color: var(--textColor);
                  font-weight: bold;
                  font-size: 14px;
                  cursor: pointer;
                  padding-right: 10px;
              }
              .title{
                  // margin-top: 5px;
                  // height: 48px;
                  display: flex;
                  align-items: center;
                  color: #1d2129;
                  font-size: 18px;
                  font-weight: bold;
                  margin-left: 5px;
              }
              .ant-tabs .ant-tabs-nav::before{
                  display: none;
              }
              .ant-tabs-tab{
                  padding: 9px 8px !important;
                  margin-right: 24px !important;
              }
          }
          
      }
      .detail-scroll{
          //overflow: auto;
          height: calc(~"100% - 159px");
          margin-top: 71px;
          // overflow: auto;
          .detail-bd{
              // padding: 24px;
              height: 100%;
          }
          .tabContainer{
              min-height: 197px;
              height: auto;
              display: flex;
              padding-bottom: 20px;
              position: relative;
              padding: 24px;
              .tableBox{
                  // flex: 1;
                  background: #fff;
                  border-radius: 4px;
                  margin-right: 12px;
                  width: calc(~"80% - 5px");
                  overflow: hidden;
                  padding: 20px 15px;
                  margin-right: 5px;
              }
              .tableBox.active{
                  width: 100%;
              }
          }
      }
      .detail-footer{
          width: 100%;
          position: fixed;
          bottom: 0;
          background: #fff;
          height: 64px;
          box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
          z-index: 99;
          .flexEnd{
              display: flex;
              justify-content: flex-end;
              padding-right: 10px;
          }
      }
  }
  .meetingDetailWrap .rightBox{
      display: flex;
      .btn-drop{
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-top: 12px;
          color: #999999;
      }
      .btn-drop:hover{
          color: rgb(78,89,105);
          background: #f2f3f5;
      }
      .ant-btn{
          margin-top: 12px;
      }
  }
  
  .meetingDetailWrap .rightAside{
      min-width: 20%;
      max-width: 20%;
      position: absolute;
      height: 100%;
      right: 0;
      // background: #fff;
      padding: 0 10px;
      // overflow-y: auto;
      .panel{
          padding: 20px;
          background: #fff;
          border-radius: 4px;
          margin-bottom: 16px;
          cursor: pointer;
          overflow: auto;
          .panel-head{
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 19px;
              .panel-title{
                  font-size: 16px;
                  color: #1d2129;
                  font-weight: bold;
              }
          }
          .panel-bd{
              .empty {
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                  text-align: center;
                  color: #666;
                  img{
                      width: 50px;
                  }
                  .emptyDesc{
                      font-size: 14px;
                  }
              }
              .relevantList{
                  .relevantItem{
                      width: 100%;
                      position: relative;
                      padding: 13px 8px;
                      border-bottom: 1px solid #e5e6eb;
                      .relevantTitle{
                          width: 75%;
                          font-size: 14px;
                          color: #1d2129;
                      }
                      .relevantTimerInfo{
                          font-size: 12px;
                          color: #86909c;
                          padding-top: 10px;
                      }
                      .anticon-delete{
                          position: absolute;
                          right: 10px;
                          top: 25px;
                          font-size: 16px;
                      }
                  }
                  .relevantItem:hover{
                      background: #f2f3f5 !important;
                  }
              }
          }
      }
      .asideScroll{
          height: 100%;
          overflow-y: auto;
      }
      .arrowIcon{
          position: absolute;
          top: 50%;
          z-index: 999;
          width: 16px;
          height: 60px;
          background: url("~@/assets/img/right.png") center center no-repeat;
          cursor: pointer;
          left: 1px;
      }
      .arrowIcon.rightIcon:hover{
          background: url("~@/assets/img/right_hover.png") center center no-repeat;
      }
      .arrowIcon.leftIcon{
          top: 50%;
          left: inherit !important;
          right: 0;
          background: url("~@/assets/img/left.png") center center no-repeat;
          &:hover{
              background: url("~@/assets/img/left_hover.png") center center no-repeat;
          }
      }
  }
  .meetingDetailWrap .leftContent{
      width: calc(~"80% - 5px");
      height: 100%;
      border-right: 1px solid #e2e3e5;
      overflow: hidden;
      overflow-y: auto;
      &.active{
          width: calc(~"100% - 24px");
      }
  }
  .meetingDetailWrap .detail-header{
    top: 50px;
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse {
    border: none !important;
    background: #fff;
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse > .ant-collapse-item {
    border-bottom: none !important;
    background: #f3f2f2;
    margin-bottom: 8px;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content {
    border-top: none !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header {
    padding: 6px 16px !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content
    > .ant-collapse-content-box {
    padding: 0 !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child,
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child
    > .ant-collapse-header {
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
  .meetingDetailWrap{
    .detail-scroll{
      height: calc(~"100% - 70px");
    }
    .detailContent{
      width: 100%;
      padding: 20px;
      background: #fff;
      border-radius: 4px;
      overflow: auto;
    }
    :deep .ant-tabs-tab{
      padding: 9px 8px !important;
      margin-right: 24px !important;
    }
    .detail-header{
      border: none !important;
      .leftBox .title{
        line-height: 25px !important;
      }
    }
  }
  
  </style>
  