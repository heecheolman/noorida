import * as types from './mutation_types';
import api from '@/api/ApiService';

const state = {
  login: false,
  user: null,
};

const mutations = {
  [types.LOGIN](state, payload) {
    state.login = payload;
  },
  [types.FETCH_USER_DATA](state, user) {
    state.user = user;
  },
  [types.INIT_LOGIN_DATA](state) {
    state.login = false;
    state.user = {};
  },
};

const getters = {
  getLoginSuccess: state => state.login && !!state.user,
  getUserData: state => state.user,
};

const actions = {
  loginProcess: async ({ commit }, payload) => {
    const { nickName, password } = payload;
    const user = await api.login(nickName, password)
      .then(result => result.data)
      .catch(err => err);

    if (user) {
      commit(types.FETCH_USER_DATA, user);
      commit(types.LOGIN, true);
    } else {
      commit(types.FETCH_USER_DATA, null);
      commit(types.LOGIN, false);
    }
  },
  initLoginData: ({ commit }) => {
    commit(types.INIT_LOGIN_DATA);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
