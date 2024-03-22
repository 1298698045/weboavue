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
    name: "Login",
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/forgotpassword",
    name: "Forgotpassword",
    component: () => import("../views/login/forgotpassword.vue")
  },
  {
    path: "/layout",
    name: "Layout",
    component: Layout,
    redirect: "/flow/todoList",
  },
  {
    path: "/flow",
    name: "Flow",
    component: Layout,
    redirect: "/flow/todoList",
    meta: {
      name: "流程管理"
    },
    children: [
      {
        path: "/flow/add",
        component: () => import("../views/flow/add/index.vue"),
        name: "NewFlow",
        icon: "xinjianshiwu",
        meta: {
          name: "新建事务",
          icon: "xinjianshiwu",
        },
      },
      {
        path: "/flow/todoList",
        component: () => import("../views/flow/todoList/index.vue"),
        name: "TodoListFlow",
        icon: "daibanshiwu",
        meta: {
          name: "待办事务",
          icon: "daibanshiwu",
        },
      },
      {
        path: "/flow/completed",
        component: () => import("../views/flow/completed/index.vue"),
        name: "CompletedFlow",
        icon: "yibanshiwu",
        meta: {
          name: "已办事务",
          icon: "yibanshiwu",
        },
      },
      {
        path: "/flow/doRecord",
        component: () => import("../views/flow/doRecord/index.vue"),
        name: "DoRecord",
        icon: "banlijilu",
        meta: {
          name: "办理记录",
          icon: "banlijilu",
        },
      },
      {
        path: "/flow/myStart",
        component: () => import("../views/flow/myStart/index.vue"),
        name: "MyStartFlow",
        icon: "wodefaqi1",
        meta: {
          name: "我的发起",
          icon: "wodefaqi1",
        },
      },
      {
        path: "/flow/returnBox",
        component: () => import("../views/flow/returnBox/index.vue"),
        name: "ReturnBox",
        icon: "tuijianxiang",
        meta: {
          name: "退件箱",
          icon: "tuijianxiang",
        },
      },
      {
        path: "/flow/receivedCirculation",
        component: () => import("../views/flow/receivedCirculation/index.vue"),
        name: "ReceivedCirculation",
        icon: "shoudaochuanyue",
        meta: {
          name: "收到传阅",
          icon: "shoudaochuanyue",
        },
      },
      {
        path: "/flow/myCirculation",
        component: () => import("../views/flow/myCirculation/index.vue"),
        name: "MyCirculation",
        icon: "wodechuanyue",
        meta: {
          name: "我传阅的",
          icon: "wodechuanyue",
        },
      },
      {
        path: "/flow/drafts",
        component: () => import("../views/flow/drafts/index.vue"),
        name: "DraftsFlow",
        icon: "caogaoxiang",
        meta: {
          name: "草稿箱",
          icon: "caogaoxiang",
        },
      },
      {
        path: "/flow/seeting",
        component: () => import("../views/flow/seeting/index.vue"),
        name: "SeetingFlow",
        icon: "liuchengshezhi",
        meta: {
          name: "流程设置",
          icon: "liuchengshezhi",
        },
      },
      {
        path: "/flow/workAdmin",
        component: () => import("../views/flow/workAdmin/index.vue"),
        name: "WorkAdmin",
        icon: "shiwuguanli",
        meta: {
          name: "事务管理",
          icon: "shiwuguanli",
        },
      },
      {
        path: "/flow/signatureAdmin",
        component: () => import("../views/flow/signatureAdmin/index.vue"),
        name: "SignatureAdmin",
        icon: "qianmingguanli",
        meta: {
          name: "签名管理",
          icon: "qianmingguanli",
        },
      },
      {
        path: "/flow/formSearch",
        component: () => import("../views/flow/formSearch/index.vue"),
        name: "FormSearchFlow",
        icon: "biaodanchaxun",
        meta: {
          name: "表单查询",
          icon: "biaodanchaxun",
        },
      },
      // {
      //   path: "/flow/formSearch/list",
      //   component: () => import("../views/flow/formSearch/list.vue"),
      //   meta: {
      //     icon: "caogaoxiang",
      //   },
      // },
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
    name: "FlowSeetingDetail",
  },
  {
    path: "/workplan",
    name: "Workplan",
    component: Layout,
    redirect: "/workplan/calendar",
    meta: {
      name: "日程管理"
    },
    children: [
      {
        path: "/workplan/calendar",
        component: () => import("../views/scheduleAdmin/calendar/index.vue"),
        name: "CalendarSchedule",
        icon: "rili",
        meta: {
          name: "日历",
          icon: "rili",
        },
      },
      {
        path: "/workplan/schedule",
        component: () => import("../views/scheduleAdmin/schedule/index.vue"),
        name: "ScheduleSchedule",
        icon: "richengyilanbiao",
        meta: {
          name: "日程一览表",
          icon: "richengyilanbiao",
        },
      },
      {
        path: "/workplan/schedule/leader",
        component: () => import("../views/scheduleAdmin/leader/index.vue"),
        name: "LeaderSchedule",
        icon: "lingdaoricheng",
        meta: {
          name: "领导日程",
          icon: "lingdaoricheng",
        },
      },
      {
        path: "/workplan/schedule/search",
        component: () => import("../views/scheduleAdmin/search/index.vue"),
        name: "SearchSchedule",
        icon: "richengchaxun",
        meta: {
          name: "日程查询",
          icon: "richengchaxun",
        },
      },
      {
        path: "/workplan/talent",
        component: () => import("../views/scheduleAdmin/talent/index.vue"),
        name: "Talent",
        icon: "rencaiguanli",
        meta: {
          name: "人才管理",
          icon: "rencaiguanli",
        },
      },
    ],
  },
  {
    path: "/oa",
    name: "Oa",
    component: Layout,
    redirect: "/oa/addressBook",
    meta: {
      name: "日常办公"
    },
    children: [
      {
        path: "/oa/addressBook",
        component: () => import("../views/oa/addressBook/index.vue"),
        name: "AddressBook",
        icon: "tongxunlu1",
        meta: {
          name: "通讯录",
          icon: "tongxunlu1",
        },
      },
      {
        path: "/oa/group",
        component: () => import("../views/oa/group/index.vue"),
        name: "group",
        icon: "xiaozu",
        meta: {
          name: "小组",
          icon: "xiaozu",
        },
      },
      {
        path: "/oa/file",
        component: () => import("../views/fileAdmin/index.vue"),
        name: "File",
        icon: "wenjianguanli",
        meta: {
          name: "文件管理",
          icon: "wenjianguanli",
        },
      },
      {
        path: "/oa/information",
        component: () => import("../views/information/list/index.vue"),
        name: "Information",
        icon: "xinxiguanli1",
        meta: {
          name: "信息管理",
          icon: "xinxiguanli1",
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
    meta: {
      name: "会议管理"
    },
    children: [
      {
        path: "/meeting/calendar",
        name: "CalendarMeeting",
        component: () => import("../views/meeting/calendar/index.vue"),
        icon: "rili",
        meta: {
          name: "会议日历",
          icon: "rili",
        },
      },
      {
        path: "/meeting/room",
        name: "RoomMeeting",
        component: () =>
          import("../views/meeting/meetingRoom/MeetingRoomUse.vue"),
        icon: "huiyishishiyongqingkuang",
        meta: {
          name: "会议室使用状况",
          icon: "huiyishishiyongqingkuang",
        },
      },
      {
        path: "/meeting/topics",
        name: "TopicsMeeting",
        component: () => import("../views/meeting/topics/index.vue"),
        icon: "yitiguanli",
        meta: {
          name: "议题管理",
          icon: "yitiguanli",
        },
      },
      {
        path: "/meeting/search",
        name: "SearchMeeting",
        component: () => import("../views/meeting/search/index.vue"),
        icon: "huiyichaxun",
        meta: {
          name: "会议查询",
          icon: "huiyichaxun",
        },
      },
      {
        path: "/meeting/task",
        name: "TaskMeeting",
        component: () => import("../views/meeting/task/index.vue"),
        icon: "huiyirenwu",
        meta: {
          name: "会议任务",
          icon: "huiyirenwu",
        },
      },
      {
        path: "/meeting/mettingRoomMaintenance",
        name: "MettingRoomMaintenance",
        component: () =>
          import("../views/meeting/mettingRoomMaintenance/index.vue"),
        icon: "huiyishiweihu",
        meta: {
          name: "会议室维护",
          icon: "huiyishiweihu",
        },
      },
      {
        path: "/meeting/participant",
        name: "ParticipantMeeting",
        component: () => import("../views/meeting/participant/index.vue"),
        icon: "huiyicanhuiren",
        meta: {
          name: "会议参会人",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/meeting/reportForms",
        name: "ReportFormsMeeting",
        component: () => import("../views/meeting/reportForms/index.vue"),
        icon: "huiyibaobiao",
        meta: {
          name: "会议报表",
          icon: "huiyibaobiao",
        },
      },
      {
        path: "/meeting/activity",
        name: "ActivityMeeting",
        component: () => import("../views/meeting/activity/index.vue"),
        icon: "huiyihuodong",
        meta: {
          name: "会议活动",
          icon: "huiyihuodong",
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
    meta: {
      name: "系统配置"
    },
    children: [
      {
        path: "/hrsetting/dashboard",
        name: "Dashboard",
        component: () => import("../views/sys/dashboard/index.vue"),
        icon: "xinjian",
        meta: {
          name: "门户仪表盘",
          icon: "xinjian",
        },
      },
      {
        path: "/hrsetting/design",
        name: "Design",
        component: () => import("../views/sys/design/index.vue"),
        meta: {
          name: "门户仪表盘设计",
          icon: "xinjian",
        },
      },
      {
        path: "/hrsetting/design/home",
        name: "DesignHome",
        component: () => import("../views/sys/home/index.vue"),
        meta: {
          name: "门户仪表盘门户",
          icon: "xinjian",
        },
      }
    ],
  },
  // {
  //   path: "/hrsetting/design",
  //   name: "Design",
  //   component: () => import("../views/sys/design/index.vue"),
  // },
  // {
  //   path: "/portal",
  //   name: "DesignHome",
  //   component: () => import("../views/sys/home/index.vue"),
  // },
  {
    path: "/OfficialDocument",
    name: "OfficialDocument",
    component: Layout,
    redirect: "/OfficialDocument/myReceiving",
    meta: {
      name: "公文管理"
    },
    children: [
      {
        path: "/OfficialDocument/myReceiving",
        name: "MyReceiving",
        component: () => import("../views/documentAdmin/myReceiving/index.vue"),
        icon: "wodeshouwen",
        meta: {
          name: "我的收文",
          icon: "wodeshouwen",
        },
      },
      {
        path: "/OfficialDocument/myDispatch",
        name: "MyDispatch",
        component: () => import("../views/documentAdmin/myDispatch/index.vue"),
        icon: "wodefawen",
        meta: {
          name: "我的发文",
          icon: "wodefawen",
        },
      },
      {
        path: "/OfficialDocument/receivingAdmin",
        name: "ReceivingAdmin",
        component: () =>
          import("../views/documentAdmin/receivingAdmin/index.vue"),
        icon: "shouwenguanli",
        meta: {
          name: "收文管理",
          icon: "shouwenguanli",
        },
      },
      {
        path: "/OfficeDocument/out/home",
        name: "OutgoingAdmin",
        component: () =>
          import("../views/documentAdmin/outgoingAdmin/index.vue"),
        icon: "fawenguanli",
        meta: {
          name: "发文管理",
          icon: "fawenguanli",
        },
      },
      {
        path: "/ui/RequestReport/search",
        name: "RequestReport",
        component: () => import("../views/documentAdmin/report/index.vue"),
        icon: "qingshibaogao",
        meta: {
          name: "请示报告",
          icon: "qingshibaogao",
        },
      },
      {
        path: "/OfficialNotice/search",
        name: "OfficialNotice",
        component: () =>
          import("../views/documentAdmin/superiorNotice/index.vue"),
        icon: "shangjitongzhi",
        meta: {
          name: "上级通知",
          icon: "shangjitongzhi",
        },
      },
      {
        path: "/o/ContentDocument/template/home",
        name: "ContentDocument",
        component: () =>
          import("../views/documentAdmin/textTemplate/index.vue"),
        icon: "zhengwenmoban",
        meta: {
          name: "正文模板",
          icon: "zhengwenmoban",
        },
      },
      {
        path: "/OfficeDocument/read/log",
        name: "readLog",
        component: () => import("../views/documentAdmin/readingLog/index.vue"),
        icon: "yuedurizhi",
        meta: {
          name: "阅读日志",
          icon: "yuedurizhi",
        },
        children: [
          {
            path: "/OfficeDocument/read/list",
            name: "ReadListChild",
            component: () =>
              import("../views/documentAdmin/readingLog/list.vue"),
            icon: "xinjian",
            meta: {
              name: "阅读日志child",
              icon: "xinjian",
            },
            children: [
              {
                path: "/OfficeDocument/read/listchild",
                name: "ReadListChild3",
                component: () =>
                  import("../views/documentAdmin/readingLog/list.vue"),
                icon: "xinjian",
                meta: {
                  name: "阅读日志3",
                  icon: "xinjian",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/workspace",
    name: "workspace",
    component: Layout,
    redirect: "/workspace/personal/home",
    meta: {
      name: "个人中心"
    },
    children: [
      {
        path: "/workspace/personal/home",
        name: "PersonalHome",
        component: () => import("../views/workspace/personalCenter/index.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "个人中心",
        },
      },
    ],
  },
  {
    path: "/contract",
    name: "Contract",
    component: Layout,
    redirect: "/contract/home",
    meta: {
      name: "合同管理"
    },
    children: [
      {
        path: "/contract/home",
        name: "ContractHome",
        component: () => import("../views/contract/home/index.vue"),
        icon: "hetongmenhu",
        meta: {
          icon: "hetongmenhu",
          name: "合同门户",
        },
      },
      {
        path: "/contract/template",
        name: "ContractTemplate",
        // component: () => import("../views/contract/template/index.vue"),
        icon: "hetongmoban1",
        meta: {
          icon: "hetongmoban1",
          name: "合同模板",
        },
        children: [
          {
            path: "/contract/template/modelLibrary",
            name: "ModelLibrary",
            component: () =>
              import("../views/contract/template/modelLibrary/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "范本库",
            },
          },
          {
            path: "/contract/template/temLibrary",
            name: "TemLibrary",
            component: () =>
              import("../views/contract/template/temLibrary/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "模板库",
            },
          },
          {
            path: "/contract/template/termLibrary",
            name: "TermLibrary",
            component: () =>
              import("../views/contract/template/termLibrary/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "条款库",
            },
          },
        ],
      },
      {
        path: "/contract/draft",
        name: "ContractDraft",
        icon: "hetongnigao",
        meta: {
          icon: "hetongnigao",
          name: "合同拟稿",
        },
        children: [
          {
            path: "/contract/draft/outsideIdentify",
            name: "OutsideIdentify",
            component: () =>
              import("../views/contract/draft/outsideIdentify/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "外部合同识别",
            },
          },
          {
            path: "/contract/draft/sign",
            name: "ContractSign",
            component: () => import("../views/contract/draft/sign/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "快速合同签署",
            },
          },
        ],
      },
      {
        path: "/contract/approve",
        name: "ContractApprove",
        icon: "hetongshenpi",
        meta: {
          icon: "hetongshenpi",
          name: "合同审批",
        },
        children: [
          {
            path: "/contract/approve/completed",
            name: "ApproveCompleted",
            component: () =>
              import("../views/contract/approve/completed/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "已办",
            },
          },
          {
            path: "/contract/approve/completion",
            name: "ApproveCompletion",
            component: () =>
              import("../views/contract/approve/completion/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "办结",
            },
          },
          {
            path: "/contract/approve/needTo",
            name: "ApproveNeedTo",
            component: () =>
              import("../views/contract/approve/needTo/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "待办",
            },
          },
        ],
      },
      {
        path: "/contract/performance",
        name: "Performance",
        icon: "hetonglvyue1",
        meta: {
          icon: "hetonglvyue1",
          name: "合同履约",
        },
        children: [
          {
            path: "/contract/performance/admin",
            name: "ContractAdmin",
            component: () =>
              import("../views/contract/performance/contractAdmin/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同管理",
            },
          },
          {
            path: "/contract/performance/payment",
            name: "PaymentAdmin",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "付款管理",
            },
            children: [
              {
                path: "/contract/performance/payment",
                name: "PaymentPlan",
                component: () =>
                  import(
                    "../views/contract/performance/paymentAdmin/plan/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "付款计划",
                },
              },
              {
                path: "/contract/performance/payment/execute",
                name: "PaymentExecute",
                component: () =>
                  import(
                    "../views/contract/performance/paymentAdmin/execute/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "付款执行",
                },
              },
              {
                path: "/contract/performance/payment/voucher",
                name: "PaymentVoucher",
                component: () =>
                  import(
                    "../views/contract/performance/paymentAdmin/voucher/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "付款凭证",
                },
              },
              {
                path: "/contract/performance/payment/record",
                name: "PaymentRecord",
                component: () =>
                  import(
                    "../views/contract/performance/paymentAdmin/record/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "付款记录",
                },
              },
            ],
          },
          {
            path: "/contract/performance/collection",
            name: "CollectionAdmin",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "收款管理",
            },
            children: [
              {
                path: "/contract/performance/collection/plan",
                name: "CollectionPlan",
                component: () =>
                  import(
                    "../views/contract/performance/collectionAdmin/plan/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "收款计划",
                },
              },
              {
                path: "/contract/performance/collection/record",
                name: "CollectionRecord",
                component: () =>
                  import(
                    "../views/contract/performance/collectionAdmin/record/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "到款记录",
                },
              },
              {
                path: "/contract/performance/collection/notPayment",
                name: "NotPayment",
                component: () =>
                  import(
                    "../views/contract/performance/collectionAdmin/notPayment/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "开票未到款",
                },
              },
            ],
          },
          {
            path: "/contract/performance/change",
            name: "ChangeAdmin",
            component: () =>
              import("../views/contract/performance/change/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "变更管理",
            },
          },
          {
            path: "/contract/performance/invoice",
            name: "InvoiceAdmin",
            component: () =>
              import("../views/contract/performance/invoice/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "发票管理",
            },
          },
          {
            path: "/contract/performance/order",
            name: "OrderInfo",
            component: () =>
              import("../views/contract/performance/order/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "订单信息",
            },
          },
          {
            path: "/contract/performance/risk/earlyWarning",
            name: "RiskAdmin",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "风险管理",
            },
            children: [
              {
                path: "/contract/performance/risk/earlyWarning",
                name: "EarlyWarning",
                component: () =>
                  import(
                    "../views/contract/performance/riskAdmin/earlyWarning/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "预警处理",
                },
              },
              {
                path: "/contract/performance/risk/term",
                name: "RiskTerm",
                component: () =>
                  import(
                    "../views/contract/performance/riskAdmin/term/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "风险条款",
                },
              },
              {
                path: "/contract/performance/risk/buryingPoint",
                name: "BuryingPoint",
                component: () =>
                  import(
                    "../views/contract/performance/riskAdmin/buryingPoint/index.vue"
                  ),
                icon: "xinjian",
                meta: {
                  icon: "xinjian",
                  name: "埋点设定",
                },
              },
            ],
          },
          {
            path: "/contract/performance/evaluate",
            name: "ContractEvaluate",
            component: () =>
              import("../views/contract/performance/evaluate/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同后评价",
            },
          },
          {
            path: "/contract/performance/saleOrder",
            name: "SaleOrder",
            component: () =>
              import("../views/contract/performance/saleOrder/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "销售订单",
            },
          },
        ],
      },
      {
        path: "/contract/archives",
        name: "Archives",
        icon: "hetongdangan",
        meta: {
          icon: "hetongdangan",
          name: "合同档案",
        },
        children: [
          {
            path: "/contract/archives/accept",
            name: "ArchivesAccept",
            component: () =>
              import("../views/contract/archives/accept/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案接收",
            },
          },
          {
            path: "/contract/archives/query",
            name: "ArchivesQuery",
            component: () =>
              import("../views/contract/archives/query/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案查询",
            },
          },
          {
            path: "/contract/archives/filterSearch",
            name: "ArchivesFilterSearch",
            component: () =>
              import("../views/contract/archives/filterSearch/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "档案条件检索",
            },
          },
          {
            path: "/contract/archives/borrowing",
            name: "ArchivesBorrowing",
            component: () =>
              import("../views/contract/archives/borrowing/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案借阅",
            },
          },
          {
            path: "/contract/archives/statistics",
            name: "ArchivesStatistics",
            component: () =>
              import("../views/contract/archives/statistics/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案统计",
            },
          },
          {
            path: "/contract/archives/identify",
            name: "ArchivesIdentify",
            component: () =>
              import("../views/contract/archives/identify/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案鉴定",
            },
          },
          {
            path: "/contract/archives/classification",
            name: "ArchivesClassification",
            component: () =>
              import("../views/contract/archives/classification/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案密级",
            },
          },
          {
            path: "/contract/archives/destruction",
            name: "ArchivesDestruction",
            component: () =>
              import("../views/contract/archives/destruction/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同档案销毁",
            },
          },
          {
            path: "/contract/archives/import",
            name: "ArchivesImport",
            component: () =>
              import("../views/contract/archives/import/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "档案批量导入",
            },
          },
          {
            path: "/contract/archives/gather",
            name: "ArchivesGather",
            component: () =>
              import("../views/contract/archives/gather/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "外部接口采集",
            },
          },
        ],
      },
      {
        path: "/contract/fullTextSearching",
        name: "FullTextSearching",
        component: () =>
          import("../views/contract/fullTextSearching/index.vue"),
        icon: "huiyichaxun",
        meta: {
          icon: "huiyichaxun",
          name: "全文检索",
        },
      },
      {
        path: "/contract/reportForms",
        name: "ReportForms",
        icon: "huiyibaobiao",
        meta: {
          icon: "huiyibaobiao",
          name: "合同报表",
        },
        children: [
          {
            path: "/contract/reportForms/signSituation",
            name: "SignSituation",
            component: () =>
              import("../views/contract/reportForms/signSituation/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同签署情况",
            },
          },
          {
            path: "/contract/reportForms/schedule",
            name: "ScheduleReportForms",
            component: () =>
              import("../views/contract/reportForms/schedule/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同进度报表",
            },
          },
          {
            path: "/contract/reportForms/change",
            name: "ChangeReportForms",
            component: () =>
              import("../views/contract/reportForms/change/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同变更报表",
            },
          },
          {
            path: "/contract/reportForms/loss",
            name: "LossReportForms",
            component: () =>
              import("../views/contract/reportForms/loss/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同损失报表",
            },
          },
          {
            path: "/contract/reportForms/riskSituation",
            name: "RiskSituation",
            component: () =>
              import("../views/contract/reportForms/riskSituation/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同风险情况",
            },
          },
          {
            path: "/contract/reportForms/saleSituation",
            name: "SaleSituation",
            component: () =>
              import("../views/contract/reportForms/saleSituation/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "销售情况报表",
            },
          },
          {
            path: "/contract/reportForms/procureSituation",
            name: "ProcureSituation",
            component: () =>
              import(
                "../views/contract/reportForms/procureSituation/index.vue"
              ),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "采购情况报表",
            },
          },
          {
            path: "/contract/reportForms/executeSituation",
            name: "ExecuteSituation",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同执行情况",
            },
            children: [],
          },
          {
            path: "/contract/reportForms/special",
            name: "Special",
            component: () =>
              import("../views/contract/reportForms/special/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "工程合同专项",
            },
          },
          {
            path: "/contract/reportForms/analysis",
            name: "Analysis",
            component: () =>
              import("../views/contract/reportForms/analysis/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "业绩趋势分析",
            },
          },
        ],
      },
      {
        path: "/contract/permission",
        name: "ContractPermission",
        icon: "hetongquanxian",
        meta: {
          icon: "hetongquanxian",
          name: "合同权限",
        },
        children: [
          {
            path: "/contract/permission/approval",
            name: "ApprovalPermission",
            component: () =>
              import("../views/contract/permission/approval/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同审批权限",
            },
          },
          {
            path: "/contract/permission/matrix",
            name: "Matrix",
            component: () =>
              import("../views/contract/permission/matrix/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "多维权责矩阵",
            },
          },
          {
            path: "/contract/permission/group",
            name: "GroupPermission",
            component: () =>
              import("../views/contract/permission/group/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "集团分级分权",
            },
          },
        ],
      },
      {
        path: "/contract/seeting/",
        name: "ContractSeeting",
        icon: "jichushezhi",
        meta: {
          icon: "jichushezhi",
          name: "基础设置",
        },
        children: [
          {
            path: "/contract/seeting/supplier",
            name: "Supplier",
            component: () =>
              import("../views/contract/seeting/supplier/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "供应商管理",
            },
          },
          {
            path: "/contract/seeting/relativeList",
            name: "RelativeList",
            component: () =>
              import("../views/contract/seeting/relativeList/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "相对方列表",
            },
          },
          {
            path: "/contract/seeting/system",
            name: "System",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同制度库",
            },
            children: [],
          },
          {
            path: "/contract/seeting/type",
            name: "ContractType",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同类型管理",
            },
            children: [],
          },
          {
            path: "/contract/seeting/rule",
            name: "ContractCodeRule",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "编码规则设定",
            },
            children: [],
          },
          {
            path: "/contract/seeting/templateAdmin",
            name: "ContractTemplateAdmin",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同模板管理",
            },
            children: [],
          },
          {
            path: "/contract/seeting/modelAdmin",
            name: "ModelAdmin",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同范本管理",
            },
            children: [],
          },
          {
            path: "/contract/seeting/keyword",
            name: "ContractKeyword",
            component: () =>
              import("../views/contract/seeting/keyword/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "关键词设置",
            },
          },
          {
            path: "/contract/seeting/cooperateWith",
            name: "CooperateWith",
            component: () =>
              import("../views/contract/seeting/cooperateWith/index.vue"),
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合同协同信息",
            },
          },
          {
            path: "/contract/seeting/inspectAdmin",
            name: "InspectAdmin",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "合规检查管理",
            },
            children: [],
          },
          {
            path: "/contract/seeting/settlementRule",
            name: "SettlementRule",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "结算规则设定",
            },
            component: () =>
              import("../views/contract/seeting/settlementRule/index.vue"),
          },
        ],
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
        name: "ContractExecution",
        component: () => import("../views/contract/execution/index.vue"),
        icon: "hetongzhihang",
        meta: {
          icon: "hetongzhihang",
          name: "合同执行",
        },
      },
      {
        path: "/contract/plan",
        name: "contractPlan1",
        component: () => import("../views/contract/plan/index.vue"),
        icon: "hetongjihua",
        meta: {
          icon: "hetongjihua",
          name: "合同计划",
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
        name: "ContrActaudit",
        component: () => import("../views/contract/audit/index.vue"),
        icon: "hetongshenji",
        meta: {
          icon: "hetongshenji",
          name: "合同审计",
        },
      },
    ],
  },
  {
    path: "/reimburse",
    name: "Reimburse",
    component: Layout,
    redirect: "/reimburse/home",
    meta: {
      name: "费用控制"
    },
    children: [
      {
        path: "/reimburse/home",
        name: "ReimburseHome",
        component: () => import("../views/reimburse/home/index.vue"),
        icon: "feikongshouye",
        meta: {
          icon: "feikongshouye",
          name: "费控首页",
        },
      },
      {
        path: "/reimburse/invoice",
        name: "ReimburseInvoice",
        icon: "fapiaoguanli",
        meta: {
          icon: "fapiaoguanli",
          name: "发票管理",
        },
        children: [
          {
            path: "/reimburse/invoice/ledger",
            name: "InvoiceLedger",
            icon: "xinjian",
            component: () =>
              import("../views/reimburse/invoiceAdmin/ledger/index.vue"),
            meta: {
              icon: "xinjian",
              name: "发票台账",
            },
          },
          {
            path: "/reimburse/invoice/foundation",
            name: "InvoiceFoundation",
            icon: "xinjian",
            component: () =>
              import("../views/reimburse/invoiceAdmin/foundation/index.vue"),
            meta: {
              icon: "xinjian",
              name: "基础设置",
            },
          },
        ],
      },
      {
        path: "/reimburse/reimburse",
        name: "ReimburseReimburse",
        icon: "baoxiaoshenhe",
        meta: {
          icon: "baoxiaoshenhe",
          name: "报销审核",
        },
        children: [
          {
            path: "/reimburse/reimburse/inadvanceApply",
            name: "InadvanceApply",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "事前申请",
            },
            children: [
              {
                path: "/reimburse/reimburse/inadvanceApply/travel",
                name: "Travel",
                icon: "xinjian",
                component: () =>
                  import(
                    "../views/reimburse/reimburse/inadvanceApply/travel/index.vue"
                  ),
                meta: {
                  icon: "xinjian",
                  name: "差旅申请",
                },
              },
              {
                path: "/reimburse/reimburse/inadvanceApply/hospitality",
                name: "Hospitality",
                icon: "xinjian",
                component: () =>
                  import(
                    "../views/reimburse/reimburse/inadvanceApply/hospitality/index.vue"
                  ),
                meta: {
                  icon: "xinjian",
                  name: "业务招待申请管理",
                },
              },
              {
                path: "/reimburse/reimburse/inadvanceApply/borrowingAndRepayment",
                name: "BorrowingAndRepayment",
                icon: "xinjian",
                component: () =>
                  import(
                    "../views/reimburse/reimburse/inadvanceApply/borrowingAndRepayment/index.vue"
                  ),
                meta: {
                  icon: "xinjian",
                  name: "借还款中心",
                },
              },
            ],
          },
          {
            path: "/reimburse/reimburse/apply",
            name: "ReimburseApply",
            icon: "xinjian",
            component: () =>
              import(
                "../views/reimburse/reimburse/reimbursementApply/index.vue"
              ),
            meta: {
              icon: "xinjian",
              name: "报销申请",
            },
          },
        ],
      },
      {
        path: "/reimburse/finance",
        name: "ReimburseFinance",
        icon: "caiwuchuli",
        meta: {
          icon: "caiwuchuli",
          name: "财务处理",
        },
        children: [
          {
            path: "/reimburse/finance/financialReview",
            name: "FinancialReview",
            icon: "xinjian",
            component: () =>
              import("../views/reimburse/finance/financialReview/index.vue"),
            meta: {
              icon: "xinjian",
              name: "财务审核",
            },
          },
        ],
      },
      {
        path: "/reimburse/myReimburse",
        name: "MyReimburse",
        component: () => import("../views/reimburse/myReimburse/index.vue"),
        icon: "wodebaoxiao",
        meta: {
          icon: "wodebaoxiao",
          name: "我的报销",
        },
      },
      {
        path: "/reimburse/accounting",
        name: "Accounting",
        icon: "dianzihuiji",
        meta: {
          icon: "dianzihuiji",
          name: "电子会计档案",
        },
        children: [],
      },
      {
        path: "/reimburse/arap",
        name: "Arap",
        icon: "yingshouyingfu",
        meta: {
          icon: "yingshouyingfu",
          name: "应收应付",
        },
        children: [],
      },
      {
        path: "/reimburse/budgetSeeting",
        name: "BudgetSeeting",
        icon: "feiyongshezhi",
        meta: {
          icon: "feiyongshezhi",
          name: "预算设置",
        },
        children: [],
      },
      {
        path: "/reimburse/reportForms",
        name: "ReimburseReportForms",
        icon: "huiyibaobiao",
        meta: {
          icon: "huiyibaobiao",
          name: "报表分析",
        },
        children: [],
      },
    ],
  },
  {
    path: "/mobileDesign",
    name: "MobileDesign",
    component: () => import("../views/mobileDesign/index.vue"),
  }
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
  mode: "hash",
});

export default router;
