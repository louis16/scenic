// pages/user/ranking/ranking.js
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
    noticeContentBg:app.globalData.fileUserUrl+'notice-c-bg1.png',
    tempitem:['解锁任务','所获积分','完成任务','分享次数','在线时长','排行榜名次','解锁景观','合成物品次数','核销电子券']
  
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
    // this.setNavLine(tindex)
    that.setNavOffset(tindex)

  },
  setNavOffset(tindex){
    const that = this
    let obj = wx.createSelectorQuery();
    obj.selectAll('.rankingnav_items > .tab').boundingClientRect()
    // obj.selectAll('.rankingnav_items > .active > .navtext').boundingClientRect()
    // obj.select('.rankingnav').boundingClientRect()
    // obj.select('.rankingnav_items .active').boundingClientRect()
    // obj.select('.rankingnav_items .nav-line').boundingClientRect()
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
      // if(indexs - tindex > 1 && tindex > 1 && tindex + 2 < indexs ){  
      //     navitemsStyle = 'transform: translateX(-'+(l * (tindex - 1) )+'rpx);transition-duration: 0.3s;'
      // }else {
      //   if(this.data.navitemsStyle){       
      //     navitemsStyle = this.data.navitemsStyle
      //   }
      // }
      that.setData({
        navitemsStyle : navitemsStyle
      })  
    })
  }
  // setNavLine(tindex){
  //   const that = this
  //   let obj = wx.createSelectorQuery();
  //   obj.select('.rankingnav_items > .active > .navtext').boundingClientRect()
  //   obj.select('.rankingnav_items .nav-line').boundingClientRect()
  //   obj.exec(res =>{
  //     const aobj = res[0]
  //     const l = 188 * tindex
  //     const o = l +  (188-aobj.width*2)/2
  //     let style = ''
  //     style = 'width:'+aobj.width+'px;transform: translateX('+o+'rpx);transition-duration: 0.3s;'  
  //     that.setData({
  //       linestyle  : style
  //     })

  //    that.setNavOffset(tindex)
  //   })
    
  //   // let l = 750 / 4
  //   // const aobj = res[1][0]
  //   // const defoffset = res[2].left * 2
  //   // const pobj = res[3]
   
  //   // const left = (tindex ) * l
  //   //const left = pobj.left
  //   // console.log(left);
  //   // let style = ''    
  //   // style = 'width:'+aobj.width+'px;transform: translateX('+left+'rpx);transition-duration: 0.3s;'
  //   // // style = 'transform: translateX('+left+'rpx);transition-duration: 0.3s;'    
  //   // that.setData({
  //   //   linestyle  : style
  //   // })
  // }

})