const {
  request
} = require('./http')
const generateKey = (params) => {
  let searchChain = ''
  let keyArr = Object.keys(params)
  for (let index = 0; index < keyArr.length; index++) {
    const value = keyArr[index];
    searchChain += `${value}=${params[value]}&`
  }
  return searchChain
}
//登录
export const login = (params) => request({
  url: '/auth/login',
  method: 'POST',
  data: params
})
//刷新token
export const refreshToken = (params) => request({
  url: '/auth/refresh',
  method: 'POST',
  data: params
})

//用户手机号
export const getUserPhone = (params) => {
  return request({
    method: 'PUT',
    url: `/users/phone`,
    data: params
  })
}
//景区列表
export const getScenicList = (params) => {
  return request({
    method: 'GET',
    url: `/sceneries?${generateKey(params)}`
  })
}

//景区详情
export const getScenicDetail = (id) => {
  return request({
    method: 'GET',
    url: `/sceneries/${id}}`
  })
}
//更新用户信息（性别、生日）
export const updateUser = (params) => request({
  url: '/users',
  method: 'PUT',
  data: params
})
//获取首页所有marked的标点
export const getAllMarked = (id, name) => {
  return request({
    method: 'GET',
    url: `/common/position?scenery_id=${id}&name=${name}`
  })
}
//获取当前任务
export const getAllTask = (id) => {
  return request({
    method: 'GET',
    url: `/quests?scenery_id=${id}`
  })
}
//任务详情（定位or扫码触发后调用）
export const getTaskDetail = (id) => {
  return request({
    method: 'GET',
    url: `/quests/${id}`
  })
}
//完成任务
export const completeTask = (id) => {
  return request({
    method: 'GET',
    url: `/quests/${id}/complete`
  })
}
//获取用户物品
export const getGoods = (id) => {
  return request({
    method: 'GET',
    url: `/user/items?scenery_id=${id}`
  })
}
//用户在线
export const userOnline = (params) => {
  return request({
    url: '/user/online',
    method: 'POST',
    data: params
  })
}
//物品合成
export const goodComposition = (params) => {
  return request({
    url: `/user/items/${params.id}/composite`,
    method: 'POST',
    data: params
  })
}
//激活任务
export const activeTask = (params) => {
  return request({
    url: `/quests/active`,
    method: 'POST',
    data: params
  })
}