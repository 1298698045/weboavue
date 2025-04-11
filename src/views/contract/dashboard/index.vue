<template>
    <div class="wrappper contractDashboardWrap">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base">
                    <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
                </div>
                <span class="headerTitle">数据看板</span>
            </div>
            <div class="headerRight">
                <div class="panel-head-top-right">
                    年份：&nbsp;&nbsp;<a-date-picker picker="year" @change="changeYear" :format="yearFormat"
                        v-model:value="year" />
                </div>
            </div>
        </div>
        <div class="center">
            <div class="panel-all">
                <div class="panel panel-abstract">
                    <div class="panel-bd">
                        <ul class="uls">
                            <li class="countItem">
                                <div class="statistics-left">
                                    <PieChartOutlined style="color: #108def;" />
                                </div>
                                <div class="statistics-right">
                                    <div class="statistics-count" name="ContractNumber" style="color: #000;">
                                        {{ countObj.reservTotal || 0 }}</div>
                                    <div class="statistics-name">合同总笔数</div>
                                </div>
                            </li>
                            <li class="countItem">
                                <div class="statistics-left">
                                    <CheckCircleOutlined style="color: rgb(141, 193, 57);" />
                                </div>
                                <div class="statistics-right">
                                    <div class="statistics-count" name="ContractNumber" style="color: #000;">
                                        {{ countObj.reservMy || 0 }}</div>
                                    <div class="statistics-name">已履约完成合同</div>
                                </div>
                            </li>
                            <li class="countItem">
                                <div class="statistics-left">
                                    <PayCircleOutlined style="color: #108def;" />
                                </div>
                                <div class="statistics-right">
                                    <div class="statistics-count" name="ContractNumber" style="color: #000;">
                                        {{ countObj.reservTotal || 0 }}</div>
                                    <div class="statistics-name">合同总金额</div>
                                </div>
                            </li>
                            <li class="countItem">
                                <div class="statistics-left">
                                    <PayCircleOutlined style="color: red;" />
                                </div>
                                <div class="statistics-right">
                                    <div class="statistics-count" name="ContractNumber" style="color: #000;">
                                        {{ countObj.reservTotal || 0 }}</div>
                                    <div class="statistics-name">未付金额</div>
                                </div>
                            </li>
                            <li class="countItem">
                                <div class="statistics-left">
                                    <PayCircleOutlined style="color: rgb(58, 200, 210);" />
                                </div>
                                <div class="statistics-right">
                                    <div class="statistics-count" name="ContractNumber" style="color: #000;">
                                        {{ countObj.reservTotal || 0 }}</div>
                                    <div class="statistics-name">已付金额</div>
                                </div>
                            </li>
                            <li class="countItem">
                                <div class="statistics-left">
                                    <ClockCircleOutlined style="color: #F7C122;" />
                                </div>
                                <div class="statistics-right">
                                    <div class="statistics-count" name="ContractNumber" style="color: #000;">
                                        {{ countObj.reservTotal || 0 }}</div>
                                    <div class="statistics-name">即将过期</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-title">年份合同统计图：</div>
                        <div class="panel-btn">
                        </div>
                    </div>
                    <div class="room">
                        <div class="roomBody">
                            <div id="canvas" ref="chartMain" style="width: 100%; height: 400px"></div>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-title">科室合同统计图：</div>
                        <div class="panel-btn">
                        </div>
                    </div>
                    <div class="room">
                        <div class="roomBody">
                            <div id="canvas2" ref="chartMain2" style="width: 100%; height: 400px"></div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-left">
                    <div class="panel-head">
                        <div class="panel-title">合同状态统计：</div>
                        <div class="panel-btn">
                        </div>
                    </div>
                    <div class="room">
                        <div class="roomBody">
                            <div id="canvas3" ref="chartMain3" style="width: 100%; height: 400px"></div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-right">
                    <div class="panel-head">
                        <div class="panel-title">合同分类统计：</div>
                        <div class="panel-btn">
                        </div>
                    </div>
                    <div class="room">
                        <div class="roomBody">
                            <div id="canvas4" ref="chartMain4" style="width: 100%; height: 400px"></div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-list">
                    <div class="panel-head">
                        <div class="panel-title">合同统计表：</div>
                        <div class="panel-btn">
                            <!-- <a-button :icon="h(UndoOutlined)"></a-button> -->
                            <a-button class="ml10" :icon="h(UndoOutlined)" title="刷新" @click="onClear"></a-button>
                        </div>
                        <div class="panel-search">
                            <!-- <a-input v-model:value="searchVal" placeholder="名称" class="searchitem"
                                @search="onSearch"></a-input>
                            <a-button type="primary" class="sectionItemBtn" @click="onSearch">搜索</a-button> -->
                            <HighSearch @update-height="changeHeight" @search="getQuery"
                                :entityApiName="data.queryParams.entityName">
                            </HighSearch>
                        </div>
                    </div>
                    <div class="panel-bd">
                        <div class="tabWrap panel-bd-tabWrap">
                            <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                                <a-tab-pane v-for="(item, index) in tabs" :key="index">
                                    <template #tab>
                                        <span>{{ item.label }}</span>
                                    </template>
                                </a-tab-pane>
                            </a-tabs>
                        </div>
                        <div class="roomTable">
                            <a-table :columns="columns" class="atable" :dataSource="dataList"
                                :scroll="{ x: 'max-content', y: 500 }" :pagination="false" @change="handleTableChange">
                                <template #bodyCell="{ record, column, index }">
                                    <template v-if="column.key === 'index'">
                                        <div>
                                            {{ index + 1 }}
                                        </div>
                                    </template>
                                    <template v-if="column.key === 'Name' || column.key === 'Title'">
                                        <div v-html="record[column.key]"></div>
                                    </template>
                                    <!-- <template v-else>
                                        <div>
                                            {{ record[column.key] }}
                                        </div>
                                    </template> -->
                                </template>
                            </a-table>
                            <div class="pageWrap">
                                <a-pagination show-size-changer show-quick-jumper
                                    :pageSizeOptions="['10', '20', '50', '80', '100', '200']"
                                    :pageSize="pagination.pageSize" @showSizeChange="sizeChange"
                                    @change="handleTableChange" v-model:current="pagination.current"
                                    :total="pagination.total" :show-total="total => `共 ${total} 条`" />
                            </div>
                        </div>
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
    h,
    nextTick
} from "vue";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { girdFormatterValue } from "@/utils/common.js";
import { SearchOutlined, UndoOutlined, InfoCircleOutlined, FundProjectionScreenOutlined, UserOutlined, PieChartOutlined, CheckCircleOutlined, PayCircleOutlined, ClockCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import * as echarts from "echarts";
import { useRouter, useRoute } from "vue-router";
import HighSearch from "@/components/HighSearch.vue";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const chartMain = ref();
const chartMain2 = ref();
const chartMain3 = ref();
const chartMain4 = ref();
const yearFormat = 'YYYY';
const data = reactive({
    current: 1,
    xData: [],
    lineData: [],
    seriesData: [],
    xData2: [],
    lineData2: [],
    seriesData2: [],
    xData3: [],
    lineData3: [],
    seriesData3: [],
    xData4: [],
    lineData4: [],
    seriesData4: [],
    listData: [],
    year: dayjs(new Date()),
    countObj: {},
    rooms: [],
    selectRoom: [],
    tabs: [
        {
            label: "待付款提醒",
        },
        {
            label: "待收款提醒",
        },
        {
            label: "即将到期合同",
        },
        {
            label: "已过期合同",
        },
    ],
    activeKey: 0,
    dataList: [],
    pagination: {
        hideOnSinglePage: false,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,//数据总数
        pageSize: 10,
        current: 1,
        pageSizeOptions: ['10', '20', '50', '100'],
        defaultPageSize: 10,
        showTotal: ((total) => {
            return `共${total}条`
        })
    },
    total: 0,
    searchVal: '',
    columns: [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 80,
        },
        {
            title: "合同标题",
            dataIndex: "Title",
            key: "Title",
        },
        {
            title: "截止日期",
            dataIndex: "ExpiredOn",
            key: "ExpiredOn",
        },
        {
            title: "金额",
            dataIndex: "Amount",
            key: "Amount",
        },
    ],
    entityType: '800',
    queryParams: {
        filterId: '',
        objectTypeCode: '1010',
        entityName: 'Contract',
        sort: 'CreatedOn',
        order: 'desc'
    },
    layoutName: 'ContractDashboard',
    hightSearchParams: {},
    height: 0
});
const { height, entityType, queryParams, layoutName, hightSearchParams, columns, searchVal, pagination, total, dataList, current, xData, lineData, seriesData, xData2, lineData2, seriesData2, xData3, lineData3, seriesData3, xData4, lineData4, seriesData4, listData, year, countObj, rooms, selectRoom, tabs, activeKey } = toRefs(data);

//获取摘要
const getAbstract = () => {
    data.countObj = {};
    let d = {
        "actions": [{
            "id": "2919;a",
            "descriptor": "",
            "callingDescriptor": "UNKNOWN",
            "params": {
                year: data.year.format("YYYY"),
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.meetingRpt.abstract, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
            data.countObj = res.actions[0].returnValue;
        }
        else {
            message.error("获取摘要失败！");
        }
    })
}
//获取折线图数据
const getChartData = () => {
    data.xData = ["一月",
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
        "十二月",];
    data.lineData = ['收款', '付款', '其他'];
    data.seriesData = [];
    proxy.$get(Interface.meetingRpt.roomstat, {
        year: data.year.format("YYYY")
    }).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.length) {
            let statdata = res.actions[0].returnValue;
            // data.lineData = statdata.map(item => {
            //     return item.name;
            // })
            data.seriesData = statdata.map(item => {
                item.type = 'line';
                item.label = {
                    show: true,
                    //rotate: 60,
                    position: "top",
                };
                item.data = [item.january, item.february, item.march, item.april, item.may, item.june, item.july, item.august, item.september, item.october, item.november, item.december];
                return item;
            })
            data.seriesData[0].name = '收款';
            data.seriesData[1].name = '付款';
            data.seriesData[2].name = '其他';
            data.seriesData = data.seriesData.slice(0, 3);
        }
        loadChart();
    })

}
//加载折线图
const loadChart = () => {
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
            boundaryGap: false,
            data: data.xData
        },
        yAxis: {
            type: 'value'
        },
        series: data.seriesData
    };
    option && myChart.setOption(option, true);
}
//获取柱状图数据
const getChartData2 = () => {
    data.xData2 = [];
    data.lineData2 = ['数量'];
    data.seriesData2 = [
        {
            type: 'bar',
            name: '数量',
            barWidth: 30,
            color: 'rgb(16, 141, 239)',
            label: {
                show: true,
                //rotate: 60,
                position: "top",
            },
            data: []
        }
    ]
    let filterQuery = '\nObjectTypeCode\teq\t10\nYearNumber\teq\t' + data.year.format("YYYY");
    proxy.$post(Interface.list2, {
        filterId: '',
        objectTypeCode: '20618',
        entityName: 'WFHandleReport',
        filterQuery: filterQuery,
        search: '',
        page: 1,
        rows: 10,
        // sort: '',
        // order: 'asc',
        displayColumns: 'Name,StartCount,WaitingCount,ExpireCount,FinishCount,ExpireHours'
    }).then(res => {
        var list = [];
        if (res && res.nodes && res.nodes.length) {
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for (var cell in item) {
                    if (cell != 'id' && cell != 'nameField') {
                        item[cell] = girdFormatterValue(cell, item);
                    }
                    if (cell == 'CreatedOn') {
                        item[cell] = item[cell] ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm") : '';
                    }
                }
                list.push(item)
            }
        }
        loadChart2(list);
    })
}
//加载柱状图
const loadChart2 = (list) => {
    if (list && list.length) {
        data.xData2 = list.map(item => {
            return item.Name || '';
        })
        data.seriesData2[0].data = list.map(item => {
            return item.StartCount || 0;
        })
    }
    data.xData2 = ['人力资源处', 'B超室', 'C儿内科', '保卫处', '病理科', '财务处', '采购中心', '测试部门', '党委办公室', '对外联络部'];
    data.seriesData2[0].data = [5, 8, 1, 4, 9, 7, 3, 2, 8, 6];
    var myChart2;
    if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
        myChart2.dispose(); //销毁
    }
    myChart2 = echarts.init(chartMain2.value);
    var option;
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: data.lineData2
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
            boundaryGap: true,
            data: data.xData2
        },
        yAxis: {
            type: 'value'
        },
        series: data.seriesData2
    };
    option && myChart2.setOption(option, true);
}
//获取饼图数据-合同状态
const getChartData3 = () => {
    data.xData3 = [];
    data.lineData3 = ['草稿', '履行中', '暂停', '终止', '已完成', '已过期'];
    data.seriesData3 = [
        {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: '草稿' },
                { value: 735, name: '履行中' },
                { value: 580, name: '暂停' },
                { value: 484, name: '终止' },
                { value: 300, name: '已完成' },
                { value: 300, name: '已过期' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    loadChart3();
}
//加载饼图-合同状态
const loadChart3 = () => {
    var myChart3;
    if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
        myChart3.dispose(); //销毁
    }
    myChart3 = echarts.init(chartMain3.value);
    var option;
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: data.lineData3,
            orient: 'vertical',
            left: 'right'
        },
        series: data.seriesData3
    };
    option && myChart3.setOption(option, true);
}
//获取饼图数据-合同分类
const getChartData4 = () => {
    data.xData4 = [];
    data.lineData4 = ['行政采购类', '工程项目类', '资产采购类', '合作协议', '销售合同', '信息系统维护合同'];
    data.seriesData4 = [
        {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: '行政采购类' },
                { value: 735, name: '工程项目类' },
                { value: 580, name: '资产采购类' },
                { value: 484, name: '合作协议' },
                { value: 300, name: '销售合同' },
                { value: 300, name: '信息系统维护合同' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    loadChart4();
}
//加载饼图-合同分类
const loadChart4 = () => {
    var myChart4;
    if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
        myChart4.dispose(); //销毁
    }
    myChart4 = echarts.init(chartMain4.value);
    var option;
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: data.lineData4,
            orient: 'vertical',
            left: 'right'
        },
        series: data.seriesData4
    };
    option && myChart4.setOption(option, true);
}
//获取列表数据
const getQuery = (obj) => {
    data.dataList = [];
    let filterQuery = '\nYearMonth\teq\t' + data.year.format("YYYY");
    let d = {
        filterId: data.queryParams.filterId,
        objectTypeCode: data.queryParams.objectTypeCode,
        entityName: data.queryParams.entityName,
        //filterQuery: filterQuery,
        search: '',
        page: data.pagination.current,
        rows: data.pagination.pageSize,
        sort: 'CreatedOn',
        order: 'desc'
    }
    if (obj) {
        data.hightSearchParams = obj;
        if (data.hightSearchParams) {
            if (data.hightSearchParams.search) {
                d.search = data.hightSearchParams.search;
            }
            if (data.hightSearchParams.filterCondition) {
                d.filterCondition = data.hightSearchParams.filterCondition;
            }
        }
    }
    else {
        data.hightSearchParams = {}
    }
    proxy.$post(Interface.list2, d).then(res => {
        var list = [];
        data.total = res.pageInfo ? res.pageInfo.total : 0;
        data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
        if (res && res.nodes && res.nodes.length) {
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for (var cell in item) {
                    if (cell != 'id' && cell != 'nameField' && cell != 'viewUrl') {
                        item[cell] = girdFormatterValue(cell, item);
                    }
                    if (cell == 'CreatedOn' || cell == 'ModifiedOn') {
                        item[cell] = item[cell] ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm") : '';
                    }
                    if (cell == 'Name' || cell == 'Title') {
                        item[cell] = '<a style="color:#015ba7;font-size:13px;" href="' + item.viewUrl + '" target="_blank">' + item[cell] + '</a>';
                    }
                }
                list.push(item)
            }
        }
        data.dataList = list;
    })
}

//获取统计数据
const getStati = (type) => {
    getAbstract();
    getChartData();
    getChartData2();
    getChartData3();
    getChartData4();
}
// 获取tabs
const getTabs = () => {
    proxy.$get(Interface.getTabs, {
        entityName: data.queryParams.entityName,
        layoutName: data.layoutName
    }).then(res => {
        if (res && res.tabs && res.tabs.length) {
            let list = res.tabs;
            list.forEach(item => {
                item.label = item.title;
                item.filterId = item.filter.filterId;
                item.filterquery = item.filterquery || '';
            })
            data.tabs = list;
        }
        else {
            //data.tabs=data.tabs0;
        }
        changeTab(0, 'yearchange');
    })
}
//获取显示列
const getColumns = (id) => {
    let columnslist = [{
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 70,
    }];
    proxy.$get(Interface.listView.getFilterInfo, {
        entityType: data.entityType,
        objectTypeCode: data.queryParams.objectTypeCode,
        search: "",
        filterId: id
    }).then(res => {
        if (res && res.actions && res.actions[0]) { } else { return }
        let fields = res.actions[0].returnValue.fields;

        fields.forEach(item => {
            if (item.name == 'Name' || item.name == 'Title') {
                columnslist.push({
                    dataIndex: item.name,
                    key: item.name,
                    title: item.label,
                    // formatter: function formatter(value, row, index) {
                    //     let url = row.viewUrl;
                    //     return '<a style="color:#015ba7;font-size:13px;" href="' + url + '" target="_blank">' + girdFormatterValue(item.name, row) + '</a>';
                    // }
                });
            }
            else if (item.name == 'PaymentPercentage') {
                columnslist.push({
                    dataIndex: item.name,
                    key: item.name,
                    title: item.label,
                    // formatter: function formatter(value, row, index) {
                    //     let percentage = value ? value.value : 0;
                    //     return '<div class="PaymentPercentage"><div role="progressbar" class="ant-progress ant-progress-line ant-progress-status-success ant-progress-show-info ant-progress-8 css-dev-only-do-not-override-kqecok td-progress"><div class="ant-progress-outer" style="height: 8px;"><div class="ant-progress-inner"><div class="ant-progress-bg" style="width: ' + (percentage || 0) + '%; height: 8px;"></div><!----></div></div></div><div class="td-progress-text">' + ((percentage * 1).toFixed(2)) + '%</div></div>';
                    // }
                });
            }
            else if (item.name == 'StateCode') {
                columnslist.push({
                    dataIndex: item.name,
                    key: item.name,
                    title: item.label,
                    // formatter: function formatter(value, row, index) {
                    //     let StateCode = value ? value.value : '';
                    //     let color = '#FF5722';
                    //     if (StateCode * 1 == 0) {
                    //         color = '#FF5722';
                    //     } else if (StateCode * 1 == 1) {
                    //         color = '#5AAAFF';
                    //     } else if (StateCode * 1 == 2) {
                    //         color = '#31BA6A';
                    //     } else if (StateCode * 1 == 3) {
                    //         color = '#555';
                    //     } else if (StateCode * 1 == 4) {
                    //         color = 'orange';
                    //     } else if (StateCode * 1 == 5) {
                    //         color = '#aaa';
                    //     } else if (StateCode * 1 == 6) {
                    //         color = '#FF5722';
                    //     }
                    //     return '<div class="badge" style="background:' + color + ';">' + girdFormatterValue(item.name, row) + '</div>';
                    // }
                });
            }
            else {
                columnslist.push({
                    dataIndex: item.name,
                    key: item.name,
                    title: item.label,
                    // formatter: function formatter(value, row, index) {
                    //     return girdFormatterValue(item.name, row);
                    // }
                });
            }
        })
        data.columns = columnslist;
        nextTick(() => {
            getQuery(data.hightSearchParams);
        })
    })
}

//列表tab切换
const changeTab = (e, type) => {
    data.activeKey = e;
    if (type != 'pagechange') {
        data.pagination.current = 1;
    }
    if (type == 'yearchange') {
        getStati(type);
    }
    data.queryParams.filterId = data.tabs[e].filterId || '';
    getColumns(data.queryParams.filterId);
};

//年份切换
const changeYear = (e) => {
    data.year = dayjs(e, yearFormat);
    changeTab(data.activeKey, 'yearchange');
}

const onSearch = (e) => {
    changeTab(data.activeKey);
};
const onClear = (e) => {
    changeTab(data.activeKey);
};
//改变页码
const handleTableChange = (page, pageSize) => {
    data.pagination.current = page;
    data.pagination.pageSize = pageSize;
    changeTab(data.activeKey, 'pagechange');
}
const sizeChange = (current, size) => {
    handleTableChange(current, size)
}
function changeHeight(h) {
    // let contentHeight = document.documentElement.clientHeight - 120;
    // let tabsHeight = 46;
    // data.height = 500;
}
watch(() => route, (newVal, oldVal) => {
    if (route.path == '/contract/report/dashboard') {
        data.queryParams = {
            filterId: '',
            objectTypeCode: '1010',
            entityName: 'Contract',
            search: '',
            sort: 'CreatedOn',
            order: 'desc'
        }
        data.entityType = '800';
        data.layoutName = 'ContractDashboard';
        setTimeout(function () {
            getTabs();
        }, 1000)
    }
}, { deep: true, immediate: true })
onMounted(() => {
    getTabs();
});
</script>
<style lang="less" scoped>
.wrappper {
    width: 100%;
    height: 100%;

    .panel-all {
        // background: #e8edf4;
        // padding: 10px;
        height: calc(~'100% - 0px');
        background: #fff;
        //padding: 10px;
        overflow: auto;
    }

    .panel {
        box-shadow: none !important;
        // margin: 0;
        // padding: 0 10px;
        // padding-top: 16px;
        padding-bottom: 5px;
    }

    .roomBody {
        padding-top: 10px;
        padding-right: 10px;
    }

    .roomCheckItem {
        margin-top: 0 !important;
    }

    .countItemTitle {
        font-size: 16px !important;
    }

    .panel-top {
        padding: 5px 10px;

        .panel-head {
            margin-bottom: 0;
            position: relative;
        }

        .panel-head-top-right {
            display: flex;
            width: 200px;
            line-height: 30px;
            position: absolute;
            right: 5px;
            top: 2px;

            .ant-picker {
                width: 120px;
            }
        }

        .panel-head-top-left {
            width: 100%;
        }
    }

    .panel-abstract {

        //padding: 0 !important;
        //padding-top: 6px !important;
        .countItem {
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

                tr {
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

.panel-bd {
    .panel-bd-tabWrap {
        margin-bottom: 15px;
    }
}

.headerBar {
    position: relative;
    background: transparent;

    .headerLeft {
        display: none;
    }

    .headerRight {
        .panel-head-top-right {
            display: flex;
            width: 200px;
            line-height: 30px;
            position: absolute;
            right: 14px;
            top: 7px;

            .ant-picker {
                width: 130px;
                //background: rgb(243, 245, 248);
                background: #fff;
                border: none;
            }
        }
    }
}

.wrappper .center {
    background: transparent;
    padding: 0px 10px 0 10px;
}

.wrappper .panel-all {
    background: transparent;

    .panel-abstract {
        padding: 0;
        background: transparent;

        .countItem {
            background: #fff;
            padding: 15px 16px !important;
            box-shadow: none !important;
            border: none !important;

            .statistics-left {
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

            .statistics-right {
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

    .panel-list {
        height: 100%;
    }

    .panel-left {
        width: calc(~'50% - 8.5px');
        float: left;
        margin-right: 17px;
    }

    .panel-right {
        width: calc(~'50% - 8.5px');
    }
}

.wrappper .panel {
    padding-bottom: 15px;
    padding-top: 15px;
}

.wrappper .center .panel .room .roomHead .roomTitle {
    width: 80px;
    background: transparent;
}

.contractDashboardWrap {
    overflow: auto;

    .panel-all {
        overflow: hidden;
        height: auto;
    }

    .center {
        height: auto;
    }

    .roomTable {
        border: none !important;

        .pageWrap {
            text-align: right;
            padding: 15px;
        }

        :deep .atable {
            .ant-table-row {
                .ant-table-cell:first-child {
                    text-align: left !important;
                }
            }

            .ant-table-thead {
                .ant-table-cell:first-child {
                    text-align: left !important;
                }
            }

            .ant-table-tbody td {
                padding: 6.5px 16px !important;
                white-space: nowrap;
                //text-align: center;
                min-width: 100px;
            }

            .ant-table-tbody td:first-child {
                min-width: 70px;
            }

            .ant-table-tbody .ant-table-measure-row td {
                padding: 0 !important;
            }

            .ant-table-thead>tr>th {
                background-color: #f7fbfe !important;
                padding: 8.5px 16px !important;
                text-align: center;
                white-space: nowrap;
            }

            .ant-table-tbody tr:hover,
            .ant-table-tbody tr:hover td {
                background-color: #e9f7ff !important;
                color: #108def !important;
            }

            .ant-table-tbody tr:nth-child(odd) {
                background-color: rgb(250, 250, 250) !important;
                /* 奇数行背景色 */
            }

            .ant-table-tbody tr:nth-child(even) {
                background-color: #fff !important;
                /* 偶数行背景色 */
            }
        }

    }

    .panel-head {
        position: relative;

        .panel-search {
            position: absolute;
            top: 45px;
            right: -15px;
            display: flex;
            z-index: 1000;
            height: 500px;

            .searchitem {
                margin-right: 15px;
            }
        }
    }

}
</style>