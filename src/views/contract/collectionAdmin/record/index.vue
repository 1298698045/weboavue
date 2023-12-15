<template>
    <div class="todoList">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base"></div>
                <span class="headerTitle">收款记录</span>
            </div>
            <div class="headerRight">
                <a-button type="primary" class="ml10">新建付款记录</a-button>
            </div>
        </div>
        <div class="todo-content">
            <div style="height: 100%" ref="contentRef">
                <div class="wea-tab">
                    <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                        <a-tab-pane v-for="(item,index) in tabs" :key="index">
                            <template #tab>
                                <span>
                                    {{item.label}}
                                </span>
                            </template>
                        </a-tab-pane>
                    </a-tabs>
                    <div class="tabsBtn">
                    </div>
                </div>
                <list-form-search ref="searchRef" @update-height="changeHeight"></list-form-search>
                <div class="statistics">
                    <div class="statisticItem">
                        <div class="statisticLeft">
                            <div class="statisticName">应付款金额</div>
                            <div class="statisticCount">{{statistics.TotalAmount || 0}}</div>
                        </div>
                        <div class="statisticRight">
                            <p class="icon">
                                <MoneyCollectOutlined />
                            </p>
                        </div>
                    </div>
                    <div class="statisticItem">
                        <div class="statisticLeft">
                            <div class="statisticName">实际付款金额</div>
                            <div class="statisticCount">{{statistics.RefundAmount || 0}}</div>
                        </div>
                        <div class="statisticRight">
                            <p class="icon">
                                <MoneyCollectOutlined />
                            </p>
                        </div>
                    </div>
                  </div>
                <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                    <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                        :isCollapsed="isCollapsed"></Dtable>
                </div>
            </div>
        </div>
        <NewReceiving :isShow="isNew" v-if="isNew" @cancel="isNew=false" />
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
    const { proxy } = getCurrentInstance();

    import { message } from "ant-design-vue";
    import Dtable from "@/components/Dtable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    import NewReceiving from "@/components/documentAdmin/NewReceiving.vue";

    import { useRouter, useRoute } from "vue-router";
    import usePayment from "@/utils/contract/payment";
    const { tabList } = usePayment();
    console.log("tabList", tabList);
    const route = useRoute();
    const router = useRouter();




    let data = reactive({
        isCollapsed: false,
        tableHeight: '',
        fieldNames: {
            children: 'children', title: 'name', key: 'id'
        },
        tabs: tabList,
        activeKey: 0,
        queryParams: {},
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
        isNew: false,
        statistics: {}
    });

    const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal,
        isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId, isNew, statistics } = toRefs(data);
    const tabContent = ref(null);
    const contentRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    onMounted(() => {
        window.addEventListener('resize', changeHeight)
    })
    const onSearch = (e) => {

    }
    const getStatistics = () => {
        proxy.$get(Interface.contract.invoice.statistics,{
            Type: 7,
            objtypecode: 1090
        }).then(res=>{
            console.log('res',res);
            data.statistics = res.data.listData.Table[0];
        })
    }
  getStatistics();
    const handleNew = () => {
        data.isNew = true;
    }
    function changeHeight(h) {
        if (typeof h == 'number') {
            formSearchHeight.value = h;
        }
        let contentHeight = contentRef.value.clientHeight;
        let tabsHeight = 46;
        let height = contentHeight - tabsHeight - formSearchHeight.value;
        data.tableHeight = height - 80;
        console.log('data', data.tableHeight);
        console.log("gridRef", gridRef.value.loadGrid())
    }
    const cancelRelase = (e) => {
        data.isRelease = e;
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
    const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.contract.invoice.list);

    const columns = ref(data.tabs[0].table.columnsArray);

    const changeTab = (e) => {
        console.log("e", e);
        data.activeKey = e;
        data.queryParams.activeKey = e;
        columns.value = data.tabs[e].table.columnsArray;
        gridRef.value.loadGrid(data.queryParams);
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

                            .ant-tree-title {
                                display: inline-block;
                                width: 100%;
                            }

                            .ant-tree-title>span {
                                width: 100%;
                                display: flex;
                                justify-content: space-between;

                                .tree-num {
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
                        background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-show.png) no-repeat -2px 0;
                    }

                    .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
                        background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-show-hover.png) no-repeat -2px 0;
                    }

                    .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
                        background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-hide.png) no-repeat -2px 0;
                    }

                    .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
                        background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-hide-hover.png) no-repeat -2px 0;
                    }
                }

                .wea-tab {
                    height: 46px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e2e3e5;
                    padding: 0 15px;

                    :deep .ant-tabs-nav::before {
                        border-bottom: none !important;
                    }
                }

                .wea-tabContent {
                    /* height: calc(~"100% - 98px"); */
                }
            }
        }
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
    .statistics{
    display: flex;
    margin: 0 10px 10px 10px;
    .statisticItem{
        flex: 1;
        border: 1px solid #eee;
        margin-right: 10px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        border: 1px solid #e5e5e5!important;
        border-left: 5px solid #e5e5e5!important;
        color: #666;
        line-height: 1.6;
        .statisticLeft{
            .statisticCount{
                font-weight: 700;
                font-size: 22px;
            }
        }
        .statisticRight{
            .icon{
                font-size: 28px;
                color: var(--textColor);
            }
        }
    }
    .statisticItem:last-child{
        margin-right: 0;
    }
  }
</style>