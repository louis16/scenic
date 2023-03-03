// pages/index/components/goodInfo/goodInfo.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		itemData: {
			type: Object
		}
	},

	lifetimes: {
		attached() {
			setTimeout(() => {
				this.setData({
					content: false
				})
			}, 800)
		}
	},
	data: {
		list: [{}, {}, {}, {}],
		content: true
	},

	methods: {
		close() {
			this.triggerEvent('closeItem', {
				closeItem: true
			})
		},
	}
})