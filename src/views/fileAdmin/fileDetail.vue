<template>
    <div class="detailWrap">
        <div class="detail-header">
            <div class="leftBox">
                <div class="title">
                    <div>
                        <span>{{ Name }}</span>
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
                <!-- <a-button class="ml10">编辑</a-button> -->
                <!-- <a-button type="primary" class="ml10">删除</a-button> -->
                <a-button type="primary" class="ml10" @click="previewFile">预览</a-button>
                <a-dropdown :trigger="['hover']" class="ml10">
                    <span class="btn-drop">
                        <UnorderedListOutlined style="color: #1D2129;" />
                    </span>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1">
                                备注
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <div class="detail-scroll">
            <div class="detail-bd">
                <div class="tabContainer" v-if="activeKey == 0">
                    <div class="detailContent">
                        <DetailInfo :id="id" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
                    </div>
                </div>
                <div class="tabContainer" v-if="activeKey == 1">
                    <FileReadRecord />
                </div>
                <div class="tabContainer" v-if="activeKey == 2">
                    <DownloadFile />
                </div>
            </div>
        </div>
        <!-- 图片预览 -->
        <PhotoPreview v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto = false" />
        <!-- PDF预览 -->
        <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
        <TxtView v-if="isTxt" :isShow="isTxt" :txtParams="txtParams" @cancel="isTxt = false" />
    </div>
</template>
<script setup>
import "@/style/common.less";
import "@/style/detail.less";
import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
import { KGBrowser, isSupportOfficePlug } from "@/jgfiles/js/WebOffice.js";
import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    DeleteFilled,
    DeleteOutlined
} from "@ant-design/icons-vue";
import FileReadRecord from "../../components/file/FileReadRecord.vue";
import DownloadFile from "@/components/file/DownloadFile.vue";
import DetailInfo from "@/components/detail/DetailInfo.vue";
import PhotoPreview from "@/components/file/PhotoPreview.vue";
import PdfView from "@/components/file/PdfView.vue";
import TxtView from "@/components/file/TxtView.vue";
import { useRouter, useRoute } from "vue-router";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const data = reactive({
    tabs: [
        {
            label: "详细信息"
        },
        {
            label: "阅读记录"
        },
        {
            label: "下载记录"
        }
    ],
    activeKey: 0,
    isProcess: false,
    isRejection: false,
    ProcessData: {},
    RejectionData: {},
    isCirculation: false,
    isModal: false,
    isUrging: false,
    Name: route.query.name,
    id: route.query.id,
    srchType: route.query.srchType,
    folderId: route.query.folderId,
    objectTypeCode: '100100',
    sObjectName: 'File',
    isPhoto: false,
    photoParams: {
        id: '',
        item: {},
        imageList: [],
        index: 0
    },
    isPdf: false,
    pdfParams: {},
    detail: {},
    isTxt: false,
    txtParams: {}
})
const { isTxt, txtParams, isPhoto, isPdf, photoParams, pdfParams, detail, tabs, activeKey, isProcess, isRejection, ProcessData, RejectionData, isCirculation, isModal, isUrging, Name, id, objectTypeCode, sObjectName } = toRefs(data);
const changeTabs = (e) => {
    console.log("e", e);
    data.activeKey = e;
}
const formatTime = (e) => {
    e = e ? (e.split('.')[0]).replace(/\-/g, '/') : '';
    let time = (new Date(e)).getTime();
    time = new Date(time);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    let date = time.getDate();
    date = date > 9 ? date : '0' + date;
    let hour = time.getHours();
    hour = hour > 9 ? hour : '0' + hour;
    let minute = time.getMinutes();
    minute = minute > 9 ? minute : '0' + minute;
    const newTime = `${year}-${month}-${date} ${hour}:${minute}`;
    return newTime;
};
const getFileDetail = () => {
    let url = Interface.file.getLatestFiles;
    if (data.srchType == 'latestuse') {
        url = Interface.file.getLatestFiles;
    } else if (data.srchType == 'my' || data.srchType == 'org') {
        url = Interface.file.getOwnDirAndFiles;
    } else if (data.srchType == 'favorite') {
        url = Interface.file.getFavoriteFiles;
    } else if (data.srchType == 'recycle') {
        url = Interface.file.getRecycFolders;
    }
    let d = {
        "actions": [{
            "id": "4105;a",
            "descriptor": "",
            "callingDescriptor": "UNKNOWN",
            "params": {
                "pageNumber": 1,
                "pageSize": 100,
                "folderId": data.folderId,
                "search": '',
                "fileExtension": ''
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then((res) => {
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0]
            .returnValue) {
            let filelist = [];
            filelist = res.actions[0].returnValue.files;
            filelist.forEach(item => {
                if (item.id == data.id) {
                    item.createdOn = item.createdOn ? formatTime(item.createdOn) : '';
                    item.modifiedOn = item.modifiedOn ? formatTime(item.modifiedOn) : '';
                    item.fileSize = item.fileSize ? (item.fileSize * 1 / 1024).toFixed(2) + 'kb' : '';
                    if (item.fileExtension == 'ppt' || item.fileExtension == 'pptx') {
                        item.icon = '/img/filetype/PPT.png';
                    } else if (item.fileExtension == 'xls' || item.fileExtension == 'xlsx') {
                        item.icon = '/img/filetype/xls.png';
                    } else if (item.fileExtension == 'doc' || item.fileExtension == 'docx') {
                        item.icon = '/img/filetype/doc.png';
                    } else if (item.fileExtension == 'png' || item.fileExtension == 'jpg' || item
                        .fileExtension == 'jpeg') {
                        item.icon = '/img/filetype/defaultImg.png';
                        data.photoParams.imageList.push({
                            id: item.id,
                            Name: item.name,
                            viewUrl:item.viewUrl,
                            ThumbnailUrl: item.viewUrl ? Interface.pathUrl + item.viewUrl : '',
                            CreatedBy: item.createdByName,
                            CreatedOn: item.createdOn
                        })
                    } else if (item.fileExtension == 'pdf') {
                        item.icon = '/img/filetype/pdf.png';
                    } else if (item.fileExtension == 'txt') {
                        item.icon = '/img/filetype/TXT.png';
                    } else if (item.fileExtension == 'rar' || item.fileExtension == 'zip') {
                        item.icon = '/img/filetype/rar.png';
                    } else if (item.fileExtension == 'mp4' || item.fileExtension == 'avi') {
                        item.icon = '/img/filetype/video.png';
                    } else if (item.fileExtension == 'mp3') {
                        item.icon = '/img/filetype/voice.png';
                    } else if (item.fileExtension == 'folder') {
                        item.icon = '/img/filetype/Folder.png';
                    } else {
                        item.icon = '/img/filetype/File.png';
                    }
                    item['link'] = item.viewUrl ? Interface.pathUrl + item.viewUrl : '';
                    item['ThumbnailUrl'] = item.viewUrl ? Interface.pathUrl + item.viewUrl : '';
                    item.CreatedBy = item.createdByName;
                    item.CreatedOn = item.createdOn;
                    item.Name = item.name;
                    item.privilege = {
                        canEdit: true,
                        canAdmin: true,
                        canDelete: true,
                        canDownload: true,
                        canRead: true,
                        canShare: true,
                        canMove: true
                    };
                    if (item.fileActionsConfig) {
                        item.privilege = {
                            canEdit: item.fileActionsConfig.isEditable,
                            canAdmin: item.fileActionsConfig.isEditable,
                            canDelete: item.fileActionsConfig.isDeletable,
                            canDownload: true,
                            canRead: true,
                            canShare: item.fileActionsConfig.isShareable,
                            canMove: item.fileActionsConfig.canMove
                        };
                    }
                    data.detail = item;
                }

            })

        }
    })
}
getFileDetail();
const previewFile = () => {
    handleOpenFile(data.detail);
}
const handleOpenFile = (item) => {
    if (item.fileExtension == 'png' || item.fileExtension == 'jpg') {
        data.photoParams.id = item.id;
        data.photoParams.item = item;
        data.photoParams.index = 0;
        data.isPhoto = true;
    } else if (item.fileExtension == 'pdf') {
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
    } else if (
      item.fileExtension == "docx" ||
      item.fileExtension == "pptx" ||
      item.fileExtension == "xlsx" ||
      item.fileExtension == "doc" ||
      item.fileExtension == "ppt" ||
      item.fileExtension == "xls" || item.fileExtension == "wps"
  ) {
      item.viewUrl = "/lightning/r/office/view?id=" + item.id;
      openControlViewFile(
        item.id,
        item.createdByName,
        item.fileExtension,
        item.viewUrl,
        item.name
      );
    } else {
      downloadFile(item);
    }
};
//下载附件
const downloadFile = (item) => {
  let url = item.downloadUrl;
  window.open(url);
};
//预览office文件
const openControlViewFile = (id, username, type, link, name) => {
  var mhtmlHeight = window.screen.availHeight;//获得窗口的垂直位置;
  var mhtmlWidth = window.screen.availWidth; //获得窗口的水平位置; 
  var iTop = 0; //获得窗口的垂直位置;
  var iLeft = 0; //获得窗口的水平位置;
  //window.open('/#' + link + "&FileType=" + type + "&FileName=" + name + "&UserName=" + username);
  window.open('/#' + link + "&entityName=File", '', 'height=' + mhtmlHeight + ',width=' + mhtmlWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=yes,scrollbars=no,resizable=yes, location=no,status=no');
};
</script>
<style lang="less" scoped>
.detail-scroll {
    height: calc(~"100% - 95px") !important;

    .detail-bd {
        height: 100%;

        .tabContainer {
            width: 100%;
            height: 100%;
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;

            .detailContent {
                width: 100%;
                padding: 20px;
                background: #fff;
                border-radius: 4px;
                overflow: auto;
            }
        }
    }
}
</style>