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
                    <h1 class="title">测试</h1>
                    <div class="info">
                         · jackliu3 | 评论<span class="num"> 0</span> · 阅读<span class="num"> 1</span> | 2023/11/6 11:18:32
                    </div>
                    <div class="article"></div>
                    <div class="tagWrap">
                        文章关键字
                    </div>
                    <div class="operation">
                        <div class="like btnRadius">
                            <i class="iconfont icon-zan2"></i>
                            0
                        </div>
                    </div>
                    <div class="tabContainer">
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="阅读"></a-tab-pane>
                            <a-tab-pane key="2" tab="评论"></a-tab-pane>
                        </a-tabs>
                        <div class="tabContent" v-if="activeKey=='1'">
                            <div class="readList">
                                <div class="readItem">
                                    <div class="avatar">
                                        <i class="iconfont icon-morentouxiang"></i>
                                    </div>
                                    <div class="rightRead">
                                        <div class="name">六区 / 王雪梅</div>
                                        <div class="time">2023/11/7 20:53:00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tabContent" v-if="activeKey=='2'">
                            <Comment />
                        </div>
                    </div>
                </div>
                <div class="rightBody">
                    <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">
                                最新公告
                            </div>
                        </div>
                        <div class="panel-bd">
                            
                        </div>
                    </div>
                </div>
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
    import Comment from "@/components/detail/Comment.vue";

    import { useRouter, useRoute } from "vue-router";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const route = useRoute();
    const data = reactive({
        id: route.query.id,
        objectTypeCode: route.query.objectTypeCode,
        detail: {},
        activeKey: '1'
    })
    const { tabs, activeKey, id, objectTypeCode, detail } = toRefs(data);

    const getDetail = ()=> {
        proxy.$get(Interface.information.detail,{
            id: data.id,
            objectTypeCode: data.objectTypeCode
        }).then(res=>{
            console.log("res",res);
            data.detail =  res.actions[0].returnValue.record;
        })
    }
    getDetail();
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
            margin-top: 16px;
            .leftBody{
                flex: 1;
                height: 100%;
                background: #fff;
                margin-right: 12px;
                border-radius: 4px;
                padding: 22px 20px;
                box-sizing: border-box;
                .title{
                    font-size: 37px;
                    color: #1d2129;
                    font-weight: bold;
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
</style>