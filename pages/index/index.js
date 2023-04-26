// index.js
const {
  getAllMarked,
  getAllTask,
  getGoods,
  userOnline
} = require("../../util/api");
const {
  getStorageSync,
  showLoading,
  hideLoading,
  formatMarkData,
  SCENICDETAIL,
  SOS,
  getMyLocation
} = require("../../util/util");
const {
  mapIcon
} = require('../../util/constants')

// 获取应用实例
const app = getApp();
const eventBus = app.globalData.bus

Page({
  data: {
    markers: [],
    setting: { // 使用setting配置，方便统一还原
      skew: 0,
      scale: 18,
    },
    goodsList: [],
    taskList: [],
    scenicDetal: {},
    mapHeight: app.globalData.windowHeight - app.globalData.navHeight, // 20是为了遮挡住腾讯地图的logo
    templateName: 'default',
    slideDown: {}, // 从上向下滑出
    slideUp:{}, // 从下向上滑出
    fadeOut:{} // 渐显
  },
  onShow: function () {
    // 创建动画实例
    let fadeOut = wx.createAnimation({
      duration: 1000, // 动画时长
      timingFunction: 'ease', // 缓动函数
      delay: 0, // 延迟时间
      transformOrigin: '50% 50%', // 变形原点
    });

    // 设置动画效果
    fadeOut.scale(1).opacity(1).step();

    var slideDown = wx.createAnimation({
      duration: 1000, // 动画持续时间
      timingFunction: 'ease', // 动画类型
    });
    // 设置动画初始状态
    slideDown.translateY('0').step();
    var slideUp = wx.createAnimation({
      duration: 1000, // 动画持续时间
      timingFunction: 'ease', // 动画类型
    });
    // 设置动画初始状态
    slideUp.translateY('0').step();
    // 更新数据，开始执行动画
    this.setData({
      fadeOut: fadeOut.export(),
      slideDown: slideDown.export(),
      slideUp: slideUp.export(),
    });
  },
  onLoad() {
    this.mapContext = wx.createMapContext('myMap', this)
    let detail = JSON.parse(getStorageSync(SCENICDETAIL));
    this.detail = detail
    let sosData = JSON.parse(getStorageSync(SOS));
    this.setData({
      sosArray: sosData.sos || []
    })
    this.getAllMarkedFunc(detail)
    this.getAllTaskFunc(detail.id)
    this.getAllGoodsFunc(detail.id)
    eventBus.on('refreshTask', () => {
      this.getAllMarkedFunc(detail)
      this.getAllTaskFunc(detail.id)
      this.getAllGoodsFunc(detail.id)
    })
  },
  onReady() { //动态更改经纬度
    let detail = JSON.parse(getStorageSync(SCENICDETAIL));
    this.mapContext.moveToLocation({
      latitude: detail.lat * 1,
      longitude: detail.lng * 1
    })
    this.interval = setInterval(() => {
      userOnline({
        scenery_id: detail.id
      })
    }, 1000 * 60 * 10)
  },
  onUnload() {
    eventBus.off('refreshTask')
    this.interval && clearInterval(this.interval)
  },
  close(){
    var slideDown = wx.createAnimation({
      duration: 1000, // 动画持续时间
      timingFunction: 'ease', // 动画类型
    });
    // 设置动画初始状态
    slideDown.translateY('100%').step();
    var slideUp = wx.createAnimation({
      duration: 1000, // 动画持续时间
      timingFunction: 'ease', // 动画类型
    });
    // 设置动画初始状态
    slideUp.translateY('-100%').step();
    // 更新数据，开始执行动画
    this.setData({
      slideDown: slideUp.export(),
      slideUp: slideDown.export(),
    });
  },
  getAllMarkedFunc(detailRef) { //获取景观设施的定位，用以展示mark
    getAllMarked(detailRef.id, '').then((res) => {
      this.facilities = formatMarkData(res.facilities);
      this.landscapse = formatMarkData(res.landscapse);
      this.setData({
        scenicDetal: detailRef,
        markers: [...this.facilities, ...this.landscapse],
        landscapse: res.landscapse,
        facilities: res.facilities,
        list: res.landscapse
      });
      app.globalData.landscapse = res.landscapse
      app.globalData.facilities = res.facilities
    });
  },
  getAllTaskFunc(id) { //获取所有任务
    getAllTask(id).then((res) => {
      this.setData({
        taskList: res.positions,
        overview: res.overview
      })
      app.globalData.positionWatchLists = res.positionWatchLists
      app.globalData.qrCodeWatchLists = res.qrCodeWatchLists
    });
  },
  getAllGoodsFunc(id) {
    getGoods(id).then(goodsListResult => {
      this.cloneList = JSON.parse(JSON.stringify(goodsListResult));
      this.setData({
        goodsList: goodsListResult
      });
    })
  },

  onShareAppMessage(e) {
    return {
      title: '觅迹游园会',
      path: '/pages/scenicSpot/chooseScenic/chooseScenic',
      imageUrl: 'https://so1.360tres.com/t010ae94d49ddd280be.png'
    }
  },
  playAudio() {
    console.log(111)
  }
});