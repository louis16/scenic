const app = getApp()
Page({
  data: {
    width: 300,
    height: 300,
    renderWidth: 300,
    renderHeight: 300,
    modelsAndRecognize: app.globalData.arWatchLists
  },
  onLoad(options) {
    const info = wx.getSystemInfoSync();
    const width = info.windowWidth;
    const height = info.windowHeight;
    const dpi = info.pixelRatio;
    this.setData({
      width,
      height: height - app.globalData.navHeight,
      renderWidth: width * dpi,
      renderHeight: height * dpi,
    });
  },

  onReady() {

  },

  onShow() {},

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  },
  handleReady: function ({
    detail
  }) {
    this.scene = detail.value;
    this.scene.assets.loadAsset({
      type: 'texture',
      assetId: 'avatar',
      src: 'https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg'
    }).then(() => this.setData({
      avatarTextureId: 'avatar'
    }));
  },
  handleAssetsLoaded: function ({
    detail
  }) {
    this.setData({
      loaded: true
    });
  },
  handleTrackerSwitch: function ({
    detail
  }) {
    const active = detail.value;
    const video = this.scene.assets.getAsset('video-texture', 'hikari');
    active ? video.play() : video.stop();
  }
})