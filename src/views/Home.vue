<template>
  <div class="home">
    Home
    <cube-button @click="showDrawer">Show Drawer</cube-button>
    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="goods"
      :selected-index="selectedIndex"
      @change="changeHandler"
      @select="selectHandler"
      @cancel="cancelHandler"
    ></cube-drawer>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      selectedIndex: [],
      goods: [], // 所有商品列表
      drawerList: [] // 分类列表
    };
  },
  async created() {
    const res = await this.$http.get('/api/goods');
    this.goods = res.data.list;
    console.log(this.goods);
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
