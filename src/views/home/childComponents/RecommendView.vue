<template>
  <div class="commend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" >
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .commend{
    display:flex;
    text-align: center;
    font-size: 13px;
    padding:10px 0px 20px;
    /* 设置灰色的分割线 */
    border-bottom:8px solid #eee;
    
  }
  .recomend-item{
    flex:1;
  }
  .recommend-item img{
    width:80%;
    margin-bottom: 8px;
  }
</style>