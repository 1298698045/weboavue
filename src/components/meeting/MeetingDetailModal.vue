<template>
    <div>
        <a-modal v-model:open="props.isShow" width="1280px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{title}}
                </div>
            </template>
            <div class="modalContainer">
                <div class="headerTab">
                    <a-tabs v-model:activeKey="currentTab" @change="changeTab">
                        <a-tab-pane key="1" tab="基本信息"></a-tab-pane>
                        <a-tab-pane key="2" tab="参会人员"></a-tab-pane>
                        <a-tab-pane key="3" tab="会议议题"></a-tab-pane>
                        <a-tab-pane key="4" tab="会议参会人员"></a-tab-pane>
                        <a-tab-pane key="5" tab="会议服务"></a-tab-pane>
                        <a-tab-pane key="6" tab="会议决议"></a-tab-pane>
                        <a-tab-pane key="7" tab="相关讨论"></a-tab-pane>
                        <a-tab-pane key="8" tab="附件"></a-tab-pane>
                        <a-tab-pane key="9" tab="会议共享"></a-tab-pane>
                    </a-tabs>
                </div>
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <ConfigForm ref="configRef" :paramsTime="paramsTime" v-if="currentTab==1" />
                    <Participants v-if="currentTab==2" />
                    <Topics v-if="currentTab==3" />
                    <AttendUserList v-if="currentTab==4" />
                    <Service v-if="currentTab==5" />
                    <MeetingResolution v-if="currentTab==6" />
                    <Comment v-if="currentTab==7" :isTitle="false" />
                    <MeetingFile v-if="currentTab==8" />
                    <MeetingShare v-if="currentTab==9" />
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">关闭</a-button>
                    <a-button type="primary" @click.prevent="handleEdit">编辑</a-button>
                    <a-button>删除</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, provide
    } from "vue";
    import { message } from 'ant-design-vue';
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    // 参会人员
    import Participants from "@/components/meeting/Participants.vue"
    // 基本信息
    import ConfigForm from "@/components/meeting/InfoConfigFormShow.vue";
    // 会议议题
    import Topics from "@/components/meeting/meetingCalendar/Topics.vue";
    // 会议参会人员列表
    import AttendUserList from "@/components/meeting/AttendUserListShow.vue";
    // 会议服务
    import Service from "@/components/meeting/Service.vue";
    // 会议决议
    import MeetingResolution from "@/components/meeting/MeetingResolution.vue";
    import Comment from "@/components/detail/Comment.vue";
    // 会议附件
    import MeetingFile from "@/components/meeting/MeetingFile.vue";
    import MeetingShare from "@/components/meeting/MeetingShare.vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const configRef = ref();
    const props = defineProps({
        isShow: Boolean,
        paramsTime: Object,
        meetingId: {
            type: String,
            default: ""
        }
    });
    provide("meetingId", props.meetingId);
    console.log("props", props.paramsTime);
    const emit = defineEmits(['cancel', 'select-val', 'edit']);
    const handleCancel = () => {
        // configRef.value.clearForm();
        emit("cancel", false);
    }
    const changeTab = (e) => {
        data.currentTab = e;
    }
    const data = reactive({
        currentTab: '1',
        height: document.documentElement.clientHeight - 350,
        title: "会议详情"
    })
    const { currentTab, height, title  } = toRefs(data);
    const handleSubmit = () => {
        emit("select-val", '');
    }
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 350;
        });
    });
    const handleEdit = () => {
        emit('edit', '1');
    }
</script>
<style lang="less">
    @import url('@/style/modal.less');

    .headerTab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 0 10px;

        .search {
            width: 200px;
        }
    }

    :deep :where(.css-dev-only-do-not-override-kqecok).ant-tabs>.ant-tabs-nav,
    :where(.css-dev-only-do-not-override-kqecok).ant-tabs>div>.ant-tabs-nav {
        margin: 0 !important;
    }
</style>