const app = getApp();

let listData = [
  {
    dragId: "item0",
    images: "/static/imgs/demoMark.jpg",
  },
  {
    dragId: "item1",
    images: "/static/imgs/demoMark.jpg",
  },
  {
    dragId: "item2",
    images: "/static/imgs/demoMark.jpg",
  },
  {
    dragId: "item3",
    images: "/static/imgs/demoMark.jpg",
  },
  {
    dragId: "item4",
    images: "/static/imgs/demoMark.jpg",
  },
  {
    dragId: "item5",
    images: "/static/imgs/demoMark.jpg",
  },
  {
    dragId: "item6",
    images: "/static/imgs/demoMark.jpg",
  },
  {
    dragId: "item7",
    images: "/static/imgs/demoMark.jpg",
  },
  {
    dragId: "item8",
    images: "/static/imgs/demoMark.jpg",
  },
];

Page({
  data: {
    isIphoneX: app.globalData.isIphoneX,
    size: 3,
    listData: [],
    pageMetaScrollTop: 0,
    scrollTop: 0,
  },
  sortEnd(e) {
    console.log("sortEnd", e.detail.listData);
    this.setData({
      listData: e.detail.listData,
    });
  },
  change(e) {
    // console.log("change", e.detail.listData);
  },

  itemClick(e) {
    console.log(e);
  },
  scroll(e) {
    this.setData({
      pageMetaScrollTop: e.detail.scrollTop,
    });
  },
  // 页面滚动
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop,
    });
  },
  onLoad() {
    this.drag = this.selectComponent("#drag");
    // 模仿异步加载数据
    setTimeout(() => {
      this.setData({
        listData: listData,
      });
      this.drag.init();
    }, 100);
  },
});
