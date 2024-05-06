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
  onUnmounted
} from "vue";
import "@/style/common.less";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const ZHLocale = zhCN;
ZHLocale.DatePicker.lang = {
  ...zhCN.DatePicker.lang,
  monthFormat: "M月",
  shortWeekDays: ["日", "一", "二", "三", "四", "五", "六"],
};
const locale = ref(zhCN);
let timerId = null;
 
// onMounted(() => {
//   startInactivityTimer();
// });
 
// onUnmounted(() => {
//   clearInactivityTimer();
// });
 
function startInactivityTimer() {
  // 设置定时器，5分钟后执行logout函数
  timerId = setTimeout(logout, 5 * 60 * 1000);
  // timerId = setTimeout(logout, 3000);
 
  // 监听键盘或鼠标事件来重置定时器
  document.addEventListener('mousemove', resetTimer);
  document.addEventListener('keypress', resetTimer);
}
 
function resetTimer() {
  clearInactivityTimer();
  startInactivityTimer();
}
 
function logout() {
  // 清除定时器和事件监听
  clearInactivityTimer();
 
  // 执行登出逻辑，例如：调用API登出并跳转到登录页面
  console.log('用户5分钟无操作，自动登出');
  handleLogout();
}
 
function clearInactivityTimer() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  document.removeEventListener('mousemove', resetTimer);
  document.removeEventListener('keypress', resetTimer);
}
const handleLogout = () => {
  router.push('/');
}
</script>
<style lang="less">
#app {
}
</style>
