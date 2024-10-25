<template>
  <div class="detailWrap">
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
        <a-button type="primary" class="ml10" @click="handleEdit">编辑</a-button
        >
        <a-button type="primary" class="ml10" @click="handleDelete">删除</a-button>
        <a-button type="primary" class="ml10" @click="changeStatus"
          >更改状态</a-button
        >
        <a-button class="ml10" @click="handlePreview">预览</a-button>
        <a-button class="ml10" @click="handleRemind">提醒</a-button>
        <a-dropdown :trigger="['hover']" class="ml10">
          <span class="btn-drop">
            <UnorderedListOutlined style="color: #1d2129" />
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1"> 查看范围 </a-menu-item>
              <a-menu-item key="2"> 邀请查看者 </a-menu-item>
              <a-menu-item key="3"> 邀请所有人 </a-menu-item>
              <a-menu-item key="4" @click="handleNotes"> 备注 </a-menu-item>
              <a-menu-item key="5" @click="handleAddClass">
                添加分类
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="detail-scroll">
      <div class="detail-bd">
        <div class="tabContainer containerForm" v-if="activeKey == 0">
          <div class="tableBox" v-html="content"></div>
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
                        觉得卡拉利空打击了的空间阿斯利康大家大家按时大家按时按时
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
            <DetailInfo  :id="id" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
          </div>
        </div>
        <div class="tabContainer" v-if="activeKey == 2">
          <PersonnelList :id="id" :objectTypeCode="objectTypeCode" />
        </div>
        <div class="tabContainer" v-if="activeKey == 3">
          <Comment :id="id" />
        </div>
        <div class="tabContainer" v-if="activeKey == 4">
          <AffiliatedColumn
            :id="id"
            :objectTypeCode="objectTypeCode"
            @addClass="handleAddClass"
          />
        </div>
        <div class="tabContainer" v-if="activeKey == 5">
          <!-- <Comment /> -->
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
import "@/style/detail.less";
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
import PersonnelList from "@/components/information/PersonnelList.vue";
import AffiliatedColumn from "@/components/information/AffiliatedColumn.vue";
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
      label: "内容",
    },
    {
      label: "详情信息",
    },
    {
      label: "人员",
    },
    {
      label: "评论",
    },
    {
      label: "隶属栏目",
    },
    {
      label: "相关",
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
  external
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
    //     path:"/content/visualEditor",
    //     query: {
    //       id: id
    //     }
    // });
    let reUrl = router.resolve({
            name: "visualEditor",
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
.detailWrap .detail-scroll{
  height: calc(~"100% - 70px");
}
.detailWrap .detailContent{
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    overflow: auto;
}
</style>
