import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  info: {},
};

const mutations = {
  [types.UPDATE_ANOTHER_USER](state, payload) {
    state.info = payload;
  },
};

const getters = {
};

const actions = {
  async fetchAnotherUser({ commit }, payload) {
    const userInfo = await api.getUser(payload)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_ANOTHER_USER, userInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
