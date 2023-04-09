const app = getApp()
const eventBus = app.globalData.bus
Page({
  /**
   * 页面的初始数据
   */
  data: {
    usersex: false,
    date: '请选择日期',
    selectSex: 0,
    isshowUslide: false,
    isshowMessage:false,
    isshowconfirm:false,
    showtype:'confirm',
    messagetype:'noicon',
    message:'',
    sex: 1,
    userbgurl:app.globalData.fileUserUrl+'e-page-bg.png',
    userdata: {
      sex: 1,
      age: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //  this.getUserInfo()
    this.setData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  gotoPage(e) {
    const url = e.currentTarget.dataset['url'];
    wx.navigateTo({
      url: '/pages/user/' + url,
    })
  },
  shUslide(o) {
    this.setData({
      isshowUslide: o.detail.isshowSlide
    })
  },
  showEditInfo() {
    this.setData({
      isshowUslide: true
    })
    const uslide = this.selectComponent('#uslide')
    uslide.showUslide()
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  setSelectSex(e) {
    const value = e.currentTarget.dataset['value'];
    this.setData({
      sex: value
    })
  },
  setUserInfo() {
    const uslide = this.selectComponent('#uslide')
    uslide.showUslide()
    this.setData({
      userdata: {
        sex: this.data.sex,
        age: 23
      }
    })
  },
  openloginOut(){
    this.setData({
      isshowMessage:true,
      isshowconfirm:true,
      showtype:'confirm',
      messagetype:'noicon'
    })
  },
  closeMessage(){
    this.setData({
      isshowMessage:false,
      isshowconfirm:false
    })
  },
  loginout(){
    this.setData({
      isshowMessage:false,
      isshowconfirm:false
    })
  },
  handleFuncClick(event) {
    const {
      type
    } = event.detail;
    if (type == '5') return
    wx.navigateBack({
      success: function () {
        eventBus.emit('changeTab', type)
      }
    })
  }
})