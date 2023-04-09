const {
  getScenicList,
} = require('../../../util/api')
const {
  showLoading,
  hideLoading,
  permission_request,
  getMyLocation,
} = require('../../../util/util')
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
      id,
    } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/scenicSpot/scenicDetail/scenicDetail?id=${id}`,
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
    if (filter === 'all') {
      this.getScenicListFun(true)
      this.setData({
        currentFilter: 'all',
        name: ''
      })
    } else if (filter === 'closest') {
      permission_request("scope.userLocation", "地理位置").then(granted => {
        if (granted) {
          getMyLocation().then(res => {
            if (res) {
              this.getScenicListFun(true, {
                lat: res.latitude,
                lng: res.longitude,
              })
              this.setData({
                currentFilter: 'closest',
                name: ''
              })
            }
          })
        }
      })
    }
  },

  searchInput(event) {
    this.getScenicListFun(true, {
      name: event.detail.value
    })
  },
  bindRegionChange(e) {
    console.log(e.detail, 1111)
    this.setData({
      currentLocation: e.detail.value[2] || e.detail.value[1]
    })
    this.getScenicListFun(true, {
      area_id: e.detail.code[2]
    })
  },
  clearCurrent() {
    this.setData({
      currentLocation: null
    })
    this.getScenicListFun(true)
  }

})