<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <HomeSwiper :banners = "banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import  {getHomeMultidata} from "network/home";

  export default {
    name: "home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
    },
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    // 使用生命周期函数，组件创建完就请求数据
    created() {
      // 1.请求多个数据.异步
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    /* 设置背景颜色*/
    background-color: var(--color-tint);
    /* 设置字体颜色*/
    color: #ffffff;
  }
</style>
