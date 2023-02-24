const {
	get
} = require('../../util/http')
const {
	getWxCode,
	getWxUserInfo
} = require('../../util/loginUtil')
const {
	showLoading,
	hideLoading
} = require('../../util/util')
const app = getApp()
Page({
	data: {
		scenicList: [],
		currentFilter: 'all',
		height: app.globalData.windowHeight
	},
	onLoad(options) {
		this.getScenicList()
	},
	onReady() {},
	onShow() {},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {
		this.getScenicList(true)
	},
	onReachBottom() {
		this.getScenicList(false)
	},
	onShareAppMessage() {},
	goToScenicDetail(event) {
		const {
			id
		} = event.currentTarget.dataset
		wx.navigateTo({
			url: `/pages/scenicDetail/scenicDetail?id=${id}`,
		})
	},
	getScenicList(refresh) {
		showLoading()
		get({
			url: '/sceneries',
		}).then(scenicListResult => {
			this.setData({
				scenicList: [...scenicListResult.datas]
			})
		}).finally(() => {
			if (refresh) {
				wx.stopPullDownRefresh()
			}
			hideLoading()
		})
	},
	changeFilter(event) {
		const {
			filter
		} = event.target.dataset
		this.setData({
			currentFilter: filter
		})
		this.getScenicList(filter === 'all')
	},
	getUserProfile(e) {
		console.log(e)
	},
	onGetPhoneNumber(e) {
		console.log(e)
	},
	tt1() {
		getWxUserInfo()
	},
	tt12() {
		console.log(123)
		getWxCode().then(res => {
			console.log(res)
		})
	}

})