
const util = require('../../util/util')
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
  },
  callTele(event) {
    wx.showModal({
      title: '提示',
      content: `确定拨打: ${event.currentTarget.dataset.phone}`,
      complete: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: event.currentTarget.dataset.phone,
          })
        }
      }
    })
  },
  openMapApp() {
    const version = wx.getSystemInfoSync().SDKVersion
    if (util.compareVersion(version, '2.14.0') < 0) {
      wx.showToast({
        title: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        icon: 'none'
      })
      return;
    }
    // if (!this.data.location) {
    //   wx.showToast({
    //     title: '请选择目的地',
    //     icon: 'none'
    //   })
    //   return;
    // }
    const mapCtx = wx.createMapContext('map', this);
    mapCtx.openMapApp({
      latitude: 103.449881,
      longitude: 29.574336,
      destination: '峨眉山市名山南路'
    })
  }
})