// import * as types from './mutation_types';
import api from '@/api/ApiService';

const state = {
  severSearchContent: '',
  severUserId: '',
  reportUserList: [
    { id: 1, reportNickname: 'joeminji' },
    { id: 2, reportNickname: 'joyunji' },
    { id: 3, reportNickname: 'hahahahaha' },
    { id: 4, reportNickname: 'gnglgllglglg' },
  ],
  localNameList: [
    { id: 1, localName: '직산읍' },
    { id: 2, localName: '성환읍' },
    { id: 3, localName: '강남' },
    { id: 4, localName: '백사면' },
    { id: 5, localName: '두정동' },
  ],
};
// export const LOCAL_NAME = '';
const getters = {
};
const mutations = {
};

const actions = {
  // searchProcess: async ({ commit }, payload) => {
  //   const { searchContent, userId } = payload;
  //   const data = await api.search(searchContent, userId)
  //     .then(result => result.data)
  //     .catch(err => err);
  // },
  searchProcess: async ({ commit }, payload) => {
    const { searchContent, userId } = payload;
    state.severSearchContent = searchContent;
    state.severUserId = userId;
  },
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
