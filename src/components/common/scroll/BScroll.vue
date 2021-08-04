<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 导入betterScroll
import BetterScroll from 'better-scroll'

export default {
  name:"BScroll",
  props:{
    probeType:{
      type:Number,
      default:0,
    },
    pullUpLoad:{
      type:Boolean,
      default:false,
    }
  },
  // 这里是对获取到的东西进行一个保存
  data(){
    return{
      scroll:null
    }
  },

  
  mounted(){
    // 在vue中，使用query来寻找某个元素，有可能是不准确的，
    // 因为其他的地方也有可能使用 .wrapper 这个类别
    // 所以，在vue中要想精准制导还得靠ref
    // 设置好之后，再通过 this.$refs.wrapper 来获得那一个组件或者元素对象
    setTimeout(() => {
      // 1.新建BScroll对象
      this.scroll = new BetterScroll(this.$refs.wrapper,{
        // 此属性值为2/3，监听滚动才好使
        // 因为考虑到性能问题，所以，
        // 我们需要外部来确认是否需要实时监听滚动
        // 所以，我们需要 props，让首页的组件标签传的值来决定
        probeType:this.probeType,
        click:true,
        pullUpLoad:this.pullUpLoad,
        observeDOM:true,
      })
      // console.log(this.scroll);
      // 2.监听滚动的位置
      this.scroll.on('scroll',(position) => {
        // 子传父
        this.$emit('scroll',position)
      })
      // 3.监听上拉加载更多
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })

    }, 20);
    
    
  }, 
 
  
  
}
</script>

<style>

</style>