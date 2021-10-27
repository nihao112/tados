import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    shuan(state, data) {
      state.list = data;
    },
    tiang(state, data) {
      state.list = [{ ...data }, ...state.list];
    },
    studelete(state, data) {
      state.list = data;
    }
  },
  getters: {
    getts(state) {
      return state.list;
    }
  },
  actions: {
    sts({ commit }, str) {
      commit("sts", str);
    }
  },
  modules: {}
});
