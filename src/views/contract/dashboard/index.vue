<template>
    <div class="wrappper reportFormWrap">
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
                        <div class="panel-title">年份统计图：</div>
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
                        <div class="panel-title">合同统计表：</div>
                        <div class="panel-btn">
                            <!-- <a-button :icon="h(UndoOutlined)"></a-button> -->
                            <a-button class="ml10" :icon="h(UndoOutlined)" title="刷新" @click="onClear"></a-button>
                        </div>
                        <div class="panel-search">
                            <a-input v-model:value="searchVal" placeholder="名称" class="searchitem"
                                @search="onSearch"></a-input>
                            <a-button type="primary" class="sectionItemBtn" @click="onSearch">搜索</a-button>
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
                        <div class="roomTable">
                            <a-table :columns="columns" class="atable" :dataSource="dataList" :scroll="{ y: 500 }"
                                :pagination="false" @change="handleTableChange">
                                <template #bodyCell="{ column, index }">
                                    <template v-if="column.key === 'index'">
                                        <div>
                                            {{ index + 1 }}
                                        </div>
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
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const chartMain = ref();
const yearFormat = 'YYYY';
const data = reactive({
    current: 1,
    xData: [],
    lineData: [],
    lineData2: [],
    seriesData: [],
    xData2: [],
    seriesData2: [],
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
    columns: []
});
const { columns, searchVal, pagination, total, dataList, current, xData, xData2, lineData, lineData2, seriesData, seriesData2, listData, year, countObj, rooms, selectRoom, tabs, activeKey } = toRefs(data);
var columns1 = [
    {
        title: "一月",
        dataIndex: "january",
        key: "january"
    },
    {
        title: "二月",
        dataIndex: "february",
        key: "february"
    },
    {
        title: "三月",
        dataIndex: "march",
        key: "march"
    },
    {
        title: "四月",
        dataIndex: "april",
        key: "april"
    },
    {
        title: "五月",
        dataIndex: "may",
        key: "may"
    },
    {
        title: "六月",
        dataIndex: "june",
        key: "june"
    },
    {
        title: "七月",
        dataIndex: "july",
        key: "july"
    },
    {
        title: "八月",
        dataIndex: "august",
        key: "august"
    },
    {
        title: "九月",
        dataIndex: "september",
        key: "september"
    },
    {
        title: "十月",
        dataIndex: "october",
        key: "october"
    },
    {
        title: "十一月",
        dataIndex: "november",
        key: "november"
    },
    {
        title: "十二月",
        dataIndex: "december",
        key: "december"
    }
];
var columns2 = [
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
];
const changeTabs = (e, type) => {
    data.activeKey = e;
    data.dataList = [];
    if (type != 'pagechange') {
        data.pagination.current = 1;
    }
    getStati(type);
};
const changeYear = (e) => {
    data.year = dayjs(e, yearFormat);
    changeTabs(data.activeKey, 'yearchange');
}
const getAbstract=()=>{
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
const getStati = (type) => {
    let d = {
        "actions": [{
            "id": "4270;a",
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
    proxy.$post(Interface.meetingRpt.stati, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
            if (data.activeKey * 1 == 0) {
                data.columns = columns2;
            }
            else if (data.activeKey * 1 == 1) {
                data.columns = columns2;
            }
            getAbstract();
            getChartData();
            getQuery();
        }
        else {
            message.error("统计失败！");
        }
    })
}
const getQuery = () => {
    let filterQuery = '\nYearMonth\teq\t' + data.year.format("YYYY");
    proxy.$post(Interface.list2, {
        filterId: '',
        objectTypeCode: '20617',
        entityName: 'MeetingPeopleReport',
        filterQuery: filterQuery,
        search: data.searchVal || '',
        page: data.pagination.current,
        rows: data.pagination.pageSize,
        // sort: '',
        // order: 'asc',
        displayColumns: 'PeopleId,JoinQty,AbsentQty,LateQty,QuitQty,LeaveQty'
    }).then(res => {
        var list = [];
        data.total = res.pageInfo ? res.pageInfo.total : 0;
        data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
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
        data.dataList = list;
    })
}
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
    data.lineData = ['收款','付款','其他'];
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
            data.seriesData[0].name='收款';
            data.seriesData[1].name='付款';
            data.seriesData[2].name='其他';
            data.seriesData=data.seriesData.slice(0,3);
            data.dataList = statdata.map(item => {
                return item;
            })
        }
        loadChart();
    })
    // data.xData2 = [];
    // data.lineData2 = [];
    // data.seriesData2 = [];
    // proxy.$get(Interface.meetingRpt.peoplestat, {
    //     year: data.year.format("YYYY"),
    // }).then(res => {
    //     if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
    //         let statdata = res.actions[0].returnValue;
    //         data.xData2 = ['工号', '部门', '总预约数', '参会数量'];
    //         data.lineData2 = ['数量'];
    //         data.seriesData2 = statdata.map(item => {
    //             item.type = 'line';
    //             item.label = {
    //                 show: true,
    //                 position: "top",
    //             };
    //             item.data = [item.employeeNo, item.businessUnitIdName, item.totalQty, item.meetingQty]
    //             return item;
    //         })
    //     }
    // })
}
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
const onSearch = (e) => {
    changeTabs(data.activeKey);
};
const onClear = (e) => {
    data.searchVal = '';
    changeTabs(data.activeKey);
};
//改变页码
const handleTableChange = (page, pageSize) => {
    //data.pagination.current=page.current;
    data.pagination.current = page;
    data.pagination.pageSize = pageSize;
    changeTabs(data.activeKey, 'pagechange');
}
const sizeChange = (current, size) => {
    handleTableChange(current, size)
}
watch(() => route, (newVal, oldVal) => {
    if (route.path == '/contract/report/dashboard') {
        data.activeKey=0;
        changeTabs(data.activeKey);
    }
}, { deep: true, immediate: true })
onMounted(() => {
    //changeTabs(0);
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
}

.wrappper .panel {
    padding-bottom: 15px;
    padding-top: 15px;
}

.wrappper .center .panel .room .roomHead .roomTitle {
    width: 80px;
    background: transparent;
}

.reportFormWrap {
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
            .ant-table-row{
                .ant-table-cell:first-child{
                    text-align: left !important;
                }
            }
            .ant-table-thead{
                .ant-table-cell:first-child{
                    text-align: left !important;
                }
            }
            .ant-table-tbody td {
                padding: 6.5px 16px !important;
                white-space: nowrap;
                text-align: center;
            }

            .ant-table-tbody .ant-table-measure-row td {
                padding: 0 !important;
            }

            .ant-table-thead>tr>th {
                background-color: #f7fbfe !important;
                padding: 8.5px 16px !important;
                text-align: center;
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
            top: 50px;
            right: 0px;
            display: flex;
            z-index: 1000;

            .searchitem {
                margin-right: 15px;
            }
        }
    }

}
</style>