<template>
    <div class="todoList">
        <div>
            <div class="headerBar">
                <div class="headerLeft">
                    <div class="icon-circle-base"></div>
                    <span class="headerTitle">合同进度完成情况</span>
                </div>
                <div class="headerRight">

                </div>
            </div>
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
        </div>
        <div v-if="activeKey==0" style="height: 100%;">
            <div class="center">
                <div class="rowCard">
                    <a-card :bordered="false" v-for="item in 4">
                        <div class="cardHead">
                            <span class="title">合同总金额</span>
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
                            </div>
                        </div>
                    </a-card>
                </div>
                <div class="rowCard">
                    <a-card class="w100" :bordered="false">
                        <div class="cardHead">
                            <span class="title">合同开票收款情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <StackingAreaChart className="chart"></StackingAreaChart>
                        </div>
                    </a-card>
                </div>
                <div class="rowCard">
                    <a-card class="w70" :bordered="false">
                        <div class="cardHead">
                            <span class="title">各大区合同开票收款情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <HistogramChartGroup className="chart4"></HistogramChartGroup>
                        </div>
                    </a-card>
                    <a-card class="w30" :bordered="false">
                        <div class="cardHead">
                            <span class="title">销售合同履行情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <RadarChart className="chart5"></RadarChart>
                        </div>
                    </a-card>
                </div>
            </div>
        </div>
        <div v-else-if="activeKey==1" style="height: 100%;">
            <div class="center">
                <div class="rowCard">
                    <a-card :bordered="false" v-for="item in 4">
                        <div class="cardHead">
                            <span class="title">合同总金额</span>
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
                            </div>
                        </div>
                    </a-card>
                </div>
                <div class="rowCard">
                    <a-card class="w100" :bordered="false">
                        <div class="cardHead">
                            <span class="title">合同收票付款情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <StackingAreaChart className="tah2Chart1"></StackingAreaChart>
                        </div>
                    </a-card>
                </div>
                <div class="rowCard">
                    <a-card class="w70" :bordered="false">
                        <div class="cardHead">
                            <span class="title">各大区收票付款情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <HistogramChartGroup className="tah2Chart2"></HistogramChartGroup>
                        </div>
                    </a-card>
                    <a-card class="w30" :bordered="false">
                        <div class="cardHead">
                            <span class="title">采购合同履行情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <Pie className="tah2Chart3"></Pie>
                        </div>
                    </a-card>
                </div>
            </div>
        </div>
        <!-- <div class="center" v-else>
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
        </div> -->
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
    import "@/style/reportForms.less";

    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps } from "vue";

    import Pie from "@/components/chart/Pie.vue";
    import Bar from "@/components/chart/Bar.vue";
    import ColumnChart from "@/components/chart/ColumnChart.vue";
    import StackingAreaChart from "@/components/chart/StackingAreaChart.vue";
    import LineChart from "@/components/chart/LineChart.vue";
    import HistogramChartGroup from "@/components/chart/HistogramChartGroup.vue";
    import RadarChart  from "@/components/chart/RadarChart.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import { message } from "ant-design-vue";

    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const router = useRouter();

    let data = reactive({
        isCollapsed: false,
        tableHeight: '',
        fieldNames: {
            children: 'children', title: 'name', key: 'id'
        },
        tabs: [
            {
                label: "销售类合同",
                key: 1
            },
            {
                label: "采购类合同",
                key: 2
            }
        ],
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
        data.activeKey = e;
    }
    const handleMax = () => {
        data.isMax = true;
    }
</script>