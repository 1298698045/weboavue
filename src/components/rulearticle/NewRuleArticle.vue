<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer NewRuleArticleWrap">
        <RadioDept :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <div class="modalCenter modalCenter1" :style="{ height: height + 'px!important' }" v-show="step == 0">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Name" label="名称" :rules="[{ required: true, message: '请输入名称' }]">
                    <a-input v-model:value="formState.Name" class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="ArticleNumber" label="编号">
                    <a-input v-model:value="formState.ArticleNumber" class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="InstitutionType" label="类型" :rules="[{ required: true, message: '请选择制度文件类型' }]">
                    <a-select v-model:value="formState.InstitutionType" placeholder="制度文件类型">
                      <a-select-option v-for="(item, index) in InstitutionTypeList" :value="item.value" :key="index">{{
                        item.label }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="PublicationScope" label="公开方式">
                    <a-select v-model:value="formState.PublicationScope" placeholder="请选择公开方式">
                      <a-select-option v-for="(item, index) in PublicationScopeList" :value="item.value" :key="index">{{
                        item.label }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="name" label="发布人">
                    <a-input v-model:value="formState.ApprovedBy" disabled class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="BusinessUnitId" label="发布部门">
                    <!-- <div>
                      <a-select placeholder="请选择" v-model:value="data.BusinessUnitId"
                        :default-active-first-option="false" :filter-option="false" showSearch @search="searchlookup2" disabled
                        @change="handleDeptParams2" @dropdownVisibleChange="searchlookup2">
                        <template #suffixIcon></template>
                        <a-select-option v-for="v in listData" :key="v.ID" :value="v.ID">{{ v.Name
                        }}</a-select-option>
                      </a-select>
                      <i class="iconfont icon-sousuo pointer selectIcon" @click="handleFocus"></i>
                    </div> -->
                    <a-input v-model:value="formState.BusinessUnitId" disabled class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="ActiveOn" label="生效日期">
                    <a-date-picker v-model:value="formState.ActiveOn" placeholder="生效日期" :valueFormat="'YYYY-MM-DD'" />
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="ExpiresOn" label="失效日期">
                    <a-date-picker v-model:value="formState.ExpiresOn" placeholder="失效日期" :valueFormat="'YYYY-MM-DD'" />
                  </a-form-item>
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="FolderId" label="目录" :rules="[{ required: true, message: '请选择目录' }]">
                    <a-tree-select v-model:value="formState.FolderId" show-search style="width: 100%"
                      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="请选择目录" allow-clear
                      tree-default-expand-all :tree-data="treeData" tree-node-filter-prop="name">
                      <template #title="{ value: val, name }">
                        <span :v="val">{{ name }}</span>
                      </template>
                    </a-tree-select>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="ValidTerm" label="有效期">
                    <a-input v-model:value="formState.ValidTerm" class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="StateCode" label="状态">
                    <a-select v-model:value="formState.StateCode" placeholder="请选择状态">
                      <a-select-option v-for="(item, index) in StateCodeList" :value="item.value" :key="index">{{
                        item.label }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="AttachRightCode" label="文件权限">
                    <a-select v-model:value="formState.AttachRightCode" placeholder="请选择文件权限">
                      <a-select-option v-for="(item, index) in AttachRightCodeList" :value="item.value" :key="index">{{
                        item.label }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="ApprovedOn" label="发布时间">
                    <a-date-picker v-model:value="formState.ApprovedOn" placeholder="发布时间"
                      valueFormat="YYYY-MM-DD HH:mm:ss" show-time />
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="IsPublic" label="是否公开">
                    <a-checkbox v-model:checked="formState.IsPublic"></a-checkbox>
                  </a-form-item>
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="VersionNumber" label="版本号">
                    <a-input v-model:value="formState.VersionNumber" class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="IssueDocNumber" label="发文文号">
                    <a-input v-model:value="formState.IssueDocNumber" class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="IsImportant" label="重要信息">
                    <a-checkbox v-model:checked="formState.IsImportant"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="IsTop" label="置顶信息">
                    <a-checkbox v-model:checked="formState.IsTop"></a-checkbox>
                  </a-form-item>
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem" v-if="formState.IsTop">
                  <a-form-item name="EndTopDate" label="置顶截止">
                    <a-date-picker v-model:value="formState.EndTopDate" valueFormat="YYYY-MM-DD HH:mm:ss" show-time
                      placeholder="置顶截止" />
                  </a-form-item>
                </div>
              </div>

            </div>
            <div class="section" v-if="props.type == 'version'">
              <div class="sectionTitle sectionTitle2">修订说明</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Description" label="修订说明">
                    <a-textarea v-model:value="formState.Description" placeholder="" />
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
        </div>
        <div class="modalCenter modalCenter1" :style="{ height: height + 'px!important' }" v-show="step == 1">
          <div class="section">
            <div class="sectionTitle sectionTitle2">制度文件</div>
            <div class="sectionRow">
              <div class="sectionItem">
                <div class="uploadPanel">
                  <a-upload-dragger v-model:file-list="fileList" :headers="headers" @change="changeFiles"
                    :data="uploadData" :action="Interface.uploadFiles" :showUploadList="false" multiple name="files"
                    :before-upload="beforeUpload">
                    <div class="uploadRow">
                      <p class="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p class="ant-upload-text">将文件拖到此处，或点击上传</p>
                    </div>
                  </a-upload-dragger>
                  <div class="inboxFileList">
                    <div class="inboxFileItem" v-for="(item, index) in attachments" :key="index">
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
import Delete from "@/components/listView/Delete.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import ImageView from "@/components/file/ImageView.vue";
import PdfView from "@/components/file/PdfView.vue";
import TxtView from "@/components/file/TxtView.vue";
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
const { proxy } = getCurrentInstance();
console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  type: String,
  id: String,
  FolderId: String
});
const formRef = ref();
const emit = defineEmits(["cancel", "ok"]);
const handleCancel = () => {
  emit("cancel", false);
};
const formState = reactive({
  ApprovedBy: '',
  BusinessUnitId: '',
  ArticleNumber: '',
  PublicationScope: '院内公开',
  Name: '',
  FolderId: '',
  ActiveOn: null,
  ExpiresOn: null,
  Description: '',
  InstitutionType: '讨论稿',
  StateCode: 1,
  IsImportant: false,
  IsTop: false,
  AttachRightCode: 0,
  EndTopDate: '',
  ApprovedOn: '',
  IsPublic: false,
  IssueDocNumber: '',
  VersionNumber: '',
  ValidTerm: '',
  CoverDisplay: '',
  Title:''
});
const token = localStorage.getItem("token");
const data = reactive({
  title: "",
  height: document.documentElement.clientHeight - 350,
  StateCodeList: [
    {
      label: '草稿',
      value: 0
    },
    {
      label: '已发布',
      value: 1
    },
    {
      label: '已废止',
      value: 2
    },
    {
      label: '流转中',
      value: 3
    },
    {
      label: '未通过',
      value: 4
    },
    {
      label: '已修订',
      value: 5
    },
    {
      label: '已变更',
      value: 6
    }
  ],
  AttachRightCodeList: [
    {
      label: '所有',
      value: 0
    },
    {
      label: '只读',
      value: 4
    },
    {
      label: '可下载',
      value: 8
    }
  ],
  PublicationScopeList: [
    {
      label: '院内公开',
      value: '院内公开'
    },
  ],
  InstitutionTypeList: [
    {
      label: '讨论稿',
      value: '讨论稿'
    },
    {
      label: '暂行稿',
      value: '暂行稿'
    },
    {
      label: '实施稿',
      value: '实施稿'
    },
  ],
  keywords: [],
  treeData: [],
  CoverDisplayList: [
    {
      label: '标题左边',
      value: 'LeftTitle'
    },
    {
      label: '标题右边',
      value: 'RightTitle'
    },
    {
      label: '标题下面大图',
      value: 'BelowTitleBigImg'
    },
    {
      label: '标题下列表',
      value: 'BelowGrid'
    },
    {
      label: '标题下轮播',
      value: 'Carousel'
    }
  ],
  fileList: [],
  isRadioDept: false,
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
  id:'',
  currentUserId:'',
  currentUserName:'',
  currentBusinessUnitId:'',
  currentBusinessUnitName:''
});
const {
  isTxt, txtParams, step, StateCodeList, oldData, id, currentUserId, currentUserName, currentBusinessUnitId, currentBusinessUnitName,
  title, attachments, ImageList, uploadData, headers, recordId,
  isDelete, isConfirm, isPhoto, photoParams, isPdf, pdfParams,
  height, AttachRightCodeList, keywords, treeData, CoverDisplayList,
  fileList, isRadioDept, BusinessUnitId, ApprovedBy, listData, PublicationScopeList, InstitutionTypeList
} = toRefs(data);

const cancelDeptModal = (e) => {
  data.isRadioDept = e;
}
const handleDeptParams = (e) => {
  //console.log("e",e);
  if (e.ID) {
    formState.BusinessUnitId = e.Name;
    data.BusinessUnitId = e.ID;
    data.isRadioDept = false;
    let result = data.listData.filter((item) => {
      return item.ID == e.ID;
    });
    if (result && result.length) { } else {
      data.listData.push({
        ID: e.ID,
        Name: e.Name
      })
    }
  }
}
const handleDeptParams2 = (e) => {
  //console.log("eeee",e);
  if (e) {
    data.BusinessUnitId = e;
    let result = data.listData.filter((item) => {
      return item.ID == e;
    });
    if (result && result.length) {
      formState.BusinessUnitId = result[0].Name;
    }
  }
}
const handleFocus = (e) => {
  data.isRadioDept = true;
}
// const getTreeData = () => {
//     data.treeData = [
//       {
//         "id":"10010000-0000-0000-0000-000000007002",
//         "key":"10010000-0000-0000-0000-000000007002",
//         "value":"10010000-0000-0000-0000-000000007002",
//         "name":"制度文件",
//         "text":"制度文件",
//         "quantity":0,
//         "parent":null,
//         "children":[
//           {"id":"ec230bb1-b9a5-42eb-83fc-4b6410038f57","key":"ec230bb1-b9a5-42eb-83fc-4b6410038f57","value":"ec230bb1-b9a5-42eb-83fc-4b6410038f57","name":"讨论稿","text":"讨论稿","quantity":0,"parent":"10010000-0000-0000-0000-000000007002","children":[]},
//           {"id":"61f0d939-2474-4c29-b47e-fb700d6ef4c3","key":"61f0d939-2474-4c29-b47e-fb700d6ef4c3","value":"61f0d939-2474-4c29-b47e-fb700d6ef4c3","name":"暂行稿","text":"暂行稿","quantity":0,"parent":"10010000-0000-0000-0000-000000007002","children":[]},
//           {"id":"c141ce85-126f-4771-9f7a-8023dec67493","key":"c141ce85-126f-4771-9f7a-8023dec67493","value":"c141ce85-126f-4771-9f7a-8023dec67493","name":"实施稿","text":"实施稿","quantity":0,"parent":"10010000-0000-0000-0000-000000007002","children":[]}]
//       }
//     ]
// }
// getTreeData();
const getTreeData = () => {
  // proxy.$get(Interface.information.contentTree, {
  //   objectTypeCode: props.objectTypeCode
  // }).then((response) => {
  //   let formTree = (list) => {
  //     list.forEach(item => {
  //       if (item.children) {
  //         formTree(item.children);
  //       }
  //       item.key = item.id;
  //       item.value = item.id;
  //     })
  //   }
  //   formTree(response);
  //   data.treeData = response;
  // })
  let url = Interface.content.folder.get;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        id:'00000000-0000-0000-0000-000000002000'
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      let formTree = (list) => {
        list.forEach(item => {
          if (item.children) {
            formTree(item.children);
          }
          item.key = item.id;
          item.value = item.id;
        })
      }
      let response = res.actions[0].returnValue;
      formTree(response);
      data.treeData = response;
    }
  });
}
getTreeData();


const getTags = () => {
  proxy.$get(Interface.information.tags, {}).then(res => {
    data.keywords = res.data;
  })
}
getTags();

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
const searchlookup2 = () => {
  let obj = {
    actions: [{
      id: "6129;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        objectApiName: props.entityApiName,
        fieldApiName: 'BusinessUnitId',
        pageParam: 1,
        pageSize: 25,
        q: "",
        searchType: "Recent",
        targetApiName: 'BusinessUnit',
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
    let list = res.actions[0].returnValue.lookupResults.records;
    let arr = [];
    list.forEach(item => {
      arr.push({
        ID: item.fields.Id.value,
        Name: item.fields.Name.value
      })
    });
    data.listData = arr;
  });
}
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
  data.uploadData.entityName = 'Institution';
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
    item.fileExtension == "xls" || item.fileExtension == "wps"
  ) {
    item.viewUrl = "/lightning/r/office/view?id=" + item.id;
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
      data.currentUserId=userId;
      data.currentUserName=userName;
      data.currentBusinessUnitId=businessUnitId;
      data.currentBusinessUnitName=businessUnitName;
  }
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 350;
  });
  if (props.type == 'new') {
    data.title = '新建制度文件';
    data.ApprovedBy = userId;
    formState.ApprovedBy = userName;
    data.BusinessUnitId = businessUnitId;
    formState.BusinessUnitId = businessUnitName;
  } else if (props.type == 'history') {
    data.title = '变更制度文件';
  } else if (props.type == 'version') {
    data.title = '修订制度文件';
  }
  if (props.id) {
    data.id=props.id;
    getDetail();
    getFiles();
    data.uploadData.parentId = props.id;
  }
  else {
    formState.FolderId = props.FolderId;
  }
});
const getDetail = () => {
  let d = {
    actions: [{
      id: "4270;a",
      descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: props.id,
        apiName: 'Institution',
        objTypeCode: '100204'
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.detail, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.fields) {
      let fields = res.actions[0].returnValue.fields;
      data.ApprovedBy = fields.ApprovedBy&&fields.ApprovedBy.value ? fields.ApprovedBy.value : data.currentUserId;
      data.BusinessUnitId = fields.BusinessUnitId&&fields.BusinessUnitId.value ? fields.BusinessUnitId.value : data.currentBusinessUnitId;
      // data.listData = [];
      // data.listData.push({
      //   ID: fields.BusinessUnitId.value,
      //   Name: fields.BusinessUnitId.displayValue
      // })
      let data0 = {
        ApprovedBy: fields.ApprovedBy&&fields.ApprovedBy.displayValue ? fields.ApprovedBy.displayValue : data.currentUserName,
        BusinessUnitId: fields.BusinessUnitId&&fields.BusinessUnitId.displayValue ? fields.BusinessUnitId.displayValue : data.currentBusinessUnitName,
        ArticleNumber: fields.ArticleNumber ? fields.ArticleNumber.value : '',
        InstitutionType: fields.InstitutionType ? fields.InstitutionType.value : '',
        PublicationScope: fields.PublicationScope ? fields.PublicationScope.value : '',
        ActiveOn: fields.ActiveOn && fields.ActiveOn.value ? dayjs(new Date(fields.ActiveOn.value)).format("YYYY-MM-DD") : '',
        ExpiresOn: fields.ExpiresOn && fields.ExpiresOn.value ? dayjs(new Date(fields.ExpiresOn.value)).format("YYYY-MM-DD") : '',
        Name: fields.Name ? fields.Name.value : '',
        Description: fields.Description ? fields.Description.value : '',
        FolderId: fields.FolderId && fields.FolderId.value ? (fields.FolderId.value).toLowerCase() : '',
        StateCode: fields.StateCode ? fields.StateCode.value * 1 : '',
        IsImportant: fields.IsImportant && fields.IsImportant.value ? true : false,
        IsTop: fields.IsTop && fields.IsTop.value * 1 == 1 ? true : false,
        AttachRightCode: fields.AttachRightCode ? fields.AttachRightCode.value * 1 : '',
        EndTopDate: fields.EndTopDate && fields.EndTopDate.value ? dayjs(fields.EndTopDate.value.split('.')[0]).format("YYYY-MM-DD hh:mm:ss") : '',
        ApprovedOn: fields.ApprovedOn && fields.ApprovedOn.value ? dayjs(fields.ApprovedOn.value.split('.')[0]).format("YYYY-MM-DD hh:mm:ss") : '',
        IsPublic: fields.IsPublic && fields.IsPublic.value ? true : false,
        IssueDocNumber: fields.IssueDocNumber ? fields.IssueDocNumber.value : '',
        VersionNumber: fields.VersionNumber ? fields.VersionNumber.value : '',
        ValidTerm: fields.ValidTerm ? fields.ValidTerm.value : '',
        CoverDisplay: fields.CoverDisplay ? fields.CoverDisplay.value : '',
        Title: fields.Name ? fields.Name.value : ''
      }
      for(var item in data0){
        formState[item]=data0[item];
      }
      data.oldData = data0;
      data.oldData.ApprovedBy = fields.ApprovedBy&&fields.ApprovedBy.value ? fields.ApprovedBy.value : data.currentUserId;
      data.oldData.BusinessUnitId = fields.BusinessUnitId&&fields.BusinessUnitId.value ? fields.BusinessUnitId.value : data.currentBusinessUnitId;
      data.oldData.IsTop = fields.IsTop ? fields.IsTop.value : '';
    }
  })
}
const handleSubmit2 = () => {
  if (props.type == 'new') {
    message.success("创建成功！");
    formRef.value.resetFields();
    emit("cancel", false);
    emit("ok", '');
  } else if (props.type == 'history') {
    handleHistory();
  } else if (props.type == 'version') {
    handleVersion();
  }
};
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      if (props.type == 'new') {
        handleNew();
      } else if (props.type == 'history') {
        handleSave();
      } else if (props.type == 'version') {
        handleSave();
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
//创建
const handleNew = () => {
  let url = Interface.rulearticle.create;
  let d = {
    actions: [{
      id: "4105;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        ApprovedBy: data.ApprovedBy,
        BusinessUnitId: data.BusinessUnitId,
        ArticleNumber: formState.ArticleNumber,
        InstitutionType: formState.InstitutionType,
        PublicationScope: formState.PublicationScope,
        ActiveOn: formState.ActiveOn,
        ExpiresOn: formState.ExpiresOn,
        Name: formState.Name,
        Description: formState.Description,
        FolderId: formState.FolderId,
        StateCode: formState.StateCode,
        IsImportant: formState.IsImportant,
        IsTop: formState.IsTop ? 1 : 0,
        AttachRightCode: formState.AttachRightCode,
        EndTopDate: formState.EndTopDate,
        ApprovedOn: formState.ApprovedOn,
        IsPublic: formState.IsPublic,
        IssueDocNumber: formState.IssueDocNumber,
        VersionNumber: formState.VersionNumber,
        ValidTerm: formState.ValidTerm,
        CoverDisplay: formState.CoverDisplay,
        Title: formState.Name,
      }
    }]
  };
  if (data.id) {
    handleSave();
  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      data.id = res.actions[0].returnValue.valueId;
      data.uploadData.parentId = res.actions[0].returnValue.valueId;
      data.step = 1;
    } else {
      message.error("创建失败！");
    }
  });
}
//制度保存
const handleSave = () => {
  let url = Interface.create;
  
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'Institution',
          objTypeCode: '100204',
          fields: {
            ApprovedBy: data.ApprovedBy,
            BusinessUnitId: data.BusinessUnitId,
            ArticleNumber: formState.ArticleNumber,
            InstitutionType: formState.InstitutionType,
            PublicationScope: formState.PublicationScope,
            ActiveOn: formState.ActiveOn,
            ExpiresOn: formState.ExpiresOn,
            Name: formState.Name,
            Description: formState.Description,
            FolderId: formState.FolderId,
            StateCode: formState.StateCode,
            IsImportant: formState.IsImportant,
            IsTop: formState.IsTop ? 1 : 0,
            AttachRightCode: formState.AttachRightCode,
            EndTopDate: formState.EndTopDate,
            ApprovedOn: formState.ApprovedOn,
            IsPublic: formState.IsPublic,
            IssueDocNumber: formState.IssueDocNumber,
            VersionNumber: formState.VersionNumber,
            ValidTerm: formState.ValidTerm,
            CoverDisplay: formState.CoverDisplay
          }
        }
      }
    }]
  };
  if (data.id) {
    url = Interface.edit;
    d.actions[0].params.recordId = data.id;
  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    // if (props.type == 'history') {
    //   handleHistory();
    // } else if (props.type == 'version') {
    //   handleVersion();
    // }
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      data.step = 1;
    } else {
      message.error("保存数据失败！");
    }
  });
};
//修订
const handleVersion = () => {
  let url = Interface.rulearticle.revision;
  let oldData0=data.oldData;
  oldData0.ValueId=data.id;
  oldData0.description=formState.Description;
  let d = {
    actions: [{
      id: "4105;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: oldData0
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      message.success("修订成功！");
      formRef.value.resetFields();
      emit("cancel", false);
      emit("ok", '');
    } else {
      message.error("修订失败！");
    }
  });
}
//变更历史
const handleHistory = () => {
  let url = Interface.create;
  let oldData0=data.oldData;
  oldData0.ContentId=data.id;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'InstitutionHistory',
          objTypeCode: '100207',
          fields: oldData0
        }
      }
    }]
  };
  // if (data.id) {
  //   url = Interface.edit;
  //   d.actions[0].params.recordId = data.id;
  // }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      message.success("变更成功！");
      formRef.value.resetFields();
      emit("cancel", false);
      emit("ok", '');
    } else {
      message.error("变更失败！");
    }
  });
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

.sectionItem .ApprovedByName {
  border-radius: 4px !important;
  border-color: #d9d9d9 !important;
}

:where(.css-dev-only-do-not-override-kqecok).ant-tree-select-dropdown .ant-select-tree .ant-select-tree-treenode {
  width: 100%;
}

:where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag p.ant-upload-text {
  font-size: 14px;
}

.section .sectionTitle2 {
  margin-top: 10px;
  margin-bottom: 20px;
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

.NewRuleArticleWrap {
  .modalCenter1 {
    .section .sectionRow .sectionItem .ant-row {
      width: 100%;
      display: flex !important;
    }

    .ant-form {
      flex: 1;
    }

    .ant-form-item {
      margin-bottom: 20px !important;

      .ant-form-item-label {
        width: 79px !important;
      }
    }
  }

}
</style>