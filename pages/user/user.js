const { getStorageSync,TOKEN } = require('../../util/util')
const { submitUserInfo,getUserInfo,scenicDetail } = require('./common/api')
const app = getApp()
const eventBus = app.globalData.bus
Page({
  /**
   * 页面的初始数据
   */
  data: {
    usersex: false,
    isshowUslide: false,
    isshowMessage:false,
    isshowconfirm:false,
    showtype:'confirm',
    messagetype:'noicon',
    message:'',
    userbgurl:app.globalData.fileUserUrl+'usermain-bg.png',
    userInfo:{},
    userdata:'请选择日期',
    gender: 0
    
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

   this.getUserInfo()
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
      birthday: e.detail.value
    })
  },
  // 设置用户性别
  setSelectSex(e) {
    const value = e.currentTarget.dataset['value'];
    this.setData({
      gender : value
    })
  },
  //保存用户生日 性别
  submitUserInfo() {
    const uslide = this.selectComponent('#uslide')
    uslide.showUslide()
    submitUserInfo({gender:this.data.gender,birthday:this.data.birthday}).then(res =>{
      wx.showToast({
        title: '用户信息已保存',
        icon: 'success'
      })
      this.getUserInfo()
    })
    
  },
  // 获取用户信息
  getUserInfo(){
    const scenicDetailItem = scenicDetail()
    const token = getStorageSync(TOKEN)
    if(token){
      getUserInfo({scenery_id:scenicDetailItem.id}).then(res=>{
        res.age = this.getAge(res.birthday)
        this.setData({
          birthday:res.birthday.substring(0,10),
          gender:res.gender,
          userInfo : res
        })
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
  // 获取年龄
  getAge(s){
    let returnAge;
    const birthday = new Date(s)
    const birthYear = birthday.getFullYear();
    const birthMonth = birthday.getMonth() + 1;
    const birthDay = birthday.getDate() + 1;
   
    const d = new Date();
    const nowYear = d.getFullYear();
    const nowMonth = d.getMonth() + 1;
    const nowDay = d.getDate();
   
    if(nowYear == birthYear){
      returnAge = 0;//同年 则为0岁
    }
    else{
      const ageDiff = nowYear - birthYear ; //年之差
      if(ageDiff > 0){
        if(nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay;//日之差
          if(dayDiff < 0){
            returnAge = ageDiff - 1;
          }else{
            returnAge = ageDiff ;
          }
        }else{
          var monthDiff = nowMonth - birthMonth;//月之差
          if(monthDiff < 0){
            returnAge = ageDiff - 1;
          }else{
            returnAge = ageDiff ;
          }
        }
      }
      else
      {
        returnAge = -1;//出生日期不能大于今天
      }
    }
    return returnAge;
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