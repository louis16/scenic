// pages/user/honour/honour.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sindex:0,
    linestyle:'',
    showMoreTypes:false,
    shownoticeBody:false,
    navitemsStyle:'',
    noticeBodybg:app.globalData.fileUserUrl+'honour-newt-bg.png',
    honournewttitle:app.globalData.fileUserUrl+'honour-newt-title.png',
    temp04:app.globalData.fileUserUrl+'temp04.png',
    tempitem:['全部','解锁任务','所获积分','完成任务','分享次数','在线时长','排行榜名次','解锁景观','合成物品次数'],
    tempitems:new Array(13).fill('默认值')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.changeNav()
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
  stopEvent(){
    return false
  },
  openNoticeBody(){
    this.setData({
      shownoticeBody:true
    })
  },
  closenNotice(){
    console.log(11);
    this.setData({
      shownoticeBody:false
    })
  },
  showMoreTypeWrap(){
    this.setData({
      showMoreTypes:true
    })
  },
  closeMoreType(){
    this.setData({
      showMoreTypes:false
    })
  },
  changeMoreNav(e){
    const index = parseFloat(e.currentTarget.dataset.index)
    this.setData({
      sindex:index,
      showMoreTypes:false
    })
    this.setNavOffset(index)
  },

  changeNav(e){
    let tindex = 0
    if(e){
       tindex = parseFloat(e.currentTarget.dataset.index);
    }
    const that = this
    that.setData({
      sindex:tindex
    })
    that.setNavOffset(tindex)

  },
  setNavOffset(tindex){
    const that = this
    let obj = wx.createSelectorQuery();
    obj.selectAll('.honournav_items > .tab').boundingClientRect()
    obj.exec(res => {
      let indexs = 0
      let l = 172.5
      indexs = res[0].length
      let navitemsStyle = ''
      let offleft = 0
      
      if(tindex <  indexs - 2){
        offleft = l * (tindex - 1)
      }else if(tindex <  indexs - 1){
        offleft = l * (tindex - 2) + 30
      }else{
        offleft = l * (tindex - 3) + 30
      }
      navitemsStyle = 'transform: translateX(-'+ offleft +'rpx);transition-duration: 0.3s;'
      that.setData({
        navitemsStyle : navitemsStyle
      })  
    })
  }
})