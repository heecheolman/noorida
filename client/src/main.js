// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Antd from 'ant-design-vue';
import 'material-icons/iconfont/material-icons.css';
import 'ant-design-vue/dist/antd.css';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import Vue from 'vue';

import App from './App';
import router from './router';
import './assets/scss/main.scss';
import api from './api/ApiService';
import store from './store/store';


Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

Vue.use(VeeValidate);
Vue.use(Antd);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
