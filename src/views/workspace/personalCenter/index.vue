<template>
  <div class="wrapper personalCenterWrap">
    <!-- <div class="appcenter-header-wrap">
      <a-input-search
        v-model:value="searchVal"
        placeholder="搜索"
        style="width: 300px"
        @search="onSearch"
        allowClear
      />
    </div> -->
    <div class="workplace_content-wrap">
      <!-- <div class="workplace_content-section common">
        <div class="list-layout-wrap appcenter-list-layout-item-4">
          <template
            v-if="
              objData &&
              objData.favouriteApplicationLinks &&
              objData.favouriteApplicationLinks.length
            "
          >
            <div
              class="appcenter-card-wrap"
              @click.stop="handleDetail(item)"
              v-for="(item, index) in objData.favouriteApplicationLinks"
              :key="index"
            >
              <div class="appcenter-avatar-wrap">
                <div
                  class="larkc-avatar larkc-avatar-small appcenter-avatar-inline"
                >
                  <img
                    class="larkc-avatar-img"
                    alt="Avatar"
                    :src="getImagePath(item.PictureUrl)"
                  />
                </div>
              </div>
              <div class="appcenter-recommend-wrap without-tag">
                <div
                  class="appcenter-recommend-name appcenter-recommend-name-withouttag"
                >
                  <span class="">{{ item.Label }}</span>
                </div>
              </div>
              <div class="appcenter-card-desc">
                {{ item.Description || "简介" }}
              </div>
              <div class="appcenter-card-more">
                <a-dropdown
                  :trigger="['hover']"
                  class="ml10"
                  :getPopupContainer="getPopupContainer"
                >
                  <span class="btn-drop">
                    <EllipsisOutlined style="color: #1d2129" />
                  </span>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1" @click.stop="handleDetail(item)">
                        <ExportOutlined
                          style="margin-right: 5px"
                        />在新选项卡中打开
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </div>
          </template>

          <div
            class="appcenter-card-wrap appcenter-add-card"
            @click="handleOpenModal"
          >
            <div class="apcenter-add-left">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCI+CiAgICA8ZGVmcz4KICAgICAgICA8Y2lyY2xlIGlkPSJhIiBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiLz4KICAgICAgICA8bWFzayBpZD0iYiIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB4PSIwIiB5PSIwIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHVzZSBmaWxsPSIjRjNGM0YzIiBzdHJva2U9IiNENUQ1RDUiIHN0cm9rZS1kYXNoYXJyYXk9IjIsMiIgc3Ryb2tlLXdpZHRoPSIyIiBtYXNrPSJ1cmwoI2IpIiB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDxwYXRoIHN0cm9rZT0iIzlDQTJBOSIgZD0iTTIwLjQxNyAxMy4zMzN2Ni4yNWg2LjI1di44MzRoLTYuMjV2Ni4yNWgtLjgzNHYtNi4yNWgtNi4yNXYtLjgzNGg2LjI1di02LjI1aC44MzR6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="
              />
            </div>
            <div class="appcenter-add-right"><span>添加常用</span></div>
          </div>
        </div>
      </div> -->
      <div class="workplace_content-section">
        <div class="workplace-app-title">全部应用</div>
      </div>
      <div class="category-list-section">
        <div class="category-list-wrap">
          <div class="category-list">
            <div class="category-list-content">
              <a
                class="category-list-item"
                @click="handleTab(item, index)"
                :class="{ 'active-item': currentTab == index }"
                v-for="(item, index) in objData && objData.Groups"
                :key="index"
              >
                <span :title="item.Label">
                  <span>{{ item.Label }}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="app-list-section">
        <div
          class="list-layout-wrap appcenter-list-layout-item-4 app-list-layout"
        >
          <template v-for="(item, index) in applicationList" :key="index">
            <div
              class="appcenter-card-wrap"
              @click.stop="handleDetail(item)"
              v-if="data.groupId == '' || data.groupId == item.GroupId"
            >
              <div class="appcenter-avatar-wrap">
                <div
                  class="larkc-avatar larkc-avatar-small appcenter-avatar-inline"
                >
                  <img
                    class="larkc-avatar-img"
                    :src="getImagePath(item.PictureUrl)"
                    alt=""
                  />
                </div>
              </div>
              <div class="appcenter-listapp-wrap">
                <div class="appcenter-listapp-title">
                  <div class="appcenter-listapp-name">{{ item.Label }}</div>
                </div>
              </div>
              <div class="appcenter-card-desc">
                {{ item.Description || "简介" }}
              </div>
              <div class="appcenter-card-more">
                <a-dropdown
                  :trigger="['hover']"
                  class="ml10"
                  :getPopupContainer="getPopupContainer"
                >
                  <span class="btn-drop">
                    <EllipsisOutlined style="color: #1d2129" />
                  </span>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1" @click.stop="handleDetail(item)">
                        <ExportOutlined
                          style="margin-right: 5px"
                        />在新选项卡中打开
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <AddApplication
      v-if="isModal"
      :objData="objData"
      :isModal="isModal"
      @cancel="cancelApplication"
    />
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
  inject,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  AlignCenterOutlined,
  SearchOutlined,
  RightOutlined,
  EllipsisOutlined,
  ExportOutlined,
} from "@ant-design/icons-vue";
import "@/style/personalCenter.css";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
import { girdFormatterValue } from "@/utils/common.js";
const { proxy } = getCurrentInstance();
import AddApplication from "@/components/workspace/AddApplication.vue";
const router = useRouter();
const data = reactive({
  currentTab: 0,
  searchVal: "",
  objData: {
    Groups: [],
    favouriteApplicationLinks: [],
  },
  applicationList: [],
  groupId: "",
  isModal: false,
  userId: "",
  userName: "",
});
const {
  userId,
  userName,
  currentTab,
  searchVal,
  objData,
  applicationList,
  groupId,
  isModal,
} = toRefs(data);
const onSearch = (e) => {
  data.applicationList = data.objData.Groups[0].Applications.filter((item) => {
    return item.Label.indexOf(data.searchVal) !== -1;
  });
};
const handleTab = (item, index) => {
  data.currentTab = index;
  data.groupId = item.GroupId;
};
const getData = () => {
  data.objData = {
    Groups: [
      {
        GroupId: "",
        Applications: [],
        Label: "全部",
        Name: "",
      },
    ],
    favouriteApplicationLinks: [],
  };
  data.groupId = "";
  data.applicationList = [];
  let filterQuery = "";
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "100061",
      entityName: "AppModuleGroupBase",
      filterQuery: filterQuery,
      search: "",
      page: 1,
      rows: 100,
      sort: "SortNumber",
      order: "asc",
      displayColumns: "Name,Title,DisplayOrder,SortNumber",
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
          item.GroupId = item.id;
          item.Label = item.Title;
          item.Applications = [];
          data.objData.Groups.push(item);
        }
      }
      getQuery();
    });
};
const getQuery = () => {
  // proxy.$get(Interface.workspace.list, {}).then(res => {
  //     data.objData = res;
  //     if (res.Groups) {
  //         var applications = [];
  //         data.objData.Groups.forEach(function (item) {
  //             item.Applications.forEach(function (v) {
  //                 v.GroupId = item.GroupId;
  //                 applications.push(v);
  //             })
  //         })
  //         data.objData.Groups.unshift({
  //             GroupId: "",
  //             Applications: applications,
  //             Label: "全部",
  //             Name: ""
  //         })
  //         data.groupId = res.Groups[0].GroupId;
  //         data.applicationList = res.Groups[0].Applications;
  //     }
  // })
  let filterQuery = "";
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "100060",
      entityName: "ApplicationCenter",
      filterQuery: filterQuery,
      search: data.searchVal,
      page: 1,
      rows: 100,
      displayColumns:
        "DisplayOrder,IsFavored,GroupId,Label,LinkUrl,Name,PictureUrl,Description",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        var list = [];
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (
              cell != "id" &&
              cell != "nameField" &&
              cell != "GroupId" &&
              cell != "IsFavored"
            ) {
              item[cell] = girdFormatterValue(cell, item);
            }
            if (cell == "GroupId") {
              let cellt = item[cell];
              item[cell] =
                cellt && cellt.lookupValue ? cellt.lookupValue.value : "";
              item[cell + "Name"] =
                cellt && cellt.lookupValue ? cellt.lookupValue.displayName : "";
            }
            if (cell == "IsFavored") {
              item[cell] = item[cell] ? item[cell].selected : false;
            }
          }
          item.Id = item.id;
          item.Favourite = item.IsFavored;
          list.push(item);
          data.objData.Groups.forEach(function (ite) {
            if (ite.GroupId == item.GroupId) {
              ite.Applications.push(item);
            }
          });
          if (item.IsFavored) {
            data.objData.favouriteApplicationLinks.push(item);
          }
        }
        data.objData.Groups[0].Applications = list;
        data.applicationList = list;
        //console.log(list);
      }
    });
};
const getImagePath = (imagePath) => {
  if (imagePath) {
    try {
      return `${imagePath}`;
    } catch (error) {
      console.error(`Error loading image: ${error.message}`);
      return "";
    }
  }
};
const handleOpenModal = () => {
  data.isModal = true;
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
    data.userName = userInfo.fullName;
    if (data.userId == "jackliu") {
      data.userId = "2EC00CF2-A484-4136-8FEF-E2A2719C5ED6";
    }
  }
  getData();
});
const handleDetail = (item) => {
  if (item.Label == "邮件") {
    let url = router.resolve({
      path: "/email/0",
      name: "Email",
      query: {},
    });
    window.open(url.href);
    //window.location.href=url.href;
  } else if (item.Label == "我的简历") {
    let url = router.resolve({
      path: "/MyResume",
      name: "MyResume",
      query: {
        id: data.userId,
      },
    });
    window.open(url.href);
  } else if (item.LinkUrl) {
    window.open("/#" + item.LinkUrl);
  }
  return false;
};
const cancelApplication = (e, params) => {
  if (params) {
    getData();
  }
  data.isModal = e;
};
const getPopupContainer = (triggerNode) => {
  return triggerNode.parentNode || document.body;
};
</script>
<style lang="less">
.personalCenterWrap {
  height: 100%;
.appcenter-recommend-name-withouttag{
  color: #242424;
  font-weight: bolder;
}
  .appcenter-card-wrap:nth-child(5n),
  .common_card-wrap:nth-child(5n),
  .common_card-wrap {
    margin-right: 0px;
  }
  .workplace_content-section{
    justify-content: flex-start;
  }
  .workplace_content-section.common {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .workplace-app-title {
    max-width: 100%;
    margin-top: 0;
    justify-content: flex-start;
  }

  .category-list-wrap {
    max-width: 100%;
  }

  .list-layout-wrap {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width: 100% !important;
  }

  .appcenter-header-wrap {
    width: calc(~"100% - 40px");
    margin: 0 auto;
    background: transparent;
    padding-bottom: 0;
  }

  .app-list-section {
    padding: 0 38px;
    justify-content: flex-start;
    
  }

  .appcenter-card-wrap {
    height: 116px;
    margin-right: 19px;
    position: relative;
    margin-bottom: 19px;
    display: block;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
    background-color: #fff;
    width: calc((100% - 76px) / 5); // 这里的10px = (分布个数5-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
    min-width: calc((100% - 76px) / 5); // 加入这两个后每个item的宽度就生效了
    max-width: calc((100% - 76px) / 5); // 加入这两个后每个item的宽度就生效了
    .appcenter-listapp-wrap {
      margin-left: 58px;
      line-height: 42px;
      height: 45px;
      font-weight: bold;
      color: #242424;
      font-size: 14px;
    }
    .appcenter-recommend-wrap {
      margin-left: 58px;
      line-height: 42px;
      height: 45px;
      font-weight: bold;
      color: #242424;
      font-size: 14px;
    }

    .appcenter-avatar-wrap {
      position: relative;
      float: left;
      height: 45px;
      padding: 2px;
      border: 1px solid #ccc;
      position: relative;
      top: -2px;
      border-radius: 2px;

      .appcenter-avatar-inline {
        padding: 4px;
      }

      .appcenter-avatar-inline:before {
        width: 30px;
        height: 30px;
      }

      .larkc-avatar-img {
        width: 32px;
        height: 32px;
      }
    }

    .appcenter-card-desc {
      width: 100%;
      color: #242424;
      font-size: 12px;
      margin-top: 10px;
    }

    .appcenter-card-more {
      position: absolute;
      right: 25px;
      top: 25px;
      font-weight: bold;
      font-size: 18px;
      display: none;

      .ant-dropdown {
        width: max-content;
        top: 18px !important;
      }
    }
  }

  .appcenter-card-wrap:hover {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.14);
    background-color: #f5f5f5;

    .appcenter-card-more {
      display: block;
    }
  }
  .category-list-section{
    position: relative;
  }
  .workplace-app-title{
    margin-bottom: 0;
  }
  .app-list-section .app-list-layout{
    margin-top: 6px;
  }
  .appcenter-header-wrap{
    padding-top: 0;
  }
  .workplace_content-wrap{
    height: calc(~'100% - 0px');
  }
  .workplace_content-section{
    margin-top: 10px;
  }
}
</style>
