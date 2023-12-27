<template>
    <div class="todoList">
        <a-row>
            <a-col span="3" class="wea-left-right-layout-left" v-if="!isCollapsed">
                <div class="treeHead">
                    <p class="icon"><ApartmentOutlined /></p>
                    <p class="title">{{treeTitle}}</p>
                </div>
                <div class="treebd">
                    <a-tree style="height: 100%;" :expanded-keys="expandedKeys"
                        :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames"
                        @expand="onExpand">
                        <template #switcherIcon="{ switcherCls }">
                            <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                            </CaretDownOutlined>
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
            </a-col>
            <a-col :span="isCollapsed ? '24' : '21'" class="wea-left-right-layout-right" style="height: 100%;">
                <div class="headerBar" v-if="isHead">
                    <div class="headerLeft">
                        <div class="icon-circle-base"></div>
                        <span class="headerTitle">{{title}}</span>
                    </div>
                    <div class="headerRight">
                        <a-button type="primary" class="ml10">新建合作方</a-button>
                        <a-button type="primary" class="ml10">批量归档</a-button>
                        <a-button type="primary" class="ml10">高级搜索</a-button>
                    </div>
                </div>
                <div class="todo-content" :class="{'active':!isHead}">
                    <div class="wea-left-right-layout-right">
                        <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
                            :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
                        <div style="height: 100%" ref="contentRef">
                            <div class="wea-tab" v-if="isTab">
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
                                    <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
                            <a-button type="primary" class="ml10">批量发布</a-button>
                            <a-button class="ml10">批量取消发布</a-button> -->
                                </div>
                            </div>
                            <list-form-search v-if="isSearch" ref="searchRef" @update-height="changeHeight"></list-form-search>
                            <div class="statistics" v-if="isStatistics">
                                <div class="statisticItem">
                                    <div class="statisticLeft">
                                        <div class="statisticName">合同总数</div>
                                        <div class="statisticCount">{{statistics.ContractNumber}}</div>
                                    </div>
                                    <div class="statisticRight">
                                        <p class="icon">
                                            <MoneyCollectOutlined />
                                        </p>
                                    </div>
                                </div>
                                <div class="statisticItem">
                                    <div class="statisticLeft">
                                        <div class="statisticName">合同总金额</div>
                                        <div class="statisticCount">{{statistics.Total}}</div>
                                    </div>
                                    <div class="statisticRight">
                                        <p class="icon">
                                            <MoneyCollectOutlined />
                                        </p>
                                    </div>
                                </div>
                                <div class="statisticItem">
                                    <div class="statisticLeft">
                                        <div class="statisticName">履行中金额</div>
                                        <div class="statisticCount">{{statistics.ImplementTotal}}</div>
                                    </div>
                                    <div class="statisticRight">
                                        <p class="icon">
                                            <MoneyCollectOutlined />
                                        </p>
                                    </div>
                                </div>
                                <div class="statisticItem">
                                    <div class="statisticLeft">
                                        <div class="statisticName">暂停合同总金额</div>
                                        <div class="statisticCount">{{statistics.StopTotal}}</div>
                                    </div>
                                    <div class="statisticRight">
                                        <p class="icon">
                                            <MoneyCollectOutlined />
                                        </p>
                                    </div>
                                </div>
                                <div class="statisticItem">
                                    <div class="statisticLeft">
                                        <div class="statisticName">解除合同总金额</div>
                                        <div class="statisticCount">{{statistics.SuspendedTotal}}</div>
                                    </div>
                                    <div class="statisticRight">
                                        <p class="icon">
                                            <MoneyCollectOutlined />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                                <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
                                <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                                    :isCollapsed="isCollapsed"></Dtable>
                            </div>
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined, MoneyCollectOutlined, ApartmentOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import { formTreeData } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    import Dtable from "@/components/Dtable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";

    import { useRouter, useRoute } from "vue-router";
    import useExecution from "@/utils/contract/execution";

    const props = defineProps({
        title: {
            type: String,
            default: '标题'
        },
        treeTitle: {
            type: String,
            default: "分类"
        },
        isHead: {
            type: Boolean,
            default: true
        },
        isStatistics:  {
            type: Boolean,
            default: false
        },
        isTab: {
            type: Boolean,
            default: false
        },
        isSearch: {
            type: Boolean,
            default: true
        }
    })
    const { tabList } = useExecution();
    console.log("tabList", tabList);
    const route = useRoute();
    const router = useRouter();

    const expandedKeys = ref([]);
    const searchValue = ref("");
    const autoExpandParent = ref(true);
    const gData = ref([
        {
            text: '我的合同',
            key: 'myContract',
        },
        {
            text: '合同计划',
            key: 'myContractPlan',
        },
        {
            text: '付款管理',
            key: 'paymentOwner',
        },
        {
            text: '收款管理',
            key: 'receiptOwner',
        },
        {
            text: '发票管理',
            key: 'invoiceOwner',
        },
        {
            text: '合作方',
            key: 'myContractAccount',
        }
    ]);

    const onExpand = (keys) => {
        expandedKeys.value = keys;
        autoExpandParent.value = false;
    };

    let data = reactive({
        isCollapsed: false,
        tableHeight: '',
        fieldNames: {
            children: 'children', title: 'name', key: 'id'
        },
        tabs: tabList,
        activeKey: 0,
        queryParams: {},
        searchVal: "",
        treeId: "",
        id: "",
        statistics: {}
    });
    const handleCollapsed = () => {
        data.isCollapsed = !data.isCollapsed;
    };

    const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, searchVal,
        treeId, id, statistics } = toRefs(data);
    //   console.log("tabs", data.tabs);
    const tabContent = ref(null);
    const contentRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    onMounted(() => {
        window.addEventListener('resize', changeHeight);
        changeHeight();
    })
    const onSearch = (e) => {

    }
    const getStatistics = () => {
        proxy.$get(Interface.contract.execution.statistics, {
            Type: 0,
            ContractType: 2,
            objtypecode: 1010
        }).then(res => {
            console.log('res', res);
            data.statistics = res.data.listData.Table[0];
        })
    }
    getStatistics();
    function changeHeight(h) {
        if (typeof h == 'number') {
            formSearchHeight.value = h;
        }
        let tableHeight;
        let contentHeight = contentRef.value.clientHeight;
        let tabsHeight;
        if(props.isTab){
            tabsHeight = 46;
        }else {
            tabsHeight = 0;
        }
        let height = contentHeight - tabsHeight - formSearchHeight.value;
        tableHeight = height;
        if(props.isStatistics){
            tableHeight = tableHeight - 100; 
        }
        data.tableHeight = tableHeight;
        // console.log('data', data.tableHeight);
        // console.log("gridRef", gridRef.value.loadGrid())
        if(!props.isSearch){
            nextTick(()=>{
                gridRef.value.loadGrid();
            })
        }else {
            nextTick(()=>{
                gridRef.value.loadGrid();
            })
        }
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
    function handleTo(WFRuleLogId) {
        console.log("WFRuleLogId", WFRuleLogId);
        router.push({
            path: "/detail",
            query: {
                id: WFRuleLogId
            }
        });
    }
    const gridUrl = ref(Interface.contract.execution.list);

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
    .ant-row {
        height: 100%;
        .wea-left-right-layout-left{
            border-right: 1px solid #eaeaea;
            .treeHead{
                width: 100%;
                height: 52px;
                line-height: 52px;
                border-bottom: 1px solid #eaeaea;
                display: flex;
                align-items: center;
                padding: 20px;
                .icon{
                    padding-right: 10px;
                    font-size: 16px;
                }
            }
            .treebd{
                height: calc(~"100% - 52px");
                padding: 10px 0;
            }
        }
    }

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
            position: relative;
            &.active{
                height: 100%;
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
padding: 10px;
background: #efeff4;
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
    background: #fff;
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