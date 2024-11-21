<template>
  <div class="NewKnowledgeMap" ref="NewKnowledgeMap">
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit" class="NewKnowledgeMapModel">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <div class="form-legend-desktop">
            <abbr class="required">*</abbr>
            = 必填信息
          </div>
          <a-form :model="formState" ref="formRef" class="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Name" label="主题名称" :rules="[{ required: true, message: '请输入' }]">
                      <a-input v-model:value="formState.Name"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                  <div class="sectionItem">
                      <a-form-item name="Description" label="说明">
                          <a-textarea :rows="4" placeholder="请输入" v-model:value="formState.Description" />
                      </a-form-item>
                  </div>
              </div>
              <!-- <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="BusinessUnitId" label="部门" :rules="[{ required: true, message: '请选择' }]">
                      <a-select v-model:value="formState.BusinessUnitId.Id" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'BusinessUnit', 'BusinessUnitId');}" @dropdownVisibleChange="(e) => {searchlookup('','BusinessUnit', 'BusinessUnitId');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.BusinessUnitId" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('10')" />
                      </div>
                  </a-form-item>
                </div>
              </div> -->
              <!-- <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="OwningUser" label="所有人" :rules="[{ required: true, message: '请选择' }]">
                      <a-select v-model:value="formState.OwningUser.Id" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'SystemUser', 'OwningUser');}" @dropdownVisibleChange="(e) => {searchlookup('','SystemUser', 'OwningUser');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.OwningUser" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('8')" />
                      </div>
                  </a-form-item>
                </div>
              </div> -->
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="DisplayOrder" label="显示顺序">
                      <a-input v-model:value="formState.DisplayOrder" type="number"></a-input>
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel" class="cancelmodel NewKnowledgeMapCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
        </div>
      </template>
    </a-modal>
    <RadioDept :isShow="isRadioDept"  @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
    <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshPeople" :sObjectName="sObjectName" :recordId="memberId" :objTypeCode="objectTypeCode" :external="external" />
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
    PlusOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import { formTreeData,girdFormatterValue } from "@/utils/common.js";
  import FilterQuery from "@/components/FilterQuery.vue";
  import Interface from "@/utils/Interface.js";
  import RadioDept from "@/components/commonModal/RadioDept.vue";
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import Delete from "@/components/listView/Delete.vue";
  import { useRouter, useRoute } from "vue-router";
  import TEditor from "@/components/TEditor.vue";
  const router = useRouter();
  const { proxy } = getCurrentInstance();
  const props = defineProps({
    title: String,
    isShow: Boolean,
    id: String,
    type: String,
  });
  const editorRef = ref();
  const formRef = ref();
  const formRef2 = ref();
  const formRef3 = ref();
  const emit = defineEmits(["cancel","load"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const NewKnowledgeMap = ref();
  const data = reactive({
    title: "新建地图维护",
    height: document.documentElement.clientHeight - 350,
    select: {},
    search: {
      OwningUser:[],
      member:[],
      BusinessUnitId:[]
    },
    recordId:'',
    isRadioDept:false,
    isRadioUser:false,
    objectTypeCode:'100310',
    sObjectName:'KbSubject',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
  });
  const {
    title,
    height, select, search,isRadioDept,isRadioUser,objectTypeCode,sObjectName,isDelete,deleteDesc,external
  } = toRefs(data);
  const formState = reactive({
    Name: '',
    DisplayOrder: '',
    Description: '',
  });
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 350;
    });
    data.tableHeight = document.documentElement.clientHeight-500;
  });
  const searchlookup = (searchVal, Lktp, field) => {
    let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: data.sObjectName,
                    fieldApiName: field,
                    pageParam: 1,
                    pageSize: 25,
                    q: searchVal||'',
                    searchType: "Recent",
                    targetApiName: Lktp,
                    body: {
                        sourceRecord: {
                            apiName: data.sObjectName,
                            fields: {
                                Id: null,
                                    RecordTypeId: ""
                                }
                            }
                        }
                    }
                }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup, d).then((res) => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data.search[field] = arr;
        });
  }
  const handleOpenLook = (type,name) => {
    if(type=='10'){
      data.isRadioDept = true;
    }
    else if(type=='8'){
      data.isRadioUser = true;
    }
  }
  const cancelDeptModal = (e) => {
    data.isRadioDept = false;
  }
  const handleDeptParams = (e) => {
    //console.log("e",e);
    if(e.ID){
      formState.BusinessUnitId.Id = e.ID;
      data.isRadioDept = false;
      let result =data.search.BusinessUnitId.filter((item) => {
        return item.ID == e.ID;
      });
      if(result&&result.length){}else{
        data.search.BusinessUnitId.push({
          ID:e.ID,
          Name:e.Name
        })
      }
    }
  }
  const getDetail = () => {
    let d = {
        actions:[{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
              recordId: props.id,
              apiName:data.sObjectName,
              objTypeCode: data.objectTypeCode
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]){
          let record = res.actions[0].returnValue.fields;
          formState.Name = record.Name?record.Name.displayValue:'';
          //formState.BusinessUnitId.Id = record.BusinessUnitId?record.BusinessUnitId.value : '';
          formState.DisplayOrder = record.DisplayOrder?record.DisplayOrder.value:'';
          formState.Description = record.Description?record.Description.value : '';
          // if(record.OwningUser&&record.OwningUser.value){
          //       let OwningUserName=record.OwningUser.displayValue||'';
          //       let OwningUserId=record.OwningUser.value;
          //       formState.OwningUser={Id:OwningUserId,Name:OwningUserName};
          //       data.search.OwningUser.push({
          //           ID: OwningUserId,
          //           Name: OwningUserName
          //       });
          //       searchlookup('', 'SystemUser','OwningUser');
          // }
            
        }
    })
    
  }
  if(props.id){
      getDetail();
      data.title='编辑地图维护';
  }
  const handleSubmit = () => {
    let userInfo=window.localStorage.getItem('userInfo');
    let userId='';
    let userName='';
    if(userInfo){
          userInfo=JSON.parse(userInfo);
          userId=userInfo.userId;
          userName=userInfo.fullName;
          if(userId=='jackliu'){
              userId='2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
          }
          if(!props.id){
            formState.CreatedBy=userId;
            if(!formState.OwningUser){
              formState.OwningUser=userId;
            }
          }
          else{
            formState.ModifiedBy=userId;
          }
    }
    formRef.value.validate().then(() => {
      let url = Interface.create;
      let d = {
          actions:[{
              id: "2919;a",
              descriptor: "",
              callingDescriptor: "UNKNOWN",
              params: {
                  recordInput:{
                      allowSaveOnDuplicate: false,
                      apiName: data.sObjectName,
                      objTypeCode: data.objectTypeCode,
                      fields: formState
                  }
              }
          }]
      };
      if(props.id){
          url = Interface.edit;
          d.actions[0].params.recordId = props.id;
      }
      let obj = {
          message: JSON.stringify(d)
      }
      proxy.$post(url, obj).then((res) => {
        if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
            message.success("保存成功！");
            emit("success", false);
            emit("cancel", false);
            if(!props.id){
              let url = router.resolve({
                  name: "KnowledgeMapDetailEditor",
                  query: {
                  id: res.actions[0].returnValue.id||'',
                  },
              });
              window.open(url.href);
            }
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
    })
    .catch((err) => {
      console.log("error", err);
    });
  };

const closeUser = (e) => {
  data.isRadioUser = false;
};
const getUserData = (e) => {
  data.isRadioUser = false;
  if(e.id){
    formState.OwningUser.Id = e.id;
        data.isRadioDept = false;
        let result =data.search.OwningUser.filter((item) => {
          return item.ID == e.id;
        });
        if(result&&result.length){}else{
          data.search.OwningUser.push({
            ID:e.id,
            Name:e.name
          })
        }
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
}
.sectionItem.addMember{
   text-align: right;
   margin-bottom: 10px;
  .ant-select{
    margin-right: 10px;
    width:150px;
    text-align: left;
  }
  .ant-select-selector{
    border-radius: 2px;
  }
}
.NewKnowledgeMap_list_avatar{
    width: 40px !important;
    position: relative;
    right: 5px;
}
.form-legend-desktop {
    text-align: right;
    margin-bottom: 8px;
}
.NewKnowledgeMapModel{
  .ant-input {
    border-radius: 4px !important;
  }
  .section{
    padding-top: 0 !important;
  }
}
</style>
