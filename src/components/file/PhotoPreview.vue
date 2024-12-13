<template>
    <div class="d-modal" v-if="isShow">
        <div class="dModal-box">
            <div class="d-content">
                <div class="photoWrap">
                    <a-carousel ref="carouselRef" arrows dots dots-class="slick-dots slick-thumb" :after-change="changeImg">
                        <template #customPaging="currentIndex">
                            <a>
                                <img :src="getImgUrl(currentIndex.i)" :alt="(imageList[currentIndex.i]).Name" :title="(imageList[currentIndex.i]).Name" />
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
                        <div v-for="(item,index) in imageList" :key="index">
                            <img :src="getImgUrl(index)" :alt="item.Name" :title="item.Name" />
                        </div>
                    </a-carousel>
                    <div class="photoHeadInfo">
                        <div class="photoName">
                            {{ detail.Name||'' }}{{ detail.FileExtension?'.'+detail.FileExtension:'' }}
                        </div>
                        <div class="photoIcons">
                            <span class="icon" title="全屏" @click="handleFullScreen">
                                <i class="iconfont icon-zuidahua"></i>
                            </span>
                            <span class="icon" title="旋转" @click="handleRotate">
                                <i class="iconfont icon-zhongzhi"></i>
                            </span>
                            <span class="icon" title="下载" @click="handleDownload">
                                <i class="iconfont icon-xiazai"></i>
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
                            <p class="name">{{ detail.CreatedBy||'' }}</p>
                            <p class="time">{{ detail.CreatedOn||'' }}</p>
                        </div>
                    </div>
                    <div class="fileName">{{ detail.Name||'' }}{{ detail.FileExtension?'.'+detail.FileExtension:'' }}</div>
                    <div class="optionLike">
                        <div class="optionItem">
                            <i class="iconfont icon-pinglun"></i>
                            <span class="num">{{ total }}</span>
                        </div>
                        <div class="optionItem" @click="setLike">
                            <svg viewBox="0 0 24 24" aria-hidden="true"
                                class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                                <g>
                                    <path
                                        d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                    </path>
                                </g>
                            </svg>
                            <span class="num">0</span>
                        </div>
                    </div>
                    <div class="fileCommentBox">
                        <div class="commentList">
                            <div class="empty" v-if="commentList.length==0">
                                <img
                                :src="require('@/assets/img/empty.png')"
                                alt=""
                                />
                                <p class="emptyDesc">当前暂无数据</p>
                            </div>
                            <div v-for="(item,index) in commentList" :key="index">
                                <div class="commentItem">
                                    <p class="commentName">{{item.Name||item.CreatedBy}}：</p>
                                    <p class="desc">{{item.Body}}</p>
                                    <div class="bottomInfo">
                                        <span class="time">{{item.CreatedOn}}</span>
                                        <div class="icons">
                                            <span class="icon" @click="handleCommentReply(item)">
                                                <i class="iconfont icon-pinglun"></i>
                                            </span>
                                            <span class="icon" @click="setCommentLike(item)">
                                                <svg viewBox="0 0 24 24" aria-hidden="true"
                                                    class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                                                    <g>
                                                        <path
                                                            d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                                        </path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <a-popconfirm
                                                title="是否确定删除?"
                                                ok-text="确定"
                                                cancel-text="取消"
                                                @confirm="handleDeleteComment(item)"
                                            >
                                                <span class="icon">
                                                    <i class="iconfont icon-yishanchu"></i>
                                                </span>
                                            </a-popconfirm>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="replyBox" v-if="item.isReplay">
                                    <div class="inpRow">
                                        <a-input v-model:value="replyComment" placeholder="输入回复内容"></a-input>
                                    </div>
                                    <div class="btnRow">
                                        <a-button type="primary" @click="sendCommentReplay(item)">回复</a-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="inpRow">
                            <a-input v-model:value="comment" placeholder="输入评论内容"></a-input>
                        </div>
                        <div class="btnRow">
                            <a-button type="primary" @click="sendComment">评论</a-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="closeIcon" @click="handleClose" title="关闭">
                <CloseOutlined />
            </div>
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
        RightOutlined
    } from "@ant-design/icons-vue";
    import Swiper from 'swiper';
    import 'swiper/swiper-bundle.css'; // 导入 Swiper 样式
    const emit = defineEmits(["cancel"]);
    import { formTreeData,girdFormatterValue } from "@/utils/common.js";
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
        let url=require('@/assets/img/filetype/defaultImg.png');
        if(data.imageList[index]&&data.imageList[index].ThumbnailUrl){
            url=data.imageList[index].ThumbnailUrl
        }
        return url;
    };
    const changeImg = (index) => {
        //console.log(index,'current')
        data.id=data.imageList[index].id;
        data.currentIndex.i=index;
        data.detail=data.imageList[index];
        getCommentList();
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
        currentIndex:{i:0},
        imageList:[],
        id:'',
        detail:{},
        total:0,
        currentUserName:'',
        currentUserId:'',
        rotate:0,
    })
    const { rotate,currentUserName,currentUserId,total,detail,currentIndex,imageList,id,items, mySwiper, commentList, comment, replyComment } = toRefs(data);
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
        let filterQuery='\nRegardingObjectId\teq\t'+data.id;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'20310',
            entityName:'Comment',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'CreatedOn',
            order:'asc',
            displayColumns:'Name,CreatedBy,CreatedOn,Body,CommentQty,LikeQty,'
        }).then(res => {
            var list = [];
            data.total = res.pageInfo?res.pageInfo.total:0;
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='CreatedOn'){
                        item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
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
        let url=Interface.create;
            let d = {
            actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: 'Comment',
                        objTypeCode: '20310',
                        fields: {
                            Body:item?data.replyComment:data.comment,
                            RegardingObjectId:data.id,
                            ParentId:item?item.id:null,
                            Name: item?data.currentUserName+' 回复 '+item.CreatedBy:'',
                            CreatedBy:data.currentUserId
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
            proxy.$post(url,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                    message.success("评论成功！");
                    getCommentList();
                    data.comment = '';
                    data.replyComment = '';
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                        message.error(res.actions[0].errorMessage);
                    }
                    else{
                        message.error("评论失败！");
                    }
                }
            });
    }
    const setLike = () => {
        return
        proxy.$get(Interface.file.like,{
            chatterId: data.id,
            likeType: 0
        }).then(res=>{
            message.success(res.msg);
        })
    }
    const handleCommentReply = (item) => {
        item.isReplay = !item.isReplay;
    }
    const setCommentLike = (item) => {
        return
        proxy.$get(Interface.file.like,{
            chatterId: data.id,
            CommentId: item.CommentId,
            likeType: 1
        }).then(res=>{
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
    const handleFullScreen=()=>{
        window.open(data.detail.ThumbnailUrl)
    }
    //旋转
    const handleRotate=()=>{
        data.rotate += 90;
        $('.slick-slide img').css('transform', 'rotate(' + data.rotate + 'deg)');
    }
    //下载
    const handleDownload=()=>{
        axios({
            url: data.detail.ThumbnailUrl,
            method: 'get',
            responseType:'blob',
        }).then(res=>{
            let url=window.URL.createObjectURL(res.data);
            const a = document.createElement('a');
            a.href=url;
            a.download=data.detail.Name+'.'+data.detail.FileExtension;
            a.click();
        }).catch(err => {
            console.log('error', err);
            message.error("下载失败！");
        });
    }
    onMounted(() => {
        if(props.photoParams){
            data.currentIndex.i=props.photoParams.index||0;
            data.imageList=props.photoParams.imageList||[];
            data.id=props.photoParams.id||'';
            data.detail=props.photoParams.item||{};
            carouselRef.value.goTo(data.currentIndex.i, true);
        }
        //console.log(props.photoParams)
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            data.currentUserId=userInfo.userId;
            data.currentUserName=userInfo.fullName;
        }
        getCommentList();
    })
</script>
<style lang="less" scoped>
    .d-modal {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(234, 234, 234, 0.3);
        z-index: 999;

        .dModal-box {
            background: rgba(64, 52, 51, 0.9);
            width: 95%;
            height: calc(~"100% - 40px");
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
                    width: calc(~"100% - 350px");
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                    .photoHeadInfo{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 20px;
                        color: #fff;
                        position: absolute;
                        top: 0;
                        .photoIcons{
                            .icon{
                                width: 40px;
                                height: 40px;
                                text-align: center;
                                display: inline-block;
                                background: rgba(54, 54, 54, 80%);
                                margin-right: 20px;
                                border-radius: 50%;
                                line-height: 40px;
                                cursor: pointer;
                                &:hover{
                                    background:rgba(30, 30, 30, 90%)
                                }
                            }
                        }
                    }
                }

                .info-box {
                    width: 350px;
                    height: 100%;
                    padding: 16px;
                    box-sizing: border-box;
                    overflow: hidden;
                    background: #fff;

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
                                color: var(--textColor);
                                font-size: 14px;
                                font-weight: bold;
                            }

                            .time {
                                margin-top: 5px;
                            }
                        }
                    }

                    .fileName {
                        padding: 10px 0 5px 0;
                        border-bottom: 1px solid #e2e3e5;
                    }

                    .optionLike {
                        display: flex;
                        justify-content: center;
                        padding: 10px;

                        .optionItem {
                            display: flex;
                            align-items: center;
                            margin: 0 10px;
                            cursor: pointer;

                            svg {
                                width: 17px;
                                fill: #333;
                            }

                            .num {
                                padding-left: 5px;
                            }
                            .icon-pinglun{
                                font-size: 14px;
                            }
                        }
                    }

                    .fileCommentBox {
                        height: calc(~"100% - 110px");
                        background: #f4f4f4;
                        padding: 10px;

                        .commentList {
                            height: calc(~"100% - 85px");
                            overflow-y: auto;
                        }

                        .commentItem {
                            border-bottom: 1px solid #e2e3e5;
                            margin-bottom: 5px;
                            .commentName {
                                color: var(--textColor);
                            }

                            .desc {
                                line-height: 1.5;
                                margin: 5px 1px;
                                word-break: break-all;
                            }
                        }
                        .replyBox{
                            background: #fff;
                            padding: 10px;
                        }

                        .bottomInfo {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-bottom: 5px;
                            zoom: 0.9;
                            svg {
                                width: 17px;
                                position: relative;
                                top: 3px;
                            }

                            .icons {
                                display: flex;
                                align-items: center;
                            }
                            .icon-pinglun,.icon-yishanchu{
                                font-size: 14px;
                            }

                            .icon {
                                display: inline-block;
                                padding: 0 5px;
                                cursor: pointer;
                            }
                            .time{
                                color: #86909c;
                            }
                        }

                        .btnRow {
                            text-align: right;
                            margin-top: 15px;
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
        max-width: 80%;
        border: 0;
    }

    // :deep(.slick-arrow) {
    //     //display: none !important;
    // }
    :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff !important;
    background-color: rgba(31, 45, 61, 0.11);
    transition: ease all 0.3s;
    opacity: 0.5;
    z-index: 1;
    }
    :deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
    }
    :deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff !important;
    opacity: 1;
    }
    :deep(.slick-thumb) {
        bottom: 0px;
    }

    :deep(.slick-thumb li) {
        width: 60px;
        height: 45px;
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

    :deep .ant-carousel{
        margin-top: 20px;
        width: 100%;
        height: calc(~"100% - 20px") !important;
    }
    :deep .ant-carousel .slick-slider{
        height: 100%;
    }
    :deep .ant-carousel .slick-list{
        height: calc(~"100% - 100px") !important;
    }
    :where(.css-dev-only-do-not-override-kqecok)[class^="ant-popover"], :where(.css-dev-only-do-not-override-kqecok)[class*=" ant-popover"]{
        z-index: 9999;
    }
    :deep .slick-thumb li{
        min-width: 60px !important;
    }
    :deep .photoWrap{
        .slick-track{
            height: 100%;
        }
        .slick-slide{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .commentList{
        position: relative;
        .empty{
        width: 100%;
        height: auto;
        position: absolute;
        top: 30%;
        z-index: 1;
        color: #999;
        right: 0;
        text-align: center;
        img{
            width: 100px;
        }
      }
    }
    
</style>