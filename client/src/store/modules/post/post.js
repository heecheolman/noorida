import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  title: '',
  content: '',
  location: {
    lng: 0,
    lat: 0,
  },
  localPreviewPostList: [],
};

const mutations = {
  [types.SET_TITLE](state, payload) {
    state.title = payload;
  },
  [types.SET_CONTENT](state, payload) {
    state.content = payload;
  },
};

const getters = {
};

const actions = {
  uploadProcess: async ({ commit }, payload) => {
    console.log('address', payload.address);
    const result = await api.publishNews(payload.userId, state.title, state.content, payload.address)
      .then(results => results)
      .catch(err => err);
  },

  getLocalPreviewPostList: async ({ commit, state }, payload) => {
    console.log('[store] getLocalPreviewPostList payload', payload);
    const result = await api.getLocalPreviewPostList(payload)
      .then(results => results.data)
      .catch(err => err);

    console.log('[store] getLocalPreviewPostList', result);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
