const {
  getScenicList,
} = require('../../util/api')
const {
  showLoading,
  hideLoading
} = require('../../util/util')
const app = getApp()
Page({
  data: {
    scenicList: [],
    currentFilter: 'all',
    height: app.globalData.windowHeight,
    currentLocation: null,
    pagenation: {
      current_page: 1,
    },
  },
  onLoad(options) {
    this.getScenicListFun(true)
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {
    this.getScenicListFun(true)
  },
  onReachBottom() {
    if ((this.data.pagenation.current_page <= this.data.pagenation.total_page) && (this.data.scenicList.length < this.data.pagenation.total_results)) {
      this.getScenicListFun(false)
    }
  },
  onShareAppMessage() {},
  goToScenicDetail(event) {
    const {
      id
    } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/scenicDetail/scenicDetail?id=${id}`,
    })
  },
  getScenicListFun(refresh, params) {
    let currentPage = this.data.pagenation.current_page
    refresh && (currentPage = 1)
    showLoading()
    getScenicList({
      page: currentPage,
      ...params
    }).then(scenicListResult => {
      const {
        datas,
        current_page,
        total_page,
        total_results,
      } = scenicListResult
      let temp = this.data.scenicList
      if (!refresh) {
        datas.forEach((item) => {
          item.logo = `${app.globalData.fileUrl}/${item.logo}`
        })
        temp.push(...datas)
      } else {
        temp = datas
        temp.forEach((item) => {
          item.logo = `${app.globalData.fileUrl}/${item.logo}`
        })
      }
      this.setData({
        scenicList: [...temp],
        pagenation: {
          current_page: current_page + 1 > total_page ? total_page : current_page + 1,
          total_page,
          total_results
        }
      })
    }).finally(() => {
      if (refresh) {
        wx.stopPullDownRefresh()
      }
      hideLoading()
    })
  },
  changeFilter(event) {
    const {
      filter
    } = event.target.dataset
    this.getScenicListFun(true)
  },

  searchInput(event) {
    this.getScenicListFun(true, {
      name: event.detail.value
    })
  },
  bindRegionChange(e) {
    this.setData({
      currentLocation: e.detail.value[3] || e.detail.value[2]
    })
    this.getScenicListFun(true, {
      street_id: e.detail.code.pop()
    })
  },
  clearCurrent() {
    this.setData({
      currentLocation: null
    })
    this.getScenicListFun(true)
  }

})