const {
  updateUser
} = require("../../util/api")
const {
  showLoading,
  hideLoading
} = require("../../util/util")
const app = getApp()
const eventBus = app.globalData.bus
Page({
  data: {
    date: null,
    sex: null,
    currentIndex: 0,
    navHeight: app.globalData.navHeight, //导航栏高度
    showPage: false
  },
  onLoad() {
    showLoading()
    eventBus.on('hasRegister', (value) => {
      if (value) {
        this.skipPage()
        hideLoading()
      } else {
        hideLoading()
        this.setData({
          showPage: true
        })
      }
    })
  },
  onHide() {},
  onUnload() {},
  bindDateChange(e) {
    const value = e.detail.value.split('-')
    this.date = e.detail.value
    this.setData({
      date: `${value[0]}年${value[1]}月${value[2]}日`
    })
  },
  changeSex(e) {
    let value = e.currentTarget.dataset.sex
    this.setData({
      sex: value,
      currentPage: 1
    })
  },
  skipPage() {
    wx.redirectTo({
      url: '/pages/scenicSpot/chooseScenic/chooseScenic',
    })
  },
  nextPage() {
    if (this.data.sex && this.data.date) {
      showLoading()
      updateUser({
        gender: this.data.sex || 0,
        birthday: this.date || ''
      }).finally(() => {
        hideLoading()
        wx.reLaunch({
          url: '/pages/scenicSpot/chooseScenic/chooseScenic',
        })
      })
    } else {
      wx.showToast({
        icon: 'error',
        title: '请完善个人信息',
      })
    }
  },
  handleChange(e) {
    const current = e.detail.current
    this.setData({
      currentIndex: current,
      currentPage: current
    })
  }
})