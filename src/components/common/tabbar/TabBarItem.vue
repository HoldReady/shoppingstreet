<template>


  <div class="tab-bar-item" @click="itemClick">
    <!-- <span class="fas ">&#xf015;</span> -->
    <!-- <div>首页</div> -->
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    
  </div>
      

</template>

<script>

export default {
  name:'TabBarItem',
  // 这里是进行父传子，将path属性从替换插槽的内容中，
  // 传递到插槽的
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'var(--color-tint)'
    }
  },
  data(){
    return{
      // isActive:false,
    }
  },
  computed: {
    isActive() {
      // 因为当点击的时候 ，会获取到一个path
      // 而路由被点击，处于活跃状态的时候，咱也获取了他的path
      // 接下来就是通过对这两个path的判断，来确定isActive的布尔值
      // 这里的 $route 和 $router 不同，前者是处于活跃的路由
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },

  // 这里定义的方法主要是为了，当点击导航栏的时候
  // 跳转到每一个导航所对应的大页面
  methods:{
    itemClick(){
      // 这里是为了寻找到每一个大页面
      // 而这里的path我们已经通过props拿到了
      // 这里也可以使用replace来代替push，这样的话就不可以回退了
      this.$router.push(this.path)
    }
  }
}
</script>

<style>
  .active{
    color: var(--color-tint);
  }
  .tab-bar-item {
    flex:1;
    text-align:center;
    font-size: 13px;

    /* 调整垂直距离 */
    margin-top:2px;
  };
  
</style>