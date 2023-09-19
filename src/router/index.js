import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
const Layout = () => import("@/layout");
const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
  },
  {
    path: "/home",
    name: "Home",
    component: Layout,
    children: [
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
