Component({
  properties: {
    width: {
      type: Number,
      value: 300
    },
    height: {
      type: Number,
      value: 300
    },
    type: {
      type: String,
      value: 'scanCode'
    }
  },

  lifetimes: {
    attached() {
      wx.showLoading({
        icon: 'none',
        title: '初始化中',
      })
    }
  },
  data: {},

  methods: {
    scanCode(e) {
      const qrCodeResult = e.detail.result
      wx.showToast({
        title: qrCodeResult,
      })
      console.log(qrCodeResult, 11)
    },
    initDone(e) {
      console.log(e, 'init')
      wx.hideLoading()
    },
    onError(e) {
      console.log(e, 'error')
    },
    takePhoto() {
      let ctx = wx.createCameraContext('#normalCamera')
      ctx.takePhoto({
        success: (res) => {
          this.setData({
            previewImg: res.tempImagePath
          })
        }
      })
    }
  }
})