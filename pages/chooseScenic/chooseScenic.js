const {
  getWxCode,
  getWxUserInfo
} = require('../../util/loginUtil')
Page({
  data: {
    scenicList: [{
      id: 111,
      name: 1111
    }, {
      id: 222,
      name: 2222
    }, {
      id: 33333,
      name: 3333
    }, {
      id: 44444,
      name: 44444
    }]
  },
  onLoad(options) {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  goToScenicDetail(event) {
    const {
      id
    } = event.target.dataset
    wx.navigateTo({
      url: `/pages/scenicDetail/scenicDetail?id=${id}`,
    })
  },
  changeFilter(event) {
    const {
      filter
    } = event.target.dataset
    wx.showToast({
      title: filter,
    })
  },
  getUserProfile(e) {
    console.log(e)
  },
  onGetPhoneNumber(e) {
    console.log(e)
  },
  tt1() {
    getWxUserInfo()
  },
  tt12() {
    console.log(123)
    getWxCode()
  }
})