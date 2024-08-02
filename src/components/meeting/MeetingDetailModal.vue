<template>
    <div>
        <a-modal v-model:open="props.isShow" width="100%" :maskClosable="false" @cancel="handleCancel" class="meetingDetailModal"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{title}}
                </div>
            </template>
            <div class="modalContainer">
                <div class="headerOption headerOption1">
                    <a-button type="primary" class="ml10" @click="handleEdit">编辑</a-button>
                    <a-button class="ml10" @click="handleDelete">删除</a-button>
                    <a-button class="ml10" @click="openFullSign(0)">大屏签到</a-button>
                    <a-button class="ml10 ml11" @click="openFullSign(1)">大屏签退</a-button>
                    <!-- <a-button type="primary" class="ml10">签到二维码</a-button>
                    <a-button type="primary" class="ml10">签退二维码</a-button>
                    <a-button type="primary" class="ml10">打印参会人员</a-button>
                    <a-button type="primary" class="ml10 ml11">打印未参会人员</a-button> -->
                </div>
                <div class="headerTab">
                    <a-tabs v-model:activeKey="currentTab" @change="changeTab">
                        <a-tab-pane key="1" tab="基本信息"></a-tab-pane>
                        <a-tab-pane key="2" tab="参会人员"></a-tab-pane>
                        <a-tab-pane key="3" tab="会议议题"></a-tab-pane>
                        <!-- <a-tab-pane key="4" tab="会议参会人员"></a-tab-pane> -->
                        <a-tab-pane key="5" tab="会议服务"></a-tab-pane>
                        <a-tab-pane key="6" tab="会议决议"></a-tab-pane>
                        <a-tab-pane key="7" tab="相关讨论"></a-tab-pane>
                        <!-- <a-tab-pane key="8" tab="附件"></a-tab-pane> -->
                        <a-tab-pane key="9" tab="会议共享"></a-tab-pane>
                    </a-tabs>
                </div>
                <div class="modalCenter modalCenter1" :style="{ height: height + 'px' }">
                    <!-- <ConfigForm ref="configRef" :paramsTime="paramsTime" v-if="currentTab==1" /> -->
                    <DetailInfo class="DetailInfo" v-if="currentTab==1" :id="props.meetingId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
                    <Participants v-if="currentTab==2" ref="PersonnelLst" :load="refreshPeople" :id="props.meetingId" />
                    <Topics v-if="currentTab==3" />
                    <!-- <AttendUserList v-if="currentTab==4" /> -->
                    <Service v-if="currentTab==5" />
                    <MeetingResolution v-if="currentTab==6" />
                    <Comment v-if="currentTab==7" :isTitle="false" :id="props.meetingId" />
                    <!-- <MeetingFile v-if="currentTab==8" /> -->
                    <MeetingShare v-if="currentTab==9" />
                    <div class="rightAside" v-if="currentTab==1">
                        <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">附件 (0)</div>
                            <div class="panel-btn">
                            <a-button type="link">上传附件</a-button>
                            </div>
                        </div>
                        <div class="panel-bd">
                            <a-collapse
                            v-model:activeKey="current"
                            :expand-icon-position="expandIconPosition"
                            >
                            <a-collapse-panel
                                :header="item.Name"
                                v-for="(item, index) in fileCategorys"
                                :key="index"
                            >
                                <!-- <p>{{ text }}</p> -->
                                <template #extra><PlusOutlined /></template>
                            </a-collapse-panel>
                            <!-- <a-collapse-panel key="3" header="This is panel header 3" collapsible="disabled">
                                                    <p>{{ text }}</p>
                                                    <template #extra><PlusOutlined /></template>
                                                </a-collapse-panel> -->
                            </a-collapse>
                            <div class="files">
                            <div class="fileItem">
                                <div class="lImg">
                                <img :src="require('@/assets/img/filetype/pdf.png')" />
                                </div>
                                <div class="rInfo">
                                <p class="name rowEllipsis">
                                    觉得卡拉利空打击了的空间阿斯利康大家大家按时大家按时按时
                                </p>
                                <div class="optionLink">
                                    <span class="link">查看</span> ·
                                    <span class="link">下载</span>
                                </div>
                                <div class="time">2023/11/7 10:10 · 36.7k</div>
                                </div>
                                <div class="icon">
                                <a-dropdown :trigger="['click']">
                                    <a class="ant-dropdown-link" @click.prevent>
                                    <DownOutlined />
                                    </a>
                                    <template #overlay>
                                    <a-menu>
                                        <a-menu-item>
                                        <a href="javascript:;">标记分类</a>
                                        </a-menu-item>
                                        <a-menu-item>
                                        <a href="javascript:;">重命名</a>
                                        </a-menu-item>
                                        <a-menu-item>
                                        <a href="javascript:;">删除</a>
                                        </a-menu-item>
                                    </a-menu>
                                    </template>
                                </a-dropdown>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">关闭</a-button>
                    <!-- <a-button type="primary" @click.prevent="handleEdit">编辑</a-button>
                    <a-button @click.prevent="handleDelete">删除</a-button> -->
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
    import { useRouter, useRoute } from "vue-router";
    // 参会人员
    import Participants from "@/components/meeting/Participants.vue"
    // 基本信息
    //import ConfigForm from "@/components/meeting/InfoConfigFormShow.vue";
    import DetailInfo from "@/components/detail/DetailInfo.vue";
    // 会议议题
    import Topics from "@/components/meeting/meetingCalendar/Topics.vue";
    // 会议参会人员列表
    //import AttendUserList from "@/components/meeting/AttendUserListShow.vue";
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
    const router = useRouter();
    const labelCol = ref({ style: { width: '100px' } });
    const configRef = ref();
    const PersonnelLst = ref();
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
    const emit = defineEmits(['cancel', 'select-val', 'edit','handleDelete']);
    const handleCancel = () => {
        // configRef.value.clearForm();
        emit("cancel", false);
    }
    const changeTab = (e) => {
        data.currentTab = e;
    }
    const data = reactive({
        currentTab: '1',
        height: document.documentElement.clientHeight - 215,
        title: "会议详情",
        objectTypeCode:'5000',
        sObjectName:'MeetingRec',
    })
    const { currentTab, height, title,objectTypeCode,sObjectName  } = toRefs(data);
    const handleSubmit = () => {
        emit("select-val", '');
    }
    const handleDelete = () => {
        emit('handleDelete', {Id:props.meetingId});
    }
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 215;
        });
    });
    const handleEdit = () => {
        emit('edit', {Id:props.meetingId});
    }
    const openFullSign= (num) => {
        //window.open('http://192.168.1.200:82/apps/meetings/dynamicSign.aspx?id=8f9c33e1-52a4-4dcd-9ade-9e95484a6f1a');
        let url = router.resolve({
            path:'/lightning/o/dynamicSign',
            name: "DynamicSign",
            query: {
                id: props.meetingId,
                exitQcode:num
            },
        });
        window.open(url.href);
    }
    const refreshPeople=(e)=>{
        if(PersonnelLst.value&&PersonnelLst.value.getQuery){
            PersonnelLst.value.getQuery();
        }
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
    .meetingDetailModal{
        top:0 !important;
        max-width: 100%;
        padding: 0;
        .ml11{
            margin-right: 15px;
        }
    }
    .modalCenter1{
        display: flex;
    }
    .modalCenter1>div{
        // flex: 1;
        width: 100%;
    }
    .modalCenter1 .DetailInfo{
        background: #fff;
        border-radius: 4px;
        margin-right: 12px;
        width: 80% !important;
        padding: 20px 15px;
        margin-right: 5px;
    }
    .modalCenter1 .rightAside{
        min-width: 20%;
        max-width: 20%;
        position: absolute;
        height: auto;
        right: 0;
        padding: 0 10px;
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-collapse {
  border: none !important;
  background: #fff;
}
:where(.css-dev-only-do-not-override-kqecok).ant-collapse > .ant-collapse-item {
  border-bottom: none !important;
  background: #f3f2f2;
  margin-bottom: 8px;
}
:deep
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
  .ant-collapse-content {
  border-top: none !important;
}
:deep
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
  > .ant-collapse-item
  > .ant-collapse-header {
  padding: 6px 16px !important;
}
:deep
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
  .ant-collapse-content
  > .ant-collapse-content-box {
  padding: 0 !important;
}
:deep
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
  > .ant-collapse-item:last-child,
:where(.css-dev-only-do-not-override-kqecok).ant-collapse
  > .ant-collapse-item:last-child
  > .ant-collapse-header {
  border-radius: 0 !important;
}
.panel {
  overflow: hidden;
}
.files {
  width: 100%;
  .fileItem {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    &:hover {
      cursor: pointer;
      background: #eee;
    }
    .lImg {
      width: 40px;
      height: 40px;
      min-width: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rInfo {
      flex: 1;
      margin-left: 10px;
      overflow: hidden;
      .name {
        width: 60%;
        font-size: 14px;
      }
      .optionLink {
        .link {
          color: var(--textColor);
        }
      }
      .time {
        font-size: 12px;
        color: #b8bbcc;
      }
    }
  }
}
.headerOption1{
padding-bottom: 0 !important;
}
</style>