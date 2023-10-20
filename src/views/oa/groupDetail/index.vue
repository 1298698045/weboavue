<template>
  <div class="groupDetail">
    <div class="header">
      <div class="leftBox">
        <div class="leftBox-top">
          <div class="d-panel-content-head-avatar">
            <div class="editheadbg"></div>
            <div class="edithead"><EditOutlined />编辑头像</div>
            <img
              :src="require('@/assets/img/avatar-r.png')"
              alt=""
              class="d-panel-content-head-left default_avatar"
            />
          </div>
          <div class="d-panel-content-head-title">
            <div class="title">统计日报组</div>
            <div class="subtitle">公用</div>
          </div>
        </div>
        <div class="tabContainer">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="群空间"></a-tab-pane>
            <a-tab-pane key="2" tab="详细信息"></a-tab-pane>
            <a-tab-pane key="3" tab="人员"></a-tab-pane>
            <a-tab-pane key="4" tab="统计"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="rightBtns">
        <a-button class="ml10" type="primary" @click="handleAddPeople"
          >添加成员</a-button
        >
        <a-button class="ml10" type="primary" @click="handleAddAdmin"
          >添加管理员</a-button
        >
        <a-button class="ml10" type="primary">编辑小组</a-button>
        <a-button class="ml10" @click="handleDeleteGroup">删除小组</a-button>
        <a-dropdown :trigger="['hover']" class="ml10">
          <span class="btn-drop">
            <UnorderedListOutlined style="color: #1d2129" />
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="handleOpenNotes"> 备注 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="detail-scroll">
      <div class="detail-bd">
        <div class="container">
          <div class="tabContainer">
            <group-space v-if="activeKey == '1'" />
            <DetailInfo v-if="activeKey == '2'" />
            <Personnel v-if="activeKey == '3'" />
            <Statistics v-if="activeKey == '4'" />
          </div>
          <div class="rightAside">
            <div class="panel">
              <div class="panel-head">
                <div class="panel-title">管理员</div>
                <div class="panel-btn">
                  <a-button type="text" size="small" @click="handleAddAdmin"
                    >添加管理员</a-button
                  >
                </div>
              </div>
              <div class="panel-bd">
                <div class="relevantList">
                  <div class="people-head-list">
                    <div
                      class="peopleItem"
                      v-for="(item, index) in adminList"
                      :key="index"
                    >
                      <div class="editheadbg"></div>
                      <img
                        :src="require('@/assets/img/avatar.png')"
                        alt=""
                        class="d-avatar"
                      />
                      <div :title="item.FullName" class="relevantTitle">
                        {{ item.FullName }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel">
              <div class="panel-head">
                <div class="panel-title">成员</div>
                <div class="panel-btn">
                  <a-button type="text" size="small" @click="handleAddPeople"
                    >添加成员</a-button
                  >
                </div>
              </div>
              <div class="panel-bd">
                <div class="relevantList">
                  <div class="people-head-list">
                    <div
                      class="peopleItem"
                      v-for="(item, index) in peopleList"
                      :key="index"
                    >
                      <div class="editheadbg"></div>
                      <img
                        :src="require('@/assets/img/avatar.png')"
                        alt=""
                        class="d-avatar"
                      />
                      <div :title="item.FullName" class="relevantTitle">
                        {{ item.FullName }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <radio-user :isShow="isRadioUser" @selectVal="getUserData"></radio-user>
    <Notes :isShow="isNotes" @cancel="closeNotes" />
    <Delete :isShow="isDelete" @cancel="closeDelete" @ok="submitOk" />
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
  h,
} from "vue";
import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
import GroupSpace from "@/components/groupDetail/GroupSpace.vue";
import DetailInfo from "@/components/groupDetail/DetailInfo.vue";
import Personnel from "@/components/groupDetail/Personnel.vue";
import Statistics from "@/components/groupDetail/Statistics.vue";

// 选人
import RadioUser from "@/components/commonModal/RadioUser.vue";
// 备注
import Notes from "@/components/groupDetail/Notes.vue";
// 删除
import Delete from "@/components/listView/Delete.vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { message } from "ant-design-vue";
import { useStore } from "vuex";
let store = useStore();
store.commit("setGroupId", route.query.GroupId);

const data = reactive({
  activeKey: "1",
  groudId: route.query.GroupId,
  adminList: [],
  peopleList: [],
  isRadioUser: false,
  isNotes: false,
  isDelete: false,
  RoleCode: 0,
});
const {
  activeKey,
  adminList,
  peopleList,
  isRadioUser,
  isNotes,
  isDelete,
  isAdmin,
} = toRefs(data);
const handleOpenNotes = () => {
  data.isNotes = true;
};
const closeNotes = (e) => {
  data.isNotes = e;
};
// 添加成员
const handleAddPeople = () => {
  data.isRadioUser = true;
  data.RoleCode = 0;
};
// 添加管理员
const handleAddAdmin = () => {
  data.RoleCode = 2;
  data.isRadioUser = true;
};
// 删除小组
const handleDeleteGroup = () => {
  data.isDelete = true;
};
const closeDelete = (e) => {
  data.isDelete = e;
};
const submitOk = (e) => {
  data.isDelete = e;
  message.success("删除成功!");
};
// 添加成员/管理员
const getUserData = (params) => {
  console.log("params:", params);
  if (!data.isAdmin) {
    proxy
      .$get(Interface.group.addPeople, {
        groupId: store.state.groupId,
        userIds: params.id,
        RoleCode: data.RoleCode,
      })
      .then((res) => {
        message.success(res.msg);
        data.isRadioUser = false;
      });
  }
};
const getAdminData = () => {
  proxy
    .$get(Interface.group.list, {
      groupid: data.groudId,
    })
    .then((res) => {
      data.peopleList = res.listData;
      data.adminList = res.listData.filter((item) => {
        return item.RoleCode == "2";
      });
    });
};
getAdminData();
</script>
<style lang="less" scoped>
@import "@/style/detail.less";
@import url("@/style/common.less");
.groupDetail {
  width: 100%;
  height: 100vh;
  background: #f0f2f6;
  overflow: hidden;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 34px;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e6eb;
    box-shadow: 0px 2px 8px 0px rgba(237, 239, 243, 1);
    z-index: 99;

    .leftBox-top {
      margin-top: 10px;
      display: flex;
      align-items: center;

      .d-panel-content-head-avatar {
        position: relative;
        cursor: pointer;
        margin-right: 10px;

        .editheadbg {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid #fff;
          margin: 0;
          display: none;
          background: #000;
          opacity: 0.3;
          position: absolute;
          top: 0;
          left: 0;
        }

        .edithead {
          display: none;
          position: absolute;
          top: 36px;
          left: 11px;
          color: #fff;
          font-size: 12px;
        }

        .d-panel-content-head-left {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid #fff;
          margin: 0;
        }
      }

      .d-panel-content-head-avatar:hover {
        .editheadbg,
        .edithead {
          display: block;
        }
      }

      .d-panel-content-head-title {
        .title {
          color: #1d2129;
          font-size: 22px;
          font-weight: bold;
          margin-top: 0px;
          margin-left: 0px;
          margin-bottom: 5px;
        }

        .subtitle {
          color: rgba(134, 144, 156, 1);
          font-size: 14px;
        }
      }
    }

    .rightBtns {
      padding-top: 24px;
      display: flex;

      .btn-drop {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 0;
        border-radius: 6px;
      }

      .btn-drop:hover {
        color: rgb(78, 89, 105);
        background: #f2f3f5;
      }
    }
  }

  .detail-scroll {
    height: calc(~"100% - 140px");
    margin-top: 140px;
    overflow: auto;

    .detail-bd {
      padding: 24px;
      .container {
        display: flex;
        justify-content: space-between;
        .tabContainer {
          flex: 1;
          background: #fff;
          border-radius: 4px;
          margin-right: 12px;
          overflow: hidden;
          padding: 20px 15px;
        }
      }
    }
  }
}

.rightAside {
  max-width: 20%;
}

.relevantList {
  height: calc(100% - 40px);
  overflow: hidden;
  overflow-y: auto;

  .people-head-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    cursor: pointer;

    .peopleItem {
      padding-left: 20px;
      padding: 13px 8px;

      .d-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 4px solid #fff;
        margin: 0;
        box-sizing: border-box;
      }

      .relevantTitle {
        width: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
        color: #1d2129;
        text-align: center;
      }
    }
  }
}
</style>
