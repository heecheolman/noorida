import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  info: {},
  readerList: [],
  reporterList: [],
  localList: [],
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
    console.log('vuex payload', fetchType, userId);
    /**
     * fetchType 에 따라 호출 api 를 다르게 해줌
     */
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
