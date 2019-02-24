import timeline from './timeline';

export default {
  install(Vue) {
    Vue.filter('timeline', timeline);
  },
};
