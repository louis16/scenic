const {
	request
} = require('../../util/http')
const {
	showLoading,
	hideLoading,
	compareVersion
} = require('../../util/util')
const app = getApp()
Page({
	data: {
		detailData: {},
		background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
		logo: ''
	},
	onLoad(options) {
		if (options.id) {
			showLoading()
			request({
				url: `/sceneries/${options.id}`
			}).then(detailResult => {
				this.setData({
					detailData: detailResult,
					logo: `${ app.globalData.fileUrl}/${detailResult.logo}`
				})
			}).finally(() => hideLoading())
		} else {
			wx.reLaunch({
				url: '/pages/chooseScenic/chooseScenic',
			})
		}
	},
	onReady() {},
	onShow() {},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onShareAppMessage() {},
	onHomePage() {
		wx.navigateTo({
			url: '/pages/start/start',
		})
	},
	callTele(event) {
		wx.showModal({
			title: '提示',
			content: `确定拨打: ${event.currentTarget.dataset.phone}`,
			complete: (res) => {
				if (res.confirm) {
					wx.makePhoneCall({
						phoneNumber: event.currentTarget.dataset.phone,
					})
				}
			}
		})
	},
	openMapApp() {
		const version = wx.getSystemInfoSync().SDKVersion
		if (compareVersion(version, '2.14.0') < 0) {
			wx.showToast({
				title: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
				icon: 'none'
			})
			return;
		}
		if (!this.data.detailData?.lat || !this.data.detailData?.lng) {
			return;
		}
		const mapCtx = wx.createMapContext('map', this);
		mapCtx.openMapApp({
			latitude: Number(this.data.detailData?.lat),
			longitude: Number(this.data.detailData?.lng),
			destination: `${this.data.detailData.city}${this.data.detailData?.address}`
		})
	}
})