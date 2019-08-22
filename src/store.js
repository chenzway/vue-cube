import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setToken(state, val) {
      state.token = val;
    },
    addCart(state, item) {
      const good = state.cart.find(v => v.id === item.id);
      if (good) {
        good.cartCount += 1;
      } else {
        state.cart.push({
          ...item,
          cartCount: 1
        });
      }
    },
    countAdd(state, index) {
      state.cart[index].cartCount += 1;
    },
    countMinus(state, index) {
      const item = state.cart[index];
      if (item.cartCount > 1) {
        item.cartCount -= 1;
      } else {
        state.cart.splice(index, 1);
      }
    }
  },
  actions: {},
  getters: {
    cartTotal: state =>
      state.cart.reduce((total, val) => {
        return total + val.cartCount;
      }, 0),
    total: state =>
      state.cart.reduce((total, val) => {
        return (total += val.price * val.cartCount);
      }, 0)
  }
});

// 订阅store变化
store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case 'setToken':
      localStorage.setItem('token', JSON.stringify(state.token));
      break;
    case 'addCart':
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
  }
});

export default store;
