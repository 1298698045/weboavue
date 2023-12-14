import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
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
        path: "/flow/add",
        component: () => import("../views/flow/add/index.vue"),
        name: "新建事务",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/flow/todoList",
        component: () => import("../views/flow/todoList/index.vue"),
        name: "待办事务",
        icon: "daiban1",
        meta: {
          icon: "daiban1",
        },
      },
      {
        path: "/flow/completed",
        component: () => import("../views/flow/completed/index.vue"),
        name: "已办事务",
        icon: "yiban",
        meta: {
          icon: "yiban",
        },
      },
      {
        path: "/flow/doRecord",
        component: () => import("../views/flow/doRecord/index.vue"),
        name: "办理记录",
        icon: "daiban1",
        meta: {
          icon: "daiban1",
        },
      },
      {
        path: "/flow/myStart",
        component: () => import("../views/flow/myStart/index.vue"),
        name: "我的发起",
        icon: "faqi",
        meta: {
          icon: "faqi",
        },
      },
      {
        path: "/flow/returnBox",
        component: () => import("../views/flow/returnBox/index.vue"),
        name: "退件箱",
        icon: "tuijian",
        meta: {
          icon: "tuijian",
        },
      },
      {
        path: "/flow/receivedCirculation",
        component: () => import("../views/flow/receivedCirculation/index.vue"),
        name: "收到传阅",
        icon: "shoudaochuanyue",
        meta: {
          icon: "shoudaochuanyue",
        },
      },
      {
        path: "/flow/myCirculation",
        component: () => import("../views/flow/myCirculation/index.vue"),
        name: "我传阅的",
        icon: "chuanyue",
        meta: {
          icon: "chuanyue",
        },
      },
      {
        path: "/flow/drafts",
        component: () => import("../views/flow/drafts/index.vue"),
        name: "草稿箱",
        icon: "caogaoxiang",
        meta: {
          icon: "caogaoxiang",
        },
      },
      {
        path: "/flow/seeting",
        component: () => import("../views/flow/seeting/index.vue"),
        name: "流程设置",
        icon: "caogaoxiang",
        meta: {
          icon: "caogaoxiang",
        },
      },
      {
        path: "/flow/workAdmin",
        component: () => import("../views/flow/workAdmin/index.vue"),
        name: "事务管理",
        icon: "caogaoxiang",
        meta: {
          icon: "caogaoxiang",
        },
      },
      {
        path: "/flow/signatureAdmin",
        component: () => import("../views/flow/signatureAdmin/index.vue"),
        name: "签名管理",
        icon: "caogaoxiang",
        meta: {
          icon: "caogaoxiang",
        },
      },
      {
        path: "/flow/formSearch",
        component: () => import("../views/flow/formSearch/index.vue"),
        name: "表单查询",
        icon: "caogaoxiang",
        meta: {
          icon: "caogaoxiang",
        },
      },
      {
        path: "/flow/formSearch/list",
        component: () => import("../views/flow/formSearch/list.vue"),
        meta: {
          icon: "caogaoxiang",
        },
      },
      // {
      //   path: "/about",
      //   component: () => import("../views/About.vue"),
      //   name: "about",
      // },
    ],
  },
  {
    path: "/flow/seeting/detail",
    component: () => import("@/views/flow/seeting/detail/index.vue"),
    name: "FlowSeetingDetail"
  },
  {
    path: "/workplan",
    name: "日程管理",
    component: Layout,
    redirect: "/workplan/calendar",
    children: [
      {
        path: "/workplan/calendar",
        component: () => import("../views/scheduleAdmin/calendar/index.vue"),
        name: "日历",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/workplan/schedule",
        component: () => import("../views/scheduleAdmin/schedule/index.vue"),
        name: "日程一览表",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/workplan/schedule/leader",
        component: () => import("../views/scheduleAdmin/leader/index.vue"),
        name: "领导日程",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/workplan/schedule/search",
        component: () => import("../views/scheduleAdmin/search/index.vue"),
        name: "日程查询",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/workplan/talent",
        component: () => import("../views/scheduleAdmin/talent/index.vue"),
        name: "人才管理",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
    ],
  },
  {
    path: "/oa",
    name: "Oa",
    component: Layout,
    redirect: "/oa/addressBook",
    children: [
      {
        path: "/oa/addressBook",
        component: () => import("../views/oa/addressBook/index.vue"),
        name: "通讯录",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/oa/group",
        component: () => import("../views/oa/group/index.vue"),
        name: "小组",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/oa/file",
        component: () => import("../views/fileAdmin/index.vue"),
        name: "文件管理",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/oa/information",
        component: () => import("../views/information/list/index.vue"),
        name: "信息管理",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
    ],
  },
  {
    path: "/group/detail",
    name: "GroupDetail",
    component: () => import("../views/oa/groupDetail/index.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../views/detail/detail.vue"),
  },
  {
    path: "/email",
    name: "Email",
    component: () => import("../views/email/home/index.vue"),
  },
  {
    path: "/email/write",
    name: "WriteEmail",
    component: () => import("../views/email/writeEmail/index.vue"),
  },
  {
    path: "/meeting",
    name: "Metting",
    component: Layout,
    redirect: "/meeting/calendar",
    children: [
      {
        path: "/meeting/calendar",
        name: "会议日历",
        component: () => import("../views/meeting/calendar/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/meeting/room",
        name: "会议室使用状况",
        component: () =>
          import("../views/meeting/meetingRoom/MeetingRoomUse.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/meeting/topics",
        name: "议题管理",
        component: () => import("../views/meeting/topics/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/meeting/search",
        name: "会议查询",
        component: () => import("../views/meeting/search/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/meeting/task",
        name: "会议任务",
        component: () => import("../views/meeting/task/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/meeting/mettingRoomMaintenance",
        name: "会议室维护",
        component: () => import("../views/meeting/mettingRoomMaintenance/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/meeting/participant",
        name: "会议参会人",
        component: () => import("../views/meeting/participant/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/meeting/reportForms",
        name: "会议报表",
        component: () => import("../views/meeting/reportForms/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/meeting/activity",
        name: "会议活动",
        component: () => import("../views/meeting/activity/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
    ],
  },
  {
    path: "/fileDetail",
    name: "FileDetail",
    component: () => import("../views/fileAdmin/fileDetail.vue"),
  },
  {
    path: "/informationEditor",
    name: "InformationEditor",
    component: () => import("../views/information/editor/index.vue"),
  },
  {
    name: "InformationDetail",
    component: () => import("../views/information/detail/index.vue"),
  },
  {
    path: "/previewContent",
    name: "PreviewContent",
    component: () => import("../views/information/preview/index.vue"),
  },
  {
    path: "/informationDetail",
    name: "InformationDetail",
    component: () => import("../views/information/detail/index.vue"),
  },
  {
    path: "/previewContent",
    name: "PreviewContent",
    component: () => import("../views/information/preview/index.vue"),
  },
  {
    path: "/hrsetting",
    name: "hrsetting",
    component: Layout,
    redirect: "/hrsetting/dashboard",
    children: [
      {
        path: "/hrsetting/dashboard",
        name: "门户仪表盘设计",
        component: () => import("../views/sys/dashboard/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      }
    ]
  },
  {
    path: "/hrsetting/design",
    name: "Design",
    component: () => import("../views/sys/design/index.vue"),
  },
  {
    path: "/portal",
    name: "DesignHome",
    component: () => import("../views/sys/home/index.vue"),
  },
  {
    path: "/OfficialDocument",
    name: "OfficialDocument",
    component: Layout,
    redirect: "/OfficialDocument/myReceiving",
    children: [
      {
        path: "/OfficialDocument/myReceiving",
        name: "我的公文",
        component: () => import("../views/documentAdmin/myReceiving/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/OfficialDocument/myDispatch",
        name: "我的发文",
        component: () => import("../views/documentAdmin/myDispatch/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/OfficialDocument/receivingAdmin",
        name: "收文管理",
        component: () => import("../views/documentAdmin/receivingAdmin/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/OfficeDocument/out/home",
        name: "发文管理",
        component: () => import("../views/documentAdmin/outgoingAdmin/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/ui/RequestReport/search",
        name: "请示报告",
        component: () => import("../views/documentAdmin/report/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/OfficialNotice/search",
        name: "上级通知",
        component: () => import("../views/documentAdmin/superiorNotice/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/o/ContentDocument/template/home",
        name: "正文模板",
        component: () => import("../views/documentAdmin/textTemplate/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/OfficeDocument/read/log",
        name: "阅读日志",
        component: () => import("../views/documentAdmin/readingLog/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
        children: [
          {
            path: "/OfficeDocument/read/list",
            name: "阅读日志child",
            component: () => import("../views/documentAdmin/readingLog/list.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
            },
            children: [
              {
                path: "/OfficeDocument/read/listchild",
                name: "阅读日志child",
                component: () => import("../views/documentAdmin/readingLog/list.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                },
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/workspace",
    name: "workspace",
    component: Layout,
    redirect: "/workspace/personal/home",
    children: [
      {
        path: "/workspace/personal/home",
        name: "个人中心",
        component: () => import("../views/workspace/personalCenter/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "个人中心"
        },
      }
    ]
  },
  {
    path: "/contract",
    name: "Contract",
    component: Layout,
    redirect: "/contract/home",
    children: [
      {
        path: "/contract/home",
        name: "合同门户",
        component: () => import("../views/contract/home/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同门户"
        },
      },
      {
        path: "/contract/admin",
        name: "合同管理",
        component: () => import("../views/contract/contractAdmin/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同管理"
        },
      },
      {
        path: "/contract/Invoice/home",
        name: "发票管理",
        component: () => import("../views/contract/invoice/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "发票管理"
        },
      },
      {
        path: "/contract/execution",
        name: "合同执行",
        component: () => import("../views/contract/execution/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同执行"
        },
      },
      {
        path: "/contract/plan",
        name: "合同计划",
        component: () => import("../views/contract/plan/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同计划"
        },
      },
      {
        path: "/contract/payment",
        name: "付款管理",
        component: () => import("../views/contract/payment/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "付款管理"
        },
      },
      {
        path: "/contract/collection",
        name: "收款管理",
        component: () => import("../views/contract/collection/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "收款管理"
        }
      },
      {
        path: "/Contract/change/home",
        name: "合同变更",
        component: () => import("../views/contract/change/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同变更"
        }
      },
      {
        path: "/contract/audit",
        name: "合同审计",
        component: () => import("../views/contract/audit/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同审计"
        }
      },
      {
        path: "/contract/template",
        name: "合同模板",
        component: () => import("../views/contract/template/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同模板"
        }
      }
    ]
  }
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
  mode: "hash",
});

export default router;
