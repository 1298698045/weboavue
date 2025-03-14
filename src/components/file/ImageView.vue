<template>
    <div class="d-modal" v-if="isShow">
        <div class="dModal-box">
            <div class="d-content">
                <div class="photoWrap">
                    <a-carousel ref="carouselRef" arrows dots dots-class="slick-dots slick-thumb"
                        :after-change="changeImg">
                        <template #customPaging="currentIndex">
                            <a>
                                <img :src="getImgUrl(currentIndex.i)" :alt="(imageList[currentIndex.i]).Name"
                                    :title="(imageList[currentIndex.i]).Name" />
                            </a>
                        </template>
                        <template #prevArrow>
                            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                                <LeftOutlined @click="prev" />
                            </div>
                        </template>
                        <template #nextArrow>
                            <div class="custom-slick-arrow" style="right: 10px">
                                <RightOutlined @click="next" />
                            </div>
                        </template>
                        <div v-for="(item, index) in imageList" :key="index">
                            <img :src="getImgUrl(index)" :alt="item.Name" :title="item.Name" />
                        </div>
                    </a-carousel>
                    <div class="photoHeadInfo">
                        <div class="photoName">
                            {{ detail.Name || '' }}
                            <!-- <span class="icon" title="退出" @click="handleClose">
                                <ArrowLeftOutlined />
                            </span> -->
                        </div>
                        <div class="photoIcons">
                            <!-- <span class="icon" title="全屏" @click="handleFullScreen">
                                <i class="iconfont icon-zuidahua"></i>
                            </span> -->
                            <span class="icon" title="旋转" @click="handleRotate">
                                <i class="iconfont icon-zhongzhi"></i>
                            </span>
                            <span class="icon" title="下载" @click="handleDownload">
                                <i class="iconfont icon-xiazai"></i>
                            </span>
                            <span class="icon" title="关闭" @click="handleClose">
                                <i class="iconfont icon-guanbi"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="info-box">
                    <div class="personHead">
                        <div class="avatar">
                            <img :src="require('@/assets/img/avatar-r.png')" alt="" />
                        </div>
                        <div class="personalInfo">
                            <p class="name">{{ detail.CreatedBy || '' }}</p>
                            <p class="time">{{ detail.CreatedOn || '' }}</p>
                        </div>
                    </div>
                    <div class="fileName">{{ detail.Name || '' }}{{ detail.FileExtension ? '.' + detail.FileExtension :
                        '' }}
                    </div>
                    <div class="optionLike">
                        <div class="optionItem" title="评论" @click="isShowCommitBtn = !isShowCommitBtn">
                            <!-- <i class="iconfont icon-pinglun"></i> -->
                            <MessageFilled />
                            <br />
                            <span class="num">{{ total }}</span>
                        </div>
                        <div class="optionItem" @click="setLike" title="点赞">
                            <!-- <svg viewBox="0 0 24 24" aria-hidden="true"
                                class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                                <g>
                                    <path
                                        d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                    </path>
                                </g>
                            </svg> -->
                            <LikeFilled />
                            <br />
                            <span class="num">0</span>
                        </div>
                    </div>
                    <div class="fileCommentBox">
                        <div class="commentTitle">热门评论</div>
                        <div class="commentList">
                            <div class="empty" v-if="commentList.length == 0">
                                <img :src="require('@/assets/img/empty.png')" alt="" />
                                <p class="emptyDesc">当前暂无数据</p>
                            </div>
                            <div v-for="(item, index) in commentList" :key="index">
                                <div class="filecommentList">
                                    <div class="avatar">
                                        <img :src="require('@/assets/img/avatar-r.png')" alt="" />
                                    </div>
                                    <div class="commentItem">
                                        <p class="commentName">{{ item.Name || item.CreatedBy }}：</p>
                                        <p class="desc">{{ item.Body }}</p>
                                        <div class="bottomInfo">
                                            <span class="time">{{ item.CreatedOn }}</span>
                                            <div class="icons">
                                                <span class="icon" @click="handleCommentReply(item)" title="评论">
                                                    <i class="iconfont icon-pinglun"></i>
                                                </span>
                                                <span class="icon" @click="setCommentLike(item)" title="点赞">
                                                    <!-- <svg viewBox="0 0 24 24" aria-hidden="true"
                                                    class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                                                    <g>
                                                        <path
                                                            d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                                        </path>
                                                    </g>
                                                </svg> -->
                                                    <i class="iconfont icon-zan2"></i>
                                                </span>
                                                <a-popconfirm title="是否确定删除?" ok-text="确定" cancel-text="取消"
                                                    @confirm="handleDeleteComment(item)">
                                                    <span class="icon" title="删除">
                                                        <i class="iconfont icon-yishanchu"></i>
                                                    </span>
                                                </a-popconfirm>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="replyBox" v-if="item.isReplay">
                                    <div class="inpRow">
                                        <a-input v-model:value="replyComment" placeholder="输入回复内容"></a-input>
                                    </div>
                                    <div class="btnRow">
                                        <a-button type="primary" @click="sendCommentReplay(item)"
                                            :class="{ 'nocommit': !replyComment }">回复</a-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fileCommentListBottom">
                            <div class="inpRow">
                                <a-input v-model:value="comment" placeholder="发布你的评论"></a-input>
                            </div>
                            <div class="btnRow">
                                <a-button v-if="isShowCommitBtn" type="primary" @click="sendComment"
                                    :class="{ 'nocommit': !comment }">评论</a-button>
                                <i v-if="!isShowCommitBtn" class="iconfont icon-zan2 icon-zan3" title="点赞"></i>
                            </div>
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
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // 导入 Swiper 样式
const emit = defineEmits(["cancel"]);
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
    isShow: Boolean,
    photoParams: Object
});
const carouselRef = ref();
const getImgUrl = (index) => {
    let url = '@/assets/img/filetype/defaultImg.png';
    if (data.imageList[index] && data.imageList[index].viewUrl) {
        url = data.imageList[index].viewUrl
    }
    return url;
};
const changeImg = (index) => {
    //console.log(index,'current')
    data.id = data.imageList[index].id;
    data.currentIndex.i = index;
    data.detail = data.imageList[index];
    //getCommentList();
};
const nextButton = ref();
const prevButton = ref();
const swiperRef = ref();

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
    isShowCommitBtn: false
})
const { isShowCommitBtn, rotate, currentUserName, currentUserId, total, detail, currentIndex, imageList, id, items, mySwiper, commentList, comment, replyComment } = toRefs(data);
const handleClose = () => {
    emit("cancel", false);
};
const swiper = computed(() => {
    return swiperRef.value.$swiper;
})
const initSwiper = () => {
    data.mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
const next = () => {

}
const prev = () => {

}

const getCommentList = () => {
    // proxy.$get(Interface.file.commentList,{
    //     chatterId: data.id
    // }).then(res=>{
    //     data.commentList = res.rows.map(item=>{
    //         item.isReplay = false;
    //         return item;
    //     });
    // })
    data.commentList = [];
    data.total = 0;
    let filterQuery = '\nRegardingObjectId\teq\t' + data.id;
    proxy.$post(Interface.list2, {
        filterId: '',
        objectTypeCode: '20310',
        entityName: 'Comment',
        filterQuery: filterQuery,
        search: '',
        page: 1,
        rows: 100,
        sort: 'CreatedOn',
        order: 'asc',
        displayColumns: 'Name,CreatedBy,CreatedOn,Body,CommentQty,LikeQty,'
    }).then(res => {
        var list = [];
        data.total = res.pageInfo ? res.pageInfo.total : 0;
        for (var i = 0; i < res.nodes.length; i++) {
            var item = res.nodes[i];
            for (var cell in item) {
                if (cell != 'id' && cell != 'nameField') {
                    item[cell] = girdFormatterValue(cell, item);
                }
                if (cell == 'CreatedOn') {
                    item[cell] = item[cell] ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm") : '';
                }
            }
            list.push(item)
        }
        data.commentList = list;
    })
}
const sendComment = () => {
    // proxy.$get(Interface.file.sendComment,{
    //     chatterId: data.id,
    //     comment: data.comment
    // }).then(res=>{
    //     data.comment = '';
    //     getCommentList();
    // })
    createComment('');
}
const sendCommentReplay = (item) => {
    // proxy.$get(Interface.file.sendComment,{
    //     chatterId: data.id,
    //     CommentId: item.CommentId,
    //     comment: data.replyComment
    // }).then(res=>{
    //     data.replyComment = '';
    //     item.isReplay = false;
    //     getCommentList();
    // })
    createComment(item);
}
const createComment = (item) => {
    let url = Interface.create;
    let d = {
        actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'Comment',
                    objTypeCode: '20310',
                    fields: {
                        Body: item ? data.replyComment : data.comment,
                        RegardingObjectId: data.id,
                        ParentId: item ? item.id : null,
                        Name: item ? data.currentUserName + ' 回复 ' + item.CreatedBy : '',
                        CreatedBy: data.currentUserId
                    }
                }
            }
        }]
    };
    // if(data.renameFolderId){
    //     url=Interface.edit;
    //     d.actions[0].params.recordId=data.renameFolderId;
    // }
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
            message.success("评论成功！");
            getCommentList();
            data.comment = '';
            data.replyComment = '';
        }
        else {
            if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
                message.error(res.actions[0].errorMessage);
            }
            else {
                message.error("评论失败！");
            }
        }
    });
}
const setLike = () => {
    return
    proxy.$get(Interface.file.like, {
        chatterId: data.id,
        likeType: 0
    }).then(res => {
        message.success(res.msg);
    })
}
const handleCommentReply = (item) => {
    item.isReplay = !item.isReplay;
}
const setCommentLike = (item) => {
    return
    proxy.$get(Interface.file.like, {
        chatterId: data.id,
        CommentId: item.CommentId,
        likeType: 1
    }).then(res => {
        message.success(res.msg)
    })
}
const handleDeleteComment = (item) => {
    // proxy.$get(Interface.file.deleteComment,{
    //     chatterId: data.id,
    //     id: item.CommentId,
    //     likeType: 1
    // }).then(res=>{
    //     message.success(res.msg);
    //     getCommentList();
    // })
    let obj = {
        actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: item.id,
                apiName: 'Comment',
                objTypeCode: 20310,
            }
        }]
    };
    let d = {
        message: JSON.stringify(obj)
    };
    proxy.$post(Interface.delete, d).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
            message.success("删除成功");
            getCommentList();
        } else {
            if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                message.success(res.actions[0].errorMessage);
            }
            else {
                message.error("删除失败");
            }
        }
    })
}
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
    console.log(props.photoParams)
    if (props.photoParams) {
        data.currentIndex.i = props.photoParams.index || 0;
        data.imageList = props.photoParams.imageList || [];
        data.id = props.photoParams.id || '';
        data.detail = props.photoParams.item || {};
        carouselRef.value.goTo(data.currentIndex.i, true);
    }
    //console.log(props.photoParams)
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
    z-index: 9999;

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
                opacity: 0.9;

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
                            background: rgba(54, 54, 54, 80%);
                            margin-right: 20px;
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
    opacity: 1;
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
.slick-thumb li img{
    width: 100%;
    height: 100%;
}
</style>