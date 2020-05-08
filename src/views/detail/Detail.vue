<!-- 商品详情页视图 -->
<template>
  <div id="detail" name = "detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
         <detail-swiper :top-images = "topImages" />
        <detail-base-info :goods = "goods"/>
        <detail-shop-info :shop = "shop"/>
        <detail-goods-info :detail-info = "detailInfo" @imageLoad = "imageLoad"/>
        <detail-param-info :param-info = "paramInfo"/>
        <detail-common-info :comment-info = "commentInfo"/>
        <goods-list :goods = "recommends"/>
    </scroll>
  </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommonInfo from './childComps/DetailCommentInfo'

    import {getDetail,getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'

    export default {
    name: "Detail",
    data () {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
        }
    },

    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommonInfo,
        GoodsList,
        Scroll,
    },

    computed: {},
    
    created() {
        // 1，保存传入的iid
        this.iid = this.$route.params.iid 
        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            const data = res.result
            // 1.获取顶部的图片轮播数据
            this.topImages = data.itemInfo.topImages
            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 3.创建店铺信息对象
            this.shop = new Shop(data.shopInfo)
            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo;
            // 5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            // 6.取出评论信息
            if (data.rate.list) {
               this.commentInfo = data.rate.list[0];
            }
        })
        // 3.获取推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })
    },
    mounted() {},

    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
        }
    },
}

</script>
<style scoped>
   #detail {
       position: relative;
       z-index: 9;
       background-color: #ffffff;
       /* 跟视图高度一致 */
       height: 100vh;
   }
   .content {
       height: calc(100% - 44px);
       background: #ffffff;
   }
   .detail-nav {
       z-index: 9;
       background: #ffffff;
       position: relative;
   }
</style>