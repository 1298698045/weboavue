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
    .chartWrap {
        width: 100%;
        height: 200px;

        .chart {
            width: 100%;
            height: 100%;
        }
    }
</style>