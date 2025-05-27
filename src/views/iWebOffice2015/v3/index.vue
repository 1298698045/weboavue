<template>
  <div style="width: 100%; height: 100vh; overflow: hidden">
    <iframe
      id="iframe"
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
import { girdFormatterValue } from "@/utils/common.js";
const router = useRouter();
const route = useRoute();
const data = reactive({
  iframeUrl: "",
});
const { iframeUrl } = toRefs(data);
// const getTemplete = () => {
//   proxy
//     .$post(Interface.list2, {
//       //filterId: "",
//       objectTypeCode: "100112",
//       entityName: "DocumentTemplate",
//       search: "",
//       page: 1,
//       rows: 100,
//       displayColumns:"Name",
//     })
//     .then((res) => {
//       if (res && res.nodes && res.nodes.length) {
//         var list = [];
//         for (var i = 0; i < res.nodes.length; i++) {
//           var item = res.nodes[i];
//           for (var cell in item) {
//             if (cell != "id" && cell != "viewUrl") {
//               item[cell] = girdFormatterValue(cell, item);
//             }
//           }
//           list.push(item);
//         }
//         list = list ? JSON.stringify(list) : "";
//         window.localStorage.setItem("TemplateList", list);
//       }
//     });
// };
// const getFileInfo = () => {
//   let d = {
//     RecordID: route.query.id,
//     entityName: route.query.entityName || "",
//   };
//   proxy.$get(Interface.getFileInfo, d).then((res) => {
//     if (
//       res &&
//       res.actions &&
//       res.actions[0] &&
//       res.actions[0].state == "SUCCESS"
//     ) {
//       let fileInfo = res.actions[0].returnValue;
//       data.iframeUrl =
//         "/iframe/iWebOffice2015/v3/DocumentEdit.html?RecordID=" +
//         fileInfo.mRecordID;
//       fileInfo = fileInfo ? JSON.stringify(fileInfo) : "";
//       window.localStorage.setItem("fileInfo", fileInfo);
//     } else {
//       if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
//         message.error(
//           res && res.actions && res.actions[0] && res.actions[0].errorMessage
//         );
//       } else if (res && res.actions && res.actions[0] && res.actions[0].error) {
//         message.error(
//           res && res.actions && res.actions[0] && res.actions[0].error
//         );
//       } else {
//         message.error("获取文件信息失败！");
//       }
//     }
//   });
// };
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
  // getTemplete();
  // getFileInfo();
  data.iframeUrl =
    "/iframe/iWebOffice2015/v3/DocumentEdit.html?id=" +
    route.query.id +
    "&entityName=" +
    route.query.entityName;
  if (route.query.editMethod) {
    data.iframeUrl += "&editMethod=" + route.query.editMethod;
  }
  if(route.query.docType){
    data.iframeUrl += "&docType=" + route.query.docType;
  }
});
</script>
<style lang="less" scoped></style>
