// index.js
// 获取应用实例
const app = getApp()
const INIT_MARKER = {
	callout: {
		content: '腾讯总部大楼',
		padding: 5,
		borderRadius: 10,
		display: 'ALWAYS'
	},
	latitude: 29.54261859112155,
	longitude: 103.33020865186211,
	iconPath: '../../static/imgs/Marker1_Activated@3x.png',
	width: '34px',
	height: '34px',
	rotate: 0,
	alpha: 1,
	id: 1
};
const INIT_MARKER2 = {
	callout: {
		content: '腾讯总部大楼222',
		padding: 10,
		borderRadius: 2,
		display: 'BYCLICK'
	},
	latitude: 29.53931087790219,
	longitude: 103.33432795683859,
	iconPath: '../../static/imgs/demoMark.jpg',
	width: '34px',
	height: '34px',
	rotate: 0,
	alpha: 1,
	id: 2142
};

Page({
	data: {
		markers: [{
			...INIT_MARKER
		}, {
			...INIT_MARKER2
		}],
		showTaskModal: false,
		showPackageModal: false,
		navList: ['全部', '任务物品', '合成物品'],
		nav_type: 0,
		goodsList: [],
		height: 60
	},
	onLoad() {
		let arr = new Array()
		for (let index = 0; index < 70; index++) {
			arr.push({
				id: index
			})
		}
		this.setData({
			goodsList: arr
		})
		this.cloneList = JSON.parse(JSON.stringify(arr))
	},
	handleFuncClick(event) {
		const {
			type,
			name
		} = event.detail
		if (type === '3') {
			this.setData({
				showTaskModal: true
			})
		} else if (type === '4') {
			this.setData({
				showPackageModal: true
			})
		}
	},
	marktap(e) {
		//因为再地图上绑定的点击关闭窗口的事件，所以将打开操作变为异步
		let timer = setTimeout(() => {
			this.setData({
				showTaskModal: true
			})
			clearTimeout(timer)
		}, 160)
	},
	maptap(e) {
		this.setData({
			showTaskModal: false,
			showPackageModal: false
		})
	},
	closeModal() {
		this.setData({
			showTaskModal: false,
			showPackageModal: false
		})
	},

	//切换list高度
	toggleExpand(event) {
		this.setData({
			height: event?.detail?.isExpand ? '80' : '60'
		})
	},
	//更改物品筛选
	changeType: function (e) {
		let {
			index
		} = e.currentTarget.dataset
		if (this.data.nav_type == index) {
			return false
		}
		let list = []
		if (index == 0) {
			list = this.cloneList
		} else if (index == 1) {
			list = this.cloneList.filter(item => item.id % 2 === 1)
		} else if (index == 2) {
			list = this.cloneList.filter(item => item.id % 2 === 0)
		}
		this.setData({
			nav_type: index,
			goodsList: list
		})
	},
	//切换显示物品详情
	toogleItemInfo(detail) {
		if (
			detail.detail.closeItem
		) {
			this.setData({
				showItem: false
			})
		} else {
			this.setData({
				showItem: true,
				itemData: detail.detail
			})
		}
	}
})