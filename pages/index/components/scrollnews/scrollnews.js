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
  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
    hidden: false,
    showCloseBtn: false
  },

  lifetimes: {
    attached() {
      eventBus.on('announcement', data => {
        this.contents = data.map(item => item.content)
        this.announcement = data[0]
        this.setData({
          content: data[0].content,
          closeAllow: data[0].close_allowed == 1,
          hidden: true
        })
        this.showBtnInterval(data[0].show_close)
        this.changePeriodContent()
      })
    },

    detached() {
      eventBus.off('announcement')
      this.interval && clearInterval(this.interval)
    }
  },

  methods: {
    changePeriodContent() {
      let index = 0 //因为已经加载了第一项数据
      let dataLength = this.contents.length || 0
      this.interval = setInterval(() => {
        ++index
        this.setData({
          content: this.contents[index]
        })
        if (index == dataLength - 1) index = -1 // 重置为 ++index = 0
      }, 1000 * 15)
    },
    showBtnInterval(period) {
      let showBtninterver = setInterval(() => {
        this.setData({
          showCloseBtn: true
        })
        clearInterval(showBtninterver)
      }, period * 1000 * 60)
    },
    closeMessage() {
      this.setData({
        hidden: false
      })
      let reShowNews = setInterval(() => {
        clearInterval(reShowNews)
        this.setData({
          hidden: true,
          showCloseBtn: false
        })
        this.showBtnInterval(this.announcement.show_close)
        this.triggerEvent("toggleShowNews", {
          closed: false
        })
      }, this.announcement.reappear * 1000 * 60)
      this.triggerEvent("toggleShowNews", {
        closed: true
      })
    }
  },
});