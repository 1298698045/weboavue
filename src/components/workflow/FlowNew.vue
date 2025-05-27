<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="550px"
      :style="setTop"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>新建流程事务</div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" style="height: 421px !important">
          <a-form ref="formRef" class="CreateProcess" :model="formState">
            <div class="form-tip">请输入流程事务标题，建立事务</div>
            <a-form-item label="流程：" name="ProcessName">
              <div class="ProcessName">{{ formState.ProcessName || "" }}</div>
            </a-form-item>
            <a-form-item
              name="BusinessUnitId"
              label="创建身份："
              :rules="[{ required: true, message: '请选择发起部门' }]"
            >
              <a-select v-model:value="formState.BusinessUnitId">
                <a-select-option
                  v-for="(item, index) in formState.BusinessUnitList"
                  :key="index"
                  :value="item.BusinessUnitId"
                  >{{ item.organizationIdName }}/{{
                    item.businessUnitIdName
                  }}</a-select-option
                >
              </a-select>
            </a-form-item>
            <a-form-item
              class="processTitle"
              label="标题："
              name="Title"
              :rules="[{ required: true, message: '标题不能为空' }]"
            >
              <a-input v-model:value="formState.Title" />
              <div class="form-tip1">
                默认标题是 流程名称 部门名称，为了查询方便，请输入流程真实标题。
              </div>
              <div class="form-tip1">如收文 关于XX来文 XX科室 XX人。</div>
            </a-form-item>
            <a-form-item name="Priority" label="紧急程度：">
              <a-select v-model:value="formState.Priority">
                <a-select-option value="0">普通</a-select-option>
                <a-select-option value="1">紧急</a-select-option>
                <a-select-option value="2">加急</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="备注：" name="Description">
              <a-textarea :rows="3" v-model:value="formState.Description" />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
          <a-button @click="handleCancel">取消</a-button>
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
  nextTick,
  computed,
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  DownloadOutlined,
  ZoomInOutlined,
  UserOutlined,
  InboxOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import dayjs from "dayjs";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const props = defineProps({
  isShow: Boolean,
  name: String,
  row: Object,
});
const formRef = ref();
const emit = defineEmits(["cancel", "ok"]);
const handleCancel = () => {
  emit("cancel", false);
};
const formState = reactive({
  ProcessName: "",
  BusinessUnitId: "",
  Title: "",
  Priority: "0",
  Description: "",
  BusinessUnitList: [],
});
const token = localStorage.getItem("token");
const data = reactive({
  height: 150,
  row: {},
  userId: "",
});
const { height, row, userId } = toRefs(data);
const getData = () => {
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
    formState.StateCode = fields.StateCode ? fields.StateCode.value : "";
  });
};
const getPickerList = () => {
  let d = {
    actions: [
      {
        id: "2320;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: "Contract",
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
      data.StateCodeList = picklistFieldValues.StateCode
        ? picklistFieldValues.StateCode.values
        : [];
    }
  });
};
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      //console.log('values', formState, toRaw(formState));
      let obj = {
        actions: [
          {
            id: "4270;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              processId: data.rowRecord.processId,
              priority: formState.Priority,
              name: formState.Title,
              businessUnitId: formState.BusinessUnitId,
              description: formState.Description,
            },
          },
        ],
      };
      let d = {
        message: JSON.stringify(obj),
      };
      proxy.$post(Interface.workflow.new, d).then((res) => {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].state == "SUCCESS"
        ) {
          message.success("发起流程成功");
          let url = router.resolve({
            name: "FlowDetail",
            query: {
              id: res.actions[0].returnValue.id,
              reurl: "/lightning/o/workflow/doing",
            },
          });
          window.open(url.href);
          handleCancel();
        } else {
          if (
            res &&
            res.actions &&
            res.actions[0] &&
            res.actions[0].errorMessage
          ) {
            message.success(res.actions[0].errorMessage);
          } else {
            message.error("发起流程失败");
          }
        }
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const setTop = computed(() => ({
  top: `calc(50% - 290px)`,
}));
const getDeptList = () => {
  const now = new Date();
  const nowtime =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    formState.BusinessUnitId = userInfo.businessUnitId;
    data.userId = userInfo.userId;
  }
  proxy.$post(Interface.user.getBusinessUnits, {}).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.length
    ) {
      formState.BusinessUnitList = res.actions[0].returnValue;
      for (var i = 0; i < formState.BusinessUnitList.length; i++) {
        if (
          formState.BusinessUnitList[i].BusinessUnitId ==
          formState.BusinessUnitId
        ) {
          formState.Title =
            data.rowRecord.name +
            " " +
            formState.BusinessUnitList[i].businessUnitIdName +
            " " +
            formState.BusinessUnitList[i].FullName +
            " " +
            nowtime;
        }
      }
    }
  });
};
watch(
  () => formState.BusinessUnitId,
  (newVal, oldVal) => {
    const now = new Date();
    const nowtime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    if (formState.BusinessUnitList && formState.BusinessUnitList.length) {
      for (var i = 0; i < formState.BusinessUnitList.length; i++) {
        if (formState.BusinessUnitList[i].BusinessUnitId == newVal) {
          formState.Title =
            props.row.name +
            " " +
            formState.BusinessUnitList[i].businessUnitIdName +
            " " +
            formState.BusinessUnitList[i].FullName +
            " " +
            nowtime;
        }
      }
    }
  },
  { immediate: true, deep: true }
);
onMounted(() => {
  formState.ProcessName = props.name;
  data.rowRecord = props.row;
  getDeptList();
});
</script>
<style lang="less">
@import url("@/style/modal.less");
.CreateProcess {
  .ant-form-item .ant-row {
    display: flex !important;
  }
  .ant-form-item-label {
    width: 100px;
  }
  .ant-form-item {
    margin-bottom: 20px !important;
  }

  .processTitle .ant-row .ant-col .ant-form-item-required {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .processTitle .ant-row .form-tip1 {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ProcessName {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .form-tip {
    font-size: 12px;
    margin-bottom: 12px;
    color: #606266;
  }
}
</style>
