<template>
    <div class="PermissionWrap">
      <div class="headerBar">
          <div class="headerLeft">
              <div class="icon-circle-base">
                <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
              </div>
              <span class="headerTitle">权限管控</span>
          </div>
          <div class="headerRight">
            <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button> -->
            <!-- <a-button type="primary" class="ml10">批量发布</a-button>
            <a-button class="ml10">批量取消发布</a-button> -->
            <a-dropdown :trigger="['hover']" class="ml10">
            <span class="btn-drop">
              <UnorderedListOutlined style="color: #1d2129" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="handleFavor"> 收藏 </a-menu-item>
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
              <!-- <div class="wea-left-tree-select">
                <div class="wea-left-tree-select-icon">
                  <ApartmentOutlined />
                </div>
                <a-select v-model:value="data.leftTreeTop" @change="leftTreeTopChange">
                  <a-select-option key="0" value="组织维度">组织维度</a-select-option>
                  <a-select-option key="1" value="产品维度">产品维度</a-select-option>
                </a-select>
              </div> -->
              <div class="wea-left-tree-search">
                <span class="wea-left-tree-search-label alltype">全部类型</span>
                <a-input
                  v-model:value="searchVal"
                  placeholder=""
                  @change="onSearch"
                  allowClear
                />
                <div class="wea-left-tree-search-icon">
                  <SearchOutlined />
                </div>
              </div>
              <div class="wea-left-tree-scroll information-tree">
                <a-tree
                  :checkable="true"
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
                    <span>
                      {{ name }}
                      <!-- <span class="tree-num">
                        <span class="tree-favor" :class="{'tree-favor-active':isFavor||data.leftTreeTop=='组织维度'}" @click="setFavor(id,name,quantity,isFavor)">
                          <StarOutlined title="收藏" v-if="!isFavor&&data.leftTreeTop!='组织维度'" />
                          <StarFilled title="取消收藏" v-if="(isFavor||data.leftTreeTop=='组织维度')" />
                        </span>
                        {{ quantity }}
                      </span> -->
                    </span>
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
              <div class="batchmaintenance-authority">
                <div class="wea-search-group  wea-show">
                  <div class="ant-row wea-title">
                    <div class="ant-col-24">
                      <div class="wea-f12 text-elli">操作类型</div>
                    </div>
                  </div>
                  <div class="ant-row wea-content center  pt15">
                    <div class="wea-form-cell-wrapper clearfix  ">
                      <div class=" wea-form-item clearfix wea-error setLineHeight ">
                        <div class="ant-row">
                          <div class="ant-col-8" style="position: static;">
                            <div title="原有设置下" class="wea-form-item-label text-elli colon" style="width: 33.3333%;">原有设置下</div>
                          </div>
                          <div class="ant-col-16">
                            <div class="wea-form-item-wrapper" style="display: table;">
                              <div class="wea-select  " id="weaSelect_3">
                                <div class="ant-radio-group">
                                  <label class="ant-radio-wrapper ant-radio-wrapper-checked">
                                    <span class="ant-radio ant-radio" :class="{'ant-radio-checked':data.setType=='1'}" @click="data.setType='1'">
                                      <input type="radio" class="ant-radio-input">
                                      <span class="ant-radio-inner"></span>
                                    </span>
                                    <span>追加</span>
                                  </label>
                                  <label class="ant-radio-wrapper">
                                    <span class="ant-radio ant-radio" :class="{'ant-radio-checked':data.setType=='2'}" @click="data.setType='2'">
                                      <input type="radio" class="ant-radio-input">
                                      <span class="ant-radio-inner"></span>
                                    </span>
                                    <span>覆盖</span>
                                  </label>
                                </div>
                                <input type="hidden" value="1">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="wea-search-group  wea-show">
                  <div class="ant-row wea-title">
                    <div class="ant-col-24">
                      <div class="wea-f12 text-elli">权限设置</div>
                    </div>
                  </div>
                  <div class="ant-row wea-content   pt15">
                    <div class="wea-form-cell-wrapper clearfix  ">
                      <div class="wea-document-engine-batch-auth">
                        <div class="ant-col-4">
                          <div class="batch-auth-oper wea-f14">
                            <div class="batch-auth-icon">
                              <img :src="require('@/assets/img/permission/share.png')">
                            </div>
                            默认共享
                          </div>
                        </div>
                        <div class="ant-col-4">
                          <div class="batch-auth-oper wea-f14">
                            <div class="batch-auth-icon">
                              <img :src="require('@/assets/img/permission/maintenance.png')">
                            </div>
                            维护权限
                          </div>
                        </div>
                        <div class="ant-col-4">
                          <div class="batch-auth-oper wea-f14">
                            <div class="batch-auth-icon">
                              <img :src="require('@/assets/img/permission/createAuth.png')">
                            </div>
                            创建权限
                          </div>
                        </div>
                        <div class="ant-col-4">
                          <div class="batch-auth-oper wea-f14">
                            <div class="batch-auth-icon">
                              <img :src="require('@/assets/img/permission/copyAuth.png')">
                            </div>
                            复制权限
                          </div>
                        </div>
                        <div class="ant-col-4">
                          <div class="batch-auth-oper wea-f14">
                            <div class="batch-auth-icon">
                              <img :src="require('@/assets/img/permission/moveAuth.png')">
                            </div>
                            移动权限
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="wea-tab">
                <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                  <a-tab-pane v-for="(item,index) in tabs" :key="index">
                    <template #tab>
                      <span>
                        {{item.lable}} <span v-if="item.count">({{item.count}})</span>
                      </span>
                    </template>
                  </a-tab-pane>
                </a-tabs>
                <div class="tabsBtn">
                 
                </div>
              </div> -->
              <!-- <list-form-search ref="searchRef" @update-height="changeHeight" @search="handleSearch" entityApiName="KbArticle" :SearchFields="SearchFields"></list-form-search>
              <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Ntable>
              </div> -->
            </div>
          </a-col>
        </a-row>
      </div>
      <NewInfo :isShow="isNew" :treeData="gData" @cancel="cancelNew" :objectTypeCode="data.queryParams.objectTypeCode" />
      <Delete :isShow="data.isDelete" :desc="data.deleteDesc" @cancel="cancelDelete" @ok="deleteOk" :sObjectName="data.queryParams.entityName" :recordId="data.recordId" :objTypeCode="data.queryParams.objectTypeCode" :external="data.external" />
      <Favor v-if='isFavor' :isShow="isFavor" @cancel="isFavor=false" @update-status="isFavor=false" :id="id" :objTypeCode="data.queryParams.objectTypeCode" :objName="''" />
    </div>
  </template>
  <script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
    ApartmentOutlined,
    SearchOutlined,
    StarOutlined,
    StarFilled
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
  import Favor from "@/components/workflow/Favor.vue";
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
  const checkedKeys = ref([]);
  const searchValue = ref("");
  const autoExpandParent = ref(true);
  const res = require("@/localData/treedata.json");
  const gData = ref([]);
  const gDataAll=ref([]);
  
  //产品维度
  const getTreeData=()=>{
    gData.value = [];
    gDataAll.value = [];
    let url=Interface.content.folder;
    proxy.$post(url,{}).then(res=>{
      if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
      }
    });
    proxy.$get(Interface.information.contentTree,{}).then((response)=>{
        let formTree = (list) => {
          list.forEach(item=>{
            if(item.children){
              formTree(item.children);
            }
            item.key = item.id;
            item.value = item.id;
            item.isFavor=item.isFavor||false;
          })
        }
        formTree(response);
        console.log("formTree",response)
        gData.value = response;
        gDataAll.value = response;
    })
  }
  getTreeData()

  //收藏目录
  const getFavorite=()=>{
    gData.value = [];
    gDataAll.value = [];
    let filterQuery='\nObjectTypeCode\teq\t5080\nOwningUser\teq\t'+data.userId;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'6060',
            entityName:'',
            //filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'CreatedOn',
            order:'DESC',
            displayColumns:'Name,ObjectId'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
              var list = [];
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                  }
                  list.push({
                    children:[],
                    id:item.id,
                    key:item.id,
                    name:item.Name,
                    parent:null,
                    quantity:0,
                    text:null,
                    value:item.ObjectId,
                    isFavor:item.isFavor||false
                  })
              }
              gData.value = list;
              gDataAll.value = list;
            }
        })
  }
  //收藏选中目录
  const setFavor = (id,name,isFavor)=>{
    if(id){
        let filterQuery='\nObjectId\teq\t'+id+'\nOwningUser\teq\t'+data.userId;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'6060',
            entityName:'P9f',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 10,
            sort:'CreatedOn',
            order:'DESC',
            displayColumns:'Name'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
                message.success("已收藏！");
            }else{
                saveFavor(id,name,isFavor);
            }
        })
    }
  }
  const saveFavor = (id,name,isFavor)=>{
    if(!isFavor){
      let url=Interface.edit;
        let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName:'FavoriteObject',
                objTypeCode: '6060',
                fields: {
                    Name:name,
                    ObjectId: id,
                    ObjectTypeCode:'5080',
                    //URL:'',
                    OwningUser:data.userId
                }
              }              
            }
        }]
    };
    // if(id){
    //     d.actions[0].params.recordId=id;
    // }
    let obj = {
        message: JSON.stringify(d)
    }
        proxy.$post(url,obj).then(res=>{
          if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
            message.success("收藏成功！");
            leftTreeTopChange(data.leftTreeTop);
          }
          else{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                message.success(res.actions[0].errorMessage);
            }
            else{
                message.success("收藏失败！");
            }
          }
        });
    }
    else{
      let obj = {
        actions: [{
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordId: id,
            apiName: 'FavoriteObject',
            objTypeCode: '6060',
          }
        }]
      };
      let d = {
        message: JSON.stringify(obj)
      };
      proxy.$post(Interface.delete, d).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
          message.success("取消收藏成功");
          leftTreeTopChange(data.leftTreeTop);
        } else {
          if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
            message.success(res.actions[0].errorMessage);
          }
          else {
            message.error("取消收藏失败");
          }
        }
      })
    }
  }
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
    setType:'1',
    leftTreeTop:'产品维度',
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
      // {
      //   lable: "部门的",
      //   count: ''
      // },
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
      objectTypeCode:'1027',
      entityName:'KbArticle',
      filterquery:'\nCreatedBy\teq-userid',
      displayColumns:'Name,Title,FolderId,StateCode,BusinessUnitId,Number,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn'
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
    userId:'',
    SearchFields:[
            {
                "column": "Title",
                "label": "标题",
                "dataType": "S",
                "ReferencedEntityObjectTypeCode": 0,
                "sObjectName": "",
                "targetApiName": "",
            },
            // {
            //     "column": "BusinessUnitId",
            //     "label": "部门",
            //     "dataType": "O",
            //     "ReferencedEntityObjectTypeCode": 10,
            //     "picklistValues": [],
            //     "sObjectName": "BusinessUnit",
            //     "targetApiName": "BusinessUnit",
            // },
            {
                "column": "Number",
                "label": "编号",
                "dataType": "S",
                "ReferencedEntityObjectTypeCode": 0,
                "sObjectName": "",
                "targetApiName": "",
            },
            {
                "column": "StatusCode",
                "label": "状态",
                "dataType": "L",
                "ReferencedEntityObjectTypeCode": 127,
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
            },
            {
                "column": "CreatedBy",
                "label": "创建人",
                "dataType": "O",
                "ReferencedEntityObjectTypeCode": 8,
                "picklistValues": [],
                "sObjectName": "",
                "targetApiName": "",
            }
        ],
        isFavor:false,
        id:''
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { setType,isFavor,id,isCollapsed, userId,tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, isNew, value,searchVal,SearchFields,leftTreeTop} = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  const leftTreeTopChange= (e) => {
    if(e=='产品维度'){
      getTreeData();
    }
    else{
      getFavorite();
    }
    //console.log(e)
  }
  const onSearch = (e) => {
    gData.value = gDataAll.value.filter(item=>{
      return item.name.indexOf(data.searchVal) !== -1;
    })
  }
  const onSelect = (keys) => {
    gridRef.value.loadGrid(data.queryParams);
  };
  onMounted(()=>{
    let userInfo=window.localStorage.getItem('userInfo');
    if(userInfo){
        userInfo=JSON.parse(userInfo);
        data.userId=userInfo.userId;
    }
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
        //data.queryParams.filterquery='\nBusinessUnitId\teq-businessunitid';
        data.queryParams.filterquery='';
      }else if(data.activeKey==2){
        data.queryParams.filterquery='';
      }else if(data.activeKey==3){

      }
    //gridRef.value.loadGrid(data.queryParams);
  }
  const handleSearch=(filterquery)=>{
      if(data.activeKey==0){
        data.queryParams.filterquery='\nCreatedBy\teq-userid';
      }else if(data.activeKey==1){
        //data.queryParams.filterquery='\nBusinessUnitId\teq-businessunitid';
        data.queryParams.filterquery='';
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
    proxy.$get(Interface.PermissionWrap.tabs,{
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
            objectTypeCode:'127'
          }
      })
      window.open(reUrl.href); 
  }
  function handlePreview(id) {
    // router.push({
    //     path:"/lightning/r/Content/view",
    //     query: {
    //       id: id,
    //       objectTypeCode:'127'
    //     }
    // });
    let reUrl = router.resolve({
        path:"/lightning/r/Content/view",
        query: {
          id: id,
          objectTypeCode:'127'
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
                objectTypeCode: 127,
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
                    <div class="option-item" onclick="handlePreview('${row.id}')">查看详情</div>  
                    <div class="option-item" onclick="handleEdit('${row.id}','${row.FolderId?row.FolderId.lookupValue.value:''}')">编辑</div>  
                    <div class="option-item" onclick="handleDelete('${row.id}')">删除</div>
                  </div>
                  <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
              `
              return str;
            }
        },
        { field: 'Name', title: '标题', sortable: true,
          formatter: function formatter(value, row, index) {
              let val=girdFormatterValue('Name',row);
              return '<a style="text-decoration: none;color:#1677ff;" href="/#'+row.viewUrl+'" target="_blank">'+val+'</a>';
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
        //data.queryParams.filterquery='\nBusinessUnitId\teq-businessunitid';
        data.queryParams.filterquery='';
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
    //收藏
  const handleFavor = (id) => {
    data.isFavor=true;
  }
  </script>
  <style lang="less" scoped>
  .PermissionWrap {
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
          font-size: 18px !important;
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
              :deep .ant-input{
                border:none !important;
              }
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
              :deep .ant-tree {
                .ant-tree-checkbox{
                  margin: 0;
                  margin-right: 3px;
                }
                .ant-tree-checkbox+span{
                  line-height: 30px;
                }
                .ant-tree-switcher{
                  position: relative;
                  top: 2px;
                }
              }
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
                  position: relative;
                  color: rgb(197, 197, 197);
                  .tree-favor{
                    position: absolute;
                    left: -20px;
                    top:1px;
                    width: 14px;
                    height: 14px;
                    color: rgb(197, 197, 197);
                    display: none;
                  }
                  .tree-favor-active{
                    color: #ffa741;
                  }
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
.PermissionWrap{
  .headerBar .headerLeft .icon-circle-base{
    background: rgb(223, 88, 58);
  }
  .alltype{
    padding-left:0 !important;
    min-width: 60px !important;
  }
  .wea-left-tree-select{
    position: relative;
    .ant-select{
      width: 100%;
      :deep .ant-select-selector{
        border-radius: 0 !important;
        border:0 !important;
        border-bottom: 1px solid #dedede !important;
        height: 46px;
        line-height: 46px;
        display: block;
        padding-left: 35px;
        border-color:#dedede !important;
        box-shadow: none !important;
        .ant-select-selection-item{
          font-size: 13px;
          color: #494949;
        }
      }
    }
    .wea-left-tree-select-icon{
      color: #494949;
      position: absolute;
      left: 12px;
      top: 13px;
      z-index: 1;
    }
  }
  .wea-left-tree-search{
    margin-top: 3px;
    position: relative;
    .wea-left-tree-search-icon{
      color: #bbb;
      position: absolute;
      right: 21px;
      top: 1px;
      z-index: 1;
    }
  }
  .wea-left-tree-scroll{
      height: calc(~'100% - 60px') !important;
    }
    :deep .ant-tabs .ant-tabs-tab{
      padding: 12px 24px !important;
      margin-right: 6px !important;
    }
    :deep .anticon-close-circle{
      right: 14px !important;
      position: relative !important;
    }
    .batchmaintenance-authority{
      .wea-show {
        display: block;
      }
      .wea-search-group {
          padding-left: 25px;
          padding-right: 25px;
      }
      .ant-row {
          position: relative;
          margin-left: 0;
          margin-right: 0;
          height: auto;
          zoom: 1;
          display: block;
      }
      .wea-search-group .wea-title {
          color: #484848;
          padding-left: 10px;
          border-bottom: 1px solid #ebebeb;
          line-height: 45px;
      }
      .ant-row:after, .ant-row:before {
          content: " ";
          display: table;
      }
      .ant-col-24 {
          display: block;
          width: 100%;
          float: left;
      }
      .text-elli {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
}
.wea-f12 {
    font-size: 12px !important;
}
.ant-row:after {
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
}
.wea-search-group .wea-content{
  padding: 8px 0;
  -webkit-transition: height .2s cubic-bezier(.215,.61,.355,1);
  -o-transition: height .2s cubic-bezier(.215, .61, .355, 1);
  transition: height .2s cubic-bezier(.215,.61,.355,1);
  text-align: center;
  padding-top: 8px;
}
.wea-search-group .wea-content.center .wea-form-cell-wrapper {
        width: 640px;
        display: inline-block;
    }
    .clearfix {
    zoom: 1;
}
.clearfix:after, .clearfix:before {
    content: " ";
    display: table;
}
.wea-form-item {
    font-size: 12px;
    color: #333;
    position: relative;
    min-height: 32px;
}
.wea-error {
    position: relative;
}
.wea-search-group .wea-form-item {
    min-height: 30px;
    padding-top: 8px;
    padding-bottom: 8px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}
.wea-search-group .wea-content.center .wea-form-item {
    padding-left: 0;
    text-align: left;
}
.ant-col-1, .ant-col-2, .ant-col-3, .ant-col-4, .ant-col-5, .ant-col-6, .ant-col-7, .ant-col-8, .ant-col-9, .ant-col-10, .ant-col-11, .ant-col-12, .ant-col-13, .ant-col-14, .ant-col-15, .ant-col-16, .ant-col-17, .ant-col-18, .ant-col-19, .ant-col-20, .ant-col-21, .ant-col-22, .ant-col-23, .ant-col-24{
  float: left;
}
.ant-col-8{
    position: relative;
    min-height: 1px;
    padding-left: 0;
    padding-right: 0;
    display: block;
    width: 33.33333333%;
    position: static;
}
.wea-form-item .wea-form-item-label {
    padding-right: 5px;
    position: absolute;
}
.wea-form-item.setLineHeight .wea-form-item-label {
    line-height: 30px;
}
.wea-form-item.setLineHeight .wea-form-item-label {
    line-height: 30px;
}
.wea-form-item .wea-form-item-label.colon:after {
    content: ":";
    margin: 0 8px 0 2px;
    position: relative;
    top: -.5px;
}
.ant-col-16 {
    display: block;
    width: 66.66666667%;
}
.wea-form-item .wea-form-item-wrapper {
    position: relative;
    zoom: 1;
    min-height: 30px;
    display: table;
    width: 100%;
}
.wea-select {
    position: relative;
    max-width: 100%;
    display: inline-block;
}
.wea-form-item .wea-select, .wea-search-group .wea-select {
    width: 100%;
}
.wea-form-item .wea-form-item-wrapper .wea-select .ant-radio-group {
    padding-top: 4px;
    padding-bottom: 3px;
    display: inline-block;
}
.ant-radio {
    white-space: nowrap;
    outline: none;
    display: inline-block;
    position: relative;
    line-height: 1;
    vertical-align: middle;
    cursor: pointer;
    padding-top: 2px;
    padding-right: 6px;
}
.ant-radio-wrapper>span {
    display: table-cell;
}
.ant-radio-input {
    position: absolute;
    left: 0;
    z-index: 1;
    cursor: pointer;
    opacity: 0;
    top: 0;
    bottom: 0;
    right: 0;
}
input[type=checkbox], input[type=radio] {
    line-height: normal;
}
.ant-radio-inner {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    border: 1px solid #969696;
    background-color: #fff;
}
.ant-radio-inner, .ant-radio-inner:after {
    -webkit-transition: all .2s cubic-bezier(.78,.14,.15,.86);
    -o-transition: all .2s cubic-bezier(.78, .14, .15, .86);
    transition: all .2s cubic-bezier(.78,.14,.15,.86);
}
.ant-radio-checked .ant-radio-inner {
    border-color: #969696;
}
.ant-radio-inner:after {
    position: absolute;
    width: 6px;
    height: 6px;
    left: 3px;
    top: 3px;
    border-radius: 6px;
    display: table;
    border-top: 0;
    border-left: 0;
    content: " ";
    background-color: #2db7f5;
    opacity: 0;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
}
.ant-radio-checked .ant-radio-inner:after {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
    -webkit-transition: all .2s cubic-bezier(.78,.14,.15,.86);
    -o-transition: all .2s cubic-bezier(.78, .14, .15, .86);
    transition: all .2s cubic-bezier(.78,.14,.15,.86);
}
.ant-radio-wrapper>span {
    display: table-cell;
}
span.ant-radio+* {
    margin-left: 3px;
}
.wea-show {
    display: block;
}
.wea-search-group .wea-title {
    color: #484848;
    padding-left: 10px;
    border-bottom: 1px solid #ebebeb;
    line-height: 45px;
}
.ant-col-24 {
    display: block;
    width: 100%;
}
.wea-f12 {
    font-size: 12px !important;
}
.wea-search-group .wea-content.pt15 {
    padding-top: 8px;
}
.wea-document-engine-batch-auth {
    height: 180px;
    padding-left: 8.3333%;
    // display: flex;
    // justify-content: center;
}
.ant-col-4 {
    display: block;
    width: 198px;
}
.wea-document-engine-batch-auth .ant-col-4 {
    padding: 12px;
    height: 100%;
}
.wea-f14 {
    font-size: 14px !important;
}
.wea-document-engine-batch-auth .batch-auth-oper {
    height: 100%;
    width: 100%;
    border: 1px solid #e2e2e2;
    text-align: center;
    color: #333;
    cursor: pointer;
}
.wea-document-engine-batch-auth .batch-auth-oper .batch-auth-icon {
    font-size: 50px;
    padding-top: 24px;
}
img{
  vertical-align: middle;
}
.ant-radio-wrapper {
    vertical-align: middle;
    position: relative;
    white-space: nowrap;
    margin-right: 16px;
}
    }
}
:deep .ant-tree-treenode:hover .tree-favor{
    display: block !important;
}
.headerRight .btn-drop {
    font-size: 18px !important;
    cursor: pointer;
}
  </style>
  