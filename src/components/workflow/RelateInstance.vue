<template>
  <div>
    <a-modal v-model:open="props.isShow" width="1200px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer RelateInstanceContent">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <div class="modalTop">
            <a-tabs v-model:activeKey="activeKey" @change="changeTab">
              <a-tab-pane key="1" tab="我创建的"></a-tab-pane>
              <a-tab-pane key="2" tab="已办理的"></a-tab-pane>
              <a-tab-pane key="3" tab="收到传阅的"></a-tab-pane>
            </a-tabs>
            <div class="searchBox">
              <div class="searchForm" :class="{'active':isAdvance}">
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
          </div>

          <Dtable ref="gridRef" :singleSelect="true" name="datagridFilterModal" :columns="columns" :gridUrl="gridUrl"
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
  // import Dtable from "@/components/Dtable.vue";
  import Dtable from "@/components/Dtable_nodes.vue";

  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { girdFormatterValue, formNodesValueObj } from "@/utils/common.js";

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
    title: "关联事务",
    height: document.documentElement.clientHeight - 350,
    columns: [
      {
        field: 'ids',
        checkbox: true
      },
    ],
    isCollapsed: false,
    tableHeight: document.documentElement.clientHeight - 410,
    id: "",
    searchVal: "",
    isAdvance: false,
    queryParams: {
      filterId: 'BEAF8F4A-43BD-44D2-9F98-E75A4D7314C3',
      objectTypeCode: "122",
      entityName: 'WFProcessInstances',
      displayColumns: "",
      search: "",
      filterQuery: "",
      sort: "CreatedOn",
      order: "desc",
    },
    entityType: "122",
    activeKey: '1',
  });
  const gridUrl = ref(Interface.list2);
  const {
    title,
    height, columns, isCollapsed, tableHeight, searchVal, isAdvance, queryParams, activeKey, entityType
  } = toRefs(data);
  const formState = reactive({
    searchVal: ""
  });
  const advancedSearch = () => {
    data.isAdvance = !data.isAdvance;
  };
  const handleAdvanceSearch = (e) => {
    console.log("高级搜索", e);
    gridRef.value.loadGrid({ search: data.searchVal, filterQuery: e });
  }
  const handleMenu = (e) => {
    let item = data.menus.find(item => item.key == e.key);
    data.currentMenu = item.name;
    data.currentKey = item.key;
    getLook();
  }
  const onSearch = (e) => {
    gridRef.value.loadGrid({ search: e });
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 350;
      data.tableHeight = document.documentElement.clientHeight - 410
    });
  });

  const loadFilter = (res) => {
    let fields = data.queryParams.displayColumns.split(',');
    var data0 = { rows: [], total: 0 }
    if (res) {
      if (res.nodes) {
        let list = [];
        fields.forEach(field => {
          list = res.nodes.map(row => {
            if(field == 'ProcessInstanceId'){
              row.ProcessInstanceId2 = row.ProcessInstanceId.lookupValue.value;
            }
            if (field != 'id' && field != 'nameField') {
              row[field] = girdFormatterValue(field, row);
            }
            
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
    data.columns = [
      {
        field: 'ids',
        checkbox: true
      },
    ];
    let d = {
      entityType: data.entityType,
      objectTypeCode: data.queryParams.objectTypeCode,
      search: data.queryParams.search,
      filterId: data.queryParams.filterId
    };
    proxy.$get(Interface.listView.getFilterInfo, d).then(res => {
      let { fields } = res.actions[0].returnValue;
      let arr = [];
      fields.forEach(item=>{
        data.columns.push({
          field: item.name,
          title: item.label,
          sortable: true,
        });
        arr.push(item.name);
        data.queryParams.displayColumns = arr.join(',');
      })
      console.log("data.columns", data.columns);
      gridRef.value.loadGrid(data.queryParams);
    })
  }
  getConfig();
  const handleSubmit = () => {
    let list = gridRef.value.getCheckList();
    console.log("checklist", list);
    if (list.length) {
      emit("select", list[0]);
    } else {
      message.error("至少选择一项！")
    }
  };
  const changeTab = (e) => {
    console.log("e",e);
    // var queryParams = data.queryParams;
    // queryParams.search = data.searchVal;
    // gridRef.value.loadGrid(queryParams);
    if(e == 1){
      data.queryParams = {
          filterId: 'BEAF8F4A-43BD-44D2-9F98-E75A4D7314C3',
          objectTypeCode: "122",
          entityName: 'WFProcessInstances',
          displayColumns: "",
          search: "",
          filterQuery: "",
          sort: "CreatedOn",
          order: "desc",
        };
        data.entityType = "122";
    }else if(e == 2){
      data.queryParams = {
          filterId: '00000000-0000-0000-00AA-000010001206',
          objectTypeCode: "123",
          entityName: 'WFRuleLog',
          displayColumns: "",
          search: "",
          filterQuery: "",
          sort: "CreatedOn",
          order: "desc",
      }
      data.entityType = "123";
    };
    getConfig();
    console.log("data", data.queryParams)
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

    .ant-btn {
      /* margin-left: -1px; */
      /* border-left: none; */
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-input-search-large .ant-input-search-button {
      width: 32px !important;
      height: 32px !important;
    }

    &.active {
      .ant-input-search {
        //   margin-right: 86px;
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
  }

  .ant-modal-content .RelateInstanceContent {
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
</style>