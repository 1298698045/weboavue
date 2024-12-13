<template>
  <div class="UpdateGroupImage">
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>更新照片</div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter modalCenter2" :style="{ height: height + 'px!important' }">
          <a-form :model="formState2" ref="formRef2" class="formRef2">
            <div class="section">
              <div class="sectionRow">
                <div class="sectionItem">
                        <div class="uploadtext1">您可以上载 JPG、GIF 或 PNG 文件。最大文件大小为 16 MB。</div>
                        <a-form-item label="">
                            <a-upload
                                v-model:file-list="fileList"
                                name="file"
                                list-type=""
                                class="avatar-uploader"
                                :customRequest="changeRequest"
                                :show-upload-list="false"
                                :multiple="false"
                                accept="image/*"
                                action
                                :before-upload="beforeUpload"
                                @change="handleChange"
                            >
                                <a-button class="ant-upload-text"><UploadOutlined /> 上载图像</a-button>
                            </a-upload>
                        </a-form-item>
                        <div class="uploadtext2">当前照片：</div>
                        <img :src="imageUrl" alt="" class="uploadcurrent"/>
                    </div>
              </div>
            </div>
          </a-form>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel" class="cancelmodel">取消</a-button>
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
    nextTick
  } from "vue";
  import axios from "axios";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
    UploadOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import { formTreeData } from "@/utils/common.js";
  import FilterQuery from "@/components/FilterQuery.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  //   const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    title: String,
    isShow: Boolean,
    id: String
  });
  const formRef = ref();
  const formRef2 = ref();
  const formRef3 = ref();
  const emit = defineEmits(["cancel","load"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const formState2 = reactive({
    OwningUser: {
        Id: '',
        Name: ''
    },
   
  });
  const formState3 = reactive({
    OwningUser: {
        Id: '',
        Name: ''
    },
   
  });
  const data = reactive({
    title: "更新照片",
    height: document.documentElement.clientHeight - 350,
    select: {},
    search: {},
    step:0,
    fileList: [],
    file: null,
    imageUrl:'',
    recordId:''
  });
  const {
    title,
    height, select, search,step,imageUrl,fileList,file
  } = toRefs(data);
  const formState = reactive({
    Name: '',
    BusinessUnitId: {
        Id: '',
    },
    ImportSequenceNumber: '',
    IsPublic: false,
    RequireAttach: false,

    OwningUser: {
        Id: '',
        Name: ''
    },
    Description: '',
    StateCode: '',
    Priority: ''
  });

  const onSearch = (e) => {

  }
  const getBase64=(file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const beforeUpload = (e) => {
    console.log("beforeUpload",e);
  }
  const handleChange = (file) => {
    if(file&&file.file){
        data.file=file.file.originFileObj;
        getBase64(data.file).then(imageUrl => {
          data.imageUrl=imageUrl;
        });
    }
  }
  const changeRequest=(file) => {
      nextTick(()=>{
          if (data.file) {
            let fd = new FormData();
            fd.append('entityName', 'Group');
            fd.append('parentId', props.id);
            fd.append('file', data.file);
            axios({
                url: Interface.uploadAvatar,
                method: 'POST',
                data: fd,
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            }).then(res=>{
                message.success("上传成功！");
            }).catch(err => {
                console.log('error', err);
                message.error("上传失败！");
            });
          }
      })
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 350;
    });
  });
  const searchlookup = (saerchVal, Lktp, field) => {
    proxy.$get(Interface.uilook, {
        Lktp: Lktp,
        Lksrch: saerchVal,
    }).then((res) => {
        let listData = res.listData;
        data.search[field] = listData;
    });
  }
  const handleOpenLook = (type) => {

  }
  const getDetail = () => {
    let d = {
        actions:[{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
              recordId: props.id,
              apiName:'Group',
              objTypeCode: 9
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]){
          let fields = res.actions[0].returnValue.fields;
          let url=fields.AvatarUrl&&fields.AvatarUrl.value?fields.AvatarUrl.value:'';
          if(url){
            data.imageUrl='/'+Interface.viewAvatar+'/Group/'+props.id;
          }
          else{
            data.imageUrl=require('@/assets/img/avatar-r.png');
          }
        }
    })
    
  }
  if(props.id){
      getDetail();
      data.recordId=props.id;
  }
  const handleSubmit = () => {
    if(data.file){
      let url=Interface.create;
            let d = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'Group',
                    objTypeCode: 9,
                    fields: {
                      AvatarUrl:'\\Group\\'+props.id
                    }
                  }              
                }
            }]
            };
            if(props.id){
                d.actions[0].params.recordId=props.id;
                url=Interface.edit;
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                    message.success("保存成功！");
                    emit("load", false);
                    emit("cancel", false);
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                        message.error(res.actions[0].errorMessage);
                    }
                    else{
                        message.error("保存失败！");
                    }
                }
            });
    }
    else{
      message.error("请上传照片！");
    }
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
.modalCenter2{
    display: flex;
    justify-content: center;
    align-items: center;
    .formRef2{
    height: 100%;
    .section{
      height: 100%;
    }
    .sectionRow{
      height: 100%;
    }
    .sectionItem{
      height: 100%;
      text-align: center;
      line-height: 35px;
    }
    .uploadcurrent{
      margin: 25px 0;
    }
  }
  .uploadtext1{
    margin-bottom: 15px;
  }
}
</style>