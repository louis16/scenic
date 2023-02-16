const scrollWidth = 225;
const iconWidth = 58;
Page({
  data: {
    scrollX: 0
  },
  onLoad(options) {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  startNow() {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '点击请求用户数据',
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        } else if (res.cancel) {
          _this.setData({
            scrollX: 0
          })
        }
      }
    })
  },
  moveIcon(e) {
    let mTouch = e.changedTouches[0]
    if (mTouch.pageX - iconWidth * 2.5 > 250) return
    let distance = mTouch.pageX - iconWidth
    if ((mTouch.pageX - iconWidth) <= 0) distance = 0
    this.setData({
      scrollX: distance
    })
  },
  endMove(e) {
    let mTouch = e.changedTouches[0]
    if (mTouch.pageX > scrollWidth + iconWidth) {
      this.startNow()
    } else {
      this.setData({
        scrollX: 0
      })
    }
  }
})