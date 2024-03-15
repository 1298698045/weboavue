<template>
    <div class="wrappper">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base"></div>
                <span class="headerTitle">会议报表</span>
            </div>
            <div class="headerRight">

            </div>
        </div>
        <div class="center">
            <div class="panel">
                <div class="panel-head">
                    <div>
                        请选择年份&nbsp;&nbsp;<a-date-picker picker="year"  @change="changeYear" :format="yearFormat" v-model:value="year" />
                    </div>
                </div>
                <div class="panel-bd">
                    <ul class="uls">
                        <li class="countItem">
                            <div class="countItemTitle">
                                会议室预约次数
                            </div>
                            <p>总预约次数：{{countObj.ResTotalNum}}</p>
                            <p>我的预约次数:{{countObj.MyResNum}}</p>
                        </li>
                        <li class="countItem">
                            <div class="countItemTitle">
                                会议室数量
                            </div>
                            <p>会议室数量：{{countObj.OrgNum}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="panel">
                <div class="room">
                    <div class="roomHead">
                        <div class="roomTitle">会议室</div>
                        <div class="roomCheck">
                            <div class="roomCheckItem" :class="{'active':item.checkbox==true}" @click="handleSelectRoom(item)" v-for="(item,index) in rooms" :key="index">
                                {{item.Name}}
                            </div>
                            <div class="roomCheckItem default" @click="clearRoomSelect">清除选择</div>
                        </div>
                    </div>
                    <div class="roomBody">
                        <div id="canvas" ref="chartMain" style="width: 100%; height: 400px"></div>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">会议室预约次数统计</div>
                    <div class="panel-btn">
                        <a-button :icon="h(UndoOutlined)"></a-button>
                        <a-button class="ml10" :icon="h(UndoOutlined)"></a-button>
                    </div>
                </div>
                <div class="panel-bd">
                    <table class="roomTable">
                        <thead>
                            <tr>
                                <th>会议室</th>
                                <th v-for="(item,index) in xData" :key="index">{{item}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in seriesData" :key="index">
                                <td>{{item.name}}</td>
                                <td v-for="(row,idx) in item.data" :key="idx">{{row}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    // import "@/style/oldIcon/iconfont.css";
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
        h
    } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';

    import { SearchOutlined, UndoOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import * as echarts from "echarts";
    const { proxy } = getCurrentInstance();
    const chartMain = ref();
    const yearFormat = 'YYYY';
    const data = reactive({
        current: 1,
        xData: [],
        lineData: [],
        seriesData: [],
        listData: [],
        year: dayjs(new Date(), yearFormat),
        countObj: {},
        rooms: [],
        selectRoom: []
    });
    const { current, xData, lineData, seriesData, listData, year, countObj, rooms, selectRoom } = toRefs(data);
    onMounted(() => {
       
    });
    const clearRoomSelect = () => {
        data.selectRoom = [];
        data.rooms.forEach(item=>{
            item.checkbox = false;
        })
        getChartData();
    }
    // 选择会议室
    const handleSelectRoom = (item) => {
        console.log('data.selectRoom',data.selectRoom);
        let index = data.selectRoom.findIndex(row=>row==item.Id);
        if(index==-1){
            item.checkbox = true;
            data.selectRoom.push(item.Id);
        }else {
            item.checkbox = false;
            data.selectRoom.splice(index,1);
        }
        getChartData();
    }
    const changeYear = (e) => {
        data.year = dayjs(e, yearFormat);
        getQuery();
        getChartData();
    }
    const getQuery = () => {
        proxy.$get(Interface.meetingRpt.list,{
            type: 2
        }).then(res=>{
            data.listData = res.data;
            data.rooms = data.listData.map(item=>{
                item.checkbox = false;
                return item;
            });
        })
    }
    getQuery();
    const getChartData = () => {
        proxy.$get(Interface.meetingRpt.stat,{
            year: data.year.format("YYYY"),
            type: 2,
            ids: data.selectRoom.join(',')
        }).then(res=> {
            data.countObj = res;
            data.xData = res.data.xData;
            data.lineData = res.data.lineData;
            data.seriesData = res.data.seriesData.map(item=>{
                item.type = 'line';
                return item;
            })
            loadChart();
        })
    }
    getChartData();
    const loadChart = () => {
        var chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        myChart = echarts.init(chartMain.value);
        var option;
        var option = {
            title: {
                text: '会议室预约次数统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data.lineData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.xData
            },
            yAxis: {
                type: 'value'
            },
            series: data.seriesData
        };
        option && myChart.setOption(option);
    }
</script>
<style lang="less" scoped>
    .wrappper {
        width: 100%;
        height: 100%;

        .center {
            height: calc(~"100% - 52px");
            background: #fff;
            padding: 10px;
            overflow: auto;

            .panel {
                box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

                .uls {
                    display: flex;

                    .countItem {
                        width: 18%;
                        min-height: 100px;
                        border: 1px solid #dedede;
                        font-size: 14px;
                        border-radius: 4px;
                        margin-right: 20px;
                        padding: 10px;

                        .countItemTitle {
                            font-weight: 700;
                            font-size: 14px;
                        }

                        p {
                            margin-top: 10px;
                        }
                    }
                }

                .room {
                    border: 1px solid #dedede;
                    /* height: 300px; */
                    border-radius: 4px;

                    .roomHead {
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #dedede;

                        .roomTitle {
                            width: 15%;
                            background-color: #f2f2f2;
                            padding: 10px;
                            height: 100%;
                        }

                        .roomCheck {
                            display: flex;
                            align-items: center;

                            .roomCheckItem {
                                padding: 5px 10px;
                                border: 1px solid #dedede;
                                border-radius: 4px;
                                cursor: pointer;
                                margin-top: 4px;
                                margin-left: 15px;

                                &:hover {
                                    color: #fff;
                                    background-color: var(--backColor);
                                    border-color: var(--backColor);
                                }

                                &.active {
                                    color: #fff;
                                    background-color: var(--backColor);
                                    border-color: var(--backColor);
                                }
                            }
                        }
                    }
                }

                .roomTable {
                    width: 100%;
                    border-collapse: collapse;
                    border: 1px solid #dedede;

                    thead {
                        th {
                            background: #f2f2f2;
                        }
                    }
                    tr{
                        border-top: 1px solid #dedede;
                        border-bottom: 1px solid #dedede;
                    }
                    td,
                    th {
                        padding: 8px 10px;
                        border-top: 1px solid #dedede;
                        border-bottom: 1px solid #dedede;
                    }
                }
            }
        }
    }
</style>