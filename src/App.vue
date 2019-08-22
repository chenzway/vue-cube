<template>
  <div id="app">
    <cube-tab-bar v-model="selectedLabelSlots" show-slider inline @click="clickHandler">
      <cube-tab v-for="(item, index) in tabs" :label="item.url" :key="item.label">
        <!-- name为icon的插槽 -->
        <i slot="icon" :class="item.icon"></i>
        <!-- 默认插槽 -->
        {{ item.label }}
        <span class="badge" v-if="showBadge(item.label)">{{ cartTotal }}</span>
      </cube-tab>
    </cube-tab-bar>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedLabelSlots: '/',
      tabs: [
        {
          label: 'Home',
          icon: 'cubeic-home',
          url: '/'
        },
        {
          label: 'Cart',
          icon: 'cubeic-mall',
          url: '/cart'
        },
        {
          label: 'User',
          icon: 'cubeic-person',
          url: '/login'
        }
      ]
    };
  },
  watch: {
    $route: {
      handler(route) {
        //component: () => import('./views/Login.vue') 才会触发
        // component: component 下不会route不会给 watch 到
        this.selectedLabelSlots = route.path;
      }
    }
  },
  computed: {
    ...mapGetters(['cartTotal'])
  },
  methods: {
    clickHandler(label) {
      this.$router.push({ path: `${label}` });
    },
    showBadge(label) {
      return label == 'Cart' && this.cartTotal > 0;
    }
  }
};
</script>

<style lang="stylus" scoped>
.cube-tab-bar
  position fixed
  bottom 0
  width 100%
  height 2rem
  background #efefef
  span.badge
    display inline-block
    background #de3529
    color white
    width 1rem
    height 1rem
    border-radius 50%
</style>
