<template>
  <div class="cart">
    <nav-bar class="CartNavBar">
      <template v-slot:center>
        <div>
          购物车({{cartLength}})
        </div>
      </template>
    </nav-bar>

    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
// 引入导航栏
import NavBar from '../../components/common/navbar/NavBar.vue'

// 在组件直接使用vuex中getters的做法
// 引入mapGetters
import {mapGetters} from 'vuex'

// 引入购物车商品清单列表
import CartList from './childComponents/CartList.vue'
// 引入购物车底部结算工具栏
import CartBottomBar from './childComponents/CartBottomBar.vue'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed:{
    // 在组件直接使用vuex中getters的做法
    // 将所需要直接使用的方法直接拿过来
    // 注意，这里是数组
    ...mapGetters(['cartLength','cartList'])

    // 而如果你想写的名字和getters中返回的不一致
    // 就使用对象方式
    // ...mapGetters({
    //   length:'cartLength'
    // })

  }
}
</script>

<style>
  .cart{
    height: 100vh;
  }
  .CartNavBar{
    background-color: var(--color-tint);
    color:#fff;
    font-size: 15px;
    z-index: 9;
  }
</style>