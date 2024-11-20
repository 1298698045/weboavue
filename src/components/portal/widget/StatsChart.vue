<template>
    <div class="cardItem widgetItem card-header" :class="themeType">
        <!-- <div class="card-header">
            <div class="header-title">{{item.name}}</div>
        </div> -->
        <div class="statsCard_content">
            <div class="stats-card-container">
                <div class="stats-card-left">
                    <div class="stats-card-header">
                        <div class="stats-card-title">订单总数</div>
                    </div>
                    <div class="stats-card-main">
                        <p>&nbsp;<strong><span style="font-size:26px">&nbsp;</span><span style="font-size:28px"><span contenteditable="false" style="user-select:all">0</span></span></strong>&nbsp; 个</p>
                    </div>
                    <div class="stats-card-minor">
                        <div class="stats-card-minor-title">送货中</div>
                        <div class="stats-card-minor-content">
                            <p>
                                <span style="font-size: 12px;">
                                    <strong>
                                        <span contenteditable="false" style="user-select:all">0</span>
                                        &nbsp;
                                    </strong>
                                    个
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="stats-card-right">
                    <div class="echarts" :id="'echarts_'+item.i"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, onMounted, nextTick } from "vue";
    import * as echarts from "echarts";
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String
    });
    const data = reactive({
    });
    // const {  } = toRefs(data);

    onMounted(()=>{
        loadChartData(props.item);
    })

    const loadChartData = (item) => {
        var showChartDom = document.getElementById("echarts_" + item.i);
        var chartData = [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ];
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose(); //销毁
        }
        myChart = echarts.init(showChartDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            // legend: {
            //     top: '5%',
            //     left: 'center'
            // },
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
                    data: chartData
                }
            ]
        }

        option && myChart.setOption(option);
        myChart.resize();
    };

</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);
    .statsCard_content{
        padding: 5px 10px;
        flex: 1 1 auto;
        height: 100%;
        overflow: auto;
        .stats-card-container{
            height: 100%;
            width: 100%;
            display: flex;
            align-items: stretch;
            background-color: #fff;
            color: #666666;
            .stats-card-left{
                flex: 3 1;
                display: flex;
                flex-direction: column;
                margin: 6px 0 0 10px;
                .stats-card-header{
                    height: 20px;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    font-size: 14px;
                    color: #999;
                    .stats-card-title {
                        margin-right: 8px;
                    }
                }
                .stats-card-main{
                    margin: 4px 0;
                    flex: auto;
                    overflow: hidden;
                    &>p{
                        margin: 0;
                    }
                }
                .stats-card-minor {
                    flex: none;
                    font-size: 12px;
                    overflow: hidden;
                    line-height: 16px;
                    margin: 4px 0;
                    display: flex;
                    align-items: center;
                    .stats-card-minor-title {
                        flex: none;
                        color: #999;
                        margin-right: 10px;
                    }
                    .stats-card-minor-content {
                        margin: 4px 0;
                        p{
                            margin: unset;
                        }
                    }
                }
            }
            .stats-card-right{
                flex: 1 1;
                display: flex;
                align-items: center;
                justify-content: center;
                .echarts{
                    width: 100%;
                    height: 100%;
                    min-width: 100px;
                    min-height: 100px;
                    max-width: 120px;
                }
            }
        }
    }
</style>