<template>
    <div class="commentWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title" v-if="isTitle">
                    公共面板评论
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd">
                <div class="panelCommentWrap">
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
                    <div class="commentList">
                        <div class="commentItemBox" v-for="(item,index) in listData" :key="index">
                            <div class="leftAvatar">
                                <a-avatar :size="37">
                                    <template #icon><UserOutlined /></template>
                                    <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                </a-avatar>
                            </div>
                            <div class="rightComment">
                                <div class="commentName">{{item.OwningUser||'暂无'}}</div>
                                <div class="commentContent">{{item.Description||'暂无'}}</div>
                                <div class="commentTime">
                                    {{item.CreatedOn}}
                                    <span class="deleteComment" @click="handleDelete(item.id)">删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pagination">
                        <a-pagination v-model:current="page" :total="total" show-less-items @change="ChangePage" :show-total="total => `共 ${total} 条`" />
                    </div>
                </div>
            </div>
        </div>
        <Delete :isShow="isDelete" :desc="deleteDesc" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" @cancel="closeDelete" @ok="deleteOk" />
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, defineProps } from "vue";
    import { UserOutlined } from "@ant-design/icons-vue";
    import { notification } from 'ant-design-vue';
    import Interface from "@/utils/Interface.js";
    import { girdFormatterValue } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    import Delete from "@/components/listView/Delete.vue";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        isTitle: {
            default: true,
            type: Boolean
        },
        id:String
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
    })
    const { listData, page, rows, total, comment,searchVal,isDelete,recordId,objectTypeCode,sObjectName,deleteDesc,external } = toRefs(data);
    const getCommentList = () => {
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
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='ImageUrls'){
                        item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
                    }
                }
                list.push(item)
            }
            data.listData = list;
            
        })
    }
    getCommentList();
    //改变页码
    const ChangePage=(page, pageSize)=>{
        data.page=page;
        getCommentList();
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
            let url=Interface.create;
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: 'Chatter',
                        objTypeCode: '6000',
                        fields: {
                            RegardingObjectId: props.id,
                            Description:data.comment,
                            RegardingObjectTypeCode:9
                        }
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
</script>
<style lang="less">
    .commentWrap{
        width: 100%;
        .panelCommentWrap{
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
    }
</style>