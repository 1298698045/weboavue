<template>
  <div>
    <a-modal v-model:open="props.isShow" width="1200px" style="top:30px;" :maskClosable="false" @cancel="handleCancel"
      @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer AddTopicWrap">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <div class="modalTop">
            <!-- <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                    <a-tab-pane key="1" tab="我创建"></a-tab-pane>
                    <a-tab-pane key="2" tab="部门的"></a-tab-pane>
                    <a-tab-pane key="3" tab="全部"></a-tab-pane>
                </a-tabs> -->
            <div class="searchBox">
              <div class="searchForm" :class="{ 'active': isAdvance }">
                <a-input-search v-model:value="searchVal" placeholder="请输入名称" size="large" @search="onSearch">
                </a-input-search>
                <a-button class="ml10" @click="advancedSearch">
                  高级搜索
                </a-button>
              </div>
              <div class="search-modal" v-if="isAdvance">
                <div class="search-container">
                  <list-form-search ref="searchRef" :entityApiName="props.entityApiName"
                    @search="handleAdvanceSearch"></list-form-search>
                </div>
                <div class="search-footer"></div>
              </div>
            </div>
          </div>

          <!-- <Dtable ref="gridRef" :singleSelect="true" name="datagridFilter" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable> -->
          <a-table :row-key="record => record.id" :row-selection="rowSelection" :columns="columns"
            :dataSource="listData" :scroll="{ y: tableHeight }" :pagination="false" @change="handleTableChange"
            class="tableWrap">
            <template #bodyCell="{ column, index, record }">
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

            </template>
          </a-table>
          <div class="pageWrap">
            <a-pagination show-size-changer show-quick-jumper :pageSizeOptions="['10', '20', '50', '80', '100']"
              :pageSize="pagination.pageSize" @showSizeChange="sizeChange" @change="handleTableChange"
              v-model:current="pagination.current" :total="pagination.total" :show-total="total => `共 ${total} 条`" />
          </div>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
        </div>
      </template>
    </a-modal>
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
  computed,
  inject
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
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
import { message } from "ant-design-vue";
import Dtable from "@/components/Dtable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import { girdFormatterValue } from "@/utils/common.js";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  objectTypeCode: [Number, String],
  entityType: [Number, String],
  field: String,
  entityApiName: String,
  lookEntityApiName: String
});
const formRef = ref();
const emit = defineEmits(["cancel", "select"]);
const handleCancel = () => {
  emit("cancel", false);
};
const gridRef = ref();
const data = reactive({
  title: "添加议题",
  height: document.documentElement.clientHeight - 185,
  columns: [
    // {
    //   title: "选择",
    //   dataIndex: "checked",
    //   key: "checked",
    //   width: 60,
    // },
    // {
    //   title: "序号",
    //   dataIndex: "index",
    //   key: "index",
    //   width: 60,
    // },
    {
      title: "名称",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "提交部门",
      dataIndex: "OwningBusinessUnit",
      key: "OwningBusinessUnit"
    },
    {
      title: "创建人",
      dataIndex: "CreatedBy",
      key: "CreatedBy"
    },
    {
      title: "创建时间",
      dataIndex: "CreatedOn",
      key: "CreatedOn"
    },
    {
      title: "状态",
      dataIndex: "StatusCode",
      key: "StatusCode"
    },
    {
      title: "排期日期",
      dataIndex: "ScheduledMeeting",
      key: "ScheduledMeeting"
    },
  ],
  isCollapsed: false,
  tableHeight: document.documentElement.clientHeight - 340,
  id: "",
  searchVal: "",
  isAdvance: false,
  queryParams: {
    entityType: props.entityApiName,
    search: "",
    filterId: '',
    filterQuery: "",
    rows: "",
    page: "",
    sort: "",
    order: ""
  },
  activeKey: '1',
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
  listData: [],
  selectedRowKeys: []
});
const gridUrl = ref(Interface.listView.list);
const {
  selectedRowKeys,
  title,
  height, columns, isCollapsed, tableHeight, searchVal, isAdvance, queryParams, activeKey, pagination, total, listData
} = toRefs(data);
const formState = reactive({
  searchVal: ""
});
const advancedSearch = () => {
  data.isAdvance = !data.isAdvance;
};
const handleAdvanceSearch = (e) => {
  console.log("高级搜索", e);
  data.queryParams.filterQuery = e;
  getQuery();
  //gridRef.value.loadGrid({search: data.searchVal, filterQuery: e});
}
const handleMenu = (e) => {
  let item = data.menus.find(item => item.key == e.key);
  data.currentMenu = item.name;
  data.currentKey = item.key;
  getLook();
}
const getQuery = () => {
  // proxy.$get(Interface.user.groupUser, {}).then((res) => {
  //   data.listData = res.rows;
  // });
  data.listData = [];
  data.pagination.total = 0;
  let filterQuery = '\nStatusCode\tneq\t0' + data.queryParams.filterQuery;
  proxy.$post(Interface.list2, {
    filterId: '',
    objectTypeCode: 5001,
    entityName: 'MeetingItem',
    filterQuery: filterQuery,
    search: data.searchVal || '',
    page: data.pagination.current,
    rows: data.pagination.pageSize,
    sort: 'CreatedOn',
    order: 'desc',
    displayColumns: 'Name,OwningBusinessUnit,CreatedBy,CreatedOn,StatusCode,ScheduledMeeting'
  }).then(res => {
    var list = [];
    data.total = res.pageInfo ? res.pageInfo.total : 0;
    data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
    if (res && res.nodes) {
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != 'id' && cell != 'nameField') {
            item[cell] = girdFormatterValue(cell, item);
          }
          if (cell == 'CreatedOn' || cell == 'ScheduledMeeting') {
            item[cell] = item[cell] ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm") : '';
          }
        }
        list.push(item)
      }
    }
    data.listData = list;
  })
};
const onSearch = (e) => {
  //gridRef.value.loadGrid({search: e});
  data.pagination.current = 1;
  getQuery();
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
const rowSelection = computed(() => {
  return {
    onChange: (selectedRowKeys, selectedRows) => {
      data.selectedRowKeys = selectedRowKeys;
    },
    selectedRowKeys: data.selectedRowKeys,
    preserveSelectedRowKeys: true
  }
});
onMounted(() => {
  data.selectedRowKeys=[];
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 185;
    data.tableHeight = document.documentElement.clientHeight - 340
  });
  // if(props.entityApiName=='WFProcessInstance'){
  //   data.title='选择流程'
  // }else if(props.entityApiName=='SystemUser'){
  //   data.title='选择用户'
  // }
  getQuery();
});

const getConfig = () => {
  let obj = {
    actions: [{
      id: "138;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        targetApiName: props.entityApiName,
        q: "",
        searchType: "",
        objectApiName: props.entityApiName,
        fieldApiName: '',
        body: "",
      }
    }]
  };
  let d = {
    message: JSON.stringify(obj)
  };
  proxy.$post(Interface.lookupObj.column, d).then(res => {
    let { fields } = res.actions[0].returnValue;
    fields.forEach(item => {
      data.columns.push({
        field: item.column,
        title: item.label,
        sortable: item.isSortable,
      });
    })
    gridRef.value.loadGrid(data.queryParams);
  })
}
//getConfig();
const handleSubmit = () => {
  //let list = gridRef.value.getCheckList();
  let list = [];
  // data.listData.forEach(item => {
  //   if (item.checked) {
  //     list.push(item.id)
  //   }
  // })
  list = data.selectedRowKeys;
  //console.log("checklist", list);
  if (list.length) {
    // let Name=list[0].Name||list[0].FullName;
    // Name=Name?$(Name).html():'';
    // let obj={
    //   id:list[0].LIST_RECORD_ID,
    //   name:Name
    // }
    emit("select", list);
  } else {
    message.error("至少选择一项！")
  }
};
const changeTab = (e) => {
  //console.log("e",e);
  var queryParams = data.queryParams;
  queryParams.search = data.searchVal;
  switch (e) {
    case 1:
      queryParams.filterQuery = "\nCreatedBy\teq-userid";
      break;
    case 2:
      queryParams.filterQuery = "\nBusinessUnitId\teq-businessunitid";
      break;
    case 3:
      queryParams.filterQuery = "";
      break;
  }
  gridRef.value.loadGrid(queryParams);
}
</script>
<style lang="less">
@import url("@/style/modal.less");
</style>
<style lang="less">
.searchForm {
  width: 300px;
  margin-bottom: 10px;
  margin-left: auto;
  display: flex;

  .ant-input-search {
    height: 32px !important;

    input {
      height: 32px !important;
    }
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-input-search-large .ant-input-search-button {
    width: 32px !important;
    height: 32px !important;
  }

  &.active {

    .ant-btn.searchBtn {
      border-bottom: none;
      position: absolute;
      right: 0;
      height: 43px;
      z-index: 999999;
      box-shadow: none;
      border-left: 1px solid #dadada;
    }
  }

}

.searchBox {
  position: relative;

  .search-modal {
    width: 100%;
    position: absolute;
    height: 150px;
    border: 1px solid #dadada;
    z-index: 9999;
    /* top: 100%; */
    box-shadow: 0 0 2px #dadada;
    background: #fff;

    .search-container {
      padding-left: 25px;
      padding-right: 50px;
      padding-top: 15px;
      padding-bottom: 8px;
    }
  }
}

.ant-modal-content .AddTopicWrap {
  td .datagrid-cell a {
    color: #1677ff !important;
  }

  .modalTop {
    position: relative;
    margin-bottom: 10px;
  }

  .searchBox {
    position: absolute;
    right: 5px;
    top: 5px;

    .search-modal {
      right: 0;
      max-width: 1000px;
      width: max-content;
    }
  }

  .modalCenter {
    padding: 0px 15px !important;
  }

  .searchForm.active .ant-input-search {
    margin-right: 0 !important;
  }

  .formSearch .ant-form .ant-form-item {
    min-width: 248px;
  }
}

.AddTopicWrap {
  .tableWrap {
    height: calc(~'100% - 100px') !important;
    margin-top: 50px;
  }

  .pageWrap {
    text-align: right;
  }

  .searchForm {
    .ant-input-search-button {
      height: 32px !important;
    }
  }
}
</style>