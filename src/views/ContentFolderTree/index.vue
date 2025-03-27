<template>
  <div class="ContentWrap ContentFolderTreeWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
        </div>
        <span class="headerTitle">目录管理</span>
      </div>
      <div class="headerRight">
        <a-button type="primary" class="ml10" @click="handleAddLeft('')">新建目录</a-button>
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="24" class="wea-left-right-layout-left">
          <div class="top-content">
            <div class="wea-left-tree-search">
              <span class="wea-left-tree-search-label alltype">类型：</span>
              <a-select v-model:value="data.leftTreeTop" @change="leftTreeTopChange">
                <a-select-option key="0" value="我的收藏">我的收藏</a-select-option>
                <a-select-option key="1" value="全部目录">全部目录</a-select-option>
              </a-select>
            </div>
            <div class="wea-left-tree-search">
              <span class="wea-left-tree-search-label alltype">名称：</span>
              <a-input v-model:value="searchVal" placeholder="输入名称查询" @change="onSearch" allowClear />
              <!-- <div class="wea-left-tree-search-icon">
                <SearchOutlined />
              </div> -->
            </div>
          </div>
          <div class="wea-left-tree">
            <div class="wea-left-tree-scroll information-tree">
              <a-tree :style="{ height: tableHeight + 'px' }" :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames" :defaultExpandAll="true"
                default-expand-all
                :selectedKeys="selectedKeys" @select="onSelect" @expand="onExpand">
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                  </CaretDownOutlined>
                </template>
                <template #title="{ id, name, isFavor }">
                  <span>
                    {{ name }}
                    <span class="tree-num">
                      <span class="tree-btn tree-add" @click.stop="handleAddLeft(id,name)" v-if="data.leftTreeTop == '全部目录'">
                                <PlusOutlined title="添加子目录" />
                              </span>
                              <span class="tree-btn tree-edit" @click.stop="handleEditLeft(id)" v-if="data.leftTreeTop == '全部目录'">
                                <EditOutlined title="编辑目录" />
                              </span>
                              <span class="tree-btn tree-delete" @click.stop="handleDeleteLeft(id)" v-if="data.leftTreeTop == '全部目录'">
                                <DeleteOutlined title="删除" />
                              </span>
                      <span class="tree-btn tree-favor" :class="{ 'tree-favor-active': isFavor }"
                        @click.stop="setFavor(id, name, isFavor)">
                        <StarOutlined title="收藏" v-if="!isFavor" />
                        <StarFilled title="取消收藏" v-if="isFavor" />
                      </span>
                      <!-- {{ quantity }} -->
                    </span>
                  </span>
                  <!-- <a-dropdown :trigger="['contextmenu']">
                      <span>
                            {{ name }}
                            <span class="tree-num">
                              <span class="tree-btn tree-add" @click.stop="handleAddLeft(id,name)">
                                <PlusOutlined title="添加子目录" />
                              </span>
                              <span class="tree-btn tree-edit" @click.stop="handleEditLeft(id)">
                                <EditOutlined title="编辑目录" />
                              </span>
                              <span class="tree-btn tree-delete" @click.stop="handleDeleteLeft(id)">
                                <DeleteOutlined title="删除" />
                              </span>
                              <span class="tree-btn tree-favor" :class="{'tree-favor-active':isFavor||data.leftTreeTop=='我的收藏'}" @click.stop="setFavor(id,name,quantity,isFavor)">
                                <StarOutlined title="收藏" v-if="!isFavor&&data.leftTreeTop!='我的收藏'" />
                                <StarFilled title="取消收藏" v-if="(isFavor||data.leftTreeTop=='我的收藏')" />
                              </span>
                              {{ quantity }}
                            </span>
                          </span>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="1" @click="handleAddLeft(id,name)">添加子目录</a-menu-item>
                            <a-menu-item key="2" @click="handleEditLeft(id)">编辑目录</a-menu-item>
                            <a-menu-item key="3" @click="handleDeleteLeft(id)">删除</a-menu-item>
                          </a-menu>
                        </template>
</a-dropdown> -->
                </template>
              </a-tree>
            </div>
          </div>
        </a-col>
        </a-row>
    </div>
    <NewInfo v-if="isNew" :isShow="isNew" :treeData="gData" @cancel="cancelNew"
      :objectTypeCode="data.queryParams.objectTypeCode" :FolderId="data.SelectKey" />
    <Delete v-if="data.isDelete" :isShow="data.isDelete" :desc="data.deleteDesc" @cancel="cancelDelete" @ok="deleteOk"
      :sObjectName="sObjectName" :recordId="data.recordId" :objTypeCode="objectTypeCode" :external="data.external" />
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon = false"
      :title="data.recordId ? '编辑' : '新建'" @success="deleteOk" :id="data.recordId" :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName" :relatedObjectAttributeValue="relatedObjectAttributeValue"
      :relatedObjectAttributeName="relatedObjectAttributeName"></common-form-modal>
    <NewFolder v-if="isNewFolder" :isShow="isNewFolder" :treeData="gData" @cancel="isNewFolder = false"
      @success="deleteOk" :id="data.recordId" :ParentId="data.SelectKey" :ParentIdName="data.SelectName" />
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle"
      @cancel="isConfirm = false" @ok="confirmOk" :id="CheckList" />
  </div>
</template>
<script setup>
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined,
  ApartmentOutlined,
  SearchOutlined,
  StarOutlined,
  StarFilled,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick } from "vue";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
import Ntable from "@/components/Ntable.vue";
import { useRouter, useRoute } from "vue-router";
import { girdFormatterValue } from "@/utils/common.js";
const route = useRoute();
const router = useRouter();
import NewInfo from "@/components/information/NewInfo.vue";
import NewFolder from "@/components/information/NewFolder.vue";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import Delete from "@/components/listView/Delete.vue";
const x = 3;
const y = 2;
const z = 1;
const { proxy } = getCurrentInstance();
const genData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || genData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: key,
      key,
    });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({
      key,
      title: key,
    });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(genData);
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const expandedKeys = ref([]);
const searchValue = ref("");
const autoExpandParent = ref(true);
const res = require("@/localData/treedata.json");
const gData = ref([]);
const gDataAll = ref([]);

const generateExpandedKeys = (treeData) => {
  let keys = [];
  treeData.forEach(item => {
    keys.push(item.key);
    if (item.children) {
      keys = keys.concat(generateExpandedKeys(item.children));
    }
  });
  return keys;
};

//收藏目录
const getFavorite = () => {
  gData.value = [];
  gDataAll.value = [];
  let filterQuery = '\nObjectTypeCode\teq\t5080\nCreatedBy\teq\t' + data.userId;
  proxy.$post(Interface.list2, {
    filterId: '',
    objectTypeCode: '6060',
    entityName: '',
    filterQuery: filterQuery,
    search: '',
    page: 1,
    rows: 100,
    sort: 'CreatedOn',
    order: 'DESC',
    displayColumns: 'Name,ObjectId'
  }).then(res => {
    if (res && res.nodes && res.nodes.length) {
      var list = [];
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != 'id' && cell != 'nameField') {
            item[cell] = girdFormatterValue(cell, item);
          }
        }
        list.push({
          children: [],
          id: item.id,
          key: item.id,
          name: item.Name||'暂无',
          parent: null,
          quantity: 0,
          text: null,
          value: item.ObjectId,
          isFavor: true
        })
      }
      gData.value = list;
      gDataAll.value = list;
    }
  })
}
//收藏选中目录
const setFavor = (id, name, isFavor) => {
  if (data.leftTreeTop == '全部目录') {
    let filterQuery = '\nObjectId\teq\t' + id + '\nCreatedBy\teq\t' + data.userId;
    proxy.$post(Interface.list2, {
      filterId: '',
      objectTypeCode: '6060',
      entityName: 'P9f',
      filterQuery: filterQuery,
      search: '',
      page: 1,
      rows: 10,
      sort: 'CreatedOn',
      order: 'DESC',
      displayColumns: 'Name'
    }).then(res => {
      if (res && res.nodes && res.nodes.length) {
        //message.success("已收藏！");
        saveFavor(res.nodes[0].id, name, true);
      } else {
        saveFavor(id, name, false);
      }
    })
  }
  else {
    saveFavor(id, name, true);
  }
}
const saveFavor = (id, name, isFavor) => {
  if (!isFavor) {
    let url = Interface.create;
    let d = {
      actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: 'FavoriteObject',
            objTypeCode: '6060',
            fields: {
              Name: name,
              ObjectId: id,
              ObjectTypeCode: '5080',
              CreatedBy: data.userId
            }
          }
        }
      }]
    };
    // if(id){
    //     d.actions[0].params.recordId=id;
    // }
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
      if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
        message.success("收藏成功！");
        leftTreeTopChange(data.leftTreeTop);
      }
      else {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
          message.success(res.actions[0].errorMessage);
        }
        else {
          message.success("收藏失败！");
        }
      }
    });
  }
  else {
    let obj = {
      actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: id,
          apiName: 'FavoriteObject',
          objTypeCode: '6060',
        }
      }]
    };
    let d = {
      message: JSON.stringify(obj)
    };
    proxy.$post(Interface.delete, d).then(res => {
      if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
        message.success("取消收藏成功");
        leftTreeTopChange(data.leftTreeTop);
      } else {
        if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
          message.success(res.actions[0].errorMessage);
        }
        else {
          message.error("取消收藏失败");
        }
      }
    })
  }
}
const onExpand = (keys) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

let data = reactive({
  leftTreeTop: '全部目录',
  isCollapsed: false,
  tableHeight: '',
  fieldNames: {
    children: 'children', title: 'name', key: 'id'
  },
  tabs: [
    
  ],
  activeKey: 0,
  isModal: false,
  isCirculation: false,
  isNew: false,
  searchVal: '',
  value: "",
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  recordId: '',
  external: false,
  userId: '',
  isCommon: false,
  objectTypeCode: '100201',
  sObjectName: 'Content',
  relatedObjectAttributeValue: {},
  relatedObjectAttributeName: '',
  SelectKey: '',
  SelectName: '',
  selectedKeys: [],
  isNewFolder: false,
  CheckList: [],
  isConfirm: false,
  confirmText: '',
  confirmTitle: '',
  folderActionsConfig: {
    canAdd: false,
    canAdmin: false,
    canDelete: false,
    canRead: false
  }
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
};
const { folderActionsConfig, CheckList, isConfirm, confirmText, confirmTitle, isNewFolder, selectedKeys, SelectName, SelectKey, relatedObjectAttributeValue, relatedObjectAttributeName, recordId, objectTypeCode, sObjectName, isCommon, isCollapsed, userId, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, isNew, value, searchVal, leftTreeTop } = toRefs(data);
const tabContent = ref(null);
const contentRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
//全部目录
const getTreeData = () => {
  gData.value = [];
  gDataAll.value = [];
  let url = Interface.content.folder.get;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        search:data.searchVal
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      let formTree = (list) => {
        list.forEach(item => {
          if (item.children) {
            formTree(item.children);
          }
          item.key = item.id;
          item.value = item.id;
          item.isFavor = item.isFavor || false;
        })
      }
      let response = res.actions[0].returnValue;
      formTree(response);
      console.log("formTree", response);
      gData.value = response;
      gDataAll.value = response;
      expandedKeys.value=generateExpandedKeys(response);
    }
  });
  
}
const leftTreeTopChange = (e) => {
  if (e == '全部目录') {
    getTreeData();
  }
  else {
    getFavorite();
  }
  //console.log(e)
}
const onSearch = (e) => {
  // gData.value = gDataAll.value.filter(item => {
  //   if (item.name.indexOf(data.searchVal) != -1) {
  //     return item;
  //   }
  //   else {
  //     if (item.children && item.children.length) {
  //       for (var i = 0; i < item.children.length; i++) {
  //         if (item.children[i].name.indexOf(data.searchVal) != -1) {
  //           return item.children[i];
  //         }
  //       }
  //     }
  //   }
  // })
  getTreeData();
}
const onSelect = (keys, { node }) => {
  //console.log(node)

  if (keys && keys.length) {
    data.folderActionsConfig = {
      canAdd: false,
      canAdmin: false,
      canDelete: false,
      canRead: false
    }
    data.SelectKey = node.id;
    data.SelectName = node.name;
    data.selectedKeys = [node.id];
    if (node.folderActionsConfig) {
      data.folderActionsConfig = node.folderActionsConfig;
    }
    //getPrivileges()
  }
};

function changeHeight(h) {
  if (typeof h == 'number') {
    formSearchHeight.value = h;
  }
  let contentHeight = contentRef.value.clientHeight;
  let tabsHeight = 46;
  let height = contentHeight - tabsHeight - formSearchHeight.value;
  data.tableHeight = height;
  console.log('data', data.tableHeight);

}

const deleteOk = (e) => {
  getTreeData();
};
const cancelDelete = (e) => {
  data.isDelete = false;
};

const handleNew = (e) => {
  if (data.SelectKey) {
    data.relatedObjectAttributeValue = {};
    data.relatedObjectAttributeName = '';
    data.objectTypeCode = '100201';
    data.sObjectName = 'Content';
    data.recordId = '';
    data.isNew = true;
  }
  else {
    message.error("必须先选中父目录");
  }
}
const cancelNew = (e) => {
  data.isNew = e;
}
const handleAddLeft = (id, name) => {
  if (id) {
    data.SelectKey = id;
    data.SelectName = name;
    data.selectedKeys = [id];
  }
  if (data.SelectKey) {
    // data.relatedObjectAttributeValue={
    //   value:data.SelectKey,
    //   name:data.SelectName
    // };
    // data.relatedObjectAttributeName='ParentId';
    data.objectTypeCode = '5080';
    data.sObjectName = 'ContentFolder';
    data.recordId = '';
    // data.isCommon=true;
    data.isNewFolder = true;
  }
  else {
    message.error("必须先选中父目录");
  }
}
const handleEditLeft = (e) => {
  // data.relatedObjectAttributeValue={};
  // data.relatedObjectAttributeName='';
  data.objectTypeCode = '5080';
  data.sObjectName = 'ContentFolder';
  data.recordId = e;
  // data.isCommon=true;
  data.isNewFolder = true;
}
const handleDeleteLeft = (e) => {
  data.relatedObjectAttributeValue = {};
  data.relatedObjectAttributeName = '';
  data.objectTypeCode = '5080';
  data.sObjectName = 'ContentFolder';
  data.recordId = e;
  data.isDelete = true;
}
const confirmOk = () => {
  if (data.confirmTitle == '') {
    
  } 
  else {
    
  }
  data.isConfirm = false;
}

//获取单个目录权限
const getPrivileges = () => {
  data.folderActionsConfig = {
    canAdd: false,
    canAdmin: false,
    canDelete: false,
    canRead: false
  }
  if (data.SelectKey) {
    let url = Interface.content.folder.getPrivileges;
    let d = {
      actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          id: data.SelectKey,
        }
      }]
    };
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
      if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue) {
        data.folderActionsConfig = res.actions[0].returnValue;
      }
    })
  }
}
watch(() => route, (newVal, oldVal) => {
  if (route.path == '/lightning/page/ContentFolderTree') {
    getTreeData();
  }
}, { deep: true, immediate: true })
onMounted(() => {
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
  }
  window.addEventListener('resize', changeHeight)
  getTreeData()
})
</script>
<style lang="less" scoped>
.ContentFolderTreeWrap {
  width: 100%;
  height: 100%;
  background: #fff;

  .todo-head {
    width: 100%;
    height: 52px;
    line-height: 52px;
    background: #f9f9f9;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;

    .todo-head-left {
      padding-left: 20px;
      display: flex;
      align-items: center;
      flex: 1;

      .icon-circle-base {
        width: 35px;
        height: 35px;
        background: rgb(0, 121, 222);
        border-radius: 50%;
        margin-right: 10px;
        color: #fff;
      }

      .wea-new-top-title-breadcrumb {
        color: #484a4d;
        margin-left: 3px;
        font-size: 14px;
        font-weight: 500;
      }
    }

    .todo-head-right {
      padding-right: 14px;
      display: flex;
      align-items: center;

      .btn-drop {
        display: inline-block;
        padding-left: 20px;
        line-height: 40px;
        vertical-align: middle;
        cursor: pointer;
      }

      .ant-btn-group {
        margin-left: 10px;
      }
    }
  }

  .todo-content {
    width: 100%;
    height: calc(~"100% - 52px");

    .ant-row {
      height: 100%;

      .wea-left-right-layout-left {
        border-right: 1px solid #eaeaea;

        .wea-left-tree {
          width: 100%;
          height: 100%;

          .wea-left-tree-search {
            width: 100%;
            height: 46px;
            line-height: 46px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 14px;

            :deep .ant-input {
              border: none !important;
            }

            .wea-left-tree-search-label {
              display: inline-block;
              padding-left: 14px;
              min-width: 76px;
              cursor: pointer;
              font-weight: 600;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 12px;
            }
          }

          .wea-left-tree-scroll {
            margin-top: 10px;
            width: 100%;
            height: calc(~"100% - 56px");
            overflow: auto;

            .ant-tree-title {
              display: inline-block;
              width: 100%;
            }

            .ant-tree-title>span {
              width: 100%;
              display: flex;
              justify-content: space-between;

              .tree-num {
                padding-right: 10px;
                position: relative;
                color: rgb(197, 197, 197);

                .tree-btn {
                  position: absolute;
                  left: -20px;
                  top: 1px;
                  width: 14px;
                  height: 14px;
                  color: #aaa;
                  display: none;
                }

                .tree-favor {
                  left: -20px;
                }

                .tree-add {
                  left: -110px;
                }

                .tree-edit {
                  left: -80px;
                }

                .tree-delete {
                  left: -50px;
                }

                .tree-favor-active {
                  color: #ffa741;
                  display: block;
                }
              }
            }
          }
        }
      }

      .wea-left-right-layout-right {
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        position: relative;

        .wea-left-right-layout-btn {
          width: 18px;
          height: 60px;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -30px;
          z-index: 11;
          cursor: pointer;
          background-size: 100% 100%;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-show {
          background: url(~@/assets/img/leftTree-show.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
          background: url(~@/assets/img/leftTree-show-hover.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
          background: url(~@/assets/img/leftTree-hide.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
          background: url(~@/assets/img/leftTree-hide-hover.png) no-repeat -2px 0;
        }
      }

      .wea-tab {
        height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 0 15px;

        :deep .ant-tabs-nav::before {
          border-bottom: none !important;
        }
      }

      //.wea-tabContent {
      //height: calc(~"100% - 98px");
      //}
    }
  }
}

.information-tree :deep .ant-tree-title {
  white-space: nowrap !important;
}

:deep .iconBox {
  text-align: center;

  .popup {
    text-align: left;
    top: 20px;
  }

  .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
}

.ContentFolderTreeWrap {
  .headerBar .headerLeft .icon-circle-base {
    background: rgb(223, 88, 58);
  }

  .alltype {
    padding-left: 0 !important;
    min-width: 60px !important;
  }

  .wea-left-tree-select {
    position: relative;

    .ant-select {
      width: 100%;

      :deep .ant-select-selector {
        border-radius: 0 !important;
        border: 0 !important;
        border-bottom: 1px solid #dedede !important;
        height: 46px;
        line-height: 46px;
        display: block;
        padding-left: 35px;
        border-color: #dedede !important;
        box-shadow: none !important;

        .ant-select-selection-item {
          font-size: 13px;
          color: #494949;
        }
      }
    }

    .wea-left-tree-select-icon {
      color: #494949;
      position: absolute;
      left: 12px;
      top: 13px;
      z-index: 1;
    }
  }

  .wea-left-tree-search {
    margin-top: 3px;
    position: relative;

    .wea-left-tree-search-icon {
      color: #bbb;
      position: absolute;
      right: 21px;
      top: 1px;
      z-index: 1;
    }
  }

  .wea-left-tree-scroll {
    height: calc(~'100% - 100px') !important;
  }

  :deep .ant-tabs .ant-tabs-tab {
    padding: 12px 24px !important;
    margin-right: 6px !important;
  }

  :deep .anticon-close-circle {
    right: 14px !important;
    position: relative !important;
  }

  :deep .ant-tree-switcher .ant-tree-switcher-icon {
    position: relative;
    top: 2px;
    left: 5px;
  }

  :deep .ant-tree-treenode {
    padding-left: 10px !important;
  }
}

:deep .ant-tree-treenode:hover .tree-btn {
  display: block !important;
}

.ContentWrap.ContentFolderTreeWrap {
  :deep .anticon-close-circle {
    right: 0px !important;
    position: relative !important;
  }
  .todo-content {
    width: unset !important;

    :deep .top-content {
      display: flex !important;
      justify-content: flex-end;
      padding-right: 20px;
    }
    :deep .ant-row {
      width: unset !important;
      .ant-col{
        height: 100%;
      }
      .ant-col.wea-left-right-layout-left {

        .wea-left-tree {
          width: 40% !important;
          margin: 0 auto;

          .wea-left-tree-search {
            width: unset !important;
          }
          .wea-left-tree-scroll{
            padding-top: 15px;
            width: 100%;
            padding-left: 10px;
            margin-top: 20px;
            height: calc(100% - 100px) !important;
            overflow: auto;
            border: 1px solid #dedede;
            border-radius: 8px;
          }
        }
      }
    }
  }
  .wea-left-tree-search{
    margin-top: 10px;
    position: relative;
    width: 240px;
    display: flex;
    align-items: center;
    .ant-select-single{
      width: 100%;
    }
  }
  .alltype{
    padding-left: 20px !important;
    min-width: 63px !important;
  }
}
</style>