<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:"CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false,
    }
  }
}
</script>

<style>
  .check-button{
    width: 15px;
    height: 15px;
    border: 1px solid rgba(139, 137, 137, 0.479);
    border-radius: 50%;
    /* box-shadow: 5px,1000px,1000px,50px,#333; */
  }

  /* 当被选中时候的状态 */
  .checked{
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>