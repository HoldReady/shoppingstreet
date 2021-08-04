export default {
  // 数量加一的操作
  addCounter(state,payload){
    payload.count++;
  },

  // 添加商品的操作
  addToCart(state,payload){
    // 这里是联系购物车中的选中按钮的
    // 当一件商品加入购物车，就会默认选中
    payload.checked = true;
    state.cartList.push(payload)
  }
}