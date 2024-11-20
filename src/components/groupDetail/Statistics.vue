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
    <!-- <div class="panel">
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
    </div> -->
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">摘要</div>
      </div>
      <div class="panel-bd">
        <div class="abstract">
          <div class="abstractItem">
            <div class="abstractItem-title">帖子数量</div>
            <div class="abstractItem-num">{{ statistics.postCount||0 }}</div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">点赞数量</div>
            <div class="abstractItem-num">{{ statistics.likeCount||0 }}</div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">组人数</div>
            <div class="abstractItem-num">{{ statistics.peopleCount||0 }}</div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">问题数量</div>
            <div class="abstractItem-num">{{ statistics.questionCount||0 }}</div>
          </div>
          <div class="abstractItem">
            <div class="abstractItem-title">文件数量</div>
            <div class="abstractItem-num">{{ statistics.fileCount||0 }}</div>
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
  defineProps
} from "vue";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
dayjs.locale('zh-cn');
import calendar from 'dayjs/plugin/calendar';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
const { proxy } = getCurrentInstance();
import * as echarts from "echarts";
const props = defineProps({
    id: String,
});
  
const data = reactive({
  statistics: {},
  groupChatterAbstract:{},
  groupPostChatter:[]
});
const { statistics,groupChatterAbstract,groupPostChatter } = toRefs(data);
const chartMain = ref();
const chartMain2 = ref();
const getStatistics = () => {
  data.statistics = {};
  data.groupChatterAbstract = {};
  data.groupPostChatter = [];
  proxy.$get(Interface.group.statistics, {id:props.id}).then((res) => {
    //console.log("res", res);
    if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
      let statdata=res.actions[0].returnValue;
      data.statistics = statdata;
      data.groupChatterAbstract = statdata.groupChatterAbstract;
      data.groupPostChatter = statdata.groupPostChatter;
    }
    loadChart();
    //loadChart2();
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
  data.groupPostChatter.forEach((item) => {
    chartName.push(item.lable);
    chartData.push(item.value?Number(item.value) : 0);
  });
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
