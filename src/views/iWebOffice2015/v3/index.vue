<template>
  <div style="width: 100%; height: 100vh; overflow: hidden;">
    <iframe
      :src="iframeUrl"
      frameborder="0"
      style="width: 100%; height: 100%;"
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

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const data = reactive({
  iframeUrl:
    "/iframe/iWebOffice2015/v3/DocumentEdit.html?RecordID=" +
    route.query.id +
    "&FileType=" +
    route.query.FileType +
    "&FileName=" +
    (route.query.FileName||'') +
    "&UserName=" +
    (route.query.UserName||''),
});
const { iframeUrl } = toRefs(data);

onMounted(() => {
  //console.log(data.iframeUrl)
});
</script>
<style lang="less" scoped></style>
