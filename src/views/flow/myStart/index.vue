<template>
    <div class="todoList">
        <div class="todo-head">
            <div class="todo-head-left">
                <div class="icon-circle-base">
                    <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
                </div>
                <span class="wea-new-top-title-breadcrumb">我的发起</span>
            </div>
            <div class="todo-head-right">
                <a-button type="primary">收藏</a-button>
                <span class="a-split"></span>
                <a-button type="primary">批量打印</a-button>
            </div>
        </div>
        <div class="todo-content">
            <a-row>
                <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
                    <div class="wea-left-tree">
                        <div class="wea-left-tree-search">
                            <!-- <span class="wea-left-tree-search-label">全部类型</span> -->
                            <a-input-search v-model:value="data.searchVal" placeholder="" @search="onSearch" />
                        </div>
                        <div class="wea-left-tree-scroll">
                            <a-tree :style="{height: tableHeight+'px'}" :expanded-keys="expandedKeys"
                                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node
                                :fieldNames="fieldNames" @expand="onExpand">
                                <template #switcherIcon="{ switcherCls }">
                                    <CaretDownOutlined :class="switcherCls"
                                        style="color: rgb(163, 163, 163); font-size: 14px"></CaretDownOutlined>
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
                                <a-tab-pane v-for="(item,index) in tabs0" :key="index">
                                    <template #tab>
                                        <span>
                                            {{item.label}}
                                        </span>
                                        <span v-if="item.count">({{item.count}})</span>
                                    </template>
                                </a-tab-pane>
                            </a-tabs>
                        </div>
                        <list-form-search ref="searchRef" @search="handleSearch" entityApiName="WFProcessInstance" :SearchFields="SearchFields"
              @update-height="changeHeight"></list-form-search>
                        <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                            <!-- <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable> -->
                            <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Ntable>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <Urging ref="UrgingRef" @update-status="updateStatus" v-if="isUrging" :paramsData="UrgingData.params" :isShow="isUrging" />
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
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick} from "vue";
    import Interface from "@/utils/Interface.js";
    // import Dtable from "@/components/Dtable.vue";
    import Ntable from "@/components/Ntable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    import Urging from "@/components/workflow/Urging.vue";
    import CirculationModal from "@/components/workflow/CirculationModal.vue";
    import { girdFormatterValue } from "@/utils/common.js";
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
  proxy.$get('/localData/treedata.json', {}).then((res) => {
    console.log("res-processTree", res);
    let listData = res.data;
    let formTree = (list) => {
      list.forEach(item => {
        if (item.children) {
          formTree(item.children);
        }
        item.key = item.id;
        item.value = item.id;
      })
    }
    formTree(listData);
    console.log("formTree", listData)
    gData.value = listData;
    gDataAll.value = listData;
  })
    // console.log("genData",genData,treeList)

    const onExpand = (keys) => {
        expandedKeys.value = keys;
        autoExpandParent.value = false;
    };
    // watch(searchValue, (value) => {
    //     const expanded = dataList
    //         .map((item) => {
    //             if (item.title.indexOf(value) > -1) {
    //                 return getParentKey(item.key, gData.value);
    //             }
    //             return null;
    //         })
    //         .filter((item, i, self) => item && self.indexOf(item) === i);
    //     expandedKeys.value = expanded;
    //     searchValue.value = value;
    //     autoExpandParent.value = true;
    // });


    let data = reactive({
        isCollapsed: false,
        tableHeight: '',
        fieldNames: {
            children: 'children', title: 'name', key: 'id'
        },
        tabs0: [
            {
                label: "全部",
                count: ''
            },
            {
                label: "流转中",
                count: ''
            },
            {
                label: "已完成",
                count: ''
            },
            {
                label: "被退回/撤销",
                count: ''
            },
            {
                label: "督办",
                count: ''
            },
            {
                label: "收藏",
                count: ''
            },
            {
                label: "草稿",
                count: ''
            }
        ],
        tabs: [],
        activeKey: 0,
        queryParams: {
        filterId:'',
        objectTypeCode:'122',
        entityName:'WFProcessInstances',
        //filterQuery:'\nCreatedBy\teq-userid',
        //displayColumns:'ProcessInstanceNumber,Name,ProcessId,StateCode,ExpiredOn,AttachQty,CreatedBy,CurrentStepName,CreatedOn,BusinessUnitId,ModifiedOn,Priority,ProcessInstanceId,WFRuleLogId,ExecutorIdentityName',
        sort:'CreatedOn',
        order:'desc'
        },
        isUrging: false,
        isCirculation: false,
        searchVal:'',
        formSearchFilterquery:"",
        SearchFields:[],
        treeId: "",
    });
    const handleCollapsed = () => {
        data.isCollapsed = !data.isCollapsed;
        changeHeight();
    };
    const { isCollapsed, tableHeight, fieldNames, tabs,tabs0, isUrging, isCirculation,searchVal,treeId, SearchFields,activeKey } = toRefs(data);
    const tabContent = ref(null);
    const contentRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    const searchRef = ref(null);
    onMounted(() => {
        window.addEventListener('resize', changeHeight)
        getTabs();
    })
    const onSearch = (e) => {
        gData.value = gDataAll.value.filter(item=>{
        return item.name.indexOf(data.searchVal) != -1;
        })
    }
    const onSelect = (keys) => {
        data.treeId=keys[0];
        handleSearch(data.formSearchFilterquery);
    };
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
              return str;
            }
        },];
  proxy.$get(Interface.listView.getFilterInfo, {
    entityType: '122',
    objectTypeCode: '122',
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
      entityName:'WFProcessInstance',
      layoutName:'instanceManager'
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

    const handleMenuClick = () => {

    }
    const UrgingData = reactive({
        params: {}
    })
    const updateStatus = (e) => {
        data.isUrging = false;
        data.isCirculation = false;
    }
    function UrgingFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
        UrgingData.params = {
            InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
        }
        data.isUrging = true;
    }
    const CirculationData = reactive({
        params: {}
    })
    function CirculationFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
        CirculationData.params = {
            InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
        }
        data.isCirculation = true;
    }
    window.UrgingFn = UrgingFn;
    window.data = data;
    window.CirculationFn = CirculationFn; // 传阅
    const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.list2);

    // const columns = ref(
    //     [
    //         {
    //             field: 'ids',
    //             checkbox: true
    //         },
    //         {
    //             field: "Action",
    //             title: "操作",
    //             formatter: function formatter(value, row, index) {
    //                 var str = `
    //           <div class="iconBox">
    //             <div class="popup">
    //                 <div class="option-item">打印</div>
    //                 <div class="option-item">撤销</div>
    //                 <div class="option-item" onclick="CirculationFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">传阅</div>  
    //                 <div class="option-item" onclick="UrgingFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">催办</div>
    //             </div>
    //             <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
    //         `
    //                 return str;
    //             }
    //         },
    //         {
    //             field: 'Name',
    //             title: '标题',
    //             sortable: true,
    //             formatter: function formatter(value, row, index) {
    //                 return '<a target="_blank" style=\"color:#015ba7;font-size:13px;cursor:pointer;\" href="/a0M/e?objectTypeCode=123&source=l&id=' + row.ProcessInstanceId + '">' + row.Name + '</a>&nbsp;';
    //             }
    //         }, {
    //             field: 'StateCodeName',
    //             title: '状态',
    //             sortable: true
    //         }, {
    //             field: 'CurrentStepName',
    //             title: '当前步骤',
    //             sortable: true
    //         }, {
    //             field: 'PriorityName',
    //             title: '紧急程度',
    //             sortable: true
    //         },  {
    //             field: 'ProcessIdName',
    //             title: '流程',
    //             sortable: true
    //         }, {
    //             field: 'ProcessInstanceNumber',
    //             title: '编号',
    //             sortable: true
    //         }, {
    //             field: 'CreatedOn',
    //             title: '创建时间',
    //             sortable: true
    //         }, {
    //             field: 'ModifiedOn',
    //             title: '上一次办理时间',
    //             sortable: true
    //         }, {
    //             field: 'BusinessUnitIdName',
    //             title: '发起人部门',
    //             sortable: false
    //         }
    //     ]
    // )
    const columns = ref([]);
    const changeTab = (e) => {
      data.activeKey = e;
      //data.queryParams.filterQuery='\nCreatedBy\teq-userid';
      data.queryParams.filterQuery='';
      let filterColumnsList=(data.tabs)[e].filterableColumns;
      data.SearchFields=filterColumnsList;
      data.queryParams.filterId=data.tabs[e].filterId||'';
      if(data.formSearchFilterquery){
        data.queryParams.filterQuery+=data.formSearchFilterquery;
      }
      if(data.treeId){
        data.queryParams.filterQuery+='\nProcessId\tin\t'+data.treeId;
      }
      getColumns(data.queryParams.filterId);
  }
    // const handleSearch = (params) => {
    //     // console.log("params:", params);
    //     // var filterQuery = "";
    //     // for(var key in params){
    //     //     filterQuery += "\n"+key+'\teq\t'+params[key];
    //     // }
    //     // console.log('filterQuery',filterQuery);
    //     // data.queryParams.filterQuery = filterQuery;
    //     data.queryParams.filterQuery = params;
    //     gridRef.value.loadGrid(data.queryParams);
    // }
    const handleSearch=(filterquery)=>{
      //data.queryParams.filterQuery='\nCreatedBy\teq-userid';
      data.queryParams.filterQuery='';
      data.formSearchFilterquery=filterquery;
      if(filterquery){
        data.queryParams.filterQuery+=filterquery;
      }
      if(data.treeId){
        data.queryParams.filterQuery+='\nProcessId\tin\t'+data.treeId;
      }
      gridRef.value.loadGrid(data.queryParams);
  }
</script>
<style lang="less">
    @import "@/style/flow/treeList.less";
    .todoList .todo-head .todo-head-right{
        right: 10px;
    }
</style>