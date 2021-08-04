<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'PopUp',
  props:{
    message:{
      type:String,
      default:'',
    },
    isShow:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    // 给了一个默认延迟时间
    // show(message,duration=2000){
    //   this.isShow = true;
    //   this.message = message;

    //   setTimeout(() => {
    //     this.show = false;
    //     this.message = ''
    //   },duration)
    // }
  }
}
</script>

<style>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 4px 10px;
    transform: translate(-50%,-50%);
    /* z-index: 10; */
    
    color: #fff;
    background-color: rgba(0,0,0,0.65);
    border-radius: 10px;
    font-size: 13px;
  }
</style>