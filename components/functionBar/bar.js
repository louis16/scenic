Component({
	properties: {

	},
	data: {},

	lifetimes: {
		attached() {
		}
	},
	methods: {
		clickItem: function (e) {
			this.triggerEvent("clickItem", {
				type: e.currentTarget.dataset.type,
				name: e.currentTarget.dataset.name
			});
			// this.closeAnimation()
			this.setData({
				isShow: false
			})
		}
	}
})