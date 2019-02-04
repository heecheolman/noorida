import * as types from './mutation_types';
import axios from 'axios';

const state = {
  login: false,
  user: {},
};

const mutations = {
  [types.LOGIN](state, payload) {
    state.login = payload;
  },
  [types.FETCH_USER](state, payload) {
    state.user = payload.user;
  },
};

const getters = {
  getLoginStatus: state => state.login,
  getUserData: state => state.user,
};

const actions = {
  loginProcess: async ({ commit }, payload) => {
    console.log('commit', commit);
    console.log('payload', payload);
    const user = await axios.post('/api/login', {
      nickName: payload.nickName,
      password: payload.password,
    })
      .then(result => result.data)
      .catch(err => console.error(err));

    if (user) {
      commit(types.FETCH_USER, user);
      commit(types.LOGIN, true);
    } else {
      commit(types.FETCH_USER, null);
      commit(types.LOGIN, false);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
