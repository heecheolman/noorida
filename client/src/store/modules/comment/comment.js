import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  commentContent: '',
  commentList: [],
};

const getters = {
};

const actions = {
};

const mutations = {
  [types.SET_COMMENT_CONTENT](state, payload) {
    state.commentContent = payload;
  },
  [types.INIT_COMMENT](state) {
    state.commentContent = '';
    state.commentList = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

