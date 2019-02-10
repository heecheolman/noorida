import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login/login';
import post from './modules/post/post';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    post,
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
});
