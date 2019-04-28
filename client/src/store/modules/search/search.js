import api from '@/api/ApiService';

const state = {
  loading: false,
  localList: [],
  reportUserList: [],
  searchPostList: [],
  searchLocalPostList: [],
  tempSubName: '',
  lastId: -1,
};

const getters = {
};
const mutations = {
};

const actions = {
  loadLocalData: async ({ commit }, payload) => {
    state.loading = true;
    state.localList = [];
    const { word } = payload;
    const resData = await api.searchLocal(word)
      .then(result => result.data)
      .catch(err => err);
    resData.forEach((value, index) => {
      const tempBeforeName = value.localName;
      state.tempSubName = tempBeforeName.substring(5);
      value.localName = state.tempSubName;
      state.localList[index] = resData[index];
    });
    state.loading = false;
  },
  loadUserData: async ({ commit }, payload) => {
    state.loading = true;
    state.reportUserList = [];
    const { word } = payload;
    const resData = await api.searchUser(word)
      .then(result => result.data)
      .catch(err => err);
    state.reportUserList = resData;
    state.loading = false;
  },
  loadSearchPost: async ({ commit }, payload) => {
    state.loading = true;
    state.searchPostList = [];
    const { word } = payload;
    const resData = await api.searchPostTitle(word)
      .then(result => result.data)
      .catch(err => err);
    state.searchPostList = resData;
    state.loading = false;
  },

  loadSearchLocalPost: async ({ commit }, payload) => {
    state.loading = true;
    state.searchLocalPostList = [];
    const { localId, userId } = payload;
    const resData = await api.loadLocalPostList(localId, state.lastId, userId)
      .then(result => result.data)
      .catch(err => err);
    state.searchLocalPostList = resData;
    state.loading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
