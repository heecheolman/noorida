import Vue from 'vue';
import Vuesax from 'vuesax';
import Router from 'vue-router';

import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import LoginPage from './../pages/LoginPage';

Vue.use(Router);
Vue.use(Vuesax);

export default new Router({
  routes: [
    {
      path: '',
      redirect: LoginPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
  ],
});
