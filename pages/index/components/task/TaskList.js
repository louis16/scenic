const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taskList: {
      type: Object,
      value: {},
      observer: function (newVal) {
        console.log(newVal, `1111newVal`)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: 'unfinished',
    showFilter: false,
    showLandscape: false,
    landscapeList: app.globalData.landscapse
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeStatus(event) {
      let status = event.currentTarget.dataset.status
      this.setData({
        status: status
      })
    },
    filterClick() {
      this.setData({
        showFilter: !this.data.showFilter
      })
    },
    openLandscapeList() {
      this.setData({
        showLandscape: !this.data.showLandscape
      })
    }
  }
})