const app = getApp()

const eventBus = app.globalData.bus
const {
  completeTask,
  getTaskDetail
} = require("../../util/api");
const {
  formatOption
} = require("../../util/util")
Page({
  data: {
    width: 300,
    height: 300,
    renderWidth: 300,
    renderHeight: 300,
    answerHeight: 0,
    answerRenderHeight: 0,
    recognizedIds: [],
  },
  onLoad(options) {
    const info = wx.getSystemInfoSync();
    const width = info.windowWidth;
    const height = info.windowHeight;
    const dpi = info.pixelRatio;
    this.height = height - app.globalData.navHeight
    this.width = width
    this.dpi = dpi
    this.setData({
      width: this.width,
      height: this.height,
      renderWidth: this.width * this.dpi,
      renderHeight: this.height * this.dpi,
    });
  },


  onUnload() {
    recognizedIds
  },
  handleArScan(res) {
    const taskId = res.detail.taskId
    const active = res.detail.active
    if (active) {
      console.log(this.data.recognizedIds, taskId, 333)
      if (!this.data.recognizedIds.includes(taskId)) {
        this.taskId = taskId
        getTaskDetail(taskId).then(taskDetail => {
          let data = formatOption(taskDetail)
          if (data.complete_type == 1) { //直接获得奖励
            this.completeTaskFun()
          } else if (data.complete_type == 2 || data.complete_type == 3) {
            this.setData({
              complete_type: data.complete_type,
              question: data.questions || [],
              height: this.height * 0.6,
              renderHeight: this.height * this.dpi * 0.6,
              answerHeight: this.height * 0.4,
              answerRenderHeight: this.height * this.dpi * 0.4,
            })
          }
        })
      }
    } else {
      this.setData({
        height: this.height,
        renderHeight: this.height * this.dpi,
        answerHeight: 0,
        answerRenderHeight: 0,
      });
    }
  },

  bindKeyInput(e) {
    this.setData({
      inputAnswer: e.detail.value
    })
  },
  submitData() {
    const answer = this.data.question[0].answer
    if (this.data.complete_type == 2) { //填空题
      if (answer == this.data.inputAnswer) {
        this.completeTaskFun()
      } else {
        this.setData({
          showError: true,
          inputAnswer: ''
        })
      }
    }
  },
  radioChange(e) {
    const RightAnswer = this.data.question[0].answer
    const SelectAnswer = e.currentTarget.dataset.value
    if (SelectAnswer == RightAnswer) { //选择题
      this.completeTaskFun()
    } else {
      this.setData({
        showError: true
      })
    }
  },
  completeTaskFun() {
    let temp = JSON.parse(JSON.stringify(this.data.recognizedIds))
    temp.push(this.taskId)
    //扫描成功，但并未完成此条任务
    // setTimeout(() => {
    //   this.setData({
    //     recognizedIds: temp
    //   }, () => console.log(this.data.recognizedIds, 1111))
    // }, 2000)
    // return
    completeTask(this.taskId).then(res => {
      eventBus.emit('refreshTask')
      this.setData({
        rewards: res.rewards || [],
        quests: res.quests || [],
        recognizedIds: temp,
        showRight: res.rewards.length > 0 || res.quests.length > 0,
      })
    })
  },
  closePage() {
    this.setData({
      showRight: false
    })
    // wx.navigateBack()
  },
  handleUseFocus(event) {
    this.setData({
      isFocus: event.type === 'focus'
    })
  },
  reAnswer() {
    this.setData({
      showError: false
    })
  }
})