import timeline from './timeline';
import absoluteDate from './absolute-date';

export default {
  install(Vue) {
    Vue.filter('timeline', timeline);
    Vue.filter('absoluteDate', absoluteDate);
  },
};
