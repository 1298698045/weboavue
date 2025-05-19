<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="1230px"
      style="top: 10px"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <!-- <div class="headerTab">
            <a-tabs v-model:activeKey="currentTab" @change="changeTab">
                <a-tab-pane key="1" tab="基本信息"></a-tab-pane>
                <a-tab-pane key="2" tab="参与人员"></a-tab-pane>
            </a-tabs>
        </div> -->
        <div class="modalCenter" :style="{ height: height + 'px !important' }">
          <ConfigForm
            ref="configRef"
            :paramsTime="props.paramsTime"
            :id="props.vehicleId"
            :objectTypeCode="objectTypeCode"
            :entityApiName="sObjectName"
            @selectVal="handleNewVehicleVal"
            :DestinationTypeCode="props.DestinationTypeCode"
            v-if="currentTab == 1"
          />
          <AttendUser
            v-if="currentTab == 2"
            ref="PersonnelLst"
            :load="refreshPeople"
            :id="props.vehicleId"
          />
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit"
            >提交审批</a-button
          >
        </div>
      </template>
    </a-modal>
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
} from "vue";
import { message } from "ant-design-vue";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
// 参与人员
import AttendUser from "@/components/meeting/meetingCalendar/AttendUser.vue";
// 基本信息
import ConfigForm from "@/components/Vehicle/InfoConfigForm.vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const labelCol = ref({ style: { width: "100px" } });
const configRef = ref();
const props = defineProps({
  isShow: Boolean,
  paramsTime: [Object],
  vehicleId: String,
  DestinationTypeCode: String,
});
const emit = defineEmits(["cancel", "select-val"]);
const handleCancel = () => {
  emit("cancel", false);
  if (
    configRef &&
    configRef.value &&
    configRef.value.clearForm != "undefined"
  ) {
    configRef.value.clearForm();
  }
};
const changeTab = (e) => {
  data.currentTab = e;
};
const data = reactive({
  currentTab: "1",
  height: document.documentElement.clientHeight - 145,
  isNotice: false,
  title: "新建用车申请",
  objectTypeCode: "20503",
  sObjectName: "VehicleUse",
});
const { currentTab, height, isNotice, title, objectTypeCode, sObjectName } =
  toRefs(data);
if (props.vehicleId) {
  data.title = "编辑用车申请";
}
const handleSubmit = () => {
  if (
    configRef &&
    configRef.value &&
    configRef.value.handleSubmit != "undefined"
  ) {
    configRef.value.handleSubmit();
  }
};
const handleNewVehicleVal = () => {
  emit("select-val", "");
};
const PersonnelLst = ref();
const refreshPeople = (e) => {
  if (PersonnelLst.value && PersonnelLst.value.getQuery) {
    PersonnelLst.value.getQuery();
  }
};
onMounted(() => {
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 145;
  });
});
</script>
<style lang="less">
@import url("@/style/modal.less");

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

:deep :where(.css-dev-only-do-not-override-kqecok).ant-tabs > .ant-tabs-nav,
:where(.css-dev-only-do-not-override-kqecok).ant-tabs > div > .ant-tabs-nav {
  margin: 0 !important;
}

:where(.css-dev-only-do-not-override-kqecok).ant-modal .ant-modal-footer {
  margin-top: 0 !important;
}
.ant-modal-wrap {
  overflow: hidden !important;
}
</style>
