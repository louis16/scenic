const app = getApp()
Component({
    properties: {
        hiddenBack: {
            type: Boolean,
            value: true
        },
        title: {
            type: String,
            value: ""
        },
        absolute: {
            type: Boolean,
            value: false
        },
        style: {
            type: String,
            value: ""
        },
        titleWhite:{ 
          type:Boolean,
          value:false
        },
        titleStyle:{
          type:String,
          value:''
        },
        fixed:{
          type:Boolean,
          value:false
        }
    },
    data: {
        navHeight: app.globalData.navHeight , //导航栏高度
        navTop: app.globalData.navTop, //导航栏距顶部距离
        navObj: app.globalData.navObj, //胶囊的高度
        navObjWid: app.globalData.navObjWid, //胶囊宽度+距右距离
        titleHeight: app.globalData.navHeight - app.globalData.statusBarHeight,
        statusBarHeight: app.globalData.statusBarHeight,
        width: app.globalData.windowWidth,
        navHeightfixed: app.globalData.navHeight, //导航栏高度
        navWidth: app.globalData.navWidth
    },
    methods: {
        goBack() {
            wx.navigateBack()
        }
    }
})