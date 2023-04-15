const { getStorageSync,TOKEN } = require('../../util/util')
const { submitUserInfo,userOnline,scenicDetail } = require('./common/api')
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
    userbgurl:app.globalData.fileUserUrl+'usermain-bg.png',
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
    // this.userOnline()
    
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

   this.userOnline()
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
  // 页面跳转
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
  // 打开用户资料编辑弹窗
  showEditInfo() {
    this.setData({
      isshowUslide: true
    })
    const uslide = this.selectComponent('#uslide')
    uslide.showUslide()
  },
  //设置用户生日
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 设置用户性别
  setSelectSex(e) {
    const value = e.currentTarget.dataset['value'];
    this.setData({
      sex: value
    })
  },
  //保存用户生日 性别
  submitUserInfo() {
    const uslide = this.selectComponent('#uslide')
    uslide.showUslide()
    submitUserInfo({gender:this.data.sex,birthday:this.data.date}).then(res =>{
      this.setData({
        isshowMessage:true,
        isshowconfirm:false,
        showtype:'message',
        messagetype:'ok',
        message:'用户信息已保存',
      })
    })
    this.setData({
      userdata: {
        sex: this.data.sex,
        age: 23
      }
    })
  },
  // 获取用户信息
  userOnline(){
    const scenicDetailItem = scenicDetail()
    const token = getStorageSync(TOKEN)
    if(token){
      userOnline({scenery_id:scenicDetailItem.id}).then(res=>{
        console.log(res);
      })
    }
    
  },
  // 打开退出登录弹出窗口
  openloginOut(){
    this.setData({
      isshowMessage:true,
      isshowconfirm:true,
      showtype:'confirm',
      messagetype:'noicon'
    })
  },
  // 关闭退出弹出窗口
  closeMessage(){
    this.setData({
      isshowMessage:false,
      isshowconfirm:false
    })
  },
  // 点击退出
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