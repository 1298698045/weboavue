<template>
  <div class="todoList">
    <div class="todo-head">
      <div class="todo-head-left">
        <div class="icon-circle-base"></div>
        <span class="wea-new-top-title-breadcrumb">待办事宜</span>
      </div>
      <div class="todo-head-right">
        <a-button type="primary">全部已读</a-button>
        <a-dropdown-button :trigger="['click']">
          批量提交
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">
                <UserOutlined />
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <UserOutlined />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <UserOutlined />
                3rd item
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
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <UserOutlined />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <UserOutlined />
                3rd item
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
          v-show="!isCollapsed"
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
                <template #title="{ name }">
                  <span v-if="name.indexOf(searchValue) > -1">
                    {{ name.substr(0, name.indexOf(searchValue)) }}
                    <span style="color: #f50">{{ searchValue }}</span>
                    {{
                      name.substr(
                        name.indexOf(searchValue) + searchValue.length
                      )
                    }}
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
          <div style="height: 100%">
            <div class="wea-tab">
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane v-for="(item,index) in tabs" :key="index">
                  <template #tab>
                    <span>
                      {{item.lable}} ({{item.count}})
                    </span>
                  </template>
                </a-tab-pane>
                <!-- <a-tab-pane key="2" tab="待处理" force-render></a-tab-pane>
                <a-tab-pane key="3" tab="待阅"></a-tab-pane> -->
              </a-tabs>
            </div>
            <list-form-search></list-form-search>
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
            <div class="wea-tabContent" ref="tabContent">
              <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
              <Dtable :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable>
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
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance  } from "vue";
import Interface from "@/utils/Interface.js";
import Dtable from "@/components/Dtable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
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
proxy.$get('/localData/datalist.json',{}).then((response)=>{
  console.log("res",response)
})
const treeList = res.data;
console.log("genData",genData,treeList)
const gData = ref(treeList);
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
const dataSource = reactive([
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
]);
const columns = reactive([
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
]);

let data = reactive({
  isCollapsed: false,
  tableHeight: '',
  fieldNames:{
    children:'children', title:'name', key:'id'
  },
  tabs:[]
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
};
const { isCollapsed, tableHeight, fieldNames, tabs} = toRefs(data);
const tabContent = ref(null);
onMounted(()=>{
  data.tableHeight = tabContent.value.clientHeight;
  console.log(data.tableHeight)
  window.addEventListener('resize',function(e){
    data.tableHeight = tabContent.value.clientHeight;
  })
})


// const formState = reactive({
//   username: '',
//   password: '',
//   remember: true,
// })
// const onFinish = (values) => {
//   console.log('Success:', values);
// };

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

const getTabs = () => {
  proxy.$get(Interface.todoList.tabs,{
    a: 1
  }).then(res=>{
    console.log("tabs",res)
    data.tabs = res.list;
  })
}
getTabs();
</script>
<style lang="less">
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
        .formSearch{
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .ant-form {
            display: flex;
            /* align-items: center; */
          }
        }
      }
      .wea-tab {
        height: 46px;
      }
      .wea-tabContent {
        height: calc(~"100% - 122px");
      }
    }
  }
}
</style>
