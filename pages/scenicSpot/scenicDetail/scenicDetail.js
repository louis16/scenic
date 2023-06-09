const {
  getScenicDetail
} = require('../../../util/api')
const {
  showLoading,
  hideLoading,
  compareVersion,
  storageSync,
  SCENICDETAIL,
  SOS
} = require('../../../util/util')
const app = getApp()
Page({
  data: {
    detailData: {},
    logo: '',
    images: [],
    currentPage: 0
  },
  onLoad(options) {
    if (options.id) {
      showLoading()
      getScenicDetail(options.id).then(detailResult => {
        detailResult.images = detailResult.images?.map(item => {
          return {
            ...item,
            path: `${app.globalData.fileUrl}/${item.path}`
          }
        })
        storageSync(SOS, JSON.stringify({
          sos: detailResult.sos_contacts
        }))
        this.setData({
          detailData: detailResult,
          images: detailResult.images,
          logo: `${app.globalData.fileUrl}/${detailResult.logo}`
        })
      }).finally(() => hideLoading())
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
    storageSync(SCENICDETAIL, JSON.stringify({
      ...this.data.detailData,
      logo: this.data.logo
    }))
    let img = `${app.globalData.fileUrl}/${this.data.detailData.welcome_background}`
    wx.redirectTo({
      url: `/pages/scenicSpot/start/start?desc=${this.data.detailData.background_desc}&img=${img}`,
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
    if (compareVersion(version, '2.14.0') < 0) {
      wx.showToast({
        title: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        icon: 'none'
      })
      return;
    }
    if (!this.data.detailData?.lat || !this.data.detailData?.lng) {
      return;
    }
    const mapCtx = wx.createMapContext('map', this);
    mapCtx.openMapApp({
      latitude: Number(this.data.detailData?.lat),
      longitude: Number(this.data.detailData?.lng),
      destination: `${this.data.detailData.city}${this.data.detailData?.address}`
    })
  },
  changePage(e) {
    const current = e.detail.current
    this.setData({
      currentPage: current
    })
  }
})