import { createStore } from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'


export default createStore({
  state: {
    // 购物车商品列表
    cartList:[],
  },
  // mutation唯一的目的就是修改state中的状态
  // mutation中的每个方法尽可能完成的事件比较单一一点
  mutations,
  // actions中适合放那些异步操作或者具有判断性、功能复杂的代码
  actions,
  getters,
})
