<template>
    <div class="ProjectDetailWrap">
      <div class="preview-header">
        <div class="icon-circle-base">
            <img :src="require('@/assets/img/rightMenu/hetong.png')" alt="">
        </div>
        <div class="leftBox">
          <div class="title">
            <div>
              <span class="doc-title">{{ detail.Title||'暂无标题' }}&nbsp;</span>
              <!-- <span class="doc-like" title="点赞">
                <LikeOutlined />(<span>{{ detail.NumOfLike||0 }}</span>)
              </span>
              <span class="doc-label">
                <TagOutlined />
              </span> -->
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
          <!-- <a-button type="primary" class="ml10">内部分享</a-button> -->
          <!-- <a-button type="primary" class="ml10" @click="handleEdit">编辑</a-button> -->
          <a-button type="primary" class="ml10" @click="handleNewTask">任务安排</a-button>
          <a-button type="primary" class="ml10" @click="handleSubmit">项目移交</a-button>
          <a-button type="primary" class="ml10" @click="handleSubmit">项目验收</a-button>
          <!-- <a-button class="ml10" @click="handleRemind">通知提醒</a-button> -->
          <!-- <a-button class="ml10" @click="handleTop">文档置顶</a-button>
          <a-button class="ml10" @click="handleCancelRelease">失效</a-button> -->
          <!-- <a-button class="ml10" @click="handleDelete2">删除</a-button> -->
          <!-- <a-button class="ml10" @click="changeStatus">更改状态</a-button> -->
          <!-- <a-button class="ml10" @click="handlePreview">预览</a-button> -->
          
          <a-dropdown :trigger="['hover']" class="ml10">
            <span class="btn-drop">
              <UnorderedListOutlined style="color: #1d2129" />
            </span>
            <template #overlay>
              <a-menu>
                <!-- <a-menu-item key="0" @click="handleTop"> 文档置顶 </a-menu-item> -->
                <!-- <a-menu-item key="1" @click="handleCancelRelease"> 失效 </a-menu-item> -->
                <!-- <a-menu-item key="2" @click="handleFavor"> 收藏 </a-menu-item>
                <a-menu-item key="3" @click="addRelateInstance"> 相关流程 </a-menu-item> -->
                <!-- <a-menu-item key="4" @click="handleNewTask"> 新建任务 </a-menu-item> -->
                <a-menu-item key="1" @click="handleEdit"> 编辑项目 </a-menu-item>
                <!-- <a-menu-item key="1" @click="handleCancelRelease"> 撤销项目 </a-menu-item> -->
                <a-menu-item key="1" @click="handleDelete"> 删除项目 </a-menu-item>
                <a-menu-item key="5"> 
                  <a-upload v-model:file-list="fileList" action="#" :showUploadList="false">
                   <a style="color: rgba(0, 0, 0, 0.88);">上传附件</a>
                  </a-upload>
                </a-menu-item>
                <a-menu-item key="6" @click="handleNotes"> 备注 </a-menu-item>
                <!-- <a-menu-item key="1"> 内部分享 </a-menu-item> -->
                <!-- <a-menu-item key="1"> 查看范围 </a-menu-item>
                <a-menu-item key="2"> 邀请查看者 </a-menu-item>
                <a-menu-item key="3"> 邀请所有人 </a-menu-item>
                <a-menu-item key="4" @click="handleNotes"> 备注 </a-menu-item>
                <a-menu-item key="5" @click="handleAddClass">添加分类</a-menu-item> -->
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="detail-scroll">
        <div class="detail-bd">
          <div class="tabContainer" v-if="activeKey == 0">
            <div class="detailContent">
              <DetailInfo  :id="id" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
            </div>
          </div>
          <div class="tabContainer containerForm" v-if="activeKey == 1">
            <ProjectBudget ref="ProjectBudgetLst" :load="refreshData" :id="id" :type="'page'" />
          </div>
          <div class="tabContainer" v-if="activeKey == 2">
            <ProjectEthics :id="id" :type="'page'" :RegardingObjectIdName="detail.Title" :RegardingObjectTypeCode="objectTypeCode" />
          </div>
          <div class="tabContainer" v-if="activeKey == 3">
            <ProjectResult :id="id" :type="'page'" :RegardingObjectIdName="detail.Title" :RegardingObjectTypeCode="objectTypeCode" />
          </div>
          <div class="tabContainer" v-if="activeKey == 4">
            <ProjectMember ref="PersonnelLst" :load="refreshPeople" :id="id" :type="'page'" />
          </div>
          <div class="tabContainer" v-if="activeKey == 5">
            <RelatedAttachment :id="id" :type="'page'" :RegardingObjectIdName="detail.Title" :RegardingObjectTypeCode="objectTypeCode" :entityName="sObjectName" />
          </div>
          <div class="tabContainer" v-if="activeKey == 6">
            <Comment :id="id" :title="'讨论留言'" :RegardingObjectTypeCode="objectTypeCode" />
          </div>
          <!-- <span class="wea-doc-detail-content-text-sub"><span>最后由</span><span>&nbsp;&nbsp;&nbsp;{{detail.ModifiedBy ||'暂无'}}&nbsp;&nbsp;</span><span> 编辑于 {{detail.ModifiedOn ||' '}} </span>&nbsp;&nbsp;<span> 阅读 ({{detail.ReadCount ||0}})</span></span> -->
        </div>
      </div>
      <InfoNotes
        v-if="isNotes"
        :isShow="isNotes"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelNotes"
      />
      <ChangeStatus
        :isShow="isStatus"
        v-if="isStatus"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelStatus"
      />
      <InfoRemind
        v-if="isRemind"
        :isShow="isRemind"
        :id="id"
        @cancel="cancelRemind"
        :RegardingObjectIdName="detail.Title"
        :RegardingObjectTypeCode="objectTypeCode"
      />
      <InfoAddClass
         v-if="isAddClass"
        :isShow="isAddClass"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelAddClass"
      />
      <RadioUser
        v-if="isUserModal"
        :isShow="isUserModal"
        @cancel="cancelUser"
        @selectVal="getUserData"
      />
      <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="deleteOk" :sObjectName="sObjectName" :recordId="id" :objTypeCode="objectTypeCode" :external="external" />
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle" @cancel="isConfirm=false" @ok="isConfirm=false" :id="id" :objTypeCode="objectTypeCode" />
    <RelaseInfo v-if="isRelaseInfo" :isShow="isRelaseInfo" :objectTypeCode="objectTypeCode" :id="id" :FolderId="FolderId" @cancel="cancelRelaseInfo" />
    <Favor v-if='isFavor' :isShow="isFavor" @cancel="isFavor=false" @update-status="isFavor=false" :id="id" :objTypeCode="objectTypeCode" :objName="detail.Title" />
    <PinOnTop v-if='isPinOnTop' :isShow="isPinOnTop" @cancel="isPinOnTop=false" @update-status="isPinOnTop=false" :id="id" :objTypeCode="objectTypeCode" />
    <AddTask :isShow="isAddTask" :id="''" v-if="isAddTask" :paramsTime="''" @cancel="isAddTask=false" :objectTypeCode="'4200'" :entityApiName="'ActivityPointer'" @selectVal="onRefresh" :calendarType="''" :RegardingObjectTypeCode="objectTypeCode" :RegardingObjectId="id" :RegardingObjectIdName="detail.Title" :BgColor="''" />
    <RelateInstance v-if="isRelateInstance" :id="id" :entityApiName="sObjectName" :entityType="EntityType" :objectTypeCode="objectTypeCode" :isShow="isRelateInstance" @select="handleSelectLook" @cancel="isRelateInstance=false" />
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon=false" :title="id?'编辑':'新建'" @load="isCommon=false" :id="id" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal>
    </div>
  </template>
  <script setup>
  import {
    ref,
    reactive,
    onMounted,
    toRefs,
    getCurrentInstance,
    defineEmits,
    toRaw,
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
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    DeleteFilled,
    DeleteOutlined,
    PlusOutlined,
    LikeOutlined,
    TagOutlined,
  } from "@ant-design/icons-vue";
  import { useRouter, useRoute } from "vue-router";
  import Related from "@/components/detail/Related.vue";
  import Info from "@/components/detail/Info.vue";
  import InfoNotes from "@/components/information/InfoNotes.vue";
  import ChangeStatus from "@/components/information/ChangeStatus.vue";
  import InfoRemind from "@/components/information/InfoRemind.vue";
  import InfoAddClass from "@/components/information/InfoAddClass.vue";
  import ProjectBudget from "@/components/Project/ProjectBudget.vue";
  import RelatedAttachment from "@/components/meeting/RelatedAttachment.vue";
  import ProjectEthics from "@/components/Project/ProjectEthics.vue";
  import ProjectResult from "@/components/Project/ProjectResult.vue";
  import DocShare from "@/components/meeting/MeetingShare2.vue";
  import Comment from "@/components/detail/Comment2.vue";
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import RelaseInfo from  "@/components/information/RelaseInfo.vue";
  import DetailInfo from "@/components/detail/DetailInfo.vue";
  import Delete from "@/components/listView/Delete.vue";
  import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
  import Favor from "@/components/workflow/Favor.vue";
  import PinOnTop from "@/components/documentAdmin/PinOnTop.vue";
  import AddTask from "@/components/meeting/AddTask.vue";
  import Interface from "@/utils/Interface.js";
  import RelateInstance from "@/components/workflow/RelateInstance.vue";
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  import ProjectMember from "@/components/Project/ProjectMember.vue";
  const { proxy } = getCurrentInstance();
  const PersonnelLst = ref();
  const route = useRoute();
  const router = useRouter();
  const data = reactive({
    tabs: [
      {
        label: "基本信息",
      },
      {
        label: "项目经费",
      },
      {
        label: "伦理审查",
      },
      {
        label: "项目成果",
      },
      {
        label: "项目成员",
      },
      {
        label: "项目附件",
      },
      {
        label: "讨论留言",
      },
    ],
    activeKey: 0,
    id: route.query.id,
    objectTypeCode: '20290',
    sObjectName:'Project',
    EntityType:'10A',
    detail: {},
    isNotes: false,
    isStatus: false,
    isRemind: false,
    isAddClass: false,
    isUserModal: false,
    fileCategorys: [],
    files: [],
    fileList:[],
    content:'',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
    isConfirm:false,
    confirmText:'',
    confirmTitle:'',
    isRelaseInfo:false,
    FolderId:route.query.FolderId||'',
    isFavor:false,
    isPinOnTop:false,
    isAddTask:false,
    isRelateInstance:false,
    isCommon:false
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
    external,isConfirm,confirmText,confirmTitle,isRelaseInfo,FolderId,isFavor,isPinOnTop,fileList,isAddTask,isRelateInstance,EntityType,isCommon
  } = toRefs(data);
  const changeTabs = (e) => {
    data.activeKey = e;
  };
  const onRefresh = () =>{
    //console.log();
  }
  const current = ref([]);
  const ProjectBudgetLst = ref();
  const expandIconPosition = ref("start");
  const handleClick = (event) => {
    // If you don't want click extra trigger collapse, you can prevent this:
    event.stopPropagation();
  };
  const refreshData=(e)=>{
    if(ProjectBudgetLst.value&&ProjectBudgetLst.value.getQuery){
        ProjectBudgetLst.value.getQuery();
    }
}
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
                  recordId: data.id,
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
              data.detail.Title=fields.Name.value;
              // data.content=fields.ContentBody.value;
              // data.detail.ApprovedOn=fields.ApprovedOn.value?dayjs(fields.ApprovedOn.value).format("YYYY-MM-DD HH:mm"):'';
              // data.detail.FolderIdName=fields.FolderId.displayValue;
              // data.detail.BusinessUnitIdName=fields.BusinessUnitId.displayValue;
              // data.detail.ApprovedByName=fields.ApprovedBy.displayValue;
              // data.detail.StateCodeName=fields.StateCode.displayValue;
              // data.detail.ReadCount=fields.ReadCount.value;
              data.detail.ModifiedBy=fields.ModifiedBy.displayValue;
              data.detail.ModifiedOn=fields.ModifiedOn.value?dayjs(fields.ModifiedOn.value).format("YYYY-MM-DD HH:mm"):'';
              }
          })
  };
  getDetail();
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
      // router.push({
      //     path:"/content/visualEditor",
      //     query: {
      //       id: id
      //     }
      // });
      // let reUrl = router.resolve({
      //         name: "visualEditor",
      //         query: {
      //             id: data.id,
      //             objectTypeCode: data.objectTypeCode,
      //             //FolderId: res.actions[0].returnValue&&res.actions[0].returnValue.fields&&res.actions[0].returnValue.fields.FolderId?res.actions[0].returnValue.fields.FolderId:''
      //             FolderId: ''
      //         }
      //     })
      // window.open(reUrl.href); 
data.isCommon=true;
    }
  const handleDelete= (e) => {
    data.isDelete = true;
  }
  const deleteOk = (e) => {
    let path='/lightning/o/ResearchProject/home';
    if(route.query.type=='mine'){
      path='/lightning/o/ResearchProject/mine'
    }
    router.push({
          path:path,
          query: {
          }
      });
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
  //删除2
  const handleDelete2 = () => {
    data.isConfirm=true;
    data.confirmText='确定要将文档放入回收站吗？'
    data.confirmTitle='删除'
  }
  //发布
  const handleSubmit = () => {
      //data.isRelaseInfo = true;
      window.open('/#/lightning/r/Workflow/instance/detail?id='+data.id+'&reurl=');
  }
  const cancelRelaseInfo = (e) => {
      data.isRelaseInfo = false;
  }
  //失效
  const handleCancelRelease = () => {
    data.isConfirm=true;
    data.confirmText='确定要取消发布吗？'
    data.confirmTitle='失效'
  }
  //收藏
  const handleFavor = (id) => {
    data.isFavor=true;
  }
  //置顶
  const handleTop=()=>{
    data.isPinOnTop=true;
  }
  //新建任务
  const handleNewTask = (e) => {
    data.isAddTask = true;
  }
  //添加关联流程
  const addRelateInstance=()=>{
          data.isRelateInstance=true;
      }
  //关联流程选中
  const handleSelectLook=()=>{
      data.isRelateInstance=false;
  }
  const refreshPeople=(e)=>{
      if(PersonnelLst.value&&PersonnelLst.value.getQuery){
          PersonnelLst.value.getQuery();
      }
  }
  </script>
  <style lang="less" scoped>
  .ProjectDetailWrap{
    width: 100%;
    height: 100vh;
    background: #f0f2f6;
    overflow: hidden;
    .preview-header{
        width: 100%;
        height: 74px;
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
        .icon-circle-base {
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
            img {
                width: 20px;
                height: 20px;
            }
        }
        .ant-tabs-nav{
            margin: 0;
        }
        .leftBox {
            min-width: 695px;
            flex: 1;
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
                font-size: 14px;
                font-weight: normal;
                margin:6px 0 3px 18px;
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
        overflow: auto;
        height: calc(~"100% - 159px");
        margin-top: 71px;
        overflow: auto;
        .detail-bd{
            // padding: 24px;
            height: 100%;
        }
        .tabContainer{
            min-height: 197px;
            height: 100%;
            display: flex;
            padding-bottom: 20px;
            position: relative;
            padding: 24px;
            .tableBox{
                // flex: 1;
                background: #fff;
                border-radius: 4px;
                margin-right: 12px;
                width: calc(~"100% - 0px");
                overflow: auto;
                padding: 20px 15px;
                margin-right: 5px;
            }
            .tableBox.active{
                width: 100%;
            }
        }
        .wea-doc-detail-content-text-sub {
            color: #999;
            position: absolute;
            bottom: 13px;
            right: 40px;
            font-size: 13px;
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
    :deep .ant-tabs-tab{
        padding: 10px 8px !important;
        font-size: 12px !important;
        margin-left: 10px !important;
        margin-right: 12px !important;
    }
    :deep .ant-tabs-nav::before{
        display: none;
    }
}
.rightBox{
    display: flex;
    align-items: end;
    height: 60px;
    .btn-drop{
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 12px;
        color: #999999;
        font-size: 18px !important;
    }
    .btn-drop:hover{
        color: rgb(78,89,105);
        background: #f2f3f5;
    }
    .ant-btn{
        margin-top: 12px;
    }
}

.rightAside{
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
.leftContent{
    width: calc(~"80% - 5px");
    height: 100%;
    border-right: 1px solid #e2e3e5;
    overflow: hidden;
    overflow-y: auto;
    &.active{
        width: calc(~"100% - 24px");
    }
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
  // :deep .panel {
  //   overflow: hidden;
  //   height: 100%;
  // }
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
  .ProjectDetailWrap .detail-scroll{
    height: calc(~"100% - 90px");
  }
  .ProjectDetailWrap .detailContent{
      width: 100%;
      padding: 20px;
      background: #fff;
      border-radius: 4px;
      overflow: auto;
  }
  .ProjectDetailWrap .tableBoxContent{
    white-space: pre-wrap;
    word-break: break-all;
    padding-top: 20px;
  }
  .tableBoxWrap{
    background: rgb(233, 233, 233); 
    margin: 0px auto; padding: 4px; 
    border: 1px solid rgb(194, 194, 194); 
    width: 950px; 
    line-height: 22px;
    margin-top: 8px;
    .tableBoxDiv{
        background: url(&quot;Six_01.gif&quot;) repeat-x 50% top rgb(255, 255, 255); 
        padding: 20px 40px; 
        border: 1px solid rgb(255, 255, 255);
    }
    .tableBoxTop{
        text-align: left; 
        color: rgb(128, 128, 128); 
        padding-bottom: 10px; 
        font-size: 12px; 
        border-bottom-color: rgb(216, 216, 216); 
        border-bottom-width: 1px; 
        border-bottom-style: dashed;
    }
    .tableBoxTitle{
        color: rgb(0, 0, 0); 
        line-height: 85px; 
        font-size: 24px; 
        text-align: center;
        font-family: 仿宋_GB2312,FangSong_GB2312 !important;
    }
    .tableBoxp1{
        text-align: center; 
        color: rgb(128, 128, 128); 
        font-family: 宋体 !important; 
        font-size: 12px; 
        font-weight: normal;
    }
    .tableBoxp2{
        height: 1px; 
        line-height: 1px; 
        text-indent: 2em; 
        font-size: 0px; 
        border-top-color: rgb(191, 191, 191); 
        border-bottom-color: rgb(216, 216, 216); 
        border-top-width: 1px; 
        border-bottom-width: 1px; 
        border-top-style: solid; 
        border-bottom-style: solid;
    }
  }
  .ProjectDetailWrap{
    .preview-header .icon-circle-base{
      background: rgb(150, 53, 138);
    }
    .title{
      color: #333;
    }
    .wea-doc-detail-content-text-sub span{
      font-size: 12px;
    }
    .doc-like .anticon{
      color: rgb(178, 178, 178);
      margin-left: 8px;
      margin-right: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .doc-like.active,.doc-like.active .anticon{
      color: rgb(255, 159, 1);
    }
    .doc-label{
      color: #999;
      margin-left: 10px;
      font-size: 16px;
      font-weight: normal;
      position: absolute;
      cursor: pointer;
    }
  }
  </style>
  