<template>
  <div style="width: 100%; height: 100vh; overflow: hidden">
    <iframe
      :src="iframeUrl"
      frameborder="0"
      style="width: 100%; height: 100%"
    ></iframe>
  </div>
</template>
<script setup>
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined,
  UpOutlined,
} from "@ant-design/icons-vue";
import {
  ref,
  watch,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  onUpdated,
  toRaw,
  nextTick,
  defineEmits,
} from "vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const data = reactive({
  iframeUrl: "",
});
const { iframeUrl } = toRefs(data);
const getFileInfo = () => {
  let d = {
    RecordID: route.query.id,
    isAttachment: route.query.isAttachment || 1,
  };
  proxy.$get(Interface.getFileInfo, d).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state == "SUCCESS"
    ) {
      let fileInfo = res.actions[0].returnValue;
      data.iframeUrl =
        "/iframe/iWebOffice2015/v3/DocumentEdit.html?RecordID=" +
        fileInfo.mRecordID;
      fileInfo = fileInfo ? JSON.stringify(fileInfo) : "";
      window.localStorage.setItem("fileInfo", fileInfo);
    } else {
      if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
        message.error(
          res && res.actions && res.actions[0] && res.actions[0].errorMessage
        );
      } else if (res && res.actions && res.actions[0] && res.actions[0].error) {
        message.error(
          res && res.actions && res.actions[0] && res.actions[0].error
        );
      } else {
        message.error("获取文件信息失败！");
      }
    }
  });
};
onMounted(() => {
  // data.iframeUrl=
  //   "/iframe/iWebOffice2015/v3/DocumentEdit.html?RecordID=" +
  //   route.query.id +
  //   "&FileType=" +
  //   route.query.FileType +
  //   "&FileName=" +
  //   (route.query.FileName||'') +
  //   "&UserName=" +
  //   (route.query.UserName||'');
  getFileInfo();
});
</script>
<style lang="less" scoped></style>
