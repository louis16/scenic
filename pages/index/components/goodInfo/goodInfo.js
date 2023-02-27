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

	data: {

	},

	methods: {
		close() {
			this.triggerEvent('closeItem', {
				closeItem: true
			})
		},
	}
})