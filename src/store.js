import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {},
  getters: {
    isLogin: state => {
      // 转为 bool 值
      return !!state.token;
    }
  }
});
