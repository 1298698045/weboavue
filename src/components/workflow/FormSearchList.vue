<template>
    <div class="todoList">
        <div class="todo-head">
            <div class="todo-head-left">
                <div class="icon-circle-base">
                    <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
                </div>
                <span class="wea-new-top-title-breadcrumb">表单查询-{{params.Name}}</span>
            </div>
            <div class="todo-head-right">
                <a-button type="primary">批量删除</a-button>
            </div>
        </div>
        <div class="todo-content">
            <a-row>
                <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
                    <div class="wea-left-tree">
                        <div class="wea-left-tree-search">
                            <span class="wea-left-tree-search-label">全部类型</span>
                            <a-input-search v-model:value="searchValue" placeholder="" @search="onSearch" />
                        </div>
                        <div class="wea-left-tree-scroll">
                            <a-tree :style="{height: tableHeight+'px'}" :expanded-keys="expandedKeys"
                                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node
                                :fieldNames="fieldNames" @expand="onExpand" @select="handleSelectTree" v-model:selectedKeys="selectedKeys">
                                <template #switcherIcon="{ switcherCls }">
                                    <CaretDownOutlined :class="switcherCls"
                                        style="color: rgb(163, 163, 163); font-size: 14px"></CaretDownOutlined>
                                </template>
                                <template #title="{ Name }">
                                    <span>{{ Name }}</span>
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
                                <a-tab-pane v-for="(item,index) in tabs" :key="index">
                                    <template #tab>
                                        <span>
                                            {{item.lable}}
                                        </span>
                                    </template>
                                </a-tab-pane>
                            </a-tabs>
                        </div>
                        <list-form-search ref="searchRef" :isCollapsed="isCollapsed" @update-height="changeHeight" @search="handleSearch"></list-form-search>
                        <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                            <!-- <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                                :isCollapsed="isCollapsed"></Dtable> -->
                            <GridConfig :objectTypeCode="ObjectTypeCode" :entityType="EntityType" ref="gridRef" />
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
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps } from "vue";
    import Interface from "@/utils/Interface.js";
    import Dtable from "@/components/Dtable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    import GridConfig from "@/components/GridConfig"
    const { proxy } = getCurrentInstance();
    const expandedKeys = ref([]);
    const autoExpandParent = ref(true);
    const onExpand = (keys) => {
        expandedKeys.value = keys;
        autoExpandParent.value = false;
    };
    const props = defineProps({
        params: Object
    })
    let data = reactive({
        isCollapsed: false,
        tableHeight: '',
        tabs: [
            {
                lable: "全部",
                count: ''
            }
        ],
        activeKey: 0,
        queryParams: {

        },
        gData: [],
        searchValue: "",
        fieldNames: {
            children: 'ProcessFormInfo', title: 'ItemName', key: 'ProcessId'
        },
        selectedKeys: [],
        ProcessId: "",
        ObjectTypeCode: "",
        EntityType: ""
    });
    
    const { isCollapsed, tableHeight, activeKey, fieldNames, tabs, gData, searchValue, selectedKeys, ProcessId, ObjectTypeCode, EntityType } = toRefs(data);
    if(props.params){
        data.ProcessId = props.params.ProcessId;
        data.ObjectTypeCode = props.params.ObjectTypeCode;
        data.EntityType = props.params.EntityType;
    }
    const getProcessList = () => {
        proxy.$get(Interface.flow.permissionform,{

        }).then(res=>{
            let list = res;
            list.forEach(item=>{
                item.Name = item.ItemName;
                item.ProcessId = item.ItemId;
            })
            list.unshift({
                ItemName: "全部",
                Name: "全部",
                ItemId: ""
            });
            data.gData = list;
        })
    }
    getProcessList();

    const handleSelectTree = (e, node) => {
        console.log("e",e, node);
        data.ObjectTypeCode = node.node.ObjectTypeCode;
        data.EntityType = node.node.EntityType;
        data.ProcessId = e;

        gridRef.value.getActions();
    };

    const handleCollapsed = () => {
        data.isCollapsed = !data.isCollapsed;
        changeHeight();
    };
    const tabContent = ref(null);
    const contentRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    const searchRef = ref(null);
    onMounted(() => {
        // window.addEventListener('resize', changeHeight);
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
        // console.log("gridRef", gridRef.value.loadGrid())
    }

    // 获取tabs
    const getTabs = () => {
        proxy.$get(Interface.todoList.tabs, {
            a: 1
        }).then(res => {
            console.log("tabs", res)
            //   data.tabs = res.list;
            data.tabs = [
                {
                    lable: "全部"
                },
                {
                    lable: "流程已完成"
                },
                {
                    lable: "流程流转中"
                }
            ]
        })
    }
    // getTabs();

    const handleMenuClick = () => {

    }
    const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.draftsList);
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
                  <div class="option-item">修改</div>  
                  <div class="option-item">删除</div>
                </div>
                <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
            `
                    return str;
                }
            },
            { field: "ProcessInstanceNumber",title: '流程编号' },
            {
                field: 'Name',
                title: '标题',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    var rowId = row.ProcessInstanceId;
                    var name = row["Name"];
                    var action = "<a style=\"color:#015ba7;font-size:13px;\" href=\"/a0M/e?source=i&id=" + rowId + "&retURL=%2fwfinstance%2fdraftlst.aspx%3fgridid%3dmydraftinstances%26t%3da0M\">" + name + "</a>";
                    return action;
                }
            },
            { field: "ProcessIdName", title: '流程名称', sortable: true },
            { field: "StateCodeName", title: '状态', sortable: true },
            { field: "BusinessUnitIdName", title: '部门', sortable: true },
            {
                field: 'PriorityName',
                title: '紧急程度',
                sortable: true
            },
            { field: "CreatedByName", title: '创建人姓名', sortable: false },
            { field: "CreatedOn", title: '创建时间', sortable: true },
            { field: "ModifiedOn", title: '上次一次修改时间', sortable: true }
        ]
    )
    const changeTab = (e) => {
        data.activeKey = e;
        data.queryParams.activeKey = e;
        gridRef.value.loadGrid(e);
        searchRef.value.resetForm();
    }
    const handleSearch = (params) => {
        data.queryParams.filterQuery = params;
        gridRef.value.loadGrid(data.queryParams);
    };
    const onSearch = () => {
        
    }
</script>
<style lang="less">
    @import "@/style/flow/treeList.less";
</style>