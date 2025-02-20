<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Name" label="标题" :rules="[{ required: true, message: '请输入标题' }]">
                    <a-input disabled v-model:value="formState.Name"></a-input>
                  </a-form-item>
                  <a-form-item name="endDate" label="截止时间" :rules="[{ required: true, message: '请选中截止时间' }]">
                    <a-date-picker v-model:value="formState.endDate" valueFormat="YYYY-MM-DD" />
                  </a-form-item>
                </div>
              </div>

              <div class="sectionTitle">备注信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Description" label="备注" :rules="[{ required: false, message: '请输入备注' }]">
                    <a-textarea :rows="4" v-model:value="formState.Description" placeholder="请输入备注" />
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
    computed
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import { formTreeData } from "@/utils/common.js";

  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const props = defineProps({
    isShow: Boolean,
    id: String,
    name: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };

  const formState = reactive({
    Name: "",
    Description: "",
    endDate: null,
  });
  if(props.name){
    formState.Name = props.name;
  }
  const data = reactive({
    title: "督办",
    height: document.documentElement.clientHeight - 360,
  });
  const {
    title,
    height
  } = toRefs(data);

  

  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 360;
    });
  });

  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        let obj = {
          actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordId: props.id,
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName: 'WFProcessInstance',
                objTypeCode: 122,
                fields: {
                  IsSupervised: 1,
                  SuperviseReminderOn: formState.endDate,
                  Name: formState.Name,
                  Description: formState.Description
                }
              }
            }
          }]
        };
        let d = {
          message: JSON.stringify(obj)
        }
        // formRef.value.resetFields();
        proxy.$post(Interface.edit, d).then(res=>{
          if(res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS'){
            message.success("督办成功！");
            emit("success", false);
            emit("cancel", false);
          }else {
            message.success("督办成功！")
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