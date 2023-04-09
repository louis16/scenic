// pages/user/integralmall/integralmall.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowUslide:false,
    isshowMessage:false,
    isshowconfirm:false,
    message:'',
    umessageTitle:app.globalData.fileUserUrl+'u-m-umessage-title.png',
    messagetype:'ok',
    showtype:'',
    tempList:[],
    count:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const datalist = []
      for(let i = 0;i<= 13;i++){
        if(i < 11){
          datalist.push({
            id:i,
            title:'麻辣烤肠真是棒'+i,
            integralPrice:Math.round( Math.random()*1000),
            src:'/static/imgs/user/temp-3.png',
            isnull:false
          })
        }else{
          datalist.push({
            id:i,
            title:'麻辣烤肠真是棒'+i,
            integralPrice:Math.round( Math.random()*1000),
            src:'/static/imgs/user/temp-3.png',
            isnull:true
          })
        }
        
       
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
  setExchangeCount(e){
    const type = e.currentTarget.dataset.type
  
    let thisCount = this.data.count
    if(type == 0){
      if(thisCount > 1){
        thisCount -= 1
      }
    }else{
       thisCount += 1
    }
    this.setData({
      count:thisCount
    })
  },
  showEditInfo(e){
    const item = e.currentTarget.dataset.item
    if(item.isnull){
        this.setData({
          isshowMessage:true,
          message: '抱歉，'+item.title + '已售罄',
          messagetype:'error'
        })
    }else{
      this.setData({
        isshowUslide:true
      })
      const uslide = this.selectComponent('#uslide')
      uslide.showUslide()
    }
  
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