import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import History from './utils/history';

Vue.use(Router);
Vue.use(History);

// 实例化之前，在原型上扩展Router，让 Header 组件中调用 
Router.prototype.goBack = function() {
  this.isBack = true;
  this.back();
};

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

// 记录历史记录在自己维护的堆栈中
router.afterEach(to => {
  if (router.isBack) {
    History.pop();
    router.isBack = false;
    // 用于过渡动画效果
    router.transitionName = 'route-back';
  } else {
    History.push(to.path);
    router.transitionName = 'route-forward';
  }
});

export default router;
