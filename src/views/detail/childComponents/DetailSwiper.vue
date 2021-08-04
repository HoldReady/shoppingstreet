<template>
  <div class="detail-swiper">
    <swiper class="DetailTopSwiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>

// 导入轮播图组件
import {Swiper,SwiperItem} from '../../../components/common/swiper/index'


export default {

  name:'DetailSwiper',
  components:{
    Swiper,
    SwiperItem
  },
  // 父传子，先拿到轮播图图片
  props:{
    topImages:{
      type:Array,
      default(){
      return []
    }
  }
    
  },
}
</script>

<style>
  .DetailTopSwiper{
    height: 300px;
    overflow: hidden;
  }
  .detail-swiper img{
    width:100%;
  }

</style>