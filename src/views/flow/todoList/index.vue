<template>
  <div class="todoList">
    <div class="todo-head">
      <div class="todo-head-left">
        <div class="icon-circle-base"></div>
        <span class="wea-new-top-title-breadcrumb">待办事宜</span>
      </div>
      <div class="todo-head-right">
        <!-- <a-button type="primary">全部已读</a-button> -->
        <button class="f-btn primary">全部已读</button>
        <span>
          <button disabled class="f-btn primary ml10">批量提交</button>
          <a-dropdown>
            <button class="f-btn primary rdownIcon">
              <CaretDownOutlined />
            </button>
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
        </span>

        <a-dropdown-button :trigger="['click']">
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
        </a-dropdown-button>
        <a-dropdown :trigger="['click']">
          <span class="btn-drop">
            <UnorderedListOutlined />
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
        </a-dropdown>
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col
          span="5"
          class="wea-left-right-layout-left"
          v-if="!isCollapsed"
        >
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <span class="wea-left-tree-search-label">全部类型</span>
              <a-input-search
                v-model:value="value"
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
                <template  v-slot:title="{ name, data, isLeaf, text, quantity }">
                  <span v-if="name.indexOf(searchValue) > -1">
                    {{ name.substr(0, name.indexOf(searchValue)) }}
                    <!-- <span style="color: #f50">{{ searchValue }}</span> -->
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
        <a-col
          :span="isCollapsed ? '24' : '19'"
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
                      {{item.lable}} <span v-if="item.count">({{item.count}})</span>
                    </span>
                  </template>
                </a-tab-pane>
                <!-- <a-tab-pane key="2" tab="待处理" force-render></a-tab-pane>
                <a-tab-pane key="3" tab="待阅"></a-tab-pane> -->
              </a-tabs>
            </div>
            <list-form-search ref="searchRef" @update-height="changeHeight" ></list-form-search>
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
              <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal" v-if="isModal" />
    <circulation-modal ref="circulationRef" @update-status="updateStatus" v-if="isCirculation" :paramsData="CirculationData.params" :isShow="isCirculation"></circulation-modal>
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
import Dtable from "@/components/Dtable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
import Delegate from "@/components/workflow/Delegate.vue";
import CirculationModal from "@/components/workflow/CirculationModal.vue";
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
proxy.$get('/localData/treedata.json',{}).then((response)=>{
  console.log("res",response)
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
  fieldNames:{
    children:'children', title:'name', key:'id'
  },
  tabs:[
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
  isCirculation: false
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
};
const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation} = toRefs(data);
const tabContent = ref(null);
const contentRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
onMounted(()=>{
  // console.log("contentRef",contentRef.value.clientHeight)
  // var contentHeight = contentRef.value.clientHeight;
  // var tabsHeight = 46;
  // var height = contentHeight - tabsHeight;
  // data.tableHeight = height;
  // console.log(data.tableHeight)
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
            padding-right: 14px;
            box-sizing: border-box;
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
      }
      .wea-tabContent {
        /* height: calc(~"100% - 98px"); */
      }
    }
  }
}
</style>
