<template>
    <div class="detailWrap contractDetailWrap" style="min-height: 100vh;">
        <div class="detail-header">
            <div class="primaryFieldRow">
                <div class="fieldCol" style="flex: 1;">
                    <div class="profilePicWrapper">
                        <div style="background-color: #3BA755;" class="forceEntityIcon">
                            <img :src="require('@/assets/img/task_120.png')" alt="">
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
                        <div class="fh-btn">终止</div>
                        <div class="fh-btn">续签</div>
                        <div class="fh-btn">变更拥有人</div>
                        <div class="fh-btn">设置计划</div>
                        <div class="fh-btn">更改状态</div>
                    </div>
                    <div class="fh-btn-group">
                        <div class="fh-btn" @click="handleEdit">编辑</div>
                        <div class="fh-btn" @click="handleDelete">删除</div>
                        <a-dropdown :trigger="['click']">
                            <div class="fh-btn fh-btn-icon">
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                    lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_x-small">
                                    <g lwc-6qul4k2dv7m="">
                                        <path
                                            d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                            lwc-6qul4k2dv7m=""></path>
                                    </g>
                                </svg>
                            </div>
                            <template #overlay>
                                <a-menu :trigger="['click']"
                                    style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                    <a-menu-item
                                        style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;"
                                        key="1">
                                        编辑留言
                                    </a-menu-item>
                                    <a-menu-item
                                        style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;"
                                        key="1">
                                        更改分类
                                    </a-menu-item>
                                    <a-menu-item
                                        style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;"
                                        key="1">
                                        添加明细
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
            </div>
            <ul class="pageHeader-from">
                <li class="listRecordItem">
                    <div class="formLabel">合同编号</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline">{{ detail.ContractNumber }}</a>
                    </div>
                </li>
                <li class="listRecordItem">
                    <div class="formLabel">开始时间</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline">{{ detail.activeon }}</a>
                    </div>
                </li>
                <li class="listRecordItem">
                    <div class="formLabel">截止时间</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline">{{ detail.ExpiresOn }}</a>
                    </div>
                </li>
                <li class="listRecordItem">
                    <div class="formLabel">合同金额</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline">{{ detail.TotalPrice }}</a>
                    </div>
                </li>
                <li class="listRecordItem">
                    <div class="formLabel">合同状态</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline">{{ detail.StateCode }}</a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="detail-main">
            <div class="uiTabBar">
                <ul class="tabs_nav">
                    <li class="tabs_nav_item" :class="{ 'active': activeKey == index }" v-for="(item, index) in tabs"
                        :key="index" @click="changeTabs(index)">
                        <a href="javascript:;" class="tabItemHead">
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="record-container" style="height: calc(100% - 50px);">
                <div class="recordLayout" v-if="activeKey == 0">
                    <Statistics :id="id" />
                </div>
                <div class="recordLayout" v-if="activeKey == 1">
                    <DetailInfo :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" />
                </div>
                <div class="recordLayout" v-if="activeKey == 2">
                    <RelatedList :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName"
                        fullName="Name" />
                </div>
                <div class="recordLayout" v-if="activeKey == 3">
                    <FilesList :parentId="id" :entityName="entityApiName"></FilesList>
                </div>
                <div class="recordLayout" v-if="activeKey == 4">
                    <Related :id="id" :type="'page'" :entityApiName="'ContractAudit'"
                        :RegardingObjectIdName="'ContractId'" :ObjectTypeCode="'10185'" :columns="columns1"
                        :title="'审计'" />
                </div>
                <div class="recordLayout" v-if="activeKey == 5">
                    <Related :id="id" :type="'page'" :entityApiName="'Contract'"
                        :RegardingObjectIdName="'OriginatingContract'" :ObjectTypeCode="'1010'" :columns="columns2"
                        :title="'子合同'" />
                </div>
                <div class="recordLayout" v-if="activeKey == 6">
                    <div class="tableBox" style="width: 100%;overflow: auto;" :class="{ 'active': !isAside }">
                        <FlowFormNew :print="'1'" ref="flowFormRef" v-if="processId != '' && toActivityID != ''"
                            :processId="processId" :processInstanceId="processInstanceId" :toActivityID="toActivityID"
                            @btnPermission="getBtnPermission" @attachPermission="getAttachPermission"
                            :stateCode="stateCode" :ruleLogId="ruleLogId" />
                    </div>
                </div>
                <div class="recordLayout" v-if="activeKey == 7">
                    <Comment :title="'合同讨论'" :id="id" :RegardingObjectTypeCode="'1010'" />
                </div>
            </div>
        </div>
        <ConfirmModal :isShow="isConfirm" v-if="isConfirm" :desc="desc" @cancel="isConfirm = false"
            @ok="handleOkConfirm" />
        <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon = false" title="编辑" @success="loadInfo"
            :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName"></common-form-modal>
        <Delete :isShow="isDelete" v-if="isDelete" desc="是否确定要删除？" :recordId="id" :sObjectName="entityApiName"
            :objTypeCode="objectTypeCode" @cancel="isDelete = false" />
    </div>
</template>
<script setup>
import "@/style/detailCommon.less";
import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    DeleteFilled,
    DeleteOutlined, SearchOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();

import DetailInfo from "@/components/detail/DetailInfo.vue";
import Statistics from "@/components/contract/Statistics.vue";
import ConfirmModal from "@/components/commonModal/Confirm.vue";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import Delete from "@/components/listView/Delete.vue";
import FilesList from "@/components/detail/FilesList.vue";
import RelatedList from "@/components/detail/RelatedList.vue";
//审批单
import FlowFormNew from "@/components/workflow/FlowFormNew.vue";
// 通用tab列表
import Related from "@/components/commonTab/RelatedTableList.vue";
// 相关讨论
import Comment from "@/components/detail/Comment2.vue";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const labelCol = ref({ style: { width: '150px', textAlign: "left" } });

const filterOption = (input, option) => {
    return option.label.toLowerCase().includes(input.toLowerCase());
};

const data = reactive({
    tabs: [
        {
            label: "摘要"
        },
        {
            label: "基本信息"
        },
        {
            label: "相关列表"
        },
        {
            label: "附件"
        },
        {
            label: "审计"
        },
        {
            label: "子合同"
        },
        {
            label: "审批单"
        },
        {
            label: "讨论"
        }
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
    detail: {},
    processId: '',
    processInstanceId: '',
    toActivityID: '',
    stateCode: '',
    btnPerm: null,
    attachPerm: null,
    ruleLogId: route.query.id,
    isAside: true
})
const { isAside, ruleLogId, processId, processInstanceId, toActivityID, stateCode, btnPerm, attachPerm, tabs, activeKey, desc, isConfirm, isCommon, id, objectTypeCode, entityApiName,
    isDelete, Name, templateName, detail } = toRefs(data);

const changeTabs = (e) => {
    data.activeKey = e;
};

const handleEdit = () => {
    data.isCommon = true;
};

// 加载基本信息
const loadInfo = () => {
    data.isCommon = false;
    getDetail();
};

// 删除
const handleDelete = () => {
    data.isDelete = true;
}

const getDetail = () => {
    let obj = {
        actions: [{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: data.id,
                apiName: data.entityApiName
            }
        }]
    };
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.detail, d).then(res => {
        let fields = res.actions[0].returnValue.fields;
        data.Name = fields.Title.displayValue;
        data.detail = {
            ContractNumber: fields.ContractNumber && fields.ContractNumber.value ? fields.ContractNumber.value : '',
            activeon: fields.activeon && fields.activeon.value ? dayjs(fields.activeon.value).format("YYYY-MM-DD HH:mm") : '',
            ExpiresOn: fields.ExpiresOn && fields.ExpiresOn.value ? dayjs(fields.ExpiresOn.value).format("YYYY-MM-DD HH:mm") : '',
            TotalPrice: fields.TotalPrice && fields.TotalPrice.value ? fields.TotalPrice.value : '',
            StateCode: fields.StateCode && fields.StateCode.displayValue ? fields.StateCode.displayValue : ''
        }
    })
};
getDetail();
const getRuleLogData = () => {
    let obj = {
        actions: [{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: data.ruleLogId,
                apiName: "WFRuleLog"
            }
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.detail, d).then(res => {
        if (res && res.actions && res.actions[0].returnValue) {
            let { ProcessId, ProcessInstanceId, ToActivityId, StateCode } = res.actions[0].returnValue.fields;
            data.processId = ProcessId ? ProcessId.value : '';
            data.processInstanceId = ProcessInstanceId ? ProcessInstanceId.value : '';
            data.toActivityID = ToActivityId ? ToActivityId.value : '';
            data.stateCode = StateCode ? StateCode.value : '';
        }
    });
};
getRuleLogData();
const getBtnPermission = (e) => {
    data.btnPerm = e;
};

const getAttachPermission = (e) => {
    data.attachPerm = e;
};
const columns1 = [
    {
        title: "序号",
        key: "index",
        width: 80,
    },
    {
        title: "名称",
        key: "Name"
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
    }
];
const columns2 = [
    {
        title: "序号",
        key: "index",
        width: 80,
    },
    {
        title: "合同名称",
        key: "Title"
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
    }
];
</script>
<style lang="less" scoped>
.contractDetailWrap {
    .listRecordItem {
        max-width: 100% !important;
    }

    :deep .fh-btn {
        border-color: #747474;
        background: #ffffff;
        height: 32px;
        color: #1055BC;

        &:hover {
            color: #1055BC;
            background: #f3f3f3;
        }
    }

    :deep .ant-btn {
        border-color: #747474;
        border-radius: 4px !important;
        background: #ffffff;
        height: 32px;
        color: #1055BC;

        &:hover {
            color: #1055BC;
            background: #f3f3f3;
        }
    }

    .fh-btn-group {
        display: flex;
        margin-left: 15px;

        .fh-btn {
            border-radius: 0;
            margin-right: -1px;
            border-color: #747474;
        }

        .fh-btn:first-child {
            border-radius: 4px 0 0 4px;
        }

        .fh-btn:last-child {
            border-radius: 0 4px 4px 0;
        }
    }
}
</style>