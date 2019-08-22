<template>
  <div class="about">
    <div class="good" v-for="(v, i) in cart" :key="v.id">
      {{ v.title }}----{{ v.price }}
      <div class="right">
        <i class="cubeic-remove" @click="countMinus(i)"></i>
        <span>{{ v.cartCount }}</span>
        <i class="cubeic-add" @click="countAdd(i)"></i>
      </div>
    </div>
    <div>总价：{{ total }}</div>

    <cube-button :disabled="true" v-if="total < minTotal"> 还差{{ minTotal - total }}可以购买 </cube-button>
    <cube-button v-else>
      下单
      <span v-if="!token">
        (需要登录)
      </span>
    </cube-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      minTotal: 1000
    };
  },
  computed: {
    ...mapState({
      cart: state => state.cart,
      token: state => state.token
    }),
    ...mapGetters(['total'])
  },
  methods: {
    countAdd(index) {
      this.$store.commit('countAdd', index);
    },
    countMinus(index) {
      this.$store.commit('countMinus', index);
    }
  }
};
</script>
<style lang="stylus">
.good
  padding 10px
  text-align left
  .right
    float right
  i
    font-size 18px
</style>
