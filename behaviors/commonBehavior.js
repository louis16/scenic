const app = getApp()
const commonBehavior = Behavior({
  data: {
    filePath: app.globalData.fileUrl,
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    navHeight: app.globalData.navHeight ,
  },
  methods: {},
})

export default commonBehavior