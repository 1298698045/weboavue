<template>
    <div class="todoList">
      <div class="headerBar">
          <div class="headerLeft">
              <div class="icon-circle-base">
                <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
              </div>
              <span class="headerTitle">收文管理</span>
          </div>
          <div class="headerRight">
            <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button> -->
          </div>
      </div>
      <div class="todo-content">
        <a-row>
          <a-col
            span="3"
            class="wea-left-right-layout-left"
            v-if="!isCollapsed"
          >
            <div class="wea-left-tree">
              <div class="wea-left-tree-search">
                <a-input-search
                  v-model:value="searchVal"
                  placeholder=""
                  @search="onSearch"
                />
              </div>
              <div class="wea-left-tree-scroll">
                <a-tree
                  :style="{height: tableHeight+'px'}"
                  :expanded-keys="expandedKeys"
                  :auto-expand-parent="autoExpandParent"
                  :tree-data="gData"
                  block-node
                  :fieldNames="fieldNames"
                  @expand="onExpand"
                >
                  <template #switcherIcon="{ switcherCls }">
                    <CaretDownOutlined
                      :class="switcherCls"
                      style="color: rgb(163, 163, 163); font-size: 14px"
                    ></CaretDownOutlined>
                  </template>
                  <template  #title="{ name, text, key }">
                    <a-dropdown :trigger="['contextmenu']">
                        <div class="treeRow">
                            <span>{{ text }}</span>
                        </div>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="1" @click="handleAddCategory(key)">添加分类</a-menu-item>
                            <a-menu-item key="2" @click="handleEditCategory(key)">编辑</a-menu-item>
                            <a-menu-item key="3">删除</a-menu-item>
                          </a-menu>
                        </template>
                    </a-dropdown>
                  </template>
                </a-tree>
              </div>
            </div>
          </a-col>
          <a-col
            :span="isCollapsed ? '24' : '21'"
            class="wea-left-right-layout-right"
          >
            <div
              class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
              :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }"
              @click="handleCollapsed"
            ></div>
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
              <list-form-search ref="searchRef" @update-height="changeHeight" ></list-form-search>
              <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
                <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <!-- 委派 -->
        <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal" v-if="isModal" />
        <!-- 跳转 -->
        <Jump v-if="isJump" :isShow="isJump" :paramsData="jumpData.params" @update-status="isJump=false" />
        <!-- 加签 -->
        <Countersign v-if="isCountersign" :isShow="isCountersign" :paramsData="CountersignData.params" @update-status="isCountersign=false"  />
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
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();

  import { formTreeData } from "@/utils/common.js";
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
  import useReceivingAdmin from "@/utils/documentAdmin/receivingAdmin";
  const { tabList } = useReceivingAdmin();
  console.log("tabList",tabList);
  const route = useRoute();
  const router = useRouter();

  const expandedKeys = ref([]);
  const searchValue = ref("");
  const autoExpandParent = ref(true);
  const gData = ref([]);
  proxy.$get(Interface.documentAdmin.tree,{
    entity: "docintype"
  }).then((res)=>{
    gData.value = formTreeData(res.rows,'id','pid');
  })
  
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
    fieldNames:{
      children:'children', title:'name', key:'id'
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
    tabs:  tabList,
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
  };
  
  const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal,
    isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId } = toRefs(data);
//   console.log("tabs", data.tabs);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null); 
  const gridRef = ref(null);
  onMounted(()=>{
    window.addEventListener('resize',changeHeight)
  })
  const onSearch = (e) => {

  }
  function changeHeight(h){
    if(typeof h == 'number'){
      formSearchHeight.value = h;
    }
    let contentHeight = contentRef.value.clientHeight;
    let tabsHeight = 46;
    let height = contentHeight - tabsHeight - formSearchHeight.value;
    data.tableHeight = height;
    console.log('data',data.tableHeight);
    console.log("gridRef",gridRef.value.loadGrid())
  }
  const cancelRelase = (e) => {
    data.isRelease = e;
  }
  // 获取tabs
  const getTabs = () => {
    proxy.$get(Interface.todoList.tabs,{
      a: 1
    }).then(res=>{
      console.log("tabs",res)
      data.tabs = res.list;
    })
  }
  // getTabs();
  
  const handleMenuClick = ()=>{
  
  }
  const DelegateRef = ref();
  
  function handleTo(WFRuleLogId){
      console.log("WFRuleLogId",WFRuleLogId);
      router.push({
        path:"/detail",
        query: {
          id: WFRuleLogId
        }
      });
  }
  const EditFlow = (id) => {
    console.log("id",id);
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
    const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.documentAdmin.receivingAdmin.list);

    const columns = ref(data.tabs[0].table.columnsArray);
    
    const changeTab = (e) => {
        console.log("e",e);
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
  <style lang="less" scoped>
  .todoList {
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
              .ant-tree-title{
                display: inline-block;
                width: 100%;
              }
              .ant-tree-title>span{
                width: 100%;
                display: flex;
                justify-content: space-between;
                .tree-num{
                  padding-right: 10px;
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
            background: url(~@/assets/img/leftTree-show.png)
              no-repeat -2px 0;
          }
          .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
            background: url(~@/assets/img/leftTree-show-hover.png)
              no-repeat -2px 0;
          }
          .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
            background: url(~@/assets/img/leftTree-hide.png)
              no-repeat -2px 0;
          }
          .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
            background: url(~@/assets/img/leftTree-hide-hover.png)
              no-repeat -2px 0;
          }
        }
        .wea-tab {
          height: 46px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e3e5;
          padding: 0 15px;
          :deep .ant-tabs-nav::before{
            border-bottom: none !important;
          }
        }
        .wea-tabContent {
          /* height: calc(~"100% - 98px"); */
        }
      }
    }
  }
  .treeRow{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    .num{
        color: #aaa;
    }
  }
  </style>
  