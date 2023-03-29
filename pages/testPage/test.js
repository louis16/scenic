const app = getApp()
Page({
  data: {
    ddd: {
      question: '问题',
      option: [{
        k: 1,
        v: 1
      }, {
        k: 2,
        v: 2
      }, {
        k: 3,
        v: 3
      }, {
        k: 4,
        v: 4
      }],
      navHeight: app.globalData.navHeight + 18, //导航栏高度
      windowHeight: app.globalData.windowHeight
    }
  },
  onLoad(options) {
    this.setData({
      height: app.globalData.windowHeight
    })
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  radioChange(e) {
    console.log(e, 222)
  }
})