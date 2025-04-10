<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="1000px"
      style="top: 30px"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>设置合同计划</div>
      </template>
      <div class="modalContainer ContractPlanWrap">
        <div class="modalCenter" :style="{ height: height + 'px' }">
          <div class="top-info">
            <span class="top-info-item"
              >合同名称：02 合同会签单 测试一组 OA管理员2023-08-09</span
            >
            <span class="top-info-item">合同编号：20238210</span>
            <span class="top-info-item">总金额：10000</span>
          </div>
          <div class="rightbtn">
            <a-button type="primary" @click="handleAdd" :icon="h(PlusOutlined)"
              >新增阶段</a-button
            >
          </div>
          <div class="table-content">
            <a-table
              :columns="columns"
              :pagination="false"
              :data-source="listData"
              bordered
              class="table-con"
              :scroll="{ y: height2 }"
            >
              <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                  <div>
                    {{ index + 1 }}
                  </div>
                </template>
                <template v-if="column.key === 'name'">
                  <div>
                    <a-select
                      v-model:value="record[column.key]"
                      placeholder="请选择阶段"
                    >
                      <a-select-option
                        v-for="(item, index) in namelist"
                        :value="item.value"
                        :key="index"
                        >{{ item.label }}</a-select-option
                      >
                    </a-select>
                  </div>
                </template>
                <template v-if="column.key === 'rate'">
                  <div>
                    <a-input
                      v-model:value="record[column.key]"
                      type="number"
                    ></a-input>
                  </div>
                </template>
                <template v-if="column.key === 'amount'">
                  <div>
                    <a-input
                      v-model:value="record[column.key]"
                      type="number"
                    ></a-input>
                  </div>
                </template>
                <template v-if="column.key === 'paidon'">
                  <div>
                    <a-date-picker
                      v-model:value="record[column.key]"
                      valueFormat="YYYY-MM-DD"
                      placeholder="请选择日期"
                    />
                  </div>
                </template>
                <template v-if="column.key === 'action'">
                  <div
                    title="删除"
                    class="deletebtn"
                    @click="handleDelete(index)"
                  >
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
                <a-table
                  :columns="columns"
                  :data-source="data1"
                  bordered
                  :showHeader="false"
                  :pagination="false"
                >
                </a-table>
              </template>
            </a-table>
          </div>
          <div class="bottom-info">
            <span class="bottom-info-item">付款方式：按进度</span>
            <span class="bottom-info-item">合同截止日期：2025-04-04</span>
            <span class="bottom-info-item">执行人：OA管理员</span>
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
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
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
  height2:"",
  id: "",
  listData: [],
  namelist: [
    {
      label: "首付款",
      value: "首付款",
    },
    {
      label: "中期执行款",
      value: "中期执行款",
    },
    {
      label: "验收款",
      value: "验收款",
    },
    {
      label: "尾款",
      value: "尾款",
    },
  ],
});
const { height, id, listData, namelist, height2 } = toRefs(data);
const formState = reactive({
  Name: "",
  IsPrivate: false,
  Body: "",
});
const handleAdd = () => {
  data.listData.push({
    key: "",
    name: "",
    rate: "",
    amount: "",
    paidon:""
  });
};
const handleDelete = (index) => {
  data.listData.splice(index, 1);
};
const getData = () => {
  return;
  let filterQuery = "\nParentId\teq\t" + props.id;
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "1002",
      entityName: "RelatedNote",
      filterQuery: filterQuery,
      search: "",
      page: 1,
      rows: 10,
      sort: "",
      order: "",
      displayColumns: "Name,Body,IsPrivate",
    })
    .then((res) => {
      var list = [];
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "nameField" && cell != "IsPrivate") {
            item[cell] = girdFormatterValue(cell, item);
          }
          if (cell == "IsPrivate") {
            item[cell] = item[cell].selected;
          }
        }
        list.push(item);
      }
      if (list.length) {
        data.id = list[0].id;
        formState.Name = list[0].Name;
        formState.IsPrivate = list[0].IsPrivate;
        formState.Body = list[0].Body;
      }
    });
};
const handleSubmit = () => {
  emit("cancel", false);
  return;
  formRef.value
    .validate()
    .then(() => {
      let url = Interface.create;
      let fields = JSON.parse(JSON.stringify(formState));
      fields.ParentId = props.id;
      let d = {
        actions: [
          {
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName: "RelatedNote",
                objTypeCode: 1002,
                fields: fields,
              },
            },
          },
        ],
      };
      if (data.id) {
        d.actions[0].params.recordId = data.id;
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
          emit("cancel", false);
          formRef.value.resetFields();
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
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    scopedSlots: { customRender: "index" },
    width: 65,
  },
  {
    title: "阶段名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "index" },
  },
  {
    title: "比例%",
    dataIndex: "rate",
    key: "rate",
    width: 100,
  },
  {
    title: "金额￥",
    dataIndex: "amount",
    key: "amount",
    ellipsis: true,
  },
  {
    title: "付款日期",
    dataIndex: "paidon",
    key: "paidon",
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
const data1 = [
  {
    key: "1",
    name: "合计",
    rate: "",
    amount: "",
    paidon:""
  },
];
onMounted(() => {
  data.listData = [
    {
      key: "1",
      name: "首付款",
      rate: 32,
    },
    {
      key: "2",
      name: "进度款",
      rate: 42,
    },
    {
      key: "3",
      name: "尾款",
      rate: 32,
    },
    {
      key: "1",
      name: "首付款",
      rate: 32,
    },
    {
      key: "2",
      name: "进度款",
      rate: 42,
    },
    {
      key: "3",
      name: "尾款",
      rate: 32,
    },
  ];
  data.height = document.documentElement.clientHeight - 180;
  data.height2=document.documentElement.clientHeight - 410;
  getData();
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 180;
    data.height2=document.documentElement.clientHeight - 410;
  });
});
</script>
<style lang="less">
@import url("@/style/modal.less");

.ContractPlanWrap {
  .table-content{
    padding: 16px; 
    background-color: #fff; 
    overflow:auto;
  }
  .ant-select{
    width:100%;
  }
  .ant-select-selector{
    border-radius: 0;
  }
  .ant-picker{
    border-radius: 0;
  }
  .ant-input{
    width:100%;
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
