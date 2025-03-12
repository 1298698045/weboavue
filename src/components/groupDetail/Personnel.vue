<template>
  <div class="PersonnelWrap" ref="PersonnelLst">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-head">
        <!-- <div class="panel-title">人员信息</div> -->
        <div class="tabWrap panel-bd-tabWrap">
          <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
            <a-tab-pane v-for="(item, index) in tabs" :key="index">
              <template #tab>
                <span>{{ item.label }}</span>
              </template>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="panel-btn">
          <a-button class="ml10" type="primary" @click="AddPeople">添加成员</a-button>
          <a-button class="ml10" type="primary" @click="AddAdmin">添加管理员</a-button>
        </div>
      </div>
      <div class="panel-bd panel-bd1">
        <div class="peopleHeader">
          <div class="left">
            <a-input-search v-model:value="searchVal" placeholder="请输入" style="width: 300px" @search="onSearch" />
          </div>
          <div class="rightOption">
            <a-button class="ml10" type="primary" @click="onSearch">查询</a-button>
            <a-button class="ml10" type="default" @click="onClear">重置</a-button>
            <a-button class="ml10" type="default">导出</a-button>
          </div>
        </div>
        <a-table :columns="columns" :dataSource="listData" :scroll="{ y: tableHeight }" :pagination="false"
          @change="handleTableChange">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template v-if="column.key === 'sort'">
              <div class="sortIcon">
                <ArrowUpOutlined @click.stop="DisplayOrderChange(record, index, 1)" />
                <ArrowDownOutlined @click.stop="DisplayOrderChange(record, index, 0)" />
              </div>
            </template>
            <template v-if="column.key === 'Action'">
              <div class="iconBox">
                <div class="popup">
                  <div class="option-item" @click="handleDelete(record.id)" :num="index">删除</div>
                </div>
                <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation"
                  data-v-69a58868="">
                  <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474"
                    data-v-69a58868=""></path>
                </svg>
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
    <radio-user v-if="isRadioUser" :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser"
      @ok="refreshPeople"></radio-user>
    <Delete v-if="isDelete" :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshPeople"
      :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
  </div>
</template>
<script setup>
import "@/style/common.less";
import {
  ref,
  toRefs,
  reactive,
  toRaw,
  onMounted,
  watch,
  getCurrentInstance,
  defineEmits,
  defineExpose,
  defineProps,
  h
} from "vue";
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import RadioUser from "@/components/commonModal/MultipleUser.vue";
import Delete from "@/components/listView/Delete.vue";
const { proxy } = getCurrentInstance();
const PersonnelLst = ref();
var columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80
  },
  {
    title: "排序",
    dataIndex: "",
    key: "sort",
  },
  {
    title: "姓名",
    dataIndex: "FullName",
  },
  {
    title: "部门",
    dataIndex: "BusinessUnitIdName",
  },
  {
    title: "角色",
    dataIndex: "RoleCode",
  },
  {
    title: "电话",
    dataIndex: "MobilePhone",
  },
  {
    title: "邮箱",
    dataIndex: "EMailAddress",
  },
  {
    title: "职位",
    dataIndex: "JobTitle",
  },
  {
    title: "操作",
    key: "Action",
    width: 120,
  },
];
const props = defineProps({
  id: String,
});

const emit = defineEmits(["load"]);

const data = reactive({
  list: [],
  selectedRowKeys: [],
  loading: false,
  listData: [],
  searchVal: "",
  isRadioUser: false,
  isDelete: false,
  RoleCode: 0,
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
  tableHeight: 0,
  recordId: '',
  objectTypeCode: '90',
  sObjectName: 'GroupMembership',
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  external: false,
  activeKey: 0,
  tabs: [
    {
      label: "成员",
    },
    {
      label: "管理员",
    },
  ],
  height: 100,
});
const changeTabs = (e) => {
  data.activeKey = e;
  getQuery();
};
const columnList = toRaw(columns);
const { height, activeKey, tabs, listData, searchVal, pagination, tableHeight, recordId, objectTypeCode, sObjectName, isDelete, deleteDesc, external, isRadioUser } = toRefs(data);
const getQuery = () => {
  // proxy.$get(Interface.user.groupUser, {}).then((res) => {
  //   data.listData = res.rows;
  // });
  data.listData = [];
  data.pagination.total = 0;
  let filterQuery = '\nGroupId\teq\t' + props.id;
  if (data.activeKey == 0) {
    filterQuery += '\nRoleCode\teq\t0';
  }
  if (data.activeKey == 1) {
    filterQuery += '\nRoleCode\teq\t2';
  }
  proxy.$post(Interface.list2, {
    filterId: '',
    objectTypeCode: '90',
    entityName: 'GroupMembership',
    filterQuery: filterQuery,
    search: data.searchVal || '',
    page: data.pagination.current,
    rows: data.pagination.pageSize,
    sort: 'DisplayOrder',
    order: 'ASC',
    displayColumns: 'RegardingObjectIdName,PhotoUrl,FullName,BusinessUnitIdName,RoleCode,MobilePhone,EMailAddress,WorkStatus,DisplayOrder'
  }).then(res => {
    var list = [];
    data.total = res.pageInfo ? res.pageInfo.total : 0;
    data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
    //console.log(pagination)
    for (var i = 0; i < res.nodes.length; i++) {
      var item = res.nodes[i];
      for (var cell in item) {
        if (cell != 'id' && cell != 'nameField' && cell != 'PhotoUrl') {
          item[cell] = girdFormatterValue(cell, item);
        }
        if (cell == 'RegardingObjectIdName') {
          item['FullName'] = item[cell];
        }
      }
      list.push(item)
    }
    data.listData = list;

  })
};
const onSearch = (e) => {
  getQuery();
};
const onClear = (e) => {
  data.searchVal = '';
  getQuery();
};
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
getQuery();
// 添加成员
const AddPeople = () => {
  data.isRadioUser = true;
  data.RoleCode = 0;
}
// 添加管理员
const AddAdmin = () => {
  data.RoleCode = 2;
  data.isRadioUser = true;
};
const refreshPeople = (e) => {
  getQuery();
  emit("load", "");
}
const closeUser = (e) => {
  data.isRadioUser = false;
};
// 添加成员/管理员
const getUserData = (params) => {
  console.log("params:", params);
  let url = Interface.create;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'GroupMembership',
          objTypeCode: '90',
          fields: {
            GroupId: props.id,
            RegardingObjectIdName: params.name,
            RegardingObjectId: params.id,
            RoleCode: data.RoleCode,
            RegardingObjectTypeCode: 8
          }
        }
      }
    }]
  };

  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    data.isRadioUser = false;
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      message.success("添加成功！");
      refreshPeople();
    }

  });

};
defineExpose({ getQuery, PersonnelLst });
//删除
const handleDelete = (key) => {
  data.recordId = key;
  data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
};
//上下排序
const DisplayOrderChange = (item, index, type) => {
  let DisplayOrder = item.DisplayOrder ? item.DisplayOrder * 1 : index + 1;
  if (type * 1 == 1) {
    if (index * 1 == 0) {
      message.error("已经移动到最顶了");
      return false;
    } else {
      DisplayOrder = DisplayOrder - 1;
    }
  }
  if (type * 1 == 0) {
    if (index + 1 == data.total) {
      message.error("已经移动到最底了");
      return false;
    } else {
      DisplayOrder = DisplayOrder + 1;
    }
  }
  let url = Interface.edit;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'GroupMembership',
          objTypeCode: 90,
          fields: {
            DisplayOrder: DisplayOrder
          }
        }
      }
    }]
  };
  if (item.id) {
    d.actions[0].params.recordId = item.id;

  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      message.success("移动成功！");
      refreshPeople();
    }
    else {
      if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
        message.error(res.actions[0].errorMessage);
      }
      else {
        message.error("移动失败！");
      }
    }
  });
}
onMounted(() => {
  let h = document.documentElement.clientHeight;
  data.tableHeight = h - 565;
  data.height = h - 355;
  window.addEventListener("resize", (e) => {
    let h = document.documentElement.clientHeight;
    data.tableHeight = h - 565;
    data.height = h - 355;
  });
})
</script>
<style lang="less">
.PersonnelWrap {
  width: 100%;

  .panel {
    padding: 0 8px;
    margin-bottom: 0;
  }

  .tabWrap {
    width: 100%;
    border-bottom: 1px solid #eee;
    position: relative;
    top: 0px;
  }

  .panel-head {
    margin-bottom: 12px;
    position: relative;
  }

  .panel-btn {
    position: absolute;
    right: 5px;
    top: 0;
  }

  .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab {
    padding: 10px 18px !important;
  }

}

body .ant-table-tbody td {
  padding: 6.5px 16px !important;
}

body .ant-table-measure-row td {
  padding: 0 !important;
}

body .ant-table-wrapper .ant-table-thead>tr>th {
  background-color: #f7fbfe !important;
  padding: 8.5px 16px !important;
}

body .ant-table-tbody tr:hover,
body .ant-table-tbody tr:hover td {
  background-color: #e9f7ff !important;
  color: #108def !important;
}

body .ant-table-tbody tr:nth-child(odd) {
  background-color: rgb(250, 250, 250) !important;
  /* 奇数行背景色 */
}

body .ant-table-tbody tr:nth-child(even) {
  background-color: #fff !important;
  /* 偶数行背景色 */
}

.ant-pagination {
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

.peopleHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.PersonnelWrap .pageWrap {
  text-align: right;
  padding: 15px;
}

.PersonnelWrap .iconBox .moreaction {
  padding: 0px 1px;
  width: 18px;
  border: 1px solid #dedede;
  border-radius: 4px;
  position: relative;
  top: 1px;
}

.PersonnelWrap .iconBox .popup {
  top: 25px;
  right: 0;
  width: max-content;
  min-width: 88px;
}

.PersonnelWrap {

  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-nested-loading .ant-spin-container,
  .ant-table-wrapper .ant-table,
  .ant-table-wrapper .ant-table-container {
    height: 100% !important;
  }

  .iconBox {
    position: relative;
    cursor: pointer;
  }

  .icon.img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .iconBox:hover .popup {
    display: block;
  }

  .popup {
    position: absolute;
    top: 0;
    min-width: 100px;
    background: #fff;
    display: none;
    z-index: 999999;
    box-shadow: 0 1px 6px rgba(99, 99, 99, 0.2);
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }

  .popup .option-item {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 6px 6px 0 0;
  }

  .popup .option-item:hover {
    background: #eaf8fe;
  }

  td[field="Action"] .datagrid-cell {
    overflow: initial !important;
  }

  :deep .iconBox {
    text-align: center;
  }

  :deep .iconBox .popup {
    text-align: left;
    top: 20px;
  }

  :deep .iconBox .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }

}

.PersonnelWrap .panel-bd1 {
  height: calc(~'100% - 170px') !important;
}

.PersonnelWrap .ant-table-body {
  height: 100% !important;
}

.container {
  padding: 10px;
  box-sizing: border-box;
}

.ant-pagination {
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

.PersonnelWrap {
  .sortIcon {
    .anticon {
      margin-right: 5px;
    }
  }

  .tabWrap {
    width: 100%;
    border-bottom: 1px solid #eee;
  }

  .panel-head {
    margin-bottom: 12px;
    position: relative;
  }

  .panel-btn {
    position: absolute;
    right: 5px;
    top: 0;
  }

  .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab {
    padding: 10px 18px !important;
  }
}
</style>
