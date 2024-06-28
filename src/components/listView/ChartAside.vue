<template>
    <div class="chartPanel">
        <div class="panelHeader">
            <h2 class="panelTitle">图表</h2>
            <a-button type="link" @click="handleCloseModal">
                <CloseOutlined style="color:rgb(116, 116, 116)" />
            </a-button>
        </div>
        <div class="panelBody">
            <div class="chartPicklistWrapper">
                <FhSelect label="选择图表" v-if="chartOptions.length" :options="chartOptions" @row="changeChart" />
            </div>
            <div class="chartContainer">
                <div id="showChart" style="width: 100%;height: 100%;"></div>
            </div>
            <div class="chartSettings">
                <a href="javascript:;" class="trigger">
                    <a-dropdown :trigger="['click']">
                        <template #overlay>
                            <div class="chartMenu">
                                <ul>
                                    <li class="sectionHead">显示为</li>
                                    <li v-for="(item, index) in chartTypes" :key="index">
                                        <a href="javascript:;" @click="changeChartType(item.value)">
                                            {{item.name}}
                                        </a>
                                    </li>
                                    <!-- <li>
                                        <a href="javascript:;" @click="changeChartType('level-bar-simple')">
                                            水平条形图
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="changeChartType('pie-doughnut')">
                                            圈形图
                                        </a>
                                    </li> -->
                                    <li class="sectionHead uiMenuItemSeparator"></li>
                                    <!-- <li>
                                        <a href="javascript:;" @click="handleNewChart">
                                            新建图表
                                        </a>
                                    </li> -->
                                    
                                    <li v-for="(item, index) in chartActions" :key="index">
                                        <a href="javascript:;" @click="handleActionsChart(item)">
                                            {{item.label}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-31cpu082oko=""
                            data-key="settings" class="fh-icon fh-icon_xx-small">
                            <g lwc-31cpu082oko="">
                                <path
                                    d="M261 191c-39 0-70 31-70 70s31 70 70 70 70-31 70-70-31-70-70-70zm210 133l-37-31a195 195 0 000-68l37-31c12-10 16-28 8-42l-16-28a34 34 0 00-40-14l-46 17a168 168 0 00-59-34l-8-47c-3-16-17-25-33-25h-32c-16 0-30 9-33 25l-8 46a180 180 0 00-60 34l-46-17-11-2c-12 0-23 6-29 16l-16 28c-8 14-5 32 8 42l37 31a195 195 0 000 68l-37 31a34 34 0 00-8 42l16 28a34 34 0 0040 14l46-17c18 16 38 27 59 34l8 48a33 33 0 0033 27h32c16 0 30-12 33-28l8-48a170 170 0 0062-37l43 17 12 2c12 0 23-6 29-16l15-26c9-11 5-29-7-39zm-210 47c-61 0-110-49-110-110s49-110 110-110 110 49 110 110-49 110-110 110z"
                                    lwc-31cpu082oko=""></path>
                            </g>
                        </svg>
                    </a-dropdown>
                </a>
                
            </div>
            <ul class="chartInfo">
                <li v-for="(item,index) in listData" :key="index">
                    <span class="chartInfoLeft">{{item.label}}</span>
                    <span class="chartInfoRight">{{item.value}}</span>
                    <div style="clear:both;"></div>
                </li>
            </ul>
        </div>
    </div>
    <NewChart :isShow="isNewChart" v-if="isNewChart" @cancel="isNewChart=false" :filterId="filterId" :sObjectName="sObjectName" @success="success" />
    <Delete :isShow="isDelete" v-if="isDelete" @cancel="isDelete=false" desc="确定要删除当前图表吗？" sObjectName="ListViewChart" objTypeCode="1040" :recordId="recordId" @ok="getMethodData" />
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits, defineExpose } from "vue";
    import { CloseOutlined } from "@ant-design/icons-vue";
    import ChartConfig from "@/components/design/ChartConfig.vue";
    import FhSelect from "@/components/defaultForm/Fh_select.vue";
    import NewChart from "@/components/listView/NewChart.vue";
    import Delete from "@/components/listView/Delete.vue";
    import * as echarts from "echarts";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        filterId: String,
        sObjectName: String
    })
    const emit = defineEmits(['close']);
    const data = reactive({
        isNewChart: false,
        chartType: "vbar", 
        chartTypes: [],
        chartActions: [],
        newChartAction: [],
        chartOptions: [],
        listData: [],
        isDelete: false,
        recordId: ""
    });
    const { isNewChart, chartType, chartTypes, chartActions, newChartAction, chartOptions, listData, isDelete, recordId } = toRefs(data);
    
    const getMethodData = () => {
        let obj = {
            actions: [{
                id: "0157;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    scope: "Lead",
                    listViewId: props.filterId
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.listView.chartData, d).then(res=>{
            let { chartTypes, chartActions, newChartAction, chartOptions } = res.actions[0].returnValue;
            data.chartTypes = chartTypes;
            data.newChartAction = newChartAction;
            data.chartActions = chartActions;
            data.chartOptions = chartOptions;

        })
    }
    getMethodData();
    
    const getChartItems = (row) => {
        let obj = {
            actions: [{
                id: "4306;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    listViewId: row.listViewId,
                    chartId: row.id,
                    developerName: props.sObjectName,
                    groupingField: props.groupingField,
                    aggregateField: row.aggregateField,
                    aggregateType: row.aggregateType,
                    scope: "Opportunity"
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.listView.chartItems, d).then(res=>{
            data.listData = res.actions[0].returnValue;
            loadChartData();
        })
    }
    const changeChart = (row) => {
        data.recordId = row.id;
        getChartItems(row);
    }
    const getChartList = () => {
        proxy.$(Interface.listView.chartList, {}).then(res=>{

        })
    }
    const success = () => {
        data.isNewChart = false;
    }
    const loadChartData = () => {
        nextTick(()=>{
            let lables = data.listData.map(item=>item.label);
            let values = data.listData.map(item=>item.value);
            let pieValues = data.listData.map(item=>{
                item.name = item.label;
                return item;
            })
            var chartDom = document.getElementById("showChart");
            var myChart;
            if (myChart != null && myChart != "" && myChart != undefined) {
                myChart.dispose(); //销毁
            }
            myChart = echarts.init(chartDom);
            var option = "";
            if (data.chartType == 'vbar') {
                option = {
                    xAxis: {
                        type: 'category',
                        data: lables
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                        data: values,
                        type: 'bar'
                        }
                    ],
                    title: {
                        // text: "标题",
                        textStyle: {
                            textAlign: "center"
                        }
                    },
                };
            } else if(data.chartType == 'hbar'){
                option = {
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: labels
                    },
                    series: [
                        {
                            data: values,
                            type: 'bar'
                        }
                    ],
                    title: {
                        text: "标题",
                        textStyle: {
                            textAlign: "center"
                        }
                    },
                };
            } else if(data.chartType == 'pie'){
                option = {
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
                        data: pieValues
                        }
                    ]
                };
            }
            option && myChart.setOption(option);
        })
    };
    
    onMounted(()=>{
        // loadChartData();
    })
    const handleNewChart = () => {
        console.log("newChart");
        data.isNewChart = true;
    };
    const handleActionsChart = (item) => {
        if(item.devNameOrId=='NewObjectHomeChartAction'){
            data.isNewChart = true;
        } else if(item.devNameOrId=='DeleteObjectHomeChartAction'){
            data.isDelete = true;
        }
    }
    const handleCloseModal = () => {
        emit("close", false);
    };
    const changeChartType = (type) => {
        data.chartType = type;
        loadChartData();
    }
</script>
<style lang="less" scoped>
    .chartPanel {
        height: 100%;
        width: 100%;
        overflow: hidden;
        .panelHeader {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: #fff;
            border-bottom: 1px solid rgb(229, 229, 229);

            .panelTitle {
                font-weight: inherit;
                font-size: 16px;
            }
        }

        .panelBody {
            padding: 12px 12px 0 12px;
            background: #fff;
            height: calc(~"100% - 57px");
            font-size: 14px;
            overflow: auto;
            .chartPicklistWrapper{
                margin-bottom: 26px;
            }
            .chartContainer{
                width: 99%;
                height: 257px;
            }
            .chartSettings {
                position: relative;

                .trigger {
                    display: inline-block;
                    width: 100%;
                    text-align: right;
                    color: #444444;
                    padding: 16px;
                }
                .trigger:focus{
                    .fh-icon{
                        box-shadow: 0 0 3px #0176d3;
                        border-radius: 4px;
                    }
                }
            }

            .chartInfo {
                li {
                    padding: 16px 0;
                    border-top: 1px solid #e5e5e5;

                    .chartInfoLeft {
                        float: left;
                        width: 60%;
                        word-wrap: break-word;
                    }

                    .chartInfoRight {
                        float: right;
                        width: 30%;
                        word-wrap: break-word;
                    }
                }
            }
        }
    }
    .chartMenu{
        min-width: 100px;
        max-width: 400px;
        padding: 0;
        border-radius: 3px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .75);
        border: none;
        transform: none;
        display: block;
        background: #fff;
        ul{
            li{
                border-bottom: 1px solid #e5e5e5;
                font-size: 14px;
                font-weight: 400;
                a{
                    display: block;
                    width: 100%;
                    color: #181818;
                    height: auto;
                    padding: 8px;
                    text-decoration: none;
                    font-size: 12px;
                    &:hover{
                        background: #f3f3f3;
                    }
                }
            }
            .sectionHead{
                background: #f3f3f3;
                border-bottom: 1px solid #e5e5e5;
                color: #444444;
                font-size: 12px;
                text-transform: uppercase;
                padding: 8px;
            }
        }
    }
</style>