<template>
  <div class="CampaignSmsEditorWrap">
    <div class="preview-header">
      <div class="icon-circle-base">
        <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="" />
      </div>
      <div class="leftBox">
        <div class="title">
          <div>
            <span class="doc-title">
              {{ title }}
              <!-- <a-input v-model:value="detail.Title" :placeholder="'文档标题'" @change="handleSave(1)"></a-input> -->
            </span>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <a-button type="primary" class="ml10" @click="handleSave"
          >保存并发送</a-button
        >
        <a-button class="ml10" @click="closeEditor">关闭</a-button>
        <!-- <a-dropdown :trigger="['hover']" class="ml10">
          <span class="btn-drop">
            <UnorderedListOutlined style="color: #1d2129" />
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="handleNotes"> 备注 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown> -->
      </div>
    </div>
    <div class="detail-scroll">
      <div class="detail-bd">
        <div class="tabContainer containerForm" v-if="activeKey == 0">
          <div class="tableBox">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <!-- <div class="sectionTitle">基本信息</div> -->
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item
                      name="Name"
                      label="发送名称"
                      :rules="[{ required: true, message: '发送名称不能为空' }]"
                    >
                      <a-input
                        v-model:value="formState.Name"
                        class="ContentViewTemplateName"
                      ></a-input>
                    </a-form-item>
                  </div>
                  <div class="sectionItem">
                    <a-form-item
                      name="CreatedByName"
                      label="所有人"
                      :autoLink="false"
                    >
                      <a-input
                        v-model:value="formState.CreatedByName"
                        class="ContentViewTemplateName"
                        disabled
                      ></a-input>
                      <!-- {{ formState.CreatedByName }} -->
                    </a-form-item>
                  </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item
                      name="IsRecurrence"
                      label="发送时间"
                      :autoLink="false"
                      class="IsRecurrence"
                    >
                      <a-radio-group v-model:value="formState.IsRecurrence">
                        <a-radio value="1">立即发送</a-radio>
                        <a-radio value="2">定时发送</a-radio>
                      </a-radio-group>
                      <a-date-picker
                        v-if="
                          formState.IsRecurrence &&
                          formState.IsRecurrence * 1 == 2
                        "
                        v-model:value="formState.ScheduleOn"
                        show-time
                        valueFormat="YYYY-MM-DD HH:mm:ss"
                        placeholder="定时时间"
                      />
                    </a-form-item>
                  </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item
                      name="RestNum"
                      label="短信余额"
                      :autoLink="false"
                    >
                      <a-input
                        v-model:value="formState.RestNum"
                        class="ContentViewTemplateName"
                        disabled
                      ></a-input>
                      <!-- {{ formState.RestNum || 0 }} 条 -->
                    </a-form-item>
                  </div>
                  <div class="sectionItem">
                    <a-form-item name="Template" label="短信模板">
                      <div class="flex">
                        <a-select
                          v-model:value="formState.Template"
                          @change="TemplateChange"
                        >
                          <a-select-option
                            v-for="(option, optionIdx) in templateList"
                            :key="optionIdx"
                            :value="optionIdx"
                            >{{ option.Name }}</a-select-option
                          >
                        </a-select>
                        <a-button
                          type="link"
                          @click="handleDelete"
                          class="flexbtn"
                          >删除选中的模板</a-button
                        >
                        <a-button
                          type="link"
                          @click="handleEdit"
                          class="flexbtn"
                          >编辑选中的模板</a-button
                        >
                        <a-button type="link" @click="handleNew"
                          >添加新的模板</a-button
                        >
                      </div>
                    </a-form-item>
                  </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem sectionItem1">
                    <a-form-item
                      name="Message"
                      label="短信内容"
                      :rules="[{ required: true, message: '短信内容不能为空' }]"
                    >
                      <!-- <div class="ContentViewTemplateContent">
                        <Editor v-if="isEditor" :mode="'doc'" placeholder="" ref="editorRef" :height="height"
                          @input="getContent" />
                      </div> -->
                      <!-- <a-textarea
                        v-model:value="formState.Message"
                        :rows="5"
                        :maxLength="500"
                        class="ContentViewTemplateName"
                      ></a-textarea> -->
                      <!-- <div class="messageInfo">注意：单条短信70个字，多条短信67字一条，已经输入{{formState.Message.length||0}}字，最多可以输入500个字。</div> -->
                      <a-textarea
                        v-model:value="formState.Message"
                        :rows="7"
                        class="ContentViewTemplateName"
                      ></a-textarea>
                    </a-form-item>
                  </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item name="Suffix" label="短信内容后缀">
                      <a-input
                        v-model:value="formState.Suffix"
                        class="ContentViewTemplateName"
                      ></a-input>
                    </a-form-item>
                  </div>
                  <div class="sectionItem">
                    <a-form-item name="TestMobile" label="测试号码">
                      <div class="flex">
                        <a-input
                          v-model:value="formState.TestMobile"
                          class="ContentViewTemplateName"
                        ></a-input>
                        <a-button type="link">测试发送</a-button>
                      </div>
                    </a-form-item>
                  </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem sectionItem1">
                    <a-form-item
                      name="QueryList"
                      label="录入号码"
                      :rules="[{ required: true, message: '请录入号码' }]"
                      :autoLink="false"
                    >
                      <a-textarea
                        v-model:value="formState.QueryList"
                        :rows="6"
                        class="ContentViewTemplateName"
                      ></a-textarea>
                      <div class="messageInfo">注意：一行一个号码</div>
                    </a-form-item>
                  </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item
                      name="QueryList"
                      label="上传文件"
                      :rules="[{ required: true, message: '请选择文件' }]"
                      :autoLink="false"
                    >
                      <div class="flex">
                        <div class="uploadPanel">
                          <a-upload-dragger
                            v-show="fileList.length == 0"
                            accept=".xlsx,.xls"
                            list-type="picture-card"
                            v-model:file-list="fileList"
                            :headers="headers"
                            @change="changeFiles"
                            :data="uploadData"
                            :action="Interface.CampaignSms.upload"
                            :showUploadList="false"
                            name="file"
                            :before-upload="beforeUpload"
                          >
                            <div class="uploadRow">
                              <p class="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p class="ant-upload-text">
                                将文件拖到此处，或点击上传
                              </p>
                            </div>
                          </a-upload-dragger>
                          <div class="inboxFileList">
                            <div
                              class="inboxFileItem"
                              v-for="(item, index) in fileList"
                              :key="index"
                            >
                              <div class="leftImg">
                                <img src="/src/assets/img/filetype/Excel.png" />
                              </div>
                              <div class="rightFileInfo">
                                <div class="fileName rowEllipsis">
                                  {{ item.name }}
                                </div>
                                <div class="fileSize">
                                  {{ item.size ? (item.size / 1024).toFixed(2) : 0 }}kb
                                </div>
                                <div
                                  class="fileOptionShow"
                                  :title="item.name || ''"
                                >
                                  <div class="btns">
                                    <a-tooltip title="删除" placement="top">
                                      <a-button
                                        type="text"
                                        :icon="h(CloseOutlined)"
                                        @click="deleteFile(index)"
                                      ></a-button>
                                    </a-tooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a-button type="link" @click="handleDownLoadTemplate"
                          >下载模板</a-button
                        >
                      </div>
                    </a-form-item>
                  </div>
                </div>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <InfoNotes
      v-if="isNotes"
      :isShow="isNotes"
      :id="id"
      :objectTypeCode="'20026'"
      @cancel="cancelNotes"
    />
    <ChangeStatus
      :isShow="isStatus"
      v-if="isStatus"
      :id="id"
      :objectTypeCode="'20026'"
      @cancel="cancelStatus"
    />
    <InfoRemind
      v-if="isRemind"
      :isShow="isRemind"
      :id="id"
      @cancel="cancelRemind"
      :RegardingObjectIdName="formState.Name"
      :RegardingObjectTypeCode="'20026'"
    />
    <InfoAddClass
      v-if="isAddClass"
      :isShow="isAddClass"
      :id="id"
      :objectTypeCode="objectTypeCode"
      @cancel="cancelAddClass"
    />
    <RadioUser
      v-if="isRadioUser"
      :isShow="isRadioUser"
      @cancel="cancleRadio"
      @selectVal="handleSelectUser"
    />
    <Delete
      :isShow="isDelete"
      v-if="isDelete"
      :desc="deleteDesc"
      @cancel="cancelDelete"
      @ok="deleteOk"
      :sObjectName="sObjectName"
      :recordId="recordId"
      :objTypeCode="objectTypeCode"
      :external="external"
    />
    <CommonConfirm
      v-if="isConfirm"
      :isShow="isConfirm"
      :text="confirmText"
      :title="confirmTitle"
      @cancel="isConfirm = false"
      @ok="isConfirm = false"
      :id="id"
    />
    <MultipleUsers
      v-if="isMultipleUser"
      :isShow="isMultipleUser"
      @cancel="isMultipleUser = false"
      @select="handleSelectUsers"
    />
    <common-form-modal
      :isShow="isCommon"
      v-if="isCommon"
      @cancel="isCommon = false"
      :title="data.recordId2 ? '编辑' : '新建'"
      @success="getTemplate"
      :id="recordId2"
      :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName"
      :relatedObjectAttributeValue="''"
      :relatedObjectAttributeName="''"
    ></common-form-modal>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  defineEmits,
  toRaw,
  h,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import {
  UnorderedListOutlined,
  DownOutlined,
  UpOutlined,
  CaretDownOutlined,
  DeleteFilled,
  DeleteOutlined,
  PlusOutlined,
  LikeOutlined,
  TagOutlined,
  FileTextOutlined,
  NodeIndexOutlined,
  UserOutlined,
  ProfileOutlined,
  CarryOutOutlined,
  PaperClipOutlined,
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  InboxOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import Related from "@/components/detail/Related.vue";
import Info from "@/components/detail/Info.vue";
import InfoNotes from "@/components/commonModal/RelatedNote.vue";
import ChangeStatus from "@/components/information/ChangeStatus.vue";
import InfoRemind from "@/components/information/InfoRemind.vue";
import InfoAddClass from "@/components/information/InfoAddClass.vue";
import ReadRecord from "@/components/information/ReadRecord2.vue";
import DocLog from "@/components/documentAdmin/DocLog.vue";
import Comment from "@/components/detail/Comment2.vue";
import Editor from "@/components/TEditor.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
//import DetailInfoEdit from "@/components/detail/DetailInfoEdit.vue";
import Delete from "@/components/listView/Delete.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";
import { girdFormatterValue } from "@/utils/common.js";
const { proxy } = getCurrentInstance();
const editorRef = ref();
const route = useRoute();
const router = useRouter();
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    align: "center",
    width: 100,
  },
  {
    title: "部门",
    dataIndex: "businessUnitIdName",
    align: "center",
    width: 100,
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 80,
    align: "center",
  },
];
const dataSource = ref([]);
const columnsList = toRaw(columns);
const token = localStorage.getItem("token");
const data = reactive({
  tabs: [
    {
      label: "正文内容",
    },
    {
      label: "文档属性",
    },
    {
      label: "文档附件",
    },
  ],
  activeKey: 0,
  id: route.query.id,
  objectTypeCode: "20240",
  sObjectName: "SmsTemplate",
  detail: {},
  isNotes: false,
  isStatus: false,
  isRemind: false,
  isAddClass: false,
  isUserModal: false,
  fileCategorys: [],
  files: [],
  content: "",
  isDelete: false,
  deleteDesc: "确定要删除吗？",
  external: false,
  isRelaseInfo: false,
  isEditor: false,
  height: 0,
  FolderId: route.query.FolderId || "",
  isRadioUser: false,
  IsReply: false,
  isConfirm: false,
  confirmText: "",
  confirmTitle: "",
  title: "上传文件发送",
  FieldList: [],
  FieldListAll: [],
  SelectFieldId: "",
  searchVal: "",
  templateList: [],
  isMultipleUser: false,
  listData1: [],
  listData2: [],
  listData3: [],
  targetKeys: [],
  selectedKeys: [],
  rowSelectionConfig: {},
  searchVal2: "",
  rowSelectionConfig2: {},
  recordId: "",
  recordId2: "",
  isCommon: false,
  fileList: [],
  uploadData: {},
  headers: {
    Authorization: token,
    Token: token,
  },
  uploadId: "",
  receivers: [],
});
const {
  receivers,
  uploadId,
  headers,
  uploadData,
  fileList,
  isCommon,
  recordId2,
  recordId,
  targetKeys,
  selectedKeys,
  tabs,
  activeKey,
  id,
  objectTypeCode,
  detail,
  isNotes,
  isStatus,
  isRemind,
  isAddClass,
  isUserModal,
  fileCategorys,
  files,
  content,
  sObjectName,
  isDelete,
  deleteDesc,
  external,
  isRelaseInfo,
  isEditor,
  height,
  FolderId,
  isRadioUser,
  IsReply,
  isConfirm,
  confirmText,
  confirmTitle,
  title,
  FieldList,
  FieldListAll,
  SelectFieldId,
  searchVal,
  templateList,
  isMultipleUser,
  listData1,
  listData2,
  listData3,
  rowSelectionConfig,
  searchVal2,
  rowSelectionConfig2,
} = toRefs(data);
const ReadRecordLst = ref();
const DetailInfoEditRef = ref(null);
const expandIconPosition = ref("start");
const handleClick = (event) => {
  event.stopPropagation();
};
const formRef = ref();
const formState = reactive({
  Name: "",
  Message: "",
  CreatedByName: "",
  CreatedBy: "",
  Suffix: "",
  RestNum: "",
  Template: "",
  TestMobile: "",
  IsRecurrence: "1",
  ScheduleOn: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  QueryList: "",
  QueryList1: "",
  QueryList2: "",
  QueryList3: "",
});
const defaultContent = ``;
// const onSearch = (e) => {
//   data.listData1 = data.listData1.filter((item) => {
//     return item.label.indexOf(data.searchVal) !== -1;
//   });
// };
//转义
const escapeHtml = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
//反转义
const htmlDecode = (input) => {
  var e = document.createElement("div");
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};
const getDetail = () => {
  let d = {
    actions: [
      {
        id: "4270;a",
        descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: data.id,
          apiName: "CampaignSms",
          objTypeCode: 20026,
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.detail, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.fields
    ) {
      let fields = res.actions[0].returnValue.fields;
      formState.Name =
        fields.Name && fields.Name.value ? fields.Name.value : "";
      // formState.Message =
      //   fields.Message && fields.Message.value
      //     ? htmlDecode(fields.Message.value)
      //     : "";
      formState.Message =
        fields.Message && fields.Message.value ? fields.Message.value : "";
      formState.CreatedBy =
        fields.CreatedBy && fields.CreatedBy.value
          ? fields.CreatedBy.value
          : "";
      formState.CreatedByName =
        fields.CreatedBy && fields.CreatedBy.displayValue
          ? fields.CreatedBy.displayValue
          : "";
      formState.Suffix =
        fields.Suffix && fields.Suffix.value ? fields.Suffix.value : "";
      formState.RestNum =
        fields.RestNum && fields.RestNum.value ? fields.RestNum.value : "";
      formState.Template =
        fields.Template && fields.Template.value ? fields.Template.value : "";
      formState.TestMobile =
        fields.TestMobile && fields.TestMobile.value
          ? fields.TestMobile.value
          : 0;
      formState.IsRecurrence =
        fields.IsRecurrence && fields.IsRecurrence.value ? "2" : "1";
      formState.ScheduleOn =
        fields.ScheduleOn && fields.ScheduleOn.value
          ? dayjs(fields.ScheduleOn.value).format("YYYY-MM-DD HH:mm:ss")
          : null;
      formState.QueryList =
        fields.QueryList && fields.QueryList.value
          ? fields.QueryList.value
          : "";
    }
    // if (editorRef && editorRef.value) {
    //   if (formState.Content) {
    //     editorRef.value.content = formState.Content;
    //   } else {
    //     formState.Content = defaultContent;
    //     editorRef.value.content = formState.Content;
    //   }
    // }
  });
};
const getFileClass = () => {
  proxy
    .$get(Interface.information.attachmentCategory, {
      ObjectTypeCode: data.objectTypeCode,
    })
    .then((res) => {
      data.fileCategorys = res.returnValue.records;
    });
};
//getFileClass();
const getFiles = () => {
  proxy
    .$get(Interface.information.files, {
      id: data.id,
    })
    .then((res) => {
      data.files = res.listData;
    });
};
//getFiles();
// 关闭更改状态
const cancelStatus = (e) => {
  data.isStatus = e;
};
const cancelNotes = (e) => {
  data.isNotes = e;
};
const cancelRemind = (e) => {
  data.isRemind = e;
};
const cancelAddClass = (e) => {
  data.isAddClass = e;
};
// 更改状态
const changeStatus = () => {
  data.isStatus = true;
};
const handleNew = () => {
  data.recordId2 = "";
  data.isCommon = true;
};
const handleEdit = () => {
  data.recordId2 = data.recordId;
  data.isCommon = true;
};
const handleDelete = (e) => {
  data.isDelete = true;
};
const deleteOk = (e) => {
  getTemplate();
};
const cancelDelete = (e) => {
  data.isDelete = false;
};
// 预览
const handlePreview = () => {
  let url = router.resolve({
    name: "PreviewContent",
    query: {
      id: data.id,
      objectTypeCode: data.objectTypeCode,
    },
  });
  window.open(url.href);
};
// 提醒
const handleRemind = () => {
  data.isRemind = true;
};
// 备注
const handleNotes = () => {
  data.isNotes = true;
};
// 添加分类
const handleAddClass = () => {
  data.isAddClass = true;
};
const getContent = (e) => {
  //console.log('e', e);
  formState.Content = e;
};
const handleInvitation = () => {
  data.isRadioUser = true;
};
// 关闭发布弹窗
const cancleRadio = (e) => {
  data.isRadioUser = e;
};
const handleSelectUser = (params) => {
  console.log("params", params);
};

// 保存并发送
// const handleSave_old = (type) => {
//   if (formState.Name) {
//   } else {
//     message.error("模板名称不能为空！");
//     return;
//   }
//   if (formState.Message && formState.Message.trim().length) {
//   } else {
//     message.error("模板内容不能为空！");
//     return;
//   }
//   if (data.listData1 && data.listData1.length) {
//   } else {
//     message.error("单位通讯不能为空！");
//     return;
//   }
//   if (data.listData2 && data.listData1.length) {
//   } else {
//     message.error("个人通讯不能为空！");
//     return;
//   }
//   let url = Interface.create;
//   let d = {
//     actions: [
//       {
//         id: "2919;a",
//         descriptor: "",
//         callingDescriptor: "UNKNOWN",
//         params: {
//           recordInput: {
//             allowSaveOnDuplicate: false,
//             apiName: "CampaignSms",
//             objTypeCode: 20026,
//             fields: {
//               Name: formState.Name,
//               Message: formState.Message ? escapeHtml(formState.Message) : "",
//               CreatedBy: formState.CreatedBy,
//               Suffix: formState.Suffix,
//               TestMobile: formState.TestMobile,
//               IsRecurrence: formState.IsRecurrence * 1 == 2 ? true : false,
//               ScheduleOn: formState.ScheduleOn
//                 ? dayjs(formState.ScheduleOn).format("YYYY-MM-DD HH:mm:ss")
//                 : null,
//               QueryList: formState.QueryList,
//               Quantity: 1,
//               ValidNum: 1,
//               SentSmsNum: 1,
//               Status: 1,
//             },
//           },
//         },
//       },
//     ],
//   };
//   if (data.id) {
//     url = Interface.edit;
//     d.actions[0].params.recordId = data.id;
//     d.actions[0].params.recordInput.fields.ModifiedBy = userId;
//   }
//   let obj = {
//     message: JSON.stringify(d),
//   };
//   proxy.$post(url, obj).then((res) => {
//     //formRef.value.resetFields();
//     if (
//       res &&
//       res.actions &&
//       res.actions[0] &&
//       res.actions[0].state &&
//       res.actions[0].state == "SUCCESS"
//     ) {
//       message.success("发送成功！");
//       data.id = res.actions[0].returnValue.id || data.id || "";
//       setTimeout(function () {
//         let url = router.resolve({
//           path: "/lightning/o/CampaignSms",
//           query: {},
//         });
//         window.location.href = url.href;
//       }, 1000);
//     } else {
//       if (
//         res &&
//         res.actions &&
//         res.actions[0] &&
//         res.actions[0].state &&
//         res.actions[0].errorMessage
//       ) {
//         message.success(res.actions[0].errorMessage);
//       } else {
//         message.success("发送失败！");
//       }
//     }
//   });
// };
// 保存并发送
const handleSave = () => {
  if (formState.Name) {
  } else {
    message.error("模板名称不能为空！");
    return;
  }
  if (formState.Message && formState.Message.trim().length) {
  } else {
    message.error("模板内容不能为空！");
    return;
  }
  if (
    (data.fileList && data.fileList.length) ||
    (formState.QueryList && formState.QueryList.length)
  ) {
  } else {
    message.error("请上传文件或者手动录入号码！");
    return;
  }
  let url = Interface.CampaignSms.send;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          name: formState.Name,
          message: formState.Message ? formState.Message : "",
          testPhones: formState.TestMobile,
          scheduledOn: formState.ScheduleOn
            ? dayjs(formState.ScheduleOn).format("YYYY-MM-DD HH:mm:ss")
            : null,
          suffix: formState.Suffix,
        },
      },
    ],
  };
  if (data.fileList && data.fileList.length) {
    if (data.uploadId) {
      d.actions[0].params.id = data.uploadId;
    } else if (data.receivers && data.receivers.length) {
      d.actions[0].params.receiveObjects = { receivers: data.receivers };
    }
  } else if (formState.QueryList && formState.QueryList.length) {
    let receivers = [];
    let list = formState.QueryList.split("\n");
    if (list && list.length) {
      for (var i = 0; i < list.length; i++) {
        receivers.push({
          id: "",
          name: "",
          phone: list[i] || "",
        });
      }
    }
    d.actions[0].params.receiveObjects = { receivers: receivers };
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
      message.success("发送成功！");
      setTimeout(function () {
        let url = router.resolve({
          path: "/lightning/o/CampaignSms",
          query: {},
        });
        window.location.href = url.href;
      }, 1000);
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
        message.error("发送失败！");
      }
    }
  });
};
//关闭
const closeEditor = () => {
  window.close();
};
// 查看详情
const handleDetail = () => {
  let reUrl = router.resolve({
    path: "/lightning/r/Content/view",
    query: {
      id: data.id,
      objectTypeCode: data.objectTypeCode,
      FolderId: data.FolderId,
    },
  });
  window.open(reUrl.href);
};
//取消发布
const handleCancelRelease = () => {
  data.isConfirm = true;
  data.confirmText = "确定要取消发布吗？";
  data.confirmTitle = "取消发布";
};
const handleAddPeople = (index) => {
  data.index = index;
  data.isMultipleUser = true;
};
const cancelUserModal = (e) => {
  data.isMultipleUser = e;
};
// 多选用户
const handleSelectUsers = (params) => {
  // console.log("多选用户:", params);
  let addUsers = params.map((item) => {
    item.key = item.id;
    return item;
  });
  if (data.index * 1 == 1) {
    addUsers.forEach((item) => {
      let isBook = data.listData1.some((row) => row.key == item.key);
      if (!isBook) {
        data.listData1.push(item);
      }
    });
  } else {
    addUsers.forEach((item) => {
      let isBook = data.listData2.some((row) => row.key == item.key);
      if (!isBook) {
        data.listData2.push(item);
      }
    });
  }
  data.isMultipleUser = false;
};

const arrowup = (type, index) => {
  if (index != 0) {
    let list = data["listData" + type];
    let a = list[index];
    let b = list[index - 1];
    list[index - 1] = a;
    list[index] = b;
    data["listData" + type] = list;
  } else {
    message.error("已经到最顶了");
  }
};
const arrowdown = (type, index) => {
  if (index != data["listData" + type].length - 1) {
    let list = data["listData" + type];
    let a = list[index];
    let b = list[index + 1];
    list[index + 1] = a;
    list[index] = b;
    data["listData" + type] = list;
  } else {
    message.error("已经到最底了");
  }
};
const arrowDelete = (type, index) => {
  data["listData" + type].splice(index, 1);
};
const disabled = ref(false);
const handleChange = (nextTargetKeys, direction, moveKeys) => {
  // console.log("targetKeys: ", nextTargetKeys);
  // console.log("direction: ", direction);
  // console.log("moveKeys: ", moveKeys);
};
const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
  //console.log("sourceSelectedKeys: ", sourceSelectedKeys);
  //console.log("targetSelectedKeys: ", targetSelectedKeys);
};
const handleScroll = (direction, e) => {
  //console.log("direction:", direction);
  //console.log("target:", e.target);
};

const handleMoveUp = () => {
  let firstSelectedIndex = data.targetKeys.findIndex(
    (item) => item == data.selectedKeys[0]
  );
  if (firstSelectedIndex > 0) {
    const itemsToMove = data.selectedKeys.slice();
    console.log("itemsToMove", itemsToMove);
    for (const item of itemsToMove) {
      const currentIndex = data.targetKeys.indexOf(item);
      data.targetKeys.splice(currentIndex, 1);
      data.targetKeys.splice(currentIndex - 1, 0, item);
    }
  }
};
const handleMoveDown = () => {
  const lastSelectedIndex = data.targetKeys.indexOf(
    data.selectedKeys[data.selectedKeys.length - 1]
  );
  if (lastSelectedIndex < data.targetKeys.length - 1) {
    const itemsToMove = data.selectedKeys.slice().reverse();
    for (const item of itemsToMove) {
      const currentIndex = data.targetKeys.indexOf(item);
      data.targetKeys.splice(currentIndex, 1);
      data.targetKeys.splice(currentIndex + 1, 0, item);
    }
  }
};

const getGroup = () => {
  data.listData3 = [];
  let filterQuery = "\nIsPublic\teq\ttrue";
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "9",
      entityName: "Group",
      filterQuery: filterQuery,
      search: "",
      page: 1,
      rows: 100,
      displayColumns: "Name",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        var list = [];
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField") {
              item[cell] = girdFormatterValue(cell, item);
            }
          }
          list.push({
            id: item.id,
            key: item.id,
            title: item.Name,
          });
        }
        data.listData3 = list;
      }
    });
};
const getTemplate = () => {
  data.templateList = [];
  let filterQuery = "";
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "20240",
      entityName: "SmsTemplate",
      filterQuery: filterQuery,
      search: "",
      page: 1,
      rows: 100,
      displayColumns: "Name,Description",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        var list = [];
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField") {
              item[cell] = girdFormatterValue(cell, item);
            }
          }
          list.push(item);
        }
        data.templateList = list;
        if (!data.id) {
          formState.Template = 0;
          formState.Message = data.templateList[0].Description;
          data.recordId = data.templateList[0].id;
        }
      }
    });
};
const TemplateChange = (e) => {
  //console.log(e);
  formState.Template = e;
  formState.Message = data.templateList[e].Description;
  data.recordId = data.templateList[e].id;
};
const handleDownLoadTemplate = () => {
  let url = "/api/aura/general/template/export?entityName=CampaignSmsQueue";
  window.open(url);
};
const beforeUpload = (file, fileList) => {
  const totalFiles = data.fileList.length + fileList.length;
  if (totalFiles > 1) {
    message.error("最多只能上传1个文件");
    return false;
  }
};
const changeFiles = (e) => {
  console.log("changeFiles", e);
  if (e.file.status == "done") {
    message.success("上传成功！");
    if (
      e.file.response &&
      e.file.response.actions &&
      e.file.response.actions[0] &&
      e.file.response.actions[0].returnValue
    ) {
      data.uploadId = e.file.response.actions[0].returnValue.valueId || "";
      if (!data.uploadId && e.file.response.actions[0].returnValue.length) {
        data.receivers = e.file.response.actions[0].returnValue;
      }
    }
  }
};
const deleteFile = (index) => {
  data.fileList.splice(index, 1);
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  let userId = "";
  let userName = "";
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    userId = userInfo.userId;
    userName = userInfo.fullName;
  }
  getTemplate();
  formState.CreatedByName = userName;
  formState.CreatedBy = userId;
  formState.Suffix = window.localStorage.getItem("businessUnitName") || "";
  // let h = document.documentElement.clientHeight;
  // data.height = 300;
  // data.isEditor = true;
  // window.addEventListener("resize", () => {
  //   data.isEditor = false;
  //   let h = document.documentElement.clientHeight;
  //   data.height = 300;
  //   setTimeout(function () {
  //     data.isEditor = true;
  //     setTimeout(function () {
  //       getDetail();
  //     }, 100);
  //   }, 200);
  // });
});
</script>
<style lang="less" scoped>
.CampaignSmsEditorWrap {
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow: hidden;

  .preview-header {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e6eb;
    box-shadow: 0px 2px 8px 0px rgba(237, 239, 243, 1);
    z-index: 99 !important;
    padding: 6px 20px 0 20px;

    .icon-circle-base {
      width: 35px;
      height: 35px;
      background: #0079de;
      border-radius: 50%;
      margin-right: 0px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: 0px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .ant-tabs-nav {
      margin: 0;
    }

    .leftBox {
      min-width: 695px;
      flex: 1;

      .backText {
        color: var(--textColor);
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        padding-right: 10px;
      }

      .title {
        // margin-top: 5px;
        // height: 48px;
        display: flex;
        align-items: center;
        color: #1d2129;
        font-size: 14px;
        font-weight: normal;
        margin: 6px 0 3px 18px;
      }

      .ant-tabs .ant-tabs-nav::before {
        display: none;
      }

      .ant-tabs-tab {
        padding: 9px 8px !important;
        margin-right: 24px !important;
      }
    }
  }

  .detail-scroll {
    overflow: auto;
    height: calc(~"100% - 159px");
    margin-top: 50px;
    overflow: auto;

    //.detail-bd {
    // padding: 24px;
    // height: 100%;
    //}

    .tabContainer {
      min-height: 197px;
      height: 100%;
      display: flex;
      padding-bottom: 20px;
      position: relative;
      padding: 24px;

      .tableBox {
        // flex: 1;
        background: #fff;
        border-radius: 4px;
        margin-right: 12px;
        width: calc(~"100% - 0px");
        //overflow: auto;
        padding: 20px 15px;
        margin-right: 5px;

        .sectionItem1 {
          border: 1px solid #dedede;

          .ant-form-item {
            margin-bottom: 0;
          }
        }

        .ContentViewTemplateContent {
          display: flex;

          .wea-doc-mould-rich-text-right-list {
            width: 180px;
            right: 0;
            top: 0;
            bottom: 0;
            display: inline-block;
            position: absolute;
            height: calc(~"100% + 0px");
          }

          .wea-doc-mould-rich-text-right-list .special-field-wrapper > div {
            height: 100%;
          }

          .wea-input-focus {
            height: 30px;
            line-height: 32px;
            position: relative;
            background-color: #fff;
            display: inline-block;
            width: 100%;
          }

          .ant-input-wrapper {
            width: 100%;
            display: inline-block;
            height: 100%;

            .ant-input-affix-wrapper {
              padding-left: 8px !important;

              :deep #form_item_Content {
                border: none !important;
                font-size: 12px;
                width: 114px !important;
              }

              :deep .ant-input-clear-icon {
                position: relative;
                right: 0px;
              }
            }
          }

          .special-field-wrapper {
            height: 100%;
          }

          .wea-input-focus .ant-input-wrapper > input {
            width: 100%;
            display: inline-block;
            //padding-right: 45px;
            -webkit-box-shadow: none;
            box-shadow: none;
            //border: 1px solid #d9d9d9;
            height: 30px;
            // position: relative;
            // top: 1px;
            //text-indent: 10px;
            font-size: 12px;
          }

          .wea-input-focus > .wea-input-focus-btn {
            position: absolute;
            top: 2px;
            right: 2px;
            height: 24px;
            line-height: 34px;
            padding-top: 0;
            padding-bottom: 0;
            padding-left: 5px !important;
            border: 0;
            padding-right: 5px;
            background: #fff;
            z-index: 2;
          }

          .wea-input-focus > .wea-input-focus-btn .anticon-search {
            display: inline-block;
            font-style: normal;
            vertical-align: baseline;
            text-align: center;
            text-transform: none;
            text-rendering: auto;
            line-height: 1;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            color: #b2b2b2;
            font-size: 14px !important;
          }

          .wea-input-focus > .wea-input-focus-btn .anticon-search {
            color: #b2b2b2;
            font-size: 12px;
          }

          .special-field-wrapper-single {
            display: inline-block;
            width: 100%;
            padding-bottom: 4px;
            height: calc(~"100% - 36px");
            overflow-y: auto;
            overflow-x: hidden;
          }

          .wea-new-scroll {
            height: 100% !important;

            .clipper {
              overflow: hidden;
              height: 100%;
              width: 100%;
              position: relative;
            }

            .scroller {
              overflow-y: scroll;
              overflow-x: hidden;
              height: 100%;
            }
          }

          .special-field-wrapper .special-field-item {
            height: 30px;
            line-height: 30px;
            padding-left: 15px;
            font-size: 12px;
            cursor: pointer;
          }

          .special-field-wrapper .special-field-item:hover {
            background-color: #e9f7fe;
          }

          .special-field-wrapper .special-field-item.actived {
            background-color: #e9f7fe;
          }
        }
      }

      .tableBox.active {
        width: 100%;
      }
    }

    .wea-doc-detail-content-text-sub {
      color: #999;
      position: absolute;
      bottom: 13px;
      right: 40px;
      font-size: 13px;
    }
  }

  .detail-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    height: 64px;
    box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
    z-index: 99;

    .flexEnd {
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
    }
  }

  :deep .ant-tabs-tab {
    padding: 10px 8px !important;
    font-size: 12px !important;
    margin-left: 10px !important;
    margin-right: 12px !important;
  }

  :deep .ant-tabs-nav::before {
    display: none;
  }
  .rightBox {
    display: flex;
    align-items: end;
    height: 35px;

    .btn-drop {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 12px;
      color: #999999;
    }

    .btn-drop:hover {
      color: rgb(78, 89, 105);
      background: #f2f3f5;
    }

    .ant-btn {
      margin-top: 12px;
    }
  }
  .rightAside {
    min-width: 20%;
    max-width: 20%;
    position: absolute;
    height: 100%;
    right: 0;
    // background: #fff;
    padding: 0 10px;

    // overflow-y: auto;
    .panel {
      padding: 20px;
      background: #fff;
      border-radius: 4px;
      margin-bottom: 16px;
      cursor: pointer;
      overflow: auto;

      .panel-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 19px;

        .panel-title {
          font-size: 16px;
          color: #1d2129;
          font-weight: bold;
        }
      }

      .panel-bd {
        .empty {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          color: #666;

          img {
            width: 50px;
          }

          .emptyDesc {
            font-size: 14px;
          }
        }

        .relevantList {
          .relevantItem {
            width: 100%;
            position: relative;
            padding: 13px 8px;
            border-bottom: 1px solid #e5e6eb;

            .relevantTitle {
              width: 75%;
              font-size: 14px;
              color: #1d2129;
            }

            .relevantTimerInfo {
              font-size: 12px;
              color: #86909c;
              padding-top: 10px;
            }

            .anticon-delete {
              position: absolute;
              right: 10px;
              top: 25px;
              font-size: 16px;
            }
          }

          .relevantItem:hover {
            background: #f2f3f5 !important;
          }
        }
      }
    }

    .asideScroll {
      height: 100%;
      overflow-y: auto;
    }

    .arrowIcon {
      position: absolute;
      top: 50%;
      z-index: 999;
      width: 16px;
      height: 60px;
      background: url("~@/assets/img/right.png") center center no-repeat;
      cursor: pointer;
      left: 1px;
    }

    .arrowIcon.rightIcon:hover {
      background: url("~@/assets/img/right_hover.png") center center no-repeat;
    }

    .arrowIcon.leftIcon {
      top: 50%;
      left: inherit !important;
      right: 0;
      background: url("~@/assets/img/left.png") center center no-repeat;

      &:hover {
        background: url("~@/assets/img/left_hover.png") center center no-repeat;
      }
    }
  }

  .leftContent {
    width: calc(~"80% - 5px");
    height: 100%;
    border-right: 1px solid #e2e3e5;
    overflow: hidden;
    overflow-y: auto;

    &.active {
      width: calc(~"100% - 24px");
    }
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-collapse {
    border: none !important;
    background: #fff;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item {
    border-bottom: none !important;
    background: #f3f2f2;
    margin-bottom: 8px;
  }

  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content {
    border-top: none !important;
  }

  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header {
    padding: 6px 16px !important;
  }

  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content
    > .ant-collapse-content-box {
    padding: 0 !important;
  }

  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child,
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child
    > .ant-collapse-header {
    border-radius: 0 !important;
  }
  .detail-scroll {
    height: calc(~"100% - 50px");
  }
  .detailContent {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    overflow: auto;
  }
  .tableBoxContent {
    white-space: pre-wrap;
    word-break: break-all;
    padding-top: 20px;
  }
  .preview-header .icon-circle-base {
    background: #df583a;
  }

  .title {
    color: #333;
  }

  .wea-doc-detail-content-text-sub span {
    font-size: 12px;
  }

  .doc-like .anticon {
    color: rgb(178, 178, 178);
    margin-left: 8px;
    margin-right: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  .doc-like.active,
  .doc-like.active .anticon {
    color: rgb(255, 159, 1);
  }

  .doc-label {
    color: #999;
    margin-left: 10px;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    cursor: pointer;
  }

  .detail-scroll .tabContainer .tableBox {
    padding: 0;
  }

  :deep .tox-tinymce {
    width: calc(~"100% - 180px") !important;
    border: none;
    border-radius: 0;

    .tox-editor-container {
      //background: #f0f2f6;
      .tox-toolbar__primary {
        //display: flex;
        //justify-content: center;
        border-radius: 0;
      }

      .tox-editor-header {
        //border:none;
        background: #f8f8f8;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
        border-bottom: 1px solid #eaeaea;
        //position: relative;
        //top: -12px;
      }

      .tox-toolbar__primary {
        background: #f8f8f8;
        border-radius: 0;
        //zoom: 0.9;
      }

      .tox-toolbar-overlord {
        border: none;
        background: #f8f8f8;
        border-radius: 0;
      }

      .tox-tbtn--bespoke {
        background: #f8f8f8;
        width: 87px !important;
      }

      .tox-toolbar__group {
        padding: 0 0px 0 8px;
      }
    }

    .tox-edit-area::before {
      border: none !important;
    }
  }

  .preview-header .leftBox .title {
    margin: 7px 0 0px 13px;

    .doc-title {
      width: 455px;
      display: block;
    }
  }

  :deep .ant-tabs-tab {
    margin-left: 20px !important;
    margin-right: 4px !important;
    padding: 6px 8px !important;
  }

  .require {
    font-size: 24px;
    margin-left: 5px;
    color: red;
    position: relative;
    top: 4px;
  }

  .btn-drop {
    font-size: 18px !important;
  }

  .tableBox-Bottom {
    height: 45px;
    background: #fff;
    display: flex;
    align-items: center;
    border-top: 1px solid #eaeaea;
    padding-left: 10px;

    .tableBox-Bottom-Btn {
      padding: 0 10px;
      cursor: pointer;
    }

    .tableBox-Bottom-Btn-Icon {
      position: relative;
      top: 1px;
      margin-right: 1px;
    }
  }

  .IsReply {
    margin: 0 5px 0 15px;

    :deep .el-checkbox__label {
      padding-left: 5px;
    }
  }

  .replyInfo {
    color: #fff;
    width: 17px;
    height: 17px;
    background: #faa825;
    border-radius: 50%;
    text-align: center;
    position: relative;
    top: -1px;
  }

  .sectionItem1 {
    height: auto;
    width: 100%;
    padding: 0px;
    justify-items: center;
    //margin: 10px 0 20px 0;
    border: none !important;
  }

  .ContentViewTemplateContent {
    border: 1px solid #dedede !important;
  }

  .detail-scroll .tabContainer .tableBox .sectionItem1 .ant-form-item {
    width: 100%;
  }

  :deep .section .sectionRow .sectionItem .ant-row {
    width: 100%;
    display: flex;
  }

  .ant-form-item {
    margin-bottom: 20px !important;
  }
  :deep .ant-form-item-label {
    width: 100px !important;
    text-align: right;
  }
  .flex {
    display: flex;
    //align-items: center;
    .flexbtn {
      padding-right: 0;
    }
  }

  .peopleBox {
    /* height: 200px; */
    border: 1px solid #e2e3e5;
    margin-top: 5px;
    border-radius: 3px;

    .iconTop {
      color: #3399ff;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .selectBox {
    /* height: 200px; */
    // border: 1px solid #e2e3e5;
    margin-top: 5px;
    border-radius: 3px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    :deep .ant-transfer {
      width: 100%;
    }
    :deep .ant-transfer-list {
      width: 50% !important;
    }
  }
  .sortBox {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    gap: 5px;
  }
  :deep .tox-tinymce {
    width: 100% !important;
  }
  .IsRecurrence :deep .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
  }
  :deep .ant-radio-group {
    min-width: 200px;
  }
  .messageInfo {
    font-size: 13px;
    color: red;
    margin-top: 5px;
  }
  .uploadPanel {
    width: 100%;
    .ant-upload-drag-icon {
      margin-bottom: 6px;
    }
    .ant-upload-text {
      font-size: 16px;
    }
    .inboxFileList {
      display: flex;
      flex-wrap: wrap;
      margin-top: 5px;

      .ant-btn.ant-btn-text,
      .ant-btn.ant-btn-text:hover {
        color: #000 !important;
      }

      .inboxFileItem {
        width: 100% !important;
        border-radius: 2px;
        background: #f2f3f5;
        padding: 10px;
        box-sizing: border-box;
        margin-right: 0px;
        margin-bottom: 16px;
        cursor: pointer;
        display: flex;
        overflow: hidden;
        position: relative;

        .leftImg {
          width: 32px;
          height: 32px;
          position: relative;
          top: 5px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .rightFileInfo {
          flex: 1;
          margin-left: 14px;
          overflow: hidden;
          color: #1d2129;

          .fileSize {
            color: #4e5969;
            padding-top: 4px;
          }

          .fileOptionShow {
            position: absolute;
            width: calc(~"100% - 36px");
            height: 100%;
            left: 42px;
            top: 0;
            background: rgba(242, 243, 245, 0.8);
            display: none;

            .btns {
              display: flex;
              align-items: center;
              height: 100%;
              justify-content: flex-end;
              padding-right: 20px;
              box-sizing: border-box;
            }
          }
        }

        &:hover .fileOptionShow {
          display: block;
        }
      }
    }
  }
  :deep .ant-upload-drag {
    height: auto;
  }
}
</style>
