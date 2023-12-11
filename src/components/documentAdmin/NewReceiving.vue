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
            <div class="section" v-if="stepCurrent==1">
                <div class="sectionRow">
                    <a-input-search
                        v-model:value="searchVal"
                        placeholder="搜索流程"
                        @search="getProcess"
                    />
                </div>
                <div class="sectionRow">
                    <a-radio-group v-model:value="ProcessId" @change="changeProcess">
                        <a-radio v-for="(item,index) in processList" :key="index" :style="radioStyle" :value="item.ProcessId">{{item.Name}}</a-radio>
                    </a-radio-group>
                </div>
            </div>
            <a-form v-else :model="formState" ref="formRef">
              <div class="section">
                <!-- <div class="sectionTitle">基本信息</div> -->
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Name" label="标题" :rules="[{ required: true, message: '请输入标题' }]">
                            <a-input v-model:value="formState.Name"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="BusinessUnitId" label="身份部门">
                            <a-select v-model:value="formState.BusinessUnitId">
                                <a-select-option v-for="(item,index) in deptList" :key="index" value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Priority" label="优先级">
                            <a-select v-model:value="formState.Priority">
                                <a-select-option value="0">低</a-select-option>
                                <a-select-option value="1">中</a-select-option>
                                <a-select-option value="2">高</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="Deadline" label="办理期限">
                            <a-select v-model:value="formState.Deadline">
                                <a-select-option value="1">1天</a-select-option>
                                <a-select-option value="2">2天</a-select-option>
                                <a-select-option value="3">3天</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Description" label="备注">
                            <a-textarea :rows="4" v-model:value="formState.Description" />
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
            <a-button type="primary" v-if="stepCurrent==step" @click.prevent="handleSubmit">保存</a-button>
            <a-button type="primary" v-else @click="handleNext">下一步</a-button>
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
  const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
});
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    folderName: String,
    folderPicker: String,
    ObjectTypeCode: String,
    id: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "选择流程",
    height: document.documentElement.clientHeight - 300,
    deptList: [],
    step: 2,
    stepCurrent: 1,
    processList: [],
    ProcessId: "",
    searchVal: "",
    processName: ""
  });
  const {
    title,
    height, deptList, step, stepCurrent, processList, ProcessId, searchVal, processName
  } = toRefs(data);
  const formState = reactive({
    Name: "",
    BusinessUnitId: "",
    Priority: "0",
    Deadline: "1",
    Description: ""
  });
  
  const changeProcess = (e) => {
    let id = e.target.value;
    formState.Name = data.processList.find(item=>item.ProcessId==id).Name;
  }
  const getDetail = () => {
    proxy.$get(Interface.flow.treeDetail,{
        id: props.id,
        objTypeCode: 100200
    }).then(res=>{
        let record = res.record;
        formState.Name = record.Name;
        formState.SortNumber = record.SortNumber;
        formState.NeedCensor = record.NeedCensor;
        formState.AllowComment = record.AllowComment;
        formState.Description = record.Description;
        formState.ParentId = [record.Id];
    })
  }
  if(props.id){
      getDetail();
  }
  const getDept = () => {
    proxy.$get(Interface.businessunitList,{}).then(res=>{
        data.deptList = res.businessUnits;
    })
  }
  getDept();
  const getProcess = () => {
    proxy.$get(Interface.documentAdmin.processList,{
        EntityType: "100108"
    }).then(res=>{
        data.processList = res.listData;
    })
  }
  getProcess();
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  const handleNext = () => {
    if( data.stepCurrent < data.step && data.ProcessId){
        data.stepCurrent++;
    }else {
        message.error("请选择一个流程！");
    }
  }
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let obj = {
          params: {
            fields: {
                ProcessId: data.ProcessId,
                Name: formState.Name,
                Deadline: formState.Deadline,
                Description: formState.Description,
                BusinessUnitId: formState.BusinessUnitId
            },
            id: "",
          },
        };
        var messages = JSON.stringify(obj);
        proxy.$get(Interface.documentAdmin.processCreate, { message: messages }).then((res) => {
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
  .treeBox{
    width: 300px;
    height: 300px;
    border: 1px solid #e2e3e5;
    border-radius: 5px;
    overflow: auto;
  }
  </style>
  