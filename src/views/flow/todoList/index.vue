<template>
  <div class="todoList">
    <div class="todo-head">
      <div class="todo-head-left">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
        </div>
        <span class="wea-new-top-title-breadcrumb">待办事宜</span>
      </div>
      <div class="todo-head-right">
        <a-button type="primary">全部已读</a-button>
        <!-- <a-dropdown-button :trigger="['click']" style="margin-right: 50px;">
          批量提交
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
        </a-dropdown-button> -->

        <a-button type="primary" class="ml10 leftTextBtn">批量提交</a-button>
        <a-dropdown :trigger="['click']" placement="bottomRight">
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
        </a-dropdown>
        <MoreBtn :isMenu="isMenu" @change="handleClickMenu">
          <div class="moreMenu">
            <div class="menu-icon-background"></div>
            <ul>
              <li class="moreMenuItem">
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
              </li>
            </ul>
          </div>
        </MoreBtn>
        <!-- <a-dropdown :trigger="['click']">
          <span class="moreBtn active">
            <i class="iconfont icon-mulugengduo"></i>
          </span>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">
                <UserOutlined />
                搜索
              </a-menu-item>
              <a-menu-item key="2">
                <UserOutlined />
                批量提交
              </a-menu-item>
              <a-menu-item key="3">
                <UserOutlined />
                批量关注
              </a-menu-item>
              <a-menu-item key="4">
                <UserOutlined />
                批量转发
              </a-menu-item>
              <a-menu-item key="5">
                <UserOutlined />
                全部已读
              </a-menu-item>
              <a-menu-item key="6">
                <UserOutlined />
                显示列定制
              </a-menu-item>
              <a-menu-item key="7">
                <UserOutlined />
                默认排序设置
              </a-menu-item>
              <a-menu-item key="8">
                <UserOutlined />
                上报敏感词
              </a-menu-item>
              <a-menu-item key="9">
                <UserOutlined />
                帮助
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown> -->
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <span class="wea-left-tree-search-label">全部类型</span>
              <a-input-search v-model:value="value" placeholder="" @search="onSearch" />
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
                    <span class="treeRowName">
                      {{ name.substr(0, name.indexOf(searchValue)) }}
                      <!-- <span style="color: #f50">{{ searchValue }}</span> -->
                      {{
                      name.substr(
                      name.indexOf(searchValue) + searchValue.length
                      )
                      }}
                    </span>
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
                      {{item.lable}} <span v-if="item.count">({{item.count}})</span>
                    </span>
                  </template>
                </a-tab-pane>
                <!-- <a-tab-pane key="2" tab="待处理" force-render></a-tab-pane>
                <a-tab-pane key="3" tab="待阅"></a-tab-pane> -->
              </a-tabs>
            </div>
            <list-form-search ref="searchRef" :isCollapsed="isCollapsed"
              @update-height="changeHeight"></list-form-search>
            <!-- <div class="formSearch">
              <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item
                  label="标题"
                  name="username"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                  <a-input v-model:value="formState.username" />
                </a-form-item>
                <a-form-item
                  label="发起人"
                  name="username"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                <a-input v-model:value="formState.username" />
              </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                  <a-button type="primary" html-type="submit">搜索</a-button>
                </a-form-item>
              </a-form>
            </div> -->
            <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
              <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
              <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                :isCollapsed="isCollapsed"></Dtable>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal"
      v-if="isModal" />
    <circulation-modal ref="circulationRef" @update-status="updateStatus" v-if="isCirculation"
      :paramsData="CirculationData.params" :isShow="isCirculation"></circulation-modal>
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
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  const route = useRoute();
  const router = useRouter();
  import Delegate from "@/components/workflow/Delegate.vue";
  import CirculationModal from "@/components/workflow/CirculationModal.vue";
  import "@/style/flow/icon/iconfont.css";
  import MoreBtn from "@/components/antDefault/MoreBtn.vue";
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
  proxy.$get('/localData/treedata.json', {}).then((response) => {
    console.log("res", response)
    gData.value = response.data;
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
    tabs: [
      {
        lable: "全部",
        count: 18
      },
      {
        lable: "被退回",
        count: ''
      },
      {
        lable: "已读",
        count: 16
      },
      {
        lable: "未读",
        count: 2
      },
      {
        lable: "超时",
        count: ''
      },
      {
        lable: "待阅",
        count: ''
      }
    ],
    activeKey: 0,
    queryParams: {},
    isModal: false,
    isCirculation: false,
    value: "",
    isMenu: false
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
    changeHeight();
  };
  const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, value, isMenu } = toRefs(data);
  const handleClickMenu = (e) => {
    data.isMenu = e;
  }
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
    // console.log("contentRef",contentRef.value.clientHeight)
    // var contentHeight = contentRef.value.clientHeight;
    // var tabsHeight = 46;
    // var height = contentHeight - tabsHeight;
    // data.tableHeight = height;
    // console.log(data.tableHeight)
    window.addEventListener('resize', changeHeight);
  })
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
    const url = router.resolve({
      path: "/detail",
      query: {
        id: WFRuleLogId
      }
    })
    window.open(url.href);
  }
  const onSearch = () => {

  }
  const DelegateData = reactive({
    params: {}
  })
  const CirculationData = reactive({
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
  window.handleTo = handleTo;
  window.DelegateFn = DelegateFn; // 委派
  window.CirculationFn = CirculationFn; // 传阅
  window.data = data;
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  const gridUrl = ref("/localData/datalist.json");
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
                  <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">办理</div>
                  <div class="option-item" onclick="DelegateFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">委派</div>  
                  <div class="option-item" onclick="CirculationFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">传阅</div>  
                  <div class="option-item">打印</div>
                </div>
                <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
            `
          return str;
        }
      },
      {
        field: 'IsRead', title: '已读', sortable: true, formatter: function (value, row, index) {
          if (value == 'True' || value == 'true' || value == true) {
            return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
          }
          else {
            return '';
          }
        }
      },
      {
        field: 'Name', title: '标题', sortable: true,
        formatter: function formatter(value, row, index) {
          var rowId = row.ProcessInstanceId;
          var name = row["Name"];
          var action = "<a style=\"color:#015ba7;font-size:13px;\" href=\"/a0M/e?source=i&id=" + rowId + "&retURL=%2fwfinstance%2fcancellst.aspx%3fgridid%3dcancelledWfinstances%26t%3da0M\">" + name + "</a>";
          return action;
        }
      },
      { field: 'PriorityName', title: '紧急程度', sortable: true },
      { field: 'ToActivityName', title: '当前环节', sortable: true },
      { field: 'FromActivityName', title: '来源环节', sortable: true },
      { field: 'CreatedByName', title: '来源提交人', sortable: true },
      { field: 'CreatedOn', title: '来源提交', sortable: true },
      { field: 'StartByName', title: '发起人姓名', sortable: true },
      { field: 'StartedOn', title: '发起时间', sortable: true },
      { field: 'BusinessUnitIdName', title: '发起人部门', sortable: true },
      { field: 'Deadline', title: '办理期限', sortable: true },
      { field: 'ProcessIdName', title: '流程', sortable: true },
    ]
  )

  const changeTab = (e) => {
    data.activeKey = e;
    data.queryParams.activeKey = e;
    gridRef.value.loadGrid(data.queryParams);
  }
</script>
<style lang="less">
  @import "@/style/flow/treeList.less";
</style>