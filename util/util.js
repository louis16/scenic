const {
  mapIcon
} = require("./constants");

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
const showToast = (option) => {
  wx.showToast({
    title: 'done',
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
const getMyLocation = () => {
  return new Promise((resolve) => {
    wx.getLocation({
      type: "gcj02",
      complete: (res) => {
        if (res.errMsg == "getLocation:ok") {
          resolve(res)
        } else {
          resolve(null)
        }
      }
    })
  })
}
const formatMarkData = (arr) => {
  return arr.map(item => {
    return {
      callout: {
        content: item.name,
        padding: 10,
        borderRadius: 2,
        display: 'ALWAYS',
        borderRadius: 8,
        padding: 5,
        fontSize: 12
      },
      latitude: Number(item.lat),
      longitude: Number(item.lng),
      iconPath: item.icon ? `https://file.ysr.uninote.com.cn/${item.icon}` : mapIcon['landscape'],
      // iconPath:'https://uninote.com.cn/__pic/2023/01/a5/81/e31b8a4c05adf822ca77fa698370.png',
      // iconPath:'https://pic.rmb.bdstatic.com/bjh/down/6f65655c5d8f74d304309e3092c968f2.gif',
      // iconPath: mapIcon[item?.type ? 'normal' : 'landscape'],
      width: '34px',
      height: '34px',
      rotate: 0,
      alpha: 1,
      id: item.id,
      item: item
    }
  })
}

/**
 * 检测是否有对应的权限，通过回调函数返回结果
 * @param {String} perName 权限名称
 * @param {function} perResultCbFun 结果回调函数，参数为true表示成功
 */
const permission_check = (perName, perResultCbFun) => {
  wx.getSetting({
    success(res) {
      if (!res.authSetting[perName]) {
        if (typeof perResultCbFun == "function") {
          console.log("授权状态获取失败", perName);
          perResultCbFun(false)
        }
      } else {
        if (typeof perResultCbFun == "function") {
          console.log("授权状态获取成功", perName);
          perResultCbFun(true);
        }
      }
    },
    fail(res) {
      console.log("授权状态获取失败", perName);
      if (typeof perResultCbFun == "function") {
        perResultCbFun(false);
      }
    },
  });
}

/**
 * 请求对应的权限
 * @param {String} perName 权限名称
 * @param {String} perZhName 权限对应的中文名称，用来做提示用
 * @param {function} perRequestCbFun 请求结果回调（参数为true表示成功）
 */
function permission_request(perName, perZhName) {
  return new Promise((resolve) => {
    permission_check(perName, (perCheckResualt) => {
      if (perCheckResualt) {
        // 权限已经请求成功
        resolve(true);
      } else {
        // 如果没有该权限，就去申请该权限
        wx.authorize({
          scope: perName,
          success() {
            // 用户已经同意小程序使用ble，后续调用 wx.startRecord 接口不会弹窗询问
            resolve(true);
          },
          fail() {
            // 用户拒绝授予权限
            // 弹出提示框，提示用户需要申请权限
            wx.showModal({
              title: "申请权限",
              showCancel: false,
              content: "需要使用" + perZhName + "权限，请前往设置打开权限",
              success(res) {
                if (res.confirm) {
                  console.log("用户点击确定");
                  // 打开权限设置页面，即使打开了权限界面，也不知道用户是否打开了权限，所以这里返回失败
                  wx.openSetting({
                    success(res) {
                      resolve(false);
                    },
                    fail(err) {
                      resolve(false);
                    },
                  });
                } else if (res.cancel) {
                  resolve(false);
                }
              },
            });
          },
        });
      }
    });
  })
}

const formatOption = (data) => {
  if (data.complete_type == 3) {
    let temp = data.questions[0].options.map(item => {
      return {
        ...item,
        name: item.k,
        value: item.v
      }
    })
    data.questions[0].options = temp
    return data
  } else {
    return data
  }
}

const removeStorageSync = (key) => wx.removeStorageSync(key)
const TOKEN = 'TOKEN'
const SCENICDETAIL = 'scenicDetail'
const PHONE = "PHONE"
const SOS = 'SOS'
module.exports = {
  compareVersion,
  showLoading,
  hideLoading,
  TOKEN,
  storage,
  storageSync,
  getStorageSync,
  removeStorageSync,
  formatMarkData,
  permission_request,
  showToast,
  formatOption,
  SCENICDETAIL,
  PHONE,
  getMyLocation,
  SOS
};