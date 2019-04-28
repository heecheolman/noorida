import api from '@/api/ApiService';

const state = {
  hotList: [],
  withdrawalSuccess: false,
};

const getters = {
};
const mutations = {
};

const actions = {
  async withdrawalProcess({ commit }, payload) {
    const { userId, nickName, password } = payload;
    const resData = await api.withdraw(userId, nickName, password)
      .then(result => result.data)
      .catch(err => err);

    if (resData) {
      state.withdrawalSuccess = true;
    } else {
      state.withdrawalSuccess = false;
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
