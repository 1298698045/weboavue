import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
// import Home from "../views/Home.vue";
const Layout = () => import("@/layout/index.vue");
import store from "@/store/index.js";
import e from "cors";
const staticRoutes = [
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
    path: "/flow/seeting/detail",
    component: () => import("@/views/flow/seeting/detail/index.vue"),
    name: "FlowSeetingDetail",
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
      {
        path: "/lightning/page/dashboard/:sObjectName",
        name: "DashboardHome",
        meta: {
          name: "DashboardHome"
        },
        component: () => import("../views/home/commonHome.vue"),
      },
      {
        path: "/lightning/home/:sObjectName",
        name: "LightningHome",
        meta: {
          name: "LightningHome"
        },
        component: () => import("../views/home/commonHome.vue"),
      },
      {
        path: "/lightning/page/kb/dashboard",
        name: "DashboardHome2",
        meta: {
          name: "DashboardHome2"
        },
        component: () => import("../views/home/commonHome.vue"),
      }
    ]
  },

  {
    path: "/lightning/r/group/view",
    name: "GroupDetail",
    component: () => import("../views/oa/groupDetail/index.vue"),
  },
  {
    path: "/lightning/r/Record/view",
    name: "Detail",
    component: () => import("../views/detail/detail.vue"),
  },
  {
    path: "/email/0",
    name: "Email",
    component: () => import("../views/email/home/index.vue"),
  },
  {
    path: "/email/0/write",
    name: "WriteEmail",
    component: () => import("../views/email/writeEmail/index.vue"),
  },
  {
    path: "/Meeting/checkin/screen",
    name: "CheckinScreen",
    component: () => import("../views/meeting/dynamicSign/index2.vue"),
    meta: {
      name: "签到屏"
    },
  },
  {
    path: "/Meeting/checkout/screen",
    name: "CheckoutScreen",
    component: () => import("../views/meeting/dynamicSign/index2.vue"),
    meta: {
      name: "签退屏"
    },
  },
  {
    path: "/printMeetingPeoplelst",
    name: "PrintMeetingPeoplelst",
    component: () => import("../views/meeting/printMeetingPeoplelst/index.vue"),
  },
  {
    path: "/printMeetingBasic",
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
    path: "/lightning/r/meeting/view",
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
    path: "/lightning/r/KbSubject/view",
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
    path: "/workspace1",
    name: "workspace1",
    component: Layout,
    redirect: "/workspace/ChangePassWord",
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
    path: "/mobileDesign",
    name: "MobileDesign",
    component: () => import("../views/mobileDesign/index.vue"),
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
    path: "/detailCommon",
    name: "DetailCommon",
    component: () => import("../views/detail/detailCommon.vue"),
  },
  {
    path: "/lightning/workflow/WFFormPrint",
    name: "WFFormPrint",
    component: () => import("../views/flow/WFFormPrint/index.vue"),
  },
  {
    path: "/lightning/workflow/WFFormBatchPrint",
    name: "WFFormBatchPrint",
    component: () => import("../views/flow/WFFormPrint/batchPrint.vue"),
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
    path: "/lightning/r/Project/detail",
    name: "ProjectDetail",
    component: () => import("../views/Project/ProjectDetail.vue"),
    meta: {
      name: "项目详情页",
      icon: "huiyihuodong",
    },
  },
  {
    path: "/printDutyShift",
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
  {
    path: "/MessageHome",
    name: "MessageHome",
    component: () => import("../views/MessageHome/index.vue"),
    meta: {
      name: "消息",
      icon: "huiyihuodong",
    },
  },
  {
    path: "/lightning/r/Workflow/instance/detail",
    name: "FlowDetail",
    component: () => import("../views/flow/detail/index.vue")
  },
  {
    path: "/lightning/r/Workflow/instance/view",
    name: "ProcessInstanceDetail",
    component: () => import("../views/flow/processInstanceDetail/index.vue")
  },
  // {
  //   path: "/lightning/r/Workflow/instance/view",
  //   name: "FlowDetailView",
  //   component: () => import("../views/flow/detail/view.vue")
  // },
  {
    path: "/o/Report/common/home",
    name: "report",
    component: Layout,
    meta: {
      name: "Report",
      icon: "huiyihuodong",
    },
    children: [
      {
        path: "/o/Report/common/home",
        name: "CommonReportHome",
        component: () => import("../views/report/home/index.vue"),
      },
      {
        path: "/lightning/o/Report/home",
        name: "report",
        component: () => import("../views/report/home/index.vue")
      }
    ]
  },
  {
    path: "/lightning/o/Report/preview",
    name: "ReportPreview",
    component: () => import("../views/report/preview/index.vue"),
  },
  {
    path: "/More",
    name: "More",
    component: Layout,
    redirect: "/lightning/page/Kb/readlog/home",
    meta: {
      name: "更多列表"
    },
    children: [
      {
        path: "/lightning/page/Kb/readlog/home",
        name: "MoreContent",
        component: () => import("../views/More/MoreContent/index.vue"),
        icon: "search",
        meta: {
          name: "更多信息",
          icon: "search"
        }
      }
    ]
  },
  {
    path: "/lightning/r/CampaignSms/new",
    name: "CampaignSmsEditor",
    component: () => import("../views/CampaignSms/editor.vue"),
  },
  {
    path: "/lightning/r/CampaignSms/upload",
    name: "CampaignSmsUpload",
    component: () => import("../views/CampaignSms/upload.vue"),
  },
  {
    path: "/RuleArticle1",
    name: "RuleArticle1",
    component: Layout,
    redirect: "/lightning/page/knowledge/RuleArticleMine/home",
    meta: {
      name: "制度文件"
    },
    children: [
      {
        path: "/knowledge/RuleArticle/history/home",
        component: () => import("../views/listView/index2.vue"),
        name: "KbArticleHistory1",
        icon: "huiyicanhuiren",
        meta: {
          name: "变更记录",
          icon: "huiyicanhuiren",
          entityType: '093',
          objectTypeCode: '100207',
          entityName: 'InstitutionHistory',
        },
      },
      {
        path: "/knowledge/RuleArticle/version/home",
        component: () => import("../views/listView/index2.vue"),
        name: "KbArticleVersion1",
        icon: "huiyicanhuiren",
        meta: {
          name: "修订记录",
          icon: "huiyicanhuiren",
          entityType: 'K30',
          objectTypeCode: '3030',
          entityName: 'KbArticleVersion',
        },
      },
      {
        path: "/knowledge/RuleArticle/abolish/home",
        name: "KbArticleAbolish1",
        component: () => import("../views/listView/index2.vue"),
        icon: "huiyicanhuiren",
        meta: {
          name: "废止记录",
          icon: "huiyicanhuiren",
          entityType: 'K31',
          objectTypeCode: '3031',
          entityName: 'KbArticleAbolish',
        },
      }
    ]
  },
  {
    path: "/OfficialDocument1",
    name: "OfficialDocument1",
    component: Layout,
    redirect: "/lightning/page/OfficialDocument/dashboard",
    meta: {
      name: "公文管理"
    },
    children: [
      {
        path: "/lightning/o/official/doc/Oversee",
        component: () => import("../views/listView/index2.vue"),
        name: "docOversee1",
        icon: "huiyicanhuiren",
        meta: {
          name: "公文督办",
          icon: "huiyicanhuiren",
          entityType: 'A10',
          objectTypeCode: '100110',
          entityName: 'OfficialNoticeIn',
        },
      },
      {
        path: "/o/ContentDocument/template/home",
        name: "TemplateFile1",
        component: () => import("../views/listView/index2.vue"),
        icon: "huiyicanhuiren",
        meta: {
          name: "正文模板",
          icon: "huiyicanhuiren",
          entityType: '063',
          objectTypeCode: '100105',
          entityName: 'TemplateFile',
        },
      }
    ]
  },
  {
    path: "/lightning/page/KbMap/home",
    name: "KbMapHomePage",
    component: () => import("../views/knowledge/KnowledgeMap/page.vue"),
    meta: {
      name: "地图主页全屏"
    }
  },
  {
    path: "/lightning/r/contract/view",
    name: "ContractDeatil",
    component: () => import("../views/contract/view/index.vue"),
    meta: {
      name: "合同详情页"
    },
  },
  {
    path: "/lightning/r/office/view2",
    name: "iWebOffice2015_v3",
    component: () => import("../views/iWebOffice2015/v3/index.vue"),
    meta: {
      name: "新版(没有kgb)"
    },
  },
  {
    path: "/lightning/r/office/view",
    name: "iWebOffice2015_v5",
    component: () => import("../views/iWebOffice2015/v5/index.vue"),
    meta: {
      name: "旧版(有kgb)"
    },
  },
  {
    path: "/lightning/r/email/view",
    name: "EmailDetailView",
    component: () => import("../views/email/home/index.vue"),
    meta: {
      name: "邮件详情"
    },
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes: staticRoutes,
  mode: "hash",
});

function restoreRoutes() {
  const savedRoutes = JSON.parse(localStorage.getItem('savedRoutes'));
  // console.log("savedRoutes", savedRoutes);
  if (savedRoutes) {
    const parentRouteExists = router.hasRoute(savedRoutes.name);
    let parentRoute;
    if (!parentRouteExists) {
      parentRoute = {
        path: savedRoutes.path,
        name: savedRoutes.name,
        component: () => import("@/layout/index.vue"),
        meta: savedRoutes.meta,
        children: [],
      };
      router.addRoute(parentRoute);
    }
    if (savedRoutes.children.length) {
      savedRoutes.children.forEach(item => {
        const newRoute = {
          path: item.path,
          name: item.name,
          component: eval(item.component),
          meta: item.meta,
          children: [],
        };
        router.addRoute(savedRoutes.name, {
          ...newRoute
        })
      })
    }

  };
  // console.log("router", router.getRoutes())
}

function restoreRoutes2() {
  const savedRoutes = JSON.parse(localStorage.getItem('savedRoutes'));
  if (Array.isArray(savedRoutes) && savedRoutes.length) {
    // 先添加所有的父路由
    savedRoutes.forEach(route => {
      if (!router.hasRoute(route.name)) {
        // console.log("Adding parent route:", route);
        const parentRoute = {
          path: route.path,
          name: route.name,
          component: () => import("@/layout/index.vue"),
          meta: route.meta || {}
        };
        router.addRoute(parentRoute);
      }
    });

    // 再添加所有的子路由
    savedRoutes.forEach(route => {
      if (Array.isArray(route.children) && route.children.length) {
        route.children.forEach(child => {
          if (child.meta?.parentName) {
            // console.log("Adding child route:", child);
            const childRoute = {
              path: child.path,
              name: child.name,
              component: eval(child.component),
              meta: child.meta || {}
            };
            router.addRoute(child.meta.parentName, childRoute);
          }
        });
      }
    });

    // console.log("Restored routes:", router.getRoutes());
  }
}

function restoreNestedRoute(route) {
  console.log("route==", route);
  route.component = eval(route.component)
  return route;
}

if (localStorage.getItem('savedRoutes')) {
  restoreRoutes2();
  let modules = JSON.parse(localStorage.getItem('modules'));
  let subModules = JSON.parse(localStorage.getItem('subModules'));
  let moduleName = localStorage.getItem('moduleName');
  let appCode = localStorage.getItem('appCode');
  store.commit("setModules", modules);
  store.commit("setSubModules", subModules);
  store.commit("setModuleName", moduleName);
}

// 恢复动态路由
if (store.state.dynamicRoutes.length > 0) {
  store.state.dynamicRoutes.forEach(route => {
    //   console.log("route", route);
    if (!router.hasRoute(route.name)) {
      if (route.children && route.children.length) {
        route.children.forEach(row => {
          row.component = eval(row.component)
        })
      }
      const newRoute = {
        path: route.path,
        name: route.name,
        component: eval(route.component),
        meta: route.meta,
        children: route.children,
      };
      router.addRoute(newRoute);
    }
  });
}

router.beforeEach((to, from, next) => {
  const route = router.resolve(to.path);
  if (route.matched.length > 0) {
    if (to.meta.name == '通用列表1' || to.meta.name == "DashboardHome") {
      // debugger
      console.log("to", to, from, next);
      console.log(localStorage.getItem("appCode"))
      // to.name = to.params.sObjectName;
      next({
        ...to,
        replace: true,
        name: to.params.sObjectName,
        meta: {
          ...to.meta,
          appCode: localStorage.getItem("appCode"),
          moduleName: localStorage.getItem("moduleName"),
        }
      });
    } else {
      next();
    }
  } else {
    // localStorage.clear();
    // next({name: 'Login'});
    next();
  }
});
export default router;
