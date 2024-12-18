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
    chartConfig: Object,
    yName: String,
    summarieName: String,
    summarieLabels: Array
  });

  const data = reactive({
    chart: {
        title: ""
    },
    labels: [],
    values: [],
    listData: [],
    chartType: "hbar",
    groupings: [], // 一共有多少层级
    scatters: [],
    currentLevel: [], // length长度一共几层 // 0：1层 1：2层 2：3层
  })
  const { chart, labels, listData, chartType, scatters, currentLevel } = toRefs(data);
  const loadFn = () => {
        data.currentLevel = [];
        data.groupings = [];
        data.values = [];
        data.labels = [];
      if(props.runReportData){
        let chart = props.runReportData.reportMetadata.chart;
        data.chart.title = props.chartConfig.title;
        let groupingColumnInfo = props.runReportData.reportExtendedMetadata.groupingColumnInfo;
        let chartData = JSON.parse(JSON.stringify(props.runReportData.chartData));
        console.log("chartData-chart子组件:", chartData);
        let factMap = props.runReportData.factMap;
        if(chartData.groupingsDown){
            let groupings = JSON.parse(JSON.stringify(chartData.groupingsDown.groupings));
            data.groupings = groupings;
        }
        // console.log("data.groupings", data.groupings);
        // console.log("chart.groupings:", chart.groupings, props.chartConfig.groupings);
        let aggregates = props.runReportData.reportMetadata.aggregates; // 统计
        let aggregateIndex = [];
        props.chartConfig.summaries.forEach(item=>{
            let index = aggregates.findIndex(row=>row==item);
            if(index!=-1){
                aggregateIndex.push(index);
            }
        });
        // console.log("aggregateIndex", aggregateIndex);
        props.chartConfig.groupings.forEach((item,index)=>{
            let idx = chart.groupings.findIndex(row=>row==item);
            if(idx!=-1){
                data.currentLevel.push(idx);
            }else {
                // chart.groupings 这个没有更新的时候执行
                data.currentLevel.push(index);
            }
        })
        if(props.chartConfig.groupings.length != chart.groupings.length){
        }
        // console.log("currentLevel", data.currentLevel);
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
    
        // console.log('labels:', data.labels);
    
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
        let len = data.currentLevel.length;
        const formList = (list, level = 0, result = []) => {
            list.forEach(item=>{
                item.level = level;
                // if(item.level==0){
                //     labels.push(item.label);
                // }
                // if(item.level == 1){
                //     labels2.push(item.label);
                // }
                // if(item.level == 2){
                //     labels3.push(item.label);
                // }
                if(len==1){
                    // console.log("data.currentLevel[0]", data.currentLevel[0]);
                    if(data.currentLevel[0] == 0 && item.level==0){
                        labels.push(item.label);
                    }
                    if(data.currentLevel[0] == 1 && item.level==1){
                    // console.log("data.currentLevel[0]", data.currentLevel[0]);

                        labels2.push(item.label);
                    }
                    if(data.currentLevel[0] == 2 && item.level==2){
                        labels3.push(item.label);
                    }
                }
                if(len==2){
                    // console.log("data.currentLevel[0]", data.currentLevel[0]);
                    if(data.currentLevel[0] == 0 && item.level==0){
                        labels.push(item.label);
                    }
                    if(data.currentLevel[1] == 1 && item.level==1){
                    // console.log("data.currentLevel[0]", data.currentLevel[0]);

                        labels2.push(item.label);
                    }
                    if(data.currentLevel[0] == 1 && item.level==0){
                        labels.push(item.label);
                    }
                    if(data.currentLevel[1] == 0 && item.level==1){
                    // console.log("data.currentLevel[0]", data.currentLevel[0]);

                        labels2.push(item.label);
                    }
                }
                if(item.groupings.length){
                    formList(item.groupings, level+1, result);
                }
                let key = item.key+'!T';
                // scatters.push(factMap[key].aggregates.map(v=>v.value));
                item.aggregates = factMap[key]?.aggregates;
                if(item.groupings.length == 0){
                    // factMap[key].aggregates.forEach(row=>{
                    //     values.push(row.value);
                    //     item.groupings.push(row);
                    // });
                    if(aggregateIndex.length==1){
                        let num = aggregateIndex[0];
                        if(factMap[key]?.aggregates[num]){
                            values.push(factMap[key]?.aggregates[num]?.value);
                        }
                    }
                }
                if(aggregateIndex.length > 1){
                    let val = [];
                    for(let i = 0; i < aggregateIndex.length; i++){
                        let idx = aggregateIndex[i];
                        val.push(factMap[key]?.aggregates[idx].value);
                    }
                    scatters.push(val);
                }
                
            })
        }
        formList(data.groupings);
        console.log("groupings-tree", data.groupings);
        // console.log("chart-list", listData);
        // console.log("labels-1", labels);
        // console.log("labels-2", labels2);
        // console.log("scatters:", scatters);
        data.scatters = scatters;
        data.values = values;
        var newLabels = [];
    
        if(data.currentLevel[0]==0){
            for(let i = 0; i < labels.length; i++){
                var str = labels[i];
                if(labels2.length){
                    str += '------' + labels2[i];
                }
                if(labels3.length){
                    str += '------' + labels3[i];
                }
                newLabels.push(str);
            }
        }


        if(data.currentLevel[0]==1){
            for(let i = 0; i < labels2.length; i++){
                var str = labels2[i];
                if(labels.length){
                    str += '------' + labels[i];
                }
                newLabels.push(str);
            }
        }
        // console.log("newLabels", newLabels);
        // console.log("values", values);
        data.labels = newLabels;
    
        for(let i = 1; i < values.length; i++){
            listData.push({
                name: newLabels[i],
                value: values[i]
            })
        }
        data.listData = listData;
        console.log("CHART-listData:", listData);
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
            name: props.yName,
        },
        xAxis: {
            type: 'value',
            name: props.summarieName
        },
        series: [
            {
                data: data.values,
                label: {
                    show: props.chartConfig.showChartValues
                },
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
            name: props.yName,
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
                label: {
                    show: props.chartConfig.showChartValues
                },
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
    let legend = {};
    if(props.chartConfig.legendPosition=='Right'){
        legend = {
            top: '5%',
            orient: "vertical",
            left: 'right',
        }
    }else if(props.chartConfig.legendPosition == 'Bottom'){
        legend = {
            bottom: "bottom"
        }
    }
    
    var option = {
        title: {
            text: data.chart.title,
            left: 'center',
        },
        tooltip: {
            trigger: 'item'
        },
        legend: legend,
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: props.chartConfig.showChartValues || props.chartConfig.showChartPercentages,
                    position: 'inner',
                    formatter: props.chartConfig.showChartValues && props.chartConfig.showChartPercentages ? '{c} ({d}%)' : 
                    props.chartConfig.showChartValues ? '{c}' : props.chartConfig.showChartPercentages ? '{d}%' : ''
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
    let legend = {};
    if(props.chartConfig.legendPosition=='Right'){
        legend = {
            top: '5%',
            orient: "vertical",
            left: 'right',
        }
    }else if(props.chartConfig.legendPosition == 'Bottom'){
        legend = {
            bottom: "bottom"
        }
    }
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
        legend: legend,
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
                    show: props.chartConfig.showChartValues || props.chartConfig.showChartPercentages,
                    position: 'inner',
                    formatter: props.chartConfig.showChartValues && props.chartConfig.showChartPercentages ? '{c} {d}%' : 
                    props.chartConfig.showChartValues ? '{c}' : props.chartConfig.showChartPercentages ? '{d}%' : ''
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
            name: props.summarieLabels[0],
        },
        yAxis: {
            name: props.summarieLabels[1],
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
    // console.log("props.chartConfig", newVal);
    data.chartType = newVal.chartType;
    // loadChart();
    loadFn();
  }, {deep: true, immediate: true})

  const loadChart = () => {
    var chartDom = document.getElementById("chartDiv");
    var myChart;
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
    option && myChart.setOption(option, {
        notMerge: true
    });
    myChart.resize();
  };



</script>
<style lang="less" scoped>
    .chart-container{
        width: 100%;
        height: 100%;
    }
</style>