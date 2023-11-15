<template>
    <div class="todoList">
      <div class="headerBar">
          <div class="headerLeft">
              <div class="icon-circle-base"></div>
              <span class="headerTitle">会议查询</span>
          </div>
          <div class="headerRight">
          </div>
      </div>
      <div class="todo-content">
        <a-row>
          <a-col
            span="24"
            class="wea-left-right-layout-right"
          >
            <!-- <div
              class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
              :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }"
              @click="handleCollapsed"
            ></div> -->
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
  import { useRouter, useRoute } from "vue-router";
  const route = useRoute();
  const router = useRouter();
  const x = 3;
  const y = 2;
  const z = 1;
  const { proxy } = getCurrentInstance();
  const dataList = [];
  const searchValue = ref("");
  
  let data = reactive({
    tableHeight: '',
    fieldNames:{
      children:'children', title:'name', key:'id'
    },
    tabs:[
      {
        lable: "全部",
        count: 18
      },
      {
        lable: "我发起的",
        count: 18
      },
      {
        lable: "我参加的",
        count: 18
      },
      {
        lable: "今日",
        count: 18
      },
      {
        lable: "本周",
        count: 18
      },
      {
        lable: "本月",
        count: 18
      },
      {
        lable: "本季度",
        count: 18
      },
      {
        lable: "今年",
        count: 18
      },
    ],
    activeKey: 0,
    queryParams: {},
  });
  const { tableHeight, fieldNames, tabs, activeKey } = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(()=>{
    window.addEventListener('resize',changeHeight)
  })
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
        { field: 'Name', title: '标题', sortable: true,
        formatter: function formatter(value, row, index) {
                      var rowId = row.ProcessInstanceId;
                      var name = row["Name"];
                      var action = "<a style=\"color:#015ba7;font-size:13px;\" href=\"/a0M/e?source=i&id=" + rowId + "&retURL=%2fwfinstance%2fcancellst.aspx%3fgridid%3dcancelledWfinstances%26t%3da0M\">" + name + "</a>";
                      return action;
                  } },
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
  </style>
  