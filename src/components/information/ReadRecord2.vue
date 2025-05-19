<template>
  <div class="ReadRecordWrap2" ref="PersonnelLst">
    <div class="panel panelt">
      <div class="panel-top">
        <div
          class="ant-card"
          :class="{ active: data.IsRead == '' }"
          @click="ChangeStatus('')"
        >
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">全部</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: #108def"
              >
                {{ AllQty || 0 }}
              </div>
            </div>
            <div class="statistics-right">
              <InfoCircleOutlined style="color: #108def" />
            </div>
          </div>
        </div>

        <div
          class="ant-card"
          :class="{ active: data.IsRead == '1' }"
          @click="ChangeStatus('1')"
        >
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">已读</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: rgb(141, 193, 57)"
              >
                {{ ReadedQty || 0 }}
              </div>
            </div>
            <div class="statistics-right">
              <CheckCircleOutlined style="color: rgb(141, 193, 57)" />
            </div>
          </div>
        </div>

        <div
          class="ant-card"
          :class="{ active: data.IsRead == '0' }"
          @click="ChangeStatus('0')"
        >
          <div class="ant-card-body">
            <div class="statistics-left">
              <div class="statistics-name">未读</div>
              <div
                class="statistics-count"
                name="ContractNumber"
                style="color: orangered"
              >
                {{ unReadQty || 0 }}
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
        <div class="panel-title" v-if="data.IsRead == ''">全部记录</div>
        <div class="panel-title" v-if="data.IsRead == '1'">已读记录</div>
        <div class="panel-title" v-if="data.IsRead == '0'">未读记录</div>
        <div class="panel-btn"></div>
      </div>
      <div class="panel-bd panel-bd2">
        <div class="peopleHeader">
          <div class="left">
            <a-input
              v-model:value="BusinessUnitName"
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
            <!-- <a-select v-model:value="StatusCode" placeholder="接受状态" class="searchitem">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="0">未接受</a-select-option>
                    <a-select-option value="1">已接受</a-select-option>
                    <a-select-option value="2">已拒绝</a-select-option>
              </a-select>
              <a-select v-model:value="CheckinStatus" placeholder="签到状态" class="searchitem">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">未签到</a-select-option>
                <a-select-option value="2">已签到</a-select-option>
              </a-select> -->
            <!-- <a-date-picker show-time autoclear valueFormat="YYYY-MM-DD HH:mm" placeholder="阅读时间" v-model:value="Checkin"></a-date-picker> -->
            <a-range-picker
              show-time
              class="radiusNone"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              @change="
                (e) => {
                  changeRangeDate(e);
                }
              "
            />
            <!-- <a-select v-model:value="IsLate" placeholder="是否迟到" class="searchitem">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="0">否</a-select-option>
                    <a-select-option value="1">是</a-select-option>
              </a-select> -->
          </div>
          <div class="rightOption">
            <a-button class="ml10" type="primary" @click="AddPeople"
              >添加可查看人员</a-button
            >
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
            <template v-if="column.key === 'checked'">
              <div>
                <a-checkbox v-model:checked="record.checked"></a-checkbox>
              </div>
            </template>
            <template v-if="column.key === 'IsRead'">
              <div v-html="record.IsRead"></div>
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
            <!-- <template v-if="column.key === 'index'">
                <div>
                  {{ index + 1 }}
                </div>
              </template>
              <template v-if="column.key === 'sort'">
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
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
import calendar from "dayjs/plugin/calendar";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
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
import { girdFormatterValue, commonExport } from "@/utils/common.js";
import { message } from "ant-design-vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import RadioDept from "@/components/commonModal/RadioDept.vue";
import Delete from "@/components/listView/Delete.vue";
import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";
const { proxy } = getCurrentInstance();
const PersonnelLst = ref();
var columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: "选择",
    dataIndex: "checked",
    key: "checked",
    width: 80,
  },
  {
    title: "部门",
    dataIndex: "BusinessUnitName",
    key: "BusinessUnitName",
  },
  {
    title: "姓名",
    dataIndex: "ReaderId",
    key: "ReaderId",
  },
  {
    title: "已读",
    dataIndex: "IsRead",
    key: "IsRead",
  },
  {
    title: "阅读时间",
    dataIndex: "ReadOn",
    key: "ReadOn",
  },
  {
    title: "IP地址",
    dataIndex: "IPAddr",
    key: "IPAddr",
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
  RegardingObjectIdName: String,
});

const emit = defineEmits(["load"]);

const data = reactive({
  list: [],
  selectedRowKeys: [],
  loading: false,
  listData: [],
  searchVal: "",
  BusinessUnitName: "",
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
  objectTypeCode: "2021",
  sObjectName: "RecordReadLog",
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
  IsRead: "",
  AllQty: 0,
  ReadedQty: 0,
  unReadQty: 0,
  isMultipleUser: false,
});
const columnList = toRaw(columns);
const {
  isMultipleUser,
  AllQty,
  ReadedQty,
  unReadQty,
  listData,
  IsRead,
  height,
  searchVal,
  BusinessUnitName,
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
} = toRefs(data);
const getQuery = () => {
  // proxy.$get(Interface.user.groupUser, {}).then((res) => {
  //   data.listData = res.rows;
  // });
  data.listData = [];
  data.pagination.total = 0;
  let filterQuery = "\nObjectId\teq\t" + props.id;
  if (data.IsRead != "") {
    filterQuery += "\nIsRead\teq\t" + (data.IsRead == "1" ? true : false);
  }
  // if(data.StatusCode){
  //     filterQuery+='\nStatusCode\teq\t'+data.StatusCode;
  // }
  // if(data.CheckinStatus){
  //     filterQuery+='\nCheckinStatus\teq\t'+data.CheckinStatus;
  // }

  if (data.BusinessUnitName) {
    filterQuery += "\nBusinessUnitName\tcontains\t" + data.BusinessUnitName;
  }
  if (data.Checkin1) {
    filterQuery += "\nReadOn\tge\t" + data.Checkin1;
  }
  if (data.Checkin2) {
    filterQuery += "\nReadOn\tle\t" + data.Checkin2;
  }
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: data.objectTypeCode,
      entityName: data.sObjectName,
      filterQuery: filterQuery,
      search: data.searchVal || "",
      page: data.pagination.current,
      rows: data.pagination.pageSize,
      sort: "ReadOn",
      order: "desc",
      displayColumns: "BusinessUnitName,ReaderId,IsRead,ReadOn,IPAddr",
    })
    .then((res) => {
      var list = [];
      data.total = res.pageInfo ? res.pageInfo.total : 0;
      data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
      if (data.IsRead != "") {
        if (data.IsRead == "1") {
          //data.ReadedQty = data.total;
        } else {
          //data.unReadQty = data.total;
        }
      } else {
        //data.AllQty = data.total;
      }
      //console.log(pagination)
      if (res && res.nodes) {
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField") {
              item[cell] = girdFormatterValue(cell, item);
            }
            if (cell == "ReadOn") {
              item[cell] = item[cell]
                ? dayjs(item[cell].split(".")[0]).format("YYYY-MM-DD HH:mm")
                : "";
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
  data.BusinessUnitName = "";
  data.StatusCode = null;
  data.CheckinStatus = null;
  data.Checkin = null;
  data.IsLate = null;
  getQuery();
};
const changeRangeDate = (e) => {
  //console.log("e",e,item);
  if (e && e.length) {
    data.Checkin = e.join(",");
    data.Checkin1 = e[0];
    data.Checkin2 = e[1];
  } else {
    data.Checkin = "";
  }
};
const ChangeStatus = (e) => {
  data.IsRead = e;
  getQuery();
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

// 添加可查看人员
const AddPeople = () => {
  //data.isRadioUser = true;
  data.RoleCode = 0;
  data.isMultipleUser = true;
};
//多选
const handleSelectUsers = (params) => {
  console.log("多选用户:", params);
  let addUsers = params.map((item) => {
    return item;
  });
  addUsers.forEach((item) => {
    getUserData(item);
  });
  data.isMultipleUser = false;
};
const refreshPeople = (e) => {
  getQuery();
  emit("load", "");
};
const closeUser = (e) => {
  data.isRadioUser = false;
};
// 添加
const getUserData = (params) => {
  // console.log("params:", params);
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
            apiName: data.sObjectName,
            objTypeCode: data.objectTypeCode,
            fields: {
              ObjectId: props.id,
              RegardingObjectIdName: props.RegardingObjectIdName,
              ReaderId: params.id,
              Name: params.name,
              BusinessUnitName: params.businessUnitIdName,
              ObjectTypeCode: "100201",
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
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state == "SUCCESS"
    ) {
      message.success("添加成功！");
      refreshPeople();
    } else {
      if (res && res.actions && res.actions[0]) {
        if (res.actions[0].errorMessage) {
          message.error(res.actions[0].errorMessage);
        } else if (res.actions[0].error && res.actions[0].error[0]) {
          message.error(res.actions[0].error[0]);
        } else {
          message.error("添加失败！");
        }
      } else {
        message.error("添加失败！");
      }
    }
  });
};
const cancelDeptModal = (params) => {
  data.isRadioDept = params;
};
const handleDeptParams = (params) => {
  console.log("deptData", params);
};

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
          apiName: "Content",
          objTypeCode: 100201,
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
      data.AllQty = record.TotalNumPeople ? record.TotalNumPeople.value : 0;
      data.ReadedQty = record.ReadCount ? record.ReadCount.value : 0;
      data.unReadQty = record.UnreadCount ? record.UnreadCount.value : 0;
    }
  });
};
const onExport = () => {
  let entityName = data.sObjectName;
  let displayColumns = "BusinessUnitName,ReaderId,IsRead,ReadOn,IPAddr";
  let sortExpression = [
    {
      label: "",
      name: "ReadOn",
      sort: "DESC",
    },
  ];
  let conditionExpression = [
    {
      column: "ObjectId",
      operands: ["A76FDE3A-41BD-4BBE-A67D-7A292DA31274"],
      operator: "eq",
      _conditionOperator: "Equal",
    },
  ];
  let fileName = "";
  if (data.IsRead == "") {
    fileName = "全部记录";
  } else if (data.IsRead == "0") {
    fileName = "未读记录";
  } else if (data.IsRead == "1") {
    fileName = "已读记录";
  }
  commonExport(
    entityName,
    displayColumns,
    sortExpression,
    conditionExpression,
    fileName
  );
};
const changeHeight = () => {
  let h = document.documentElement.clientHeight;
  data.tableHeight = h - 470;
  data.height = h - 235;
  if (props.type == "modal") {
    data.tableHeight = h - 620;
    data.height = h - 385;
  }
};
defineExpose({ getQuery, PersonnelLst });
onMounted(() => {
  changeHeight();
  window.addEventListener("resize", (e) => {
    changeHeight();
  });
  getDetail();
  getQuery();
});
</script>
<style lang="less">
.ReadRecordWrap2 {
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
  width: 350px !important;
  border-radius: 4px;
}

.ReadRecordWrap2 {
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

.ReadRecordWrap2 .panelt {
  background: #f0f2f6 !important;
  margin-bottom: 5px !important;
  padding: 0 !important;
}

.ReadRecordWrap2 .panel-top {
  background: #f0f2f6 !important;
  padding-bottom: 12px;
}

.ReadRecordWrap2 .panel-top .ant-card {
  border-radius: 4px !important;
  cursor: pointer;
  margin-top: 4px;
}

.ReadRecordWrap2 .ant-card:first-child {
  margin-left: 4px !important;
}

.ReadRecordWrap2 .ant-card:last-child {
  margin-right: 0 !important;
}

.ReadRecordWrap2 .panel-top .ant-card.active,
.ReadRecordWrap2 .panel-top .ant-card:hover {
  box-shadow: 1px 2px 6px 0 rgb(0 0 0 / 40%) !important;
  //border: 1px solid #bbb !important;
  //background: #1677ff !important;
  // *{
  //   color: #fff !important;
  // }
}

.ReadRecordWrap2 .pageWrap {
  text-align: right;
  padding: 15px;
}

.ReadRecordWrap2 .iconBox .moreaction {
  padding: 0px 1px;
  width: 18px;
  border: 1px solid #dedede;
  border-radius: 4px;
  position: relative;
  top: 1px;
}

.ReadRecordWrap2 .iconBox .popup {
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

.ReadRecordWrap2 {
  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-nested-loading .ant-spin-container,
  .ant-table-wrapper .ant-table,
  .ant-table-wrapper .ant-table-container {
    height: 100% !important;
  }
}

.ReadRecordWrap2 .panel-bd2 {
  height: calc(~"100% - 165px") !important;
}

.ReadRecordWrap2 .ant-table-body {
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

.ReadRecordWrap2 .panel-top .statistics-right {
  float: left !important;
  position: relative;
  left: 8px;
}

.ReadRecordWrap2 .panel-top .statistics-left {
  float: right !important;
  width: calc(~"100% - 80px") !important;
}

.ReadRecordWrap2 .panel-top .statistics-name {
  font-size: 12px;
  position: relative;
  top: 30px;
}

.ReadRecordWrap2 .panel-top .statistics-count {
  font-weight: 700;
  font-size: 26px;
  color: #555;
  position: relative;
  top: -25px;
}
</style>
