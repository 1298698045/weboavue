<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="name" label="名称" :rules="[{ required: true, message: '请输入名称' }]">
                    <a-input v-model:value="formState.name"></a-input>
                  </a-form-item>
                </div>
              </div>
            </div>
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
import { message } from "ant-design-vue";

import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  fileParams: Object
});
const formRef = ref();
const emit = defineEmits(["cancel", "refresh"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  title: "重命名",
  height: document.documentElement.clientHeight - 300,
  userId: '',
  userName: ''
});
const {
  title,
  height,
  userId,
  userName
} = toRefs(data);
const formState = reactive({
  name: ""
});
watch(() => props.fileParams, (newVal, oldVal) => {
  formState.name = newVal.name;
}, { deep: true, immediate: true })

formState.name = props.fileParams.name;
onMounted(() => {
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
    data.userName = userInfo.fullName;
    if (data.userId == 'jackliu') {
      data.userId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
    }
  }
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 300;
  });
});



const handleSubmit = () => {
  let apiName = 'FileFolder';
  let objTypeCode = 100103;
  if (props.fileParams && props.fileParams.type == 'file') {
    apiName = 'File';
    objTypeCode = 100100;
  }
  formRef.value
    .validate()
    .then(() => {
      //console.log("values", formState, toRaw(formState));
      let url = Interface.create;
      let obj = {
        actions: [{
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: apiName,
              objTypeCode: objTypeCode,
              fields: {
                Name: formState.name
              }
            }
          }
        }]
      };
      if (props.fileParams && props.fileParams.id) {
        obj.actions[0].params.recordId = props.fileParams.id;
        obj.actions[0].params.recordInput.fields.ModifiedBy = data.userId;
        url = Interface.edit;
      }
      let d = {
        message: JSON.stringify(obj)
      }
      proxy.$post(url, d).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
          formRef.value.resetFields();
          message.success("保存成功！");
          emit("refresh", '');
          emit("cancel", false);
        }
        else {
          if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
            message.error(res.actions[0].errorMessage);
          }
          else {
            message.error("保存失败");
          }
        }

      })
    })
    .catch((err) => {
      console.log("error", err);
    });
};
</script>
<style lang="less">
@import url("@/style/modal.less");

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

    .sectionItem {
      flex: 1;
      margin-right: 20px;

      .ant-row {
        display: block !important;
      }
    }

    .sectionItem:last-child {
      margin-right: 0;
    }
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
</style>