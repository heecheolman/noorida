import * as types from './mutation_types';
import api from './../../../api/ApiService';

const state = {
  user: {},
  location: {
    lat: 0,
    lng: 0,
    address: '',
    placeId: '',
  },
};

const getters = {
  userId: state => state.user.userId,
};

const mutations = {
  [types.FETCH_USER_DATA](state, payload) {
    state.user = payload;
  },
  [types.UPDATE_USER_LOCATION](state, payload) {
    state.location = payload;
  },
  [types.UPDATE_ADDRESS](state, payload) {
    state.location.address = payload;
  },
  [types.UPDATE_PLACE_ID](state, payload) {
    state.location.placeId = payload;
  },
};

const actions = {
  async updateLocation({ commit, state }) {
    const geoLocationData = await api.getLocation()
      .then(result => result.data)
      .catch(err => err);

    commit(types.UPDATE_USER_LOCATION, geoLocationData.location);

    const geoCodingData = await api.getParsedLocalName(state.location.lat, state.location.lng)
      .then(result => result.data)
      .catch(err => err);

    const filteredLocal = geoCodingData.results.filter(local => local.types.indexOf('postal_code') !== -1);

    if (filteredLocal.length) {
      commit(types.UPDATE_ADDRESS, filteredLocal[0].formatted_address);
      commit(types.UPDATE_PLACE_ID, filteredLocal[0].place_id);
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
