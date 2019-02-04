import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from './../pages/LoginPage';
import JoinPage from './../pages/JoinPage';
import MainPage from '../pages/MainPage';

import store from './../store/store';

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  if (store.getters.getLoginStatus) {
    next();
  } else {
    next({ name: 'LoginPage' });
  }
};

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
    {
      path: '/join',
      name: 'JoinPage',
      component: JoinPage,
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage,
      beforeEnter: requireAuth(),
    },
    {
      path: '*',
      redirect: LoginPage,
    },
  ],
});
