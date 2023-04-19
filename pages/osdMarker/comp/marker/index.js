// pages/osdMarker/comp/marker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    source: {
      type: String
    },
    tracker: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
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
      const video = this.scene.assets.getAsset('video-texture', 'hikari');
      active ? video.play() : video.stop();
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