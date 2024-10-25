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
                        <a-form-item name="Name" label="标题" :rules="[{ required: true, message: '请输入标题' }]">
                            <a-input v-model:value="formState.Name"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="发布类型">
                            <a-radio-group v-model:value="formState.type" name="radioGroup">
                                <a-radio value="100201">信息</a-radio>
                                <a-radio value="100202">通知</a-radio>
                                <a-radio value="100100">文件</a-radio>
                              </a-radio-group>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="FolderId" :label="label" :rules="[{ required: true, message: '请选择信息栏目' }]">
                            <a-cascader v-model:value="formState.FolderId" @dropdownVisibleChange="getTree" :options="treeData" />
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="contentBody" label="内容" :rules="[{ required: true, message: '请输入内容' }]">
                            <a-textarea :rows="4" v-model:value="formState.contentBody" placeholder="请输入内容" />
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
    title: "发布信息",
    height: document.documentElement.clientHeight - 360,
    treeData: []
  });
  const {
    title,
    height, treeData
  } = toRefs(data);
  const formState = reactive({
    Name: "",
    contentBody: "",
    type: "100201",
    FolderId: ""
  });
  
  const label = computed(()=>{
    let type = formState.type;
    let str = '信息栏目';
    if(type=='100201'){
        str = '信息栏目';
    }else if(type=='100202'){
        str = '通知栏目';
    }else if(type=='100100'){
        str = '文件栏目';
    }
    return str;
  })
  const getTree = (search, attribute) => {
    console.log(search, attribute);
    let entity = formState.type == '100201' ? 'contenttree' : formState.type == '100202' ? 'noticetree' : 'filetree';
    proxy.$get(Interface.flow.contentTree, {
        entity: entity
    }).then((res) => {
        let list = res.rows.map(item=>{
            item.label = item.text;
            item.value = item.id;
            return item;
        });
        data.treeData = formTreeData(list,'id', 'pid');
    });
  };
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 360;
    });
  });
  
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let obj = {
            title: formState.Name,
            contentBody: formState.contentBody,
            folderId: formState.FolderId,
            contentId: props.id,
            ObjectTypeCode: formState.type
        };
        proxy.$get(Interface.flow.publishtocontent, obj).then((res) => {
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
  