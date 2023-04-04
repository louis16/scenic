const app = getApp()
const commonBehavior = Behavior({
  data: {
    filePath: app.globalData.fileUrl,
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    navHeight: app.globalData.navHeight + 18,
  },
  methods: {},
})

export default commonBehavior