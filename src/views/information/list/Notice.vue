<template>
    <div class="todoList">
      <div class="headerBar">
          <div class="headerLeft">
              <div class="icon-circle-base">
                <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
              </div>
              <span class="headerTitle">通知管理</span>
          </div>
          <div class="headerRight">
            <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
            <a-button type="primary" class="ml10">批量发布</a-button>
            <a-button class="ml10">批量取消发布</a-button>
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
                  placeholder="输入查询"
                  @search="onSearch"
                />
              </div>
              <div class="wea-left-tree-scroll information-tree">
                <a-tree
                  :style="{height: tableHeight+'px'}"
                  :expanded-keys="expandedKeys"
                  :auto-expand-parent="autoExpandParent"
                  :tree-data="gData"
                  block-node
                  :fieldNames="fieldNames"
                  @select="onSelect"
                  @expand="onExpand"
                >
                  <template #switcherIcon="{ switcherCls }">
                    <CaretDownOutlined
                      :class="switcherCls"
                      style="color: rgb(163, 163, 163); font-size: 14px"
                    ></CaretDownOutlined>
                  </template>
                  <template  #title="{ name }">
                    <span>{{ name }}</span>
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
                        {{item.lable}} <span v-if="item.count">({{item.count}})</span>
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
              <list-form-search ref="searchRef" @update-height="changeHeight" @search="handleSearch" entityApiName="Notice" :SearchFields="SearchFields"></list-form-search>
              <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
                <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Ntable>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <NewInfo :isShow="isNew" :treeData="gData" @cancel="cancelNew" :objectTypeCode="data.queryParams.objectTypeCode" />
      <Delete :isShow="data.isDelete" :desc="data.deleteDesc" @cancel="cancelDelete" @ok="deleteOk" :sObjectName="data.queryParams.entityName" :recordId="data.recordId" :objTypeCode="data.queryParams.objectTypeCode" :external="external" />
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
  import Ntable from "@/components/Ntable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  import { girdFormatterValue } from "@/utils/common.js";
  const route = useRoute();
  const router = useRouter();
  import NewInfo from "@/components/information/NewInfo.vue";
  import Delete from "@/components/listView/Delete.vue";
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
  const gDataAll=ref([]);
  proxy.$get(Interface.information.contentTree,{}).then((response)=>{
    //console.log("res",response);
    let formTree = (list) => {
      list.forEach(item=>{
        if(item.children){
          formTree(item.children);
        }
        item.key = item.id;
        item.value = item.id;
      })
    }
    formTree(response);
    console.log("formTree",response)
    gData.value = response;
    gDataAll.value = response;
  })
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
    fieldNames:{
      children:'children', title:'name', key:'id'
    },
    tabs:[
      {
        lable: "我创建",
        count: ''
      },
      {
        lable: "部门的",
        count: ''
      },
      {
        lable: "全部",
        count: ''
      },
      // {
      //   lable: "我管理的",
      //   count: 16
      // },
      // {
      //   lable: "待审批",
      //   count: 0
      // }
    ],
    activeKey: 0,
    queryParams: {
      filterId:'',
      objectTypeCode:'100202',
      entityName:'Notice',
      filterquery:'\nCreatedBy\teq-userid',
      displayColumns:'Title,FolderId,StateCode,BusinessUnitId,ReadCount,ApprovedBy,ApprovedOn,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn'
    },
    isModal: false,
    isCirculation: false,
    isNew: false,
    searchVal:'',
    value: "",
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    recordId:'',
    external:false,
    SearchFields:[
            {
                "column": "Title",
                "label": "标题",
                "dataType": "S",
                "ReferencedEntityObjectTypeCode": 0,
                "sObjectName": "",
                "targetApiName": "",
            },
            {
                "column": "BusinessUnitId",
                "label": "部门",
                "dataType": "O",
                "ReferencedEntityObjectTypeCode": 10,
                "picklistValues": [],
                "sObjectName": "BusinessUnit",
                "targetApiName": "BusinessUnit",
            },
            {
                "column": "StatusCode",
                "label": "状态",
                "dataType": "L",
                "ReferencedEntityObjectTypeCode": 100201,
                "picklistValues": [
                {
                    "label": "草稿",
                    "value": "0"
                },
                {
                    "label": "已发布",
                    "value": "1"
                },
                {
                    "label": "审批未通过",
                    "value": "2"
                }
                ],
                "sObjectName": "",
                "targetApiName": "",
            },
            {
                "column": "CreatedOn",
                "label": "创建时间",
                "dataType": "F",
                "ReferencedEntityObjectTypeCode": 0,
                "picklistValues": [],
                "sObjectName": "",
                "targetApiName": "",
            }
        ]
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, isNew, value,searchVal,SearchFields} = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  const onSearch = (e) => {
    gData.value = gDataAll.value.filter(item=>{
      return item.name.indexOf(data.searchVal) !== -1;
    })
  }
  const onSelect = (keys) => {
    gridRef.value.loadGrid(data.queryParams);
  };
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
    //console.log("gridRef",gridRef.value.loadGrid())
      //data.queryParams.activeKey = e;
      if(data.activeKey==0){
        data.queryParams.filterquery='\nCreatedBy\teq-userid';
      }else if(data.activeKey==1){
        data.queryParams.filterquery='\nBusinessUnitId\teq-businessunitid';
      }else if(data.activeKey==2){
        data.queryParams.filterquery='';
      }else if(data.activeKey==3){

      }
    gridRef.value.loadGrid(data.queryParams);
  }
  const handleSearch=(filterquery)=>{
      if(data.activeKey==0){
        data.queryParams.filterquery='\nCreatedBy\teq-userid';
      }else if(data.activeKey==1){
        data.queryParams.filterquery='\nBusinessUnitId\teq-businessunitid';
      }else if(data.activeKey==2){
        data.queryParams.filterquery='';
      }else if(data.activeKey==3){

      }
      if(filterquery){
        data.queryParams.filterquery+=filterquery;
      }
    gridRef.value.loadGrid(data.queryParams);
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
  
  function handleDetail(id){
      // router.push({
      //   path:"/informationDetail",
      //   query: {
      //     id: id
      //   }
      // });
      let reUrl = router.resolve({
          path:"/informationDetail",
          query: {
            id: id,
            objectTypeCode:'100202'
          }
      })
      window.open(reUrl.href); 
  }
  function handlePreview(id) {
    // router.push({
    //     path:"/previewContent",
    //     query: {
    //       id: id,
    //       objectTypeCode:'100202'
    //     }
    // });
    let reUrl = router.resolve({
        path:"/previewContent",
        query: {
          id: id,
          objectTypeCode:'100202'
        }
    })
    window.open(reUrl.href); 
  }
  function handleEdit(id,FolderId){
    // router.push({
    //     path:"/content/visualEditor",
    //     query: {
    //       id: id
    //     }
    // });
    let reUrl = router.resolve({
            name: "visualEditor",
            query: {
                id: id,
                objectTypeCode: 100202,
                //FolderId: res.actions[0].returnValue&&res.actions[0].returnValue.fields&&res.actions[0].returnValue.fields.FolderId?res.actions[0].returnValue.fields.FolderId:''
                FolderId: FolderId
            }
        })
    window.open(reUrl.href); 
  }
  function handleDelete(id){
    data.recordId=id;
    data.isDelete = true;
  }
const deleteOk = (e) => {
  gridRef.value.loadGrid(data.queryParams);
};
const cancelDelete = (e) => {
  data.isDelete = false;
};
  const updateStatus = (e) => {
    data.isModal = e;
    data.isCirculation = e;
  }
  const formatStatus=(val, row, index)=>{
      let value = girdFormatterValue("StateCode",row);
      if (value == "1" || value == "审批通过" || value == "已发布") {
          return "<span style='color:#333;'>已发布</span>";
      }
      if (value == "2" || value == "审批未通过" || value == "审批不通过") {
          return "<span style='color:#333;'>审批未通过</span>";
      }
      if (value == "0" || value == "草稿") {
          return "<span style='color:#333;'>草稿</span>";
      }
      if (value == "已退回" || value == "退回") {
          return "<span style='color:#333;'>" + value + "</span>";
      }
  }

  window.handleDetail = handleDetail;
  window.handlePreview = handlePreview;
  window.handleEdit = handleEdit;
  window.handleDelete = handleDelete;
  window.data = data;

  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.list2);
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
                    <div class="option-item" onclick="handleDetail('${row.id}')">查看</div>
                    <div class="option-item" onclick="handlePreview('${row.id}')">预览</div>  
                    <div class="option-item" onclick="handleEdit('${row.id}','${row.FolderId.lookupValue.value}')">编辑</div>  
                    <div class="option-item" onclick="handleDelete('${row.id}')">删除</div>
                  </div>
                  <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
              `
              return str;
            }
        },
        { field: 'Title', title: '标题', sortable: true,
          formatter: function formatter(value, row, index) {
              return girdFormatterValue('Title',row);
          } 
        },
        {
            field: 'FolderId',
            title: '栏目',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('FolderId',row);
          } 
        }, 
        {
            field: 'StateCode',
            title: '发布状态',
            sortable: true,
            formatter: formatStatus
        }, {
            field: 'BusinessUnitId',
            title: '发布部门',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('BusinessUnitId',row);
          } 
        }, {
            field: 'ReadCount',
            title: '阅读数',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('ReadCount',row);
          } 
        }, {
            field: 'ApprovedBy',
            title: '审批发布人',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('ApprovedBy',row);
          } 
        }, {
            field: 'ApprovedOn',
            title: '发布时间',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('ApprovedOn',row);
          } 
        }, {
            field: 'CreatedBy',
            title: '创建人',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('CreatedBy',row);
          } 
        }, {
            field: 'CreatedOn',
            title: '创建时间',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('CreatedOn',row);
          } 
        }, {
            field: 'ModifiedBy',
            title: '上次修改人',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('ModifiedBy',row);
          } 
        }, {
            field: 'ModifiedOn',
            title: '上次修改时间',
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue('ModifiedOn',row);
          } 
        }
      ]
    )
    
    const changeTab = (e) => {
      data.activeKey = e;
      //data.queryParams.activeKey = e;
      if(e==0){
        data.queryParams.filterquery='\nCreatedBy\teq-userid';
      }else if(e==1){
        data.queryParams.filterquery='\nBusinessUnitId\teq-businessunitid';
      }else if(e==2){
        data.queryParams.filterquery='';
      }else if(e){

      }
      gridRef.value.loadGrid(data.queryParams);
    }
    const handleNew = (e) => {
      data.isNew = true;
    }
    const cancelNew = (e) => {
      data.isNew = e;
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
        //.wea-tabContent {
          //height: calc(~"100% - 98px");
        //}
      }
    }
  }
  .information-tree :deep .ant-tree-title{
        white-space: nowrap !important;
    }
:deep .iconBox{
  text-align: center;
  .popup{
    text-align: left;
    top: 20px;
  }
  .moreaction{
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
}
  </style>
  