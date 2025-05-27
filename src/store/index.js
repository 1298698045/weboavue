import { createStore } from "vuex";
import request from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
import router from "@/router/index.js";
import { routesMapping } from "@/utils/routesMapping.js";
export default createStore({
  state: {
    collapsed: false,
    moduleName: localStorage.getItem("moduleName") || "",
    groupId: "",
    currentData: {}, // 当前模板数据
    tabListCurrent: 0, // 当前选中的tab
    tabListClickType: 0,
    isMasterAttr: false, // 页面和组件属性配置开关
    dashboardId: "",
    themeType: "default",
    modules: JSON.parse(localStorage.getItem("modules")) || [],
    subModules: [],
    appCode: localStorage.getItem("appCode") || "",
    dynamicRoutes: JSON.parse(localStorage.getItem("dynamic_routes")) || [],
    searchList: {}, // 高级搜索
    searchOptions: {}, // 高级搜索
    needsRefresh: false, // 流程状态刷新列表

    batchPrints: "", // 批量打印
  },
  mutations: {
    setCollapsed(state, val) {
      state.collapsed = val;
    },
    setModuleName(state, val) {
      state.moduleName = val;
      localStorage.setItem("moduleName", val);
    },
    setGroupId(state, val) {
      state.groupId = val;
    },
    initializeFromRoute(state, val) {
      state.dashboardId = val;
    },
    setTheme(state, val) {
      state.themeType = val;
    },
    setModules(state, modules) {
      state.modules = modules;
    },
    setSubModules(state, subModules) {
      state.subModules = subModules;
    },
    setAppCode(state, code) {
      state.appCode = code;
    },
    setDynamicRoutes(state, routes) {
      state.dynamicRoutes = routes;
      localStorage.setItem("dynamic_routes", JSON.stringify(routes));
    },
    setSearchList(state, val) {
      state.searchList = val;
    },
    setSearchOptions(state, val) {
      state.searchOptions = val;
    },
    setNeedsRefresh(state, val) {
      state.needsRefresh = val;
    },
    setBatchPrint(state, val) {
      state.batchPrints = val;
    }
  },
  actions: {
    // async getModules({ commit, dispatch }){
    //   try {
    //     const res = await request.$get(Interface.applist, {systemCode: 'OA'});
    //     if(res && res.actions && res.actions[0].returnValue){
    //       let modules = res.actions[0].returnValue.apps;
    //       commit('setModules', modules);
    //       localStorage.setItem("modules", JSON.stringify(modules));
    //       modules.forEach(item=>{
    //         let path = item.StartUrl.startsWith("/") ? item.StartUrl : "/" + item.StartUrl;
    //         if(path.indexOf('?')!=-1){
    //           path = path.split('?')[0]
    //         }
    //         router.addRoute({
    //           path: path+"Parent",
    //           name: item.Name,
    //           component: () => import("@/layout/index.vue"),
    //           meta: { 
    //             moduleName: item.Label
    //           },
    //           children: []
    //         })
    //       });
    //       commit('setModuleName', modules[0].Label);
    //       dispatch('getSubModules', modules[0].AppCode);
    //       localStorage.setItem("moduleName", modules[0].Label);
    //       localStorage.setItem("appCode", modules[0].AppCode);
    //     }
    //   }catch(error){
    //     console.log("getModules error");
    //   }
    // },
    // async getModules({ commit, dispatch }) {
    //   const res = await request.$get(Interface.applist, { systemCode: 'OA' });
    //   if (res && res.actions && res.actions[0].returnValue) {
    //     let modules = res.actions[0].returnValue.apps;
    //     commit('setModules', modules);
    //     localStorage.setItem("modules", JSON.stringify(modules));
    //     modules.forEach(module => {
    //       let path = module.StartUrl.startsWith("/") ? module.StartUrl : "/" + module.StartUrl;
    //       if (path.indexOf('?') != -1) {
    //         path = path.split('?')[0];
    //       }
    //       const parentRoute = {
    //         path: path + "Parent",
    //         name: module.Name,
    //         component: () => import("@/layout/index.vue"),
    //         meta: {
    //           moduleName: module.Label
    //         },
    //         children: []
    //       };
    //       let developerName = module.Name;
    //       if (module.tabs && module.tabs.length > 0) {
    //         module.tabs.forEach(tab => {
    //           let subPath = tab.navAction.url.startsWith("/") ? tab.navAction.url : "/" + tab.navAction.url;
    //           if (subPath.indexOf('?') != -1) {
    //             subPath = subPath.split('?')[0]
    //           };
    //           let obj = routesMapping[developerName] && routesMapping[developerName][tab.name];
    //           let componentPath;

    //           let splitPaths = subPath.split("/");
    //           if (splitPaths.length == 4 && subPath.indexOf("/lightning/o/") != -1) {
    //             componentPath = () => import("../views/listView/index.vue");
    //             subPath = subPath.replace(/\/o\/[^/]+$/, '/o/:sObjectName');
    //           } else {
    //             componentPath = obj || eval(() => import("@/views/NotFound.vue")); // Fallback for missing routes
    //           }

    //           parentRoute.children.push({
    //             path: subPath,
    //             name: tab.name,
    //             component: componentPath,
    //             meta: {
    //               label: tab.navAction.label,
    //               moduleName: module.Label,
    //               parentName: module.Name,
    //               appCode: module.AppCode
    //             }
    //           });
    //         });
    //       }
    //       router.addRoute(parentRoute);
    //     })
    //     console.log("getRoutes", router.getRoutes());
    //     console.log("router", router);
    //     console.log("modules", modules, modules[0].tabs[0].navAction.url);
    //     localStorage.setItem("appCode", modules[0].AppCode);
    //     commit('setModuleName', modules[0].Label);
    //     commit('setAppCode', modules[0].AppCode);
    //     router.push(modules[0].tabs[0].navAction.url);
    //   }
    //   // try {
    //   // } catch (error) {
    //   //   console.log("getModules error");
    //   // }
    // },
    async getModules({ commit, dispatch }) {
      const res = await request.$get(Interface.applist, { systemCode: 'OA' });
      if (res && res.actions && res.actions[0].returnValue) {
        let modules = res.actions[0].returnValue.apps;
        commit('setModules', modules);
        localStorage.setItem("modules", JSON.stringify(modules));

        // 收集所有动态路由
        const allDynamicRoutes = [];

        modules.forEach(module => {
          let path = module.StartUrl.startsWith("/") ? module.StartUrl : "/" + module.StartUrl;
          if (path.indexOf('?') != -1) {
            path = path.split('?')[0];
          }
          const parentRoute = {
            path: path + "Parent",
            name: module.Name,
            component: () => import("@/layout/index.vue"),
            meta: {
              moduleName: module.Label
            },
            children: []
          };

          let developerName = module.Name;
          if (module.tabs && module.tabs.length > 0) {
            module.tabs.forEach(tab => {
              let subPath = tab.navAction.url.startsWith("/") ? tab.navAction.url : "/" + tab.navAction.url;
              if (subPath.indexOf('?') != -1) {
                subPath = subPath.split('?')[0];
              };

              let obj = routesMapping[developerName] && routesMapping[developerName][tab.name];
              let componentPath;

              let splitPaths = subPath.split("/");
              if (splitPaths.length == 4 && subPath.indexOf("/lightning/o/") != -1) {
                componentPath = () => import("../views/listView/index.vue");
                subPath = subPath.replace(/\/o\/[^/]+$/, '/o/:sObjectName');
              } else if (splitPaths.length == 5 && subPath.indexOf("/page/dashboard/") != -1) {
                // 处理通用门户
                componentPath = () => import("../views/home/commonHome.vue");
                subPath = subPath.replace(/\/dashboard\/[^/]+$/, '/dashboard/:sObjectName');
              } else {
                componentPath = obj || (() => import("@/views/NotFound.vue"));
              }

              parentRoute.children.push({
                path: subPath,
                name: tab.name,
                component: componentPath,
                meta: {
                  label: tab.navAction.label,
                  moduleName: module.Label,
                  parentName: module.Name,
                  appCode: module.AppCode
                }
              });
            });
          }

          // 添加到路由
          router.addRoute(parentRoute);
          // 保存路由配置
          allDynamicRoutes.push(parentRoute);
        });

        // 保存所有动态路由配置
        allDynamicRoutes.forEach(item => {
          console.log("item.component", item.component);
          item.component = String(item.component);
          if (item.children && item.children.length) {
            item.children.forEach(row => {
              row.component = String(row.component);
            })
          }
        })
        console.log("allDynamicRoutes", allDynamicRoutes);
        commit('setDynamicRoutes', allDynamicRoutes);

        localStorage.setItem("appCode", modules[0].AppCode);
        commit('setModuleName', modules[0].Label);
        commit('setAppCode', modules[0].AppCode);
        // router.push(modules[0].tabs[0].navAction.url);
        router.push('/lightning/home/Workspace');
        // router.push("/workflow/o/instance/add");
      }
    },
    async getSubModules({ commit, state }, appCode) {
      // try{
      let obj = {
        actions: [{
          id: "4105;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            appCode: appCode
          }
        }]
      };
      let d = {
        message: JSON.stringify(obj)
      }
      function serializeRoutes(routes) {
        // console.log("routes===========", routes);
        return routes.map((route) => {
          const serializedRoute = {
            path: route.path,
            name: route.name,
            meta: route.meta,
            component: route.componentPath || route.component
          };
          // 如果有子路由，递归处理
          if (route.children && route.children.length > 0) {
            serializedRoute.children = serializeRoutes(route.children);
          }
          return serializedRoute;
        })
      }
      const res = await request.$post(Interface.currentApp, d);
      if (res && res.actions && res.actions[0].returnValue) {
        let returnValue = res.actions[0].returnValue;
        let developerName = returnValue.developerName;
        let appCode = returnValue.appCode;
        let label = returnValue.label;
        let subModules = returnValue.tabs;
        commit('setSubModules', subModules);
        localStorage.setItem("subModules", JSON.stringify(subModules));
        const parentRouteExists = router.hasRoute(developerName);
        let parentRoute;
        if (!parentRouteExists) {
          parentRoute = {
            path: `/${developerName}`,
            name: developerName,
            component: () => import("@/layout/index.vue"),
            meta: { moduleName: returnValue.label },
            children: [],
          };
          router.addRoute(parentRoute);
        } else {
          parentRoute = router.getRoutes().find(route => route.name === developerName);
        }

        const savedRoutes = [];
        subModules.forEach(item => {
          let subPath = item.navAction.url.startsWith("/") ? item.navAction.url : "/" + item.navAction.url;
          if (subPath.indexOf('?') != -1) {
            subPath = subPath.split('?')[0]
          };

          let obj = routesMapping[developerName] && routesMapping[developerName][item.name];
          let componentPath = obj;
          // if(typeof obj == 'object'){
          //   componentPath = obj.component;
          // }

          let splitPaths = subPath.split("/");
          if (splitPaths.length == 4 && subPath.indexOf("/lightning/o/") != -1) {
            componentPath = () => import("../views/listView/index.vue");
            subPath = subPath.replace(/\/o\/[^/]+$/, '/o/:sObjectName');
          }


          // const componentPath = routesMapping[developerName][item.name];
          // console.log("componentPath:", componentPath);
          // 处理通用列表
          // if(`${componentPath}`.indexOf('listView/index.vue')!=-1){
          if (typeof obj == 'object') {
            // subPath = subPath.replace(/\/o.*$/, '/:sObjectName');
            // subPath = subPath.replace(/\/o\/[^/]+$/, '/o/:sObjectName');
            // console.log("subPath", subPath);
          }

          // 先检查路由是否已经存在
          const existingRoute = router.getRoutes().find(route => route.path === subPath);
          if (componentPath) {
            const newRoute = {
              path: subPath,
              name: item.name,
              componentPath: `${componentPath}`,
              meta: {
                label: item.navAction.label,
                moduleName: label,
                parentName: developerName,
                appCode: appCode
              },
              children: [],
            };
            // console.log("componentPath", componentPath);

            router.addRoute(developerName, {
              ...newRoute,
              component: componentPath,
            });

            // 保存路由信息
            parentRoute.children.push(newRoute);
          }
        });

        //parentRoute 相当于存储的是当前模块的整一个路由
        const routes = router.getRoutes();
        // console.log("routes:", routes)
        let children = serializeRoutes(parentRoute.children);
        parentRoute.children = children;
        // console.log("parentRoute", parentRoute);
        // console.log("getRoutes", routes);

        const newRoutes = serializeRoutes(routes);
        // console.log("newRoutes", newRoutes);

        if (localStorage.getItem('savedRoutes')) {
          let localRoutes = JSON.parse(localStorage.getItem('savedRoutes'));
          // console.log("localRoutes", localRoutes);
        }
        localStorage.setItem('savedRoutes', JSON.stringify(newRoutes));
        commit('setModuleName', returnValue.label);
        localStorage.setItem("menuName", subModules[0].name);
        setTimeout(() => {
          router.push(subModules[0].navAction.url);
        }, 100)
      }
      // }
      // catch(error){
      //   console.log("getSubModules error");
      // }
    }
  },
  modules: {
  },
});
