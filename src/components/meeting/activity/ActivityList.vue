<template>
  <div class="todoList documentAdmin">
    <div class="todo-content">
      <a-row>
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <div style="height: 100%" ref="contentRef">
            <div class="wea-header">
              <div class="wea-tab">
                <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                  <a-tab-pane v-for="(item, index) in data.tabs" :key="index">
                    <template #tab>
                      <span>
                        {{ item.label }}
                      </span>
                    </template>
                  </a-tab-pane>
                </a-tabs>
                <div class="tabsBtn">
                </div>
              </div>
              <HighSearch @update-height="changeHeight" @search="handleSearch" :entityApiName="data.queryParams.entityName">
              </HighSearch>
            </div>
            <!-- <list-form-search ref="searchRef" @search="handleSearch" :entityApiName="data.queryParams.entityName"
              :SearchFields="SearchFields" @update-height="changeHeight"></list-form-search> -->
            <div class="wea-tabContent" :style="{ height: tableHeight + 'px' }" ref="tabContent">
              <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                :isCollapsed="isCollapsed">
              </Ntable>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <DeleteModall :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch"
      :sObjectName="sObjectName" :recordId="meetingId" :objTypeCode="objectTypeCode" :external="external" />
    <NewMeeting :isShow="isNewMeeting" :meetingId="meetingId" v-if="isNewMeeting" @cancel="cancelNewMeeting"
      @selectVal="handleNewMeetingVal" :paramsTime="paramsTime" :calendarType="''" />
    <MeetingDetailModall :isShow="isMeetingDetail" v-if="isMeetingDetail" :meetingId="meetingId"
      @cancel="isMeetingDetail = false" @edit="handleOpenEdit" @handleDelete="handleDelete1" />

  </div>
</template>
<script setup>
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, defineProps, defineEmits } from "vue";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
// import Dtable from "@/components/Dtable.vue";
import Ntable from "@/components/Ntable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import HighSearch from "@/components/HighSearch.vue";
import { useRouter, useRoute } from "vue-router";
import useWorkAdmin from "@/utils/flow/workAdmin";
// 详情
import MeetingDetailModall from "@/components/meeting/MeetingDetailModal2.vue";
// 新建
import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
import DeleteModall from "@/components/listView/Delete.vue";
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
const { tabList } = useWorkAdmin();
//console.log("tabList", tabList);
const route = useRoute();
const router = useRouter();

const x = 3;
const y = 2;
const z = 1;
const { proxy } = getCurrentInstance();
const props = defineProps({
  layoutName: String,
});
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
const formTree = (list) => {
  list.forEach(item => {
    if (item.children) {
      formTree(item.children);
    }
    item.children = [];
    item.id = item.businessUnitId;
    item.key = item.businessUnitId;
    item.text = item.name;
  })
  return list
}
// 组织结构
const getDeptTreeData = () => {
  proxy.$get(Interface.deptTree, {
  }).then(res => {
    let list = [];
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      list = res.actions[0].returnValue;
    } else { return false }
    list = formTree(list);
    gData.value = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
    gDataAll.value = list;
  })
}

const onExpand = (keys) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

let data = reactive({
  isCollapsed: true,
  tableHeight: '',
  fieldNames: {
    children: 'children', title: 'name', key: 'id'
  },
  tabs: [],
  activeKey: 0,
  queryParams: {
    filterId: '',
    objectTypeCode: '4400',
    entityName: 'Campaign',
    filterQuery: '',
    //filterQuery:'\nCreatedBy\teq-userid',
    //displayColumns:'',
    sort: 'CreatedOn',
    order: 'desc'
  },
  entityType: '701',
  isModal: false,
  searchVal: "",
  treeId: "",
  id: "",
  formSearchFilterquery: "",
  SearchFields: [],
  isAddSchedule: false,
  isNewMeeting: false,
  isRepeatMeeting: false,
  paramsTime: {
    date: "",
    time: "",
    end: "",
    endDate: ""
  },
  meetingId: "",
  isMeetingDetail: false,
  startTime: '',
  endTime: '',
  objectTypeCode: '4400',
  sObjectName: 'Campaign',
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  external: false,
  hightSearchParams: {}
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
  changeHeight();
};

const { hightSearchParams, isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, searchVal,
  treeId, id, SearchFields, isAddSchedule, isNewMeeting, isRepeatMeeting, paramsTime,
  meetingId, isMeetingDetail, startTime, endTime, objectTypeCode, sObjectName, isDelete, deleteDesc, external } = toRefs(data);
const tabContent = ref(null);
const contentRef = ref(null);
const searchRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
const onSearch = (e) => {
  // let list = gDataAll.value.filter(item => {
  //   return item.text.indexOf(data.searchVal) !== -1;
  // })
  // list = formTree(list);
  // gData.value = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
  getTabs();
}
const onSelect = (keys) => {
  data.treeId = keys[0];
  handleSearch();
};
onMounted(() => {
  window.addEventListener('resize', changeHeight);
  getTabs();
})
function changeHeight(h) {
  if (typeof h == 'number') {
    formSearchHeight.value = h;
  }
  let contentHeight = document.documentElement.clientHeight - 120;
  let tabsHeight = 46;
  let height = contentHeight - 4;
  data.tableHeight = height - 46;
  //console.log('data', data.tableHeight);
  //console.log("gridRef", gridRef.value.loadGrid())
  //handleSearch();
}
const handleSearch = (obj) => {
  data.queryParams = {
    filterId: data.queryParams.filterId,
    objectTypeCode: '4400',
    entityName: 'Campaign',
    sort: 'CreatedOn',
    order: 'desc'
  };
  // data.formSearchFilterquery = filterquery;
  // if (filterquery) {
  //   data.queryParams.filterQuery += filterquery;
  // }
  if (obj) {
    data.hightSearchParams = obj;
    if (data.hightSearchParams) {
      if (data.hightSearchParams.search) {
        data.queryParams.search = data.hightSearchParams.search;
      }
      if (data.hightSearchParams.filterCondition) {
        data.queryParams.filterCondition = data.hightSearchParams.filterCondition;
      }
    }
  }
  else {
    data.hightSearchParams = {}
  }
  if (data.treeId) {
    data.queryParams.filterQuery = '\nOwningBusinessUnit\tin\t' + data.treeId;
  }
  gridRef.value.loadGrid(data.queryParams);
}
//获取显示列
const getColumns = (id) => {
  let columnslist = [{
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
            <div class="option-item" onclick="handleDetail('${row.id}')">查看</div>
            <div class="option-item" onclick="openEdit('${row.id}')">编辑</div>
            <div class="option-item" onclick="handleDelete1('${row.id}')">删除</div>
            </div>
            <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
        `
      return str;
    }
  }
  ];
  proxy.$get(Interface.listView.getFilterInfo, {
    entityType: data.entityType,
    objectTypeCode: data.queryParams.objectTypeCode,
    search: "",
    filterId: id
  }).then(res => {
    if (res && res.actions && res.actions[0]) { } else { return }
    let fields = res.actions[0].returnValue.fields;
    fields.forEach(item => {
      if (item.name) {
        columnslist.push({
          field: item.name,
          title: item.label,
          sortable: true,
          formatter: function formatter(value, row, index) {
            return girdFormatterValue(item.name, row);
          }
        });
      }
    })
    columns.value = columnslist;
    nextTick(() => {
      gridRef.value.loadGrid(data.queryParams);
      //searchRef.value.getSearchLayout();
    })

  })
}

// 获取tabs
const getTabs = () => {
  proxy.$get(Interface.getTabs, {
    entityName: data.queryParams.entityName,
    layoutName: props.layoutName
  }).then(res => {
    //console.log("tabs", res)
    if (res && res.tabs && res.tabs.length) {
      let list = res.tabs;
      list.forEach(item => {
        item.label = item.title;
        item.filterId = item.filter.filterId;
        item.filterquery = item.filterquery || '';
      })
      data.tabs = list;
    }
    else {
      //data.tabs=[];
    }

    let filterColumnsList = (data.tabs)[0].filterableColumns;
    data.SearchFields = filterColumnsList;
    data.queryParams.filterId = data.tabs[0].filterId || '';
    getColumns(data.queryParams.filterId);
  })
}
// getTabs();

const handleMenuClick = () => {

}

function handleTo(id) {
  router.push({
    path: "/detail",
    query: {
      id: id,
      objectTypeCode: data.queryParams.objectTypeCode
    }
  });
}

window.data = data;
const imgUrl = require("@/assets/flow/checkbox_checked.gif");
const gridUrl = ref(Interface.list2);

const columns = ref([]);
const changeTab = (e) => {
  data.activeKey = e;
  data.queryParams = {
    filterId: data.queryParams.filterId,
    objectTypeCode: '4400',
    entityName: 'Campaign',
    sort: 'CreatedOn',
    order: 'desc'
  };
  let filterColumnsList = (data.tabs)[e].filterableColumns;
  data.SearchFields = filterColumnsList;
  data.queryParams.filterId = data.tabs[e].filterId || '';
  // if (data.formSearchFilterquery) {
  //   data.queryParams.filterQuery += data.formSearchFilterquery;
  // }
  if (data.hightSearchParams) {
    if (data.hightSearchParams.search) {
      data.queryParams.search = data.hightSearchParams.search;
    }
    if (data.hightSearchParams.filterCondition) {
      data.queryParams.filterCondition = data.hightSearchParams.filterCondition;
    }
  }
  if (data.treeId) {
    data.queryParams.filterQuery = '\nOwningBusinessUnit\tin\t' + data.treeId;
  }
  getColumns(data.queryParams.filterId);
}
// 关闭新建
const cancelNewMeeting = (e) => {
  data.isNewMeeting = false;
}
const handleNewMeetingVal = (e) => {
  data.isNewMeeting = false;
  onSearch();
}
// 新建
const handleAddMeeting = () => {
  data.isNewMeeting = true;
}
//详情
const handleDetail = (e) => {
  data.meetingId = e;
  nextTick(() => {
    data.isMeetingDetail = true;
  })
}

//删除
const handleDelete1 = (e) => {
  console.log(e)
  data.meetingId = e;
  data.isDelete = true;
}
const cancelDelete = (e) => {
  data.isDelete = false;
};
//编辑
const openEdit = (e) => {
  data.paramsTime = {
    date: "",
    time: ""
  }
  // if (e.paramsTime) {
  //   data.paramsTime = e.paramsTime
  // }
  data.meetingId = e;
  data.isNewMeeting = true;
}
window.handleDetail = handleDetail;
window.handleDelete1 = handleDelete1;
window.openEdit = openEdit;
//删除关闭

</script>
<style lang="less">
@import "@/style/flow/treeList.less";
</style>
<style scoped lang="less">
.wea-left-tree-search {
  padding-left: 14px;
}

.treeRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;

  .num {
    color: #aaa;
  }
}

.documentAdmin {
  .todo-content {
    height: calc(~'100% - 0px');
  }

  .todo-content .ant-row .wea-left-right-layout-left .wea-left-tree .wea-left-tree-search {
    padding-left: 14px;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-col-5 {
    max-width: unset !important;
    width: 220px !important;
    flex: unset;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-col-19 {
    max-width: 100% !important;
    flex: 1;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-input {
    border-color: #d9d9d9;
  }

  .ant-row .wea-left-right-layout-left .wea-left-tree .wea-left-tree-scroll .ant-tree-treenode:hover .tree-num {
    display: none;
  }

  .formSearch .ant-form .ant-form-item.formTime .ant-picker {
    width: 200px !important;
    padding: 4px 5px 4px 5px !important;
  }

  :deep .ant-input {
    max-width: 130px !important;
    min-width: 110px !important;
  }

  :deep .ant-select {
    max-width: 130px !important;
    min-width: 110px !important;
    width: auto;
  }

  .formSearch :deep .ant-form .ant-form-item {
    width: auto !important;
  }

  .wea-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-right: 0;
    border: 0;
  }
  .todo-content .ant-row .wea-tab{
    height: 45px !important;
    :deep .ant-tabs-nav::before{
      display: none;
    }
  }
  .todo-content .ant-row .wea-tab :deep .ant-tabs .ant-tabs-nav .ant-tabs-nav-wrap{
    height: 45px !important;
  }
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
</style>