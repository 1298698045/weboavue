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
  getCurrentInstance
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

const props = defineProps({
  collapsed: Boolean,
  appCode: String
});
const route = useRoute();
const router = useRouter();
const routes = router.options.routes;
const currentPath = route.path;
const currentRoutes = route.matched;

const data = reactive({
  items: [],
  appTabs: []
});
const { items, appTabs } = toRefs(data);

const getCurrentApp = () => {
  let obj = {
    actions:[{
      id: "4105;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        appCode: props.appCode
      }
    }]
  };
  let d = {
    message: JSON.stringify(obj)
  }
  proxy.$post(Interface.currentApp, d).then(res=>{
    data.appTabs = res.actions[0].returnValue.tabs.map(item=>{
      item.label = item.navAction.label;
      item.key = item.navAction.url;
      item.icon = () => h("i", {
        class: ["iconfont", "icon-tongxunlu1"],
      });
      return item;
    });
    let routePath = localStorage.getItem("routePath");
    //routePath=''
    if(routePath){
      router.push({
        path: routePath
      });
    }else {
      router.push({
        path: data.appTabs[0].key
      });
    }
  })
};

watch(()=> props.appCode, (newVal, oldVal) => {
  // console.log("props.appCode", props.appCode);
  getCurrentApp();
}, { immediate: true });

const state = reactive({
  collapsed: false,
  selectedKeys: [route.path],
  openKeys: [],
  preOpenKeys: [],
  rootSubmenuKeys: [],
});

watch(
  () => data.items,
  (newVal, oldVal) => {
    // console.log("newVal", newVal);
    newVal.forEach((item) => {
      state.rootSubmenuKeys.push(item.key);
    });
  },
  { deep: true, immediate: true }
);

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);

const loadMenus = () => {
  // console.log(route.matched);
  if(route.matched.length){
  // console.log(route.matched);

    const routepath = route.matched[0].path;
    let list = [];
    routes.forEach((item) => {
      if (item.path == routepath) {
        list = item.children;
      }
    });
    const formTreeData = (arr, count) => {
      let arrTemp = [];
      if(Array.isArray(arr)){
        arr.forEach((item) => {
          if (item.children) {
            if (count == 1) {
              arrTemp.push({
                key: item.path,
                label: item.meta.name,
                title: item.meta.name,
                icon: () =>
                  h("i", {
                    class: ["iconfont", "icon-" + item.meta.icon],
                  }),
                children: formTreeData(item.children, 2),
              });
            } else {
              arrTemp.push({
                key: item.path,
                label: item.meta.name,
                title: item.meta.name,
                children: formTreeData(item.children, 2),
              });
            }
          } else {
            if (count == 1) {
              arrTemp.push({
                key: item.path,
                label: item.meta.name,
                title: item.meta.name,
                icon: () =>
                  h("i", {
                    class: ["iconfont", "icon-" + item.meta.icon],
                  }),
              });
            } else {
              arrTemp.push({
                key: item.path,
                label: item.meta.name,
                title: item.meta.name,
              });
            }
          }
        });
      }
      return arrTemp;
    };
    let result = formTreeData(list, 1);
    data.items = result;
  }
};
watch(
  () => route.path,
  (newRoute) => {
    state.selectedKeys = [newRoute];
    loadMenus();
  },
  { deep: true, immediate: true }
);

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
const handleMenu = (e) => {
  // console.log("e", e);
  router.push(e.key);
  localStorage.setItem("routePath", e.key);
};
const onOpenChange = (openKeys) => {
  // console.log("openKeys", openKeys, state.openKeys);
  const latestOpenKey = openKeys.find(
    (key) => state.openKeys.indexOf(key) === -1
  );
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys;
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};

// 处理数据展开应展开的菜单
const handleData = (result) => {
  function loop(list, keys = []) {
    // 循环【顶级菜单数组列表】 循环的数组下标用i表示
    // keys参数为当前菜单的所有上级菜单的router（用作openKeys的值)
    for (let item of list) {
      // console.log("item.path === route.path",item.key,'===', route.path)
      if (item.key === route.path) {
        // 如果路由path与item.router相等则直接返回当前路由的所有上级的router
        // console.log("itemkeys", item);
        // keys.concat(item.path)
        return [...keys];
      } else if (item.children && item.children.length) {
        // 如果item.router不等于当前$router.path则递归调用loop函数，传入item.children、[...keys, item.router]
        let tempResult = loop(item.children, [...keys, item.key]);
        // console.log("tempResult", tempResult);
        if (tempResult !== false) {
          return tempResult;
        }
      }
    }
    return false;
  }
  let openKeys = loop(result);
  // console.log("openKeys88", openKeys);
  state.openKeys = openKeys;
};
handleData(data.items);
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
