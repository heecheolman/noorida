import * as types from './mutation_types';
import api from './../../../api/ApiService';

const state = {
  user: {},
  committed: false,
  location: {
    lat: 0,
    lng: 0,
    address: '',
    placeId: '',
  },
};

const getters = {
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
};

const mutations = {
  [types.FETCH_USER_DATA](state, payload) {
    state.user = payload;
  },
  [types.INIT_USER_DATA](state) {
    state.user = {};
    state.location = {
      lat: 0,
      lng: 0,
      address: '',
      placeId: '',
    };
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
  [types.UPDATE_USER_DESCRIPTION](state, payload) {
    state.user.description = payload;
  },
  [types.UPDATE_PROFILE_IMAGE_SRC](state, payload) {
    state.user.avatar = payload;
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

  async updateDescription({ commit, state }, payload) {
    state.committed = false;
    const result = await api.updateDescription(state.user.userId, payload)
      .then(results => results.data)
      .catch(err => err);
    if (result === 'ok') {
      commit(types.UPDATE_USER_DESCRIPTION, payload);
      state.committed = true;
    }
  },

  async updateProfileImage({ commit }, payload) {
    const { formData, nickName, userId } = payload;
    const resData = await api.uploadImage(formData, nickName)
      .then(result => result.data)
      .catch(err => err);
    if (resData) {
      commit(types.UPDATE_PROFILE_IMAGE_SRC, resData);
      await api.updateProfileImage(userId, resData)
        .then(result => result.data)
        .catch(err => err);
    }
  },

  async changeDefaultProfile({ commit }, payload) {
    const { userId } = payload;
    await api.updateProfileImage(userId, null)
      .then(result => result.data)
      .catch(err => err);
    commit(types.UPDATE_PROFILE_IMAGE_SRC, null);
  },

  async blockUserProcess(payload) {
    const { myUserId, targetUserId } = payload;
    await api.blockUser(myUserId, targetUserId)
      .then(result => result.data)
      .catch(err => err);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
