<template>
    <div class="wrapper">
      <div class="headerTop">
        <div class="leftAll">
          <div class="menuImg">
            <img class="img" :src="require('@/assets/task_120.png')" alt="" />
          </div>
          <div class="menu-box">
            <div class="label">科室轮转</div>
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
            <a-button type="primary" v-else>{{ item.label }}</a-button>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="bd">
          <div class="searchWrap">
            <div class="search-common">
              <list-form-search
                ref="searchRef"
                @search="handleSearch"
              ></list-form-search>
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
              <a-dropdown class="ml10" :trigger="['click']">
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
              </a-dropdown>
              <a-button :icon="h(RedoOutlined)" class="ml10"> </a-button>
              <div class="btnGroup ml10">
                <a-button :icon="h(RedoOutlined)" title="图标"> </a-button>
                <a-button
                  :icon="h(RedoOutlined)"
                  title="筛选器"
                  @click="handleShowFilter"
                >
                </a-button>
              </div>
              <a-button class="ml10" :icon="h(SearchOutlined)"> </a-button>
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
      <Delete
        :isShow="isDeleteModal"
        v-if="isDeleteModal"
        @cancel="handleDeleteCancel"
      />
      <common-form-modal
        :isShow="isCommon"
        v-if="isCommon"
        @cancel="handleCommonCancel"
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
  import Delete from "@/components/listView/Delete.vue";
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  // 筛选器弹层
  import Filter from "@/components/listView/Filter.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
 import { useRouter, useRoute } from "vue-router";
 const route = useRoute();
const router = useRouter();
  const data = reactive({
    currentMenu: "全部",
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
    entityType: "a1K",
    filterQuery: "",
    isNewModal: false,
    isExportModal: false,
    isCopyModal: false,
    isRenameModal: false,
    isShareModal: false,
    isShowModal: false,
    isDeleteModal: false,
    isFilterModal: false,
    isCommon: false,
  });
  const {
    currentMenu,
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
    isDeleteModal,
    isFilterModal,
    isCommon,
  } = toRefs(data);
  const handleSwitchMenu = (item) => {
    data.currentMenu = item.name;
    data.isLock = false;
  };
  const handleLock = () => {
    data.isLock = !data.isLock;
  };
  onMounted(() => {});
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
    $("#datagrid").datagrid({
      url: Interface.listView.list,
      method: "get",
      columns: [columns],
      queryParams: {
        filterQuery: data.filterQuery,
      },
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
      onLoadSuccess: function () {},
    });
  };
  const Edit = (id) => {
    console.log("id", id);
    data.isCommon = true;
    // 编辑仪表盘
    // router.push({
    //   path: "/hrsetting/design",
    //   query: {
    //     id: id,
    //   },
    // })
  };
  window.Edit = Edit;
  const getConfig = () => {
    function formatOper(val, row, index, entityType, listViewActions) {
      var rowId = row["LIST_RECORD_ID"];
      var action = "";
      for (var i = 0; i < listViewActions.length; i++) {
        var item = listViewActions[i];
        action +=
          '<a style="color:#015ba7;font-size:13px;" href="javascript:;" onclick="' +
          [item.devNameOrId] +
          "('" +
          rowId +
          "','" +
          entityType +
          "')\">" +
          item.title +
          "</a>&nbsp;&nbsp;";
      }
      return action;
    }
    proxy.$get(Interface.listView.config, {}).then((res) => {
      console.log(res, "res");
  
      var cols = res.DataSet.Columns;
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
      for (var i = 0; i < cols.length; i++) {
        var c = cols[i];
        var col = {
          field: c.Name,
          title: c.Title,
          sortable: true,
        };
        columnsArray.push(col);
      }
      data.columns = columnsArray;
      loadGrid(data.columns);
    });
  };
  
  const getActions = () => {
    proxy
      .$get(Interface.listView.handleActions, {
        objectTypeCode: 30053,
      })
      .then((res) => {
        var listViewActions =
          res.actions[0].returnValue.actionsContainers[0].listViewActions;
        var actionList =
          res.actions[0].returnValue.actionsContainers[0].actionList;
        data.listViewActions = listViewActions;
        var temp = [];
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
        console.log("temp", temp);
        data.actionList = temp;
        getConfig();
      });
  };
  getActions();
  
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
        data.isDeleteModal = true;
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
    data.isDeleteModal = params;
  };
  // 显示筛选器
  const handleShowFilter = () => {
    data.isFilterModal = true;
  };
  const closeFilterModal = (params) => {
    data.isFilterModal = params;
  };
  
  // 通用弹窗关闭
  const handleCommonCancel = (params) => {
    data.isCommon = params;
  };
  const New = () => {
    data.isCommon = true;
  };
  const handleClickBtn = (type) => {
    if (typeof eval(type) == "function") {
      eval(type + "();");
    }
  };
  </script>
  <style lang="less">
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
          height: calc(~"100% - 60px");
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
  </style>
  