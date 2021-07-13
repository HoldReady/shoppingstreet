<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index"
                    :goods-item="item">

    </goods-list-item>
  </div>
</template>

<script>
// 导入商品列表的子项
import GoodsListItem from './GoodsListItem.vue'

export default {
  name:'GoodsList',
  components:{
    GoodsListItem,
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }

  }
}
</script>

<style>
  .goods{
    border-top: 1px solid rgba(136, 133, 133, 0.116);
    /* margin-top:5px; */
    padding-top: 1px;
  }
</style>