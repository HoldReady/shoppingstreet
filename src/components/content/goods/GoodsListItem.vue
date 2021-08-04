<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showTwoPageImage" alt="" @load="imageLoad">
    <div >
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
import font from "../../../assets/img/tabbar/图标字体/css/all.css"
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showTwoPageImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    // imageLoad(){
    //   this.$bus.$emit('iteImageLoad')
    // }
    // 1.这里监听的商品数据的点击，以便于跳转详情页
    itemClick(){
      // 使用router跳转的同时，使用query传递参数
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style>
  .goods-item{
    /* float:left; */
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    
  }
  .goods-item img{
    
    /* height: 1000px; */
    width: 100%;
    border-radius:5px;
  }
  .goods-item div{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-item div p{
    font-size: 5px;
    height: 15px;
    text-overflow: ellipsis;
    overflow:hidden;
    /* 这里是指不换行，只能一行显示 */
    white-space:nowrap;
  }
  .goods-item .price{
    font-size: 5px;
    color: var(--color-high-text);
  }
  .goods-item .collect{
    font-size: 5px;
  }
  .goods-item .collect::before{
    content:'\f005';
    font-family:'Font Awesome 5 Free';
    font-weight: 900;
    color:rgb(151, 146, 146);
    margin-left:5px;
    margin-right:1px;
  }
</style>