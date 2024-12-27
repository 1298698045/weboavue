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
          <div>发布投票</div>
        </template>
        <div class="modalContainer ReleasePollWrap">
          <div class="modalCenter" :style="{ height: height + 'px' }">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">投票内容</div>
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
                <div class="sectionRow" v-for="(item,index) in VoteOptions" :key="index">
                  <div class="sectionItem">
                    <a-form-item :label="'选项'+(index+1)" :name="item" :rules="[
                        {
                          required: true,
                          message: '请输入选项'+(index+1),
                        },
                      ]">
                      <a-textarea class="VoteInput" v-model:value="formState[item]" :rows="2"></a-textarea>
                    </a-form-item>
                  </div>
                </div>
                <!-- <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item label="投票内容" name="message" :rules="[
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
                </div> -->
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item>
                      <a-button type="primary" class="optionalWrapLeft" @click="addOption"><PlusOutlined />添加新选项</a-button>
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
            <a-button type="primary" @click.prevent="handleSubmit">发布</a-button>
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
    PlusOutlined
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
    listData:Array,
    Name:String
  });
  const formRef = ref();
  const editorRef = ref();
  const emit = defineEmits(["cancel","load"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    height: "",
    VoteOptions:['Option1','Option2','Option3']
  });
  const { height,VoteOptions } = toRefs(data);
  const formState = reactive({
    Name: "",
    Option1: "",
    Option2: "",
    Option3: "",
  });
  
  data.height = document.documentElement.clientHeight - 330;
  
  const addOption=()=>{
    data.VoteOptions.push('Option'+(data.VoteOptions.length+1));
    formState['Option'+(data.VoteOptions.length+1)]='';
  }
  const getEditorContent = (e) => {
        formState.message = e;
  }

  const handleSubmit = () => {
    // if(formState.Name){}else{
    //   message.error("标题不能为空");
    //   retun
    // }
    formRef.value
      .validate()
      .then(() => {
        let options=[];
        for(var i=0;i<data.VoteOptions.length;i++){
          options.push({
            name:formState['Option'+(i+1)],
            displayOrder:i+1
          })
        }
                let url=Interface.poll.submit;
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        text:formState.Name,
                        chatterTypeCode:'30400',
                        RegardingObjectId: props.id,
                        location: {
                            location: "",
                            buidingName: "",
                            longitude: "",
                            latitude: ""
                        },
                        visible: {
                            visibleType: 0
                        }
                    },
                    options:options
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                    message.success("发布成功");
                    emit("cancel", false);
                }
                else{
                    message.error("发布失败");
                }
            });
            //addResolution();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const addResolution=()=>{
    let Description=[];
    for(var i=0;i<data.VoteOptions.length;i++){
      Description.push((i+1)+'、'+formState['Option'+(i+1)]);
    }
    Description=Description.join('；');
    let url=Interface.create;
          let d = {
          actions:[{
              id: "2919;a",
              descriptor: "",
              callingDescriptor: "UNKNOWN",
              params: {
                recordInput: {
                  allowSaveOnDuplicate: false,
                  apiName: 'MeetingResolution',
                  objTypeCode: 5008,
                  fields: {
                      MeetingId: props.id,
                      Name: formState.Name,
                      Description:Description
                  }
                }              
              }
          }]
      };
      
      let obj = {
          message: JSON.stringify(d)
      }
      proxy.$post(url,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
          emit("load", "");
          emit("cancel", false);
        }
      });
  }
  
  onMounted(() => {
    formState.Name=props.Name?props.Name+'决议':'';
    if(props.listData&&props.listData.length){
      data.VoteOptions=[];
      for(var i=0;i<props.listData.length;i++){
        let item=props.listData[i];
        data.VoteOptions.push('Option'+(i+1));
        formState['Option'+(i+1)]=item.Name+(item.Description?'：'+item.Description:'');
      }
    }
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
  .ReleasePollWrap{
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
        
      }
      .ant-form-item-label{
        margin-right: 15px;
      }
      .row{
        width: 110px;
      }
    }
    .sectionItem{
      .optionalWrapLeft{
          margin-top: 10px;
          float:left;
      }
    }
  }
  </style>
  