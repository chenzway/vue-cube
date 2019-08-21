import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setToken(state, val) {
      state.token = val;
    }
  },
  actions: {}
});

// 订阅
store.subscribe((mutation, state) => {});

export default store;
