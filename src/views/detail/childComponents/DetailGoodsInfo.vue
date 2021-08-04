<template>
  <div v-if="Object.keys(detailinfo).length !==0 " class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailinfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailinfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailinfo.detailImage[0].list" :key="index"
          :src="item" @load="imgLoad">
    </div>

  </div>
</template>

<script>
export default {
  name:"DetailGoodsInfo",
  props:{
    detailinfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
      return{
        counter:0,
        imagesLength:0,
      }
  },
  methods:{
    imgLoad(){
      // 这里是进行了一次判断，当所有的图片都加载完成，
      // counter是计数器，那么才将事件发射出去，要不然的话，
      // 每加载一次图片发射一次事件，每次发射事件还得重新计算高度
      // 这些都是很损耗性能，而且影响使用体验的
      if(++this.counter === this.imagesLength){
        this.$emit('imageLoad')
      }
    }
  },
  watch:{
    // 这里是监听了长度的变化，一旦发生变法就将长度赋值给data中的变量
    // 然后就是就行比较，从而再发送事件
    detailinfo(){
      this.imagesLength = this.detailinfo.detailImage[0].list.length
    }
  }
}
</script>

<style>
.goods-info{
  padding: 20px 0;
}
.info-list{
  position: flex;
}
.info-list img{
  width: 100%;
  padding: 10px;
  flex: 1;    

}
</style>