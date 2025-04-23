<template>
  <div class="PermissionWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
        </div>
        <span class="headerTitle">权限管控</span>
      </div>
      <div class="headerRight">
        <a-button type="primary" class="ml10" @click="handleNew">新建权限</a-button>
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <span class="wea-left-tree-search-label alltype">全部类型</span>
              <a-input v-model:value="searchVal" placeholder="" @change="onSearch" allowClear />
              <div class="wea-left-tree-search-icon">
                <SearchOutlined />
              </div>
            </div>
            <div class="wea-left-tree-scroll information-tree">
              <a-tree :checkable="true" :style="{ height: tableHeight + 'px' }" :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames"
                :selectedKeys="selectedKeys" @select="onSelect" @expand="onExpand">
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                  </CaretDownOutlined>
                </template>
                <template #title="{ name }">
                  <span>{{ name }}</span>
                </template>
              </a-tree>
            </div>
          </div>
        </a-col>
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
            :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
          <div style="height: 100%" ref="contentRef">
            <!-- <list-form-search ref="searchRef" @update-height="changeHeight" @search="handleSearch"
              :entityApiName="sObjectName" :SearchFields="SearchFields"></list-form-search> -->
              <HighSearch @update-height="changeHeight" @search="handleSearch" :entityApiName="sObjectName"></HighSearch>
            <div class="tableWrap" ref="tablelist">
              <div class="empty" v-if="!dataSource.length">
                <img src="/src/assets/img/empty.png" alt="" />
                <p class="emptyDesc">当前暂无数据</p>
              </div>
              <a-table v-if="dataSource.length" :scroll="{ y: tableHeight }" :dataSource="dataSource" :columns="columns"
                :pagination="data.pagination" @change="handleTableChange">
                <template #bodyCell="{ column, index, record }">
                  <template v-if="column.key === 'index'">
                    <div>
                      {{ index + 1 }}
                    </div>
                  </template>
                  <template v-if="column.key === 'AccessObjectTypeCode'">
                    <div v-if="record.AccessObjectTypeCode * 1 == 8">用户</div>
                    <div v-if="record.AccessObjectTypeCode * 1 == 1036">角色</div>
                    <div v-if="record.AccessObjectTypeCode * 1 == 9">小组</div>
                    <div v-if="record.AccessObjectTypeCode * 1 == 10">部门</div>
                  </template>
                  <template v-if="column.key === 'AccessObjectName'">
                    <div :title="record.AccessObjectName" class="AccessObjectName">
                      {{ record.AccessObjectName }}
                    </div>
                  </template>
                  <template v-if="column.key === 'checked'">
                    <div>
                      <a-checkbox v-model:checked="record.checked"></a-checkbox>
                    </div>
                  </template>
                  <template v-if="column.key === 'Depth'">
                    <div>
                      <a-select v-model:value="record.Depth" placeholder="请选择权限"
                        @change="(e) => { changeDepth(e, record) }">
                        <a-select-option v-for="(item, index) in DepthList" :value="item.value" :key="index">{{
                          item.label }}</a-select-option>
                      </a-select>
                    </div>
                  </template>
                  <div v-if="column.key == 'Action'">
                    <div class="iconBox">
                      <div class="popup">
                        <div class="option-item" @click="handleDelete(record.id)" :num="index">删除</div>
                      </div>
                      <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none"
                        role="presentation" data-v-69a58868="">
                        <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                          fill="#747474" data-v-69a58868=""></path>
                      </svg>
                    </div>
                  </div>
                </template>
              </a-table>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Delete v-if="data.isDelete" :isShow="data.isDelete" :desc="data.deleteDesc" @cancel="cancelDelete"
      @ok="refreshData" :sObjectName="sObjectName" :recordId="data.recordId" :objTypeCode="objectTypeCode"
      :external="data.external" />
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon = false"
      :title="data.recordId ? '编辑' : '新建'" @success="refreshData" :id="data.recordId" :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName" :relatedObjectAttributeValue="relatedObjectAttributeValue"
      :relatedObjectAttributeName="relatedObjectAttributeName"></common-form-modal>
    <NewFolder v-if="isNewFolder" :isShow="isNewFolder" :treeData="gData" @cancel="isNewFolder = false"
      @success="refreshData" :id="data.recordId" :ParentId="data.SelectKey" :ParentIdName="data.SelectName" />
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle"
      @cancel="isConfirm = false" @ok="isConfirm = false" :id="CheckList" />
    <NewDepth :isShow="isNew" v-if="isNew" @cancel="cancelNew" :id="data.SelectKey" :ObjectTypeCode="'5080'"
      :ObjectName="data.SelectName" @load="refreshData" />
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
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
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
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
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
import NewDepth from "@/components/information/NewDepth.vue";
import { refresh } from "less";
import HighSearch from "@/components/HighSearch.vue";
const x = 3;
const y = 2;
const z = 1;
const { proxy } = getCurrentInstance();
const genData = [];
const tablelist = ref();
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

//收藏目录
const getFavorite = () => {
  gData.value = [];
  gDataAll.value = [];
  let filterQuery = '\nObjectTypeCode\teq\t5080\nOwningUser\teq\t' + data.userId;
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
          isFavor: item.isFavor || false
        })
      }
      gData.value = list;
      gDataAll.value = list;
    }
  })
}
//收藏选中目录
const setFavor = (id, name, isFavor) => {
  if (id) {
    let filterQuery = '\nObjectId\teq\t' + id + '\nOwningUser\teq\t' + data.userId;
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
        message.success("已收藏！");
      } else {
        saveFavor(id, name, isFavor);
      }
    })
  }
}
const saveFavor = (id, name, isFavor) => {
  if (!isFavor) {
    let url = Interface.edit;
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
              //URL:'',
              OwningUser: data.userId
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
      }
      else {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
          message.error(res.actions[0].errorMessage);
        }
        else {
          message.error("收藏失败！");
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
      } else {
        if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
          message.error(res.actions[0].errorMessage);
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
  isCollapsed: false,
  tableHeight: 0,
  fieldNames: {
    children: 'children', title: 'name', key: 'id'
  },
  activeKey: 0,
  filterQuery: '',
  isModal: false,
  isCirculation: false,
  isNew: false,
  searchVal: '',
  search: '',
  value: "",
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  recordId: '',
  external: false,
  userId: '',
  SearchFields: [
    {
      "column": "AccessObjectName",
      "label": "授权对象名称",
      "dataType": "S",
      "ReferencedEntityObjectTypeCode": 0,
      "sObjectName": "",
      "targetApiName": "",
    },
    // {
    //     "column": "Name",
    //     "label": "记录对象",
    //     "dataType": "S",
    //     "ReferencedEntityObjectTypeCode": 0,
    //     "sObjectName": "",
    //     "targetApiName": "",
    // },
    {
      "column": "AccessObjectTypeCode",
      "label": "角色",
      "dataType": "L",
      "ReferencedEntityObjectTypeCode": 100201,
      "picklistValues": [
        {
          "label": "用户",
          "value": "8"
        },
        {
          "label": "角色",
          "value": "1036"
        },
        {
          "label": "小组",
          "value": "9"
        },
        {
          "label": "部门",
          "value": "10"
        }
      ],
      "sObjectName": "",
      "targetApiName": "",
    },
    {
      "column": "Depth",
      "label": "权限",
      "dataType": "L",
      "ReferencedEntityObjectTypeCode": 100201,
      "picklistValues": [
        {
          "label": "读",
          "value": "2"
        },
        {
          "label": "读/写",
          "value": "4"
        },
        {
          "label": "读/写/删",
          "value": "8"
        },
        {
          "label": "管理（读/写/删/移动）",
          "value": "16"
        },
      ],
      "sObjectName": "",
      "targetApiName": "",
    },
    // {
    //     "column": "CreatedBy",
    //     "label": "创建人",
    //     "dataType": "O",
    //     "ReferencedEntityObjectTypeCode": 8,
    //     "picklistValues": [],
    //     "sObjectName": "SystemUser",
    //     "targetApiName": "SystemUser",
    // },
    // {
    //     "column": "StatusCode",
    //     "label": "状态",
    //     "dataType": "L",
    //     "ReferencedEntityObjectTypeCode": 100201,
    //     "picklistValues": [
    //     {
    //         "label": "草稿",
    //         "value": "0"
    //     },
    //     {
    //         "label": "已发布",
    //         "value": "1"
    //     },
    //     {
    //         "label": "审批未通过",
    //         "value": "2"
    //     }
    //     ],
    //     "sObjectName": "",
    //     "targetApiName": "",
    // },
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
  objectTypeCode: '6061',
  sObjectName: 'RecordAccessControl',
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
  pagination: {
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0,//数据总数
    pageSize: 15,
    current: 1,
    showTotal: ((total) => {
      return `共${total}条`
    })
  },
  columns: [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 80,
    },
    // {
    //     title: "选择",
    //     dataIndex: "checked",
    //     key: "checked",
    //     width: 80,
    // },
    {
      title: "类型",
      dataIndex: "AccessObjectTypeCode",
      key: "AccessObjectTypeCode",
      width: 80,
    },
    {
      title: "授权对象",
      dataIndex: "AccessObjectName",
      key: "AccessObjectName"
    },
    {
      title: "权限",
      dataIndex: "Depth",
      key: "Depth",
      width: 250,
    },
    {
      title: "记录",
      dataIndex: "Name",
      key: "Name",
      width: 150,
    },
    // {
    //     title: "创建人",
    //     dataIndex: "CreatedBy",
    //     key: "CreatedBy",
    //     width: 120,
    // },
    {
      title: "创建时间",
      dataIndex: "CreatedOn",
      key: "CreatedOn",
      width: 150,
    },
    {
      title: "操作",
      key: "Action",
      width: 120,
    },
  ],
  dataSource: [],
  DepthList: [
    { label: '读', value: '2', },
    { label: '读/写', value: '4', },
    { label: '读/写/删', value: '8', },
    { label: '管理（读/写/删/移动）', value: '16', },
  ],
  hightSearchParams: {}
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
};
const { hightSearchParams, search, DepthList, dataSource, columns, pagination, CheckList, isConfirm, confirmText, confirmTitle, isNewFolder, selectedKeys, SelectName, SelectKey, relatedObjectAttributeValue, relatedObjectAttributeName, recordId, objectTypeCode, sObjectName, isCommon, isCollapsed, userId, tableHeight, fieldNames, activeKey, isModal, isCirculation, isNew, value, searchVal, SearchFields } = toRefs(data);
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
        search: data.searchVal
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
getTreeData();
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
    data.SelectKey = node.id;
    data.SelectName = node.name;
    data.selectedKeys = [node.id];
  }
  data.pagination.current = 1;
  getQuery();
};

const handleSearch = (obj) => {
  data.pagination.current = 1;
  //data.filterQuery = filterQuery;
  if (obj) {
    data.hightSearchParams = obj;
  }
  else {
    data.hightSearchParams = {}
  }
  getQuery();
}
const changeDepth = (e, item) => {
  let url = Interface.edit;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: item.id,
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'RecordAccessControl',
          objTypeCode: '6061',
          fields: {
            Depth: item.Depth,
          }
        }
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then((res) => {
    message.success("设置成功！");

  });
}
const handleDelete = (id) => {
  data.relatedObjectAttributeValue = {};
  data.relatedObjectAttributeName = '';
  data.objectTypeCode = '6061';
  data.sObjectName = 'RecordAccessControl';
  data.recordId = id;
  data.isDelete = true;
}
const refreshData = (e) => {
  getQuery();
};
const cancelDelete = (e) => {
  data.isDelete = false;
};
//改变页码
const handleTableChange = (pag, filters, sorter) => {
  data.pagination.current = pag.current;
  getQuery();
}

//新建权限
const handleNew = (e) => {
  if (data.selectedKeys && data.selectedKeys.length) {
    // data.relatedObjectAttributeValue={};
    // data.relatedObjectAttributeName='';
    // data.objectTypeCode='100201';
    // data.sObjectName='Content';
    // data.recordId='';
    data.isNew = true;
  }
  else {
    message.error("必须先选中左侧目录");
  }
}
const cancelNew = (e) => {
  data.isNew = e;
  refreshData();
}
const getQuery = () => {
  let filterQuery = '';
  // if (data.filterQuery) {
  //   filterQuery = data.filterQuery;
  // }
  if (data.SelectKey) {
    filterQuery += '\nObjectId\teq\t' + data.SelectKey;
  }
  let url = Interface.list2;
  let d = {
    filterId: '',
    objectTypeCode: data.objectTypeCode,
    entityName: data.sObjectName,
    filterQuery: filterQuery,
    page: data.pagination.current,
    rows: data.pagination.pageSize,
    sort: 'CreatedOn',
    order: 'desc',
    displayColumns: 'AccessObjectTypeCode,AccessObjectName,Name,CreatedBy,CreatedOn,Depth'
  }
  if (data.hightSearchParams) {
    if (data.hightSearchParams.search) {
      d.search = data.hightSearchParams.search;
    }
    if (data.hightSearchParams.filterCondition) {
      d.filterCondition = data.hightSearchParams.filterCondition;
    }
  }
  data.dataSource = [];
  data.pagination.total = 0;
  proxy.$post(url, d).then(res => {
    let list = [];
    if (res && res.nodes) {
      data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != 'id' && cell != 'nameField' && cell != 'Depth') {
            item[cell] = girdFormatterValue(cell, item);
          }
          if (cell == 'Depth') {
            item[cell] = item[cell] ? item[cell].value : '';
          }
          if (cell == 'CreatedOn') {
            item[cell] = item[cell] ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm") : '';
          }
        }
        list.push(item)
      }
    }
    data.dataSource = list;
  })
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
const handleShowSearch = () => {
  data.isSearchModal = true;
};
const loadSearchQuery = (e) => {
  data.isSearchModal = false;
  data.filterCondition = JSON.stringify(e);
  getQuery();
};
const loadGrid = () => {
  getQuery();
};
function changeHeight(h) {
  // if(typeof h == 'number'){
  //   formSearchHeight.value = h;
  // }
  // let contentHeight = contentRef.value.clientHeight;
  // let tabsHeight = 46;
  // let height = contentHeight - formSearchHeight.value;
  // data.tableHeight = height;
  // console.log('data',data.tableHeight);
  let h1 = tablelist.value.clientHeight;
  data.tableHeight = h1 - 45;
  getQuery();
}
onMounted(() => {
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
  }
  data.pagination.current = 1;
  //getQuery();
  changeHeight();
  window.addEventListener('resize', changeHeight)
})
</script>
<style lang="less" scoped>
.PermissionWrap {
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
  text-align: left;

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

.PermissionWrap {
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

  :deep .ant-tree .ant-tree-checkbox+span {
    line-height: 30px;
  }

  :deep .ant-tree .ant-tree-checkbox {
    position: relative;
    left: 4px;
    top: -2px;
  }

  .wea-left-tree-scroll {
    height: calc(100% - 58px) !important;
  }

  :deep .formSearch .ant-form {
    position: relative !important;
    top: 6px !important;
  }

  .tableWrap {
    height: calc(~'100% - 100px');
  }

  :deep .ant-table-wrapper {
    height: calc(~'100% - 0px');

    .ant-table-container {
      height: calc(~'100% - 0px');
    }
  }

  :deep .ant-spin-nested-loading {
    height: calc(~'100% - 0px');

    .ant-spin-container {
      height: calc(~'100% - 0px');
    }
  }

  :deep .ant-table-wrapper .ant-table {
    height: calc(~'100% - 5px');
  }

  .empty {
    background: #fff;
    padding: 0px 0 30px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 130px;
    }

    .emptyDesc {
      color: #333;
    }
  }

  :deep .ant-table-tbody .ant-table-cell {
    padding: 8px 16px !important;

    .AccessObjectName {
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      overflow: hidden;
    }

    .ant-select {
      width: 100%;
    }
  }

  .group_list_avatar {
    position: relative;
    top: 4px;
  }

  .iconBox .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }

  .iconBox .popup {
    top: 25px;
    right: 0;
    width: max-content;
    min-width: 88px;
  }

  :deep .formSearch .searchItem:first-child .ant-form-item {
    width: 255px;
  }

  :deep .ant-table-wrapper .ant-table-thead>tr>th {
    background-color: #f7fbfe !important;
    padding: 8.5px 16px !important;
  }

  :deep .ant-table-tbody tr:hover,
  :deep .ant-table-tbody tr:hover td {
    background-color: #e9f7ff !important;
    color: #108def !important;
  }

  :deep .ant-table-tbody tr:nth-child(odd) {
    background-color: rgb(250, 250, 250) !important;
    /* 奇数行背景色 */
  }

  :deep .ant-table-tbody tr:nth-child(even) {
    background-color: #fff !important;
    /* 偶数行背景色 */
  }

  :deep .ant-pagination {
    margin: 16px 16px !important;

    .ant-pagination-item {
      border: 1px solid #d9d9d9;
    }

    .ant-pagination-item:hover {
      border: 1px solid #1677ff;
      background: #fff !important;
    }

    .ant-pagination-item-active,
    .ant-pagination-item-active:hover {
      border: 1px solid #1677ff;
      background: #1677ff !important;

      a {
        color: #fff;
      }
    }
  }
}

:deep .ant-tree-treenode:hover .tree-btn {
  display: block !important;
}

input[aria-hidden=true] {
  display: none !important;
}

.PermissionWrap .todo-content {
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