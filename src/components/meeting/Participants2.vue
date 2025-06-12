<template>
  <div class="ParticipantsWrap" ref="PersonnelLst">
    <div class="panel panelt">
      <div class="panel-top">
        <div class="ant-card">
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">总人数</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: #108def"
              >
                {{ PeopleQty || 0 }}
              </div>
            </div>
            <div class="statistics-right">
              <InfoCircleOutlined style="color: #108def" />
            </div>
          </div>
        </div>

        <div class="ant-card">
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">接受</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: rgb(141, 193, 57)"
              >
                {{ AcceptQty || 0 }}
              </div>
            </div>
            <div class="statistics-right">
              <CheckCircleOutlined style="color: rgb(141, 193, 57)" />
            </div>
          </div>
        </div>

        <div class="ant-card">
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">拒绝</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: rgb(255, 25, 36)"
              >
                {{ RejectQty || 0 }}
              </div>
            </div>
            <div class="statistics-right">
              <CloseCircleOutlined style="color: rgb(255, 25, 36)" />
            </div>
          </div>
        </div>

        <div class="ant-card">
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">签到</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: rgb(58, 200, 210)"
              >
                {{ JoinQty || 0 }}
              </div>
            </div>
            <div class="statistics-right">
              <ExclamationCircleOutlined style="color: rgb(58, 200, 210)" />
            </div>
          </div>
        </div>

        <div class="ant-card">
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">签退</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: rgb(179, 123, 248)"
              >
                {{ SignoffQty || 0 }}
              </div>
            </div>
            <div class="statistics-right">
              <IssuesCloseOutlined style="color: rgb(179, 123, 248)" />
            </div>
          </div>
        </div>

        <div class="ant-card">
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">请假</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: orangered"
              >
                {{ DayoffQty || 0 }}
              </div>
            </div>
            <div class="statistics-right">
              <ClockCircleOutlined style="color: orangered" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-head">
        <div class="panel-title">参会人员</div>
        <div class="panel-btn">
          <a-button class="ml10" type="primary" @click="AddPeople"
            >邀请参与人</a-button
          >
        </div>
      </div>
      <div class="tabWrap panel-bd-tabWrap">
        <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
          <a-tab-pane v-for="(item, index) in tabs" :key="index">
            <template #tab>
              <span>{{ item.label }}</span>
            </template>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="panel-bd panel-bd2">
        <div class="peopleHeader">
          <div class="left">
            <a-input
              v-if="activeKey * 1 == 0"
              v-model:value="OwningBusinessUnitName"
              placeholder="部门"
              class="searchitem"
              @search="onSearch"
            ></a-input>
            <a-input
              v-model:value="searchVal"
              placeholder="姓名"
              class="searchitem"
              @search="onSearch"
            ></a-input>
            <a-select
              v-model:value="StatusCode"
              placeholder="接受状态"
              class="searchitem"
              v-if="activeKey * 1 == 0"
            >
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="0">未接受</a-select-option>
              <a-select-option value="1">已接受</a-select-option>
              <a-select-option value="2">已拒绝</a-select-option>
            </a-select>
            <a-select
              v-model:value="CheckinStatus"
              placeholder="签到状态"
              class="searchitem"
              v-if="activeKey * 1 == 0"
            >
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">未签到</a-select-option>
              <a-select-option value="2">已签到</a-select-option>
            </a-select>
            <a-select
              v-model:value="ClockType"
              placeholder="打卡类型"
              class="searchitem"
              v-if="activeKey * 1 == 1"
            >
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">签到</a-select-option>
              <a-select-option value="2">会议中签到</a-select-option>
              <a-select-option value="3">签退</a-select-option>
            </a-select>
            <!-- <a-date-picker show-time autoclear valueFormat="YYYY-MM-DD HH:mm" placeholder="打卡时间" v-model:value="CreatedOn" v-if="activeKey*1==1"></a-date-picker> -->
            <a-range-picker
              show-time
              class="radiusNone"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              @change="
                (e) => {
                  changeRangeDate(e);
                }
              "
              v-if="activeKey * 1 == 1"
            />
            <a-select
              v-model:value="IsLate"
              placeholder="是否迟到"
              class="searchitem"
              v-if="activeKey * 1 == 0"
            >
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="0">否</a-select-option>
              <a-select-option value="1">是</a-select-option>
            </a-select>
          </div>
          <div class="rightOption">
            <!-- <a-button class="ml10" type="primary" @click="AddPeople">邀请参与人</a-button> -->
            <a-button class="ml10" type="primary" @click="onSearch"
              >查询</a-button
            >
            <a-button class="ml10" type="default" @click="onClear"
              >重置</a-button
            >
            <a-button class="ml10" type="default" @click="onExport"
              >导出</a-button
            >
          </div>
        </div>
        <a-table
          :columns="columns"
          :dataSource="listData"
          :scroll="{ y: tableHeight }"
          :pagination="false"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template v-if="column.key === 'Action'">
              <div class="iconBox">
                <div class="popup">
                  <!-- <div class="option-item" @click="handleEdit(record.id)" :num="index">编辑</div>   -->
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
              <!-- <a-button type="text" size="small" @click="handleDelete(record.id)" :num="index">删除</a-button> -->
            </template>
            <template v-if="column.key === 'ClockType'">
              <div v-if="record.ClockType * 1 == 1">签到</div>
              <div v-else-if="record.ClockType * 1 == 2">会议中签到</div>
              <div v-else-if="record.ClockType * 1 == 3">签退</div>
              <div v-else>{{ record.ClockType || "" }}</div>
            </template>
            <!-- <template v-if="column.key === 'sort'">
                <div class="sortIcon">
                  <ArrowUpOutlined />
                  <ArrowDownOutlined />
                </div>
              </template> -->
          </template>
        </a-table>
        <div class="pageWrap">
          <a-pagination
            show-size-changer
            show-quick-jumper
            :pageSizeOptions="['10', '20', '50', '80', '100']"
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
    <radio-user
      v-if="isRadioUser"
      :isShow="isRadioUser"
      @selectVal="getUserData"
      @cancel="closeUser"
      @ok="refreshPeople"
    ></radio-user>
    <radio-dept
      v-if="isRadioDept"
      :isShow="isRadioDept"
      @selectVal="handleDeptParams"
      @cancel="cancelDeptModal"
      @ok="refreshPeople"
    ></radio-dept>
    <Delete
      :isShow="isDelete"
      :desc="deleteDesc"
      @cancel="cancelDelete"
      @ok="refreshPeople"
      :sObjectName="sObjectName"
      :recordId="recordId"
      :objTypeCode="objectTypeCode"
      :external="external"
    />
    <MultipleUsers
      v-if="isMultipleUser"
      :isShow="isMultipleUser"
      @cancel="isMultipleUser = false"
      @select="handleSelectUsers"
    />
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
  defineEmits,
  defineExpose,
  defineProps,
  h,
} from "vue";
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  IssuesCloseOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import RadioDept from "@/components/commonModal/RadioDept.vue";
import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";
import Delete from "@/components/listView/Delete.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const PersonnelLst = ref();
var columns0 = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: "部门",
    dataIndex: "OwningBusinessUnit",
    key: "OwningBusinessUnit",
  },
  {
    title: "姓名",
    dataIndex: "InviteeId",
    key: "InviteeId",
  },
  {
    title: "签到时间",
    dataIndex: "Checkin",
    key: "Checkin",
  },
  {
    title: "签到地址",
    dataIndex: "Location",
    key: "Location",
  },
  {
    title: "迟到时长",
    dataIndex: "LateMinutes",
    key: "LateMinutes",
  },
  {
    title: "签退时间",
    dataIndex: "Checkout",
    key: "Checkout",
  },
  {
    title: "接受状态",
    dataIndex: "StatusCode",
    key: "StatusCode",
  },
  {
    title: "拒绝原因",
    dataIndex: "Description",
    key: "Description",
  },
  {
    title: "操作",
    key: "Action",
    width: 120,
  },
];
var columns1 = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: "姓名",
    dataIndex: "CreatedBy",
    key: "CreatedBy",
  },
  {
    title: "打卡类型",
    dataIndex: "ClockType",
    key: "ClockType",
  },
  {
    title: "打卡时间",
    dataIndex: "CreatedOn",
    key: "CreatedOn",
  },
  {
    title: "打卡地址",
    dataIndex: "Location",
    key: "Location",
  },
  {
    title: "标志建筑",
    dataIndex: "BuildingName",
    key: "BuildingName",
  },
  {
    title: "经度",
    dataIndex: "Latitude",
    key: "Latitude",
  },
  {
    title: "纬度",
    dataIndex: "Longitude",
    key: "Longitude",
  },
  // {
  //   title: "操作",
  //   key: "Action",
  //   width: 120,
  // },
];
const props = defineProps({
  id: String,
  type: String,
});

const emit = defineEmits(["load"]);

const data = reactive({
  list: [],
  MeetingName: "",
  selectedRowKeys: [],
  loading: false,
  listData: [],
  searchVal: "",
  OwningBusinessUnitName: "",
  isRadioUser: false,
  isRadioDept: false,
  isDelete: false,
  RoleCode: 0,
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
  tableHeight: 0,
  recordId: "",
  objectTypeCode: "5002",
  sObjectName: "MeetingAudience",
  isDelete: false,
  deleteDesc: "确定要删除吗？",
  external: false,
  CheckinStatus: null,
  StatusCode: null,
  Checkin: null,
  Checkin1: null,
  Checkin2: null,
  IsLate: null,
  height: 100,
  PeopleQty: 0,
  AcceptQty: 0,
  JoinQty: 0,
  SignoffQty: 0,
  RejectQty: 0,
  DayoffQty: 0,
  activeKey: 0,
  tabs: [
    {
      label: "参会人员",
    },
    {
      label: "打卡记录",
    },
  ],
  columns: columns0,
  ClockType: null,
  CreatedOn: null,
  isMultipleUser: false,
});
//const columnList = toRaw(columns);
const {
  isMultipleUser,
  MeetingName,
  ClockType,
  CreatedOn,
  columns,
  tabs,
  activeKey,
  listData,
  PeopleQty,
  AcceptQty,
  JoinQty,
  SignoffQty,
  RejectQty,
  DayoffQty,
  height,
  searchVal,
  OwningBusinessUnitName,
  pagination,
  tableHeight,
  recordId,
  objectTypeCode,
  sObjectName,
  isDelete,
  deleteDesc,
  external,
  isRadioUser,
  CheckinStatus,
  StatusCode,
  Checkin,
  Checkin1,
  Checkin2,
  isRadioDept,
  IsLate,
} = toRefs(data);
const changeTabs = (e) => {
  data.activeKey = e;
  data.pagination.current = 1;
  getQuery();
};
const getQuery = () => {
  data.listData = [];
  data.pagination.total = 0;
  let filterCondition = [
    {
      attribute: "MeetingId",
      column: "MeetingId",
      label: "会议",
      operator: "eq",
      logical: "AND",
      picklistValues: [],
      isEditable: false,
      operands: [props.id],
    },
  ];
  let displayColumns =
    "OwningBusinessUnit,InviteeId,Checkin,Location,LateMinutes,Checkout,StatusCode,Description";
  data.columns = columns0;
  data.objectTypeCode = "5002";
  data.sObjectName = "MeetingAudience";
  if (data.activeKey * 1 == 1) {
    filterCondition = [
      {
        attribute: "RegardingObjectId",
        column: "RegardingObjectId",
        label: "相关对象ID",
        operator: "eq",
        logical: "AND",
        picklistValues: [],
        isEditable: false,
        operands: [props.id],
      },
    ];
    displayColumns =
      "CreatedBy,ClockType,CreatedOn,Location,BuildingName,Latitude,Longitude";
    data.columns = columns1;
    data.objectTypeCode = "5010";
    data.sObjectName = "ActivityClockRecord";
    if (data.ClockType) {
      filterCondition.push({
        attribute: "ClockType",
        column: "ClockType",
        label: "",
        operator: "eq",
        logical: "AND",
        picklistValues: [],
        isEditable: false,
        operands: [data.ClockType],
      });
    }
    if (data.CreatedOn) {
      filterCondition.push({
        attribute: "CreatedOn",
        column: "CreatedOn",
        label: "",
        operator: "eq",
        logical: "AND",
        picklistValues: [],
        isEditable: false,
        operands: [data.CreatedOn],
      });
    }
  } else {
    if (data.StatusCode) {
      filterCondition.push({
        attribute: "StatusCode",
        column: "StatusCode",
        label: "",
        operator: "eq",
        logical: "AND",
        picklistValues: [],
        isEditable: false,
        operands: [data.StatusCode],
      });
    }
    if (data.CheckinStatus) {
      filterCondition.push({
        attribute: "CheckinStatus",
        column: "CheckinStatus",
        label: "",
        operator: "eq",
        logical: "AND",
        picklistValues: [],
        isEditable: false,
        operands: [data.CheckinStatus],
      });
    }
    if (data.OwningBusinessUnitName) {
      filterCondition.push({
        attribute: "OwningBusinessUnitName",
        column: "OwningBusinessUnitName",
        label: "",
        operator: "contains",
        logical: "AND",
        picklistValues: [],
        isEditable: false,
        operands: [data.OwningBusinessUnitName],
      });
    }
    if (data.IsLate) {
      filterCondition.push({
        attribute: "Checkin",
        column: "Checkin",
        label: "",
        operator: "eq",
        logical: "AND",
        picklistValues: [],
        isEditable: false,
        operands: [data.IsLate],
      });
    }
  }
  let d = {
    filterId: "",
    objectTypeCode: data.objectTypeCode,
    entityName: data.sObjectName,
    search: data.searchVal || "",
    page: data.pagination.current,
    rows: data.pagination.pageSize,
    sort: "ModifiedOn",
    order: "desc",
    displayColumns: displayColumns,
  };
  if (filterCondition && filterCondition.length) {
    d.filterCondition = JSON.stringify(filterCondition);
  }
  proxy.$post(Interface.list2, d).then((res) => {
    var list = [];
    data.total = res.pageInfo ? res.pageInfo.total : 0;
    data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
    //console.log(pagination)
    if (res && res.nodes) {
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "nameField") {
            item[cell] = girdFormatterValue(cell, item);
          }
        }
        list.push(item);
      }
    }
    data.listData = list;
  });
};
const onSearch = (e) => {
  data.pagination.current = 1;
  getQuery();
};
const onClear = (e) => {
  data.searchVal = "";
  data.OwningBusinessUnitName = "";
  data.StatusCode = null;
  data.CheckinStatus = null;
  data.Checkin = null;
  data.IsLate = null;
  data.ClockType = null;
  data.CreatedOn = null;
  getQuery();
};
const windowOpen = (url, fileName) => {
  var xhr = new XMLHttpRequest();
  // var fileName = window.fileName + typeName; // 文件名称
  xhr.open("POST", url, true);
  xhr.responseType = "blob";

  //xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
  //xhr.setRequestHeader('token', window.localStorage.getItem('token'));
  xhr.onload = function (res) {
    if (this.status === 200) {
      var type = xhr.getResponseHeader("Content-Type");
      var blob = new Blob([this.response], { type: type });
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        /*
         * For IE
         * >=IE10
         */
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        /*
         * For Non-IE (chrome, firefox)
         */
        var URL = window.URL || window.webkitURL;
        var objectUrl = URL.createObjectURL(blob);
        if (fileName) {
          var a = document.createElement("a");
          if (typeof a.download === "undefined") {
            window.location = objectUrl;
          } else {
            a.href = objectUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        } else {
          window.location = objectUrl;
        }
      }
    }
  };
  xhr.send();
};

const onExport = () => {
  let url = Interface.meeting.audienceDataExport + "?meetingId=" + props.id;
  let text = data.MeetingName + "_参会人员.xls";
  if (data.activeKey * 1 == 1) {
    url = Interface.meeting.checkinRecordExport + "?meetingId=" + props.id;
    text = data.MeetingName + "_打卡记录.xls";
  }
  windowOpen(url, text);
};
const changeRangeDate = (e) => {
  //console.log("e",e,item);
  if (e && e.length) {
    //data.Checkin=e.join(',');
    data.CreatedOn = e.join(",");
    data.Checkin1 = e[0];
    data.Checkin2 = e[1];
  } else {
    //data.Checkin='';
    data.CreatedOn = "";
  }
};
//改变页码
const handleTableChange = (page, pageSize) => {
  //data.pagination.current=page.current;
  data.pagination.current = page;
  data.pagination.pageSize = pageSize;
  getQuery();
};
const sizeChange = (current, size) => {
  handleTableChange(current, size);
};
getQuery();
// 添加成员
const AddPeople = () => {
  //data.isRadioUser = true;
  data.RoleCode = 0;
  data.isMultipleUser = true;
};
// 添加管理员
const AddAdmin = () => {
  data.RoleCode = 2;
  //data.isRadioUser = true;
  data.isMultipleUser = true;
};
const refreshPeople = (e) => {
  getQuery();
  emit("load", "");
};
const closeUser = (e) => {
  data.isRadioUser = false;
};
// 添加成员/管理员
const getUserData = (params) => {
  console.log("params:", params);
  let url = Interface.create;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: "MeetingAudience",
            objTypeCode: "5002",
            fields: {
              MeetingId: props.id,
              InviteeId: params.id,
              Name: params.name,
              StatusCode: 0,
            },
          },
        },
      },
    ],
  };

  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    data.isRadioUser = false;
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      message.success("添加成功！");
      refreshPeople();
    }
  });
};
const cancelDeptModal = (params) => {
  data.isRadioDept = params;
};
const handleDeptParams = (params) => {
  console.log("deptData", params);
};
//多选
const handleSelectUsers = (params) => {
  // console.log("多选用户:", params);
  let addUsers = params.map((item) => {
    item.key = item.id;
    return item;
  });
  addUsers.forEach((item) => {
    getUserData(item);
  });
  data.isMultipleUser = false;
};
defineExpose({ getQuery, PersonnelLst });
//删除
const handleDelete = (key) => {
  data.recordId = key;
  data.isDelete = true;
};
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
};
const getDetail = () => {
  let d = {
    actions: [
      {
        id: "4270;a",
        descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: props.id,
          apiName: "MeetingRec",
          objTypeCode: 5000,
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.detail, obj).then((res) => {
    if (res && res.actions && res.actions[0]) {
      let record = res.actions[0].returnValue.fields;
      data.MeetingName = record.Name ? record.Name.value : "";
      data.PeopleQty = record.PeopleQty ? record.PeopleQty.value : 0;
      data.AcceptQty = record.AcceptQty ? record.AcceptQty.value : 0;
      data.RejectQty = record.RejectQty ? record.RejectQty.value : 0;
      data.JoinQty = record.JoinQty ? record.JoinQty.value : 0;
      data.SignoffQty = record.SignoffQty ? record.SignoffQty.value : 0;
      data.DayoffQty = record.DayoffQty ? record.DayoffQty.value : 0;
    }
  });
};
onMounted(() => {
  let h = document.documentElement.clientHeight;
  data.tableHeight = h - 490;
  data.height = h - 215;
  if (props.type == "modal") {
    data.tableHeight = h - 660;
    data.height = h - 385;
  }
  window.addEventListener("resize", (e) => {
    let h = document.documentElement.clientHeight;
    data.tableHeight = h - 490;
    data.height = h - 215;
    if (props.type == "modal") {
      data.tableHeight = h - 660;
      data.height = h - 385;
    }
  });
  getDetail();
});
</script>
<style lang="less">
.ParticipantsWrap {
  width: 100%;

  .panel {
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.peopleHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.peopleHeader .searchitem {
  width: 170px !important;
  margin-right: 10px;
  border-radius: 4px !important;

  .ant-select-selector {
    border-radius: 4px !important;
  }
}

.peopleHeader .left .ant-picker {
  width: 340px !important;
}

.ParticipantsWrap {
  .panel {
    padding-top: 15px !important;
    margin-bottom: 0px !important;
  }

  .panelt {
    margin-bottom: 20px !important;
    padding: 12px;
  }

  .detailContent {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    overflow: auto;
  }

  .panel-top {
    background: #fff !important;
    padding-bottom: 15px;
    display: flex;

    .ant-card {
      width: 330px;
      float: left;
      color: #666;
      margin: 0 7px;
      margin-bottom: 0;
      box-shadow: none !important;
      border: 1px solid #eee !important;
      border-radius: 2px !important;
      background-color: #fff;
    }

    .ant-card-body {
      padding: 10px 15px;
      line-height: 30px !important;
      overflow: hidden;
      position: relative;
    }

    .statistics-left {
      float: left;
    }

    .statistics-name {
      font-size: 14px;
    }

    .statistics-count {
      font-weight: 700;
      font-size: 22px;
      color: #555;
    }

    .ant-card-body {
      padding: 10px 15px;
      border-radius: 4px;
    }

    .statistics-right {
      float: right;

      .anticon {
        font-size: 48px;
        position: relative;
        top: 6px;
        color: #108def;
      }
    }

    .layui-icon.wancheng {
      font-size: 45px !important;
      margin-top: 12px;
      color: #108def;
    }
  }
}

body .ant-table-tbody td {
  padding: 6.5px 16px !important;
}

body .ant-table-measure-row td {
  padding: 0 !important;
}

body .ant-table-wrapper .ant-table-thead > tr > th {
  background-color: #f7fbfe !important;
  padding: 8.5px 16px !important;
}

body .ant-table-tbody tr:hover,
body .ant-table-tbody tr:hover td {
  background-color: #e9f7ff !important;
  color: #108def !important;
}

body .ant-table-tbody tr:nth-child(odd) {
  background-color: rgb(250, 250, 250) !important;
  /* 奇数行背景色 */
}

body .ant-table-tbody tr:nth-child(even) {
  background-color: #fff !important;
  /* 偶数行背景色 */
}

.ParticipantsWrap .panelt {
  background: #f0f2f6 !important;
  margin-bottom: 5px !important;
  padding: 0 !important;
}

.ParticipantsWrap .panel-top {
  background: #f0f2f6 !important;
  padding-bottom: 12px;
}

.ParticipantsWrap .panel-top .ant-card {
  border-radius: 4px !important;
}

.ParticipantsWrap .ant-card:first-child {
  margin-left: 0 !important;
}

.ParticipantsWrap .ant-card:last-child {
  margin-right: 0 !important;
}

.ParticipantsWrap .pageWrap {
  text-align: right;
  padding: 15px;
}

.ParticipantsWrap .iconBox .moreaction {
  padding: 0px 1px;
  width: 18px;
  border: 1px solid #dedede;
  border-radius: 4px;
  position: relative;
  top: 1px;
}

.ParticipantsWrap .iconBox .popup {
  top: 25px;
  right: 0;
  width: max-content;
  min-width: 88px;
}

:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper,
:where(.css-dev-only-do-not-override-kqecok).ant-spin-nested-loading,
:where(.css-dev-only-do-not-override-kqecok).ant-spin-nested-loading
  .ant-spin-container,
:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper .ant-table,
:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper
  .ant-table-container {
  height: 100% !important;
}

.ParticipantsWrap {
  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-nested-loading .ant-spin-container,
  .ant-table-wrapper .ant-table,
  .ant-table-wrapper .ant-table-container {
    height: 100% !important;
  }
}

.ParticipantsWrap .panel-bd2 {
  height: calc(~"100% - 205px") !important;
}

.ParticipantsWrap .ant-table-body {
  height: 100% !important;
}

.ant-pagination {
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

.ParticipantsWrap {
  .panel {
    .panel-top {
      .statistics-right {
        float: left !important;
        position: relative;
        left: 8px;
      }

      .statistics-left {
        float: right !important;
        width: calc(~"100% - 80px") !important;
      }

      .statistics-name {
        font-size: 12px;
        position: relative;
        top: 30px;
      }

      .statistics-count {
        font-weight: 700;
        font-size: 26px;
        color: #555;
        position: relative;
        top: -25px;
      }
    }

    .tabWrap {
      position: relative;
      top: -12px;
    }
  }
}
</style>
