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
  [types.FETCH_PREVIEW_LOCAL_POST](state, payload) {
    state.localPreviewPostList = payload;
  },
};

const getters = {
};

const actions = {
  uploadProcess: async ({ commit }, payload) => {
    const result = await api.publishNews(payload.userId, state.title, state.content, payload.address)
      .then(results => results)
      .catch(err => err);
  },

  getLocalPreviewPostList: async ({ commit, state }, payload) => {
    const localPreviewList = await api.getLocalPreviewPostList(payload)
      .then(results => results.data)
      .catch(err => err);
    commit(types.FETCH_PREVIEW_LOCAL_POST, localPreviewList);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
