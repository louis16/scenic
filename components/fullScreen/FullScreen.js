const app = getApp()
const eventBus = app.globalData.bus
Component({
  properties: {},
  data: {
    show: false
  },
  lifetimes: {
    attached() {
      eventBus.on('showFullScreen', () => this.setData({
        show: true
      }))
      eventBus.on('hideFullScreen', () => this.setData({
        show: false
      }))
    },
    detached() {
      eventBus.off('showFullScreen')
      eventBus.off('hideFullScreen')
    }
  },
  methods: {
    closeFullScreen() {
      this.setData({
        show: false
      })
    }
  }
})