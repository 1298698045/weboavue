<template>
  <div class="addressBook VideoHomeWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base" style="background: #217346">
          <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="" />
        </div>
        <span class="headerTitle">视频管理</span>
      </div>
      <div class="headerRight">
        <a-upload
          accept="video/*"
          v-model:file-list="fileList"
          :headers="headers"
          @change="changeFiles"
          :data="uploadData"
          :action="Interface.file.cloudUpload"
          :showUploadList="false"
          v-if="data.BreadCrumbList.length"
        >
          <a-button class="ml10" type="primary">上传视频</a-button>
        </a-upload>
        <a-button
          class="ml10"
          type="primary"
          @click="handleNew"
          v-if="leftName != '回收站'"
          >新建文件夹</a-button
        >
        <a-button
          class="ml10"
          type="primary"
          @click="handleBatchDelete"
          v-if="leftName == '回收站'"
          >批量删除</a-button
        >
        <!-- <a-dropdown class="ml10">
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="1">
                                看板
                            </a-menu-item>
                            <a-menu-item key="2">
                                列表
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>
                        {{data.type==1?'看板':'列表'}}
                        <DownOutlined />
                    </a-button>
                </a-dropdown> -->
      </div>
    </div>
    <div class="todoListWrap">
      <div class="leftTree" v-if="isLeft">
        <div class="leftTreeWrap">
          <a-tree
            :tree-data="treeData"
            block-node
            :selectedKeys="selectedKeys"
            @select="handleTreeSelect"
          >
            <template #title="{ text, key }">
              <FolderOutlined v-if="text == '视频管理'" />
              <ClockCircleOutlined v-if="text == '观看历史'" />
              <StarOutlined v-if="text == '收藏'" />
              <FolderViewOutlined v-if="text == '全部视频'" />
              <DeleteOutlined v-if="text == '回收站'" />
              <span :key="key">{{ text }}</span>
            </template>
          </a-tree>
        </div>
      </div>
      <div class="rightContainer">
        <div
          class="sanlan"
          :class="{ active: !isLeft }"
          @click="handleLeftShow"
        >
          <!-- <span class="icon">
                        <LeftOutlined v-if="isLeft" />
                        <RightOutlined v-else />
                    </span> -->
        </div>
        <div class="head-right-breadcrumb">
          <a-breadcrumb>
            <a-breadcrumb-item
              ><a href="javascript:void(0)" @click="tofolder('', '')"
                ><HomeOutlined style="margin-right: 5px" /> 视频管理</a
              ></a-breadcrumb-item
            >
            <a-breadcrumb-item
              v-for="(item, index) in BreadCrumbList"
              :key="index"
              ><a
                href="javascript:void(0)"
                @click="tofolder(item.id, item.name)"
                >{{ item.name || "" }}</a
              ></a-breadcrumb-item
            >
          </a-breadcrumb>
        </div>
        <div class="rightHeader">
          <div class="lform">
            <a-input-search
              class="ml10"
              v-model:value="searchVal"
              placeholder="输入文件名称"
              style="width: 200px"
              @search="onSearch"
            />
          </div>
          <div class="rBtns">
            <a-button class="ml10" type="primary" @click="onSearch"
              >查询</a-button
            >
            <a-button class="ml10" @click="onClear">重置</a-button>
            <!-- <a-button class="ml10" type="primary">新建</a-button> -->
          </div>
        </div>
        <div class="tableWrap" ref="tablelist">
          <div class="card-content" v-show="data.type == '1'">
            <div
              class="content-item"
              v-for="(item, index) in FolderList"
              :key="index"
              @click="tofolder(item.id, item.Name)"
            >
              <img :src="require('@/assets/img/filetype/Folder.png')" />
              <div class="add-addtext">{{ item.Name }}</div>
              <div class="add-addtime">{{ item.CreatedOn }}</div>
              <div class="iconBox content-item-iconBox">
                <div class="popup">
                  <div
                    class="option-item"
                    @click.stop="handleDetail(item.id, item.Name)"
                    :num="index"
                  >
                    打开
                  </div>
                  <div
                    class="option-item"
                    @click.stop="handleEdit(item.id)"
                    :num="index"
                  >
                    编辑
                  </div>
                  <!-- <div class="option-item" :num="index">重命名</div>   -->
                  <div
                    class="option-item"
                    @click.stop="handleDelete(item.id)"
                    :num="index"
                  >
                    删除
                  </div>
                  <!-- <div class="option-item" :num="index">设置权限</div>   -->
                </div>
                <svg
                  class="moreaction"
                  width="15"
                  height="20"
                  viewBox="0 0 520 520"
                  fill="none"
                  role="presentation"
                  data-v-69a58868=""
                >
                  <path
                    d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                    fill="#747474"
                    data-v-69a58868=""
                  ></path>
                </svg>
              </div>
            </div>
            <div
              class="content-item"
              v-for="(item, index) in FileList"
              :key="index"
              @click="handlePreview(item.id)"
            >
              <img :src="require('@/assets/img/filetype/video.png')" />
              <div class="add-addtext">{{ item.Name }}</div>
              <div class="add-addtime">{{ item.CreatedOn }}</div>
              <a-checkbox
                class="fileCheckBox"
                v-model:checked="item.checked"
                @click.stop
                :style="{ display: item.checked ? 'block' : 'none' }"
                @change="changeCheckbox(item)"
                v-if="leftName == '回收站'"
              ></a-checkbox>
              <div class="iconBox content-item-iconBox">
                <div class="popup">
                  <div
                    class="option-item"
                    @click.stop="handlePreview(item)"
                    :num="index"
                  >
                    查看
                  </div>
                  <!-- <div class="option-item" @click.stop="handleEdit(item.id)" :num="index">编辑</div>   -->
                  <!-- <div class="option-item" :num="index">重命名</div>   -->
                  <!-- <div class="option-item" :num="index">设置权限</div>   -->
                  <div
                    class="option-item"
                    @click.stop="handleDelete2(item.id, 'file')"
                    v-if="leftName != '回收站'"
                  >
                    删除
                  </div>
                  <div
                    class="option-item"
                    @click.stop="handleDelete(item.id, 'file')"
                    v-if="leftName == '回收站'"
                  >
                    彻底删除
                  </div>
                  <div
                    class="option-item"
                    @click.stop="handleRecovery(item.id)"
                    v-if="leftName == '回收站'"
                  >
                    还原
                  </div>
                </div>
                <svg
                  class="moreaction"
                  width="15"
                  height="20"
                  viewBox="0 0 520 520"
                  fill="none"
                  role="presentation"
                  data-v-69a58868=""
                >
                  <path
                    d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                    fill="#747474"
                    data-v-69a58868=""
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div
            class="empty"
            v-if="FolderList.length == 0 && FileList.length == 0"
          >
            <img :src="require('@/assets/img/empty.png')" alt="" />
            <p class="emptyDesc">当前暂无数据</p>
          </div>
          <a-table
            v-show="data.type == '2'"
            style="height: 100%"
            :scroll="{ y: tableHeight }"
            :dataSource="FolderList"
            :columns="columns"
            :pagination="data.pagination"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, index, text, record }">
              <template v-if="column.key === 'index'">
                <div>
                  {{ index + 1 }}
                </div>
              </template>
              <template v-if="column.key === 'checked'">
                <div>
                  <a-checkbox v-model:checked="record.checked"></a-checkbox>
                </div>
              </template>
              <div v-if="column.key == 'Name'">
                <div class="AlbumName">
                  <img
                    :src="require('@/assets/img/filetype/Folder.png')"
                    alt=""
                    class="group_list_avatar"
                  />
                  <a
                    href="javascript:;"
                    @click="handleDetail(record.id)"
                    style="color: var(--textColor)"
                    >{{ text }}</a
                  >
                </div>
              </div>
              <div v-if="column.key == 'Action'">
                <div class="iconBox">
                  <div class="popup">
                    <div
                      class="option-item"
                      @click="handleDetail(record.id)"
                      :num="index"
                    >
                      查看
                    </div>
                    <div
                      class="option-item"
                      @click="handleEdit(record.id)"
                      :num="index"
                    >
                      编辑
                    </div>
                    <div class="option-item" :num="index">重命名</div>
                    <div
                      class="option-item"
                      @click="handleDelete(record.id)"
                      :num="index"
                    >
                      删除
                    </div>
                    <div class="option-item" :num="index">设置权限</div>
                  </div>
                  <svg
                    class="moreaction"
                    width="15"
                    height="20"
                    viewBox="0 0 520 520"
                    fill="none"
                    role="presentation"
                    data-v-69a58868=""
                  >
                    <path
                      d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                      fill="#747474"
                      data-v-69a58868=""
                    ></path>
                  </svg>
                </div>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <div class="loadingWrap" v-if="loading">
      <loading-outlined></loading-outlined>
      <span class="loadinglabel">正在加载中，请稍候...</span>
    </div>
    <common-form-modal
      :isShow="isCommon"
      v-if="isCommon"
      @cancel="isCommon = false"
      :title="data.recordId ? '编辑' : '新建'"
      @success="onSearch"
      :id="recordId"
      :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName"
      :relatedObjectAttributeValue="relatedObjectAttributeValue"
      :relatedObjectAttributeName="relatedObjectAttributeName"
    ></common-form-modal>
    <!-- <add-group :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onSearch" :id="recordId" ></add-group> -->
    <Delete
      :isShow="isDelete"
      :desc="deleteDesc"
      @cancel="cancelDelete"
      @ok="onSearch"
      :sObjectName="sObjectName2"
      :recordId="recordId"
      :objTypeCode="objectTypeCode2"
      :external="external"
    />
    <CommonConfirm
      v-if="isConfirm"
      :isShow="isConfirm"
      :text="confirmText"
      :title="confirmTitle"
      @cancel="isConfirm = false"
      @ok="confirmOk"
      :id="recordId"
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
  h,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
import calendar from "dayjs/plugin/calendar";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
import { useRouter, useRoute } from "vue-router";
import {
  HomeOutlined,
  SearchOutlined,
  MoreOutlined,
  CopyOutlined,
  SortAscendingOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  DownOutlined,
  FolderOutlined,
  ClockCircleOutlined,
  FolderViewOutlined,
  DeleteOutlined,
  StarOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import Delete from "@/components/listView/Delete.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import AddGroup from "@/components/groupDetail/AddGroup.vue";
const tablelist = ref();
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const token = localStorage.getItem("token");
const data = reactive({
  treeData: [
    {
      text: "观看历史",
      key: "history",
    },
    {
      text: "收藏",
      key: "favor",
    },
    {
      text: "全部视频",
      key: "public",
    },
    {
      text: "回收站",
      key: "deleted",
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  listData: [],
  searchVal: "",
  total: 0,
  isLeft: true,
  selectedKeys: ["history"],
  FolderList: [],
  FileList: [],
  columns: [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 70,
    },
    {
      title: "选择",
      dataIndex: "checked",
      key: "checked",
      width: 70,
    },
    {
      title: "文件名称",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "大小",
      dataIndex: "Quantity",
      key: "Quantity",
      width: 200,
    },
    {
      title: "创建时间",
      dataIndex: "CreatedOn",
      key: "CreatedOn",
      width: 200,
    },
    {
      title: "修改时间",
      dataIndex: "ModifiedOn",
      key: "ModifiedOn",
      width: 200,
    },
    {
      title: "创建人",
      dataIndex: "CreatedBy",
      key: "CreatedBy",
      width: 200,
    },
    {
      title: "操作",
      dataIndex: "Action",
      key: "Action",
      width: 120,
    },
  ],
  groupList: [],
  isCommon: false,
  recordId: "",
  objectTypeCode: "100200",
  sObjectName: "ItemTree",
  isDelete: false,
  deleteDesc: "确定要删除吗？",
  external: false,
  pagination: {
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0, //数据总数
    pageSize: 10,
    current: 1,
    showTotal: (total) => {
      return `共${total}条`;
    },
  },
  tableHeight: 0,
  type: "1",
  BreadCrumbList: [],
  fileList: [],
  relatedObjectAttributeValue: "10010000-0000-0000-0000-000000000012",
  relatedObjectAttributeName: "视频文件",
  loading: false,
  uploadData: {
    folderId: "",
  },
  headers: {
    Authorization: token,
    Token: token,
  },
  FolderName: "",
  objectTypeCode2: "100200",
  sObjectName2: "ItemTree",
  leftName: "",
  isConfirm: false,
  confirmText: "",
  confirmTitle: "",
  checkList: [],
});
const {
  checkList,
  isConfirm,
  confirmText,
  confirmTitle,
  objectTypeCode2,
  sObjectName2,
  FolderName,
  uploadData,
  headers,
  loading,
  relatedObjectAttributeValue,
  relatedObjectAttributeName,
  fileList,
  BreadCrumbList,
  FileList,
  type,
  treeData,
  pageNumber,
  pageSize,
  listData,
  searchVal,
  total,
  isLeft,
  selectedKeys,
  FolderList,
  columns,
  groupList,
  isCommon,
  recordId,
  objectTypeCode,
  sObjectName,
  isDelete,
  deleteDesc,
  external,
  pagination,
  tableHeight,
  leftName,
} = toRefs(data);

const handleTreeSelect = (keys, { node }) => {
  if (keys && keys.length) {
    data.selectedKeys = keys;
    data.leftName = node.text;
  }
  //onSearch();
  //getQuery();
  tofolder("", "");
};
const handleLeftShow = () => {
  data.isLeft = !data.isLeft;
};
const getQuery = () => {
  data.loading = true;
  let filterQuery = "\nParentId\teq\t10010000-0000-0000-0000-000000000012";
  // if(data.selectedKeys[0]=='owner'){
  //     filterQuery='\nOwningUser\teq-userid';
  // }else if(data.selectedKeys[0]=='join'){
  //     filterQuery='';
  // }else if(data.selectedKeys[0]=='public'){
  //     filterQuery='\nIsPublic\teq\ttrue';
  // }
  // proxy.$get(Interface.user.groupList, {
  //     scope: data.selectedKeys[0],
  //     search: data.searchVal
  // }).then(res => {
  //     data.FolderList = res.listData;
  // })
  data.FolderList = [];
  data.FileList = [];
  data.pagination.total = 0;
  if (data.selectedKeys[0] == "deleted") {
    data.folderId = "";
    getFile();
    return;
  }
  if (data.folderId) {
    //filterQuery='\nParentId\teq\t'+data.folderId;
    getFile();
    return;
  }
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "100200",
      entityName: "ItemTree",
      filterQuery: filterQuery,
      search: data.searchVal || "",
      page: data.pagination.current,
      rows: data.pagination.pageSize,
      sort: "SortNumber",
      order: "ASC",
      displayColumns: "Name,Quantity,CreatedOn,OwningUser,AvatarImg",
    })
    .then((res) => {
      data.listData = res.nodes;
      data.total = res.pageInfo ? res.pageInfo.total : 0;
      data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
      var list = [];
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "nameField") {
            item[cell] = girdFormatterValue(cell, item);
          }
          if (cell == "CreatedOn") {
            //item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
            item[cell] = item[cell]
              ? dayjs(item[cell]).format("YYYY-MM-DD")
              : "";
          }
        }
        if (!item.AvatarImg) {
          item.AvatarImg = require("@/assets/img/avatar-r.png");
        }
        list.push(item);
      }
      data.FolderList = list;
    });
  setTimeout(function () {
    data.loading = false;
  }, 500);
};
getQuery();
const getFile = () => {
  if (data.selectedKeys[0] == "deleted") {
    let url = Interface.list2;
    let obj = {
      filterId: "",
      objectTypeCode: "100100",
      entityName: "File",
      filterQuery: "\nDeletionStateCode\teq\ttrue",
      search: data.searchVal || "",
      page: data.pagination.current,
      rows: data.pagination.pageSize,
      sort: "SortNumber",
      order: "ASC",
      displayColumns: "Name,ThumbnailUrl,CreatedOn",
    };
    proxy.$post(url, obj).then((res) => {
      if (res && res.nodes.length) {
        data.listData = res.nodes;
        data.total = res.pageInfo ? res.pageInfo.total : 0;
        data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
        let list = [];
        for (var i = 0; i < res.nodes.length; i++) {
          let item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField" && cell != "viewUrl") {
              item[cell] = girdFormatterValue(cell, item);
            }
            if (cell == "CreatedOn") {
              item[cell] = item[cell]
                ? dayjs(item[cell]).format("YYYY-MM-DD")
                : "";
            }
          }
          list.push(item);
        }
        data.FileList = list;
      }
    });
  }
  setTimeout(function () {
    data.loading = false;
  }, 500);
};
const onSearch = (e) => {
  //getQuery();
  tofolder(data.uploadData.folderId, data.FolderName);
};
const changeFiles = (e) => {
  // console.log("e", e);
  if (e.file.status == "done") {
    message.success("上传成功！");
    onSearch();
  }
};
const onClear = (e) => {
  data.searchVal = "";
  onSearch();
};
const handleMenuClick = (e) => {
  data.type = e.key;
  //console.log("e",e);
};
const handleDetail = (id, name) => {
  tofolder(id, name);
  return;
  let GroupId = id;
  let routeData = router.resolve({
    name: "GroupDetail",
    query: {
      GroupId: GroupId,
    },
  });
  window.open(routeData.href, "_blank");
};
//改变页码
const handleTableChange = (pag, filters, sorter) => {
  data.pagination.current = pag.current;
  onSearch();
};
//新建
const handleNew = (e) => {
  data.recordId = "";
  data.isCommon = true;
};
//编辑
const handleEdit = (key) => {
  data.recordId = key;
  data.isCommon = true;
  return;
  console.log(key, 2222222);
  data.recordId = key;
  data.isCommon = true;
};
// 通用弹窗关闭
const handleCommonCancel = (params) => {
  data.isCommon = false;
};
//删除文件夹
const handleDelete = (key) => {
  data.recordId = key;
  data.sObjectName2 = "ItemTree";
  data.objectTypeCode2 = "100200";
  data.isDelete = true;
};
//删除文件
// const handleDelete2 = (key) => {
//     data.recordId=key;
//     data.sObjectName2='File';
//     data.objectTypeCode2='100100';
//     data.isDelete = true;
// }
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
};
onMounted(() => {
  let h = tablelist.value.clientHeight;
  data.tableHeight = h - 80 - 20;
});
const tofolder = (id, name) => {
  data.folderId = id;
  data.folderName = name;
  CreatedBreadCrumb(id, name);
  data.pagination.current = 1;
  getQuery();
};
const tofolder_old = (id, name) => {
  data.loading = true;
  CreatedBreadCrumb(id, name);
  data.FolderList = [];
  data.FileList = [];
  data.uploadData.folderId = id;
  data.FolderName = name;
  let filterQuery = "";
  if (id) {
    filterQuery = "\nParentId\teq\t" + id;
  } else {
    filterQuery = "\nParentId\teq\t10010000-0000-0000-0000-000000000012";
  }
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "100200",
      entityName: "ItemTree",
      filterQuery: filterQuery,
      search: data.searchVal || "",
      page: 1,
      rows: 100,
      sort: "SortNumber",
      order: "ASC",
      displayColumns: "Name,ParentId,Description",
    })
    .then((res) => {
      var list = [];
      if (res && res.nodes && res.nodes.length) {
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField" && cell != "ParentId") {
              item[cell] = girdFormatterValue(cell, item);
            }
            if (cell == "ParentId") {
              item[cell] = item[cell].lookupValue.value;
            }
            if (cell == "CreatedOn") {
              //item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
              item[cell] = item[cell]
                ? dayjs(item[cell]).format("YYYY-MM-DD")
                : "";
            }
          }
          list.push(item);
        }
      }
      data.FolderList = list;
      if (id) {
        getArticle(id);
      }
    });
  setTimeout(function () {
    data.loading = false;
  }, 500);
};
const getArticle = (id) => {
  data.FileList = [];
  let filterQuery = "\nFolderId\teq\t" + id;
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "100100",
      entityName: "File",
      filterQuery: filterQuery,
      search: data.searchVal || "",
      page: data.pagination.current,
      rows: data.pagination.pageSize,
      sort: "SortNumber",
      order: "ASC",
      displayColumns: "Name,Quantity,CreatedOn,OwningUser,AvatarImg",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        var list = [];
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (
              cell != "id" &&
              cell != "nameField" &&
              cell != "ContentId" &&
              cell != "SubjectId"
            ) {
              item[cell] = girdFormatterValue(cell, item);
            }
            // if(cell=='ContentId'||cell=='SubjectId'){
            //   item[cell+'Value']=item[cell].lookupValue.value;
            //   item[cell]=girdFormatterValue(cell,item);
            // }
            // if(cell=='CreatedOn'||cell=='ModifiedOn'){
            //     item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
            // }
            if (cell == "CreatedOn") {
              //item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
              item[cell] = item[cell]
                ? dayjs(item[cell]).format("YYYY-MM-DD")
                : "";
            }
          }
          list.push(item);
        }
        data.FileList = list;
      }
    });
};
function handlePreview(id) {
  // let reUrl = router.resolve({
  //     path:"/lightning/page/KnowledgeMapDetail",
  //     query: {
  //       id: id,
  //       SubjectId:data.ParentId
  //     }
  // })
  // window.open(reUrl.href);
}
const CreatedBreadCrumb = (id, name) => {
  if (id) {
    if (JSON.stringify(data.BreadCrumbList).indexOf(id) != -1) {
      data.BreadCrumbList = data.BreadCrumbList.slice(
        0,
        JSON.stringify(data.BreadCrumbList).indexOf(id) + 1
      );
    } else {
      data.BreadCrumbList.push({
        id: id,
        name: name,
      });
    }
  } else {
    data.BreadCrumbList = [];
  }
};
//还原
const handleRecovery = (id) => {
  data.recordId = id;
  data.objectTypeCode = "100100";
  data.sObjectName = "File";
  data.confirmText = "确定要还原该文件吗？";
  data.confirmTitle = "还原";
  data.isConfirm = true;
};
//删除
const handleDelete2 = (id, type) => {
  data.recordId = id;
  if (type == "folder") {
    data.objectTypeCode = "100103";
    data.sObjectName = "FileFolder";
    data.isDelete = true;
  } else {
    data.objectTypeCode = "100100";
    data.sObjectName = "File";
    if (data.selectedKeys[0] == "deleted") {
      data.confirmText = "确定要永久删除该文件吗？";
    } else {
      data.confirmText = "确定要放入回收站吗？";
    }
    data.confirmTitle = "删除";
    data.isConfirm = true;
  }
};
//确认回调
const confirmOk = (id) => {
  data.isConfirm = false;
  if (data.confirmTitle == "批量删除") {
    handleBatchDelete2();
  } else if (data.confirmTitle == "还原") {
    handleRowDelete(id, 0);
  } else {
    handleRowDelete(id, 1);
  }
};
//逻辑删除&还原照片
const handleRowDelete = (id, type) => {
  let url = Interface.edit;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: id,
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: "File",
            objTypeCode: "100100",
            fields: {
              DeletionStateCode: type * 1 == 1 ? 1 : "False",
              FileTypeCode: 0,
            },
          },
        },
      },
    ],
  };
  if (data.selectedKeys[0] == "deleted" && type * 1 == 1) {
    url = Interface.delete;
    d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordId: id,
            apiName: "File",
            objTypeCode: "100100",
          },
        },
      ],
    };
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
      message.success(type * 1 == 1 ? "删除成功！" : "还原成功！");
      //data.pagination.current=1;
      getQuery();
    } else {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state &&
        res.actions[0].errorMessage
      ) {
        message.success(res.actions[0].errorMessage);
      } else {
        message.success(type * 1 == 1 ? "删除失败！" : "还原失败！");
      }
    }
  });
};
const changeCheckbox = (record) => {
  //record.checked=!record.checked;
  data.checkList = [];
  for (var i = 0; i < data.FileList.length; i++) {
    if (data.FileList[i].checked) {
      data.checkList.push(data.FileList[i].id);
    }
  }
};
//批量删除
const handleBatchDelete = () => {
  console.log(data.checkList);
  if (data.checkList && data.checkList.length) {
    if (data.selectedKeys[0] == "deleted") {
      data.confirmText = "确定要批量永久删除吗？";
    } else {
      data.confirmText = "确定要批量删除吗？";
    }
    data.recordId = "";
    data.confirmTitle = "批量删除";
    data.isConfirm = true;
  } else {
    message.error("至少需要勾选一个");
  }
};
const handleBatchDelete2 = () => {
  if (data.checkList && data.checkList.length) {
    for (var i = 0; i < data.checkList.length; i++) {
      let item = { id: data.checkList[i] };
      if (item.id) {
        handleRowDelete(item.id, 1);
      }
    }
    setTimeout(function () {
      data.checkList = [];
    }, 2000);
  }
};
</script>
<style lang="less" scoped>
@import "@/style/addressBook.less";
.rightContainer {
  .rightHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }
  .tableWrap {
    height: calc(~"100% - 80px");
  }
}
.group_list_avatar {
  height: 40px;
}
.addressBook {
  :deep .ant-table-tbody .ant-table-cell {
    padding: 8px 16px !important;
  }
  .group_list_avatar {
    position: relative;
    top: 4px;
  }
  .iconBox .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
  .iconBox .popup {
    top: 25px;
    right: 0;
    width: max-content;
    min-width: 88px;
  }

  :deep .ant-table-wrapper .ant-table-thead > tr > th {
    background-color: #f7fbfe !important;
    padding: 8.5px 16px !important;
  }
  :deep .ant-table-tbody tr:hover,
  :deep .ant-table-tbody tr:hover td {
    background-color: #e9f7ff !important;
    color: #108def !important;
  }
  :deep .ant-table-tbody tr:nth-child(odd) {
    background-color: rgb(250, 250, 250) !important; /* 奇数行背景色 */
  }
  :deep .ant-table-tbody tr:nth-child(even) {
    background-color: #fff !important; /* 偶数行背景色 */
  }
  :deep .ant-pagination {
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
}
.VideoHomeWrap {
  .AlbumName {
    display: flex;
    align-items: center;
  }
  .group_list_avatar {
    height: 35px;
    margin-right: 10px;
    top: 0;
  }
  .todoListWrap .leftTree {
    width: 180px;
  }
  :deep .ant-tree .ant-tree-treenode {
    height: 40px;
    line-height: 40px;
    display: block;
    padding-left: 10px !important;
    margin-bottom: 4px;
  }
  :deep .ant-tree .ant-tree-treenode-selected .ant-tree-title {
    color: #018efb !important;
  }
  :deep .ant-tree-title .anticon {
    font-size: 15px;
    margin-right: 5px;
  }
  .card-content {
    overflow: auto;
    height: 100%;
  }
  .content-item {
    font-size: 12px;
    float: left;
    text-align: center;
    margin: 10px;
    border: 1px solid #fff;
    border-color: transparent;
    padding: 30px 30px;
    width: 200px;
    cursor: pointer;
    &:hover {
      background: rgba(242, 243, 245, 1);
    }
  }
  .content-item img {
    width: 96px;
  }
  .add-addtext {
    margin-top: 5px;
    white-space: nowrap;
    position: relative;
    width: 100%;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
    font-weight: bold;
  }
  .add-addtime {
    margin-top: 8px;
    white-space: nowrap;
    position: relative;
    width: 100%;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: rgba(134, 144, 156, 1);
  }
  .head-right-breadcrumb {
    border-bottom: 1px solid #dedede;
    padding: 10px;
    position: relative;
    padding-bottom: 9px;
    margin: 0 15px;
  }
  .todoListWrap .rightContainer {
    padding: 0;
    padding-bottom: 10px;
  }
  .rightContainer .rightHeader {
    margin: 18px 10px 18px 10px;
    .rBtns {
      margin-right: 10px;
    }
  }
  .content-item {
    padding: 25px 30px;
    margin: 0 10px;
  }
  .rightContainer .tableWrap {
    height: calc(~"100% - 95px");
    position: relative;
    .card-content {
      padding-bottom: 15px;
    }
  }
  .empty {
    width: 100%;
    height: auto;
    position: absolute;
    top: 25%;
    z-index: 1;
    color: #999;
    left: 0;
    text-align: center;
    img {
      width: 170px;
    }
  }
}
.loadingWrap {
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  .loadinglabel {
    font-size: 22px;
    margin-left: 25px;
  }
}
.VideoHomeWrap {
  .content-item {
    position: relative;
  }
  .iconBox .popup {
    top: 20px;
  }
  .content-item-iconBox {
    position: absolute;
    right: 12px;
    top: 10px;
    display: none;
    text-align: left;
  }
  .fileCheckBox {
    position: absolute;
    display: none;
    top: 10px;
    left: 12px;
  }
  .content-item:hover {
    .content-item-iconBox {
      display: block;
    }
    .fileCheckBox {
      display: block !important;
    }
    :deep .ant-checkbox-wrapper:after,
    :deep .ant-checkbox:after {
      display: none;
    }
  }
  :deep .ant-tree-node-content-wrapper{
    height: 42px;
  }
}
</style>
