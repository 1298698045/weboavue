<template>
    <div>
        <a-modal v-model:open="props.isShow" :maskClosable="false" @cancel="handleCancel" class="meetingDetailModal3"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{title}}
                </div>
            </template>
            <div class="modalContainer meetingModalContainer" :style="{ height: height + 'px' }">
                <MeetingDetailContent :meetingId="props.meetingId" @handleDelete="handleDelete" />
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">关闭</a-button>
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
    import MeetingDetailContent from "@/components/meeting/MeetingDetailContent.vue";
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
        height: document.documentElement.clientHeight - 170,
        title: "会议详情",
        objectTypeCode:'5000',
        sObjectName:'MeetingRec',
    })
    const { currentTab, height, title,objectTypeCode,sObjectName  } = toRefs(data);
    const handleSubmit = () => {
        emit("select-val", '');
    }
    const handleDelete = (e) => {
        emit('handleDelete', {Id:e.Id});
    }
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 170;
        });
    });
    const handleEdit = () => {
        emit('edit', {Id:props.meetingId});
    }
    const openFullSign= (num) => {
        //window.open('http://192.168.1.200:82/apps/meetings/dynamicSign.aspx?id=8f9c33e1-52a4-4dcd-9ade-9e95484a6f1a');
        let link='/lightning/o/Meeting/signin/screen';
        let name='SigninScreen';
        if(num*1==1){
          link='/lightning/o/Meeting/signoff/screen';
          name='SignoffScreen';
        }
        let url = router.resolve({
            path:link,
            name: name,
            query: {
                id: props.meetingId,
                exitQcode:num
            },
        });
        window.open(url.href);
    }
    const printMeetingPeoplelst= (type) => {
        let url = router.resolve({
            path:'/lightning/o/printMeetingPeoplelst',
            name: "PrintMeetingPeoplelst",
            query: {
                id: props.meetingId,
                type:type
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
    .meetingDetailModal3{
        width: calc(~'100% - 45px') !important;
        top:25px !important;
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
.meetingModalContainer{
    overflow-y: auto;
    position: relative;
}
.meetingDetailModal3{
    .ant-modal-content .ant-modal-header{
        margin-bottom: 0 !important;
    }
    .ant-modal-content .ant-modal-footer{
        margin-top: 0 !important;
    }
    .detail-header{
        top: 74.5px !important;
    }
}
</style>