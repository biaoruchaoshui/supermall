<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot  name="item-icon-active"></slot></div>
<!--    <div :class="{active:isActive}">-->
<!--      <slot name="item-text"></slot>-->
<!--    </div>-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
<!--    <img src="../../assets/img/tabbar/shopcart.svg">-->
<!--    <div>购物车</div>-->
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      // 这里每一个TabBarItem都有自己的path路径
      path: String,
      activeColor: {
        type: String,
        default: 'red',
      }
    },
    data() {
      return {
        // isActive: true,
      }
    },
    computed: {
      isActive() {
        // 判断当前处于活跃的路由跟那个TabBarItem里面的path相同，即求下标是否存在
        return this.$route.path.indexOf(this.path) != -1
      },
      activeStyle() {
        return this.isActive? {color: this.activeColor}: {}
      },
    },
    methods: {
      itemClick() {
         this.$router.replace(this.path).catch(()=>{})
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    /* 距离顶部的距离*/
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
  /*.active{*/
  /*  color: red;*/
  /*}*/
</style>
