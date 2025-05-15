<template>
  <div class="TopicsWrap">
    <div class="headerOption">
      <a-button
        class="ml10"
        :icon="h(PlusOutlined)"
        @click="handleAddRow"
        title="新增"
      ></a-button>
      <a-button
        class="ml10"
        :icon="h(DeleteOutlined)"
        @click="handleDelete"
        title="删除"
      ></a-button>
      <a-button
        class="ml10"
        :icon="h(CopyOutlined)"
        @click="handleCopyRow"
        title="复制"
      ></a-button>
      <a-button
        class="ml10"
        :icon="h(SaveOutlined)"
        @click="handleSave"
        title="保存"
      ></a-button>
    </div>
    <a-form :model="dataList" ref="formRef">
      <a-table
        :row-selection="rowSelection"
        :scroll="{ x: '1400px' | true }"
        :columns="columns"
        :data-source="dataList"
        :pagination="false"
      >
        <template #headerCell="{ column }">
          <div>
            <span class="requiredIcon" v-if="column.required">*</span
            >{{ column.title }}
          </div>
        </template>
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dType === 'N'">
            <div style="width: 50px">{{ index + 1 }}</div>
          </template>
          <template v-else-if="column.dType === 'S'">
            <a-form-item
              label=" "
              :name="column.key"
              :rules="
                column.required
                  ? [
                      {
                        required: column.required,
                        message: '请输入',
                        validator: (rule, value, callback) =>
                          customCheck(index, column.key, callback),
                      },
                    ]
                  : []
              "
            >
              <a-input
                v-model:value="dataList[index][column.dataIndex]"
                @change="(e) => handleInp(e, record, column, index)"
              ></a-input>
            </a-form-item>
          </template>
          <template v-else-if="column.dType === 'U' || column.dType === 'O'">
            <div class="searchItem">
              <a-form-item
                label=" "
                :name="column.key"
                :rules="
                  column.required
                    ? [
                        {
                          required: column.required,
                          message: '请选择',
                          validator: (rule, value, callback) =>
                            customCheck(index, column.key, callback),
                        },
                      ]
                    : []
                "
              >
                <a-select
                  allowClear
                  :default-active-first-option="false"
                  :filter-option="false"
                  showSearch
                  @search="
                    (e) => {
                      searchlookup(e, column, record, index);
                    }
                  "
                  @dropdownVisibleChange="
                    (e) => {
                      searchlookup('', column, record, index);
                    }
                  "
                  v-model:value="record[column.key]"
                >
                  <a-select-option
                    v-for="(option, optionIdx) in search[column.key]"
                    :key="optionIdx"
                    :value="option.ID"
                    >{{ option.Name }}</a-select-option
                  >
                </a-select>
                <div class="selectIcon">
                  <SearchOutlined
                    class="ant-select-suffix"
                    @click="handleOpenLook(column, record, index)"
                  />
                </div>
              </a-form-item>
            </div>
          </template>
          <template v-else-if="column.dType === 'D'">
            <a-form-item
              label=" "
              :name="column.key"
              :rules="
                column.required
                  ? [
                      {
                        required: column.required,
                        message: '请选择',
                        validator: (rule, value, callback) =>
                          customCheck(index, column.key, callback),
                      },
                    ]
                  : []
              "
            >
              <a-date-picker
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                v-model:value="dataList[index][column.dataIndex]"
                @change="(e) => handleDatePicker(e, record, column, index)"
              />
            </a-form-item>
          </template>
          <template
            v-else-if="
              column.dType === 'L' ||
              column.dType === 'LT' ||
              column.dType === 'DT'
            "
          >
            <a-form-item
              label=" "
              :name="column.key"
              :rules="
                column.required
                  ? [
                      {
                        required: column.required,
                        message: '请选择',
                        validator: (rule, value, callback) =>
                          customCheck(index, column.key, callback),
                      },
                    ]
                  : []
              "
            >
              <a-select v-model:value="record[column.key]">
                <a-select-option
                  :value="item.value"
                  v-for="(item, index) in selectPickers[column.key]"
                  :key="index"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </template>
          <template v-else-if="column.dType === 'F'">
            <a-form-item
              label=" "
              :name="column.key"
              :rules="
                column.required
                  ? [
                      {
                        required: column.required,
                        message: '请选择',
                        validator: (rule, value, callback) =>
                          customCheck(index, column.key, callback),
                      },
                    ]
                  : []
              "
            >
              <a-date-picker
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                v-model:value="dataList[index][column.dataIndex]"
                @change="(e) => handleTimePicker(e, record, column, index)"
              />
            </a-form-item>
          </template>
        </template>
      </a-table>
    </a-form>
    <radio-dept
      v-if="isRadioDept"
      :isShow="isRadioDept"
      @cancel="cancelDeptModal"
      @selectVal="handleDeptParams"
    />
    <radio-user
      v-if="isRadioUser"
      :isShow="isRadioUser"
      @cancel="cancelUserModal"
      @selectVal="handleUserParams"
      :localId="localId"
    ></radio-user>
  </div>
</template>
<script setup>
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
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
import calendar from "dayjs/plugin/calendar";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
import {
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
  CopyOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import RadioDept from "@/components/commonModal/RadioDept.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import { girdFormatterValue } from "@/utils/common.js";

import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const props = defineProps({
  isShow: Boolean,
  id: String,
});
const formRef = ref();
const customCheck = (index, name, callback) => {
  if (
    (data.dataList[index][name] == null || data.dataList[index][name] == "") &&
    data.dataList[index][name] + "" != "0"
  ) {
    callback(new Error("不能为空！"));
  } else {
    callback();
  }
};
const data = reactive({
  columns: [],
  dataList: [],

  selectPickers: {
    StatusCode: [
      {
        label: "草稿",
        value: "0",
      },
      {
        label: "审批中",
        value: "1",
      },
      {
        label: "审批通过",
        value: "2",
      },
    ],
  },
  search: {},
  isRadioDept: false,
  isRadioUser: false,
  localId: "",
  recordVal: {},
  selectedRows: [],
  userInfo: {},
});
const field = {};
const {
  columns,
  dataList,
  selectPickers,
  search,
  isRadioDept,
  isRadioUser,
  localId,
  recordVal,
  userInfo,
} = toRefs(data);
// S
const handleInp = (e, record, column, index) => {
  console.log("e", e, e.target.value, record, column);
  data.dataList[index][column.dataIndex] = e.target.value;
};
// D
const handleDatePicker = (e, record, column, index) => {
  data.dataList[index][column.dataIndex] = e;
};
// F 时间
const handleTimePicker = (e, record, column, index) => {
  console.log("e", e);
  data.dataList[index][column.dataIndex] = e;
};
const cancelDeptModal = (params) => {
  data.isRadioDept = params;
};
const cancelUserModal = (params) => {
  data.isRadioUser = params;
};
// 弹框选中部门
const handleDeptParams = (params) => {
  console.log("deptData", params);
};
// 弹框选用户
const handleUserParams = (params) => {
  console.log("userData", params);
  // console.log("赋值字段", data.localId);
  // data.isRadioUser = false;
  // formState[data.localId].Id = params.id;
  // var isEmpty = data.search[data.localId].some((item) => item.ID == params.id);
  // if (!isEmpty) {
  //     data.search[data.localId].push({
  //     ID: params.id,
  //     Name: params.name,
  //     });
  // }
  let { index, field } = data.recordVal;
  var isEmpty = data.search[field].some((item) => item.ID == params.id);
  if (!isEmpty) {
    data.search[field].push({
      ID: params.id,
      Name: params.name,
    });
  }
  data.dataList[index][field] = params.id;
  data.isRadioUser = false;
};
const getRelated = () => {
  data.columns = [];
  proxy.$get(Interface.meeting.relatedrecords, {}).then((res) => {
    console.log("res", res);
    let record = res.actions[0].returnValue;
    let listItems = record.listItems;
    let recordIds = record.recordIds;
    listItems.MeetingItem.map((item) => {
      if (item.field == "PlanedBy") {
        item.field = "ApplyBy";
        item.width = 180;
      }
      item.title = item.title;
      item.dataIndex = item.field;
      item.key = item.field;
      field[item.field] = "";
      if (item.dType == "U") {
        data.search[item.field] = [];
      }
      if (item.field == "Name" || item.field == "CreatedBy") {
        item.required = true;
      } else {
        item.required = false;
      }
      if (item.dType != "N" && item.field != "StatusCode") {
        data.columns.push(item);
      }
      return item;
    });
    //console.log(data.columns, 123)
  });
};

// 添加
const handleAddRow = () => {
  for (let key in field) {
    field[key] = "";
  }
  field.key = data.dataList.length + 1;
  const copyField = JSON.parse(JSON.stringify(field));
  copyField.CreatedBy = data.userInfo.userId;
  copyField.OwningBusinessUnit = data.userInfo.businessUnitId;
  data.dataList.push(copyField);
  data.search.CreatedBy = [
    {
      ID: data.userInfo.userId,
      Name: data.userInfo.userName,
    },
  ];
  data.search.OwningBusinessUnit = [
    {
      ID: data.userInfo.businessUnitId,
      Name: data.userInfo.businessUnitName,
    },
  ];
};
//获取数据
const getData = () => {
  let filterQuery = "\nMeetingId\teq\t" + props.id;
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "5001",
      entityName: "MeetingItem",
      filterQuery: filterQuery,
      search: "",
      page: 1,
      rows: 100,
      sort: "",
      order: "",
      displayColumns:
        "Name,SortNumber,CreatedBy,ApplyBy,OwningBusinessUnit,PlanedBy,ScheduledMeeting,StatusCode",
    })
    .then((res) => {
      var list = [];
      if (res && res.nodes) {
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField") {
              item[cell] = girdFormatterValue(cell, item);
            }
            if (cell == "CreatedOn" || cell == "ScheduledMeeting") {
              item[cell] = item[cell]
                ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm:ss")
                : null;
            }
          }
          item.key = item.id;
          list.push(item);
        }
      }
      data.dataList = list;
    });
};

// 删除
const handleDelete = () => {
  if (data.selectedRows && data.selectedRows.length) {
    for (var i = 0; i < data.selectedRows.length; i++) {
      handleDeleteRow(data.selectedRows[i]);
    }
  } else {
    message.error("请至少勾选一项");
  }
};
const handleDeleteRow = (item) => {
  if (item.id) {
    let obj = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordId: item.id,
            apiName: "MeetingItem",
            objTypeCode: 5001,
          },
        },
      ],
    };
    let d = {
      message: JSON.stringify(obj),
    };
    proxy.$post(Interface.delete, d).then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state == "SUCCESS"
      ) {
        message.success("删除成功");
        for (var i = 0; i < data.dataList.length; i++) {
          if (item.id == data.dataList[i].id) {
            data.dataList.splice(i, 1);
          }
        }
      } else {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].errorMessage
        ) {
          message.success(res.actions[0].errorMessage);
        } else {
          message.error("删除失败");
        }
      }
    });
  } else {
    for (var i = 0; i < data.dataList.length; i++) {
      if (item.key == data.dataList[i].key) {
        data.dataList.splice(i, 1);
      }
    }
  }
};
// 复制
const handleCopyRow = () => {
  if (data.dataList && data.dataList.length) {
    data.columns.forEach((item) => {
      if (item.dType == "D" || data.dataList[0][item.dataIndex]) {
        //console.log("data.dataList[0][item.dataIndex]", data.dataList[0][item.dataIndex]);
      }
    });
    //console.log("data.dataList[0]:", data.dataList[0]);
    let row = JSON.parse(JSON.stringify(data.dataList[0]));
    row.key = data.dataList.length + 1;
    data.dataList.push(row);
    //console.log("data", data.dataList)
  }
};
//保存
const handleSave = () => {
  if (data.dataList && data.dataList.length) {
    formRef.value
      .validate()
      .then(() => {
        for (var i = 0; i < data.dataList.length; i++) {
          handleSaveRow(data.dataList[i],i);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  } else {
    message.error("请新增至少一行数据");
  }
};
const handleSaveRow = (item,i) => {
  let url = Interface.create;
  let fields = {
    MeetingId: props.id,
    Name: item.Name,
    SortNumber: i+1,
    ApplyBy: item.ApplyBy,
    OwningBusinessUnit: item.OwningBusinessUnit,
    PlanedBy: item.PlanedBy,
    ScheduledMeeting: item.ScheduledMeeting,
    StatusCode: item.StatusCode||0,
  };
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: "MeetingItem",
            objTypeCode: 5001,
            fields: fields,
          },
        },
      },
    ],
  };
  if (item.id) {
    d.actions[0].params.recordId = item.id;
    url = Interface.edit;
  }
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state &&
      res.actions[0].state == "SUCCESS"
    ) {
      message.success("保存成功！");
    } else {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state &&
        res.actions[0].errorMessage
      ) {
        message.error(res.actions[0].errorMessage);
      } else {
        message.error("保存失败！");
      }
    }
  });
};
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    data.selectedRows = selectedRows;
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};
const uniqu = (array, name) => {
  var arr = [];
  for (var j = 0; j < array.length; j++) {
    if (JSON.stringify(arr).indexOf(array[j][name]) == -1) {
      arr.push(array[j]);
    }
  }
  return arr;
};
const searchlookup = (e, column, record, index) => {
  // proxy.$get(Interface.uilook, {
  //     Lktp: column.sobjectType,
  //     Lksrch: e,
  // }).then((res) => {
  //     let listData = res.listData;
  //     data.search[column.dataIndex] = listData;
  // });
  let obj = {
    actions: [
      {
        id: "6129;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: "Meeting",
          fieldApiName: column.dataIndex,
          pageParam: 1,
          pageSize: 25,
          q: e,
          searchType: "Recent",
          targetApiName: "SystemUser",
          body: {
            sourceRecord: {
              apiName: "Meeting",
              fields: {
                Id: null,
                RecordTypeId: "",
              },
            },
          },
        },
      },
    ],
  };
  if (column.sobjectType * 1 == 10) {
    obj.actions[0].params.targetApiName = "BusinessUnit";
  }
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.lookup, d).then((res) => {
    let list = res.actions[0].returnValue.lookupResults.records;
    let arr = [];
    list.forEach((item) => {
      arr.push({
        ID: item.fields.Id.value,
        Name: item.fields.Name.value,
      });
    });
    let result = arr.concat(data.search[column.dataIndex]);
    result = uniqu(result, "ID");
    data.search[column.dataIndex] = result;
  });
};
// 查询-弹窗
const handleOpenLook = (attribute, record, index) => {
  let localId = attribute.dataIndex;
  data.localId = localId;
  data.recordVal = {
    index: index,
    field: attribute.dataIndex,
  };
  let sObjectType = attribute.sobjectType;
  if (sObjectType == 30020) {
    data.isRadioUser = true;
  } else if (sObjectType == 10) {
    data.isRadioDept = true;
  } else {
    data.isRadioUser = true;
  }
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userInfo = {
      userId: userInfo.userId,
      userName: userInfo.fullName,
      businessUnitId: userInfo.businessUnitId,
      businessUnitName: window.localStorage.getItem("businessUnitName"),
    };
  }
  getRelated();
  getData();
});
</script>
<style lang="less" scoped>
.searchItem {
  position: relative;

  .selectIcon {
    position: absolute;
    right: 10px;
    top: 5px;
    z-index: 1;
    background: #fff;
  }
}

.headerOption {
  text-align: right;
  padding-bottom: 20px;
}
.TopicsWrap {
  :deep .ant-table-wrapper .ant-table-cell {
    padding: 6.5px 14px !important;
  }
  .requiredIcon {
    color: red;
    margin-right: 5px;
  }
  .ant-select-arrow {
    display: none;
  }
  :deep .ant-form-item-label {
    display: none !important;
  }
  :deep .ant-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
