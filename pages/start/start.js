Page({
  data: {},
  onLoad(options) {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  startNow() {
    wx.showModal({
      title: '提示',
      content: '点击请求用户数据',
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})