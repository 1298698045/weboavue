<template>
    <div class="detailWrap">
      <div class="detail-header">
        <div class="leftBox">
          <div class="title">
            <div>
              <span>{{ detail.Title }}&nbsp;</span>
            </div>
          </div>
          <div class="tabWrap">
            <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
              <a-tab-pane v-for="(item, index) in tabs" :key="index">
                <template #tab>
                  <span>
                    {{ item.label }}
                  </span>
                </template>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <div class="rightBox">
          <a-button type="primary" class="ml10" @click="handleEdit"
            >编辑</a-button
          >
          <a-button type="primary" class="ml10">流程设计</a-button>
          <a-button type="primary" class="ml10" @click="changeStatus"
            >表单设计</a-button
          >
          <a-button class="ml10" type="primary">对象定义</a-button>
          <a-button class="ml10">删除</a-button>
          <a-dropdown :trigger="['hover']" class="ml10">
            <span class="btn-drop">
              <UnorderedListOutlined style="color: #1d2129" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1"> 发布流程 </a-menu-item>
                <a-menu-item key="2"> 停用流程 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="detail-scroll">
        <div class="detail-bd">
          <div class="tabContainer" v-if="activeKey == 0">
            
          </div>
          <div class="tabContainer" v-if="activeKey == 2">
            <FlowStep  />
          </div>
          <div class="tabContainer" v-if="activeKey == 3">
            <FlowRule />
          </div>
          <div class="tabContainer" v-if="activeKey == 4">
            <FormSearchPerm />
          </div>
          <div class="tabContainer" v-if="activeKey == 5">
            <FormStartPerm />
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import "@/style/detail.less";
  import {
    ref,
    reactive,
    onMounted,
    toRefs,
    getCurrentInstance,
    defineEmits,
    toRaw,
    provide,
    inject
  } from "vue";
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    DeleteFilled,
    DeleteOutlined,
    PlusOutlined,
  } from "@ant-design/icons-vue";
  import { useRouter, useRoute } from "vue-router";
  import Related from "@/components/detail/Related.vue";
  import Info from "@/components/detail/Info.vue";
  import ChangeStatus from "@/components/information/ChangeStatus.vue";
  import InfoRemind from "@/components/information/InfoRemind.vue";
  import InfoAddClass from "@/components/information/InfoAddClass.vue";
  
  import FlowStep from "@/components/workflow/seeting/FlowStep.vue";
  import FlowRule from "@/components/workflow/seeting/FlowRule.vue";
  import FormSearchPerm from "@/components/workflow/seeting/FormSearchPerm.vue";
  import FormStartPerm from "@/components/workflow/seeting/FormStartPerm.vue";

  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  
  const route = useRoute();
  const router = useRouter();
  const data = reactive({
    tabs: [
      {
        label: "流程定义",
      },
      {
        label: "详情信息",
      },
      {
        label: "流程步骤",
      },
      {
        label: "流程规则",
      },
      {
        label: "表单查询权限",
      },
      {
        label: "表单发起权限",
      },
    ],
    activeKey: 0,
    id: route.query.id,
    objectTypeCode: route.query.objectTypeCode,
    detail: {},
    isNotes: false,
    isStatus: false,
    isRemind: false,
    isAddClass: false,
    isUserModal: false,
    fileCategorys: [],
    files: [],
  });
  provide("processId", data.id || '123')
  const {
    tabs,
    activeKey,
    id,
    objectTypeCode,
    detail,
    isNotes,
    isStatus,
    isRemind,
    isAddClass,
    isUserModal,
    fileCategorys,
    files,
  } = toRefs(data);
  const changeTabs = (e) => {
    data.activeKey = e;
  };
  const current = ref([]);
  const expandIconPosition = ref("start");
  const handleClick = (event) => {
    // If you don't want click extra trigger collapse, you can prevent this:
    event.stopPropagation();
  };
  const getDetail = () => {
    proxy
      .$get(Interface.information.detail, {
        id: data.id,
        objectTypeCode: data.objectTypeCode,
      })
      .then((res) => {
        console.log("res", res);
        data.detail = res.actions[0].returnValue.record;
      });
  };
  getDetail();
  const getFileClass = () => {
    proxy
      .$get(Interface.information.attachmentCategory, {
        ObjectTypeCode: data.objectTypeCode,
      })
      .then((res) => {
        data.fileCategorys = res.returnValue.records;
      });
  };
  getFileClass();
  const getFiles = () => {
    proxy
      .$get(Interface.information.files, {
        id: data.id,
      })
      .then((res) => {
        data.files = res.listData;
      });
  };
  getFiles();
  // 关闭更改状态
  const cancelStatus = (e) => {
    data.isStatus = e;
  };
  const cancelNotes = (e) => {
    data.isNotes = e;
  };
  const cancelRemind = (e) => {
    data.isRemind = e;
  };
  const cancelAddClass = (e) => {
    data.isAddClass = e;
  };
  // 更改状态
  const changeStatus = () => {
    data.isStatus = true;
  };
  const handleEdit = () => {
    let url = router.resolve({
      name: "visualEditor",
      query: {
        id: data.id,
        objectTypeCode: data.objectTypeCode,
      },
    });
    window.open(url.href);
  };
  const cancelUser = (e) => {
    data.isUserModal = e;
  };
  const getUserData = (params) => {
    console.log("params", params);
    cancelUser(false);
  };
  </script>
  <style lang="less" scoped>
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse {
    border: none !important;
    background: #fff;
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse > .ant-collapse-item {
    border-bottom: none !important;
    background: #f3f2f2;
    margin-bottom: 8px;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content {
    border-top: none !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header {
    padding: 6px 16px !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content
    > .ant-collapse-content-box {
    padding: 0 !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child,
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child
    > .ant-collapse-header {
    border-radius: 0 !important;
  }
  .panel {
    overflow: hidden;
  }
  .files {
    width: 100%;
    .fileItem {
      width: 100%;
      display: flex;
      padding: 10px 5px;
      &:hover {
        cursor: pointer;
        background: #eee;
      }
      .lImg {
        width: 40px;
        height: 40px;
        min-width: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rInfo {
        flex: 1;
        margin-left: 10px;
        overflow: hidden;
        .name {
          width: 60%;
          font-size: 14px;
        }
        .optionLink {
          .link {
            color: var(--textColor);
          }
        }
        .time {
          font-size: 12px;
          color: #b8bbcc;
        }
      }
    }
  }
  </style>
  