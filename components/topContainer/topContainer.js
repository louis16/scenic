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
        }
    },
    data: {
        navHeight: app.globalData.navHeight, //导航栏高度
        navTop: app.globalData.navTop, //导航栏距顶部距离
        navObj: app.globalData.navObj, //胶囊的高度
        navObjWid: app.globalData.navObjWid, //胶囊宽度+距右距离
        titleHeight: app.globalData.navHeight - app.globalData.statusBarHeight,
        statusBarHeight: app.globalData.statusBarHeight,
        navWidth: app.globalData.navWidth
    },
    methods: {
        goBack() {
            wx.navigateBack()
        }
    }
})