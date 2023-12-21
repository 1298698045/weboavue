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
        path: "/contract/template",
        name: "合同模板",
        // component: () => import("../views/contract/template/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同模板"
        },
        children: [
          {
            path: "/contract/template/modelLibrary",
            name: "范本库",
            component: () => import("../views/contract/template/modelLibrary/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "范本库"
            },
          },
          {
            path: "/contract/template/temLibrary",
            name: "模板库",
            component: () => import("../views/contract/template/temLibrary/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "模板库"
            },
          },
          {
            path: "/contract/template/termLibrary",
            name: "条款库",
            component: () => import("../views/contract/template/termLibrary/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "条款库"
            },
          }
        ]
      },
      {
        path: "/contract/draft",
        name: "合同拟稿",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同拟稿"
        },
        children: [
          {
            path: "/contract/draft/outsideIdentify",
            name: "外部合同识别",
            component: () => import("../views/contract/draft/outsideIdentify/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "外部合同识别"
            },
          },
          {
            path: "/contract/draft/sign",
            name: "快速合同签署",
            component: () => import("../views/contract/draft/sign/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "快速合同签署"
            },
          },
        ]
      },
      {
        path: "/contract/approve",
        name: "合同审批",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同审批"
        },
        children: [
          {
            path: "/contract/approve/completed",
            name: "已办",
            component: () => import("../views/contract/approve/completed/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "已办"
            },
          },
          {
            path: "/contract/approve/completion",
            name: "办结",
            component: () => import("../views/contract/approve/completion/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "办结"
            },
          },
          {
            path: "/contract/approve/needTo",
            name: "待办",
            component: () => import("../views/contract/approve/needTo/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "待办"
            },
          },
        ]
      },
      {
        path: "/contract/performance",
        name: "合同履约",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同履约"
        },
        children: [
          {
            path: "/contract/performance/admin",
            name: "合同管理",
            component: () => import("../views/contract/performance/contractAdmin/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同管理"
            },
          },
          {
            path: "/contract/performance/payment",
            name: "付款管理",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "付款管理"
            },
            children: [
              {
                path: "/contract/performance/payment",
                name: "付款计划",
                component: () => import("../views/contract/performance/paymentAdmin/plan/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "付款计划"
                },
              },
              {
                path: "/contract/performance/payment/execute",
                name: "付款执行",
                component: () => import("../views/contract/performance/paymentAdmin/execute/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "付款执行"
                },
              },
              {
                path: "/contract/performance/payment/voucher",
                name: "付款凭证",
                component: () => import("../views/contract/performance/paymentAdmin/voucher/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "付款凭证"
                },
              },
              {
                path: "/contract/performance/payment/record",
                name: "付款记录",
                component: () => import("../views/contract/performance/paymentAdmin/record/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "付款记录"
                },
              },
            ]
          },
          {
            path: "/contract/performance/collection",
            name: "收款管理",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "收款管理"
            },
            children: [
              {
                path: "/contract/performance/collection/plan",
                name: "收款计划",
                component: () => import("../views/contract/performance/collectionAdmin/plan/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "收款计划"
                },
              },
              {
                path: "/contract/performance/collection/record",
                name: "收款记录",
                component: () => import("../views/contract/performance/collectionAdmin/record/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "收款记录"
                },
              },
              {
                path: "/contract/performance/collection/notPayment",
                name: "开票未到款",
                component: () => import("../views/contract/performance/collectionAdmin/notPayment/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "开票未到款"
                },
              },
            ]
          },
          {
            path: "/contract/performance/change",
            name: "变更管理",
            component: () => import("../views/contract/performance/change/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "变更管理"
            }
          },
          {
            path: "/contract/performance/invoice",
            name: "发票管理",
            component: () => import("../views/contract/performance/invoice/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "发票管理"
            },
          },
          {
            path: "/contract/performance/order",
            name: "订单信息",
            component: () => import("../views/contract/performance/order/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "订单信息"
            },
          },
          {
            path: "/contract/performance/risk/earlyWarning",
            name: "风险管理",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "风险管理"
            },
            children: [
              {
                path: "/contract/performance/risk/earlyWarning",
                name: "预警处理",
                component: () => import("../views/contract/performance/riskAdmin/earlyWarning/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "预警处理"
                },
              },
              {
                path: "/contract/performance/risk/term",
                name: "风险条款",
                component: () => import("../views/contract/performance/riskAdmin/term/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "风险条款"
                },
              },
              {
                path: "/contract/performance/risk/buryingPoint",
                name: "埋点设定",
                component: () => import("../views/contract/performance/riskAdmin/buryingPoint/index.vue"),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "埋点设定"
                },
              }
            ]
          },
          {
            path: "/contract/performance/evaluate",
            name: "合同后评价",
            component: () => import("../views/contract/performance/evaluate/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同后评价"
            },
          },
          {
            path: "/contract/performance/saleOrder",
            name: "销售订单",
            component: () => import("../views/contract/performance/saleOrder/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "销售订单"
            },
          },
        ]
      },
      {
        path: "/contract/archives",
        name: "合同档案",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同档案"
        },
        children: [
          {
            path: "/contract/archives/accept",
            name: "合同档案接收",
            component: () => import("../views/contract/archives/accept/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案接收"
            },
          },
          {
            path: "/contract/archives/query",
            name: "合同档案查询",
            component: () => import("../views/contract/archives/query/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案查询"
            },
          },
          {
            path: "/contract/archives/filterSearch",
            name: "档案条件检索",
            component: () => import("../views/contract/archives/filterSearch/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "档案条件检索"
            },
          },
          {
            path: "/contract/archives/borrowing",
            name: "合同档案借阅",
            component: () => import("../views/contract/archives/borrowing/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案借阅"
            },
          },
          {
            path: "/contract/archives/statistics",
            name: "合同档案统计",
            component: () => import("../views/contract/archives/statistics/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案统计"
            },
          },
          {
            path: "/contract/archives/identify",
            name: "合同档案鉴定",
            component: () => import("../views/contract/archives/identify/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案鉴定"
            },
          },
          {
            path: "/contract/archives/classification",
            name: "合同档案密级",
            component: () => import("../views/contract/archives/classification/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案密级"
            },
          },
          {
            path: "/contract/archives/destruction",
            name: "合同档案销毁",
            component: () => import("../views/contract/archives/destruction/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案销毁"
            },
          },
          {
            path: "/contract/archives/import",
            name: "档案批量导入",
            component: () => import("../views/contract/archives/import/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "档案批量导入"
            },
          },
          {
            path: "/contract/archives/gather",
            name: "外部接口采集",
            component: () => import("../views/contract/archives/gather/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "外部接口采集"
            },
          },
        ]
      },
      {
        path: "/contract/fullTextSearching",
        name: "全文检索",
        component: () => import("../views/contract/fullTextSearching/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "全文检索"
        },
      },
      {
        path: "/contract/reportForms",
        name: "合同报表",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同报表"
        },
        children: [
          {
            path: "/contract/reportForms/signSituation",
            name: "合同签署情况",
            component: () => import("../views/contract/reportForms/signSituation/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同签署情况"
            },
          },
          {
            path: "/contract/reportForms/schedule",
            name: "合同进度报表",
            component: () => import("../views/contract/reportForms/schedule/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同进度报表"
            },
          },
          {
            path: "/contract/reportForms/change",
            name: "合同变更报表",
            component: () => import("../views/contract/reportForms/change/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同变更报表"
            },
          },
          {
            path: "/contract/reportForms/loss",
            name: "合同损失报表",
            component: () => import("../views/contract/reportForms/loss/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同损失报表"
            },
          },
          {
            path: "/contract/reportForms/riskSituation",
            name: "合同风险情况",
            component: () => import("../views/contract/reportForms/riskSituation/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同风险情况"
            },
          },
          {
            path: "/contract/reportForms/saleSituation",
            name: "销售情况报表",
            component: () => import("../views/contract/reportForms/saleSituation/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "销售情况报表"
            },
          },
          {
            path: "/contract/reportForms/procureSituation",
            name: "采购情况报表",
            component: () => import("../views/contract/reportForms/procureSituation/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "采购情况报表"
            },
          },
          {
            path: "/contract/reportForms/executeSituation",
            name: "合同执行情况",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同执行情况"
            },
            children: [
              
            ]
          },
          {
            path: "/contract/reportForms/special",
            name: "工程合同专项",
            component: () => import("../views/contract/reportForms/special/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "工程合同专项"
            },
          },
          {
            path: "/contract/reportForms/analysis",
            name: "业绩趋势分析",
            component: () => import("../views/contract/reportForms/analysis/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "业绩趋势分析"
            },
          },
        ]
      },
      {
        path: "/contract/permission",
        name: "合同权限",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "合同权限"
        },
        children: [
          {
            path: "/contract/permission/approval",
            name: "合同审批权限",
            component: () => import("../views/contract/permission/approval/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同审批权限"
            },
          },
          {
            path: "/contract/permission/matrix",
            name: "多维权责矩阵",
            component: () => import("../views/contract/permission/matrix/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "多维权责矩阵"
            },
          },
          {
            path: "/contract/permission/group",
            name: "集团分级分权",
            component: () => import("../views/contract/permission/group/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "集团分级分权"
            },
          },
        ]
      },
      {
        path: "/contract/seeting",
        name: "基础设置",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "基础设置"
        },
        children: [
          {
            path: "/contract/seeting/supplier",
            name: "供应商管理",
            component: () => import("../views/contract/seeting/supplier/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "供应商管理"
            },
          },
          {
            path: "/contract/seeting/relativeList",
            name: "相对方列表",
            component: () => import("../views/contract/seeting/relativeList/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "相对方列表"
            },
          },
          {
            path: "/contract/seeting/system",
            name: "合同制度库",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同制度库"
            },
            children: []
          },
          {
            path: "/contract/seeting/type",
            name: "合同类型管理",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同类型管理"
            },
            children: []
          },
          {
            path: "/contract/seeting/rule",
            name: "编码规则设定",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "编码规则设定"
            },
            children: []
          },
          {
            path: "/contract/seeting/templateAdmin",
            name: "合同模板管理",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同模板管理"
            },
            children: []
          },
          {
            path: "/contract/seeting/modelAdmin",
            name: "合同范本管理",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同范本管理"
            },
            children: []
          },
          {
            path: "/contract/seeting/keyword",
            name: "关键词设置",
            component: () => import("../views/contract/seeting/keyword/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "关键词设置"
            },
          },
          {
            path: "/contract/seeting/cooperateWith",
            name: "合同协同信息",
            component: () => import("../views/contract/seeting/cooperateWith/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同协同信息"
            },
          },
          {
            path: "/contract/seeting/inspectAdmin",
            name: "合规检查管理",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合规检查管理"
            },
            children: []
          },
          {
            path: "/contract/seeting/settlementRule",
            name: "结算规则设定",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "结算规则设定"
            },
            component: () => import("../views/contract/seeting/settlementRule/index.vue"),
          },
        ]
      },
      // {
      //   path: "/contract/Invoice/home",
      //   name: "发票管理",
      //   component: () => import("../views/contract/invoice/index.vue"),
      //   icon: "xinjian",
      //   meta: {
      //     icon: "xinjian",
      //     name: "发票管理"
      //   },
      // },
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
      // {
      //   path: "/contract/payment",
      //   name: "付款管理",
      //   component: () => import("../views/contract/payment/index.vue"),
      //   icon: "xinjian",
      //   meta: {
      //     icon: "xinjian",
      //     name: "付款管理"
      //   },
      // },
      // {
      //   path: "/contract/collection",
      //   name: "收款管理",
      //   component: () => import("../views/contract/collection/index.vue"),
      //   icon: "xinjian",
      //   meta: {
      //     icon: "xinjian",
      //     name: "收款管理"
      //   }
      // },
      // {
      //   path: "/Contract/change/home",
      //   name: "合同变更",
      //   component: () => import("../views/contract/change/index.vue"),
      //   icon: "xinjian",
      //   meta: {
      //     icon: "xinjian",
      //     name: "合同变更"
      //   }
      // },
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
      
    ]
  },
  {
    path: "/reimburse",
    name: "Reimburse",
    component: Layout,
    redirect: "/reimburse/home",
    children: [
      {
        path: "/reimburse/home",
        name: "费控首页",
        component: () => import("../views/reimburse/home/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "费控首页"
        },
      },
      {
        path: "/reimburse/invoice",
        name: "发票管理",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "发票管理"
        },
        children: [

        ]
      },
      {
        path: "/reimburse/reimburse",
        name: "报销审核",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "报销审核"
        },
        children: [
          
        ]
      },
      {
        path: "/reimburse/finance",
        name: "财务处理",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "财务处理"
        },
        children: [
          
        ]
      },
      {
        path: "/reimburse/myReimburse",
        name: "我的报销",
        component: () => import("../views/reimburse/myReimburse/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "我的报销"
        },
      },
      {
        path: "/reimburse/accounting",
        name: "电子会计档案",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "电子会计档案"
        },
        children: [
          
        ]
      },
      {
        path: "/reimburse/arap",
        name: "应收应付",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "应收应付"
        },
        children: [
          
        ]
      },
      {
        path: "/reimburse/budgetSeeting",
        name: "预算设置",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "预算设置"
        },
        children: [
          
        ]
      },
      {
        path: "/reimburse/reportForms",
        name: "报表分析",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "报表分析"
        },
        children: [
          
        ]
      },
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
