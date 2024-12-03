<template>
    <div class="emailDetail">
        <div class="mailSubject">
            <div class="title rowEllipsis">
                {{detail.Subject||'暂无标题'}}
            </div>
            <div class="emailOption">
                <a-button class="ml5">回复</a-button>
                <a-button class="ml5">转发</a-button>
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleMenuClick" style="width: 150px;">
                            <a-menu-item key="1">
                                通知
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button class="ml5">移动</a-button>
                </a-dropdown>
                <a-button class="ml5" @click="handleDeleteEmail">删除</a-button>
                <a-dropdown>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="1" @click="handleUnRead">
                          <i class="iconfont icon-weiduyoujian"></i>
                          设为未读邮件
                        </a-menu-item>
                        <a-menu-item key="2" @click="handleStar">
                          <i class="iconfont icon-zhongyaoyoujian"></i>
                          设为重要邮件
                        </a-menu-item>
                        <a-menu-item key="3">
                          回复
                        </a-menu-item>
                        <a-menu-item key="4">
                            转发
                        </a-menu-item>
                        <a-menu-item key="5" @click="handleDeleteEmail">
                            删除
                        </a-menu-item>
                      </a-menu>
                    </template>
                    <a-button :icon="h(EllipsisOutlined)" class="ml5"> </a-button>
                </a-dropdown>
                <a-button :icon="h(CloseOutlined)" class="ml5"> </a-button>

            </div>
        </div>
        <div class="mailContentView">
            <div style="border-bottom: 1px solid rgb(228, 232, 235); padding-bottom: 10px;">
                <div class="formPeopleWrap">
                    <div class="avatar">
                        <i class="iconfont icon-morentouxiang"></i>
                    </div>
                    <div class="emailInfo">
                        <div class="nameRow">
                            <a-tooltip title="点击标记未读" placement="bottom">
                                <span class="readElement"></span>
                            </a-tooltip>
                            <span class="name">{{detail.FromName || ''}}</span>
                            <span class="emailText" :class="{active:detail.IsRead}">{{detail.ToEmailAddr || ''}}</span>
                        </div>
                        <div class="rowLabel">
                            <span class="label">收件人：</span>
                            <div class="fullNameList" v-if="receiverNames!=''">
                                <span class="emailFullName" v-for="(item,index) in receiverNames" :key="index">{{item}}</span>
                            </div>
                        </div>
                        <div class="emailTitleBox" v-if="isEmailTitle">
                            {{detail.Subject || ''}}
                        </div>
                    </div>
                    <div class="emailOther">
                        <div class="timerRow"><span><i class="iconfont icon-zhongyaoyoujian"></i></span> <!---->
                            {{detail.Date}}
                        </div>
                        <div class="detailText">
                            <a-tooltip :title="!isDetail?'展开详情信息':'收起详情信息'" placement="bottom">
                                <button class="btnText" @click="handleClickText">
                                    详情
                                    <i class="iconfont icon-xiala" :class="{'active':isEmailTitle}"></i>
                                </button>
                            </a-tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Delete :isShow="isDelete" :desc="'是否删除当前邮件?'" @cancel="cancelDelete" @ok="deleteEmail" />
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
        nextTick,
        h
    } from "vue";
    import {
        EllipsisOutlined, CloseOutlined, UserOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import Delete from "@/components/listView/Delete.vue";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        emailId: String
    })
    const data = reactive({
        isDetail: false,
        isEmailTitle: false,
        detail: {Subject:''},
        ltags: "inbox",
        receiverNames: [],
        attachments:[],
        isDelete: false
    })
    const { isDetail, isEmailTitle, detail, receiverNames, isDelete,attachments } = toRefs(data);

    const handleClickText = () => {
        data.isDetail = !data.isDetail;
        data.isEmailTitle = !data.isEmailTitle;
    }
    
    const getDetail = () => {
        // proxy.$get(Interface.email.emailInfo,{
        //     id: props.emailId,
        //     ltags: data.ltags
        // }).then(res=>{
        //     data.detail = res.data;
        //     data.receiverNames = data.detail.ReceiverNames && data.detail.ReceiverNames.split(',');

        // })
        proxy.$get(Interface.email.getMail,{
            mailid: props.emailId,
        }).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue){
                data.detail = res.actions[0].returnValue;
                data.receiverNames = data.detail.toUserNames && data.detail.toUserNames.split(',');
                data.attachments=res.actions[0].returnValue.attachments;
            }

        })
    }
    watch(()=>props.emailId,(newVal,oldVal)=>{
        getDetail();
    },{immediate:true,deep:true})
    const handleDeleteEmail = () => {
        data.isDelete = true;
    }
    const cancelDelete = (e) => {
        data.isDelete = e;
    }

    const deleteEmail = () => {
        data.isDelete = false;
    }
    const handleMenuClick = () => {

    }
    // 未读邮件
    const handleUnRead = () => {
        proxy.$get(Interface.email.read,{
            ids: props.emailId,
            isRead: 0
        }).then(res=>{
            message.success("设置成功!");
        })
    }
    // 重要邮件
    const handleStar = () => {
        proxy.$get(Interface.email.star,{
            Id: props.emailId,
            IsStar: 1
        }).then(res=>{
            message.success("设置成功!");
        })
    }
</script>
<style lang="less" scoped>
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

    .emailDetail {
        width: 100%;
        height: 100%;
        padding: 0 24px;
        box-sizing: border-box;
        overflow: hidden;

        .mailSubject {
            height: 70px;
            line-height: 70px;
            display: flex;
            justify-content: space-between;

            .title {
                flex: 1;
                font-size: 18px;
                color: #080707;
                font-weight: bold;
                margin-right: 20px;
            }

            .emailOption {
                text-align: right;
            }
        }

        .mailContentView {
            width: 100%;
            background: #fff;
            border-radius: 4px;
            padding: 20px;
            box-sizing: border-box;

            .formPeopleWrap {
                display: flex;
                padding-bottom: 0;
                border-bottom: none;

                .avatar {
                    width: 28px;
                    height: 28px;
                    color: #C9CDD4;

                    .iconfont {
                        font-size: 28px;
                    }
                }

                .emailInfo {
                    flex: 1;
                    margin-left: 10px;

                    .nameRow {
                        line-height: 28px;

                        .name {
                            color: #165dff;
                            padding-left: 2px;
                        }

                        .emailText {
                            color: #4e5969;
                        }
                    }

                    .rowLabel {
                        display: flex;
                        overflow: hidden;

                        .label {
                            min-width: 58px;
                            display: inline-block;
                            color: #4e5969;
                            line-height: 24px;
                        }

                        .fullNameList {
                            flex: 1;
                            display: flex;
                            flex-wrap: wrap;

                            .emailFullName {
                                padding: 3px 4px;
                                background: #e8f3ff;
                                display: inline-block;
                                border-radius: 2px;
                                cursor: pointer;
                                margin-bottom: 5px;
                                margin-right: 5px;
                            }
                        }
                    }

                    .emailTitleBox {
                        line-height: 1.5;
                        color: #1d2129;
                        margin-top: 13px;
                    }
                }

                .emailOther {
                    color: #4e5969;

                    .iconfont {
                        padding-right: 10px;
                        cursor: pointer;
                        opacity: .6;
                        font-size: 10px;
                        color: #4e5969;
                    }

                    .detailText {
                        margin-top: 10px;
                        cursor: pointer;
                        text-align: right;
                        color: #1d2129;
                    }
                }
            }
        }
    }
</style>