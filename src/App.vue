<template>
  <div id="nav" v-cloak>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <a-config-provider :locale="zhCN">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script setup>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>
<style lang="less">
#app {
}
</style>
