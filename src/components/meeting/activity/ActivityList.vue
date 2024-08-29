<template>
    <div class="todoList documentAdmin">
      <div class="todo-content">
        <a-row>
          <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
            <div style="height: 100%" ref="contentRef">
              <div class="wea-tab">
                <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                  <a-tab-pane v-for="(item,index) in data.tabs" :key="index">
                    <template #tab>
                      <span>
                        {{item.label}}
                      </span>
                    </template>
                  </a-tab-pane>
                </a-tabs>
                <div class="tabsBtn">
                  <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
                    <a-button type="primary" class="ml10">批量发布</a-button>
                    <a-button class="ml10">批量取消发布</a-button> -->
                </div>
              </div>
              <list-form-search ref="searchRef" @search="handleSearch" :entityApiName="data.queryParams.entityName" :SearchFields="SearchFields"
                @update-height="changeHeight"></list-form-search>
              <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Ntable>
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
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated,nextTick,defineProps } from "vue";
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    // import Dtable from "@/components/Dtable.vue";
    import Ntable from "@/components/Ntable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
  
    import { useRouter, useRoute } from "vue-router";
    import useWorkAdmin from "@/utils/flow/workAdmin";
    import { formTreeData,girdFormatterValue } from "@/utils/common.js";
    const { tabList } = useWorkAdmin();
    //console.log("tabList", tabList);
    const route = useRoute();
    const router = useRouter();
  
    const x = 3;
    const y = 2;
    const z = 1;
    const { proxy } = getCurrentInstance();
    const props = defineProps({
      layoutName: String,
    });
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
    const formTree = (list) => {
        list.forEach(item=>{
            if(item.children){
            formTree(item.children);
            }
            item.children=[];
            item.id=item.businessUnitId;
            item.key=item.businessUnitId;
            item.text=item.name;
        })
        return list
    }
    // 组织结构
    const getDeptTreeData = () => {
        proxy.$get(Interface.deptTree, {
        }).then(res => {
            let list=[];
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                list=res.actions[0].returnValue;
            }else{return false}
            list=formTree(list);   
            gData.value = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
            gDataAll.value = list;
        })
    }
   
    const onExpand = (keys) => {
      expandedKeys.value = keys;
      autoExpandParent.value = false;
    };
   
    let data = reactive({
      isCollapsed: true,
      tableHeight: '',
      fieldNames: {
        children: 'children', title: 'name', key: 'id'
      },
      tabs:[],
      activeKey: 0,
      queryParams: {
        filterId:'',
        objectTypeCode:'4400',
        entityName:'Campaign',
        filterQuery:'',
        //filterQuery:'\nCreatedBy\teq-userid',
        //displayColumns:'',
        sort:'CreatedOn',
        order:'desc'
      },
      entityType:'701',
      isModal: false,
      searchVal: "",
      treeId: "",
      id: "",
      formSearchFilterquery:"",
      SearchFields:[],
      isAddSchedule:false
    });
    const handleCollapsed = () => {
      data.isCollapsed = !data.isCollapsed;
      changeHeight();
    };
  
    const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, searchVal,
      treeId, id, SearchFields,isAddSchedule } = toRefs(data);
    const tabContent = ref(null);
    const contentRef = ref(null);
    const searchRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    const onSearch = (e) => {
        let list = gDataAll.value.filter(item=>{
            return item.text.indexOf(data.searchVal) !== -1;
        })
        list=formTree(list);
        gData.value = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
    }
    const onSelect = (keys) => {
      data.treeId=keys[0];
      handleSearch(data.formSearchFilterquery);
    };
    onMounted(() => {
      window.addEventListener('resize', changeHeight)
      // this.$nextTick(()=>{
      //   getTabs();
      // })
      getTabs();
    })
    function changeHeight(h) {
      if (typeof h == 'number') {
        formSearchHeight.value = h;
      }
      let contentHeight = contentRef.value.clientHeight;
      let tabsHeight = 46;
      let height = contentHeight - formSearchHeight.value;
      data.tableHeight = height-46;
      //console.log('data', data.tableHeight);
      //console.log("gridRef", gridRef.value.loadGrid())
      //handleSearch();
    }
    const handleSearch=(filterquery)=>{
        data.queryParams.filterQuery='';
        //data.queryParams.filterQuery='\nCreatedBy\teq-userid';
        data.formSearchFilterquery=filterquery;
        if(filterquery){
          data.queryParams.filterQuery+=filterquery;
        }
        if(data.treeId){
          data.queryParams.filterQuery+='\nOwningBusinessUnit\tin\t'+data.treeId;
        }
        gridRef.value.loadGrid(data.queryParams);
    }
    //获取显示列
  const getColumns = (id) => {
    let columnslist=[{
            field: 'ids',
            checkbox: true
          },
        ];
    proxy.$get(Interface.listView.getFilterInfo, {
      entityType: data.entityType,
      objectTypeCode: data.queryParams.objectTypeCode,
      search: "",
      filterId: id
    }).then(res => {
      if(res&&res.actions&&res.actions[0]){}else{return}
      let fields = res.actions[0].returnValue.fields;
      fields.forEach(item => {
        if(item.name){
          columnslist.push({
            field: item.name,
            title: item.label,
            sortable: true,
            formatter: function formatter(value, row, index) {
              return girdFormatterValue(item.name,row);
            }
          });
        }
      })
      columns.value=columnslist;
      nextTick(()=>{
        gridRef.value.loadGrid(data.queryParams);
        searchRef.value.getSearchLayout();
      })
      
    })
  }
  
    // 获取tabs
    const getTabs = () => {
      proxy.$get(Interface.getTabs, {
        entityName:data.queryParams.entityName,
        layoutName:props.layoutName
      }).then(res => {
        //console.log("tabs", res)
        if(res&&res.tabs&&res.tabs.length){
          let list=res.tabs;
          list.forEach(item => {
            item.label = item.title;
            item.filterId = item.filter.filterId;
            item.filterquery=item.filterquery||'';
          })
          data.tabs = list;
        }
        else{
          //data.tabs=[];
        }
  
        let filterColumnsList=(data.tabs)[0].filterableColumns;
        data.SearchFields=filterColumnsList;
        data.queryParams.filterId=data.tabs[0].filterId||'';
        getColumns(data.queryParams.filterId);
      })
    }
    // getTabs();
  
    const handleMenuClick = () => {
  
    }
  
    function handleTo(id) {
      router.push({
        path: "/detail",
        query: {
          id: id,
          objectTypeCode:data.queryParams.objectTypeCode
        }
      });
    }
    
    window.data = data;
    const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.list2);
    
    const columns = ref([]);
    const changeTab = (e) => {
        data.activeKey = e;
        data.queryParams.filterQuery='';
        //data.queryParams.filterQuery='\nCreatedBy\teq-userid';
        let filterColumnsList=(data.tabs)[e].filterableColumns;
        data.SearchFields=filterColumnsList;
        data.queryParams.filterId=data.tabs[e].filterId||'';
        if(data.formSearchFilterquery){
          data.queryParams.filterQuery+=data.formSearchFilterquery;
        }
        if(data.treeId){
          data.queryParams.filterQuery+='\nOwningBusinessUnit\tin\t'+data.treeId;
        }
        getColumns(data.queryParams.filterId);
    }
    
  </script>
  <style lang="less">
    @import "@/style/flow/treeList.less";
  </style>
  <style scoped lang="less">
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
    .documentAdmin{
        .todo-content{
          height: calc(~'100% - 0px');
        }
        .todo-content .ant-row .wea-left-right-layout-left .wea-left-tree .wea-left-tree-search{
            padding-left: 14px;
        }
        :where(.css-dev-only-do-not-override-kqecok).ant-col-5 {
            max-width:unset !important;
            width: 220px !important;
            flex: unset;
        }
        :where(.css-dev-only-do-not-override-kqecok).ant-col-19{
            max-width:100% !important;
            flex: 1;
        }
        :where(.css-dev-only-do-not-override-kqecok).ant-input{
          border-color: #d9d9d9;
        }
        .ant-row .wea-left-right-layout-left .wea-left-tree .wea-left-tree-scroll .ant-tree-treenode:hover .tree-num{
            display: none;
        }
        .formSearch .ant-form .ant-form-item.formTime .ant-picker {
            width: 200px !important;
            padding: 4px 5px 4px 5px !important;
        }
        :deep .ant-input{
          max-width: 130px !important;
          min-width: 110px !important;
        }
        :deep .ant-select{
          max-width: 130px !important;
          min-width: 110px !important;
          width: auto;
        }
        .formSearch :deep .ant-form .ant-form-item{
          width: auto !important;
        }
    }
  </style>