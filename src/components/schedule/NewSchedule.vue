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
                <div class="sectionTitle">日历详细信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="OwningUser" label="被分配人" :rules="[{ required: true, message: '请选择被分配人' }]">
                            <a-select
                                mode="multiple"
                                allowClear
                                v-model:value="formState.OwningUser.Id"
                                :default-active-first-option="false"
                                :filter-option="false"
                                showSearch
                                @search=" (e) => { searchlookup(e, '30020'); } "
                                @dropdownVisibleChange=" (e) => { searchlookup('', '30020'); } "
                                :placeholder="'请选择被分配人'"
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
                                    @click="handleOpenLook(attribute)"
                                />
                                </div>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="Subject" label="主题" :rules="[{ required: true, message: '请输入主题' }]">
                            <a-input v-model:value="formState.Subject"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Phone" label="联系电话">
                            <a-input v-model:value="formState.Phone"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="CalendarType" label="日程类型" :rules="[{ required: true, message: '请选择日程类型' }]">
                            <a-select v-model:value="formState.CalendarType">
                                    <a-select-option v-for="(item,index) in CalendarTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
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
                        <a-form-item name="startTime" label="开始" :rules="[{ required: true, message: '请选择开始时间' }]">
                            <div class="timeWrap">
                                <div class="timeItem">
                                    <a-form-item name="StartDateTime" label="日期">
                                        <a-date-picker v-model:value="formState.StartDateTime" />
                                    </a-form-item>
                                </div>
                                <div class="timeItem">
                                    <a-form-item name="StartDateTime_time" label="时间">
                                        <a-time-picker v-model:value="formState.StartDateTime_time" />
                                    </a-form-item>
                                </div>
                            </div>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="RegardingObjectTypeCode" label="相关项">
                            <div class="menuRow">
                                <a-dropdown>
                                    <template #overlay>
                                      <a-menu @click="handleMenu">
                                        <a-menu-item v-for="(item,index) in menus" :key="item.key">
                                          <UserOutlined />
                                          {{item.name}}
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                    <a-button>
                                      {{currentMenu}}
                                      <DownOutlined />
                                    </a-button>
                                </a-dropdown>
                                <a-select
                                    class="aselect"
                                    v-model:value="formState.role"
                                    show-search
                                    mode="multiple"
                                    :placeholder="'搜索'+currentMenu"
                                    :default-active-first-option="false"
                                    :filter-option="false"
                                    :not-found-content="null"
                                    @search="handleSearch"
                                    @change="handleChange"
                                    @dropdownVisibleChange="getPeople"
                                >
                                    <template #suffixIcon><SearchOutlined class="ant-select-suffix" /></template>
                                    <a-select-option :value="item.ID" v-for="(item,index) in listData" :key="index">{{item.Name}}</a-select-option>
                                </a-select>
                            </div>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="endTime" label="结束" :rules="[{ required: true, message: '请选择结束时间' }]">
                            <div class="timeWrap">
                                <div class="timeItem">
                                    <a-form-item name="EndDateTime" label="日期">
                                        <a-date-picker v-model:value="formState.EndDateTime" />
                                    </a-form-item>
                                </div>
                                <div class="timeItem">
                                    <a-form-item name="EndDateTime_time" label="时间">
                                        <a-time-picker v-model:value="formState.EndDateTime_time" />
                                    </a-form-item>
                                </div>
                            </div>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="IsAllDayEvent" label="全天事件">
                          <a-checkbox v-model:checked="formState.IsAllDayEvent"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="IsAllDayEvent" label="私有">
                          <a-checkbox v-model:checked="formState.IsAllDayEvent"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="BgColor" label="背景色">
                            <a-input v-model:value="formState.BgColor"></a-input>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">提醒信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Reminder" label="提醒设置">
                            <a-checkbox v-model:checked="formState.Reminder"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">备注信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Description" label="内容">
                            <TEditor />
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
  import TEditor from "@/components/TEditor.vue";
  
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    folderName: String,
    folderPicker: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "新建日程",
    height: document.documentElement.clientHeight - 300,
    CalendarTypeList: [],
    OwningUserList: [],
    menus: [
        {
            key: 20290,
            name: "项目"
        },
        {
            key: 122,
            name: "流程事务"
        },
        {
            key: 5000,
            name: "会议"
        },
        {
            key: 1,
            name: "客户、合作伙伴"
        },
        {
            key: 2,
            name: "客户联系人"
        }
    ],
    currentMenu: "项目"
  });
  const {
    title,
    height, CalendarTypeList, OwningUserList, menus, currentMenu
  } = toRefs(data);
  const formState = reactive({
    RegardingObjectTypeCode: 20290,
    RegardingObjectId: {},
    Subject: '',
    StartDateTime: '',
    StartDateTime_time: '',
    ScheduledStart: '',
    ScheduledEnd: '',
    EndDateTime: '',
    EndDateTime_time: '',
    OwningUser: {},
    IsAllDayEvent: false,
    Location: '',
    Description: '',
    CalendarType: '',
    RegardingObjectIdName: '',
    BgColor: '',
    IsPrivate: false,
    Reminder: false,
    startTime: "",
    endTime: "",
    
  });
  
  const handleMenu = (e)=> {
        console.log("e",e);
        data.currentMenu = data.menus.find(item=>item.key==e.key).name;
}
  const searchlookup = (search, Lktp) => {
    proxy
      .$get(Interface.uilook, {
        Lktp: Lktp,
        Lksrch: search,
      })
      .then((res) => {
        let listData = res.listData;
        data.OwningUserList = listData;
      });
  };
  const getPickerList = () => {
    proxy.$get(Interface.schedule.pickList,{
        objectTypeCode: 4200
    }).then(res=>{
        var rows = res.actions[0].returnValue.picklistFieldValues.CalendarType;
        data.CalendarTypeList = rows.values;
    })
  }
  getPickerList();
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
              name: formState.name,
              folderPicker: props.folderPicker,
              sortNumber: formState.sortNumber,
              isPublic: formState.isPublic ? 1 : 0,
              description: formState.description
            },
            id: "",
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
  .timeWrap{
    display: flex;
    align-items: center;
    .timeItem:last-child{
        margin-left: 10px;
    }
  }
  .menuRow{
        display: flex;
        align-items: center;
        .ant-btn{
            border-radius: 4px 0 0 4px;
        }
        :deep .ant-select-selector{
            border-radius: 0 4px 4px 0 !important;
            margin-left: -1px !important;
        }
    }
  </style>
  