<template>
  <div class="todoList">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
        </div>
        <span class="headerTitle">流程管理</span>
      </div>
      <div class="headerRight">
        <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button> -->
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <a-input-search v-model:value="searchValue" placeholder="" @search="onSearch" />
            </div>
            <div class="wea-left-tree-scroll">
              <a-tree :style="{height: tableHeight+'px'}" :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames"
                @expand="onExpand">
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                  </CaretDownOutlined>
                </template>
                <template v-slot:title="{ name, data, isLeaf, text, quantity }">
                  <span v-if="name.indexOf(searchValue) > -1">
                    {{ name.substr(0, name.indexOf(searchValue)) }}
                    {{
                    name.substr(
                    name.indexOf(searchValue) + searchValue.length
                    )
                    }}
                    <span class="tree-num">{{ quantity }}</span>
                  </span>
                  <span v-else>{{ name }}</span>
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
                <a-tab-pane v-for="(item,index) in tabs" :key="index">
                  <template #tab>
                    <span>
                      {{item.label}}
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
            <list-form-search ref="searchRef" :isCollapsed="isCollapsed"
              @update-height="changeHeight"></list-form-search>
            <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
              <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
              <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                :isCollapsed="isCollapsed"></Dtable>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 委派 -->
    <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal"
      v-if="isModal" />
    <!-- 跳转 -->
    <Jump v-if="isJump" :isShow="isJump" :paramsData="jumpData.params" @update-status="isJump=false" />
    <!-- 加签 -->
    <Countersign v-if="isCountersign" :isShow="isCountersign" :paramsData="CountersignData.params"
      @update-status="isCountersign=false" />
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
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
  import Interface from "@/utils/Interface.js";
  import { message } from "ant-design-vue";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";

  import NewCategory from "@/components/workflow/NewCategory.vue";
  import EditFlowDefine from "@/components/workflow/EditFlowDefine.vue";
  import Delegate from "@/components/workflow/Delegate.vue";
  import Jump from "@/components/workflow/Jump.vue";
  import Countersign from "@/components/workflow/Countersign.vue";
  import ReleaseFlow from "@/components/workflow/ReleaseFlow.vue"
  import { useRouter, useRoute } from "vue-router";
  import useWorkAdmin from "@/utils/flow/workAdmin";
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
  proxy.$get('/localData/treedata.json', {}).then((res) => {
    console.log("res-processTree", res);
    let listData = res.data;
    let formTree = (list) => {
      list.forEach(item => {
        if (item.children) {
          formTree(item.children);
        }
        item.key = item.id;
        item.value = item.id;
      })
    }
    formTree(listData);
    console.log("formTree", listData)
    gData.value = listData;
  })
  // console.log("genData",genData,treeList)

  const onExpand = (keys) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  };
  watch(searchValue, (value) => {
    const expanded = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData.value);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    expandedKeys.value = expanded;
    searchValue.value = value;
    autoExpandParent.value = true;
  });

  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    fieldNames: {
      children: 'children', title: 'name', key: 'id'
    },
    // tabs:[
    //   {
    //     lable: "全部",
    //     count: ''
    //   },
    //   {
    //     lable: "流转中",
    //     count: ''
    //   },
    //   {
    //     lable: "已完成",
    //     count: ''
    //   },
    //   {
    //     lable: "已退回",
    //     count: ''
    //   },
    //   {
    //     lable: "已撤销",
    //     count: ''
    //   },
    //   {
    //     lable: "草稿",
    //     count: ''
    //   }
    // ],
    tabs: tabList,
    activeKey: 0,
    queryParams: {},
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
    ProcessInstanceId: ""
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
    changeHeight();
  };

  const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal,
    isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId } = toRefs(data);
  //   console.log("tabs", data.tabs);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
    window.addEventListener('resize', changeHeight)
  })
  const onSearch = (e) => {

  }
  function changeHeight(h) {
    if (typeof h == 'number') {
      formSearchHeight.value = h;
    }
    let contentHeight = contentRef.value.clientHeight;
    let tabsHeight = 46;
    let height = contentHeight - tabsHeight - formSearchHeight.value;
    data.tableHeight = height;
    console.log('data', data.tableHeight);
    console.log("gridRef", gridRef.value.loadGrid())
  }
  const cancelRelase = (e) => {
    data.isRelease = e;
  }
  // 获取tabs
  const getTabs = () => {
    proxy.$get(Interface.todoList.tabs, {
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

  function handleTo(WFRuleLogId) {
    console.log("WFRuleLogId", WFRuleLogId);
    router.push({
      path: "/detail",
      query: {
        id: WFRuleLogId
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
  const gridUrl = ref(Interface.flow.workAdminList);

  const columns = ref(data.tabs[0].table.columnsArray);

  const changeTab = (e) => {
    console.log("e", e);
    data.activeKey = e;
    data.queryParams.activeKey = e;
    columns.value = data.tabs[e].table.columnsArray;
    gridRef.value.loadGrid(data.queryParams);
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
</script>
<style lang="less">
  @import "@/style/flow/treeList.less";
</style>
<style scoped>
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
</style>