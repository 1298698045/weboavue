<template>
    <div class="cardItem widgetItem" :class="themeType">
        <div class="card-header" v-if="themeType=='modern'">
            <div class="header-title">{{item.name}}</div>
        </div>
        <div class="item-default-header" v-if="themeType=='default'">
            <span class="item-default-header-title">
                <span class="title-font">{{item.name}}</span>
            </span>
            <span class="toolbar">
                <ul>
                    <li>
                        <a href="javascript:void(0);" name="refreshbtn" title="刷新">
                            <img :src="require('@/assets/img/refresh_wev8.png')" border="0" alt="">
                        </a>
                    </li>
                    <li style="width: 34px;">
                        <a href="javascript:void(0);">
                            <img class="imgMore" :src="require('@/assets/img/more_wev8.png')" border="0" alt="" title="更多">
                        </a>
                    </li>
                </ul>
            </span>
        </div>
        
        <template v-if="themeType=='light'">
            <div class="dashGridItem">
                <h2 class="defaultHeading">
                    <div class="gridHeader truncation" :title="item.name">{{item.name}}</div>
                    <div class="gridTitle truncation"></div>
                </h2>
                <div class="table-container" style="height: calc(100% - 90px);">
                    <div class="chart-wrapper">
                        <div :id="'showChart_' + item.i" style="width: 100%; height: 200px"></div>
                    </div>
                </div>
                <div class="actions">
                    <span>
                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.8 2H33.3c-1 0-1.3.9-.5 1.7l4.9 4.9-9 9c-.5.5-.5 1.3 0 1.9l3.7 3.7c.5.5 1.3.5 1.9 0l9.1-9.1 4.9 4.9c.8.8 1.7.5 1.7-.5V3.1c0-.6-.6-1.1-1.2-1.1zM3.5 50h15.4c1 0 1.3-1.1.5-1.9l-4.9-5 9-9.1c.5-.5.5-1.4 0-1.9l-3.7-3.7c-.5-.5-1.3-.5-1.9 0l-9 9-5-4.9C3 31.7 2 32 2 33v15.4c0 .7.8 1.6 1.5 1.6zM50 48.8V33.3c0-1-.9-1.3-1.7-.5l-4.9 4.9-9-9c-.5-.5-1.3-.5-1.9 0l-3.7 3.7c-.5.5-.5 1.3 0 1.9l9.1 9.1-4.9 4.9c-.8.8-.5 1.7.5 1.7h15.4c.6 0 1.1-.6 1.1-1.2zM2 3.5v15.4c0 1 1.1 1.3 1.9.5l5-4.9 9.1 9c.5.5 1.4.5 1.9 0l3.7-3.7c.5-.5.5-1.3 0-1.9l-9-9 4.9-5C20.3 3 20 2 19 2H3.6C2.9 2 2 2.8 2 3.5z"></path></svg>
                    </span>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="card-body">
                <div class="chart-wrapper">
                    <div :id="'showChart_' + item.i" style="width: 100%; height: 200px"></div>
                </div>
            </div>
            <div class="card-foot"></div>
        </template>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, nextTick, onMounted, watch } from "vue";
    import * as echarts from "echarts";
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String
    });
    onMounted(() => {
        nextTick(() => {
            setTimeout(()=>{
                loadChartData(props.item);
            }, 1000)
        });
    });

    watch(()=>props.item.chartType, (newVal, oldVal)=>{
        nextTick(() => {
            setTimeout(()=>{
                loadChartData(props.item);
            }, 1000)
        });
    });

    const loadChartData = (item) => {
        var showChartDom = document.getElementById("showChart_" + item.i);
        if(showChartDom){
            var chartData = [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var chartName = [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月",
            ];
            var myChart;
            if (myChart != null && myChart != "" && myChart != undefined) {
                myChart.dispose(); //销毁
            }
            myChart = echarts.init(showChartDom);
            var option;
            if(props.item.chartType == 'line-category'){
                option = loadPieSimpleChart(chartName, chartData);
            }
            switch(props.item.chartType){
                case 'pie-simple':
                    option = loadPieSimpleChart(chartName, chartData);
                    break;
                case 'pie-half-donut':
                    option = loadPieHalfChart(chartName, chartData);
                    break;
                case 'bar-y-category':
                    option = loadBarYChart(chartName, chartData);
                    break;
                case 'line-category':
                    option = loadLineChart(chartName, chartData);
                    break;
            }
            option && myChart.setOption(option);
            myChart.resize();
        }
    };
    
    // 折线图
    const loadLineChart = (chartName, chartData) => {
        let chartOption = {
            title: {
                text: "",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
            },
            color: ["#165dff"],
            legend: {
                show: false,
                data: ["发布帖子数量"],
            },
            grid: {
                show: false,
                left: "5%",
                top: "10%",
                right: "5%",
                bottom: "10%",
            },
            xAxis: {
                data: chartName,
                axisLabel: {
                    interval: 0,
                    //rotate: 15,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: {
                type: "value",
                name: "发布帖子数量",
                nameLocation: "center",
                nameGap: 50,
                nameTextStyle: {
                    fontSize: 14,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            series: [
                {
                    name: "发布帖子数量",
                    type: "line",
                    symbol: "circle",
                    symbolSize: 5,
                    data: chartData,
                    label: {
                        show: true,
                        position: "top",
                        formatter: "{@value}",
                    },
                },
            ]
        };
        return chartOption;
    }

    // 水平条形图
    const loadBarYChart = () => {
        var labels = ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'];
        var boundaryGap = ['18203','18203','18203','123123','123123','232333'];
        var series = [
            {
                name: '2011',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ];
        let chartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: labels
            },
            series: {
                type: 'bar',
                data: boundaryGap,
                label: {
                    show: true,
                    formatter(param) {
                        return param.value;
                    }
                },
            }
        };
        return chartOption;
    }

    // 半环形图
    const loadPieHalfChart = () => {
        var data = [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
            {
                value: 1048 + 735 + 580 + 484 + 300,
                itemStyle: {
                    color: 'none',
                    decal: {
                        symbol: 'none'
                    }
                },
                label: {
                    show: false
                }
            }
        ]
        let chartOption = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center',
                // doesn't perfectly work with our tricks, disable it
                selectedMode: false
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '70%'],
                    startAngle: 180,
                    label: {
                        show: true,
                        formatter(param) {
                            // correct the percentage
                            return param.name + ' ' + param.value + ' (' + param.percent * 2 + '%)';
                        }
                    },
                    data: data
                }
            ]
        };
        return chartOption;
    };

    // 圈形图
    const loadPieSimpleChart = () => {
        var data = [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ]
        var chartOption = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
        return chartOption;
    }



</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);

    .chart-wrapper{
        width: 100%;
        height: 100%;
        padding: 20px;
    }
</style>