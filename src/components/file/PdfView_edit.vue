<template>
    <div class="d-modal" v-if="isShow">
        <div class="dModal-box">
            <div class="d-content">
                <div class="photoWrap">
                    <iframe :src="pdfUrl" class="pdfIframe" v-if="isPdf"></iframe>
                    <div class="photoHeadInfo">
                        <div class="photoName">
                            {{ detail.Name || '暂无' }}
                        </div>
                        <div class="photoIcons">
                            <span class="icon" title="下载" @click="handleDownload">
                                <i class="iconfont icon-xiazai"></i>
                            </span>
                            <span class="icon" title="关闭" @click="handleClose">
                                <i class="iconfont icon-guanbi"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="closeIcon" @click="handleClose" title="关闭">
                <CloseOutlined />
            </div> -->
        </div>
    </div>
</template>
<script setup>
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
    toRaw,
    computed,
} from "vue";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
dayjs.locale('zh-cn');
import calendar from 'dayjs/plugin/calendar';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import axios from "axios";
dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
    CloseOutlined,
    LeftOutlined,
    RightOutlined,
    ArrowLeftOutlined,
    LikeFilled,
    MessageFilled
} from "@ant-design/icons-vue";
const emit = defineEmits(["cancel"]);
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
    isShow: Boolean,
    pdfParams: Object
});
const data = reactive({
    items: [
        {
            description: 123
        },
        {
            description: 456
        }
    ],
    mySwiper: null,
    commentList: [],
    comment: "",
    replyComment: "",
    currentIndex: { i: 0 },
    imageList: [],
    id: '',
    detail: {},
    total: 0,
    currentUserName: '',
    currentUserId: '',
    rotate: 0,
    isShowCommitBtn: false,
    pdfUrl: "",
    isPdf: false
})
const { isShowCommitBtn, rotate, currentUserName, currentUserId, total, detail, currentIndex, imageList, id, items, mySwiper, commentList, comment, replyComment, pdfUrl, isPdf } = toRefs(data);

const getPdfUrl = () => {
    proxy.$get(Interface.pdf+props.pdfParams.id, {}).then(res=>{
        let fileBase64 = res.actions[0].returnValue;
        localStorage.setItem('pdfBase64', fileBase64)
        data.isPdf = true;
        data.pdfUrl = '/pdfjs/web/viewer.html?file=local';
        // data.pdfUrl = 'data:application/pdf;base64,' + fileBase64;
    })
    // data.pdfUrl = '/pdfjs/web/viewer.html?id=' + props.pdfParams.id;
};
getPdfUrl();

const handleClose = () => {
    emit("cancel", false);
};

//全屏
const handleFullScreen = () => {
    window.open(data.detail.viewUrl)
}
//旋转
const handleRotate = () => {
    data.rotate += 90;
    $('.slick-slide img').css('transform', 'rotate(' + data.rotate + 'deg)');
}
//下载
const handleDownload = () => {
    let url = detail.downloadUrl;
    //window.open(url);
    let text = detail.Name || '';
    windowOpen(url, text);
    // axios({
    //     url: data.detail.viewUrl,
    //     method: 'get',
    //     responseType:'blob',
    // }).then(res=>{
    //     let url=window.URL.createObjectURL(res.data);
    //     const a = document.createElement('a');
    //     a.href=url;
    //     a.download=data.detail.Name+'.'+data.detail.FileExtension;
    //     a.click();
    // }).catch(err => {
    //     console.log('error', err);
    //     message.error("下载失败！");
    // });
}
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
onMounted(() => {
    console.log(props.pdfParams)
    if (props.pdfParams) {
        data.currentIndex.i = props.pdfParams.index || 0;
        data.imageList = props.pdfParams.imageList || [];
        data.id = props.pdfParams.id || '';
        data.detail = props.pdfParams.item || {};
    }
    //console.log(props.pdfParams)
    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        data.currentUserId = userInfo.userId;
        data.currentUserName = userInfo.fullName;
    }
    //getCommentList();
})
</script>
<style lang="less" scoped>
@import "@/style/icon/iconfont.css";

.d-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(234, 234, 234, 0.3);
    z-index: 999;

    .dModal-box {
        //background: rgba(64, 52, 51, 0.9);
        // width: 95%;
        // height: calc(~"100% - 40px");
        width: 100%;
        height: calc(~"100% - -1px");
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .closeIcon {
            position: absolute;
            right: 10px;
            top: 5px;
            font-size: 24px;
            color: #999;
            cursor: pointer;
            font-weight: bolder;
        }

        .d-content {
            width: 100%;
            height: 100%;
            margin-right: 16px;
            display: flex;

            .photoWrap {
                width: calc(~"100% - 0px");
                flex: 1;
                overflow: hidden;
                position: relative;
                background: #24262A;

                //opacity: 1;
                .photoHeadInfo {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 20px;
                    color: #fff;
                    position: absolute;
                    top: 0;

                    .photoIcons,
                    .photoName {
                        .icon {
                            width: 40px;
                            height: 40px;
                            text-align: center;
                            display: inline-block;
                            //background: rgba(54, 54, 54, 80%);
                            margin-left: 20px;
                            border-radius: 50%;
                            line-height: 40px;
                            cursor: pointer;

                            &:hover {
                                background: rgba(30, 30, 30, 90%)
                            }
                        }
                    }

                    .photoName .icon {
                        font-size: 19px;
                        line-height: 42px;
                    }

                    .photoName {
                        font-size: 20px;
                    }
                }
            }

            .info-box {
                width: 430px;
                height: 100%;
                padding: 18px;
                box-sizing: border-box;
                overflow: hidden;
                background: #fff;
                display: none;

                .personHead {
                    display: flex;

                    .avatar {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-right: 10px;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .personalInfo {
                        flex: 1;

                        .name {
                            //color: var(--textColor);
                            color: #000;
                            font-size: 15px;
                            font-weight: bolder;
                            margin-top: 3px;
                        }

                        .time {
                            margin-top: 5px;
                            font-size: 13px;
                            color: #939393;
                        }
                    }
                }

                .fileName {
                    padding: 15px 0;
                    border-bottom: 1px solid #eee;
                }

                .optionLike {
                    display: flex;
                    justify-content: center;
                    padding: 10px;

                    .optionItem {
                        //display: flex;
                        align-items: center;
                        margin: 0 35px;
                        cursor: pointer;
                        font-size: 20px;
                        color: #888;

                        svg {
                            width: 17px;
                            fill: #444;
                        }

                        .num {
                            padding-left: 5px;
                            margin-top: 5px !important;
                            font-size: 15px;
                        }

                        .icon-pinglun {
                            font-size: 14px;
                        }
                    }

                    .optionItem:hover {
                        color: #ff8200;
                    }
                }

                .fileCommentBox {
                    height: calc(~"100% - 110px");
                    //background: #f4f4f4;
                    padding: 10px 0;

                    .commentTitle {
                        font-size: 14px;
                        width: 100%;
                        color: #333;
                        font-weight: bold;
                        position: relative;
                        top: -15px;
                        left: 2px;
                    }

                    .commentList {
                        height: calc(~"100% - 120px");
                        overflow-y: auto;
                    }

                    .commentItem {
                        border-bottom: 1px solid #eee;
                        margin-bottom: 7px;
                        flex: 1;

                        .commentName {
                            //color: var(--textColor);
                            color: #ff8200;
                        }

                        .desc {
                            line-height: 1.5;
                            margin: 5px 1px;
                            word-break: break-all;
                        }
                    }

                    .replyBox {
                        background: #fff;
                        padding: 10px;
                        justify-content: center;
                        align-items: center;
                        flex-direction: row;
                        display: flex;
                        position: relative;
                        top: -4px;
                    }

                    .bottomInfo {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding-bottom: 10px;
                        font-size: 13px;

                        svg {
                            width: 17px;
                            position: relative;
                            top: 3px;
                        }

                        .icons {
                            display: flex;
                            align-items: center;
                        }

                        .icon-pinglun,
                        .icon-yishanchu,
                        .icon-zan2 {
                            font-size: 14px;
                        }

                        .icon {
                            display: inline-block;
                            padding: 0 10px;
                            cursor: pointer;
                            color: #86909c;
                        }

                        .icon:hover {
                            color: #ff8200;
                        }

                        .time {
                            color: #86909c;
                        }
                    }

                    .inpRow {
                        flex: 1;

                        :deep .ant-input {
                            padding: 6px 11px;
                            background: #f0f1f4;
                            border: 0 !important;
                            border-radius: 6px !important;
                            //height: 38px;
                        }

                        :deep .ant-input:focus {
                            //border-color: #ff8200 !important;
                            box-shadow: 0 0 0 1px #ff8200;
                        }
                    }

                    .btnRow {
                        text-align: right;
                        margin-top: 0;
                        margin-left: 12px;

                        :deep .ant-btn-primary {
                            background-color: #ff8200;
                            width: 74px;
                            border-radius: 30px !important;

                            //height: 36px;
                            span {
                                letter-spacing: -1px;
                            }
                        }

                        .nocommit {
                            pointer-events: none;
                            opacity: 0.5;
                            cursor: not-allowed;
                        }

                    }

                    .fileCommentListBottom {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: row;
                        position: relative;
                        top: 10px;
                        width: 100%;

                        .inpRow {
                            flex: 1;

                            :deep .ant-input {
                                padding: 6px 11px;
                                background: #f0f1f4;
                                border: 0 !important;
                                border-radius: 6px !important;
                                height: 38px;
                            }

                            :deep .ant-input:focus {
                                //border-color: #ff8200 !important;
                                box-shadow: 0 0 0 1px #ff8200;
                            }
                        }

                        .btnRow {
                            text-align: right;
                            margin-top: 0;
                            margin-left: 12px;

                            :deep .ant-btn-primary {
                                background-color: #ff8200;
                                width: 74px;
                                border-radius: 30px !important;
                                height: 36px;

                                span {
                                    letter-spacing: -1px;
                                }
                            }

                            .nocommit {
                                pointer-events: none;
                                opacity: 0.5;
                                cursor: not-allowed;
                            }

                            .icon-zan3 {
                                font-size: 20px;
                                color: #939393;
                                width: 25px;
                                display: block;
                                cursor: pointer;
                            }

                            .icon-zan3:hover {
                                color: #ff8200;
                            }
                        }
                    }
                }
            }
        }
    }
}

/* 在需要的地方自定义样式 */
.swiper-container {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    /* background: #fff; */
}

/* For demo */
:deep(.slick-dots) {
    position: relative;
    height: auto;
}

:deep(.slick-slide img) {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    //max-width: 80%;
    margin-top: 20px;
    border: 0;
}

// :deep(.slick-arrow) {
//     //display: none !important;
// }
:deep(.slick-arrow.custom-slick-arrow) {
    width: 60px;
    height: 60px;
    font-size: 25px;
    color: #fff !important;
    background-color: rgba(54, 54, 54, 0.8);
    transition: ease all 0.3s;
    opacity: 0.9;
    z-index: 1;
    border-radius: 50%;
    display: flex !important;
    justify-content: center !important;

    .anticon-left {
        position: relative;
        left: -2px;
    }
}

:deep(.slick-arrow.slick-prev) {
    left: 20px !important;
}

:deep(.slick-arrow.slick-next) {
    right: 20px !important;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff !important;
    opacity: 0.9;
    background: rgba(30, 30, 30, 0.9);
}

:deep(.slick-thumb) {
    bottom: 0px;
}

:deep(.slick-thumb li) {
    width: 60px;
    height: 45px;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    border: 4px solid #24262A;
}

:deep .slick-thumb li.slick-active {
    border: 4px solid #fa7d3c;
}

:deep(.slick-thumb li img) {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    display: block;
    width: auto;
}

:deep .slick-thumb li.slick-active img {
    filter: grayscale(0%);
}

:deep .ant-carousel {
    margin-top: 20px;
    width: 100%;
    height: calc(~"100% - 20px") !important;
}

:deep .ant-carousel .slick-slider {
    height: 100%;
}

:deep .ant-carousel .slick-list {
    height: calc(~"100% - 100px") !important;
    margin-bottom: 12px;
}

:where(.css-dev-only-do-not-override-kqecok)[class^="ant-popover"],
:where(.css-dev-only-do-not-override-kqecok)[class*=" ant-popover"] {
    z-index: 9999;
}

:deep .slick-thumb li {
    min-width: 60px !important;
}

:deep .photoWrap {
    .slick-track {
        height: 100%;
    }

    .slick-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.commentList {
    position: relative;

    .empty {
        width: 100%;
        height: auto;
        position: absolute;
        top: 30%;
        z-index: 1;
        color: #999;
        right: 0;
        text-align: center;

        img {
            width: 100px;
        }
    }

    .avatar {
        img {
            width: 34px;
        }

        margin-right: 10px;
    }

    .filecommentList {
        display: flex;

        .desc {
            color: #333;
        }
    }
}

.pdfIframe {
    width: calc(100% - 30px);
    height: calc(100% - 65px);
    margin: 50px 15px 10px 14px;
    border-radius: 4px;
    background: #fff;
}
</style>