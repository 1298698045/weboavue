<template>
  <div class="menuContainer">
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="state.collapsed" />
            <MenuFoldOutlined v-else />
        </a-button> -->
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="props.collapsed"
      :items="items"
      @click="handleMenu"
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
} from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
const props = defineProps({
  collapsed: Boolean,
});
console.log("props", props.collapsed);
const route = useRoute();
const router = useRouter();
const routes = router.options.routes;
// const currentPath = router.currentRoute.value.fullPath;
const currentPath = route.path;
// console.log('route',route.matched)
// console.log("routes",routes)
const currentRoutes = route.matched;


// var list = [];
// list2.map((item) => {
//   list.push({
//     key: item.path,
//     label: item.name,
//     title: item.name,
//     // icon: () => h(PieChartOutlined),
//     icon: ()=> h("i", {
//       class:["iconfont","icon-"+item.meta.icon]
//     }),
//   });
// });
// console.log("menus:", list);

const data = reactive({
  items: []
});
const { items } = toRefs(data);
const loadMenus = (list,path) => {
  var list2 = [];
  const formTreeData = (arr) => {
    arr.forEach((item) => {
      item.key = item.path;
      item.label = item.name;
      item.title = item.name;
      item.icon = ()=> h("i", {
        class:["iconfont","icon-"+item.meta.icon]
      })
      if (item.path == path) {
        list2 = arr;
      }
      if (item.children) {
        formTreeData(item.children);
      }
    });
  };
  formTreeData(list);
  var temp = [];
  const handleTwoMenu = (list) => {
    let children = [];
    list.forEach(item=>{
      if(item.children){
        children.push({
          key: item.path,
          label: item.name,
          title: item.name,
          icon: ()=> h("i", {
            class:["iconfont","icon-"+item.meta.icon]
          }),
          children: handleTwoMenu(item.children)
        })
      }else {
        children.push({
          key: item.path,
          label: item.name,
          title: item.name,
          icon: ()=> h("i", {
            class:["iconfont","icon-"+item.meta.icon]
          })
        })
      }
    })
    return children;
  }
  list2.map((item) => {
    if(item.children && item.name){
      let arr = handleTwoMenu(item.children);
      temp.push({
        key: item.path,
        label: item.name,
        title: item.name,
        icon: ()=> h("i", {
          class:["iconfont","icon-"+item.meta.icon]
        }),
        children: arr
      });
    }else if(item.name){
      temp.push({
        key: item.path,
        label: item.name,
        title: item.name,
        icon: ()=> h("i", {
          class:["iconfont","icon-"+item.meta.icon]
        })
      });
    }
  });
  data.items = temp;
  console.log("items:",temp)
}
loadMenus(routes,currentPath)
// var list2 = [];
// const formTreeData = (arr) => {
//   arr.forEach((item) => {
//     if (item.path == currentPath) {
//       list2 = arr;
//     }
//     if (item.children) {
//       formTreeData(item.children);
//     }
//   });
// };
// formTreeData(routes);
// console.log("list2",list2);

const state = reactive({
  collapsed: false,
  selectedKeys: [ route.path ],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});
// const items = reactive([
//   {
//     key: "1",
//     icon: () => h(PieChartOutlined),
//     label: "Option 1",
//     title: "Option 1",
//   },
//   {
//     key: "2",
//     icon: () => h(DesktopOutlined),
//     label: "Option 2",
//     title: "Option 2",
//   },
//   {
//     key: "3",
//     icon: () => h(InboxOutlined),
//     label: "Option 3",
//     title: "Option 3",
//   },
// ]);
// var list = [];
// list2.map((item) => {
//   list.push({
//     key: item.path,
//     label: item.name,
//     title: item.name,
//     // icon: () => h(PieChartOutlined),
//     icon: ()=> h("i", {
//       class:["iconfont","icon-"+item.meta.icon]
//     }),
//   });
// });
// console.log("menus:", list);
// const items = reactive(list);
// console.log("list",list,items);
// items = list;

// onMounted(()=>{
// })
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
watch(() => route.path,newRoute=> {
    console.log(newRoute,router.options.routes);
    const listData = router.options.routes;
    state.selectedKeys = [ newRoute ];
    console.log(newRoute,'newRoute',route, data.items);
    let isBook = false;
    const filterVal = (list) => {
      list.forEach(item=>{
        if(item.key==newRoute){
          isBook = true;
          return false;
        }
        if(item.children){
          filterVal(item.children);
        }
      })
    }
    filterVal(data.items);
    if(!isBook){
      loadMenus(listData,newRoute);
    }
})
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
const handleMenu = (e) => {
  console.log("e", e);
  router.push(e.key);
};
</script>
<style>
@import "./menu.less";
@import "../../../style/icon/iconfont.css";
</style>
