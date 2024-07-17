<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
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
                        <a-tab-pane key="4" tab="会议参会人"></a-tab-pane>
                        <a-tab-pane key="5" tab="会议服务"></a-tab-pane>

                    </a-tabs>
                </div>
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <ConfigForm ref="configRef" :paramsTime="paramsTime" v-if="currentTab==1" />
                    <AttendUser v-if="currentTab==2" />
                    <Topics v-if="currentTab==3" />
                    <AttendUserList v-if="currentTab==4" />
                    <Service v-if="currentTab==5" />
                    <MeetingNotice :isShow="isNotice" @selectVal="handleRead" @cancel="isNotice=false" />
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">提交审批</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits
    } from "vue";
    import { message } from 'ant-design-vue';
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import MeetingNotice  from "@/components/meeting/meetingCalendar/MeetingNotice.vue";
    // 参会人员
    import AttendUser from "@/components/meeting/meetingCalendar/AttendUser.vue"
    // 基本信息
    import ConfigForm from "@/components/meeting/InfoConfigForm.vue";
    // 会议议题
    import Topics from "@/components/meeting/meetingCalendar/Topics.vue";
    // 会议参会人员列表
    import AttendUserList from "@/components/meeting/AttendUserList.vue";
    // 会议服务
    import Service from "@/components/meeting/Service.vue";
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
    })
    console.log("props", props.paramsTime);
    const emit = defineEmits(['cancel', 'select-val']);
    const handleCancel = () => {
        configRef.value.clearForm();
        emit("cancel", false);
    }
    const changeTab = (e) => {
        data.currentTab = e;
    }
    const data = reactive({
        currentTab: '1',
        height: document.documentElement.clientHeight - 350,
        isNotice: true,
        title: "新建会议"
    })
    const { currentTab, height, isNotice, title  } = toRefs(data);
    if(props.meetingId){
        data.title = '编辑会议';
    }
    const handleSubmit = () => {
        configRef.value.handleSubmit();
        emit("select-val", '');
    }
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 350;
        });
    });
    // 会议须知-已读
    const handleRead = () => {
        data.isNotice = false;
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