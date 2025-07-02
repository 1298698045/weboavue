<template>
  <div class="wrappper">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base" style="background: #217346">
          <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="" />
        </div>
        <span class="headerTitle">{{ pageTitle || "" }}</span>
      </div>
      <div class="headerRight">
        <!-- <a-button type="primary" class="ml10" @click="handleSubmit"
          >提交</a-button
        > -->
        <a-button type="primary" class="ml10" @click="handlePrint"
          >打印</a-button
        >
      </div>
    </div>
    <!-- <div class="wea-header">
      <div class="wea-tab">
        <a-tabs v-model:activeKey="activeKey" @change="changeTab">
          <a-tab-pane
            v-for="(item, index) in data.tabs"
            :key="item.id"
            :num="index"
          >
            <template #tab>
              <span>
                {{ item.label }}
              </span>
            </template>
          </a-tab-pane>
        </a-tabs>
        <div class="tabsBtn"></div>
      </div>
    </div> -->
    <div class="calendarBody">
      <div class="calendarLeft">
        <CalendarVue
          ref="CalendarWrapRef"
          v-if="isshowCalendar"
          :SelectPeopleObj="SelectPeopleObj"
          @refresh="refreshTime"
        />
      </div>
      <div class="calendarRight">
        <div class="attdpeople">
          <div class="attdpeople-head">
            <div class="attdpeople-head-title">
              值班人员
              <a-input
                placeholder="请输入搜索"
                class="attdpeople-head-seach-input"
                autocomplete="off"
                v-model:value="data.searchVal"
                @change="onSearch"
              ></a-input>
              <SearchOutlined class="attdpeople-head-seach-icon" />
            </div>
          </div>
          <div class="attdpeople-section" v-if="!data.searchVal">
            <a-tree
              class="group-people-tree"
              :style="{ height: tableHeight + 'px' }"
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :tree-data="gData"
              block-node
              :fieldNames="fieldNames"
              :selectedKeys="[data.SelectKey]"
              :load-data="loadGroupNode"
              @select="onSelect"
              @expand="onExpand"
            >
              <template #switcherIcon="{ switcherCls }">
                <CaretDownOutlined
                  :class="switcherCls"
                  style="color: rgb(163, 163, 163); font-size: 14px"
                ></CaretDownOutlined>
              </template>
              <template #title="{ name }">
                <span>{{ name }}</span>
              </template>
            </a-tree>
          </div>
          <div class="attdpeople-section" v-if="data.searchVal">
            <a-tree
              class="group-people-tree"
              :style="{ height: tableHeight + 'px' }"
              :expanded-keys="expandedKeys2"
              :auto-expand-parent="autoExpandParent2"
              :tree-data="gDataAll"
              block-node
              :fieldNames="fieldNames"
              :selectedKeys="[data.SelectKey]"
              @select="onSelect2"
              @expand="onExpand2"
            >
              <template #switcherIcon="{ switcherCls }">
                <CaretDownOutlined
                  :class="switcherCls"
                  style="color: rgb(163, 163, 163); font-size: 14px"
                ></CaretDownOutlined>
              </template>
              <template #title="{ name }">
                <span>{{ name }}</span>
              </template>
            </a-tree>
          </div>
          <!-- <div id="attachFiles" style="margin-bottom:10px;">
                        <div class="attdpeople-head-title">附件</div>
                    </div> -->
        </div>
      </div>
    </div>
    <div class="loadingWrap" v-if="!isshowCalendar">
      <loading-outlined></loading-outlined>
      <span class="loadinglabel">正在加载中，请稍候...</span>
    </div>
  </div>
</template>
<script setup>
// import "@/style/oldIcon/iconfont.css";
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
  nextTick,
} from "vue";
import {
  SearchOutlined,
  DeleteOutlined,
  LoadingOutlined,
  CaretDownOutlined,
} from "@ant-design/icons-vue";
import ListView from "@/components/meeting/meetingCalendar/List.vue";
import CalendarVue from "@/components/Dutyshift/DeptShiftAdmin/Calendar.vue";
import { message } from "ant-design-vue";

import Interface from "@/utils/Interface.js";
import { girdFormatterValue, formTreeData } from "@/utils/common.js";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const data = reactive({
  current: 1,
  searchVal: "",
  pageTitle: "部门值班",
  isshowCalendar: true,
  pageTime: "",
  tableHeight: "",
  fieldNames: {
    children: "children",
    title: "name",
    key: "id",
  },
  SelectKey: "",
  SelectName: "",
  SelectPeopleObj: {
    BusinessUnitId:''
  },
  activeKey: "",
  tabs: [
    {
      label: "全部",
      count: "",
      id: "",
    },
  ],
});
const {
  tabs,
  activeKey,
  SelectPeopleObj,
  SelectKey,
  SelectName,
  fieldNames,
  tableHeight,
  pageTime,
  pageTitle,
  current,
  searchVal,
  isshowCalendar,
} = toRefs(data);
const expandedKeys = ref([]);
const autoExpandParent = ref(true);
const expandedKeys2 = ref([]);
const autoExpandParent2 = ref(true);
const gData = ref([]);
const gDataAll = ref([]);
const CalendarWrapRef = ref(null);
const onExpand = (keys) => {
  expandedKeys.value = keys;
};
const onSelect = (keys, { node }) => {
  expandedKeys.value = keys;
  if (keys && keys.length) {
    data.SelectKey = node.id;
    data.SelectName = node.name;
    data.SelectPeopleObj = {
      id: node.EmployeeId || "",
      name: node.name || "",
      telephone: node.telephone,
      BusinessUnitId:data.activeKey
    };
  }
};
const onExpand2 = (keys) => {
  expandedKeys2.value = keys;
};
const onSelect2 = (keys, { node }) => {
  expandedKeys2.value = keys;
  if (keys && keys.length) {
    data.SelectKey = node.id;
    data.SelectName = node.name;
    data.SelectPeopleObj = {
      id: node.id || "",
      name: node.name || "",
      telephone: node.telephone,
      BusinessUnitId:data.activeKey
    };
  }
};
const getTabs = () => {
  data.tabs = [];
  let d = {
    entityName: "BusinessUnit",
    displayColumns: "Name",
    page: 1,
    rows: 100,
  };
  proxy.$post(Interface.list2, d).then((res) => {
    var list = [];
    if (res?.nodes?.length) {
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "viewUrl") {
            item[cell] = girdFormatterValue(cell, item);
          }
        }
        item.label = item.Name;
        list.push(item);
      }
    }
    data.tabs = list;
    getData();
  });
};
const changeTab = (e) => {
  data.activeKey = e;
  getData();
};
function changeHeight(h) {
  let contentHeight = document.documentElement.clientHeight;
  let height = contentHeight - 100;
  data.tableHeight = height;
}
const getTreeData = () => {
  gData.value = [];
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "30041",
      entityName: "HRAttendGroup",
      search: "",
      page: 1,
      rows: 100,
      sort: "SortNumber",
      order: "asc",
      displayColumns: "Name",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField") {
              item[cell] = girdFormatterValue(cell, item);
            }
          }
          gData.value.push({
            children: [],
            id: item.id,
            pid: "",
            key: item.id,
            name: item.Name,
            parent: null,
            quantity: 0,
            text: null,
            value: item.id,
          });
          //getChild(item.id, i);
        }
      }
    });
};

const getChild = (id, index) => {
  gData.value[index].children = [];
  gDataAll.value[index].children = [];
  let filterCondition =
    '[{"attribute":"AttendGroupId","column":"AttendGroupId","label":"","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":["' +
    id +
    '"]}]';
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "30042",
      entityName: "HRAttendGroupMembers",
      filterCondition: filterCondition,
      search: "",
      page: 1,
      rows: 100,
      sort: "SortNumber",
      order: "asc",
      displayColumns: "Name,EmployeeId",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        var list = [];
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField") {
              item[cell] = girdFormatterValue(cell, item);
            }
          }
          item.name = item.Name || item.EmployeeId;
          if (item.name) {
            list.push(item);
          }
        }
        gData.value[index].children = list;
        gDataAll.value[index].children = list;
      }
    });
};
const loadGroupNode = (treeNode) => {
  return new Promise((resolve) => {
    if (treeNode.id && treeNode.id != "") {
      if (treeNode.dataRef.children == undefined) {
        treeNode.dataRef.children = [];
      }
      loadGroupPeople(treeNode.id).then((res) => {
        var list = [];
        if (res?.nodes?.length) {
          for (var i = 0; i < res.nodes.length; i++) {
            var item = res.nodes[i];
            for (var cell in item) {
              if (cell != "id" && cell != "viewUrl" && cell != "EmployeeId") {
                item[cell] = girdFormatterValue(cell, item);
              }
              if (cell == "EmployeeId") {
                item[cell + "Name"] = item[cell].lookupValue.displayName;
                item[cell] = item[cell].lookupValue.value;
              }
            }
            item.key = item.id;
            item.isLeaf = true;
            item.name = item.Name || item.EmployeeIdName;
            item.telephone = item.TelePhone;
            if (item.name) {
              list.push(item);
            }
          }
        }
        //console.log(list,123)
        treeNode.dataRef.children = list;
        gData.value = [...gData.value];
        resolve();
      });
    } else {
      resolve();
    }
  });
};
const loadGroupPeople = (groupId) => {
  return new Promise((resolve, reject) => {
    let filterCondition =
      '[{"attribute":"AttendGroupId","column":"AttendGroupId","label":"","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":["' +
      groupId +
      '"]}]';
    let d = {
      filterId: "",
      objectTypeCode: "30042",
      entityName: "HRAttendGroupMembers",
      filterCondition: filterCondition,
      search: "",
      page: 1,
      rows: 100,
      sort: "SortNumber",
      order: "asc",
      displayColumns: "Name,EmployeeId,TelePhone",
    };
    proxy.$post(Interface.list2, d).then((res) => {
      resolve(res);
    });
  });
};
const searchTreeData = () => {
  gDataAll.value = [];
  let filterCondition =
    '[{"attribute":"FullName","column":"FullName","label":"","operator":"contains","logical":"AND","picklistValues":[],"isEditable":false,"operands":["' +
    data.searchVal +
    '"]}]';
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "30020",
      entityName: "HREmployee",
      filterCondition: filterCondition,
      search: "",
      page: 1,
      rows: 100,
      sort: "EmployeeNo",
      order: "asc",
      displayColumns: "FullName,EmployeeNo,MobileNumber",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "nameField") {
              item[cell] = girdFormatterValue(cell, item);
            }
          }
          gDataAll.value.push({
            id: item.id,
            pid: "",
            key: item.id,
            name: item.FullName + "（" + (item.EmployeeNo || "") + "）",
            parent: null,
            quantity: 0,
            text: null,
            value: item.id,
            isLeaf: true,
            telephone: item.MobileNumber,
          });
        }
      }
    });
};
const onSearch = () => {
  //data.searchVal=e.data;
  if (data.searchVal) {
    searchTreeData();
  } else {
    getTreeData();
  }
};
watch(
  () => route.query.categoryId,
  (newVal, oldVal) => {
    data.isshowCalendar = false;
    setTimeout(function () {
      data.isshowCalendar = true;
      getData();
    }, 300);
  },
  { deep: true, immediate: true }
);
const getData = () => {
  //data.pageTitle = route.meta.name;
};
const refreshTime = (e) => {
  data.pageTime = e;
};
//提交
const handleSubmit = () => {
  nextTick(() => {
    CalendarWrapRef.value.handleSave(1);
  });
};
//打印
const handlePrint = () => {
  let url = router.resolve({
    path: "/printDeptShift",
    name: "PrintDeptShift",
    query: {
      name: data.pageTitle,
      type: "print",
      time: data.pageTime,
      categoryId: route.query.categoryId,
    },
  });
  window.open(url.href);
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
    data.activeKey = userInfo.businessUnitId;
    data.SelectPeopleObj.BusinessUnitId=userInfo.businessUnitId;
  }
  window.addEventListener("resize", changeHeight);
  getTreeData();
  //getTabs();
  getData();
});
</script>
<style lang="less" scoped>
.wrappper {
  width: 100%;
  height: 100%;
  .wea-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //border-bottom: 1px solid #eaeaea;
    padding-right: 0;
    //border: 0 !important;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    overflow-x: auto;
    .wea-tab {
      height: 45px !important;

      :deep .ant-tabs-nav::before {
        display: none;
      }
    }
    .wea-tab :deep .ant-tabs .ant-tabs-nav .ant-tabs-nav-wrap {
      height: 45px !important;
    }
  }
  .calendarBody {
    display: flex;
    height: calc(~"100% - 52px");
    position: relative;

    .leftMenuWrapper {
      min-width: 115px;
      width: 115px;
      height: 100%;
      padding: 8px 8px;
      border-right: 1px solid #e5e6eb;
      background: #fff;
      .leftTabMenu {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        color: #4e5969;
        background: #fff;
        cursor: pointer;
        box-sizing: border-box;
        margin-bottom: 4px;
        border-radius: 2px;
        &.active {
          color: var(--textColor);
          background: #f2f3f5;
        }
        .iconfont {
          padding-left: 10px;
          font-size: 14px;
        }
        .name {
          padding-left: 8px;
        }
        &:hover {
          background: #f2f3f5;
        }
        &.active:hover {
          font-weight: bold;
        }
      }
    }
    .calendarLeft {
      flex: 1;
      height: 100%;
      background: #fff;
      margin-right: -1px;
    }
    .calendarRight {
      width: 300px;
      height: 100%;
      background: #fff;
      .attdpeople {
        width: 100%;
        border: 1px solid #dedede;
        //border-left: 0;
        margin-top: 56px;
        height: calc(~"100% - 61px");
        .attdpeople-head {
          width: 100%;
          font-size: 14px;
          height: 45px;
          border-bottom: 1px solid #dedede;
          .attdpeople-head-title {
            background-color: #f9f9f9;
            padding: 5px;
            height: 44px;
            line-height: 37px;
            padding-left: 12px;
            position: relative;
          }
          .attdpeople-head-title input {
            float: right;
            height: 30px;
            line-height: 30px;
            //text-indent: 10px;
            margin-right: 7px;
            margin-top: 3px;
            border-radius: 4px;
          }
          .attdpeople-head-seach-input {
            width: 200px;
            border-radius: 4px !important;
          }
          .attdpeople-head-seach-icon {
            color: #aaa;
            font-size: 18px;
            position: absolute;
            right: 20px;
            top: 14px;
          }
        }
        .attdpeople-section {
          overflow: auto;
          height: calc(~"100% - 46px") !important;
          padding-top: 15px !important;
          padding-left: 20px !important;
          padding-right: 20px !important;
          ul {
            display: block;
            margin-top: 5px;
            .attdpeople-item {
              line-height: 28px;
              cursor: pointer;
              margin-left: 0;
              padding-left: 20px;
            }
            .attdpeople-item:hover,
            .attdpeople-item.active {
              background-color: #f9f9f9;
              color: #108def;
            }
            .attdpeople-item span {
              display: inline-block;
              width: 32%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 30px;
              line-height: 40px;
            }
          }
        }
        #attachFiles {
          width: 100%;
          font-size: 14px;
          height: 40px;
          border-top: 1px solid #dedede;

          .attdpeople-head-title {
            background-color: #f9f9f9;
            padding: 5px;
            height: 39px;
            line-height: 30px;
            padding-left: 12px;
            border-bottom: 1px solid #dedede;
          }
        }
      }
    }
    // .calendarCenter{
    //     :deep .calendarHeader{
    //         position: relative;
    //         left: -200px;
    //         width: calc(~'100% + 200px');
    //     }
    // }
    :deep .fc-theme-standard th {
      background: #f9f9f9 !important;
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
</style>
