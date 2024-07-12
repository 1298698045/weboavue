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
                                :show-upload-list="false"
                                :data="{ 'id': recordId }"
                                :multiple="false"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
          <a-button type="primary" @click.prevent="handleCancel">保存</a-button>
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
    title: "新建小组",
    height: document.documentElement.clientHeight - 300,
    select: {},
    search: {},
    step:0,
    fileList: [],
    file: "",
    imageUrl:require('@/assets/img/defaultGroup.png'),
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
  const handleChange = (info) => {
    //console.log("handleChange",info);
    data.file = info.file;
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done'||info.file.status === 'error') {
      getBase64(info.file.originFileObj).then(imageUrl => {
        message.success('图片上传成功！');
        data.imageUrl=imageUrl;
        //console.log('文件的URL:', imageUrl);
      });
    }
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
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
          data.select = res.actions[0].picklistValuesMap||{};
          let record = res.actions[0].returnValue.fields;
          data.imageUrl = record.AvatarImg.value||require('@/assets/img/defaultGroup.png');
        }
    })
    
  }
  if(props.id){
      getDetail();
      data.recordId=props.id;
  }
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
            console.log("values", formState, toRaw(formState));
            let item = toRaw(formState)
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
                        Name: item.Name,
                        OwningUser: item.OwningUser.Id,
                        BusinessUnitId: item.BusinessUnitId.Id,
                        Description: item.Description,
                        ImportSequenceNumber:item.ImportSequenceNumber||item.ImportSequenceNumber==0?item.ImportSequenceNumber*1:'',
                        IsPublic:item.IsPublic
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
                  //formRef.value.resetFields();
                  message.warning("保存成功！");
                  emit("load", false);
                  setTimeout(function(){
                      //emit("cancel", false);
                      data.step=1;
                  },1000)
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