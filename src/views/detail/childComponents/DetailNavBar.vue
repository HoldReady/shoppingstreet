<template>
  <div>
    <navbar>
      <template v-slot:left >
        <div id="back" @click="BackClick">
          <img src="../../../assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles" 
              :key="index" class="title-item"
              :class="{DetailActive:index === currentIndex}"
              @click="DetailNavClick(index)">{{item}}</div>
        </div>
      </template>
    </navbar>
  </div>
</template>

<script>
// 引入导航栏
import navbar from '../../../components/common/navbar/NavBar.vue'

export default {
  name:'DetailNavBar',
  components:{
    navbar,
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods: {
    DetailNavClick(index){
      this.currentIndex = index;

      // 这里是把监听的导航点击发送出去
      this.$emit('titleClick',index);
    },
    BackClick(){
      this.$router.back()
    }
  },
}
</script>

<style>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    margin-left: 10px;
    flex: 1;
  }
  /* 设置选中元素的颜色 */
  .DetailActive{
    color: var(--color-high-text);
  }
  #back img{
    width: 24px;
    margin-top: 10px;
  }
</style>