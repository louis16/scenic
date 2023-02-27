const {
	request
} = require('../../util/http')
const {
	showLoading,
	hideLoading
} = require('../../util/util')
const app = getApp()
Page({
	data: {
		scenicList: [],
		currentFilter: 'all',
		height: app.globalData.windowHeight,
		pagenation: {
			current_page: 1,
		}
	},
	onLoad(options) {
		this.getScenicList(true)
	},
	onReady() {},
	onShow() {},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {
		this.getScenicList(true)
	},
	onReachBottom() {
		if (this.data.pagenation.current_page < this.data.pagenation.total_page) {
			this.getScenicList(false)
		}
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
		let currentPage = this.data.pagenation.current_page
		refresh && (currentPage = 1)
		showLoading()
		request({
			url: `/sceneries?page=${currentPage}&per_page=10`,
		}).then(scenicListResult => {
			const {
				datas,
				current_page,
				total_page,
			} = scenicListResult
			let temp = this.data.scenicList
			if (!refresh) {
				temp.push(...datas)
			} else {
				temp = datas
			}
			this.setData({
				scenicList: [...temp],
				pagenation: {
					current_page: current_page + 1,
					total_page,
				}
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
		this.getScenicList(true)
	},
	onGetPhoneNumber(e) {
		console.log(e)
	}

})