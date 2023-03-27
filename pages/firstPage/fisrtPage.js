const {
  updateUser
} = require("../../util/api")
const {
  showLoading,
  hideLoading
} = require("../../util/util")
const app = getApp()
Page({
  data: {
    date: null,
    sex: null,
    currentIndex: 0,
    navHeight: app.globalData.navHeight, //导航栏高度
  },
  onHide() {},
  onUnload() {},
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  changeSex(e) {
    let value = e.currentTarget.dataset.sex
    this.setData({
      sex: value
    })
  },
  skipPage() {
    wx.reLaunch({
      url: '/pages/chooseScenic/chooseScenic',
    })
  },
  nextPage() {
    if (this.data.sex && this.data.date) {
      showLoading()
      updateUser({
        gender: this.data.sex || 0,
        birthday: this.data.date || ''
      }).finally(() => {
        hideLoading()
        wx.reLaunch({
          url: '/pages/chooseScenic/chooseScenic',
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
    this.setData({
      currentIndex: e.detail.current
    })
  }
})