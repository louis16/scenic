const app = getApp()
Component({
	properties: {
		list: {
      type: Array,
		}
	},

	data: {
		navHeight: app.globalData.navHeight, //导航栏高度
	},

	methods: {
		itemClick(e) {
      console.log(this.data.list)
			wx.showToast({
				icon: 'none',
				title: `${e.currentTarget.dataset.index}`,
			})
			this.triggerEvent("closeInput")
		}
	}
})