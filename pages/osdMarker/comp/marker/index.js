const app = getApp()
Component({
  properties: {
    modelsAndRecognize: {
      type: Array,
      value: []
    }
  },

  lifetimes: {
    attached() {
      console.log(this.data.modelsAndRecognize)
    }
  },
  data: {
  
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
      console.log(detail, 1111)
      // const video = this.scene.assets.getAsset('video-texture', 'hikari');
      // active ? video.play() : video.stop();
    },
    handleTrackerSwitch1: function ({
      detail
    }) {
      console.log(detail)
      const active = detail.value;
      console.log(detail, 222222, active)
      // const video = this.scene.assets.getAsset('video-texture', 'hikari');
      // active ? video.play() : video.stop();
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