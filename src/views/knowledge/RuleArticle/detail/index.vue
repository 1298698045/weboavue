<template>
    <div class="detailWrap RuleArticleDetailWrap">
        <div class="detail-header">
            <div class="leftBox">
                <div class="title">
                    <!-- <span class="backText" @click="backToList"> « 返回列表</span> -->
                    <span>{{ FormData.Title || '制度文件详情' }}</span>
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
                <a-button class="ml10" @click="printForm">导出PDF</a-button>
                <a-dropdown :trigger="['hover']" class="ml10">
                    <span class="btn-drop">
                        <UnorderedListOutlined style="color: #1D2129;" />
                    </span>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1" @click="printForm">
                                导出Excel
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <div class="detail-scroll">
            <div class="detail-bd">
                <div class="tabContainer containerForm" v-if="activeKey == 0" style="padding: 24px 0 24px 24px;">
                    <div class="leftContent">
                        <div class="tableBox">
                            <div id="main-content">
                                <table class="table1">
                                    <tr>
                                        <td colspan="6" class="formtd">
                                            <p class="formtitle">制度台账</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">制度编号</td>
                                        <td colspan="2" class="righttd">{{ FormData.ArticleNumber || '' }}</td>
                                        <td colspan="1">制度名称</td>
                                        <td colspan="2" class="righttd">{{ FormData.Title || '' }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">版本号</td>
                                        <td colspan="2" class="righttd">{{ FormData.VersionNumber || '' }}</td>
                                        <td colspan="1">状态</td>
                                        <td colspan="2" class="righttd">
                                            <span style="color:#bbb;" v-if="FormData.StateCode == '0'">草稿</span>
                                            <span style="color:#31BA6A;" v-if="FormData.StateCode == '1'">已发布</span>
                                            <span style="color:#F9A6AB;" v-if="FormData.StateCode == '2'">已废止</span>
                                            <span style="color:#015ba7;" v-if="FormData.StateCode == '3'">流转中</span>
                                            <span style="color:#F9A6AB;" v-if="FormData.StateCode == '4'">未通过</span>
                                            <span style="color:#015ba7;" v-if="FormData.StateCode == '5'">已修订</span>
                                            <span style="color:#015ba7;" v-if="FormData.StateCode == '6'">已变更</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">制度目录</td>
                                        <td colspan="2" class="righttd">
                                            {{ FormData.FolderName || '' }}</td>
                                        <td colspan="1">公开方式</td>
                                        <td colspan="2" class="righttd">{{ FormData.PublicationScope || '' }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">生效日期</td>
                                        <td colspan="2" class="righttd">{{ FormData.ActiveOn || '' }}</td>
                                        <td colspan="1">失效日期</td>
                                        <td colspan="2" class="righttd">{{ FormData.ExpiresOn || '' }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">编制人</td>
                                        <td colspan="2" class="righttd">
                                            {{ FormData.CreatedByName || '' }}
                                        </td>
                                        <td colspan="1">编制部门</td>
                                        <td colspan="2" class="righttd">
                                            {{ FormData.BusinessUnitName || '' }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">制度文件</td>
                                        <td colspan="5" class="righttd">
                                            <div class="tagWrap">
                                                <div class="tag fileItemImg" v-for="(item, index) in fileList"
                                                    :key="index">
                                                    <img src="/src/assets/img/filetype/doc.png"
                                                        v-if="item.FileExtension == 'ocx' || item.FileExtension == 'docx' || item.FileExtension == 'doc'" />
                                                    <img src="/src/assets/img/filetype/rar.png"
                                                        v-else-if="item.FileExtension == 'rar' || item.FileExtension == 'zip'" />
                                                    <img src="/src/assets/img/filetype/Excel.png"
                                                        v-else-if="item.FileExtension == 'xlsx' || item.FileExtension == 'xls'" />
                                                    <img src="/src/assets/img/filetype/pdf.png"
                                                        v-else-if="item.FileExtension == 'pdf'" />
                                                    <img src="/src/assets/img/filetype/TXT.png"
                                                        v-else-if="item.FileExtension == 'TXT' || item.FileExtension == 'txt'" />
                                                    <img src="/src/assets/img/filetype/PPT.png"
                                                        v-else-if="item.FileExtension == 'ppt' || item.FileExtension == 'pptx'" />
                                                    <img src="/src/assets/img/filetype/voice.png"
                                                        v-else-if="item.FileExtension == 'mp3' || item.FileExtension == '.mp3'" />
                                                    <img src="/src/assets/img/filetype/video.png"
                                                        v-else-if="item.FileExtension == 'mp4' || item.FileExtension == '.mp4'" />
                                                    <img src="/src/assets/img/filetype/defaultImg.png"
                                                        v-else-if="item.FileExtension == 'jpg' || item.FileExtension == 'png' || item.FileExtension == 'gif'" />
                                                    <img src="/src/assets/img/filetype/File.png" v-else />
                                                    <div class="filename">{{ item.Name }}&nbsp;&nbsp;&nbsp;{{
                                                        item.fileSize &&
                                                            Number(item.fileSize) ?
                                                            (Number(item.fileSize) / 1024).toFixed(1) + 'KB' : '' }}</div>
                                                    <div class="filebtn">
                                                        <a href="javascript:void(0)"
                                                            @click="handlePreviewFile(item)">查看</a>
                                                        <a href="javascript:void(0)" @click="downloadFile(item)">下载</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContainer" v-if="activeKey == 1">
                    <Related :id="id" :type="'page'" :entityApiName="'InstitutionHistory'" :RegardingObjectIdName="'ContentId'" :ObjectTypeCode="'100207'" :columns="columns1" :title="'变更记录'" />
                </div>
                <div class="tabContainer" v-if="activeKey == 2">
                    <Related :id="id" :type="'page'" :entityApiName="'KbArticleVersion'" :RegardingObjectIdName="'KbArticleId'" :ObjectTypeCode="'3030'" :columns="columns2" :title="'修订记录'" />
                </div>
                <div class="tabContainer" v-if="activeKey == 3">
                    <Related :id="id" :type="'page'" :entityApiName="'KbArticleAbolish'" :RegardingObjectIdName="'KbArticleId'" :ObjectTypeCode="'3031'" :columns="columns3" :title="'废止记录'" />
                </div>
                <div class="tabContainer" v-if="activeKey == 4">
                    <Comment :isTitle="false" :id="id" />
                </div>
            </div>
        </div>
        <SubmitProcess ref="processRef" v-if="isProcess" :isShow="isProcess" @update-status="updateStatus"
            :paramsData="ProcessData" />
        <ApprovalRejection ref="rejectionRef" v-if="isRejection" :isShow="isRejection" @update-status="updateStatus"
            :paramsData="RejectionData" />
        <circulation-modal ref="circulationRef" @update-status="updateStatus" v-if="isCirculation"
            :paramsData="CirculationData.params" :isShow="isCirculation"></circulation-modal>
        <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal"
            v-if="isModal" />
        <Urging ref="UrgingRef" @update-status="updateStatus" v-if="isUrging" :paramsData="UrgingData.params"
            :isShow="isUrging" />
        <RelateInstance v-if="isRelateInstance" :id="id" :entityApiName="lookEntityApiName" :entityType="lookEntityType"
            :objectTypeCode="lookObjectTypeCode" :isShow="isRelateInstance" @select="handleSelectLook"
            @cancel="isRelateInstance = false" />

        <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="'确定要删除吗？'" :title="'删除'" @cancel="isConfirm = false"
            @ok="deleteFile" :id="recordId" />
        <ImageView v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto = false" />
        <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
        <TxtView v-if="isTxt" :isShow="isTxt" :txtParams="txtParams" @cancel="isTxt = false" />
    </div>
</template>
<script setup>
import "@/style/detail.less";
import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, h } from "vue";

import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    DeleteFilled,
    DeleteOutlined,
    UpOutlined,
    PlusOutlined,
    SearchOutlined,
    DownloadOutlined,
    ZoomInOutlined,
    UserOutlined,
    InboxOutlined,
    VerticalAlignBottomOutlined,
    CloseOutlined,
    EyeOutlined
} from "@ant-design/icons-vue";
import Related from "@/components/detail/Related2.vue";
import Info from "@/components/detail/Info.vue";
import ReadRecord from "@/components/detail/ReadRecord.vue";
import Comment from "@/components/detail/Comment.vue";
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
const { proxy } = getCurrentInstance();
import useWrokDetail from "@/utils/workDetail";
const { relatedList, getRelatedWork } = useWrokDetail();
import SubmitProcess from "@/components/workflow/SubmitProcess.vue";
import ApprovalRejection from "@/components/workflow/ApprovalRejection.vue";
import CirculationModal from "@/components/workflow/CirculationModal.vue";
import Delegate from "@/components/workflow/Delegate.vue";
import Urging from "@/components/workflow/Urging.vue";
import RelateInstance from "@/components/workflow/RelateInstance.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import ImageView from "@/components/file/ImageView.vue";
import PdfView from "@/components/file/PdfView.vue";
import TxtView from "@/components/file/TxtView.vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
const route = useRoute();
const router = useRouter();
const data = reactive({
    tabs: [
        {
            label: "基本信息"
        },
        {
            label: "变更记录"
        },
        {
            label: "修订记录"
        },
        {
            label: "废止记录"
        },
        {
            label: "意见反馈"
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
    fileList: [],
    isRelateInstance: false,
    lookEntityApiName: "",
    lookObjectTypeCode: "",
    lookEntityType: "",
    FormData: {},
    ImageList: [],
    isConfirm: false,
    isPhoto: false,
    photoParams: {},
    isPdf: false,
    pdfParams: {},
    isTxt: false,
    txtParams: {}
})
const { isTxt, txtParams, tabs, activeKey, isProcess, isRejection, ProcessData, RejectionData, FormData, ImageList, isConfirm, isPhoto, photoParams, isPdf, pdfParams,
    isCirculation, isModal, isUrging, categoryFiles, isAside, reqIndex, id, fileList, isRelateInstance, lookEntityApiName, lookObjectTypeCode, lookEntityType,
    pageCurrent } = toRefs(data);
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

const handleSubmitProcess = () => {
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

const changePagination = (e) => {

};
const openZW = (row) => {
    let url = '';
    if (row && row.FileExtension == 'pdf') {
        url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent('../../resources/uploadfiles' + row.ViewLinkUrl) + "";
    }
    window.open(url);
}
//保存
const handSave = () => {
    message.success("保存成功");
}
//打印
const printForm = () => {
    let url = router.resolve({
        path: '/lightning/workflow/WFFormPrint',
        name: "WFFormPrint",
        query: {
            id: route.query.id,
        },
    });
    window.open(url.href);
}
//添加关联事务
const addRelateInstance = () => {
    data.isRelateInstance = true;
}
//关联事务选中
const handleSelectLook = () => {
    data.isRelateInstance = false;
}
const getDetail = () => {
    let d = {
        actions: [{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: data.id,
                apiName: 'Institution',
                objTypeCode: '100204'
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.fields) {
            let fields = res.actions[0].returnValue.fields;
            data.FormData.ArticleNumber = fields.ArticleNumber.value || '';
            data.FormData.Title = fields.Title ? fields.Title.value : (fields.Name ? fields.Name.value : '');
            data.FormData.VersionNumber = fields.VersionNumber.value || '';
            data.FormData.StateCode = fields.StateCode.value || '';
            data.FormData.FolderName = fields.FolderId && fields.FolderId.displayValue ? fields.FolderId.displayValue : '';
            let FolderId = fields.FolderId && fields.FolderId.value ? (fields.FolderId.value).toLowerCase() : '';
            if (FolderId == '10010000-0000-0000-0000-000000007002') {
                data.FormData.FolderName = '制度文件';
            } else if (FolderId == 'ec230bb1-b9a5-42eb-83fc-4b6410038f57') {
                data.FormData.FolderName = '讨论稿';
            } else if (FolderId == '61f0d939-2474-4c29-b47e-fb700d6ef4c3') {
                data.FormData.FolderName = '暂行稿';
            } else if (FolderId == 'c141ce85-126f-4771-9f7a-8023dec67493') {
                data.FormData.FolderName = '实施稿';
            }
            data.FormData.PublicationScope = fields.PublicationScope.value || '';
            data.FormData.ActiveOn = fields.ActiveOn && fields.ActiveOn.value ? dayjs(new Date(fields.ActiveOn.value)).format("YYYY-MM-DD") : '';
            data.FormData.ExpiresOn = fields.ExpiresOn && fields.ExpiresOn.value ? dayjs(new Date(fields.ExpiresOn.value)).format("YYYY-MM-DD") : '';
            data.FormData.CreatedByName = fields.CreatedBy && fields.CreatedBy.displayValue ? fields.CreatedBy.displayValue : '';
            data.FormData.BusinessUnitName = fields.BusinessUnitId && fields.BusinessUnitId.displayValue ? fields.BusinessUnitId.displayValue : '';
        }
    })
}
const getFiles = () => {
    data.fileList = [];
    data.ImageList = [];
    let url = Interface.getFiles;
    let d = {
        parentId: data.id,
        page: 1,
        rows: 100
    }
    proxy.$post(url, d).then(res => {
        var list = [];
        var list2 = [];
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue) {
            for (var i = 0; i < res.actions[0].returnValue.length; i++) {
                var item = res.actions[0].returnValue[i];
                let size = item.fileSize;
                size = size ? (size * 1 / 1024).toFixed(2) : 0;
                size = size + 'kb';
                let name = item.name || '';
                if (name) {
                    name = name.replaceAll('.' + item.fileExtension, '');
                }
                let ite = {
                    size: size,
                    url: '/Institution/' + item.id + '/' + name,
                    fileLocation: item.fileLocation || '',
                    uid: item.id,
                    id: item.id,
                    downloadUrl: item.downloadUrl || '',
                    viewUrl: item.viewUrl || '',
                    fileExtension: item.fileExtension,
                    FileExtension: item.fileExtension,
                    fileSize: item.fileSize,
                    name: item.name,
                    Name: item.name,
                    CreatedOn: item.createdOn ? dayjs(item.createdOn).format("YYYY-MM-DD hh:mm") : '',
                    CreatedBy: item.createdByName || '',
                };
                list.push(ite);
                if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
                    list2.push(ite);
                }
            }
        }
        data.fileList = list;
        data.ImageList = list2;
    })
};
//预览附件
const handlePreviewFile = (item) => {
    let url = '';
    if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
        let index = 0;
        for (var i = 0; i < data.ImageList.length; i++) {
            let ite = data.ImageList[i];
            if (ite.id == item.id) {
                index = i;
            }
        }
        data.photoParams = {
            id: item.id,
            item: item,
            imageList: data.ImageList,
            index: index
        };
        data.isPhoto = true;
    } else if (item.fileExtension == 'pdf') {
        url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(item.viewUrl);
        data.pdfParams = {
            id: item.id,
            name: item.name,
            index: 0,
            viewUrl: item.viewUrl,
            downloadUrl: item.downloadUrl
        };
        data.isPdf = true;
    } else if (item.fileExtension == 'txt') {
        data.txtParams = {
            name: item.name,
            viewUrl: item.viewUrl,
            downloadUrl: item.downloadUrl
        };
        data.isTxt = true;
    }
    else if (item.fileExtension == 'docx' || item.fileExtension == 'pptx' || item.fileExtension == 'xlsx' || item.fileExtension == 'doc' || item.fileExtension == 'ppt' || item.fileExtension == 'xls') {
        //let medittype = 0;
        downloadFile(item);
        //openfile(medittype, item.id, item.Name);
    }
    else {
        downloadFile(item);
    }
};
//下载附件
const downloadFile = (item) => {
    let url = item.downloadUrl;
    window.open(url);
    // let text = item.Name || '';
    // windowOpen(url, text);
};
//删除
const deleteFile0 = (item) => {
    data.recordId = item.id;
    data.confirmText = '确定要删除吗？'
    data.confirmTitle = '删除'
    data.isConfirm = true;
    //data.isDelete = true;
}
//删除附件
const deleteFile = (id) => {
    // let d = {
    //   actions: [{
    //     id: "4105;a",
    //     descriptor: "",
    //     callingDescriptor: "UNKNOWN",
    //     params: {
    //       parentId: data.uploadData.parentId,
    //       entityName: data.uploadData.entityName,
    //       fileId: id
    //     }
    //   }]
    // };
    let d = {
        actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: id,
                apiName: 'RelatedAttachment',
                objTypeCode: '1001',
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    };
    // proxy.$post(Interface.deleteFiles, obj).then(res => {
    proxy.$post(Interface.delete, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
            message.success("删除成功！");
            data.isConfirm = false;
            getFiles();
        }
        else {
            if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
                message.error(res.actions[0].errorMessage);
            }
            else {
                message.error("删除失败！");
            }
        }
    }).catch(err => {
        console.log('error', err);
        message.error("删除失败！");
    });
}
const columns1 = [
{
      title: "序号",
      key: "index",
      width: 80,
  },
  {
      title: "制度编号",
      key: "ArticleNumber",
      width: 200,
  },
  {
      title: "制度文件",
      key: "ContentId"
  },
  {
      title: "栏目",
      key: "FolderId",
  },
  {
      title: "公开方式",
      key: "PublicationScope",
  },
  {
      title: "生效日期",
      key: "ActiveOn",
      width: 120,
  },
  {
      title: "失效日期",
      key: "ExpiresOn",
      width: 120,
  },
  {
      title: "审批发布人",
      key: "ApprovedBy",
  },
    {
      title: "发布部门",
      key: "BusinessUnitId",
    },
    {
      title: "状态",
      key: "StateCode",
    },
    {
      title: "版本号",
      key: "VersionNumber",
    },
    {
      title: "创建人",
      key: "CreatedBy",
    },
    {
      title: "创建时间",
      key: "CreatedOn",
      width: 120,
    },
    {
      title: "修改人",
      key: "ModifiedBy",
    },
    {
      title: "修改时间",
      key: "ModifiedOn",
      width: 120,
    }
  ];
  const columns2 = [
  {
      title: "序号",
      key: "index",
      width: 80,
  },
  {
      title: "制度编号",
      key: "ArticleNumber",
      width: 200,
  },
  {
      title: "制度文件",
      key: "KbArticleId"
  },
  {
      title: "修订日期",
      key: "VersionOn",
      width: 120,
  },
    {
      title: "修订部门",
      key: "OwningBusinessUnit",
    },
    {
      title: "修订背景",
      key: "Description",
    },
    {
      title: "状态",
      key: "StateCode",
    },
    {
      title: "版本号",
      key: "VersionNumber",
    },
    {
      title: "创建人",
      key: "CreatedBy",
    },
    {
      title: "创建时间",
      key: "CreatedOn",
      width: 120,
    },
    {
      title: "修改人",
      key: "ModifiedBy",
    },
    {
      title: "修改时间",
      key: "ModifiedOn",
      width: 120,
    }
  ];
 const columns3 = [
 {
      title: "序号",
      key: "index",
      width: 80,
  },
  {
      title: "制度编号",
      key: "ArticleNumber",
      width: 200,
  },
  {
      title: "制度文件",
      key: "KbArticleId"
  },
  {
      title: "废止日期",
      key: "AbolishedOn",
      width: 120,
  },
    {
      title: "废止部门",
      key: "OwningBusinessUnit",
    },
    {
      title: "废止原因",
      key: "Description",
    },
    {
      title: "状态",
      key: "StateCode",
    },
    {
      title: "版本号",
      key: "VersionNumber",
    },
    {
      title: "创建人",
      key: "CreatedBy",
    },
    {
      title: "创建时间",
      key: "CreatedOn",
      width: 120,
    },
    {
      title: "修改人",
      key: "ModifiedBy",
    },
    {
      title: "修改时间",
      key: "ModifiedOn",
      width: 120,
    }
  ];
onMounted(() => {
    if (data.id) {
        getDetail();
        getFiles();
    }
});
</script>
<style lang="less" scoped>
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

.RuleArticleDetailWrap {
    .leftContent {
        width: calc(~"100% - 25px");
        border: none;
    }

    .detail-scroll {
        height: calc(~"100% - 70px") !important;
    }

    .tableBox {
        width: calc(~"100% - 0px") !important;
        height: 100%;
        overflow-y: auto !important;
    }

    #main-content td {
        border: 1px solid #333;
        min-width: 80px;
        box-sizing: border-box;
        padding: 5px;
        width: 95px;
        word-break: break-all;
    }

    #main-content tr td:first-child {
        max-width: 100px;
    }

    #main-content td.title {
        font-weight: 700;
    }

    .dataspan {
        border-bottom: 1px solid #333;
    }

    .printbtn {
        width: 98%;
        text-align: right;
        padding-top: 15px;
    }

    #main-content {
        padding: 10px;
    }

    .formtitle {
        font-size: 26px;
        line-height: 40px;
        /*font-weight:700;*/
        text-align: center;
    }

    #main-content tr {
        line-height: 28px;
    }

    #main-content tr td p.text {
        text-align: left;
        margin-left: 15px;
    }

    #main-content tr td .opinion {
        text-align: left;
        width: 120px;
        margin-left: 70%;
        margin-top: 10px;
        height: 70px;
        overflow: hidden;
    }

    .table1 {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
        font-size: 16px;
    }

    .formtitle {
        font-family: SimHei;
        font-size: 30px;
        margin-bottom: 15px;
    }

    .formtitlebottom {
        height: 30px;
        text-align: right;
        margin-top: 40px;
        font-size: 21px;
        font-family: FangSong;
    }

    #main-content {
        width: 750px;
        margin: 0 auto;
        text-align: left;
        color: #000;
    }

    .table1 {
        margin-bottom: 20px;

        .fileItemImg {
            min-height: 30px;
            height: auto;
            display: flex;
            //align-items: center;
            margin: 10px 0;

            img {
                width: 30px;
                height: 30px;
            }
        }

        .filename {
            flex: 1;
            text-align: left;
            padding-left: 10px;
        }

        .filebtn {
            a {
                margin-right: 10px;
                font-size: 14px;
                color: #165dff;
            }
        }

        .righttd {
            padding: 0 !important;
            padding-left: 10px !important;
        }

        .fileItemInfo {
            flex: 1;
            font-size: 14px;
            margin-left: 10px;

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

    #main-content .table1 tr td {
        min-width: 120px;
        text-align: left;
        padding-left: 10px;
    }

    #main-content .table1 tr td.formtd {
        border: 0;
        border-bottom: 1px solid #000;
    }
}
</style>