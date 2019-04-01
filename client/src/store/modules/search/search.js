import api from '@/api/ApiService';

const state = {
  loading: false,
  localList: [],
  reportUserList: [],
  searchPostList: [],
  tempSubName: '',
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
    // resData.forEach((value, index) => {
    //   const tempBefore = value.localName;
    //   state.tempSplitName = tempBefore.split(' ');
    //   state.localList[index] = resDate[index];
    // }); ㅋㅋㅋ실패...
  },
  loadUserData: async ({ commit }, payload) => {
    state.loading = true;
    state.reportUserList = [];
    const { word } = payload;
    const resData = await api.searchUser(word)
      .then(result => result.data)
      .catch(err => err);
    state.reportUserList = resData;
    // console.log('userId', resData.userId, 'userNickName', resData.nickName, '아바타 ', resData.avatar);
    console.log('유저의 리스트!!', resData);
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
    console.log('포스트 리스트!', resData);
    state.loading = false;
  },

  // searchProcess: async ({ commit }, payload) => {
  //   const { searchContent, userId } = payload;
  //   const data = await api.search(searchContent, userId)
  //     .then(result => result.data)
  //     .catch(err => err);
  // },


  // searchProcess: async ({ commit }, payload) => {
  //   const { searchContent, userId } = payload;
  //   state.severSearchContent = searchContent;
  //   state.severUserId = userId;
  // },

  // loadLocalData: async ({ commit, state }, payload) => {
  //   state.loading = true;
  //   // const resData = await api.loadLocalPostList(payload, state.lastId)
  //   //   .then(results => results.data)
  //   //   .catch(err => err);
  //
  //   // if (!resData.result) {
  //   //   resData.result = [];
  //   // }
  //   // console.log(resData.result);
  //   // if (resData.result.length) {
  //   //   commit(types.FETCH_POST_LIST, resData.result);
  //   //   commit(types.UPDATE_LAST_ID, resData.lastId);
  //   //   state.hasNextPost = resData.hasNextPost;
  //   // } else {
  //   //   state.busy = true;
  //   // }
  //   state.localNameList.forEach(function (item) {
  //     if (item.id === payload) {
  //       commit(LOCAL_NAME, item.localName);
  //       return;
  //     }
  //   });
  //
  //   state.loading = false;
  // },
// }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
