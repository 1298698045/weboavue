<template>
    <div class="wrapper">
        <div class="row">
            <div class="itemBox" v-for="item in 4">
                <div class="topBox">
                    <div class="leftInfo">
                        <h5>
                            业绩达成
                            <a-dropdown>
                                <a class="menuText" @click.prevent>
                                    本年
                                    <DownOutlined />
                                </a>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item>全部</a-menu-item>
                                        <a-menu-item>本月</a-menu-item>
                                        <a-menu-item>本季</a-menu-item>
                                        <a-menu-item>本年</a-menu-item>
                                        <a-menu-item>上个月</a-menu-item>
                                        <a-menu-item>上一年</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </h5>
                        <div class="itemBoxBd">
                            <div class="infoWrap">
                                <div class="div_infor">
                                    <h3>128.00<i>万元</i></h3>
                                    <span>有效合同金额</span>
                                </div>
                                <!-- <div class="div_echarts" id="chart" style="width: 100px;height: 100px;" ref="chartMain"></div> -->
                            </div>
                        </div>
                    </div>
                    <div class="rightInfo">
                        <div class="div_echarts" id="chart" style="width: 100px;height: 100px;" ref="chartMain"></div>
                    </div>
                </div>
                
                <div class="itemBottom">
                    <span style="width: 100%; margin: 0px; display: inline-block;">
                        <img :src="require('@/assets/img/icon_02.png')">
                        目标金额：
                        <a href="/spa/portal/static/index.html#/main/portal/portal-166-1" target="_blank">
                            800.00万元（同指标排名：52名）</a>
                    </span>
                </div>
            </div>
        </div>
        <div class="row" style="height: 730px;">
            <div class="itemBox">
                <h3 class="head">
                    <i>——</i>
                    快捷入口
                    <i>——</i>
                </h3>
                <ul class="ul_quicklaunch">
                    <li class="li_carousel">
                        <h5>报价工具</h5>
                        <div class="toolWrap">
                            <a class="tool" target="_blank">
                                <img :src="require('@/assets/img/icon_type03.png')">
                                <h3>泛微今承达产品价格生成器</h3>
                            </a>
                            <a class="tool" target="_blank">
                                <img :src="require('@/assets/img/icon_type03.png')">
                                <h3>泛微今承达产品价格生成器</h3>
                            </a>
                            <a class="tool" target="_blank">
                                <img :src="require('@/assets/img/icon_type03.png')">
                                <h3>泛微今承达产品价格生成器</h3>
                            </a>
                        </div>
                    </li>
                    <li class="li_carousel">
                        <h5>常用模板</h5>
                        <div class="flowWrap">
                            <a href="javascript:;" class="flow">
                                <p>
                                    <img :src="require('@/assets/img/icon_type03.png')">
                                    <h3>产品销售合同模板</h3>
                                </p>
                                <span>产品销售合同模板</span>
                            </a>
                            <a href="javascript:;" class="flow">
                                <p>
                                    <img :src="require('@/assets/img/icon_type03.png')">
                                    <h3>产品销售合同模板</h3>
                                </p>
                                <span>产品销售合同模板</span>
                            </a>
                        </div>
                    </li>
                    <li class="li_carousel">
                        <h5>常用流程发起</h5>
                        <div class="flowWrap">
                            <a href="javascript:;" class="flow">
                                <p>
                                    <img :src="require('@/assets/img/icon_type03.png')">
                                    <h3>产品销售合同模板</h3>
                                </p>
                                <span>产品销售合同模板</span>
                            </a>
                            <a href="javascript:;" class="flow">
                                <p>
                                    <img :src="require('@/assets/img/icon_type03.png')">
                                    <h3>产品销售合同模板</h3>
                                </p>
                                <span>产品销售合同模板</span>
                            </a>
                            <a href="javascript:;" class="flow">
                                <p>
                                    <img :src="require('@/assets/img/icon_type03.png')">
                                    <h3>产品销售合同模板</h3>
                                </p>
                                <span>适用于售后服务运维类的，以专业服务为另一方解决特定问题所订立的合同</span>
                            </a>
                            <a href="javascript:;" class="flow">
                                <p>
                                    <img :src="require('@/assets/img/icon_type03.png')">
                                    <h3>产品销售合同模板</h3>
                                </p>
                                <span>适用于售后服务运维类的，以专业服务为另一方解决特定问题所订立的合同</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="itemBox parent" style="width: calc(50% - 10px);background: transparent;padding: 0;">
                <div class="itemBox itemBoxChild">
                    <div class="itemBoxHeader">
                        <span class="icon">
                        </span>
                        <p class="lname">合同审批</p>
                        <div class="right">
                            <span>
                                <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                            </span>
                            <span style="margin-left: 10px;">
                                <img :src="require('@/assets/img/more_wev8.png')" alt="">
                            </span>
                        </div>
                    </div>
                    <div class="content_view">
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="采购合同"></a-tab-pane>
                            <a-tab-pane key="2" tab="销售合同"></a-tab-pane>
                            <a-tab-pane key="3" tab="租凭合同"></a-tab-pane>
                            <a-tab-pane key="4" tab="人事合同"></a-tab-pane>
                        </a-tabs>
                        <div>
                            <table class="table">
                                <tbody>
                                    <tr v-for="item in 4">
                                        <td>
                                            <img :src="require('@/assets/img/pointer_wev8.png')" alt="">
                                        </td>
                                        <td>
                                            <span>
                                                <b><span>阿萨德饭阿萨德</span></b>
                                                <span><b>&nbsp;</b>（<span><span></span></span>：<span><span></span></span>）-<span><span>杨文元（演示账号）</span></span>-<span><span>2023-12-14</span></span></span>
                                            </span>
                                            <img :src="require('@/assets/img/BDNew_wev8.png')" alt="" class="wfremindimg">
                                            <img title="查看流转意见" class="portal_workflow_signaturesIcon"
                                                :src="require('@/assets/img/req_wev8.png')" width="14px" height="16px"
                                                alt="">
                                        </td>
                                        <td>
                                            <span>杨文元（演示账号）</span>
                                        </td>
                                        <td>
                                            <span>董事长办公室</span>
                                        </td>
                                        <td>
                                            <span>2023-12-14</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="itemBox itemBoxChild">
                    <div class="itemBoxHeader">
                        <p class="lname">合同履约</p>
                        <div class="right">
                            <span>
                                <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                            </span>
                            <span style="margin-left: 10px;">
                                <img :src="require('@/assets/img/more_wev8.png')" alt="">
                            </span>
                        </div>
                    </div>
                    <div class="content_view">
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="采购合同"></a-tab-pane>
                            <a-tab-pane key="2" tab="销售合同"></a-tab-pane>
                            <a-tab-pane key="3" tab="租凭合同"></a-tab-pane>
                            <a-tab-pane key="4" tab="人事合同"></a-tab-pane>
                        </a-tabs>
                        <div>
                            <table class="table">
                                <tbody>
                                    <tr v-for="item in 4">
                                        <td>
                                            <img :src="require('@/assets/img/pointer_wev8.png')" alt="">
                                        </td>
                                        <td>
                                            <span>
                                                <b><span>阿萨德饭阿萨德</span></b>
                                                <span><b>&nbsp;</b>（<span><span></span></span>：<span><span></span></span>）-<span><span>杨文元（演示账号）</span></span>-<span><span>2023-12-14</span></span></span>
                                            </span>
                                            <img title="查看流转意见" class="portal_workflow_signaturesIcon"
                                                :src="require('@/assets/img/req_wev8.png')" width="14px" height="16px"
                                                alt="">
                                        </td>
                                        <td>
                                            <span>杨文元（演示账号）</span>
                                        </td>
                                        <td>
                                            <span>董事长办公室</span>
                                        </td>
                                        <td>
                                            <span>2023-12-14</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="itemBox parent">
                <div class="itemBox itemBoxChild" style="height: calc(75% - 10px);">
                    <div class="itemBoxHeader">
                        <span class="icon">
                            <img :src="require('@/assets/img/elementIcon.png')" alt="">
                        </span>
                        <p class="lname">合同风险提醒</p>
                        <div class="right">
                            <span>
                                <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                            </span>
                            <span style="margin-left: 10px;">
                                <img :src="require('@/assets/img/more_wev8.png')" alt="">
                            </span>
                        </div>
                    </div>
                    <div class="content_view">
                        <div class="portal_Element portal_Element_ContractRisk">
                            <div class="totail">
                                <a target="_blank" href="#">
                                    <h3>14</h3>
                                    <p>未处理合同风险</p>
                                </a>
                                <a target="_blank" href="#">
                                    <h3>14</h3>
                                    <p>未处理合同风险</p>
                                </a>
                            </div>
                            <h5>风险详情：</h5>
                            <ul class="plate">
                                <li class="li_carousel">
                                    <h3>合同收付风险<i>4</i></h3>
                                    <div class="div_date">
                                        <p><span class="font">维森集团年度采购合同</span><span>进度款逾期风险</span></p>
                                        <p><span class="font">维森集团年度采购合同</span><span>进度款逾期风险</span></p>
                                        <p><span class="font">维森集团年度采购合同</span><span>进度款逾期风险</span></p>
                                        <p><span class="font">维森集团年度采购合同</span><span>进度款逾期风险</span></p>
                                    </div>
                                </li>
                                <li class="li_carousel">
                                    <h3>合同收付风险<i>4</i></h3>
                                    <div class="div_date">
                                        <p><span class="font">维森集团年度采购合同</span><span>进度款逾期风险</span></p>
                                        <p><span class="font">维森集团年度采购合同</span><span>进度款逾期风险</span></p>
                                        <p><span class="font">维森集团年度采购合同</span><span>进度款逾期风险</span></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="itemBox itemBoxChild" style="height: 25%;">
                    <div class="itemBoxHeader">
                        <span class="icon">
                            <img :src="require('@/assets/img/elementIcon.png')" alt="">
                        </span>
                        <p class="lname">合同风险提醒</p>
                        <div class="right">
                        </div>
                    </div>
                    <div class="content_view">
                        <div class="timeBox">
                            <a-timeline>
                                <a-timeline-item>
                                    <div>
                                        <span class="time">02/23</span>
                                        <span>泛微今承达合同管理制度</span>
                                    </div>
                                    <div>
                                        <span class="time">2023</span>
                                        <span>泛微今承达合同管理制度</span>
                                    </div>
                                </a-timeline-item>
                                <a-timeline-item>
                                    <div>
                                        <span class="time">02/23</span>
                                        <span>泛微今承达合同管理制度</span>
                                    </div>
                                    <div>
                                        <span class="time">2023</span>
                                        <span>泛微今承达合同管理制度</span>
                                    </div>
                                </a-timeline-item>
                            </a-timeline>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="itemBox paddingNone" style="width: calc(50% - 10px);">
                <div class="itemBoxHeader">
                    <span class="icon">
                    </span>
                    <p class="lname">月度应收统计</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <div id="chart5" style="width: 100%;height: 350px;"></div>
                </div>
            </div>
            <div class="itemBox paddingNone" style="width: calc(50% - 10px);">
                <div class="itemBoxHeader">
                    <span class="icon">
                    </span>
                    <p class="lname">合同趋势同比</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <div class="ul_header">
                        <li :class="{'active':chartCurrent==1}" @click="handleChartTab(1)">合同趋势同比分析</li>
                        <li :class="{'active':chartCurrent==2}" @click="handleChartTab(2)">合同趋势环比分析</li>
                    </div>
                    <div id="chart6" style="width: 100%;height: 300px;" v-if="chartCurrent==1"></div>
                    <div id="chart6_two" style="width: 100%;height: 300px;" v-else></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="itemBox paddingNone" style="width: calc(25% - 10px);">
                <div class="itemBoxHeader">
                    <span class="icon">
                    </span>
                    <p class="lname">产品占比分布</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <div id="chart7" style="width: 100%;height: 300px;"></div>
                </div>
            </div>
            <div class="itemBox paddingNone" style="width: calc(25% - 10px);">
                <div class="itemBoxHeader">
                    <span class="icon">
                    </span>
                    <p class="lname">合同执行情况</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <div id="chart8" style="width: 100%;height: 300px;"></div>
                </div>
            </div>
            <div class="itemBox paddingNone" style="width: calc(50% - 10px);">
                <div class="itemBoxHeader">
                    <span class="icon">
                    </span>
                    <p class="lname">采购金额情况</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <div id="chart9" style="width: 100%;height: 300px;"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        toRaw,
        inject,
        nextTick
    } from "vue";
    import {
        DownOutlined, WeiboCircleOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import * as echarts from "echarts";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        activeKey: '1',
        chartCurrent: 1
    });
    const { activeKey, chartCurrent } = toRefs(data);
    onMounted(() => {
        loadChart();
        loadChart5();
        loadChart6();
        loadChart7();
        loadChart8();
        loadChart9();
    })
    const handleChartTab = (index) => {
        data.chartCurrent = index;
        nextTick(()=>{
            if(index==1){
                loadChart6();
            }else {
                loadChart6_two();
            }
        })
    }
    // 环形图
    const loadChart = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById('chart'));
        var option;
        option = {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' }
                    ]
                }
            ]
        };
        option && myChart.setOption(option);
    }
    const loadChart5 = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById('chart5'));
        var option;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
                }
            },
            legend: {
                data: ['Evaporation', 'Precipitation', 'Temperature']
            },
            xAxis: [
                {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisPointer: {
                    type: 'shadow'
                }
                }
            ],
            yAxis: [
                {
                type: 'value',
                name: 'Precipitation',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
                },
                {
                type: 'value',
                name: 'Temperature',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} °C'
                }
                }
            ],
            series: [
                {
                name: 'Evaporation',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                    return value + ' ml';
                    }
                },
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ]
                },
                {
                name: 'Precipitation',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                    return value + ' ml';
                    }
                },
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ]
                },
                {
                name: 'Temperature',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                    return value + ' °C';
                    }
                },
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };
        option && myChart.setOption(option);
    }

    const loadChart6 = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById('chart6'));
        var option;
        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
                }
            ]
        };
        option && myChart.setOption(option);
    }

    const loadChart6_two = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById('chart6_two'));
        var option;
        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
                }
            ]
        };
        option && myChart.setOption(option);
    }
    
    const loadChart7 = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById('chart7'));
        var option;
        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '2%',
                left: 'center'
            },
            
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    formatter(param) {
                        return param.name + ' (' + param.percent * 2 + '%)';
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' }
                ]
                }
            ]
        };
        option && myChart.setOption(option);
        
    }
    const loadChart8 = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById('chart8'));
        var option;
        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '2%',
                left: 'center'
            },
            
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    formatter(param) {
                        return param.name + ' (' + param.percent * 2 + '%)';
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' }
                ]
                }
            ]
        };
        option && myChart.setOption(option);
    }
    const loadChart9 = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById('chart9'));
        var option;
        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
                }
            ]
        };
        option && myChart.setOption(option);
    }
</script>
<style lang="less" scoped>
    .wrapper {
        height: 100%;
        overflow: auto;
    }

    .row {
        display: flex;

        .itemBox {
            width: calc(~"25% - 10px");
            min-height: 165px;
            margin: 0px 10px 0px 0px;
            padding: 12px 15px;
            /* display: inline-block; */
            border-radius: 2px;
            background: rgb(255, 255, 255);
            cursor: pointer;
            vertical-align: top;
            position: relative;
            line-height: 1.6;
            margin-bottom: 10px;
            .topBox{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .leftInfo{
                    flex: 1;
                }
            }
            h5 {
                font-size: 13px;
                color: rgb(51, 51, 51);
                font-weight: normal;

                .menuText {
                    display: inline-block;
                    margin-left: 20px;
                    color: rgb(136, 136, 136);
                }
            }

            .infoWrap {
                /* padding: 2px 0px 5px; */
                display: flex;
                align-items: center;
                justify-content: space-between;

                .div_infor {
                    width: 80%;

                    h3 {
                        font-size: 24px;
                        line-height: 2;

                        i {
                            font-size: 12px;
                            color: rgb(51, 51, 51);
                            font-style: normal;
                            margin-left: 5px;
                            font-weight: normal;
                        }
                    }

                    span {
                        color: rgb(170, 170, 170);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .div_echarts {
                    width: 100px;
                    height: 100%;
                    z-index: 10;
                }

            }

            .itemBottom {
                margin-top: 8px;
                color: rgb(136, 136, 136);
                border-top: 1px solid rgb(233, 235, 237);
                padding-top: 10px;

                span {
                    img {
                        width: 16px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 6px;
                        margin-top: -2px;
                    }
                }

                a {
                    color: rgb(51, 51, 51);
                    text-decoration: none;
                }
            }

            .head {
                font-size: 14px;
                color: #2153B5;
                text-align: center;
                font-weight: normal;

                i {
                    color: #aaa;
                    font-size: 12px;
                    font-weight: normal;
                    margin: 0 15px;
                }
            }

            .ul_quicklaunch {
                .li_carousel {
                    padding: 12px 0;

                    h5 {
                        font-size: 12px;
                        color: #7D838D;
                        border-left: 3px solid #4A82F0;
                        padding-left: 10px;
                        font-weight: normal;
                        line-height: 16px;
                    }

                    .toolWrap {
                        padding: 10px 0 0;

                        .tool {
                            width: 50%;
                            display: inline-block;
                            position: relative;
                            padding: 8px 0;

                            &:hover {
                                background: #F0F3F8;
                                border-radius: 2px;
                                cursor: pointer;
                            }

                            img {
                                width: 20px;
                                display: inline-block;
                                position: absolute;
                                left: 5px;
                            }

                            h3 {
                                padding-left: 30px;
                                color: #333;
                                font-size: 12px;
                                font-weight: normal;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }

                    .flowWrap {
                        padding: 10px 0 0;

                        .flow {
                            padding: 10px 0 10px 30px;
                            position: relative;
                            display: block;

                            &:hover {
                                background: #F0F3F8;
                                border-radius: 2px;
                                cursor: pointer;
                            }

                            p {
                                img {
                                    width: 20px;
                                    display: inline-block;
                                    position: absolute;
                                    left: 5px;
                                }

                                h3 {
                                    font-size: 12px;
                                    font-weight: normal;
                                    color: #333;
                                }
                            }

                            span {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-top: 5px;
                                color: #aaa;
                                font-size: 12px;
                                display: inline-block;
                            }
                        }
                    }
                }
            }
        }

        .itemBox.parent {
            padding: 0;
            background: transparent;
        }

        .itemBox.itemBoxChild {
            width: 100%;
            margin: 0;
            height: calc(~"50% - 5px");
            padding: 0;

            &:first-child {
                margin-bottom: 10px;
            }
        }

        .itemBoxHeader {
            width: 100%;
            background-color: rgb(255, 255, 255);
            background-repeat: repeat;
            background-position: 0px 0px;
            border-style: none none solid;
            border-width: medium medium 1px;
            border-color: rgb(0, 0, 0) rgb(0, 0, 0) rgb(238, 238, 238);
            height: 50px;
            box-sizing: content-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                width: 20px;
                height: 20px;
                margin-left: 15px;
            }

            .lname {
                margin-left: 15px;
                line-height: 50px;
                font-size: 14px;
            }

            .right {
                text-align: right;
                line-height: 50px;
                padding-right: 20px;
            }
        }

        .content_view {
            padding: 5px;

            .tabs {
                font-size: 14px;
                line-height: 1.5;
                white-space: nowrap;
                border-bottom: 0 solid #f3f3f3;
            }

            .table {
                width: 100%;
                border-collapse: collapse;

                tr {
                    width: 100%;

                    &:hover {
                        background: #e9f7ff;
                    }
                    &:hover{
                        td{
                            .portal_workflow_signaturesIcon {
                                visibility: visible;
                            }
                        }
                    }
                    td {
                        border: none;
                        padding: 4px 1px 3px;
                        border-bottom: 1px solid #e2e2e2 !important;

                        img {
                            vertical-align: middle;
                        }
                        .wfremindimg{
                            vertical-align: top;
                            margin-left: 2px;
                        }
                        .portal_workflow_signaturesIcon {
                            width: 14px;
                            height: 16px;
                            margin-top: -8px;
                            margin-left: 10px;
                            visibility: hidden;
                        }
                    }
                }
            }
        }

        .portal_Element {
            .totail {
                padding: 10px 0 20px;
                border-bottom: 1px solid #eee;

                a {
                    width: 50%;
                    text-align: center;
                    display: inline-block;
                    vertical-align: middle;
                    color: #666;
                    font-size: 12px;

                    h3 {
                        font-size: 22px;
                        color: var(--textColor);
                        font-family: ui-serif;
                    }
                }
            }

            h5 {
                padding: 15px 0 10px;
                font-size: 12px;
                color: #aaa;
                font-weight: normal;
            }

            .plate {
                li {
                    padding: 10px 0;

                    h3 {
                        font-size: 14px;
                        font-weight: normal;
                        color: #333;
                        margin-bottom: 5px;

                        i {
                            padding: 0px 14px;
                            background-color: #e30303;
                            color: #fff;
                            border-radius: 50px;
                            font-style: normal;
                            float: right;
                            line-height: 17px;
                        }
                    }

                    .div_date {
                        p {
                            color: #888;
                            position: relative;
                            padding: 4px 0 4px 15px;
                            cursor: pointer;

                            &::before {
                                content: '';
                                width: 4px;
                                height: 4px;
                                border-radius: 50px;
                                background-color: #aaa;
                                display: block;
                                position: absolute;
                                left: 4px;
                                top: 13px;
                            }

                            .font {
                                width: 56%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                display: inline-block;
                                vertical-align: middle;
                            }

                            span:last-child {
                                margin-left: 10px;
                                vertical-align: middle;
                                color: #aaa;
                            }
                        }
                    }
                }
            }
        }

        .timeBox {
            margin: 10px 20px;

            .time {
                display: inline-block;
                width: 60px;
                color: var(--textColor);
            }
        }
    }

    .itemBox.paddingNone {
        padding: 0;
    }
    .ul_header{
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #eee;
        padding-left: 10px;
        font-size: 12px;
        color: #999;    
        position: relative;
        li{
            float: left;
            margin-left: 15px;
            &.active{
                color: #333;
                font-weight: bold;
            }
            
        }
    }
    .ul_header::after{
        content: '';
        position: absolute;
        width: 3px;
        height: 18px;
        left: 15px;
        top: 14px;
        background: #2b8cf9;
    }
</style>