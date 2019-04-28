import * as types from './mutation_types';
import api from '@/api/ApiService';

const state = {
  foundNickName: '',
  realName: '',
  findPasswordSuccess: false,
  changePasswordSuccess: false,
};
const getters = {
  getFindNickname: state => state.foundNickName,
  getFindPasswordSuccess: state => state.findPasswordSuccess,
  getChangePasswordSuccess: state => state.changePasswordSuccess,
  getRealName: state => state.realName,
};
const actions = {
  findPasswordProcess: async ({ commit }, payload) => {
    const { realName, nickName, email } = payload;
    const data = await api.findPassword(realName, nickName, email)
      .then(result => result.data)
      .catch(err => err);

    if (data && !(data instanceof Error)) {
      commit(types.FIND_PASSWORD_SUCCESS, true);
      await api.insertTmpPassword(email);
    } else {
      commit(types.FIND_PASSWORD_SUCCESS, false);
    }
  },
  findIdProcess: async ({ commit } , payload) => {
    const { realName, email } = payload;
    const data =  await api.findId(realName , email)
      .then(result => result.data)
      .catch(err => err);
    if (data && !(data instanceof Error)) {
      commit(types.SET_FOUND_ID, data.nickName);
      commit(types.GET_REAL_NAME, realName);
    } else {
      commit(types.SET_FOUND_ID, null);
    }
  },
  changePasswordProcess: async ({ commit }, payload) => {
    const { userId, oldPassword, newPassword } = payload;
    const data = await api.checkPassword(userId, oldPassword)
      .then(result => result.data)
      .catch(err => err);
    if (data && !(data instanceof Error)) {
      await api.insertNewPassword(userId, newPassword);
      commit(types.CHANGE_PASSWORD_SUCCESS, true);
    } else {
      commit(types.CHANGE_PASSWORD_SUCCESS, false);
    }
  },
};
const mutations = {
  [types.SET_FOUND_ID](state, payload) {
    state.foundNickName = payload;
  },
  [types.FIND_PASSWORD_SUCCESS](state, payload) {
    state.findPasswordSuccess = payload;
  },
  [types.CHANGE_PASSWORD_SUCCESS](state, payload) {
    state.changePasswordSuccess = payload;
  },
  [types.GET_REAL_NAME](state, payload) {
    state.realName = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

