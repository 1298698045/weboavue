<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
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
                  <a-form-item name="Name" label="流程名称" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-input v-model:value="formState.Name"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="EntityLayoutId" label="关联表单" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-select allowClear v-model:value="formState.EntityLayoutId.Id" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'20018', 'EntityLayoutId');}" @dropdownVisibleChange="(e) => {searchlookup('','20018', 'EntityLayoutId');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.EntityLayoutId" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('20018')" />
                      </div>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="FolderId" label="流程分类" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-select allowClear v-model:value="formState.FolderId.Id" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'100200', 'EntityLayoutId');}" @dropdownVisibleChange="(e) => {searchlookup('','100200', 'EntityLayoutId');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.EntityLayoutId" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('100200')" />
                      </div>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="Position" label="显示顺序" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-input v-model:value="formState.Position"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Priority" label="优先级">
                    <a-select v-model:value="formState.Priority">
                      <a-select-option v-for="(item,index) in select.Priority" :value="item.value">{{item.label}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="StateCode" label="状态">
                    <a-select v-model:value="formState.StateCode">
                      <a-select-option v-for="(item,index) in select.StateCode" :value="item.value">{{item.label}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="IsHide" label="是否隐藏流程">
                      <a-checkbox v-model:checked="formState.IsHide"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="RequireAttach" label="是否必须上传附件">
                      <a-checkbox v-model:checked="formState.RequireAttach"></a-checkbox>

                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="sectionTitle">备注</div>
              <div class="sectionRow">
                  <div class="sectionItem">
                      <a-form-item name="Description" label="描述">
                          <a-textarea :rows="4" placeholder="请输入内容" v-model:value="formState.Description" />
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
  import { formTreeData } from "@/utils/common.js";
  import FilterQuery from "@/components/FilterQuery.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  //   const labelCol = ref({ style: { width: "100px" } });
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
    title: "编辑流程定义",
    height: document.documentElement.clientHeight - 300,
    select: {},
    search: {}
  });
  const {
    title,
    height, select, search
  } = toRefs(data);
  const formState = reactive({
    Name: '',
    EntityLayoutId: {
        Id: '',
    },
    Position: '',
    IsHide: false,
    RequireAttach: false,

    FolderId: {
        Id: '',
        Name: ''
    },
    Description: '',
    StateCode: '',
    Priority: ''
  });

  const onSearch = (e) => {

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
    proxy.$get(Interface.flow.editFlowDefineDetail,{
      Id: props.id,
      ObjTypeCode: 121
    }).then(res=>{
      data.select = res.context.picklistValuesMap;
      let record = res.record;
      for(let key in formState) {
        formState[key] = record[key];
      }
      formState.FolderId = formState.FolderId || record.folderid;
      for (item in data.search) {
          if (item != 'searchname' && formState[name] && formState[name].Id) {
              var name = item
              var ID = (formState[name].Id).toUpperCase();
              formState[name].Id = ID;
              var Name = formState[name].Name;
              var newlist = {
                  ID: ID,
                  Name: Name
              }
              if (JSON.stringify(data.search[name]).indexOf(JSON.stringify(newlist)) == -1) {
                  data.search[name].push(newlist)
              }
          }
      }
    })
  }
  getDetail();
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let d = toRaw(formState)
        let obj = {
            ProcName: d.Name,
            FolderId: d.FolderId.Id,
            FolderIdName: d.FolderId.Name,
            FormId: d.EntityLayoutId.Id,
            Description: d.Description,
            RequireAttach: d.RequireAttach,
            Position: d.Position,
            Fshare: d.IsHide,
            StateCode: d.StateCode,
            Priority: d.Priority
        }
        proxy.$get(Interface.flow.editProcess,obj).then(res=>{
          console.log("res",res);
          if (res && (res.state == 1 || res.status == 1)) {
            message.success("保存成功！");
            emit('cancel', false);
          }

        })
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