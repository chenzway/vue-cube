<template>
  <div class="home">
    <cube-slide ref="slide" :data="slider" :interval="5000">
      <cube-slide-item v-for="item in slider" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" class="slider" />
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <!-- <cube-button @click="showDrawer">Show Drawer</cube-button>
    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="goods"
      :selected-index="selectedIndex"
      @change="changeHandler"
      @select="selectHandler"
      @cancel="cancelHandler"
    ></cube-drawer>-->
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      selectedIndex: [],
      goods: [], // 所有商品列表
      drawerList: [], // 分类列表
      slider: []
    };
  },
  async created() {
    const res = await this.$http.get('/api/goods');
    this.slider = res.data.slider;
    console.log(this.slider);
  },
  methods: {
    showDrawer() {
      this.$refs.drawer.show();
    },
    changeHandler() {},
    selectHandler() {},
    cancelHandler() {}
  }
};
</script>

<style scoped>
.cube-slide {
  height: auto;
}
.cube-slide-item > a > img {
  width: 100%;
}
</style>
