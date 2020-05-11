<!-- 商品详情页视图 -->
<template>
  <div id="detail" name = "detail">
    <detail-nav-bar class="detail-nav" @titleClick = "titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type = "3" @scroll = "contentScroll">
        <detail-swiper :top-images = "topImages" />
        <detail-base-info :goods = "goods"/>
        <detail-shop-info :shop = "shop"/>
        <detail-goods-info :detail-info = "detailInfo" @imageLoad = "imageLoad"/>
        <detail-param-info ref="param" :param-info = "paramInfo"/>
        <detail-comment-info ref="comment" :comment-info = "commentInfo"/>
        <goods-list ref="recommend" :goods = "recommends"/>
    </scroll>
     <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart = "addToCart"/>
  </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import {getDetail,getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'
    import {itemListenerMixin, backTopMixin} from 'common/mixin';
    import {debounce} from "common/utils";

    export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin],
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
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
        }
    },

    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
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
        // 4.给getThemeTopY赋值
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE)
        },100)

    },
    mounted() {

    },
    destoryed() {
        this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
            this.getThemeTopY()
        },
        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
        },
        contentScroll(position) {
            // 1.获取y值
            const positionY = -position.y;
            let length = this.themeTopYs.length;
            for(let i = 0; i < length -1; i++){
                if(this.currentIndex != i &&  positionY >= this.themeTopYs[i] && 
                positionY < this.themeTopYs[i + 1]){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }
            // 3.是否显示回到顶部
            this.listenShoBackTop(position)
        },
        addToCart() {
            // 1.获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.newPrice = this.goods.nowPrice;
            product.iid = this.iid;
            // 2.将商品添加到购物车里
            // 提价到mutations
            // this.$store.commit('addCart', product)
            // 提交到actions
            this.$store.dispatch('addCart', product)
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