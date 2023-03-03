const scrollWidth = 225;
const iconWidth = 58;
const {
	getUserPhone
} = require('../../util/api');
const {
	showLoading,
	hideLoading
} = require('../../util/util');
Page({
	data: {
		scrollX: 0,
		data: {}
	},
	onLoad(options) {
		this.setData({
			data: options
		})
	},
	onReady() {},
	onShow() {},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onShareAppMessage() {},
	startNow() {
		const _this = this
		wx.showModal({
			title: '提示',
			content: '点击请求用户数据',
			success(res) {
				if (res.confirm) {
					wx.reLaunch({
						url: '/pages/index/index',
					})
				} else if (res.cancel) {
					_this.setData({
						scrollX: 0
					})
				}
			}
		})
	},
	moveIcon(e) {
		let mTouch = e.changedTouches[0]
		if (mTouch.pageX - iconWidth * 2.5 > 250) return
		let distance = mTouch.pageX - iconWidth
		if ((mTouch.pageX - iconWidth) <= 0) distance = 0
		this.setData({
			scrollX: distance
		})
	},
	endMove(e) {
		let mTouch = e.changedTouches[0]
		if (mTouch.pageX > scrollWidth + iconWidth) {
			this.startNow()
		} else {
			this.setData({
				scrollX: 0
			})
		}
	},
	onGetPhoneNumber(event) {
		if (event.detail.errMsg = 'getPhoneNumber:ok') {
			showLoading()
			getUserPhone({
				code: event.detail.code
			}).then(res => {
				if (res === null) {
					wx.reLaunch({
						url: '/pages/index/index',
					})
				}
			}).finally((e) => {
				console.log('getUserPhone Error', e)
				hideLoading()
			})
		} else {
			wx.showToast({
				title: '用户拒绝授权',
			})
		}
	}
})