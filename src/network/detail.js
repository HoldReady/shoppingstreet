import {request3} from './quest'

export function getDetail(iid){
  return request3({
    url:'/detail/',
    params:{
      iid,
    }
  })
}

// 导入详情页下面的推荐信息
export function getRecommend(){
  return request3({
    url:'/recommend'
  })
}

export class DetailGoods {
  constructor(DResult){
    this.title = DResult.skuInfo.title;
    this.desc = DResult.itemInfo.desc;
    this.newPrice = DResult.itemInfo.lowNowPrice;
    this.oldPrice = DResult.itemInfo.oldPrice;
    this.disCount = DResult.itemInfo.discountDesc;
    this.disCountColor = DResult.itemInfo.discountBgColor;
    this.columns = DResult.columns;
    this.services = DResult.shopInfo.services;

  }
}

export class Shop {
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  
  }
}

export class GoodsParam{
  constructor(info,rule){
    // 注：images可能没有值（某些商品有值，某些没有值）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set
    this.sizes = rule.tables
  }
}