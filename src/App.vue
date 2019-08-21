<template>
  <div id="app">
    <cube-tab-bar v-model="selectedLabelSlots" show-slider inline @click="clickHandler">
      <cube-tab v-for="(item, index) in tabs" :label="item.url" :key="item.label">
        <!-- name为icon的插槽 -->
        <i slot="icon" :class="item.icon"></i>
        <!-- 默认插槽 -->
        {{ item.label }}
      </cube-tab>
    </cube-tab-bar>
    <router-view />
  </div>
</template>

<script>
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
          url: '/about'
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
  methods: {
    clickHandler(label) {
      this.$router.push({ path: `${label}` });
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
</style>
