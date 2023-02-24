// components/functionBar/bar.js
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
			this.closeAnimation.call(this)
			this.setData({
				isShow: false
			})
		}
	}
})