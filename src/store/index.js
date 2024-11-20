import { createStore } from "vuex";
export default createStore({
  state: {
    collapsed: false,
    moduleName: "日程管理",
    groupId: "",
    currentData: {}, // 当前模板数据
    tabListCurrent: 0, // 当前选中的tab
    tabListClickType: 0,
    isMasterAttr: false, // 页面和组件属性配置开关
    dashboardId: "",
    themeType: "default"
  },
  mutations: {
    setCollapsed(state, val) {
      state.collapsed = val;
    },
    setModuleName(state, val) {
      state.moduleName = val;
    },
    setGroupId(state, val) {
      state.groupId = val;
    },
    initializeFromRoute(state, val){
      state.dashboardId = val;
    },
    setTheme(state, val){
      state.themeType = val;
    }
  },
  actions: {
    
  },
  modules: {},
});
