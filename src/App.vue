<template>
  <div id="app">
    <transition name="route-move">
      <router-view class="child-view" />
    </transition>

    <cube-tab-bar v-model="selectedLabelDefault" show-slider inline @click="clickHandler">
      <cube-tab v-for="item in tabs" :label="item.label" :key="item.label" :value="item.action">
        <!-- name为icon的插槽 -->
        <i slot="icon" :class="item.icon"></i>
        <!-- 默认插槽 -->
        {{ item.label }}
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedLabelDefault: '/',
      tabs: [
        {
          label: 'Home',
          icon: 'cubeic-home',
          action: '/'
        },
        {
          label: 'Cart',
          icon: 'cubeic-mall',
          action: '/about'
        },
        {
          label: 'Me',
          icon: 'cubeic-person ',
          action: '/login'
        }
      ]
    };
  },
  watch: {
    $route(route) {
      this.selectedLabelDefault = route.path;
    }
  },
  methods: {
    logout() {
      this.$http.get('/api/logout').then(res => {
        const { code } = res.data;
        console.log(code);
      });
    },
    clickHandler(action) {
      this.$router.push({ path: `${action}` });
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
};
</script>

<style lang="stylus">
#app
  /* 页面滑动动画 */
  /* 入场前 */
  .route-move-enter
    transform translate3d(-100%, 0, 0)
  /* 出场后 */
  .route-move-leave-to
    transform translate3d(100%, 0, 0)
  .route-move-enter-active, .route-move-leave-active
    transition transform 0.3s
  .child-view
    position absolute
    left 0
    top 0
    width 100%
    padding-bottom 36px
  .cube-toolbar
    bottom 0
    width 100%
    left 0
    right 0
    .cube-toolbar-item .cube-btn
      font-size 0.42rem
  .cube-tab-bar
    position fixed
    bottom 0
    width 100%
    background #efefef
</style>
