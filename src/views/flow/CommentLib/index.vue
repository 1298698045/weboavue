<template>
    <div class="todoList">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base">
                    <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
                </div>
                <span class="headerTitle">审批意见</span>
            </div>
            <div class="headerRight">
                <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
            </div>
        </div>
        <div class="todo-content">
            <a-row>
                <!-- <a-col span="3" class="wea-left-right-layout-left" v-if="!isCollapsed">
                    <div class="wea-left-tree">
                        <div class="wea-left-tree-search">
                            <a-input-search v-model:value="searchVal" placeholder="" @search="onSearch" />
                        </div>
                        <div class="wea-left-tree-scroll">
                            <a-tree :style="{height: tableHeight+'px'}" :expanded-keys="expandedKeys"
                                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node
                                :fieldNames="fieldNames" @expand="onExpand" @select="onSelect">
                                <template #switcherIcon="{ switcherCls }">
                                    <CaretDownOutlined :class="switcherCls"
                                        style="color: rgb(163, 163, 163); font-size: 14px"></CaretDownOutlined>
                                </template>
                                <template #title="{ name, text, key }">
                                    <a-dropdown :trigger="['contextmenu']">
                                        <div class="treeRow">
                                            <span>{{ text }}</span>
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
                </a-col> -->
                <a-col :span="isCollapsed ? '24' : '21'" class="wea-left-right-layout-right">
                    <!-- <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
                        :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div> -->
                    <div style="height: 100%" ref="contentRef">
                        <div class="wea-tab wea-tab1">
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
                        <list-form-search ref="searchRef" :isCollapsed="isCollapsed" @update-height="changeHeight" @search="handleSearch" entityApiName="WFUserSignature" :SearchFields="SearchFields"></list-form-search>
                        <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                            <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
                            <!-- <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable> -->
                            <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Ntable>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onFresh" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal>
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="deleteOk" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />

    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    //import Dtable from "@/components/Dtable.vue";
    import Ntable from "@/components/Ntable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";

    import CommonFormModal from "@/components/listView/CommonFormModal.vue";
    import Delete from "@/components/listView/Delete.vue";
    import { formTreeData,girdFormatterValue } from "@/utils/common.js";
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const genData = [];
    const dataList = [];
    
    const expandedKeys = ref([  ]);
    const searchValue = ref("");
    const autoExpandParent = ref(true);
    const gData = ref([]);
    const gDataAll=ref([]);
    // proxy.$get(Interface.treeList, {}).then((res) => {
    //     console.log("res-processTree", res);
    //     gData.value = formTreeData(res.rows,'id','pid');
    // })
    

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
    //处理树
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
    // 左侧树
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
    //getDeptTreeData();
    
    let data = reactive({
        isCollapsed: true,
        tableHeight: '',
        fieldNames: {
            children: 'children', title: 'name', key: 'id'
        },
        tabs: [
            {
                lable: "全部",
                count: ''
            }
        ],
        activeKey: 0,
        queryParams: {
            filterId:'',
            objectTypeCode:'130',
            entityName:'WFSuggestionLibrary',
            filterQuery:'',
            displayColumns:'Name,SuggestionType,SortNumber,CreatedBy,ModifiedBy,ModifiedOn',
            sort:'SortNumber',
            order:'ASC'
        },
        objectTypeCode:'130',
        sObjectName:'WFSuggestionLibrary',
        isModal: false,
        isCirculation: false,
        isNew: false,
        searchVal: "",
        isCategory: false,
        treeId: "",
        isEditFlow: false,
        id: "",
        isCommon: false,
        isDelete: false,
        deleteDesc: "是否确定要删除？",
        formSearchFilterquery:'',
        SearchFields:[
            {
                "column": "SuggestionType",
                "label": "公用",
                "dataType": "L",
                "ReferencedEntityObjectTypeCode": 130,
                "picklistValues": [
                {
                    "label": "个人",
                    "value": "0"
                },
                {
                    "label": "公用",
                    "value": "1"
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
                "sObjectName": "SystemUser",
                "targetApiName": "SystemUser",
            },
        ],
        recordId:'',
        external:false
    });
    const handleCollapsed = () => {
        data.isCollapsed = !data.isCollapsed;
        changeHeight();
    };
    const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, isNew, searchVal,
        isCategory, treeId, isEditFlow, id, isCommon, isDelete, deleteDesc, SearchFields,objectTypeCode,sObjectName,external,recordId } = toRefs(data);
    const tabContent = ref(null);
    const contentRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    onMounted(() => {
        window.addEventListener('resize', changeHeight)
    })
    const onSearch = (e) => {
        let list = (gDataAll.value).filter(item=>{
            return item.text.indexOf(data.searchVal) !== -1;
        })
        list=formTree(list);
        gData.value = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
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
        console.log("gridRef", gridRef.value.loadGrid(data.queryParams))
    }
    const handleCommonCancel = (params) => {
        data.isCommon=false;
    };
    const handleEdit = (id) => {
        data.recordId = id;
        data.isCommon = true;
    }
    const handleDelete = (id) => {
        //console.log("id",id);
        data.recordId = id;
        data.isDelete = true;
    }
    const cancelDelete = (e) => {
        data.isDelete = e;
    }
    const deleteOk = (e) => {
        // console.log("e",e);
        // proxy.$get(Interface.flow.deleteSignature, {
        //     signatureId: data.id
        // })
        // .then((res) => {
        //     message.success("删除成功！");
        //     data.isDelete = false;
        //     gridRef.value.loadGrid({});
        // });
        onFresh();
    }
    // 获取tabs
    const getTabs = () => {
        proxy.$get(Interface.todoList.tabs, {
            a: 1
        }).then(res => {
            console.log("tabs", res)
            data.tabs = res.list;
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
    const handleSearch=(filterQuery)=>{
      data.queryParams.filterQuery='';
      data.formSearchFilterquery=filterQuery;
      if(filterQuery){
        data.queryParams.filterQuery+=filterQuery;
      }
    //   if(data.treeId){
    //     data.queryParams.filterQuery+='\nBusinessUnitId\tin\t'+data.treeId;
    //   }
      gridRef.value.loadGrid(data.queryParams);
  }
const onFresh =()=>{
    data.queryParams.filterQuery='';
    if(data.formSearchFilterquery){
        data.queryParams.filterQuery+=data.formSearchFilterquery;
    }
    gridRef.value.loadGrid(data.queryParams);
}
    window.data = data;
    window.handleEdit = handleEdit;
    window.handleDelete = handleDelete;

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
                    <div class="option-item" onclick="handleEdit('${row.id}')">编辑</div>
                    <div class="option-item" onclick="handleDelete('${row.id}')">删除</div>  
                  </div>
                  <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
              `
                    return str;
                }
            },
            {
                field: 'Name',
                title: '意见',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return girdFormatterValue('Name',row);
                }
            },  {
                field: 'SuggestionType',
                title: '公用',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return girdFormatterValue('SuggestionType',row);
                }
            }, 
            {
                field: 'SortNumber',
                title: '序号',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return girdFormatterValue('SortNumber',row);
                }
            }, 
            {
                field: 'CreatedBy',
                title: '创建人',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return girdFormatterValue('CreatedBy',row);
                }
            }, 
            {
                field: 'ModifiedBy',
                title: '修改人',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return girdFormatterValue('ModifiedBy',row);
                }
            }, 
            {
                field: 'ModifiedOn',
                title: '修改时间',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return girdFormatterValue('ModifiedOn',row);
                }
            }
        ]
    )

    const changeTab = (e) => {
        data.activeKey = e;
        data.queryParams.activeKey = e;
        gridRef.value.loadGrid(data.queryParams);
    }
    const handleNew = (e) => {
        data.recordId='';
        data.isCommon = true;
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
    .wea-left-tree-search{
      padding-left: 14px;
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
    .wea-tab1 :where(.css-dev-only-do-not-override-kqecok).ant-tabs{
        padding-left: 5px;
    }
  </style>