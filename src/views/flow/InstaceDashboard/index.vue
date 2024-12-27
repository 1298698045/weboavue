<template>
    <div class="wrappper InstaceDashboardWrap">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base">
                    <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
                </div>
                <span class="headerTitle">会议报表</span>
            </div>
            <div class="headerRight">
                <div class="panel-head-top-right">
                    年份：&nbsp;&nbsp;<a-date-picker picker="year"  @change="changeYear" :format="yearFormat" v-model:value="year" />
                </div>
            </div>
        </div>
        <div class="center">
            <!-- <div class="panel panel-top">
                    <div class="panel-head">
                        <div class="panel-head-top-left">
                            <div class="tabWrap">
                                <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                                    <a-tab-pane v-for="(item, index) in tabs" :key="index">
                                        <template #tab>
                                            <span>{{ item.label }}</span>
                                        </template>
                                    </a-tab-pane>
                                </a-tabs>
                            </div>
                        </div>
                        <div class="panel-head-top-right">
                            选择年份：&nbsp;&nbsp;<a-date-picker picker="year"  @change="changeYear" :format="yearFormat" v-model:value="year" />
                        </div>
                    </div>
                </div> -->
            <div class="panel-all">
                    <div class="panel panel-abstract">
                        <div class="panel-bd">
                            <ul class="uls">
                                <li class="countItem">
                                    <div class="statistics-left">
                                        <PieChartOutlined style="color: #108def;" />
                                    </div>      
                                    <div class="statistics-right">
                                        <div class="statistics-count" name="ContractNumber" style="color: #000;">{{countObj.ResTotalNum||0}}</div>      
                                        <div class="statistics-name">发起总数</div> 
                                    </div> 
                                </li>
                                <li class="countItem">
                                    <div class="statistics-left">
                                        <ExclamationCircleOutlined style="color: red;" />
                                    </div>      
                                    <div class="statistics-right">
                                        <div class="statistics-count" name="ContractNumber" style="color: #000;">{{countObj.MyResNum||0}}</div>      
                                        <div class="statistics-name">逾期总数</div> 
                                    </div> 
                                </li>
                                <li class="countItem">
                                    <div class="statistics-left">
                                        <ClockCircleOutlined style="color: rgb(58, 200, 210);" />
                                    </div>      
                                    <div class="statistics-right">
                                        <div class="statistics-count" name="ContractNumber" style="color: #000;">{{countObj.OrgNum||0}}</div>      
                                        <div class="statistics-name">待办总数</div> 
                                    </div> 
                                </li>
                                <li class="countItem">
                                    <div class="statistics-left">
                                        <CheckCircleOutlined style="color: rgb(141, 193, 57);" />
                                    </div>      
                                    <div class="statistics-right">
                                        <div class="statistics-count" name="ContractNumber" style="color: #000;">{{countObj.OrgNum||0}}</div>      
                                        <div class="statistics-name">已完结</div> 
                                    </div> 
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">统计图表：</div>
                            <div class="panel-btn">
                            </div>
                        </div>
                        <div class="room">
                            <div class="tabWrap panel-bd-tabWrap">
                                <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                                    <a-tab-pane v-for="(item, index) in tabs" :key="index">
                                        <template #tab>
                                            <span>{{ item.label }}</span>
                                        </template>
                                    </a-tab-pane>
                                </a-tabs>
                            </div>
                            <div class="roomBody">
                                <div id="canvas" ref="chartMain" style="width: 100%; height: 400px"></div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">明细列表：</div>
                            <div class="panel-btn">
                                <!-- <a-button :icon="h(UndoOutlined)"></a-button> -->
                                <a-button class="ml10" :icon="h(UndoOutlined)"></a-button>
                            </div>
                        </div>
                        <div class="panel-bd">
                            <div class="tabWrap panel-bd-tabWrap">
                                <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                                    <a-tab-pane v-for="(item, index) in tabs" :key="index">
                                        <template #tab>
                                            <span>{{ item.label }}</span>
                                        </template>
                                    </a-tab-pane>
                                </a-tabs>
                            </div>
                            <table class="roomTable" v-if="activeKey==0">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>部门</th>
                                        <th>部门编码</th>
                                        <th>逾期数量</th>
                                        <th>待办数量</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in xData" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item||''}}</td>
                                        <td></td>
                                        <td>{{seriesData[1].data[index]||0}}</td>
                                        <td>{{seriesData[0].data[index]||0}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="roomTable" v-if="activeKey==1">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>姓名</th>
                                        <th>部门</th>
                                        <th>逾期数量</th>
                                        <th>待办数量</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in xData" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{'管理员'}}</td>
                                        <td>{{item||''}}</td>
                                        <td>{{seriesData[1].data[index]||0}}</td>
                                        <td>{{seriesData[0].data[index]||0}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
    import { girdFormatterValue } from "@/utils/common.js";
    import { SearchOutlined,UndoOutlined,ClockCircleOutlined,InfoCircleOutlined,CheckCircleOutlined,ExclamationCircleOutlined,PieChartOutlined } from "@ant-design/icons-vue";
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
        lineData2:[],
        seriesData: [],
        xData2: [],
        seriesData2: [],
        listData: [],
        year: dayjs(new Date('2023-01-01')),
        countObj: {},
        rooms: [],
        selectRoom: [],
        tabs: [
            {
            label: "部门",
            },
            {
            label: "人员",
            },
            {
            label: "流程",
            },
        ],
        activeKey: 0,
    });
    const { current, xData,xData2, lineData,lineData2,seriesData,seriesData2, listData, year, countObj, rooms, selectRoom,tabs,activeKey } = toRefs(data);
    const changeTabs = (e) => {
        data.activeKey = e;
        if(e==0){
            getQuery();
            getChartData();
        }
    };
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
            if(item.checkbox==false){
                item.checkbox = true;
            }
            else{
                item.checkbox = false;
            }
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
        // proxy.$get(Interface.meetingRpt.list,{
        //     type: 2
        // }).then(res=>{
        //     data.listData = res.data;
        //     data.rooms = data.listData.map(item=>{
        //         item.checkbox = true;
        //         return item;
        //     });
        // })
        let filterQuery='\nResourceTypeCode\teq\t2\nStatusCode\teq\t1';
        proxy.$post(Interface.list2, {
              filterId:'',
              objectTypeCode:'20034',
              entityName:'ResourceOrg',
              filterQuery:filterQuery,
              search:'',
              page: 1,
              rows: 100,
              sort:'SortNumber',
              order:'asc',
              displayColumns:'Name'
          }).then(res => {
              var list = [];
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                      if(cell=='CreatedOn'){
                          item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                      }
                  }
                  item['Id']=item.id;
                  item['checkbox']=true;
                  list.push(item)
              }
              data.rooms = list;
          })
    }
    getQuery();
    const getChartData = () => {
        data.countObj={};
        data.xData=[];
        data.lineData=[];
        data.seriesData=[];
        proxy.$get(Interface.meetingRpt.roomstat,{
            year: data.year.format("YYYY"),
            ids: data.selectRoom.join(',')
        }).then(res=> {
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                let statdata=res.actions[0].returnValue;
                statdata.xdata=['信息中心','消化内科','儿科','五区','六区','耳鼻咽喉','呼吸内科','呼吸与重症医学科','四区','骨科'];
                statdata.lineData=["待办","逾期"];
                data.countObj = statdata;
                data.xData = statdata.xData||statdata.xdata;
                data.lineData = statdata.lineData;
                // data.seriesData = statdata.seriesData.map(item=>{
                //     item.type = 'bar';
                //     return item;
                // })
                data.seriesData=[
                {
                    type:'bar',
                    name:'待办',
                    label: {
                    show: true,
                    //rotate: 60,
                    position: "top",
                    },
                    data:[2,3,2,4,6,8,3,5,1,5]
                },
                {
                    type:'bar',
                    name:'逾期',
                    label: {
                    show: true,
                    //rotate: 60,
                    position: "top",
                    },
                    data:[1,2,1,1,2,3,1,1,2,4]
                }
                ]
            }
            loadChart();
        })
        data.xData2=[];
        data.lineData2=[];
        data.seriesData2=[];
        proxy.$get(Interface.meetingRpt.peoplestat,{
            year: data.year.format("YYYY"),
            //ids: data.selectRoom.join(',')
        }).then(res=> {
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                let statdata=res.actions[0].returnValue;
                //data.countObj = statdata;
                data.xData2 = statdata.xData||statdata.xdata;
                data.lineData2 = statdata.lineData;
                data.seriesData2 = statdata.seriesData.map(item=>{
                    item.type = 'line';
                    return item;
                })
            }
            //loadChart();
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
                text: ''
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
                //boundaryGap: false,
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
        .panel-all{
            // background: #e8edf4;
            // padding: 10px;
            height: calc(~'100% - 0px');
            background: #fff;
            //padding: 10px;
            overflow: auto;
        }
        .panel{
            box-shadow: none !important;
            // margin: 0;
            // padding: 0 10px;
            // padding-top: 16px;
            padding-bottom: 5px;
        }
        .roomBody{
            padding-top: 10px;
            padding-right: 10px;
        }
        .roomCheckItem{
            margin-top: 0 !important;
        }
        .countItemTitle{
            font-size: 16px !important;
        }
        .panel-top{
            padding: 5px 10px;
            .panel-head{
                margin-bottom: 0;
                position: relative;
            }
            .panel-head-top-right{
                display: flex;
                width: 200px;
                line-height: 30px;
                position: absolute;
                right: 5px;
                top:2px;
                .ant-picker{
                    width: 120px;
                }
            }
            .panel-head-top-left{
                width: 100%;
            }
        }
        .panel-abstract{
            //padding: 0 !important;
            //padding-top: 6px !important;
            .countItem{
                box-shadow: 0 1px 6px 0px #dedede;
            }
        }
        .center {
            height: calc(~"100% - 52px");
            background: #fff;
            padding: 10px;
            //overflow: auto;
            overflow: hidden;
            padding-bottom: 20px;
            .panel {
                box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

                .uls {
                    display: flex;

                    .countItem {
                        width: 25%;
                        min-height: 100px;
                        border: 1px solid #dedede;
                        font-size: 14px;
                        border-radius: 4px;
                        margin-right: 15px;
                        padding: 10px;

                        .countItemTitle {
                            font-weight: 700;
                            font-size: 14px;
                        }

                        p {
                            margin-top: 10px;
                        }
                    }
                    .countItem:last-child{
                        margin-right: 1px;
                    }
                }

                .room {
                    //border: 1px solid #dedede;
                    /* height: 300px; */
                    //border-radius: 4px;

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
                                    color: #fff;
                                    background-color: #409eff;
                                    border-color: #409eff;
                                }

                                &.active {
                                    color: #fff;
                                    background-color: var(--backColor);
                                    border-color: var(--backColor);
                                    background-color: #ecf5ff;
                                    color: #409eff;
                                    border-color: #b3d8ff;
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
    .panel-bd{
        .panel-bd-tabWrap{
            margin-bottom: 15px;
        }
    }
    
    .headerBar{
        position: relative;
        background: transparent;
        height: 8px;
        .headerLeft{
            display: none;
        }
        .headerRight{
            display: none;
            .panel-head-top-right{
                    display: flex;
                    width: 200px;
                    line-height: 30px;
                    position: absolute;
                    right: 14px;
                    top:7px;
                    .ant-picker{
                        width: 130px;
                        //background: rgb(243, 245, 248);
                        background: #fff;
                        border: none;
                    }
                }
        }
    }
    .wrappper .center{
        background: transparent;
        padding: 0px 10px 0 10px;
    }
    .wrappper .panel-all{
        background: transparent;
        .panel-abstract{
            padding: 0;
            background: transparent;
            .countItem{
                background: #fff;
                padding: 15px 16px !important;
                padding-left: 18px !important;
                box-shadow: none !important;
                border: none !important;
                .statistics-left{
                    float: left !important;
                    position: relative;
                    left: 4px;
                    top: 4px;
                    .anticon {
                        font-size: 48px;
                        position: relative;
                        top: 6px;
                        color: #108def;
                    }
                }
                .statistics-right{
                    float: right !important;
                    width: calc(~'100% - 75px') !important;
                    .statistics-name {
                        font-size: 14px;
                        position: relative;
                        top: 8px;
                        color: #aaa;
                    }
                    .statistics-count {
                        font-weight: 700;
                        font-size: 26px;
                        color: #555;
                        position: relative;
                        top: 4px;
                    }
                }
            }
        }
    }
    .wrappper .panel{
        padding-bottom: 15px;
        padding-top: 15px;
    }
    .wrappper .center .panel .room .roomHead .roomTitle{
        width: 80px;
        background: transparent;
    }
    .InstaceDashboardWrap{
        overflow: auto;
        .panel-all{
            overflow: hidden;
            height: auto;
        }
        .center{
            height: auto;
        }
        .panel .panel-head{
            margin-bottom: 10px !important;
        }
    }
</style>