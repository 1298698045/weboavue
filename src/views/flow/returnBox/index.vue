<template>
    <div class="todoList">
        <div class="todo-head">
            <div class="todo-head-left">
                <div class="icon-circle-base">
                  <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
                </div>
                <span class="wea-new-top-title-breadcrumb">退件箱</span>
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
                            <a-input-search v-model:value="value" placeholder="" @search="onSearch" />
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
                                    <span v-if="name.indexOf(searchValue) > -1">
                                        {{ name.substr(0, name.indexOf(searchValue)) }}
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
                            <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                                :isCollapsed="isCollapsed"></Dtable>
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
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
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
    const gData = ref([]);
    proxy.$get('/localData/treedata.json', {}).then((response) => {
        console.log("res", response)
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
        fieldNames: {
            children: 'children', title: 'name', key: 'id'
        },
        tabs: [
            {
                lable: "全部",
                count: 72
            },
            {
                lable: "我撤销",
                count: ''
            },
            {
                lable: "被退回",
                count: 21
            }
        ],
        activeKey: 0,
        queryParams: {

        }
    });
    const handleCollapsed = () => {
        data.isCollapsed = !data.isCollapsed;
        changeHeight();
    };
    const { isCollapsed, tableHeight, fieldNames, tabs } = toRefs(data);
    const tabContent = ref(null);
    const contentRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    const searchRef = ref(null);
    onMounted(() => {
        window.addEventListener('resize', changeHeight)
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
        console.log("gridRef", gridRef.value.loadGrid())
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
    const gridUrl = ref(Interface.returnBoxList);
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
                  <div class="option-item">查看</div>
                  <div class="option-item">删除</div>
                </div>
                <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
            `
                    return str;
                }
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    var rowId = row.ProcessInstanceId;
                    var name = row["Name"];
                    var action = "<a style=\"color:#015ba7;font-size:13px;\" href=\"/a0M/e?source=i&id=" + rowId + "&retURL=%2fwfinstance%2fcancellst.aspx%3fgridid%3dcancelledWfinstances%26t%3da0M\">" + name + "</a>";
                    return action;
                }
            },
            { field: "ProcessIdName", title: '流程名称', sortable: true },
            { field: "CurrentStepName", title: '当前步骤', sortable: true },
            { field: "StateCodeName", title: '状态', sortable: true },
            { field: "BusinessUnitIdName", title: '发起人部门', sortable: true },
            { field: "CreatedByName", title: '发起人姓名', sortable: false },
            { field: "PriorityName", title: '紧急程度', sortable: true },
            { field: "CreatedOn", title: '创建时间', sortable: true },
            { field: "ModifiedOn", title: '修改时间', sortable: true },
        ]
    )
    const changeTab = (e) => {
        data.activeKey = e;
        data.queryParams.activeKey = e;
        gridRef.value.loadGrid(e);
        searchRef.value.resetForm();
    }
    const handleSearch = (params) => {
        // console.log("params:", params);
        // var filterQuery = "";
        // for(var key in params){
        //     filterQuery += "\n"+key+'\teq\t'+params[key];
        // }
        // console.log('filterQuery',filterQuery);
        // data.queryParams.filterQuery = filterQuery;
        data.queryParams.filterQuery = params;
        gridRef.value.loadGrid(data.queryParams);
    }
</script>
<style lang="less">
    @import "@/style/flow/treeList.less";
</style>