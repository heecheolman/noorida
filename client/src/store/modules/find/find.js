import * as types from './mutation_types';
import api from '@/api/ApiService';

const state = {
  foundNickName: '',
  findPassword_success: false,
  newPassword: null,
};

const getters = {
  getFindNickname: state => state.foundNickName,
  getFindPasswordSuccess: state => state.findPassword_success,
  getNewPassword: state => state.newPassword,
};
const actions = {
  findIdProcess: async ({ commit }, payload) => {
    const { realName, email } = payload;
    const data = await api.findId(realName, email)
      .then(result => result.data)
      .catch(err => err);
    if (data && !(data instanceof Error)) {
      commit(types.SET_FOUND_ID, data.nickName);
    } else {
      commit(types.SET_FOUND_ID, null);
    }
  },
  findPasswordProcess: async ({ commit }, payload) => {
    const { realName, nickName, email } = payload;
    const data = await api.findPassword(realName, nickName, email)
      .then(result => result.data)
      .catch(err => err);

    if (data.success) {
      //이메일을 전송하라고 서버에게 요청?! 패스워드는 다시 생각해볼것
    } else {

    }

    // if(find_password && !(find_password instanceof Error)){
    //  commit(types.FETCH_PASSWORD, true);
    //  commit(types.PASSWORD_DATA, null)///////////////
    // }else{
    //   commit(types.FETCH_PASSWORD,false);
    // }

  },
};

const mutations = {
  [types.SET_FOUND_ID](state, payload) {
    state.foundNickName = payload;
  },

  [types.FETCH_PASSWORD](state, payload) {
    state.findPassword_success = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

