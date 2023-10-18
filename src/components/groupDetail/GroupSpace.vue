<template>
    <div class="GroupSpace">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">发布帖子</div>
            </div>
            <div class="panel-bd">
                <TEditor :placeholder="'有什么新鲜事想分享给大家?'" />
            </div>
        </div>
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">群主动态</div>
                <div class="panel-search">
                    <a-input-search
                        v-model:value="searchVal"
                        placeholder="搜索动态"
                        style="width: 300px;"
                        @search="onSearch"
                    />
                </div>
            </div>
            <div class="panel-bd">
                <div class="trendsWrap">
                    <div class="trendsItem" v-for="(item,index) in spaceList" :key="index">
                        <div class="avatar">
                            <img :src="require('@/assets/img/avatar-r.png')" alt="">
                        </div>
                        <div class="trends-info">
                            <div class="info-name">
                                {{item.OwningUserName}}
                                <svg viewBox="0 0 24 24" aria-label="认证账号" role="img" class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>
                                <span class="name2">@{{item.OwningUserName}}</span>
                            </div>
                            <div class="info-time">
                                {{item.CreatedOn}}
                            </div>
                            <div class="info-desc">
                                {{item.Description}}
                            </div>
                        </div>
                        <div class="trends-more">
                            <EllipsisOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, h
    } from "vue";
    import { EditOutlined, UnorderedListOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { message } from "ant-design-vue";
    import TEditor from "@/components/TEditor.vue";

    
    const data = reactive({
        adminList: [],
        peopleList: [],
        searchVal: "",
        spaceList: []
    });
    const { adminList, peopleList, searchVal, spaceList } = toRefs(data);
    const onSearch = (e) => {

    }
    const getSpace = ()=> {
        proxy.$get(Interface.group.statusList,{
            objectId: ""
        }).then(res=>{
            data.spaceList = res.listData;
        })
    }
    getSpace();
</script>
<style lang="less">
    .GroupSpace{
        .trendsWrap{
            .trendsItem{
                display: flex;
                padding: 15px 20px;
                border-radius: 3px;
                border-bottom: 1px solid #e2e3e5;
                .avatar{
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .trends-info{
                    flex: 1;
                    .info-name{
                        display: flex;
                        align-items: center;
                        font-weight: bold;
                        svg{
                            width: 18px;
                            margin: 0 3px;
                            margin-left: 1px;
                            fill: var(--textColor);
                        }
                        .name2{
                            color: #536471;
                            font-weight: normal;
                        }
                    }
                    .info-time{
                        margin-top: 5px;
                        color: #808080;
                    }
                    .info-desc{
                        font-size: 15px;
                        margin: 15px 0 5px 0;
                    }
                }
            }
            .trendsItem:hover{
                background: #f4f4f4;
            }
        }
    }
</style>