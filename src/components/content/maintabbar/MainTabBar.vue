<template>
  <tab-bar>
      <tab-bar-item path="/home" >
        <template v-slot:item-icon>
          <div>
            <span class="fas ">&#xf015;</span>
          </div>
        </template>
        <template v-slot:item-icon-active>
          <div>
            <span class="fas " style="color:var(--color-tint)">&#xf015;</span>
          </div>
        </template>
        <template v-slot:item-text>
          <div>
            首页
          </div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template v-slot:item-icon>
          <div>
            <span class="fab ">&#xf4d5;</span>
          </div>
        </template>
        <template v-slot:item-icon-active>
          <div>
            <span class="fab " style="color:var(--color-tint)">&#xf4d5;</span>
          </div>
        </template>
        <template v-slot:item-text>
          <div>
            分类
          </div>
        </template>

      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template v-slot:item-icon>
          <div>
            <span class="fas ">&#xf07a;</span>
          </div>
        </template>
        <template v-slot:item-icon-active>
          <div>
            <span class="fas " style="color:var(--color-tint)">&#xf07a;</span>
          </div>
        </template>
        <template v-slot:item-text>
          <div>
            购物车
          </div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/profile" >
        <template v-slot:item-icon>
          <div>
            <span class="fas ">&#xf007;</span>
          </div>
        </template>
        <template v-slot:item-icon-active>
          <div>
            <span class="fas " style="color:var(--color-tint)">&#xf007;</span>
          </div>
        </template>
        <template v-slot:item-text>
          <div>
            我的
          </div>
        </template>
      </tab-bar-item>
    </tab-bar>
</template>

<script>

 // 引入TabBar组件
  import TabBar from '../../common/tabbar/TabBar.vue'
  // 引入TabBarItem组件
  import TabBarItem from '../../common/tabbar/TabBarItem.vue'
  // 引入图标字体库
  import font from '../../../assets/img/tabbar/图标字体/css/all.css'


export default {
  name:"MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>