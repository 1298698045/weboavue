<template>
  <div class="MeetingResolutionWrap" ref="TopicsLst">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-head">
        <div class="panel-title">会议决议</div>
        <div class="panel-btn">
          <a-button class="ml10" type="primary" @click="handleNew"
            >批量新建</a-button
          >
          <a-button class="ml10" type="primary" @click="handlePoll"
            >生成投票</a-button
          >
        </div>
      </div>
      <div class="panel-bd panel-bd1">
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
            <template v-if="column.key === 'Votes'">
              <div
                class="vote-shur-btn"
                @click="meetingPoll(record.VoteId, '', '')"
                v-show="record.HasVote"
              >
                <span title="点击取消表决" class="iconfont"
                  ><LikeOutlined style="color: #f53f3f" /><span
                    class="votesnum"
                    >{{ record.Votes || "0" }}</span
                  ></span
                >
              </div>
              <div
                class="vote-shur-btn"
                @click="meetingPoll('', record.ValueId, record.OwningUser)"
                v-show="!record.HasVote"
              >
                <span title="点击表决" class="iconfont"
                  ><LikeOutlined /><span class="votesnum">{{
                    record.Votes || "0"
                  }}</span></span
                >
              </div>
            </template>
            <template v-if="column.key === 'Action'">
              <div class="iconBox">
                <div class="popup">
                  <!-- <div class="option-item" @click="handleView(record.id)" :num="index">查看</div> -->
                  <div
                    class="option-item"
                    @click="handleEdit(record.id)"
                    :num="index"
                  >
                    编辑
                  </div>
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
              <!-- <a-button type="text" size="small" @click="handleView(record.id)" :num="index">查看</a-button> -->
              <!-- <a-button type="text" size="small" @click="handleEdit(record.id)" :num="index">编辑</a-button>
                <a-button type="text" size="small" @click="handleDelete(record.id)" :num="index">删除</a-button> -->
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
      @ok="onSearch"
    ></radio-user>
    <radio-dept
      v-if="isRadioDept"
      :isShow="isRadioDept"
      @selectVal="handleDeptParams"
      @cancel="cancelDeptModal"
      @ok="onSearch"
    ></radio-dept>
    <common-form-modal
      :isShow="isCommon"
      v-if="isCommon"
      @cancel="handleCommonCancel"
      :title="recordId ? '编辑' : '新建'"
      @success="onSearch"
      :id="recordId"
      :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName"
      :relatedObjectAttributeName="relatedObjectAttributeName"
      :relatedObjectAttributeValue="relatedObjectAttributeValue"
    ></common-form-modal>
    <Delete
      :isShow="isDelete"
      v-if="isDelete"
      :desc="deleteDesc"
      @cancel="cancelDelete"
      @ok="onSearch"
      :sObjectName="sObjectName"
      :recordId="recordId"
      :objTypeCode="objectTypeCode"
      :external="external"
    />
    <ReleasePoll
      v-if="isPoll"
      :isShow="isPoll"
      :id="props.id"
      @load="onSearch"
      @cancel="isPoll = false"
      :listData="listData"
      :Name="MeetingName"
    />
    <BatchNewResolution
      v-if="isBatchNew"
      :isShow="isBatchNew"
      :id="props.id"
      @load="onSearch"
      @cancel="isBatchNew = false"
      :Name="MeetingName"
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
  LikeOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import RadioDept from "@/components/commonModal/RadioDept.vue";
import Delete from "@/components/listView/Delete.vue";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import ReleasePoll from "@/components/meeting/ReleasePoll.vue";
import BatchNewResolution from "@/components/meeting/BatchNewResolution.vue";
const { proxy } = getCurrentInstance();
const TopicsLst = ref();
var columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: "标题",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "内容",
    dataIndex: "Description",
    key: "Description",
  },
  {
    title: "票数",
    dataIndex: "Votes",
    key: "Votes",
    width: 200,
  },
  {
    title: "创建时间",
    dataIndex: "CreatedOn",
    key: "CreatedOn",
    width: 200,
  },
  {
    title: "操作",
    key: "Action",
    width: 120,
  },
];
const props = defineProps({
  id: String,
  type: String,
});

const emit = defineEmits(["load"]);

const data = reactive({
  list: [],
  selectedRowKeys: [],
  loading: false,
  listData: [],
  searchVal: "",
  OwningBusinessUnitName: "",
  isRadioUser: false,
  isRadioDept: false,
  isCommon: false,
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
  objectTypeCode: "5008",
  sObjectName: "MeetingResolution",
  isDelete: false,
  deleteDesc: "确定要删除吗？",
  external: false,
  CheckinStatus: null,
  StatusCode: null,
  Checkin: null,
  Checkin1: null,
  Checkin2: null,
  height: 100,
  isPoll: false,
  relatedObjectAttributeName: "",
  relatedObjectAttributeValue: { ID: "", Name: "" },
  MeetingName: "",
  isBatchNew: false,
});
const columnList = toRaw(columns);
const {
  isBatchNew,
  MeetingName,
  relatedObjectAttributeName,
  relatedObjectAttributeValue,
  isPoll,
  listData,
  height,
  searchVal,
  OwningBusinessUnitName,
  pagination,
  tableHeight,
  recordId,
  objectTypeCode,
  sObjectName,
  isDelete,
  isCommon,
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
  if (data.Checkin1) {
    filterCondition.push({
      attribute: "Checkin",
      column: "Checkin",
      label: "",
      operator: "ge",
      logical: "AND",
      picklistValues: [],
      isEditable: false,
      operands: [data.Checkin],
    });
  }
  if (data.Checkin2) {
    filterCondition.push({
      attribute: "Checkin",
      column: "Checkin",
      label: "",
      operator: "le",
      logical: "AND",
      picklistValues: [],
      isEditable: false,
      operands: [data.Checkin],
    });
  }
  let d = {
    filterId: "",
    objectTypeCode: data.objectTypeCode,
    entityName: data.sObjectName,
    search: data.searchVal || "",
    page: data.pagination.current,
    rows: data.pagination.pageSize,
    sort: "CreatedOn",
    order: "asc",
    displayColumns: "Name,Description,Votes,CreatedOn",
  };
  if (filterCondition && filterCondition.length) {
    d.filterCondition = JSON.stringify(filterCondition);
  }
  proxy.$post(Interface.list2, d).then((res) => {
    var list = [];
    data.total = res.pageInfo ? res.pageInfo.total : 0;
    data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
    //console.log(pagination)
    for (var i = 0; i < res.nodes.length; i++) {
      var item = res.nodes[i];
      for (var cell in item) {
        if (cell != "id" && cell != "nameField") {
          item[cell] = girdFormatterValue(cell, item);
        }
      }
      list.push(item);
    }
    data.listData = list;
  });
};
const onSearch = (e) => {
  getQuery();
};
const onClear = (e) => {
  data.searchVal = "";
  data.StatusCode = null;
  data.CheckinStatus = null;
  data.Checkin = null;
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
const AddNew = () => {
  data.isRadioUser = true;
  data.RoleCode = 0;
};
// 添加管理员
const AddAdmin = () => {
  data.RoleCode = 2;
  data.isRadioUser = true;
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
            apiName: data.sObjectName,
            objTypeCode: data.objectTypeCode,
            fields: {
              MeetingId: props.id,
              InviteeId: params.id,
              Name: params.name,
              StatusCode: 1,
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
      onSearch();
    }
  });
};
const cancelDeptModal = (params) => {
  data.isRadioDept = params;
};
const handleDeptParams = (params) => {
  console.log("deptData", params);
};

defineExpose({ getQuery, TopicsLst });
//删除
const handleDelete = (key) => {
  data.recordId = key;
  data.isDelete = true;
};
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
};
//新建
const handleNew = (e) => {
  data.recordId = "";
  //data.isCommon = true;
  data.isBatchNew = true;
};
//编辑
const handleEdit = (key) => {
  data.recordId = key;
  data.isCommon = true;
};
// 通用弹窗关闭
const handleCommonCancel = (params) => {
  data.isCommon = false;
};
//查看
const handleView = (id) => {
  window.open("/#/lightning/r/Workflow/instance/detail?id=" + id + "&reurl=");
};
//表决/取消表决
const meetingPoll = (VoteId, ValueId, OwningUser) => {
  // if (VoteId) {
  //     var d = {
  //         objTypeCode: 5009,
  //         id: VoteId
  //     }
  //     var that = this;
  //     ajaxMethodPostData('entity.delete', d, function (data) {
  //         if (data) {
  //             if (data.status == 1) {
  //                 success2('取消成功');
  //                 freshdata(5008);
  //             }
  //             else {
  //                 error('取消失败');
  //             }
  //         }
  //     })
  // }
  // else {
  //     var d = {
  //         CreatedBy: { Id: OwningUser },
  //         MeetingResolutionId: { Id: ValueId }
  //     }
  //     var messages = {
  //         params: {
  //             recordRep: {
  //                 objTypeCode: 5009,
  //                 fields: d
  //             }
  //         }
  //     }
  //     messages = JSON.stringify(messages)
  //     var data = { message: messages };
  //     ajaxMethodPostData('entity.saverecord', data, function (data) {
  //         if (data) {
  //             if (data.status == 1) {
  //                 success2('表决成功');
  //                 freshdata(5008);
  //             }
  //             else {
  //                 error('表决失败');
  //             }
  //         }
  //     })
  // }
};
//发布投票
const handlePoll = () => {
  data.isPoll = true;
};
//获取会议详情
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
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.fields
    ) {
      let fields = res.actions[0].returnValue.fields;
      data.MeetingName =
        fields.Name && fields.Name.value ? fields.Name.value : "";
      data.relatedObjectAttributeName = "MeetingId";
      data.relatedObjectAttributeValue = {
        value: props.id || "",
        name: data.MeetingName,
      };
    }
  });
};
onMounted(() => {
  getDetail();
  let h = document.documentElement.clientHeight;
  data.tableHeight = h - 310;
  data.height = h - 120;
  if (props.type == "modal") {
    data.tableHeight = h - 470;
    data.height = h - 285;
  }
  window.addEventListener("resize", (e) => {
    let h = document.documentElement.clientHeight;
    data.tableHeight = h - 310;
    data.height = h - 120;
    if (props.type == "modal") {
      data.tableHeight = h - 470;
      data.height = h - 285;
    }
  });
});
</script>
<style lang="less">
.MeetingResolutionWrap {
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
.MeetingResolutionWrap {
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
        font-size: 40px;
        position: relative;
        top: 10px;
        color: #108def;
      }
    }
    .layui-icon.wancheng {
      font-size: 45px !important;
      margin-top: 12px;
      color: #108def;
    }
  }
  .vote-shur-btn {
    height: 27px;
  }
  .vote-shur-btn .anticon {
    display: inline-block;
    height: 28px;
    line-height: 28px;
    width: 80px;
    border: 1px solid #ddd;
    border-radius: 16px;
    margin-top: 0px;
    background-color: white;
    color: #1d2129;
    text-align: center;
    position: relative;
    left: -6px;
    cursor: pointer;
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon-zan2,
  .icon-zan1 {
    margin-right: 6px;
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
  background-color: rgb(250, 250, 250) !important; /* 奇数行背景色 */
}
body .ant-table-tbody tr:nth-child(even) {
  background-color: #fff !important; /* 偶数行背景色 */
}
.MeetingResolutionWrap .panelt {
  background: #f0f2f6 !important;
  margin-bottom: 5px !important;
  padding: 0 !important;
}
.MeetingResolutionWrap .panel-top {
  background: #f0f2f6 !important;
  padding-bottom: 12px;
}
.MeetingResolutionWrap .panel-top .ant-card {
  border-radius: 4px !important;
}
.MeetingResolutionWrap .ant-card:first-child {
  margin-left: 0 !important;
}
.MeetingResolutionWrap .ant-card:last-child {
  margin-right: 0 !important;
}
.MeetingResolutionWrap .pageWrap {
  text-align: right;
  padding: 15px;
}
.MeetingResolutionWrap .votesnum {
  position: relative;
  left: -40px;
}
.MeetingResolutionWrap .anticon svg {
  position: relative;
  left: -10px;
}
.MeetingResolutionWrap .iconBox .moreaction {
  padding: 0px 1px;
  width: 18px;
  border: 1px solid #dedede;
  border-radius: 4px;
  position: relative;
  top: 1px;
}
.MeetingResolutionWrap .iconBox .popup {
  top: 25px;
  right: 0;
  width: max-content;
  min-width: 88px;
}
.MeetingResolutionWrap {
  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-nested-loading .ant-spin-container,
  .ant-table-wrapper .ant-table,
  .ant-table-wrapper .ant-table-container {
    height: 100% !important;
  }
}
.MeetingResolutionWrap .panel-bd1 {
  height: calc(~"100% - 115px") !important;
}
.MeetingResolutionWrap .ant-table-body {
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
    background: #1677ff;
    a {
      color: #fff;
    }
  }
}
</style>
