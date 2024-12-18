<template>
    <div class="chart-container" id="chartDiv">
        
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
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import * as echarts from "echarts";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();

  const props = defineProps({
    runReportData: Object,
    chartConfig: Object
  });

  const initialState = () => {
        return {
            chart: {
                title: ""
            },
            labels: [],
            values: [],
            listData: [],
            chartType: "hbar",
            groupings: [], // 一共有多少层级
            scatters: [],
            currentLevel: [],
        }
    }

//   const data = reactive({
//     chart: {
//         title: ""
//     },
//     labels: [],
//     values: [],
//     listData: [],
//     chartType: "hbar",
//     groupings: [], // 一共有多少层级
//     scatters: [],
//     currentLevel: [],
//   })
const data = reactive(initialState());
  const { chart, labels, listData, chartType, scatters, currentLevel } = toRefs(data);

  const loadFn = () => {
    Object.assign(data, initialState());

    data.currentLevel = [];
    console.log("props.runReportData", props.runReportData);
      if(props.runReportData){
        let chart = props.runReportData.reportMetadata.chart;
        data.chart.title = chart.title;
        let groupingColumnInfo = props.runReportData.reportExtendedMetadata.groupingColumnInfo;
        let chartData = props.runReportData.chartData;
        let factMap = props.runReportData.factMap;
        let groupings = chartData.groupingsDown.groupings;
        data.groupings = groupings;
        console.log("props:", props.chartConfig.groupings, groupings);
        if(props.chartConfig.groupings.length != chart.groupings.length){
            props.chartConfig.groupings.forEach(item=>{
                let index = chart.groupings.findIndex(row=>row==item);
                if(index!=-1){
                    data.currentLevel.push(index);
                }
            })
        }
        console.log("currentLevel", data.currentLevel);
        let labels = [];
        let labels2 = [];
        let labels3 = [];
        let listData = [];
        let values = [];
        let scatters = [];
        // chart.groupings.forEach(item=>{
        //     labels.push(groupingColumnInfo[item]);
        // })
    
        // data.labels = labels.map(item=>item.label);
    
        console.log('labels:', data.labels);
    
        // const formList = (arr) => {
        //     arr.forEach(item=>{
        //         if(item.groupings.length){
        //             formList(item.groupings);
        //         }
        //         if(item.key){
        //             listData.push(chartData.factMap[item.key+'!T'].aggregates[0].value)
        //         }
        //     })
        // }
        const formList = (list, level = 0, result = []) => {
            // console.log("props==", props)
            let len = data.currentLevel.length;
            list.forEach(item=>{
                item.level = level;
                if(len==1){
                    if(data.currentLevel[0] == 0){
                        labels.push(item.label);
                    }
                    if(data.currentLevel[0] == 1){
                        labels2.push(item.label);
                    }
                    if(data.currentLevel[0] == 2){
                        labels3.push(item.label);
                    }
                }
                // if(item.level==0){
                //     labels.push(item.label);
                // }
                // if(item.level == 1){
                //     labels2.push(item.label);
                // }
                // if(item.level == 2){
                //     labels3.push(item.label);
                // }
                if(item.groupings && item.groupings.length){
                    formList(item.groupings, level+1, result);
                }
                if(item.key != undefined){
                    let key = item.key+'!T';
                    scatters.push(chartData.factMap[key].aggregates.map(v=>v.value));
                    item.aggregates = chartData.factMap[key].aggregates;
                    if(item.groupings.length == 0){
                        chartData.factMap[key].aggregates.forEach(row=>{
                            values.push(row.value);
                            item.groupings.push(row);
                        });
                    }
                }
                
            })
        }
        formList(groupings);
        console.log("groupings-tree", groupings);
        console.log("chart-list", listData);
        console.log("labels-1", labels);
        console.log("labels-2", labels2);
        console.log("scatters:", scatters);
        data.scatters = scatters;
        data.values = values;
        var newLabels = [];
    
        for(let i = 0; i < labels.length; i++){
            var str = labels[i];
            if(labels2.length){
                str += '------' + labels2[i];
            }
            if(labels3.length){
                str += '-' + labels3[i];
            }
            newLabels.push(str);
        }
        console.log("newLabels", newLabels);
        data.labels = newLabels;
    
        for(let i = 1; i < newLabels.length; i++){
            listData.push({
                name: newLabels[i],
                value: values[i]
            })
        }
        data.listData = listData;
    
        nextTick(()=>{
            loadChart();
        })
      }
  }


  // 条形图
  const setChartHbarOption = () => {
    var option = {
        title:{
            text: data.chart.title,
            left: 'center',
        },
        tooltip: {
            trigger: 'item'
        },
        grid: {  
            left: '10%', // 或者一个具体的像素值，如 '60px'  
            right: '10%', // 右侧也留出一些空间，根据需要调整  
            bottom: '3%',  
            containLabel: true // 确保标签在 grid 区域内  
        },
        // legend: {
        //     show: true,
        //     data: data.labels
        // },
        yAxis: {
            type: 'category',
            data: data.labels,
            name: "客户名",
        },
        xAxis: {
            type: 'value',
            name: "记录计数"
        },
        series: [
            {
                data: data.values,
                type: 'bar',
                barWidth: '20px',  
                barGap: '10px',  
            }
        ],
        
    };
    return option;
  }
  // 列
  const setChartVbarOption = () => {
    var option = {
        title:{
            text: data.chart.title,
            left: 'center',
        },
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            data: data.labels,
            axisLabel: {  
                formatter: function (value) {  
                    return value.substring(0, 10) + '...';
                }  
            }  
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data.values,
                type: 'bar',
                barWidth: '56px',  
                barGap: '26px',
            }
        ],
        title:{
            text: data.chart.title,
            left: 'center',
        }
    };
    return option;
  }

  // 圈形
  const setChartDonutOption = () => {
    var option = {
        title: {
            text: data.chart.title,
            left: 'center',
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            orient: "right",
            left: 'right',
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
                data: data.listData
            }
        ]
    };
    return option;
  }

  // 线条
  const setChartLineOption = () => {
    const option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.labels,
            axisLabel: {  
                formatter: function (value) {  
                    return value.substring(0, 10) + '...';
                }  
            }  
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data.values,
                type: 'line',
                areaStyle: {}
            }
        ]
    };
    return option;
  }

  // 漏斗
  const setChartFunnelOption = () => {
    const option = {
        title: {
            text: data.chart.title,
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        // toolbox: {
        //     feature: {
        //         dataView: { readOnly: false },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        legend: {
            data: data.labels,
            top: '5%',
            orient: "right",
            left: 'right',
        },
        series: [
            {
                name: 'Funnel',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: false,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: data.listData
            }
        ]
    };
    return option;
  }

  // 散点图
  const setChartScatterOption = () => {
    var option = {
        title: {
            text: data.chart.title,
            left: "center"
        },
        xAxis: {
            name: "业务机会所有人",
        },
        yAxis: {
            name: "记录计数",
        },
        series: [
            {
                symbolSize: 20,
                data: data.scatters,
                type: 'scatter',
                symbolSize: 30
            }
        ]
    };
    return option;
  }

  watch(()=>props.chartConfig, (newVal, oldVal) => {
    // console.log("props.chartConfig:", props.chartConfig);
    if(newVal.chartType){
        data.chartType = newVal;
    }
    // loadChart();
    // nextTick(()=>{
    // })
    loadFn();
  }, {deep: true})

  var myChart;
  const loadChart = () => {
    var chartDom = document.getElementById("chartDiv");
    console.log("chartDom", chartDom)
    if (myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose(); //销毁
    }
    myChart = echarts.init(chartDom);
    var option = '';
    switch(data.chartType){
        case 'hbar':
            option = setChartHbarOption();
            break;
        case 'vbar':
            option = setChartVbarOption();
            break;
        case 'donut':
            option = setChartDonutOption();
            break;
        case 'scatter':
            option = setChartScatterOption();
            break;
        case 'line':
            option = setChartLineOption();
            break;
        case 'funnel':
            option = setChartFunnelOption();
            break;
    }
    option && myChart.setOption(option);
    myChart.resize();
  };
  loadFn();


</script>
<style lang="less" scoped>
    .chart-container{
        width: 100%;
        height: 100%;
    }
</style>