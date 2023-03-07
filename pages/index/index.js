// index.js
const { getAllMarked } = require("../../util/api");
const { mapIcon } = require("../../util/constants");
const {
  getStorageSync,
  showLoading,
  hideLoading,
  formatMarkData,
} = require("../../util/util");

// 获取应用实例
const app = getApp();
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
    showTaskModal: false,
    showPackageModal: false,
    showLayer: false,
    is_3D: false,
    is_satellite: false,
    setting: {
      // 使用setting配置，方便统一还原
      skew: 0,
    },
    layerIndex: "1", //默认2D
    navList: ["全部", "任务物品", "合成物品"],
    nav_type: 0,
    goodsList: [],
    height: 60,
    currentTabKey: "3",
    scenicDetal: {},
    titleAnimation: false, // 标题是否滚动
    navHeight: app.globalData.navHeight, //导航栏高度
  },
  onLoad() {
    let arr = new Array();
    for (let index = 0; index < 7; index++) {
      arr.push({ id: index });
    }
    this.setData({ goodsList: arr });
    this.cloneList = JSON.parse(JSON.stringify(arr));
    let detail = JSON.parse(getStorageSync("scenicDetail"));
    getAllMarked(detail.id).then((res) => {
      //获取景观设施的定位，用以展示mark
      this.facilities = formatMarkData(res.facilities);
      this.landscapse = formatMarkData(res.landscapse);
      this.setData({
        scenicDetal: detail,
        // titleAnimation: (detail.name.length * 34) > 302, //一个字体34rpx, 整个容器宽度302
        markers: [...this.facilities, ...this.landscapse],
      });
    });
  },
  handleFuncClick(event) {
    const { type } = event.detail;
    let dataObject = {};
    if (type === this.data.currentTabKey) {
      //重复点击当前，关闭所有，重置到中间项目。
      dataObject = {
        showPackageModal: false,
        showTaskModal: false,
        currentTabKey: "3",
      };
    } else if (type === "4") {
      dataObject = {
        showTaskModal: true,
        showPackageModal: false,
        currentTabKey: "4",
      };
    } else if (type === "5") {
      dataObject = {
        showPackageModal: true,
        showTaskModal: false,
        currentTabKey: "5",
      };
    } else if (type === "3") {
      dataObject = {
        showPackageModal: false,
        showTaskModal: false,
        currentTabKey: "3",
      };
    }
    this.setData({ ...dataObject, showLayer: false });
  },
  marktap(e) {
    //因为再地图上绑定的点击关闭窗口的事件，所以将打开操作变为异步
    let timer = setTimeout(() => {
      this.setData({ showTaskModal: true, currentTabKey: "4" });
      clearTimeout(timer);
    }, 160);
  },
  maptap(e) {
    this.closeModal();
  },
  closeModal() {
    this.setData({
      showTaskModal: false,
      showPackageModal: false,
      currentTabKey: "3",
      showLayer: false,
    });
  },

  //切换list高度
  toggleExpand(event) {
    this.setData({ height: event?.detail?.isExpand ? "80" : "60" });
  },
  //更改物品筛选
  changeType: function (e) {
    let { index } = e.currentTarget.dataset;
    if (this.data.nav_type == index) {
      return false;
    }
    let list = [];
    if (index == 0) {
      list = this.cloneList;
    } else if (index == 1) {
      list = this.cloneList.filter((item) => item.id % 2 === 1);
    } else if (index == 2) {
      list = this.cloneList.filter((item) => item.id % 2 === 0);
    }
    this.setData({
      nav_type: index,
      goodsList: list,
    });
  },
  //切换显示物品详情
  toogleItemInfo(detail) {
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
  openLayer(event) {
    if (event.detail.type === "layer") {
      this.setData({
        showPackageModal: false,
        showTaskModal: false,
        showLayer: true,
      });
    }
  },
  changeLayer(e) {
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
