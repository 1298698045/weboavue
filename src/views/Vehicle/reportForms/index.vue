<template>
  <div class="wrappper InstaceDashboardWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="" />
        </div>
        <span class="headerTitle">车辆报表</span>
      </div>
      <div class="headerRight">
        <div class="panel-head-top-right">
          日期范围：&nbsp;&nbsp;
          <!-- <a-date-picker
            picker="year"
            @change="changeYear"
            :format="yearFormat"
            v-model:value="year"
          /> -->
          <a-range-picker
            v-model:value="dateRange"
            @change="changeYear"
            :value-format="'YYYY-MM-DD'"
          />
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
                  <CarOutlined style="color: #108def" />
                </div>
                <div class="statistics-right">
                  <div
                    class="statistics-count"
                    name="ContractNumber"
                    style="color: #000"
                  >
                    {{ countObj.vehicleCount || 0 }}
                  </div>
                  <div class="statistics-name">车辆总数</div>
                </div>
              </li>
              <li class="countItem">
                <div class="statistics-left">
                  <PieChartOutlined style="color: rgb(141, 193, 57)" />
                </div>
                <div class="statistics-right">
                  <div
                    class="statistics-count"
                    name="ContractNumber"
                    style="color: #000"
                  >
                    {{ countObj.reservationCount || 0 }}
                  </div>
                  <div class="statistics-name">预约次数</div>
                </div>
              </li>
              <li class="countItem">
                <div class="statistics-left">
                  <UserOutlined style="color: rgb(58, 200, 210)" />
                </div>
                <div class="statistics-right">
                  <div
                    class="statistics-count"
                    name="ContractNumber"
                    style="color: #000"
                  >
                    {{ countObj.driverCount || 0 }}
                  </div>
                  <div class="statistics-name">司机数量</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="panel">
          <div class="panel-head">
            <div class="panel-title">统计图表：</div>
            <div class="panel-btn"></div>
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
              <div
                id="canvas"
                ref="chartMain"
                style="width: 100%; height: 400px"
              ></div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-head">
            <div class="panel-title">明细列表：</div>
            <div class="panel-btn">
              <!-- <a-button :icon="h(UndoOutlined)"></a-button> -->
              <a-button
                class="ml10"
                :icon="h(UndoOutlined)"
                title="刷新"
                @click="onClear"
              ></a-button>
            </div>
            <div class="panel-search">
              <a-input
                v-model:value="searchVal"
                placeholder="名称"
                class="searchitem"
                @search="onSearch"
              ></a-input>
              <a-button type="primary" class="sectionItemBtn" @click="onSearch"
                >搜索</a-button
              >
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
              <a-table
                :columns="columns"
                class="atable"
                :dataSource="dataList"
                :scroll="{ y: 500 }"
                :pagination="false"
                @change="handleTableChange"
              >
                <template #bodyCell="{ column, index, record }">
                  <template v-if="column.key === 'index'">
                    <div>
                      {{ index + 1 }}
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      {{ record[column.key] }}
                    </div>
                  </template>
                </template>
              </a-table>
              <div class="pageWrap">
                <a-pagination
                  show-size-changer
                  show-quick-jumper
                  :pageSizeOptions="['10', '20', '50', '80', '100', '200']"
                  :pageSize="pagination.pageSize"
                  @showSizeChange="sizeChange"
                  @change="handleTableChange"
                  v-model:current="pagination.current"
                  :total="pagination.total"
                  :show-total="(total) => `共 ${total} 条`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="loading" />
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
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { girdFormatterValue } from "@/utils/common.js";
import {
  SearchOutlined,
  UndoOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  PieChartOutlined,
  CarOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import * as echarts from "echarts";
import { useRouter, useRoute } from "vue-router";
import Loading from "@/components/Loading.vue";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const chartMain = ref();
const yearFormat = "YYYY";
const data = reactive({
  loading: false,
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
      label: "按车辆",
    },
    {
      label: "按部门",
    },
    {
      label: "按司机",
    },
  ],
  activeKey: 0,
  dataList: [],
  pagination: {
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0, //数据总数
    pageSize: 10,
    current: 1,
    pageSizeOptions: ["10", "20", "50", "100"],
    defaultPageSize: 10,
    showTotal: (total) => {
      return `共${total}条`;
    },
  },
  total: 0,
  searchVal: "",
  columns: [],
  StartDate: "",
  EndDate: "",
  dateRange: null,
});
const {
  dateRange,
  StartDate,
  EndDate,
  columns,
  searchVal,
  pagination,
  total,
  dataList,
  current,
  xData,
  xData2,
  lineData,
  lineData2,
  seriesData,
  seriesData2,
  listData,
  year,
  countObj,
  rooms,
  selectRoom,
  tabs,
  activeKey,
  loading,
} = toRefs(data);
var columns1 = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: "车辆名称",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "预约次数",
    dataIndex: "reservationCount",
    key: "reservationCount",
  },
];
var columns2 = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: "用车部门",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "预约次数",
    dataIndex: "reservationCount",
    key: "reservationCount",
  },
];
var columns3 = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: "司机姓名",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "预约次数",
    dataIndex: "reservationCount",
    key: "reservationCount",
  },
];
const changeTabs = (e, type) => {
  data.loading = true;
  data.activeKey = e;
  data.dataList = [];
  if (type != "pagechange") {
    data.pagination.current = 1;
  }
  if (type != "search") {
    getStati();
  } else {
    getQuery();
  }
  setTimeout(function () {
    data.loading = false;
  }, 500);
};
const changeYear = (e) => {
  if (e && e.length) {
    data.year = dayjs(e[0], yearFormat);
    data.StartDate = e[0];
    data.EndDate = e[1];
  } else {
    data.year = dayjs(new Date(), yearFormat);
    data.StartDate = "";
    data.EndDate = "";
  }
  changeTabs(data.activeKey, "yearchange");
};
const getAbstract = () => {
  data.countObj = {};
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          //year: data.year.format("YYYY"),
          startTime: data.StartDate,
          endTime: data.EndDate,
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.vehicle.abstract, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state == "SUCCESS"
    ) {
      data.countObj = res.actions[0].returnValue;
    } else {
      message.error("获取摘要失败！");
    }
  });
};
const getStati = () => {
  if (data.activeKey * 1 == 0) {
    data.columns = columns1;
  } else if (data.activeKey * 1 == 1) {
    data.columns = columns2;
  } else if (data.activeKey * 1 == 2) {
    data.columns = columns3;
  }
  getAbstract();
  getQuery();
  // let d = {
  //   actions: [
  //     {
  //       id: "4270;a",
  //       descriptor: "",
  //       callingDescriptor: "UNKNOWN",
  //       params: {
  //         year: data.year.format("YYYY"),
  //       },
  //     },
  //   ],
  // };
  // let obj = {
  //   message: JSON.stringify(d),
  // };
  // proxy.$post(Interface.workflow.stati, obj).then((res) => {
  //   if (
  //     res &&
  //     res.actions &&
  //     res.actions[0] &&
  //     res.actions[0].state == "SUCCESS"
  //   ) {
  //     if (data.activeKey * 1 == 0) {
  //       data.columns = columns1;
  //     } else if (data.activeKey * 1 == 1) {
  //       data.columns = columns2;
  //     } else if (data.activeKey * 1 == 2) {
  //       data.columns = columns3;
  //     }
  //     getAbstract();
  //     getQuery();
  //   } else {
  //     message.error("统计失败！");
  //   }
  // });
};
const getQuery = () => {
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          search: data.searchVal || "",
          startTime: data.StartDate || "",
          endTime: data.EndDate || "",
          category: data.activeKey * 1 + 1,
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  let list=[];
  proxy.$post(Interface.vehicle.getSummary, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state == "SUCCESS"
    ) {
      for (var i = 0; i < res.actions[0].returnValue.length; i++) {
        var item = res.actions[0].returnValue[i];
        list.push({
          id: i + 1,
          Name: item.name || "",
          reservationCount: item.count || 0,
        });
      }
    } else {
      message.error("获取统计数据失败！");
    }
    data.dataList = list;
    getChartData();
  });
};
const getChartData = () => {
  data.xData = [];
  data.lineData = ["预约次数"];
  data.seriesData = [
    {
      type: "bar",
      name: "预约次数",
      barWidth: 30,
      color: "rgb(16, 141, 239)",
      label: {
        show: true,
        //rotate: 60,
        position: "top",
      },
      data: [],
    },
  ];
  if (data.dataList && data.dataList.length) {
    data.xData = data.dataList.map((item) => {
      return item.Name || "";
    });
    data.seriesData[0].data = data.dataList.map((item) => {
      return item.reservationCount || 0;
    });
  }
  loadChart();
};
const loadChart = () => {
  var myChart;
  if (myChart != null && myChart != "" && myChart != undefined) {
    myChart.dispose(); //销毁
  }
  myChart = echarts.init(chartMain.value);
  var option;
  var option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: data.lineData,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      //boundaryGap: false,
      data: data.xData,
      barCategoryGap: "20%",
    },
    yAxis: {
      type: "value",
    },
    series: data.seriesData,
  };
  option && myChart.setOption(option, true);
};
const onSearch = (e) => {
  changeTabs(data.activeKey, "search");
};
const onClear = (e) => {
  data.searchVal = "";
  changeTabs(data.activeKey);
};
//改变页码
const handleTableChange = (page, pageSize) => {
  //data.pagination.current=page.current;
  data.pagination.current = page;
  data.pagination.pageSize = pageSize;
  changeTabs(data.activeKey, "pagechange");
};
const sizeChange = (current, size) => {
  handleTableChange(current, size);
};

onMounted(() => {
  let currentDate=new Date();
  let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  let lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  let StartDate = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;
  let EndDate= `${lastDayOfMonth.getFullYear()}-${(lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfMonth.getDate().toString().padStart(2, '0')}`;
  data.dateRange=[StartDate,EndDate];
  data.StartDate = StartDate;
  data.EndDate= EndDate;
  changeTabs(data.activeKey);
});
</script>
<style lang="less" scoped>
.wrappper {
  width: 100%;
  height: 100%;
  .headerBar .headerRight .panel-head-top-right .ant-picker {
    width: 230px;
  }
  .headerBar .headerRight .panel-head-top-right {
    width: auto;
  }
  :deep .ant-picker-range {
    .ant-picker-active-bar {
      display: none;
    }
    .ant-picker-input > input:placeholder-shown {
      text-indent: 10px;
    }
  }
  .panel-all {
    // background: #e8edf4;
    // padding: 10px;
    height: calc(~"100% - 0px");
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
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

      .uls {
        display: flex;

        .countItem {
          width: 18%;
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

        .countItem:last-child {
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
    //display: none;
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
      padding-left: 18px !important;
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
        width: calc(~"100% - 75px") !important;

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

.InstaceDashboardWrap {
  overflow: auto;

  .panel-all {
    overflow: hidden;
    height: auto;
  }

  .center {
    height: auto;
  }

  .panel .panel-head {
    margin-bottom: 10px !important;
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
        text-align: left;
      }

      .ant-table-tbody .ant-table-measure-row td {
        padding: 0 !important;
      }

      .ant-table-thead > tr > th {
        background-color: #f7fbfe !important;
        padding: 8.5px 16px !important;
        text-align: left;
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
      top: 44px;
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
