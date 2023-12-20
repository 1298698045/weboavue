<template>
    <div class="todoList">
        <div>
            <div class="headerBar">
                <div class="headerLeft">
                    <div class="icon-circle-base"></div>
                    <span class="headerTitle">{{title}}</span>
                </div>
                <div class="headerRight">

                </div>
            </div>
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
                </div>
            </div>
        </div>
        <div class="center" v-if="!isMax">
            <div class="rowCard">
                <a-card :bordered="false" v-for="item in 4">
                    <div class="cardHead">
                        <span class="title">销售合同书</span>
                        <span class="icon" @click="handleMax"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <div class="ditigal-data">
                            <div class="ditigal-data-text">198</div>
                        </div>
                        <div class="extra">
                            <div>
                                <span><span class="number-text">同比</span><span class="ml8 number">14%</span></span>
                                <span><i class="rpicon rpicon-caret-up" style="color: rgb(245, 34, 45); font-size: 12px; transform: scale(0.83); margin-left: 5px;"></i></span>
                            </div>
                            <div>
                                <span><span class="number-text">同比</span><span class="ml8 number">14%</span></span>
                                <span><i class="rpicon rpicon-caret-up" style="color: rgb(245, 34, 45); font-size: 12px; transform: scale(0.83); margin-left: 5px;"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="cardFooter">
                        <span><span class="number-text">销项履约中合同</span><span class="ml8 number">45</span></span>
                    </div>
                </a-card>
            </div>
            <div class="rowCard">
                <a-card :bordered="false">
                    <div class="cardHead">
                        <span class="title">合同金额占比（销售合同）</span>
                        <span class="icon"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <Pie className="chart"></Pie>
                    </div>
                </a-card>
                <a-card :bordered="false">
                    <div class="cardHead">
                        <span class="title">各大区销售排名</span>
                        <span class="icon"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <Bar className="chart1"></Bar>
                    </div>
                </a-card>
                <a-card :bordered="false">
                    <div class="cardHead">
                        <span class="title">合同金额占比-采购合同</span>
                        <span class="icon"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <Pie className="chart2"></Pie>
                    </div>
                </a-card>
                <a-card :bordered="false">
                    <div class="cardHead">
                        <span class="title">供应商</span>
                        <span class="icon"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <Bar className="chart3"></Bar>
                    </div>
                </a-card>
            </div>
            <div class="rowCard">
                <a-card class="card50" :bordered="false">
                    <div class="cardHead">
                        <span class="title">合同月度签约数及增长率（销售合同）</span>
                        <span class="icon"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <ColumnChart className="chart4"></ColumnChart>
                    </div>
                </a-card>
                <a-card class="card50" :bordered="false">
                    <div class="cardHead">
                        <span class="title">合同月度签约数及增长率（采购合同）</span>
                        <span class="icon"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <ColumnChart className="chart5"></ColumnChart>
                    </div>
                </a-card>
            </div>
            <div class="rowCard">
                <a-card class="card50" :bordered="false">
                    <div class="cardHead">
                        <span class="title">月度合同金额统计（销售合同）</span>
                        <span class="icon"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <StackingAreaChart className="chart6"></StackingAreaChart>
                    </div>
                </a-card>
                <a-card class="card50" :bordered="false">
                    <div class="cardHead">
                        <span class="title">月度合同统计（采购合同）</span>
                        <span class="icon"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <StackingAreaChart className="chart7"></StackingAreaChart>
                    </div>
                </a-card>
            </div>
        </div>
        <div class="center" v-else>
            <div class="rowCard" style="height: 100%;">
                <a-card class="w100" :bordered="false">
                    <div class="cardHead">
                        <span class="title">销售合同书</span>
                        <span class="icon" @click="handleMax"><ArrowsAltOutlined /></span>
                    </div>
                    <div class="cardBd">
                        <div class="ditigal-data">
                            <div class="ditigal-data-text">198</div>
                        </div>
                        <div class="extra">
                            <div>
                                <span><span class="number-text">同比</span><span class="ml8 number">14%</span></span>
                                <span><i class="rpicon rpicon-caret-up" style="color: rgb(245, 34, 45); font-size: 12px; transform: scale(0.83); margin-left: 5px;"></i></span>
                            </div>
                            <div>
                                <span><span class="number-text">同比</span><span class="ml8 number">14%</span></span>
                                <span><i class="rpicon rpicon-caret-up" style="color: rgb(245, 34, 45); font-size: 12px; transform: scale(0.83); margin-left: 5px;"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="cardFooter">
                        <span><span class="number-text">销项履约中合同</span><span class="ml8 number">45</span></span>
                    </div>
                </a-card>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        MoneyCollectOutlined, ArrowsAltOutlined
    } from "@ant-design/icons-vue";
    import "@/style/contractList.less";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps } from "vue";

    import Pie from "@/components/chart/Pie.vue";
    import Bar from "@/components/chart/Bar.vue";
    import ColumnChart from "@/components/chart/ColumnChart.vue";
    import StackingAreaChart from "@/components/chart/StackingAreaChart.vue";
    
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import { message } from "ant-design-vue";

    import { useRouter, useRoute } from "vue-router";
    import usePayment from "@/utils/contract/payment";
    const { tabList } = usePayment();


    const props = defineProps({
        title: {
            type: String,
            default: '标题'
        },
        isTab: {
            type: Boolean,
            default: false
        }
    })
    console.log("props", props.isSearch)
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
        searchVal: "",
        id: "",
        statistics: {},
        isMax: false
    });

    const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, searchVal,
        treeId, id, statistics, isMax } = toRefs(data);
    const tabContent = ref(null);
    const contentRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    onMounted(() => {
        window.addEventListener('resize', changeHeight)
    })
    const onSearch = (e) => {

    }
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
        let tableHeight;
        if (props.isStatistics) {
            tableHeight = height - 50;
        } else {
            tableHeight = height + 46;
        }
        if (props.isTab) {
            tableHeight = tableHeight - 42;
        }
        data.tableHeight = tableHeight;
        console.log('data', data.tableHeight);
        console.log("gridRef", gridRef.value.loadGrid())
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
    const changeTab = (e) => {
        console.log("e", e);
        data.activeKey = e;
        data.queryParams.activeKey = e;
        columns.value = data.tabs[e].table.columnsArray;
        gridRef.value.loadGrid(data.queryParams);
    }
    const handleMax = () => {
        data.isMax = true;
    }
</script>
<style lang="less" scoped>
    .center{
        background: #f4f4f4;
        height: calc(~"100% - 95px");
        padding: 8px 0 0 8px;
        overflow: auto;
        .rowCard{
            display: flex;
            .ant-card{
                width: calc(~"25% - 8px");
                margin-right: 8px;
                margin-bottom: 8px;
                border-radius: 0;
                
                .cardHead{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 30px;
                    line-height: 30px;
                    .title{
                        color: #444;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .icon{
                        color: #666;
                        font-size: 16px;
                        display: none;
                        cursor: pointer;
                    }
                }
                .cardBd{
                    min-height: 168px;
                    .ditigal-data{
                        display: flex;
                        padding: 20px 0;
                        justify-content: center;
                        flex-direction: column;
                        .ditigal-data-text{
                            height: 38px;
                            margin-bottom: 0;
                            overflow: hidden;
                            font-size: 28px;
                            color: rgb(51, 51, 51);
                            line-height: 38px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            word-break: break-all;
                            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
                        }
                    }
                    .extra{
                        display: flex;
                        &>div{
                            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
                            font-size: 16px;
                            margin-right: 16px;
                            
                        }
                    }
                    .number-text {
                        color: rgba(0,0,0,.65);
                    }
                    .number{
                        color: rgb(51, 51, 51);
                    }
                }
                .cardFooter{
                    position: relative;
                    padding-top: 9px;
                    margin-top: 8px;
                    border-top: 1px solid #e8e8e8;
                }
            }
            .ant-card.card50{
                width: calc(~"50% - 8px");
            }
            .ant-card.w100{
                width: 100%;
                height: 100%;
            }
            .ant-card:hover .icon{
                display: block !important;
            }
            .ant-card:last-child{
                margin-right: 0;
            }
        }
    }
</style>