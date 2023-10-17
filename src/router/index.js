import { createRouter, createWebHistory, createWebHashHistory  } from "vue-router";
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
        path:"/flow/add",
        component: () => import("../views/flow/add/index.vue"),
        name: "新建事务",
        icon: "xinjian",
        meta: {
          icon: "xinjian"
        }
      },
      {
        path: "/flow/todoList",
        component: () => import("../views/flow/todoList/index.vue"),
        name: "待办事务",
        icon: "daiban1",
        meta: {
          icon: "daiban1",
        }
      },
      {
        path: "/flow/completed",
        component: () => import("../views/flow/completed/index.vue"),
        name: "已办事务",
        icon: "yiban",
        meta: {
          icon: "yiban",
        }
      },
      {
        path: "/flow/doRecord",
        component: () => import("../views/flow/doRecord/index.vue"),
        name: "办理记录",
        icon: "daiban1",
        meta: {
          icon: "daiban1",
        }
      },
      {
        path: "/flow/myStart",
        component: () => import("../views/flow/myStart/index.vue"),
        name: "我的发起",
        icon: "faqi",
        meta: {
          icon: "faqi",
        }
      },
      {
        path: "/flow/returnBox",
        component: () => import("../views/flow/returnBox/index.vue"),
        name: "退件箱",
        icon: "tuijian",
        meta: {
          icon: "tuijian",
        }
      },
      {
        path: "/flow/receivedCirculation",
        component: () => import("../views/flow/receivedCirculation/index.vue"),
        name: "收到传阅",
        icon: "shoudaochuanyue",
        meta: {
          icon: "shoudaochuanyue",
        }
      },
      {
        path: "/flow/myCirculation",
        component: () => import("../views/flow/myCirculation/index.vue"),
        name: "我传阅的",
        icon: "chuanyue",
        meta: {
          icon: "chuanyue",
        }
      },
      {
        path: "/flow/drafts",
        component: () => import("../views/flow/drafts/index.vue"),
        name: "草稿箱",
        icon: "caogaoxiang",
        meta: {
          icon: "caogaoxiang",
        }
      },
      // {
      //   path: "/about",
      //   component: () => import("../views/About.vue"),
      //   name: "about",
      // },
    ],
  },
  {
    path: "/workplan",
    name: "日程管理",
    component: Layout,
    redirect: "/workplan/calendar",
    children: [
      {
        path:"/workplan/calendar",
        component: () => import("../views/scheduleAdmin/calendar/index.vue"),
        name: "日历",
        icon: "xinjian",
        meta: {
          icon: "xinjian"
        }
      },
      {
        path:"/workplan/schedule",
        component: () => import("../views/scheduleAdmin/schedule/index.vue"),
        name: "日程一览表",
        icon: "xinjian",
        meta: {
          icon: "xinjian"
        }
      },
      {
        path: "/workplan/talent",
        component: () => import("../views/scheduleAdmin/talent/index.vue"),
        name: "人才管理",
        icon: "xinjian",
        meta: {
          icon: "xinjian"
        }
      }
    ]
  },
  {
    path: "/oa",
    name: "Oa",
    component: Layout,
    redirect: "/oa/addressBook",
    children:[
      {
        path:"/oa/addressBook",
        component: () => import("../views/oa/addressBook/index.vue"),
        name: "通讯录",
        icon: "xinjian",
        meta: {
          icon: "xinjian"
        }
      },
      {
        path:"/oa/group",
        component: () => import("../views/oa/group/index.vue"),
        name: "小组",
        icon: "xinjian",
        meta: {
          icon: "xinjian"
        }
      },
    ]
  },
  {
    path: "/detail",
    name: "Detail",
    component: ()=> import("../views/detail/detail.vue")
  }
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
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
  mode: 'hash'
});

export default router;
