<template>
    <div class="emailDetail">
        <div class="mailSubject">
            <div class="title rowEllipsis">
                {{detail.subject||'暂无标题'}}
            </div>
            <div class="emailOption">
                <a-button class="ml5" @click="handleReply">回复</a-button>
                <a-button class="ml5" @click="handleShare">转发</a-button>
                <!-- <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleMenuClick" style="width: 150px;">
                            <a-menu-item key="1">
                                通知
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button class="ml5">移动</a-button>
                </a-dropdown> -->
                <a-button class="ml5">移动</a-button>
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
                        <a-menu-item key="3" @click="handleReply">
                          回复
                        </a-menu-item>
                        <a-menu-item key="4" @click="handleShare">
                            转发
                        </a-menu-item>
                        <a-menu-item key="5" @click="handleDeleteEmail">
                            删除
                        </a-menu-item>
                      </a-menu>
                    </template>
                    <a-button :icon="h(EllipsisOutlined)" class="ml5"> </a-button>
                </a-dropdown>
                <a-button :icon="h(CloseOutlined)" class="ml5" @click="closeDetail"> </a-button>

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
                                <span class="readElement" :class="{active:detail.isRead!=false}"></span>
                            </a-tooltip>
                            <span class="name">{{detail.fromName || ''}}</span>
                            <span class="emailText" :class="{active:detail.isRead}">{{detail.ToEmailAddr || ''}}</span>
                        </div>
                        <div class="rowLabel">
                            <span class="label">收件人：</span>
                            <div class="fullNameList" v-if="receiverNames!=''">
                                <span class="emailFullName" v-for="(item,index) in receiverNames" :key="index">{{item}}</span>
                            </div>
                        </div>
                        <div class="emailTitleBox" v-if="isEmailTitle">
                            {{detail.subject || ''}}
                        </div>
                    </div>
                    <div class="emailOther">
                        <div class="timerRow"><span><i class="iconfont icon-zhongyaoyoujian"></i></span> <!---->
                            {{detail.createdOn}}
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
            <div class="inboxWrap">
                            <div class="inboxBd">
                                <div class="richText" v-html="detail.body">

                                </div>
                                <div class="inboxFileWrap" v-if="attachments && attachments.length>0">
                                    <div class="inboxFileHead">
                                        <i class="iconfont icon-fujianwenjian"></i>
                                        附件{{attachments && attachments.length}}个（{{filesSizeAll || ''}}）
                                        <!--<span class="shu" v-if="attachments && attachments.length>=2">|</span>
                                        <span class="linkText">打包下载</span>-->
                                    </div>
                                    <div class="inboxFileList" v-if="attachments && attachments.length>0">
                                        <div class="inboxFileItem" v-for="(item,index) in attachments" :key="index">
                                            <div class="leftImg">
                                                <img src="/src/assets/img/filetype/doc.png" v-if="item.FileExtension=='ocx'||item.FileExtension=='docx'||item.FileExtension=='doc'" />
                                                <img src="/src/assets/img/filetype/rar.png" v-else-if="item.FileExtension=='rar'||item.FileExtension=='zip'" />
                                                <img src="/src/assets/img/filetype/Excel.png" v-else-if="item.FileExtension=='xlsx'||item.FileExtension=='xls'" />
                                                <img src="/src/assets/img/filetype/Pdf.png" v-else-if="item.FileExtension=='pdf'" />
                                                <img src="/src/assets/img/filetype/PPT.png" v-else-if="item.FileExtension=='ppt'" />
                                                <img :src="item.ViewLinkUrl||'/src/assets/img/filetype/img.png'" v-else-if="item.FileExtension=='jpg'||item.FileExtension=='png'" />
                                                <img src="/src/assets/img/filetype/Folder.png" v-else />
                                            </div>
                                            <div class="rightFileInfo">
                                                <div class="fileName rowEllipsis">
                                                    {{item.Name || ''}}
                                                </div>
                                                <div class="fileSize">{{item.sizekb || ''}}</div>
                                                <div class="fileOptionShow">
                                                    <div class="btns">
                                                            <button class="btn square default" title="保存到优盘" @click="openUsb(item.Id)">
                                                                <i class="iconfont icon-baocundaoyoupan"></i>
                                                            </button>
                                                            <button class="btn square default" @click="handlePreviewFile(item)" title="预览">
                                                                <i class="iconfont icon-yulanwenjian"></i>
                                                            </button>
                                                            <button class="btn square default" @click="downloadFile(item)" title="下载">
                                                                <i class="iconfont icon-xiazai"></i>
                                                            </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
    const emit = defineEmits(['cancel','reply','share']);
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
            id: props.emailId,
        }).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue){
                data.detail = res.actions[0].returnValue;
                data.receiverNames = data.detail.toUserNames && data.detail.toUserNames.split(',');
                if(data.detail.isGroupmail){
                    data.receiverNames = data.detail.toGroupNames && data.detail.toGroupNames.split(',');
                }
                data.attachments=res.actions[0].returnValue.attachments||[];
            }
        })
    }
    const getAttachments = () => {
        proxy.$get(Interface.email.getAttachments,{
            id: props.emailId,
        }).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue){
                data.attachments=res.actions[0].returnValue||[];
            }
        })
    }
    watch(()=>props.emailId,(newVal,oldVal)=>{
        getDetail();
    },{immediate:true,deep:true})
    const handleDeleteEmail = () => {
        //data.isDelete = true;
        emit("delete", {id:props.emailId});
    }
    const cancelDelete = (e) => {
        data.isDelete = e;
    }

    const deleteEmail = () => {
        data.isDelete = false;
    }
    const closeDetail=()=>{
        emit("cancel", '');
    }
    const handleMenuClick = () => {

    }
    // 未读邮件
    const handleUnRead = () => {
        // proxy.$get(Interface.email.read,{
        //     ids: props.emailId,
        //     isRead: 0
        // }).then(res=>{
        //     message.success("设置成功!");
        // })
        let IsRead=false;
    let url=Interface.edit;
            let d = {
            actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId:props.emailId,
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: 'MailInbox',
                            objTypeCode: '20021',
                            fields: {
                                IsRead:IsRead
                            }
                        }              
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                    message.success("设置成功！");
                    getDetail();
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                        message.success(res.actions[0].errorMessage);
                    }
                    else{
                        message.success("设置失败！");
                    }
                }
            });
    }
    // 重要邮件
    const handleStar = () => {
        // proxy.$get(Interface.email.star,{
        //     Id: props.emailId,
        //     IsStar: 1
        // }).then(res=>{
        //     message.success("设置成功!");
        // })
        let StarEmail=1;
    let url=Interface.edit;
            let d = {
            actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId:props.emailId,
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: 'MailInbox',
                            objTypeCode: '20021',
                            fields: {
                                StarEmail:StarEmail
                            }
                        }              
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                    message.success("设置成功！");
                    getDetail();
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                        message.success(res.actions[0].errorMessage);
                    }
                    else{
                        message.success("设置失败！");
                    }
                }
            });
    }
    const handleReply=()=>{
        let ltagsData={name:data.detail.fromName||'',id:data.detail.fromNameId||'2EC00CF2-A484-4136-8FEF-E2A2719C5ED6',body:''}
        emit("reply", ltagsData);
    }
    const handleShare=()=>{
        let ltagsData={name:'',id:'',body:data.detail.body||''}
        emit("share", ltagsData);
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
                            padding-left: 5px;
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
                        font-size: 14px;
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
        .richText{
            padding: 20px;
        }
        
    }
</style>