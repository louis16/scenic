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
    showPackageModal: false
  },
  onLoad() {},
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
	  console.log(e,11111111)
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
  }
})