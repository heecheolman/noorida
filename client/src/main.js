// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-icons/iconfont/material-icons.css';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import VeeValidate from 'vee-validate';
import Vue from 'vue';
import axios from 'axios';
import VueGeolocation from 'vue-browser-geolocation';

import router from './router';
import api from './api/ApiService';
import App from './App';
import store from './store/store';
import './assets/scss/main.scss';


Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$http = axios;

Vue.use(VeeValidate);
Vue.use(Antd);
Vue.use(VueGeolocation);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
