<template>
  <div class="cb-bar">
    <div class="all-checked">
      <CheckButton class="Acheck-button" :is-checked='isSelectAll'
                   @click='checkClick'></CheckButton>
      <div>全选</div>
    </div>

    <div class="total-price">
      合计：{{totalPrice}}
    </div>

    <div class="checkout">
      去结算({{checkedLength}})
    </div>
  </div>
</template>

<script>
// 引入选择按钮组件
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton,
  },
  computed:{
    totalPrice(){
      
      // 首先遍历并判断购物车中的每一件商品是否被选中
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked
        // 然后如果被选中了直接返回计算总价格
      }).reduce((preValue,item) => {
        // totalPrice += +item.price * item.count
        
        return preValue + item.price * item.count
      },0).toFixed(2)
    },

    checkedLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },

    // 判断是否所有商品全部选中，选中的话就将全选按钮也选中
    isSelectAll(){
      if(this.$store.state.cartList.length === 0) return false
      return (this.$store.state.cartList.length === this.checkedLength)
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){//如果全被选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{//如果部分选中，或者全没选中
        this.$store.state.cartList.forEach(item => item.checked = true)
        
      }

      // 上面的代码简化
      // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
    }
  }
}
</script>

<style>
  .cb-bar{
    position: relative;
    display: flex;
    justify-content: space-between;
    z-index: 9;

    height: 40px;
    /* line-height: 40px; */
    width: 100%;
    background-color: #f2f5f8;
    
  }
  
  .cb-bar .total-price{
    margin-top: 12px;
    margin-left: 10px;
    font-size: 15px;
  }

  .all-checked{
    display:flex;
    /* align-items: center; */
  }

  /* 让元素垂直居中 */
  .all-checked div{
    margin-top: 12px;
  }

  .checkout{
    text-align: center;
    line-height: 40px;

    color: #fff;
    width: 30%;
    background-color: var(--color-tint);
  }

  
</style>