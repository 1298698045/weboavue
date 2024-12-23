<template>
    <div class="commentWrap2">
        <div class="panel panel1">
            <div class="panel-head">
                <div class="panel-title">
                    {{props.title}}
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd">
                <div class="panelcommentWrap2">
                    <div class="commentBox">
                        <div class="leftAvatar">
                            <a-avatar :size="37">
                                <template #icon><UserOutlined /></template>
                                <!-- <img :src="require('@/assets/img/avatar-r.png')" alt="" class="commentAvatar" /> -->
                            </a-avatar>
                        </div>
                        <div class="rightTextare">
                            <textarea class="textarea" v-model="comment" placeholder-class="placeholder" placeholder="说点什么吧..." name="" id="" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="optionalWrap">
                        <a-button type="primary" @click="handleSendComment">发布</a-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel2">
            <!-- <div class="panel-head">
                <div class="panel-title">
                </div>
                <div class="panel-btn">
                </div>
            </div> -->
            <div class="panel-bd">
                <div class="panelcommentWrap2">
                    <div class="commentList">
                        <div class="empty" v-if="!listData.length">
                            <!-- <img
                            :src="require('@/assets/img/empty.png')"
                            alt=""
                            /> -->
                            <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
                            <p class="emptyDesc">暂无数据</p>
                        </div>
                        <div class="commentItemBox" v-for="(item,index) in listData" :key="index">
                            <div class="leftAvatar">
                                <a-avatar :size="37">
                                    <template #icon><UserOutlined /></template>
                                    <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                </a-avatar>
                            </div>
                            <div class="rightComment">
                                <div class="commentName">{{item.OwningUser||'暂无'}}</div>
                                <div class="commentTime">
                                    {{item.CreatedOn}}
                                </div>
                                <div class="commentContent" v-html="item.Description||'暂无'"></div>
                                <div class="commentBtn">
                                    <!-- <span class="deleteComment" @click="handleDelete(item.id)">删除</span> -->
                                     <!-- <span class="commentBtn-item" title="删除" v-if="item.OwningUserId&&data.OwningUser&&data.OwningUser==item.OwningUserId" @click="handleDelete(item.id)" ><DeleteOutlined /></span> -->
                                     <span class="commentBtn-item" title="点赞" ><LikeOutlined />赞(<span>{{ item.NumOfLike||0 }}</span>)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pagination">
                        <a-pagination
                        show-size-changer
                        show-quick-jumper
                        :pageSizeOptions="['10', '20', '50', '80', '100']"
                        :pageSize="rows"
                        @showSizeChange="sizeChange"
                        v-model:current="page" :total="total" @change="ChangePage" :show-total="total => `共 ${total} 条`" />
                    </div>
                </div>
            </div>
        </div>
        <Delete :isShow="isDelete" :desc="deleteDesc" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" @cancel="closeDelete" @ok="deleteOk" />
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, defineProps } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';

    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    import { UserOutlined,LikeOutlined,DeleteOutlined } from "@ant-design/icons-vue";
    import { notification } from 'ant-design-vue';
    import Interface from "@/utils/Interface.js";
    import { girdFormatterValue } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    import Delete from "@/components/listView/Delete.vue";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        title:String,
        id:String,
        RegardingObjectTypeCode:String
    })
    const data = reactive({
        listData: [],
        page: 1,
        rows: 10,
        total: 0,
        comment: "",
        searchVal:"",
        isDelete: false,
        recordId:'',
        objectTypeCode:'6000',
        sObjectName:'Chatter',
        deleteDesc: '确定要删除吗？',
        external:false,
        OwningUser:''
    })
    const { listData, page, rows, total, comment,searchVal,isDelete,recordId,objectTypeCode,sObjectName,deleteDesc,external } = toRefs(data);
    const getCommentList_old = () => {
        // proxy.$get(Interface.commentList,{
        //     meetingid:"4c51a922-8762-40ae-9e10-5e1fa3f51a60",
        //     page: page,
        //     rows: rows
        // }).then(res=>{
        //     data.listData = res.rows;
        //     data.total = res.total;
        // })
        data.listData = [];
        data.total = 0;
        let filterQuery='\nRegardingObjectId\teq\t'+props.id;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'6000',
            entityName:'Chatter',
            filterQuery:filterQuery,
            search:data.searchVal,
            page: data.page,
            rows: data.rows,
            sort:'CreatedOn',
            order:'desc',
            displayColumns:'OwningUser,CreatedOn,Description,NumOfComment,NumOfLike,ImageUrls'
        }).then(res => {
            var list = [];
            data.total = res.pageInfo?res.pageInfo.total:0;
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='ImageUrls'){
                        if(cell=='OwningUser'){
                            item['OwningUserId']=item[cell].userValue.Value;
                            if(item['OwningUserId']){
                                item['OwningUserId']=(item['OwningUserId']).toUpperCase();
                            }
                        }
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='ImageUrls'){
                        item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
                    }
                    if(cell=='CreatedOn'){
                        item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                    }
                }
                list.push(item)
            }
            data.listData = list;
            
        })
    }
    const getCommentList = () => {
        data.listData = [];
        data.total = 0;
        let filterQuery='\nRegardingObjectId\teq\t'+props.id;
        let url=Interface.commonstatus.query;
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        pageSize: data.rows,
                        pageNumber: data.page,
                        filterQuery: filterQuery,
                        search: ''
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
            var list = [];
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                data.total = res.actions[0].returnValue.length||0;
                for (var i = 0; i < res.actions[0].returnValue.length; i++) {
                    var item = res.actions[0].returnValue[i];
                    for(var cell in item){
                        if(cell=='ImageUrls'){
                            item[cell]=require('@/assets/img/avatar-r.png');
                        }
                        if(cell=='CreatedOn'||cell=='createdOn'){
                            item['CreatedOn']=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                        }
                    }
                    if(!item['ImageUrls']){
                        item['ImageUrls']=require('@/assets/img/avatar-r.png');
                    }
                    item['OwningUserId']=item.createdByName||'';
                    item['OwningUser']=item.createdBy||'';
                    item['Description']=item.text==''?'<span style="color:rgba(0, 0, 0, 0.25);">暂无内容</span>':item.text;
                    item['NumOfLike']=item.numOfLike||0;
                    item['NumOfComment']=item.numOfComment||0;
                    list.push(item)
                }
            }
            if(list&&list.length){
                data.listData = list;
            }
        })
    }
    //改变页码
    const ChangePage=(page, pageSize)=>{
        data.page=page;
        data.rows=pageSize;
        getCommentList();
    }
    const sizeChange=(current, size)=>{
        ChangePage(current, size)
    }
    const key = 'updatable';
    const handleSendComment = () => {
        if(data.comment==""){
            notification.open({
                key,
                message: "评论内容不能为空！"
            });
        }else {
            // proxy.$get(Interface.sendComment,{
            //     title: data.comment,
            //     ObjectId: "4c51a922-8762-40ae-9e10-5e1fa3f51a60"
            // }).then(res=>{
            //     if(res.status==1){
            //         notification.open({
            //             key,
            //             message: res.msg
            //         });
            //         data.comment = "";
            //     }
            // })
            // let url=Interface.create;
            //     let d = {
            //     actions:[{
            //         id: "2919;a",
            //         descriptor: "",
            //         callingDescriptor: "UNKNOWN",
            //         params: {
            //         recordInput: {
            //             allowSaveOnDuplicate: false,
            //             apiName: 'Chatter',
            //             objTypeCode: '6000',
            //             fields: {
            //                 RegardingObjectId: props.id,
            //                 OwningUser:data.OwningUser,
            //                 Description:data.comment,
            //                 RegardingObjectTypeCode:props.RegardingObjectTypeCode
            //             }
            //         }              
            //         }
            //     }]
            // };
            
            // let obj = {
            //     message: JSON.stringify(d)
            // }
            // proxy.$post(url,obj).then(res=>{
            // if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
            //     message.success("发布成功！");
            //     getCommentList();
            //     data.comment = "";
            // }
            
            // });
            let url=Interface.status.submit;
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        text:data.comment,
                        chatterTypeCode:0,
                        RegardingObjectId: props.id,
                        location: {
                            location: "",
                            buidingName: "",
                            longitude: "",
                            latitude: ""
                        },
                        visible: {
                            visibleType: 0
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                message.success("发布成功！");
                data.page=1;
                getCommentList();
                data.comment = "";
            }
            
            });
        }
    }
    // 删除
    const handleDelete = (e) => {
        data.recordId=e;
        data.isDelete = true;
    };
    const closeDelete = (e) => {
        data.recordId='';
        data.isDelete = false;
    };
    const deleteOk = (e) => {
        getCommentList();
    };
    onMounted(() => {
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            data.OwningUser=userInfo.userId;
            if(data.OwningUser=='jackliu'){
                data.OwningUser='2ec00cf2-a484-4136-8fef-e2a2719c5ed6';
            }
            data.OwningUser=(data.OwningUser).toUpperCase();
        }
        getCommentList();
    });
</script>
<style lang="less">
    .commentWrap2{
        width: 100%;
        .panelcommentWrap2{
            padding: 0 80px;
            .commentBox{
                display: flex;
                .leftAvatar{
                    margin-right: 12px;
                }
                .rightTextare{
                    flex: 1;
                    border-radius: 2px;
                    .textarea{
                        width: 100%;
                        height: 100px;
                        min-height: 22px;
                        border-radius: 2px;
                        background: #f2f3f5;
                        padding-top: 6px;
                        padding-left: 12px;
                        font-size: 14px;
                        border: none;
                        outline: 0;
                        resize: vertical;
                    }
                }
            }
            .optionalWrap{  
                text-align: right;
                padding-top: 10px;
            }
            .commentList{
                .commentItemBox{
                    display: flex;
                    margin-top: 20px;
                    .leftAvatar{
                        font-size: 36px;
                        color: #C9CDD4;
                        margin-right: 12px;
                    }
                    .rightComment{
                        flex: 1;
                        overflow: hidden;
                        .commentName{
                            font-size: 14px;
                            color: #ff7d00;
                        }
                        .commentContent{
                            margin: 6px 0;
                        }
                        .commentTime{
                            font-size: 12px;
                            color: #86909c;
                        }
                        .commentBtn{
                            font-size: 12px;
                            color: #86909c;
                        }
                    }
                }
            }
            .pagination{
                margin-top: 20px;
                text-align: right;
                max-height: 74px;
            }
        }
        .commentAvatar{
            width: 40px;
            height: 40px;
            position: relative;
            top: 0px;
        }
        :where(.css-dev-only-do-not-override-kqecok).ant-avatar{
            // background: transparent !important;
            width: 40px !important;
            height: 40px !important;
            line-height: 40px !important;
        }
        :where(.css-dev-only-do-not-override-kqecok).ant-avatar .ant-avatar-string{
            left: 0 !important;
            transform: unset !important;
        }
        .deleteComment{
            cursor: pointer; 
            margin-left: 8px;
        }
        height: 100%;
        .panel{
            height: 100%;
            padding: 15px;
        }
        .panel1{
            height: 210px;
            margin-bottom: 18px;
        }
        .panel2{
            height: calc(~'100% - 230px');
        }
        .panelcommentWrap2 {
            padding: 0 15px;
            padding-right: 15px;
            height: 100%;
            padding-left: 0px;
        }
        .panelcommentWrap2 .commentBox{
            padding-left: 20px;
        }
        .panel-bd{
            height: calc(~'100% - 40px') !important;
        }
        .commentList{
            height: calc(~'100% - 225px') !important;
            overflow: auto;
            margin-top: 18px;
        }
        .commentTime{
            text-align: left;
        }
        .commentBtn{
            text-align: right;
        }
        .panelcommentWrap2 .commentList .commentItemBox{
            margin: 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
            padding-right: 20px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .panelcommentWrap2 .commentList .commentItemBox:hover{
            background: #e9f7ff !important;
        }
        .ant-avatar{
            line-height: 36px !important;
            position: relative;
            top: -8px;
        }
        .commentBtn-item{
            font-size: 14px;
            margin-left: 10px;
            cursor: pointer;
            color: #666;
            .anticon{
                font-size: 15px;
                margin-right: 10px;
            }
        }
    }
    .ant-pagination{
        .ant-pagination-item{
            border: 1px solid #d9d9d9;
        }
        .ant-pagination-item:hover{
            border: 1px solid #1677ff;
            background: #fff !important;
        }
        .ant-pagination-item-active,.ant-pagination-item-active:hover{
            border: 1px solid #1677ff;
            background: #1677ff !important;
            a{
                color: #fff;
            }
        }
    } 
    .commentWrap2 {
        .commentList{
            height: calc(~'100% - 15px') !important;
            margin-top: 0 !important;
        }
        .panel1 .panel-head{
            margin-bottom: 15px !important;
        }
        .panel1 .ant-avatar{
            top: 0px !important;
        }
        .empty {
            background: #fff;
            padding: 8px 0 22px;
            svg,img{
            width: 120px !important;
            }
            .emptyDesc{
                color: #ccc;
                margin-top: 10px;
            }
        }
    }
</style>