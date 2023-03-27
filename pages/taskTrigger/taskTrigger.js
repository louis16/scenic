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
    filePath: app.globalData.fileUrl,
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
        completeTask(this.data.originData.complete_id).then(res => {
          eventBus.emit('refreshTask')
          // wx.navigateBack()
          this.setData({
            showRight: true
          })
        })
      } else {
        this.setData({
          showError: true
        })
      }
    }
  },
  bindKeyInput(e) {
    this.setData({
      inputAnswer: e.detail.value
    })
  },
  radioChange(e) {
    const RightAnswer = this.data.originData.questions[0].answer
    const SelectAnswer = e.currentTarget.dataset.value
    if (SelectAnswer == RightAnswer) {
      completeTask(this.data.originData.complete_id).then(res => {
        eventBus.emit('refreshTask')
        this.setData({
          showRight: true
        })
      })
    } else {
      this.setData({
        showError: true
      })
    }
  },
  reAnswer() {
    this.setData({
      showError: false
    })
  },
  closePage() {
    this.setData({
      showRight: false
    }, () => {
      let timer = setTimeout(() => {
        wx.navigateBack()
        clearTimeout(timer)
      }, 500)
    })
  }
})