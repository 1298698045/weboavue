<template>
    <div class="NewKbArticleWrap">
      <div class="headerBar">
          <div class="headerLeft">
              <div class="icon-circle-base">
                <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
              </div>
              <span class="headerTitle">新建知识文章</span>
          </div>
          <div class="headerRight">
            <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
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
              <div class="wea-left-tree-select">
                <div class="wea-left-tree-select-icon">
                  <ApartmentOutlined />
                </div>
                <a-select v-model:value="data.leftTreeTop" @change="leftTreeTopChange">
                  <a-select-option key="0" value="我的收藏">我的收藏</a-select-option>
                  <a-select-option key="1" value="全部目录">全部目录</a-select-option>
                </a-select>
              </div>
              <div class="wea-left-tree-search">
                <span class="wea-left-tree-search-label alltype">搜索目录</span>
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
                  :style="{height: tableHeight+'px'}"
                  :expanded-keys="expandedKeys"
                  :auto-expand-parent="autoExpandParent"
                  :tree-data="gData"
                  block-node
                  :fieldNames="fieldNames"
                  :selectedKeys="[data.SelectKey]"
                  @select="onSelect"
                  @expand="onExpand"
                >
                  <template #switcherIcon="{ switcherCls }">
                    <CaretDownOutlined
                      :class="switcherCls"
                      style="color: rgb(163, 163, 163); font-size: 14px"
                    ></CaretDownOutlined>
                  </template>
                  <template  #title="{ id,name,quantity,isFavor }">
                    
                    <a-dropdown :trigger="['contextmenu']">
                      <span>
                            {{ name }}
                            <span class="tree-num">
                              <span class="tree-favor" :class="{'tree-favor-active':isFavor||data.leftTreeTop=='我的收藏'}" @click.stop="setFavor(id,name,quantity,isFavor)">
                                <StarOutlined title="收藏" v-if="!isFavor&&data.leftTreeTop!='我的收藏'" />
                                <StarFilled title="取消收藏" v-if="(isFavor||data.leftTreeTop=='我的收藏')" />
                              </span>
                            </span>
                          </span>
                    </a-dropdown>
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
                 <div class="head-right-content">
                      <div class="head-right-btn" @click="tofolder('','')" title="全部">
                        <HomeOutlined />
                      </div>
                      <div class="head-right-breadcrumb">
                        <a-breadcrumb>
                          <a-breadcrumb-item><a href="javascript:void(0)" @click="tofolder('','')">全部</a></a-breadcrumb-item>
                          <a-breadcrumb-item v-for="(item,index) in BreadCrumbList" :key="index"><a href="javascript:void(0)" @click="tofolder(item.id,item.name)">{{item.name||''}}</a></a-breadcrumb-item>
                        </a-breadcrumb>
                      </div>
                  </div>
              </div>
              <div class="wea-tabContent">
                    <div class="add-addcontentplus" @click="handleNew" v-if="data.SelectKey">
                      <PlusOutlined />
                    </div>
                    <div class="content-item" v-for="(item,index) in FolderList" :key="index" @click="tofolder(item.id,item.Name)">
                        <img :src="require('@/assets/img/knowledge/file.png')" />
                        <div class="add-addtext">{{item.Name}}</div>
                    </div>
                    <div class="content-item" v-for="(item,index) in FileList" :key="index" @click="handlePreview(item.id)">
                        <img :src="require('@/assets/img/filetype/doc.png')" />
                        <div class="add-addtext">{{item.Name}}</div>
                    </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <NewInfo v-if="isNew" :isShow="isNew" :treeData="gData" @cancel="cancelNew" :objectTypeCode="data.queryParams.objectTypeCode" :FolderId="data.SelectKey" />
      <Delete v-if="data.isDelete" :isShow="data.isDelete" :desc="data.deleteDesc" @cancel="cancelDelete" @ok="deleteOk" :sObjectName="sObjectName" :recordId="data.recordId" :objTypeCode="objectTypeCode" :external="data.external" />
      <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon=false" :title="data.recordId?'编辑':'新建'" @success="deleteOk" :id="data.recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" :relatedObjectAttributeValue="relatedObjectAttributeValue" :relatedObjectAttributeName="relatedObjectAttributeName"></common-form-modal>
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
    StarFilled,
    HomeOutlined,
    PlusOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";
  import Interface from "@/utils/Interface.js";
  import { message } from "ant-design-vue";
  import Ntable from "@/components/Ntable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  import { girdFormatterValue,formTreeData } from "@/utils/common.js";
  const route = useRoute();
  const router = useRouter();
  import NewInfo from "@/components/information/NewInfo.vue";
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  import Delete from "@/components/listView/Delete.vue";
  const { proxy } = getCurrentInstance();
  const genData = [];
  
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
  const getParents=(arr1,id)=>{
    var temp = []
    var forFn = function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i]
          if (item.id === id) {
            forFn(arr1, item.pid)
            temp.push(item)
            break
          } 
          else {
            if (item.children) {
              forFn(item.children, id)
            }
          }
        }
    }
    forFn(arr1, id)
    return temp
  }
  const expandedKeys = ref([]);
  const searchValue = ref("");
  const autoExpandParent = ref(true);
  const res = require("@/localData/treedata.json");
  const gData = ref([]);
  const gDataAll=ref([]);
  
  //全部目录
  const getTreeData=()=>{
    gData.value = [];
    gDataAll.value = [];
    let filterQuery='';
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'100310',
            entityName:'KbSubject',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'DisplayOrder',
            order:'asc',
            displayColumns:'Name,ParentSubject,DisplayOrder'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
              var list = [];
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'&&cell!='ParentSubject'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                      if(cell=='ParentSubject'){
                        item[cell]=item[cell].lookupValue.value;
                      }
                  }
                  list.push({
                    children:[],
                    id:item.id,
                    pid:item.ParentSubject,
                    key:item.id,
                    name:item.Name,
                    parent:null,
                    quantity:0,
                    text:null,
                    value:item.id,
                    isFavor:item.isFavor||false
                  })
              }
              gData.value = formTreeData(list, 'id', 'pid');
              gDataAll.value = list;
              //console.log(gData.value,11111111)
            }
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
            filterQuery:filterQuery,
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
    expandedKeys.value = keys
    //autoExpandParent.value = false;
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
    leftTreeTop:'全部目录',
    isCollapsed: false,
    tableHeight: '',
    fieldNames:{
      children:'children', title:'name', key:'id'
    },
    queryParams: {
      filterId:'',
      objectTypeCode:'100311',
      entityName:'KbSubjectContent',
      filterQuery:'\nCreatedBy\teq-userid',
      displayColumns:'Name,ContentId,SubjectId,DisplayOrder,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn',
      sort:'DisplayOrder',
      order:'asc',
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
    isCommon:false,
    objectTypeCode:'100311',
    sObjectName:'KbSubjectContent',
    relatedObjectAttributeValue:{},
    relatedObjectAttributeName:'',
    SelectKey:'',
    SelectName:'',
    FolderList:[],
    FileList:[],
    ParentSubject:'',
    BreadCrumbList:[]
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { BreadCrumbList,ParentSubject,FolderList,FileList,SelectName,SelectKey,relatedObjectAttributeValue,relatedObjectAttributeName,recordId,objectTypeCode,sObjectName,isCommon,isCollapsed, userId,tableHeight, fieldNames, tabs, isModal, isCirculation, isNew, value,searchVal,leftTreeTop} = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  const leftTreeTopChange= (e) => {
    if(e=='全部目录'){
      getTreeData();
    }
    else{
      getFavorite();
    }
  }
  const formTree = (list) => {
        list.forEach(item=>{
            if(item.children){
            formTree(item.children);
            }
            item.children=[];
            item.id=item.id;
            item.key=item.id;
            item.text=item.name;
        })
        return list
    }
  const onSearch = (e) => {
    gData.value=[];
    let list =[];
    if(data.searchVal){
      list = gDataAll.value.filter(item=>{
        return item.name.indexOf(data.searchVal) != -1;
      })
    }
    else{
      list = gDataAll.value;
    }
    list=formTree(list);
    gData.value = formTreeData(list, 'id', 'pid');
  }
  const onSelect = (keys,{node}) => {
    expandedKeys.value=keys;
    if(keys&&keys.length){
      data.SelectKey=node.id;
      data.SelectName=node.name;
      tofolder(node.id,node.name)
    }
  };
  onMounted(()=>{
    let userInfo=window.localStorage.getItem('userInfo');
    if(userInfo){
        userInfo=JSON.parse(userInfo);
        data.userId=userInfo.userId;
    }
    window.addEventListener('resize',changeHeight)
    tofolder('','')
  })
  function changeHeight(h){
    if(typeof h == 'number'){
      formSearchHeight.value = h;
    }
    let contentHeight = document.documentElement.clientHeight;
    let tabsHeight = 46;
    let height = contentHeight - tabsHeight - formSearchHeight.value;
    data.tableHeight = height;
    console.log('data',data.tableHeight);

  }

  
  function handlePreview(id) {
    let reUrl = router.resolve({
        path:"/lightning/page/KnowledgeMapDetail",
        query: {
          id: id,
          SubjectId:data.ParentSubject
        }
    })
    window.open(reUrl.href); 
  }
  function handleEdit(id){
    data.relatedObjectAttributeValue={};
    data.relatedObjectAttributeName='';
    data.objectTypeCode='100311';
    data.sObjectName='KbSubjectContent';
    data.recordId=id;
    data.isCommon = true;
  }
  function handleEditContent(id){
    let reUrl = router.resolve({
            name: "visualEditor",
            query: {
                id: id,
                objectTypeCode: 100201,
            }
        })
    window.open(reUrl.href); 
  }
  function handleDelete(id){
    data.relatedObjectAttributeValue={};
    data.relatedObjectAttributeName='';
    data.objectTypeCode='100311';
    data.sObjectName='KbSubjectContent';
    data.recordId=id;
    data.isDelete = true;
  }
const deleteOk = (e) => {
  if(data.objectTypeCode=='100311'){
    gridRef.value.loadGrid(data.queryParams);
  }
  else{
    getTreeData();
  }
};
const cancelDelete = (e) => {
  data.isDelete = false;
};
  
  window.handlePreview = handlePreview;
  window.handleEdit = handleEdit;
  window.handleEditContent = handleEditContent;
  window.handleDelete = handleDelete;
  window.data = data;

    const handleNew = (e) => {
      if(data.SelectKey){
        data.relatedObjectAttributeValue={};
        data.relatedObjectAttributeName='';
        data.objectTypeCode='100311';
        data.sObjectName='KbSubjectContent';
        data.recordId='';
        data.isNew = true;
      }
      else{
          message.error("必须先选中左侧目录");
      }
    }
    const cancelNew = (e) => {
      data.isNew = e;
    }
    const handleAddLeft = (e,name) => {
      data.relatedObjectAttributeValue={
        value:e,
        name:name
      };
      data.relatedObjectAttributeName='ParentId';
      data.objectTypeCode='5080';
      data.sObjectName='ContentFolder';
      data.recordId='';
      data.isCommon=true;
    }
    const handleEditLeft = (e) => {
      data.relatedObjectAttributeValue={};
      data.relatedObjectAttributeName='';
      data.objectTypeCode='5080';
      data.sObjectName='ContentFolder';
      data.recordId=e;
      data.isCommon=true;
    }
    const handleDeleteLeft = (e) => {
      data.relatedObjectAttributeValue={};
      data.relatedObjectAttributeName='';
      data.objectTypeCode='5080';
      data.sObjectName='ContentFolder';
      data.recordId=e;
      data.isDelete=true;
    }

    const tofolder = (id,name) => {
      CreatedBreadCrumb(id);
      data.FolderList=[];
      data.FileList=[];
      let filterQuery='';
      if(id){
        filterQuery='\nParentSubject\teq\t'+id;
        data.SelectKey=id;
        data.SelectName=name;
        expandedKeys.value=[id];
      }
      else{
        filterQuery='\nParentSubject\tnull';
        data.ParentSubject='';
        data.SelectKey='';
      }
      proxy.$post(Interface.list2, {
          filterId:'',
          objectTypeCode:'100310',
          entityName:'KbSubject',
          filterQuery:filterQuery,
          search:'',
          page: 1,
          rows: 100,
          sort:'DisplayOrder',
          order:'ASC',
          displayColumns:'Name,ParentSubject,Description'
      }).then(res => {
          var list = [];
          if(res&&res.nodes&&res.nodes.length){
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='ParentSubject'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='ParentSubject'){
                      item[cell]=item[cell].lookupValue.value;
                    }
                }
                list.push(item);
            }
          }
          data.FolderList = list;
          if(id){
            getArticle(id);
          }
      })
    };
const getArticle=(id)=>{
    data.FileList = [];
    let filterQuery='\nSubjectId\teq\t'+id;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'100311',
            entityName:'KbSubjectContent',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'DisplayOrder',
            order:'asc',
            displayColumns:'Name'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
              var list = [];
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'&&cell!='ContentId'&&cell!='SubjectId'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                      // if(cell=='ContentId'||cell=='SubjectId'){
                      //   item[cell+'Value']=item[cell].lookupValue.value;
                      //   item[cell]=girdFormatterValue(cell,item);
                      // }
                      // if(cell=='CreatedOn'||cell=='ModifiedOn'){
                      //     item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                      // }
                  }
                  list.push(item)
              }
              data.FileList = list;
            }
        })
  }
  const CreatedBreadCrumb=(id)=>{
    if(id){
      data.BreadCrumbList=getParents(gData.value,id);
      if(data.BreadCrumbList&&data.BreadCrumbList.length){
        data.ParentSubject=data.BreadCrumbList[0].id;
      }
      else{
        data.ParentSubject=id;
      }
    }
    else{
      data.BreadCrumbList=[];
    }
  }
  watch(() => route, (newVal, oldVal) => {
    if (route.path == '/lightning/page/article/new') {
      tofolder('','')
    }
  }, { deep: true, immediate: true })
  </script>
  <style lang="less" scoped>
  .NewKbArticleWrap {
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
              height: calc(~'100% - 128px') !important;
              overflow: auto;
              :deep .ant-tree{
                height: 100% !important;
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
                    color: #aaa;
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
        .wea-tabContent {
          height: calc(~"100% - 40px");
        }
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
.NewKbArticleWrap{
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
      height: calc(~'100% - 100px') !important;
    }
    :deep .ant-tabs .ant-tabs-tab{
      padding: 12px 24px !important;
      margin-right: 6px !important;
    }
    :deep .anticon-close-circle{
      right: 14px !important;
      position: relative !important;
    }
    .head-right-content{
      display: flex;
      .head-right-btn{
        position: relative;
        top: 2px;
        margin-right: 6px;
        left: -3px;
        cursor: pointer;
        color:rgba(0, 0, 0, 0.45);
      }
      .head-right-btn:hover{
        color:#494949;
      }
    }
    .wea-tabContent{
      overflow: auto;
      .add-addcontentplus {
          color: #108def;
          width: 100px;
          height: 100px;
          text-align: center;
          line-height: 110px;
          border: 1px dashed #dedede;
          margin: 30px;
          float: left;
          cursor: pointer;
          margin-left: 40px;
          margin-top: 40px;
      }
      .add-addcontentplus .anticon-plus{
        font-size: 32px;
      }
      .content-item {
          font-size: 12px;
          float: left;
          text-align: center;
          margin: 10px;
          border: 1px solid #fff;
          border-color: transparent;
          padding: 30px 30px;
          width: 144px;
          cursor: pointer;
      }
      .content-item img {
          width: 80px;
      }
      .add-addtext {
          margin-top: 5px;
          white-space: nowrap;
          position: relative;
          width: 128px;
          left: -24px;
          overflow: hidden;
          text-overflow: ellipsis;
      }
    }
    .ant-tree .ant-tree-switcher .ant-tree-switcher-icon{
        position: relative;
        top: 2px;
    }
}
:deep .ant-tree-treenode:hover .tree-favor{
    display: block !important;
}
  </style>
  