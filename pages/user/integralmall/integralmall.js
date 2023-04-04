// pages/user/integralmall/integralmall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowUslide:false,
    isshowMessage:false,
    isshowconfirm:false,
    message:'',
    messagetype:'ok',
    showtype:'',
    tempList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const datalist = []
      for(let i = 0;i<= 13;i++){
        datalist.push({
          id:i,
          title:'麻辣烤肠真是棒'+i,
          integralPrice:Math.round( Math.random()*1000),
          src:'/static/imgs/user/temp-3.png'
        })
      }
      this.setData({
        datalist : datalist
      })
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

  showEditInfo(){
    this.setData({
      isshowUslide:true
    })
    const uslide = this.selectComponent('#uslide')
    uslide.showUslide()
  },
  shUslide(o){
    this.setData({
      isshowUslide:o.detail.isshowSlide
    })
  },
  closeMessage(){
    this.setData({
      isshowMessage:false,
      isshowconfirm:false
    })
  },
  showconfirm(){
    // this.showEditInfo()
    this.setData({
      isshowUslide:false,
      isshowMessage:true,
      isshowconfirm:true,
      showtype:'confirm'
    })
  },
  submitExchange(){
    this.setData({
      showtype:'success'
    })
  },
  setMessage(){
    this.setData({
        message:'烤肠券已达到兑换上限，无法兑换',
        messagetype:'error',
        showtype:''
    })
  }
})