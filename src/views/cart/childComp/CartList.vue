<!--  购物车商品的列表-->
<template>
  <div class="cart-list">
     <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item, index) in cartList" :item-info = "item" :key="index" />
     </scroll>
  </div>
</template>

<script>
  
import CheckButton from 'components/content/checkButton/CheckButton'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import {mapGetters } from  'vuex'
  export default {
    name: "CartList",
    props: {
      itemInfo: Object
    },
    components: {
      CheckButton,
      CartListItem,
      Scroll,
    },
    methods: {
      checkedChange: function () {
        this.itemInfo.checked = !this.itemInfo.checked;
      }
    },
    computed: {
      ...mapGetters(['cartList'])  
    }
  }

</script>
<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .content {
    height: 100%;
  }
</style>