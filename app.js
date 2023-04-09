const {
  login
} = require('./util/api')
const {
  TOKEN,
  PHONE,
  storageSync,
  permission_request
} = require('./util/util')
const eventBus = require('./util/eventBus')
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        login({
          code: res.code,
        }).then(res => {
          storageSync(TOKEN, res.access_token)
          storageSync(PHONE, res?.phone)
          this.globalData.token = res.access_token
          if (res?.gender && res?.birthday) {
            eventBus.eventBus.emit('hasRegister', true)
          } else {
            eventBus.eventBus.emit('hasRegister', false)
          }
        }).catch(err => {
          // console.error(err)
        })
      }
    })
    // 自定义头部
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width, // 胶囊按钮与右侧的距离 = windowWidth - right+胶囊宽度
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        let navWidth = res.windowWidth - navObjWid
        this.globalData.statusBarHeight = res.statusBarHeight; //状态栏高度
        this.globalData.navHeight = navHeight; //导航栏总体高度，加上了胶囊高度
        this.globalData.navTop = navTop; //胶囊距离顶部距离
        this.globalData.navObj = menuButtonObject.height; //胶囊高度
        this.globalData.navObjWid = navObjWid; //胶囊宽度(包括右边距离)
        this.globalData.navWidth = navWidth;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;
        this.globalData.fileUrl = 'https://file.ysr.uninote.com.cn';
      },
    })
    wx.loadFontFace({
      global: true,
      family: 'DIN-Bold',
      source: 'url("https://file.ysr.uninote.com.cn/fronts/din-bold-2.ttf")',
      scopes: ['webview', 'native'],
    })
  },
  onShow() {
    if (!this.bus) {
      this.bus = eventBus.eventBus;
    }
    permission_request("scope.userLocation", "地理位置").then(granted => {
      if (granted) {
        console.log(111, granted)
        wx.onLocationChange(this._locationChangeFn)
      }
    })
  },
  onHide() {
    wx.offLocationChange(this._locationChangeFn)
  },
  _locationChangeFn(res) {
    console.log('location change', res)
  },
  globalData: {
    userInfo: null,
    bus: eventBus.eventBus, // 实时对象
  }
})