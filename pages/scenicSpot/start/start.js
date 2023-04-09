const scrollWidth = 225;
const iconWidth = 58;
const {
  getUserPhone
} = require('../../../util/api');
const {
  showLoading,
  hideLoading,
  PHONE,
  getStorageSync
} = require('../../../util/util');
Page({
  data: {
    scrollX: 0,
    data: {}
  },
  onLoad(options) {

    let phone = JSON.parse(getStorageSync(PHONE));
    this.setData({
      data: options,
      hasLogin: JSON.stringify(phone) !== 'null'
    })
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  moveIcon(e) {
    let mTouch = e.changedTouches[0]
    if (mTouch.pageX - iconWidth * 2.5 > 250) return
    let distance = mTouch.pageX - iconWidth
    if ((mTouch.pageX - iconWidth) <= 0) distance = 0
    this.setData({
      scrollX: distance
    })
  },
  endMove(e) {
    let mTouch = e.changedTouches[0]
    if (mTouch.pageX > scrollWidth + iconWidth) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    } else {
      this.setData({
        scrollX: 0
      })
    }
  },
  goToHomePage() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  onGetPhoneNumber(event) {
    if (event.detail.errMsg = 'getPhoneNumber:ok' && event.detail.encryptedData) {
      showLoading()
      getUserPhone({
        code: event.detail.code
      }).then(res => {
        if (res === null) {
          this.goToHomePage()
        }
      }).finally((e) => {
        hideLoading()
      })
    } else {
      wx.showToast({
        title: '用户拒绝授权',
      })
    }
  }
})