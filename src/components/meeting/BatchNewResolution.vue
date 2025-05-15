<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="900px"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>批量新建决议</div>
      </template>
      <div class="modalContainer BatchNewResolutionWrap">
        <div class="modalCenter" :style="{ height: height + 'px' }">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <!-- <div class="sectionTitle"></div> -->
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item label="会议名称" name="Name">
                    {{ formState.Name }}
                  </a-form-item>
                </div>
              </div>
              <template
                v-for="(item, index) in formState.ListData"
                :key="index"
              >
                <div class="sectionRow sectionRow1">
                  <div class="sectionItem">
                    <a-form-item
                      :label="'标题' + (index + 1)"
                      name="ResolutionTitle"
                      :rules="[
                        {
                          required: true,
                          message: '请输入标题' + (index + 1),
                          validator: (rule, value, callback) =>
                            customCheck(index, 'ResolutionTitle', callback),
                        },
                      ]"
                    >
                      <a-input v-model:value="item.ResolutionTitle"></a-input>
                    </a-form-item>
                  </div>
                  <div class="sectionItemBtn">
                    <DeleteOutlined title="删除" @click="deleteData(index)" />
                  </div>
                </div>
                <div class="sectionRow sectionRow1">
                  <div class="sectionItem">
                    <a-form-item
                      :label="'内容' + (index + 1)"
                      name="ResolutionDesc"
                      :rules="[
                        {
                          required: true,
                          message: '请输入内容' + (index + 1),
                          validator: (rule, value, callback) =>
                            customCheck(index, 'ResolutionDesc', callback),
                        },
                      ]"
                    >
                      <!-- <a-textarea
                        class="VoteInput"
                        v-model:value="item.ResolutionDesc"
                        :rows="2"
                      ></a-textarea> -->
                      <TEditor
                        :ref="'editorRef' + (index + 1)"
                        :placeholder="'请输入内容'"
                        :height="200"
                        :mode="'chatter'"
                        :id="props.id"
                        @input="
                          (e) => {
                            getEditorContent(index, e);
                          }
                        "
                      />
                    </a-form-item>
                  </div>
                  <div class="sectionItemBtn"></div>
                </div>
              </template>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item>
                    <a-button
                      type="primary"
                      class="ResolutionalWrapLeft"
                      @click="addData"
                      ><PlusOutlined />添加新决议</a-button
                    >
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
          <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
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
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { Descriptions, message } from "ant-design-vue";
import { useStore } from "vuex";
let store = useStore();
import TEditor from "@/components/TEditor.vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  id: String,
  Name: String,
});
const formRef = ref();
const editorRef = ref();
const emit = defineEmits(["cancel", "load"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  height: "",
  userId: "",
});
const { height, userId } = toRefs(data);
const formState = reactive({
  Name: "",
  ListData: [
    {
      ResolutionTitle: "",
      ResolutionDesc: "",
    },
  ],
});

data.height = document.documentElement.clientHeight - 330;

const addData = () => {
  formState.ListData.push({
    ResolutionTitle: "",
    ResolutionDesc: "",
  });
};
const deleteData = (index) => {
  formState.ListData.splice(index, 1);
};
const getEditorContent = (index, e) => {
  formState.ListData[index].ResolutionDesc = e;
};

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      let Resolutions = [];
      for (var i = 0; i < formState.ListData.length; i++) {
        Resolutions.push({
          Name: formState.ListData[i].ResolutionTitle,
          Description: formState.ListData[i].ResolutionDesc,
        });
      }
      let url = Interface.saveBatchRecord;
      let records = [];
      if (formState.ListData && formState.ListData.length) {
        for (var i = 0; i < formState.ListData.length; i++) {
          let item = {
            recordId: "",
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: "MeetingResolution",
              objTypeCode: 5008,
              fields: {
                Name: formState.ListData[i].ResolutionTitle,
                Description: formState.ListData[i].ResolutionDesc,
                MeetingId: props.id,
                Votes: 0,
                StatusCode: 1,
                OwningUser: data.userId,
              },
            },
          };
          if (formState.ListData[i].id) {
            item.recordId = formState.ListData[i].id;
          }
          records.push(item);
        }
      } else {
        message.error("请至少添加一条决议！");
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
    (formState.ListData[index][name] == null ||
      formState.ListData[index][name] == "") &&
    formState.ListData[index][name] + "" != "0"
  ) {
    callback(new Error("不能为空！"));
  } else {
    callback();
  }
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
  }
  formState.Name = props.Name ? props.Name : "";
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 330;
  });
});
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
.BatchNewResolutionWrap {
  textarea.ant-input {
    margin-bottom: 5px;
  }
  .sectionItem1 {
    display: flex;
    margin-top: 0px;
    margin-bottom: 0px;
    .ant-form-item-control-input-content {
      display: flex;
    }
    .ant-form-item {
      margin-bottom: 0 !important;
    }
    .ant-form-item-label {
      margin-right: 15px;
    }
    .row {
      width: 110px;
    }
  }
  .sectionItem {
    .ResolutionalWrapLeft {
      margin-top: 10px;
      float: left;
      margin-left: 19px;
    }
  }
  .sectionRow1 {
    padding-left: 19px !important;
    .sectionItemBtn {
      width: 15px;
      margin-left: 0px;
      position: relative;
      top: 1px;
      font-size: 18px;
    }
    .sectionItem {
      margin-right: 15px !important;
    }
  }
}
</style>
