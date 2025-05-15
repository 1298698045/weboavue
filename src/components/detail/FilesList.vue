<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-bd">
                <div class="opreaHead">
                    <div class="actions-btns">
                        <a-button class="ml10" v-if="selectedRowKeys.length">批量下载</a-button>
                        <a-button class="ml10" @click="handleOpenCheckbox">{{ !isCheckbox ? "选择" : "取消选择"}}</a-button>
                        <a-upload v-model:file-list="fileList" :headers="headers" :data="uploadData" :action="Interface.uploadFiles"
                            :showUploadList="false" multiple name="files" @change="handleChange">
                            <a-button class="ml10">上传</a-button>
                        </a-upload>
                    </div>
                    <div class="tools">
                        <a-input placeholder="搜索此列表..." style="width: 240px;" v-model:value="searchVal"
                            @pressEnter="handleSearch">
                            <template #prefix>
                                <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search"
                                    aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                    <g>
                                        <path
                                            d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                                        </path>
                                    </g>
                                </svg>
                            </template>
                        </a-input>
                        <a-dropdown class="ml10" :trigger="['click']">
                            <a-button class="ant-btn-icon">
                                <svg class="btn_icon" focusable="false" data-key="table" aria-hidden="true"
                                    viewBox="0 0 520 520" part="icon">
                                    <g>
                                        <path
                                            d="M465 20H55c-8 0-15 7-15 15v50c0 8 7 15 15 15h410c8 0 15-7 15-15V35c0-8-7-15-15-15zM145 140H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 240H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 340H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 440H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15z">
                                        </path>
                                    </g>
                                </svg>
                                <svg class="btn_icon btn_icon_small" focusable="false" data-key="down"
                                    aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                    <g>
                                        <path
                                            d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z">
                                        </path>
                                    </g>
                                </svg>
                            </a-button>
                            <template #overlay>
                                <a-menu class="fh-menu listViewMenu" style="width: 136px;" @click="handleSwitchType">
                                    <span class="fh-menu-desc" style="font-weight: bold;">选择列表显示</span>
                                    <a-menu-item class="listView-menuItem" key="list">
                                        <span class="successIcon">
                                            <svg v-if="type == 'list'" focusable="false" aria-hidden="true"
                                                viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u="" data-key="check"
                                                class="iconSvg">
                                                <g lwc-1e39mgvor8u="">
                                                    <path
                                                        d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"
                                                        lwc-1e39mgvor8u=""></path>
                                                </g>
                                            </svg>
                                        </span>
                                        <span class="text">
                                            列表
                                        </span>
                                        <span class="listView-img">
                                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                                lwc-798fdvkdslc="" data-key="table" class="iconSvg">
                                                <g lwc-798fdvkdslc="">
                                                    <path
                                                        d="M465 20H55c-8 0-15 7-15 15v50c0 8 7 15 15 15h410c8 0 15-7 15-15V35c0-8-7-15-15-15zM145 140H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 240H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 340H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 440H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15z"
                                                        lwc-798fdvkdslc=""></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </a-menu-item>
                                    <a-menu-item class="listView-menuItem" key="card">
                                        <span class="successIcon">
                                            <svg v-if="type == 'card'" focusable="false" aria-hidden="true"
                                                viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u="" data-key="check"
                                                class="iconSvg">
                                                <g lwc-1e39mgvor8u="">
                                                    <path
                                                        d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"
                                                        lwc-1e39mgvor8u=""></path>
                                                </g>
                                            </svg>
                                        </span>
                                        <span class="text">
                                            卡片
                                        </span>
                                        <span class="listView-img">
                                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                                lwc-7ieqdqdoapk="" data-key="kanban" class="iconSvg">
                                                <g lwc-7ieqdqdoapk="">
                                                    <path
                                                        d="M320 175c0-8-7-15-15-15h-90c-8 0-15 7-15 15v270c0 8 7 15 15 15h90c8 0 15-7 15-15zm-180 0c0-8-7-15-15-15H35c-8 0-15 7-15 15v310c0 8 7 15 15 15h90c8 0 15-7 15-15zm360 0c0-8-7-15-15-15h-90c-8 0-15 7-15 15v230c0 8 7 15 15 15h90c8 0 15-7 15-15zm0-140c0-8-7-15-15-15H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h450c8 0 15-7 15-15z"
                                                        lwc-7ieqdqdoapk=""></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
                <div class="panel-bd-container">
                    <div v-if="type == 'list'">
                        <!--  :scroll="{ y: tableHeight }" -->
                        <a-table :columns="columns" :dataSource="listData" :pagination="false"
                            @change="handleTableChange" :row-selection="rowSelection" :customRow="rowClick">
                            <template #bodyCell="{ column, index, record }">
                                <template v-if="column.key === 'index'">
                                    <div>
                                        {{ index + 1 }}
                                    </div>
                                </template>
                                <template v-if="column.key === 'fileExtension'">
                                    <div class="FileExtensionTdImg">
                                        <img :src="require('@/assets/img/filetype/doc.png')"
                                            v-if="record.fileExtension == 'ocx' || record.fileExtension == 'docx' || record.fileExtension == 'doc'" />
                                        <img :src="require('@/assets/img/filetype/rar.png')"
                                            v-else-if="record.fileExtension == 'rar' || record.fileExtension == 'zip'" />
                                        <img :src="require('@/assets/img/filetype/Excel.png')"
                                            v-else-if="record.fileExtension == 'xlsx' || record.fileExtension == 'xls'" />
                                        <img :src="require('@/assets/img/filetype/pdf.png')"
                                            v-else-if="record.fileExtension == 'pdf'" />
                                        <img :src="require('@/assets/img/filetype/TXT.png')"
                                            v-else-if="record.fileExtension == 'TXT' || record.fileExtension == 'txt'" />
                                        <img :src="require('@/assets/img/filetype/PPT.png')"
                                            v-else-if="record.fileExtension == 'ppt' || record.fileExtension == 'pptx'" />
                                        <img :src="require('@/assets/img/filetype/video.png')"
                                            v-else-if="record.fileExtension == 'mp4' || record.fileExtension == '.mp4'" />
                                        <img :src="require('@/assets/img/filetype/defaultImg.png')"
                                            v-else-if="record.fileExtension == 'jpg' || record.fileExtension == 'png' || record.fileExtension == 'gif'" />
                                        <img :src="require('@/assets/img/filetype/File.png')" v-else />
                                        <span>{{ record.fileExtension || '' }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Action'">
                                    <div class="iconBox" @click.stop>
                                        <a-dropdown :trigger="['click']">
                                            <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520"
                                                fill="none" role="presentation" data-v-69a58868="">
                                                <path
                                                    d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                                    fill="#747474" data-v-69a58868=""></path>
                                            </svg>
                                            <template #overlay>
                                                <a-menu class="fh-menu">
                                                    <a-menu-item key="1"
                                                        @click.stop="handlePreviewFile(record)">查看</a-menu-item>
                                                    <a-menu-item key="2"
                                                        @click.stop="handleRename(record)">重命名</a-menu-item>
                                                    <a-menu-item key="3"
                                                        @click.stop="handleDelete(record)">删除</a-menu-item>
                                                    <a-menu-item key="4"
                                                        @click.stop="downloadFile(record)">下载</a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </div>
                                </template>
                            </template>
                        </a-table>
                    </div>
                    <FilesCard ref="filesCardRef" :isCheckbox="isCheckbox" :parentId="parentId" @preview="handlePreviewFile" @rename="handleRename"
                    @delete="handleDelete" @down="downloadFile" @change="selectFiles" v-else></FilesCard>
                </div>
            </div>
        </div>
        <ConfirmModal :isShow="isConfirm" v-if="isConfirm" :desc="confirmText" @cancel="isConfirm=false"
            @ok="deleteFile" />
        <Rename v-if="isRename" :isShow="isRename" :name="fileName" :id="recordId" fieldName="Name"
            :sObjectName="sObjectName" objTypeCode="1001" @cancel="isRename=false" @success="renameLoad" />
        <ImageView v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto = false" />
        <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
        <TxtView v-if="isTxt" :isShow="isTxt" :txtParams="txtParams" @cancel="isTxt = false" />
    </div>
</template>
<script setup>
    import "@/style/common.less";
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
        h,
        nextTick,
    } from "vue";
    import {
        SwapLeftOutlined,
        SwapRightOutlined,
        ArrowUpOutlined,
        ArrowDownOutlined,
        CheckCircleOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";

    import Interface from "@/utils/Interface.js";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import Delete from "@/components/listView/Delete.vue";
    import ConfirmModal from "@/components/commonModal/Confirm.vue";
    import ImageView from "@/components/file/ImageView.vue";
    import PdfView from "@/components/file/PdfView.vue";
    import TxtView from "@/components/file/TxtView.vue";

    import Rename from "@/components/commonModal/Rename.vue";
    import FilesCard from "./FilesCard.vue";
    
    const { proxy } = getCurrentInstance();

    const props = defineProps({
        processInstanceId: String,
        preview: [Number, String],
        attachPerm: Object,
        parentId: String,
        entityName: String,
    });
    const emit = defineEmits(["load"]);
    const filesCardRef = ref(null);
    let columns = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 80,
        },
        {
            title: "类型",
            dataIndex: "fileExtension",
            key: "fileExtension",
            width: 200,
        },
        {
            title: "名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "大小",
            dataIndex: "size",
            key: "size",
            width: 200,
        },
        {
            title: "创建时间",
            dataIndex: "createdOn",
            key: "createdOn",
            width: 200,
        },
        {
            title: "创建人",
            dataIndex: "createdByName",
            key: "createdByName",
            width: 200,
        },
        {
            title: "操作",
            key: "Action",
            width: 120,
        },
    ];
    const token = localStorage.getItem("token");

    const data = reactive({
        fileList: [],
        listData: [],
        searchVal: "",
        isCommon: false,
        total: 0,
        tableHeight: 0,
        recordId: '',
        objectTypeCode: '1001',
        sObjectName: 'RelatedAttachment',
        isDelete: false,
        deleteDesc: '确定要删除吗？',
        external: false,
        isConfirm: false,
        confirmText: '',
        confirmTitle: '',
        uploadData: {
            parentId: props.parentId,
            entityName: props.entityName
        },
        headers: {
            Authorization: token,
            Token: token,
        },
        ImageList: [],
        isPhoto: false,
        isPdf: false,
        photoParams: {},
        pdfParams: {},
        isRename: false,
        fileName: "",
        isTxt: false,
        txtParams: {},
        type: "card",
        pageNumber: 1,
        pageSize: 10,
        selectedRowKeys: [],
        isCheckbox: false
    });
    const columnList = toRaw(columns);
    const { isTxt, txtParams, listData, height, searchVal, pagination,
    tableHeight, recordId, objectTypeCode, sObjectName, isDelete, isCommon, isTaskDetail, isShare, deleteDesc, external,
    isConfirm, confirmText, confirmTitle,
    uploadData, headers, ImageList, isPhoto, isPdf, photoParams, pdfParams, isRename, fileName, type,
    pageNumber, pageSize, selectedRowKeys, fileList, isCheckbox } = toRefs(data);
    
    const handleOpenCheckbox = () => {
        data.isCheckbox = !data.isCheckbox;
    };
    const getQuery = () => {
        if(data.type == 'card'){
            nextTick(()=>{
                filesCardRef.value.getQuery();
            })
        }
        let url = Interface.getFiles;
        let d = {
            // parentId: "D9950482-F5E4-4AD9-B1A3-13AE9335E633",
            parentId: props.parentId,
            page: data.pageNumber,
            rows: data.pageSize,
            search: data.searchVal
        }
        proxy.$post(url, d).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
                data.total = res.actions[0].returnValue.length || 0;
                for (var i = 0; i < res.actions[0].returnValue.length; i++) {
                    var item = res.actions[0].returnValue[i];
                    let size = item.fileSize;
                    size = size ? (size * 1 / 1024).toFixed(2) : 0;
                    size = size + 'kb';
                    let name = item.name || '';
                    if (name) {
                        name = name.replaceAll('.' + item.fileExtension, '');
                    }
                    item.key = item.id;
                    item.size = size;
                    item.url = '/' + props.entityName + '/' + item.id + '/' + name;
                }
            }
            data.listData = res.actions[0].returnValue;
            data.ImageList = data.listData.filter(item => {
                return item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png';
            });
        })
    };
    getQuery();

    const renameLoad = () => {
        data.isRename = false;
        getQuery();
    }
    const rowSelection = ref({
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            data.selectedRowKeys = selectedRowKeys;
        },
        getCheckboxProps: record => ({

        })
    });
    const rowClick = (record) => {
        return {
            onClick: (columns) => {
                const rec = record;
                console.log(rec)
                handlePreviewFile(rec);
            }
        }
    }

    //预览附件
    const handlePreviewFile = (item) => {
        let url = '';
        if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
            let index = 0;
            for (var i = 0; i < data.ImageList.length; i++) {
                let row = data.ImageList[i];
                if (row.id == item.id) {
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
            data.pdfParams = {
                id: item.id,
                name: item.name,
                index: 0,
                viewUrl: item.viewUrl,
                downloadUrl: item.downloadUrl
            };
            data.isPdf = true;
        }
        else if (item.fileExtension == 'txt') {
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
        item.fileExtension == "xls"
        ) {
        if(item.viewUrl&&item.viewUrl.indexOf('/lightning/r/office/view')!=-1){}else{
          item.viewUrl='/lightning/r/office/view?id='+item.id;
        }
        if(item.fileExtension == "ppt" ||item.fileExtension == "pptx"){
          item.viewUrl='/lightning/r/office/view2?id='+item.id;
        }
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
    //预览office文件
    const openControlViewFile = (id, username, type, link, name) => {
        var mhtmlHeight = window.screen.availHeight;//获得窗口的垂直位置;
        var mhtmlWidth = window.screen.availWidth; //获得窗口的水平位置; 
        var iTop = 0; //获得窗口的垂直位置;
        var iLeft = 0; //获得窗口的水平位置;
        //window.open('/#' + link + "&FileType=" + type + "&FileName=" + name + "&UserName=" + username);
        window.open('/#' + link + "&entityName=RelatedAttachment", '', 'height=' + mhtmlHeight + ',width=' + mhtmlWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=yes,scrollbars=no,resizable=yes, location=no,status=no');
    };
    const downloadFile = (item) => {
        let url = item.downloadUrl;
        window.open(url);
    }
    //删除附件
    const deleteFile = () => {
        let d = {
            actions: [{
                id: "4105;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    parentId: props.parentId,
                    entityName: data.sObjectName,
                    fileId: data.recordId
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.deleteFiles, obj).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
                message.success("删除成功！");
                data.isConfirm = false;
                getQuery();
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
    const onSearch = (e) => {
        data.isDelete = false;
        data.isShare = false;
        getQuery();
    };
    const changeRangeDate = (e) => {
        //console.log("e",e,item);
        if (e && e.length) {
            data.Checkin = e.join(',');
            data.Checkin1 = e[0];
            data.Checkin2 = e[1];
        }
        else {
            data.Checkin = '';
        }
    }
    //改变页码
    const handleTableChange = (page, pageSize) => {
        data.pageNumber = page;
        data.pageSize = pageSize;
        getQuery();
    }
    const sizeChange = (current, size) => {
        handleTableChange(current, size)
    }
    //删除
    const handleDelete = (item) => {
        data.recordId = item.id;
        data.confirmText = '确定要删除吗？'
        data.confirmTitle = '删除'
        data.isConfirm = true;
    }
    //删除关闭
    const cancelDelete = (e) => {
        data.isDelete = false;
    };
    //新建
    const handleNew = (e) => {
        data.recordId = '';
        //data.isShare = true;
    }
    //编辑
    const handleEdit = (key) => {
        data.recordId = key;
        //data.isShare = true;
    }
    // 通用弹窗关闭
    const handleCommonCancel = (params) => {
        data.isCommon = false;
    };
    //去重
    const unique = (list) => {
        for (var i = 0; i < list.length; i++) {
            for (var j = i + 1; j < list.length; j++) {
                if (list[i].uid == list[j].uid) {
                    list.splice(j, 1)
                    j--;
                }
            }
        }
        return list;
    }
    const beforeUpload = (e) => {
        //执行顺序1
        console.log("beforeUpload", e);
    }
    const handleChange = (e) => {
        if (e.file.status == "done") {
            message.success("上传成功！");
            getQuery();
        }
    }
    onMounted(() => {

    })
    const handleRenameCancel = () => {
        data.isRename = false;
    }
    const handleRename = (item) => {
        console.log(item)
        data.recordId = item.id;
        data.fileName = item.name;
        data.isRename = true;
    }

    const handleSearch = (e) => {
        getQuery();
    };
    const handleSwitchType = (e) => {
        console.log("e", e);
        data.type = e.key;
    }
    const selectFiles = (e) => {
        data.selectedRowKeys = e;
    }
</script>
<style lang="less" scoped>
    .panel{
        padding-top: 0;
    }
    .iconBox .moreaction {
        padding: 0px 1px;
        width: 18px;
        border: 1px solid #dedede;
        border-radius: 4px;
        position: relative;
        top: 1px;
    }

    .iconBox .popup {
        top: 25px;
        right: 0;
        width: max-content;
        min-width: 88px;
    }

    .opreaHead {
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: end;

        .actions-btns {
            padding-bottom: 10px;
        }
    }

    .FileExtensionTdImg {
        display: flex;
        align-items: center;

        img {
            width: 40px;
            height: 40px;
            margin-top: 4px;
            margin-right: 6px;
        }
    }
</style>