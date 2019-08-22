<template>
  <div class="home">
    <cube-slide ref="slide" :data="slider" @change="changePage">
      <cube-slide-item v-for="item in slider" :key="item.id" @click.native="clickHandler(item)">
        <img :src="item.img" />
      </cube-slide-item>
    </cube-slide>
    <cube-button @click="showDrawer">Show Drawer</cube-button>
    <goods-list :goods="filterGoods"></goods-list>
    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="[drawerList]"
      :selected-index="selectedKeys"
      @select="selectHandler"
    ></cube-drawer>
  </div>
</template>

<script>
import GoodsList from '@/components/GoodsList';
const mapType = {
  fe: '前端',
  python: 'Python',
  java: 'Java',
  bigdata: '大数据',
  ai: 'AI'
};
export default {
  data() {
    return {
      slider: [],
      selectedKeys: [],
      drawerList: [],
      goods: []
    };
  },
  components: {
    GoodsList
  },
  methods: {
    changePage(current) {
      console.log('当前轮播图序号为:' + current);
    },
    clickHandler(item) {
      console.log(item);
    },
    showDrawer() {
      this.$refs.drawer.show();
    },
    selectHandler(selectedVal, selectedKeys, selectedText) {
      // this.selectedKeys = selectedVal;
      console.log(selectedVal);
      console.log([...selectedVal]);
      this.selectedKeys = [...selectedVal];

      /* this.$createDialog({
        type: 'warn',
        content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedKeys.join(
          ', '
        )} <br/> - text: ${selectedText.join(' ')}`,
        icon: 'cubeic-alert'
      }).show(); */
    }
  },
  computed: {
    // 根据选择的值要组合要展示的数据
    filterGoods() {
      let ret = [];
      this.selectedKeys.forEach(v => {
        ret = ret.concat(this.goods[v]);
      });
      return ret;
    }
  },
  async created() {
    let res = await this.$http('/api/goods');
    const { slider, data, keys } = res.data;
    this.slider = slider;
    this.drawerList = keys.map(v => {
      return { text: mapType[v], value: v };
    });
    this.goods = data;
    this.selectedKeys = keys;
  }
};
</script>

<style lang="stylus" scoped>
.home
  height 100%
  .cube-slide
    width 100%
    height 590px
</style>
