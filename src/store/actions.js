export default {
  // 定义添加商品到购物车的方法
    // 还可以进行对象的解构
    // 将context 换成 {state,mutations}
    addCart(context,payload){
      return new Promise((resolve,reject) => {
        // 1.payload新添加的商品
      // 这里是判断这件商品是否已经添加过了
      // 如果已经在购物车，那么count就会+1
      // 如果没在才会将其添加进去
      let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      };

      // 1.上面的复杂代码可以使用这个find方法来代替
      // let oldProduct = state.cartList.find( item => {
      //   item.iid === payload.iid
      // })

      // 2.判断oldPrduct
      if(oldProduct){
        // oldProduct.count += 1;
        context.commit('addCounter',oldProduct)
        // 调用resolve就代表代码执行成功了，
        // 也就意味着购物车中已经添加了相应的信息
        resolve('当前选购的商品数量+1~')
      }else{
        payload.count = 1;
        // state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('已经添加了新的商品到购物车中~')
      }
      })
      
      
    }
}