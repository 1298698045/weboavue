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
          <div>会议发布</div>
        </template>
        <div class="modalContainer MeetingRemindWrap">
          <div class="modalCenter" :style="{ height: height + 'px' }">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">详细信息</div>
                <div class="sectionRow">
                  <div class="sectionItem sectionItem1">
                    <a-form-item label="渠道" name="wechat" :rules="[
                        {
                          required: true,
                          message: '请至少勾选一个',
                        },
                      ]">
                        <div class="row">
                            <a-checkbox v-model:checked="formState.wechat">微信消息</a-checkbox>
                        </div>
                        <div class="row">
                            <a-checkbox v-model:checked="formState.sms">短信消息</a-checkbox>
                        </div>
                        <div class="row">
                            <a-checkbox v-model:checked="formState.email">邮件消息</a-checkbox>
                        </div>
                      </a-form-item>
                  </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item label="标题" name="Name" :rules="[
                        {
                          required: true,
                          message: '请输入标题',
                        },
                      ]">
                      <a-input v-model:value="formState.Name"></a-input>
                    </a-form-item>
                  </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item label="通知内容" name="message" :rules="[
                        {
                          required: true,
                          message: '请输入内容',
                        },
                      ]">
                        <div class="rVal rVal2">
                            <TEditor ref="editorRef" mode="middle" :placeholder="'输入通知内容'" :height="props.type=='modal'?(height-295):(height-255)" @input="getEditorContent" />
                        </div>
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
            <a-button type="primary" @click.prevent="handleSubmit">发送</a-button>
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
  import TEditor from "@/components/TEditor.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    id:String,
    RegardingObjectIdName:String,
    type:String
  });
  const formRef = ref();
  const editorRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    height: "",
  });
  const { height } = toRefs(data);
  const formState = reactive({
    Name: "",
    message: "",
    wechat:false,
    sms:false,
    email:false,
  });
  
  data.height = document.documentElement.clientHeight - 330;
  onMounted(() => {
    formState.Name="[会议通知]："+props.RegardingObjectIdName;
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 330;
    });
  });
  const getEditorContent = (e) => {
        formState.message = e;
  }
  const handleSubmit = () => {
    if(formState.wechat||formState.sms||formState.email){}else{
      message.error("至少勾选一种渠道");
      retun
    }
    if(formState.Name){}else{
      message.error("标题不能为空");
      retun
    }
    if(formState.message){}else{
      message.error("通知内容不能为空");
      retun
    }
    formRef.value
      .validate()
      .then(() => {
            //console.log("values", formState, toRaw(formState));
            //var fields = JSON.parse(JSON.stringify(formState));
            let url=Interface.meeting.remind;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                      meetingId:props.id,
                      noticeMessageChannel: {
                        wechat: formState.wechat,
                        sms: formState.sms,
                        email: formState.email,
                        message: formState.message
                      }              
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
              if(res&&res.actions&&res.actions[0]&&res.actions[0].state=='SUCCESS'){
                message.success("提醒成功！");
              }
              else if(res&&res.actions&&res.actions[0]&&res.actions[0].errorMessage){
                message.error(res.actions[0].errorMessage);
              }
              else{
                message.error("提醒失败！");
              }
                formState.message='';
                formState.email=false;
                formState.sms=false;
                formState.wechat=false;
                emit("cancel", false);
            });
        
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
  .MeetingRemindWrap{
    textarea.ant-input{
      margin-bottom: 5px;
    }
    .sectionItem1{
      display: flex;
      margin-top: 0px;
      margin-bottom: 0px;
      .ant-form-item-control-input-content{
        display: flex;
      }
      .ant-form-item{
        margin-bottom: 0 !important;
        .ant-form-row{
          //display: flex !important;
        }
      }
      .ant-form-item-label{
        margin-right: 15px;
      }
      .row{
        width: 110px;
      }
    }
  }
  </style>
  