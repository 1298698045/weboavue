<template>
  <div class="layoutWrapper">
    <div class="left">
      <Logo></Logo>
      <div class="layout-aside">
        <div class="wea-menu-switch" @click="handleMenuSwitch">
          <MenuFoldOutlined v-if="state.isLeft" />
          <MenuUnfoldOutlined v-else />
        </div>
        <Menu></Menu>
      </div>
    </div>
    <div class="right">
      <Header></Header>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Header from "./components/header/index.vue";
import Logo from "./components/header/components/logo.vue";
import Menu from "./components/menu/menu.vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
const state = reactive({
  isLeft: true,
});
const handleMenuSwitch = () => {
  state.isLeft = !state.isLeft;
};
</script>
<style>
@import "./layout.less";
</style>
