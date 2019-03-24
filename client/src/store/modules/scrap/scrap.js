import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  scrapPostList: [],
  lastId: -1,
  hasNextPost: true,
  loading: false,
  busy: false,
};

const mutations = {
  [types.UPDATE_LAST_ID](state, payload) {
    state.lastId = payload;
  },
  [types.FETCH_SCRAP_LIST](state, payload) {
    state.scrapPostList = state.scrapPostList.concat(payload);
  },
  [types.INIT_SCRAP_POST_LIST](state) {
    state.scrapPostList = [];
    state.busy = false;
    state.lastId = -1;
    state.hasNextPost = true;
  },
};

const getters = {};

const actions = {
  async loadScrapPostList({ commit, state, rootState }) {
    if (state.hasNextPost) {
      state.loading = true;
      const resData = await api.getScrappedPostList(rootState.user.user.userId, state.lastId)
        .then(result => result.data)
        .catch(err => err);

      if (!resData.result) {
        resData.result = [];
      }
      if (resData.result.length) {
        commit(types.FETCH_SCRAP_LIST, resData.result);
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
