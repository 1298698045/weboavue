<template>
  <div class="wrapper">
    <div class="containerBox" ref="contentRef">
      <div class="leftMenu" v-if="isLeft">
        <div class="leftMenuItem" :class="{ active: leftCurrent == index }" @click="handleMenuClick(item, index)"
          v-for="(item, index) in menus" :key="index">
          <div class="menuIcon"><i :class="item.iconClass"></i></div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
      <div class="rightContainer">
        <div class="sanlan" :class="{ active: !isLeft }" @click="handleLeftShow"></div>
        <div class="layoutBodyHead">
          <div class="breadcrumb">
            <!-- <span class="breadcrumbItem active">
                            <span class="name">{{menus[leftCurrent].name}}</span>
                        </span> -->
            <span class="breadcrumbItem" :class="{ active: idx == breadcrumbListLength }"
              v-for="(item, idx) in breadcrumbList" :key="idx" @click="
                idx != breadcrumbListLength
                  ? handleBreadcrumbItem(item, idx)
                  : ''
                ">
              <span class="name">{{ item.name }}</span>
              <span clss="breadcrumbItemIcon" v-if="idx != breadcrumbListLength">/</span>
            </span>
          </div>
          <div class="rightBtns">
            <a-button class="ml10" v-if="
              folderId != '' &&
              (srchType == 'my' ||
                srchType == 'share' ||
                srchType == 'org' ||
                srchType == 'archive') &&
              Privilege &&
              (Privilege.canAdmin || Privilege.canEdit || Privilege.canEdit)
            " @click="handleSetFolderPrem">设置权限</a-button>
            <a-upload v-if="
              folderId != '' &&
              (srchType == 'my' ||
                srchType == 'share' ||
                srchType == 'org' ||
                srchType == 'archive') &&
              Privilege &&
              (Privilege.canAdmin || Privilege.canEdit || Privilege.canEdit)
            " name="files" :headers="headers" @change="changeFiles" :data="uploadData"
              :action="Interface.file.cloudUpload" :showUploadList="false">
              <!-- <template #itemRender="{ file, actions }"> </template> -->
              <a-button type="primary" class="ml10">
                <upload-outlined></upload-outlined>
                上传附件
              </a-button>
            </a-upload>
            <!-- <a-button class="ml10" v-if="folderId!=''&&(srchType=='my'||srchType=='share'||srchType=='org'||srchType=='archive')&&Privilege&&(Privilege.canAdmin||Privilege.canEdit||Privilege.canEdit)">上传文件</a-button> -->
            <a-button class="ml10" v-if="
              srchType == 'my' ||
              srchType == 'share' ||
              srchType == 'org' ||
              srchType == 'archive'
            " type="primary" @click="handleAddFolder">新建</a-button>
            <a-button class="ml10" v-if="
              folderId != '' &&
              (srchType == 'my' ||
                srchType == 'share' ||
                srchType == 'org' ||
                srchType == 'archive') &&
              Privilege &&
              (Privilege.canAdmin || Privilege.canEdit || Privilege.canEdit)
            ">文件夹排序</a-button>
            <a-button class="ml10" v-if="
              folderId != '' &&
              (srchType == 'my' ||
                srchType == 'share' ||
                srchType == 'org' ||
                srchType == 'archive') &&
              Privilege &&
              (Privilege.canAdmin || Privilege.canEdit || Privilege.canEdit)
            ">文件排序</a-button>
            <a-button class="ml10" v-if="srchType == 'recycle'">批量删除</a-button>
          </div>
        </div>
        <div class="layoutBodyCenter">
          <div class="mailListContainer">
            <div class="form">
              <a-form :model="formState" ref="formRef">
                <a-form-item name="Name">
                  <a-input v-model:value="formState.Name" placeholder="请输入文件名称"></a-input>
                </a-form-item>
                <a-form-item name="time" class="timeForm">
                  <a-range-picker v-model:value="formState.time" />
                </a-form-item>
                <a-form-item name="FileExtension">
                  <a-select v-model:value="formState.FileExtension" placeholder="请选择文件类型">
                    <a-select-option v-for="(item, index) in fileTypes" :key="index" :value="item.value">{{ item.label
                      }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-form>
              <div class="right-option">
                <a-button type="primary" @click="getQuery">查询</a-button>
                <a-button class="ml10" type="primary" @click="handleReset">重置</a-button>
              </div>
            </div>
            <div class="tableWrapper">
              <a-table :scroll="{ y: tableHeight }" :dataSource="listData" :columns="columns" :pagination="false"
                @change="handleTableChange">
                <template #bodyCell="{ column, record, index }">
                  <template v-if="column.key == 'number'">
                    <div>
                      {{ index + 1 }}
                    </div>
                  </template>
                  <template v-if="column.key == 'sort'">
                    <div class="sortImgs">
                      <img :src="require('@/assets/img/Ascending2.png')" alt="" />
                      <img :src="require('@/assets/img/Descending2.png')" alt="" />
                    </div>
                  </template>
                  <template v-if="column.key == 'fileExtension'">
                    <div class="fileItem" @click="handleOpenFile(record)">
                      <img :src="Interface.pathUrl + ':9091' + record.icon" />
                      <!-- <img :src="require('@/assets/img/filetype/doc.png')" v-if="
                        record.fileExtension == 'ocx' ||
                        record.fileExtension == 'docx' ||
                        record.fileExtension == 'doc'
                      " />
                      <img :src="require('@/assets/img/filetype/rar.png')" v-else-if="
                        record.fileExtension == 'rar' ||
                        record.fileExtension == 'zip'
                      " />
                      <img :src="require('@/assets/img/filetype/Excel.png')" v-else-if="
                        record.fileExtension == 'xlsx' ||
                        record.fileExtension == 'xls'
                      " />
                      <img :src="require('@/assets/img/filetype/pdf.png')" v-else-if="record.fileExtension == 'pdf'" />
                      <img :src="require('@/assets/img/filetype/TXT.png')" v-else-if="
                        record.fileExtension == 'TXT' ||
                        record.fileExtension == 'txt'
                      " />
                      <img :src="require('@/assets/img/filetype/PPT.png')" v-else-if="
                        record.fileExtension == 'ppt' ||
                        record.fileExtension == 'pptx'
                      " />
                      <img :src="require('@/assets/img/filetype/video.png')" v-else-if="
                        record.fileExtension == 'mp4' ||
                        record.fileExtension == '.mp4'
                      " />
                      <img :src="require('@/assets/img/filetype/defaultImg.png')" v-else-if="
                        record.fileExtension == 'jpg' ||
                        record.fileExtension == 'png' ||
                        record.fileExtension == 'gif'
                      " />
                      <img :src="require('@/assets/img/filetype/Folder.png')" v-else-if="record.type == 'folder'" />
                      <img :src="require('@/assets/img/filetype/File.png')" v-else /> -->
                      <span class="fileName">{{ record.name }}</span>
                    </div>
                  </template>
                  <template v-if="column.key === 'fileSize'">
                    <div>
                      {{ record.fileSize }}
                    </div>
                  </template>
                  <template v-if="column.key === 'action'">
                    <div>
                      <a-dropdown trigger="click">
                        <template #overlay>
                          <a-menu>
                            <a-menu-item v-if="
                              record.type == 'file' &&
                              (record.privilege
                                ? record.privilege.canRead ||
                                record.privilege.canAdmin
                                : record.canRead == 'true')
                            " @click="handleOpenFile(record)">查看</a-menu-item>
                            <a-menu-item v-if="
                              record.type == 'file' &&
                              (record.privilege
                                ? record.privilege.canRead ||
                                record.privilege.canAdmin
                                : record.canRead == 'true')
                            " @click="handleFileDetail(record)">详情</a-menu-item>
                            <a-menu-item v-if="
                              record.type == 'file' &&
                              (record.privilege
                                ? record.privilege.canDownload ||
                                record.privilege.canAdmin
                                : record.canAdmin == 'true')
                            " @click="handleDownLoadFile(record)">下载</a-menu-item>

                            <a-menu-item v-if="
                              record.type == 'folder' &&
                              (record.privilege
                                ? record.privilege.canEdit ||
                                record.privilege.canAdmin
                                : record.canAdmin == 'true')
                            " @click="handleEditFile(record)">编辑</a-menu-item>
                            <a-menu-item v-if="
                              record.privilege
                                ? record.privilege.canEdit ||
                                record.privilege.canAdmin
                                : record.canRead == 'true'
                            " @click="handleFileRename(record)">重命名</a-menu-item>
                            <a-menu-item
                              v-if="(record.privilege ? (record.privilege.canMove || record.privilege.canAdmin) : record.canRead == 'true') && srchType != 'recycle'"
                              @click="handleMoveFile(record)">移动</a-menu-item>
                            <template v-if="
                              (record.privilege
                                ? (record.privilege.canDelete ||
                                  record.privilege.canAdmin)
                                : record.canAdmin == 'true') ||
                              (SystemUserId &&
                                (record.CreatedBy == SystemUserId ||
                                  record.createdBy == SystemUserId))
                            ">
                              <a-menu-item v-if="srchType != 'recycle'"
                                @click="deleteFileOrFolder(0, record)">删除</a-menu-item>
                              <a-menu-item @click="deleteFileOrFolder(1, record)">彻底删除</a-menu-item>

                            </template>

                            <a-menu-item v-if="srchType == 'recycle'" @click="restore(record)">还原</a-menu-item>
                            <a-menu-item v-if="
                              srchType != 'favorite' &&
                              srchType != 'recycle' &&
                              record.type == 'file'
                            " @click="changeFavorite(1, record)">收藏</a-menu-item>
                            <!-- <a-popconfirm title="是否确定取消收藏?" ok-text="确定" cancel-text="取消" @confirm="changeFavorite(0,record)">
                              <a-menu-item v-if="srchType == 'favorite'">取消收藏</a-menu-item>
                            </a-popconfirm> -->
                            <a-menu-item v-if="srchType == 'favorite' && record.type == 'file'"
                              @click="changeFavorite(0, record)">取消收藏</a-menu-item>
                            <a-menu-item v-if="
                              record.privilege
                                ? record.privilege.canAdmin
                                : record.canAdmin == 'true'
                            " @click="handleSetPrem(record)">设置权限</a-menu-item>
                          </a-menu>
                        </template>
                        <a-button :icon="h(EllipsisOutlined)"></a-button>
                      </a-dropdown>
                    </div>
                  </template>
                </template>
              </a-table>
              <div class="pageWrap">
                <a-pagination show-size-changer show-quick-jumper :pageSizeOptions="['10', '20', '50', '80', '100']"
                  :pageSize="pagination.pageSize" @showSizeChange="sizeChange" @change="handleTableChange"
                  v-model:current="pagination.current" :total="pagination.total"
                  :show-total="total => `共 ${total} 条`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NewFolder :isShow="isNewFolder" v-if="isNewFolder" :fileParams="fileParams" :folderName="folderName"
      :folderPicker="folderPicker" @refresh="getQuery" @cancel="cancelNewModal" />
    <FileRename :isShow="isRename" v-if="isRename" :fileParams="fileParams" @cancel="cancelReName"
      @refresh="getQuery" />
    <FileMove :isShow="isFileMove" v-if="isFileMove" :fileParams="fileParams" @cancel="cancelFileMove"
      @refresh="getQuery" :srchType="srchType" />
    <Delete :isShow="isDelete" v-if="isDelete" :fileParams="fileParams" @cancel="cancelDelete" @ok="deleteOk" />
    <SetPermissions :isShow="isSetPerm" v-if="isSetPerm" @cancel="cancelPerm" :id="permId" :title="permTitle"
      :RegardingObjectTypeCode="RegardingObjectTypeCode" :RegardingObjectIdName="RegardingObjectIdName" />

    <!-- 图片预览 -->
    <PhotoPreview v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="cancelPhotoModal" />
    <!-- PDF预览 -->
    <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
    <Confirm v-if="isConfirm" :isShow="isConfirm" :title="confirmTitle" :desc="confirmDesc" @cancel="isConfirm = false"
      @ok="confirmFuc"></Confirm>
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
  h,
  toRaw,
  computed,
  nextTick
} from "vue";
import { KGBrowser, isSupportOfficePlug } from "@/jgfiles/js/WebOffice.js";
import { useRouter, useRoute } from "vue-router";
import {
  SearchOutlined,
  MoreOutlined,
  CopyOutlined,
  SortAscendingOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  EllipsisOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import NewFolder from "@/components/file/NewFolder.vue";
// 重命名
import FileRename from "@/components/file/FileRename.vue";
// 移动
import FileMove from "@/components/file/FileMove.vue";
import Delete from "@/components/listView/Delete.vue";
// 设置权限
import SetPermissions from "@/components/file/SetPermissions.vue";
import PhotoPreview from "@/components/file/PhotoPreview.vue";
import PdfView from "@/components/file/PdfView.vue";
import Confirm from "@/components/commonModal/Confirm.vue";
import { formTreeData } from "@/utils/common.js";
import { message } from "ant-design-vue";
const { proxy } = getCurrentInstance();
const formRef = ref();
const handleReset = () => {
  formRef.value.resetFields();
  getQuery();
};
const router = useRouter();
const formState = reactive({
  Name: "",
  startDate: "",
  endDate: "",
  FileExtension: null,
});
const time = ref();
const columns = toRaw([
  {
    title: "序号",
    dataIndex: "number",
    key: "number",
    width: 70,
  },
  {
    title: "排序",
    dataIndex: "sort",
    key: "sort",
    width: 100,
  },
  {
    title: "文件名称",
    dataIndex: "fileExtension",
    key: "fileExtension",
  },
  {
    title: "大小",
    dataIndex: "fileSize",
    key: "fileSize",
    width: 100,
  },
  {
    title: "创建时间",
    dataIndex: "createdOn",
    key: "createdOn",
    width: 150,
  },
  {
    title: "修改时间",
    dataIndex: "modifiedOn",
    key: "modifiedOn",
    width: 150,
  },
  {
    title: "创建人",
    dataIndex: "createdByName",
    key: "createdByName",
    width: 100,
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 100,
  },
]);
const token = localStorage.getItem("token");
const data = reactive({
  isLeft: true,
  menus: [
    {
      name: "我的文件",
      iconClass: "iconfont icon-wodewenjian",
      srchType: "my",
      folderPicker: "10010000-0000-0000-0000-000000000001",
    },
    {
      name: "我的收藏",
      iconClass: "iconfont icon-zhongyaoyoujian",
      srchType: "favorite",
      folderPicker: "10010000-0000-0000-0000-000000000001",
    },
    {
      name: "最近使用",
      iconClass: "iconfont icon-zuijinshiyong1",
      srchType: "latestuse",
      folderPicker: "10010000-0000-0000-0000-000000000001",
    },
    {
      name: "共享文件",
      iconClass: "iconfont icon-gongxiangwenjian",
      srchType: "share",
      folderPicker: "10010000-0000-0000-0000-000000000003",
    },
    {
      name: "团队文件",
      iconClass: "iconfont icon-danweiwenjian",
      srchType: "org",
      folderPicker: "10010000-0000-0000-0000-000000000002",
    },
    // {
    //   name: "流程归档",
    //   iconClass: "iconfont icon-guidangmulu",
    //   srchType: "archive",
    //   folderPicker: "10010000-0000-0000-0000-000000000303",
    // },
    {
      name: "回收站",
      iconClass: "iconfont icon-huishouzhan",
      srchType: "recycle",
      folderPicker: "10010000-0000-0000-0000-000000000303",
    },
  ],
  folderPicker: "10010000-0000-0000-0000-000000000001",
  leftCurrent: 0,
  fileTypes: [
    { label: "图片(jpg)", value: "jpg" },
    { label: "图片(jpeg)", value: "jpeg" },
    { label: "图片(png)", value: "png" },
    { label: "文本(txt)", value: "txt" },
    { label: "Word(docx)", value: "docx" },
    { label: "Excel(xls)", value: "xls" },
    { label: "PPT(pptx)", value: "pptx" },
    { label: "ZIP(zip)", value: "zip" },
    { label: "PDF(pdf)", value: "pdf" },
    { label: "视频(mp4)", value: "mp4" },
    { label: "音乐(mp3)", value: "mp3" },
  ],
  listData: [],
  breadcrumbList: [],
  pagination: {
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0,//数据总数
    pageSize: 10,
    current: 1,
    pageSizeOptions: ['10', '20', '50', '100'],
    defaultPageSize: 10,
    showTotal: ((total) => {
      return `共${total}条`
    })
  },
  total: 0,
  tableHeight: 0,
  isNewFolder: false,
  isRename: false,
  fileParams: {
    id: "",
    name: "",
  },
  isFileMove: false,
  isDelete: false,
  isSetPerm: false,
  srchType: "my",
  Privilege: {
    canEdit: false,
    canAdmin: false,
    canDelete: false,
    canDownload: false,
    canRead: false,
    canShare: false,
    canMove: false
  },
  folderId: "",
  SystemUserId: "",
  SystemUserName: "",
  isPhoto: false,
  photoParams: {
    id: '',
    item: {},
    imageList: [],
    index: 0
  },
  uploadData: {
    folderId: ""
  },
  headers: {
    Authorization: token,
    Token: token,
  },
  folderName: '我的文件',
  isPdf: false,
  pdfParams: {},
  RegardingObjectTypeCode: '100103',
  RegardingObjectIdName: 'FileFolder',
  permTitle: '文件夹',
  permId: '',
  isConfirm: false,
  confirmDesc: '',
  confirmTitle: '',
  confirmId: ''
});
const {
  isLeft,
  menus,
  leftCurrent,
  fileTypes,
  listData,
  breadcrumbList,
  tableHeight,
  isNewFolder,
  folderPicker,
  isRename,
  fileParams,
  isFileMove,
  isDelete,
  isSetPerm,
  srchType,
  Privilege,
  folderId,
  SystemUserId,
  SystemUserName,
  isPhoto,
  photoParams,
  uploadData,
  headers,
  pagination,
  total,
  folderName,
  isPdf,
  pdfParams,
  RegardingObjectTypeCode,
  RegardingObjectIdName,
  permTitle,
  permId,
  isConfirm,
  confirmDesc,
  confirmTitle,
  confirmId
} = toRefs(data);

// const folderName = computed(() => {
//   return data.menus[data.leftCurrent].name;
// });
const contentRef = ref(null);
const getUserInfo = () => {
  // proxy.$get(Interface.userInfo, {}).then((res) => {
  //   data.SystemUserId = res.userId;
  // });
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.SystemUserId = userInfo.userId;
    data.SystemUserName = userInfo.fullName;
    if (data.SystemUserId == 'jackliu') {
      data.SystemUserId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
    }
  }
};
getUserInfo();
onMounted(() => {
  console.log("contentRef.value.clientHeight", contentRef.value.clientHeight);
  data.tableHeight = contentRef.value.clientHeight - 260 + "px";
  window.addEventListener("resize", () => {
    data.tableHeight = contentRef.value.clientHeight - 260 + "px";
  });
});
data.breadcrumbList[0] = {
  name: data.menus[0].name,
  srchType: data.menus[0].srchType,
};
const breadcrumbListLength = computed(() => {
  return data.breadcrumbList.length - 1;
});
const handleLeftShow = () => {
  data.isLeft = !data.isLeft;
};
const getQuery = () => {
  // proxy.$get(Interface.file.list, {}).then((res) => {
  //   console.log("res", res);
  //   let files = res.files.map((item) => {
  //     item.type = "file";
  //     return item;
  //   });
  //   let folders = res.folders.map((item) => {
  //     item.type = "folder";
  //     return item;
  //   });
  //   data.listData = files.concat(folders);
  // });
  data.listData = [];
  data.pagination.total = 0;
  data.photoParams.imageList = [];
  let url = Interface.file.getLatestFiles;
  if (data.srchType == 'latestuse') {
    url = Interface.file.getLatestFiles;
  } else if (data.srchType == 'my' || data.srchType == 'org') {
    url = Interface.file.getOwnDirAndFiles;
  } else if (data.srchType == 'favorite') {
    url = Interface.file.getFavoriteFiles;
  } else if (data.srchType == 'recycle') {
    url = Interface.file.getRecycFolders;
  }
  let d = {
    "actions": [{
      "id": "4105;a",
      "descriptor": "",
      "callingDescriptor": "UNKNOWN",
      "params": {
        "pageNumber": data.pagination.current,
        "pageSize": data.pagination.pageSize,
        "folderId": data.folderId,
        "search": formState.Name,
        "fileExtension": formState.FileExtension,
        "time": formState.time
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then((res) => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0]
      .returnValue) {
      let result = [];
      let filelist = [];
      let folderlist = [];
      filelist = res.actions[0].returnValue.files;
      folderlist = res.actions[0].returnValue.folders;
      if (filelist && filelist.length) {
        filelist.forEach(item => {
          item.type = 'file';
        });
      }
      if (folderlist && folderlist.length) {
        folderlist.forEach(item => {
          item.fileExtension = 'folder';
          item.type = 'folder';
        });
        if (data.srchType == 'my' || data.srchType == 'org') {
          if (formState.Name || formState.FileExtension || formState.time) {
            result = filelist;
            data.total = res.actions[0].returnValue.files.length;
          }
          else {
            if (data.folderId) {
              result = filelist.concat(folderlist);
              data.total = res.actions[0].returnValue.files.length + res.actions[0]
                .returnValue
                .folders
                .length;
            } else {
              result = folderlist;
              data.total = res.actions[0].returnValue.folders.length;
            }
          }

        } else {
          result = filelist.concat(folderlist);
          data.total = res.actions[0].returnValue.files.length + res.actions[0].returnValue
            .folders
            .length;
        }
      } else {
        result = filelist;
        data.total = res.actions[0].returnValue.files.length;
      }
      result.forEach(item => {
        //item.Title = item.name || '';
        //item.createdByName = item.createdByName || '';
        item.createdOn = item.createdOn ? formatTime(item.createdOn) : '';
        item.modifiedOn = item.modifiedOn ? formatTime(item.modifiedOn) : '';
        item.fileSize = item.fileSize ? (item.fileSize * 1 / 1024).toFixed(2) + 'kb' : '';
        if (item.fileExtension == 'ppt' || item.fileExtension == 'pptx') {
          item.icon = '/img/filetype/PPT.png';
        } else if (item.fileExtension == 'xls' || item.fileExtension == 'xlsx') {
          item.icon = '/img/filetype/xls.png';
        } else if (item.fileExtension == 'doc' || item.fileExtension == 'docx') {
          item.icon = '/img/filetype/doc.png';
        } else if (item.fileExtension == 'png' || item.fileExtension == 'jpg' || item
          .fileExtension == 'jpeg') {
          item.icon = '/img/filetype/defaultImg.png';
          data.photoParams.imageList.push({
            id: item.id,
            Name: item.name,
            ThumbnailUrl: item.viewUrl ? Interface.pathUrl + ':9091' + item.viewUrl : '',
            CreatedBy: item.createdByName,
            CreatedOn: item.createdOn
          })
        } else if (item.fileExtension == 'pdf') {
          item.icon = '/img/filetype/pdf.png';
        } else if (item.fileExtension == 'txt') {
          item.icon = '/img/filetype/TXT.png';
        } else if (item.fileExtension == 'rar' || item.fileExtension == 'zip') {
          item.icon = '/img/filetype/rar.png';
        } else if (item.fileExtension == 'mp4' || item.fileExtension == 'avi') {
          item.icon = '/img/filetype/video.png';
        } else if (item.fileExtension == 'mp3') {
          item.icon = '/img/filetype/voice.png';
        } else if (item.fileExtension == 'folder') {
          item.icon = '/img/filetype/Folder1.png';
        } else {
          item.icon = '/img/filetype/File.png';
        }
        item['link'] = item.viewUrl ? Interface.pathUrl + ':9091' + item.viewUrl : '';
        item['ThumbnailUrl'] = item.viewUrl ? Interface.pathUrl + ':9091' + item.viewUrl : '';
        item.CreatedBy = item.createdByName;
        item.CreatedOn = item.createdOn;
        item.Name = item.name;
        item.privilege = {
          canEdit: true,
          canAdmin: true,
          canDelete: true,
          canDownload: true,
          canRead: true,
          canShare: true,
          canMove: true
        };
        if (item.fileActionsConfig) {
          item.privilege = {
            canEdit: item.fileActionsConfig.isEditable,
            canAdmin: item.fileActionsConfig.isEditable,
            canDelete: item.fileActionsConfig.isDeletable,
            canDownload: true,
            canRead: true,
            canShare: item.fileActionsConfig.isShareable,
            canMove: item.fileActionsConfig.canMove
          };
        }
      })

      data.listData = result;
      data.pagination.total = data.total;
    }
    //console.log('listData:', data.listData);
  })
};
const formatTime = (e) => {
  e = e ? (e.split('.')[0]).replace(/\-/g, '/') : '';
  let time = (new Date(e)).getTime();
  time = new Date(time);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  month = month > 9 ? month : '0' + month;
  let date = time.getDate();
  date = date > 9 ? date : '0' + date;
  let hour = time.getHours();
  hour = hour > 9 ? hour : '0' + hour;
  let minute = time.getMinutes();
  minute = minute > 9 ? minute : '0' + minute;
  const newTime = `${year}-${month}-${date} ${hour}:${minute}`;
  return newTime;
};
//改变页码
const handleTableChange = (page, pageSize) => {
  //data.pagination.current=page.current;
  data.pagination.current = page;
  data.pagination.pageSize = pageSize;
  getQuery();
}
const sizeChange = (current, size) => {
  handleTableChange(current, size)
}
getQuery();
const handleMenuClick = (item, index) => {
  data.leftCurrent = index;
  data.folderPicker = item.folderPicker;
  data.uploadData.folderId = item.folderPicker;
  data.folderId = '';
  data.folderName = item.name;
  data.srchType = item.srchType;
  data.Privilege = {
    canEdit: false,
    canAdmin: false,
    canDelete: false,
    canDownload: false,
    canRead: false,
    canShare: false,
    canMove: false
  };
  data.breadcrumbList[0] = {
    name: data.menus[index].name,
    srchType: data.menus[index].srchType,
  };
  formRef.value.resetFields();
  getQuery();
};
// 面包屑切换
const handleBreadcrumbItem = (item, idx) => {
  data.uploadData.folderId = item.id;
  data.folderId = item.id;
  data.folderPicker = item.id;
  data.folderName = item.name;
  data.Privilege = item.privilege;
  data.breadcrumbList = data.breadcrumbList.slice(0, idx + 1);
  formRef.value.resetFields();
  getQuery();
};
//文件预览
let KGBrowser1 = "";
if (typeof KGBrowser != "undefined") {
  KGBrowser1 = new KGBrowser();
}
console.log("KGBrowser1", KGBrowser1);
const RunKGBrowser = (url) => {
  var strOptions = "$skin=1$tabshow=1";
  var search = "";
  if (url) {
    search = url.split("?")[1] || "";
  }
  console.log(search, "123123");
  var str2 = "/jgfiles/KGBrowser/Word.aspx?" + search;
  if (KGBrowser1 != "" && KGBrowser1 != "undefined") {
    KGBrowser1.openWindowBrowser(
      str2 + "$skin=0$titlecolor=f6f6f6$tabshow=1",
      strOptions,
      false
    );
  }
};
const openControlViewFile = (url, type, link, name) => {
  var abc = isSupportOfficePlug();
  if (!abc) {
    if (
      (url && url.indexOf("/jgfiles/samples") != -1) ||
      (link && link.indexOf("/jgfiles/samples") != -1)
    ) {
      RunKGBrowser(url);
    } else {
    }
  } else {
  }
};
const handleOpenFile = (item) => {
  console.log("item", item);
  if (item.type == "folder") {
    data.uploadData.folderId = item.id;
    data.folderId = item.id;
    data.folderPicker = item.id;
    data.folderName = item.name;
    data.Privilege = item.privilege;
    data.breadcrumbList.push({
      name: item.name,
      type: item.type,
      privilege: item.privilege,
      id: item.id,
    });
    handleChild(item.id);
  } else if (item.type == "file") {
    if (item.fileExtension == 'png' || item.fileExtension == 'jpg') {
      data.photoParams.id = item.id;
      data.photoParams.item = item;
      data.photoParams.index = data.photoParams.imageList.findIndex(
        (ite) => ite.id == item.id
      );
      data.isPhoto = true;
    } else if (item.fileExtension == 'pdf') {
      data.pdfParams = {
        id: item.id,
        name: item.name,
        index: 0,
        viewUrl: item.viewUrl,
        downloadUrl: item.downloadUrl
      };
      data.isPdf = true;
    } else {
      openControlViewFile(
        item.link,
        item.fileExtension,
        item.viewLink,
        item.name + "." + item.fileExtension
      );
    }
  }
};
const handleDownLoadFile = (item) => {
  if (item.downloadUrl) {
    let url = Interface.pathUrl + ':9091' + item.downloadUrl;
    window.open(url);
  }
};
const handleChild = () => {
  formRef.value.resetFields();
  getQuery();
  // proxy.$get(Interface.file.child, {}).then((res) => {
  //   console.log("res", res);
  //   let files = res.files.map((item) => {
  //     item.type = "file";
  //     return item;
  //   });
  //   let folders = res.folders.map((item) => {
  //     item.type = "folder";
  //     return item;
  //   });
  //   data.listData = files.concat(folders);
  // });
};
const handleAddFolder = () => {
  data.fileParams = {};
  data.isNewFolder = true;
};
const handleEditFile = (item) => {
  data.fileParams = {
    id: item.id,
    name: item.name,
  };
  data.isNewFolder = true;
};
const cancelNewModal = (e) => {
  data.isNewFolder = e;
};
const handleFileRename = (item) => {
  data.fileParams = {
    id: item.id,
    name: item.name,
    type: item.type
  };
  data.isRename = true;
};
const cancelReName = (e) => {
  data.isRename = e;
};
// 移动
const handleMoveFile = (item) => {
  data.fileParams = {
    id: item.id,
    name: item.name,
  };
  data.isFileMove = true;
};
//还原
const restore = (item) => {
  data.confirmTitle = '还原';
  if (item.type == 'folder') {
    data.confirmDesc = '确定要还原该文件夹？';
  }
  else {
    data.confirmDesc = '确定要还原该文件？';
  }
  data.isConfirm = true;
  data.confirmId = item.id;
};
// 删除
const deleteFileOrFolder = (type, item) => {
  let text = '确定要删除该文件？'
  if (type == 0) {
    if (item.type == 'file') {
      text = '确定要删除该文件？'
    }
    else {
      text = '确定要删除该文件夹？'
    }
  }
  else {
    if (item.type == 'file') {
      text = '确定要彻底删除该文件？'
    }
    else {
      text = '确定要彻底删除该文件夹？'
    }
  }
  data.confirmTitle = type == 0 ? '删除' : '彻底删除';
  data.confirmDesc = text;
  data.isConfirm = true;
  data.confirmId = item.id;
}
const confirmFuc = (e) => {
  data.isConfirm = e;
  let url = '';
  let d = {};
  if (data.confirmDesc == '确定要删除该文件？') {
    url = Interface.file.fakeDelete;
    d = {
      fileId: data.confirmId
    };
  }
  else if (data.confirmDesc == '确定要删除该文件夹？') {
    url = Interface.file.fakeDeleteFolder;
    d = {
      folderId: data.confirmId
    };
  }
  else if (data.confirmDesc == '确定要彻底删除该文件？') {
    url = Interface.file.delete;
    d = {
      fileId: data.confirmId
    };
  }
  else if (data.confirmDesc == '确定要彻底删除该文件夹？') {
    url = Interface.file.deleteFolder;
    d = {
      folderId: data.confirmId
    };
  }
  else if (data.confirmDesc == '确定要还原该文件？') {
    url = Interface.file.restoreFile;
    d = {
      fileId: data.confirmId
    };
  }
  else if (data.confirmDesc == '确定要还原该文件夹？') {
    url = Interface.file.restoreFolder;
    d = {
      folderId: data.confirmId
    };
  }
  else if (data.confirmDesc == '确定要收藏该文件？') {
    url = Interface.file.favoriteFile;
    d = {
      fileId: data.confirmId
    };
  }
  else if (data.confirmDesc == '确定要取消收藏该文件？') {
    url = Interface.file.cancelFavoriteFile;
    d = {
      fileId: data.confirmId
    };
  }
  if (url) {
    proxy.$post(url, d).then((res) => {
      if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
        message.success(data.confirmTitle + "成功！");
        getQuery();
      } else {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
          message.error(res.actions[0].errorMessage);
        } else {
          message.error(data.confirmTitle + "失败！");
        }
      }
    });
  }

}
// const handleDeleteFile = (item) => {
//   data.fileParams = {
//     id: item.id,
//     name: item.name,
//     type: item.type,
//   };
//   data.isDelete = true;
// };
const deleteOk = (e) => {
  console.log("fileParams", data.fileParams);
  console.log("e", e);
  proxy
    .$get(Interface.file.delete, {
      ID: data.fileParams.id,
      IsFolder: data.fileParams.type == "folder" ? 1 : 0,
    })
    .then((res) => {
      message.success("删除成功！");
      data.isDelete = false;
      getQuery();
    });
};
// 设置权限当前目录
const handleSetFolderPrem = (item) => {
  data.RegardingObjectTypeCode = '100103';
  data.RegardingObjectIdName = 'FileFolder';
  data.permTitle = '文件夹';
  data.permId = data.folderId;
  data.isSetPerm = true;
};
// 设置权限文件/文件夹权限
const handleSetPrem = (item) => {
  // data.fileParams = {
  //   id: item.id,
  //   name: item.name,
  // };
  if (item.type == 'folder') {
    data.RegardingObjectTypeCode = '100103';
    data.RegardingObjectIdName = 'FileFolder';
    data.permTitle = '文件夹';
  }
  else {
    data.RegardingObjectTypeCode = '100100';
    data.RegardingObjectIdName = 'File';
    data.permTitle = '文件';
  }
  data.permId = item.id;
  data.isSetPerm = true;
};
const cancelDelete = (e) => {
  data.isDelete = e;
};
const cancelFileMove = (e) => {
  data.isFileMove = e;
};
const cancelPerm = (e) => {
  data.isSetPerm = e;
};
// 文件详情
const handleFileDetail = (item) => {
  const url = router.resolve({
    name: "FileDetail",
    query: {
      id: item.id,
      name: item.name,
      srchType: data.srchType,
      folderId: data.folderId
    },
  });
  window.open(url.href);
};
// 收藏
const handleAddFavor = (item) => {
  proxy
    .$get(Interface.file.favorite, {
      fileId: item.id,
    })
    .then((res) => {
      console.log("res", res);
      message.success("收藏成功！");
      getQuery();
    });
};
// 取消收藏
const cancelFavor = (item) => {
  proxy
    .$get(Interface.file.deleteFavor, {
      fileId: item.id,
    })
    .then((res) => {
      console.log("res", res);
      message.success("取消收藏成功！");
      getQuery();
    });
};
// 收藏/取消收藏文件
const changeFavorite = (type, item) => {
  if (type * 1 == 1) {
    data.confirmTitle = '收藏';
    data.confirmDesc = '确定要收藏该文件？';
  }
  else {
    data.confirmTitle = '取消收藏';
    data.confirmDesc = '确定要取消收藏该文件？';
  }
  data.confirmId = item.id;
  //data.isConfirm = true;
  nextTick(() => {
    confirmFuc(false);
  })
};
const cancelPhotoModal = (e) => {
  data.isPhoto = e;
};
const changeFiles = (e) => {
  // console.log("e", e);
  if (e.file.status == "done") {
    message.success("上传成功！");
    getQuery();
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;

  .containerBox {
    width: 100%;
    height: 100%;
    display: flex;

    .leftMenu {
      min-width: 116px;
      width: 116px;
      height: 100%;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding: 8px;
      box-sizing: border-box;
      background: #fff;

      .leftMenuItem {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        color: #4e5969;
        background: #fff;
        cursor: pointer;
        box-sizing: border-box;
        margin-bottom: 4px;
        border-radius: 2px;

        .menuIcon {
          .iconfont {
            font-size: 14px;
            padding-left: 10px;
            font-weight: initial;
          }
        }

        .name {
          padding-left: 8px;
        }

        &:hover {
          background: #f2f3f5;
        }

        &.active {
          color: var(--textColor);
          background: #f2f3f5;
          opacity: 0.8;
        }
      }
    }

    .rightContainer {
      flex: 1;
      width: calc(~"100% - 116px");
      height: 100%;
      padding: 16px 20px;
      background: #fff;
      border-left: 1px solid #e5e6eb;
      box-sizing: border-box;
      position: relative;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;

      .layoutBodyHead {
        min-height: 40px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e5e6eb;

        .breadcrumb {
          line-height: 40px;

          .breadcrumbItem {
            font-size: 14px;
            padding-left: 10px;

            &.active {
              color: #1d2129;
              font-weight: bold;
              cursor: initial;
            }

            &:hover {
              .name {
                cursor: pointer;
                color: var(--textColor);
              }
            }

            &.active:hover {
              .name {
                cursor: unset;
                color: #1d2129;
              }
            }
          }
        }

        .rightBtns {
          display: flex;
        }
      }

      .layoutBodyCenter {
        height: calc(~"100% - 50px");
        padding: 20px 0 0 0;

        .mailListContainer {
          height: 100%;

          .form {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .ant-form {
              display: flex;

              .ant-form-item {
                width: 200px;
                margin-right: 12px;
              }

              .ant-form-item.timeForm {
                width: 300px;
              }
            }
          }


        }
      }
    }
  }
}

.sanlan {
  width: 18px;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -30px;
  z-index: 11;
  cursor: pointer;
  background: url("~@/assets/img/leftTree-show.png") no-repeat -2px 0;
}

.sanlan:hover {
  background: url("~@/assets/img/leftTree-show-hover.png") no-repeat -2px 0;
}

.sanlan.active {
  background: url("~@/assets/img/leftTree-hide.png") no-repeat -2px 0;
}

.sanlan.active:hover {
  background: url("~@/assets/img/leftTree-hide-hover.png") no-repeat -2px 0;
}

.sortImgs {
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    cursor: pointer;
  }
}

.fileItem {
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
}

body .ant-table-tbody td {
  padding: 6.5px 16px !important;
}

body .ant-table-measure-row td {
  padding: 0 !important;
}

body .ant-table-wrapper .ant-table-thead>tr>th {
  background-color: #f7fbfe !important;
  padding: 8.5px 16px !important;
}

body .ant-table-tbody tr:hover,
body .ant-table-tbody tr:hover td {
  background-color: #e9f7ff !important;
  color: #108def !important;
}

body .ant-table-tbody tr:nth-child(odd) {
  background-color: rgb(250, 250, 250) !important;
  /* 奇数行背景色 */
}

body .ant-table-tbody tr:nth-child(even) {
  background-color: #fff !important;
  /* 偶数行背景色 */
}

.ant-pagination {
  text-align: right;
  margin-top: 15px;

  .ant-pagination-item {
    border: 1px solid #d9d9d9;
  }

  .ant-pagination-item:hover {
    border: 1px solid #1677ff;
    background: #fff !important;
  }

  .ant-pagination-item-active,
  .ant-pagination-item-active:hover {
    border: 1px solid #1677ff;
    background: #1677ff !important;

    a {
      color: #fff;
    }
  }
}
</style>
