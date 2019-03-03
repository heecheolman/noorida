// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-icons/iconfont/material-icons.css';
import 'ant-design-vue/dist/antd.min.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import Antd from 'ant-design-vue';
import VeeValidate from 'vee-validate';
import Vue from 'vue';
import VueGeolocation from 'vue-browser-geolocation';
import VueVirtualScroller from 'vue-virtual-scroller';

import router from './router';
import api from './api/ApiService';
import App from './App';
import store from './store/store';
import './assets/scss/main.scss';
import filters from './filters';

Vue.config.productionTip = false;
Vue.prototype.$api = api;

Vue.use(VeeValidate);
Vue.use(Antd);
Vue.use(VueGeolocation);
Vue.use(VueVirtualScroller);
Vue.use(filters);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
