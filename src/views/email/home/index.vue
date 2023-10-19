<template>
    <div class="emailWrap">
        <div class="emailHeader">
            <div class="emailLogo">
                <MailOutlined />
                <span class="logoText">邮件</span>
            </div>
            <div class="emailSearch">

            </div>
            <div class="return">
                返回OA
            </div>
        </div>
        <div class="emailBd">
            <div class="emailContainer">
                <div class="leftContainer">
                    <a-button type="primary" block>
                        写邮件
                    </a-button>
                    <div class="leftEmailScroll">
                        <ul class="emailMenuWrap">
                            <li class="emailItem" v-for="(item,index) in navList" :key="index">
                                <div class="emailItemRow" @click="handleOpen(item,index)">
                                    <div class="emailItemTitle">
                                        <div class="leftIcon">
                                            <i class="iconfont icon-xiala" :class="{'active':!item.isBook}"
                                                v-if="item.children.length>0"></i>
                                        </div>
                                        <span class="name">{{ item.name }}</span>
                                        <p class="addIcon" v-if="item.isAdd" @click.stop="handleAddTab(item,index)">
                                            <i class="iconfont icon-tianjia"></i>
                                        </p>
                                    </div>
                                </div>
                                <transition>
                                    <div class="menuChildren" v-if="item.children.length>0 && item.isBook">
                                        <div class="menuChildItem" :class="{active:self.ltags==ltags}"
                                            @click="handleTypeEmail(self,idx)" v-for="(self,idx) in item.children"
                                            :key="idx">
                                            <div class="leftIcon">
                                                <i class="iconfont" :class="self.iconClass"></i>
                                            </div>
                                            <p class="name">{{ self.name }}</p>
                                            <div class="option" v-if="item.isAdd">
                                                <span @click.stop="handleRenameFolder(item,self,idx,index)"
                                                    style="padding-right: 5px;">
                                                    <i class="iconfont icon-bianji"></i>
                                                </span>
                                                <span @click.stop="handleDelFolder(self,idx)">
                                                    <i class="iconfont icon-yishanchu"></i>
                                                </span>
                                            </div>
                                            <div class="emailNum" v-if="!item.isAdd">
                                                <span class="num">{{ self.num || ''}}</span>
                                                <i class="iconfont icon-gengduobiaoqian moreIcon"></i>

                                                <div class="dropMenuWapper leftMoreDrop"
                                                    v-if="item.hasOwnProperty('isFolder')">
                                                    <div class="dropOptionList">
                                                        <div class="dropOptionItem"
                                                            @click.stop="handleDelFolder(self,idx)">
                                                            <span class="nameText">删除</span>
                                                        </div>
                                                        <div class="dropOptionItem"
                                                            @click.stop="handleRenameFolder(item,self,idx,index)">
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
                                    <el-input v-model="folderText" :ref="addTabs+index"></el-input>
                                    <div class="rightIcon">
                                        <span class="radiusIcon" @click.stop="handleConfirm(item,index)">
                                            <i class="iconfont icon-duigou"></i>
                                        </span>
                                        <span class="radiusIcon" @click.stop="handleClose(item,index)">
                                            <i class="iconfont icon-guanbi"></i>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="rightContainer">

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits
    } from "vue";
    import { SearchOutlined, DeleteOutlined, MailOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";

    const { proxy } = getCurrentInstance();
    const data = reactive({
        navList: [
            {
                name: '内部邮件',
                isBook: true,
                children: [
                    {
                        name: '收件箱',
                        num: '',
                        iconClass: 'icon-shoujianxiang',
                        ltags: 'inbox'
                    },
                    {
                        name: '重要邮件',
                        num: '',
                        iconClass: 'icon-zhongyaoyoujian',
                        ltags: 'star'
                    },
                    {
                        name: '群邮件',
                        num: '',
                        iconClass: 'icon-qunyoujian',
                        ltags: 'group'
                    },
                    {
                        name: '未读邮件',
                        num: '',
                        iconClass: 'icon-weiduyoujian',
                        ltags: 'unread'
                    },
                    {
                        name: '草稿箱',
                        num: '',
                        iconClass: 'icon-caogaoxiang1',
                        ltags: 'draft'
                    },
                    {
                        name: '已发送',
                        num: '',
                        iconClass: 'icon-yifasong',
                        ltags: 'sent'
                    },
                    {
                        name: '已删除',
                        num: '',
                        iconClass: 'icon-yishanchu',
                        ltags: 'Deleted'
                    }
                ]
            },
            {
                name: '邮箱文件夹',
                isBook: true,
                isAdd: true,
                isAddTabs: false,
                isFolder: '1',
                children: [

                ]
            }
        ],
        ltags: 'inbox',
        emailId: "",
        folderId: ""
    })
    const { navList, ltags } = toRefs(data);
    const handleTypeEmail = (item, index) => {
        console.log(item, index);
        data.ltags = item.ltags;
        data.emailId = '';
        if (data.ltags.indexOf('folder') != -1) {
            data.folderId = item.Id;
        }
        // this.queryInboxList();
    }
</script>
<style lang="less">
    @import url('@/style/email.less');
    .emailWrap {
        width: 100%;
        height: 100vh;
        background: #f0f2f6;
        overflow: hidden;
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
                ;
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
            .leftContainer {
                width: 220px;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
                background: #fff;
                position: relative;
                box-sizing: border-box;
                border-right: 1px solid #e4e8eb;
                .leftEmailScroll{
                    height: calc(~"100% - 52px");
                    overflow-y: auto;
                    .emailMenuWrap{
                        margin-top: 10px;
                        .emailItem{
                            border-radius: 2px;
                            cursor: pointer;
                            &:first-child{
                                margin-top: 0;
                            }
                            .emailItemTitle{
                                height: 36px;
                                line-height: 36px;
                                padding: 0 12px;
                                box-sizing: border-box;
                                color: #4e5969;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .leftIcon{
                                    width: 12px;
                                    .iconfont{
                                        color: rgba(23,26,29,.6);
                                        font-size: 12px;
                                    }
                                }
                                .name{
                                    display: inline-block;
                                    flex: 1;
                                    padding-left: 4px;
                                }
                            }
                            .menuChildren{
                                .menuChildItem{
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    height: 36px;
                                    line-height: 36px;
                                    padding: 0 10px 0 24px;
                                    box-sizing: border-box;
                                    border-radius: 2px;
                                    margin-top: 4px;
                                    &.active{
                                        background: #f2f3f5;
                                    }
                                    .emailNum{
                                        width: 20px;
                                        height: 20px;
                                        display: inline-block;
                                        text-align: center;
                                        line-height: 20px;
                                        color: #aaaaaa;
                                        font-size: 12px;
                                        position: relative;
                                        border-radius: 2px;
                                    }
                                }
                            }
                            .dropMenuWapper{
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
        }
    }
</style>