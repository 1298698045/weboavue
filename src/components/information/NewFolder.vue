<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="550px"
      :style="{ top: top + 'px' }"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>
          {{ ModalTitle }}
        </div>
      </template>
      <div class="modalContainer NewFolderWrap">
        <div class="modalCenter">
          <a-form ref="formRef" :model="formState" :label-col="labelCol">
            <a-form-item label="上级目录" name="ParentId">
              <!-- <a-tree-select
                                v-model:value="formState.ParentId"
                                show-search
                                style="width: 100%"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                placeholder="请选择目录"
                                allow-clear
                                tree-default-expand-all
                                :tree-data="treeData"
                                tree-node-filter-prop="name"
                            >
                                <template #title="{ value: val, name }">
                                    <span>{{ name }}</span>
                                </template>
                            </a-tree-select> -->
              <div>{{ formState.ParentIdName || "暂无" }}</div>
            </a-form-item>
            <a-form-item
              label="目录名称"
              name="Name"
              :rules="[{ required: true, message: '请输入目录名称' }]"
            >
              <a-input
                v-model:value="formState.Name"
                placeholder="请输入目录名称"
              />
            </a-form-item>
            <a-form-item label="显示顺序" name="DisplayOrder">
              <a-input
                type="number"
                v-model:value="formState.DisplayOrder"
                placeholder="请输入显示顺序"
              />
            </a-form-item>
            <a-form-item label="禁止文档重名" name="NoRepeat">
              <a-switch v-model:checked="formState.NoRepeat" />
            </a-form-item>
            <a-form-item label="继承上级目录设置" name="IsInherit">
              <a-switch v-model:checked="formState.IsInherit" />
            </a-form-item>
          </a-form>
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
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const formRef = ref();
const labelCol = ref({ style: { width: "140px" } });
const props = defineProps({
  isShow: Boolean,
  treeData: Array,
  ParentId: String,
  id: String,
  ParentIdName: String,
});
import { message } from "ant-design-vue";

const emit = defineEmits(["cancel", "success"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  ModalTitle: "新建目录",
  sObjectName: "ContentFolder",
  userId: "",
  userName: "",
  objectTypeCode: "5080",
  top: (document.documentElement.clientHeight - 440) / 2,
});
const { ModalTitle, sObjectName, userId, userName, top } = toRefs(data);
const formState = reactive({
  ParentIdName: "",
  ParentId: "",
  Name: "",
  NoRepeat: false,
  IsInherit: false,
  DisplayOrder: 1000,
});
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      let url = Interface.content.folder.new;
      let d = {
        actions: [
          {
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              NoRepeat: formState.NoRepeat?1:0,
              IsInherit: formState.IsInherit?1:0,
              ParentId: formState.ParentId,
              Name: formState.Name,
              DisplayOrder: formState.DisplayOrder,
            },
          },
        ],
      };
      if (props.id) {
        d.actions[0].params = {
          recordId: props.id,
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: "ContentFolder",
            objTypeCode: "5080",
            fields: {
              Name: formState.Name,
              ModifiedBy: data.userId,
              NoRepeat: formState.NoRepeat?1:0,
              IsInherit: formState.IsInherit?1:0,
              ParentId: formState.ParentId,
              DisplayOrder: formState.DisplayOrder,
            },
          },
        };
        url = Interface.edit;
      }
      let obj = {
        message: JSON.stringify(d),
      };
      proxy.$post(url, obj).then((res) => {
        formRef.value.resetFields();
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].state == "SUCCESS"
        ) {
          message.success("保存成功！");
          emit("success", false);
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
            message.error("保存失败");
          }
        }
        emit("cancel", false);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
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
          apiName: data.sObjectName,
          objTypeCode: data.objectTypeCode,
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
      formState.Name = record.Name ? record.Name.displayValue : "";
      formState.ParentIdName = record.ParentId
        ? record.ParentId.displayValue
        : "";
      formState.IsInherit = record.IsInherit ? record.IsInherit.value : false;
      formState.NoRepeat = record.NoRepeat ? record.NoRepeat.value : false;
      formState.DisplayOrder = record.DisplayOrder
        ? record.DisplayOrder.value
        : "";
    }
  });
};

onMounted(() => {
  if (props.id) {
    data.ModalTitle = "编辑目录";
    getDetail();
  } else {
    formState.ParentId = props.ParentId;
    formState.ParentIdName = props.ParentIdName;
  }
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
    data.userName = userInfo.fullName;
    if (data.userId == "jackliu") {
      data.userId = "2EC00CF2-A484-4136-8FEF-E2A2719C5ED6";
    }
  }
  window.addEventListener("resize", (e) => {
    data.top = (document.documentElement.clientHeight - 440) / 2;
  });
});
</script>
<style lang="less" scoped>
@import url("@/style/modal.less");

.ant-radio-wrapper {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.NewFolderWrap {
  :deep .ant-form-item-label {
    text-align: right;
    position: relative;
    left: -16px;
  }

  .modalCenter {
    padding: 10px 45px !important;
  }

  .ant-form-item {
    margin-bottom: 20px !important;
  }
}
</style>
