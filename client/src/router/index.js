import Vue from 'vue';
import Vuesax from 'vuesax';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

Vue.use(Router);
Vue.use(Vuesax);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
