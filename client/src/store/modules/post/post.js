import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  title: '',
  content: '',
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
  uploadProcess: async ({ rootState }) => {
    await api.publishNews(
      rootState.user.user.userId,
      state.title,
      state.content,
      rootState.user.location.address,
    )
      .then(results => results)
      .catch(err => err);
  },

  getLocalPreviewPostList: async ({ commit, rootState }) => {
    const localPreviewList = await api.getLocalPreviewPostList(rootState.user.location.address)
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
