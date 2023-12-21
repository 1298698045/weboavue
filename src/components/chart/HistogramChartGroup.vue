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
        var data1 = [120, 200, 150, 100, 100, 100];
        var data2 = [180, 160, 210, 100, 100, 100];
        var xAxisData = ['上海大区', '江苏大区', '苏皖大区','浙闽大区','湖南大区','广州大区'];
        var option = {
            // title: {
            //     text: '多组柱状图'
            // },
            tooltip: {},
            legend: {
                data:['数据1', '数据2']
            },
            xAxis: {
                data: xAxisData
            },
            yAxis: {},
            series: [{
                name: '数据1',
                type: 'bar',
                data: data1
            }, {
                name: '数据2',
                type: 'bar',
                data: data2
            }]
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