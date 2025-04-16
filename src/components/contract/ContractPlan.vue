<template>
  <div>
    <a-modal v-model:open="props.isShow" width="1000px" style="top: 30px" :maskClosable="false" @cancel="handleCancel"
      @ok="handleSubmit">
      <template #title>
        <div>设置合同计划</div>
      </template>
      <div class="modalContainer ContractPlanWrap">
        <div class="modalCenter" :style="{ height: height + 'px' }">
          <div class="top-info">
            <span class="top-info-item">合同名称：{{ detail.Title }}</span>
            <span class="top-info-item">合同编号：{{ detail.ContractNumber }}</span>
            <span class="top-info-item">总金额：{{ detail.TotalPrice }}</span>
          </div>
          <div class="rightbtn">
            <a-button type="primary" @click="handleAdd" :icon="h(PlusOutlined)">新增阶段</a-button>
          </div>
          <div class="table-content">
            <a-form :model="data" ref="formRef">
              <a-table :columns="columns" :pagination="false" :data-source="data.listData" bordered class="table-con"
                :scroll="{ y: height2 }">
                <template #headerCell="{ column }">
                  <div>
                    <span class="requiredIcon">*</span>{{ column.title }}
                  </div>
                </template>
                <template #bodyCell="{ column, index, record }">
                  <template v-if="column.key === 'index'">
                    <div>
                      {{ index + 1 }}
                    </div>
                  </template>
                  <template v-if="column.key === 'Name'">
                    <div>
                      <a-form-item label=" " name="Name" :rules="[
                        {
                          required: true,
                          message: '请选择',
                          validator: (rule, value, callback) =>
                            customCheck(index, 'Name', callback),
                        },
                      ]">
                        <a-select v-model:value="record[column.key]" placeholder="请选择阶段">
                          <a-select-option v-for="(item, index) in Name" :value="item.label" :key="index">{{ item.label
                            }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </div>
                  </template>
                  <template v-if="column.key === 'Rate'">
                    <div>
                      <a-form-item label=" " name="Rate" :rules="[
                        {
                          required: true,
                          message: '请输入',
                          validator: (rule, value, callback) =>
                            customCheck(index, 'Rate', callback),
                        },
                      ]">
                        <a-input v-model:value="record[column.key]" type="number" @change="SumChange"></a-input>
                      </a-form-item>
                    </div>
                  </template>
                  <template v-if="column.key === 'Amount'">
                    <div>
                      <a-form-item label=" " name="Amount" :rules="[
                        {
                          required: true,
                          message: '请输入',
                          validator: (rule, value, callback) =>
                            customCheck(index, 'Amount', callback),
                        },
                      ]">
                        <a-input v-model:value="record[column.key]" type="number" @change="SumChange"></a-input>
                      </a-form-item>
                    </div>
                  </template>
                  <template v-if="column.key === 'PlanPayOn'">
                    <div>
                      <a-form-item label=" " name="PlanPayOn" :rules="[
                        {
                          required: true,
                          message: '请选择',
                          validator: (rule, value, callback) =>
                            customCheck(index, 'PlanPayOn', callback),
                        },
                      ]">
                        <a-date-picker v-model:value="record[column.key]" valueFormat="YYYY-MM-DD"
                          placeholder="请选择日期" />
                      </a-form-item>
                    </div>
                  </template>
                  <template v-if="column.key === 'action'">
                    <div title="删除" class="deletebtn" @click="handleDelete(index, record.id)">
                      <DeleteOutlined />
                    </div>
                  </template>
                  <!-- <template v-else>
                  <div>
                    {{ record[column.key] }}
                  </div>
                </template> -->
                </template>
                <template #footer>
                  <a-table :columns="columns" :data-source="data1" bordered :showHeader="false" :pagination="false">
                  </a-table>
                </template>
              </a-table>
            </a-form>
          </div>
          <div class="bottom-info">
            <span class="bottom-info-item">付款方式：{{ detail.PaymentMethod }}</span>
            <span class="bottom-info-item">合同截止日期：{{ detail.ExpiresOn }}</span>
            <span class="bottom-info-item">执行人：{{ detail.OwningUserName }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
        </div>
      </template>
    </a-modal>
    <DeleteModal :isShow="isDelete" v-if="isDelete" desc="是否确定要删除？" :recordId="recordId" :sObjectName="sObjectName"
      :objTypeCode="objectTypeCode" @cancel="isDelete = false" @ok="deleteOk" :external="false" />
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
  toRaw,
  h,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import DeleteModal from "@/components/listView/Delete.vue";
let store = useStore();
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { girdFormatterValue } from "@/utils/common.js";
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  id: String,
});
const formRef = ref();
const emit = defineEmits(["cancel"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  height: "",
  height2: "",
  id: "",
  listData: [],
  Name: [
    // {
    //   label: "首付款",
    //   value: "首付款",
    // },
    // {
    //   label: "中期执行款",
    //   value: "中期执行款",
    // },
    // {
    //   label: "验收款",
    //   value: "验收款",
    // },
    // {
    //   label: "尾款",
    //   value: "尾款",
    // },
  ],
  detail: {
    Title: "",
    ContractNumber: "",
    TotalPrice: "",
    PaymentMethod: "",
    ExpiresOn: "",
    OwningUser: "",
    OwningUserName: "",
  },
  recordId: "",
  sObjectName: "ContractPlan",
  objectTypeCode: "1012",
  isDelete: false,
  data1: [
    {
      id: "1",
      Name: "合计",
      Rate: "",
      Amount: "",
      PlanPayOn: "",
    }
  ]
});
const {
  data1,
  height,
  id,
  listData,
  Name,
  height2,
  detail,
  recordId,
  sObjectName,
  objectTypeCode,
  isDelete,
} = toRefs(data);
const formState = reactive({
  Name: "",
  IsPrivate: false,
  Body: "",
});
const handleAdd = () => {
  data.listData.push({
    id: "",
    Name: "",
    Rate: "",
    Amount: "",
    PlanPayOn: "",
  });
};
const handleDelete = (index, id) => {
  if (id) {
    data.recordId = id;
    data.isDelete = true;
  } else {
    data.listData.splice(index, 1);
  }
};
const deleteOk = () => {
  let index = data.listData.findIndex((row) => row.id == data.recordId);
  data.listData.splice(index, 1);
};
const getPickerList = () => {
  let d = {
    actions: [
      {
        id: "2320;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: "ContractPlan",
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
      data.Name = picklistFieldValues.Name
        ? picklistFieldValues.Name.values
        : [];
    }
  });
};
const getDetail = () => {
  let obj = {
    actions: [
      {
        id: "4270;a",
        descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: props.id,
          apiName: "Contract",
        },
      },
    ],
  };
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.detail, d).then((res) => {
    let fields = res.actions[0].returnValue.fields;
    data.detail = {
      Title: fields.Title ? fields.Title.value : "",
      ContractNumber: fields.ContractNumber ? fields.ContractNumber.value : "",
      TotalPrice: fields.TotalPrice ? fields.TotalPrice.value : "",
      PaymentMethod: fields.PaymentMethod ? fields.PaymentMethod.value : "",
      ExpiresOn:
        fields.ExpiresOn && fields.ExpiresOn.value
          ? dayjs(fields.ExpiresOn.value).format("YYYY-MM-DD")
          : "",
      OwningUser:
        fields.OwningUser && fields.OwningUser.value
          ? fields.OwningUser.value
          : "",
      OwningUserName:
        fields.OwningUser && fields.OwningUser.displayValue
          ? fields.OwningUser.displayValue
          : "",
    };
  });
};
const getData = () => {
  let filterQuery = "\nContractId\teq\t" + props.id;
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "1012",
      entityName: "ContractPlan",
      filterQuery: filterQuery,
      search: "",
      page: 1,
      rows: 100,
      sort: "CreatedOn",
      order: "asc",
      displayColumns: "Name,Rate,Amount,PlanPayOn",
    })
    .then((res) => {
      var list = [];
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "nameField") {
            item[cell] = girdFormatterValue(cell, item);
          }
          if (cell == "PlanPayOn") {
            item[cell] =
              item[cell] && item[cell]
                ? dayjs(item[cell]).format("YYYY-MM-DD")
                : "";
          }
        }
        list.push(item);
      }
      if (list.length) {
        data.listData = list;
      } else {
        data.listData = [
          {
            id: "",
            Name: "首付款",
            Rate: "",
            Amount: "",
            PlanPayOn: "",
          },
          {
            id: "",
            Name: "中期执行款",
            Rate: "",
            Amount: "",
            PlanPayOn: "",
          },
          {
            id: "",
            Name: "验收款",
            Rate: "",
            Amount: "",
            PlanPayOn: "",
          },
          {
            id: "",
            Name: "尾款",
            Rate: "",
            Amount: "",
            PlanPayOn: "",
          },
        ];
      }
    });
};
const SumChange = () => {
  let totalAmount = 0;
  let rate = 0;
  if (data.listData && data.listData.length) {
    for (var i = 0; i < data.listData.length; i++) {
      let item = {
        recordId: "",
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: "ContractPlan",
          objTypeCode: 1012,
          fields: {
            Name: data.listData[i].Name,
            Rate: data.listData[i].Rate + "",
            Amount: data.listData[i].Amount * 1,
            PlanPayOn: data.listData[i].PlanPayOn,
            ContractId: props.id,
            OwningUser: data.detail.OwningUser,
          },
        },
      };
      if (data.listData[i].id) {
        item.recordId = data.listData[i].id;
      }
      totalAmount += data.listData[i].Amount * 1;
      rate += data.listData[i].Rate * 1;
    }

  }
  rate=rate.toFixed(2);
  totalAmount=totalAmount.toFixed(2);
  if (totalAmount * 1 > data.detail.TotalPrice * 1) {
    message.error("金额总和不能大于合同总金额！");
    totalAmount = 0;
  }
  if (rate * 1 > 100) {
    message.error("比例总和不能大于100！");
    rate = 0;
  }
  data.data1 = [
    {
      id: "1",
      Name: "合计",
      Rate: rate || '',
      Amount: totalAmount || '',
      PlanPayOn: "",
    }
  ];

}
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      let url = Interface.saveBatchRecord;
      let records = [];
      let totalAmount = 0;
      let rate = 0;
      if (data.listData && data.listData.length) {
        for (var i = 0; i < data.listData.length; i++) {
          let item = {
            recordId: "",
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: "ContractPlan",
              objTypeCode: 1012,
              fields: {
                Name: data.listData[i].Name,
                Rate: data.listData[i].Rate + "",
                Amount: data.listData[i].Amount * 1,
                PlanPayOn: data.listData[i].PlanPayOn,
                ContractId: props.id,
                OwningUser: data.detail.OwningUser,
              },
            },
          };
          if (data.listData[i].id) {
            item.recordId = data.listData[i].id;
          }
          totalAmount += data.listData[i].Amount * 1;
          rate += data.listData[i].Rate * 1;
          records.push(item);
        }

      } else {
        message.error("请至少添加一行数据！");
        return false;
      }
      if (totalAmount * 1 > data.detail.TotalPrice * 1) {
        message.error("金额总和不能大于合同总金额！");
        return false;
      }
      if (rate * 1 > 100) {
        message.error("比例总和不能大于100！");
        return false;
      }
      let d = {
        actions: [
          {
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            records: records,
          },
        ],
      };
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
          emit("cancel", false);
        } else {
          if (
            res &&
            res.actions &&
            res.actions[0] &&
            res.actions[0].errorMessage
          ) {
            message.error(res.actions[0].errorMessage);
          } else {
            message.error("保存失败！");
          }
        }
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const customCheck = (index, name, callback) => {
  if (
    (data.listData[index][name] == null || data.listData[index][name] == "") &&
    data.listData[index][name] + "" != "0"
  ) {
    callback(new Error("不能为空！"));
  } else {
    callback();
  }
};
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    scopedSlots: { customRender: "index" },
    width: 75,
    align: "center",
  },
  {
    title: "阶段名称",
    dataIndex: "Name",
    key: "Name",
    scopedSlots: { customRender: "index" },
  },
  {
    title: "比例%",
    dataIndex: "Rate",
    key: "Rate",
    width: 100,
  },
  {
    title: "金额￥",
    dataIndex: "Amount",
    key: "Amount",
    ellipsis: true,
  },
  {
    title: "付款日期",
    dataIndex: "PlanPayOn",
    key: "PlanPayOn",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    ellipsis: true,
    width: 70,
  },
];
onMounted(() => {
  data.height = document.documentElement.clientHeight - 180;
  data.height2 = document.documentElement.clientHeight - 410;
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 180;
    data.height2 = document.documentElement.clientHeight - 410;
  });
  getPickerList();
  getDetail();
  getData();
});
</script>
<style lang="less">
@import url("@/style/modal.less");

.ContractPlanWrap {
  .table-content {
    padding: 16px;
    background-color: #fff;
    overflow: auto;
  }

  .requiredIcon {
    color: red;
    margin-right: 3px;
  }

  .ant-form-item-label {
    display: none !important;
  }

  .ant-select {
    width: 100%;
  }

  .ant-select-selector {
    border-radius: 0;
  }

  .ant-picker {
    border-radius: 0;
  }

  .ant-input {
    width: 100%;
  }

  .top-info {
    font-size: 14px;
    color: #666;
    margin-left: 20px;

    .top-info-item {
      margin-right: 40px;
    }
  }

  .bottom-info {
    font-size: 14px;
    color: #666;
    margin-left: 20px;
    margin-top: 20px;

    .bottom-info-item {
      margin-right: 40px;
    }
  }

  .deletebtn {
    cursor: pointer;
  }

  .rightbtn {
    text-align: right;
    padding-right: 15px;
  }

  .table-con {
    .ant-table-footer {
      padding: 0 !important;
      border: 0 !important;
      margin-top: -1px;
    }
  }

  .ant-table-tbody tr:nth-child(2n + 1) {
    background-color: #fff !important;
  }

  .ant-table-tbody tr:nth-child(2n) {
    background-color: #fafafa !important;
  }

  .ant-table-footer tr:nth-child(2n + 1) {
    background-color: #f7fbfe !important;
  }

  .section {
    .sectionTitle {
      height: 30px;
      background-color: rgb(243, 242, 242);
      line-height: 30px;
      border-radius: 4px;
      padding-left: 15px;
      margin-bottom: 12px;
      /* margin: 2rem 2rem 0.5rem 2rem; */
    }

    .sectionRow {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      padding-top: 5px;

      .sectionItem {
        flex: 1;
        margin-right: 20px;

        .ant-row {
          display: flex !important;
        }
      }

      .sectionItem:last-child {
        margin-right: 0;
      }

      .switchItem {
        position: relative;
        top: -1px;
      }

      .ant-form-item-control {
        justify-content: flex-start !important;
      }
    }

    .NotRequired {
      padding-left: 21px;
    }
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-picker {
    width: 100%;
  }

  .ant-form-item {
    position: relative;
  }

  .selectIcon {
    position: absolute;
    right: 10px;
    top: 5px;
  }
}

input[aria-hidden="true"] {
  display: none !important;
}
</style>
