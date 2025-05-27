<template>
  <div class="todoList documentAdmin">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
        </div>
        <span class="headerTitle">流程附件</span>
      </div>
      <div class="headerRight">
        <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button> -->
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <!-- <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
            :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div> -->
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
              <HighSearch @update-height="changeHeight" @search="handleSearch"
                :entityApiName="data.queryParams.entityName">
              </HighSearch>
            </div>
            <!-- <list-form-search ref="searchRef" @search="handleSearch" :entityApiName="data.queryParams.entityName" :SearchFields="SearchFields"
              @update-height="changeHeight"></list-form-search> -->
            <div class="wea-tabContent" :style="{ height: tableHeight + 'px' }" ref="tabContent">
              <!-- <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable> -->
              <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                :isCollapsed="isCollapsed">
              </Ntable>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 委派 -->
    <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal"
      v-if="isModal" />
    <!-- 跳转 -->
    <Jump v-if="isJump" :isShow="isJump" :paramsData="jumpData.params" @update-status="isJump = false" />
    <!-- 加签 -->
    <Countersign v-if="isCountersign" :isShow="isCountersign" :paramsData="CountersignData.params"
      @update-status="isCountersign = false" />
    <!-- 发布 -->
    <ReleaseFlow v-if="isRelease" :isShow="isRelease" :id="ProcessInstanceId" @cancel="cancelRelase"></ReleaseFlow>
    <NewCategory v-if="isCategory" @cancel="cancelCategory" :isShow="isCategory" :id="treeId" ObjectTypeCode="流程" />
    <EditFlowDefine v-if="isEditFlow" :isShow="isEditFlow" :id="id" @cancel="cancelEditFlowDefine" />
  </div>
</template>
<script setup>
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick } from "vue";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
// import Dtable from "@/components/Dtable.vue";
import Ntable from "@/components/Ntable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import HighSearch from "@/components/HighSearch.vue";
import NewCategory from "@/components/workflow/NewCategory.vue";
import EditFlowDefine from "@/components/workflow/EditFlowDefine.vue";
import Delegate from "@/components/workflow/Delegate.vue";
import Jump from "@/components/workflow/Jump.vue";
import Countersign from "@/components/workflow/Countersign.vue";
import ReleaseFlow from "@/components/workflow/ReleaseFlow.vue"
import { useRouter, useRoute } from "vue-router";
import useWorkAdmin from "@/utils/flow/workAdmin";
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
const { tabList } = useWorkAdmin();
console.log("tabList", tabList);
const route = useRoute();
const router = useRouter();

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

//处理树
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
    //entity: "organizationtree"
  }).then(res => {
    let list = [];
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      list = res.actions[0].returnValue;
    } else { return false }
    list = formTree(list);
    gData.value = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
    gDataAll.value = list;
    //console.log("deptTreeData", data.deptTreeData);
  })
}
//getDeptTreeData();
// console.log("genData",genData,treeList)

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
  tabs0: [
    {
      label: "全部",
      count: '',
    },
    {
      label: "流转中",
      count: '',
    },
    {
      label: "已完成",
      count: '',
    },
    {
      label: "已退回",
      count: '',
    },
    {
      label: "已撤销",
      count: '',
    },
    {
      label: "草稿",
      count: '',
    }
  ],
  tabs: [],
  //tabs: tabList,
  activeKey: 0,
  queryParams: {
    filterId: '',
    objectTypeCode: '1001',
    entityName: 'RelatedAttachment',
    //displayColumns:'ProcessInstanceNumber,Name,ProcessId,StateCode,ExpiredOn,AttachQty,CreatedBy,CurrentStepName,CreatedOn,BusinessUnitId,ModifiedOn,Priority,ProcessInstanceId,WFRuleLogId,ExecutorIdentityName',
    sort: 'CreatedOn',
    order: 'desc'
  },
  isModal: false,
  isCirculation: false,
  searchVal: "",
  isCategory: false,
  treeId: "",
  isEditFlow: false,
  id: "",
  isJump: false,
  isCountersign: false,
  isRelease: false,
  ProcessInstanceId: "",
  SearchFields: [],
  entityType: '00P',
  layoutName: 'RelatedAttachment',
  hightSearchParams: {}
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
  changeHeight();
};

const { hightSearchParams, entityType, isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal,
  isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId, SearchFields } = toRefs(data);
//   console.log("tabs", data.tabs);
const tabContent = ref(null);
const contentRef = ref(null);
const searchRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
const onSearch = (e) => {
  //   gData.value = gDataAll.value.filter(item=>{
  //     return item.name.indexOf(data.searchVal) != -1;
  //   })
  let list = gDataAll.value.filter(item => {
    return item.text.indexOf(data.searchVal) !== -1;
  })
  list = formTree(list);
  gData.value = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
}
const onSelect = (keys) => {
  data.treeId = keys[0];
  handleSearch();
};

function changeHeight(h) {
  if (typeof h == 'number') {
    formSearchHeight.value = h;
  }
  let contentHeight = document.documentElement.clientHeight - 120;
  let tabsHeight = 46;
  let height = contentHeight - tabsHeight;
  data.tableHeight = height;
  console.log('data', data.tableHeight);
  //console.log("gridRef", gridRef.value.loadGrid())
  //handleSearch();
}
const cancelRelase = (e) => {
  data.isRelease = e;
}
const handleSearch = (obj) => {
  data.queryParams = {
    filterId: data.queryParams.filterId,
    objectTypeCode: '1001',
    entityName: 'RelatedAttachment',
    sort: 'CreatedOn',
    order: 'desc'
  };
  
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
      var ProcessInstanceId = row.ProcessInstanceId ? row.ProcessInstanceId.lookupValue.value : '';
      var str = `
                <div class="iconBox">
            <div class="popup">
            <div class="option-item" id=${ProcessInstanceId} onclick="handleDetailView('${ProcessInstanceId}')">查看</div>
            </div>
            <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
        `
      return str;
    }
  },];
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
        if (item.name == 'Name') {
          columnslist.push({
            field: item.name,
            title: item.label,
            sortable: true,
            formatter: function formatter(value, row, index) {
              let val = girdFormatterValue(item.name, row);
              var ProcessInstanceId = row.ProcessInstanceId ? row.ProcessInstanceId.lookupValue.value : '';
              return `<a class="namefield" title="` + val + `" href="javascript:void(0)" onclick="handleDetailView('${ProcessInstanceId}')">${val}</a>`;
            }
          });
        }
        else if (item.name != 'ProcessInstanceId') {
          columnslist.push({
            field: item.name,
            title: item.label,
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue(item.name, row);
            }
          });
        }

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
    layoutName: data.layoutName
  }).then(res => {
    //console.log("tabs", res)
    if (res && res.tabs && res.tabs.length) {
      let list = res.tabs;
      list.forEach(item => {
        item.label = item.title;
        item.filterId = item.filter.filterId;
      })
      data.tabs = list;
    }
    else {
      //data.tabs=data.tabs0;
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
const DelegateRef = ref();

function handleTo(id) {
  router.push({
    path: "/detail",
    query: {
      id: id
    }
  });
}
const EditFlow = (id) => {
  console.log("id", id);
  data.id = id;
  data.isEditFlow = true;
}
const DelegateData = reactive({
  params: {}
})
const CirculationData = reactive({
  params: {}
})
const jumpData = reactive({
  params: {}
})
const CountersignData = reactive({
  params: {}
})
const updateStatus = (e) => {
  data.isModal = e;
  data.isCirculation = e;
}
// 委派
function DelegateFn(InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName) {
  // console.log("RuleLogId",RuleLogId, DelegateRef);
  DelegateData.params = {
    InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName
  }
  console.log(DelegateData.params)
  data.isModal = true;
}
function CirculationFn(InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName) {
  CirculationData.params = {
    InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName
  }
  data.isCirculation = true;
}
// 跳转
function handleJump(ProcessId, ProcessIdName, ProcessInstanceId) {
  jumpData.params = {
    ProcessId, ProcessIdName, ProcessInstanceId
  }
  data.isJump = true;
}
// 加签
function handleCountersign(ProcessId, ProcessIdName, ProcessInstanceId) {
  CountersignData.params = {
    ProcessId, ProcessIdName, ProcessInstanceId
  }
  data.isCountersign = true;
}
// 发布
const handleRelase = (ProcessInstanceId) => {
  data.ProcessInstanceId = ProcessInstanceId;
  data.isRelease = true;
}
window.handleRelase = handleRelase;
window.handleJump = handleJump;
window.handleCountersign = handleCountersign;
window.handleTo = handleTo;
window.EditFlow = EditFlow;
window.data = data;
window.DelegateFn = DelegateFn;
const imgUrl = require("@/assets/flow/checkbox_checked.gif");
const gridUrl = ref(Interface.list2);

const columns = ref([]);
const changeTab = (e) => {
  data.activeKey = e;
  data.queryParams = {
    filterId: data.queryParams.filterId,
    objectTypeCode: '1001',
    entityName: 'RelatedAttachment',
    sort: 'CreatedOn',
    order: 'desc'
  };
  let filterColumnsList = (data.tabs)[e].filterableColumns;
  data.SearchFields = filterColumnsList;
  data.queryParams.filterId = data.tabs[e].filterId || '';
  
  if (data.hightSearchParams) {
    if (data.hightSearchParams.search) {
      data.queryParams.search = data.hightSearchParams.search;
    }
    if (data.hightSearchParams.filterCondition) {
      data.queryParams.filterCondition = data.hightSearchParams.filterCondition;
    }
  }
  if (data.treeId) {
  }
  getColumns(data.queryParams.filterId);
}
// 添加分类
const handleAddCategory = (key) => {
  console.log("key:", key);
  data.isCategory = true;
}
// 编辑
const handleEditCategory = (key) => {
  console.log("key:", key);
  data.treeId = key;
  data.isCategory = true;
}
const cancelCategory = (e) => {
  data.isCategory = e;
};
const cancelEditFlowDefine = (e) => {
  data.isEditFlow = e;
}
//打开详情页
const handleDetailView = (id) => {
  let reUrl = router.resolve({
    path: "/lightning/r/Workflow/instance/view",
    query: {
      id: id,
      reurl: '/lightning/o/workflow/Attachment/list'
    }
  })
  window.open(reUrl.href);
}
window.handleDetailView = handleDetailView;

onMounted(() => {
  window.addEventListener('resize', changeHeight);
  getTabs();
})
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

}

.todoList {
  .wea-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //border-bottom: 1px solid #eaeaea;
    padding-right: 0;
    border: 0 !important;
  }

  .todo-content .ant-row .wea-tab {
    height: 45px !important;

    :deep .ant-tabs-nav::before {
      display: none;
    }
  }

  .todo-content .ant-row .wea-tab :deep .ant-tabs .ant-tabs-nav .ant-tabs-nav-wrap {
    height: 45px !important;
  }

  :deep .namefield {
    color: #1677ff;
    text-decoration: none;
    max-width: 500px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
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