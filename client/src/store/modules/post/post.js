import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
  title: '',
  content: '',
  location: {
    lng: 0,
    lat: 0,
  },
  imageCount: 0,
};

const mutations = {
  [types.SET_TITLE](state, payload) {
    state.title = payload;
  },
  [types.SET_CONTENT](state, payload) {
    state.content = payload;
  },
};

const getters = {
};

const actions = {
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
