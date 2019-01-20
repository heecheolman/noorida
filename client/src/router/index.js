import Vue from 'vue';
import Vuesax from 'vuesax';
import Router from 'vue-router';

import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

import LoginPage from './../pages/LoginPage';

Vue.use(Router);
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#5b3cc4',
      success: 'rgb(23, 201, 100)',
      danger: 'rgb(242, 19, 93)',
      warning: 'rgb(255, 130, 0)',
      dark: 'rgb(36, 33, 69)',
    },
  },
});

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
