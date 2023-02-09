// components/taskList/task.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "任务"
    }
  },

  data: {
    upScroll: {}
  },
  lifetimes: {
    attached() {
      console.log('初始化组件')
      const upScroll = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear'
      })
      upScroll.translateY('-80vh').step();
      this.setData({
        upScroll: upScroll.export(),
      })
    },
    detached: function () {
      console.log('卸载组件')
    },
  },

  methods: {
    openModal: function () {
      const upScroll = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear'
      })
      upScroll.translateY('-80vh').step();
      this.setData({
        upScroll: upScroll.export(),
      })
    },
    closeModal: function () {
      const upScroll = wx.createAnimation({
        duration: 500,
        timingFunction: 'linear'
      })
      upScroll.translateY('80vh').step();
      this.setData({
        upScroll: upScroll.export(),
      })
    },
    changeModalStatus() {
      this.triggerEvent("closeModal")
    }
  }
})