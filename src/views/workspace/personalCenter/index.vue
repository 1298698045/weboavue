<template>
    <div class="wrapper">
        <div class="appcenter-header-wrap">
            <a-input-search v-model:value="searchVal" placeholder="搜索" style="width: 300px" @search="onSearch" />
        </div>
        <div class="workplace_content-wrap">
            <div class="workplace_content-section common">
                <div class="list-layout-wrap appcenter-list-layout-item-4">
                    <div class="common_card-wrap common_card-wrap100" @click="handleDetail(item)" v-for="(item,index) in objData.favouriteApplicationLinks" :key="index">
                        <div class="appcenter-card-wrap">
                            <div class="appcenter-avatar-wrap">
                                <div
                                    class="larkc-avatar larkc-avatar-small appcenter-avatar-inline">
                                    <img class="larkc-avatar-img" alt="Avatar" :src="getImagePath(item.PictureUrl)">
                                </div>
                            </div>
                            <div class="appcenter-recommend-wrap without-tag">
                                <div
                                    class="appcenter-recommend-name appcenter-recommend-name-withouttag">
                                    <span class="">{{item.Label}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="common_card-wrap">
                        <div class="appcenter-add-card" @click="handleOpenModal">
                            <div class="apcenter-add-left"><img
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCI+CiAgICA8ZGVmcz4KICAgICAgICA8Y2lyY2xlIGlkPSJhIiBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiLz4KICAgICAgICA8bWFzayBpZD0iYiIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB4PSIwIiB5PSIwIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHVzZSBmaWxsPSIjRjNGM0YzIiBzdHJva2U9IiNENUQ1RDUiIHN0cm9rZS1kYXNoYXJyYXk9IjIsMiIgc3Ryb2tlLXdpZHRoPSIyIiBtYXNrPSJ1cmwoI2IpIiB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDxwYXRoIHN0cm9rZT0iIzlDQTJBOSIgZD0iTTIwLjQxNyAxMy4zMzN2Ni4yNWg2LjI1di44MzRoLTYuMjV2Ni4yNWgtLjgzNHYtNi4yNWgtNi4yNXYtLjgzNGg2LjI1di02LjI1aC44MzR6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=">
                            </div>
                            <div class="appcenter-add-right"><span>添加常用</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="workplace_content-section">
                <div class="workplace-app-title">全部应用</div>
            </div>
            <div class="category-list-section">
                <div class="category-list-wrap">
                    <div class="category-list">
                        <div class="category-list-content">
                            <a class="category-list-item" @click="handleTab(item,index)" :class="{'active-item':currentTab==index}" v-for="(item,index) in objData && objData.Groups" :key="index">
                                <span :title="item.Label">
                                    <span>{{item.Label}}</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="app-list-section">
                <div class="list-layout-wrap appcenter-list-layout-item-4 app-list-layout">
                    <div class="appcenter-card-wrap" @click="handleDetail(item)" v-for="(item,index) in applicationList" :key="index">
                        <div class="appcenter-avatar-wrap">
                            <div class="larkc-avatar larkc-avatar-small appcenter-avatar-inline">
                                <img class="larkc-avatar-img" :src="getImagePath(item.PictureUrl)" alt="">
                            </div>
                        </div>
                        <div class="appcenter-listapp-wrap" style="margin-left: 10px;">
                            <div class="appcenter-listapp-title">
                                <div class="appcenter-listapp-name">{{item.Label}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddApplication v-if="isModal" :objData="objData" :isModal="isModal" @cancel="cancelApplication" />
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
        inject
    } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import {
        AlignCenterOutlined, SearchOutlined, RightOutlined
    } from "@ant-design/icons-vue";
    import "@/style/personalCenter.css";
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    import AddApplication from "@/components/workspace/AddApplication.vue";
    const router = useRouter();
    const data = reactive({
        currentTab: 0,
        searchVal: "",
        objData: {},
        applicationList: [],
        groupId: "",
        isModal: false
    });
    const { currentTab, searchVal, objData, applicationList, groupId, isModal } = toRefs(data);
    const onSearch = (e) => {

    }
    const getQuery = () => {
        proxy.$get(Interface.workspace.list,{}).then(res=>{
            data.objData = res;
            if(res.Groups){
                var applications = [];
                data.objData.Groups.forEach(function(item){
                    item.Applications.forEach(function(v){
                        applications.push(v);
                    })
                })
                data.objData.Groups.unshift({
                    GroupId:"",
                    Applications: applications,
                    Label:"全部",
                    Name: ""
                })
                data.groupId = res.Groups[0].GroupId;
                data.applicationList =res.Groups[0].Applications;
            }
        })
    }
    getQuery();
    const getImagePath = (imagePath) => {
        if(imagePath){
            try {
                return require(`@/assets${imagePath}`);
            } catch (error) {
                console.error(`Error loading image: ${error.message}`);
                return '';
            }
        }
    }
    const handleOpenModal = () => {
        data.isModal = true;
    }
    const handleDetail = (item) => {
        if(item.Label=='邮件'){
            let url = router.resolve({
                path:'/email',
                name: "Email",
                query: {
                    
                },
            });
            //window.open(url.href);
            window.location.href=url.href;
        }
    }
    const cancelApplication = (e, params) => {
        if(params) {
            getQuery();
        }
        data.isModal = e;
    }
</script>