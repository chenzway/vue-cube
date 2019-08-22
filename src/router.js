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
      meta: {
        auth: true
      },
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        auth: true
      }, // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Cart.vue')
    }
  ]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 根据 meta.auth 中判断路由是不是要做权限守卫
  if (to.meta.auth) {
    if (store.state.token) {
      next();
    } else {
      // 重定向
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
