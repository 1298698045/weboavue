<template>
  <div>
    <a-modal v-model:open="props.isShow" width="1200px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" style="padding: 10px 15px!important;max-height: inherit !important;"
          :style="{ height: height + 'px!important' }">
          <div class="searchBox">
            <div class="searchForm hightSearchBox">
              <a-input-search v-model:value="searchVal" placeholder="请输入名称" size="large" @search="onSearch">
              </a-input-search>
              <a-button class="ml10" @click="advancedSearch">
                高级搜索
              </a-button>
            </div>
            <div class="search-modal" v-if="isAdvance">
              <div class="search-container">
                <list-form-search ref="searchRef" @search="handleAdvanceSearch"></list-form-search>
              </div>
              <div class="search-footer"></div>
            </div>
          </div>
          <Dtable ref="gridRef" :singleSelect="true" name="datagridFilter" :columns="columns" :gridUrl="gridUrl"
            :tableHeight="tableHeight" :isCollapsed="isCollapsed" :loadFilter="loadFilter"></Dtable>
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
  inject
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Dtable from "@/components/Dtable_nodes.vue";
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
  lookEntityApiName: String,
  lookObjectTypeCode: [Number, String],
  filterQuery: String
});
const formRef = ref();
const emit = defineEmits(["cancel", "select"]);
const handleCancel = () => {
  emit("cancel", false);
};
const gridRef = ref();
const data = reactive({
  title: "通用选择",
  height: document.documentElement.clientHeight - 300,
  columns: [
    {
      field: 'ids',
      checkbox: true
    },
  ],
  isCollapsed: false,
  tableHeight: document.documentElement.clientHeight - 370,
  id: "",
  searchVal: "",
  isAdvance: false,
  queryParams: {
    entityType: props.lookEntityApiName,
    search: "",
    filterQuery: props.filterQuery,
    rows: "",
    page: "",
    sort: "",
    order: "",
    displayColumns: "",
  },
  nameField: ""
});
const gridUrl = ref(Interface.list2);
const {
  title,
  height, columns, isCollapsed, tableHeight, searchVal, isAdvance, queryParams, nameField
} = toRefs(data);
const formState = reactive({
  searchVal: ""
});
const advancedSearch = () => {
  data.isAdvance = !data.isAdvance;
};
const handleAdvanceSearch = (e) => {
  data.isAdvance=false;
  console.log("高级搜索", e);
  if (props.filterQuery) {
    e += props.filterQuery;
  }
  data.queryParams.search = data.searchVal;
  data.queryParams.filterQuery = e;
  gridRef.value.loadGrid(data.queryParams);
}
const handleMenu = (e) => {
  let item = data.menus.find(item => item.key == e.key);
  data.currentMenu = item.name;
  data.currentKey = item.key;
  getLook();
}
const onSearch = (e) => {
  data.queryParams.search = e;
  gridRef.value.loadGrid(data.queryParams);
}
onMounted(() => {
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 300;
    data.tableHeight = document.documentElement.clientHeight - 370
  });
});

const loadFilter = (res) => {
  // console.log('dataloadfilter', data);
  // console.log("filterdata.queryParams.displayColumns", data.queryParams.displayColumns);
  let fields = data.queryParams.displayColumns.split(',');
  console.log("fields", fields);
  var data0 = { rows: [], total: 0 }
  if (res) {
    if (res.nodes) {
      let list = [];
      fields.forEach(field => {
        list = res.nodes.map(row => {
          // if(row[field] && row[field].__typeName == 'TextField'){
          //   row[field] = row[field].textValue;
          // }else if(row[field] && row[field].__typeName == 'DateTimeField'){
          //   row[field] = row[field].dateTime;
          // }else if(row[field] && row[field].__typeName == 'UserField'){
          //   row[field] = row[field].userValue.DisplayName || '';
          // }else {
          //   row[field] = row[field].value || '';
          // }
          row[field] = girdFormatterValue(field, row);
          row.LIST_RECORD_ID = row.id;
          return row;
        })
      })
      data0.rows = list;
    } else {
      data0.rows = res;
    }
  }
  data0.total = res && res.totalCount ? Number(res.totalCount) : data0.rows.length;
  return data0
}

const getConfig = () => {
  let obj = {
    actions: [{
      id: "138;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        targetApiName: props.lookEntityApiName,
        q: "",
        searchType: "",
        objectApiName: props.entityApiName,
        fieldApiName: props.field,
        body: "",
      }
    }]
  };
  let d = {
    message: JSON.stringify(obj)
  };
  proxy.$post(Interface.lookupObj.column, d).then(res => {
    let { fields, nameField } = res.actions[0].returnValue;
    fields.forEach(item => {
      data.columns.push({
        field: item.column,
        title: item.label,
        sortable: item.isSortable,
      });
    });
    data.nameField = nameField;
    data.queryParams.displayColumns = fields.map(item => item.column).join(',');
    gridRef.value.loadGrid(data.queryParams);
  })
}
getConfig();
const handleSubmit = () => {
  let list = gridRef.value.getCheckList();
  console.log("checklist", list);
  if (list.length) {
    emit("select", list[0], data.nameField);
  } else {
    message.error("请至少选择一项！")
  }
};
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
    .ant-input-search {
      margin-right: 86px;
    }

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

  .hightSearchBox {
    .ant-btn.ant-btn-lg {
      height: 32px !important;
    }
  }
}
</style>