<template>
  <!-- 使用轮播图 -->
    <swiper>
      <swiper-item v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  // 引入轮播图
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
export default {
  name:'homeSwiper',
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
  }
}
</script>

<style>

</style>