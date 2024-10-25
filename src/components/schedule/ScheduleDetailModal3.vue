<template>
  <div ref="modelContentRef">
      <a-modal v-model:open="props.isShow" width="90%" :maskClosable="false" @cancel="handleCancel" class="meetingDetailModal2"
      :style="setTop"
          @ok="handleSubmit">
          <template #title>
              <div>
                  {{title}}
              </div>
          </template>
          <div class="modalContainer scheduleModalContainer" :style="{ height: height + 'px' }">
              <ScheduleDetailContent :itemid="props.id" @handleDelete="handleDelete" @close="handleCancel" @reload="handleSubmit" />
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
      defineEmits, provide,computed
  } from "vue";
  import { message } from 'ant-design-vue';
  import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
  import { useRouter, useRoute } from "vue-router";
  import ScheduleDetailContent from "@/components/schedule/ScheduleDetailContent2.vue";
  
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const labelCol = ref({ style: { width: '100px' } });
  const configRef = ref();
  const PersonnelLst = ref();
  const modelContentRef = ref(null);
  const props = defineProps({
      isShow: Boolean,
      paramsTime: Object,
      id: {
          type: String,
          default: ""
      }
  });
  
  //console.log("props", props.paramsTime);
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
      height: document.documentElement.clientHeight - 100,
      title: "日程详情",
      objectTypeCode:'5000',
      sObjectName:'MeetingRec',
      top:""
  })
  const { currentTab, height, title,objectTypeCode,sObjectName,top } = toRefs(data);
  const handleSubmit = () => {
      emit("select-val", '');
  }
  const handleDelete = (e) => {
      emit('handleDelete', {Id:e.Id});
  }
  const itemid=props.id||'0EAAAE4F-99F3-4B05-91A5-F4F4BBB1D0DA';
  const reload=()=>{
    handleSubmit();
  }
  provide('reload', {
    reload
  })
  onMounted(() => {
      window.addEventListener("resize", (e) => {
          data.height = document.documentElement.clientHeight - 100;
      });
        let h = modelContentRef.value.clientHeight;
        let h0=document.documentElement.clientHeight;
        //data.top = (h + 260) / 2 + 'px';
        if(h){
          data.top = (h0 - h - 20) / 2 + 'px';
          if((h0 - h - 20)<0){
            data.top='55px';
          }
        }
        else{
        data.top = (h - 20) / 2 + 'px';
          if((h - 20)<0){
            data.top='55px';
          }
        }
        
        //console.log(data.top)
  });
  const setTop = computed(() => ({
    top: data.top
  }));
  const handleEdit = () => {
      emit('edit', {Id:props.id});
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
  .meetingDetailModal2{
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
.scheduleModalContainer{
  overflow-y: auto;
  position: relative;
}
.meetingDetailModal2{
  border-radius: 6px;
  overflow: hidden;
  .ant-modal-content .ant-modal-header{
      margin-bottom: 0 !important;
      display: none;
  }
  .ant-modal-content .ant-modal-footer{
      margin-top: 0 !important;
      display: none;
  }
  .ant-modal-close{
      display: none;
   }
   .relateditem-user {
      display: flex;
      align-items: center;
  }
  .relateditem-priorityCode .container{
    position: relative;
    top: 2px;
    left: 10px;
  }
}
</style>