<template>
  <div class="todoList documentAdmin">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
        </div>
        <span class="headerTitle">发文管理</span>
      </div>
      <div class="headerRight">
        <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button> -->
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <a-input-search v-model:value="data.searchVal" placeholder="" @search="onSearch" />
            </div>
            <div class="wea-left-tree-scroll">
              <a-tree :style="{height: tableHeight+'px'}" :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames"
                @select="onSelect"
                @expand="onExpand">
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                  </CaretDownOutlined>
                </template>
                <template v-slot:title="{ name, data, isLeaf, text, quantity }">
                  <!-- <span v-if="name.indexOf(searchValue) > -1">
                    {{ name.substr(0, name.indexOf(searchValue)) }}
                    {{
                    name.substr(
                    name.indexOf(searchValue) + searchValue.length
                    )
                    }}
                    <span class="tree-num">{{ quantity }}</span>
                  </span>
                  <span v-else>{{ name }}</span> -->
                  <span>{{ name }}<span class="tree-num">{{ quantity }}</span></span>
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
                <a-tab-pane v-for="(item,index) in data.tabs" :key="index">
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
            <list-form-search ref="searchRef" @search="handleSearch" entityApiName="OfficialDocumentOut" :SearchFields="SearchFields"
              @update-height="changeHeight"></list-form-search>
            <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
              <!-- <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable> -->
              <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Ntable>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 委派 -->
    <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal"
      v-if="isModal" />
    <!-- 跳转 -->
    <Jump v-if="isJump" :isShow="isJump" :paramsData="jumpData.params" @update-status="isJump=false" />
    <!-- 加签 -->
    <Countersign v-if="isCountersign" :isShow="isCountersign" :paramsData="CountersignData.params"
      @update-status="isCountersign=false" />
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
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated,nextTick } from "vue";
  import Interface from "@/utils/Interface.js";
  import { message } from "ant-design-vue";
  // import Dtable from "@/components/Dtable.vue";
  import Ntable from "@/components/Ntable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";

  import NewCategory from "@/components/workflow/NewCategory.vue";
  import EditFlowDefine from "@/components/workflow/EditFlowDefine.vue";
  import Delegate from "@/components/workflow/Delegate.vue";
  import Jump from "@/components/workflow/Jump.vue";
  import Countersign from "@/components/workflow/Countersign.vue";
  import ReleaseFlow from "@/components/workflow/ReleaseFlow.vue"
  import { useRouter, useRoute } from "vue-router";
  import useWorkAdmin from "@/utils/flow/workAdmin";
  import { formTreeData,girdFormatterValue } from "@/utils/common.js";
  const { tabList } = useWorkAdmin();
  console.log("tabList", tabList);
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
  const gDataAll=ref([]);
  // proxy.$get('/localData/treedata.json', {}).then((res) => {
  //   console.log("res-processTree", res);
  //   let listData = res.data;
  //   let formTree = (list) => {
  //     list.forEach(item => {
  //       if (item.children) {
  //         formTree(item.children);
  //       }
  //       item.key = item.id;
  //       item.value = item.id;
  //     })
  //   }
  //   formTree(listData);
  //   console.log("formTree", listData)
  //   gData.value = listData;
  //   gDataAll.value = listData;
  // })
  proxy.$get(Interface.documentAdmin.tree,{
      entity: "docouttype"
  }).then((res)=>{
      let listData = formTreeData(res.rows,'id','pid');
      let formTree = (list) => {
          list.forEach(item => {
          if (item.children) {
              formTree(item.children);
          }
          item.key = item.id;
          item.value = item.id;
          item.name = item.text;
          })
      }
      formTree(listData);
      gData.value = listData;
      gDataAll.value = listData;
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
    fieldNames: {
      children: 'children', title: 'name', key: 'id'
    },
    tabs0:[
      {
        label: "全部",
        count: '',
        filterquery: '',
      },
      {
        label: "流转中",
        count: '',
        filterquery: '\nStateCode\teq\t1',
      },
      {
        label: "已完成",
        count: '',
        filterquery: '\nStateCode\teq\t3',
      },
      {
        label: "已退回",
        count: '',
        filterquery: '\nStateCode\teq\t6',
      },
      {
        label: "已撤销",
        count: '',
        filterquery: '\nStateCode\teq\t5',
      },
      {
        label: "草稿",
        count: '',
        filterquery: '\nStateCode\teq\t0',
      }
    ],
    tabs:[],
    //tabs: tabList,
    activeKey: 0,
    queryParams: {
      filterId:'',
      objectTypeCode:'100109',
      entityName:'OfficialDocumentOut',
      filterQuery:'',
      //filterQuery:'\nCreatedBy\teq-userid',
      //displayColumns:'ProcessInstanceNumber,Name,ProcessId,StateCode,ExpiredOn,AttachQty,CreatedBy,CurrentStepName,CreatedOn,BusinessUnitId,ModifiedOn,Priority,ProcessInstanceId,WFRuleLogId,ExecutorIdentityName',
      sort:'CreatedOn',
      order:'desc'
    },
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
    ProcessInstanceId: "",
    formSearchFilterquery:"",
    SearchFields:[]
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
    changeHeight();
  };

  const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal,
    isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId,SearchFields } = toRefs(data);
  //   console.log("tabs", data.tabs);
  const tabContent = ref(null);
  const contentRef = ref(null);
  const searchRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  const onSearch = (e) => {
    gData.value = gDataAll.value.filter(item=>{
      return item.name.indexOf(data.searchVal) != -1;
    })
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
    let height = contentHeight - tabsHeight - formSearchHeight.value;
    data.tableHeight = height;
    console.log('data', data.tableHeight);
    //console.log("gridRef", gridRef.value.loadGrid())
    //handleSearch();
  }
  const cancelRelase = (e) => {
    data.isRelease = e;
  }
  const handleSearch=(filterquery)=>{
      data.queryParams.filterQuery='';
      //data.queryParams.filterQuery='\nCreatedBy\teq-userid';
      data.formSearchFilterquery=filterquery;
      if(filterquery){
        data.queryParams.filterQuery+=filterquery;
      }
      if(data.treeId){
        data.queryParams.filterQuery+='\nDocumentTypeCode\tin\t'+data.treeId;
      }
      gridRef.value.loadGrid(data.queryParams);
  }
  //获取显示列
const getColumns = (id) => {
  let columnslist=[{
          field: 'ids',
          checkbox: true
        },
        {
            field: "Action",
            title: "操作",
            formatter: function formatter(value, row, index) {
              var ProcessInstanceId=row.ProcessInstanceId?row.ProcessInstanceId.textValue:'';
              var ProcessIdName=row.ProcessId?row.ProcessId.lookupValue.displayName:'';
              var ProcessId=row.ProcessId?row.ProcessId.lookupValue.value:'';
              var WFRuleLogId=row.WFRuleLogId?row.WFRuleLogId.textValue:'';
              var ExecutorIdentityName=row.ExecutorIdentityName?row.ExecutorIdentityName.textValue:'';
              var str = `
                <div class="iconBox">
            <div class="popup">
            <div class="option-item" id=${ProcessInstanceId} onclick="handleTo('${ProcessInstanceId}')">查看</div>
            <div class="option-item" onclick="EditFlow('${row.id}')">打印</div>  
            <div class="option-item" onclick="handleJump('${ProcessId}','${ProcessIdName}','${ProcessInstanceId}')">跳转</div>
            <div class="option-item" id=${WFRuleLogId} onclick="handleCountersign('${ProcessId}','${ProcessIdName}','${ProcessInstanceId}')">加签</div>
            <div class="option-item" onclick="DelegateFn('${ProcessInstanceId}','${WFRuleLogId}',\'${ProcessIdName}\','${ExecutorIdentityName}')">委派</div>  
            <div class="option-item" id=${WFRuleLogId} onclick="handleTo('${WFRuleLogId}')">撤销</div>
            <div class="option-item" id=${WFRuleLogId} onclick="handleTo('${WFRuleLogId}')">结束</div>
            <div class="option-item" id=${WFRuleLogId} onclick="handleRelase('${ProcessInstanceId}')">发布</div>
            </div>
            <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        `
        str = `
                <div class="iconBox">
            <div class="popup">
            <div class="option-item" id=${ProcessInstanceId} onclick="handleTo('${ProcessInstanceId}')">查看</div>
            </div>
            <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        `
              return str;
            }
        },];
  proxy.$get(Interface.listView.getFilterInfo, {
    entityType: 'A09',
    objectTypeCode: '100109',
    search: "",
    filterId: id
  }).then(res => {
    if(res&&res.actions&&res.actions[0]){}else{return}
    let fields = res.actions[0].returnValue.fields;
    fields.forEach(item => {
      if(item.name!='ProcessInstanceId'&&item.name!='WFRuleLogId'&&item.name!='ExecutorIdentityName'){
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
      entityName:'OfficialDocumentOut',
      layoutName:'DocumentOutAdmin'
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
        //data.tabs=data.tabs0;
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
  const DelegateRef = ref();

  function handleTo(WFRuleLogId) {
    console.log("WFRuleLogId", WFRuleLogId);
    router.push({
      path: "/detail",
      query: {
        id: WFRuleLogId
      }
    });
  }
  const EditFlow = (id) => {
    console.log("id", id);
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
  // 跳转
  function handleJump(ProcessId, ProcessIdName, ProcessInstanceId) {
    jumpData.params = {
      ProcessId, ProcessIdName, ProcessInstanceId
    }
    data.isJump = true;
  }
  // 加签
  function handleCountersign(ProcessId, ProcessIdName, ProcessInstanceId) {
    CountersignData.params = {
      ProcessId, ProcessIdName, ProcessInstanceId
    }
    data.isCountersign = true;
  }
  // 发布
  const handleRelase = (ProcessInstanceId) => {
    data.ProcessInstanceId = ProcessInstanceId;
    data.isRelease = true;
  }
  window.handleRelase = handleRelase;
  window.handleJump = handleJump;
  window.handleCountersign = handleCountersign;
  window.handleTo = handleTo;
  window.EditFlow = EditFlow;
  window.data = data;
  window.DelegateFn = DelegateFn;
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  const gridUrl = ref(Interface.list2);
  // const columns = ref(
  //     [
  //       {
  //         field: 'ids',
  //         checkbox: true
  //       },
  //       {
  //           field: "Action",
  //           title: "操作",
  //           formatter: function formatter(value, row, index) {
  //             var ProcessInstanceId=row.ProcessInstanceId?row.ProcessInstanceId.textValue:'';
  //             var ProcessIdName=row.ProcessId?row.ProcessId.lookupValue.displayName:'';
  //             var ProcessId=row.ProcessId?row.ProcessId.lookupValue.value:'';
  //             var WFRuleLogId=row.WFRuleLogId?row.WFRuleLogId.textValue:'';
  //             var ExecutorIdentityName=row.ExecutorIdentityName?row.ExecutorIdentityName.textValue:'';
  //             var str = `
  //               <div class="iconBox">
  //           <div class="popup">
  //           <div class="option-item" id=${ProcessInstanceId} onclick="handleTo('${ProcessInstanceId}')">查看</div>
  //           <div class="option-item" onclick="EditFlow('${row.id}')">打印</div>  
  //           <div class="option-item" onclick="handleJump('${ProcessId}','${ProcessIdName}','${ProcessInstanceId}')">跳转</div>
  //           <div class="option-item" id=${WFRuleLogId} onclick="handleCountersign('${ProcessId}','${ProcessIdName}','${ProcessInstanceId}')">加签</div>
  //           <div class="option-item" onclick="DelegateFn('${ProcessInstanceId}','${WFRuleLogId}',\'${ProcessIdName}\','${ExecutorIdentityName}')">委派</div>  
  //           <div class="option-item" id=${WFRuleLogId} onclick="handleTo('${WFRuleLogId}')">撤销</div>
  //           <div class="option-item" id=${WFRuleLogId} onclick="handleTo('${WFRuleLogId}')">结束</div>
  //           <div class="option-item" id=${WFRuleLogId} onclick="handleRelase('${ProcessInstanceId}')">发布</div>
  //           </div>
  //           <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
  //       `
  //             return str;
  //           }
  //       },
  //       {
  //           field: "ProcessInstanceNumber",
  //           title: '流程编号',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('ProcessInstanceNumber',row);
  //           }
  //       },
  //       {
  //           field: 'Name',
  //           title: '标题',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('Name',row);
  //           }
  //       }, 
  //       {
  //           field: 'ProcessId',
  //           title: '流程名称',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('ProcessId',row);
  //           }
  //       }, 
  //       {
  //           field: 'StateCode',
  //           title: '状态',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('StateCode',row);
  //           }
  //       }, 
  //       {
  //           field: 'ExpiredOn',
  //           title: '截至时间',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('ExpiredOn',row);
  //           }
  //       }, 
  //       {
  //           field: 'AttachQty',
  //           title: '附件数量',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('AttachQty',row);
  //           }
  //       }, 
  //       {
  //           field: 'CreatedBy',
  //           title: '发起人',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('CreatedBy',row);
  //           }
  //       },
  //       {
  //           field: 'CurrentStepName',
  //           title: '当前步骤',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('CurrentStepName',row);
  //           }
  //       },
  //       {
  //           field: 'CreatedOn',
  //           title: '发起时间',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('CreatedOn',row);
  //           }
  //       },
  //       {
  //           field: 'BusinessUnitId',
  //           title: '发起人部门',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('BusinessUnitId',row);
  //           }
  //       }, 
  //       {
  //           field: 'ModifiedOn',
  //           title: '上一次修改时间',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('ModifiedOn',row);
  //           }
  //       }, 
  //       {
  //           field: 'Priority',
  //           title: '紧急程度',
  //           sortable: true,
  //           formatter: function formatter(value, row, index) {
  //             return girdFormatterValue('Priority',row);
  //           }
  //       }
  //     ]
  //   )
    
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
        data.queryParams.filterQuery+='\nDocumentTypeCode\tin\t'+data.treeId;
      }
      getColumns(data.queryParams.filterId);
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
  }
</style>