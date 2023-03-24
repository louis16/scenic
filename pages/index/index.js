// index.js
const {
  getAllMarked,
  getAllTask,
  getGoods
} = require("../../util/api");
const {
  getStorageSync,
  showLoading,
  hideLoading,
  formatMarkData,
  SCENICDETAIL
} = require("../../util/util");

// 获取应用实例
const app = getApp();
const eventBus = app.globalData.bus
const INIT_MARKER = {
  callout: {
    content: "腾讯总部大楼",
    padding: 5,
    borderRadius: 10,
    display: "ALWAYS",
  },
  latitude: 29.54261859112155,
  longitude: 103.33020865186211,
  iconPath: "../../static/imgs/Marker1_Activated@3x.png",
  width: "34px",
  height: "34px",
  rotate: 0,
  alpha: 1,
  id: 1,
};
const INIT_MARKER2 = {
  callout: {
    content: "腾讯总部大楼222",
    padding: 10,
    borderRadius: 2,
    display: "BYCLICK",
  },
  latitude: 29.53931087790219,
  longitude: 103.33432795683859,
  iconPath: "../../static/imgs/demoMark.jpg",
  width: "34px",
  height: "34px",
  rotate: 0,
  alpha: 1,
  id: 2142,
};

Page({
  data: {
    markers: [],
    showSOS: false, //SOS
    showMarkTapModal: false, //景观详情
    showTaskModal: false, //任务
    showGoodModal: false, //物品
    showPackageModal: false, //我的
    showLandscapeModal: false, //景观
    showLayer: false, //图层
    is_3D: false,
    is_satellite: false,
    setting: { // 使用setting配置，方便统一还原
      skew: 0,
    },
    layerIndex: "1", //默认2D
    navList: ["全部", "任务物品", "合成物品"],
    nav_type: 0,
    goodsList: [],
    taskList: [],
    height: 60,
    currentTabKey: "3",
    scenicDetal: {},
    titleAnimation: false, // 标题是否滚动
    navHeight: app.globalData.navHeight, //导航栏高度
  },
  onLoad() {
    this.mapContext = wx.createMapContext('myMap', this)
    let detail = JSON.parse(getStorageSync(SCENICDETAIL));
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
  },
  getAllMarkedFunc(detailRef) { //获取景观设施的定位，用以展示mark
    getAllMarked(detailRef.id).then((res) => {
      this.facilities = formatMarkData(res.facilities);
      this.landscapse = formatMarkData(res.landscapse);
      this.setData({
        scenicDetal: detailRef,
        // titleAnimation: (detailRef.name.length * 34) > 302, //一个字体34rpx, 整个容器宽度302
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
        taskList: res.positions
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
  handleFuncClick(event) { //底部功能区域点击
    const {
      type
    } = event.detail;
    let dataObject = {};
    if (type === this.data.currentTabKey) {
      //重复点击当前，关闭所有，重置到中间项目。
      dataObject = {
        showTaskModal: false,
        showPackageModal: false,
        showLandscapeModal: false,
        showGoodModal: false,
        currentTabKey: "3",
      };
    } else if (type === "4") {
      dataObject = {
        showGoodModal: true,
        showTaskModal: false,
        showPackageModal: false,
        showLandscapeModal: false,
        currentTabKey: "4",
      };
    } else if (type === "5") {
      dataObject = {
        showPackageModal: true,
        showTaskModal: false,
        showGoodModal: false,
        showLandscapeModal: false,
        currentTabKey: "5",
      };
    } else if (type === "3") {
      dataObject = {
        showTaskModal: false,
        showPackageModal: false,
        showGoodModal: false,
        showLandscapeModal: false,
        currentTabKey: "3",
      };
    } else if (type === '1') {
      dataObject = {
        showTaskModal: false,
        showPackageModal: false,
        showGoodModal: false,
        showLandscapeModal: true,
        currentTabKey: "1",
      };
    }
    this.setData({
      ...dataObject,
      showLayer: false,
      showMarkTapModal: false,
      showSOS: false
    });
  },
  marktap(event) { //mark点击事件
    const markerId = event.detail.markerId
    let currentMarker = this.data.markers.filter(markerItem => markerItem.id == markerId)
    console.log(currentMarker)
    let timer = setTimeout(() => { //因为再地图上绑定的点击关闭窗口的事件，所以将打开操作变为异步
      this.setData({
        showMarkTapModal: true,
        currentItem: currentMarker[0].item
      });
      clearTimeout(timer);
    }, 160);
  },
  maptap(e) {
    this.closeModal();
  },
  closeModal() { //关闭屏幕所有弹窗
    this.setData({
      showGoodModal: false,
      showTaskModal: false,
      showPackageModal: false,
      showLandscapeModal: false,
      currentTabKey: "3",
      showLayer: false,
      showSOS: false,
      showMarkTapModal: false
    });
  },
  regionChange(e) {
    // console.log(e, 11)
  },
  toggleExpand(event) { //切换list高度
    this.setData({
      height: event?.detail?.isExpand ? "80" : "60"
    });
  },
  changeData(event) { // 切换景观,设施
    this.setData({
      list: event.detail.index === 1 ? this.data.facilities : this.data.landscapse
    })
  },
  changeType: function (e) { //更改物品筛选
    let {
      index
    } = e.currentTarget.dataset;
    if (this.data.nav_type == index) {
      return false;
    }
    let list = [];
    if (index == 0) { //全部
      list = this.cloneList;
    } else if (index == 1) { //独立物品
      list = this.cloneList.filter((good) => good.item.type == 3);
    } else if (index == 2) { //合成物品组成
      list = this.cloneList.filter((good) => good.item.type == 2);
    }
    this.setData({
      nav_type: index,
      goodsList: list,
    });
  },
  toogleItemInfo(detail) { //切换显示物品详情
    if (detail.detail.closeItem) {
      this.setData({
        showItem: false,
      });
    } else {
      this.setData({
        showItem: true,
        itemData: detail.detail,
      });
    }
  },
  searchResult(event) {
    let arr = [];
    for (let index = 0; index < 10; index++) {
      arr.push({
        id: Math.random().toFixed(2),
      });
    }
    showLoading();
    setTimeout(() => {
      this.setData({
        searchResults: event.detail.value ? arr : [],
      });
      hideLoading();
    }, 1000);
  },
  openLayer(event) { //屏幕右侧，点击图层/消息弹出
    if (event.detail.type === "layer") {
      this.setData({
        showTaskModal: false,
        showPackageModal: false,
        showLandscapeModal: false,
        showGoodModal: false,
        showLayer: true,
        showMarkTapModal: false
      });
    } else {
      this.setData({
        showTaskModal: false,
        showPackageModal: false,
        showLandscapeModal: false,
        showGoodModal: false,
        showLayer: false,
        showMarkTapModal: false
      });
      eventBus.emit('showFullScreen')
    }
  },
  openSOS() {
    this.closeModal()
    this.setData({
      showSOS: true
    })
  },
  callPhone(event) {
    const phone = event.currentTarget.dataset.phone
    wx.showModal({
      title: '',
      content: `确定拨打：${phone}`,
      complete: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: phone,
          });
        }
      }
    })
  },
  openTaskLayer(event) { //屏幕右侧，点击任务弹出
    this.setData({
      showTaskModal: true
    })
  },
  changeLayer(e) { //图层弹窗，更改图层
    const layer = e.currentTarget.dataset.layer;
    this.setData({
      is_3D: layer === "3" ? true : layer === "2" ? true : false,
      layerIndex: layer,
      is_satellite: layer === "3",
      setting: {
        skew: layer === "2" ? 45 : 0,
      },
    });
  },
});