<template>
  <div class="DutyShiftSearchWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/hetong.png')" alt="" />
        </div>
        <span class="headerTitle">部门值班查询</span>
      </div>
      <div class="headerRight">
        <!-- <a-button type="primary" class="ml10" @click="handleNew">新建权限</a-button> -->
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="24" class="wea-left-right-layout-right">
          <div style="height: 100%" ref="contentRef">
            <!-- <HighSearch @update-height="changeHeight" @search="handleSearch" :entityApiName="sObjectName"></HighSearch> -->
            <div class="DutyShiftSearchHeader">
              <div class="formItem" style="position: absolute">
                <span class="label">科室类别：</span>
                <a-select
                  placeholder="请选择"
                  allowClear
                  v-model:value="CategoryCode"
                  style="width: 150px"
                  @change="
                    (e) => {
                      CategoryCode = e;
                      getDeptList();
                    }
                  "
                >
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="1">管理</a-select-option>
                  <a-select-option value="2">医疗</a-select-option>
                  <a-select-option value="3">医技</a-select-option>
                  <a-select-option value="4">护理</a-select-option>
                  <a-select-option value="5">医辅</a-select-option>
                  <a-select-option value="7">其他</a-select-option>
                </a-select>
              </div>
              <div class="formItem" style="position: absolute; left: 250px">
                <span class="label">部门：</span>
                <a-input
                  placeholder="请选择"
                  v-model:value="deptName"
                  :title="deptName"
                  style="width: 150px; border-radius: 4px !important"
                  @click="openMultiDept"
                />
              </div>
              <div class="form">
                <div class="formItem ml10 pickerTime">
                  <span class="arrowIcon" @click="handlePrevWeek">
                    <LeftOutlined />
                  </span>
                  <a-date-picker
                    v-model:value="startWeekTime"
                    @change="changeStartTime"
                    :allowClear="false"
                  />
                  ~
                  <a-date-picker
                    v-model:value="endWeekTime"
                    @change="changeEndTime"
                    :allowClear="false"
                  />
                  <span class="arrowIcon" @click="handleNextWeek">
                    <RightOutlined />
                  </span>
                </div>
                <a-button
                  :disabled="
                    currentStartWeekTime ==
                      dayjs(startWeekTime).format('YYYY-MM-DD') &&
                    currentEndWeekTime ==
                      dayjs(endWeekTime).format('YYYY-MM-DD')
                  "
                  class="ml10"
                  @click="backNowTime"
                  >本周</a-button
                >
                <a-button
                  class="ml10"
                  :icon="h(RedoOutlined)"
                  @click="reSetData"
                  title="重置"
                ></a-button>
              </div>
              <div class="btnOptions"></div>
            </div>
            <div class="wea-header">
              <div class="wea-tab">
                <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                  <a-tab-pane
                    v-for="(item, index) in data.tabs"
                    :key="item.id"
                    :num="index"
                  >
                    <template #tab>
                      <span>
                        {{ item.label }}
                      </span>
                    </template>
                  </a-tab-pane>
                </a-tabs>
                <div class="tabsBtn"></div>
              </div>
            </div>
            <div class="tableWrap" ref="tablelist">
              <div class="empty" v-if="!dataSource.length">
                <img src="/src/assets/img/empty.png" alt="" />
                <p class="emptyDesc">当前暂无数据</p>
              </div>
              <a-table
                v-if="dataSource.length"
                style="height: 100%;"
                :scroll="{ y: tableHeight }"
                :dataSource="dataSource"
                :columns="columns"
                :pagination="false"
                @change="handleTableChange"
                bordered
              >
                <template #bodyCell="{ column, index, record }">
                  <template v-if="column.key === 'index'">
                    <div>
                      {{ index + 1 }}
                    </div>
                  </template>
                  <template v-if="column.key === 'checked'">
                    <div>
                      <a-checkbox v-model:checked="record.checked"></a-checkbox>
                    </div>
                  </template>
                  <template v-if="column.key == 'Action'">
                    <div class="iconBox">
                      <div class="popup">
                        <div
                          class="option-item"
                          @click="handleDelete(record.id)"
                          :num="index"
                        >
                          删除
                        </div>
                      </div>
                      <svg
                        class="moreaction"
                        width="15"
                        height="20"
                        viewBox="0 0 520 520"
                        fill="none"
                        role="presentation"
                        data-v-69a58868=""
                      >
                        <path
                          d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                          fill="#747474"
                          data-v-69a58868=""
                        ></path>
                      </svg>
                    </div>
                  </template>
                  <template v-if="column.key === 'WorkDay'">
                    <div
                      :class="{
                        state0: record['state'] == 0,
                        state1: record['state'] == 1,
                        state2: record['state'] == 2,
                      }"
                    >
                      <span class="WorkDay">{{ record[column.key] }}</span>
                    </div>
                  </template>
                  <template
                    v-if="
                      column.key != 'Action' &&
                      column.key != 'Name' &&
                      column.key != 'index' &&
                      column.key != 'checked' &&
                      column.key != 'WorkDay' &&
                      column.key != 'state'
                    "
                  >
                    <div
                      class="dutyShiftCell"
                      :class="{
                        state0: column['state'] == 0,
                        state1: column['state'] == 1,
                        state2: column['state'] == 2,
                      }"
                    >
                      <div
                        class="dutyShiftCellItem"
                        v-for="(item, index) in record[column.key]"
                        :key="index"
                      >
                        <div class="dutyShiftName">
                          <div class="peoplename">
                            {{ item.EmployeeIdName || "" }}
                          </div>
                          <div class="shiftname" v-if="item.WorkShiftIdName">
                            {{ item.WorkShiftIdName }}
                          </div>
                        </div>
                        <div class="telephone">{{ item.TelePhone }}</div>
                      </div>
                    </div>
                  </template>
                </template>
              </a-table>
              <!-- <div class="pageWrap">
                <a-pagination
                  show-size-changer
                  show-quick-jumper
                  :pageSizeOptions="pagination.pageSizeOptions"
                  :pageSize="pagination.pageSize"
                  @showSizeChange="sizeChange"
                  @change="handleTableChange"
                  v-model:current="pagination.current"
                  :total="pagination.total"
                  :show-total="(total) => `共 ${total} 条`"
                />
              </div> -->
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Delete
      v-if="data.isDelete"
      :isShow="data.isDelete"
      :desc="data.deleteDesc"
      @cancel="cancelDelete"
      @ok="refreshData"
      :sObjectName="sObjectName"
      :recordId="data.recordId"
      :objTypeCode="objectTypeCode"
      :external="data.external"
    />
    <common-form-modal
      :isShow="isCommon"
      v-if="isCommon"
      @cancel="isCommon = false"
      :title="data.recordId ? '编辑' : '新建'"
      @success="refreshData"
      :id="data.recordId"
      :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName"
      :relatedObjectAttributeValue="relatedObjectAttributeValue"
      :relatedObjectAttributeName="relatedObjectAttributeName"
    ></common-form-modal>
    <CommonConfirm
      v-if="isConfirm"
      :isShow="isConfirm"
      :text="confirmText"
      :title="confirmTitle"
      @cancel="isConfirm = false"
      @ok="isConfirm = false"
      :id="CheckList"
    />
    <multiple-dept
      v-if="isMultipleDept"
      :isShow="isMultipleDept"
      @cancel="isMultipleDept = false"
      @selectVal="handleDeptParams"
    />
  </div>
</template>
<script setup>
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined,
  ApartmentOutlined,
  SearchOutlined,
  StarOutlined,
  StarFilled,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
  RedoOutlined,
} from "@ant-design/icons-vue";
import {
  ref,
  watch,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  onUpdated,
  h,
  nextTick,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
import HighSearch from "@/components/HighSearch.vue";
import { useRouter, useRoute } from "vue-router";
import { girdFormatterValue } from "@/utils/common.js";
import MultipleDept from "@/components/commonModal/MultipleDept.vue";
const route = useRoute();
const router = useRouter();
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import Delete from "@/components/listView/Delete.vue";

const { proxy } = getCurrentInstance();
const tablelist = ref();

let data = reactive({
  isCollapsed: false,
  tableHeight: 0,
  fieldNames: {
    children: "children",
    title: "name",
    key: "id",
  },
  activeKey: "",
  isModal: false,
  isCirculation: false,
  isNew: false,
  searchVal: "",
  value: "",
  isDelete: false,
  deleteDesc: "确定要删除吗？",
  recordId: "",
  external: false,
  userId: "",
  isCommon: false,
  objectTypeCode: "20451",
  sObjectName: "HRAttendEmpDutyShift",
  relatedObjectAttributeValue: {},
  relatedObjectAttributeName: "",
  SelectKey: "",
  SelectName: "",
  selectedKeys: [],
  isNewFolder: false,
  CheckList: [],
  isConfirm: false,
  confirmText: "",
  confirmTitle: "",
  pagination: {
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0,
    pageSize: 20,
    current: 1,
    pageSizeOptions: ["10", "20", "50", "100", "200"],
    defaultPageSize: 10,
    showTotal: (total) => {
      return `共${total}条`;
    },
  },
  total: 0,
  columns: [
    // {
    //   title: "序号",
    //   dataIndex: "index",
    //   key: "index",
    //   width: 80,
    // },
    // {
    //   title: "选择",
    //   dataIndex: "checked",
    //   key: "checked",
    //   width: 50,
    // },
    {
      title: "值班日期",
      dataIndex: "WorkDay",
      key: "WorkDay",
      width: 100,
    },
    // {
    //   title: "领导值班",
    //   dataIndex: "Leader",
    //   key: "Leader",
    //   width: 200,
    // },
    // {
    //   title: "行政总值班",
    //   dataIndex: "XZ",
    //   key: "XZ",
    //   width: 200,
    // },
    // {
    //   title: "医疗值班",
    //   dataIndex: "YL",
    //   key: "YL",
    //   width: 200,
    // },
    // {
    //   title: "护理值班",
    //   dataIndex: "HL",
    //   key: "HL",
    //   width: 200,
    // },
    // {
    //   title: "创伤中心排班",
    //   dataIndex: "CSZX",
    //   key: "CSZX",
    //   width: 200,
    // },
    // {
    //   title: "操作",
    //   key: "Action",
    //   width: 120,
    // },
  ],
  dataSource: [],
  hightSearchParams: {},
  currentTime: dayjs(),
  startWeekTime: "",
  endWeekTime: "",
  week: [],
  tabs: [
    {
      label: "全部",
      count: "",
      id: "",
    },
  ],
  ShiftTypeList: [],
  DeptList: [],
  isMultipleDept: false,
  CategoryCode: null,
  deptName: "",
  deptIds: [],
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
};
const {
  CategoryCode,
  deptName,
  deptIds,
  isMultipleDept,
  total,
  ShiftTypeList,
  tabs,
  currentTime,
  startWeekTime,
  endWeekTime,
  week,
  hightSearchParams,
  dataSource,
  columns,
  pagination,
  CheckList,
  isConfirm,
  confirmText,
  confirmTitle,
  isNewFolder,
  selectedKeys,
  SelectName,
  SelectKey,
  relatedObjectAttributeValue,
  relatedObjectAttributeName,
  recordId,
  objectTypeCode,
  sObjectName,
  isCommon,
  isCollapsed,
  userId,
  tableHeight,
  fieldNames,
  activeKey,
  isModal,
  isCirculation,
  isNew,
  value,
  searchVal,
  SearchFields,
  DeptList,
} = toRefs(data);
const contentRef = ref(null);
const gridRef = ref(null);

function changeHeight(h) {
  let h1 = tablelist.value.clientHeight;
  //data.tableHeight = h1 - 85;
  data.tableHeight = h1 - 32;
}
const handleSearch = (obj) => {
  data.pagination.current = 1;
  if (obj) {
    data.hightSearchParams = obj;
  } else {
    data.hightSearchParams = {};
  }
  getQuery();
};
const openMultiDept = () => {
  data.isMultipleDept = true;
};
const handleDelete = (id) => {
  data.relatedObjectAttributeValue = {};
  data.relatedObjectAttributeName = "";
  data.objectTypeCode = "6061";
  data.sObjectName = "RecordAccessControl";
  data.recordId = id;
  data.isDelete = true;
};
const refreshData = (e) => {
  data.pagination.current = 1;
  nextTick(() => {
    //getQuery();
    getDeptList();
  });
};
const reSetData = (e) => {
  data.pagination.current = 1;
  data.deptIds=[];
  data.deptName='';
  data.CategoryCode=null;
  nextTick(() => {
    //getQuery();
    getDeptList();
  });
};
const cancelDelete = (e) => {
  data.isDelete = false;
};

const getTabs = () => {
  data.tabs = [];
  let d = {
    entityName: "Organization",
    displayColumns: "Name",
  };
  proxy.$post(Interface.list2, d).then((res) => {
    var list = [];
    if (res?.nodes?.length) {
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "viewUrl") {
            item[cell] = girdFormatterValue(cell, item);
          }
        }
        item.label = item.Name;
        list.push(item);
      }
    }
    data.tabs = list;
    getDeptList();
  });
};
const getDeptList = () => {
  data.DeptList = [];
  let filterCondition = [];
  filterCondition.push({
    attribute: "OrganizationId",
    column: "OrganizationId",
    label: "",
    operator: "eq",
    logical: "AND",
    picklistValues: [],
    isEditable: false,
    operands: [data.activeKey],
  });
  if (data.deptName) {
    filterCondition.push({
      attribute: "Name",
      column: "Name",
      label: "",
      operator: "in",
      logical: "AND",
      picklistValues: [],
      isEditable: false,
      operands: data.deptName.split(","),
    });
  }
  if (data.CategoryCode) {
    filterCondition.push({
      attribute: "CategoryCode",
      column: "CategoryCode",
      label: "",
      operator: "eq",
      logical: "AND",
      picklistValues: [],
      isEditable: false,
      operands: [data.CategoryCode],
    });
  }
  filterCondition = JSON.stringify(filterCondition);
  let d = {
    entityName: "BusinessUnit",
    displayColumns: "Name",
    filterCondition: filterCondition,
    // page: data.pagination.current,
    // rows: data.pagination.pageSize,
    page: 1,
    rows: 1000,
  };
  data.total = 0;
  data.pagination.total = 0;
  proxy.$post(Interface.list2, d).then((res) => {
    var list = [];
    if (res?.nodes?.length) {
      data.total = res.totalCount || 0;
      data.pagination.total = res.totalCount || 0;
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "viewUrl") {
            item[cell] = girdFormatterValue(cell, item);
          }
        }
        item.label = item.Name;
        list.push(item);
      }
    }
    data.DeptList = list;
    getQuery();
  });
};
const getWeekDay = (num) => {
  let date = new Date(data.startWeekTime);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let result = dayjs(new Date(year, month, day + num)).format("YYYY-MM-DD");
  return result;
};
const handleDeptParams = (params) => {
  console.log("deptData", params);
  data.isMultipleDept = false;
  if (params.length) {
    data.deptName = "";
    params.forEach((ite, idx) => {
      data.deptIds.push(ite.id);
      data.deptName += data.deptName ? "," + ite.text : ite.text;
    });
  } else {
    data.deptName = "";
    data.deptIds = [];
  }
  getDeptList();
};
const getQuery = () => {
  data.columns = [
    {
      title: "部门名称",
      dataIndex: "Name",
      key: "Name",
      width: 200,
    },
  ];

  let d = {
    entityName: "HRAttendWatchShiftDeptDay",
    displayColumns:
      "WorkDay,EmployeeId,Telphone,ShiftType,BusinessUnitId,Description,ShiftName,WorkShiftId",
  };
  let filterCondition = [];
  filterCondition.push({
    attribute: "WorkDay",
    column: "WorkDay",
    label: "",
    operator: "ge",
    logical: "AND",
    picklistValues: [],
    isEditable: false,
    operands: [dayjs(data.startWeekTime).format("YYYY-MM-DD")],
  });
  filterCondition.push({
    attribute: "WorkDay",
    column: "WorkDay",
    label: "",
    operator: "le",
    logical: "AND",
    picklistValues: [],
    isEditable: false,
    operands: [dayjs(data.endWeekTime).format("YYYY-MM-DD")],
  });
  d.filterCondition = JSON.stringify(filterCondition);

  // if (data.calendarOptions.initialView == "dayGridMonth") {
  //   d.actions[0].params.calendarType = "month";
  // } else if (data.calendarOptions.initialView == "timeGridWeek") {
  //   d.actions[0].params.calendarType = "week";
  // } else if (data.calendarOptions.initialView == "timeGridDay") {
  //   d.actions[0].params.calendarType = "day";
  // }
  // let obj = {
  //   message: JSON.stringify(d),
  // };
  let today = dayjs(new Date()).format("YYYY-MM-DD");
  data.dataSource = [];
  for (var i = 0; i < 7; i++) {
    let WorkDay = getWeekDay(i);
    let ite = {
      title: WorkDay,
      dataIndex: "columns" + WorkDay,
      key: "columns" + WorkDay,
      width: 200,
    };
    if (new Date(WorkDay).getTime() == new Date(today).getTime()) {
      ite.state = 1;
    } else if (new Date(WorkDay).getTime() < new Date(today).getTime()) {
      ite.state = 0;
    } else if (new Date(WorkDay).getTime() > new Date(today).getTime()) {
      ite.state = 2;
    }
    data.columns.push(ite);
  }
  for (var j = 0; j < data.DeptList.length; j++) {
    let ite = {};

    for (var i = 0; i < 7; i++) {
      ite["columns" + getWeekDay(i)] = [];
    }
    ite["Name"] = data.DeptList[j].Name;
    ite["id"] = data.DeptList[j].id;
    data.dataSource.push(ite);
  }

  proxy.$post(Interface.list2, d).then((res) => {
    if (res && res.nodes && res.nodes.length) {
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "viewUrl" && cell != "BusinessUnitId") {
            item[cell] = girdFormatterValue(cell, item);
          }
          if (cell == "BusinessUnitId") {
            let cellt = item[cell];
            item[cell] =
              cellt && cellt.lookupValue ? cellt.lookupValue.value : "";
            item[cell + "Name"] =
              cellt && cellt.lookupValue ? cellt.lookupValue.displayName : "";
          }
        }
        data.dataSource.forEach((ite, idx) => {
          if (item.BusinessUnitId == ite.id) {
            let result = {
              EmployeeIdName: item.EmployeeId,
              WorkShiftIdName: item.ShiftName,
              TelePhone: item.Telphone,
            };
            data.dataSource[idx]["columns" + item.WorkDay].push(result);
          }
        });
      }
    }
  });
};
//批量
const handleRelease = () => {
  let list = gridRef.value.getCheckList();
  if (list.length) {
    data.CheckList = list;
    data.isConfirm = true;
    data.confirmText = "确定要批量吗？";
    data.confirmTitle = "批量";
  } else {
    message.error("请至少勾选一项！");
  }
};
const today = dayjs();
for (let i = 0; i < 7; i++) {
  const date = today.startOf("week").add(i - 1, "day");
  // console.log("date",date.format("YYYY-MM-DD"))
  var time = date.format("YYYY-MM-DD");
  data.week.push(time);
}
data.startWeekTime = dayjs(data.week[0]);
data.endWeekTime = dayjs(data.week[data.week.length - 1]);

const week0 = data.week;
const currentStartWeekTime = dayjs(data.week[0]).format("YYYY-MM-DD");
const currentEndWeekTime = dayjs(data.week[data.week.length - 1]).format(
  "YYYY-MM-DD"
);

const backNowTime = () => {
  data.week = week0;
  data.startWeekTime = dayjs(week0[0]).format("YYYY-MM-DD");
  data.endWeekTime = dayjs(week0[week0.length - 1]).format("YYYY-MM-DD");
  data.pagination.current = 1;
  nextTick(() => {
    //getQuery();
    getDeptList();
  });
};

watch(
  week,
  (newVal, oldVal) => {
    data.startWeekTime = dayjs(newVal[0]);
    data.endWeekTime = dayjs(newVal[newVal.length - 1]);
  },
  { deep: true, immediate: true }
);
// 周-切换日期
const changeStartTime = (e) => {
  nextTick(() => {
    data.pagination.current = 1;
    //getQuery();
    getDeptList();
  });
};
const changeEndTime = (e) => {
  nextTick(() => {
    data.pagination.current = 1;
    //getQuery();
    getDeptList();
  });
};
// 周-上周
const handlePrevWeek = () => {
  let temp = [];
  for (let i = 0; i < 7; i++) {
    const date = dayjs(data.endWeekTime)
      .startOf("week")
      .add(i - 8, "day");
    var time = date.format("YYYY-MM-DD");
    temp.push(time);
  }
  //console.log("temp",temp);
  data.week = temp;
  data.pagination.current = 1;
  nextTick(() => {
    //getQuery();
    getDeptList();
  });
};
// 周-下周
const handleNextWeek = () => {
  let temp = [];
  for (let i = 0; i < 7; i++) {
    const date = dayjs(data.endWeekTime)
      .startOf("week")
      .add(i + 6, "day");
    var time = date.format("YYYY-MM-DD");
    temp.push(time);
  }
  data.week = temp;
  data.pagination.current = 1;
  nextTick(() => {
    //getQuery();
    getDeptList();
  });
};
const changeTab = (e) => {
  data.pagination.current = 1;
  data.activeKey = e;
  //getQuery();
  getDeptList();
};
const getPickerList = () => {
  let d = {
    actions: [
      {
        id: "2320;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: "HRAttendWatchShiftOrgDay",
          recordTypeId: "",
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.pickListValues, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.picklistFieldValues
    ) {
      let picklistFieldValues = res.actions[0].returnValue.picklistFieldValues;
      data.ShiftTypeList = picklistFieldValues.ShiftType
        ? picklistFieldValues.ShiftType.values
        : [];
    }
  });
};
//改变页码
const handleTableChange = (page, pageSize) => {
  data.pagination.current = page;
  data.pagination.pageSize = pageSize;
  getDeptList();
};
const sizeChange = (current, size) => {
  handleTableChange(current, size);
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
    data.activeKey = userInfo.organizationId;
  }
  data.pagination.current = 1;
  changeHeight();
  window.addEventListener("resize", changeHeight);
  //getPickerList();
  getTabs();
});
</script>
<style lang="less" scoped>
.DutyShiftSearchWrap {
  width: 100%;
  height: 100%;
  background: #fff;
  :deep .ant-btn {
    margin-top: 0px;
  }
  :deep .ant-picker .ant-picker-input {
    width: 96px;
  }
  .wea-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //border-bottom: 1px solid #eaeaea;
    padding-right: 0;
    border: 0 !important;
  }

  .todo-content .ant-row .wea-tab {
    height: 45px !important;

    :deep .ant-tabs-nav::before {
      display: none;
    }
  }

  .todo-content
    .ant-row
    .wea-tab
    :deep
    .ant-tabs
    .ant-tabs-nav
    .ant-tabs-nav-wrap {
    height: 45px !important;
  }
  .DutyShiftSearchHeader {
    width: 100%;
    padding: 10px 12px;
    //border-bottom: 1px solid #e5e6eb;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .form {
      display: flex;
      margin: 0 auto;
      .formItem {
        &.pickerTime {
          display: flex;
          align-items: center;

          .arrowIcon {
            cursor: pointer;
          }

          .ant-picker {
            border: none;
          }
        }
      }
    }
  }
  .todo-head {
    width: 100%;
    height: 52px;
    line-height: 52px;
    background: #f9f9f9;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;

    .todo-head-left {
      padding-left: 20px;
      display: flex;
      align-items: center;
      flex: 1;

      .icon-circle-base {
        width: 35px;
        height: 35px;
        //background: rgb(0, 121, 222);
        background: rgb(150, 53, 138);
        border-radius: 50%;
        margin-right: 10px;
        color: #fff;
      }

      .wea-new-top-title-breadcrumb {
        color: #484a4d;
        margin-left: 3px;
        font-size: 14px;
        font-weight: 500;
      }
    }

    .todo-head-right {
      padding-right: 14px;
      display: flex;
      align-items: center;

      .btn-drop {
        display: inline-block;
        padding-left: 20px;
        line-height: 40px;
        vertical-align: middle;
        cursor: pointer;
      }

      .ant-btn-group {
        margin-left: 10px;
      }
    }
  }

  .todo-content {
    width: 100%;
    height: calc(~"100% - 52px");

    .ant-row {
      height: 100%;

      .wea-left-right-layout-left {
        border-right: 1px solid #eaeaea;

        .wea-left-tree {
          width: 100%;
          height: 100%;

          .wea-left-tree-search {
            width: 100%;
            height: 46px;
            line-height: 46px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 14px;

            :deep .ant-input {
              border: none !important;
            }

            .wea-left-tree-search-label {
              display: inline-block;
              padding-left: 14px;
              min-width: 76px;
              cursor: pointer;
              font-weight: 600;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 12px;
            }
          }

          .wea-left-tree-scroll {
            margin-top: 10px;
            width: 100%;
            height: calc(~"100% - 56px");
            overflow: auto;

            .ant-tree-title {
              display: inline-block;
              width: 100%;
            }

            .ant-tree-title > span {
              width: 100%;
              display: flex;
              justify-content: space-between;

              .tree-num {
                padding-right: 10px;
                position: relative;
                color: rgb(197, 197, 197);

                .tree-btn {
                  position: absolute;
                  left: -20px;
                  top: 1px;
                  width: 14px;
                  height: 14px;
                  color: #aaa;
                  display: none;
                }

                .tree-favor {
                  left: -20px;
                }

                .tree-add {
                  left: -110px;
                }

                .tree-edit {
                  left: -80px;
                }

                .tree-delete {
                  left: -50px;
                }

                .tree-favor-active {
                  color: #ffa741;
                }
              }
            }
          }
        }
      }

      .wea-left-right-layout-right {
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        position: relative;

        .wea-left-right-layout-btn {
          width: 18px;
          height: 60px;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -30px;
          z-index: 11;
          cursor: pointer;
          background-size: 100% 100%;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-show {
          background: url(~@/assets/img/leftTree-show.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
          background: url(~@/assets/img/leftTree-show-hover.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
          background: url(~@/assets/img/leftTree-hide.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
          background: url(~@/assets/img/leftTree-hide-hover.png) no-repeat -2px 0;
        }
      }

      .wea-tab {
        height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #fff;
        padding: 0 15px;
        width: 100%;
        :deep .ant-tabs-nav::before {
          border-bottom: none !important;
        }
      }

      //.wea-tabContent {
      //height: calc(~"100% - 98px");
      //}
    }
  }
}

.information-tree :deep .ant-tree-title {
  white-space: nowrap !important;
}

:deep .iconBox {
  text-align: left;

  .popup {
    text-align: left;
    top: 20px;
  }

  .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
}

.DutyShiftSearchWrap {
  .headerBar .headerLeft .icon-circle-base {
    //background: rgb(223, 88, 58);
    background: rgb(150, 53, 138);

    img {
      width: 20px;
      height: 20px;
      position: relative;
      top: 0.4px;
    }
  }

  .alltype {
    padding-left: 0 !important;
    min-width: 60px !important;
  }

  .wea-left-tree-select {
    position: relative;

    .ant-select {
      width: 100%;

      :deep .ant-select-selector {
        border-radius: 0 !important;
        border: 0 !important;
        border-bottom: 1px solid #dedede !important;
        height: 46px;
        line-height: 46px;
        display: block;
        padding-left: 35px;
        border-color: #dedede !important;
        box-shadow: none !important;

        .ant-select-selection-item {
          font-size: 13px;
          color: #494949;
        }
      }
    }

    .wea-left-tree-select-icon {
      color: #494949;
      position: absolute;
      left: 12px;
      top: 13px;
      z-index: 1;
    }
  }

  .wea-left-tree-search {
    margin-top: 3px;
    position: relative;

    .wea-left-tree-search-icon {
      color: #bbb;
      position: absolute;
      right: 21px;
      top: 1px;
      z-index: 1;
    }
  }

  .wea-left-tree-scroll {
    height: calc(~"100% - 100px") !important;
  }

  :deep .ant-tabs .ant-tabs-tab {
    padding: 12px 24px !important;
    margin-right: 6px !important;
  }

  :deep .anticon-close-circle {
    right: 14px !important;
    position: relative !important;
  }

  :deep .ant-tree-switcher .ant-tree-switcher-icon {
    position: relative;
    top: 2px;
    left: 5px;
  }

  :deep .ant-tree-treenode {
    padding-left: 10px !important;
  }

  :deep .ant-tree .ant-tree-checkbox + span {
    line-height: 30px;
  }

  :deep .ant-tree .ant-tree-checkbox {
    position: relative;
    left: 4px;
    top: -2px;
  }

  .wea-left-tree-scroll {
    height: calc(100% - 58px) !important;
  }

  :deep .formSearch .ant-form {
    position: relative !important;
    top: 6px !important;
  }

  .tableWrap {
    height: calc(~"100% - 100px");
    :deep .ant-table-cell {
      text-align: center;
    }
    :deep .ant-table-thead {
      .ant-table-cell {
        color: #444;
        font-size: 15px;
      }
    }
    .dutyShiftCell {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      .dutyShiftCellItem {
        //padding: 0 8px;
        border: 1px solid #ddd;
        margin: 0 8px;
        padding: 6px 12px;
        border-radius: 4px;
        display: inline-block;
        margin: 5px;
        .dutyShiftName {
          display: flex;
          justify-content: center;
          align-items: center;
          .peoplename {
            font-size: 15px;
            white-space: nowrap;
          }
          .shiftname {
            // font-size: 13px;
            //padding: 2px 9px;
            border-radius: 4px;
            //background: #bbb;
            margin-left: 6px;
            color: #fff;
            white-space: nowrap;
            font-size: 15px;
          }
        }
      }
      .telephone {
        font-size: 15px;
        white-space: nowrap;
      }
    }
    .state0 {
      .dutyShiftCellItem {
        border-color: #bbb;
        background: #bbb;
        .peoplename {
          color: #bbb;
          color: #fff;
        }
        .shiftname {
          background: transparent;
          color: #bbb;
          // border: 1px solid #bbb;
          // padding: 1px 8px;
        }
        .telephone {
          color: #bbb;
          color: #fff;
        }
      }
      .WorkDay {
        color: #bbb;
        font-size: 15px;
      }
    }
    .state1 {
      .dutyShiftCellItem {
        font-weight: bold;
        border-color: red;
        background: red;
        .peoplename {
          color: red;
          color: #fff;
        }
        .telephone {
          color: red;
          color: #fff;
        }
      }
      .WorkDay {
        font-weight: bold;
        color: red;
        font-size: 15px;
      }
    }
    .state2 {
      .dutyShiftCellItem {
        border-color: #106fae;
        background: #106fae;
        .peoplename {
          color: #106fae;
          color: #fff;
        }
        .telephone {
          color: #106fae;
          color: #fff;
        }
      }
      .WorkDay {
        color: #106fae;
        font-size: 15px;
      }
    }
  }

  :deep .ant-table-wrapper {
    height: calc(~"100% - 0px");

    .ant-table-container {
      height: calc(~"100% - 0px");
    }
  }

  :deep .ant-spin-nested-loading {
    height: calc(~"100% - 0px");

    .ant-spin-container {
      height: calc(~"100% - 0px");
    }
  }

  :deep .ant-table-wrapper .ant-table {
    height: calc(~"100% - 42px") !important;
  }

  .empty {
    background: #fff;
    padding: 0px 0 30px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 130px;
    }

    .emptyDesc {
      color: #333;
    }
  }

  :deep .ant-table-tbody .ant-table-cell {
    padding: 8px 16px !important;

    .AccessObjectName {
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      overflow: hidden;
    }

    .ant-select {
      width: 100%;
    }
  }

  .group_list_avatar {
    position: relative;
    top: 4px;
  }

  .iconBox .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }

  .iconBox .popup {
    top: 25px;
    right: 0;
    width: max-content;
    min-width: 88px;
  }

  :deep .formSearch .searchItem:first-child .ant-form-item {
    width: 255px;
  }

  :deep .ant-table-wrapper .ant-table-thead > tr > th {
    background-color: #f7fbfe !important;
    padding: 8.5px 16px !important;
  }

  :deep .ant-table-tbody tr:hover,
  :deep .ant-table-tbody tr:hover td {
    background-color: #e9f7ff !important;
    color: #108def !important;
  }

  :deep .ant-table-tbody tr:nth-child(odd) {
    background-color: rgb(250, 250, 250) !important;
    /* 奇数行背景色 */
  }

  :deep .ant-table-tbody tr:nth-child(even) {
    background-color: #fff !important;
    /* 偶数行背景色 */
  }

  :deep .ant-pagination {
    margin: 16px 16px !important;

    .ant-pagination-item {
      border: 1px solid #d9d9d9;
    }

    .ant-pagination-item:hover {
      border: 1px solid #1677ff;
      background: #fff !important;
    }

    .ant-pagination-item-active,
    .ant-pagination-item-active:hover {
      border: 1px solid #1677ff;
      background: #1677ff !important;

      a {
        color: #fff;
      }
    }
  }
}

:deep .ant-tree-treenode:hover .tree-btn {
  display: block !important;
}

input[aria-hidden="true"] {
  display: none !important;
}
.pageWrap {
  text-align: right;
  padding: 15px;

  .ant-pagination {
    .ant-pagination-item {
      border: 1px solid #d9d9d9 !important;
    }

    .ant-pagination-item:hover {
      border: 1px solid #1677ff !important;
      background: #1677ff;
    }

    .ant-pagination-item-active,
    .ant-pagination-item-active:hover {
      border: 1px solid #1677ff !important;
      background: #1677ff !important;

      a {
        color: #fff;
      }
    }
  }
}
</style>
