<template>
  <div class="PersonalInfoEdit">
    <div class="modalContainer">
      <div class="modalCenter" :style="{ height: height + 'px' }">
        <div class="form-legend-desktop">
          <abbr class="required">*</abbr>
          = 必填信息
        </div>
        <a-form
          :model="formState"
          ref="formRef"
          :label-col="labelCol"
          labelAlign="left"
        >
          <div class="section" v-for="(item, index) in layoutList" :key="index">
            <div class="sectionTitle">{{ item.title }}</div>
            <div class="sectionRow" v-for="(row, idx) in item.rows" :key="idx">
              <div
                class="sectionItem"
                v-for="(attribute, attributeIdx) in row.attributes"
                :key="attributeIdx"
              >
                <a-form-item
                  :name="attribute.targetValue"
                  v-if="
                    ['L', 'LT', 'DT'].includes(attribute.attributes.type) &&
                    select[attribute.targetValue]
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
                    :disabled="attribute.attributes.readonly"
                    v-if="
                      JSON.stringify(
                        select[attribute.targetValue].controllerValues
                      ) == '{}'
                    "
                    allowClear
                    v-model:value="formState[attribute.targetValue]"
                    :placeholder="'请选择' + attribute.label"
                    @change="
                      (e) =>
                        Controllerchange(
                          e,
                          attribute.targetValue,
                          picklistFieldMap[attribute.targetValue]
                        )
                    "
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
                  <!-- mode="multiple" -->
                  <a-select
                    v-if="
                      JSON.stringify(
                        select[attribute.targetValue].controllerValues
                      ) != '{}'
                    "
                    allowClear
                    v-model:value="formState[attribute.targetValue]"
                    :placeholder="'请选择' + attribute.label"
                    @change="
                      (e) =>
                        Controllerchange(
                          e,
                          attribute.targetValue,
                          picklistFieldMap[attribute.targetValue]
                        )
                    "
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
                    ['O', 'Y', 'U', 'Y_MD'].includes(attribute.attributes.type)
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
                    :disabled="attribute.attributes.readonly"
                    :allowClear="hasSearched"
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
                    @change="(e) => selectLookup(e, attribute)"
                    :placeholder="'请选择' + attribute.label"
                  >
                    <a-select-option
                      v-for="(option, optionIdx) in search[
                        attribute.targetValue
                      ]"
                      :key="optionIdx"
                      :value="option.ID"
                      >{{ option.Name }}</a-select-option
                    >
                    <template #suffixIcon>
                      <SearchOutlined @click.stop="handleOpenLook(attribute)" />
                    </template>
                  </a-select>
                  <!-- <div class="selectIcon">
                        <SearchOutlined
                          class="ant-select-suffix"
                          @click="handleOpenLook(attribute)"
                        />
                      </div> -->
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
                    :disabled="attribute.attributes.readonly"
                    valueFormat="YYYY-MM-DD"
                    :placeholder="'请选择' + attribute.label"
                    v-model:value="formState[attribute.targetValue]"
                  />
                </a-form-item>
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="attribute.attributes.type == 'Year'"
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请选择' + attribute.label,
                    },
                  ]"
                >
                  <a-date-picker
                    :disabled="attribute.attributes.readonly"
                    valueFormat="YYYY"
                    picker="year"
                    :placeholder="'请选择' + attribute.label"
                    v-model:value="formState[attribute.targetValue]"
                  />
                </a-form-item>
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="attribute.attributes.type == 'YearMonth'"
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请选择' + attribute.label,
                    },
                  ]"
                >
                  <a-date-picker
                    :disabled="attribute.attributes.readonly"
                    valueFormat="MM"
                    picker="month"
                    :placeholder="'请选择' + attribute.label"
                    v-model:value="formState[attribute.targetValue]"
                  />
                </a-form-item>
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="attribute.attributes.type == 'Month'"
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请选择' + attribute.label,
                    },
                  ]"
                >
                  <a-select
                    v-model:value="formState[attribute.targetValue]"
                    :disabled="attribute.attributes.readonly"
                  >
                    <a-select-option
                      v-for="number in 12"
                      :value="number"
                      :key="number"
                      >{{ number }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
                <!-- 时间类型 -->
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="attribute.attributes.type == 'F'"
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请选择' + attribute.label,
                    },
                  ]"
                >
                  <div class="timeGroup">
                    <a-form-item class="date">
                      <a-date-picker
                        :disabled="attribute.attributes.readonly"
                        valueFormat="YYYY-MM-DD"
                        :placeholder="'请选择' + attribute.label"
                        v-model:value="
                          formState[attribute.targetValue + '_obj'].date
                        "
                        @change="
                          (e) => {
                            changeGroupDate(e, attribute);
                          }
                        "
                      />
                    </a-form-item>
                    <a-form-item class="time">
                      <a-time-picker
                        :disabled="attribute.attributes.readonly"
                        v-model:value="
                          formState[attribute.targetValue + '_obj'].time
                        "
                        valueFormat="HH:mm"
                        format="HH:mm"
                        @change="
                          (e) => {
                            changeGroupTime(e, attribute);
                          }
                        "
                      />
                    </a-form-item>
                  </div>
                </a-form-item>
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="
                    attribute.attributes.type == 'J' ||
                    attribute.attributes.type == 'X'
                  "
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请输入' + attribute.label,
                    },
                  ]"
                >
                  <a-textarea
                    :disabled="attribute.attributes.readonly"
                    :rows="attribute.attributes.precision || 4"
                    v-model:value="formState[attribute.targetValue]"
                  />
                </a-form-item>
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="attribute.attributes.type == 'B'"
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请输入' + attribute.label,
                    },
                  ]"
                >
                  <a-checkbox
                    :disabled="attribute.attributes.readonly"
                    v-model:checked="formState[attribute.targetValue]"
                  ></a-checkbox>
                </a-form-item>
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="attribute.attributes.type == 'z'"
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请输入' + attribute.label,
                    },
                  ]"
                >
                  <TEditor
                    :disabled="attribute.attributes.readonly"
                    :placeholder="'请输入' + attribute.label"
                    :value="formState[attribute.targetValue]"
                    @input="(e) => inputEditor(e, attribute.targetValue)"
                  />
                </a-form-item>
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="attribute.attributes.type == 'ColorPicker'"
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请选择' + attribute.label,
                    },
                  ]"
                >
                  <div class="colorFlex">
                    <el-color-picker
                      :disabled="attribute.attributes.readonly"
                      v-model="formState[attribute.targetValue]"
                    />
                    <a-input
                      :disabled="attribute.attributes.readonly"
                      v-model:value="formState[attribute.targetValue]"
                      style="width: 82px; margin-left: 4px"
                    ></a-input>
                  </div>
                </a-form-item>
                <a-form-item
                  :name="attribute.targetValue"
                  v-else-if="attribute.attributes.type == 'ImagePicker'"
                  :label="attribute.label"
                  :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请选择' + attribute.label,
                    },
                  ]"
                >
                  <div
                    class="assets-icon-editor"
                    :class="{ active: formState[attribute.targetValue] != '' }"
                    @click="handleOpenImg(attribute)"
                  >
                    <div class="assets-icon-editor-picicon">
                      <img
                        v-if="formState[attribute.targetValue]"
                        :src="formState[attribute.targetValue]"
                        alt=""
                      />
                      <span class="assets-icon" v-else>
                        <PlusOutlined />
                      </span>
                      <div
                        class="mask-edit"
                        v-if="formState[attribute.targetValue]"
                      >
                        <EditOutlined />
                        <span
                          class="delete-icon"
                          @click.stop="clearImgSrc(attribute)"
                        >
                          <CloseOutlined />
                        </span>
                      </div>
                    </div>
                  </div>
                  <a-input
                    :disabled="attribute.attributes.readonly"
                    v-model:value="formState[attribute.targetValue]"
                  ></a-input>
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
                    :disabled="attribute.attributes.readonly"
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
        <Lookup-filter
          v-if="isLookup"
          :isShow="isLookup"
          :field="localId"
          :entityApiName="entityApiName"
          :lookEntityApiName="lookEntityApiName"
          :objectTypeCode="sObjectType"
          @cancel="isLookup = false"
          @select="handleSelectData"
        ></Lookup-filter>
        <!-- <multiple-user :isShow="isMultipleUser" @cancel="cancelMuUserModal"  @selectVal="handleMuUserParams" /> -->
        <SelectImages
          v-if="isImageModal"
          :isShow="isImageModal"
          @cancel="isImageModal = false"
          @selectImg="handleSetImg"
        />
      </div>
    </div>
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
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import RadioDept from "@/components/commonModal/RadioDept.vue";
import MultipleDept from "@/components/commonModal/MultipleDept.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import MultipleUser from "@/components/commonModal/MultipleUser.vue";
import LookupFilter from "@/components/commonModal/LookupFilter.vue";
import SelectImages from "@/components/commonModal/SelectImages.vue";
import dayjs from "dayjs";
import { message } from "ant-design-vue";
import TEditor from "@/components/TEditor.vue";

const getContent = (v) => {
  formState.contents = v;
};
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
//console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  title: String,
  objectTypeCode: String,
  id: String,
  entityId: String,
  entityApiName: String,
  relatedObjectAttributeName: String, // 默认值name
  relatedObjectAttributeValue: Object, // 默认值value
  defaultFieldValues: {
    type: Object,
    default: {},
  },
});
//console.log("props.entityId", props.entityId);
const formRef = ref();
const emit = defineEmits(["refreshData"]);

const data = reactive({
  title: "",
  layoutList: [],
  list: {},
  select: {},
  search: {},
  height: document.documentElement.clientHeight - 165,
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
  lookEntityApiName: "",
  targetApiName: "",
  targetObjectTypeCode: "",
  hasSearched: false, // 标记触发搜索
  isImageModal: false,
});
if (props.title) {
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
  selectFixed,
  lookEntityApiName,
  targetApiName,
  targetObjectTypeCode,
  hasSearched,
  isImageModal,
} = toRefs(data);
const formState = reactive({});

const inputEditor = (e, field) => {
  formState[field] = e;
};

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

  data.layoutList.forEach((item) => {
    item.rows.forEach((row) => {
      row.attributes.forEach((col) => {
        formState[col.localId] = data.list[col.localId]?.value;
        if (["O", "Y", "U", "Y_MD"].includes(col.attributes.type)) {
          //console.log("data.list[col.localId]", data.list[col.localId]);
          // formState[col.localId] = data.list[col.localId];
          //console.log("data.search[col.localId]", data.search[col.localId]);
          if (data.search[col.localId] == undefined) {
            data.search[col.localId] = [];
          }
          if (data.list[col.localId] && data.list[col.localId].value) {
            data.search[col.localId].push({
              ID: data.list[col.localId].value,
              Name: data.list[col.localId].displayValue,
            });
          }
          if (props.relatedObjectAttributeName == col.localId) {
            formState[col.localId] = props.relatedObjectAttributeValue.value;
            data.search[col.localId].push({
              ID: props.relatedObjectAttributeValue.value,
              Name: props.relatedObjectAttributeValue.name,
            });
          }
        }
        if (col.attributes.type == "F") {
          formState[col.localId + "_obj"] = {
            date: "",
            time: "",
          };
          if (data.list[col.localId] && data.list[col.localId].value) {
            let dateVal = data.list[col.localId].value;
            let date = dayjs(dateVal).format("YYYY-MM-DD");
            let time = dayjs(dateVal).format("hh:mm:ss");
            formState[col.localId + "_obj"] = {
              date,
              time,
            };
          }
        }
      });
    });
  });
};
const getLayoutInterface = () => {
  sessionStorage.removeItem("entityApiName");
  let d = {
    actions: [
      {
        id: "7366;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          entityApiName: props.entityApiName,
          defaultFieldValues: {
            entityId: "",
          },
          mode: "CREATE",
          type: "FULL",
          layoutOverride: "00000000-0000-0000-0000-000000080001",
          inContextOfComponent: "",
          pageSize: -1,
          offset: 0,
        },
      },
    ],
  };
  if (props.id) {
    d.actions[0].params.recordId = props.id;
  }
  if (props.relatedObjectAttributeName) {
    d.actions[0].params.defaultFieldValues[props.relatedObjectAttributeName] =
      props.relatedObjectAttributeValue.value;
  }
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.formCommon.layout, obj).then((res) => {
    res["entityApiName"] = props.entityApiName;
    if (props.id == "") {
      sessionStorage.setItem("entityApiName", JSON.stringify(res));
    }
    handleData(res);
  });
};
const getLayout = () => {
  if (
    sessionStorage.getItem("entityApiName") &&
    (props.id == "" || props.id == "undefined")
  ) {
    let res = JSON.parse(sessionStorage.getItem("entityApiName"));
    console.log("res", res);
    if (
      res.entityApiName &&
      props.entityApiName &&
      res.entityApiName == props.entityApiName
    ) {
      handleData(res);
    } else {
      getLayoutInterface();
    }
  } else {
    getLayoutInterface();
  }
};

const getPickerList = () => {
  let d = {
    actions: [
      {
        id: "2320;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: props.entityApiName,
          recordTypeId: "",
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.pickListValues, obj).then((res) => {
    let { picklistFieldValues, picklistFieldControllers } =
      res.actions[0].returnValue;
    data.selectFixed = JSON.parse(JSON.stringify(picklistFieldValues));
    data.select = picklistFieldValues;
    let picklistFieldMap = picklistFieldControllers;
    for (let i = 0; i < picklistFieldMap.length; i++) {
      let item = picklistFieldMap[i];
      if (!data.picklistFieldMap[item.ControllerName]) {
        data.picklistFieldMap[item.ControllerName] = [];
      }
      data.picklistFieldMap[item.ControllerName].push(item.DependentName);
      Controllerchange(
        formState[item.ControllerName],
        item.ControllerName,
        data.picklistFieldMap[item.ControllerName]
      );
    }
    //console.log("data.picklistFieldMap", data.picklistFieldMap);
  });
};

const getData = () => {
  getLayout();
  getPickerList();
};
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
    data.layoutList.forEach((item) => {
      item.rows.forEach((row) => {
        row.attributes.forEach((col) => {
          // if(col.attributes.type=='L'){
          //     data.select[col.localId] = {
          //         values: picklistValuesMap[col.localId]
          //     };
          //     console.log("data.select[col.localId]", data.select[col.localId])
          // }
          if (col.attributes.type == "F") {
            formState[col.localId + "_obj"] = {
              date: "",
              time: "",
            };
          }
        });
      });
    });
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
  console.log("Controllerchange", val, Controller, Dependents);
  if (Dependents) {
    for (var i = 0; i < Dependents.length; i++) {
      var Dependent = Dependents[i];
      let textVal;
      for (let key in data.selectFixed[Dependent].controllerValues) {
        if (val == data.selectFixed[Dependent].controllerValues[key]) {
          textVal = key;
        }
      }
      console.log("textVal", textVal);
      var isDependent = false;
      if (data.selectFixed[Dependent] && data.selectFixed[Dependent].values) {
        data.select[Dependent].values = [];
        data.selectFixed[Dependent].values.map((item) => {
          if (
            item.validFor.length &&
            item.validFor.some(
              (row) =>
                row == data.selectFixed[Dependent].controllerValues[textVal]
            )
          ) {
            data.select[Dependent].values.push(item);
            // (formState[Dependent] ||= []).push(item.value);
            if (formState[Dependent] == item.value) {
              isDependent = true;
            }
          }
        });
        // console.log("data.select[Dependent].values", data.select[Dependent].values);
      }
      if (isDependent == false) {
        formState[Dependent] = "";
      }
    }
    // console.log("data.select-Dependent", data.select);
  }
};
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
    actions: [
      {
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
                RecordTypeId: "",
              },
            },
          },
        },
      },
    ],
  };
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.lookup, d).then((res) => {
    // let listData = res.listData;
    // data.search[attribute.targetValue] = listData;
    let list = res.actions[0].returnValue.lookupResults.records;
    let arr = [];
    list.forEach((item) => {
      arr.push({
        ID: item.fields.Id.value,
        Name: item.fields.Name.value,
      });
    });
    data.search[attribute.targetValue] = arr;
  });
};

onMounted(() => {
  getData();
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 180;
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
  if (data.search[data.localId]) {
    var isEmpty = data.search[data.localId].some(
      (item) => item.ID == params.ID
    );
    if (!isEmpty) {
      data.search[data.localId].push({
        ID: params.ID,
        Name: params.Name,
      });
    }
  } else {
    data.search[data.localId] = [];
    data.search[data.localId].push({
      ID: params.ID,
      Name: params.Name,
    });
  }
  formState[data.localId] = params.ID;
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
  formState[data.localId] = params.id;
  var isEmpty = data.search[data.localId].some((item) => item.ID == params.id);
  if (!isEmpty) {
    data.search[data.localId].push({
      ID: params.id,
      Name: params.name,
    });
  }
  selectLookup(params.id, {
    localId: data.localId,
    attributes: {
      referencedEntityName: data.targetApiName,
      referencedEntityObjectTypeCode: data.targetObjectTypeCode,
    },
  });
  formRef.value.validate([data.localId]);
};
const getMapFieldValues = async (
  objectApiName,
  objectFieldName,
  objectFieldValue,
  targetApiName,
  targetObjectTypeCode
) => {
  try {
    let obj = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            objectApiName: objectApiName,
            objectFieldName: objectFieldName,
            objectFieldValue: objectFieldValue,
            targetApiName: targetApiName,
            targetObjectTypeCode: targetObjectTypeCode,
          },
        },
      ],
    };
    let d = {
      message: JSON.stringify(obj),
    };
    let result;
    const res = await proxy.$post(Interface.getMapFieldValues, d);
    if (res && res.actions[0].returnValue) {
      result = res.actions[0].returnValue;
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const selectLookup = async (value, attribute) => {
  console.log("value, attribute", value, attribute);
  let objectFieldName = attribute.localId;
  let targetApiName = attribute.attributes.referencedEntityName;
  let targetObjectTypeCode =
    attribute.attributes.referencedEntityObjectTypeCode;
  const mapFields = await getMapFieldValues(
    props.entityApiName,
    objectFieldName,
    value,
    targetApiName,
    targetObjectTypeCode
  );
  console.log("mapFields", mapFields);
  for (let key in mapFields) {
    let row = "";
    data.layoutList.forEach((item) => {
      item.rows.forEach((v) => {
        v.attributes.forEach((l) => {
          if (l.localId == key) {
            row = l;
          }
        });
      });
    });
    if (row) {
      let type = row.attributes.type;
      if (type == "U" || type == "O" || type == "Y" || type == "Y_MD") {
        const { value, displayValue } = mapFields[key];
        const isExist = data.search[key].some((v) => v.ID == value);
        if (!isExist) {
          let obj = {
            ID: value,
            Name: displayValue,
          };
          data.search[key].push(obj);
        }
      }
      formState[key] = mapFields[key].value;
    }
  }
};
// 多选用户
const handleMuUserParams = (params) => {};
// 查找类型打开弹窗
const handleOpenLook = (attribute) => {
  if(attribute.attributes.readonly){ return false }
  data.hasSearched = true;
  let localId = attribute.localId;
  data.localId = localId;
  data.targetApiName = attribute.attributes.referencedEntityName;
  data.targetObjectTypeCode =
    attribute.attributes.referencedEntityObjectTypeCode;
  let sObjectType = attribute.attributes.referencedEntityObjectTypeCode;
  if (sObjectType == 30020) {
    data.isRadioUser = true;
  } else if (sObjectType == 10) {
    data.isRadioDept = true;
  } else {
    data.lookEntityApiName = attribute.attributes.referencedEntityName;
    data.recordObj = attribute;
    data.sObjectType = sObjectType;
    data.isLookup = true;
  }
};
// 选中的数据
const handleSelectData = (e) => {
  data.isLookup = false;
  console.log("选中的数据", e);
  // console.log("recordObj", data.recordObj, formState[data.recordObj.localId]);
  let { localId } = data.recordObj;
  let isExist = data.search[localId].some(
    (item) => item.ID == e.LIST_RECORD_ID
  );
  if (!isExist) {
    data.search[localId].push({
      ID: e.LIST_RECORD_ID,
      Name: e.DisplayName || e.Name,
    });
  }
  formState[localId] = e.LIST_RECORD_ID;
  // formState[localId].Id = e.LIST_RECORD_ID;
  // formState[localId].value = e.LIST_RECORD_ID;
  // formState[localId].Name = e.Name;
  // formState[localId].displayValue = e.Name;
  selectLookup(e.LIST_RECORD_ID, {
    localId: e.LIST_RECORD_ID,
    attributes: {
      referencedEntityName: data.targetApiName,
      referencedEntityObjectTypeCode: data.targetObjectTypeCode,
    },
  });
  formRef.value.validate([localId]);
};

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      // console.log("values", formState, toRaw(formState));
      // console.log("data.layoutList", data.layoutList);
      let fields = {};
      data.layoutList.forEach((item) => {
        item.rows.forEach((row) => {
          row.attributes.forEach((col) => {
            if (
              ["O", "Y", "U", "Y_MD"].includes(col.attributes.type) &&
              !col.attributes.required &&
              formState[col.localId] == ""
            ) {
            } else {
              fields[col.localId] = formState[col.localId];
            }
          });
        });
      });
      let url = Interface.create;
      let d = {
        actions: [
          {
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              // recordId: props.id,
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName: props.entityApiName,
                objTypeCode: props.objectTypeCode,
                fields: fields,
              },
            },
          },
        ],
      };
      if (props.id) {
        url = Interface.edit;
        d.actions[0].params.recordId = props.id;
      }
      let obj = {
        message: JSON.stringify(d),
      };
      proxy.$post(url, obj).then((res) => {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].state &&
          res.actions[0].state == "SUCCESS"
        ) {
          message.success("保存成功！");
          getData();
          emit("refreshData", "");
        } else {
          if (
            res &&
            res.actions &&
            res.actions[0] &&
            res.actions[0].state &&
            res.actions[0].errorMessage
          ) {
            message.error(res.actions[0].errorMessage);
          } else {
            message.error("保存失败！");
          }
        }
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
// 时间组合日期选择
const changeGroupDate = (e, attribute) => {
  formState[attribute.localId] =
    e + " " + formState[attribute.localId + "_obj"].time;
};
const changeGroupTime = (e, attribute) => {
  formState[attribute.localId] =
    formState[attribute.localId + "_obj"].date + " " + e;
};

const handleOpenImg = (attribute) => {
  console.log("attribute", attribute);
  let localId = attribute.localId;
  data.localId = localId;
  data.isImageModal = true;
};

const clearImgSrc = (attribute) => {
  let localId = attribute.localId;
  formState[localId] = "";
};

const handleSetImg = (params) => {
  formState[data.localId] = Interface.pathUrl + params.url;
};
defineExpose({ handleSubmit, getData });
</script>
<style lang="less">
//@import url("@/style/modal.less");
@import url("@/style/commonFormModal.less");
.colorFlex {
  display: flex;
}
</style>
<style lang="less" scoped>
.PersonalInfoEdit {
  .timeGroup {
    display: flex;
    .ant-form-item.time {
      width: 30%;
    }
    .ant-form-item.date {
      margin-right: 15px;
      flex: 1;
    }
  }
  .fh-section {
    margin-bottom: 8px;
    .fh-section-label {
      background: #f2f2f2;
      padding: 0 15px;
      line-height: 32px;
      border-radius: 4px;
    }
    .section-content {
      overflow: visible;
      visibility: visible;
      opacity: 1;
      height: auto;
      .sectionRow {
        padding: 0 16px;
        display: flex;
        .sectionCol {
          margin-left: 0;
          margin-right: 16px;
          padding: 8px 4px;
          flex: 1 1 0%;
          min-width: 0;
          border-bottom: 1px solid #c9c9c9;
          display: flex;
          align-items: center;
          .sectionCol_label {
            width: 23%;
          }
          .sectionCol_body {
            display: flex;
            align-items: center;
            .ownerName {
              display: flex;
              .uiImage {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 4px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              a {
                margin: 0 2px;
                color: #0b5cab;
              }
            }
          }
        }
      }
    }
  }
  .sectionTitle {
    width: 100%;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    border-radius: 0;
    font-size: 14px;
    color: #868686;
    border-bottom: 1px solid #e2e2e2;
    background-color: #f4faff;
    border-left: 2px solid #2b9dec;
  }
}
</style>
