const app = getApp()
Component({

  lifetimes: {
    attached() {
      if (app.globalData.arWatchLists.length === 0) {
        wx.showModal({
          title: '提示',
          content: '当前景区未配置数据',
          showCancel: false,
          complete: (res) => {
            if (res.cancel) {
              wx.navigateBack()
            }
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      } else {
        wx.showLoading({
          title: '初始化中...',
        })
        this.setData({
          modelsAndRecognize: app.globalData.arWatchLists
        })
      }
    },
    detached() {
      this.setData({
        modelsAndRecognize: []
      })
    }
  },
  data: {
    modelsAndRecognize: [],
  },

  methods: {
    handleReady: function ({
      detail
    }) {
      this.scene = detail.value;
    },
    handleAssetsLoaded: function () {
      wx.hideLoading()
      wx.showToast({
        title: '初始化完成'
      });
      this.setData({
        loaded: true
      });
    },
    handleTrackerSwitch: function ({
      detail
    }) {
      console.log(detail)
      const active = detail.value;
    },
    handleTouchModel: function ({
      detail
    }) {
      const {
        target
      } = detail.value;
      const id = target.id;

      wx.showToast({
        title: `点击了模型： ${id}`
      });
    },
  }
})