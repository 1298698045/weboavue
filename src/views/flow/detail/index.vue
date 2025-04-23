<template>
    <div class="detailWrap">
        <div class="detail-header">
            <div class="leftBox">
                <div class="title">
                    <span class="backText" @click="backToList"> « 返回列表</span>
                    <span v-if="!isEdit" @click="EditTitle">{{ Title }}&nbsp;
                        <EditOutlined />
                    </span>
                    <a-input ref="detailTitleInputDom" v-if="isEdit" v-model:value="Title" class="detailTitleInput"
                        @blur="handleSave"></a-input>
                </div>
                <div class="tabWrap">
                    <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                        <a-tab-pane v-for="(item,index) in tabs" :key="index">
                            <template #tab>
                                <span>
                                    {{item.label}}
                                </span>
                            </template>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
            <div class="rightBox">
                <!-- <a-button class="ml10" @click="openZW">正文</a-button> -->
                <template v-if="stateCode == 0">
                    <a-button class="ml10" @click="handSave">保存表单</a-button>
                    <a-button type="primary" class="ml10" @click="handleSubmitProcess">提交流程</a-button>
                    <a-button class="ml10" @click="handleRejection">审批拒绝</a-button>
                </template>
                <a-dropdown :trigger="['click']" class="ml10">
                    <span class="btn-drop">
                        <UnorderedListOutlined style="color: #1D2129;" />
                    </span>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1" @click="handleUrging">
                                催办
                            </a-menu-item>
                            <a-menu-item key="10" v-if="btnPerm.back" @click="handleReturn">
                                退回
                            </a-menu-item>
                            <a-menu-item key="6" v-if="btnPerm.insert" @click="handleCountersign">
                                加签
                            </a-menu-item>
                            <a-menu-item key="7" v-if="btnPerm.jump" @click="handleJump">
                                跳转
                            </a-menu-item>
                            <!-- <a-menu-item key="2" @click="handleCirculation">
                                传阅他人
                            </a-menu-item> -->
                            <a-menu-item key="3" @click="handleDelegate">
                                委托
                            </a-menu-item>
                            <!-- <a-menu-item key="4" @click="printForm">
                                打印审批单
                            </a-menu-item> -->
                            <a-menu-item key="5" @click="printForm">
                                PDF
                            </a-menu-item>
                            <a-menu-item key="8" v-if="btnPerm.cancel" @click="handleRevoke">
                                撤销
                            </a-menu-item>
                            <a-menu-item key="9" @click="handleDelete">
                                删除
                            </a-menu-item>
                            <a-menu-item key="2" @click="handleCirculation">
                                传阅他人
                            </a-menu-item>
                            <a-menu-item key="4" @click="printForm">
                                打印审批单
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <div class="detail-scroll">
            <div class="detail-bd">
                <div class="tabContainer containerForm" v-if="activeKey==0" style="padding: 24px 0 24px 24px;">
                    <div class="leftContent" :class="{'active':!isAside}">
                        <div class="tableBox" style="width: 100%;overflow: auto;" :class="{'active':!isAside}">
                            <FlowFormNew :print="print" ref="flowFormRef" v-if="processId!=''&&toActivityID!=''"
                                :processId="processId" :processInstanceId="processInstanceId"
                                :toActivityID="toActivityID" @btnPermission="getBtnPermission"
                                @attachPermission="getAttachPermission" :stateCode="stateCode" :ruleLogId="ruleLogId" />
                        </div>
                        <!-- <div class="reqWrap">
                            <div class="reqHead">
                                <a-tabs v-model:activeKey="reqIndex" @change="changeTab">
                                    <a-tab-pane :key="1" tab="流转意见"></a-tab-pane>
                                    <a-tab-pane :key="2" tab="与我相关"></a-tab-pane>
                                </a-tabs>
                            </div>
                            <div class="reqBd">
                                <div class="reqSignList">
                                    <div class="reqSignListCont" v-for="item in 3" :key="item">
                                        <div class="content-left">
                                            <div class="avatarImg">
                                                <img :src="require('@/assets/img/fabe85b769064b61ad77a39d531a6e71.jpg')"
                                                    alt="">
                                            </div>
                                            <div style="width: 132px;">
                                                <p class="operate-name-label">
                                                    <a href="javaScript:openhrm(611)">王晓丽</a>
                                                </p>
                                                <span class="left-department-span">
                                                    <a href="/spa/hrm/engine.html#/hrmengine/organization?showTree=false&amp;isView=1&amp;type=department&amp;id=148&amp;_key=3b4uab"
                                                        target="_blank"
                                                        style="color: rgb(155, 155, 155); white-space: pre-wrap;">齐业成-业务发展部</a>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="content-right">
                                            <div class="content-right-remark-html">
                                                <br>
                                            </div>
                                            <p class="logitem-Recipient">
                                                <span>接收人 : </span>
                                                王晓丽 杨元文 杨文元（演示账号） 张理祯
                                            </p>
                                            <p class="loglist-item-operatedate">
                                                <span style="margin-right: 8px;">2023-12-08 16:51:16 </span>
                                                <span>[预制凭证 / 提交]</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="pagination">
                                        <a-pagination v-model:current="pageCurrent" show-quick-jumper :total="500"
                                            @change="changePagination" />
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="rightAside">
                        <div class="arrowIcon rightIcon" v-if="isAside" @click="isAside=false"></div>
                        <div class="arrowIcon leftIcon" v-else @click="isAside=true"></div>
                        <div v-if="isAside" class="asideScroll">
                            <!-- <div class="panel">
                                <div class="panel-head">
                                    <div class="panel-title">
                                        相关事务
                                    </div>
                                    <div class="panel-btn">
                                        <a-button type="text" size="small" @click="addRelateInstance">添加关联</a-button>
                                    </div>
                                </div>
                                <div class="panel-bd">
                                    <div class="relevantList">
                                        <div class="empty" v-if="relatedList.length==0">
                                            <div>
                                                <img :src="require('@/assets/img/empty.png')" alt="">
                                                <p class="emptyDesc">当前暂无数据</p>
                                            </div>
                                        </div>
                                        <div class="relevantItem" v-for="(item,index) in relatedList" :key="index">
                                            <div class="relevantTitle">{{item.Name}}</div>
                                            <div class="relevantTimerInfo">{{item.CreatedOn}} {{item.CreatedByName}}</div>
                                            <a-popconfirm title="是否确定要删除？"
                                                ok-text="确定"
                                                cancel-text="取消"
                                                @confirm="confirm"
                                                @cancel="cancel">
                                                <DeleteOutlined />
                                            </a-popconfirm>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="panel">
                                <div class="panel-head">
                                    <div class="panel-title">
                                        附件 ({{ fileTotal }})
                                    </div>
                                    <div class="panel-btn" v-if="attachPerm.add">
                                        <a-upload name="files" :headers="headers" v-model:file-list="fileList"
                                            :data="uploadData" :action="Interface.uploadFiles" :showUploadList="false"
                                            @change="changeFiles">
                                            <a-button type="text" size="small">上传文件</a-button>
                                        </a-upload>
                                    </div>
                                </div>
                                <div class="panel-bd">
                                    <div class="collapse">
                                        <div class="collapseItem" v-for="(item, index) in categoryFiles" :key="index">
                                            <div class="collapseHead"
                                                v-if="item.CategoryName && item.CategoryName!='null'">
                                                <span class="collapseItemIcon">
                                                    <!-- <DownOutlined /> -->
                                                    <UpOutlined />
                                                </span>
                                                <span class="collapseItemName">
                                                    {{item.CategoryName}}
                                                </span>
                                                <span class="addIcon">
                                                    <PlusOutlined style="color: #3399ff;" />
                                                </span>
                                            </div>
                                            <div class="collapseBd">
                                                <div class="files" v-if="item.children">
                                                    <div class="fileItem" v-for="(row, idx) in item.children"
                                                        :key="row.Id" :idx="idx">
                                                        <div class="fileItemImg" @click="openZW(row)">
                                                            <img :src="require('@/assets/img/filetype/doc.png')"
                                                                v-if="row.FileExtension == 'ocx' || 
                                                            row.FileExtension == 'docx' || row.FileExtension == 'doc'" />
                                                            <img :src="require('@/assets/img/filetype/rar.png')"
                                                                v-else-if="row.FileExtension == 'rar' || 
                                                            row.FileExtension == 'zip'" />
                                                            <img :src="require('@/assets/img/filetype/Excel.png')"
                                                                v-else-if="row.FileExtension == 'xlsx' || 
                                                            row.FileExtension == 'xls'" />
                                                            <img :src="require('@/assets/img/filetype/pdf.png')"
                                                                v-else-if="row.FileExtension == 'pdf'" />
                                                            <img :src="require('@/assets/img/filetype/TXT.png')"
                                                                v-else-if="row.FileExtension == 'TXT'||row.FileExtension == 'txt'" />
                                                            <img :src="require('@/assets/img/filetype/PPT.png')"
                                                                v-else-if="row.FileExtension == 'ppt'||row.FileExtension == 'pptx'" />
                                                            <img :src="require('@/assets/img/filetype/video.png')"
                                                                v-else-if="row.FileExtension == 'mp4'||row.FileExtension == '.mp4'" />
                                                            <img :src="require('@/assets/img/filetype/defaultImg.png')"
                                                                v-else-if="row.FileExtension == 'jpg'||row.FileExtension == 'png'||row.FileExtension == 'gif'" />
                                                            <img :src="require('@/assets/img/filetype/File.png')"
                                                                v-else />
                                                        </div>
                                                        <div class="fileItemInfo" @click="openZW(row)">
                                                            <p class="name">{{row.Name}}</p>
                                                            <p class="link">
                                                                <a href="javascript:;" v-if="attachPerm.read"
                                                                    @click="openZW(row)">查看</a>
                                                                ·
                                                                <a href="javascript:;" @click.stop="downloadFile(row)">下载</a>
                                                            </p>
                                                            <p class="time">
                                                                <span>{{row.CreatedOn}}&nbsp;·</span>
                                                                &nbsp;
                                                                <span>{{row.FileSize}}</span>
                                                            </p>
                                                        </div>
                                                        <div class="iconOpera">
                                                            <a-dropdown trigger="click">
                                                                <DownOutlined style="font-size: 12px;" @click.stop />
                                                                <template #overlay>
                                                                    <a-menu>
                                                                        <a-menu-item v-if="attachPerm.read" key="1">
                                                                            <a href="javascript:;"
                                                                                @click="openZW(row)">查看</a>
                                                                        </a-menu-item>
                                                                        <a-menu-item v-if="attachPerm.delete" key="2">
                                                                            <a-popconfirm title="是否确定要删除？" ok-text="确定"
                                                                                cancel-text="取消" >
                                                                                <a href="javascript:;">删除</a>
                                                                            </a-popconfirm>
                                                                        </a-menu-item>
                                                                        <a-menu-item v-if="attachPerm.add" key="3">
                                                                            <a-upload name="files" :headers="headers" v-model:file-list="fileList"
                                                                                :data="{entityName: 'WFProcessInstance',fileId: item.id}" :action="Interface.replaceFiles" :showUploadList="false"
                                                                                @change="changeFiles">
                                                                                <a href="javascript:;" style="width: 120px; color: #1D2129; display: inline-block;">替换</a>
                                                                            </a-upload>
                                                                        </a-menu-item>
                                                                    </a-menu>
                                                                </template>
                                                            </a-dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="files" v-else>
                                                    <div class="fileItem" @click.stop="openZW(item)">
                                                        <div class="fileItemImg">
                                                            <img :src="require('@/assets/img/filetype/doc.png')"
                                                                v-if="item.fileExtension == 'ocx' || 
                                                            item.fileExtension == 'docx' || item.fileExtension == 'doc'" />
                                                            <img :src="require('@/assets/img/filetype/rar.png')"
                                                                v-else-if="item.fileExtension == 'rar' || 
                                                            item.fileExtension == 'zip'" />
                                                            <img :src="require('@/assets/img/filetype/Excel.png')"
                                                                v-else-if="item.fileExtension == 'xlsx' || 
                                                            item.fileExtension == 'xls'" />
                                                            <img :src="require('@/assets/img/filetype/pdf.png')"
                                                                v-else-if="item.fileExtension == 'pdf'" />
                                                            <img :src="require('@/assets/img/filetype/TXT.png')"
                                                                v-else-if="item.fileExtension == 'TXT'||item.fileExtension == 'txt'" />
                                                            <img :src="require('@/assets/img/filetype/PPT.png')"
                                                                v-else-if="item.fileExtension == 'ppt'||item.fileExtension == 'pptx'" />
                                                            <img :src="require('@/assets/img/filetype/video.png')"
                                                                v-else-if="item.fileExtension == 'mp4'||item.fileExtension == '.mp4'" />
                                                            <img :src="require('@/assets/img/filetype/defaultImg.png')"
                                                                v-else-if="item.fileExtension == 'jpg'||item.fileExtension == 'png'||item.fileExtension == 'gif'" />
                                                            <img :src="require('@/assets/img/filetype/File.png')"
                                                                v-else />
                                                        </div>
                                                        <div class="fileItemInfo">
                                                            <p class="name">{{item.name}}</p>
                                                            <p class="link">
                                                                <a href="javascript:;" v-if="attachPerm.read"
                                                                    @click="openZW(item)">查看</a>
                                                                ·
                                                                <a href="javascript:;"
                                                                    @click.stop="downloadFile(item)">下载</a>
                                                            </p>
                                                            <p class="createBy" style="color: #666;">
                                                                {{ item.createdByName }}
                                                            </p>
                                                            <p class="time">
                                                                <span>{{item.createdOn}}&nbsp;·</span>
                                                                &nbsp;
                                                                <span>{{item.size}}</span>
                                                            </p>
                                                        </div>
                                                        <div class="iconOpera" @click.stop>
                                                            <a-dropdown trigger="click">
                                                                <DownOutlined style="font-size: 12px;" />
                                                                <template #overlay>
                                                                    <a-menu style="width: 120px;">
                                                                        <a-menu-item v-if="attachPerm.read" key="1">
                                                                            <a href="javascript:;"
                                                                                @click.stop="openZW(item)">查看</a>
                                                                        </a-menu-item>
                                                                        <a-menu-item v-if="attachPerm.delete" key="2">
                                                                            <a-popconfirm title="是否确定要删除？" ok-text="确定"
                                                                                cancel-text="取消" >
                                                                                <a href="javascript:;">删除</a>
                                                                            </a-popconfirm>
                                                                        </a-menu-item>
                                                                        <a-menu-item v-if="attachPerm.add" key="3">
                                                                            <a-upload name="files" :headers="headers" v-model:file-list="fileList"
                                                                                :data="{entityName: 'WFProcessInstance',fileId: item.id}" :action="Interface.replaceFiles" :showUploadList="false"
                                                                                @change="changeFiles">
                                                                                <a href="javascript:;" style="width: 120px; color: #1D2129; display: inline-block;">替换</a>
                                                                            </a-upload>
                                                                        </a-menu-item>
                                                                    </a-menu>
                                                                </template>
                                                            </a-dropdown>
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
                <div class="tabContainer" v-if="activeKey==1">
                    <div class="detailContent">
                        <iframe :src="iframeSrc" frameborder="0" style="width: 100%;height: 100%;"></iframe>
                    </div>
                </div>
                <div class="tabContainer" v-if="activeKey==2">
                    <Related :id="id" :processInstanceId="processInstanceId" @addRelateInstance="addRelateInstance" />
                </div>
                <div class="tabContainer" v-if="activeKey==3">
                    <Attachment :id="id" :processInstanceId="processInstanceId" :attachPerm="attachPerm"
                        @addRelateInstance="addRelateInstance" />
                </div>
                <div class="tabContainer" v-if="activeKey==4">
                    <div class="detailContent">
                        <DetailInfo class="DetailInfo" :id="id" :processInstanceId="processInstanceId"
                            :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
                    </div>
                </div>
                <div class="tabContainer" v-if="activeKey==5">
                    <Info @handleUrging="handleUrging" :id="id" :processInstanceId="processInstanceId" />
                </div>
                <div class="tabContainer" v-if="activeKey==6">
                    <read-record :id="id" :processInstanceId="processInstanceId" />
                </div>
                <div class="tabContainer" v-if="activeKey==7">
                    <Comment :title="'讨论留言'" :id="processInstanceId" :RegardingObjectTypeCode="'122'" />
                </div>
            </div>
        </div>
        <div class="detail-footer">
            <div class="flexEnd">
                <div class="rightBox">
                    <a-button class="ml10" @click="openZW">正文</a-button>
                    <a-button type="primary" class="ml10" @click="handSave">保存表单</a-button>
                    <a-button type="primary" class="ml10" @click="handleSubmitProcess">提交流程</a-button>
                    <a-dropdown :trigger="['hover']" class="ml10">
                        <span class="btn-drop">
                            <UnorderedListOutlined style="color: #1D2129;" />
                        </span>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="1" @click="handleUrging">
                                    催办
                                </a-menu-item>
                                <a-menu-item key="6" @click="handleCountersign">
                                    加签
                                </a-menu-item>
                                <a-menu-item key="7" @click="handleJump">
                                    跳转
                                </a-menu-item>
                                <a-menu-item key="2" @click="handleCirculation">
                                    传阅他人
                                </a-menu-item>
                                <a-menu-item key="3" @click="handleDelegate">
                                    委托
                                </a-menu-item>
                                <a-menu-item key="4" @click="printForm">
                                    打印审批单
                                </a-menu-item>
                                <a-menu-item key="5" @click="printForm">
                                    PDF
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </div>
        </div>
        <SubmitProcess ref="processRef" v-if="isProcess" :ruleLogId="ruleLogId" :processId="processId"
            :processInstanceId="processInstanceId" :toActivityID="toActivityID" :isShow="isProcess"
            @update-status="updateStatus" @success="uploadProcess" :paramsData="ProcessData" />
        <ApprovalRejection ref="rejectionRef" v-if="isRejection" :isShow="isRejection" :ruleLogId="ruleLogId"
            :processId="processId" :processInstanceId="processInstanceId" :toActivityID="toActivityID"
            :fromActivityId="fromActivityId" @update-status="updateStatus"  @success="uploadProcess" />
        <circulation-modal ref="circulationRef" :processInstanceId="processInstanceId"
            :processInstanceName="processInstanceName" @update-status="updateStatus" v-if="isCirculation"
            :isShow="isCirculation"></circulation-modal>
        <Delegate ref="DelegateRef" :ruleLogId="ruleLogId" @update-status="updateStatus"
            :paramsData="DelegateData.params" :isShow="isModal" v-if="isModal" />
        <Urging ref="UrgingRef" :processInstanceId="processInstanceId" @update-status="updateStatus" v-if="isUrging"
            :paramsData="UrgingData.params" :isShow="isUrging" />
        <!-- <RelateInstance v-if="isRelateInstance" :id="id" :entityApiName="lookEntityApiName" :entityType="lookEntityType"
            :objectTypeCode="lookObjectTypeCode" :isShow="isRelateInstance" @select="handleSelectLook"
            @cancel="isRelateInstance=false" /> -->
        <Countersign v-if="isCountersign" :isShow="isCountersign" :ruleLogId="ruleLogId"
            :processInstanceId="processInstanceId" :processInstanceName="processInstanceName" :processId="processId"
            :toActivityID="toActivityID" :paramsData="ProcessData" @update-status="isCountersign=false" />
        <!-- <Jump_old v-if="isJump" :isShow="isJump" :ruleLogId="ruleLogId" :processInstanceId="processInstanceId" :processInstanceName="processInstanceName" :processId="processId" :paramsData="{}" @update-status="isJump=false" /> -->
        <Confirm v-if="isConfirm" :isShow="isConfirm" title="撤销流程" :desc="revokeDesc" @cancel="isConfirm=false"
            @ok="revokeFlow"></Confirm>
        <Delete v-if="isDelete" :isShow="isDelete" desc="您确定删除该工作流吗?" :external="true" @cancel="isDelete=false"
            @ok="deleteFlow"></Delete>
        <Return v-if="isReturn" :isShow="isReturn" :ruleLogId="ruleLogId" :processId="processId"
            :processInstanceId="processInstanceId" :processInstanceName="processInstanceName"
            :fromActivityId="fromActivityId" :toActivityID="toActivityID" @update-status="updateStatus" @ok="initLoad">
        </Return>
        <Jump v-if="isJump" :isShow="isJump" :ruleLogId="ruleLogId" :processId="processId"
            :processInstanceId="processInstanceId" :processInstanceName="processInstanceName"
            :fromActivityId="fromActivityId" :toActivityID="toActivityID" @update-status="updateStatus" @ok="initLoad">
        </Jump>
        <ImageView v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto = false" />
        <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
    </div>
</template>
<script setup>
    import "@/style/detail.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, watch, nextTick } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined,
        UpOutlined,
        PlusOutlined,
        EditOutlined
    } from "@ant-design/icons-vue";
    import Related from "@/components/detail/Related.vue";
    import Attachment from "@/components/detail/Attachment.vue";
    import Info from "@/components/detail/Info.vue";
    import ReadRecord from "@/components/detail/ReadRecord.vue";
    import Comment from "@/components/detail/Comment2.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import useWrokDetail from "@/utils/workDetail";
    const { relatedList, getRelatedWork } = useWrokDetail();
    import SubmitProcess from "@/components/workflow/SubmitProcess.vue";
    import ApprovalRejection from "@/components/workflow/ApprovalRejection.vue";
    import CirculationModal from "@/components/workflow/CirculationModal.vue";
    import Delegate from "@/components/workflow/Delegate.vue";
    import Urging from "@/components/workflow/Urging.vue";
    // import RelateInstance from "@/components/workflow/RelateInstance.vue";
    import DetailInfo from "@/components/detail/DetailInfo.vue";
    import FlowForm from "@/components/workflow/FlowForm.vue";
    import FlowFormNew from "@/components/workflow/FlowFormNew.vue";
    import Countersign from "@/components/workflow/Countersign.vue";
    import Jump from "@/components/workflow/Jump.vue";
    import Confirm from "@/components/commonModal/Confirm.vue";
    import Delete from "@/components/listView/Delete.vue";
    import Return from "@/components/workflow/Return.vue";
    import ImageView from "@/components/file/ImageView.vue";
    import PdfView from "@/components/file/PdfView.vue";

    import { formTreeData } from "@/utils/common.js";

    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    const route = useRoute();
    const router = useRouter();

    const flowFormRef = ref(null);
    const token = localStorage.getItem("token");
    const data = reactive({
        tabs: [
            {
                label: "表单信息"
            },
            {
                label: "流程图"
            },
            {
                label: "关联事务"
            },
            {
                label: "附件信息"
            },
            {
                label: "基本信息"
            },
            {
                label: "流转信息"
            },
            {
                label: "阅读记录"
            },
            {
                label: "讨论留言"
            },
        ],
        activeKey: 0,
        isProcess: false,
        isRejection: false,
        ProcessData: {},
        RejectionData: {},
        isCirculation: false,
        isModal: false,
        isUrging: false,
        categoryFiles: [],
        isAside: true,
        reqIndex: 1,
        pageCurrent: 1,
        id: route.query.id,
        objectTypeCode: '122',
        sObjectName: 'WFProcessInstance',
        fileList: [],
        isRelateInstance: false,
        lookEntityApiName: "",
        lookObjectTypeCode: "",
        lookEntityType: "",
        Title: '',
        isEdit: false,
        ruleLogId: route.query.id,
        processId: "",
        processInstanceId: "",
        processInstanceName: "",
        toActivityID: "",
        isCountersign: false,
        isJump: false,
        isConfirm: false,
        revokeDesc: "是否撤销该事务吗？撤销后进入发起人的退件箱，发起人可以进行删除",
        isDelete: false,
        fromActivityId: "",
        isReturn: false,
        iframeSrc: "",
        fileTotal: 0,
        btnPerm: {},
        attachPerm: {},
        stateCode: 0,
        uploadData: {
            parentId: "",
            entityName: "WFProcessInstance"
        },
        headers: {
            Authorization: token,
            Token: token,
        },
        isPhoto: false,
        photoParams: {},
        ImageList: [],
        pdfParams: {},
        isPdf: false,
        print: route.query.print || 0,
        replaceUploadData: {
            entityName: "WFProcessInstance",
            fileId: ""
        }
    })
    const { isEdit, Title, objectTypeCode, sObjectName, tabs, activeKey, isProcess, isRejection, ProcessData, RejectionData,
        isCirculation, isModal, isUrging, categoryFiles, isAside, reqIndex, id, fileList, isRelateInstance, lookEntityApiName, lookObjectTypeCode, lookEntityType,
        pageCurrent, ruleLogId, processId, processInstanceId, toActivityID,
        processInstanceName, isCountersign, isJump, isConfirm, revokeDesc, isDelete,
        fromActivityId, isReturn, iframeSrc, fileTotal, btnPerm, attachPerm, stateCode,
        uploadData, headers, isPhoto, photoParams, ImageList, pdfParams, isPdf, print } = toRefs(data);

    const changeFiles = (e) => {
        // console.log("e", e);
        if (e.file.status == "done") {
            message.success("上传成功！");
            getFiles();
        }
    }
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
                let { ProcessId, ProcessInstanceId, ToActivityId, FromActivityId, StateCode } = res.actions[0].returnValue.fields;
                data.processId = ProcessId.value;
                data.processInstanceName = ProcessInstanceId.displayValue;
                data.processInstanceId = ProcessInstanceId.value;
                data.toActivityID = ToActivityId.value;
                data.fromActivityId = FromActivityId.value;
                data.stateCode = StateCode.value;
                data.uploadData.parentId = data.processInstanceId;
                data.iframeSrc = "/iframe/wflow/editors/Monitor2.html?flowid=" + data.processId + "&processInstanceId=" + data.processInstanceId;
                getFiles();
                getDetail();
            }
        });
    };
    getRuleLogData();


    const detailTitleInputDom = ref(null);
    const changeTabs = (e) => {
        data.activeKey = e;
    }
    const backToList = () => {
        if (route.query.reurl) {
            router.push({
                path: route.query.reurl,
                query: {
                }
            });
        }
        //window.history.go(-1);
    }
    getRelatedWork();

    const changeTab = () => {

    }

    const handleSubmitProcess = () => {
        flowFormRef.value.handleSave('submit');
        data.isProcess = true;
    }
    const handleRejection = () => {
        data.isRejection = true;
    }
    const updateStatus = () => {
        data.isProcess = false;
        data.isRejection = false;
        data.isCirculation = false;
        data.isModal = false;
        data.isUrging = false;
        data.isReturn = false;
        data.isJump = false;
    };
    const uploadProcess = () => {
        data.isProcess = false;
        data.isRejection = false;
        getRuleLogData();
        flowFormRef.value.loadQuery();
    }
    const CirculationData = reactive({
        params: {}
    })
    const DelegateData = reactive({
        params: {}
    })
    function CirculationFn(InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName) {
        CirculationData.params = {
            InstanceId, RuleLogId, InstanceIdName, ExecutorIdentityName
        }
        data.isCirculation = true;
    }
    const handleCirculation = () => {
        data.isCirculation = true;
    }
    const handleDelegate = () => {
        data.isModal = true;
    }
    const UrgingData = reactive({
        params: {}
    })
    const handleUrging = () => {
        data.isUrging = true;
    };

    const handleReturn = () => {
        data.isReturn = true;
    }

    // 加签
    const handleCountersign = () => {
        data.isCountersign = true;
    };

    // 跳转
    const handleJump = () => {
        data.isJump = true;
    };

    // 撤销
    const handleRevoke = () => {
        data.isConfirm = true;
    };

    // 删除
    const handleDelete = () => {
        data.isDelete = true;
    }

    // 撤销
    const revokeFlow = () => {
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.processInstanceId
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.workflow.withdraw, d).then(res => {
            if (res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                message.success("撤销成功！");
                data.isConfirm = false;
            } else {
                message.error("撤销失败！");
            }
        });
    };

    // 删除
    const deleteFlow = (e) => {
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.processInstanceId
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.workflow.delete, d).then(res => {
            if (res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                message.success("删除成功！");
                data.isDelete = false;
            } else {
                message.error("删除失败！");
            }
        });
    }

    const getFiles = () => {
        proxy.$get(Interface.getFiles, {
            parentId: data.processInstanceId
        }).then(res => {
            // data.categoryFiles = res.actions[0].returnValue;
            let list = res.actions[0].returnValue.map(item => {
                let size = item.fileSize;
                size = size ? (size * 1 / 1024).toFixed(2) : 0;
                size = size + 'kb';
                item.size = size;
                return item;
            });
            data.ImageList = list.filter(item => {
                return item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png';
            });
            data.fileTotal = list.length;
            data.categoryFiles = formTreeData(list, 'id', 'parentId');
            console.log("data.categoryFiles:", data.categoryFiles);
        })
    };
    // getFiles();
    const changePagination = (e) => {

    };
    const openZW = (row) => {
        // let url = '';
        // if (row && row.fileExtension == 'pdf') {
        //     url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent('../../resources/uploadfiles' + row.viewUrl) + "";
        // }
        // window.open(url);
        let index = 0;
        for (var i = 0; i < data.ImageList.length; i++) {
            let item = data.ImageList[i];
            if (item.id == row.id) {
                index = i;
            }
        }
        if (row.fileExtension == 'jpg' || row.fileExtension == 'jpeg' || row.fileExtension == 'png') {
            data.photoParams = {
                id: row.id,
                item: row,
                imageList: data.ImageList,
                index: index
            };
            data.isPhoto = true;
        } else if (row.fileExtension == 'pdf') {
            // let url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(row.viewUrl);
            data.pdfParams = {
                id: row.id,
                name: row.name,
                index: 0,
                viewUrl: row.viewUrl,
                downloadUrl: row.downloadUrl
            };
            data.isPdf = true;
        }
    };

    const downloadFile = (item) => {
        let url = item.downloadUrl;
        let text = item.name || '';
        windowOpen(url, text);
    };
    const windowOpen = (url, fileName) => {
        var xhr = new XMLHttpRequest();
        // var fileName = window.fileName + typeName; // 文件名称
        xhr.open('POST', url, true);
        xhr.responseType = 'blob';

        //xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
        //xhr.setRequestHeader('token', window.localStorage.getItem('token'));
        xhr.onload = function (res) {
            if (this.status === 200) {
                var type = xhr.getResponseHeader('Content-Type');
                var blob = new Blob([this.response], { type: type });
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    /*
                     * For IE
                     * >=IE10
                     */
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    /*
                     * For Non-IE (chrome, firefox)
                     */
                    var URL = window.URL || window.webkitURL;
                    var objectUrl = URL.createObjectURL(blob);
                    if (fileName) {
                        var a = document.createElement('a');
                        if (typeof a.download === 'undefined') {
                            window.location = objectUrl;
                        } else {
                            a.href = objectUrl;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                        }
                    } else {
                        window.location = objectUrl;
                    }
                }
            }
        }
        xhr.send();
    }
    //保存
    const handSave = () => {
        // message.success("保存成功");
        flowFormRef.value.handleSave();
    }
    //打印
    const printForm = () => {
        let url = router.resolve({
            path: '/lightning/workflow/WFFormPrint',
            name: "WFFormPrint",
            query: {
                id: data.processInstanceId,
            },
        });
        window.open(url.href);
    }
    //添加关联事务
    const addRelateInstance = () => {
        data.isRelateInstance = true;
    }
    //关联事务选中
    const handleSelectLook = (e) => {
        let RelateInstanceId = e.id;
        if (e.ProcessInstanceId2) {
            RelateInstanceId = e.ProcessInstanceId2;
        };
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: 'WFProcessInstanceRelated',
                        objTypeCode: 128,
                        fields: {
                            ProcessInstanceId: data.processInstanceId,
                            RelateInstanceId: RelateInstanceId
                        }
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.create, d).then(res => {
            if (res && res.actions && res.actions[0].state == 'SUCCESS') {
                message.success("添加关联成功!");
                data.isRelateInstance = false;
            }
        })
        // data.isRelateInstance = false;
    }
    const getDetail = () => {
        let d = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.processInstanceId,
                    apiName: data.sObjectName,
                    objTypeCode: data.objectTypeCode
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.detail, obj).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.fields) {
                let fields = res.actions[0].returnValue.fields;
                if (fields.Name && fields.Name.value) {
                    data.Title = fields.Name.value;
                }
            }
        })
    };
    const handleSave = () => {
        data.isEdit = false;
        let url = Interface.create;
        let d = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: data.sObjectName,
                        objTypeCode: data.objectTypeCode,
                        fields: {
                            Name: data.Title,
                        }
                    }
                }
            }]
        };
        if (data.id) {
            url = Interface.edit;
            d.actions[0].params.recordId = data.processInstanceId;
        }
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url, obj).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
                message.success("保存成功！");
            }
            else {
                if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
                    message.success(res.actions[0].errorMessage);
                }
                else {
                    message.success("保存失败！");
                }
            }
        });
    }
    const EditTitle = () => {
        data.isEdit = true;
        nextTick(() => {
            setTimeout(function () {
                detailTitleInputDom.value.focus();
            })
        })
    }
    watch(() => route.query.id, (newVal, oldVal) => {
        // getDetail();
    }, { deep: true, immediate: true })

    const initLoad = () => {
        getRuleLogData();
        // getDetail();
    }

    const getBtnPermission = (e) => {
        console.log("getBtnPermission", e);
        data.btnPerm = e;
    };

    const getAttachPermission = (e) => {
        console.log("getAttachPermission", e);
        data.attachPerm = e;
    };

</script>
<style lang="less" scoped>
    .collapse {
        .collapseItem {
            margin: 5px;

            .collapseHead {
                height: 32px;
                background: #f3f2f2;
                color: #4e5969;
                border-radius: 4px;
                font-size: 13px;
                padding: 0 10px;
                display: flex;
                align-items: center;

                .collapseItemName {
                    flex: 1;
                    padding-left: 10px;
                }
            }

            .collapseBd {
                background: #fff;

                .files {
                    .fileItem {
                        display: flex;
                        padding: 10px;
                        border-bottom: 1px solid #e5e6eb;

                        .fileItemImg {
                            width: 40px;
                            height: 40px;
                            min-width: 40px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .fileItemInfo {
                            flex: 1;
                            font-size: 14px;
                            margin-left: 10px;
                            width: calc(100% - 80px);
                            overflow-wrap: break-word;
                            .link {
                                a {
                                    color: #3399ff;
                                }
                            }

                            .time {
                                font-size: 12px;
                                color: #b8bbcc;
                            }
                        }

                    }
                }
            }
        }
    }

    .reqWrap {
        width: 100%;
        margin-top: 20px;
        box-shadow: 0 0 5px #ddd;
        background: #fff;

        .reqHead {
            height: 48px;
            line-height: 48px;
            background: #f4f4f4;
            border: 1px solid #d0d0d0;
            border-top-width: 0;
        }

        .reqBd {
            .reqSignList>div {
                border-top-width: 0;
            }

            .reqSignList {
                padding: 11px 10px;

                .reqSignListCont {
                    position: relative;
                    padding: 15px 21px;
                    border-bottom: 1px dashed #e4e4e4;
                    display: flex;

                    .content-left>div {
                        line-height: 24px;
                        margin-right: 10px;
                    }

                    .content-left {
                        padding-left: 48px;
                        line-height: 36px;
                        display: flex;

                        .avatarImg {
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            margin: 5px 0 0 -48px;
                            text-align: center;
                            margin-right: 10px;

                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }

                        .operate-name-label {
                            display: inline-block;
                            word-break: break-all;
                            color: #4d7ad8;
                        }

                        .left-department-span {
                            word-break: break-all;
                            display: inline-block;
                        }
                    }

                    .content-right {
                        flex: 1;

                        .content-right-remark-html {
                            min-height: 24px;
                            word-wrap: break-word;
                            word-break: normal;
                        }

                        .logitem-Recipient {
                            line-height: 24px;
                            color: #8a8a8a;
                        }

                        .loglist-item-operatedate {
                            line-height: 22px;
                            margin-top: 10px;
                            color: #9a9a9a;
                            overflow: hidden;
                        }
                    }
                }

                .pagination {
                    text-align: right;
                    padding: 15px 0 10px 0;
                }
            }
        }
    }

    .detailWrap {
        .detail-footer {
            display: none;
        }

        .detail-scroll {
            height: calc(~'100% - 71px');
        }

        .rightAside {
            height: calc(~'100% - 30px');
        }

        .detailContent {
            width: 100%;
            padding: 20px;
            background: #fff;
            border-radius: 4px;
            overflow: auto;
        }

        .backText {
            width: 90px;
        }

        .detailTitleInput {
            margin-top: -8px;
            position: relative;
            top: 6px;
        }
    }
</style>