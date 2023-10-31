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
          <div class="modalCenter" :style="{ height: height + 'px' }">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">基本信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="名称">
                            <a-input></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="父栏目">
                            <a-input></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="序号">
                            <a-input></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="设置公用目录">
                            <a-input></a-input>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">备注信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="序号">
                            <a-textarea :rows="4" />
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
    isShow: Boolean,
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "新建文件夹",
    layoutList: [],
    list: {},
    select: {},
    search: {},
    height: document.documentElement.clientHeight - 300,
    isRadioDept: false,
    isMultipleDept: false,
    isRadioUser: false,
    localId: "",
    isMultipleUser: true,
  });
  const {
    title,
    layoutList,
    list,
    select,
    search,
    height,
    isRadioDept,
    isRadioUser,
    isMultipleDept,
    localId,
    isMultipleUser,
  } = toRefs(data);
  const formState = reactive({});
  
  const getConfig = () => {
    proxy.$get(Interface.entityConfig, {}).then((res) => {
      let componentDef = res.actions[0].returnValue.componentDef;
      data.layoutList = componentDef.sections;
      let record = res.actions[0].returnValue.record;
      data.list = JSON.parse(JSON.stringify(record));
      componentDef.lookupAttributes.forEach((item) => {
        data.search[item.name] = [
          { ID: data.list[item.name].Id, Name: data.list[item.name].Name },
        ];
        data.list[item.name] = {
          Id: data.list[item.name].Id,
          Name: data.list[item.name].Name,
        };
      });
      console.log("data.search", data.search);
      for (var key in data.list) {
        formState[key] = data.list[key];
      }
      console.log("formState", formState);
    });
  };
  getConfig();
  const getPickerList = () => {
    proxy.$get(Interface.picklist, {}).then((res) => {
      data.select = res.actions[0].returnValue.picklistFieldValues;
    });
  };
  getPickerList();
  
  const searchlookup = (search, attribute) => {
    console.log(search, attribute);
    proxy
      .$get(Interface.uilook, {
        Lktp: attribute.attributes.sObjectType,
        Lksrch: search,
      })
      .then((res) => {
        let listData = res.listData;
        data.search[attribute.targetValue] = listData;
      });
  };
  
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  
  const cancelDeptModal = (params) => {
    data.isRadioDept = params;
    data.isMultipleDept = params;
  };
  // 弹框选中部门
  const handleDeptParams = (params) => {
    console.log("deptData", params);
    data.isRadioDept = false;
    data.isMultipleDept = false;
    // 单选部门赋值
    var isEmpty = data.search[data.localId].some((item) => item.ID == params.ID);
    if (!isEmpty) {
      data.search[data.localId].push({
        ID: params.ID,
        Name: params.Name,
      });
    }
    formState[data.localId].Id = params.ID;
  };
  
  const cancelUserModal = (params) => {
    data.isRadioUser = params;
  };
  // 关闭用户多选弹窗
  const cancelMuUserModal = (params) => {
    data.isMultipleUser = params;
  };
  const handleUserParams = (params) => {
    console.log("userData", params);
    console.log("赋值字段", data.localId);
    data.isRadioUser = false;
    formState[data.localId].Id = params.id;
    var isEmpty = data.search[data.localId].some((item) => item.ID == params.id);
    if (!isEmpty) {
      data.search[data.localId].push({
        ID: params.id,
        Name: params.name,
      });
    }
  };
  // 多选用户
  const handleMuUserParams = (params) => {};
  // 查找类型打开弹窗
  const handleOpenLook = (attribute) => {
    let localId = attribute.localId;
    data.localId = localId;
    let sObjectType = attribute.attributes.sObjectType;
    if (sObjectType == 30020) {
      data.isRadioUser = true;
    } else if (sObjectType == 10) {
      data.isRadioDept = true;
    }
  };
  
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let obj = {
          params: {
            objTypeCode: 30027,
            fields: formState,
            id: "",
          },
        };
        var messages = JSON.stringify(obj);
        proxy.$get(Interface.saveRecord, { message: messages }).then((res) => {
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
  </style>
  