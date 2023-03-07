const { mapIcon } = require("./constants");

const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
};
const showLoading = (option) => {
  wx.showLoading({
    title: '加载中',
    ...option
  })
}
const hideLoading = () => wx.hideLoading()
const storageSync = (key, data) => {
  return wx.setStorageSync(key, data)
}
const storage = (key, data, callback) => {
  wx.setStorage({
    key,
    data,
    success() {
      callback && callback()
    }
  })
}
const getStorageSync = (key) => {
  return wx.getStorageSync(key)
}
const formatMarkData = (arr) => {
  return arr.map(item => {
    return {
      callout: {
        content: item.name,
        padding: 10,
        borderRadius: 2,
        display: 'ALWAYS'
      },
      latitude: Number(item.lat),
      longitude: Number(item.lng),
      // iconPath:'https://uninote.com.cn/__pic/2023/01/a5/81/e31b8a4c05adf822ca77fa698370.png',
      iconPath: mapIcon['normal'],
      width: '34px',
      height: '34px',
      rotate: 0,
      alpha: 1,
      id: item.id
    }
  })
}
const removeStorageSync = (key) => wx.removeStorageSync(key)
const TOKEN = 'TOKEN'
module.exports = {
  compareVersion,
  showLoading,
  hideLoading,
  TOKEN,
  storage,
  storageSync,
  getStorageSync,
  removeStorageSync,
  formatMarkData
};