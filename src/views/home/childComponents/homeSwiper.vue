<template>
  <!-- 使用轮播图 -->
    <swiper>
      <swiper-item v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load='imageLoad'>
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  // 引入轮播图
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
export default {
  name:'homeSwiper',
  data(){
    return {
      isLoad:false,
    }
  },
  // 这里没有数据，所以还需要从外面拿进来
  props:{
    banner:{
      type:Array,
      default() {
        return[]
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      // 节省性能，防止传递四次
      if(!this.isLoad){
        // 子传父，传给home.vue让他知道图片是否已经加载完成
        this.$emit('swipperImageLoad');
        // 修改this.isLoad，确保后面再也进不来这个判断
        this.isLoad = true;
      }
      
    }
  }



}
</script>

<style>

</style>