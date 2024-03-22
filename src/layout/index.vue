<template>
  <div class="layoutBd">
    <div class="layoutHeader">
      <Header></Header>
    </div>
    <div class="layoutWrapper">
      <div class="left" :style="{ width: state.collapsed ? '80px' : '197px' }">
        <!-- <Logo></Logo> -->
        <div class="layout-aside">
          <div class="wea-menu-switch" @click="handleMenuSwitch">
            <MenuFoldOutlined v-if="!state.collapsed" />
            <MenuUnfoldOutlined v-else />
          </div>
          <MyMenu :collapsed="state.collapsed"></MyMenu>
        </div>
      </div>
      <div class="right">
        
        <div class="container">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Header from "./components/header/index.vue";
import Logo from "./components/header/components/logo.vue";
import MyMenu from "./components/menu/MyMenu.vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
let store = useStore();
console.log(store.state.collapsed, "123132");
const state = reactive({
  collapsed: false,
});
const handleMenuSwitch = () => {
  //   state.collapsed = !state.collapsed;
  store.commit("setCollapsed", !store.state.collapsed);
  state.collapsed = store.state.collapsed;
};
</script>
<style lang="less">
@import "./layout.less";
/* 自定义动画样式 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s; /* 设置动画持续时间 */
}
.fade-enter, .fade-leave-to {
  opacity: 0; /* 初始状态透明度为0 */
}
</style>
