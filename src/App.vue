<template>
  <div id="app">
    
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component"  exclude="Deatil"/>
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
  </div>
  
</template>

<script>
  // 引入底部导航栏
  import MainTabBar from './components/content/maintabbar/MainTabBar.vue' 

export default {
  name:'App',
  components:{
    MainTabBar,
  }
}
</script>
<style>
  @import './assets/css/base.css';
</style>
