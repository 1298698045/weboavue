<template>
  <div class="ContentWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
        </div>
        <span class="headerTitle">文档中心</span>
      </div>
      <div class="headerRight">
        <a-button type="primary" class="ml10" @click="handleAddLeft('')"
          :disabled="!folderActionsConfig.canAdd">新建目录</a-button>
        <a-button type="primary" class="ml10" @click="handleNew" :disabled="!folderActionsConfig.canAdd">新建文章</a-button>
        <a-button type="primary" class="ml10" @click="handleRelease">批量发布</a-button>
        <a-button class="ml10" @click="cancelRelease">批量取消发布</a-button>
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-select">
              <div class="wea-left-tree-select-icon">
                <ApartmentOutlined />
              </div>
              <a-select v-model:value="data.leftTreeTop" @change="leftTreeTopChange">
                <a-select-option key="0" value="我的收藏">我的收藏</a-select-option>
                <a-select-option key="1" value="全部目录">全部目录</a-select-option>
              </a-select>
            </div>
            <div class="wea-left-tree-search">
              <span class="wea-left-tree-search-label alltype">全部类型</span>
              <a-input v-model:value="searchVal" placeholder="" @change="onSearch" allowClear />
              <div class="wea-left-tree-search-icon">
                <SearchOutlined />
              </div>
            </div>
            <div class="wea-left-tree-scroll information-tree">
              <a-tree :style="{ height: tableHeight + 'px' }" :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames"
                :selectedKeys="selectedKeys" @select="onSelect" @expand="onExpand">
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                  </CaretDownOutlined>
                </template>
                <template #title="{ id, name, isFavor }">
                  <span>
                    {{ name }}
                    <span class="tree-num">
                      <!-- <span class="tree-btn tree-add" @click.stop="handleAddLeft(id,name)">
                                <PlusOutlined title="添加子目录" />
                              </span>
                              <span class="tree-btn tree-edit" @click.stop="handleEditLeft(id)">
                                <EditOutlined title="编辑目录" />
                              </span>
                              <span class="tree-btn tree-delete" @click.stop="handleDeleteLeft(id)">
                                <DeleteOutlined title="删除" />
                              </span> -->
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
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
            :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
          <div style="height: 100%" ref="contentRef">
            <div class="wea-tab">
              <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                <a-tab-pane v-for="(item, index) in tabs" :key="index">
                  <template #tab>
                    <span>
                      {{ item.lable }} <span v-if="item.count">({{ item.count }})</span>
                    </span>
                  </template>
                </a-tab-pane>
                <!-- <a-tab-pane key="2" tab="待处理" force-render></a-tab-pane>
                  <a-tab-pane key="3" tab="待阅"></a-tab-pane> -->
              </a-tabs>
              <div class="tabsBtn">
                <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
                  <a-button type="primary" class="ml10">批量发布</a-button>
                  <a-button class="ml10">批量取消发布</a-button> -->
              </div>
            </div>
            <list-form-search ref="searchRef" @update-height="changeHeight" @search="handleSearch"
              entityApiName="Content" :SearchFields="SearchFields"></list-form-search>
            <div class="wea-tabContent" :style="{ height: tableHeight + 'px' }" ref="tabContent">
              <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
              <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                :isCollapsed="isCollapsed">
              </Ntable>
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
import ListFormSearch from "@/components/ListFormSearch.vue";
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

//全部目录
const getTreeData = () => {
  gData.value = [];
  gDataAll.value = [];
  let url = Interface.content.folder.get;
  proxy.$post(url, {}).then(res => {
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
    }
  });
  // proxy.$get(Interface.information.contentTree,{}).then((response)=>{
  //     let formTree = (list) => {
  //       list.forEach(item=>{
  //         if(item.children){
  //           formTree(item.children);
  //         }
  //         item.key = item.id;
  //         item.value = item.id;
  //         item.isFavor=item.isFavor||false;
  //       })
  //     }
  //     formTree(response);
  //     console.log("formTree",response)
  //     gData.value = response;
  //     gDataAll.value = response;
  // })
}
getTreeData()

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
          name: item.Name,
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
// watch(searchValue, (value) => {
//   const expanded = dataList
//     .map((item) => {
//       if (item.title.indexOf(value) > -1) {
//         return getParentKey(item.key, gData.value);
//       }
//       return null;
//     })
//     .filter((item, i, self) => item && self.indexOf(item) === i);
//   expandedKeys.value = expanded;
//   searchValue.value = value;
//   autoExpandParent.value = true;
// });

let data = reactive({
  leftTreeTop: '全部目录',
  isCollapsed: false,
  tableHeight: '',
  fieldNames: {
    children: 'children', title: 'name', key: 'id'
  },
  tabs: [
    {
      lable: "我创建",
      count: ''
    },
    {
      lable: "部门的",
      count: ''
    },
    {
      lable: "全部",
      count: ''
    },
    // {
    //   lable: "我管理的",
    //   count: 16
    // },
    // {
    //   lable: "待审批",
    //   count: 0
    // }
  ],
  activeKey: 0,
  queryParams: {
    filterId: '',
    objectTypeCode: '100201',
    entityName: 'Content',
    filterQuery: '\nCreatedBy\teq-userid',
    displayColumns: 'Title,FolderId,StateCode,BusinessUnitId,ReadCount,ApprovedBy,ApprovedOn,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn'
  },
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
  SearchFields: [
    {
      "column": "Title",
      "label": "标题",
      "dataType": "S",
      "ReferencedEntityObjectTypeCode": 0,
      "sObjectName": "",
      "targetApiName": "",
    },
    {
      "column": "BusinessUnitId",
      "label": "部门",
      "dataType": "O",
      "ReferencedEntityObjectTypeCode": 10,
      "picklistValues": [],
      "sObjectName": "BusinessUnit",
      "targetApiName": "BusinessUnit",
    },
    {
      "column": "StatusCode",
      "label": "状态",
      "dataType": "L",
      "ReferencedEntityObjectTypeCode": 100201,
      "picklistValues": [
        {
          "label": "草稿",
          "value": "0"
        },
        {
          "label": "已发布",
          "value": "1"
        },
        {
          "label": "审批未通过",
          "value": "2"
        }
      ],
      "sObjectName": "",
      "targetApiName": "",
    },
    {
      "column": "CreatedOn",
      "label": "创建时间",
      "dataType": "F",
      "ReferencedEntityObjectTypeCode": 0,
      "picklistValues": [],
      "sObjectName": "",
      "targetApiName": "",
    }
  ],
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
const { folderActionsConfig, CheckList, isConfirm, confirmText, confirmTitle, isNewFolder, selectedKeys, SelectName, SelectKey, relatedObjectAttributeValue, relatedObjectAttributeName, recordId, objectTypeCode, sObjectName, isCommon, isCollapsed, userId, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, isNew, value, searchVal, SearchFields, leftTreeTop } = toRefs(data);
const tabContent = ref(null);
const contentRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
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
  gData.value = gDataAll.value.filter(item => {
    if (item.name.indexOf(data.searchVal) != -1) {
      return item;
    }
    else {
      if (item.children && item.children.length) {
        for (var i = 0; i < item.children.length; i++) {
          if (item.children[i].name.indexOf(data.searchVal) != -1) {
            return item.children[i];
          }
        }
      }
    }
  })
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
  changeTab(data.activeKey);
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

  gridRef.value.loadGrid(data.queryParams);
}
const handleSearch = (filterQuery) => {
  if (data.activeKey == 0) {
    data.queryParams.filterQuery = '\nCreatedBy\teq-userid';
  } else if (data.activeKey == 1) {
    data.queryParams.filterQuery = '\nBusinessUnitId\teq-businessunitid';
  } else if (data.activeKey == 2) {
    data.queryParams.filterQuery = '';
  } else if (data.activeKey == 3) {

  }
  if (filterQuery) {
    data.queryParams.filterQuery += filterQuery;
  }
  if (data.SelectKey) {
    data.queryParams.filterQuery += '\nFolderId\teq\t' + data.SelectKey;
  }
  gridRef.value.loadGrid(data.queryParams);
}
// 获取tabs
const getTabs = () => {
  proxy.$get(Interface.ContentWrap.tabs, {
    a: 1
  }).then(res => {
    console.log("tabs", res)
    data.tabs = res.list;
  })
}
// getTabs();

const handleMenuClick = () => {

}
const DelegateRef = ref();

function handleDetail(id) {
  // router.push({
  //   path:"/informationDetail",
  //   query: {
  //     id: id
  //   }
  // });
  let reUrl = router.resolve({
    path: "/informationDetail",
    query: {
      id: id,
      objectTypeCode: '100201'
    }
  })
  window.open(reUrl.href);
}
function handlePreview(id) {
  // router.push({
  //     path:"/lightning/r/Content/view",
  //     query: {
  //       id: id,
  //       objectTypeCode:'100201'
  //     }
  // });
  let reUrl = router.resolve({
    path: "/lightning/r/Content/view",
    query: {
      id: id,
      objectTypeCode: '100201'
    }
  })
  window.open(reUrl.href);
}
function handleEdit(id, FolderId) {
  // router.push({
  //     path:"/content/visualEditor",
  //     query: {
  //       id: id
  //     }
  // });

  let reUrl = router.resolve({
    name: "visualEditor",
    query: {
      id: id,
      objectTypeCode: 100201,
      //FolderId: res.actions[0].returnValue&&res.actions[0].returnValue.fields&&res.actions[0].returnValue.fields.FolderId?res.actions[0].returnValue.fields.FolderId:''
      FolderId: FolderId
    }
  })
  window.open(reUrl.href);
}
function handleDelete(id) {
  data.relatedObjectAttributeValue = {};
  data.relatedObjectAttributeName = '';
  data.objectTypeCode = '100201';
  data.sObjectName = 'Content';
  data.recordId = id;
  data.isDelete = true;
}
const deleteOk = (e) => {
  if (data.objectTypeCode == '100201') {
    gridRef.value.loadGrid(data.queryParams);
  }
  else {
    getTreeData();
  }
};
const cancelDelete = (e) => {
  data.isDelete = false;
};
const updateStatus = (e) => {
  data.isModal = e;
  data.isCirculation = e;
}
const formatStatus = (val, row, index) => {
  let value = girdFormatterValue("StateCode", row);
  if (value == "1" || value == "审批通过" || value == "已发布") {
    return "<span style='color:#333;'>已发布</span>";
  }
  if (value == "2" || value == "审批未通过" || value == "审批不通过") {
    return "<span style='color:#333;'>审批未通过</span>";
  }
  if (value == "0" || value == "草稿") {
    return "<span style='color:#333;'>草稿</span>";
  }
  if (value == "已退回" || value == "退回") {
    return "<span style='color:#333;'>" + value + "</span>";
  }
}

window.handleDetail = handleDetail;
window.handlePreview = handlePreview;
window.handleEdit = handleEdit;
window.handleDelete = handleDelete;
window.data = data;

const imgUrl = require("@/assets/flow/checkbox_checked.gif");
const gridUrl = ref(Interface.list2);
const columns = ref(
  [
    {
      field: 'ids',
      checkbox: true
    },
    {
      field: "Action",
      title: "操作",
      formatter: function formatter(value, row, index) {
        var str = `
                <div class="iconBox">
                  <div class="popup">
                    <div class="option-item" onclick="handlePreview('${row.id}')">查看详情</div>  
                    <div class="option-item" onclick="handleEdit('${row.id}','${row.FolderId.lookupValue.value}')">编辑</div>  
                    <div class="option-item" onclick="handleDelete('${row.id}')">删除</div>
                  </div>
                  <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
              `
        return str;
      }
    },
    {
      field: 'Title', title: '标题', sortable: true,
      formatter: function formatter(value, row, index) {
        let val = girdFormatterValue('Title', row);
        return '<a style="text-decoration: none;color:#1677ff;" href="/#/lightning/r/Content/view?id=' + row.id + '&objectTypeCode=100201" target="_blank">' + val + '</a>';
      }
    },
    {
      field: 'FolderId',
      title: '栏目',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('FolderId', row);
      }
    },
    {
      field: 'StateCode',
      title: '发布状态',
      sortable: true,
      formatter: formatStatus
    }, {
      field: 'BusinessUnitId',
      title: '发布部门',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('BusinessUnitId', row);
      }
    }, {
      field: 'ReadCount',
      title: '阅读数',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('ReadCount', row);
      }
    }, {
      field: 'ApprovedBy',
      title: '审批发布人',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('ApprovedBy', row);
      }
    }, {
      field: 'ApprovedOn',
      title: '发布时间',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('ApprovedOn', row);
      }
    }, {
      field: 'CreatedBy',
      title: '创建人',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('CreatedBy', row);
      }
    }, {
      field: 'CreatedOn',
      title: '创建时间',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('CreatedOn', row);
      }
    }, {
      field: 'ModifiedBy',
      title: '上次修改人',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('ModifiedBy', row);
      }
    }, {
      field: 'ModifiedOn',
      title: '上次修改时间',
      sortable: true,
      formatter: function formatter(value, row, index) {
        return girdFormatterValue('ModifiedOn', row);
      }
    }
  ]
)

const changeTab = (e) => {
  data.activeKey = e;
  if (e == 0) {
    data.queryParams.filterQuery = '\nCreatedBy\teq-userid';
  } else if (e == 1) {
    data.queryParams.filterQuery = '\nBusinessUnitId\teq-businessunitid';
  } else if (e == 2) {
    data.queryParams.filterQuery = '';
  } else if (e) {

  }
  if (data.SelectKey) {
    data.queryParams.filterQuery += '\nFolderId\teq\t' + data.SelectKey;
  }
  gridRef.value.loadGrid(data.queryParams);
}
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
    message.error("必须先选中左侧目录");
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
    message.error("必须先选中左侧目录");
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
const confirmOk=()=>{
  if(data.confirmTitle == '批量发布'){
    let list = gridRef.value.getCheckList();
    for(var i=0;i<list.length;i++){
      changeRelease(1,list[i].id);
    }
  }else if(data.confirmTitle == '批量取消发布'){
    let list = gridRef.value.getCheckList();
    for(var i=0;i<list.length;i++){
      changeRelease(0,list[i].id);
    }
  }
  else{
    data.isConfirm = false;
  }
}
//批量发布
const handleRelease = () => {
  let list = gridRef.value.getCheckList();
  if (list.length) {
    data.CheckList = list;
    data.isConfirm = true;
    data.confirmText = '确定要批量发布吗？';
    data.confirmTitle = '批量发布';
  } else {
    message.error("请至少勾选一项！")
  }
}
//批量取消发布
const cancelRelease = () => {
  let list = gridRef.value.getCheckList();
  if (list.length) {
    data.CheckList = list;
    data.isConfirm = true;
    data.confirmText = '确定要批量取消发布吗？';
    data.confirmTitle = '批量取消发布';
  } else {
    message.error("请至少勾选一项！")
  }
}
//改变发布状态
const changeRelease = (type, id) => {
  let url = Interface.edit;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'Content',
          objTypeCode: 100201,
          fields: {
            StateCode: type * 1 == 1 ? "1" : "0",
          }
        }
      }
    }]
  };
  if (id) {
    d.actions[0].params.recordId = id;
  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    //formRef.value.resetFields();
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      message.success(type * 1 == 1 ? "发布成功" : "取消成功");
      data.isConfirm = false;
      handleSearch();
    }
    else {
      message.error(type * 1 == 1 ? "发布失败" : "取消失败");
    }
  });
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
  if (gridRef && gridRef.value && gridRef.value.loadGrid != 'undefined' && !route.params.sObjectName) {
    if (route.path == '/lightning/o/Content/home') {
      getTreeData();
    }
    setTimeout(function () {
      handleSearch();
    }, 500)
  }
}, { deep: true, immediate: true })
onMounted(() => {
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
  }
  window.addEventListener('resize', changeHeight)
})
</script>
<style lang="less" scoped>
.ContentWrap {
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

.ContentWrap {
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
.ContentWrap .todo-content {
  width: unset !important;

  .ant-row {
    width: unset !important;

    .wea-left-right-layout-left {
      .wea-left-tree {
        width: unset !important;

        .wea-left-tree-search {
          width: unset !important;
        }
      }

    }
  }
}

</style>