import api from '@/api/ApiService';

const state = {
    hotList: [] ,
  };

const getters = {
};
const mutations = {
};

const actions = {
  async hotTopicProcess({ commit }, payload ) {
    const { localId } = payload;
    const resData = await api.loadHotPreviewPostList(localId)
      .then(result => result.data)
      .catch(err => err);

    state.hotList = resData;
    for (let i = 0 ; i < state.hotList.length; i++) {
      state.hotList[i].rank = i + 1 ;
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
