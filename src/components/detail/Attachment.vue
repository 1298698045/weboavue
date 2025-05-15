<template>
  <div class="MeetingShareWrap" ref="TopicsLst">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-head">
        <div class="panel-title">附件</div>
        <div class="panel-btn" v-if="preview != 1 && attachPerm.add">
          <a-upload v-model:file-list="fileList" :headers="headers" :data="uploadData" :action="Interface.uploadFiles"
            :showUploadList="false" multiple name="files" @change="handleChange">
            <a-button class="ml10" type="primary">上传文件</a-button>
          </a-upload>
        </div>
      </div>
      <div class="panel-bd panel-bd1">
        <a-table :columns="columns" :dataSource="listData" :scroll="{ y: tableHeight }" :pagination="false"
          @change="handleTableChange" :customRow="rowClick">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template v-if="column.key === 'fileExtension'">
              <div class="FileExtensionTdImg">
                <img :src="require('@/assets/img/filetype/doc.png')"
                  v-if="record.fileExtension == 'ocx' || record.fileExtension == 'docx' || record.fileExtension == 'doc'" />
                <img :src="require('@/assets/img/filetype/rar.png')"
                  v-else-if="record.fileExtension == 'rar' || record.fileExtension == 'zip'" />
                <img :src="require('@/assets/img/filetype/Excel.png')"
                  v-else-if="record.fileExtension == 'xlsx' || record.fileExtension == 'xls'" />
                <img :src="require('@/assets/img/filetype/pdf.png')" v-else-if="record.fileExtension == 'pdf'" />
                <img :src="require('@/assets/img/filetype/TXT.png')"
                  v-else-if="record.fileExtension == 'TXT' || record.fileExtension == 'txt'" />
                <img :src="require('@/assets/img/filetype/PPT.png')"
                  v-else-if="record.fileExtension == 'ppt' || record.fileExtension == 'pptx'" />
                <img :src="require('@/assets/img/filetype/video.png')"
                  v-else-if="record.fileExtension == 'mp4' || record.fileExtension == '.mp4'" />
                <img :src="require('@/assets/img/filetype/defaultImg.png')"
                  v-else-if="record.fileExtension == 'jpg' || record.fileExtension == 'png' || record.fileExtension == 'gif'" />
                <img :src="require('@/assets/img/filetype/File.png')" v-else />
                <span>{{ record.fileExtension || '' }}</span>
              </div>
            </template>
            <!-- <template v-if="column.key === 'SharedRights'">
                  <div v-if="record.SharedRights=='2'">允许查看</div>
                  <div v-if="record.SharedRights=='4'">允许查看和新建任务</div>
                </template> -->
            <template v-if="column.key === 'name'">
              <div @click.stop="handlePreviewFile(record)" v-if="attachPerm.read" class="filename">
                {{ record.name }}
              </div>
              <div @click.stop="handlePreviewFile(record)" v-else>
                {{ record.name }}
              </div>
            </template>
            <template v-if="column.key === 'Action'">
              <div class="iconBox">
                <div class="popup">
                  <div class="option-item" v-if="attachPerm.read" @click.stop="handlePreviewFile(record)" :num="index">查看
                  </div>
                  <!-- <div class="option-item" @click="handleEdit(record)" :num="index">编辑</div>   -->
                  <div class="option-item" :num="index" @click.stop="handleRename(record)">重命名</div>
                  <div class="option-item" v-if="attachPerm.delete" @click.stop="handleDelete(record)" :num="index">删除</div>
                  <div class="option-item" @click.stop="downloadFile(record)" :num="index">下载</div>
                </div>
                <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation"
                  data-v-69a58868="">
                  <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474"
                    data-v-69a58868=""></path>
                </svg>
              </div>
              <!-- <a-button type="text" size="small" @click="handlePreviewFile(record)" :num="index">查看</a-button>
                  <a-button type="text" size="small" @click="handleEdit(record)" :num="index">编辑</a-button>
                  <a-button type="text" size="small" @click="handleDelete(record)" :num="index">删除</a-button> -->
            </template>
            <!-- <template v-if="column.key === 'index'">
                  <div>
                    {{ index + 1 }}
                  </div>
                </template>
                <template v-if="column.key === 'sort'">
                  <div class="sortIcon">
                    <ArrowUpOutlined />
                    <ArrowDownOutlined />
                  </div>
                </template> -->
          </template>
        </a-table>
        <div class="pageWrap">
          <a-pagination show-size-changer show-quick-jumper :pageSizeOptions="['10', '20', '50', '80', '100']"
            :pageSize="pagination.pageSize" @showSizeChange="sizeChange" @change="handleTableChange"
            v-model:current="pagination.current" :total="pagination.total" :show-total="total => `共 ${total} 条`" />
        </div>
      </div>
    </div>
    <radio-user v-if="isRadioUser" :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser"
      @ok="onSearch"></radio-user>
    <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @selectVal="handleDeptParams" @cancel="cancelDeptModal"
      @ok="onSearch"></radio-dept>
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId ? '编辑' : '新建'"
      @load="onSearch" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal>
    <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch"
      :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
    <AddMeetingShare :isShow="isShare" v-if="isShare" @cancel="onSearch" :id="props.id" />
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle"
      @cancel="isConfirm = false" @ok="deleteFile" :id="recordId" />
    <ImageView v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto = false" />
    <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
    <TxtView v-if="isTxt" :isShow="isTxt" :txtParams="txtParams" @cancel="isTxt = false" />
    <Rename
      :isShow="isRename"
      v-if="isRename"
      @cancel="handleRenameCancel"
      :id="recordId"
      fieldName="Name"
      :name="fileName"
      sObjectName="RelatedAttachment"
      objTypeCode="1001"
      @success="getQuery"
    />
  </div>
</template>
<script setup>
  import "@/style/common.less";
  import {
    ref,
    toRefs,
    reactive,
    toRaw,
    onMounted,
    watch,
    getCurrentInstance,
    defineEmits,
    defineExpose,
    defineProps,
    h,
    nextTick,
  } from "vue";
  import axios from "axios";
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  dayjs.locale('zh-cn');
  import calendar from 'dayjs/plugin/calendar';
  import weekday from 'dayjs/plugin/weekday';
  import localeData from 'dayjs/plugin/localeData';

  dayjs.extend(calendar);
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  import {
    SwapLeftOutlined,
    SwapRightOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CheckCircleOutlined
  } from "@ant-design/icons-vue";
  import Interface from "@/utils/Interface.js";
  import { girdFormatterValue } from "@/utils/common.js";
  import { message } from "ant-design-vue";
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import RadioDept from "@/components/commonModal/RadioDept.vue";
  import Delete from "@/components/listView/Delete.vue";
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  import AddMeetingShare from "@/components/meeting/AddMeetingShare.vue";
  import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
  import ImageView from "@/components/file/ImageView.vue";
  import PdfView from "@/components/file/PdfView.vue";
  import TxtView from "@/components/file/TxtView.vue";
  import Rename from "@/components/commonModal/Rename.vue";

  const { proxy } = getCurrentInstance();
  const TopicsLst = ref();
  const TaskDetailModal = ref(null);
  var columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 80,
    },
    {
      title: "类型",
      dataIndex: "fileExtension",
      key: "fileExtension",
      width: 200,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "size",
      width: 200,
    },
    {
      title: "创建时间",
      dataIndex: "createdOn",
      key: "createdOn",
      width: 200,
    },
    {
      title: "创建人",
      dataIndex: "createdByName",
      key: "createdByName",
      width: 200,
    },
    {
      title: "操作",
      key: "Action",
      width: 120,
    },
  ];
  const props = defineProps({
    processInstanceId: String,
    preview: [Number, String],
    attachPerm: Object
  });

  const emit = defineEmits(["load"]);
  const token = localStorage.getItem("token");
  const data = reactive({
    list: [],
    fileList: [],
    fileList1: [],
    selectedRowKeys: [],
    loading: false,
    listData: [],
    searchVal: "",
    OwningBusinessUnitName: "",
    isRadioUser: false,
    isRadioDept: false,
    isCommon: false,
    isShare: false,
    isTaskDetail: false,
    RoleCode: 0,
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
    recordId: '',
    objectTypeCode: '1001',
    sObjectName: 'RelatedAttachment',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external: false,
    CheckinStatus: null,
    StatusCode: null,
    Checkin: null,
    Checkin1: null,
    Checkin2: null,
    height: 100,
    isConfirm: false,
    confirmText: '',
    confirmTitle: '',
    uploadData: {
      parentId: props.processInstanceId,
      entityName: "WFProcessInstance"
    },
    headers: {
      Authorization: token,
      Token: token,
    },
    ImageList: [],
    isPhoto: false,
    isPdf: false,
    photoParams: {},
    pdfParams: {},
    isRename: false,
    fileName: "",
    isTxt: false,
    txtParams: {}
  });
  const columnList = toRaw(columns);
  const { isTxt, txtParams, listData, fileList, height, searchVal, fileList1, OwningBusinessUnitName, pagination,
    tableHeight, recordId, objectTypeCode, sObjectName, isDelete, isCommon, isTaskDetail, isShare, deleteDesc, external,
    isRadioUser, CheckinStatus, StatusCode, Checkin, Checkin1, Checkin2, isRadioDept, isConfirm, confirmText, confirmTitle,
    uploadData, headers, ImageList, isPhoto, isPdf, photoParams, pdfParams, isRename, fileName } = toRefs(data);
  const getQuery = () => {
    debugger
    data.listData = [];
    data.pagination.total = 0;
    let url = Interface.getFiles;
    let d = {
      parentId: props.processInstanceId,
      page: data.pagination.current,
      rows: data.pagination.pageSize,
    }
    proxy.$post(url, d).then(res => {
      var list = [];
      if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue) {
        data.total = res.actions[0].returnValue.length || 0;
        data.pagination.total = res.actions[0].returnValue.length || 0;
        for (var i = 0; i < res.actions[0].returnValue.length; i++) {
          var item = res.actions[0].returnValue[i];
          let size = item.fileSize;
          size = size ? (size * 1 / 1024).toFixed(2) : 0;
          size = size + 'kb';
          let name = item.name || '';
          if (name) {
            name = name.replaceAll('.' + item.fileExtension, '');
          }
          item.key = item.id;
          item.size = size;
          item.url = '/' + props.entityName + '/' + item.id + '/' + name;
        }
      }
      data.listData = res.actions[0].returnValue;
      data.ImageList = data.listData.filter(item => {
        return item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png';
      });
    })
  };
  
  const rowClick = (record) => {
    return {
      onClick: (columns) => {
        const rec = record;
        console.log(rec)
        handlePreviewFile(rec);
      }
    }
  }

  //预览附件
  const handlePreviewFile = (item) => {
    console.log("item", item);
    // let url = '/api/file/attachment/preview' + item.fileLocation;
    // //window.open(url);
    // let xhr = new XMLHttpRequest();
    // xhr.open('GET', url, true);
    // xhr.responseType = 'blob';
    // xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
    // xhr.setRequestHeader('token', window.localStorage.getItem('token'));
    // xhr.onload = function () {
    //   if (this.status === 200) {
    //     var blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
    //     var link = document.createElement('a');
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = fileName;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // };
    // xhr.send();
    let url = '';
    if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
      // url = item.viewUrl;
      // window.open(url);
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
      // url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(item.viewUrl);
      data.pdfParams = {
        id: item.id,
        name: item.name,
        index: 0,
        viewUrl: item.viewUrl,
        downloadUrl: item.downloadUrl
      };
      data.isPdf = true;
    }
    else if (item.fileExtension == 'txt') {
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
  const downloadFile2 = (item) => {
    // console.log('item', item);
    let url = item.downloadUrl;
    let fileName = item.name;
    //window.open(url);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
    xhr.setRequestHeader('token', window.localStorage.getItem('token'));
    xhr.onload = function () {
      if (this.status === 200) {
        var blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    xhr.send();
  };
  const downloadFile = (item) => {
    let url = item.downloadUrl;
    window.open(url);
  }
  const windowOpen = (url, fileName) => {

    var xhr = new XMLHttpRequest();
    // var fileName = window.fileName + typeName; // 文件名称
    xhr.open('POST', url, true);
    xhr.responseType = 'blob';
    // xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
    // xhr.setRequestHeader('token', localStorage.getItem('token'));
    xhr.onload = function (res) {
      if (this.status === 200) {
        var type = xhr.getResponseHeader('Content-Type');
        var blob = new Blob([this.response], { type: type });
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          /*
           * For IE
           * >=IE10
           */
          window.navigator.msSaveBlob(blob, fileName);
        } else {
          /*
           * For Non-IE (chrome, firefox)
           */
          var URL = window.URL || window.webkitURL;
          var objectUrl = URL.createObjectURL(blob);
          if (fileName) {
            var a = document.createElement('a');
            if (typeof a.download === 'undefined') {
              window.location = objectUrl;
            } else {
              a.href = objectUrl;
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              a.remove();
            }
          } else {
            window.location = objectUrl;
          }
        }
      }
    }
    xhr.send();
  }
  //删除附件
  const deleteFile = (id) => {
    let d = {
      actions: [{
        id: "4105;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          parentId: props.id,
          entityName: props.entityName,
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
        getQuery();
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
  const onSearch = (e) => {
    data.isDelete = false;
    data.isShare = false;
    getQuery();
  };
  const onClear = (e) => {
    data.searchVal = '';
    data.StatusCode = null;
    data.CheckinStatus = null;
    data.Checkin = null;
    getQuery();
  };
  const changeRangeDate = (e) => {
    //console.log("e",e,item);
    if (e && e.length) {
      data.Checkin = e.join(',');
      data.Checkin1 = e[0];
      data.Checkin2 = e[1];
    }
    else {
      data.Checkin = '';
    }
  }
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
  // 添加成员
  const AddNew = () => {
    data.isRadioUser = true;
    data.RoleCode = 0;
  }
  // 添加管理员
  const AddAdmin = () => {
    data.RoleCode = 2;
    data.isRadioUser = true;
  };
  const closeUser = (e) => {
    data.isRadioUser = false;
  };
  // 添加成员/管理员
  const getUserData = (params) => {
    console.log("params:", params);
    let url = Interface.create;
    let d = {
      actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: data.sObjectName,
            objTypeCode: data.objectTypeCode,
            fields: {
              MeetingId: props.id,
              InviteeId: params.id,
              Name: params.name,
              StatusCode: 1
            }
          }
        }
      }]
    };

    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
      data.isRadioUser = false;
      if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
        message.success("添加成功！");
        onSearch();
      }

    });

  };
  const cancelDeptModal = (params) => {
    data.isRadioDept = params;
  };
  const handleDeptParams = (params) => {
    console.log("deptData", params);
  };

  defineExpose({ getQuery, TopicsLst });
  //删除
  const handleDelete = (item) => {
    data.recordId = item.id;
    data.confirmText = '确定要删除吗？'
    data.confirmTitle = '删除'
    data.isConfirm = true;
  }
  //删除关闭
  const cancelDelete = (e) => {
    data.isDelete = false;
  };
  //新建
  const handleNew = (e) => {
    data.recordId = '';
    //data.isShare = true;
  }
  //编辑
  const handleEdit = (key) => {
    data.recordId = key;
    //data.isShare = true;
  }
  // 通用弹窗关闭
  const handleCommonCancel = (params) => {
    data.isCommon = false;
  };
  //去重
  const unique = (list) => {
    for (var i = 0; i < list.length; i++) {
      for (var j = i + 1; j < list.length; j++) {
        if (list[i].uid == list[j].uid) {
          list.splice(j, 1)
          j--;
        }
      }
    }
    return list;
  }
  const beforeUpload = (e) => {
    //执行顺序1
    console.log("beforeUpload", e);
  }
  const handleChange = (e) => {
    if (e.file.status == "done") {
      message.success("上传成功！");
      getQuery();
    }
  }
  const changeRequest = (file) => {
    //执行顺序3
    nextTick(() => {
      if (data.fileList1 && data.fileList1.length && props.id) {
        let isHasNew = false;
        var fd = new FormData();
        fd.append('parentId', props.id);
        fd.append('entityName', props.entityName);
        for (var i = 0; i < data.fileList1.length; i++) {
          var item = data.fileList1[i];
          if (item.raw && item.isNew) {
            fd.append('files', item.raw);
            data.fileList1[i].isNew = false;
            isHasNew = true;
          }
        }
        if (isHasNew) {
          axios({
            url: Interface.uploadFiles,
            method: 'POST',
            data: fd,
            headers: {
              'Content-type': 'multipart/form-data',
            },
          }).then(res => {
            message.success("上传成功！");
            getQuery();
          }).catch(err => {
            console.log('error', err);
            message.error("上传失败！");
          });
        }
      }
    })
  }
  onMounted(() => {
    let h = document.documentElement.clientHeight;
    data.tableHeight = h - 325;
    data.height = h - 137;
    if (props.type == 'modal') {
      data.tableHeight = h - 470;
      data.height = h - 285;
    }
    if (props.type == 'group') {
      data.tableHeight = h - 540;
      data.height = h - 355;
    }
    window.addEventListener("resize", (e) => {
      let h = document.documentElement.clientHeight;
      data.tableHeight = h - 325;
      data.height = h - 137;
      if (props.type == 'modal') {
        data.tableHeight = h - 470;
        data.height = h - 285;
      }
      if (props.type == 'group') {
        data.tableHeight = h - 540;
        data.height = h - 355;
      }
    });
  })
  const handleRenameCancel = () => {
    data.isRename = false;
  }
  const handleRename = (item) => {
    console.log(item)
    data.recordId = item.id;
    data.fileName = item.name;
    data.isRename = true;
  }
</script>
<style lang="less">
  .MeetingShareWrap {
    width: 100%;
    .filename {
      cursor: pointer;
    }
    .panel {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .share-type {
      .share-type-img {
        width: 20px;
        height: 20px;
        display: inline-block;
        background-color: #165dff !important;
        position: relative;
        top: 5px;
        margin-right: 8px;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }
  }

  .peopleHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .peopleHeader .searchitem {
    width: 170px !important;
    margin-right: 10px;
    border-radius: 4px !important;

    .ant-select-selector {
      border-radius: 4px !important;
    }
  }

  .peopleHeader .left .ant-picker {
    width: 340px !important;
  }

  .MeetingShareWrap {
    .panel {
      padding-top: 15px !important;
      margin-bottom: 0px !important;
    }

    .panelt {
      margin-bottom: 20px !important;
      padding: 12px;
    }

    .detailContent {
      width: 100%;
      padding: 20px;
      background: #fff;
      border-radius: 4px;
      overflow: auto;
    }

    .panel-top {
      background: #fff !important;
      padding-bottom: 15px;
      display: flex;

      .ant-card {
        width: 330px;
        float: left;
        color: #666;
        margin: 0 7px;
        margin-bottom: 0;
        box-shadow: none !important;
        border: 1px solid #eee !important;
        border-radius: 2px !important;
        background-color: #fff;
      }

      .ant-card-body {
        padding: 10px 15px;
        line-height: 30px !important;
        overflow: hidden;
        position: relative;
      }

      .statistics-left {
        float: left;
      }

      .statistics-name {
        font-size: 14px;
      }

      .statistics-count {
        font-weight: 700;
        font-size: 22px;
        color: #555;
      }

      .ant-card-body {
        padding: 10px 15px;
        border-radius: 4px;
      }

      .statistics-right {
        float: right;

        .anticon {
          font-size: 40px;
          position: relative;
          top: 10px;
          color: #108def;
        }
      }

      .layui-icon.wancheng {
        font-size: 45px !important;
        margin-top: 12px;
        color: #108def;
      }
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

  .MeetingShareWrap .panelt {
    background: #f0f2f6 !important;
    margin-bottom: 5px !important;
    padding: 0 !important;
  }

  .MeetingShareWrap .panel-top {
    background: #f0f2f6 !important;
    padding-bottom: 12px;
  }

  .MeetingShareWrap .panel-top .ant-card {
    border-radius: 4px !important;
  }

  .MeetingShareWrap .ant-card:first-child {
    margin-left: 0 !important;
  }

  .MeetingShareWrap .ant-card:last-child {
    margin-right: 0 !important;
  }

  .MeetingShareWrap .pageWrap {
    text-align: right;
    padding: 15px;
  }

  .MeetingShareWrap .iconBox .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }

  .MeetingShareWrap .iconBox .popup {
    top: 25px;
    right: 0;
    width: max-content;
    min-width: 88px;
  }

  .MeetingShareWrap {

    .ant-table-wrapper,
    .ant-spin-nested-loading,
    .ant-spin-nested-loading .ant-spin-container,
    .ant-table-wrapper .ant-table,
    .ant-table-wrapper .ant-table-container {
      height: 100% !important;
    }
  }

  .MeetingShareWrap .panel-bd1 {
    height: calc(~'100% - 115px') !important;
  }

  .MeetingShareWrap .ant-table-body {
    height: 100% !important;
  }

  .container {
    padding: 10px;
    box-sizing: border-box;
  }

  .ant-pagination {
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
      background: #1677ff;

      a {
        color: #fff;
      }
    }
  }

  .FileExtensionTdImg {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      margin-top: 4px;
      margin-right: 6px;
    }
  }
</style>