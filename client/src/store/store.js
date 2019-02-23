import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login/login';
import post from './modules/post/post';
import user from './modules/user/user';
import auth from './modules/auth/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    post,
    user,
    auth,
  },
  state: {},
  getters: {},
  mutations: {},
});
