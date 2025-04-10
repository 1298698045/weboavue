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
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, defineProps  } from "vue";
    import ContractReportForms from "@/components/contract/ContractReportForms.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        className: {
            type: String,
            id: 'chart'
        },
        chartValue: {
            type: Number,
        },
    })
    const data = reactive({

    });
    onMounted(()=>{
        loadChart();
    })
    const loadChart = () => {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(document.getElementById(props.className));
        var option;
        const gradient = new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: '#1044EE' },
            { offset: 1, color: '#00FFF6' }
        ]);
        option = {
            tooltip: {
                trigger: 'item'
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left'
            // },
            series: [
                {
                type: 'gauge',
                center: ['50%', '50%'],
                startAngle: 90,
                endAngle: -270,
                itemStyle: {
                    color: gradient
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                    width: 20,
                    color: [[1, '#eee']] // 底色
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    distance: -20,
                    color: '#999',
                    fontSize: 14
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '10%',
                    lineHeight: 40,
                    borderRadius: 4,
                    offsetCenter: [0, 0],
                    fontSize: 20,
                    fontWeight: 'bolder',
                    formatter: '{value} %',
                    color: '#000'
                },
                data: [
                    {
                    value: props.chartValue*1
                    }
                ]
                }
            ]
        };
        option && myChart.setOption(option);
    }
  </script>
  <style lang="less" scoped>
    .chartWrap{
        width: 100%;
        height: 200px;
        .chart{
            width: 100%;
            height: 100%;
            top: -8px;
        }
    }
  </style>