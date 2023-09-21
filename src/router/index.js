import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
const Layout = () => import("@/layout");
const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/flow/todoList",
  },
  {
    path: "/flow",
    name: "流程管理",
    component: Layout,
    redirect: "/flow/todoList",
    children: [
      {
        path: "/flow/todoList",
        component: () => import("../views/flow/todoList/index.vue"),
        name: "待办事务",
      },
      {
        path: "/about",
        component: () => import("../views/About.vue"),
        name: "about",
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
