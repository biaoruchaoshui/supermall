<template>
    <div class="cart">
      <!-- 顶部的导航栏 -->
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <!-- 商品的列表 -->
      <cart-list/>
      <!-- 底部汇总 -->
      <bottom-bar/>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {mapGetters } from  'vuex'
  import CartList from './childComp/CartList'
  import BottomBar from './childComp/BottomBar'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      BottomBar,
    },
    computed: {
      // 两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength',
      })
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
  }
</style>
