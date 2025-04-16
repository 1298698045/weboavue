<template>
  <div class="todoList">
    <div class="headerBar todo-head">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
        </div>
        <span class="headerTitle">我的发起</span>
      </div>
      <div class="headerRight todo-head-right">
        <a-button type="primary" class="ml10" @click="handleFavor">收藏</a-button>
        <a-button class="ml10 ml11" @click="batchPrintForm">批量打印</a-button>
        <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
        <a-dropdown :trigger="['hover']" placement="bottomRight">
          <a-button type="primary" class="rightIconBtn" style="margin-right: 50px;">
            <i class="iconfont icon-anniuxiala"></i>
          </a-button>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">
                批量提交
              </a-menu-item>
              <a-menu-item key="2">
                批量关注
              </a-menu-item>
              <a-menu-item key="3">
                批量转发
              </a-menu-item>
            </a-menu>
          </template>
</a-dropdown>-->
        <MoreBtn :isMenu="isMenu" @change="handleClickMenu" @mouseover="isMenu = true" @mouseleave="isMenu = false">
          <div class="moreMenu">
            <div class="menu-icon-background"></div>
            <ul>
              <li class="moreMenuItem" @click="batchCirculation">
                <span class="more-menu-icon">
                  <i class="iconfont icon-piliangtijiao"></i>
                </span>
                <span>批量传阅</span>
              </li>
              <li class="moreMenuItem" @click="batchSupervised">
                <span class="more-menu-icon">
                  <i class="iconfont icon-piliangtijiao"></i>
                </span>
                <span>督办</span>
              </li>
              <li class="moreMenuItem" @click="batchCancelSupervised">
                <span class="more-menu-icon">
                  <i class="iconfont icon-piliangtijiao"></i>
                </span>
                <span>取消督办</span>
              </li>
              <!-- <li class="moreMenuItem">
                <span class="more-menu-icon">
                  <i class="iconfont icon-sousuoanniu"></i>
                </span>
                <span>搜索</span>
              </li>
              <li class="moreMenuItem">
                <span class="more-menu-icon">
                  <i class="iconfont icon-piliangtijiao"></i>
                </span>
                <span>批量提交</span>
              </li>
              <li class="moreMenuItem">
                <span class="more-menu-icon">
                  <i class="iconfont icon-piliangguanzhu"></i>
                </span>
                <span>批量关注</span>
              </li>
              <li class="moreMenuItem">
                <span class="more-menu-icon">
                  <i class="iconfont icon-piliangzhuanfa"></i>
                </span>
                <span>批量转发</span>
              </li>
              <li class="moreMenuItem">
                <span class="more-menu-icon">
                  <i class="iconfont icon-quanbuyidu"></i>
                </span>
                <span>全部已读</span>
              </li>
              <li class="moreMenuItem">
                <span class="more-menu-icon">
                  <i class="iconfont icon-xianshiliedingzhi"></i>
                </span>
                <span>显示列定制</span>
              </li>
              <li class="moreMenuItem">
                <span class="more-menu-icon">
                  <i class="iconfont icon-morenpaixushezhi"></i>
                </span>
                <span>默认排序设置</span>
              </li> -->
            </ul>
          </div>
        </MoreBtn>
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <a-input-search v-model:value="data.searchVal" placeholder="" @search="onSearch" />
            </div>
            <div class="wea-left-tree-scroll processTree">
              <a-tree :style="{ height: tableHeight + 'px' }" :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames"
                @select="onSelect" @expand="onExpand">
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined :class="switcherCls"
                    style="color: rgb(163, 163, 163); font-size: 14px;position: relative;top: 2px;left: 6px;">
                  </CaretDownOutlined>
                </template>
                <template #title="{ name, quantity }">
                  <span :title="name"
                    style="width: 280px;overflow: hidden;height: 30px;text-overflow: ellipsis;white-space: nowrap;display: inline-block;font-size: 14px;">
                    {{ name }}
                    <span class="tree-num"
                      style="position: absolute;right: 10px;font-size: 14px;padding: 0 !important;background: transparent !important;color: #c5c5c5;">{{
                      quantity }}</span>
                  </span>
                </template>
              </a-tree>
            </div>
          </div>
        </a-col>
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
            :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
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
            <!-- <list-form-search ref="searchRef" @search="handleSearch" entityApiName="WFProcessInstance" :SearchFields="SearchFields"
              @update-height="changeHeight"></list-form-search> -->
            <div class="wea-tabContent" :style="{ height: tableHeight + 'px' }" ref="tabContent">
              <!-- <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable> -->
              <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                :isCollapsed="isCollapsed"></Ntable>
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
    <!-- 分类 -->
    <NewCategory v-if="isCategory" @cancel="cancelCategory" :isShow="isCategory" :id="treeId" ObjectTypeCode="流程" />
    <!-- 删除 -->
    <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="isDelete = false" @ok="handleSearch"
      :sObjectName="'WFProcessInstance'" :recordId="ProcessInstanceId" :objTypeCode="'122'" :external="false" />
    <!-- 撤销、结束、取消督办、取消收藏 -->
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle"
      @cancel="isConfirm = false" @ok="handleConfirm" :id="ProcessInstanceId" />
    <!-- 传阅 -->
    <circulation-modal ref="circulationRef" @update-status="updateStatus" v-if="isCirculation"
      :paramsData="CirculationData.params" :isShow="isCirculation"></circulation-modal>
    <!-- 催办 -->
    <Urging ref="UrgingRef" :processInstanceId="ProcessInstanceId" @update-status="updateStatus" v-if="isUrging"
      :paramsData="UrgingData.params" :isShow="isUrging" />
    <!-- 督办 -->
    <Supervised v-if='isSupervised' :isShow="isSupervised" @cancel="isSupervised = false"
      @update-status="isSupervised = false" :name="processName" :id="ProcessInstanceId" />
    <!-- 收藏 -->
    <Favor v-if='isFavor' :isShow="isFavor" @cancel="isFavor = false" @update-status="isFavor = false"
      :id="ProcessInstanceId" />
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
import Delegate from "@/components/workflow/Delegate.vue";
import Jump from "@/components/workflow/Jump.vue";
import Countersign from "@/components/workflow/Countersign.vue";
import ReleaseFlow from "@/components/workflow/ReleaseFlow.vue"
import { useRouter, useRoute } from "vue-router";
import useWorkAdmin from "@/utils/flow/workAdmin";
import { girdFormatterValue } from "@/utils/common.js";
import Delete from "@/components/listView/Delete.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import CirculationModal from "@/components/workflow/CirculationModal.vue";
import Urging from "@/components/workflow/Urging.vue";
import Supervised from "@/components/workflow/Supervised.vue";
import Favor from "@/components/workflow/Favor.vue";
import "@/style/flow/icon/iconfont.css";
import MoreBtn from "@/components/antDefault/MoreBtn.vue";
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
const getTreeData = () => {
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          search: data.searchVal
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.workflow.getTree, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.length
    ) {
      let listData = res.actions[0].returnValue;
      let formTree = (list) => {
        list.forEach(item => {
          if (item.processs) {
            formTree(item.processs);
            item.quantity = item.processs.length;
          }
          item.id = item.categoryId || item.processId;
          item.key = item.categoryId || item.processId;
          item.value = item.categoryId || item.processId;
        })
      }
      formTree(listData);
      console.log("formTree", listData)
      gData.value = listData;
      gDataAll.value = listData;
    }
  })
}
// console.log("genData",genData,treeList)

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
  tableHeight: '',
  fieldNames: {
    children: 'processs', title: 'name', key: 'id'
  },
  tabs0: [
    {
      label: "全部",
      count: '',
      filterquery: '',
    },
    {
      label: "流转中",
      count: '',
      filterquery: '\nStateCode\teq\t1',
    },
    {
      label: "已完成",
      count: '',
      filterquery: '\nStateCode\teq\t3',
    },
    {
      label: "已退回",
      count: '',
      filterquery: '\nStateCode\teq\t6',
    },
    {
      label: "已撤销",
      count: '',
      filterquery: '\nStateCode\teq\t5',
    },
    {
      label: "草稿",
      count: '',
      filterquery: '\nStateCode\teq\t0',
    }
  ],
  tabs: [],
  //tabs: tabList,
  activeKey: 0,
  queryParams: {
    filterId: '',
    objectTypeCode: '122',
    entityName: 'WFProcessInstance',
    filterQuery: '',
    //displayColumns:'ProcessInstanceNumber,Name,ProcessId,StateCode,ExpiredOn,AttachQty,CreatedBy,CurrentStepName,CreatedOn,BusinessUnitId,ModifiedOn,Priority,ProcessInstanceId,WFRuleLogId,ExecutorIdentityName',
    sort: 'CreatedOn',
    order: 'desc'
  },
  isModal: false,
  isCirculation: false,
  isUrging: false,
  isSupervised: false,
  isFavor: false,
  searchVal: "",
  isCategory: false,
  treeId: "",
  id: "",
  isJump: false,
  isCountersign: false,
  isRelease: false,
  ProcessInstanceId: "",
  formSearchFilterquery: "",
  SearchFields: [],
  isDelete: false,
  deleteDesc: '确定要删除该事务吗？',
  isConfirm: false,
  confirmText: '',
  confirmTitle: '',
  isMenu: false,
  confirmType: "",
  processName: "",
  entityType: '122',
  layoutName: 'myWorkflowInstance',
  hightSearchParams: {}
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
  changeHeight();
};

const { hightSearchParams, entityType, isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, isUrging, isSupervised, isFavor, searchVal, isMenu,
  isCategory, treeId, id, isJump, isCountersign, isRelease, ProcessInstanceId, SearchFields, isDelete, deleteDesc, isConfirm, confirmText, confirmTitle, confirmType, processName } = toRefs(data);
//   console.log("tabs", data.tabs);
const tabContent = ref(null);
const contentRef = ref(null);
const searchRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
const onSearch = (e) => {
  // gData.value = gDataAll.value.filter(item => {
  //   return item.name.indexOf(data.searchVal) != -1;
  // })
  getTreeData();
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
    objectTypeCode: '122',
    entityName: 'WFProcessInstance',
    sort: 'CreatedOn',
    order: 'desc'
  };
  // data.formSearchFilterquery=filterquery;
  // if(filterquery){
  //   data.queryParams.filterQuery+=filterquery;
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
    data.queryParams.filterQuery = '\nProcessId\tin\t' + data.treeId;
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
      var ProcessInstanceId = row.id;
      var ProcessIdName = row.ProcessId ? row.ProcessId.lookupValue.displayName : '';
      var ProcessId = row.ProcessId ? row.ProcessId.lookupValue.value : '';
      var WFRuleLogId = row.WFRuleLogId ? row.WFRuleLogId.textValue : '';
      var ExecutorIdentityName = row.ExecutorIdentityName ? row.ExecutorIdentityName.textValue : '';
      var str = `
                <div class="iconBox">
            <div class="popup">
            <div class="option-item" style="display:none;" onclick="handleTo('${ProcessInstanceId}')">办理</div>
            <div class="option-item" style="display:none;" onclick="DelegateFn('${ProcessInstanceId}','${WFRuleLogId}',\'${ProcessIdName}\','${ExecutorIdentityName}')">委派</div>
            <div class="option-item" onclick="printForm('${ProcessInstanceId}')">打印</div>
            <div class="option-item" onclick="handleCancel('${ProcessInstanceId}')">撤销</div>
            <div class="option-item" onclick="CirculationFn('${ProcessInstanceId}','${WFRuleLogId}',\'${ProcessIdName}\','${ExecutorIdentityName}')">传阅</div>
            <div class="option-item" onclick="UrgingFn('${ProcessInstanceId}','${WFRuleLogId}',\'${ProcessIdName}\','${ExecutorIdentityName}')">催办</div>
            <div class="option-item" onclick="handleSupervised('${ProcessInstanceId}','${ProcessIdName}')">督办</div>
            <div class="option-item" onclick="cancelSupervised('${ProcessInstanceId}')">取消督办</div>
            <div class="option-item" style="display:none;" onclick="handleFavor('${ProcessInstanceId}')">收藏</div>
            <div class="option-item" onclick="cancelFavor('${ProcessInstanceId}')">取消收藏</div>
            <div class="option-item" style="display:none;" onclick="handleDelete('${ProcessInstanceId}')">删除</div>
            <div class="option-item" style="display:none;" onclick="Processtoreload('${ProcessInstanceId}')">重办</div>
            <div class="option-item" style="display:none;" onclick="handleJump('${ProcessId}','${ProcessIdName}','${ProcessInstanceId}')">跳转</div>
            <div class="option-item" style="display:none;" onclick="handleCountersign('${ProcessId}','${ProcessIdName}','${ProcessInstanceId}')">加签</div>
            <div class="option-item" style="display:none;" onclick="handleFinish('${WFRuleLogId}')">结束</div>
            <div class="option-item" style="display:none;" onclick="handleRelase('${ProcessInstanceId}')">发布</div>
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
      if (item.name != 'ProcessInstanceId' && item.name != 'WFRuleLogId' && item.name != 'ExecutorIdentityName') {
        if (item.name == 'Name') {
          columnslist.push({
            field: item.name,
            title: item.label,
            sortable: true,
            formatter: function formatter(value, row, index) {
              let result = girdFormatterValue(item.name, row);
              var ProcessInstanceId = row.id;
              return '<a class="namefield" title="' + result + '" href="/#/lightning/r/Workflow/instance/view?id=' + ProcessInstanceId + '&reurl=/lightning/workflow/mine" target="_blank">' + result + '</a>';
            }
          });
        }
        else {
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
        item.filterquery = item.filterquery || '';
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

const DelegateRef = ref();

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
const UrgingData = reactive({
  params: {}
})
const updateStatus = (e) => {
  data.isModal = false;
  data.isUrging = false;
  data.isCirculation = false;
}

//查看
const handleTo = (WFRuleLogId) => {
  //console.log("WFRuleLogId", WFRuleLogId);
  // router.push({
  //   path: "/detail",
  //   query: {
  //     id: WFRuleLogId
  //   }
  // });
  let url = router.resolve({
    name: "FlowDetail",
    query: {
      id: WFRuleLogId,
      reurl: '/lightning/workflow/mine'
    },
  });
  window.open(url.href);
}
//打印
const printForm = (id) => {
  let url = router.resolve({
    path: '/lightning/workflow/WFFormPrint',
    name: "WFFormPrint",
    query: {
      id: id,
    },
  });
  window.open(url.href);
}
//跳转
const handleJump = (ProcessId, ProcessIdName, ProcessInstanceId) => {
  jumpData.params = {
    ProcessId, ProcessIdName, ProcessInstanceId
  }
  data.isJump = true;
}
//加签
const handleCountersign = (ProcessId, ProcessIdName, ProcessInstanceId) => {
  CountersignData.params = {
    ProcessId, ProcessIdName, ProcessInstanceId
  }
  data.isCountersign = true;
}
//委派
const DelegateFn = (InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName) => {
  // console.log("RuleLogId",RuleLogId, DelegateRef);
  DelegateData.params = {
    InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName
  }
  console.log(DelegateData.params)
  data.isModal = true;
}
//撤销
const handleCancel = (id) => {
  data.confirmType = "revoke";
  data.ProcessInstanceId = id;
  data.isConfirm = true;
  data.confirmText = '确定要撤销该事务吗？撤销后进入发起人的退件箱，发起人可以进行删除'
  data.confirmTitle = '撤销'
};
// 撤销
const revokeFlow = () => {
  let obj = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        id: data.ProcessInstanceId
      }
    }]
  };
  let d = {
    message: JSON.stringify(obj)
  };
  proxy.$post(Interface.workflow.withdraw, d).then(res => {
    if (res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
      message.success("撤销成功！");
      data.isConfirm = false;
      gridRef.value.loadGrid(data.queryParams);
    } else {
      message.error("撤销失败！");
    }
  });
};

const cancelOkSupervised = () => {
  let obj = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: data.ProcessInstanceId,
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'WFProcessInstance',
          objTypeCode: 122,
          fields: {
            IsSupervised: 0
          }
        }
      }
    }]
  };
  let d = {
    message: JSON.stringify(obj)
  }
  proxy.$post(Interface.edit, d).then(res => {
    if (res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
      message.success("取消督办成功！");
      data.isConfirm = false;
      loadQuery();
    } else {
      message.success("取消督办成功！")
    }
  })
}

const handleConfirm = () => {
  if (data.confirmType == "revoke") {
    revokeFlow();
  } else if (data.confirmType == "supervised") {
    cancelOkSupervised();
  }
}

//结束
const handleFinish = (id) => {
  data.ProcessInstanceId = id;
  data.isConfirm = true;
  data.confirmText = '确定要结束该事务吗？结束后，流程标记已完成'
  data.confirmTitle = '结束'
}
//发布
const handleRelase = (ProcessInstanceId) => {
  data.ProcessInstanceId = ProcessInstanceId;
  data.isRelease = true;
}
//删除
const handleDelete = (id) => {
  data.ProcessInstanceId = id;
  data.isDelete = true;
}
//传阅
function CirculationFn(InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName) {
  CirculationData.params = {
    InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName
  }
  data.isCirculation = true;
}
//催办
function UrgingFn(InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName) {
  UrgingData.params = {
    InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName
  }
  data.isUrging = true;
}
//重办
const Processtoreload = (id) => {
  data.ProcessInstanceId = id;
  data.isConfirm = true;
  data.confirmText = '确认要收回重办当前吗？'
  data.confirmTitle = '重办'
}
//督办
const handleSupervised = (id, name) => {
  data.ProcessInstanceId = id;
  data.processName = name;
  data.isSupervised = true;
}
//取消督办
const cancelSupervised = (id) => {
  data.confirmType = "supervised";
  data.ProcessInstanceId = id;
  data.isConfirm = true;
  data.confirmText = '确定要取消督办吗？'
  data.confirmTitle = '取消督办'
}
//收藏
const handleFavor = (id) => {
  //data.ProcessInstanceId=id;
  let list = gridRef.value.getCheckList();
  //console.log("checklist", list);
  if (list.length) {
    data.isFavor = true;
  } else {
    message.error("请至少勾选一项！")
  }
}
//取消收藏
const cancelFavor = (id) => {
  data.ProcessInstanceId = id;
  data.isConfirm = true;
  data.confirmText = '确定要取消收藏吗？'
  data.confirmTitle = '取消收藏'
}
//批量打印
const batchPrintForm = () => {
  //data.ProcessInstanceId=id;
  let list = gridRef.value.getCheckList();
  //console.log("checklist", list);
  if (list.length) {
    let url = router.resolve({
      path: '/lightning/workflow/WFFormPrint',
      name: "WFFormPrint",
      query: {
        id: '',
      },
    });
    window.open(url.href);
  } else {
    message.error("请至少勾选一项！")
  }
}
//批量传阅
const batchCirculation = () => {
  //data.ProcessInstanceId=id;
  let list = gridRef.value.getCheckList();
  //console.log("checklist", list);
  if (list.length) {
    // CirculationData.params = {
    //   InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName
    // }
    data.isCirculation = true;
  } else {
    message.error("请至少勾选一项！")
  }
}
//批量督办
const batchSupervised = () => {
  let list = gridRef.value.getCheckList();
  if (list.length) {
    data.isSupervised = true;
  } else {
    message.error("请至少勾选一项！")
  }
}
//批量取消督办
const batchCancelSupervised = () => {
  let list = gridRef.value.getCheckList();
  if (list.length) {
    data.isConfirm = true;
    data.confirmText = '确定要批量取消督办吗？'
    data.confirmTitle = '批量取消督办'
  } else {
    message.error("请至少勾选一项！")
  }
}
window.data = data;
window.handleTo = handleTo;
window.printForm = printForm;
window.handleJump = handleJump;
window.handleCountersign = handleCountersign;
window.DelegateFn = DelegateFn;
window.handleCancel = handleCancel;
window.handleFinish = handleFinish;
window.handleRelase = handleRelase;
window.handleDelete = handleDelete;
window.CirculationFn = CirculationFn;
window.UrgingFn = UrgingFn;
window.handleSupervised = handleSupervised;
window.cancelSupervised = cancelSupervised;
window.handleFavor = handleFavor;
window.cancelFavor = cancelFavor;
window.batchPrintForm = batchPrintForm;
window.batchCirculation = batchCirculation;
window.Processtoreload = Processtoreload;
const imgUrl = require("@/assets/flow/checkbox_checked.gif");
const gridUrl = ref(Interface.list2);
const columns = ref([]);
const changeTab = (e) => {
  data.activeKey = e;
  data.queryParams = {
    filterId: data.queryParams.filterId,
    objectTypeCode: '122',
    entityName: 'WFProcessInstance',
    sort: 'CreatedOn',
    order: 'desc'
  };
  let filterColumnsList = (data.tabs)[e].filterableColumns;
  data.SearchFields = filterColumnsList;
  data.queryParams.filterId = data.tabs[e].filterId || '';
  // if(data.formSearchFilterquery){
  //   data.queryParams.filterQuery+=data.formSearchFilterquery;
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
    data.queryParams.filterQuery = '\nProcessId\tin\t' + data.treeId;
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
const handleClickMenu = (e) => {
  data.isMenu = e;
}
const handleMenuClick = () => {

}
watch(() => route, (newVal, oldVal) => {
  if (gridRef && gridRef.value && gridRef.value.loadGrid != 'undefined' && !route.params.sObjectName) {
    if (route.path == '/lightning/workflow/mine') {
      //getTreeData();
      data.queryParams = {
        filterId: '',
        objectTypeCode: '122',
        entityName: 'WFProcessInstance',
        //filterQuery: '',
        sort: 'CreatedOn',
        order: 'desc'
      }
      data.entityType = '122';
      data.layoutName = 'myWorkflowInstance'
      setTimeout(function () {
        getTreeData();
        getTabs();
      }, 1000)
    }
  }
}, { deep: true, immediate: true })
onMounted(() => {
  window.addEventListener('resize', changeHeight)
  // this.$nextTick(()=>{
  //   getTabs();
  // })
  getTreeData();
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

  .wea-left-tree-scroll {
    height: calc(~'100% - 50px') !important;
  }

  .processTree {
    :deep .ant-tree-node-content-wrapper {
      display: block !important;
    }
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

.ml11 {
  margin-right: 25px;
}
</style>