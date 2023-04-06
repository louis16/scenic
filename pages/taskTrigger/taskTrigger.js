//任务完成后触发的页面
const {
  completeTask
} = require("../../util/api");
const app = getApp()
const eventBus = app.globalData.bus
Page({

  data: {
    originData: {},
    inputAnswer: '',
    filePath: app.globalData.fileUrl,
    resourceType: '',
    rewards: [],
    quests: [],
    navHeight: app.globalData.navHeight + 18, //导航栏高度
    windownHeight: app.globalData.windowHeight,

    isPlaying: false,
    progress: 0,
    duration: 0,
    progressText: '00:00',
    durationText: '00:00',
  },

  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    if (Object.keys(eventChannel).length) {
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        let show_resource = data.data.show_resource
        let type = show_resource?.endsWith('mp4') ? 'mp4' : show_resource?.endsWith('mp3') ? 'mp3' : 'jpg'
        this.setData({
          originData: data.data,
          resourceType: type
        })
        if (data.data.complete_type == 1) { //直接获取奖励
          let timer = setTimeout(() => {
            completeTask(this.data.originData.complete_id).then(res => {
              eventBus.emit('refreshTask')
              this.setData({
                rewards: res.rewards || [],
                quests: res.quests || [],
                showRight: res.rewards.length > 0 || res.quests.length > 0,
              })
            })
            clearTimeout(timer)
          }, 1500)
        }
        if (type == 'mp3') {
          this.innerAudioContext = wx.createInnerAudioContext({
            useWebAudioImplement: false
          })
          this.innerAudioContext.src = this.data.filePath + '/' + data.data.show_resource
          this.innerAudioContext.onEnded((e) => {
            this.innerAudioContext.stop()
            this.setData({
              audioEnd: true,
              isPlaying: false
            })
          })
        }
      })
    } else {
      //直接到了这个页面？ TODO 如何处理？
    }
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {
    if (this.data.isPlaying) {
      this.innerAudioContext.stop()
    }
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  submitData() {
    const answer = this.data.originData.questions[0].answer
    if (this.data.originData.complete_type == 2) { //填空题
      if (answer == this.data.inputAnswer) {
        completeTask(this.data.originData.complete_id).then(res => {
          eventBus.emit('refreshTask')
          // wx.navigateBack()
          this.setData({
            rewards: res.rewards || [],
            quests: res.quests || [],
            showRight: res.rewards.length > 0 || res.quests.length > 0,
          })
        })
      } else {
        this.setData({
          showError: true,
          inputAnswer: ''
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
    if (SelectAnswer == RightAnswer) { //选择题
      completeTask(this.data.originData.complete_id).then(res => {
        eventBus.emit('refreshTask')
        this.setData({
          rewards: res.rewards || [],
          quests: res.quests || [],
          showRight: res.rewards.length > 0 || res.quests.length > 0,
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
  },
  binderror(e) {
    return e
  },
  bindended(e) {
    if (e.type === 'ended') {
      this.setData({
        videoEnd: true
      })
    }
  },
  rePlay() {
    wx.createVideoContext('myVideo').play()
    this.setData({
      videoEnd: false
    })
  },
  formatTime(s) {
    let t = ''
    s = Math.floor(s)
    if (s > -1) {
      let min = Math.floor(s / 60) % 60
      let sec = s % 60
      if (min < 10) {
        t += "0"
      }
      t += min + ":"
      if (sec < 10) {
        t += "0"
      }
      t += sec
    }
    return t
  },
  audioPlayTime(manager) {
    const that = this
    if (that.data.isPlaying) {
      setTimeout(() => {
        if (that.data.isPlaying) {
          that.setData({
            progress: Math.ceil(manager.currentTime),
            progressText: that.formatTime(Math.ceil(manager.currentTime)),
            duration: Math.ceil(manager.duration),
            durationText: that.formatTime(Math.ceil(manager.duration))
          })
          this.audioPlayTime(manager)
        }
      }, 1000)
    }
  },
  sliderChange(e) {
    this.innerAudioContext.pause()
    this.innerAudioContext.seek(e.detail.value)
    this.setData({
      progress: e.detail.value,
      progressText: this.formatTime(e.detail.value)
    })
    setTimeout(() => {
      this.innerAudioContext.play()
    }, 1000)
  },
  playAudio() {
    if (this.data.isPlaying) {
      this.innerAudioContext.pause()
      this.setData({
        isPlaying: false
      })
    } else {
      this.innerAudioContext.play()
      this.setData({
        isPlaying: true
      })
    }
    this.audioPlayTime(this.innerAudioContext)
  },
  rePlayAudio() {
    this.setData({
      audioEnd: false,
      progress: 0,
      progressText: '00:00',
      isPlaying: true
    })
    this.innerAudioContext.play()
    this.audioPlayTime(this.innerAudioContext)
  },
  handleUseFocus(event) {
    this.setData({
      isFocus: event.type === 'focus'
    })
  }
})