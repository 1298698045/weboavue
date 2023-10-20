<template>
    <div class="emailDetail">
        <div class="mailSubject">
            <div class="title rowEllipsis">
                传附件查看
            </div>
            <div class="emailOption">
                <a-button class="ml5">回复</a-button>
                <a-button class="ml5">转发</a-button>
                <a-button class="ml5">移动</a-button>
                <a-button class="ml5">删除</a-button>
                <a-button :icon="h(EllipsisOutlined)" class="ml5"> </a-button>
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
                                <span class="emailFullName" v-for="item in receiverNames">{{item}}</span>
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
        EllipsisOutlined, CloseOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const data = reactive({
        isDetail: false,
        isEmailTitle: false,
        detail: {},
        emailId: "76e734e6-9db5-4b5a-bdaf-ad995369f2e7",
        ltags: "inbox",
        receiverNames: []
    })
    const { isDetail, isEmailTitle, detail, receiverNames } = toRefs(data);

    const handleClickText = () => {
        data.isDetail = !data.isDetail;
        data.isEmailTitle = !data.isEmailTitle;
    }

    const getDetail = () => {
        proxy.$get(Interface.email.emailInfo,{
            id: data.emailId,
            ltags: data.ltags
        }).then(res=>{
            data.detail = res.data;
            data.receiverNames = data.detail.ReceiverNames && data.detail.ReceiverNames.split(',');

        })
    }
    getDetail();
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