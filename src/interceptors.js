import axios from 'axios';
import router from './router';
import store from './store';

// 请求拦截， 主要是添加通用的参数 token
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.token = store.state.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截，主要是判断 token 来判断用户是否登录
axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      const data = response.data;
      if (data.code == -1) {
        clearHandler();
      }
    }
    return response;
  },
  error => {
    // Do something with response error
    if (error.response.status === 401) {
      // 未授权
      clearHandler();
    }
    return Promise.reject(error);
  }
);

function clearHandler() {
  // 清空缓存
  store.commit('setToken', '');
  localStorage.removeItem('token');

  // 跳转至登录页
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.path
    }
  });
}
