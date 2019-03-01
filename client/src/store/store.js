import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth/auth';
import user from './modules/user/user';
import post from './modules/post/post';
import find from './modules/find/find';
import comment from './modules/comment/comment';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    post,
    find,
    user,
    auth,
    comment,
  },
  state: {},
  getters: {},
  mutations: {},
});
