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
          <div class="form-legend-desktop">
            <abbr class="required">*</abbr>
            = 必填信息
          </div>
          <a-form :model="formState" ref="formRef">
            <div
              class="section"
              v-for="(item, index) in layoutList"
              :key="index"
            >
              <div class="sectionTitle">{{ item.title }}</div>
              <div
                class="sectionRow"
                v-for="(row, idx) in item.rows"
                :key="idx"
              >
                <div
                  class="sectionItem"
                  v-for="(attribute, attributeIdx) in row.attributes"
                  :key="attributeIdx"
                >
                  <a-form-item
                    :name="attribute.targetValue"
                    v-if="['L', 'LT', 'DT'].includes(attribute.attributes.type) && select[attribute.targetValue]"
                    :label="attribute.label"
                    :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]"
                  >
                    <a-select
                      v-if="JSON.stringify(select[attribute.targetValue].controllerValues)=='{}'"
                      allowClear
                      v-model:value="formState[attribute.targetValue]"
                      :placeholder="'请选择' + attribute.label"
                      @change="(e)=>Controllerchange(e, attribute.targetValue, picklistFieldMap[attribute.targetValue])"
                    >
                      <a-select-option
                        v-for="(option, optionIdx) in select[
                          attribute.targetValue
                        ] && select[attribute.targetValue].values"
                        :key="optionIdx"
                        :value="option.value"
                        >{{ option.label }}</a-select-option
                      >
                    </a-select>
                    <a-select
                      v-if="JSON.stringify(select[attribute.targetValue].controllerValues)!='{}'"
                      allowClear
                      v-model:value="formState[attribute.targetValue]"
                      :placeholder="'请选择' + attribute.label"
                      @change="(e)=>Controllerchange(e, attribute.targetValue, picklistFieldMap[attribute.targetValue])"
                    >
                      <a-select-option
                        v-for="(option, optionIdx) in select[
                          attribute.targetValue
                        ] && select[attribute.targetValue].values"
                        :key="optionIdx"
                        :value="option.value"
                        >{{ option.label }}</a-select-option
                      >
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    :name="attribute.targetValue"
                    v-else-if="
                      ['O', 'Y', 'U', 'Y_MD'].includes(
                        attribute.attributes.type
                      )
                    "
                    :label="attribute.label"
                    :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]"
                  >
                    <a-select
                      allowClear
                      v-model:value="formState[attribute.targetValue]"
                      :default-active-first-option="false"
                      :filter-option="false"
                      showSearch
                      @search="
                        (e) => {
                          searchlookup(e, attribute);
                        }
                      "
                      @dropdownVisibleChange="
                        (e) => {
                          searchlookup('', attribute);
                        }
                      "
                      :placeholder="'请选择' + attribute.label"
                    >
                      <template #suffixIcon></template>
                      <a-select-option
                        v-for="(option, optionIdx) in search[
                          attribute.targetValue
                        ]"
                        :key="optionIdx"
                        :value="option.ID"
                        >{{ option.Name }}</a-select-option
                      >
                    </a-select>
                    <div class="selectIcon">
                      <SearchOutlined
                        class="ant-select-suffix"
                        @click="handleOpenLook(attribute)"
                      />
                    </div>
                    <!-- <a-button @click="handleOpenLook(attribute)">搜索</a-button> -->
                  </a-form-item>
                  <a-form-item
                    :name="attribute.targetValue"
                    v-else-if="attribute.attributes.type == 'D'"
                    :label="attribute.label"
                    :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]"
                  >
                    <a-date-picker
                      valueFormat="YYYY-MM-DD"
                      :placeholder="'请选择' + attribute.label"
                      v-model:value="formState[attribute.targetValue]"
                    />
                  </a-form-item>
                  <!-- 时间类型 -->
                  <a-form-item :name="attribute.targetValue" v-else-if="attribute.attributes.type == 'F'"
                      :label="attribute.label" :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]">
                      <div class="timeGroup">
                          <a-form-item class="date">
                              <a-date-picker valueFormat="YYYY-MM-DD" :placeholder="'请选择' + attribute.label"
                              v-model:value="formState[attribute.targetValue+'_obj'].date" @change="(e)=>{changeGroupDate(e,attribute)}" />
                          </a-form-item>
                          <a-form-item class="time">
                              <a-time-picker v-model:value="formState[attribute.targetValue+'_obj'].time" valueFormat="HH:mm" format="HH:mm" @change="(e)=>{changeGroupTime(e,attribute)}" />
                          </a-form-item>
                      </div>
                  </a-form-item>
                  <a-form-item
                    :name="attribute.targetValue"
                    v-else-if="attribute.attributes.type == 'X'"
                    :label="attribute.label"
                    :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请输入' + attribute.label,
                      },
                    ]"
                  >
                    <a-textarea
                      :rows="4"
                      v-model:value="formState[attribute.targetValue]"
                    />
                  </a-form-item>
                  <a-form-item :name="attribute.targetValue" v-else-if="attribute.attributes.type == 'B'"
                    :label="attribute.label"
                    :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请输入' + attribute.label,
                      },
                    ]"
                  >
                      <a-checkbox v-model:checked="formState[attribute.targetValue]"></a-checkbox>
                  </a-form-item>
                  <a-form-item
                    :name="attribute.targetValue"
                    v-else
                    :label="attribute.label"
                    :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请输入' + attribute.label,
                      },
                    ]"
                  >
                    <a-input
                      v-model:value="formState[attribute.targetValue]"
                    ></a-input>
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
          <!-- <TEditor placeholder="请输入内容" /> -->
          <radio-dept
            v-if="isRadioDept"
            :isShow="isRadioDept"
            @cancel="cancelDeptModal"
            @selectVal="handleDeptParams"
          />
          <multiple-dept
            v-if="isMultipleDept"
            :isShow="isMultipleDept"
            @cancel="cancelDeptModal"
            @selectVal="handleDeptParams"
          />
          <radio-user
            v-if="isRadioUser"
            :isShow="isRadioUser"
            @cancel="cancelUserModal"
            @selectVal="handleUserParams"
            :localId="localId"
          ></radio-user>
          <Lookup-filter v-if="isLookup" :isShow="isLookup" :field="localId" :entityApiName="entityApiName" :lookEntityApiName="lookEntityApiName" :objectTypeCode="sObjectType" @cancel="isLookup=false" @select="handleSelectData"></Lookup-filter>
          <!-- <multiple-user :isShow="isMultipleUser" @cancel="cancelMuUserModal"  @selectVal="handleMuUserParams" /> -->
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
import RadioDept from "@/components/commonModal/RadioDept.vue";
import MultipleDept from "@/components/commonModal/MultipleDept.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import MultipleUser from "@/components/commonModal/MultipleUser.vue";
import LookupFilter from "@/components/commonModal/LookupFilter.vue";

import { message } from "ant-design-vue";

import TEditor from "@/components/TEditor.vue";

const getContent = (v) => {
  formState.contents = v;
};
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  title: String,
  objectTypeCode: String,
  id: String,
  entityId: String,
  entityApiName: String,
  relatedObjectAttributeName: String, // 默认值name
  relatedObjectAttributeValue: Object // 默认值value
});
console.log("props.entityId", props.entityId);
const formRef = ref();
const emit = defineEmits(["cancel"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  title: "新建部门变动",
  layoutList: [],
  list: {},
  select: {},
  search: {},
  height: document.documentElement.clientHeight - 300,
  isRadioDept: false,
  isMultipleDept: false,
  isRadioUser: false,
  localId: "",
  isMultipleUser: false,
  isLookup: false,
  sObjectType: "",
  recordObj: {}, // 记录当前点击的数据
  picklistFieldMap: {}, // 依赖字段关联关系
  selectFixed: {}, // select 固定不变的数据
  lookEntityApiName: ""
});
if(props.title){
  data.title = props.title;
}
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
  isLookup,
  sObjectType,
  recordObj,
  picklistFieldMap,
  selectFixed, lookEntityApiName
} = toRefs(data);
const formState = reactive({});
const handleData = (res) => {
  let { layout, record } = res.actions[0].returnValue;
  data.layoutList = layout.sections;
  data.list = JSON.parse(JSON.stringify(record.fields));
  layout.lookupAttributes.forEach((item) => {
    // data.search[item.name] = [
    //   { ID: data.list[item.name].Id, Name: data.list[item.name].Name },
    // ];
    // data.list[item.name] = {
    //   Id: data.list[item.name].Id,
    //   Name: data.list[item.name].Name,
    // };
  });
  // 赋值list
  // for (var key in data.list) {
  //   formState[key] = data.list[key].value;
  // }

  data.layoutList.forEach(item=>{
    item.rows.forEach(row=>{
      row.attributes.forEach(col=>{
        formState[col.localId] = data.list[col.localId]?.value;
        if(['O', 'Y', 'U', 'Y_MD'].includes(col.attributes.type)){
          console.log("data.list[col.localId]",data.list[col.localId]);
          // formState[col.localId] = data.list[col.localId];
          console.log("data.search[col.localId]", data.search[col.localId]);
          if(data.search[col.localId]==undefined){
            data.search[col.localId] = [];
          }
          data.search[col.localId].push({
            ID: data.list[col.localId].value,
            Name: data.list[col.localId].displayValue
          })
          if(props.relatedObjectAttributeName == col.localId){
            formState[col.localId] = props.relatedObjectAttributeValue.value;
            data.search[col.localId].push({
              ID: props.relatedObjectAttributeValue.value,
              Name: props.relatedObjectAttributeValue.name
            })
          }
        }
      })
    })
  })
}
const getLayoutInterface = () => {
  sessionStorage.removeItem("entityApiName");
  let d = {
      actions:[{
        id: "7366;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          entityApiName: props.entityApiName,
          defaultFieldValues: {
            entityId: props.entityId
          },
          mode: "CREATE",
          type: "FULL",
          layoutOverride: "",
          inContextOfComponent: "",
          pageSize: -1,
          offset: 0
        }
      }]
    }
  if(props.id){
    d.actions[0].params.recordId = props.id;
  }
  if(props.relatedObjectAttributeName){
    d.actions[0].params.defaultFieldValues[props.relatedObjectAttributeName] = props.relatedObjectAttributeValue.value;
  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.formCommon.layout, obj).then(res=>{
    res['entityApiName'] = props.entityApiName;
    if(props.id==''){
      sessionStorage.setItem("entityApiName", JSON.stringify(res));
    }
    handleData(res);
  })
}
const getLayout = () => {
  if (sessionStorage.getItem("entityApiName") && (props.id==''||props.id=='undefined')) {
    let res = JSON.parse(sessionStorage.getItem("entityApiName"));
    console.log('res', res);
    if(res.entityApiName == props.entityApiName){
      handleData(res);
    }else {
      getLayoutInterface();
    }
  }else {
    getLayoutInterface();
  };
};
getLayout();


const getPickerList = () => {
  let d = {
    actions:[{
      id: "2320;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        objectApiName: props.entityApiName,
        recordTypeId: ""
      }
    }]
  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.pickListValues, obj).then((res) => {
    let picklistFieldValues = res.actions[0].returnValue;
    data.selectFixed = JSON.parse(JSON.stringify(picklistFieldValues));
    data.select = picklistFieldValues;
    // let picklistFieldMap = res.actions[0].returnValue.picklistFieldMap;
    // for(let i = 0; i < picklistFieldMap.length; i++) {
    //   let item = picklistFieldMap[i];
    //   if(!data.picklistFieldMap[item.ControllerName]){
    //     data.picklistFieldMap[item.ControllerName] = [];
    //   }
    //   data.picklistFieldMap[item.ControllerName].push(item.DependentName);
    //   Controllerchange(formState[item.ControllerName], item.ControllerName, data.picklistFieldMap[item.ControllerName]);
    // };
    // console.log("data.picklistFieldMap",data.picklistFieldMap);
  });
};
getPickerList();
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
    data.layoutList.forEach(item=>{
        item.rows.forEach(row=>{
            row.attributes.forEach(col=>{
                // if(col.attributes.type=='L'){
                //     data.select[col.localId] = {
                //         values: picklistValuesMap[col.localId]
                //     };
                //     console.log("data.select[col.localId]", data.select[col.localId])
                // }
                if(col.attributes.type=='F'){
                    formState[col.localId+'_obj'] = {
                        date: "",
                        time: ""
                    }
                }
            })
        })
    })
  });
};
// getConfig();
// const getPickerList = () => {
//   proxy.$get(Interface.picklist, {}).then((res) => {
//     data.selectFixed = JSON.parse(JSON.stringify(res.actions[0].returnValue.picklistFieldValues));
//     data.select = res.actions[0].returnValue.picklistFieldValues;
//     let picklistFieldMap = res.actions[0].returnValue.picklistFieldMap;
//     for(let i = 0; i < picklistFieldMap.length; i++) {
//       let item = picklistFieldMap[i];
//       if(!data.picklistFieldMap[item.ControllerName]){
//         data.picklistFieldMap[item.ControllerName] = [];
//       }
//       data.picklistFieldMap[item.ControllerName].push(item.DependentName);
//       Controllerchange(formState[item.ControllerName], item.ControllerName, data.picklistFieldMap[item.ControllerName]);
//     };
//     // console.log("data.picklistFieldMap",data.picklistFieldMap);
//   });
// };
// getPickerList();

// 字段映射关系
const Controllerchange = (val, Controller, Dependents) => {
  // console.log("Controllerchange", val, Controller, Dependents);
  if(Dependents){
    for(var i = 0; i < Dependents.length; i++){
      var Dependent = Dependents[i];
      var isDependent = false;
      if (data.selectFixed[Dependent] && data.selectFixed[Dependent].values) {
        data.select[Dependent].values = [];
        data.selectFixed[Dependent].values.map(item=>{
          if(item.validFor.length && item.validFor.some(row=>row == data.selectFixed[Dependent].controllerValues[val])){
            data.select[Dependent].values.push(item);
            if(formState[Dependent] == item.value){
              isDependent = true;
            }
          }
        });
        // console.log("data.select[Dependent].values", data.select[Dependent].values);
      }
      if(isDependent == false) {
        formState[Dependent] = '';
      }
    }
    // console.log("data.select-Dependent", data.select);
  }
}
// const searchlookup = (search, attribute) => {
//   console.log(search, attribute);
//   proxy
//     .$get(Interface.uilook, {
//       Lktp: attribute.attributes.sObjectType,
//       Lksrch: search,
//     })
//     .then((res) => {
//       let listData = res.listData;
//       data.search[attribute.targetValue] = listData;
//     });
// };
const searchlookup = (search, attribute) => {
  console.log(search, attribute);
  let obj = {
    actions:[{
      id: "6129;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        objectApiName: props.entityApiName,
        fieldApiName: attribute.localId,
        pageParam: 1,
        pageSize: 25,
        q: "",
        searchType: "Recent",
        targetApiName: attribute.attributes.referencedEntityName,
        body: {
          sourceRecord: {
            apiName: props.entityApiName,
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
    // let listData = res.listData;
    // data.search[attribute.targetValue] = listData;
    let list = res.actions[0].returnValue.lookupResults.records;
    let arr = [];
    list.forEach(item=>{
        arr.push({
            ID: item.fields.Id.value,
            Name: item.fields.Name.value
        })
    });
    data.search[attribute.targetValue] = arr;
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
  let sObjectType = attribute.attributes.referencedEntityObjectTypeCode;
  if (sObjectType == 30020) {
    data.isRadioUser = true;
  } else if (sObjectType == 10) {
    data.isRadioDept = true;
  }else {
    data.lookEntityApiName = attribute.attributes.referencedEntityName;
    data.recordObj = attribute;
    data.sObjectType = sObjectType;
    data.isLookup = true;
  }
};
// 选中的数据
const handleSelectData = (e) => {
  data.isLookup = false;
  // console.log("选中的数据", e);
  // console.log("recordObj", data.recordObj, formState[data.recordObj.localId]);
  let { localId } = data.recordObj;
  let isExist = data.search[localId].some(item=>item.ID==e.LIST_RECORD_ID);
  if(!isExist){
    data.search[localId].push({
      ID: e.LIST_RECORD_ID,
      Name: e.Name
    })
  }
  formState[localId] = e.LIST_RECORD_ID;
  // formState[localId].Id = e.LIST_RECORD_ID;
  // formState[localId].value = e.LIST_RECORD_ID;
  // formState[localId].Name = e.Name;
  // formState[localId].displayValue = e.Name;
};
const handleSubmit = () => {
  formRef.value.validate().then(() => {
      // console.log("values", formState, toRaw(formState));
      let url = Interface.create;
      let d = {
          actions:[{
              id: "2919;a",
              descriptor: "",
              callingDescriptor: "UNKNOWN",
              params: {
                  // recordId: props.id,
                  recordInput:{
                      allowSaveOnDuplicate: false,
                      apiName: props.entityApiName,
                      objTypeCode: props.objectTypeCode,
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
        message.success("保存成功！");
        emit("success", false);
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
// 时间组合日期选择
const changeGroupDate = (e, attribute) => {
    formState[attribute.localId] = e + ' ' + formState[attribute.localId+'_obj'].time;
}
const changeGroupTime = (e, attribute) => {
    formState[attribute.localId] = formState[attribute.localId+'_obj'].date +' ' + e;
}
</script>
<style lang="less">
@import url("@/style/modal.less");
@import url("@/style/commonFormModal.less");
</style>
