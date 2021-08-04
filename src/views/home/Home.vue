<template>
  <div id="home">
    <navbar class="home-nav">
      <template v-slot:center>购物街</template>
    </navbar>
    <tab-control :title="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl1"
                  class="SecondTab" v-show="isTabFixed"></tab-control>
    <b-scroll class="content" ref="scroll" :probeType='3' @scroll='contentScroll' 
              :pull-up-load='true' @pullingUp = 'loadMore'>
      <home-swiper :banner='banner' @swipperImageLoad='swipperImageLoad' ></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </b-scroll>

    <back-up @click.native = 'backClick' v-show="isShowBackUp"></back-up>
    
  </div>
</template>

<script>
  // 引入顶部导航栏
  import navbar from '../../components/common/navbar/NavBar.vue'
  // 引入选项卡控制板块
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  // 引入商品信息显示模块
  import GoodsList from '../../components/content/goods/GoodsList.vue'
  // 引入封装好的滚动插件：BetterScroll
  import BScroll from '../../components/common/scroll/BScroll.vue' 
  // 引入返回顶部按钮
  import BackUp from '../../components/content/backup/BackUp.vue'

  // 导入轮播图
  import homeSwiper from './childComponents/homeSwiper.vue'
  // 引入轮播图下的推荐板块
  import RecommendView from './childComponents/RecommendView.vue'
  // 引入推荐板块下的本周流行板块
  import FeatureView from './childComponents/FeatureView.vue'
  
  
  // 引入首页的网络请求封装
  // 这里之所以使用大括号，是因为export暴露的时候，并不是default
  import {getHomeMultidata, getHomeGoods} from '../../network/home.js'
  
export default {
  name:"Home",
  components:{
    navbar,
    homeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
    BackUp,
  },
  data(){
    return{
      banner:[],
      recommends:[],
      goods: {
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      // 默认传入
      currentType:'pop',
      isShowBackUp:false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0,
    }
  },
  // 这里使用生命周期函数
  created(){

    // 1.调用methods里的第一个方法
    this.getHomeMultidata();
    // 2.调用methods里的第二个方法
    // 这里是为三个TabControl分别请求的三个后台商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    // 3.监听 GoodsItem里面的照片加载事件
    // 这里本来没有 $bus 需要在main.js中进行定义
    // this.$bus.$on('itemImageLoad',() => {
    //   console.log('111');
    // })
  },

  // 这里只是小小的判断一下首页在切换的时候，有没有被摧毁
  destroyed() {
    console.log('手也被摧毁了')
  },
  // 下面两个是判断是否离开了当前页面
  activated(){
    // 当进入当前页面的时候，滚动到saveY处
    // x距离，y距离，滚动时间
    setTimeout(() => {
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.scroll.refresh();
      
    }, 30);


  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y

    
  },
  methods:{
    /**
     * 事件监听相关的方法
     */
    // 1.监听商品数据请求的不同按钮
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 2.监听返回顶部按钮
    backClick(){
      this.$refs.scroll.scroll.scrollTo(0,0,300)
    },
    // 3.子传父，监听获取滚动高度
    contentScroll(position){
      // 1.来确定是否显示backup返回顶部按钮
      this.isShowBackUp = (-position.y) > 1000
      // 2.来决定是否改变TabControl的样式，使其吸顶
      // 这里我们又保存了一个变量用来判断是否需要进行吸顶操作
      this.isTabFixed = (-position.y) > this.tabOffsetTop
      //直接绑定一个类，让isTabFixed进行判断，然后对这个类设置样式就可以了


    },
    // 4.子传父，监听下拉加载更多
    loadMore(){
      // 这里要怎么分辨是那个，要加载更多呢？？
      // 又怎么才能为选中的那一个来加载更多呢？
      // 就是我们！！下面！！封装好的那一个函数 getHomeGoods(),
      // 这个里面在我们前面的时候，都封装好了，直接调用就行
      this.getHomeGoods(this.currentType)
      // 但是只是这样的话，那就只能刷新一次
      // 所以为了能多次刷新，就必须要在getHomeGoods方法里面
      // 再次调用一下finishPullUp方法，来告诉betterscroll，上拉加载可以准备下一次了

      // 这里还得调用一次refrsh函数，来让图片加载完之后
      // betterscroll重新计算一下可滚动高度
      // 这样才不会出现什么无法向下拉动这样的BUG
      this.$refs.scroll.scroll.refresh()
    },
    // 5.子传父，监听轮播图片是否加载完成，好获取tabcontrol的offsetTop
    swipperImageLoad(){
      // 1.获取TabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },


    /**
     * 以下为网络请求封装的方法
     */
    // 1.请求轮播图以及recommend数据
    getHomeMultidata(){
      // 这是一个异步操作，也就是网页的其他代码走一条路，他自己走一条路
      getHomeMultidata().then(res => {
      // console.log(res);
      // 箭头函数的 this，就是包裹其的函数作用域的this，而creatd的this就是当前的组件对象
      // 这里之所以要保存，就是因为当函数执行完之后，内部的数据会消失
      this.banner = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    })
    },
    // 2.请求首页的商品数据
    getHomeGoods(type){
      // 因为不能一直请求第一页的数据，所以，还应该使得请求完第一页之后，
      // 再次请求的话，就会顺势请求第二页
      let page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        console.log(res);
        // 这里为了能将后台的数组，送到我们data的数组中
        // 这里是利用...来将数组解构，然后在依次push到数组中
        this.goods[type].list.push(...res.data.data.list),
        this.goods[type].page += 1,
        this.$refs.scroll.scroll.finishPullUp()
      })
    }
    
  }
}
</script>


<style>
/* 加上了 scoped ，就是作用域的意思，只会对当前作用域生效，别的地方再有叫这个id、class的也无效 */
  #home{
    /* padding-top:44px; */
    height: 100vh;
    /* height: 100000px; */
    position:relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color:white;

    /* 在使用浏览器原生滚动时，使得上方导航栏不会随滚动而动 */
    /* 但是现在使用的时BetterScroll，所以，就把它删除了 */
    /* position:fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  img{
    width:100%;
  }
  .content{
   /* height:400px;  */
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 40px;
    left:0;
    right: 0;
  }
  .SecondTab{
    position:relative;
    z-index:9;
  }
  
</style>