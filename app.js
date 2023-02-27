// app.js
const {
	request
} = require('./util/http')
const {
	TOKEN,
	storageSync
} = require('./util/util')
App({
	onLaunch() {
		// 登录
		wx.login({
			success: res => {
				console.log(res)
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				request({
					url: "/auth/login",
					method: "POST",
					data: {
						code: res.code,
						gender: 1,
						birthday: '2023-02-02'
					}
				}).then(res => {
					storageSync(TOKEN, res.access_token)
				}).catch(err => {
					console.error(err)
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
				this.globalData.fileUrl = 'http://file.ysr.uninote.com.cn';
			},
			fail(err) {
				console.log(err);
			}
		})
	},
	globalData: {
		userInfo: null
	}
})