import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  scrapPostList: [],
  lastId: -1,
};

const mutations = {};

const getters = {};

const actions = {
  async loadScrapPostList({ commit, state, rootState }) {
    const resData = await api.getScrappedPostList(rootState.user.user.userId, state.lastId)
      .then(result => result.data)
      .catch(err => err);
    console.log('vuex', resData);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
