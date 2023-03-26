// components/scrollnews/scrollnews.js
const app = getApp();
const eventBus = app.globalData.bus
Component({
  properties: {
    top: {
      type: Number,
      value: 0,
    },
    canClose: {
      type: Boolean,
      value: true
    }
  },

  lifetimes: {
    attached() {
      eventBus.on('showNews', () => {
        this.setData({
          hidden: true
        })
        this.triggerEvent("toggleShowNews", {
          closed: false
        })
      })
    },
    detached() {
      eventBus.off('showNews')
    }
  },
  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
    hidden: true
  },

  methods: {
    closeMessage() {
      this.setData({
        hidden: false
      })
      this.triggerEvent("toggleShowNews", {
        closed: true
      })
    }
  },
});