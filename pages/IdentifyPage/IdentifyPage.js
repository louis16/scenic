Page({
  data: {
    width: 300,
    height: 300,
    optionBarHeight: 100,
    renderWidth: 300,
    renderHeight: 300,
    cameraType: 'scanCode'
  },
  onLoad(options) {
    const info = wx.getSystemInfoSync();
    const width = info.windowWidth;
    const height = info.windowHeight;
    const dpi = info.pixelRatio;
    this.setData({
      width,
      height: height * 0.9,
      optionBarHeight: height * 0.1,
      renderWidth: width * dpi,
      renderHeight: height * dpi,
      source: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/2dmarker/hikari-v.mp4',
      tracker: "https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg"
    });
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onShareAppMessage() {},
  changeTab(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      cameraType: type
    })
  }
})