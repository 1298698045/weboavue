<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="850px"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
        class="commonImportModal"
      >
        <template #title>
          <div>导入</div>
        </template>
        <div class="modalContainer">
          <div class="modalCenter" :style="{ height: height + 'px' }">
            <a-form :model="formState" ref="formRef" :label-col="labelCol">
              <div class="section">
                <div class="sectionTitle">基本信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                      <a-form-item label="导入文件" name="IsPriviate">
                        <a-upload
                            class="commonImportUpload"
                            v-model:file-list="fileList"
                            name="file"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :headers="headers"
                            @change="changeUpload"
                        >
                            <a-button>选择文件</a-button> 未选择任何文件
                        </a-upload>
                      </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                      <a-form-item label="模版文件" name="IsPriviate">
                        <a-button type="link">下载模板</a-button>请下载模版文件，填入数据后导入!
                      </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">说明</div>
                <div class="descWrap">
                    <div class="descText">
                      如果导入数据过多导入可能需要较长时间，请不要'刷新'或'关闭窗口'
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
  import { useStore } from "vuex";
  let store = useStore();
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    height: "",
    fileList: []
  });
  const headers = {
    authorization: 'authorization-text',
};
  const { height, fileList } = toRefs(data);
  const formState = reactive({
    RegardingObjectTypeCode: '20290',
    RegardingObjectId: {},
    Subject:'',
    StartDateTime: '',
    StartDateTime_time: '',
    ScheduledStart: '',
    ScheduledEnd:'',
    EndDateTime: '',
    EndDateTime_time: '',
    OwningUser: {},
    IsAllDayEvent: false,
    Location: '',
    Description: '',
    CalendarType: '',
    CalendarType1: '',
    RegardingObjectIdName:''
  });
  
  data.height = document.documentElement.clientHeight - 350;
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 350;
    });
  });
  const changeUpload = (e) => {

  }
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        var data = {
            Location: formState.Location,
            Subject: formState.Subject,
            IsAllDayEvent: formState.IsAllDayEvent,
            Description: formState.Description,
            ScheduledStart: formState.startTime,
            ScheduledEnd: formState.endTime,
            CalendarType: formState.CalendarType,
            Phone: formState.Phone,
            RegardingObjectTypeCode: formState.RegardingObjectTypeCode ? formState.RegardingObjectTypeCode : '',
            RegardingObjectIdName: formState.RegardingObjectIdName,
            RegardingObjectId: formState.RegardingObjectId.Id,
            ReminderTime: formState.ReminderTime,
            BgColor: formState.BgColor,
            IsPrivate: formState.IsPrivate,
            Reminder: formState.Reminder,
        }
        proxy.$get(Interface.schedule.save, data).then((res) => {
          message.success("保存成功！");
          emit("cancel", false);
          formRef.value.resetFields();
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
  
  .ant-modal-content .modalContainer .modalCenter {
    /* height: 500px !important; */
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
  
      .sectionItem {
        flex: 1;
        margin-right: 20px;
  
        .ant-row {
          //display: flex !important;
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
  .descWrap{
    padding: 0 10px;
    .descText{
        margin-top: 10px;
        font-size: 12px;
    }
  }
  .commonImportUpload{
    .ant-btn{
      margin-left: 14px;
      margin-right: 10px;
    }
  }
  .commonImportModal{
    .ant-modal-content .modalContainer .modalCenter :where(.css-dev-only-do-not-override-kqecok).ant-form-item{
        line-height: 40px;
    }
    .descWrap .descText{
        margin-top: 15px;
        font-size: 14px;
    }
    .ant-col{
      display: inline-block !important;
    }
  }
  
  </style>
  