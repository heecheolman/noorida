import Vue from 'vue';
import Router from 'vue-router';

/*  Pages  */
import LoginPage from './../pages/LoginPage';
import JoinPage from './../pages/JoinPage';
import MainPage from '../pages/MainPage';
import FindIdPage from '../pages/FindIdPage';
import FindPasswordPage from '../pages/FindPasswordPage';


/*  Tabs  */
import LocalNewsTab from './../pages/tabs/local-news-tab/LocalNewsTab';
import SubscribeNewsTab from './../pages/tabs/subscribe-news-tab/SubscribeNewsTab';
import HotNewsTab from './../pages/tabs/hot-news-tab/HotNewsTab';

import store from './../store/store';

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  if (store.getters['login/getLoginSuccess']) {
    next();
  } else {
    next({ name: 'LoginPage' });
  }
};

export default new Router({
  routes: [
    {
      path: '',
      // redirect: LoginPage,
      redirect: MainPage,
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
      path: '/find-id',
      name: 'FindIdPage',
      component: FindIdPage,
    },
    {
      path: '/find-password',
      name: 'FindPasswordPage',
      component: FindPasswordPage,
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage,
      // beforeEnter: requireAuth(),
      children: [
        { path: 'local', name: 'LocalNewsTab', component: LocalNewsTab },
        { path: 'subscribe', name: 'SubscribeNewsTab', component: SubscribeNewsTab },
        { path: 'hot', name: 'HotNewsTab', component: HotNewsTab },
      ],
    },
    {
      path: '*',
      redirect: LoginPage,
    },
  ],
});
