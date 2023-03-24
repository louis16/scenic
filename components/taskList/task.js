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
    }
  },

  data: {
    upScroll: {},
    isExpand: false,
    currentIndex: 0
  },
  lifetimes: {
    attached() {
      console.log("初始化组件", this.data.height);
      const upScroll = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
      });
      upScroll.translateY(`-${this.data.height}vh`).height(`${this.data.height}vh`).step();
      this.setData({
        upScroll: upScroll.export(),
      });
    },
    detached: function () {
      console.log("卸载组件");
    },
  },

  methods: {
    changeTitle(evnet) {
      const index = evnet.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('changeTitle', {
        index: index
      })
    },
    // openModal: function () {
    // 	const upScroll = wx.createAnimation({
    // 		duration: 200,
    // 		timingFunction: 'linear'
    // 	})
    // 	upScroll.translateY('-80vh').step();
    // 	this.setData({
    // 		upScroll: upScroll.export(),
    // 	})
    // },
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
    handleMove(ev) {
      console.log(ev)
    }
  },
});