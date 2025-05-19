<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" style="top:38px;" :maskClosable="false" @cancel="handleCancel"
      @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer addInvoiceWrap">
        <RadioDept :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <div class="modalCenter modalCenter1" :style="{ height: height + 'px !important' }" v-show="step == 0">
          <!-- <div class="form-legend-desktop">
            <abbr class="required">*</abbr>
            = 必填信息
          </div> -->
          <a-form :model="formState" ref="formRef">
            <div class="section" v-for="(item, index) in layoutList" :key="index">
              <div class="sectionTitle" v-if="item.title != '内容' && item.title != '回执'">{{ item.title }}</div>
              <div class="sectionRow" v-for="(row, idx) in item.rows" :key="idx">
                <div class="sectionItem" v-for="(attribute, attributeIdx) in row.attributes" :key="attributeIdx">
                  <a-form-item :name="attribute.targetValue"
                    v-if="['L', 'LT', 'DT'].includes(attribute.attributes.type) && select[attribute.targetValue]"
                    :label="attribute.label" :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]">
                    <a-select v-if="JSON.stringify(select[attribute.targetValue].controllerValues) == '{}'" allowClear
                      v-model:value="formState[attribute.targetValue]" :placeholder="'请选择' + attribute.label"
                      @change="(e) => Controllerchange(e, attribute.targetValue, picklistFieldMap[attribute.targetValue])">
                      <a-select-option v-for="(option, optionIdx) in select[
                        attribute.targetValue
                      ] && select[attribute.targetValue].values" :key="optionIdx" :value="option.value">{{
                        option.label }}</a-select-option>
                    </a-select>
                    <a-select v-if="JSON.stringify(select[attribute.targetValue].controllerValues) != '{}'" allowClear
                      v-model:value="formState[attribute.targetValue]" :placeholder="'请选择' + attribute.label"
                      @change="(e) => Controllerchange(e, attribute.targetValue, picklistFieldMap[attribute.targetValue])">
                      <a-select-option v-for="(option, optionIdx) in select[
                        attribute.targetValue
                      ] && select[attribute.targetValue].values" :key="optionIdx" :value="option.value">{{
                        option.label }}</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item :name="attribute.targetValue" v-else-if="
                    ['O', 'Y', 'U', 'Y_MD'].includes(
                      attribute.attributes.type
                    )
                  " :label="attribute.label" :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请选择' + attribute.label,
                    },
                  ]">
                    <a-select allowClear v-model:value="formState[attribute.targetValue]"
                      :default-active-first-option="false" :filter-option="false" showSearch @search="
                        (e) => {
                          searchlookup(e, attribute);
                        }
                      " @dropdownVisibleChange="
                        (e) => {
                          searchlookup('', attribute);
                        }
                      " :placeholder="'请选择' + attribute.label">
                      <template #suffixIcon></template>
                      <a-select-option v-for="(option, optionIdx) in search[
                        attribute.targetValue
                      ]" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                    </a-select>
                    <div class="selectIcon">
                      <SearchOutlined class="ant-select-suffix" @click="handleOpenLook(attribute)" />
                    </div>
                    <!-- <a-button @click="handleOpenLook(attribute)">搜索</a-button> -->
                  </a-form-item>
                  <a-form-item :name="attribute.targetValue" v-else-if="attribute.attributes.type == 'D'"
                    :label="attribute.label" :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]">
                    <a-date-picker valueFormat="YYYY-MM-DD" :placeholder="'请选择' + attribute.label"
                      v-model:value="formState[attribute.targetValue]" />
                  </a-form-item>
                  <!-- 时间类型 -->
                  <a-form-item :name="attribute.targetValue" v-else-if="attribute.attributes.type == 'F'"
                    :label="attribute.label" :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请选择' + attribute.label,
                      },
                    ]">
                    <div class="timeGroup" v-if="formState[attribute.targetValue + '_obj']">
                      <a-form-item class="date">
                        <a-date-picker valueFormat="YYYY-MM-DD" :placeholder="'请选择' + attribute.label"
                          v-model:value="formState[attribute.targetValue + '_obj'].date"
                          @change="(e) => { changeGroupDate(e, attribute) }" />
                      </a-form-item>
                      <a-form-item class="time">
                        <a-time-picker v-model:value="formState[attribute.targetValue + '_obj'].time"
                          valueFormat="HH:mm" format="HH:mm" @change="(e) => { changeGroupTime(e, attribute) }" />
                      </a-form-item>
                    </div>
                  </a-form-item>
                  <a-form-item :name="attribute.targetValue"
                    v-else-if="attribute.attributes.type == 'X' && attribute.label != '标题'" :label="attribute.label"
                    :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请输入' + attribute.label,
                      },
                    ]">
                    <a-textarea :rows="4" v-model:value="formState[attribute.targetValue]" />
                  </a-form-item>
                  <a-form-item :name="attribute.targetValue" v-else-if="attribute.attributes.type == 'B'"
                    :label="attribute.label" :rules="[
                      {
                        required: attribute.attributes.required,
                        message: '请输入' + attribute.label,
                      },
                    ]">
                    <a-checkbox v-model:checked="formState[attribute.targetValue]"></a-checkbox>
                  </a-form-item>
                  <a-form-item :name="attribute.targetValue" v-else :label="attribute.label" :rules="[
                    {
                      required: attribute.attributes.required,
                      message: '请输入' + attribute.label,
                    },
                  ]">
                    <a-input v-model:value="formState[attribute.targetValue]"></a-input>
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
        </div>
        <div class="modalCenter modalCenter1" :style="{ height: height + 'px !important' }" v-show="step == 1">
          <div class="section">
            <div class="sectionTitle sectionTitle2">电子发票</div>
            <div class="sectionRow">
              <div class="sectionItem">
                <div class="uploadPanel">
                  <a-upload-dragger accept=".pdf" v-model:file-list="fileList" :headers="headers" @change="changeFiles"
                    :data="uploadData" :action="Interface.uploadFiles" :showUploadList="false" name="files"
                    :before-upload="beforeUpload">
                    <div class="uploadRow">
                      <p class="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p class="ant-upload-text">将电子发票pdf文件拖到此处，或点击上传</p>
                    </div>
                  </a-upload-dragger>
                  <div class="inboxFileList" v-if="attachments && attachments.length">
                    <div class="inboxFileItem" v-for="(item, index) in attachments.slice(0, 1)" :key="index">
                      <div class="leftImg">
                        <img src="/src/assets/img/filetype/doc.png"
                          v-if="item.fileExtension == 'ocx' || item.fileExtension == 'docx' || item.fileExtension == 'doc' ||
                            item.fileExtension == '.ocx' || item.fileExtension == '.docx' || item.fileExtension == '.doc' || item.fileExtension == '.wps' || item.fileExtension == 'wps'" />
                        <img src="/src/assets/img/filetype/rar.png" v-else-if="item.fileExtension == 'rar' || item.fileExtension == 'zip' ||
                          item.fileExtension == '.rar' || item.fileExtension == '.zip'" />
                        <img src="/src/assets/img/filetype/Excel.png" v-else-if="item.fileExtension == 'xlsx' || item.fileExtension == 'xls' ||
                          item.fileExtension == '.xlsx' || item.fileExtension == '.xls'" />
                        <img src="/src/assets/img/filetype/Pdf.png"
                          v-else-if="item.fileExtension == 'pdf' || item.fileExtension == '.pdf'" />
                        <img src="/src/assets/img/filetype/TXT.png"
                          v-else-if="item.fileExtension == 'txt' || item.fileExtension == '.txt'" />
                        <img src="/src/assets/img/filetype/PPT.png"
                          v-else-if="item.fileExtension == 'ppt' || item.fileExtension == '.ppt' || item.fileExtension == 'pptx' || item.fileExtension == '.pptx'" />
                        <img src="/src/assets/img/filetype/defaultImg.png"
                          v-else-if="item.fileExtension == 'jpg' || item.fileExtension == 'png' || item.fileExtension == '.jpg' || item.fileExtension == '.png'" />
                        <img src="/src/assets/img/filetype/Folder.png" v-else />
                      </div>
                      <div class="rightFileInfo">
                        <div class="fileName rowEllipsis">
                          {{ item.name }}
                        </div>
                        <div class="fileSize">{{ item.size }}</div>
                        <div class="fileOptionShow" :title="(item.name || '')">
                          <div class="btns">
                            <a-tooltip title="查看" placement="top">
                              <a-button type="text" :icon="h(EyeOutlined)" @click="handlePreviewFile(item)"></a-button>
                            </a-tooltip>
                            <a-tooltip title="下载" placement="top">
                              <a-button type="text" :icon="h(VerticalAlignBottomOutlined)"
                                @click="downloadFile(item)"></a-button>
                            </a-tooltip>
                            <a-tooltip title="删除" placement="top">
                              <a-button type="text" :icon="h(CloseOutlined)" @click="deleteFile0(item)"></a-button>
                            </a-tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel" v-if="step == 0">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit" v-if="step == 0">下一步</a-button>
          <a-button @click="data.step = 0" v-if="step == 1">上一步</a-button>
          <a-button type="primary" @click="handleSubmit2" v-if="step == 1">完成</a-button>
        </div>
      </template>
    </a-modal>
    <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    <multiple-dept v-if="isMultipleDept" :isShow="isMultipleDept" @cancel="cancelDeptModal"
      @selectVal="handleDeptParams" />
    <radio-user v-if="isRadioUser" :isShow="isRadioUser" @cancel="cancelUserModal" @selectVal="handleUserParams"
      :localId="localId"></radio-user>
    <Lookup-filter v-if="isLookup" :isShow="isLookup" :field="localId" :entityApiName="entityApiName"
      :lookEntityApiName="lookEntityApiName" :objectTypeCode="sObjectType" @cancel="isLookup = false"
      @select="handleSelectData"></Lookup-filter>
    <Delete :isShow="isDelete" v-if="isDelete" :desc="'确定要删除吗？'" @cancel="cancelDelete" @ok="getFiles"
      :sObjectName="'RelatedAttachment'" :recordId="recordId" :objTypeCode="'1001'" :external="false" />
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="'确定要删除吗？'" :title="'删除'" @cancel="isConfirm = false"
      @ok="deleteFile" :id="recordId" />
    <ImageView v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto = false" />
    <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
    <TxtView v-if="isTxt" :isShow="isTxt" :txtParams="txtParams" @cancel="isTxt = false" />
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
  h,
  nextTick,
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  DownloadOutlined,
  ZoomInOutlined,
  UserOutlined,
  InboxOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import RadioDept from "@/components/commonModal/RadioDept.vue";
import MultipleDept from "@/components/commonModal/MultipleDept.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import MultipleUser from "@/components/commonModal/MultipleUser.vue";
import LookupFilter from "@/components/commonModal/LookupFilter.vue";
import Delete from "@/components/listView/Delete.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import ImageView from "@/components/file/ImageView.vue";
import PdfView from "@/components/file/PdfView.vue";
import TxtView from "@/components/file/TxtView.vue";
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
const { proxy } = getCurrentInstance();
const props = defineProps({
  isShow: Boolean,
  objectTypeCode: String,
  id: String,
  name: String,
  entityId: String,
  entityApiName: String,
  relatedObjectAttributeName: String, // 默认值name
  relatedObjectAttributeValue: Object // 默认值value
});
const formRef = ref();
const emit = defineEmits(["cancel", "ok"]);
const handleCancel = () => {
  emit("cancel", false);
};
const formState = reactive({});
const token = localStorage.getItem("token");
const data = reactive({
  title: "",
  height: "",
  keywords: [],
  treeData: [],
  fileList: [],
  BusinessUnitId: '',
  ApprovedBy: '',
  listData: [],
  attachments: [],
  ImageList: [],
  uploadData: {
    parentId: '',
    entityName: ''
  },
  headers: {
    Authorization: token,
    Token: token,
  },
  isDelete: false,
  isConfirm: false,
  isPhoto: false,
  photoParams: {},
  isPdf: false,
  pdfParams: {},
  recordId: '',
  isTxt: false,
  txtParams: {},
  step: 0,
  oldData: {},
  id: '',
  currentUserId: '',
  currentUserName: '',
  currentBusinessUnitId: '',
  currentBusinessUnitName: '',
  layoutList: [],
  list: {},
  select: {},
  search: {},
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
const {
  isTxt, txtParams, step, oldData, id, currentUserId, currentUserName, currentBusinessUnitId, currentBusinessUnitName,
  title, attachments, ImageList, uploadData, headers, recordId,
  isDelete, isConfirm, isPhoto, photoParams, isPdf, pdfParams,
  height, keywords, treeData, layoutList, list, select, search,
  fileList, BusinessUnitId, ApprovedBy, listData, isRadioDept,
  isRadioUser, isMultipleDept, localId, isMultipleUser, isLookup, sObjectType, recordObj, picklistFieldMap, selectFixed, lookEntityApiName
} = toRefs(data);


const getFiles = () => {
  data.attachments = [];
  data.ImageList = [];
  let url = Interface.getFiles;
  let d = {
    parentId: data.id,
    page: 1,
    rows: 100
  }
  proxy.$post(url, d).then(res => {
    var list = [];
    var list2 = [];
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue) {
      for (var i = 0; i < res.actions[0].returnValue.length; i++) {
        var item = res.actions[0].returnValue[i];
        let size = item.fileSize;
        size = size ? (size * 1 / 1024).toFixed(2) : 0;
        size = size + 'kb';
        let name = item.name || '';
        if (name) {
          name = name.replaceAll('.' + item.fileExtension, '');
        }
        let ite = {
          size: size,
          url: '/' + data.uploadData.entityName + '/' + item.id + '/' + name,
          fileLocation: item.fileLocation || '',
          uid: item.id,
          id: item.id,
          downloadUrl: item.downloadUrl || '',
          viewUrl: item.viewUrl || '',
          fileExtension: item.fileExtension,
          FileExtension: item.fileExtension,
          fileSize: item.fileSize,
          name: item.name,
          Name: item.name,
          CreatedOn: item.createdOn ? dayjs(item.createdOn).format("YYYY-MM-DD hh:mm") : '',
          CreatedBy: item.createdByName || '',
        };
        list.push(ite);
        if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
          list2.push(ite);
        }
      }
    }
    data.attachments = list;
    data.ImageList = list2;
  })
};
const beforeUpload = (e) => {
  data.uploadData.entityName = 'Invoice';
  console.log("beforeUpload", e);
}
const changeFiles = (e) => {
  // console.log("e", e);
  if (e.file.status == "done") {
    message.success("上传成功！");
    getFiles();
  }
}
//预览附件
const handlePreviewFile = (item) => {
  let url = '';
  if (item.fileExtension) {
    item.fileExtension = item.fileExtension.replace(".", "");
  }
  if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
    let index = 0;
    for (var i = 0; i < data.ImageList.length; i++) {
      let ite = data.ImageList[i];
      if (ite.id == item.id) {
        index = i;
      }
    }
    data.photoParams = {
      id: item.id,
      item: item,
      imageList: data.ImageList,
      index: index
    };
    data.isPhoto = true;
  } else if (item.fileExtension == 'pdf') {
    url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(item.viewUrl);
    data.pdfParams = {
      id: item.id,
      name: item.name,
      index: 0,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl
    };
    data.isPdf = true;
  } else if (item.fileExtension == 'txt') {
    data.txtParams = {
      name: item.name,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl
    };
    data.isTxt = true;
  } else if (
    item.fileExtension == "docx" ||
    item.fileExtension == "pptx" ||
    item.fileExtension == "xlsx" ||
    item.fileExtension == "doc" ||
    item.fileExtension == "ppt" ||
    item.fileExtension == "xls"
  ) {
    if(item.viewUrl&&item.viewUrl.indexOf('/lightning/r/office/view')!=-1){}else{
      item.viewUrl='/lightning/r/office/view?id='+item.id;
    }
    if(item.fileExtension == "ppt" ||item.fileExtension == "pptx"){
      item.viewUrl='/lightning/r/office/view2?id='+item.id;
    }
    openControlViewFile(
      item.id,
      item.createdByName,
      item.fileExtension,
      item.viewUrl,
      item.name
    );
  } else {
    downloadFile(item);
  }
};
//预览office文件
const openControlViewFile = (id, username, type, link, name) => {
  var mhtmlHeight = window.screen.availHeight;//获得窗口的垂直位置;
  var mhtmlWidth = window.screen.availWidth; //获得窗口的水平位置; 
  var iTop = 0; //获得窗口的垂直位置;
  var iLeft = 0; //获得窗口的水平位置;
  //window.open('/#' + link + "&FileType=" + type + "&FileName=" + name + "&UserName=" + username);
  window.open('/#' + link + "&entityName=RelatedAttachment", '', 'height=' + mhtmlHeight + ',width=' + mhtmlWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=yes,scrollbars=no,resizable=yes, location=no,status=no');
};
//下载附件
const downloadFile = (item) => {
  let url = item.downloadUrl;
  window.open(url);
  // let text = item.Name || '';
  // windowOpen(url, text);
};
//删除
const deleteFile0 = (item) => {
  data.recordId = item.id;
  data.confirmText = '确定要删除吗？'
  data.confirmTitle = '删除'
  //data.isConfirm = true;
  data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
  data.isConfirm = false;
};
//删除附件
const deleteFile = (id) => {
  let d = {
    actions: [{
      id: "4105;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        parentId: data.uploadData.parentId,
        entityName: data.uploadData.entityName,
        fileId: id
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.deleteFiles, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      message.success("删除成功！");
      data.isConfirm = false;
      getFiles();
    }
    else {
      if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
        message.error(res.actions[0].errorMessage);
      }
      else {
        message.error("删除失败！");
      }
    }
  }).catch(err => {
    console.log('error', err);
    message.error("删除失败！");
  });
}
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

  data.layoutList.forEach(item => {
    item.rows.forEach(row => {
      row.attributes.forEach(col => {
        formState[col.localId] = data.list[col.localId]?.value;
        if (['O', 'Y', 'U', 'Y_MD'].includes(col.attributes.type)) {
          console.log("data.list[col.localId]", data.list[col.localId]);
          // formState[col.localId] = data.list[col.localId];
          console.log("data.search[col.localId]", data.search[col.localId]);
          if (data.search[col.localId] == undefined) {
            data.search[col.localId] = [];
          }
          if (data.list[col.localId] && data.list[col.localId].value) {
            data.search[col.localId].push({
              ID: data.list[col.localId].value,
              Name: data.list[col.localId].displayValue
            })
          }
          if (props.relatedObjectAttributeName == col.localId) {
            formState[col.localId] = props.relatedObjectAttributeValue.value;
            data.search[col.localId].push({
              ID: props.relatedObjectAttributeValue.value,
              Name: props.relatedObjectAttributeValue.name
            })
          }
        }
        if (col.attributes.type == 'F') {
          formState[col.localId + '_obj'] = {
            date: "",
            time: ""
          }
          if (data.list[col.localId] && data.list[col.localId].value) {
            formState[col.localId + '_obj'] = {
              date: (data.list[col.localId].value).split(' ')[0],
              time: (data.list[col.localId].value).split(' ')[1]
            }
          }
        }
        if (['L', 'LT', 'DT'].includes(col.attributes.type)) {
          if (props.relatedObjectAttributeName == col.localId) {
            formState[col.localId] = props.relatedObjectAttributeValue.value;
          }
        }
      })
    })
  })
}
const getLayoutInterface = () => {
  sessionStorage.removeItem("entityApiName");
  let d = {
    actions: [{
      id: "7366;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        entityApiName: props.entityApiName,
        defaultFieldValues: {
          entityId: ''
        },
        mode: "CREATE",
        type: "FULL",
        layoutOverride: "00000000-0000-0000-0000-000000080001",
        inContextOfComponent: "",
        pageSize: -1,
        offset: 0
      }
    }]
  }
  if (props.id || data.id) {
    d.actions[0].params.recordId = props.id || data.id;
  }
  if (props.relatedObjectAttributeName) {
    d.actions[0].params.defaultFieldValues[props.relatedObjectAttributeName] = props.relatedObjectAttributeValue.value;
  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.formCommon.layout, obj).then(res => {
    res['entityApiName'] = props.entityApiName;
    if (props.id == '' && data.id == '') {
      sessionStorage.setItem("entityApiName", JSON.stringify(res));
    }
    handleData(res);
  })
}
const getLayout = () => {
  if (sessionStorage.getItem("entityApiName") && (props.id == '' || props.id == 'undefined')) {
    let res = JSON.parse(sessionStorage.getItem("entityApiName"));
    console.log('res', res);
    if (res.entityApiName && props.entityApiName && res.entityApiName == props.entityApiName) {
      handleData(res);
    } else {
      getLayoutInterface();
    }
  } else {
    getLayoutInterface();
  };
};


const getPickerList = () => {
  let d = {
    actions: [{
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
    let picklistFieldValues = res.actions[0].returnValue.picklistFieldValues;
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
    getLayout();
  });
};
// 字段映射关系
const Controllerchange = (val, Controller, Dependents) => {
  // console.log("Controllerchange", val, Controller, Dependents);
  if (Dependents) {
    for (var i = 0; i < Dependents.length; i++) {
      var Dependent = Dependents[i];
      var isDependent = false;
      if (data.selectFixed[Dependent] && data.selectFixed[Dependent].values) {
        data.select[Dependent].values = [];
        data.selectFixed[Dependent].values.map(item => {
          if (item.validFor.length && item.validFor.some(row => row == data.selectFixed[Dependent].controllerValues[val])) {
            data.select[Dependent].values.push(item);
            if (formState[Dependent] == item.value) {
              isDependent = true;
            }
          }
        });
        // console.log("data.select[Dependent].values", data.select[Dependent].values);
      }
      if (isDependent == false) {
        formState[Dependent] = '';
      }
    }
    // console.log("data.select-Dependent", data.select);
  }
}
const searchlookup = (search, attribute) => {
  console.log(search, attribute);
  let obj = {
    actions: [{
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

    let arr = [];
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.lookupResults && res.actions[0].returnValue.lookupResults.records) {
      let list = res.actions[0].returnValue.lookupResults.records;
      list.forEach(item => {
        arr.push({
          ID: item.fields.Id.value,
          Name: item.fields.Name.value
        })
      });
    }
    data.search[attribute.targetValue] = arr;
  });
};
const getData = () => {
  //getLayout();
  getPickerList();
}
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
    var isEmpty = data.search[data.localId].some((item) => item.ID == params.ID);
    if (!isEmpty) {
      data.search[data.localId].push({
        ID: params.ID,
        Name: params.Name,
      });
    }
  }
  else {
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
};
// 多选用户
const handleMuUserParams = (params) => { };
// 查找类型打开弹窗
const handleOpenLook = (attribute) => {
  let localId = attribute.localId;
  data.localId = localId;
  let sObjectType = attribute.attributes.referencedEntityObjectTypeCode;
  if (sObjectType == 30020 || sObjectType == 8) {
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
  // console.log("选中的数据", e);
  let Name = e.Name || e.FullName;
  // console.log("recordObj", data.recordObj, formState[data.recordObj.localId]);
  let { localId } = data.recordObj;
  let isExist = data.search[localId].some(item => item.ID == e.LIST_RECORD_ID);
  if (!isExist) {
    data.search[localId].push({
      ID: e.LIST_RECORD_ID,
      Name: Name && $(Name) && $(Name).html() ? $(Name).html() : ''
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
    let formState2 = {};
    for (var col in formState) {
      if (col.indexOf('_obj') == -1) {
        if (formState[col + '_obj']) {
          if (formState[col + '_obj'].date) {
            if (formState[col + '_obj'].time) {
              formState2[col] = formState[col + '_obj'].date + ' ' + formState[col + '_obj'].time
            }
            else {
              formState2[col] = formState[col + '_obj'].date + ' 00:00'
            }
          }
          else {
            formState2[col] = null
          }
        }
        else {
          if (formState[col]) {
            formState2[col] = formState[col]
          }
          else {
            formState2[col] = null
          }
        }
      }
    }

    let url = Interface.create;
    let d = {
      actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          // recordId: props.id,
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: props.entityApiName,
            objTypeCode: props.objectTypeCode,
            fields: formState2
          }
        }
      }]
    };
    if (props.id || data.id) {
      url = Interface.edit;
      d.actions[0].params.recordId = props.id || data.id;
    }
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then((res) => {
      if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
        message.success("保存成功！");
        data.id = res.actions[0].returnValue.id;
        data.uploadData.parentId = res.actions[0].returnValue.id;
        data.step = 1;
      }
      else {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
          message.error(res.actions[0].errorMessage);
        }
        else {
          message.error("保存失败！");
        }
      }
    });
  })
    .catch((err) => {
      console.log("error", err);
    });
};
const handleSubmit2 = () => {
  if (data.attachments && data.attachments.length) {
    message.success("保存成功！");
    formRef.value.resetFields();
    emit("cancel", false);
    emit("ok", '');
  }
  else {
    message.error("请上传电子发票pdf！");
  }
};
// 时间组合日期选择
const changeGroupDate = (e, attribute) => {
  formState[attribute.localId] = e + ' ' + formState[attribute.localId + '_obj'].time;
}
const changeGroupTime = (e, attribute) => {
  formState[attribute.localId] = formState[attribute.localId + '_obj'].date + ' ' + e;
}
onMounted(() => {
  var userId = '';
  var userName = '';
  var businessUnitId = '';
  var businessUnitName = '';
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    userId = userInfo.userId;
    userName = userInfo.fullName;
    businessUnitId = userInfo.businessUnitId;
    businessUnitName = window.localStorage.getItem('businessUnitName') || '';
    if (userId == 'jackliu') {
      userId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
    }
    data.currentUserId = userId;
    data.currentUserName = userName;
    data.currentBusinessUnitId = businessUnitId;
    data.currentBusinessUnitName = businessUnitName;
  }
  data.height = document.documentElement.clientHeight - 200
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 200;
  });
  if (props.id) {
    data.title = '编辑' + (props.name || '');
  }
  else {
    data.title = '新建' + (props.name || '');
  }
  if (props.id) {
    data.id = props.id;
    getFiles();
    data.uploadData.parentId = props.id;
  }
  getData();
});
</script>
<style lang="less">
//@import url("@/style/modal.less");
@import url("@/style/commonFormModal.less");
</style>
<style lang="less" scoped>
.addInvoiceWrap {
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
    font-weight: bold;
    margin-bottom: 10px;
    // width: 100%;
    // font-weight: 700;
    // height: 30px;
    // line-height: 30px;
    // padding-left: 10px;
    // border-radius: 0;
    // font-size: 14px;
    // color: #868686;
    // border-bottom: 1px solid #e2e2e2;
    // background-color: #f4faff;
    // border-left: 2px solid #2b9dec;
  }

  .uploadRow {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;

    p {
      margin: 0 !important;
    }
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag p.ant-upload-drag-icon {
    margin-bottom: 0 !important;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag .ant-upload {
    padding: 0 !important;
  }

  .ant-upload-list {
    display: flex;
    flex-wrap: wrap;

    .ant-upload-list-item-container {
      width: 148px;
      height: 148px;
      margin-right: 10px;
    }
  }

  .uploadItem {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    display: inline-block;
    position: relative;
    cursor: pointer;

    img {
      width: 125px;
    }

    &:hover .uploadAction {
      opacity: 1;
    }

    .uploadAction {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
      display: flex;
      align-items: center;
      justify-content: center;

      .icons {
        display: flex;

        .icon {
          display: inline-block;
          width: 30px;
          cursor: pointer;

          &:hover {
            color: var(--textColor);
          }
        }
      }
    }
  }

  .uploadPanel {
    .inboxFileList {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;

      .ant-btn.ant-btn-text,
      .ant-btn.ant-btn-text:hover {
        color: #000 !important;
      }

      .inboxFileItem {
        width: 246px !important;
        border-radius: 2px;
        background: #f2f3f5;
        padding: 10px;
        box-sizing: border-box;
        margin-right: 16px;
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
            background: rgba(242, 243, 245, .8);
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

  .modalCenter1 {
    .section .sectionRow .sectionItem :deep .ant-row {
      width: 100%;
      display: flex !important;
    }

    .ant-form {
      flex: 1;
    }

    .ant-form-item {
      margin-bottom: 20px !important;

      :deep .ant-form-item-label {
        width: 79px !important;
      }
    }
  }
}

:deep input[aria-hidden="true"] {
  display: none !important;
}
</style>