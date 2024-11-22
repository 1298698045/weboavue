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
    redirect: "/lightning/worflow/instance/list",
    meta: {
      name: "流程管理"
    },
    children: [
      // {
      //   path: "/flow/add",
      //   component: () => import("../views/flow/add/index.vue"),
      //   name: "AddFlow",
      //   icon: "xinjianshiwu",
      //   meta: {
      //     name: "新建事务",
      //     icon: "xinjianshiwu",
      //   },
      // },
      {
        path: "/workflow/o/instance/add",
        component: () => import("../views/flow/new/index.vue"),
        name: "WorkflowAdd",
        icon: "xinjianshiwu",
        meta: {
          name: "新建事务",
          icon: "xinjianshiwu",
        },
      },
      {
        path: "/lightning/o/workflow/doing",
        component: () => import("../views/flow/todoList/index.vue"),
        name: "WorkflowDoinglist",
        icon: "daibanshiwu",
        meta: {
          name: "待办事务",
          icon: "daibanshiwu",
        },
      },
      {
        path: "/lightning/o/workflow/done/list",
        component: () => import("../views/flow/completed/index.vue"),
        name: "WorkflowDonelist",
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
        path: "/lightning/workflow/mine",
        component: () => import("../views/flow/myStart/index.vue"),
        name: "WorkflowMine",
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
        path: "/lightning/o/Workflow/Definition/home",
        component: () => import("../views/flow/seeting/index.vue"),
        name: "wfdefinition",
        icon: "liuchengshezhi",
        meta: {
          name: "流程设置",
          icon: "liuchengshezhi",
        },
      },
      {
        path: "/lightning/worflow/instance/list",
        component: () => import("../views/flow/workAdmin/index.vue"),
        name: "WFInstance",
        icon: "shiwuguanli",
        meta: {
          name: "事务管理",
          icon: "shiwuguanli",
        },
      },
      {
        path: "/lightning/o/Workflow/UserSignature/home",
        component: () => import("../views/flow/signatureAdmin/index.vue"),
        name: "SignatureAdmin",
        icon: "qianmingguanli",
        meta: {
          name: "签名管理",
          icon: "qianmingguanli",
        },
      },
      // {
      //   path: "/lightning/o/Workflow/CommentLib/home",
      //   component: () => import("../views/flow/CommentLib/index.vue"),
      //   name: "CommentLib",
      //   icon: "qianmingguanli",
      //   meta: {
      //     name: "审批意见",
      //     icon: "qianmingguanli",
      //   },
      // },
      {
        path: "/process/instance/form/search",
        component: () => import("../views/flow/formSearch/index.vue"),
        name: "WFFormSearch",
        icon: "biaodanchaxun",
        meta: {
          name: "表单查询",
          icon: "biaodanchaxun",
        },
      },
      {
        path: "/flow/formSearch/list",
        component: () => import("../views/flow/formSearch/list.vue"),
        // meta: {
        //   name: "表单详情查询",
        //   icon: "caogaoxiang",
        // },
        meta: {
          icon:""
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
    path: "/flow/seeting/detail",
    component: () => import("@/views/flow/seeting/detail/index.vue"),
    name: "FlowSeetingDetail",
  },
  {
    path: "/workplan",
    name: "Workplan",
    component: Layout,
    redirect: "/lightning/o/Event/home",
    meta: {
      name: "日程管理"
    },
    children: [
      {
        path: "/lightning/o/Event/home",
        component: () => import("../views/scheduleAdmin/calendar/index.vue"),
        name: "eventhome",
        icon: "rili",
        meta: {
          name: "日历",
          icon: "rili",
        },
      },
      {
        path: "/calendar/people/ListView",
        component: () => import("../views/scheduleAdmin/schedule/index.vue"),
        name: "WorkPlanPeopleListView",
        icon: "richengyilanbiao",
        meta: {
          name: "日程一览表",
          icon: "richengyilanbiao",
        },
      },
      {
        path: "/lightning/o/Event/leader",
        component: () => import("../views/scheduleAdmin/leader/index.vue"),
        name: "LeaderCalendar",
        icon: "lingdaoricheng",
        meta: {
          name: "领导日程",
          icon: "lingdaoricheng",
        },
      },
      {
        path: "/lightning/o/calendar/search",
        component: () => import("../views/scheduleAdmin/search/index.vue"),
        name: "CalendarSearch",
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
    path: "/addresslist",
    name: "Addresslist",
    component: Layout,
    redirect: "/lightning/Addresslist/Org/home",
    meta: {
      name: "通讯录"
    },
    children: [
      {
        path: "/lightning/Addresslist/Org/home",
        component: () => import("../views/oa/addressBook/index.vue"),
        name: "AddressBook1",
        icon: "tongxunlu1",
        meta: {
          name: "单位通讯录",
          icon: "tongxunlu1",
        },
      },
      {
        path: "/lightning/Addresslist/BusinessUnit/home",
        component: () => import("../views/oa/deptAddressBook/index.vue"),
        name: "deptAddressBook",
        icon: "huiyishishiyongqingkuang",
        meta: {
          name: "部门通讯录",
          icon: "huiyishishiyongqingkuang",
        },
      },
      {
        path: "/lightning/Addresslist/Contact/home",
        component: () => import("../views/oa/myAddressBook/index.vue"),
        name: "myAddressBook",
        icon: "huiyicanhuiren",
        meta: {
          name: "个人通讯录",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/CollaborationGroup/list",
        component: () => import("../views/oa/group/index.vue"),
        name: "CollaborationGroup",
        icon: "xiaozu",
        meta: {
          name: "小组",
          icon: "xiaozu",
        },
      },
      // {
      //   path: "/listView",
      //   name: "ListView",
      //   component: () => import("../views/listView/index.vue"),
      //   icon: "listView",
      //   meta: {
      //     name: "通用列表",
      //     icon: "xiaozu",
      //   },
      // },
      
    ]
  },
  {
    path: "/listView",
    name: "ListView1",
    component: Layout,
    meta: {
      name: "通用列表",
    },
    children: [
      {
        path: "/lightning/o/:sObjectName",
        name: "ListView",
        component: () => import("../views/listView/index.vue"),
        meta: {
          name: "通用列表1",
          icon: "xiaozu",
        },
      },
    ]
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
        path: "/lightning/o/ContentDocument/home",
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
        component: () => import("../views/information/list/Content.vue"),
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
    path: "/lightning/r/group/view",
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
    path: "/lightning/o/Meeting/signin/screen",
    name: "SigninScreen",
    component: () => import("../views/meeting/dynamicSign/index.vue"),
    meta: {
      name: "签到屏"
    },
  },
  {
    path: "/lightning/o/Meeting/signoff/screen",
    name: "SignoffScreen",
    component: () => import("../views/meeting/dynamicSign/index.vue"),
    meta: {
      name: "签退屏"
    },
  },
  {
    path: "/lightning/o/printMeetingPeoplelst",
    name: "PrintMeetingPeoplelst",
    component: () => import("../views/meeting/printMeetingPeoplelst/index.vue"),
  },
  {
    path: "/lightning/o/printMeetingBasic",
    name: "PrintMeetingBasic",
    component: () => import("../views/meeting/printMeetingBasic/index.vue"),
  },
  {
    path: "/Search",
    name: "Search",
    component: Layout,
    redirect: "/Search/SearchResult",
    meta: {
      name: "全局搜索"
    },
    children: [
      {
        path: "/Search/SearchResult",
        name: "SearchResult",
        component: () => import("../views/searchResult/index.vue"),
        icon: "search",
        meta: {
          name: "搜索结果",
          icon: "search",
        },
      },
    ]
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
        path: "/lightning/o/Meeting/home",
        name: "Meeting",
        component: () => import("../views/meeting/calendar/index.vue"),
        icon: "rili",
        meta: {
          name: "会议日历",
          icon: "rili",
        },
      },
      {
        path: "/lightning/o/MyMeeting/list",
        name: "MeetingList",
        component: () => import("../views/meeting/list/index.vue"),
        icon: "rili",
        meta: {
          name: "我的会议",
          icon: "rili",
        },
      },
      {
        path: "/lightning/o/Meeting/Approve",
        name: "MeetingApprove",
        component: () => import("../views/meeting/approve/index.vue"),
        icon: "rili",
        meta: {
          name: "会议审批",
          icon: "rili",
        },
      },
      {
        path: "/025/c",
        name: "ResApply",
        component: () =>
          import("../views/meeting/meetingRoom/MeetingRoomUse.vue"),
        icon: "huiyishishiyongqingkuang",
        meta: {
          name: "会议室使用状况",
          icon: "huiyishishiyongqingkuang",
        },
      },
      {
        path: "/00W/o",
        name: "MeetingItem",
        component: () => import("../views/meeting/topics/index.vue"),
        icon: "yitiguanli",
        meta: {
          name: "议题管理",
          icon: "yitiguanli",
        },
      },
      {
        path: "/lightning/o/Meeting/search",
        name: "SearchMeeting",
        component: () => import("../views/meeting/search/index.vue"),
        icon: "MeetingSearch",
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
        path: "/023/o",
        name: "ResourceOrg",
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
        path: "/lightning/o/Meeting/report",
        name: "MeetingReport",
        component: () => import("../views/meeting/reportForms/index.vue"),
        icon: "huiyibaobiao",
        meta: {
          name: "会议报表",
          icon: "huiyibaobiao",
        },
      },
      {
        path: "/701/o",
        name: "Campaign",
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
    path: "/lightning/o/Meeting/view",
    name: "MeetingDetailView",
    component: () => import("../views/meeting/detail/MeetingDetailView.vue"),
    meta: {
      name: "会议详情页",
      icon: "huiyihuodong",
    },
  },
  {
    path: "/fileDetail",
    name: "FileDetail",
    component: () => import("../views/fileAdmin/fileDetail.vue"),
  },
  {
    path: "/content/visualEditor",
    name: "visualEditor",
    component: () => import("../views/information/editor/index2.vue"),
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
    path: "/lightning/r/Content/view",
    name: "ContentView",
    component: () => import("../views/information/preview/index2.vue"),
  },
  {
    path: "/ContentViewTemplate/visualEditor",
    name: "ContentViewTemplateEditor",
    component: () => import("../views/ContentViewTemplate/editor.vue"),
  },
  {
    path: "/KnowledgeMapDetailEditor",
    name: "KnowledgeMapDetailEditor",
    component: () => import("../views/knowledge/KnowledgeMap/KnowledgeMapDetailEditor.vue"),
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
  //   path: "/attd",
  //   name: "Attd"
  // },
  {
    path: "/attd/report",
    name: "AttdReport",
    component: () => import("../views/attendance/reportingAttd/index.vue")
  },
  {
    path: "/scheduling/dept",
    name: "DeptScheduling",
    component: () => import("../views/scheduling/deptScheduling/index.vue")
  },
  {
    path: "/scheduling/deptGroup",
    name: "DeptGroupScheduling",
    component: () => import("../views/scheduling/deptGroupScheduling/index.vue")
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
    path: "/lightning/OfficialDocument/dashboard",
    name: "OfficialDocument",
    component: Layout,
    redirect: "/OfficeDocument/in/monitor",
    meta: {
      name: "公文管理"
    },
    children: [
      {
        path: "/OfficialDocument/home",
        name: "officialdocumenthome",
        component: () => import("../views/documentAdmin/home/index.vue"),
        icon: "wodeshouwen",
        meta: {
          name: "公文中心",
          icon: "wodeshouwen",
        },
      },
      {
        path: "/OfficeDocument/in/monitor",
        name: "DocInMonitor",
        component: () => import("../views/documentAdmin/myReceiving/index.vue"),
        icon: "wodeshouwen",
        meta: {
          name: "我的收文",
          icon: "wodeshouwen",
        },
      },
      {
        path: "/OfficeDocument/out/monitor",
        name: "DocOutMonitor",
        component: () => import("../views/documentAdmin/myDispatch/index.vue"),
        icon: "wodefawen",
        meta: {
          name: "我的发文",
          icon: "wodefawen",
        },
      },
      {
        path: "/lightning/o/OfficeDocumentIn/home",
        name: "DocInSearch",
        component: () =>
          import("../views/documentAdmin/receivingAdmin/index.vue"),
        icon: "shouwenguanli",
        meta: {
          name: "收文管理",
          icon: "shouwenguanli",
        },
      },
      {
        path: "/lightning/o/OfficeDocumentOut/home",
        name: "DocOutSearch",
        component: () =>
          import("../views/documentAdmin/outgoingAdmin/index.vue"),
        icon: "fawenguanli",
        meta: {
          name: "发文管理",
          icon: "fawenguanli",
        },
      },
      {
        path: "/lightning/o/RequestReport",
        name: "OfficialRequestReport",
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
        name: "TemplateFile",
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
        name: "OfficialDocumentInReadlog",
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
      {
        path: "/workspace/ChangePassWord",
        name: "ChangePassWord",
        component: () => import("../views/workspace/ChangePassWord.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "修改密码",
        },
      },
      {
        path: "/workspace/PersonalInfo",
        name: "PersonalInfo",
        component: () => import("../views/workspace/PersonalInfoHome.vue"),
        icon: "xinjian",
        meta: {
          icon: "xinjian",
          name: "个人信息",
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
  },
  {
    path: "/knowledge",
    name: "knowledge",
    component: Layout,
    redirect: "/lightning/o/Content/home",
    meta: {
      name: "知识管理"
    },
    children: [
      {
        path: "/lightning/o/Content/home",
        component: () => import("../views/information/list/Content.vue"),
        name: "info",
        icon: "xinxiguanli1",
        meta: {
          name: "文档中心",
          icon: "xinxiguanli1",
        },
      },
      {
        path: "/lightning/page/dashboard",
        component: () => import("../views/knowledge/Home/index.vue"),
        name: "KnowledgeHome",
        icon: "huiyicanhuiren",
        meta: {
          name: "知识门户",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/ContentNotice/home",
        component: () => import("../views/information/list/Notice.vue"),
        name: "Notification",
        icon: "xinxiguanli1",
        meta: {
          name: "通知管理",
          icon: "xinxiguanli1",
        },
      },
      {
        path: "/oa2/o",
        component: () => import("../views/listView/index2.vue"),
        name: "OASuggestion",
        icon: "huiyicanhuiren",
        meta: {
          name: "领导信箱管理",
          icon: "huiyicanhuiren",
          entityType:'oA2',
          objectTypeCode:'20520',
          entityName:'OASuggestion',
        },
      },
      {
        path: "/705/o",
        component: () => import("../views/listView/index2.vue"),
        name: "CampaignSms",
        icon: "huiyicanhuiren",
        meta: {
          name: "短信管理",
          icon: "huiyicanhuiren",
          entityType:'705',
          objectTypeCode:'20026',
          entityName:'CampaignSms',
        },
      },
      {
        path: "/lightning/o/Contentfolder/permission",
        component: () => import("../views/knowledge/Contentfolder/permission.vue"),
        name: "ContentFolderPermission",
        icon: "xinxiguanli1",
        meta: {
          name: "权限管控",
          icon: "xinxiguanli1",
        },
      },
      {
        path: "/lightning/o/Document/readlog/home",
        component: () => import("../views/listView/index2.vue"),
        name: "RecentlyReadLog",
        icon: "huiyicanhuiren",
        meta: {
          name: "最近浏览",
          icon: "huiyicanhuiren",
          entityType:'r1G',
          objectTypeCode:'2021',
          entityName:'RecordReadLog',
        },
      },
      {
        path: "/lightning/o/ContentViewTemplate",
        component: () => import("../views/listView/index2.vue"),
        name: "ContentViewTemplate",
        icon: "huiyicanhuiren",
        meta: {
          name: "文档模板",
          icon: "huiyicanhuiren",
          entityType:'5081',
          objectTypeCode:'5081',
          entityName:'ContentViewTemplate',
        },
      },
      {
        path: "/lightning/o/KbSubject",
        component: () => import("../views/listView/index2.vue"),
        name: "KbSubject",
        icon: "huiyicanhuiren",
        meta: {
          name: "地图维护",
          icon: "huiyicanhuiren",
          entityType:'100310',
          objectTypeCode:'100310',
          entityName:'KbSubject',
        },
      },
      {
        path: "/129/o",
        component: () => import("../views/knowledge/Specialist/index.vue"),
        name: "Specialist",
        icon: "huiyicanhuiren",
        meta: {
          name: "专家地图",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/knowledge/search",
        component: () => import("../views/listView/index2.vue"),
        name: "KbArticle",
        icon: "huiyicanhuiren",
        meta: {
          name: "知识管理",
          icon: "huiyicanhuiren",
          entityType:'1027',
          objectTypeCode:'1027',
          entityName:'KbArticle',
        },
      },
      {
        path: "/00l/o",
        component: () => import("../views/listView/index2.vue"),
        name: "temTree",
        icon: "huiyicanhuiren",
        meta: {
          name: "栏目频道",
          icon: "huiyicanhuiren",
          entityType:'00l',
          objectTypeCode:'100200',
          entityName:'temTree',
        },
      },
      {
        path: "/lightning/page/QuestionAnswer",
        component: () => import("../views/knowledge/QuestionAnswer/index.vue"),
        name: "QuestionAnswer",
        icon: "huiyicanhuiren",
        meta: {
          name: "知识问答",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/KbMap/home",
        component: () => import("../views/knowledge/KnowledgeMap/index.vue"),
        name: "KnowledgeMap",
        icon: "huiyicanhuiren",
        meta: {
          name: "知识目录一级",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/page/article/new",
        component: () => import("../views/knowledge/KnowledgeMap/NewKbArticle.vue"),
        name: "NewKbArticle",
        icon: "huiyicanhuiren",
        meta: {
          name: "新建知识文章",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/page/album",
        component: () => import("../views/knowledge/Album/index.vue"),
        name: "Album",
        icon: "huiyicanhuiren",
        meta: {
          name: "相册文件",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/_ui/file/video/ListPage",
        component: () => import("../views/knowledge/Video/List.vue"),
        name: "VideoList",
        icon: "huiyicanhuiren",
        meta: {
          name: "视频广场",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/page/video/home",
        component: () => import("../views/knowledge/Video/Home.vue"),
        name: "VideoHome",
        icon: "huiyicanhuiren",
        meta: {
          name: "视频管理",
          icon: "huiyicanhuiren",
        },
      },
    ],
  },
  {
    path: "/lightning/page/KnowledgeMap",
    component: () => import("../views/knowledge/KnowledgeMap/index2.vue"),
    name: "KnowledgeMap2",
    icon: "huiyicanhuiren",
    meta: {
      name: "知识目录二级",
      icon: "huiyicanhuiren",
    },
  },
  {
    path: "/lightning/page/KnowledgeMapDetail",
    component: () => import("../views/knowledge/KnowledgeMap/detail.vue"),
    name: "KnowledgeMapDetail",
    icon: "huiyicanhuiren",
    meta: {
      name: "知识目录详情",
      icon: "huiyicanhuiren",
    },
  },
  {
    path: "/portal",
    name: "portal",
    component: Layout,
    redirect: "/lightning/o/workspace/home",
    meta: {
      name: "门户"
    },
    children: [
      {
        path: "/lightning/o/workspace/home",
        component: () => import("../views/home/home.vue"),
        //component: () => import("../views/sys/home/index.vue"),
        name: "home",
        icon: "xinxiguanli1",
        meta: {
          name: "工作台",
          icon: "xinxiguanli1",
        },
      },
    ],
  },
  {
    path: "/detailCommon",
    name: "DetailCommon",
    component: () => import("../views/detail/detailCommon.vue"),
  },
  {
    path: "/knowledge/RuleArticle/mine/home'",
    name: "RuleArticle",
    component: Layout,
    redirect: "/knowledge/RuleArticle/home",
    meta: {
      name: "制度文件"
    },
    children: [
      {
        path: "/knowledge/RuleArticle/home",
        component: () => import("../views/knowledge/RuleArticle/home/index.vue"),
        name: "RuleArticleHome",
        icon: "huiyicanhuiren",
        meta: {
          name: "制度台账",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/knowledge/RuleArticle/myhome",
        component: () => import("../views/knowledge/RuleArticle/myhome/index.vue"),
        name: "RuleArticleMyHome",
        icon: "huiyicanhuiren",
        meta: {
          name: "我的制度台账",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/knowledge/RuleArticle/history/home",
        component: () => import("../views/listView/index2.vue"),
        name: "RuleArticleHistory",
        icon: "huiyicanhuiren",
        meta: {
          name: "变更记录",
          icon: "huiyicanhuiren",
          entityType:'093',
          objectTypeCode:'100207',
          entityName:'InstitutionHistory',
        },
      },
      {
        path: "/knowledge/RuleArticle/version/home",
        component: () => import("../views/listView/index2.vue"),
        name: "RuleArticleVersion",
        icon: "huiyicanhuiren",
        meta: {
          name: "修订记录",
          icon: "huiyicanhuiren",
          entityType:'K30',
          objectTypeCode:'3030',
          entityName:'KbArticleVersion',
        },
      },
      {
        path: "/knowledge/RuleArticle/abolish/home",
        name: "RuleArticleAbolish",
        component: () => import("../views/listView/index2.vue"),
        icon: "huiyicanhuiren",
        meta: {
          name: "废止记录",
          icon: "huiyicanhuiren",
          entityType:'K31',
          objectTypeCode:'3031',
          entityName:'KbArticleAbolish',
        },
      }
    ]
  },
  {
    path: "/lightning/workflow/WFFormPrint",
    name: "WFFormPrint",
    component: () => import("../views/flow/WFFormPrint/index.vue"),
  },
  {
    path: "/jgfiles/samples/OpenAndSave",
    name: "OpenAndSave",
    component: () => import("../jgfiles/samples/index.vue"),
  },
  {
    path: "/knowledge/RuleArticle/detail",
    name: "RuleArticleDetail",
    component: () => import("../views/knowledge/RuleArticle/detail/index.vue"),
    icon: "huiyicanhuiren",
    meta: {
      name: "制度文件详情",
      icon: "huiyicanhuiren",
    },
  },
  {
    path: "/oa0/o",
    name: "Office",
    component: Layout,
    redirect: "/oa0/o",
    meta: {
      name: "行政管理"
    },
    children: [
      {
        path: "/oa0/o",
        component: () => import("../views/listView/index2.vue"),
        name: "ReceptionMeal",
        icon: "huiyicanhuiren",
        meta: {
          name: "用餐记录",
          icon: "huiyicanhuiren",
          entityType:'oa0',
          objectTypeCode:'20143',
          entityName:'OA_ReceptionMeal',
        },
      },
      {
        path: "/Vehicle/calendar",
        name: "VehicleApply",
        component: () =>
          import("../views/Vehicle/VehicleApply.vue"),
        icon: "huiyishishiyongqingkuang",
        meta: {
          name: "车辆使用情况",
          icon: "huiyishishiyongqingkuang",
        },
      },
      {
        path: "/03l/o",
        component: () => import("../views/listView/index2.vue"),
        name: "VehicleUse",
        icon: "huiyicanhuiren",
        meta: {
          name: "用车记录",
          icon: "huiyicanhuiren",
          entityType:'03l',
          objectTypeCode:'20503',
          entityName:'VehicleUse',
        },
      },
      {
        path: "/_ui/office/seal/home",
        component: () => import("../views/listView/index2.vue"),
        name: "Com_SealUse",
        icon: "huiyicanhuiren",
        meta: {
          name: "用章记录",
          icon: "huiyicanhuiren",
          entityType:'A07',
          objectTypeCode:'20054',
          entityName:'Com_SealUse',
        },
      },
      {
        path: "/_ui/hr/goabroad/home",
        component: () => import("../views/listView/index2.vue"),
        name: "HREmpGoAbroad",
        icon: "huiyicanhuiren",
        meta: {
          name: "出国管理",
          icon: "huiyicanhuiren",
          entityType:'A06',
          objectTypeCode:'20191',
          entityName:'HREmpGoAbroad',
        },
      },
      {
        path: "/XINFANGDENGJIDAN/o",
        component: () => import("../views/listView/index2.vue"),
        name: "XINFANGDENGJIDAN",
        icon: "huiyicanhuiren",
        meta: {
          name: "访客管理",
          icon: "huiyicanhuiren",
          entityType:'20229',
          objectTypeCode:'20229',
          entityName:'XINFANGDENGJIDAN',
        },
      },
      {
        path: "/03m/o",
        component: () => import("../views/listView/index2.vue"),
        name: "VehicleMaintain",
        icon: "huiyicanhuiren",
        meta: {
          name: "车辆维修",
          icon: "huiyicanhuiren",
          entityType:'03m',
          objectTypeCode:'20502',
          entityName:'VehicleMaintain',
        },
      },
      {
        path: "/03k/o",
        component: () => import("../views/listView/index2.vue"),
        name: "Vehicle",
        icon: "huiyicanhuiren",
        meta: {
          name: "车辆管理",
          icon: "huiyicanhuiren",
          entityType:'03k',
          objectTypeCode:'20501',
          entityName:'Vehicle',
        },
      },
    ]
  },
  {
    path: "/lightning/page/chatter",
    name: "Chatter",
    component: Layout,
    redirect: "/lightning/page/chatter",
    meta: {
      name: "社区交流"
    },
    children: [
      {
        path: "/lightning/page/chatter",
        component: () => import("../views/knowledge/QuestionAnswer/index2.vue"),
        name: "ChatterHome",
        icon: "huiyicanhuiren",
        meta: {
          name: "社区",
          icon: "huiyicanhuiren",
          entityType:'0D5',
          objectTypeCode:'6000',
          entityName:'Chatter',
        },
      },
      {
        path: "/0D5/o",
        component: () => import("../views/listView/index2.vue"),
        name: "ChatterStatusManager",
        icon: "huiyicanhuiren",
        meta: {
          name: "帖子管理",
          icon: "huiyicanhuiren",
          entityType:'0D5',
          objectTypeCode:'6000',
          entityName:'Chatter',
        },
      },
      
    ]
  },
  {
    path: "/lightning/o/Rsearchproject/workspace",
    name: "Project",
    component: Layout,
    redirect: "/lightning/o/Rsearchproject/workspace",
    meta: {
      name: "科研系统"
    },
    children: [
      {
        path: "/lightning/o/Rsearchproject/workspace",
        component: () => import("../views/Project/Home.vue"),
        name: "ProjectHome",
        icon: "huiyicanhuiren",
        meta: {
          name: "项目主页",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/ResearchProject/home",
        component: () => import("../views/Project/ProjectManager.vue"),
        name: "ProjectManager",
        icon: "huiyicanhuiren",
        meta: {
          name: "科研项目",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/ResearchProject/mine",
        component: () => import("../views/Project/MyProject.vue"),
        name: "MyProject",
        icon: "huiyicanhuiren",
        meta: {
          name: "我的项目",
          icon: "huiyicanhuiren",
        },
      },
    ]
  },
  {
    path: "/lightning/r/Project/detail",
    name: "ProjectDetail",
    component: () => import("../views/Project/ProjectDetail.vue"),
    meta: {
      name: "项目详情页",
      icon: "huiyihuodong",
    },
  },
  {
    path: "/lightning/o/Dutyshift/admin",
    name: "Dutyshift",
    component: Layout,
    redirect: "/lightning/o/Dutyshift/admin",
    meta: {
      name: "值班管理"
    },
    children: [
      {
        path: "/lightning/o/Dutyshift/admin",
        component: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        name: "DutyshiftAdmin",
        icon: "huiyicanhuiren",
        meta: {
          name: "行政总值班",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/Dutyshift/medical",
        component: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        name: "DutyshiftMedical",
        icon: "huiyicanhuiren",
        meta: {
          name: "医疗值班",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/Dutyshift/nurse",
        component: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        name: "DutyshiftNurse",
        icon: "huiyicanhuiren",
        meta: {
          name: "护理值班",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/Dutyshift",
        component: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        name: "DutyshiftYZDB",
        icon: "huiyicanhuiren",
        meta: {
          name: "院长代表值班",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/Dutyshift/Dept/home",
        component: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        name: "DutyshiftDept",
        icon: "huiyicanhuiren",
        meta: {
          name: "部门值班",
          icon: "huiyicanhuiren",
        },
      },
      {
        path: "/lightning/o/Dutyshift/search/home",
        component: () => import("../views/listView/index2.vue"),
        name: "HRAttendDutyShiftSearch",
        icon: "huiyicanhuiren",
        meta: {
          name: "总值班查询",
          icon: "huiyicanhuiren",
          entityType:'06K',
          objectTypeCode:'20284',
          entityName:'HRAttendEmpDutyShift',
        },
      },
      {
        path: "/Workshift/Dept/Dutyshift/query",
        component: () => import("../views/listView/index2.vue"),
        name: "HRAttendDutyShiftSearch1",
        icon: "huiyicanhuiren",
        meta: {
          name: "一线值班查询",
          icon: "huiyicanhuiren",
          entityType:'06K',
          objectTypeCode:'20284',
          entityName:'HRAttendEmpDutyShift',
        },
      },
      {
        path: "/ui/hr/attend/duthshiftLogListPage",
        component: () => import("../views/listView/index2.vue"),
        name: "HRAttendDutyShiftLog",
        icon: "huiyicanhuiren",
        meta: {
          name: "交班记录",
          icon: "huiyicanhuiren",
          entityType:'06K',
          objectTypeCode:'20284',
          entityName:'HRAttendEmpDutyShift',
        },
      },
      {
        path: "/lightning/o/Dutshift/report",
        component: () => import("../views/listView/index2.vue"),
        name: "HRAttendEmpDutyShift",
        icon: "huiyicanhuiren",
        meta: {
          name: "值班统计表",
          icon: "huiyicanhuiren",
          entityType:'06K',
          objectTypeCode:'20451',
          entityName:'HRAttendEmpDutyShift',
        },
      },
    ]
  },
  {
    path: "/lightning/o/printDutyShift",
    name: "PrintDutyShift",
    component: () => import("../views/Dutyshift/PrintDutyShift.vue"),
  },
  {
    path: "/MyResume",
    name: "MyResume",
    component: () => import("../views/workspace/MyResume.vue"),
    meta: {
      name: "我的简历",
      icon: "huiyihuodong",
    },
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
  mode: "hash",
});

export default router;
