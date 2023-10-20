<template>
  <div class="echartsWrap">
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">帖子统计</div>
      </div>
      <div class="panel-bd">
        <div
          id="canvas"
          ref="chartMain"
          style="width: 100%; height: 400px"
        ></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">成员统计</div>
      </div>
      <div class="panel-bd">
        <div
          id="canvas2"
          ref="chartMain2"
          style="width: 100%; height: 400px"
        ></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">摘要</div>
      </div>
      <div class="panel-bd">
        <div class="abstract">
          <div class="abstractItem">
            <div class="abstractItem-title">成员</div>
            <div class="abstractItem-num">{{ statistics.TotalPeople }}</div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">帖子</div>
            <div class="abstractItem-num">{{ statistics.TotalContent }}</div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">问题</div>
            <div class="abstractItem-num">{{ statistics.TotalQuestion }}</div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">为帖子点赞</div>
            <div class="abstractItem-num">
              {{ statistics.TotalContentLike }}
            </div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">备注</div>
            <div class="abstractItem-num">{{ statistics.TotalDesc }}</div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">未回答</div>
            <div class="abstractItem-num">{{ statistics.TotalUnAnser }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import "@/style/common.less";
import {
  ref,
  toRefs,
  reactive,
  toRaw,
  onMounted,
  watch,
  getCurrentInstance,
  nextTick,
  onUnmounted,
} from "vue";
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import * as echarts from "echarts";
const data = reactive({
  statistics: {},
});
const { statistics } = toRefs(data);
const chartMain = ref();
const chartMain2 = ref();
const getStatistics = () => {
  proxy.$get(Interface.group.statistics, {}).then((res) => {
    console.log("res", res);
    data.statistics = res.data;
    loadChart();
    loadChart2();
  });
};
getStatistics();
onMounted(() => {});
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
  option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    color: ["#165dff"],
    legend: {
      show: false,
      data: ["发布帖子数量"],
    },
    grid: {
      show: false,
      left: "5%",
      top: "10%",
      right: "5%",
      bottom: "10%",
    },
    xAxis: {
      data: chartName,
      axisLabel: {
        interval: 0,
        //rotate: 15,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "发布帖子数量",
      nameLocation: "center",
      nameGap: 50,
      nameTextStyle: {
        fontSize: 14,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: "发布帖子数量",
        type: "line",
        symbol: "circle",
        symbolSize: 5,
        data: chartData,
        label: {
          normal: {
            show: true,
            position: "top",
          },
          formatter: "{@value}",
        },
      },
    ],
  };
  option && myChart.setOption(option);
};
const loadChart2 = () => {
  var myChart2;
  var chartName2 = [];
  var chartData2 = [];
  data.statistics.PeopleStatistics.forEach((item) => {
    chartName2.push(item.YearMonth);
    chartData2.push(item.TotalPeople ? Number(item.TotalPeople) : 0);
  });
  if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
    myChart2.dispose(); //销毁
  }
  myChart2 = echarts.init(chartMain2.value);
  // 绘制图表
  var option2;
  option2 = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    color: ["#165dff"],
    legend: {
      show: false,
      data: ["加入成员数量"],
    },
    grid: {
      show: false,
      left: "5%",
      top: "5%",
      right: "5%",
      bottom: "10%",
    },
    xAxis: {
      data: chartName2,
      axisLabel: {
        interval: 0,
        //rotate: 15,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "加入成员数量",
      nameLocation: "center",
      nameGap: 50,
      nameTextStyle: {
        fontSize: 14,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: "加入成员数量",
        type: "bar",
        data: chartData2,
        barWidth: 40,
        label: {
          normal: {
            show: true,
            position: "top",
          },
          formatter: "{@value}",
        },
      },
    ],
  };
  option2 && myChart2.setOption(option2);
};
</script>
<style lang="less">
.panel {
  .panel-bd {
    .abstract {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      .abstractItem {
        flex: 0 0 32%;
        border-radius: 3px;
        padding: 15px;
        border: 1px solid #dedede;
        margin-right: 15px;
        margin-bottom: 15px;
        box-sizing: border-box;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .abstractItem-title {
          font-size: 16px;
          color: #181818;
        }
        .abstractItem-num {
          font-size: 36px;
          color: #181818;
          font-weight: 300;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
