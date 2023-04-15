// pages/user/ecoupondetail/ecoupondetail.js
const { getCouponDetail } = require('../common/api')
const { formatTime } = require('../common/index')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowMessage:false,
    message:'',
    pagebgurl:app.globalData.fileUserUrl+'e-page-bg.png',
    eitembg:app.globalData.fileUserUrl+'e-item-bg.png',
    messagetype:'ok',
    showtype:'',
    filePath:app.globalData.fileUrl+'/',
    detailData:{},
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.getCouponDetail(id)
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
  getCouponDetail(id){
    getCouponDetail(id).then(res => {
      res.statusText = res.status == 1 ? '待核销' : res.status == 2 ? '已核销' : '已过期'
      res.expiry_finish_at = formatTime(res.expiry_finish_at,'Y年M月D日 h:m:s')
      res.expiry_start_at = formatTime(res.expiry_start_at,'Y年M月D日 h:m:s')
      this.setData({
       title:res.type == 1 ? '代金券' : res.type == 2 ? '兑换券' : '优惠券',
        detailData : res
      })
    })
  },
  showMessage(){
    // this.showEditInfo()
    this.setData({
      isshowMessage:true,
      message:'烤肠卷已核销成功',
      showtype:'message'
    })
  },
  gotoPage(){
    wx.navigateBack()
  },
  closeMessage(){
    this.setData({
      isshowMessage:false
    })
  }
})