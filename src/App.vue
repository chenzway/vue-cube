<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" />
    </transition>

    <cube-tab-bar v-model="selectedLabelSlots" show-slider inline @click="clickHandler">
      <cube-tab v-for="(item, index) in tabs" :label="item.url" :key="item.label">
        <!-- name为icon的插槽 -->
        <i slot="icon" :class="item.icon"></i>
        <!-- 默认插槽 -->
        {{ item.label }}
        <span class="badge" v-if="showBadge(item.label)">{{ cartTotal }}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedLabelSlots: '/',
      transitionName: 'route-forward',
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

        this.transitionName = this.$router.transitionName;
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
// 动画过渡时
.route-forward-enter-active, .route-forward-leave-active, .route-back-enter-active, .route-back-leave-active
  transition transform 0.3s
// 进场后
.route-forward-enter
  transform translate3d(-100%, 0, 0)
.route-back-enter
  transform translate3d(100%, 0, 0)
// 出场后
.route-forward-leave-to
  transform translate3d(100%, 0, 0)
.route-back-leave-to
  transform translate3d(-100%, 0, 0)
// 整合元素在过渡时的样式问题
.child-view
  position absolute // 绝对定位，修改在过渡时前一个元素的样式还占用高度的问题
  left 0
  top 0
  width 100%
  padding-bottom 36px // 修改覆盖底部菜单栏
</style>
