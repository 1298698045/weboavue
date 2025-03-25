<template>
  <div class="todoList RuleArticleHome">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
        </div>
        <span class="headerTitle">制度台账</span>
      </div>
      <div class="headerRight">
        <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
        <a-button class="ml10" @click="batchAddStamp">批量添加水印</a-button>
        <a-button class="ml10" @click="batchEditFolder">批量变更目录</a-button>
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="4" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <a-input-search v-model:value="data.searchVal" placeholder="" @search="onSearch" />
            </div>
            <div class="wea-left-tree-scroll">
              <a-tree :style="{ height: tableHeight + 'px' }" :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames"
                @select="onSelect" @expand="onExpand">
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                  </CaretDownOutlined>
                </template>
                <template v-slot:title="{ name }">
                  <!-- <span v-if="name.indexOf(searchValue) > -1">
                    {{ name.substr(0, name.indexOf(searchValue)) }}
                    {{
                    name.substr(
                    name.indexOf(searchValue) + searchValue.length
                    )
                    }}
                    <span class="tree-num">{{ quantity }}</span>
                  </span>
                  <span v-else>{{ name }}</span> -->
                  <span>{{ name }}</span>
                </template>
              </a-tree>
            </div>
          </div>
        </a-col>
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
            :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
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
                <!-- <a-tab-pane key="2" tab="待处理" force-render></a-tab-pane>
                  <a-tab-pane key="3" tab="待阅"></a-tab-pane> -->
              </a-tabs>
              <div class="tabsBtn">
                <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
                  <a-button type="primary" class="ml10">批量添加水印</a-button>
                  <a-button class="ml10">批量变更目录</a-button> -->
              </div>
            </div>
            <list-form-search ref="searchRef" @search="handleSearch" entityApiName="Institution"
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
    <DeleteModal :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="handleDeleteCancel" @ok="refreshList"
      :sObjectName="entityName" :recordId="listId" :objTypeCode="objectTypeCode" :external="external" />
    <NewRuleArticle :isShow="isNew" v-if="isNew" :type="type" :id="listId" :FolderId="treeId" @ok="refreshList"
      @cancel="isNew = false" />
    <BatchAddStampModal :ids="listIds" v-if="isBatchAddStamp" :isShow="isBatchAddStamp" :FolderId="treeId"
      @ok="refreshList" @cancel="isBatchAddStamp = false; clearCheckList();" />
    <BatchEditFolderModal :ids="listIds" v-if="isBatchEditFolder" :isShow="isBatchEditFolder" :FolderId="treeId"
      @ok="refreshList" @cancel="isBatchEditFolder = false; clearCheckList();" />
    <InstitutionUrgingModal :id="listId" v-if="isInstitutionUrging" :isShow="isInstitutionUrging" @ok="refreshList"
      @cancel="isInstitutionUrging = false" />
    <AbolishModal :id="listId" v-if="isAbolish" :isShow="isAbolish" @ok="refreshList" @cancel="isAbolish = false" />
    <AddStampModal :id="listId" v-if="isAddStamp" :isShow="isAddStamp" :FolderId="treeId" @ok="refreshList"
      @cancel="isAddStamp = false" />
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
import DeleteModal from "@/components/listView/Delete.vue";
import { useRouter, useRoute } from "vue-router";
import useWorkAdmin from "@/utils/flow/workAdmin";
import NewRuleArticle from "@/components/rulearticle/NewRuleArticle.vue";
import BatchAddStampModal from "@/components/rulearticle/BatchAddStampModal.vue";
import BatchEditFolderModal from "@/components/rulearticle/BatchEditFolderModal.vue";
import InstitutionUrgingModal from "@/components/rulearticle/InstitutionUrgingModal.vue";
import AbolishModal from "@/components/rulearticle/AbolishModal.vue";
import AddStampModal from "@/components/rulearticle/AddStampModal.vue";
import { girdFormatterValue } from "@/utils/common.js";
const { tabList } = useWorkAdmin();
console.log("tabList", tabList);
const route = useRoute();
const router = useRouter();

const x = 3;
const y = 2;
const z = 1;
const { proxy } = getCurrentInstance();
const genData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || genData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: key,
      key,
    });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({
      key,
      title: key,
    });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(genData);
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const expandedKeys = ref([]);
const searchValue = ref("");
const autoExpandParent = ref(true);
const res = require("@/localData/treedata.json");
const gData = ref([]);
const gDataAll = ref([]);
//全部目录
const getTreeData = () => {
  gData.value = [];
  gDataAll.value = [];
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
          item.isFavor = item.isFavor || false;
        })
      }
      let response = res.actions[0].returnValue;
      formTree(response);
      console.log("formTree", response);
      gData.value = response;
      gDataAll.value = response;
    }
  });
  // proxy.$get(Interface.information.contentTree,{}).then((response)=>{
  //     let formTree = (list) => {
  //       list.forEach(item=>{
  //         if(item.children){
  //           formTree(item.children);
  //         }
  //         item.key = item.id;
  //         item.value = item.id;
  //         item.isFavor=item.isFavor||false;
  //       })
  //     }
  //     formTree(response);
  //     console.log("formTree",response)
  //     gData.value = response;
  //     gDataAll.value = response;
  // })
}

const onExpand = (keys) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};
// watch(searchValue, (value) => {
//   const expanded = dataList
//     .map((item) => {
//       if (item.title.indexOf(value) > -1) {
//         return getParentKey(item.key, gData.value);
//       }
//       return null;
//     })
//     .filter((item, i, self) => item && self.indexOf(item) === i);
//   expandedKeys.value = expanded;
//   searchValue.value = value;
//   autoExpandParent.value = true;
// });

let data = reactive({
  isCollapsed: false,
  tableHeight: '',
  fieldNames: {
    children: 'children', title: 'name', key: 'id'
  },
  tabs0: [
    {
      label: "全部",
      count: '',
      filterquery: '',
    },
    {
      label: "流转中",
      count: '',
      filterquery: '\nStateCode\teq\t1',
    },
    {
      label: "已完成",
      count: '',
      filterquery: '\nStateCode\teq\t3',
    },
    {
      label: "已退回",
      count: '',
      filterquery: '\nStateCode\teq\t6',
    },
    {
      label: "已撤销",
      count: '',
      filterquery: '\nStateCode\teq\t5',
    },
    {
      label: "草稿",
      count: '',
      filterquery: '\nStateCode\teq\t0',
    }
  ],
  tabs: [],
  //tabs: tabList,
  activeKey: 0,
  queryParams: {
    filterId: '',
    objectTypeCode: '100204',
    entityName: 'Institution',
    filterQuery: '',
    //displayColumns:'ProcessInstanceNumber,Name,StateCode,ExpiredOn,AttachQty,CreatedBy,CurrentStepName,CreatedOn,BusinessUnitId,ModifiedOn,Priority,ProcessInstanceId,WFRuleLogId,ExecutorIdentityName',
    sort: 'CreatedOn',
    order: 'desc'
  },
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
  objectTypeCode: '100204',
  entityName: 'Institution',
  isDelete: false,
  listId: '',
  deleteDesc: '确定要删除吗？',
  external: false,
  isNew: false,
  type: '',
  listIds: [],
  isBatchAddStamp: false,
  isBatchEditFolder: false,
  isInstitutionUrging: false,
  isAbolish: false,
  isAddStamp: false
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
  changeHeight();
};

const { listIds, isBatchAddStamp, isBatchEditFolder, isInstitutionUrging, isAbolish, isAddStamp, isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal, objectTypeCode, entityName, isDelete, listId, deleteDesc, external,
  isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId, SearchFields, isNew, type } = toRefs(data);
//   console.log("tabs", data.tabs);
const tabContent = ref(null);
const contentRef = ref(null);
const searchRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
const onSearch = (e) => {
  gData.value = gDataAll.value.filter(item => {
    if (item.name.indexOf(data.searchVal) != -1) {
      return item;
    }
    else {
      if (item.children && item.children.length) {
        for (var i = 0; i < item.children.length; i++) {
          if (item.children[i].name.indexOf(data.searchVal) != -1) {
            return item.children[i];
          }
        }
      }
    }
  })
}
const onSelect = (keys) => {
  data.treeId = keys[0];
  handleSearch(data.formSearchFilterquery);
};
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
  data.formSearchFilterquery = filterquery;
  if (filterquery) {
    data.queryParams.filterQuery += filterquery;
  }
  if (data.treeId) {
    data.queryParams.filterQuery += '\nFolderId\tin\t' + data.treeId;
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
      var id = row.id || '';
      var str = `
                <div class="iconBox">
            <div class="popup">
            <div class="option-item" onclick="handleTo('${id}')">查看</div>
            <div class="option-item" onclick="handleHistory('${id}')">变更</div>  
            <div class="option-item" onclick="handleVersion('${id}')">修订</div>
            <div class="option-item" onclick="InstitutionUrging('${id}')">催办</div>
            <div class="option-item" onclick="abolish('${id}')">废止</div>  
            <div class="option-item" onclick="addStamp('${id}')">添加水印</div>
            <div class="option-item" onclick="Delete('${id}')">删除</div>
            </div>
            <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
        `
      return str;
    }
  },];
  proxy.$get(Interface.listView.getFilterInfo, {
    entityType: '092',
    objectTypeCode: '100204',
    search: "",
    filterId: id
  }).then(res => {
    if (res && res.actions && res.actions[0]) { } else { return }
    let fields = res.actions[0].returnValue.fields;
    fields.forEach(item => {
      if (item.name != 'ProcessInstanceId' && item.name != 'WFRuleLogId' && item.name != 'ExecutorIdentityName') {
        columnslist.push({
          field: item.name,
          title: item.label,
          sortable: true,
          formatter: function formatter(value, row, index) {
            return girdFormatterValue(item.name, row);
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
    entityName: 'Institution',
    layoutName: 'RuleArticleHome'
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
// getTabs();

function handleTo(id) {
  // console.log("id", id);
  // router.push({
  //   path: "/detail",
  //   query: {
  //     id: id
  //   }
  // });
  let url = router.resolve({
    path: '/knowledge/RuleArticle/detail',
    name: "RuleArticleDetail",
    query: {
      id: id,
    },
  });
  window.open(url.href);
}



window.handleTo = handleTo;
window.data = data;
const imgUrl = require("@/assets/flow/checkbox_checked.gif");
const gridUrl = ref(Interface.list2);
const columns = ref([]);
const changeTab = (e) => {
  data.activeKey = e;
  data.queryParams.filterQuery = '';
  let filterColumnsList = (data.tabs)[e].filterableColumns;
  data.SearchFields = filterColumnsList;
  data.queryParams.filterId = data.tabs[e].filterId || '';
  if (data.formSearchFilterquery) {
    data.queryParams.filterQuery += data.formSearchFilterquery;
  }
  if (data.treeId) {
    data.queryParams.filterQuery += '\nFolderId\tin\t' + data.treeId;
  }
  getColumns(data.queryParams.filterId);
}

const handleDeleteCancel = (params) => {
  data.isDelete = params;
};
const Delete = (id) => {
  data.isDelete = true;
  data.listId = id;
};
window.Delete = Delete;
const refreshList = (params) => {
  data.isDelete = false;
  $("#datagrid").datagrid('reload');
};
const handleNew = () => {
  data.listId = '';
  data.type = 'new';
  data.isNew = true;
};
//批量添加水印
const batchAddStamp = () => {
  let list = gridRef.value.getCheckList();
  if (list.length) {
    data.listIds = list;
    data.isBatchAddStamp = true;
  } else {
    message.error("请至少勾选一项！")
  }
};
//批量变更目录
const batchEditFolder = () => {
  let list = gridRef.value.getCheckList();
  if (list.length) {
    data.listIds = list;
    data.isBatchEditFolder = true;
  } else {
    message.error("请至少勾选一项！")
  }
};
//催办
const InstitutionUrging = (id) => {
  data.listId = id;
  data.isInstitutionUrging = true;
}
window.InstitutionUrging = InstitutionUrging;
//废止
const abolish = (id) => {
  data.listId = id;
  data.isAbolish = true;
}
window.abolish = abolish;
//添加水印
const addStamp = (id) => {
  data.listId = id;
  data.isAddStamp = true;
}
window.addStamp = addStamp;
//变更
const handleHistory = (id) => {
  data.listId = id;
  data.type = 'history';
  data.isNew = true;
};
window.handleHistory = handleHistory;
//修订
const handleVersion = (id) => {
  data.listId = id;
  data.type = 'version';
  data.isNew = true;
};
window.handleVersion = handleVersion;
const clearCheckList = () => {
  gridRef.value.clearCheckList();
}
watch(() => route, (newVal, oldVal) => {
  if (gridRef && gridRef.value && gridRef.value.loadGrid != 'undefined' && !route.params.sObjectName) {
    if (route.path == '/lightning/page/knowledge/RuleArticle/home') {
      getTreeData();
      setTimeout(function () {
        getTabs();
      }, 200)
    }
  }
}, { deep: true, immediate: true })
onMounted(() => {
  window.addEventListener('resize', changeHeight)
  getTreeData()
  getTabs();
})
</script>
<style lang="less">
@import "@/style/flow/treeList.less";
</style>
<style scoped lang="less">
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

.RuleArticleHome {
  .wea-left-right-layout-right {
    flex: 1;
    max-width: 100%;
  }
  :deep .ant-input{
    border: 1px solid #d9d9d9 !important;
  }
}
</style>