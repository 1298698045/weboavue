<template>
    <div class="detailWrap">
        <div class="detail-header">
            <div class="leftBox">
                <div class="title">
                    <div>
                        <span>{{detail.Title}}&nbsp;</span>
                    </div>
                </div>
                <div class="tabWrap">
                    <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                        <a-tab-pane v-for="(item,index) in tabs" :key="index">
                            <template #tab>
                                <span>
                                    {{item.label}}
                                </span>
                            </template>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
            <div class="rightBox">
                <a-button type="primary" class="ml10" @click="handleEdit">编辑</a-button>
                <a-button type="primary" class="ml10">删除</a-button>
                <a-button type="primary" class="ml10" @click="changeStatus">更改状态</a-button>
                <a-button class="ml10" @click="handlePreview">预览</a-button>
                <a-button class="ml10" @click="handleRemind">提醒</a-button>
                <a-dropdown :trigger="['hover']" class="ml10">
                    <span class="btn-drop">
                      <UnorderedListOutlined style="color: #1D2129;" />
                    </span>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="1">
                          查看范围
                        </a-menu-item>
                        <a-menu-item key="2">
                          邀请查看者
                        </a-menu-item>
                        <a-menu-item key="3">
                          邀请所有人
                        </a-menu-item>
                        <a-menu-item key="4" @click="handleNotes">
                            备注
                        </a-menu-item>
                        <a-menu-item key="5" @click="handleAddClass">
                            添加分类
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
            </div>
        </div>
        <div class="detail-scroll">
            <div class="detail-bd">
                <div class="tabContainer containerForm" v-if="activeKey==0">
                    <div class="tableBox">

                    </div>
                    <div class="rightAside">
                        <div class="panel">
                            <div class="panel-head">
                                <div class="panel-title">
                                    附件 (0)
                                </div>
                            </div>
                            <div class="panel-bd">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContainer" v-if="activeKey==2">
                    <PersonnelList  :id="id" :objectTypeCode="objectTypeCode" />
                </div>
                <div class="tabContainer" v-if="activeKey==3">
                    <Comment />
                </div>
                <div class="tabContainer" v-if="activeKey==4">
                    <AffiliatedColumn  :id="id" :objectTypeCode="objectTypeCode" @addClass="handleAddClass" />
                </div>
                <div class="tabContainer" v-if="activeKey==5">
                    <!-- <Comment /> -->
                </div>
            </div>
        </div>
        <InfoNotes :isShow="isNotes" :id="id" :objectTypeCode="objectTypeCode" @cancel="cancelNotes" />
        <ChangeStatus :isShow="isStatus" :id="id" :objectTypeCode="objectTypeCode"  @cancel="cancelStatus" />
        <InfoRemind :isShow="isRemind" :id="id" :objectTypeCode="objectTypeCode"  @cancel="cancelRemind" />
        <InfoAddClass :isShow="isAddClass" :id="id" :objectTypeCode="objectTypeCode"  @cancel="cancelAddClass" />
        <RadioUser :isShow="isUserModal" @cancel="cancelUser" @selectVal="getUserData" />
    </div>
</template>
<script setup>
    import "@/style/detail.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined
    } from "@ant-design/icons-vue";
    import { useRouter, useRoute } from "vue-router";
    import Related from "@/components/detail/Related.vue";
    import Info from "@/components/detail/Info.vue";
    import InfoNotes from "@/components/information/InfoNotes.vue";
    import ChangeStatus from "@/components/information/ChangeStatus.vue";
    import InfoRemind from "@/components/information/InfoRemind.vue";
    import InfoAddClass from "@/components/information/InfoAddClass.vue";
    import PersonnelList from "@/components/information/PersonnelList.vue";
    import AffiliatedColumn from "@/components/information/AffiliatedColumn.vue";
    import Comment from "@/components/detail/Comment.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const route = useRoute();
    const router = useRouter();
    const data = reactive({
        tabs: [
            {
                label: "内容"
            },
            {
                label: "详情信息"
            },
            {
                label: "人员"
            },
            {
                label: "评论"
            },
            {
                label: "隶属栏目"
            },
            {
                label: "相关"
            },
        ],
        activeKey: 0,
        id: route.query.id,
        objectTypeCode: route.query.objectTypeCode,
        detail: {},
        isNotes: false,
        isStatus: false,
        isRemind: false,
        isAddClass: false,
        isUserModal: false
    })
    const { tabs, activeKey, id, objectTypeCode, detail, isNotes,
         isStatus, isRemind, isAddClass, isUserModal } = toRefs(data);
    const changeTabs = (e) => {
        data.activeKey = e;
    }
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
    // 关闭更改状态
    const cancelStatus = (e) => {
        data.isStatus = e;
    }
    const cancelNotes = (e) => {
        data.isNotes = e;
    }
    const cancelRemind = (e) => {
        data.isRemind = e;
    }
    const cancelAddClass = (e) => {
        data.isAddClass = e;
    }
    // 更改状态
    const changeStatus = () => {
        data.isStatus = true;
    }
    const handleEdit = () => {
        let url = router.resolve({
            name: "informationEditor",
            query: {
                id: data.id,
                objectTypeCode: data.objectTypeCode
            }
        })
        window.open(url.href);
    }
    // 预览
    const handlePreview = () => {
        let url = router.resolve({
            name: "PreviewContent",
            query: {
                id: data.id,
                objectTypeCode: data.objectTypeCode
            }
        })
        window.open(url.href);
    };
    // 提醒
    const handleRemind = () => {
        data.isRemind = true;
    }
    // 备注
    const handleNotes = () => {
        data.isNotes = true;
    }
    // 添加分类
    const handleAddClass = () => {
        data.isAddClass = true;
    }
    const cancelUser = (e) => {
        data.isUserModal = e;
    }
    const getUserData = (params) => {
        console.log("params",params);
        cancelUser(false);
    }
</script>