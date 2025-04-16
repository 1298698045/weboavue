<template>
  <div class="detailWrap contractDetailWrap" style="min-height: 100vh">
    <div class="detail-header">
      <div class="primaryFieldRow">
        <div class="fieldCol" style="flex: 1">
          <div class="profilePicWrapper">
            <div style="background-color: #3ba755" class="forceEntityIcon">
              <img :src="require('@/assets/img/task_120.png')" alt="" />
            </div>
          </div>
          <div class="media__body">
            <h1>
              <div class="entityNameTitle">合同详情</div>
              <div class="pageHeadTitle">{{ Name }}</div>
            </h1>
          </div>
        </div>
        <div class="fieldCol actionsContainer">
          <div class="fh-btn-group">
            <!-- <div class="fh-btn">终止</div>
            <div class="fh-btn">续签</div>
            <div class="fh-btn">变更拥有人</div>
            <div class="fh-btn" @click="handleSetPlan">设置计划</div>
            <div class="fh-btn" @click="handleChangeStateCode">更改状态</div> -->
            <template
              v-for="(item, index) in btnActions.slice(0, 3)"
              :key="index"
            >
              <div class="fh-btn" @click="handleClickBtn(item.apiName)">
                {{ item.label }}
              </div>
            </template>
            <a-dropdown
              :trigger="['hover']"
              :getPopupContainer="getPopupContainer"
              v-if="btnActions && btnActions.length > 3"
            >
              <div class="fh-btn fh-btn-icon">
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 520 520"
                  part="icon"
                  lwc-6qul4k2dv7m=""
                  data-key="down"
                  class="slds-icon slds-icon_x-small"
                >
                  <g lwc-6qul4k2dv7m="">
                    <path
                      d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                      lwc-6qul4k2dv7m=""
                    ></path>
                  </g>
                </svg>
              </div>
              <template #overlay>
                <a-menu
                  :trigger="['click']"
                  style="
                    padding: 10px 0;
                    border: 1px solid #333;
                    border-radius: 4px;
                  "
                >
                  <a-menu-item
                    v-for="(item, index) in btnActions.slice(3)"
                    :key="index"
                    @click="handleClickBtn(item.apiName)"
                    style="
                      min-width: 98px;
                      padding: 8px 12px;
                      color: #0176d3;
                      font-size: 12px;
                    "
                  >
                    {{ item.label }}
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div class="fh-btn-group">
            <!-- <div class="fh-btn" @click="handleEdit">编辑</div>
            <div class="fh-btn" @click="handleDelete">删除</div> -->
          </div>
        </div>
      </div>
      <ul class="pageHeader-from" v-if="layoutItems && layoutItems.length">
        <li
          class="listRecordItem"
          v-for="(item, index) in layoutItems"
          :key="index"
        >
          <div class="formLabel">{{ item.label || "" }}</div>
          <div class="formVal">
            <a href="javascript:;" class="textUnderline">{{
              item.name && fields[item.name] && fields[item.name].displayValue
                ? fields[item.name].displayValue
                : ""
            }}</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="detail-main">
      <div class="uiTabBar">
        <ul class="tabs_nav">
          <li
            class="tabs_nav_item"
            :class="{ active: activeKey == index }"
            v-for="(item, index) in tabs"
            :key="index"
            @click="changeTabs(index)"
          >
            <a href="javascript:;" class="tabItemHead">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
      <div class="record-container" style="height: calc(100% - 50px)">
        <div class="recordLayout" v-if="activeKey == 0">
          <Statistics :id="id" :fields="fields" />
        </div>
        <div class="recordLayout" v-if="activeKey == 1">
          <DetailInfo
            :id="id"
            :objectTypeCode="objectTypeCode"
            :entityApiName="entityApiName"
          />
        </div>
        <div class="recordLayout" v-if="activeKey == 2">
          <RelatedList
            :id="id"
            :objectTypeCode="objectTypeCode"
            :entityApiName="entityApiName"
            fullName="Name"
          />
        </div>
        <div class="recordLayout" v-if="activeKey == 3">
          <FilesList :parentId="id" :entityName="entityApiName"></FilesList>
        </div>
        <div class="recordLayout" v-if="activeKey == 4">
          <Related
            :id="id"
            :type="'page'"
            :entityApiName="'ContractAudit'"
            :RegardingObjectIdName="'ContractId'"
            :ObjectTypeCode="'10185'"
            :columns="columns1"
            :title="'审计'"
          />
        </div>
        <div class="recordLayout" v-if="activeKey == 5">
          <Related
            :id="id"
            :type="'page'"
            :entityApiName="'Contract'"
            :RegardingObjectIdName="'OriginatingContract'"
            :ObjectTypeCode="'1010'"
            :columns="columns2"
            :title="'子合同'"
          />
        </div>
        <div class="recordLayout" v-if="activeKey == 6">
          <WFForm :id="id" />
          <!-- <iframe
            :src="'/#/lightning/workflow/WFFormPrint?id=' + id"
            frameborder="0"
            style="width: 100%; height: 100%"
          ></iframe> -->
        </div>
        <div class="recordLayout" v-if="activeKey == 7">
          <Comment
            :title="'合同讨论'"
            :id="id"
            :RegardingObjectTypeCode="'1010'"
          />
        </div>
      </div>
    </div>
    <ConfirmModal
      :isShow="isConfirm"
      v-if="isConfirm"
      :desc="desc"
      @cancel="isConfirm = false"
      @ok="handleOkConfirm"
    />
    <common-form-modal
      :isShow="isCommon"
      v-if="isCommon"
      @cancel="isCommon = false"
      title="编辑"
      @success="loadInfo"
      :id="id"
      :objectTypeCode="objectTypeCode"
      :entityApiName="entityApiName"
    ></common-form-modal>
    <DeleteModal
      :isShow="isDelete"
      v-if="isDelete"
      desc="是否确定要删除？"
      :recordId="id"
      :sObjectName="entityApiName"
      :objTypeCode="objectTypeCode"
      @cancel="isDelete = false"
    />
    <InfoNotes
      v-if="isNotes"
      :isShow="isNotes"
      :id="id"
      :objectTypeCode="objectTypeCode"
      @cancel="isNotes = false"
    />
    <ContractPlan
      v-if="isPlan"
      :isShow="isPlan"
      :id="id"
      @cancel="isPlan = false"
    />
    <ChangeStateCode
      v-if="isStateCode"
      :isShow="isStateCode"
      :id="id"
      @cancel="isStateCode = false"
    />
  </div>
</template>
<script setup>
import "@/style/detailCommon.less";
import {
  ref,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  defineEmits,
  toRaw,
  nextTick,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  DeleteFilled,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();

import DetailInfo from "@/components/detail/DetailInfo.vue";
import Statistics from "@/components/contract/Statistics.vue";
import ConfirmModal from "@/components/commonModal/Confirm.vue";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import DeleteModal from "@/components/listView/Delete.vue";
import FilesList from "@/components/detail/FilesList.vue";
import RelatedList from "@/components/detail/RelatedList.vue";
import InfoNotes from "@/components/commonModal/RelatedNote.vue";
// 通用tab列表
import Related from "@/components/commonTab/RelatedTableList.vue";
// 相关讨论
import Comment from "@/components/detail/Comment2.vue";
// 审批单
import WFForm from "@/components/contract/WFForm.vue";
import ContractPlan from "@/components/contract/ContractPlan.vue";
import ChangeStateCode from "@/components/contract/ChangeStateCode.vue";
import { useRouter, useRoute } from "vue-router";
import { fa } from "element-plus/es/locale/index.mjs";
const router = useRouter();
const route = useRoute();

const labelCol = ref({ style: { width: "150px", textAlign: "left" } });

const filterOption = (input, option) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};

const data = reactive({
  tabs: [
    {
      label: "摘要",
    },
    {
      label: "基本信息",
    },
    {
      label: "相关列表",
    },
    {
      label: "附件",
    },
    {
      label: "审计",
    },
    {
      label: "子合同",
    },
    {
      label: "审批单",
    },
    {
      label: "讨论",
    },
  ],
  activeKey: 0,
  desc: "",
  isConfirm: false,
  isCommon: false,
  id: route.query.id,
  objectTypeCode: route.query.objectTypeCode,
  entityApiName: route.query.entityType,
  isDelete: false,
  Name: "",
  templateName: "",
  fields: {},
  processId: "",
  processInstanceId: "",
  toActivityID: "",
  stateCode: "",
  btnPerm: null,
  attachPerm: null,
  ruleLogId: route.query.id,
  layoutItems: [],
  isNotes: false,
  isPlan: false,
  isStateCode: false,
  btnActions: [],
});
const {
  btnActions,
  isStateCode,
  isPlan,
  isNotes,
  layoutItems,
  ruleLogId,
  processId,
  processInstanceId,
  toActivityID,
  stateCode,
  btnPerm,
  attachPerm,
  tabs,
  activeKey,
  desc,
  isConfirm,
  isCommon,
  id,
  objectTypeCode,
  entityApiName,
  isDelete,
  Name,
  templateName,
  fields,
} = toRefs(data);

const changeTabs = (e) => {
  if (e * 1 == 0) {
    getStatisticsData();
    return false;
  } else if (e * 1 == 1) {
  } else if (e * 1 == 2) {
  } else if (e * 1 == 3) {
  } else if (e * 1 == 4) {
  } else if (e * 1 == 5) {
  } else if (e * 1 == 6) {
  } else if (e * 1 == 7) {
  }
  data.activeKey = e;
};

const handleEdit = () => {
  data.isCommon = true;
};
//获取摘要统计数据
const getStatisticsData = () => {
  getDetail();
};
// 加载基本信息
const loadInfo = () => {
  data.isCommon = false;
  getDetail();
};

// 删除
const handleDelete = () => {
  data.isDelete = true;
};
// 获取详情 - 紧凑布局
const getCompact = () => {
  let obj = {
    actions: [
      {
        id: "3514;a",
        descriptor: "",
        callingDescriptor: "",
        params: {
          recordId: data.id,
          entityApiName: data.entityApiName,
        },
      },
    ],
  };
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.detailObj.compact, d).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.layoutItems &&
      res.actions[0].returnValue.layoutItems.length
    ) {
      data.layoutItems = res.actions[0].returnValue.layoutItems;
    }
  });
};
const getDetail = () => {
  let obj = {
    actions: [
      {
        id: "4270;a",
        descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: data.id,
          apiName: data.entityApiName,
        },
      },
    ],
  };
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.detail, d).then((res) => {
    let fields = res.actions[0].returnValue.fields;
    data.Name = fields.Title.displayValue;
    data.fields = fields;
    data.fields.PaymentPercentage = {
      value: 0,
      displayValue: 0,
    };
    data.fields.PaymentPercentage.value =
      ((fields.PaidAmount.value * 1 || 0) /
        (fields.TotalPrice.value * 1 || 1)) *
      100;
    data.fields.PaymentPercentage.value = data.fields.PaymentPercentage.value
      ? (data.fields.PaymentPercentage.value * 1).toFixed(2)
      : 0;
    data.fields.PaymentPercentage.displayValue =
      data.fields.PaymentPercentage.value;
    // data.detail = {
    //     activeon: fields.activeon && fields.activeon.value ? dayjs(fields.activeon.value).format("YYYY-MM-DD HH:mm") : '',
    //     ExpiresOn: fields.ExpiresOn && fields.ExpiresOn.value ? dayjs(fields.ExpiresOn.value).format("YYYY-MM-DD HH:mm") : '',
    // }
    data.activeKey = -1;
    nextTick(() => {
      data.activeKey = 0;
    });
    getCompact();
  });
};

const columns1 = [
  {
    title: "序号",
    key: "index",
    width: 80,
  },
  {
    title: "名称",
    key: "Name",
  },
  {
    title: "合同编号",
    key: "ContractNumber",
    width: 200,
  },
  {
    title: "合同金额",
    key: "TotalPrice",
  },
  {
    title: "审计状态",
    key: "AuditState",
  },
  {
    title: "审计人",
    key: "AuditedBy",
  },
  {
    title: "审计日期",
    key: "AuditedOn",
    width: 120,
  },
  {
    title: "审计报告名称",
    key: "AuditReportId",
  },
  {
    title: "审批状态",
    key: "StatusCode",
  },
  {
    title: "当前步骤",
    key: "CurrentStepName",
  },
  {
    title: "评分",
    key: "Rate",
  },
  {
    title: "创建时间",
    key: "CreatedOn",
    width: 120,
  },
  {
    title: "上一次修改时间",
    key: "ModifiedOn",
    width: 120,
  },
  {
    title: "操作",
    key: "action",
  },
];
const columns2 = [
  {
    title: "序号",
    key: "index",
    width: 80,
  },
  {
    title: "合同名称",
    key: "Title",
  },
  {
    title: "合同编号",
    key: "ContractNumber",
    width: 200,
  },
  {
    title: "供应商",
    key: "AccountId",
  },
  {
    title: "项目性质",
    key: "ProjectProperty",
  },
  {
    title: "招标方式",
    key: "BidAgency",
  },
  {
    title: "中标日期",
    key: "WinningNoticedOn",
    width: 200,
  },
  {
    title: "签订日期",
    key: "SignedOn",
    width: 120,
  },
  {
    title: "结束日期",
    key: "ExpiresOn",
    width: 120,
  },
  {
    title: "付款方式",
    key: "PaymentMethod",
  },
  {
    title: "总金额",
    key: "TotalPrice",
  },
  {
    title: "已付金额",
    key: "PaidAmount",
  },
  {
    title: "未付金额",
    key: "UnpaidAmount",
  },
  {
    title: "归属部门",
    key: "GUIKOUBUMEN",
  },
  {
    title: "备注",
    key: "Remark",
  },
  {
    title: "操作",
    key: "action",
  },
];
// 备注
const handleNotes = () => {
  data.isNotes = true;
};
// 设置合同计划
const handleSetPlan = () => {
  data.isPlan = true;
};
//更改状态
const handleChangeStateCode = () => {
  data.isStateCode = true;
};
//获取实体按钮
const getActions = () => {
  let obj = {
    actions: [
      {
        id: "13285;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: data.id,
          entityApiName: "Contract",
          sections: ["PAGE"],
        },
      },
    ],
  };
  let d = {
    message: JSON.stringify(obj),
  };
  data.btnActions = [];
  proxy.$post(Interface.detailObj.actions, d).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.actions
    ) {
      let actionList = res.actions[0].returnValue.actions;
      for (var i = 0; i < actionList.length; i++) {
        let item = actionList[i];
        // if (item.isSeparator) {
        //   temp.push([item]);
        // } else {
        //   if (Array.isArray(temp[temp.length - 1])) {
        //     temp[temp.length - 1].push(item);
        //   } else {
        //     temp.push(item);
        //   }
        // }
        data.btnActions.push(item);
      }
    }
  });
};
const handleClickBtn = (devNameOrId) => {
  if (typeof eval(devNameOrId) == "function") {
    var result = eval(devNameOrId + "();");
  } else {
  }
};
const getPopupContainer = (triggerNode) => {
  return triggerNode.parentNode || document.body;
};
//编辑
const Edit = () => {
  handleEdit();
};
window.Edit = Edit;
//删除
const Delete = () => {
  handleDelete();
};
window.Delete = Delete;
//设置计划
const ContractSetPlan = () => {
  handleSetPlan();
};
window.ContractSetPlan = ContractSetPlan;
//终止
const ContractStop = () => {};
window.ContractStop = ContractStop;
//续签
const ContractContinue = () => {};
window.ContractContinue = ContractContinue;
//更改状态
const ContractChangeStateCode = () => {
  handleChangeStateCode();
};
window.ContractChangeStateCode = ContractChangeStateCode;
//变更拥有人
const ContractChangeOwner = () => {};
window.ContractChangeOwner = ContractChangeOwner;
//编辑留言
const ContractNotes = () => {
  handleNotes();
};
window.ContractNotes = ContractNotes;
//更改分类
const ContractChangeClass = () => {};
window.ContractChangeClass = ContractChangeClass;
//添加明细
const ContractAddDetail = () => {};
window.ContractAddDetail = ContractAddDetail;
onMounted(() => {
  getStatisticsData();
  getActions();
});
</script>
<style lang="less" scoped>
.contractDetailWrap {
  .listRecordItem {
    max-width: 100% !important;
  }

  :deep .fh-btn {
    //border-color: #747474;
    background: #ffffff;
    height: 32px;
    color: #1055bc;

    &:hover {
      color: #1055bc;
      background: #f3f3f3;
    }
  }
  :deep .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item{
    transition:unset !important;
  }
  :deep .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover {
    border: 2px solid #015ba7 !important;
    padding: 6px 10px !important;
  }
  :deep .ant-btn {
    //border-color: #747474;
    border-radius: 4px !important;
    background: #ffffff;
    height: 32px;
    color: #1055bc;

    &:hover {
      color: #1055bc;
      background: #f3f3f3;
    }
  }

  .fh-btn-group {
    display: flex;
    margin-left: 15px;

    .fh-btn {
      border-radius: 0;
      margin-right: -1px;
      //border-color: #747474;
    }

    .fh-btn:first-child {
      border-radius: 4px 0 0 4px;
    }

    .fh-btn:last-child {
      border-radius: 0 4px 4px 0;
    }
  }

  :deep .rowCard:first-child {
    .ant-card {
      height: 220px !important;
    }

    .chartWrap {
      height: 170px;
    }
  }

  .recordLayout {
    height: 100%;
  }

  .detail-main {
    height: 100%;
  }
}
</style>
