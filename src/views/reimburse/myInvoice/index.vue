<template>
  <div class="todoList myInvoiceWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
        </div>
        <span class="headerTitle">我的发票</span>
      </div>
      <div class="headerRight">
        <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button> -->
        <a-button type="primary" class="ml10" @click="handleNew">手动添加发票</a-button>
        <a-upload accept="pdf/*" :before-upload="beforeUpload" v-model:file-list="fileList" :headers="headers"
          @change="changeFiles" :data="uploadData" :action="Interface.uploadFiles" :showUploadList="false">
          <a-button class="ml10" type="primary">发票识别</a-button>
        </a-upload>
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <div style="height: 100%" ref="contentRef">
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
            <list-form-search ref="searchRef" @search="handleSearch" entityApiName="OfficialDocumentIn"
              :SearchFields="SearchFields" @update-height="changeHeight"></list-form-search>
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
    <invoiceDetail v-if="isDetail" :isShow="isDetail" :id="recordId" :InvoiceType="InvoiceType"
      @cancel="isDetail = false" />
    <addInvoice :isShow="isNew" v-if="isNew" :id="recordId" @ok="handleSearch('')" @cancel="isNew = false" :name="'发票'"
      :entityApiName="sObjectName" :objTypeCode="objectTypeCode" :entityId="entityId" />
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

import { useRouter, useRoute } from "vue-router";
import useWorkAdmin from "@/utils/flow/workAdmin";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import Delete from "@/components/listView/Delete.vue";
import invoiceDetail from "@/components/reimburse/invoice/invoiceDetail.vue";
import addInvoice from "@/components/reimburse/invoice/addInvoice.vue";
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
  entityType: 'I0E',
  queryParams: {
    filterId: '',
    objectTypeCode: '1090',
    entityName: 'Invoice',
    filterQuery: '',
    //filterQuery:'\nCreatedBy\teq-userid',
    //displayColumns:'',
    sort: 'CreatedOn',
    order: 'desc'
  },
  layoutName: 'MyInvoice',
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
  objectTypeCode: '1090',
  sObjectName: 'Invoice',
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
  InvoiceType: '',
  isNew: false,
  entityId: ''
});
const { entityId, isNew, InvoiceType, isDetail, fileList, uploadData, headers, isDelete, deleteDesc, external, isCommon, recordId, objectTypeCode, sObjectName, relatedObjectAttributeValue, relatedObjectAttributeName, isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal, entityType, layoutName,
  isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId, SearchFields } = toRefs(data);
const tabContent = ref(null);
const contentRef = ref(null);
const searchRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
const onSearch = (e) => {
  gData.value = gDataAll.value.filter(item => {
    return item.name.indexOf(data.searchVal) != -1;
  })
}
const onSelect = (keys) => {
  data.treeId = keys[0];
  handleSearch(data.formSearchFilterquery);
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
  let contentHeight = contentRef.value.clientHeight;
  let tabsHeight = 46;
  let height = contentHeight - tabsHeight - formSearchHeight.value;
  data.tableHeight = height;
  console.log('data', data.tableHeight);
  //console.log("gridRef", gridRef.value.loadGrid())
  //handleSearch();
}

const handleSearch = (filterquery) => {
  data.queryParams.filterQuery = '';
  //data.queryParams.filterQuery='\nCreatedBy\teq-userid';
  data.formSearchFilterquery = filterquery;
  if (filterquery) {
    data.queryParams.filterQuery += filterquery;
  }
  if (data.treeId) {
    data.queryParams.filterQuery += '\nDocumentTypeCode\tin\t' + data.treeId;
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
            <div class="option-item" id=${row.id} onclick="handleDetail('${row.id}','${row.InvoiceType && row.InvoiceType.value ? row.InvoiceType.value : ''}')">查看</div>
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
      searchRef.value.getSearchLayout();
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
function handleTo(viewUrl) {
  // router.push({
  //   path: "/detail",
  //   query: {
  //     id: id
  //   }
  // });
  window.open(viewUrl)
}
window.handleTo = handleTo;
window.data = data;
const gridUrl = ref(Interface.list2);

const columns = ref([]);
const changeTab = (e) => {
  data.activeKey = e;
  data.queryParams.filterQuery = '';
  //data.queryParams.filterQuery='\nCreatedBy\teq-userid';
  let filterColumnsList = (data.tabs)[e].filterableColumns;
  data.SearchFields = filterColumnsList;
  data.queryParams.filterId = data.tabs[e].filterId || '';
  if (data.formSearchFilterquery) {
    data.queryParams.filterQuery += data.formSearchFilterquery;
  }
  if (data.treeId) {
    data.queryParams.filterQuery += '\nDocumentTypeCode\tin\t' + data.treeId;
  }
  getColumns(data.queryParams.filterId);
}

//新建
const handleNew = () => {
  data.recordId = '';
  //data.isCommon = true;
  data.isNew = true;
}
//编辑
const handleEdit = (id) => {
  data.recordId = id;
  //data.isCommon = true;
  data.isNew = true;
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
const handleDetail = (id, InvoiceType) => {
  data.recordId = id;
  data.InvoiceType = InvoiceType;
  data.isDetail = true;
}
window.handleDetail = handleDetail;
watch(() => route, (newVal, oldVal) => {
  if (gridRef && gridRef.value && gridRef.value.loadGrid != 'undefined' && !route.params.sObjectName) {
    if (route.path == '/lightning/page/MyInvoice/home') {
      //getTreeData();
      data.queryParams = {
        filterId: '',
        objectTypeCode: '1090',
        entityName: 'Invoice',
        filterQuery: '',
        sort: 'CreatedOn',
        order: 'desc'
      }
      data.entityType = 'I0E';
      data.layoutName = 'MyInvoice'
      setTimeout(function () {
        gridRef.value.loadGrid(data.queryParams);
      }, 1000)
    }
  }
}, { deep: true, immediate: true })
onMounted(() => {
  window.addEventListener('resize', changeHeight)
  // this.$nextTick(()=>{
  //   getTabs();
  // })
  getTabs();
})
</script>
<style lang="less">
@import "@/style/flow/treeList.less";
</style>
<style lang="less" scoped>
.myInvoiceWrap {
  .wea-left-tree-search {
    padding-left: 14px;
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