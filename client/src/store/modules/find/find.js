import * as types from './mutation_types';
import api from '@/api/ApiService';

const state = {
  //findIdSuccess : false,
  //findNickName : null,
  foundNickName: '',

  findPassword_success: false,
  newPassword: null,
};

const getters ={
  //getFindIdSuccess : (state) => state.findIdSuccess,
  getFindNickname : (state) => state.foundNickName,

  getFindPasswordSuccess : (state) => state.findPassword_success,
  getNewPassword : (state) => state.newPassword,
};
const actions = {
  findIdProcess : async ({ commit } , payload) => {
    const { realName, email } = payload;
    const data =  await api.findId(realName , email)
      .then(result => result.data)
      .catch(err => err);

    // { nickName: 'foo', success: true }
    // { nickName: '', success: false }

    if (data.success) {
      commit(types.SET_FOUND_ID, data.nickName);
    } else {
      commit(types.SET_FOUND_ID, null);
    }
    //
    // if (!!foundNickName && !(foundNickName instanceof Error)) {
    //   commit(types.SET_FOUND_ID, foundNickName);
    // } else {
    //
    // }

      //
      // if (find_user && !(find_user instanceof Error)){
      //   commit(types.FETCH_USER, true);
      //   commit(types.NICKNAME_DATA, api.nickName);  //nickName 을 이렇게 가져오면 안될꺼같은데...?
      // }else {
      //   commit(types.FETCH_USER, false);
      //   commit(types.NICKNAME_DATA, null);
      // }
  },
  findPasswordProcess : async ({commit},payload) => {
    const {name, nickName, email} = payload;
    const find_password = await api.findPassword(name, nickName, email)
      .then(result => result.data)
      .catch(err=>err);

    if(find_password && !(find_password instanceof Error)){
     commit(types.FETCH_PASSWORD, true);
     commit(types.PASSWORD_DATA, null)///////////////
    }else{
      commit(types.FETCH_PASSWORD,false);
    }
  },
};

const mutations = {

  // [types.NICKNAME_DATA] (state, payload){
  //   state.findNickName = payload;
  // },
  [types.FETCH_PASSWORD] (state,payload) {
    state.findPassword_success = payload;
  },
  [types.SET_FOUND_ID] (state, payload) {
    state.foundNickName = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

