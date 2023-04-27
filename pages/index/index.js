// index.js
const {
  getAllMarked,
  getAllTask,
  getGoods,
  userOnline,
  activeTask
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
  mapIcon,
  getDistance
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
    slideUp: {}, // 从下向上滑出
    fadeOut: {} // 渐显
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
      templateName: 'default'
    });
  },

  onLoad() {
    this.mapContext = wx.createMapContext('myMap', this)
    let detail = JSON.parse(getStorageSync(SCENICDETAIL));
    this.detail = detail
    let sosData = JSON.parse(getStorageSync(SOS));
    this.setData({
      sosData: sosData.sos[0] || [{
        name: '联系电话',
        phone: '110'
      }]
    })
    this.getAllMarkedFunc(detail)
    this.getAllTaskFunc(detail.id)
    this.getAllGoodsFunc(detail.id)
    eventBus.on('refreshTask', () => {
      this.getAllMarkedFunc(detail)
      this.getAllTaskFunc(detail.id)
      this.getAllGoodsFunc(detail.id)
    })
    eventBus.on('nearTask', result => {
      console.log(result, 11)
      this.setData({
        taskData: result,
        templateName: 'task'
      })
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
  close() {
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
  },
  changeTemplate(event) {
    const name = event.currentTarget.dataset.templatename
    this.setData({
      templateName: event.currentTarget.dataset.templatename,
    })
  },

  goFinishTask() {
    const {
      need_pay,
      payed
    } = this.data.taskData
    //需要激活的任务未激活
    if (need_pay == 1 && payed == 0) {
      this.setData({
        templateName: 'center'
      })
      return
    }
    const _this = this
    const accuracy = this.data.taskData.accuracy || 100
    wx.showLoading({
      title: '距离计算中',
    })
    wx.getLocation({
      success: function (res) {
        let dis = getDistance({
          lat: this.data.taskData.lat,
          lng: this.data.taskData.lng
        }, {
          lat: res.latitude,
          lng: res.longitude,
        })
        if (dis < accuracy) {
          wx.navigateTo({
            url: '/pages/taskTrigger/taskTrigger',
            success: function (res) {
              res.eventChannel.emit('acceptDataFromOpenerPage', {
                data: {
                  ..._this.data.taskData,
                  complete_id: _this.data.taskData.complete_id
                },
              })
            }
          })
        } else {
          wx.showToast({
            icon: 'error',
            title: `距离任务${dis.toFixed(0)}米`,
          })
        }
      },
      complete: () => wx.hideLoading()
    })
  },
  onActiveCodeChange(e) {
    this.activeCode = e.detail.value
  },
  toActiveTask() {
    wx.showLoading({
      title: '激活中...',
    })
    let detail = JSON.parse(getStorageSync(SCENICDETAIL));
    let params = {
      scenery_id: detail.id,
      code: this.activeCode,
      user_quest_id: this.data.taskData.complete_id
    }
    // activeTask(params).then(res => {
    //   this.setData({
    //     templateName: 'activeSuccess'
    //   })
    //   // eventBus.emit('nearTask', this.data.taskData)
    // }).finally(() => wx.hideLoading()) //激活任务
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        templateName: 'activeSuccess'
      })
    }, 1000)
  },
  finishActive() {
    eventBus.emit('nearTask', {
      ...this.data.taskData,
    })
  },
  callSoS(event) {
    const sosPhone = event.currentTarget.dataset.phone
    console.log(sosPhone)
    wx.makePhoneCall({
      phoneNumber: sosPhone,
    })
  },
  marktap(e) {
    this.mapEvent = e.type;
    setTimeout(() => this.mapEvent = "", 200); //避免点击mark的时候同时触发maptap
    let currentMarker = this.data.markers.filter((item) => item.id === e.detail.markerId)
    this.currentMarkerIndex = this.data.markers.findIndex(item => item.id == e.detail.markerId)
    this.toogleMarkerIcon(this.currentMarkerIndex)
  },
  toogleMarkerIcon(itemIndex) {
    for (let index = 0; index < this.data.markers.length; index++) {
      if (itemIndex === index) {
        this.setData({
          [`markers[${itemIndex}].width`]: '74px',
          [`markers[${itemIndex}].height`]: '74px'
        })
      } else {
        this.setData({
          [`markers[${index}].width`]: '34px',
          [`markers[${index}].height`]: '34px'
        })
      }

    }

  },
  maptap() {
    // 普通的tap事件
    if (this.mapEvent === "") {
      this.toogleMarkerIcon(-1)
    }
  }
});