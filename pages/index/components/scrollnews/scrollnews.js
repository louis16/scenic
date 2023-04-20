// components/scrollnews/scrollnews.js
const app = getApp();
const eventBus = app.globalData.bus
Component({
  properties: {
    top: {
      type: Number,
      value: 0,
    },
  
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
        }),
        eventBus.on('announcement', data => {
          this.setData({
            content: data[0].content,
            closeAllow: data[0].close_allowed == 1,
            hidden: true
          })
        })
    },
    detached() {
      eventBus.off('showNews')
    }
  },
  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
    hidden: false
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