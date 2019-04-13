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
  isEvaluated: false,
  reliabilityScore: 0,
  contentScrapState: false,
  userEmotion: 0,
  postEmotions: {},

  subPreviewPostList: [],
  subLastId: -1,
  subHasNextPost: true,
  subLoading: false,
  subBusy: false,
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
    state.postEmotions = {};
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
  [types.UPDATE_IS_EVALUATED](state, payload) {
    state.isEvaluated = payload;
  },
  [types.UPDATE_RELIABILITY_SCORE](state, payload) {
    state.reliabilityScore = payload;
  },
  [types.UPDATE_SCRAPPED_STATE](state, payload) {
    state.contentScrapState = payload;
  },
  [types.UPDATE_USER_EMOTION](state, payload) {
    state.userEmotion = payload;
  },
  [types.UPDATE_POST_EMOTIONS](state, payload) {
    state.postEmotions = { ...payload };
  },
  [types.INIT_SUB_PREVIEW_POST_LIST](state) {
    state.subPreviewPostList = [];
    state.subLastId = -1;
    state.subHasNextPost = true;
  },
  [types.FETCH_SUB_PREVIEW_POST_LIST](state, payload) {
    state.subPreviewPostList = state.subPreviewPostList.concat(payload);
  },
  [types.UPDATE_SUB_LAST_ID](state, payload) {
    state.subLastId = payload;
  },
};

const getters = {};

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

  async deleteNews({ commit }, payload) {
    const { contentId, userId } = payload;
    const resData = await api.deleteNews(userId, contentId)
      .then(result => result.data)
      .catch(err => err);
  },

  async loadLocalPreviewPostList({ commit, state, rootState }) {
    if (state.hasNextPost) {
      state.loading = true;
      const resData = await api.loadLocalPreviewPostList(rootState.user.location.address, state.lastId, rootState.user.user.userId)
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
    const { userId, contentId, score } = payload;
    const resData = await api.evaluate(userId, contentId, score)
      .then(result => result.data)
      .catch(err => err);
    if (resData === 'ok') {
      commit(types.UPDATE_IS_EVALUATED, true);
    }
  },

  async isEvaluated({ commit }, payload) {
    const { userId, contentId } = payload;
    const isEvaluated = await api.isEvaluated(userId, contentId)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_IS_EVALUATED, isEvaluated);
  },

  async getUserReliabilityScore({ commit, state }) {
    const score = await api.getReliabilityScore(state.detailPost.userId)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_RELIABILITY_SCORE, score);
  },

  async updatePostEmotion({ commit }, payload) {
    const { contentId, userId, emotionCode } = payload;
    const resData = await api.updatePostEmotion(contentId, userId, emotionCode)
      .then(result => result.data)
      .catch(err => err);
  },

  async getUserEmotion({ commit, rootState }, payload) {
    const { contentId } = payload;
    const resData = await api.getUserEmotion(rootState.user.user.userId, contentId)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_USER_EMOTION, resData.emotionCode);
  },

  async getEmotionList({ commit }, payload) {
    const { contentId } = payload;
    const resData = await api.getContentEmotionList(contentId)
      .then(result => result.data)
      .catch(err => err);
    const { like, happy, angry, sad } = resData;
    commit(types.UPDATE_POST_EMOTIONS, {
      like: like || 0,
      happy: happy || 0,
      angry: angry || 0,
      sad: sad || 0,
    });
  },

  async contentScrappedCheck({ commit }, payload) {
    const { userId, contentId } = payload;
    const resData = await api.contentScrappedCheck(userId, contentId)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_SCRAPPED_STATE, resData);
  },

  async contentScrapping({ commit }, payload) {
    const { userId, contentId } = payload;
    const resData = await api.contentScrapping(userId, contentId)
      .then(result => result.data)
      .catch(err => err);
    if (resData === 'ok') {
      commit(types.UPDATE_SCRAPPED_STATE, true);
    }
  },

  async cancelContentScrapping({ commit }, payload) {
    const { userId, contentId } = payload;
    const resData = await api.cancelContentScrapping(userId, contentId)
      .then(result => result.data)
      .catch(err => err);
    if (resData === 'ok') {
      commit(types.UPDATE_SCRAPPED_STATE, false);
    }
  },

  async insertViewCount({ commit }, payload) {
    const { userId, contentId } = payload;
    const resData = await api.insertView(userId, contentId)
      .then(result => result.data)
      .catch(err => err);
  },

  async loadSubPreviewPostList({ commit, state, rootState }) {
    if (state.subHasNextPost) {
      state.subLoading = true;
      const resData = await api.fetchUserSubPostList(rootState.user.user.userId, state.subLastId)
        .then(result => result.data)
        .catch(err => err);
      if (!resData.result) {
        resData.result = [];
      }

      if (resData.result.length) {
        commit(types.FETCH_SUB_PREVIEW_POST_LIST, resData.result);
        commit(types.UPDATE_SUB_LAST_ID, resData.lastId);
        state.subHasNextPost = resData.hasNextPost;
      } else {
        state.subBusy = true;
      }
      state.subLoading = false;
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
