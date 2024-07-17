<template>
    <div class="previewWrap">
      <div class="preview-header">
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
           <a-button type="primary" class="ml10">内部分享</a-button>
          <!-- <a-button type="primary" class="ml10" @click="handleEdit">编辑</a-button>
          <a-button type="primary" class="ml10" @click="handleDelete">删除</a-button>
          <a-button type="primary" class="ml10" @click="changeStatus">更改状态</a-button>
          <a-button class="ml10" @click="handlePreview">预览</a-button>
          <a-button class="ml10" @click="handleRemind">提醒</a-button> -->
          <a-dropdown :trigger="['hover']" class="ml10">
            <span class="btn-drop">
              <UnorderedListOutlined style="color: #1d2129" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1"> 内部分享 </a-menu-item>
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
          <div class="tabContainer containerForm" v-if="activeKey == 0">
            <div class="tableBox">
                <div class="tableBoxWrap">
                    <div class="tableBoxDiv">
                        <div class="tableBoxTop">
                            <p></p>
                            <p>发布日期：{{detail.ApprovedOn ||'暂无'}}</p>
                            <p>所属栏目：{{detail.FolderIdName ||'暂无'}}</p>
                        </div>
                        <h2 class="tableBoxTitle">
                            <span>{{ detail.Title ||'暂无' }}</span>
                        </h2>
                        <p class="tableBoxp1">发布人：{{detail.ApprovedByName ||'暂无'}} &nbsp; &nbsp; &nbsp; &nbsp; 发布部门：{{detail.BusinessUnitIdName ||'暂无'}}&nbsp;&nbsp;&nbsp;&nbsp; 状态：{{detail.StateCodeName ||'暂无'}}</p>
                        <p class="tableBoxp2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
                        <div v-html="content" class="tableBoxContent"></div>
                    </div>
                </div>
            </div>
          </div>
          <div class="tabContainer" v-if="activeKey == 1">
            <AttachFilesList
              :id="id"
              :objectTypeCode="objectTypeCode"
              @addClass="handleAddClass"
            />
          </div>
          <div class="tabContainer" v-if="activeKey == 2">
            <div class="detailContent">
              <DetailInfo  :id="id" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
            </div>
          </div>
          <div class="tabContainer" v-if="activeKey == 3">
            <ReadRecord :id="id" />
          </div>
          <div class="tabContainer" v-if="activeKey == 4">
            <Comment :id="id" />
          </div>
          
        </div>
      </div>
      <InfoNotes
        :isShow="isNotes"
        :id="id"
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
      <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="deleteOk" :sObjectName="sObjectName" :recordId="id" :objTypeCode="objectTypeCode" :external="external" />
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
  import InfoNotes from "@/components/information/InfoNotes.vue";
  import ChangeStatus from "@/components/information/ChangeStatus.vue";
  import InfoRemind from "@/components/information/InfoRemind.vue";
  import InfoAddClass from "@/components/information/InfoAddClass.vue";
  import ReadRecord from "@/components/information/ReadRecord.vue";
  import AttachFilesList from "@/components/information/AttachFilesList.vue";
  import Comment from "@/components/detail/Comment.vue";
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import DetailInfo from "@/components/detail/DetailInfo.vue";
  import Delete from "@/components/listView/Delete.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  
  const route = useRoute();
  const router = useRouter();
  const data = reactive({
    tabs: [
      {
        label: "文档正文",
      },
      {
        label: "文档附件",
      },
      {
        label: "文档属性",
      },
      {
        label: "阅读",
      },
      {
        label: "评论",
      },
    ],
    activeKey: 0,
    id: route.query.id,
    objectTypeCode: route.query.objectTypeCode,
    sObjectName:route.query.objectTypeCode=='100201'?'Content':'Notice',
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
                  recordId: data.id,
                  apiName:data.objectTypeCode=='100201'?'Content':'Notice',
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
              data.detail.Title=fields.Title.value;
              data.content=fields.ContentBody.value;
              data.detail.ApprovedOn=fields.ApprovedOn.value;
              data.detail.FolderIdName=fields.FolderId.displayValue;
              data.detail.BusinessUnitIdName=fields.BusinessUnitId.displayValue;
              data.detail.ApprovedByName=fields.ApprovedBy.displayValue;
              data.detail.StateCodeName=fields.StateCode.displayValue;
              data.detail.ReadCount=fields.ReadCount.value;
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
      // router.push({
      //     path:"/informationEditor",
      //     query: {
      //       id: id
      //     }
      // });
      let reUrl = router.resolve({
              name: "InformationEditor",
              query: {
                  id: data.id,
                  objectTypeCode: data.objectTypeCode,
                  //FolderId: res.actions[0].returnValue&&res.actions[0].returnValue.fields&&res.actions[0].returnValue.fields.FolderId?res.actions[0].returnValue.fields.FolderId:''
                  FolderId: ''
              }
          })
      window.open(reUrl.href); 
    }
  const handleDelete= (e) => {
    data.isDelete = true;
  }
  const deleteOk = (e) => {
    let path='/lightning/o/Content/home';
    if(data.objectTypeCode=='100202'){
      path='/lightning/o/ContentNotice/home'
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
  </script>
  <style lang="less" scoped>
  .previewWrap{
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
  .previewWrap .detail-scroll{
    height: calc(~"100% - 70px");
  }
  .previewWrap .detailContent{
      width: 100%;
      padding: 20px;
      background: #fff;
      border-radius: 4px;
      overflow: auto;
  }
  .previewWrap .tableBoxContent{
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
  </style>
  