const app = getApp()
const eventBus = app.globalData.bus
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    title: {
      type: String,
      value: "任务",
    },
    toggleExpand: {
      type: Function,
      value: null,
    },
    height: {
      type: Number,
      value: 60,
    },
    closeExpand: {
      type: Boolean,
      value: true,
    },
    titleArray: {
      type: Array,
      value: []
    },
    isLandscapeDetail:{
      type: Boolean,
      value: false,
    }
  },

  data: {
    upScroll: {},
    isExpand: false,
    currentIndex: 0
  },
  lifetimes: {
    attached() {
      this.openModal()
    },
    detached: function () {
      if(this.data.isLandscapeDetail){//景观详情，关闭通知map更新marker的样式
        eventBus.emit('closeLandScape')
      }
    },
  },

  methods: {
    changeTitle(evnet) { //如果是多选的标题,则对应暴露出选中的index
      const index = evnet.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('changeTitle', {
        index: index
      })
    },
    openModal: function () {
      const upScroll = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
      });
      upScroll.translateY(`-${this.data.height}vh`).height(`${this.data.height}vh`).step();
      this.setData({
        upScroll: upScroll.export(),
      });
    },
    closeModal: function () {
      const upScroll = wx.createAnimation({
        duration: 500,
        timingFunction: "linear",
      });
      upScroll.translateY(`${this.data.height}vh`).step();
      this.setData({
        upScroll: upScroll.export(),
      });
    },
    changeExpand(flag) {
      const value = this.data.isExpand ?
        `-${this.data.height}vh` :
        `-${this.data.height + 20}vh`;
      const upScroll = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
      });
      upScroll.translateY(value).height(`${value}vh`).step();
      this.triggerEvent("toggleExpand", {
        isExpand: !this.data.isExpand,
      });
      this.setData({
        upScroll: upScroll.export(),
        isExpand: !this.data.isExpand,
      });
    },
    changeModalStatus() {
      this.closeModal();
      let timer = setTimeout(() => {
        this.triggerEvent("closeModal");
        clearTimeout(timer);
      }, 160);
    },
    touchStart(ev) {
      if (!this.data.closeExpand) return
      const {
        pageY
      } = ev.changedTouches[0]
      this.pageY = pageY
    },
    touchEnd(ev) {
      if (!this.data.closeExpand) return
      const {
        pageY
      } = ev.changedTouches[0]
      if (pageY - this.pageY > 30) {
        this.changeExpand()
      } else if (pageY - this.pageY < -30) {
        this.changeExpand()
      }
      this.pageY = 0
    }
  },
});