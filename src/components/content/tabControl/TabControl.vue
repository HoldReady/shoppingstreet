<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" :key="index" 
          class="tab-control-item" @click="itemClick(index)">
      <span :class="{tabactive:index === currentIndex}">
        {{item}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  // 在这里接收不同页面的不同文字内容
  props:{
    title:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      // 子传父的话，就要使用自定义事件了
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control{
    display:flex;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
  }
  .tab-control-item{
    flex:1;
    height: 40px;
    line-height: 40px;
  }
  .tabactive{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
    padding: 5px;
  }
  
  
</style>