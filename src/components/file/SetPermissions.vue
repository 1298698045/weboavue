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
          <div class="modalCenter">
            <a-form :model="formState" ref="formRef">
            <div class="section">
                    <div class="sectionRow">
                        <div class="sectionItem">
                            <a-form-item name="name" label="搜索">
                                <a-input v-model:value="formState.name"></a-input>
                            </a-form-item>
                        </div>
                        <div class="sectionItem">
                            <a-form-item name="name" label="访问权限">
                                <a-select v-model:value="formState.select">
                                    <a-select-option value="0">无权限</a-select-option>
                                    <a-select-option value="2">查看</a-select-option>
                                    <a-select-option value="4">查看/新建（上传）</a-select-option>
                                    <a-select-option value="32">管理</a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                    </div>
                </div>
              <div class="section">
                <div class="sectionTitle">已添加人</div>
                <div class="rowBox">
                    <div class="imgs">
                        <img :src="require('@/assets/img/user.png')" alt="" />
                    </div>
                    <div class="name">
                        你组织中的任何用户
                    </div>
                    <div class="option">
                        <a-select v-model:value="formState.select" style="width: 200px;">
                            <a-select-option value="0">无权限</a-select-option>
                            <a-select-option value="2">查看</a-select-option>
                            <a-select-option value="4">查看/新建（上传）</a-select-option>
                            <a-select-option value="32">管理</a-select-option>
                        </a-select>
                    </div>
                </div>
                <div class="rowBox">
                    <div class="imgs">
                        <img :src="require('@/assets/img/user.png')" alt="" />
                    </div>
                    <div class="name">
                        你组织中的任何用户
                    </div>
                    <div class="option">
                        <a-select v-model:value="formState.select" style="width: 200px;">
                            <a-select-option value="0">无权限</a-select-option>
                            <a-select-option value="2">查看</a-select-option>
                            <a-select-option value="4">查看/新建（上传）</a-select-option>
                            <a-select-option value="32">管理</a-select-option>
                        </a-select>
                    </div>
                </div>
                <div class="rowBox">
                    <div class="imgs">
                        <img :src="require('@/assets/img/user.png')" alt="" />
                    </div>
                    <div class="name">
                        本部门
                    </div>
                    <div class="option">
                        <a-select v-model:value="formState.select" style="width: 200px;">
                            <a-select-option value="0">无权限</a-select-option>
                            <a-select-option value="2">查看</a-select-option>
                            <a-select-option value="4">查看/新建（上传）</a-select-option>
                            <a-select-option value="32">管理</a-select-option>
                        </a-select>
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
    isShow: Boolean
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "设置权限",
    height: document.documentElement.clientHeight - 300,
  });
  const {
    title,
    height
  } = toRefs(data);
  const formState = reactive({
    name: "",
  });

  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  
  
  
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let obj = {
          params: {
            objTypeCode: 30027,
            fields: {
              name: formState.name
            },
            id: props.fileParams.id,
          },
        };
        var messages = JSON.stringify(obj);
        proxy.$get(Interface.saveRecord, { message: messages }).then((res) => {
          formRef.value.resetFields();
          message.warning("保存成功！");
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
  .rowBox{
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e3e5;
    padding: 5px 10px;
    .imgs{
        width: 30px;
        height: 30px;
        background: var(--backColor);
        img{
            width: 100%;
            height: 100%;
        }
    }
    .name{
        flex: 1;
        margin-left: 20px;
    }
  }
  </style>
  