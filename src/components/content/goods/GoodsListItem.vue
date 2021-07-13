<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div>
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
  }
}
</script>

<style>
  .goods-item{
    float: left;
    /* display:flex; */
    /* flex:1; */
    /* flex-flow:column; */
    /* width:calc(100%/2 - 20px); */
    width:50%;
    padding:0px 5px 8px;
    
  }
  .goods-item img{
    border-radius:5px;
  }
  .goods-item div{
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