const {
  request
} = require('../../../util/http')
const { getStorageSync,SCENICDETAIL } = require('../../../util/util')

// 获取本地缓存景区对象
export const scenicDetail = () => {
  return JSON.parse(getStorageSync(SCENICDETAIL))

}
// 获取荣誉列表
export const getHonourList = (params) => {
  return request({
    method: 'GET',
    url: `/user/honours`,
    data:params
  })
}
 // 获取排行榜类别
 export const getRanksType = (params) => {
  return request({
    method: 'GET',
    url: `/ranks/cols`,
    data:params
  })
}
 // 获取排行榜列表
export const getRanksList = (params) => {
  return request({
    method: 'GET',
    url: `/ranks`,
    data:params
  })
}

// 获取优惠券列表
export const getCouponsList = (params) => {
  return request({
    method: 'GET',
    url: `/user/coupons`,
    data:params
  })
}
// 获取优惠券详情
export const getCouponDetail = (id,params) => {
  return request({
    method: 'GET',
    url: `/user/coupons/${id}`,
    data:params
  })
}
// 获取积分商城列表
export const getGoodsList = (params) => {
  return request({
    method: 'GET',
    url: `/goods`,
    data:params
  })
}
// 获取积分商城商品详情
export const getGoodsDetail = (id,params) => {
  return request({
    method: 'GET',
    url: `/goods/${id}`,
    data:params
  })
}
// 提交积分兑换商品
export const exchangeGoods = (id,params) => {
  return request({
    method: 'GET',
    url: `/goods/${id}/exchange`,
    data:params
  })
}
// 读取用户信息
export const userOnline = (params) => {
  return request({
    method: 'POST',  
    url: `/user/online`,
    data:params
  })
}
//保存用户生日 性别
export const submitUserInfo = (data) => {
  return request({
    method:'PUT',
    url:`/users`,
    data:data
  })
}