const {
	updateUser
} = require("../../util/api")
const {
	showLoading,
	hideLoading
} = require("../../util/util")

Page({
	data: {
		date: null,
		sex: null
	},
	onReady() {},
	onHide() {},
	onUnload() {},
	bindDateChange(e) {
		this.setData({
			date: e.detail.value
		})
	},
	changeSex(e) {
		let value = e.currentTarget.dataset.sex
		if (value === this.data.sex) {
			value = null
		}
		this.setData({
			sex: value
		})
	},
	nextPage() {
		if (this.data.sex && this.data.date) {
			showLoading()
			updateUser({
				gender: this.data.sex || 0,
				birthday: this.data.date || ''
			}).finally(() => {
				hideLoading()
				wx.reLaunch({
					url: '/pages/chooseScenic/chooseScenic',
				})
			})
		} else {
			wx.showToast({
				icon: 'error',
				title: '请完善个人信息',
			})
		}

	}
})