<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="850px"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
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
                        <a-form-item name="Name" label="选择用户">
                            <div>
                                <a-select allowClear  placeholder="请选择"
                                        v-model:value="formState.user.id"
                                        :default-active-first-option="false" :filter-option="false" showSearch
                                        @search="searchlookup" @change="changeUser"
                                        @dropdownVisibleChange="searchlookup">
                                        <template #suffixIcon></template>
                                        <a-select-option v-for="v in listData" :key="v.ID" :value="v.ID">{{ v.Name
                                            }}</a-select-option>
                                    </a-select>
                                    <i class="iconfont icon-sousuo pointer selectIcon"
                                        @click="handleOpenLook"></i>
                            </div>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="上传签名">
                            <a-upload
                                v-model:file-list="fileList"
                                name="avatar"
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :before-upload="beforeUpload"
                                @change="handleChange"
                            >
                                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                <div class="ant-upload-text">选择文件</div>
                            </a-upload>
                        </a-form-item>
                    </div>
                </div>
              </div>
            </a-form>
          </div>
          <radio-user :isShow="isRadioUser" v-if="isRadioUser" @cancel="cancelUserModal" @selectVal="handleUserParams"
            :localId="localId"></radio-user>
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
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    id: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "新建签名",
    height: document.documentElement.clientHeight - 300,
    listData: [],
    isRadioUser: false,
    imageUrl: "",
    fileList: [],
    file: ""
  });
  const {
    title,
    height, listData, isRadioUser, imageUrl, fileList, file
  } = toRefs(data);
  if(props.id){
    data.title = '编辑签名';
  }
  const formState = reactive({
    user: {
        id: "",
        name: ""
    }
  });
  
  const cancelUserModal = (e) => {
    data.isRadioUser = e;
  }
  const handleUserParams = (e) => {
    console.log("e:",e);
    data.listData.push({
        ID: e.id,
        Name: e.name
    })
    formState.user = {
        id: e.id,
        name: e.name
    };
    data.isRadioUser = false;
  }

  const changeUser = (e) => {
    console.log("e",e);
  }
  const beforeUpload = (e) => {
    console.log("beforeUpload",e);
  }
  const handleChange = (e) => {
    console.log("handleChange",e);
    data.file = e.file;
  }
  const searchlookup = () => {
    proxy.$get(Interface.uilook,{
        Lktp: 8
    }).then(res=>{
        data.listData = res.listData;
    })
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  const handleOpenLook = () => {
    data.isRadioUser = true;
  }
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let formData = new FormData();
        formData.append("file",data.file);
        let obj = {
            file: formData,
            suser: formState.user.name,
            suser_lkid: formState.user.id,
            id: props.id
        };
        proxy.$get(Interface.flow.addSignature, obj).then((res) => {
          formRef.value.resetFields();
          message.success("保存成功！");
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
  