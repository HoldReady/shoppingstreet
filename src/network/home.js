import {request3} from './quest.js'

export function getHomeMultidata(){
  return request3({
    url:'/home/multidata',
  })
}

export function getHomeGoods(type,page){
  return request3({
    url:'/home/data',
    // 这里是添加url后面跟的一些信息
    params:{
      type,
      page,
    }
  })
}