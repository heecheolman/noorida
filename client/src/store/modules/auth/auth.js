import * as types from './mutation_types';
import api from './../../../api/ApiService';

const state = {
  loginStatus: false,
};
const mutations = {
  [types.SET_LOGIN_STATUS](state, payload) {
    state.loginStatus = payload;
  },
};
const getters = {};
const actions = {
  loginProcess: async ({ commit }, payload) => {
    const { nickName, password } = payload;
    const loginResult = await api.login(nickName, password)
      .then(results => results.data)
      .catch(err => err);

    if (loginResult.loginStatus) {
      commit('user/FETCH_USER_DATA', loginResult.data, { root: true });
    }

    commit(types.SET_LOGIN_STATUS, loginResult.loginStatus);
  },
  sessionLoginProcess: async ({ commit }) => {
    const sessionResult = await api.sessionLogin()
      .then(results => results.data)
      .catch(err => err);

    if (sessionResult.loginStatus) {
      commit('user/FETCH_USER_DATA', sessionResult.data, { root: true });
    }
    commit(types.SET_LOGIN_STATUS, sessionResult.loginStatus);
  },
  sessionInit: async ({ commit }) => {
    await api.sessionInit()
      .then(results => results.data)
      .catch(err => err);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
