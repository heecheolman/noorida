import * as types from './mutation_types';
import api from '@/api/ApiService';

const state = {
  login: false,
  user: null,
  location: {
    lat: '',
    lng: '',
  },
  address: '',
  placeId: '',
};

const mutations = {
  [types.LOGIN](state, payload) {
    state.login = payload;
  },
  [types.FETCH_USER_DATA](state, user) {
    state.user = user;
  },
  [types.INIT_LOGIN_DATA](state) {
    state.login = false;
    state.user = {};
  },
  [types.FETCH_LOCATION](state, payload) {
    state.location.lat = payload.lat;
    state.location.lng = payload.lng;
  },
  [types.SET_ADDRESS](state, payload) {
    state.address = payload;
  },
  [types.SET_PLACE_ID](state, payload) {
    state.placeId = payload;
  },
};

const getters = {
  getLoginSuccess: state => state.login && !!state.user,
  getUserData: state => state.user,
};

const actions = {
  loginProcess: async ({ commit }, payload) => {
    const { nickName, password } = payload;
    const user = await api.login(nickName, password)
      .then(result => result.data)
      .catch(err => err);

    if (user && !(user instanceof Error)) {
      commit(types.FETCH_USER_DATA, user);
      commit(types.LOGIN, true);
    } else {
      commit(types.FETCH_USER_DATA, null);
      commit(types.LOGIN, false);
    }
  },
  initLoginData: ({ commit }) => {
    commit(types.INIT_LOGIN_DATA);
  },
  fetchUserLocation: async ({ commit }) => {
    const data = await api.getLocation()
      .then(result => result.data)
      .catch(err => err);

    // 임시 데이터
    // console.log('login vuex location', data.location);
    // const location = {
    //   lat: 37.6689979,
    //   lng: 127.05075719999999,
    // };
    commit(types.FETCH_LOCATION, data.location);
  },
  fetchParsedLocalName: async ({ commit }) => {
    const location = state.location;
    const data = await api.getParsedLocalName(location.lat, location.lng)
      .then(result => result.data)
      .catch(err => err);

    const localMeta = data.results.filter(local =>
      local.types.indexOf('political') !== -1 &&
      local.types.indexOf('sublocality_level_1') !== -1)[0];

    commit(types.SET_ADDRESS, localMeta.formatted_address);
    commit(types.SET_PLACE_ID, localMeta.place_id);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
