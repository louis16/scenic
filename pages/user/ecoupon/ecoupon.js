// pages/user/ecoupon/ecoupon.js
const { getCouponsList,scenicDetail } = require('../common/api')
const { formatTime } = require('../common/index')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sindex:0,
    title:'',
    linestyle:'',
    tempdata:[],
    listData:[],
    isFunctinonBar:false,
    filePath:app.globalData.fileUrl+'/',
    navHeight: app.globalData.navHeight //导航栏高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCouponsList()
    const pages = getCurrentPages()
    const prvepage = pages[pages.length - 2]
    //FunctinonBar
    if(prvepage.route.indexOf('user') > 0){
      this.setData({
        isFunctinonBar : false
      })
    }else{
      this.setData({
        isFunctinonBar : true
      })
    }
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
  // 获取优惠券列表
  getCouponsList(){
    const scenicDetailItem = scenicDetail()
    getCouponsList({scenery_id:scenicDetailItem.id}).then(res =>{
      res.map(item => {
        item.show =  true
       
        if(item.status == 2 || item.status == 3  ){
          item.isdis = true
        }   
          this.setItemClass(item)
          item.expiry_finish_at = formatTime(item.expiry_finish_at,'Y-M-D h:m')
          item.expiry_start_at = formatTime(item.expiry_start_at,'Y-M-D h:m')
      })
      this.setData({
        listData : res
      })

    })
  },
  // 设置优惠券展示样式
  setItemClass(item){
    if(item.type == 1){
      item.class = 'eitem-1'
      item.bgsrc = '/static/imgs/user/u-e-item-bg001.png'
    }else if(item.type == 2){
      item.class = 'eitem-2'
      item.bgsrc = '/static/imgs/user/u-e-item-bg002.png'
    }else if(item.type == 3){
      item.class = 'eitem-3'
      item.bgsrc = '/static/imgs/user/u-e-item-bg003.png'
    }
    if(item.isdis){
      item.class = 'eitem-0'
      item.bgsrc = '/static/imgs/user/u-e-item-bg000.png'
    }
  },
  // 跳转优惠券详情
  showDetail(e){
    const id = parseFloat(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `../ecoupondetail/ecoupondetail?id=${id}`
    })
  },
  // 点击筛选并设置本地数据状态
  changeNav(e){
    let tindex = 0
    if(e){
       tindex = parseFloat(e.currentTarget.dataset.index);
    }
    const listData = this.data.listData
    listData.map(item => {
      if(tindex == 0){
        item.show = true
      }else{
        item.show = item.status == tindex
      }
    })
    this.setData({
      sindex:tindex,
      listData : listData
    })
  },
  handleFuncClick(event) {
    const {
      type
    } = event.detail;
    if (type == '2') return
    wx.navigateBack({
      success: function () {
        eventBus.emit('changeTab', type)
      }
    })
  }
  
})