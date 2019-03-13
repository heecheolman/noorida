import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  info: {},
  readerList: [],
  reporterList: [],
  localList: [],
  isSubscribe: false,
};

const mutations = {
  [types.UPDATE_ANOTHER_USER](state, payload) {
    state.info = payload;
  },
  [types.INIT_SUBSCRIBE_LIST](state) {
    state.readerList = [];
    state.reporterList = [];
    state.localList = [];
  },
  [types.UPDATE_READER_LIST](state, payload) {
    payload.forEach((user) => {
      user.userId = user.reader;
      delete user.reader;
    });
    state.readerList = payload;
  },
  [types.UPDATE_REPORTER_LIST](state, payload) {
    if (Array.isArray(payload)) {
      payload.forEach((user) => {
        user.userId = user.reporter;
        delete user.reporter;
      });
      state.reporterList = payload;
    }
  },
  [types.UPDATE_LOCAL_LIST](state, payload) {
    if (Array.isArray(payload)) {
      payload.forEach((user) => {
        user.userId = user.local;
        delete user.local;
      });
      state.localList = payload;
    }
  },
  [types.UPDATE_IS_SUBSCRIBE](state, payload) {
    state.isSubscribe = payload;
  },
};

const getters = {
};

const actions = {
  async fetchAnotherUser({ commit }, payload) {
    const userInfo = await api.getUser(payload)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_ANOTHER_USER, userInfo);
  },

  async fetchSubscribeList({ commit }, payload) {
    const { fetchType, userId } = payload;
    let callApi = null;
    switch (fetchType) {
      case 'readers': callApi = api.readerList; break;
      case 'reporters': callApi = api.reporterList; break;
      case 'locals': callApi = api.localList; break;
      default: callApi = () => {};
    }
    const resData = await callApi(userId)
      .then(result => result.data)
      .catch(err => err);

    switch (fetchType) {
      case 'readers': commit(types.UPDATE_READER_LIST, resData); break;
      case 'reporters': commit(types.UPDATE_REPORTER_LIST, resData); break;
      case 'locals': commit(types.UPDATE_LOCAL_LIST, resData); break;
      default: break;
    }
    /**
     * fetchType 에 따라 호출 api 를 다르게 해줌
     */
  },

  async subscribeReporter({ commit }, payload) {
    const { me, another } = payload;
    const resData = await api.subscriptionReporter(me, another)
      .then(result => result.data)
      .catch(err => err);
    if (resData === 'ok') {
      commit(types.UPDATE_IS_SUBSCRIBE, true);
    }
  },

  async cancelSubscribeReporter({ commit }, payload) {
    const { me, another } = payload;
    const resData = await api.cancelSubscriptionReporter(me, another)
      .then(result => result.data)
      .catch(err => err);
    if (resData === 'ok') {
      commit(types.UPDATE_IS_SUBSCRIBE, false);
    }
  },

  async isSubscribe({ commit }, payload) {
    const { reader, reporter } = payload;
    const resData = await api.isSubscribe(reader, reporter)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_IS_SUBSCRIBE, resData);
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
