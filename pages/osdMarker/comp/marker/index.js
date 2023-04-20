const app = getApp()
Component({

  lifetimes: {
    attached() {
      console.log(this.data.modelsAndRecognize)
    },
  },
  data: {
    modelsAndRecognize: app.globalData.arWatchLists,
  },

  methods: {
    handleReady: function ({
      detail
    }) {
      this.scene = detail.value;
    },
    handleAssetsLoaded: function ({
      detail
    }) {
      wx.showToast({
        title: '1111'
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