// pages/user/ecoupon/ecoupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sindex:0,
    linestyle:'',
    tempdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setNavLine()
    const names = ['烤肠卷','代金券','优惠券']
    const tempData = []
    for(let i=0;i<=7;i++){
      const item = {}
      const j = i%3
      item.name = names[j]
      item.type = j
      item.src = '/static/imgs/user/temp-3.png'
      item.bgsrc = '/static/imgs/user/u-e-item-bg'+(j+1)+'.png'
      item.classN = 'eitem-'+j
      item.count = '50'
      item.isdis = false
      item.text = '满300元可用'
      tempData.push(item)
    }
    const tempDis = ['已核销','已过期']
    for(let i=0;i<=4;i++){
      const item = {}
      const j = i%3
      const s = i%2
      item.name = names[j]
      item.distype = s
      item.isdis = true
      item.type = j
      item.src = '/static/imgs/user/temp-3.png'
      item.bgsrc = '/static/imgs/user/u-e-item-bg4.png'
      item.classN = 'eitem-3'
      item.count = '50'
      item.text = '满300元可用'
      tempData.push(item)
    }
    this.setData({
      tempdata: tempData
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
  showDetail(){
    wx.navigateTo({
      url: '../ecoupondetail/ecoupondetail'
    })
  },
  changeNav(e){
    let tindex = 0
    if(e){
       tindex = parseFloat(e.currentTarget.dataset.index);
    }
    this.setData({
      sindex:tindex
    })
    this.setNavLine()
    // const index = e.get
  },
  setNavLine(){
    const that = this
    let obj = wx.createSelectorQuery();
    obj.select('.ecoupon-main__nav > .active').boundingClientRect()
    obj.select('.ecoupon-main__nav .nav-line').boundingClientRect()
    obj.exec(res =>{
      const aobj = res[0]
      // const l = 188 * tindex
       const o = (aobj.left*2) - 20
      let style = ''
      style = 'transform: translateX('+o+'rpx);transition-duration: 0.3s;'  
      that.setData({
        linestyle  : style
      })

    })

  }
})