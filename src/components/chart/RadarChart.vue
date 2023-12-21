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
            // title: {
            //     text: 'Basic Radar Chart'
            // },
            legend: {
                data: ['Allocated Budget', 'Actual Spending']
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: 'Sales', max: 6500 },
                    { name: 'Administration', max: 16000 },
                    { name: 'Information Technology', max: 30000 },
                    { name: 'Customer Support', max: 38000 },
                    { name: 'Development', max: 52000 },
                    { name: 'Marketing', max: 25000 }
                ]
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        {
                            value: [4200, 3000, 20000, 35000, 50000, 18000],
                            name: 'Allocated Budget'
                        },
                        {
                            value: [5000, 14000, 28000, 26000, 42000, 21000],
                            name: 'Actual Spending'
                        }
                    ]
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