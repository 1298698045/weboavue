import { createStore } from "vuex";

export default createStore({
  state: {
    collapsed: false,
  },
  mutations: {
    setCollapsed(state, val) {
      state.collapsed = val;
    },
  },
  actions: {},
  modules: {},
});
