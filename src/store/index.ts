import Vue from "vue";
import Vuex from "vuex";

import auth from "@/store/modules/auth";
import farm from "@/store/modules/farm";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    farm
  }
});
