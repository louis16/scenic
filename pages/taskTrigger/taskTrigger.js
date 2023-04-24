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
    navHeight: app.globalData.navHeight, //导航栏高度
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
        if (type == 'jpg' && data.data.complete_type == 1) { //如果是图文，1.5秒后直接获取奖励
          let timer = setTimeout(() => {
            this.completeTaskFun()
            clearTimeout(timer)
          }, 3500)
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
            this.data.originData.complete_type == 1 && this.completeTaskFun() //如果是mp3 则听完音频再获得奖励
          })
        }
      })
    } else {
      //直接到了这个页面？ TODO 如何处理？
    }
  },
  onReady() {},
  onShow() {
    if (this.sharedTaskId) {
      this.sharedTaskId = null
      this.completeTaskFun()
    }
  },
  onHide() {},
  onUnload() {
    if (this.data.isPlaying) {
      this.innerAudioContext.stop()
    }
    this.innerAudioContext && this.innerAudioContext.stop()
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  // 自定义分享
  onShareAppMessage() {
    this.sharedTaskId = this.data.originData.complete_id
    return {
      title: this.data.originData.name,
      path: "/pages/firstPage/fisrtPage ",
      imageUrl: 'https://img0.baidu.com/it/u=2206010993,3306791188&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=70daa72393d8b4f35136b5ceef2c414e'
    }
  },
  submitData() {
    const answer = this.data.originData.questions[0].answer
    if (this.data.originData.complete_type == 2) { //填空题
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
  bindKeyInput(e) {
    this.setData({
      inputAnswer: e.detail.value
    })
  },
  radioChange(e) {
    const RightAnswer = this.data.originData.questions[0].answer
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
    completeTask(this.data.originData.complete_id).then(res => {
      eventBus.emit('refreshTask')
      this.setData({
        rewards: res.rewards || [],
        quests: res.quests || [],
        showRight: res.rewards.length > 0 || res.quests.length > 0,
        videoEnd: false, //选择正确后，关闭答题界面
        audioEnd: false
      })
    })
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
      this.data.originData.complete_type == 1 && this.completeTaskFun() //如果是mp4 则听完音频再获得奖励
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