Component({
	properties: {
		currentTabKey: {
			type: String,
			value: "3"
		}
	},
	data: {},

	lifetimes: {
		attached() {}
	},
	methods: {
		clickItem: function (e) {
			this.triggerEvent("clickItem", {
				type: e.currentTarget.dataset.type,
			});
			// this.closeAnimation()
			this.setData({
				isShow: false
			})
		}
	}
})