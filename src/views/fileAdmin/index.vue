<template>
    <div class="wrapper">
        <div class="containerBox"  ref="contentRef">
            <div class="leftMenu" v-if="isLeft">
                <div class="leftMenuItem" :class="{'active':leftCurrent==index}"
                    @click="handleMenuClick(item,index)"
                    v-for="(item,index) in menus" :key="index">
                    <div class="menuIcon"><i :class="item.iconClass"></i></div>
                    <div class="name">{{item.name}}</div>
                </div>
            </div>
            <div class="rightContainer">
                <div class="sanlan" :class="{'active':!isLeft}" @click="handleLeftShow"></div>
                <div class="layoutBodyHead">
                    <div class="breadcrumb">
                        <!-- <span class="breadcrumbItem active">
                            <span class="name">{{menus[leftCurrent].name}}</span>
                        </span> -->
                        <span class="breadcrumbItem"
                                :class="{'active':idx==breadcrumbListLength}" v-for="(item,idx) in breadcrumbList" :key="idx"
                            @click="idx!=breadcrumbListLength?handleBreadcrumbItem(item,idx):''"
                            >
                            <span class="name">{{item.name}}</span>
                            <span clss="breadcrumbItemIcon" v-if="idx!=breadcrumbListLength">/</span>
                        </span>
                    </div>
                    <div class="rightBtns">
                        <a-button type="primary" @click="handleAddFolder">新建</a-button>
                    </div>
                </div>
                <div class="layoutBodyCenter">
                    <div class="mailListContainer">
                        <div class="form">
                            <a-form :model="formState">
                                <a-form-item name="Name">
                                    <a-input v-model:value="formState.Name" placeholder="请输入文件名称"></a-input>
                                </a-form-item>
                                <a-form-item class="timeForm">
                                    <a-range-picker v-model:value="formState.time" />
                                </a-form-item>
                                <a-form-item name="FileExtension">
                                    <a-select v-model="formState.FileExtension" placeholder="文件类型">
                                        <a-select-option v-for="(item,index) in fileTypes" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-form>
                            <div class="right-option">
                                <a-button type="primary">查询</a-button>
                                <a-button class="ml10" type="primary">重置</a-button>
                            </div>
                        </div>
                        <div class="tableWrapper">
                            <a-table :scroll="{ y: tableHeight }" :dataSource="listData" :columns="columns">
                                <template #bodyCell="{ column, record, index }">
                                    <template v-if="column.key=='number'">
                                        <div>
                                            {{index+1}}
                                        </div>
                                    </template>
                                    <template v-if="column.key=='sort'">
                                        <div class="sortImgs">
                                            <img :src="require('@/assets/img/Ascending2.png')" alt="">
                                            <img :src="require('@/assets/img/Descending2.png')" alt="">
                                        </div>
                                    </template>
                                    <template v-if="column.key=='fileExtension'">
                                        <div class="fileItem" @click="handleOpenFile(record)">
                                            <img :src="require('@/assets/img/filetype/doc.png')" v-if="record.fileExtension=='ocx'||record.fileExtension=='docx'||record.fileExtension=='doc'" />
                                            <img :src="require('@/assets/img/filetype/rar.png')" v-else-if="record.fileExtension=='rar'||record.fileExtension=='zip'" />
                                            <img :src="require('@/assets/img/filetype/Excel.png')" v-else-if="record.fileExtension=='xlsx'||record.fileExtension=='xls'" />
                                            <img :src="require('@/assets/img/filetype/pdf.png')" v-else-if="record.fileExtension=='pdf'" />
                                            <img :src="require('@/assets/img/filetype/TXT.png')" v-else-if="record.fileExtension=='TXT' || record.fileExtension=='txt'" />
                                            <img :src="require('@/assets/img/filetype/PPT.png')" v-else-if="record.fileExtension=='ppt'||record.fileExtension=='pptx'" />
                                            <img :src="require('@/assets/img/filetype/video.png')" v-else-if="record.fileExtension=='mp4'||record.fileExtension=='.mp4'" />
                                            <img :src="require('@/assets/img/filetype/defaultImg.png')" v-else-if="record.fileExtension=='jpg'||record.fileExtension=='png'||record.fileExtension=='gif'" />
                                            <img :src="require('@/assets/img/filetype/Folder.png')" v-else-if="record.type=='folder'" />
                                            <img :src="require('@/assets/img/filetype/File.png')" v-else/>
                                            <span class="fileName">{{record.name}}</span>
                                        </div>
                                    </template>
                                    <template v-if="column.key === 'fileSize'">
                                        <div>
                                            {{record.fileSize}}
                                        </div>
                                    </template>
                                    <template v-if="column.key === 'action'">
                                        <div>
                                            <a-dropdown trigger="click">
                                                <template #overlay>
                                                    <a-menu>
                                                      <a-menu-item>
                                                        编辑
                                                      </a-menu-item>
                                                      <a-menu-item @click="handleFileRename(record)">
                                                        重命名
                                                      </a-menu-item>
                                                      <a-menu-item @click="handleMoveFile(record)">
                                                        移动
                                                      </a-menu-item>
                                                      <a-menu-item @click="handleDeleteFile(record)">
                                                        删除
                                                      </a-menu-item>
                                                      <a-menu-item>
                                                        设置权限
                                                      </a-menu-item>
                                                    </a-menu>
                                                </template>
                                                <a-button :icon="h(EllipsisOutlined)"></a-button>
                                            </a-dropdown>
                                        </div>
                                    </template>
                                </template>
                            </a-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NewFolder :isShow="isNewFolder" :folderName="folderName" :folderPicker="folderPicker" @cancel="cancelNewModal" />
        <FileRename :isShow="isRename" :fileParams="fileParams" @cancel="cancelReName" />
        <FileMove :isShow="isFileMove" :fileParams="fileParams" @cancel="cancelFileMove" />
        <Delete :isShow="isDelete"  :fileParams="fileParams" @cancel="cancelDelete" />
        <SetPermissions :isShow="isSetPerm" />
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, h, toRaw, computed
    } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { SearchOutlined, MoreOutlined, CopyOutlined, SortAscendingOutlined, LeftOutlined, RightOutlined, PlusOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import NewFolder from "@/components/file/NewFolder.vue";
    // 重命名
    import FileRename from "@/components/file/FileRename.vue";
    // 移动
    import FileMove from "@/components/file/FileMove.vue";
    import Delete from "@/components/listView/Delete.vue";
    // 设置权限
    import SetPermissions from "@/components/file/SetPermissions.vue";

    import { formTreeData } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const formState = ({
        Name: "",
        startDate: "",
        endDate: "",
        FileExtension: ""
    })
    const time = ref();
    const columns = toRaw([
        {
            title: "#",
            dataIndex: "number",
            key: "number",
            width: 50
        },
        {
            title: "排序",
            dataIndex: "sort",
            key: "sort",
            width: 100
        },
        {
            title: "文件名称",
            dataIndex: "fileExtension",
            key: "fileExtension"
        },
        {
            title: "大小",
            dataIndex: "fileSize",
            key: "fileSize",
            width: 100
        },
        {
            title: "创建时间",
            dataIndex: "createdOn",
            key: "createdOn",
            width: 150
        },
        {
            title: "修改时间",
            dataIndex: "modifiedOn",
            key: "modifiedOn",
            width: 150
        },
        {
            title: "创建人",
            dataIndex: "createdByName",
            key: "createdByName",
            width: 100
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            width: 100
        }
    ])
    const data = reactive({
        isLeft: true,
        menus: [
            {
                name: '我的文件',
                iconClass: 'iconfont icon-wodewenjian',
                srchType: 'my',
                folderPicker: '10010000-0000-0000-0000-000000000001'
            },
            {
                name: '我的收藏',
                iconClass: 'iconfont icon-zhongyaoyoujian',
                srchType: 'favorite',
                folderPicker: '10010000-0000-0000-0000-000000000001'
            },
            {
                name: '最近使用',
                iconClass: 'iconfont icon-zuijinshiyong1',
                srchType: 'latestuse',
                folderPicker: '10010000-0000-0000-0000-000000000001'
            },
            {
                name: '共享文件',
                iconClass: 'iconfont icon-gongxiangwenjian',
                srchType: 'share',
                folderPicker: '10010000-0000-0000-0000-000000000003'
            }, {
                name: '单位文件',
                iconClass: 'iconfont icon-danweiwenjian',
                srchType: 'org',
                folderPicker: '10010000-0000-0000-0000-000000000002'
            }, {
                name: '流程归档',
                iconClass: 'iconfont icon-guidangmulu',
                srchType: 'archive',
                folderPicker: '10010000-0000-0000-0000-000000000303'
            }, {
                name: '回收站',
                iconClass: 'iconfont icon-huishouzhan',
                srchType: 'recycle',
                folderPicker: '10010000-0000-0000-0000-000000000303'
            }
        ],
        folderPicker: '10010000-0000-0000-0000-000000000001',
        leftCurrent: 0,
        fileTypes: [{ label: '图片(jpg)', value: 'jpg' }, { label: '图片(jpeg)', value: 'jpeg' }, { label: '图片(png)', value: 'png' }, { label: '文本(txt)', value: 'txt' }, { label: 'Word(docx)', value: 'docx' }, { label: 'Excel(xls)', value: 'xls' }, { label: 'PPT(pptx)', value: 'pptx' }, { label: 'ZIP(zip)', value: 'zip' }, { label: 'PDF(pdf)', value: 'pdf' }, { label: '视频(mp4)', value: 'mp4' }, { label: '音乐(mp3)', value: 'mp3' }],
        listData: [],
        breadcrumbList: [],
        tableHeight: "",
        isNewFolder: false,
        isRename: false,
        fileParams: {
            id: "",
            name: ""
        },
        isFileMove: false,
        isDelete: false,
        isSetPerm: true
    })
    const { isLeft, menus, leftCurrent, fileTypes, listData, breadcrumbList, tableHeight, isNewFolder,
         folderPicker, isRename, fileParams, isFileMove, isDelete, isSetPerm } = toRefs(data);

    const folderName = computed(()=>{
        return data.menus[data.leftCurrent].name;
    })
    const contentRef = ref(null);
    onMounted(()=>{
       console.log("contentRef.value.clientHeight",contentRef.value.clientHeight);
        data.tableHeight =  contentRef.value.clientHeight - 260 + 'px';
        window.addEventListener("resize",()=>{
            data.tableHeight =  contentRef.value.clientHeight - 260 + 'px';
        })
    })
    data.breadcrumbList[0] = {
        name: data.menus[0].name,
        srchType: data.menus[0].srchType
    }
    const breadcrumbListLength = computed(()=>{
        return data.breadcrumbList.length - 1;
    })
    const handleLeftShow = () => {
        data.isLeft = !data.isLeft;
    }
    const getQuery = () => {
        proxy.$get(Interface.file.list,{}).then(res=>{
            console.log("res",res);
            let files = res.files.map(item=>{
                item.type = 'file';
                return item;
            });
            let folders = res.folders.map(item=>{
                item.type = 'folder';
                return item;
            });
            data.listData = files.concat(folders);
        })
    }
    getQuery();
    const handleMenuClick = (item,index) => {
        data.leftCurrent = index;
        data.folderPicker = item.folderPicker;
    }
    // 面包屑切换
    const handleBreadcrumbItem = (item,idx) => {
        data.breadcrumbList = data.breadcrumbList.slice(0, idx + 1);
    }
    const handleOpenFile = (item) => {
        console.log("item",item);
        if(item.type=='folder'){
            console.log("123");
            data.breadcrumbList.push({
                name: item.name,
                type: item.type,
                id: item.id
            })
            handleChild(item.id);
            
        }
    }
    const handleChild = () => {
        proxy.$get(Interface.file.child,{}).then(res=>{
            console.log("res",res);
            let files = res.files.map(item=>{
                item.type = 'file';
                return item;
            });
            let folders = res.folders.map(item=>{
                item.type = 'folder';
                return item;
            });
            data.listData = files.concat(folders);
        })
    }
    const handleAddFolder = () => {
        data.isNewFolder = true;
    }

    const cancelNewModal = (e) => {
        data.isNewFolder = e;
    }
    const handleFileRename = (item) => {
        data.fileParams = {
            id: item.id,
            name: item.name
        };
        data.isRename = true;
    }
    const cancelReName = (e) => {
        data.isRename = e;
    }
    // 移动
    const handleMoveFile = (item) => {
        data.fileParams = {
            id: item.id,
            name: item.name
        }
        data.isFileMove = true;
    }
    // 删除
    const handleDeleteFile = (item) => {
        data.fileParams = {
            id: item.id,
            name: item.name
        }
        data.isDelete = true;
    }
    const cancelDelete = (e) => {
        data.isDelete = e;
    }
    const cancelFileMove = (e) => {
        data.isFileMove = e;
    }
</script>
<style lang="less" scoped>
    .wrapper {
        width: 100%;
        height: 100%;

        .containerBox {
            width: 100%;
            height: 100%;
            display: flex;
            .leftMenu {
                min-width: 116px;
                width: 116px;
                height: 100%;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                padding: 8px;
                box-sizing: border-box;
                background: #fff;
                .leftMenuItem {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    display: flex;
                    align-items: center;
                    color: #4e5969;
                    background: #fff;
                    cursor: pointer;
                    box-sizing: border-box;
                    margin-bottom: 4px;
                    border-radius: 2px;
                    .menuIcon {
                        .iconfont {
                            font-size: 14px;
                            padding-left: 10px;
                            font-weight: initial;
                        }
                    }

                    .name {
                        padding-left: 8px;
                    }

                    &:hover {
                        background: #f2f3f5;
                    }

                    &.active {
                        color: var(--textColor);
                        background: #f2f3f5;
                        opacity: .8;
                    }
                }
            }

            .rightContainer {
                flex: 1;
                width: calc(~"100% - 116px");
                height: 100%;
                padding: 16px 20px;
                background: #fff;
                border-left: 1px solid #e5e6eb;
                box-sizing: border-box;
                position: relative;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                .layoutBodyHead{
                    min-height: 40px;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #e5e6eb;
                    .breadcrumb{
                        line-height: 40px;
                        .breadcrumbItem{
                            font-size: 14px;
                            padding-left: 10px;
                            &.active{
                                color: #1d2129;
                                font-weight: bold;
                                cursor: initial;
                            }
                            &:hover{
                                .name{
                                    cursor: pointer;
                                    color: var(--textColor);
                                }
                            }
                            &.active:hover{
                                .name{
                                    cursor: unset;
                                    color: #1d2129;
                                }
                            }
                        }
                    }
                }
                .layoutBodyCenter{
                    height: calc(~"100% - 50px");
                    padding: 20px 0 0 0;
                    .mailListContainer{
                        height: 100%;
                        .form{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .ant-form{
                                display: flex;
                                .ant-form-item{
                                    width: 200px;
                                    margin-right: 12px;
                                }
                                .ant-form-item.timeForm{
                                    width: 300px;
                                }
                            }
                        }
                        .tableWrapper{
                        }
                    }
                }
            }
        }
    }

    .sanlan {
        width: 18px;
        height: 60px;
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -30px;
        z-index: 11;
        cursor: pointer;
        background: url("~@/assets/img/leftTree-show.png") no-repeat -2px 0;
    }

    .sanlan:hover {
        background: url("~@/assets/img/leftTree-show-hover.png") no-repeat -2px 0;
    }

    .sanlan.active {
        background: url("~@/assets/img/leftTree-hide.png") no-repeat -2px 0;
    }

    .sanlan.active:hover {
        background: url("~@/assets/img/leftTree-hide-hover.png") no-repeat -2px 0;
    }
    .sortImgs{
        img{
            width: 16px;
            height: 16px;
            margin-right: 5px;
            cursor: pointer;
        }
    }
    .fileItem{
        display: flex;
        align-items: center;
        cursor: pointer;
        img{
            width: 32px;
            height: 32px;
            margin-right: 10px;
        }
    }
</style>