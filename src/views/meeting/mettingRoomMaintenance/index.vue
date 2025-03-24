<template>
    <div class="wrapper">
      <div class="headerTop">
        <div class="leftAll">
          <div class="menuImg">
            <img class="img" :src="require('@/assets/task_120.png')" alt="" />
          </div>
          <div class="menu-box">
            <div class="label">会议室维护1</div>
            <div class="row">
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  {{ currentMenu }}
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item
                      v-for="(item, index) in menus"
                      :key="index"
                      @click="handleSwitchMenu(item)"
                    >
                      <span class="iconitem">
                        <CheckOutlined v-if="item.name == currentMenu" />
                      </span>
                      <a href="javascript:;">{{ item.name }}</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <div class="lockBtn" title="固定此列表视图" @click="handleLock">
                <img
                  v-if="isLock"
                  :src="require('@/assets/pinned14.png')"
                  class="img active"
                  alt=""
                />
                <img
                  v-else
                  :src="require('@/assets/pin_italic14.png')"
                  class="img active"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="rightBtns">
          <div v-for="(item, index) in actionList" :key="index">
            <div class="btnGroup ml10" v-if="Array.isArray(item)">
              <a-button
                v-for="(row, idx) in item"
                :key="idx"
                @click="handleClickBtn(row.devNameOrId)"
                >{{ row.label }}</a-button
              >
            </div>
            <a-button type="primary" @click="handleClickBtn(item.devNameOrId)" v-else>{{ item.label }}</a-button>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="bd">
          <div class="searchWrap">
            <div class="search-common">
              <list-form-search ref="searchRef" :isCollapsed="isCollapsed" @update-height="changeHeight" @search="handleSearch" :entityApiName="entityName"></list-form-search>
            </div>
            <div class="search-btns">
              <a-dropdown :trigger="['click']">
                <a-button>
                  <SettingOutlined />
                  <CaretDownOutlined style="font-size: 10px" />
                </a-button>
                <template #overlay>
                  <a-menu @click="handleMenuClick">
                    <a-menu-item key="1">新建</a-menu-item>
                    <a-menu-item key="2">导出</a-menu-item>
                    <a-menu-item key="3">复制</a-menu-item>
                    <a-menu-item key="4">重命名</a-menu-item>
                    <a-menu-item key="5">共享设置</a-menu-item>
                    <a-menu-item key="6">选择要显示的字段</a-menu-item>
                    <a-menu-item key="7">删除</a-menu-item>
                    <a-menu-item key="8">Kanban设置</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <!-- <a-dropdown class="ml10" :trigger="['click']">
                <a-button>
                  <SettingOutlined />
                  <CaretDownOutlined style="font-size: 10px" />
                </a-button>
                <template #overlay>
                  <a-menu @click="handleMenuClick">
                    <a-menu-item key="1">列表</a-menu-item>
                    <a-menu-item key="2">卡片</a-menu-item>
                    <a-menu-item key="3">分屏视图</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown> -->
              <a-button
                :icon="h(FilterOutlined)"
                title="筛选器"
                @click="handleShowFilter"
              >
              </a-button>
              <!-- <div class="btnGroup ml10">
                
              </div> -->
              <a-button :icon="h(RedoOutlined)" title="刷新" @click="refreshList"> </a-button>
              <a-button class="ml10" :icon="h(SearchOutlined)" title="高级搜索"> </a-button>
            </div>
          </div>
          <div class="gridWrap">
            <div id="datagrid"></div>
            <div class="filterModalWrap" v-if="isFilterModal">
              <Filter @close="closeFilterModal" />
            </div>
          </div>
        </div>
      </div>
      <!-- 弹窗 -->
      <NewVue :isShow="isNewModal" v-if="isNewModal" @cancel="handleNewCancel" />
      <Copy :isShow="isCopyModal" v-if="isCopyModal" @cancel="handleCopyCancel" />
      <Rename
        :isShow="isRenameModal"
        v-if="isRenameModal"
        @cancel="handleRenameCancel"
      />
      <export-field
        :isShow="isExportModal"
        v-if="isExportModal"
        @cancel="handleExportCancel"
      ></export-field>
      <share-setting
        :isShow="isShareModal"
        v-if="isShareModal"
        @cancel="handleShareCancel"
      ></share-setting>
      <show-field
        :isShow="isShowModal"
        v-if="isShowModal"
        @cancel="handleShowCancel"
      ></show-field>
      <DeleteModal :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="handleDeleteCancel" @ok="refreshList" :sObjectName="entityName" :recordId="listId" :objTypeCode="objectTypeCode" :external="external" />
      <common-form-modal
        :isShow="isCommon"
        v-if="isCommon"
        @cancel="handleCommonCancel" @success="refreshList"
        :title="listId?'编辑':'新建'" @load="handleSearch" :id="listId" :objectTypeCode="entityType" :entityApiName="entityName"
      ></common-form-modal>
    </div>
  </template>
  <script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
    CheckOutlined,
    SettingOutlined,
    RedoOutlined,
    SearchOutlined,
    FilterOutlined
  } from "@ant-design/icons-vue";
  import {
    ref,
    watch,
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance,
    onUpdated,
    h,
  } from "vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  
  // 新建列表视图
  import NewVue from "@/components/listView/New.vue";
  import Copy from "@/components/listView/Copy.vue";
  import Rename from "@/components/listView/Rename.vue";
  import ShareSetting from "@/components/listView/ShareSetting.vue";
  // 导出字段
  import ExportField from "@/components/listView/ExportField.vue";
  import ShowField from "@/components/listView/ShowField.vue";
  import DeleteModal from "@/components/listView/Delete.vue";
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  // 筛选器弹层
  import Filter from "@/components/listView/Filter.vue";
  import Interface from "@/utils/Interface.js";
  import { girdFormatterValue } from "@/utils/common.js";
  const { proxy } = getCurrentInstance();
  const data = reactive({
    currentMenu: "全部",
    currentFilterId:'',
    menus: [
      {
        id: 1,
        name: "全部",
      },
      {
        id: 2,
        name: "未审批的轮转",
      },
      {
        id: 3,
        name: "本科轮科人员",
      },
      {
        id: 4,
        name: "我创建的",
      },
    ],
    isLock: true,
    columns: [],
    actionList: [],
    listViewActions: [],
    entityType: "023",
    filterQuery: "",
    objectTypeCode:'20034',
    entityName:'ResourceOrg',
    isNewModal: false,
    isExportModal: false,
    isCopyModal: false,
    isRenameModal: false,
    isShareModal: false,
    isShowModal: false,
    isDelete: false,
    isFilterModal: false,
    isCommon: false,
    listId:'',
    deleteDesc: '确定要删除吗？',
    external:false,
  });
  const {
    currentMenu,
    currentFilterId,
    menus,
    isLock,
    columns,
    actionList,
    listViewActions,
    entityType,
    filterQuery,
    isNewModal,
    isExportModal,
    isCopyModal,
    isRenameModal,
    isShareModal,
    isShowModal,
    isDelete,
    isFilterModal,
    isCommon,
    listId,
    entityName,
    deleteDesc,
    external
  } = toRefs(data);
  const handleSwitchMenu = (item) => {
    data.currentMenu = item.name;
    data.isLock = false;
    data.currentFilterId=item.id;
    getConfig();
  };
  const handleLock = () => {
    data.isLock = !data.isLock;
  };
  const getFilterList = () => {
      proxy.$get(Interface.listView.filterList, {
        entityType: data.entityType,
        objectTypeCode: data.objectTypeCode,
        search: ""
      }).then(res=>{
        data.menus = JSON.parse(JSON.stringify(res.actions[0].returnValue));
      })
    };
  onMounted(() => {
    
    getMetadataInitialLoad().then(res=>{
          //console.log("resAsync", res);
          //data.initialData = res.actions[0].returnValue;
          //data.currentFilter = {
            //id: data.initialData.listViewId,
            //name: data.initialData.listViewLabel
          //}
          //data.title = data.initialData.breadCrumbList.length ? data.initialData.breadCrumbList[0].label : '';
          if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.listViewId){
            data.currentFilterId = res.actions[0].returnValue.listViewId||'';
            data.currentMenu = res.actions[0].returnValue.listViewLabel||'';
          }
          getFilterList();
          getActionsRow();
          getActionsTop();
          getConfig();
        });
  });
  const handleSearch = (params) => {
    // var filterQuery = "";
    // for (var key in params) {
    //   filterQuery += "\n" + key + "\teq\t" + params[key];
    // }
    // console.log(filterQuery, "filterQuery");
    // data.filterQuery = filterQuery;
    data.filterQuery = params;
    loadGrid(data.columns);
  };
  const loadGrid = (columns) => {
    if ($.fn.pagination.defaults != undefined) {
      //分页工具栏处理
      $.fn.pagination.defaults.beforePageText = "";
      $.fn.pagination.defaults.afterPageText = "/{pages}";
      $.fn.pagination.defaults.displayMsg = "从{from} 到 {to} 总计 {total} 条";
    }
    var authorization=window.localStorage.getItem('token')||'';
    $("#datagrid").datagrid({
      url: Interface.list2,
      method: "post",
      columns: [columns],
      queryParams: {
        filterQuery: data.filterQuery,
        entityType: data.entityType,
        objectTypeCode: data.objectTypeCode,
        filterId:data.currentFilterId||'',
        entityName:data.entityName,
        search:'',
      },
      headers:{authorization:authorization},
      // data: tableList,
      singleSelect: false,
      checkOnSelect: false,
      selectOnCheck: false,
      pagination: true,
      pageNumber: 1,
      pageSize: 10,
      fit: true,
      striped: false,
      rownumbers: true,
      loadFilter: function (res) {
          var data0 = { rows: [], total: 0 }
          if (res&&res.nodes) {
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='viewUrl'){
                        item[cell]=girdFormatterValue(cell,item,res.nameField);
                    }
                }
                data0.rows.push(item)
            }
          }
          data0.total = res&&res.nodes && res.nodes.total ? Number(res.nodes.total) : data0.rows.length;
          return data0
      },
      onLoadSuccess: function () {},
    });
  };
  const Edit = (id) => {
    //console.log("id", id);
    data.isCommon = true;
    data.listId=id;
  };
  window.Edit = Edit;
  const getConfig = () => {
    function formatOper(val, row, index, entityType, listViewActions) {
      var rowId = row["id"];
      var action = "";
      action += '<div class="iconBox">'
      action += '<div class="popup">'
      for (var i = 0; i < listViewActions.length; i++) {
        var item = listViewActions[i];
        action +=
          '<div class="option-item" href="javascript:;" onclick="' +
          [item.devNameOrId] +
          "('" +
          rowId +
          "','" +
          entityType +
          "')\">" +
          item.title +
          "</div>";
      }
      action += '</div><svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>'
      return action;
    }
    proxy.$get(Interface.listView.getFilterInfo, {
        entityType: data.entityType,
        objectTypeCode: data.objectTypeCode,
        search: '',
        filterId: data.currentFilterId||''
    }).then((res) => {
      console.log(res, "res");
      var columnsArray = [];
      var col = {
        field: "Action",
        title: "操作",
        formatter: function formatter(value, row, index) {
          return formatOper(
            value,
            row,
            index,
            data.entityType,
            data.listViewActions
          );
        },
      };
      columnsArray.push(col);
      let { fields } = res.actions[0].returnValue;
      fields.forEach(item=>{
        columnsArray.push({
          field: item.name,
          title: item.label,
          sortable: true
        });
      })
      data.columns = columnsArray;
      loadGrid(data.columns);
    });
  };
  // 获取元数据
  const getMetadataInitialLoad = async () => {
      let response;
      await proxy.$get(Interface.listView.getMetadataInitialLoad, {
        entityType: data.entityType,
      }).then(res=>{
        response = res;
      })
      return response;
    }
    
  const getActionsRow = () => {
    let d = {
        actions:[{
            
          "id": "",
          "descriptor": "",
          "callingDescriptor": "UNKNOWN",
          "params": {
            "recordId": "",
            "context": "LIST_VIEW_RECORD",
            "actionTypes": [
              "standardButton"
            ],
            "inContextOfRecordId": null,
            "listNameOrId": data.currentFilterId,
            "entityApiName": data.entityName,
            "isLABPreview": false,
            "actionsRequestId": 1
          }


        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.listView.actionsrow, obj).then((res) => {
        var temp = [];
if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
  data.listViewActions = res.actions[0].returnValue;
}
      });
  };
  const getActionsTop = () => {
    let d = {
        "actions": [
          {
            "id": "3817;a",
            "descriptor": "",
            "callingDescriptor": "UNKNOWN",
            "params": {       
                  "recordId": null,
                  "context": "LIST_VIEW",
                  "entityApiName": data.entityName,
                  "record": null,
                  "listNameOrId": data.currentFilterId,
                  "size": 5,
                  "maxWidth": -1,
                  "actionTypes": [],
                  "bulkedAction": false,
                  "actionNames": [],
                  "enableActionsConfiguration": false,
                  "isLABPreview": false,
                  "actionsRequestId": 5        
            }
          }
        ]

    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.listView.actionstop, obj).then((res) => {
        var temp = [];
if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
        var actionList = res.actions[0].returnValue;
        for (var i = 0; i < actionList.length; i++) {
          let item = actionList[i];
          if (item.isSeparator) {
            temp.push([item]);
          } else {
            if (Array.isArray(temp[temp.length - 1])) {
              temp[temp.length - 1].push(item);
            } else {
              temp.push(item);
            }
          }
        }
}
        //console.log("temp", temp);
        data.actionList = temp;
      });
  };
  
  // 右侧菜单操作
  const handleMenuClick = (e) => {
    console.log(e);
    switch (e.key) {
      case "1":
        data.isNewModal = true;
        break;
      case "2":
        data.isExportModal = true;
        break;
      case "3":
        data.isCopyModal = true;
        break;
      case "4":
        data.isRenameModal = true;
        break;
      case "5":
        data.isShareModal = true;
        break;
      case "6":
        data.isShowModal = true;
        break;
      case "7":
        data.isDelete = true;
        break;
    }
  };
  
  const handleNewCancel = (params) => {
    data.isNewModal = params;
  };
  const handleExportCancel = (params) => {
    data.isExportModal = params;
  };
  const handleCopyCancel = (params) => {
    data.isCopyModal = params;
  };
  const handleRenameCancel = (params) => {
    data.isRenameModal = params;
  };
  const handleShareCancel = (params) => {
    data.isShareModal = params;
  };
  const handleShowCancel = (params) => {
    data.isShowModal = params;
  };
  const handleDeleteCancel = (params) => {
    data.isDelete = params;
  };
  // 显示筛选器
  const handleShowFilter = () => {
    data.isFilterModal = true;
  };
  const closeFilterModal = (params) => {
    data.isFilterModal = params;
  };
  const Delete = (id) => {
    //console.log("id", id);
    data.isDelete = true;
    data.listId=id;
  };
  window.Delete = Delete;
  // 通用弹窗关闭
  const handleCommonCancel = (params) => {
    data.listId='';
    data.isCommon = params;
  };
  const refreshList= (params) => {
    data.isCommon = false;
    data.isDelete = false;
    $("#datagrid").datagrid('reload');
  };
  const New = () => {
    data.listId='';
    data.isCommon = true;
  };
  const handleClickBtn = (type) => {
    console.log(1111111111111111)
    if (typeof eval(type) == "function") {
      eval(type + "();");
    }
  };
  </script>
  <style lang="less" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 3px;
    padding: 15px;
    box-sizing: border-box;
  
    .headerTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e3e5;
      padding-bottom: 10px;
  
      .leftAll {
        padding-left: 10px;
        display: flex;
        align-items: center;
  
        .menuImg {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          background: #4bc076;
          margin-right: 10px;
  
          .img {
            width: 100%;
            height: 100%;
          }
        }
  
        .menu-box {
          min-width: 130px;
  
          .label {
            font-size: 14px;
          }
  
          .row {
            display: flex;
            align-items: center;
          }
        }
  
        .lockBtn {
          width: 24px;
          height: 24px;
          background: #fff;
          border-radius: 4px;
          border: 1px solid #e2e3e5;
          text-align: center;
          line-height: 24px;
          cursor: pointer;
          margin-left: 10px;
  
          .img {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  
    .searchWrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .search-common {
        flex: 1;
      }
      .search-btns {
        display: flex;
      }
    }
  
    .center {
      height: calc(~"100% - 58px");
  
      .bd {
        height: 100%;
  
        .gridWrap {
          position: relative;
          height: calc(~"100% - 45px");
        }
      }
    }
  }
  
  .ant-dropdown-link {
    min-width: 130px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  
  .iconitem {
    display: inline-block;
    width: 20px;
  }
  .rightBtns {
    display: flex;
  }
  .ant-btn {
    border-radius: 4px;
  }
  .btnGroup {
    .ant-btn {
      border-radius: 0;
    }
    .ant-btn:first-child {
      border-radius: 4px 0 0 4px;
    }
    .ant-btn:last-child {
      border-radius: 0 4px 4px 0;
    }
    .ant-btn + .ant-btn {
      margin-left: -1px;
    }
  }
  .filterModalWrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 321px;
    height: 100%;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    border: 1px solid #dddddd;
    border-left: none;
  }
  button.css-dev-only-do-not-override-kqecok.ant-btn.ant-btn-default.ant-dropdown-trigger{
    padding: 0;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 10px;
    .anticon{
      margin-left: 3px;
    }
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-btn.ant-btn-icon-only{
    margin-right: 10px;
    margin-left: 0;
  }
  .formSearch{
    padding-bottom: 0;
  }
  :deep .iconBox{
  text-align: center;
  .popup{
    text-align: left;
    top: 20px;
  }
  .moreaction{
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
}
  </style>
  