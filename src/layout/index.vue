<template>
  <div class="layoutBd">
    <div class="layoutHeader">
      <Header :listApp="appList" @changeCode="changeCode"></Header>
    </div>
    <div class="layoutWrapper">
      <div class="left" :style="{ width: state.collapsed ? '80px' : '197px' }">
        <!-- <Logo></Logo> -->
        <div class="layout-aside">
          <div class="wea-menu-switch" @click="handleMenuSwitch">
            <MenuFoldOutlined v-if="!state.collapsed" />
            <MenuUnfoldOutlined v-else />
          </div>
          <MyMenu :collapsed="state.collapsed" :appCode="appCode"></MyMenu>
        </div>
      </div>
      <div class="right">
        
        <div class="container">
          
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, getCurrentInstance, toRefs } from "vue";
import Header from "./components/header/index.vue";
import Logo from "./components/header/components/logo.vue";
import MyMenu from "./components/menu/MyMenu.vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
let store = useStore();
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const route = useRoute();

// console.log(store.state.collapsed, "123132");
const state = reactive({
  collapsed: false,
});
const handleMenuSwitch = () => {
  //   state.collapsed = !state.collapsed;
  store.commit("setCollapsed", !store.state.collapsed);
  state.collapsed = store.state.collapsed;
};
const data = reactive({
  appList: [],
  appCode: "02u90000110",
  currentAppName: "通讯录"
});
const { appList, appCode, currentAppName } = toRefs(data);

let localAppCode = localStorage.getItem("appCode");
let localAppName = localStorage.getItem("appName");
if(localAppCode){
  data.appCode = localAppCode;
  data.currentAppName = localAppName;
}

const getModuleAppList = () => {
  proxy.$get(Interface.applist,{
      systemCode: 'OA'
  }).then((res)=>{
    data.appList = res.actions[0].returnValue.apps;
    // data.appCode = data.appList[0].AppCode;
    // data.currentAppName = data.appList[0].Label;
    store.commit('setModuleName', data.currentAppName);
    // let row = data.appList.find(item=>route.path.indexOf(item.StartUrl)!=-1);
    // if(row){
    //   data.appCode = row.AppCode;
    //   data.currentAppName =  row.Label;
    //   store.commit('setModuleName', data.currentAppName);
    // }
  })
};
getModuleAppList();

const changeCode = (e) => {
  // console.log('e', e);
  data.appCode = e;
  localStorage.setItem("appCode", data.appCode);
}
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

.el-popper{
    -webkit-transform: none !important;
    transform: none !important;
}
</style>
