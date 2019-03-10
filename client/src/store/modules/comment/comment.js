import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  commentContent: '',
  commentList: [],
  lastId: -1,
  hasNextComment: true,
  commentLoading: false,
};

const getters = {
};

const mutations = {
  [types.SET_COMMENT_CONTENT](state, payload) {
    state.commentContent = payload;
  },
  [types.UPDATE_LAST_ID](state, payload) {
    state.lastId = payload;
  },
  [types.FETCH_POST_LIST](state, payload) {
    state.commentList = state.commentList.concat(payload);
  },
  [types.INIT_COMMENT_DATA](state) {
    state.commentList = [];
    state.commentContent = '';
    state.lastId = -1;
    state.hasNextComment = true;
    state.commentLoading = false;
  },
  [types.INIT_COMMENT_CONTENT](state) {
    state.commentContent = '';
  },
};

const actions = {
  loadCommentList: async ({ commit, state }, payload) => {
    if (state.hasNextComment) {
      state.commentLoading = true;
      const resData = await api.getCommentList(payload, state.lastId)
        .then(results => results.data)
        .catch(err => err);

      if (!resData.result) {
        resData.result = [];
      }

      if (resData.result.length) {
        commit(types.FETCH_POST_LIST, resData.result);
        commit(types.UPDATE_LAST_ID, resData.lastId);
      }
      state.hasNextComment = resData.hasNextComment;
      state.commentLoading = false;
    }
  },

  writeComment: async ({ commit }, payload) => {
    const { contentId, userId, commentContent } = payload;
    await api.writeComment(contentId, userId, commentContent)
      .then(results => results.data)
      .catch(err => err);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

