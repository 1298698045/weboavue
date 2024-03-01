<template>
    <div class="todoList">
        <div>
            <div class="headerBar">
                <div class="headerLeft">
                    <div class="icon-circle-base">
                        <img :src="require('@/assets/img/rightMenu/hetong.png')" alt="">
                    </div>
                    <span class="headerTitle">合同签署情况</span>
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
        </div>
        <div v-else-if="activeKey==1" style="height: 100%;">
            <div class="center">
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
                    </a-card>
                </div>
                <div class="rowCard">
                    <a-card class="w70" :bordered="false">
                        <div class="cardHead">
                            <span class="title">各大区收票付款情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <HistogramChart className="tab2Chart1"></HistogramChart>
                        </div>
                    </a-card>
                    <a-card class="w30" :bordered="false">
                        <div class="cardHead">
                            <span class="title">采购合同履行情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <Pie className="tab2Chart2"></Pie>
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
                            <LineChart className="tab2Chart3"></LineChart>
                        </div>
                    </a-card>
                    <a-card class="w30" :bordered="false">
                        <div class="cardHead">
                            <span class="title">采购合同履行情况</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <Pie className="tab2Chart4"></Pie>
                        </div>
                    </a-card>
                </div>
                <div class="rowCard">
                    <a-card class="w100" :bordered="false">
                        <div class="cardHead">
                            <span class="title">审批时长明细</span>
                            <span class="icon"><ArrowsAltOutlined /></span>
                        </div>
                        <div class="cardBd">
                            <div class="foundationTable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>审批节点</th>
                                            <th>合同编号</th>
                                            <th>合同名称</th>
                                            <th>到达时间</th>
                                            <th>完成时间</th>
                                            <th>停留时长</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>部门经理</td>
                                            <td>CG-202112-010</td>
                                            <td>采购合同</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>24</td>
                                        </tr>
                                        <tr>
                                            <td>财务经理</td>
                                            <td>CG-202112-010</td>
                                            <td>采购合同</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>24</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">法务经理</td>
                                            <td>CG-202112-010</td>
                                            <td>采购合同</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>24</td>
                                        </tr>
                                        <tr>
                                            <td>CG-202112-010</td>
                                            <td>采购合同</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>24</td>
                                        </tr>
                                        <tr>
                                            <td>内部用印</td>
                                            <td>CG-202112-010</td>
                                            <td>采购合同</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>2021-12-12 14:00</td>
                                            <td>24</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
    import HistogramChart from "@/components/chart/HistogramChart.vue";
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
                label: "签订报表",
                key: 1
            },
            {
                label: "审批效率",
                key: 2
            },
            {
                label: "归档报表",
                key: 3
            },
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