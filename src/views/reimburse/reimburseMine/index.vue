<template>
  <div class="todoList reimburseMineWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
        </div>
        <span class="headerTitle">我的报账</span>
      </div>
      <div class="headerRight">
        <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button> -->
        <a-button type="primary" class="ml10" @click="handleNewForm">新建报销单</a-button>
        <!-- <a-upload accept="pdf/*" :before-upload="beforeUpload" v-model:file-list="fileList" :headers="headers"
          @change="changeFiles" :data="uploadData" :action="Interface.uploadFiles" :showUploadList="false">
          <a-button class="ml10" type="primary">上传</a-button>
        </a-upload> -->
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <div style="height: 100%" ref="contentRef">
            <div class="wea-header">
              <div class="wea-tab">
                <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                  <a-tab-pane v-for="(item, index) in data.tabs" :key="index">
                    <template #tab>
                      <span>
                        {{ item.label }}
                      </span>
                    </template>
                  </a-tab-pane>
                </a-tabs>
                <div class="tabsBtn">
                </div>
              </div>
              <HighSearch @update-height="changeHeight" @search="handleSearch"
                :entityApiName="data.queryParams.entityName">
              </HighSearch>
            </div>
            <!-- <list-form-search ref="searchRef" @search="handleSearch" entityApiName="OfficialDocumentIn"
              :SearchFields="SearchFields" @update-height="changeHeight"></list-form-search> -->
            <div class="wea-tabContent" :style="{ height: tableHeight + 'px' }" ref="tabContent">
              <!-- <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable> -->
              <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                :isCollapsed="isCollapsed">
              </Ntable>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon = false"
      :title="data.recordId ? '编辑' : '新建'" @success="handleSearch('')" :id="recordId" :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName" :relatedObjectAttributeValue="relatedObjectAttributeValue"
      :relatedObjectAttributeName="relatedObjectAttributeName"></common-form-modal>
    <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="isDelete = false" @ok="handleSearch('')"
      :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
    <RelatedDetail v-if="isDetail" :isShow="isDetail" :sObjectName="data.queryParams.entityName" :title="'报销详情'"
      :objectTypeCode="data.queryParams.objectTypeCode" :id="recordId" @cancel="isDetail = false" />
    <div class="modal">
      <a-modal v-model:open="isModal" width="550px" :style="'top:' + top + 'px'" :maskClosable="false"
        @cancel="handleCancel" @ok="handleOk">
        <template #title>
          <div>
            新建报销单
          </div>
        </template>
        <div class="modalContainer">
          <div class="modalCenter" style="height:440px;">
            <a-form ref="formRef" :label-col="labelCol" class="CreateProcess1" :model="formState">
              <div class="form-tip">请输入流程事务标题，建立事务</div>
              <a-form-item label="流程：" name="ProcessName">
                <div class="ProcessName">{{ formState.ProcessName || '' }}</div>
              </a-form-item>
              <a-form-item name="BusinessUnitId" label="创建身份：" :rules="[{ required: true, message: '请选择发起部门' }]">
                <a-select v-model:value="formState.BusinessUnitId">
                  <a-select-option v-for="(item, index) in formState.BusinessUnitList" :key="index"
                    :value="item.BusinessUnitId">{{ item.organizationIdName }}/{{
                      item.businessUnitIdName
                    }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item class="processTitle" label="标题：" name="Title"
                :rules="[{ required: true, message: '标题不能为空' }]">
                <a-input v-model:value="formState.Title" />
                <div class="form-tip1">默认标题是 流程名称 部门名称，为了查询方便，请输入流程真实标题。</div>
                <div class="form-tip1">如收文 关于XX来文 XX科室 XX人。</div>
              </a-form-item>
              <a-form-item name="Priority" label="紧急程度：">
                <a-select v-model:value="formState.Priority">
                  <a-select-option value="0">普通</a-select-option>
                  <a-select-option value="1">紧急</a-select-option>
                  <a-select-option value="2">加急</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="备注：" name="Description">
                <a-textarea :rows="3" v-model:value="formState.Description" />
              </a-form-item>
            </a-form>
          </div>
        </div>
        <template #footer>
          <div>
            <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
            <a-button @click="handleCancel">取消</a-button>
          </div>
        </template>
      </a-modal>
    </div>
  </div>
</template>
<script setup>
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick } from "vue";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
// import Dtable from "@/components/Dtable.vue";
import Ntable from "@/components/Ntable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import HighSearch from "@/components/HighSearch.vue";
import { useRouter, useRoute } from "vue-router";
import useWorkAdmin from "@/utils/flow/workAdmin";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import Delete from "@/components/listView/Delete.vue";
import RelatedDetail from "@/components/commonModal/RelatedDetail.vue";
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
const { tabList } = useWorkAdmin();
console.log("tabList", tabList);
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const token = localStorage.getItem("token");
let data = reactive({
  isCollapsed: true,
  tableHeight: '',
  fieldNames: {
    children: 'children', title: 'name', key: 'id'
  },
  tabs0: [
  ],
  tabs: [],
  //tabs: tabList,
  activeKey: 0,
  entityType: 'F01',
  queryParams: {
    filterId: '',
    objectTypeCode: '7001',
    entityName: 'ReimburseBill',
    filterQuery: '',
    //filterQuery:'\nCreatedBy\teq-userid',
    //displayColumns:'',
    sort: 'CreatedOn',
    order: 'desc'
  },
  layoutName: 'mineReimburseBill',
  isModal: false,
  isCirculation: false,
  searchVal: "",
  isCategory: false,
  treeId: "",
  isEditFlow: false,
  id: "",
  isJump: false,
  isCountersign: false,
  isRelease: false,
  ProcessInstanceId: "",
  formSearchFilterquery: "",
  SearchFields: [],
  isCommon: false,
  recordId: '',
  objectTypeCode: '7001',
  sObjectName: 'ReimburseBill',
  relatedObjectAttributeValue: '',
  relatedObjectAttributeName: '',
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  external: false,
  uploadData: {
    parentId: '',
    entityName: ''
  },
  headers: {
    Authorization: token,
    Token: token,
  },
  fileList: [],
  isDetail: false,
  isNew: false,
  entityId: '',
  rowRecord: {},
  top: 0,
  hightSearchParams: {}
});
const { hightSearchParams, top, rowRecord, entityId, isNew, isDetail, fileList, uploadData, headers, isDelete, deleteDesc, external, isCommon, recordId, objectTypeCode, sObjectName, relatedObjectAttributeValue, relatedObjectAttributeName, isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal, entityType, layoutName,
  isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId, SearchFields } = toRefs(data);
const tabContent = ref(null);
const contentRef = ref(null);
const searchRef = ref(null);
const formState = reactive({
  ProcessName: "",
  BusinessUnitId: "",
  Title: "",
  Priority: "0",
  Description: "",
  BusinessUnitList: [],
})
let formSearchHeight = ref(null);
const gridRef = ref(null);
const onSearch = (e) => {
  gData.value = gDataAll.value.filter(item => {
    return item.name.indexOf(data.searchVal) != -1;
  })
}
const onSelect = (keys) => {
  data.treeId = keys[0];
  handleSearch();
};
const beforeUpload = (e) => {
  console.log("beforeUpload", e);
}
const changeFiles = (e) => {
  // console.log("e", e);
  if (e.file.status == "done") {
    message.success("上传成功！");
    handleSearch();
  } else if (e.file.status == "error") {
    message.error("上传失败！");
  }
}
function changeHeight(h) {
  if (typeof h == 'number') {
    formSearchHeight.value = h;
  }
  let contentHeight = document.documentElement.clientHeight - 120;
  let tabsHeight = 46;
  let height = contentHeight - tabsHeight;
  data.tableHeight = height;
  data.top = (document.documentElement.clientHeight - 565) / 2;
  //console.log('data', data.tableHeight);
  //console.log("gridRef", gridRef.value.loadGrid())
  //handleSearch();
}

const handleSearch = (obj) => {
  data.queryParams = {
    filterId: data.queryParams.filterId,
    objectTypeCode: '7001',
    entityName: 'ReimburseBill',
    sort: 'CreatedOn',
    order: 'desc'
  };
  // data.formSearchFilterquery = filterquery;
  // if (filterquery) {
  //   data.queryParams.filterQuery += filterquery;
  // }
  if (obj) {
    data.hightSearchParams = obj;
    if (data.hightSearchParams) {
      if (data.hightSearchParams.search) {
        data.queryParams.search = data.hightSearchParams.search;
      }
      if (data.hightSearchParams.filterCondition) {
        data.queryParams.filterCondition = data.hightSearchParams.filterCondition;
      }
    }
  }
  else {
    data.hightSearchParams = {}
  }
  if (data.treeId) {
    data.queryParams.filterQuery = '\nDocumentTypeCode\tin\t' + data.treeId;
  }
  gridRef.value.loadGrid(data.queryParams);
}
//获取显示列
const getColumns = (id) => {
  let columnslist = [{
    field: 'ids',
    checkbox: true
  },
  {
    field: "Action",
    title: "操作",
    formatter: function formatter(value, row, index) {
      var str = `
                <div class="iconBox">
            <div class="popup">
            <div class="option-item" id=${row.id} onclick="handleDetail('${row.id}')">查看</div>
            <div class="option-item" id=${row.id} onclick="handleEdit('${row.id}')">编辑</div>
            <div class="option-item" id=${row.id} onclick="handleDelete('${row.id}')">删除</div>
            </div>
            <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
        `
      return str;
    }
  },];
  proxy.$get(Interface.listView.getFilterInfo, {
    entityType: data.entityType,
    objectTypeCode: data.queryParams.objectTypeCode,
    search: "",
    filterId: id
  }).then(res => {
    if (res && res.actions && res.actions[0]) { } else { return }
    let fields = res.actions[0].returnValue.fields;
    fields.forEach(item => {
      if (item.name != 'Name') {
        columnslist.push({
          field: item.name,
          title: item.label,
          sortable: true,
          formatter: function formatter(value, row, index) {
            return girdFormatterValue(item.name, row);
          }
        });
      }
      else {
        columnslist.push({
          field: item.name,
          title: item.label,
          sortable: true,
          formatter: function formatter(value, row, index) {
            let url = row.viewUrl;
            return '<a style="color:#015ba7;font-size:13px;" href="' + url + '" target="_blank">' + girdFormatterValue(item.name, row) + '</a>';
          }
        });
      }
    })
    columns.value = columnslist;
    nextTick(() => {
      gridRef.value.loadGrid(data.queryParams);
      //searchRef.value.getSearchLayout();
    })

  })
}

// 获取tabs
const getTabs = () => {
  proxy.$get(Interface.getTabs, {
    entityName: data.queryParams.entityName,
    layoutName: data.layoutName
  }).then(res => {
    //console.log("tabs", res)
    if (res && res.tabs && res.tabs.length) {
      let list = res.tabs;
      list.forEach(item => {
        item.label = item.title;
        item.filterId = item.filter.filterId;
        item.filterquery = item.filterquery || '';
      })
      data.tabs = list;
    }
    else {
      //data.tabs=data.tabs0;
    }

    let filterColumnsList = (data.tabs)[0].filterableColumns;
    data.SearchFields = filterColumnsList;
    data.queryParams.filterId = data.tabs[0].filterId || '';
    getColumns(data.queryParams.filterId);
  })
}
function handleTo(viewUrl, id) {
  router.push({
    path: "/lightning/r/Workflow/instance/detail",
    query: {
      id: id,
      reurl: '/lightning/page/ReimburseMine/home'
    }
  });
  window.open(viewUrl)
}
window.handleTo = handleTo;
window.data = data;
const gridUrl = ref(Interface.list2);

const columns = ref([]);
const changeTab = (e) => {
  data.activeKey = e;
  data.queryParams = {
    filterId: data.queryParams.filterId,
    objectTypeCode: '7001',
    entityName: 'ReimburseBill',
    sort: 'CreatedOn',
    order: 'desc'
  };
  let filterColumnsList = (data.tabs)[e].filterableColumns;
  data.SearchFields = filterColumnsList;
  data.queryParams.filterId = data.tabs[e].filterId || '';
  // if (data.formSearchFilterquery) {
  //   data.queryParams.filterQuery += data.formSearchFilterquery;
  // }
  if (data.hightSearchParams) {
    if (data.hightSearchParams.search) {
      data.queryParams.search = data.hightSearchParams.search;
    }
    if (data.hightSearchParams.filterCondition) {
      data.queryParams.filterCondition = data.hightSearchParams.filterCondition;
    }
  }
  if (data.treeId) {
    data.queryParams.filterQuery = '\nDocumentTypeCode\tin\t' + data.treeId;
  }
  getColumns(data.queryParams.filterId);
}

//新建
const handleNew = () => {
  data.recordId = '';
  data.isCommon = true;
  //data.isNew = true;
}
//新建报销单
const handleNewForm = () => {
  formState.ProcessName = '报销申请单';
  data.rowRecord = {
    description: null,
    folderId: "081CF0B8-A1A8-42E6-8EE1-58FBF4B62720",
    isFavorite: false,
    name: "报销申请单",
    processId: "8166C971-1E16-482B-BB41-D1E403FB3220"
  };
  getDeptList();
  data.isModal = true;
}
//编辑
const handleEdit = (id) => {
  data.recordId = id;
  data.isCommon = true;
  //data.isNew = true;
}
window.handleEdit = handleEdit;
//删除
const handleDelete = (id) => {
  data.isDelete = true;
  data.recordId = id;
};
window.handleDelete = handleDelete;
// 通用弹窗关闭
const handleCommonCancel = (params) => {
  data.isCommon = false;
};

//打开详情
const handleDetail = (id) => {
  data.recordId = id;
  data.isDetail = true;
}
window.handleDetail = handleDetail;
const handleOk = () => {
  isModal.value = false;
}
const handleCancel = () => {
  isModal.value = false;
}
const formRef = ref();
const handleSubmit = () => {
  formRef.value.validate().then(() => {
    //console.log('values', formState, toRaw(formState));
    let obj = {
      "actions": [
        {
          "id": "4270;a",
          "descriptor": "aura://RecordUiController/ACTION$getRecordWithFields",
          "callingDescriptor": "UNKNOWN",
          "params": {
            "processId": data.rowRecord.processId,
            "priority": formState.Priority,
            "name": formState.Title,
            "businessUnitId": formState.BusinessUnitId,
            "description": formState.Description
          }
        }
      ]
    };
    let d = {
      message: JSON.stringify(obj)
    };
    proxy.$post(Interface.workflow.new, d).then(res => {
      if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
        message.success("新建流程成功");
        let url = router.resolve({
          name: "FlowDetail",
          query: {
            id: res.actions[0].returnValue.id,
            reurl: '/lightning/o/workflow/doing'
          },
        });
        window.open(url.href);
        handleCancel();
      } else {
        if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
          message.success(res.actions[0].errorMessage);
        }
        else {
          message.error("新建流程失败");
        }
      }
    })
  }).catch(err => {
    console.log('error', err);
  });
}
// 获取部门
const getDeptList = () => {
  // proxy.$get(Interface.businessunitList,{}).then(res=>{
  //     formState.BusinessUnitList = res.businessUnits;
  //     formState.Title = data.rowRecord.name + ' ' + res.businessUnits[0].name;
  //     formState.BusinessUnitId =  res.businessUnits[0].id;
  // })
  const now = new Date();
  const nowtime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    formState.BusinessUnitId = userInfo.businessUnitId;
    data.userId = userInfo.userId;
  }
  proxy.$post(Interface.user.getBusinessUnits, {}).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.length) {
      formState.BusinessUnitList = res.actions[0].returnValue;
      for (var i = 0; i < formState.BusinessUnitList.length; i++) {
        if (formState.BusinessUnitList[i].BusinessUnitId == formState.BusinessUnitId) {
          formState.Title = data.rowRecord.name + ' ' + formState.BusinessUnitList[i].businessUnitIdName + ' ' + formState.BusinessUnitList[i].FullName + ' ' + nowtime;
        }
      }
    }
  })
};

onMounted(() => {
  data.top = (document.documentElement.clientHeight - 565) / 2;
  window.addEventListener('resize', changeHeight);
  getTabs();
})
</script>
<style lang="less">
@import "@/style/flow/treeList.less";
</style>
<style lang="less" scoped>
.reimburseMineWrap {
  .wea-left-tree-search {
    padding-left: 14px;
  }

  .wea-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //border-bottom: 1px solid #eaeaea;
    padding-right: 0;
    border: 0 !important;
  }

  .todo-content .ant-row .wea-tab {
    height: 45px !important;

    :deep .ant-tabs-nav::before {
      display: none;
    }
  }

  .todo-content .ant-row .wea-tab :deep .ant-tabs .ant-tabs-nav .ant-tabs-nav-wrap {
    height: 45px !important;
  }

  .treeRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;

    .num {
      color: #aaa;
    }
  }

  .todo-content .ant-row .wea-left-right-layout-left .wea-left-tree .wea-left-tree-search {
    padding-left: 14px;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-col-5 {
    max-width: unset !important;
    width: 220px !important;
    flex: unset;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-col-19 {
    max-width: 100% !important;
    flex: 1;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-input {
    border-color: #d9d9d9;
  }

  .ant-row .wea-left-right-layout-left .wea-left-tree .wea-left-tree-scroll .ant-tree-treenode:hover .tree-num {
    display: none;
  }
}

:deep .CreateProcess1 {
  .ant-form-item {
    margin-bottom: 20px !important;
  }

  .ant-form-item-label {
    width: 100px !important;
  }

  .processTitle .ant-row .ant-col .ant-form-item-required {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .processTitle .ant-row .form-tip1 {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ProcessName {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .form-tip {
    font-size: 12px;
    margin-bottom: 12px;
    color: #606266;
  }
}

:deep .iconBox {
  text-align: center;

  .popup {
    text-align: left;
    top: 20px;
  }

  .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
}
</style>