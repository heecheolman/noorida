import api from '@/api/ApiService';

const state = {
  hotList: [] ,
  withdrawalSuccess: false,
};

const getters = {
};
const mutations = {
};

const actions = {
  async withdrawalProcess({ commit }, payload ) {
    const { userId, nickName, password } = payload;
    const resData = await api.withdraw(userId, nickName, password)
      .then(result => result.data)
      .catch(err => err);
    console.log('빅히트 개새야',resData);
    if (!resData){
      state.withdrawalSuccess = false;
      console.log('탈퇴 실패!!!!',resData);
      console.log(state.withdrawalSuccess);
    } else {
      state.withdrawalSuccess = true;
      console.log('탈퇴성공~',resData);
    }
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
