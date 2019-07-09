/*
 * File Created: 2019-07-09 11:11:33, Tuesday
 * Author: chenzway
 * Email:  599031437@qq.com
 * -----
 */

import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home'),
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      // 自定义属性，标记是否要验证登录
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }
      });
    }
  } else {
    next();
  }
});

export default router;
