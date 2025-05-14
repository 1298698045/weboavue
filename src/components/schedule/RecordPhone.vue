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
      <div class="modalContainer scheduleModalContainer">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item
                    name="Subject"
                    label="主题"
                    :rules="[{ required: true, message: '请输入主题' }]"
                  >
                    <a-input v-model:value="formState.Subject"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="Phone" label="联系电话">
                    <a-input v-model:value="formState.Phone"></a-input>
                  </a-form-item>
                </div>
              </div>
              <!-- <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Phone" label="联系电话">
                    <a-input v-model:value="formState.Phone"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item
                    name="CalendarType"
                    label="日程类型"
                    :rules="[{ required: true, message: '请选择日程类型' }]"
                  >
                    <a-select v-model:value="formState.CalendarType">
                      <a-select-option
                        v-for="(item, index) in CalendarTypeList"
                        :key="index"
                        :value="item.value"
                        >{{ item.label }}</a-select-option
                      >
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Location" label="位置">
                    <a-input v-model:value="formState.Location"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item
                    name="startTime"
                    label="开始时间"
                    :rules="[{ required: true, message: '请选择开始时间' }]"
                  >
                    <div class="timeWrap">
                      <div class="timeItem">
                        <a-date-picker
                            v-model:value="formState.StartDateTime"
                            :valueFormat="dateFormat"
                          />
                      </div>
                      <div class="timeItem">
                        <a-time-picker
                            v-model:value="formState.StartDateTime_time"
                            format="HH:mm"
                            :valueFormat="hourFormat"
                          />
                      </div>
                    </div>
                  </a-form-item>
                </div>
              </div> -->
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item
                    name="OwningUser"
                    label="名称"
                    :rules="[{ required: true, message: '请选择名称' }]"
                  >
                    <a-select
                      mode="multiple"
                      allowClear
                      v-model:value="formState.OwningUser"
                      :default-active-first-option="false"
                      :filter-option="false"
                      showSearch
                      @search="
                        (e) => {
                          searchlookup(e, '8', 'OwningUser');
                        }
                      "
                      @dropdownVisibleChange="
                        (e) => {
                          searchlookup('', '8', 'OwningUser');
                        }
                      "
                      :placeholder="'请选择名称'"
                    >
                      <template #suffixIcon></template>
                      <a-select-option
                        v-for="(option, optionIdx) in OwningUserList"
                        :key="optionIdx"
                        :value="option.ID"
                        >{{ option.Name }}</a-select-option
                      >
                    </a-select>
                    <div class="selectIcon">
                      <SearchOutlined
                        class="ant-select-suffix"
                        @click="handleOpenLook('8', 'OwningUser')"
                      />
                    </div>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="RegardingObjectTypeCode" label="相关项">
                    <div class="menuRow">
                      <a-dropdown>
                        <template #overlay>
                          <a-menu @click="handleMenu">
                            <a-menu-item
                              v-for="(item, index) in menus"
                              :num="index"
                              :key="item.key"
                            >
                              <!-- <UserOutlined /> -->
                              {{ item.name }}
                            </a-menu-item>
                          </a-menu>
                        </template>
                        <a-button :title="currentMenu">
                          <span class="menuRowText">{{ currentMenu }}</span>
                          <DownOutlined class="menuRowIcon" />
                        </a-button>
                      </a-dropdown>
                      <a-select
                        class="aselect aselect1"
                        v-model:value="formState.RegardingObjectId.Id"
                        show-search
                        :placeholder="'搜索' + currentMenu"
                        :default-active-first-option="false"
                        :filter-option="false"
                        :not-found-content="null"
                        @search="getSearchLook"
                        @dropdownVisibleChange="
                          (e) => {
                            getSearchLook('', e);
                          }
                        "
                      >
                        <template #suffixIcon
                          ><SearchOutlined class="ant-select-suffix"
                        /></template>
                        <a-select-option
                          :value="item.ID"
                          v-for="(item, index) in lookList"
                          :key="index"
                          :title="item.Name"
                          >{{ item.Name }}</a-select-option
                        >
                      </a-select>
                    </div>
                  </a-form-item>
                </div>
                <!-- <div class="sectionItem">
                  <a-form-item
                    name="endTime"
                    label="结束时间"
                    :rules="[{ required: true, message: '请选择结束时间' }]"
                  >
                    <div class="timeWrap">
                      <div class="timeItem">
                        <a-date-picker
                            v-model:value="formState.EndDateTime"
                            :valueFormat="dateFormat"
                          />
                      </div>
                      <div class="timeItem">
                        <a-time-picker
                            v-model:value="formState.EndDateTime_time"
                            :valueFormat="hourFormat"
                          />
                      </div>
                    </div>
                  </a-form-item>
                </div> -->
              </div>
              <!-- <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="IsAllDayEvent" label="全天事件">
                    <a-checkbox
                      v-model:checked="formState.IsAllDayEvent"
                    ></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="IsAllDayEvent" label="私有">
                    <a-checkbox
                      v-model:checked="formState.IsPrivate"
                    ></a-checkbox>
                  </a-form-item>
                </div>
              </div> -->
              <!-- <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="BgColor" label="背景色">
                    <div class="selectFlex">
                      <a-select
                        class="aselect"
                        v-model:value="formState.BgColor"
                        :default-active-first-option="false"
                        :filter-option="false"
                        :not-found-content="null"
                      >
                        <a-select-option
                          :value="item"
                          v-for="(item, index) in colorList"
                          :key="index"
                          :style="{ background: item }"
                        ></a-select-option>
                      </a-select>
                      <span class="suffixIcon">
                        <el-color-picker
                          v-model="formState.BgColor"
                        ></el-color-picker>
                      </span>
                    </div>
                  </a-form-item>
                </div>
              </div> -->
            </div>
            <!-- <div class="section">
              <div class="sectionTitle">提醒信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Reminder" label="提醒设置">
                    <a-checkbox
                      v-model:checked="formState.Reminder"
                    ></a-checkbox>
                  </a-form-item>
                </div>
              </div>
            </div> -->
            <div class="section">
              <!-- <div class="sectionTitle">备注信息</div> -->
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Description" label="备注">
                    <!-- <TEditor
                      :placeholder="'请输入内容'"
                      mode="simple"
                      @input="getEditorContent"
                    /> -->
                    <a-textarea
                      placeholder="请输入内容"
                      :rows="10"
                      v-model:value="formState.Description"
                    />
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
    <MultipleUsers
      v-if="isMultipleUser"
      :isShow="isMultipleUser"
      @cancel="isMultipleUser = false"
      @select="handleSelectUsers"
    />
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
import TEditor from "@/components/TEditor.vue";
import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
//console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  folderName: String,
  folderPicker: String,
});
const dateFormat = "YYYY-MM-DD";
const hourFormat = "HH:mm";
const changeDate = (e) => {
  console.log("e", e);
};
const formRef = ref();
const emit = defineEmits(["cancel"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  title: "记录电话",
  height: document.documentElement.clientHeight - 300,
  CalendarTypeList: [],
  OwningUserList: [],
  menus: [
    {
      key: 20290,
      name: "项目",
    },
    {
      key: 122,
      name: "流程事务",
    },
    {
      key: 5000,
      name: "会议",
    },
    {
      key: 1,
      name: "客户、合作伙伴",
    },
    {
      key: 2,
      name: "客户联系人",
    },
  ],
  currentMenu: "项目",
  currentKey: 20290,
  lookList: [],
  colorList: [
    "#e1b4e8",
    "#c2c9e7",
    "#a6d5f8",
    "#96dfd3",
    "#96e9b9",
    "#f9ea93",
    "#f9ce94",
    "#bc35bc",
    "#5679c1",
    "#3e8ede",
    "#00aea9",
    "#3eba4d",
    "#f6bc26",
    "#f7931e",
    "#570d8c",
    "#001970",
    "#0b2399",
    "#0a7476",
    "#0a6b51",
    "#b67d11",
    "#b75d0d",
  ],
  isMultipleUser: false,
});
const {
  isMultipleUser,
  title,
  height,
  CalendarTypeList,
  OwningUserList,
  menus,
  currentMenu,
  lookList,
  currentKey,
  colorList,
} = toRefs(data);
const formState = reactive({
  RegardingObjectTypeCode: 20290,
  RegardingObjectId: {},
  Subject: "",
  StartDateTime: "",
  StartDateTime_time: "",
  ScheduledStart: "",
  ScheduledEnd: "",
  EndDateTime: "",
  EndDateTime_time: "",
  OwningUser: [],
  IsAllDayEvent: false,
  Location: "",
  Description: "",
  CalendarType: "",
  RegardingObjectIdName: "",
  BgColor: "",
  IsPrivate: false,
  Reminder: false,
  startTime: "",
  endTime: "",
});
const getEditorContent = (e) => {
  formState.Description = e;
};
watch(
  () => formState.StartDateTime,
  (newVal, oldVal) => {
    formState.startTime = newVal + "" + formState.StartDateTime_time;
  },
  { deep: true }
);
watch(
  () => formState.StartDateTime_time,
  (newVal, oldVal) => {
    formState.startTime = formState.StartDateTime + "" + newVal;
  },
  { deep: true }
);
watch(
  () => formState.EndDateTime,
  (newVal, oldVal) => {
    formState.endTime = newVal + "" + formState.EndDateTime_time;
  },
  { deep: true }
);
watch(
  () => formState.EndDateTime_time,
  (newVal, oldVal) => {
    formState.endTime = formState.EndDateTime + "" + newVal;
  },
  { deep: true }
);
const handleMenu = (e) => {
  console.log("e", e);
  let item = data.menus.find((item) => item.key == e.key);
  data.currentMenu = item.name;
  data.currentKey = item.key;
  data.lookList = [];
};
const uniqu = (array, name) => {
  var arr = [];
  for (var j = 0; j < array.length; j++) {
    if (JSON.stringify(arr).indexOf(array[j][name]) == -1) {
      arr.push(array[j]);
    }
  }
  return arr;
};
const getSearchLook = (search) => {
  let obj = {
    actions: [
      {
        id: "6129;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: "ActivityPointer",
          fieldApiName: "RegardingObjectId",
          pageParam: 1,
          pageSize: 25,
          q: search,
          searchType: "Recent",
          targetApiName: "SystemUser",
          body: {
            sourceRecord: {
              apiName: "ActivityPointer",
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
  if (data.currentKey == "8") {
    obj.actions[0].params.targetApiName = "SystemUser";
  }
  if (data.currentKey == "5000") {
    obj.actions[0].params.targetApiName = "MeetingRec";
  }
  if (data.currentKey == "20290") {
    obj.actions[0].params.targetApiName = "Project";
  }
  if (data.currentKey == "122") {
    obj.actions[0].params.targetApiName = "WFProcessInstance";
  }
  if (data.currentKey == "1") {
    obj.actions[0].params.targetApiName = "Account";
  }
  if (data.currentKey == "2") {
    obj.actions[0].params.targetApiName = "Contact";
  }
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.lookup, d).then((res) => {
    let list = res.actions[0].returnValue.lookupResults.records;
    let arr = [];
    list.forEach((item) => {
      arr.push({
        ID: item.fields.Id.value,
        Name: item.fields.Name.value,
      });
    });
    data.lookList = data.lookList.concat(arr);
    data.lookList = uniqu(data.lookList, "ID");
    //console.log(data.lookList)
  });
};
const searchlookup = (search, Lktp, fieldApiName) => {
  let obj = {
    actions: [
      {
        id: "6129;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: "ActivityPointer",
          fieldApiName: fieldApiName,
          pageParam: 1,
          pageSize: 25,
          q: search,
          searchType: "Recent",
          targetApiName: "SystemUser",
          body: {
            sourceRecord: {
              apiName: "ActivityPointer",
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
  if (Lktp == "8") {
    obj.actions[0].params.targetApiName = "SystemUser";
  }
  if (Lktp == "5000") {
    obj.actions[0].params.targetApiName = "MeetingRec";
  }
  if (Lktp == "20290") {
    obj.actions[0].params.targetApiName = "Project";
  }
  if (Lktp == "122") {
    obj.actions[0].params.targetApiName = "WFProcessInstance";
  }
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.lookup, d).then((res) => {
    let list = res.actions[0].returnValue.lookupResults.records;
    let arr = [];
    list.forEach((item) => {
      arr.push({
        ID: item.fields.Id.value,
        Name: item.fields.Name.value,
      });
    });
    data[fieldApiName + "List"] = data[fieldApiName + "List"].concat(arr);
    data[fieldApiName + "List"] = uniqu(data[fieldApiName + "List"], "ID");
    //console.log(data[fieldApiName+'List'])
  });
};
const getPickerList = () => {
  let d = {
    actions: [
      {
        id: "2320;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: "ActivityPointer",
          recordTypeId: "",
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.pickListValues, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.picklistFieldValues
    ) {
      let picklistFieldValues = res.actions[0].returnValue.picklistFieldValues;
      data.CalendarTypeList = picklistFieldValues.CalendarType
        ? picklistFieldValues.CalendarType.values
        : [];
    }
  });
};

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
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
                        apiName: 'ActivityPointer',
                        objTypeCode: 4200,
                        fields: {
                            Subject: formState.Subject,
                            Description: formState.Description,
                            Phone:formState.Phone,
                            RegardingObjectTypeCode:data.currentKey,
                            RegardingObjectId:formState.RegardingObjectId&&formState.RegardingObjectId.Id&&formState.RegardingObjectId.Id.length?formState.RegardingObjectId.Id[0]:'',
                            // ScheduledStart: formState.StartDateTime+' '+formState.StartDateTime_time,
                            // ScheduledEnd: formState.EndDateTime+' '+formState.EndDateTime_time,
                            // IsAllDayEvent: formState.IsAllDayEvent,
                            // Reply:formState.Reply,
                            // DisplayStatus:formState.DisplayStatus,
                            // ReminderTime:formState.ReminderTime,
                            // CalendarType:formState.CalendarType,
                            // IsPrivate:formState.IsPrivate,
                            // RecurrenceType:formState.RecurrenceType
                        }
                    }
                }
            }]
        };
        if(props.id){
            url = Interface.edit;
            d.actions[0].params.recordId = props.id;
        }
        else{
            //d.actions[0].params.recordInput.fields.CalendarType=props.calendarType||'';
            d.actions[0].params.recordInput.fields.ActivityTypeCode=4201;
            // if(props.RegardingObjectId){
            //     d.actions[0].params.recordInput.fields.RegardingObjectTypeCode=formState.RegardingObjectTypeCode||props.RegardingObjectTypeCode;
            //     d.actions[0].params.recordInput.fields.RegardingObjectId=formState.RegardingObjectId.Id||props.RegardingObjectId;
            //     d.actions[0].params.recordInput.fields.RegardingObjectIdName=formState.RegardingObjectIdName||props.RegardingObjectIdName;
            //     d.actions[0].params.recordInput.fields.BgColor=props.BgColor;
            // }
        }
        var ids=formState.OwningUser&&formState.OwningUser.length?formState.OwningUser:[];
        if(ids&&ids.length){
            for(var i=0;i<ids.length;i++){
                d.actions[0].params.recordInput.fields.OwningUser=ids[i];
                let obj = {
                    message: JSON.stringify(d)
                }
                proxy.$post(url, obj).then((res) => {
                    //if(i==ids.length-1){
                        message.success("保存成功！");
                    //}
                });
            }
            emit("cancel", false);
        }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const handleOpenLook = (sObjectType, fieldApiName) => {
  if (sObjectType * 1 == 8) {
    data.isMultipleUser = true;
  }
};
//多选用户
const handleSelectUsers = (params) => {
  // console.log(params);
  params.forEach((item) => {
    if (JSON.stringify(formState.OwningUser).indexOf(item.id) == -1) {
      formState.OwningUser.push(item.id);
      data.OwningUserList.push({
        ID: item.id,
        Name: item.name,
      });
      data.OwningUserList = uniqu(data.OwningUserList, "ID");
    }
  });
  data.isMultipleUser = false;
};
onMounted(() => {
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 300;
  });
  getPickerList();
});
</script>
<style lang="less" scoped>
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
        //display: block !important;
        .ant-form-item-label {
          width: 80px;
        }
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
.timeWrap {
  display: flex;
  align-items: center;
  .timeItem:last-child {
    margin-left: 10px;
  }
}
.menuRow {
  display: flex;
  align-items: center;
  width: 310px;
  .ant-btn {
    border-radius: 4px 0 0 4px;
    max-width: 100px;
    padding-left: 10px;
    .menuRowText {
      width: 60px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
    }
    .menuRowIcon {
      position: relative;
      top: -5px;
    }
  }
  .aselect1 {
    flex: 1;
    max-width: calc(~"100% - 110px");
  }
  .ant-select-show-search:where(
      .css-dev-only-do-not-override-kqecok
    ).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-radius: 0 4px 4px 0 !important;
    margin-left: -1px !important;
  }
}
.selectFlex {
  width: 100%;
  position: relative;
  .suffixIcon {
    position: absolute;
    right: 5px;
  }
}
.scheduleModalContainer {
  .section .sectionRow .sectionItem :deep .ant-row {
    //display: block !important;
    .ant-form-item-label {
      width: 80px;
    }
  }
  .aselect1 {
    margin-left: 10px;
  }
  .timeWrap {
    width: 100%;
    .timeItem {
      flex: 1;
      :deep .ant-form-item-label {
        width: auto !important;
      }
    }
  }
}
</style>
