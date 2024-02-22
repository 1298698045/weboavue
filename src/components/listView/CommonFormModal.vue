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
                        :disabled="!option.show"
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
                      v-model:value="formState[attribute.targetValue].Id"
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
                  >
                    <a-textarea
                      :rows="4"
                      v-model:value="formState[attribute.targetValue]"
                    />
                  </a-form-item>
                  <a-form-item
                    :name="attribute.targetValue"
                    v-else
                    :label="attribute.label"
                  >
                    <a-input
                      v-model:value="formState[attribute.targetValue]"
                    ></a-input>
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
          <TEditor placeholder="请输入内容" />
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
          <Lookup-filter v-if="isLookup" :isShow="isLookup" :objectTypeCode="objectTypeCode" @cancel="isLookup=false" @select="handleSelectData"></Lookup-filter>
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
});
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
  isMultipleUser: true,
  isLookup: false,
  objectTypeCode: "",
  recordObj: {}, // 记录当前点击的数据
  picklistFieldMap: {}, // 依赖字段关联关系
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
  isLookup,
  objectTypeCode,
  recordObj,
  picklistFieldMap
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
getConfig();
const getPickerList = () => {
  proxy.$get(Interface.picklist, {}).then((res) => {
    data.select = res.actions[0].returnValue.picklistFieldValues;
    let picklistFieldMap = res.actions[0].returnValue.picklistFieldMap;
    for(let i = 0; i < picklistFieldMap.length; i++) {
      let item = picklistFieldMap[i];
      if(!data.picklistFieldMap[item.ControllerName]){
        data.picklistFieldMap[item.ControllerName] = [];
      }
      data.picklistFieldMap[item.ControllerName].push(item.DependentName);
      Controllerchange(formState[item.ControllerName], item.ControllerName, data.picklistFieldMap[item.ControllerName]);
    };
    // console.log("data.picklistFieldMap",data.picklistFieldMap);
  });
};
getPickerList();

const Controllerchange = (val, Controller, Dependents) => {
  // console.log("Controllerchange", val, Controller, Dependents);
  if(Dependents){
    for(var i = 0; i < Dependents.length; i++){
      var Dependent = Dependents[i];
      var isDependent = false;
      if (data.select[Dependent] && data.select[Dependent].values){
        for (var j = 0; j < data.select[Dependent].values.length; j++) {
          var item = data.select[Dependent].values[j];
          // console.log("item-validFor", item);
          item.show = false;
          for(var k = 0; k < item.validFor.length; k++) {
            var row =  item.validFor[k];
            if (row == data.select[Dependent].controllerValues[val]) {
              item.show = true;
              if (formState[Dependent] == item.value){
                isDependent = true;
              }
            }
          }
        }
      }
      if(isDependent == false) {
        formState[Dependent] = '';
      }
    }
    // console.log("data.select-Dependent", data.select);
  }
}
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
  }else {
    data.recordObj = attribute;
    data.objectTypeCode = sObjectType;
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
  formState[localId].Id = e.LIST_RECORD_ID;
  formState[localId].Name = e.Name;
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
