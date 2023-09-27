<template>
    <div class="commentWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
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
                                </a-avatar>
                            </div>
                            <div class="rightComment">
                                <div class="commentName">{{item.user.displayName}}</div>
                                <div class="commentContent">{{item.title}}</div>
                                <div class="commentTime">
                                    {{item.createdOn}}
                                    <span class="deleteComment" style="cursor: pointer; margin-left: 8px;">删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pagination">
                        <a-pagination v-model:current="page" :total="total" show-less-items />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import { UserOutlined } from "@ant-design/icons-vue";
    import { notification } from 'ant-design-vue';
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        listData: [],
        page: 1,
        rows: 10,
        total: 0,
        comment: ""
    })
    const { listData, page, rows, total, comment } = toRefs(data);
    const getCommentList = () => {
        proxy.$get(Interface.commentList,{
            meetingid:"4c51a922-8762-40ae-9e10-5e1fa3f51a60",
            page: page,
            rows: rows
        }).then(res=>{
            data.listData = res.rows;
            data.total = res.total;
        })
    }
    getCommentList();
    const key = 'updatable';
    const handleSendComment = () => {
        if(data.comment==""){
            notification.open({
                key,
                message: "评论内容不能为空！"
            });
        }else {
            proxy.$get(Interface.sendComment,{
                title: data.comment,
                ObjectId: "4c51a922-8762-40ae-9e10-5e1fa3f51a60"
            }).then(res=>{
                if(res.status==1){
                    notification.open({
                        key,
                        message: res.msg
                    });
                    data.comment = "";
                }
            })
        }
    }
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
    }
</style>