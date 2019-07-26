<template>
  <div id="app">
    <v-header :seller="seller"></v-header>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" class="list" active-class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="list" active-class="active">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller" class="list" active-class="active">商家</router-link>
      </div>
    </div>

    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
export default {
  name: 'App',
  data () {
    return {
      seller: ''
    }
  },
  methods: {
  },
  created () {
    this.$axios
      .get('/seller')
      .then(v => {
        this.seller = v.data.data
      })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="less" scoped>
@import './assets/style/style.less';
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  // border-bottom: 1px solid rgba(7,17,27,.1);
  .border-px(rgba(7,17,27,.1));
  .tab-item {
    flex: 1;
    text-align: center;
    .list {
      width: 100%;
      display: block;
      text-decoration: none;
    }
    .active{
      color: rgb(240,20,20);
      // text-decoration: none;
    }
  }
}

</style>
