<template>
  <div class="menuContainer">
    <a-menu
      :open-keys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="props.collapsed"
      :items="appTabs"
      @click="handleMenu"
      @openChange="onOpenChange"
    >
    </a-menu>
  </div>
</template>
<script setup>
import {
  reactive,
  watch,
  h,
  defineComponent,
  onMounted,
  defineProps,
  toRefs,
  getCurrentInstance,
  toRaw,
  nextTick
} from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  collapsed: Boolean,
  appCode: String
});
const route = useRoute();
const router = useRouter();
const data = reactive({
  items: [],
  appTabs: []
});
const { items, appTabs } = toRefs(data);

const state = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
  preOpenKeys: [],
  rootSubmenuKeys: [],
});

// watch(()=> store.state.moduleName, (newVal,oldVal)=>{
//   setTimeout(()=>{
//     data.appTabs = store.state.subModules.map(item=>{
//       item.label = item.navAction.label;
//       item.key = item.name;
//       item.icon = () => h("i", {
//         class: ["iconfont", "icon-tongxunlu1"],
//       });
//       return item;
//     });
//   }, 1000);
// }, {immediate: true, deep: true});

// watch(()=> route.path, ()=>{
//   state.selectedKeys = [route.name];
// })

// watch(()=> props.appCode, (newVal, oldVal)=>{
//   console.log("appcode", newVal, oldVal);
//   let modules = JSON.parse(localStorage.getItem("modules"));
//   if(modules && modules.length){
//     let subModules = modules.filter(item=>item.AppCode == newVal)[0].tabs;
//     if(subModules && subModules.length){
//       data.appTabs = subModules.map(item=>{
//         item.label = item.navAction.label;
//         item.key = item.name;
//         item.icon = () => h("i", {
//           class: ["iconfont", "icon-tongxunlu1"],
//         });
//         return item;
//       });
//     }
//   }
// }, {deep: true, immediate: true});

watch(()=>route.path, (newVal, oldVal)=>{
  if(router.hasRoute(route.name)){
    console.log('hasRoute-appCode', route.meta.appCode);
    let modules = JSON.parse(localStorage.getItem("modules"));
    let findRow = modules.filter(item=>item.AppCode == route.meta.appCode);
    let subModules = findRow[0].tabs;
    store.commit("setModuleName", findRow[0].Label);
    if(subModules && subModules.length){
      data.appTabs = subModules.map(item=>{
        item.label = item.navAction.label;
        item.key = item.name;
        item.icon = () => h("i", {
          class: ["iconfont", "icon-tongxunlu1"],
        });
        return item;
      });
    }
  }
},{ immediate: true, deep: true });

watch(
  () => route,
  (newRoute) => {
    // console.log("menu-route", newRoute.params.sObjectName);
    // state.selectedKeys = [newRoute.params.sObjectName || newRoute.name]; // 确保选中最新的路由名称
    console.log("newRoute", newRoute);
    let menuName = localStorage.getItem("menuName");
    let name;
    if(newRoute.params.sObjectName){
      name = newRoute.params.sObjectName;
    }else {
      name = newRoute.name;
    }
    console.log("name", name);
    // state.selectedKeys = [newRoute.params.sObjectName || menuName || newRoute.name];
    state.selectedKeys = [name];
  },
  { immediate: true, deep: true }
);

const handleMenu = (e) => {
  console.log('e', e);
  let menuName = e.item.navAction.devNameOrId;
  localStorage.setItem("menuName", menuName);
  router.push(e.item.navAction.url);
};

const onOpenChange = () => {}

</script>
<style lang="less">
  @import "./menu.less";
  @import "../../../style/icon/iconfont.css";
  @import "../../../style/icon/flow/iconfont.css";
  @import "../../../style/icon/oa/iconfont.css";
  @import "../../../style/icon/document/font_p2dc72qnu9q/iconfont.css";
  @import "../../../style/icon/contract/font_jlf4hlwwgvr/iconfont.css";
.menuContainer {
  height: calc(100% - 40px);
  overflow: auto;
}
</style>
