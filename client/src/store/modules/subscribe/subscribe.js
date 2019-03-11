import api from '@/api/ApiService';
// import * as types from './mutation_types';

const state = {
  reader: '',
  reporter: '',
};
const getters = {

};

const actions = {

  async subscribeProcess({ commit }, payload) {
    console.log('payload', payload);
    const { reader, reporter } = payload;
    await api.cancelSubscriptionReporter(reader, reporter)
      .then(results => results)
      .catch(err => err);
  },
};
const mutations = {

};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
