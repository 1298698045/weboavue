<template>
  <div id="app" v-cloak>
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
  import { routesMapping } from "@/utils/routesMapping.js";
  const router = useRouter();
  const route = useRoute();

  const ZHLocale = zhCN;
  ZHLocale.DatePicker.lang = {
    ...zhCN.DatePicker.lang,
    monthFormat: "M月",
    shortWeekDays: ["日", "一", "二", "三", "四", "五", "六"],
  };
  const locale = ref(zhCN);
  let timerId = null;
  const TIMEOUT = 30 * 60 * 1000;

  onMounted(() => {
    if (route.path !== "/login") {
      startInactivityTimer();
    }
  });

  onUnmounted(() => {
    clearInactivityTimer();
  });

  function startInactivityTimer() {
    clearInactivityTimer();
    timerId = setTimeout(logout, TIMEOUT); 

    document.addEventListener("mousemove", resetTimer, { passive: true });
    document.addEventListener("keydown", resetTimer, { passive: true });
  }

  function resetTimer() {
    clearTimeout(timerId); 
    timerId = setTimeout(logout, TIMEOUT);
  }

  function logout() {
    clearInactivityTimer();
    console.log("用户30分钟无操作，自动登出");
    handleLogout();
  }

  function clearInactivityTimer() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  function handleLogout() {
    router.push("/");
  }

  // 刷新
  function restoreRoutes() {
    const savedRoutes = JSON.parse(localStorage.getItem('savedRoutes'));
    console.log("savedRoutes", savedRoutes);
    if (savedRoutes) {
      savedRoutes.component = () => import("@/layout/index.vue");
      savedRoutes.children.forEach(item => {
        // let componentPath = routesMapping[savedRoutes.name][item.name];
        item.component = eval(item.component);
      });
      router.addRoute(savedRoutes);

      console.log("router", router.getRoutes())
    }
  }
  // restoreRoutes();

</script>
<style lang="less">
  #app {}
</style>