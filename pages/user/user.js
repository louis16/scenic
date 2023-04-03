// pages/user/user.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    usersex: false,
    date:'2002-09-01',
    selectSex:0,
    isshowUslide:false,
    sex:1,
    userdata:{
      sex:1,
      age:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  //  this.getUserInfo()
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
    const url= e.currentTarget.dataset['url'];
    wx.navigateTo({
      url: '/pages/user/'+url,
    })
  },
  shUslide(o){
    this.setData({
      isshowUslide:o.detail.isshowSlide
    })
  },
  showEditInfo(){
    this.setData({
      isshowUslide:true
    })
    const uslide = this.selectComponent('#uslide')
    uslide.showUslide()
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  setSelectSex(e){
    const value = e.currentTarget.dataset['value'];
    this.setData({
      sex : value
    })
  },
  setUserInfo(){
    const uslide = this.selectComponent('#uslide')
    uslide.showUslide()
    this.setData({
      userdata : {
        sex:this.data.sex,
        age:23
      }
    })
  },
})