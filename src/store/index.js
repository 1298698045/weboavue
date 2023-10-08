import { createStore } from "vuex";

export default createStore({
  state: {
    collapsed: false,
    moduleName: "日程管理"
  },
  mutations: {
    setCollapsed(state, val) {
      state.collapsed = val;
    },
    setModuleName(state, val){
      state.moduleName = val;
    }
  },
  actions: {

  },
  modules: {},
});
