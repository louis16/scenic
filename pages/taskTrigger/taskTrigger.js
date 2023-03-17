//任务完成后触发的页面
const {
  completeTask
} = require("../../util/api");
const app = getApp()
const eventBus = app.globalData.bus
Page({

  data: {
    eventChannelRef: null,
    originData: {},
    inputAnswer: '',
    selectAnswer: ''
  },

  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    if (Object.keys(eventChannel).length) {
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        this.setData({
          eventChannelRef: eventChannel,
          originData: data.data
        })
      })
    } else {
      //直接到了这个页面？ TODO 如何处理？
    }
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  submitData() {
    const answer = this.data.originData.questions[0].answer
    if (this.data.originData.complete_type == 2) {
      if (answer == this.data.inputAnswer) {
        console.log('正确')
        completeTask(this.data.originData.complete_id).then(res => {
          eventBus.emit('refreshTask')
          wx.navigateBack()
        })
      } else {
        console.log('错误')
      }
    } else if (this.data.originData.complete_type == 3) {
      if (answer == this.data.selectAnswer) {
        console.log('选择正确')
        completeTask(this.data.originData.complete_id).then(res => {
          eventBus.emit('refreshTask')
          wx.navigateBack()
        })
      } else {
        console.log('选择错误')
      }
    }
  },
  bindKeyInput(e) {
    this.setData({
      inputAnswer: e.detail.value
    })
  },
  radioChange(e) {
    this.setData({
      selectAnswer: e.detail.value
    })
  }
})