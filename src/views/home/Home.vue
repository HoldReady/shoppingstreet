<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <home-swiper :banner='banner'></home-swiper>
    <recommend-view :recommends='recommends'></recommend-view>
    <feature-view></feature-view>
    <tab-control :title="['流行','新款','精选']" @tabClick='tabClick'></tab-control>
    <goods-list :goods="goods[currentType].list"></goods-list>
  </div>
</template>

<script>
  // 引入顶部导航栏
  import NavBar from '../../components/common/navbar/NavBar.vue'
  // 引入选项卡控制板块
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  // 引入商品信息显示模块
  import GoodsList from '../../components/content/goods/GoodsList.vue'

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
    NavBar,
    homeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
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
  },
  methods:{
    /**
     * 事件监听相关的方法
     */
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
        this.goods[type].page += 1
      })
    }
    
  }
}
</script>

<style>
  #home{
    padding-top:44px;
    height: 2500px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color:white;

    /* 使得上方导航栏不会随滚动而动 */
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  img{
    width:100%;
  }
</style>