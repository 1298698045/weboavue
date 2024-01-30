<template>
    <div class="emailWrap">
        <div class="emailHeader">
            <div class="emailLogo">
                <MailOutlined />
                <span class="logoText">邮件</span>
            </div>
            <div class="emailSearch"></div>
            <div class="return">返回OA</div>
        </div>
        <div class="emailBd">
            <div class="emailContainer">
                <div class="leftContainer">
                    <div class="leftNavPaneWrap" v-if="isFold">
                        <a-button type="primary" block> 写邮件 </a-button>
                        <div class="leftEmailScroll">
                            <ul class="emailMenuWrap">
                                <li class="emailItem" v-for="(item, index) in navList" :key="index">
                                    <div class="emailItemRow" @click="handleOpen(item, index)">
                                        <div class="emailItemTitle">
                                            <div class="leftIcon">
                                                <i class="iconfont icon-xiala" :class="{ active: !item.isBook }"
                                                    v-if="item.children.length > 0"></i>
                                            </div>
                                            <span class="name">{{ item.name }}</span>
                                            <p class="addIcon" v-if="item.isAdd" @click.stop="handleAddTab(item, index)">
                                                <i class="iconfont icon-tianjia"></i>
                                            </p>
                                        </div>
                                    </div>
                                    <transition>
                                        <div class="menuChildren" v-if="item.children.length > 0 && item.isBook">
                                            <div class="menuChildItem" :class="{ active: self.ltags == ltags }"
                                                @click="handleTypeEmail(self, idx)" v-for="(self, idx) in item.children"
                                                :key="idx">
                                                <div class="leftIcon">
                                                    <i class="iconfont" :class="self.iconClass"></i>
                                                </div>
                                                <p class="name">{{ self.name }}</p>
                                                <div class="option" v-if="item.isAdd">
                                                    <span @click.stop="
                                handleRenameFolder(item, self, idx, index)
                              " style="padding-right: 5px">
                                                        <i class="iconfont icon-bianji"></i>
                                                    </span>
                                                    <span @click.stop="handleDelFolder(self, idx)">
                                                        <i class="iconfont icon-yishanchu"></i>
                                                    </span>
                                                </div>
                                                <div class="emailNum" v-if="!item.isAdd">
                                                    <span class="num">{{ self.num || "" }}</span>
                                                    <i class="iconfont icon-gengduobiaoqian moreIcon"></i>
    
                                                    <div class="dropMenuWapper leftMoreDrop"
                                                        v-if="item.hasOwnProperty('isFolder')">
                                                        <div class="dropOptionList">
                                                            <div class="dropOptionItem"
                                                                @click.stop="handleDelFolder(self, idx)">
                                                                <span class="nameText">删除</span>
                                                            </div>
                                                            <div class="dropOptionItem" @click.stop="
                                    handleRenameFolder(item, self, idx, index)
                                  ">
                                                                <span class="nameText">重命名</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="dropMenuWapper leftMoreDrop" v-else>
                                                        <div class="dropOptionList">
                                                            <div class="dropOptionItem">
                                                                <span class="nameText">全部标记已读</span>
                                                            </div>
                                                            <div class="dropOptionItem">
                                                                <span class="nameText">标记全部邮件</span>
                                                                <span class="rightIcon">
                                                                    <i class="iconfont icon-xiala rotate90deg"></i>
                                                                </span>
                                                            </div>
                                                            <div class="dropOptionItem">
                                                                <span class="nameText">移动全部邮件</span>
                                                                <span class="rightIcon">
                                                                    <i class="iconfont icon-xiala rotate90deg"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="dropOptionList">
                                                            <div class="dropOptionItem">
                                                                <span class="nameText">下移</span>
                                                            </div>
                                                        </div>
                                                        <div class="dropOptionList">
                                                            <div class="dropOptionItem">
                                                                <span class="nameText">清空此文件夹</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                    <div class="addTabsWrap" v-if="item.isAddTabs">
                                        <el-input v-model="folderText"  :ref="(el) => setItemRefs(el,index)"></el-input>
                                        <div class="rightIcon">
                                            <span class="radiusIcon" @click.stop="handleConfirm(item, index)">
                                                <i class="iconfont icon-duigou"></i>
                                            </span>
                                            <span class="radiusIcon" @click.stop="handleClose(item, index)">
                                                <i class="iconfont icon-guanbi"></i>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="leftNavIconWrap" v-else>
                        <div class="squareBtn"  @click="handleWriteEmail"><i class="iconfont icon-tianjia"></i></div>
                        <div class="navIconBox">
                            <i class="iconfont icon-sousuo"></i>
                        </div>
                        <a-tooltip title="收件箱" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-shoujianxiang"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="跟进事项" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-genjinshixiang"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="完成事项" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-wanchengshixiang"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="重要邮件" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-zhongyaoyoujian"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="群邮件" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-qunyoujian"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="未读邮件" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-weiduyoujian"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="草稿箱" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-caogaoxiang1"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="已发送" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-yifasong"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="已删除" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-yishanchu"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="邮件文件夹" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-youjianwenjianjia"></i>
                            </div>
                        </a-tooltip>
                        <a-tooltip title="标签" placement="bottom">
                            <div class="navIconBox">
                                <i class="iconfont icon-biaoqian"></i>
                            </div>
                        </a-tooltip>
                    </div>
                </div>
                <div class="rightContainer">
                    <div class="mailListWrap">
                        <div class="mailHeader">
                            <a-tooltip class="foldIcon" placement="top" :title="isFold?'收起文件夹栏':'展开文件夹栏'">
                                <div class="btnText foldIcon" v-if="!isEdit" @click="handleFoldIcon">
                                    <i class="iconfont icon-shouqiwenjianjialan" :class="{active:!isFold}"></i>
                                </div>
                                <div v-else>
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                </div>
                            </a-tooltip>
                            <div class="titleBox">
                                <button class="btnText">
                                    全部邮件(2)
                                    <i class="iconfont icon-xiala"></i></button>
                                <div class="dropMenuWapper mailDropWrap">
                                    <div class="dropMenu">
                                        <div class="dropMenuItem"><span class="name">全部邮件</span></div>
                                        <div class="dropMenuItem"><span class="name">未读邮件</span></div>
                                        <div class="dropMenuItem"><span class="name">已读邮件</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="rightBtn">
                                <button class="btnText" @click="handleEditEmail">
                                    {{isEdit ? '取消' : '编辑'}}
                                </button>
                            </div>
                        </div>
                        <div class="mailListContent">
                            <div class="empty" v-if="inboxList==''">
                                该标签下没有邮件！
                            </div>
                            <el-checkbox-group v-model="checkList" @change="changeCheckbox">

                                <div class="mailContentItem" :class="{active:item.emailId==emailId}"
                                    v-for="(item,index) in inboxList" :key="index" @mouseenter="handleMouseover(item,index)"
                                    @mouseleave="handleMouseout(item,index)" @click="handleRowEmail(item,index)">
                                    <p @click.stop v-if="item.isBook">
                                        <el-checkbox class="checkbox" :label="item.emailId"
                                            :value="item.emailId"></el-checkbox>
                                    </p>
                                    <a-tooltip placement="top" title="点击标记未读">
                                        <span class="readElement" :class="{active:item.isRead}"
                                            @click.stop="handleRowRead(item)"></span>
                                    </a-tooltip>
                                    <div class="avatar">
                                        <i class="iconfont icon-morentouxiang"></i>
                                    </div>
                                    <div class="rightInfo">
                                        <div class="nameRow">
                                            <span class="name" :class="{active:!item.isRead}">{{item.fromName || ''}}</span>
                                            <div class="right">
                                                <span :class="{'active':item.isStar}"
                                                    @click.stop="handleItemStarEmail(item)">
                                                    <i v-if="item.isStar" class="iconfont icon-shoucangyoujian"
                                                        style="color:#F7BA1E;opacity:1;"></i>
                                                    <i v-else class="iconfont icon-zhongyaoyoujian"></i>
                                                </span>
                                                <span style="visibility: visible;margin-left: 5px;" v-if="item.isAttach">
                                                    <i class="iconfont icon-fujianwenjian"></i>
                                                </span>
                                                <a-tooltip placement="top" :title="item.createdOn">
                                                    <div class="timer">
                                                        <i class="iconfont icon-fujian"></i>
                                                        {{item.createdOn || ''}}
                                                    </div>
                                                </a-tooltip>
                                            </div>
                                        </div>
                                        <div class="theme rowEllipsis" :class="{active:!item.isRead}">
                                            <a-tooltip :title="item.subject || '无主题'" placement="bottom">
                                                <span>
                                                    {{item.subject || '[无主题]'}}
                                                </span>
                                            </a-tooltip>
                                        </div>
                                        <div class="desc rowEllipsis">
                                            {{item.content || '此邮件没有文字内容'}}
                                        </div>
                                    </div>
                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="emptyContent" v-if="!isDetail">
                        <div class="emptyContentbox">未选择邮件</div>
                    </div>
                    <!-- 邮件详情 -->
                    <div class="mailContainerWrap inboxContainer" v-if="isDetail">
                        <email-detail :emailId="emailId"></email-detail>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/oldIcon/iconfont.css";
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
        nextTick
    } from "vue";
    import {
        SearchOutlined,
        DeleteOutlined,
        MailOutlined,
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import EmailDetail from "@/components/email/EmailDetail.vue";
    import Interface from "@/utils/Interface.js";

    const { proxy } = getCurrentInstance();
    const data = reactive({
        navList: [
            {
                name: "内部邮件",
                isBook: true,
                children: [
                    {
                        name: "收件箱",
                        num: "",
                        iconClass: "icon-shoujianxiang",
                        ltags: "inbox",
                    },
                    {
                        name: "重要邮件",
                        num: "",
                        iconClass: "icon-zhongyaoyoujian",
                        ltags: "star",
                    },
                    {
                        name: "群邮件",
                        num: "",
                        iconClass: "icon-qunyoujian",
                        ltags: "group",
                    },
                    {
                        name: "未读邮件",
                        num: "",
                        iconClass: "icon-weiduyoujian",
                        ltags: "unread",
                    },
                    {
                        name: "草稿箱",
                        num: "",
                        iconClass: "icon-caogaoxiang1",
                        ltags: "draft",
                    },
                    {
                        name: "已发送",
                        num: "",
                        iconClass: "icon-yifasong",
                        ltags: "sent",
                    },
                    {
                        name: "已删除",
                        num: "",
                        iconClass: "icon-yishanchu",
                        ltags: "Deleted",
                    },
                ],
            },
            {
                name: "邮箱文件夹",
                isBook: true,
                isAdd: true,
                isAddTabs: false,
                isFolder: "1",
                children: [],
            },
        ],
        ltags: "inbox",
        emailId: "",
        folderId: "",
        inboxList: [],
        emailTotal: 0,
        emailListAll: [],
        folderList: [],
        folderText: "",
        renameFolderId: "",
        isEdit: false,
        checkList: [],
        checkAll: [],
        isIndeterminate: false,
        isFold: true,
        isDetail: false,
        emailIndex: 0,
        pageNumber: 1,
        pageSize: 20
    });
    const { navList, ltags, emailId, folderId, inboxList, emailTotal, emailListAll,
         folderList, folderText, renameFolderId, isEdit, checkList, checkAll, isIndeterminate, isFold, 
         isDetail, emailIndex, pageNumber, pageSize } = toRefs(data);
    let itemRefs = [];
    const handleTypeEmail = (item, index) => {
        console.log(item, index);
        data.ltags = item.ltags;
        data.emailId = "";
        if (data.ltags.indexOf("folder") != -1) {
            data.folderId = item.Id;
        }
        getInboxList();
    };
    const handleOpen = (item, index) => {
        item.isBook = !item.isBook;
        item.isAddTabs = false;
    }

    // 获取邮件列表
    const getInboxList = () => {
        proxy.$get(Interface.email.inboxList, {
            ltags: data.ltags,
            search: '',
            pageNumber: data.pageNumber,
            pageSize: data.pageSize
        }).then(res => {
            data.inboxList = res.data;
            data.inboxList.forEach(function (item) {
                data.isBook = false;
                if (item.toUserNames) {
                    if (item.toUserNames.slice(item.toUserNames.length - 1) == ',') {
                        var name = item.toUserNames.slice(0, item.toUserNames.length - 1)
                        data.fromName = name;
                    }
                }
            })
            data.emailTotal = res.totalRecords;
            if (res.data.length > 0) {

            } else {
                data.emailId = '';
            }
            data.emailListAll = data.emailListAll.concat(data.inboxList);
            data.emailListAll = unique(data.emailListAll)
        })
    }
    getInboxList();
    // 获取我的文件夹
    const getMyFolder = () => {
        proxy.$get(Interface.email.myEmailFolder,{}).then(res=>{
            data.folderList = res.data;
            var result = [];
            result = res.data.map(function (item,index) {
                item.name = item.Name;
                item.id = item.Id;
                item.num = '';
                item.iconClass = '';
                item.ltags = 'folder_'+index;
                item.folderId = item.Id;
                return item;
            })
            data.navList[1].children = result
        })
    }
    getMyFolder();
    const unique = (list) => {
        for (var i = 0; i < list.length; i++) {
            for (var j = i + 1; j < list.length; j++) {
                if (list[i].emailId == list[j].emailId) {
                    list.splice(j, 1)
                    j--;
                }
            }
        }
        return list;
    }

    const handleAddTab = (item,index) => {
        if(item.children.length>0){
            item.isBook = true
        }
        item.isAddTabs = true;
        nextTick(()=>{
            itemRefs[0].el.focus();
            itemRefs = [];
        })
    }
    // 新建文件夹
   const handleConfirm = (item, index) => {
        if (data.folderText != '') {
            if (data.renameFolderId) {
                // renameFolder();
            } else {
                // handleNewFolder();
            }
            item.isAddTabs = false;
        } else {
            message.error("文件夹名称不能为空!")
        }
    }
    // 关闭新建文件夹
    const handleClose = (item,index) => {
        item.isAddTabs = false;
        data.folderText = '';
    }
    // 文件夹重命名
    const handleRenameFolder = (item, self, idx,index)=> {
        data.folderText = self.name;
        data.renameFolderId = self.folderId;
        item.isAddTabs = true;
        // nextTick(function () {
        //     inpRef.value[data.addTabs + index][0].focus();
        // })
        nextTick(()=>{
            itemRefs[0].el.focus();
            itemRefs = [];
        })
    }
    // 删除文件夹
    const handleDelFolder = (item,index) => {
        // deleteFolder(item.folderId);
    }
    const handleMouseover = (item, index) => {
        item.isBook = true;
    }
    const handleMouseout = (item, index) => {
        if (!data.isEdit) {
            item.isBook = false;
        }
    }
    const changeCheckbox = (e) => {
        let checkedCount = e.length;
        data.checkAll = checkedCount == data.emailListAll.map(function (item) {
            return item.emailId;
        }).length;
        data.isIndeterminate = checkedCount > 0 && checkedCount < data.emailListAll.map(function (item) {
            return item.emailId;
        }).length;
        data.isEdit = true;
    }

    const handleFoldIcon = () => {
        data.isFold = !data.isFold;
    }
    // 全选
    const handleCheckAllChange = (val) => {
        data.checkList = val ? data.emailListAll.map(function (item) {
            return item.emailId;
        }) : [];
        data.isIndeterminate = false;
    }
    // 编辑
    const handleEditEmail = () => {
        data.isEdit = !data.isEdit;
    }
    watch(isEdit,(val,oldVal)=>{
        if (val) {
            data.inboxList.forEach(function (item) {
                item.isBook = true;
            })
        } else {
            data.checkList = [];
            data.isIndeterminate = false;
            data.inboxList.forEach(function (item) {
                item.isBook = false;
            })
        }
    })
    const setItemRefs = (el,index) => {
        if(el && el!=null){
            itemRefs.push({
                index: index,
                el
            })
            console.log("itemRefs",itemRefs)
        }
    }
    // 切换邮件
    const handleRowEmail = (item,index) => {
        if(data.ltags=='draft'){
            window.location.href = '/email/writeEmail.html?emailId='+item.emailId+'&isDraft=1'
        }else {
            data.emailId = item.emailId;
            data.emailIndex = index;
            data.isDetail = true;
        }
    }
</script>
<style lang="less" scoped>
    @import url("@/style/email.less");
    .el-checkbox-group{
        font-size: 14px !important;
        line-height: unset !important;
    }
    .emailWrap {
        width: 100%;
        height: 100vh;
        background: #f0f2f6;
        overflow: hidden;
        font-size: 14px;
    }

    .emailHeader {
        width: 100%;
        height: 64px;
        background: var(--backColor);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        color: #fff;
        .emailLogo {
            width: 175px;
            height: 64px;
            display: flex;
            align-items: center;
            padding: 19px 25px;
            box-sizing: border-box;
            cursor: pointer;
            position: relative;
            color: #fff;

            &:hover {
                background: #fff;

                svg {
                    fill: var(--textColor);
                }

                color: var(--textColor);
            }

            svg {
                width: 26px;
                height: 26px;
            }

            .logoText {
                font-size: 20px;
                font-weight: bold;
                padding-left: 13px;
            }
        }

        .return {
            cursor: pointer;
        }
    }

    .emailBd {
        margin-top: 64px;
        height: calc(~"100% - 64px");
        overflow: hidden;

        .emailContainer {
            height: 100%;
            display: flex;
            .leftContainer{
                border-right: 1px solid #e4e8eb;
            }
            .leftNavPaneWrap {
                width: 220px;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
                background: #fff;
                position: relative;
                box-sizing: border-box;

                .leftEmailScroll {
                    height: calc(~"100% - 52px");
                    overflow-y: auto;
                    margin-top: 20px;

                    .emailMenuWrap {
                        margin-top: 10px;

                        .emailItem {
                            border-radius: 2px;
                            cursor: pointer;

                            &:first-child {
                                margin-top: 0;
                            }

                            .emailItemTitle {
                                height: 36px;
                                line-height: 36px;
                                padding: 0 12px;
                                box-sizing: border-box;
                                color: #4e5969;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .leftIcon {
                                    width: 12px;

                                    .iconfont {
                                        color: rgba(23, 26, 29, 0.6);
                                        font-size: 12px;
                                    }
                                }
                                .addIcon{
                                    width: 20px;
                                    height: 20px;
                                    display: inline-block;
                                    text-align: center;
                                    line-height: 20px;
                                    .iconfont{
                                        color: rgba(23,26,29,.6);
                                        font-size: 12px;
                                    }
                                    &:hover{
                                        background-color: rgba(0,0,0,.08);
                                    }
                                }

                                .name {
                                    display: inline-block;
                                    flex: 1;
                                    padding-left: 4px;
                                }
                            }

                            .emailItemRow {
                                cursor: pointer;
                            }

                            .emailItemRow:hover {
                                background: #f2f3f5;
                            }

                            .menuChildren {
                                .menuChildItem {
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    height: 36px;
                                    line-height: 36px;
                                    padding: 0 10px 0 24px;
                                    box-sizing: border-box;
                                    border-radius: 2px;
                                    margin-top: 4px;
                                    cursor: pointer;
                                    &:hover {
                                        background: #f2f3f5;
                                    }
                                    .name{
                                        color: #1d2129;
                                        flex: 1;
                                        padding-left: 14px;
                                    }

                                    &.active {
                                        background: #f2f3f5;
                                    }

                                    .emailNum {
                                        width: 20px;
                                        height: 20px;
                                        display: inline-block;
                                        text-align: center;
                                        line-height: 20px;
                                        color: #aaaaaa;
                                        font-size: 12px;
                                        position: relative;
                                        border-radius: 2px;
                                        .moreIcon{
                                            display: none;
                                            font-size: 12px;
                                        }
                                    }
                                    .option{
                                        display: none;
                                    }
                                    &:hover .option{
                                        display: block;
                                    }
                                }
                            }
                            .addTabsWrap{
                                display: flex;
                                padding-left: 28px;
                                align-items: center;
                                margin-top: 4px;
                                .rightIcon {
                                    display: flex;
                                }
                                .radiusIcon {
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    text-align: center;
                                    line-height: 20px;
                                    border-radius: 50%;
                                    background: #f2f3f5;
                                    margin-left: 5px;
                                    cursor: pointer;
                                    .iconfont{
                                        font-size: 16px;
                                        color: #4e5969;
                                        transform: scale(0.8);
                                        display: inline-block;
                                    }
                                }
                            }

                            .dropMenuWapper {
                                position: absolute;
                                width: 132px;
                                background: #fff;
                                border-radius: 3px;
                                box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
                                top: calc(100% - 10px);
                                padding: 4px 0;
                                box-sizing: border-box;
                                overflow: auto;
                                cursor: pointer;
                                display: none;
                                z-index: 99;
                            }

                            .dropMenuWapper.leftMoreDrop {
                                width: 200px;
                                min-height: auto;
                                max-height: initial;
                                top: 100% !important;
                                padding-top: 0 !important;
                                display: none;
                                z-index: 200;
                            }
                        }
                    }
                }
            }
            .leftNavIconWrap{
                width: 64px;
                height: 100%;
                padding: 20px 0;
                box-sizing: border-box;
                background: #fff;
                box-sizing: border-box;
                cursor: pointer;
                .squareBtn{
                    width: 32px;
                    height: 32px;
                    text-align: center;
                    line-height: 32px;
                    background: #165dff;
                    color: #fff;
                    border-radius: 2px;
                    cursor: pointer;
                    margin: 0 auto 10px;
                    .iconfont{
                        font-size: 12px;
                    }
                }
                .navIconBox{
                    width: 36px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background: transparent;
                    border-radius: 2px;
                    color: #4e5969;
                    margin: 5px auto;
                    &:hover{
                        background: #f2f3f5;
                    }
                    .iconfont{
                        font-size: 22px;
                    }
                }
            }
        }
    }

    .mailListWrap {
        width: 358px;
        height: 100%;
        background: #fff;
        border-right: 1px solid #e4e8eb;
        position: relative;

        .mailHeader {
            height: 34px;
            line-height: 34px;
            border-bottom: 1px solid #e4e8eb;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .foldIcon{
                cursor: pointer;
                .iconfont{
                    font-size: 12px !important;
                    display: inline-block;
                    &.active{
                        transform: rotate(180deg);
                    }
                }
            }
            .titleBox {
                position: relative;

                &:hover .mailDropWrap {
                    display: block;
                }

                .mailDropWrap {
                    position: absolute;
                    background: #fff;
                    border-radius: 3px;
                    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
                    padding: 4px 0;
                    box-sizing: border-box;
                    overflow: auto;
                    cursor: pointer;
                    display: none;
                    z-index: 99;
                    width: 198px;
                    left: -30px;
                    top: calc(100% - 3px);
                    min-height: auto;
                    max-height: inherit;

                    .dropMenuItem {
                        font-size: 14px;
                        color: #4e5969;
                        line-height: 36px;
                        background: #fff;
                        font-weight: normal;
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        &:hover {
                            background: #f2f3f5;
                            color: var(--textColor);
                        }

                        .name {
                            padding-left: 24px;
                            line-height: 36px;
                        }
                    }
                }
            }
        }
        
        .mailListContent {
            height: calc(~"100% - 34px");
            overflow-y: auto;
            box-sizing: border-box;
            display: block;
            padding-bottom: 36px;

            .mailContentItem {
                width: 100%;
                border-bottom: 1px solid #e4e8eb;
                cursor: pointer;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                padding: 12px 8px;
                position: relative;
                &:hover,&.active{
                    background: #f2f3f5;
                }
                .readElement {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    border: 1px solid;
                    background: #f53f3f;
                    border-color: #f53f3f;
                    display: inline-block;
                    box-sizing: border-box;
                    cursor: pointer;
                    overflow: hidden;
                }

                .readElement.active {
                    background: #fff;
                    border-color: #e4e8eb;
                }

                .avatar {
                    width: 36px;
                    height: 36px;
                    margin-left: 6px;
                    .iconfont{
                        font-size: 36px;
                        color: #c9cdd4;
                    }
                }

                .rightInfo {
                    flex: 1;
                    margin-left: 8px;
                    overflow: hidden;

                    .nameRow {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        line-height: 20px;

                        .name {
                            color: #165dff;
                        }

                        .right {
                            display: flex;
                            align-items: center;

                            span {
                                visibility: hidden;
                            }
                        }
                    }
                }

                .timer {
                    color: #4e5969;
                }

                .theme {
                    width: 80%;
                    line-height: 20px;
                }

                .desc {
                    color: #4e5969;
                    line-height: 20px;
                }
                .checkbox{
                    position: absolute;
                    left: 12px;
                    top: 8px;
                    margin-left: 0 !important;
                    margin-top: 0 !important;
                    border: none !important;
                }
            }
        }
    }

    .btnText {
        height: 25px;
        line-height: 25px;
        background: transparent;
        color: #4e5969;
        font-size: 14px;
        border-radius: 2px;
        padding: 0 4px;
        cursor: pointer;
        display: inline-block;
        .iconfont{
            vertical-align: middle;
        }
    }

    .btnText:hover {
        background: #f2f3f5;
    }

    .rowEllipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .emptyContent{
        flex: 1;
        padding: 24px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        color: #1d2129;
        .emptyContentbox{
            background: #fff;
            border-radius: 4px;
            height: 116px !important;
            line-height: 116px;
        }
    }
    .el-checkbox__label{
        display: none;
    }
    .mailContainerWrap {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }
    .rightContainer{
        width: 100%;
        display: flex;
        height: 100%;
        position: relative;
    }
</style>