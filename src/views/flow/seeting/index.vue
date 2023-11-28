<template>
    <div class="todoList">
      <div class="headerBar">
          <div class="headerLeft">
              <div class="icon-circle-base"></div>
              <span class="headerTitle">流程设置</span>
          </div>
          <div class="headerRight">
            <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
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
                            <span>{{ name }}</span>
                            <span class="num">{{text}}</span>
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
                        {{item.lable}}
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
      <NewCategory v-if="isCategory" @cancel="cancelCategory" :isShow="isCategory" :id="treeId" ObjectTypeCode="流程" />
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
  import { message } from "ant-design-vue";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";

  import NewCategory from "@/components/workflow/NewCategory.vue"
  import { useRouter, useRoute } from "vue-router";
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
  proxy.$get(Interface.flow.processTree,{}).then((res)=>{
    console.log("res-processTree",res);
    let listData = res.data;
    let formTree = (list) => {
      list.forEach(item=>{
        if(item.children){
          formTree(item.children);
        }
        item.key = item.id;
        item.value = item.id;
      })
    }
    formTree(listData);
    console.log("formTree",listData)
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
    fieldNames:{
      children:'children', title:'name', key:'id'
    },
    tabs:[
      {
        lable: "全部",
        count: ''
      },
      {
        lable: "启用",
        count: ''
      },
      {
        lable: "草稿",
        count: ''
      }
    ],
    activeKey: 0,
    queryParams: {},
    isModal: false,
    isCirculation: false,
    isNew: false,
    searchVal: "",
    isCategory: false,
    treeId: ""
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, isNew, searchVal,
    isCategory, treeId} = toRefs(data);
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
  function DelegateFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
    // console.log("RuleLogId",RuleLogId, DelegateRef);
    DelegateData.params = {
      InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
    }
    console.log(DelegateData.params)
    data.isModal = true;
  }
  function CirculationFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
    CirculationData.params = {
      InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
    }
    data.isCirculation = true;
  }
  window.handleTo = handleTo;
  window.DelegateFn = DelegateFn; // 委派
  window.CirculationFn = CirculationFn; // 传阅
  window.data = data;
  const formatStatus2 = (val, row, index) => {
    var value = row["StateCode"];
    if (value == "1" || value == "审批通过" || value == "已发布") {
        return "<span style='color:blue;font-weight:bold;'>已发布</span>";
    }
    if (value == "2" || value == "审批未通过") {
        return "<span style='color:red'>审批未通过</span>";
    }
    if (value == "0" || value == "草稿") {
        return "<span style='color:grey'>草稿</span>";
    }
    if (value == "已退回" || value == "退回") {
        return "<span style='color:#8F3A44;font-weight:bold;'>" + value + "</span>";
    }
}
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.flow.list);
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
                    <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">权限设置</div>
                    <div class="option-item" onclick="DelegateFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">编辑基本信息</div>  
                    <div class="option-item" onclick="CirculationFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">设计流程</div>  
                  </div>
                  <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
              `
              return str;
            }
        },
        {
            field: 'Name',
            title: '名称',
            sortable: true,
            formatter: function formatter(value, row, index) {
                return value;
            }
        },
        {
            field: "ProcessCode",
            title: '流程代码',
            sortable: true
        },
        {
            field: "StateCode",
            title: '状态',
            sortable: true,
            formatter: formatStatus2
        },
        {
            field: "Position",
            title: '显示顺序',
            sortable: true
        },
        {
            field: "EntityType",
            title: '关联对象代码',
            sortable: true
        },
        {
            field: "EntityObjectId",
            title: '关联对象',
            sortable: true
        },
        {
            field: "EntityLayoutId",
            title: '表单',
            sortable: true
        },
        {
            field: "FolderId",
            title: '流程分类',
            sortable: true
        },
        {
            field: "ModifiedBy",
            title: '上一次修改人',
            sortable: true
        },
        {
            field: "ModifiedOn",
            title: '上一次修改日期',
            sortable: true
        }
      ]
    )
    
    const changeTab = (e) => {
      data.activeKey = e;
      data.queryParams.activeKey = e;
      gridRef.value.loadGrid(data.queryParams);
    }
    const handleNew = (e) => {
      data.isNew = true;
    }
    const cancelNew = (e) => {
      data.isNew = e;
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
            background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-show.png)
              no-repeat -2px 0;
          }
          .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
            background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-show-hover.png)
              no-repeat -2px 0;
          }
          .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
            background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-hide.png)
              no-repeat -2px 0;
          }
          .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
            background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-hide-hover.png)
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
  