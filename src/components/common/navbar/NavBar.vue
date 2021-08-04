<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"navbar",
}
</script>

<style>
  .navbar{
    display:flex;
    height:44px;
    /* 当没有内容的时候，line-height是撑不起框框来的 */
    /* 因为line-height只对文本有效 */
    line-height:44px;
    text-align:center;
    box-shadow:0px 1px 1px rgba(100, 100, 100, 0.1);
  }

  .left, .right{
    width:44px;
  }

  .center{
    flex: 1;
  }
</style>