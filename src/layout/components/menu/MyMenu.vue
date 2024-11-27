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
  selectedKeys: [route.name],
  openKeys: [],
  preOpenKeys: [],
  rootSubmenuKeys: [],
});

watch(()=> store.state.moduleName, (newVal,oldVal)=>{
  setTimeout(()=>{
    data.appTabs = store.state.subModules.map(item=>{
      item.label = item.navAction.label;
      item.key = item.name;
      item.icon = () => h("i", {
        class: ["iconfont", "icon-tongxunlu1"],
      });
      return item;
    });
    // console.log("route.name", route.name);
    // state.selectedKeys = [route.name];
  }, 1000);
}, {immediate: true, deep: true});

watch(()=> route.path, ()=>{
  state.selectedKeys = [route.name];
})


const handleMenu = (e) => {
  // console.log('e', e);
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
  height: calc(~"100% - 40px");
  overflow: auto;
}
</style>
