// pages/user/ecoupondetail/ecoupondetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowMessage:false,
    isshowconfirm:false,
    message:'',
    pagebgurl:app.globalData.fileUserUrl+'e-page-bg.png',
    eitembg:app.globalData.fileUserUrl+'e-item-bg.png',
    messagetype:'ok',
    showtype:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  showMessage(){
    // this.showEditInfo()
    this.setData({
      isshowMessage:true,
      isshowconfirm:false,
      message:'烤肠卷已核销成功',
      showtype:'message'
    })
  },
  closeMessage(){
    this.setData({
      isshowMessage:false,
      isshowconfirm:false
    })
  }
})