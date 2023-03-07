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
//景区详情
export const getAllMarked = (id) => {
  return request({
    method: 'GET',
    url: `/common/position?scenery_id=${id}`
  })
}