<template>
  <div class="groupDetail">
    <div class="topImg">
      <img :src="require('@/assets/img/groupdetail/lightning_blue_group.png')" />
    </div>
    <div class="header">
      <div class="leftBox">
        <div class="leftBox-top">
          <div class="d-panel-content-head-avatar" @click="ChangeGroupImage">
            <div class="editheadbg"></div>
            <div class="edithead"><EditOutlined />编辑头像</div>
            <img
              :src="AvatarImg"
              alt=""
              class="d-panel-content-head-left default_avatar"
            />
          </div>
          <div class="d-panel-content-head-title">
            <div class="title">{{detail.Name&&detail.Name.value?detail.Name.value:''}}</div>
            <div class="subtitle">{{detail.IsPublic&&detail.IsPublic.value?'公用':'非公用'}}</div>
          </div>
        </div>
        <!-- <div class="tabContainer">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="群空间"></a-tab-pane>
            <a-tab-pane key="2" tab="详细信息"></a-tab-pane>
            <a-tab-pane key="3" tab="人员"></a-tab-pane>
            <a-tab-pane key="4" tab="统计"></a-tab-pane>
          </a-tabs>
        </div> -->
      </div>
      <div class="rightBtns">
        <a-button class="ml10" type="primary" @click="handleAddPeople">添加成员</a-button>
        <a-button class="ml10" type="primary" @click="handleAddAdmin">添加管理员</a-button>
        <a-button class="ml10" type="primary" @click="handleEdit">编辑小组</a-button>
        <a-button class="ml10" @click="handleDeleteGroup">删除小组</a-button>
        <a-dropdown :trigger="['hover']" class="ml10">
          <span class="btn-drop">
            <UnorderedListOutlined style="color: #1d2129" />
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="handleOpenNotes"> 备注 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="detail-scroll">
      <div class="detail-bd">
        <div class="container">
          <div class="tabContainer" :class="{'tabContainer0':activeKey == '1'}">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1" tab="群空间"></a-tab-pane>
              <a-tab-pane key="2" tab="详细信息"></a-tab-pane>
              <a-tab-pane key="3" tab="人员"></a-tab-pane>
              <a-tab-pane key="4" tab="统计"></a-tab-pane>
              <a-tab-pane key="5" tab="附件"></a-tab-pane>
            </a-tabs>
            <group-space v-if="activeKey == '1'" :id="groudId" />
            <DetailInfo  v-if="activeKey == '2'" :id="groudId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
            <Personnel v-if="activeKey == '3'" :id="groudId" ref="PersonnelLst" :load="refreshPeople" />
            <Statistics v-if="activeKey == '4'" :id="groudId" />
            <RelatedAttachment v-if="activeKey == '5'" :id="groudId" :type="'page'" :RegardingObjectIdName="(detail.Name&&detail.Name.value?detail.Name.value:'')" :RegardingObjectTypeCode="objectTypeCode" />
          </div>
          <!-- <div class="rightAside group-rightAside">
            <div class="panel">
              <div class="panel-head">
                <div class="panel-title">附件 (0)</div>
                <div class="panel-btn">
                  <a-upload v-model:file-list="fileList" action="#" :showUploadList="false">
                    <a-button type="link">上传附件</a-button>
                  </a-upload>
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
                        <span class="link" @click="viewFile('/pdfjs/web/viewer.html?file=..%2F..%2Fresources%2Fuploadfiles%2Ftest.pdf')">查看</span> ·
                        <span class="link" @click="downloadFile('/pdfjs/web/viewer.html?file=..%2F..%2Fresources%2Fuploadfiles%2Ftest.pdf')">下载</span>
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
            <div class="panel">
              <div class="panel-head">
                <div class="panel-title">管理员</div>
                <div class="panel-btn">
                  <a-button type="text" size="small" @click="handleAddAdmin"
                    >添加管理员</a-button
                  >
                </div>
              </div>
              <div class="panel-bd">
                <div class="relevantList">
                  <div class="people-head-list">
                    <div
                      class="peopleItem"
                      v-for="(item, index) in adminList"
                      :key="index"
                    >
                      <div class="editheadbg"></div>
                      <div class="edithead" @click="handleDeletePeople(item.id)"><DeleteOutlined />删除</div>
                      <img
                        :src="item.PhotoUrl||require('@/assets/img/avatar.png')"
                        alt=""
                        class="d-avatar"
                      />
                      <div :title="item.FullName" class="relevantTitle">
                        {{ item.FullName }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel">
              <div class="panel-head">
                <div class="panel-title">成员</div>
                <div class="panel-btn">
                  <a-button type="text" size="small" @click="handleAddPeople"
                    >添加成员</a-button
                  >
                </div>
              </div>
              <div class="panel-bd">
                <div class="relevantList">
                  <div class="people-head-list">
                    <div
                      class="peopleItem"
                      v-for="(item, index) in peopleList"
                      :key="index"
                    >
                      <div class="editheadbg"></div>
                      <div class="edithead" @click="handleDeletePeople(item.id)"><DeleteOutlined />删除</div>
                      <img
                        :src="item.PhotoUrl||require('@/assets/img/avatar.png')"
                        alt=""
                        class="d-avatar"
                      />
                      <div :title="item.FullName" class="relevantTitle">
                        {{ item.FullName }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
    <Notes :isShow="isNotes" @cancel="closeNotes" />
    <!-- <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="submitOk" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal> -->
    <add-group :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="submitOk" :id="recordId" type="1"></add-group>
    <update-group-image :isShow="isUpdateGroupImage" v-if="isUpdateGroupImage" @cancel="isUpdateGroupImage=false" title="更新照片" @load="submitOk" :id="recordId"></update-group-image>
    <Delete :isShow="isDelete" :desc="deleteDesc" :sObjectName="deleteInfo.sObjectName" :recordId="deleteInfo.recordId" :objTypeCode="deleteInfo.objectTypeCode" :external="external" @cancel="closeDelete" @ok="deleteOk" />
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
  h,
} from "vue";
import { EditOutlined, UnorderedListOutlined,DeleteOutlined,DownOutlined,PlusOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
import GroupSpace from "@/components/groupDetail/GroupSpace.vue";
import DetailInfo from "@/components/detail/DetailInfo.vue";
import Personnel from "@/components/groupDetail/Personnel.vue";
import Statistics from "@/components/groupDetail/Statistics.vue";

// 选人
import RadioUser from "@/components/commonModal/RadioUser.vue";
// 备注
import Notes from "@/components/groupDetail/Notes.vue";
//import CommonFormModal from "@/components/listView/CommonFormModal.vue";
// 编辑
import AddGroup from "@/components/groupDetail/AddGroup.vue";
import UpdateGroupImage from "@/components/groupDetail/UpdateGroupImage.vue";
// 删除
import Delete from "@/components/listView/Delete.vue";
// 附件列表
import RelatedAttachment from "@/components/meeting/RelatedAttachment.vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
let store = useStore();
store.commit("setGroupId", route.query.GroupId);
const PersonnelLst = ref();
const data = reactive({
  activeKey: "1",
  groudId: route.query.GroupId,
  adminList: [],
  peopleList: [],
  isRadioUser: false,
  isNotes: false,
  isDelete: false,
  RoleCode: 0,
  isCommon: false,
  isUpdateGroupImage:false,
  recordId:route.query.GroupId,
  objectTypeCode:'9',
  sObjectName:'Group',
  deleteDesc: '确定要删除吗？',
  external:false,
  detail: {Name:{value:""},IsPublic:{value:""}},
  AvatarImg:require('@/assets/img/avatar-r.png'),
  deleteInfo:{
    recordId:'',
    objectTypeCode:'',
    sObjectName:''
  },
  fileList:[],
  height:100
});
const {
  activeKey,
  adminList,
  peopleList,
  isRadioUser,
  isNotes,
  isDelete,
  isAdmin,
  isCommon,
  isUpdateGroupImage,
  fileList,
  recordId,objectTypeCode,sObjectName,deleteDesc,external,detail,AvatarImg,groudId,deleteInfo,height
} = toRefs(data);
const handleOpenNotes = () => {
  data.isNotes = true;
};
const closeNotes = (e) => {
  data.isNotes = e;
};
// 添加成员
const handleAddPeople = (e) => {
  data.isRadioUser = true;
  data.RoleCode = 0;
};
// 添加管理员
const handleAddAdmin = (e) => {
  data.RoleCode = 2;
  data.isRadioUser = true;
};
// 删除小组
const handleDeleteGroup = () => {
  data.deleteInfo={
    recordId:route.query.GroupId,
    objectTypeCode:'9',
    sObjectName:'Group'
  }
  data.isDelete=true;
};
const closeDelete = (e) => {
  data.deleteInfo.recordId='';
  data.isDelete = e;
};
const submitOk = (e) => {
  getDetail();
};
const refreshPeople=(e)=>{
  getAdminData();
  if(PersonnelLst.value&&PersonnelLst.value.getQuery){
    PersonnelLst.value.getQuery();
  }
}
const deleteOk = (e) => {
  data.isDelete = false;
  message.success("删除成功!");
  if(data.deleteInfo.objectTypeCode=='9'){
    window.location.href='/lightning/o/CollaborationGroup/list';
  }
  else{
    refreshPeople();
  }
};
const closeUser = (e) => {
  data.isRadioUser = false;
};
// 添加成员/管理员
const getUserData = (params) => {
  console.log("params:", params);
  if (!data.isAdmin) {
    // proxy
    //   .$get(Interface.group.addPeople, {
    //     groupId: store.state.groupId,
    //     userIds: params.id,
    //     RoleCode: data.RoleCode,
    //   })
    //   .then((res) => {
    //     message.success(res.msg);
    //     data.isRadioUser = false;
    //     refreshPeople();
    //   });

        let url=Interface.create;
        let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName: 'GroupMembership',
                objTypeCode: '90',
                fields: {
                    GroupId: data.groudId,
                    RegardingObjectIdName: params.name,
                    RegardingObjectId: params.id,
                    RoleCode: data.RoleCode,
                    RegardingObjectTypeCode:8
                }
              }              
            }
        }]
    };
    
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url,obj).then(res=>{
      data.isRadioUser = false;
      if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
        message.success("添加成功！");
        refreshPeople();
      }
      
    });

  }
};
const getAdminData = () => {
  // proxy.$get(Interface.group.list, {
  //     groupid: data.groudId,
  //   }).then((res) => {
  //       data.peopleList = res.listData;
  //       data.adminList = res.listData.filter((item) => {
  //       return item.RoleCode == "2";
  //     });
  //   });
        let filterQuery='\nGroupId\teq\t'+data.groudId;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'90',
            entityName:'GroupMembership',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 1000,
            sort:'',
            order:'',
            displayColumns:'RegardingObjectIdName,PhotoUrl,FullName,BusinessUnitIdName,RoleCode,MobilePhone,EMailAddress,WorkStatus'
        }).then(res => {
            var list = [];
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='PhotoUrl'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='RegardingObjectIdName'){
                        item['FullName']=item[cell];
                    }
                }
                list.push(item)
                //console.log(item['PhotoUrl'])
            }
            data.peopleList = list;
            data.adminList = list.filter((item) => {
               return item.RoleCode == '管理员';
            });
        })
};
getAdminData();
//编辑
const handleEdit = (key) => {
    data.isCommon = true;
}
// 通用弹窗关闭
const handleCommonCancel = (params) => {
    data.isCommon=false;
};
//更新头像
const ChangeGroupImage=()=>{
  data.isUpdateGroupImage= true;
}
onMounted(() => {
  getDetail();
  let h = document.documentElement.clientHeight;
  data.height=h-302;
  window.addEventListener("resize", (e) => {
    let h = document.documentElement.clientHeight;
    data.height=h-302;
  });
  console.log(data.height)
})
const getDetail = () => {
        let d = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordId: data.recordId,
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
              data.detail=fields;
              data.AvatarImg=fields.AvatarImg&&fields.AvatarImg.value?fields.AvatarImg.value:require('@/assets/img/avatar-r.png');
            }
        })
    }
    
// 删除成员
const handleDeletePeople = (e) => {
  data.deleteInfo={
    recordId:e,
    objectTypeCode:'90',
    sObjectName:'GroupMembership'
  }
  data.isDelete = true;
};
const viewFile=(link)=>{
  window.open(link);
}
const downloadFile=(link)=>{
  window.open(link);
}
</script>
<style lang="less" scoped>
@import "@/style/detail.less";
@import url("@/style/common.less");
.groupDetail {
  width: 100%;
  height: 100vh;
  background: #f0f2f6;
  overflow: hidden;
  .topImg{
    
    img{
      width: 100%;
      height: auto;
      position: absolute;
    }
  }
  .ant-tabs{
    position: relative;
    top: 0;
    background: #fff;
    //padding: 0px 20px;
    padding-top: 5px;
    padding-bottom:15px !important;
    :deep .ant-tabs-tab{
      padding-bottom: 8px !important;
    }
  }
  .header {
    width: 100%;
    position: absolute;
    top: 155px;
    height: 97px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 34px;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e6eb;
    box-shadow: 0px 2px 8px 0px rgba(237, 239, 243, 1);
    z-index: 99;

    .leftBox-top {
      margin-top: 10px;
      display: flex;
      align-items: center;
      position: absolute;
      top: -20px;
      .d-panel-content-head-avatar {
        position: relative;
        cursor: pointer;
        margin-right: 10px;

        .editheadbg {
          width: 170px;
          height: 170px;
          border-radius: 50%;
          border: 4px solid #fff;
          margin: 0;
          display: none;
          background: #000;
          opacity: 0.3;
          position: absolute;
          top: -102px;
          left: 15px;
          z-index: 1;
        }

        .edithead {
          display: none;
          position: absolute;
          top: -30px;
          left: 22px;
          color: #fff;
          font-size: 16px;
          z-index: 2;
          width: 155px;
          text-align: center;
          letter-spacing: 1px;
          .anticon{
            margin-right: 4px;
          }
        }

        .d-panel-content-head-left {
          width: 170px;
          height: 170px;
          border-radius: 50%;
          border: 4px solid #fff;
          margin: 0;
          position: absolute;
          top: -102px;
          background: #fff;
          left: 15px;
        }
      }
      .d-panel-content-head-title{
          position: relative;
          left: 190px;
          top: 30px;
        }
      .d-panel-content-head-avatar:hover {
        .editheadbg,
        .edithead {
          display: block;
        }
      }

      .d-panel-content-head-title {
        .title {
          color: #1d2129;
          font-size: 22px;
          font-weight: bold;
          margin-top: 0px;
          margin-left: 0px;
          margin-bottom: 5px;
        }

        .subtitle {
          color: rgba(134, 144, 156, 1);
          font-size: 14px;
        }
      }
    }

    .rightBtns {
      padding-top: 32px;
      display: flex;

      .btn-drop {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 0;
        border-radius: 6px;
        font-size: 20px;
      }

      .btn-drop:hover {
        color: rgb(78, 89, 105);
        background: #f2f3f5;
      }
    }
  }

  .detail-scroll {
    height: calc(~"100% - 250px");
    margin-top: 250px;
    //overflow: auto;
    background: #f0f2f6;
    position: absolute;
    width: 100%;
    .detail-bd {
      padding: 15px;
      background: #f0f2f6;
      .container {
        padding: 5px;
        display: flex;
        justify-content: space-between;
        .tabContainer {
          width: 80%;
          background: #fff;
          border-radius: 4px;
          margin-right: 12px;
          overflow: hidden;
          padding: 0px 20px;
        }
        .tabContainer0{
          background: transparent;
          padding: 0;
          .ant-tabs{
            position: relative;
            top: 0;
            background: #fff;
            padding: 0px 20px;
            padding-top: 5px;
            padding-bottom:0 !important;
            :deep .ant-tabs-tab{
              padding-bottom: 8px !important;
            }
          }
        }
      }
    }
  }
}

.rightAside {
  max-width: 20%;
  .anticon-down{
    color: #666;
    position: relative;
    top: 8px;
    right: 2px;
  }
}
.group-rightAside{
  position: relative;
  padding-right: 0;
  background: #fff;
}
.relevantList {
  height: calc(100% - 40px);
  overflow: hidden;
  overflow-y: auto;

  .people-head-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    cursor: pointer;

    .peopleItem {
      padding-left: 20px;
      padding: 13px 7px;
      position: relative;
      .d-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 4px solid #fff;
        margin: 0;
        box-sizing: border-box;
      }

      .relevantTitle {
        width: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
        color: #1d2129;
        text-align: center;
      }

      .editheadbg {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 4px solid #fff;
          margin: 0;
          display: none;
          background: #000;
          opacity: 0.3;
          position: absolute;
          top: 14px;
          left: 7px;
        }

        .edithead {
          display: none;
          position: absolute;
          top: 30px;
          left: 14px;
          color: #fff;
          font-size: 12px;
        }
    }
  }
}
.peopleItem:hover {
        .editheadbg,
        .edithead {
          display: block !important;
        }
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
</style>
