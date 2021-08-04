<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref='detailNav'></detail-nav-bar>

    
    <scroll class="content" ref="detailscroll" :probeType='3'  @scroll='contentScroll'>
     
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods="detailgoods"></detail-base-info>
      <detail-shop-info :shop='detailshop'></detail-shop-info>
      <detail-goods-info :detailinfo="detailinfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paraminfo='paraminfo' ref="param"></detail-param-info>
      <detail-comment-info :commentinfo="commentinfo" ref="comment"></detail-comment-info>
      <goods-list :goods='recommends' ref="goods"></goods-list>

    </scroll>
    <back-up @click="DUpClick" v-show="isShowBackUp" class="DBackUp"></back-up>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    
    <!-- 这里不加引号，是因为要将字符串传递过去，而不是一个变量 -->
    <pop-up :message='message' :isShow='isShow'></pop-up>
  </div>
</template>

<script>
// 引入详情页的顶部导航栏
import DetailNavBar from './childComponents/DetailNavBar.vue'
// 引入轮播图组件
import DetailSwiper from './childComponents/DetailSwiper.vue'
// 引入商品具体信息
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
// 引入商家信息
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
// 引入商品具体信息
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
// 引入商品参数信息
import DetailParamInfo from './childComponents/DetailParamInfo.vue'
// 引入评论信息
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
// 引入底部导航栏
import DetailBottomBar from './childComponents/DetailBottomBar.vue'

// 引入BetterScroll
import Scroll from '../../components/common/scroll/BScroll.vue'
// 引入商品展示列表，直接复用goodsList组件
import GoodsList from '../../components/content/goods/GoodsList.vue'
// 引入返回顶部按钮
import BackUp from '../../components/content/backup/BackUp.vue'
// 引入toast弹窗
import PopUp from '../../components/common/toast/PopUp.vue'

// 引入网络数据的请求
import {getDetail,DetailGoods,Shop,GoodsParam,getRecommend} from '../../network/detail'
// 引入封装好的工具，防抖函数
import {debounce} from '../../common/utils'

export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackUp,
    PopUp,

  },
  data(){
    return {
      iid:null,
      topImages:[],
      detailgoods:{},
      detailshop:{},
      detailinfo:{},
      paraminfo:{},
      commentinfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopYs:null,
      currentIndex:0,
      isShowBackUp:false,
      message:'',
      isShow:false,
    }
  },
  created(){
    
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid来请求详情数据
      getDetail(this.iid).then(res => {
        
        console.log(res);
        this.topImages = res.data.result.itemInfo.topImages
        
        // 3.获取详情页中的商品信息
        this.detailgoods = new DetailGoods(res.data.result)
        
        // 4.获取详情页中的店铺信息
        this.detailshop = new Shop(res.data.result.shopInfo)
        
        // 5.获取商品的详细信息
        this.detailinfo = res.data.result.detailInfo

        // 6.获取商品的参数信息
        this.paraminfo = new GoodsParam(res.data.result.itemParams.info,res.data.result.itemParams.rule)

        // 7.获取评论信息
        if(res.data.result.rate.cRate !== 0){
        this.commentinfo = res.data.result.rate.list[0]}

        // 8.设置一个函数，$nextTick() 的作用就是等到前面的DOM渲染完毕在执行回调函数
        // 所以，我们可以把请求各个部分的高度高度，放在这个函数中
        /*this.$nextTick(() => {
           // 1.获取各个部分的offsetTop，好让顶部导航栏可以直接滚到对应的部分
          this.themeTopYs = [];

          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.goods.$el.offsetTop);

          console.log(this.themeTopYs)
          这个时候获取的值是不对的，那是因为，只获取到了渲染好之后的DOM
            而没有获取到还没加载好的图片
        })*/


      })

      // 3.根据iid来请求推荐数据（这个数据在另一个接口）
      getRecommend(this.iid).then(res => {
        console.log(res);
        this.recommends = res.data.data.list
      })

      // 4.使用防抖函数来包裹住频繁请求offset的代码
      this.getThemeTopYs = debounce(() => {
        // 1.获取各个部分的offsetTop，好让顶部导航栏可以直接滚到对应的部分
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.goods.$el.offsetTop);

        console.log(this.themeTopYs)
      })
  },
  

  methods: {
    imageLoad(){
      // 1.这里是每次图片加载就刷新一下，确保scroll的高度正确
      this.$refs.detailscroll.scroll.refresh();
      
      // 2.这里是用防抖函数包裹住的，请求offset的代码
      this.getThemeTopYs();
      console.log('11111')
    },

    // 监听导航标题的点击
    titleClick(index){
      this.$refs.detailscroll.scroll.scrollTo(0,-this.themeTopYs[index],100)
      // console.log(this.themeTopYs);
    },

    // 监听返回顶部按钮的点击
    DUpClick(){
      this.$refs.detailscroll.scroll.scrollTo(0,0,300);
    },

    // 监听内容的滚动
    contentScroll(position){
      // 1.获取滚动的高度
      let positionY = -position.y;
      // 2.定义一下数组的长度
      let length = this.themeTopYs.length;

      // 3.positionY和导航标题中的值进行对比
    
      // 4.这里是遍历获取index,从而进行导航和内容滚动高度的匹配
      for(let i in this.themeTopYs){
        i = i * 1;
        // 首先判断currentIndex和现在的遍历到的index是否相同
        // 不然，每次一滚动，就会来这里循环，所以，先在这里卡住
        if(this.currentIndex !== i){
          // 这里第一个条件是判断是不是最后一个，
          // 因为最后一个的话，
          // 再次index+1，就找不到了
          if(i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex;
          }else if(positionY >= this.themeTopYs[i]){
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex;
          }
        }
      } ;

      // 5.判断返回顶部按钮是否需要显示
      this.isShowBackUp = (-position.y) > 1000;
    },

    // 监听添加购物车的点击事件
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.detailgoods.title;
      product.desc = this.detailgoods.desc;
      product.price = this.detailgoods.newPrice;
      product.iid = this.iid;
      // product.count = null;

      
      //2. 将商品添加到购物车里面，并返回对应的成功信息
      // this.$store.commit('addCart',product)
      // 这里是将对象提交到Vuex里面的action
      // dispath就是相当于commit，只不过一个是提交到mutations
      // 一个是提交到actions
      this.$store.dispatch('addCart',product).then(res => {
        this.isShow = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = ''
        },1500)
        // this.$toast.show(res,2000)
      })

      // console.log(this.$store.state.cartList[0].count)
      // console.log(this.$store.state.cartList.length)

      // 
    }
  },
  
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: white;
    /* 这里必须设置一下，要不然下面的子元素继承父元素的高度 */
    /* 成为自适应 */
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    /* top: 0;
    left: 0;
    right: 0; */
    z-index: 9;
    background-color: white;
  }
  #detail .content{
    height: calc(100% - 44px - 49px);
    
  }

  .DBackUp{
    right: 15px;
    bottom: 50px;
  }
</style>