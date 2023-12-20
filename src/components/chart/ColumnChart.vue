<template>
    <div class="chartWrap">
        <div class="chart" :id="className"></div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined, MoneyCollectOutlined
    } from "@ant-design/icons-vue";
    import * as echarts from "echarts";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, defineProps } from "vue";
    import ContractReportForms from "@/components/contract/ContractReportForms.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        className: {
            type: String,
            id: 'chart'
        }
    })
    const data = reactive({

    });
    onMounted(() => {
        loadChart();
    })
    const loadChart = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById(props.className));
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
            // toolbox: {
            //     feature: {
            //         dataView: { show: true, readOnly: false },
            //         magicType: { show: true, type: ['line', 'bar'] },
            //         restore: { show: true },
            //         saveAsImage: { show: true }
            //     }
            // },
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
</script>
<style lang="less" scoped>
    .chartWrap {
        width: 100%;
        height: 300px;
        .chart {
            width: 100%;
            height: 100%;
        }
    }
</style>