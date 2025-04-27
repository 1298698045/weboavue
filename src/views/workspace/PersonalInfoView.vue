<template>
  <div class="PersonalInfoViewWrap">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-bd">
        <div class="main-content">
          <div class="mi-content">
            <div class="profile section">
              <div id="detailview" v-cloak>
                <div class="profile-message">
                  <div class="profile-message-leftmessage">
                    <div class="profile-photo">
                      <img
                        :src="props.avatarUrl"
                        :on-error="defaultImg"
                        alt=""
                        @click="isBig = true"
                      />
                    </div>
                    <div class="hrm-my-card-basicInfo-left-imgwrap-op">
                      <div class="ant-col-6">
                        <div
                          class="hrm-my-card-basicInfo-icon-circle"
                          @click="handleOpenMessage"
                          title="发送短信"
                        >
                          <MessageFilled />
                        </div>
                      </div>
                      <div class="ant-col-6">
                        <div
                          class="hrm-my-card-basicInfo-icon-circle"
                          @click="handleOpenEmail"
                          title="发送邮件"
                        >
                          <MailFilled />
                        </div>
                      </div>
                      <div class="ant-col-6">
                        <div
                          class="hrm-my-card-basicInfo-icon-circle"
                          @click="handleOpenSchedule"
                          title="查看日程"
                        >
                          <ScheduleFilled />
                        </div>
                      </div>
                    </div>
                    <div class="profile-name">
                      <label>账号类型：</label>{{ "主账号" }}
                    </div>
                    <div class="profile-name">
                      <label>次账号：</label>{{ 1 }}
                    </div>
                    <div class="profile-name"><label>下属：</label>{{ 6 }}</div>
                    <div class="profile-name">
                      <label>状态：</label>{{ "正式" }}
                    </div>
                    <div class="profile-name">
                      <label>最后登录日期：</label>{{ "2024-11-21" }}
                    </div>
                  </div>
                  <div class="profile-message-rightmessage">
                    <div class="hrm-my-card-basicInfo-right-counts">
                      <div class="hrm-my-card-basicInfo-right-counts-cell">
                        <img
                          :src="require('@/assets/img/hrm/workflow.png')"
                          alt=""
                        />
                        <div
                          class="hrm-my-card-basicInfo-right-counts-cell-info"
                        >
                          <div>流程</div>
                          <div class="text-overflow">
                            <span
                              style="color: rgb(26, 183, 244); font-size: 18px"
                              >{{ record.WorkflowStartCount }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="hrm-my-card-basicInfo-right-counts-cell">
                        <img
                          :src="require('@/assets/img/hrm/doc.png')"
                          alt=""
                        />
                        <div
                          class="hrm-my-card-basicInfo-right-counts-cell-info"
                        >
                          <div>文档</div>
                          <div class="text-overflow">
                            <span
                              style="color: rgb(104, 193, 44); font-size: 18px"
                              >{{ record.KbDocuments }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="hrm-my-card-basicInfo-right-counts-cell">
                        <img
                          :src="require('@/assets/img/hrm/custom.png')"
                          alt=""
                        />
                        <div
                          class="hrm-my-card-basicInfo-right-counts-cell-info"
                        >
                          <div>客户</div>
                          <div class="text-overflow">
                            <span
                              style="color: rgb(85, 141, 228); font-size: 18px"
                              >{{ record.NumOfCustomer }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="hrm-my-card-basicInfo-right-counts-cell">
                        <img
                          :src="require('@/assets/img/hrm/project.png')"
                          alt=""
                        />
                        <div
                          class="hrm-my-card-basicInfo-right-counts-cell-info"
                        >
                          <div>项目</div>
                          <div class="text-overflow">
                            <span
                              style="color: rgb(41, 207, 135); font-size: 18px"
                              >{{ record.NumOfProject }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="hrm-my-card-basicInfo-right-counts-cell">
                        <img
                          :src="require('@/assets/img/hrm/cpt.png')"
                          alt=""
                        />
                        <div
                          class="hrm-my-card-basicInfo-right-counts-cell-info"
                        >
                          <div>资产</div>
                          <div class="text-overflow">
                            <span
                              style="color: rgb(246, 174, 64); font-size: 18px"
                              >{{ record.NumOfAsset }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="hrm-my-card-basicInfo-right-counts-cell">
                        <img
                          :src="require('@/assets/img/hrm/cowork.png')"
                          alt=""
                        />
                        <div
                          class="hrm-my-card-basicInfo-right-counts-cell-info"
                        >
                          <div>协作</div>
                          <div class="text-overflow">
                            <span
                              style="color: rgb(130, 110, 253); font-size: 18px"
                              >{{ record.NumOfCollaboration }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="hrm-my-card-basicInfo-right-counts-cell">
                        <img
                          :src="require('@/assets/img/hrm/weibo.png')"
                          alt=""
                        />
                        <div
                          class="hrm-my-card-basicInfo-right-counts-cell-info"
                        >
                          <div>微博</div>
                          <div class="text-overflow">
                            <span
                              style="color: rgb(251, 111, 71); font-size: 18px"
                              >{{ record.CommunityPost }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="detailInfo">
                      <div
                        class="fh-section"
                        v-for="(item, index) in layoutList"
                        :key="index"
                      >
                        <div
                          class="fh-section-label"
                          v-if="item.title != '内容' && item.title != '回执'"
                        >
                          {{ item.title }}
                        </div>
                        <div class="section-content">
                          <div
                            class="sectionRow"
                            v-for="(row, rowIdx) in item.rows"
                            :key="rowIdx"
                          >
                            <div
                              class="sectionCol"
                              v-for="(attr, attrIdx) in row.attributes"
                              :key="attrIdx"
                            >
                              <div class="sectionCol_label">
                                {{ attr.label }}
                              </div>
                              <div class="sectionCol_body">
                                <div class="ownerName">
                                  <span v-if="attr.attributes.type == 'B'">{{
                                    list[attr.localId].displayValue == "true" ||
                                    list[attr.localId].displayValue == true
                                      ? "是"
                                      : "否"
                                  }}</span>
                                  <span
                                    v-else-if="
                                      attr.attributes.type == 'z' ||
                                      attr.attributes.type == 'X'
                                    "
                                    ><span
                                      v-html="list[attr.localId]?.displayValue"
                                    ></span
                                  ></span>
                                  <span v-else>{{
                                    list[attr.localId]?.displayValue
                                  }}</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <ImageView
      v-if="isBig"
      :isShow="isBig"
      :photoParams="photoParams"
      @cancel="isBig = false"
    />
  </div>
</template>
<script setup>
import "@/style/common.less";
import "@/style/icon/iconfont.css";
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
} from "vue";
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ScheduleFilled,
  MailFilled,
  MessageFilled,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import RadioUser from "@/components/commonModal/MultipleUser.vue";
import Delete from "@/components/listView/Delete.vue";
import ImageView from "@/components/file/ImageView.vue";
const { proxy } = getCurrentInstance();
const PersonnelLst = ref();
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  id: String,
  avatarUrl: String,
});
const emit = defineEmits(["load"]);
const data = reactive({
  loading: false,
  listData: [],
  listDataDetail: {},
  height: 100,
  id: route.query.id,
  ParentSubjectName: "",
  Description: "",
  record: {
    WorkflowStartCount: 0,
    KbDocuments: 0,
    NumOfCustomer: 0,
    NumOfProject: 0,
    NumOfAsset: 0,
    NumOfCollaboration: 0,
    CommunityPost: 0,
  },
  detailviewloading: true,
  activesections: [],
  relatedLists: [],
  listItems: {},
  isBig: false,
  layoutList: [],
  list: {},
  defaultImg: require("@/assets/img/user/MyResume/showEmpAvatar.png"),
  photoParams: {},
});
const {
  photoParams,
  defaultImg,
  layoutList,
  isBig,
  record,
  list,
  detailviewloading,
  activesections,
  relatedLists,
  listItems,
  id,
  height,
  listData,
  loading,
  listDataDetail,
  ParentSubjectName,
  Description,
} = toRefs(data);

const getDetail = () => {
  let d = {
    actions: [
      {
        id: "4270;a",
        descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: props.id,
          apiName: "UserStatistic",
          objTypeCode: "20033",
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.detail, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.fields
    ) {
      let record = res.actions[0].returnValue.fields;
      data.record = {
        WorkflowStartCount:
          record.WorkflowStartCount && record.WorkflowStartCount.value
            ? record.WorkflowStartCount.value
            : 0,
        KbDocuments:
          record.KbDocuments && record.KbDocuments.value
            ? record.KbDocuments.value
            : 0,
        NumOfCustomer:
          record.NumOfCustomer && record.NumOfCustomer.value
            ? record.NumOfCustomer.value
            : 0,
        NumOfProject:
          record.NumOfProject && record.NumOfProject.value
            ? record.NumOfProject.value
            : 0,
        NumOfAsset:
          record.NumOfAsset && record.NumOfAsset.value
            ? record.NumOfAsset.value
            : 0,
        NumOfCollaboration:
          record.NumOfCollaboration && record.NumOfCollaboration.value
            ? record.NumOfCollaboration.value
            : 0,
        CommunityPost:
          record.CommunityPost && record.CommunityPost.value
            ? record.CommunityPost.value
            : 0,
      };
    }
  });
};
const getData = () => {
  let obj = {
    actions: [
      {
        id: "7366;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: props.id,
          entityApiName: "SystemUser",
          defaultFieldValues: {
            entityId: "",
          },
          mode: "CREATE",
          type: "FULL",
          layoutOverride: "00000000-0000-0000-0000-000000080001",
          inContextOfComponent: "",
          pageSize: -1,
          offset: 0,
        },
      },
    ],
  };
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.formCommon.layout, d).then((res) => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      let { layout, record } = res.actions[0].returnValue;
      data.layoutList = layout.sections;
      data.list = JSON.parse(JSON.stringify(record.fields));
    }
  });
  data.detailviewloading = false;
};
const handleOpenEmail = () => {
  let url = router.resolve({
    path: "/email/0",
    name: "Email",
    query: {
      type: 1,
    },
  });
  window.open(url.href);
};
const handleOpenMessage = () => {
  let url = router.resolve({
    path: "/MessageHome",
    name: "MessageHome",
    query: {},
  });
  window.open(url.href);
};
const handleOpenSchedule = () => {
  let url = router.resolve({
    path: "/lightning/o/Event/home",
    query: {},
  });
  window.open(url.href);
};
const getStatistic = () => {
  proxy.$get(Interface.user.statistic, null).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state == "SUCCESS"
    ) {
      getDetail();
    } else {
      message.error("统计失败！");
    }
  });
};
defineExpose({ getData });
onMounted(() => {
  let item = {
    id: props.id,
    downloadUrl: "/api/one/user/avatar/" + props.id,
    viewUrl: "/api/one/user/avatar/" + props.id,
  };
  data.photoParams = {
    id: props.id,
    item: item,
    imageList: [item],
    index: 0,
  };
  let h = document.documentElement.clientHeight;
  data.height = h;
  window.addEventListener("resize", (e) => {
    let h = document.documentElement.clientHeight;
    data.height = h;
  });
  getStatistic();
  getData();
});
</script>
<style lang="less" scoped>
.PersonalInfoViewWrap {
  width: 100%;
  .panel {
    //padding: 12px 8px;
    padding: 0;
    margin-bottom: 0;
    background: #e8edf4;
    overflow-x: hidden;
    border-radius: 0;
    height: 100% !important;
    .panel-bd {
      background: #fff;
      height: calc(~"100% - 0px") !important;
      overflow-y: auto;
      .main-content {
        width: 730px;
        margin: 0 auto;
      }
      .mi-content {
        width: 730px;
        padding: 0px;
        box-sizing: border-box;
      }
      .section {
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
        transition: box-shadow 83ms;
        background-color: #fff;
        border-radius: 2px;
        overflow: hidden;
        position: relative;
      }
      .profile-bg {
        background: url(~@/assets/img/user/MyResume/bg.png) no-repeat center;
        height: 200px;
        background-size: cover;
      }
      .profile-photo img {
        width: 140px;
        height: 150px;
        position: absolute;
        z-index: 2;
        border-radius: 50%;
        cursor: pointer;
        margin-top: -90px;
        margin-left: 25px;
      }
      #detailview {
        clear: both;
      }
      .profile-message {
        padding: 0px;
        display: flex;
      }
      .profile-message-leftmessage {
        margin-top: 50px;
        width: 270px;
        padding: 20px;
        border-right: 1px solid #dedede;
      }
      .profile-message-rightmessage {
        flex: 1;
        padding: 0;
        padding-top: 22px;
        padding-left: 30px;
        .hrm-my-card-basicInfo-right-counts {
          overflow: auto;
          zoom: 1;
          padding-left: 10px;
          .hrm-my-card-basicInfo-right-counts-cell {
            position: relative;
            float: left;
            width: 150px;
            height: 70px;
            padding: 10px 0 10px 20px;
            margin-bottom: 30px;
            margin-right: 30px;
            margin-top: 1px;
            border-radius: 4px;
          }
          .hrm-my-card-basicInfo-right-counts-cell img {
            padding-right: 10px;
            position: relative;
            top: 3px;
          }
          .hrm-my-card-basicInfo-right-counts-cell-info {
            position: absolute;
            left: 0;
            top: 15px;
            width: 100%;
            padding-left: 75px;
            font-size: 12px;
          }
          .text-overflow {
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 5px;
          }
        }
      }
      .profile-name {
        height: 29px;
      }
      .el-collapse {
        border-top: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
      }
      .section.list {
        margin-top: 20px;
        position: relative;
      }
      .section-title {
        padding: 20px 0 10px 20px;
        font-size: 20px;
      }
      .section-item {
        cursor: pointer;
        position: relative;
        display: flex;
      }
      .items-left {
        float: left;
        padding: 25px;
      }
      .items-left img {
        width: 50px;
        height: 50px;
      }
      .items-right {
        float: left;
        width: 660px;
        border-bottom: 1px solid #dedede;
        box-sizing: border-box;
        padding: 25px 0;
      }
      .section-item:last-child .items-right {
        border: 0;
      }
      .items-right-label {
        font-size: 14px;
        color: #333;
        width: 50%;
        float: left;
      }
      .items-right div {
        line-height: 20px;
      }
      .items-right-label-title {
        display: inline-block;
        width: 80px;
      }
      .items-right-label-value {
        display: inline-block;
        width: 230px;
      }
      .slds-gutters_small {
        display: flex;
      }
      .slds-has-flexi-truncate {
        flex: 1 1 0%;
        min-width: 0;
      }
      .forcePageBlockItem {
        width: 47%;
        cursor: pointer;
        display: inline-block;
        border-bottom: 1px solid rgb(221, 219, 218);
      }
      .slds-col.slds-has-flexi-truncate.forcePageBlockItem {
        margin-left: 15px;
      }
      .slds-form-element__label {
        display: inline-block;
        color: rgb(62, 62, 60);
        font-size: 0.75rem;
        margin-right: 0.5rem;
        padding-top: 0.25rem;
        margin-bottom: 0.125rem;
      }

      .slds-form-element__control {
        width: 100%;
        flex-basis: 100%;
        clear: left;
        position: relative;
        border-bottom: 0;
        padding-left: 0;
      }
      .printBtnGroup {
        position: fixed;
        right: 25px;
        top: 15px;
      }
      .printBtn {
        padding-left: 1rem;
        padding-right: 1rem;
        text-align: center;
        vertical-align: middle;
        border: 1px solid rgb(221, 219, 218);
        transition: border 0.15s linear;
        border-color: rgb(221, 219, 218);
        background-color: rgb(255, 255, 255);
        border-radius: 4px;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        color: rgba(27, 82, 151, 1);
        font-size: 14px;
        float: right;
        margin-left: 10px;
      }
      .printBtn:hover {
        background-color: rgb(244, 246, 249);
      }
    }
  }
  .panel .panel-bd .main-content {
    width: 100%;
  }
  .panel .panel-bd .mi-content {
    width: 100%;
  }
  .panel .panel-bd .profile-photo {
    position: relative;
    text-align: center;
    width: 100%;
    height: 200px !important;
    margin-bottom: 20px;
    min-height: 200px;
    img {
      width: 190px;
      height: 190px;
      position: relative;
      z-index: 2;
      border-radius: 0;
      cursor: pointer;
      margin-top: 10px;
      margin-left: 0;
      margin-bottom: 0;
    }
    .bigimg {
      width: 300px;
      height: 300px;
      left: 0;
      position: absolute !important;
    }
  }
  .panel .panel-bd .profile-message-leftmessage {
    margin-top: 15px;
    width: 260px;
    .hrm-my-card-basicInfo-left-imgwrap-op {
      display: flex;
      margin-left: -8px;
      margin-right: -8px;
      padding-top: 0px;
      padding-bottom: 25px;
      justify-content: center;
    }
    .ant-col-6 {
      display: block;
      width: 25%;
      padding-left: 8px;
      padding-right: 8px;
    }
    .hrm-my-card-basicInfo-icon-circle {
      display: inline-block;
      vertical-align: middle;
      width: 34px;
      height: 35px;
      font-size: 18px;
      line-height: 35px;
      text-align: center;
      border-radius: 50%;
      border: 1px solid #ccc;
      margin-right: 10px;
      color: #3498ec;
      cursor: pointer;
    }
  }
  .panel .panel-bd .profile-name {
    font-size: 12px;
    color: #000;
    padding-left: 18px;
    height: 36px;
    label {
      color: #868686;
      width: 110px;
      display: inline-block;
    }
  }
  .sectiontitle {
    width: 100%;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;

    font-size: 14px;
    color: #868686;
    border-bottom: 1px solid #e2e2e2;
    background-color: #f4faff;
    border-left: 2px solid #2b9dec;
  }
  .panel .panel-bd .el-collapse {
    border-top: 0;
  }
  .slds-form-element {
    display: flex;
    padding: 10px 10px 10px 15px;
    padding-left: 0;
  }
  .panel .panel-bd .slds-form-element__label {
    min-width: 168px;
    color: #000;
  }
  .panel .panel-bd .forcePageBlockItem {
    border-bottom: 0;
  }
  .panel .panel-bd .slds-form-element__control {
    border-bottom: 1px solid #dedede;
    padding-left: 10px;
    padding-bottom: 5px;
    font-size: 12px;
    .slds-form-element__static {
      white-space: normal;
      word-break: break-all;
    }
  }
  .detailInfo {
    .fh-section {
      margin-bottom: 8px;
      .fh-section-label {
        background: #f2f2f2;
        padding: 0 15px;
        line-height: 32px;
        border-radius: 4px;
      }
      .section-content {
        overflow: visible;
        visibility: visible;
        opacity: 1;
        height: auto;
        .sectionRow {
          padding: 0 16px;
          display: flex;
          .sectionCol {
            margin-left: 0;
            margin-right: 16px;
            padding: 8px 4px;
            flex: 1 1 0%;
            min-width: 0;
            border-bottom: 1px solid #c9c9c9;
            display: flex;
            align-items: center;
            .sectionCol_label {
              width: 23%;
            }
            .sectionCol_body {
              display: flex;
              align-items: center;
              .ownerName {
                display: flex;
                .uiImage {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  overflow: hidden;
                  margin-right: 4px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                a {
                  margin: 0 2px;
                  color: #0b5cab;
                }
              }
            }
          }
        }
      }
    }
    .fh-section-label {
      width: 100%;
      font-weight: 700;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;

      font-size: 14px;
      color: #868686;
      border-bottom: 1px solid #e2e2e2;
      background-color: #f4faff !important;
      border-left: 2px solid #2b9dec;
      border-radius: 0 !important;
      margin-bottom: 10px;
    }
    .slds-form-element {
      display: flex;
      padding: 10px 10px 10px 15px;
      padding-left: 0;
    }
    .fh-section .sectionCol {
      border-bottom: 0 !important;
    }
    .fh-section .sectionCol_label {
      min-width: 168px;
      color: #000;
    }
    .fh-section .forcePageBlockItem {
      border-bottom: 0;
    }
    .fh-section .sectionCol_body {
      border-bottom: 1px solid #dedede !important;
      padding-left: 10px;
      padding-bottom: 5px;
      font-size: 12px;
      flex: 1;
      height: 30px;
      margin-right: 25px;
      .sectionCol_static {
        white-space: normal;
        word-break: break-all;
      }
    }
  }
}
</style>
