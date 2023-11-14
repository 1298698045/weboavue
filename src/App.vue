<template>
  <div id="nav" v-cloak>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
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
  toRaw,
} from "vue";
import "@/style/common.less";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
const ZHLocale = zhCN;
ZHLocale.DatePicker.lang = {
  ...zhCN.DatePicker.lang,
  monthFormat: "M月",
  shortWeekDays: ["日", "一", "二", "三", "四", "五", "六"],
};
const locale = ref(zhCN);
</script>
<style lang="less">
#app {
}
</style>
