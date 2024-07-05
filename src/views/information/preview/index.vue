<template>
    <div class="previewWrap">
        <div class="preview">
            <div class="crumbs">
                <a-breadcrumb>
                    <a-breadcrumb-item><a href="/">主页</a></a-breadcrumb-item>
                    <a-breadcrumb-item><a href="#/oa/information">信息中心</a></a-breadcrumb-item>
                    <a-breadcrumb-item>详情页</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <div class="center">
                <div class="leftBody">
                    
                    <div class="tabContainer">
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="详情"></a-tab-pane>
                            <a-tab-pane key="2" tab="阅读"></a-tab-pane>
                            <a-tab-pane key="3" tab="评论"></a-tab-pane>
                        </a-tabs>
                        <div class="tabContent" v-if="activeKey=='1'">
                            <h1 class="title">{{data.detail.Title||''}}</h1>
                            <div class="info">
                                · jackliu3 | 评论<span class="num"> 0</span> · 阅读<span class="num"> 1</span> | 2023/11/6 11:18:32
                            </div>
                            <div class="article" v-html="data.detail.ContentBody||''"></div>
                            <div class="tagWrap">
                                文章关键字
                            </div>
                            <div class="tagWrap">
                                附件
                                <span class="tag" v-for="(item,index) in detail.Attachments" :key="index">
                                    <i class="iconfont icon-file-tupian"></i>
                                    {{item.Name}}
                                    <a href="#">查看</a>
                                    <a :href="item.DownloadURL">下载</a>
                                </span>
                            </div>
                            <div class="operation">
                                <div class="like btnRadius" @click="handleLike">
                                    <i class="iconfont icon-zan2" :class="{'active':detail.IsLike==1}"></i>
                                    {{detail.LikeCount}}
                                </div>
                            </div>
                        </div>
                        <div class="tabContent" v-if="activeKey=='2'">
                            <div class="readList">
                                <div class="readItem" v-for="(item,index) in readList" :key="index">
                                    <div class="avatar">
                                        <i class="iconfont icon-morentouxiang"></i>
                                    </div>
                                    <div class="rightRead">
                                        <div class="name">{{item.DeptName}} / {{item.ReaderName}}</div>
                                        <div class="time">{{item.CreatedOn}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="pagination">
                                <a-pagination v-model:current="current" :total="50" show-less-items />
                            </div>
                        </div>
                        <div class="tabContent" v-if="activeKey=='3'">
                            <Comment />
                        </div>
                    </div>
                </div>
                <!-- <div class="rightBody">
                    <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">
                                最新公告
                            </div>
                        </div>
                        <div class="panel-bd">
                            <div class="panelList">
                                <div class="panelItem" v-for="(item,index) in contentNotices" :key="index">
                                    <div class="panelItemTitle">{{item.Title}}</div>
                                    <div class="panelItemCen">
                                        <span class="noticeTag">
                                            {{item.CategoryName}}
                                        </span>    
                                        {{item.FullName}} · {{item.DeptName}}
                                    </div>
                                    <div class="panelItemInfo">
                                        {{item.CommentCount}}评论 · {{item.ReadCount}}阅读 · {{item.CreatedOn}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">
                                推荐阅读
                            </div>
                        </div>
                        <div class="panel-bd">
                            <div class="panelList">
                                <div class="panelItem" v-for="(item,index) in contentNotices" :key="index">
                                    <div class="panelItemTitle">{{item.Title}}</div>
                                    <div class="panelItemCen">
                                        <span class="noticeTag">
                                            {{item.CategoryName}}
                                        </span>    
                                        {{item.FullName}} · {{item.DeptName}}
                                    </div>
                                    <div class="panelItemInfo">
                                        {{item.CommentCount}}评论 · {{item.ReadCount}}阅读 · {{item.CreatedOn}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import "@/style/icon/iconfont.css";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Comment from "@/components/detail/Comment.vue";

    import { useRouter, useRoute } from "vue-router";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const route = useRoute();
    const data = reactive({
        id: route.query.id,
        objectTypeCode: route.query.objectTypeCode,
        detail: {Title:''},
        activeKey: '1',
        pageNumber: 1,
        pageSize: 10,
        readList: [],
        current: 1,
        total: 0,
        contentNotices: []
    })
    const { tabs, activeKey, id, objectTypeCode, detail, readList, current, total,
        contentNotices } = toRefs(data);

    const getDetail = ()=> {
        // proxy.$get(Interface.information.detail,{
        //     id: data.id,
        //     objectTypeCode: data.objectTypeCode
        // }).then(res=>{
        //     console.log("res",res);
        //     data.detail =  res.actions[0].returnValue.record;
        // })
        let d = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.id,
                    apiName:data.objectTypeCode=='100201'?'Content':'Notice',
                    objTypeCode: data.objectTypeCode
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.detail,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]){
                let record = res.actions[0].returnValue.fields;
                data.detail.Title = record.Title.value;
                data.detail.ContentBody=record.ContentBody.value;
            }
        })
    }
    getDetail();
    const getReadList = () => {
        proxy.$get(Interface.information.readList,{
            NewsId: data.id,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize
        }).then(res=>{
            data.readList = res.listData;
            data.total = res.total;
        })
    }
    getReadList();

    const getNoticeNew = () => {
        proxy.$get(Interface.information.contentRelated,{
            ObjectTypeCode: data.objectTypeCode
        }).then(res=>{
            data.contentNotices = res.listData;
        })
    }
    //getNoticeNew();
    // 点赞
    const handleLike = () => {
        proxy.$get(Interface.information.like,{
            NewsId: data.id,
            LikeType: data.detail.IsLike == 1 ? 0 : 1
        }).then(res=>{
            message.success(res.msg);
            getLikeDetail();
        })
    }
    const getLikeDetail = () => {
        proxy.$get(Interface.information.likeDetail,{
            NewsId: data.id
        }).then(res=>{
            console.log("res",res);
            data.detail = res.data;
        })
    }
    getLikeDetail();
    
</script>
<style lang="less" scoped>
    .previewWrap{
        width: 100%;
        height: 100vh;
        overflow: auto;
        background: #f0f2f6;
        .preview{
            padding: 16px 24px;
        }
        .center{
            display: flex;
            height: 100%;
            margin-top: 16px;
            .leftBody{
                flex: 1;
                background: #fff;
                margin-right: 12px;
                border-radius: 4px;
                padding: 22px 20px;
                box-sizing: border-box;
                .title{
                    font-size: 37px;
                    color: #1d2129;
                    font-weight: bold;
                    margin-top: 25px;
                }
                .info{
                    margin-top: 15px;
                    margin-bottom: 35px;
                    font-size: 14px;
                    color: #86909c;
                    .num{
                        color: #1d2129;
                    }
                }
                .tagWrap{
                    margin: 14px 0;
                    font-size: 14px;
                    color: #86909c;
                    .tag {
                        display: inline-block;
                        padding: 5px 16px;
                        box-sizing: border-box;
                        border-radius: 15px;
                        font-size: 14px;
                        background: #f2f3f5;
                        cursor: pointer;
                        &:hover{
                            color: #86909c;
                            background: #e5e6eb;
                        }
                        a{
                            color: #165dff;
                            margin-left: 10px;
                        }
                    }
                }
                .operation {
                    width: 25%;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    cursor: pointer;
                    .btnRadius{
                        min-width: 80px;
                        text-align: center;
                        background: #fff;
                        border: 1px solid #e5e6eb;
                        cursor: pointer;
                        border-radius: 18px;
                        padding: 8px 13px;
                        color: #4e5969;
                        .iconfont{
                            font-size: 16px;
                            &.active{
                                color: #f53f3f;
                            }
                        }
                    }
                }
                .tabContainer{
                    width: 100%;
                }
            }
            .rightBody{
                height: 100%;
                width: 280px;
                border-radius: 4px;
            }
        }
    }
    .readList{
        .readItem{
            display: flex;
            margin-top: 20px;
            .avatar{
                margin-right: 12px;
                .iconfont{
                    font-size: 36px;
                    color: #c9cdd4;
                }
            }
            .rightRead{
                flex: 1;
                .name{
                    font-size: 14px;
                    color: #ff7d00;
                }
                .time{
                    color: #86909c;
                    font-size: 12px;
                }
            }
        }
    }
    .pagination{
        text-align: right;
    }
    .panelList{
        .panelItem{
            padding: 12px 8px;
            box-sizing: border-box;
            &:hover{
                cursor: pointer;
                background: #f2f3f5;
            }
            .panelItemTitle{
                font-size: 14px;
                color: #1d2129;
            }
            .panelItemCen{
                font-size: 12px;
                color: #86909c;
                padding: 9px 0;
                .noticeTag {
                    color: #3491fa;
                    background: #e8f7ff;
                    display: inline-block;
                    padding: 2px;
                    margin-right: 14px;
                }
            }
            .panelItemInfo{
                font-size: 12px;
                color: #86909c;
            }
        }
    }
    .panel{
        max-height: 400px;
        overflow: auto;
    }
</style>