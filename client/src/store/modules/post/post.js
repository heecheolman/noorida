import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  title: '',
  content: '',
  previewPostList: [],
  lastId: -1,
  hasNextPost: true,
  loading: false,
  busy: false,
  detailPost: {},
  profileCard: {},
  evaluationScore: 0,
};

const mutations = {
  [types.SET_TITLE](state, payload) {
    state.title = payload;
  },
  [types.SET_CONTENT](state, payload) {
    state.content = payload;
  },
  [types.FETCH_POST_LIST](state, payload) {
    state.previewPostList = state.previewPostList.concat(payload);
  },
  [types.UPDATE_LIMIT_PIVOT](state, payload) {
    state.offsetPivot = payload;
  },
  [types.UPDATE_LAST_ID](state, payload) {
    state.lastId = payload;
  },
  [types.INIT_PREVIEW_LIST](state) {
    state.previewPostList = [];
    state.busy = false;
    state.lastId = -1;
    state.hasNextPost = true;
  },
  [types.INIT_TITLE_CONTENT](state) {
    state.title = '';
    state.content = '';
  },
  [types.UPDATE_DETAIL_POST](state, payload) {
    state.detailPost = payload;
  },
  [types.UPDATE_PROFILE_CARD](state, payload) {
    state.profileCard = payload;
  },
  [types.INIT_DETAIL_POST](state) {
    state.detailPost = {};
  },
  [types.INIT_PROFILE_CARD](state) {
    state.profileCard = {};
  },
  [types.UPDATE_EVAL_SCORE](state, payload) {
    state.evaluationScore = payload;
  },
};

const getters = {
};

const actions = {
  async uploadProcess({ rootState }) {
    await api.publishNews(
      rootState.user.user.userId,
      state.title,
      state.content,
      rootState.user.location.address,
    )
      .then(results => results)
      .catch(err => err);
  },

  async loadLocalPreviewPostList({ commit, state, rootState }) {
    if (state.hasNextPost) {
      state.loading = true;
      const resData = await api.loadLocalPreviewPostList(rootState.user.location.address, state.lastId)
        .then(results => results.data)
        .catch(err => err);

      if (!resData.result) {
        resData.result = [];
      }

      if (resData.result.length) {
        commit(types.FETCH_POST_LIST, resData.result);
        commit(types.UPDATE_LAST_ID, resData.lastId);
        state.hasNextPost = resData.hasNextPost;
      } else {
        state.busy = true;
      }
      state.loading = false;
    }
  },

  async loadUserPostList({ commit, state }, payload) {
    if (state.hasNextPost) {
      state.loading = true;
      const resData = await api.loadUserPostList(payload, state.lastId)
        .then(results => results.data)
        .catch(err => err);

      if (!resData.result) {
        resData.result = [];
      }

      if (resData.result.length) {
        commit(types.FETCH_POST_LIST, resData.result);
        commit(types.UPDATE_LAST_ID, resData.lastId);
        state.hasNextPost = resData.hasNextPost;
      } else {
        state.busy = true;
      }
      state.loading = false;
    }
  },

  async fetchDetailPost({ commit }, payload) {
    const contentData = await api.getPostContent(payload)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_DETAIL_POST, contentData);

    const profileCard = await api.getUserProfileCard(contentData.userId)
      .then(result => result.data)
      .catch(err => err);
    profileCard.userId = contentData.userId;
    commit(types.UPDATE_PROFILE_CARD, profileCard);
  },

  async evaluateReliabilityScore({ commit }, payload) {
    const { userId, contentId, value } = payload;
    const resData = await api.evaluate(userId, contentId, value)
      .then(result => result.data)
      .catch(err => err);
  },

  async getEvaluationScore({ commit }, payload) {
    const { userId, contentId } = payload;
    const resData = await api.getEvaluationScore(userId, contentId)
      .then(result => result.data)
      .catch(err => err);
    if (!resData) {
      commit(types.UPDATE_EVAL_SCORE, 0);
    } else {
      // commit(types.UPDATE_EVAL_SCORE, resData);
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
