// pages/index/components/goodsList.js
Component({
	properties: {
		list: {
			type: Array,
			required: true,
			default: []
		}
	},

	data: {},

	methods: {
		goodItemClick(detail) {
			this.triggerEvent("goodclick", {
				...detail.currentTarget.dataset.item
			})
		}
	}
})