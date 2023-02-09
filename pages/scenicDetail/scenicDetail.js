Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    desc: ""
  },
  onLoad(options) {
    if (options.id) {
      this.setData({
        desc: options.id
      })
    } else {
      wx.reLaunch({
        url: '/pages/chooseScenic/chooseScenic',
      })
    }
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  onHomePage() {
    wx.navigateTo({
      url: '/pages/start/start',
    })
  }
})