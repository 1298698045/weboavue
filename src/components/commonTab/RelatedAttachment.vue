<template>
  <div class="RelatedAttachmentWrap">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-head">
        <div class="panel-title">附件</div>
        <div class="panel-btn">
          <span style="color: red"
            >（单个附件不能超过40M，不支持exe和js脚本文件上传）</span
          >
          <a-upload
            v-model:file-list="fileList"
            :headers="headers"
            @change="changeFiles"
            :data="uploadData"
            :action="Interface.uploadFiles"
            :showUploadList="false"
            multiple
            name="files"
            :before-upload="beforeUpload"
          >
            <a-button class="ml10" type="primary">上传文件</a-button>
          </a-upload>
        </div>
      </div>
      <div class="panel-bd panel-bd1">
        <a-table
          :columns="columns"
          :dataSource="listData"
          :scroll="{ y: tableHeight }"
          :pagination="false"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template v-if="column.key === 'fileExtension'">
              <div class="fileExtensionTdImg">
                <img :src="record.icon" />
                <span>{{ record.fileExtension || "" }}</span>
              </div>
            </template>
            <template v-if="column.key === 'name'">
              <div @click="handlePreviewFile(record)" class="filename">
                {{ record.name }}
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <div class="iconBox">
                <div class="popup">
                  <div
                    class="option-item"
                    @click="handlePreviewFile(record)"
                    :num="index"
                  >
                    查看
                  </div>
                  <div
                    class="option-item"
                    @click="handleDelete(record)"
                    :num="index"
                  >
                    删除
                  </div>
                  <div
                    class="option-item"
                    @click="downloadFile(record)"
                    :num="index"
                  >
                    下载
                  </div>
                </div>
                <svg
                  class="moreaction"
                  width="15"
                  height="20"
                  viewBox="0 0 520 520"
                  fill="none"
                  role="presentation"
                >
                  <path
                    d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                    fill="#747474"
                  ></path>
                </svg>
              </div>
            </template>
          </template>
        </a-table>
        <div class="pageWrap">
          <a-pagination
            show-size-changer
            show-quick-jumper
            :pageSizeOptions="pagination.pageSizeOptions"
            :pageSize="pagination.pageSize"
            @showSizeChange="sizeChange"
            @change="handleTableChange"
            v-model:current="pagination.current"
            :total="pagination.total"
            :show-total="(total) => `共 ${total} 条`"
          />
        </div>
      </div>
    </div>
    <Delete
      :isShow="isDelete"
      v-if="isDelete"
      :desc="deleteDesc"
      @cancel="cancelDelete"
      @ok="onRefresh"
      :sObjectName="sObjectName"
      :recordId="recordId"
      :objTypeCode="objectTypeCode"
      :external="external"
    />
    <ImageView
      v-if="isPhoto"
      :isShow="isPhoto"
      :photoParams="photoParams"
      @cancel="isPhoto = false"
    />
    <PdfView
      v-if="isPdf"
      :isShow="isPdf"
      :pdfParams="pdfParams"
      @cancel="isPdf = false"
    />
    <TxtView
      v-if="isTxt"
      :isShow="isTxt"
      :txtParams="txtParams"
      @cancel="isTxt = false"
    />
  </div>
</template>
<script setup>
import "@/style/common.less";
import {
  toRefs,
  reactive,
  onMounted,
  getCurrentInstance,
  defineEmits,
  defineProps,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
import Delete from "@/components/listView/Delete.vue";
import ImageView from "@/components/file/ImageView.vue";
import PdfView from "@/components/file/PdfView.vue";
import TxtView from "@/components/file/TxtView.vue";
const { proxy } = getCurrentInstance();
//显示列
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
    key: "name",
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
    key: "action",
    width: 120,
  },
];
const props = defineProps({
  id: String,
  entityName: String,
  type: String,
});

const emit = defineEmits(["load"]);
const token = localStorage.getItem("token");
const data = reactive({
  list: [],
  fileList: [],
  ImageList: [],
  listData: [],
  pagination: {
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0,
    pageSize: 10,
    current: 1,
    pageSizeOptions: ["10", "20", "50", "100", "200"],
    defaultPageSize: 10,
    showTotal: (total) => {
      return `共${total}条`;
    },
  },
  total: 0,
  tableHeight: document.documentElement.clientHeight - 315,
  recordId: "",
  objectTypeCode: "1001",
  sObjectName: "RelatedAttachment",
  isDelete: false,
  deleteDesc: "确定要删除吗？",
  external: false,
  height: document.documentElement.clientHeight - 137,
  isPhoto: false,
  photoParams: {},
  isPdf: false,
  pdfParams: {},
  uploadData: {
    parentId: "",
    entityName: "",
  },
  headers: {
    Authorization: token,
    Token: token,
  },
  isTxt: false,
  txtParams: {},
});
const {
  isTxt,
  txtParams,
  uploadData,
  headers,
  pdfParams,
  isPdf,
  photoParams,
  ImageList,
  isPhoto,
  listData,
  fileList,
  height,
  pagination,
  tableHeight,
  recordId,
  objectTypeCode,
  sObjectName,
  isDelete,
  deleteDesc,
  external,
} = toRefs(data);
//获取附件
const getQuery = () => {
  let url = Interface.getFiles;
  let d = {
    parentId: props.id,
    page: data.pagination.current,
    rows: data.pagination.pageSize,
  };
  proxy.$post(url, d).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.length
    ) {
      data.total = res.actions[0].returnValue.length || 0;
      data.pagination.total = res.actions[0].returnValue.length || 0;
      data.listData = res.actions[0].returnValue;
      data.listData.forEach((item) => {
        let size = item.fileSize;
        size = size ? ((size * 1) / 1024).toFixed(2) : 0;
        size = size + "kb";
        item.size = size;
        item.createdOn = item.createdOn
          ? dayjs(item.createdOn).format("YYYY-MM-DD hh:mm")
          : "";
      });
      data.ImageList = data.listData.filter((item) => {
        return (
          item.fileExtension == "jpg" ||
          item.fileExtension == "jpeg" ||
          item.fileExtension == "png"
        );
      });
    }
  });
};
//预览附件
const handlePreviewFile = (item) => {
  if (
    item.fileExtension == "jpg" ||
    item.fileExtension == "jpeg" ||
    item.fileExtension == "png"
  ) {
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
      index: index,
    };
    data.isPhoto = true;
  } else if (item.fileExtension == "pdf") {
    data.pdfParams = {
      id: item.id,
      name: item.name,
      index: 0,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl,
    };
    data.isPdf = true;
  } else if (item.fileExtension == "txt") {
    data.txtParams = {
      name: item.name,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl,
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
    //downloadFile(item);
    openControlViewFile(
      item.id,
      item.link,
      item.fileExtension,
      item.viewUrl,
      item.name
    );
  } else {
    downloadFile(item);
  }
};
//预览office文件
const openControlViewFile = (id, url, type, link, name) => {
  let userInfo = window.localStorage.getItem("userInfo");
  var userId = "";
  var userName = "";
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    userId = userInfo.userId;
    userName = userInfo.fullName;
  }
  window.open('/#' + link + "&FileType=" + type + "&FileName=" + name + "&UserName=" + userName);
};
//下载附件
const downloadFile = (item) => {
  let url = item.downloadUrl;
  window.open(url);
};
//刷新数据
const onRefresh = (e) => {
  data.isDelete = false;
  getQuery();
};
//改变页码
const handleTableChange = (page, pageSize) => {
  data.pagination.current = page;
  data.pagination.pageSize = pageSize;
  getQuery();
};
const sizeChange = (current, size) => {
  handleTableChange(current, size);
};
//删除
const handleDelete = (item) => {
  data.recordId = item.id;
  data.isDelete = true;
};
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
};
const beforeUpload = (e) => {
  console.log("beforeUpload", e);
};
const changeFiles = (e) => {
  if (e.file.status == "done") {
    message.success("上传成功！");
    onRefresh();
  }
};
//组件高度
const changeHeight = () => {
  let h = document.documentElement.clientHeight;
  //弹窗引用组件时高度
  if (props.type == "modal") {
    data.tableHeight = h - 470;
    data.height = h - 285;
  }
  //详情页引用组件时高度
  if (props.type == "group") {
    data.tableHeight = h - 540;
    data.height = h - 355;
  }
};
onMounted(() => {
  data.uploadData.entityName = props.entityName;
  data.uploadData.parentId = props.id;
  changeHeight();
  window.addEventListener("resize", (e) => {
    changeHeight();
  });
  getQuery();
});
</script>
<style lang="less" scoped>
.RelatedAttachmentWrap {
  width: 100%;

  .filename {
    cursor: pointer;
  }

  .panel {
    padding-top: 15px !important;
    padding-bottom: 0;
    margin-bottom: 0px !important;
  }

  .pageWrap {
    text-align: right;
    padding: 15px;

    .ant-pagination {
      .ant-pagination-item {
        border: 1px solid #d9d9d9 !important;
      }

      .ant-pagination-item:hover {
        border: 1px solid #1677ff !important;
        background: #1677ff;
      }

      .ant-pagination-item-active,
      .ant-pagination-item-active:hover {
        border: 1px solid #1677ff !important;
        background: #1677ff !important;

        a {
          color: #fff;
        }
      }
    }
  }

  .fileExtensionTdImg {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      margin-top: 4px;
      margin-right: 6px;
    }
  }

  .iconBox {
    .moreaction {
      padding: 0px 1px;
      width: 18px;
      border: 1px solid #dedede;
      border-radius: 4px;
      position: relative;
      top: 1px;
    }

    .popup {
      top: 25px;
      right: 0;
      width: max-content;
      min-width: 88px;
    }
  }

  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-nested-loading .ant-spin-container,
  .ant-table-wrapper .ant-table,
  .ant-table-wrapper .ant-table-container {
    height: 100% !important;
  }

  .panel-bd1 {
    height: calc(~"100% - 115px") !important;
  }

  :deep .ant-table-body {
    height: 100% !important;

    td {
      padding: 6.5px 16px !important;
    }

    tr:hover {
      background-color: #e9f7ff !important;
      color: #108def !important;

      td {
        background-color: #e9f7ff !important;
        color: #108def !important;
      }
    }

    tr:nth-child(odd) {
      background-color: rgb(250, 250, 250) !important;
      /* 奇数行背景色 */
    }

    tr:nth-child(even) {
      background-color: #fff !important;
      /* 偶数行背景色 */
    }
  }

  .ant-table-measure-row {
    td {
      padding: 0 !important;
    }
  }

  .ant-table-wrapper {
    .ant-table-thead > tr > th {
      background-color: #f7fbfe !important;
      padding: 8.5px 16px !important;
    }
  }
  //解决aria-hidden属性报错
  input[aria-hidden="true"] {
    display: none !important;
  }
  :deep .ant-table-wrapper,
  :deep .ant-spin-nested-loading,
  :deep .ant-spin-nested-loading .ant-spin-container,
  :deep .ant-table-wrapper .ant-table,
  :deep .ant-table-wrapper .ant-table-container {
    height: 100% !important;
  }
}
</style>
