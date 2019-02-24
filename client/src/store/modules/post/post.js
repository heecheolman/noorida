import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  title: '',
  content: '',
  localPreviewPostList: [],
  lastId: -1,
  hasNextPost: true,
  loading: false,
  busy: false,
};

const mutations = {
  [types.SET_TITLE](state, payload) {
    state.title = payload;
  },
  [types.SET_CONTENT](state, payload) {
    state.content = payload;
  },
  [types.FETCH_PREVIEW_LOCAL_POST](state, payload) {
    state.localPreviewPostList = state.localPreviewPostList.concat(payload);
  },
  [types.UPDATE_LIMIT_PIVOT](state, payload) {
    state.offsetPivot = payload;
  },
  [types.UPDATE_LAST_ID](state, payload) {
    state.lastId = payload;
  },
  [types.INIT_PREVIEWLIST](state) {
    state.localPreviewPostList = [];
    state.busy = false;
    state.lastId = -1;
    state.hasNextPost = true;
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

  loadLocalPreviewPostList: async ({ commit, state, rootState }) => {
    if (state.hasNextPost) {
      state.loading = true;
      const resData = await api.loadLocalPreviewPostList(rootState.user.location.address, state.lastId)
        .then(results => results.data)
        .catch(err => err);

      if (resData.result.length) {
        commit(types.FETCH_PREVIEW_LOCAL_POST, resData.result);
        commit(types.UPDATE_LAST_ID, resData.lastId);
        state.hasNextPost = resData.hasNextPost;
      } else {
        state.busy = true;
      }
      state.loading = false;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
