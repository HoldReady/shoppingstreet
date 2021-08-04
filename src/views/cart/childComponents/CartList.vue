<template>
  <div class="cart-list">
    <b-scroll class='cart-content' ref="Cscroll">
     <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo='item'></cart-list-item>
    </b-scroll>
  </div>
</template>

<script>
// 导入mapGetters函数，以便于拿到getters中的数据
import {mapGetters} from 'vuex'

// 导入BScroll
import BScroll from '../../../components/common/scroll/BScroll.vue'

// 导入具体的购物车列表商品信息
import CartListItem from './CartListItem.vue'

export default {
  name:"CartList",
  components:{
    BScroll,
    CartListItem,
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
    // this.$refs.Cscroll.scroll.refresh()
  }
}
</script>

<style>
  .cart-list{
    /* height: 100vh; */
    /* 这里减的高度分别是顶部导航栏，清算栏，底部栏 */
    height: calc(100% - 44px - 40px - 40px);

  }

  .cart-content{
    height: calc(100%);
    /* height: 100%; */
    overflow: hidden;
  }
</style>