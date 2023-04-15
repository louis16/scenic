// pages/user/honour/honour.js
const { getHonourList,scenicDetail } = require('../common/api')
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
    startX: 0,
    startY: 0,
    direction: null, //活动方向 L 左滑  R 右滑
    types:[
      {
        title:'全部',
        typeid:0
      },{
        title:'积分',
        typeid:1
      },{
        title:'解锁任务',
        typeid:2
      },{
        title:'完成任务',
        typeid:3
      },{
        title:'分享次数',
        typeid:4
      },{
        title:'在线时长',
        typeid:5
      },{
        title:'排行榜名次',
        typeid:6
      },{
        title:'解锁景观',
        typeid:7
      },{
        title:'合成物品次数',
        typeid:8
      },{
        title:'核销电子券',
        typeid:9
      }
    ],
    listData:[]
    // tempitems:new Array(13).fill('默认值')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.changeNav()
    this.getHonourList()
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
  touchstart(e){
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  touchmove(e){
     let startX = this.data.startX // 开始x坐标
     let startY = this.data.startY // 开始y坐标
     let touchMoveX = e.changedTouches[0].clientX // 活动变化坐标
     let touchMoveY = e.changedTouches[0].clientY //滑动变化坐标
     let angle = this.angle({
       X: startX,
       Y: startY
     }, {
       X: touchMoveX,
       Y: touchMoveY
     })
     //滑动角度超过45retrun
    //  console.log(Math.abs(angle),"Math.abs(angle)")
     if (Math.abs(angle) > 45) return
     if (touchMoveX > startX) { //右滑
       this.setData({
         direction: 'R'
       })
     } else {
       this.setData({ //左滑
         direction: 'L'
       })
     }
  },
  touchend(e){
    let that = this
    let statrx = that.data.startX
    let endx = e.changedTouches[0].clientX
    const s = statrx - endx
    if(Math.abs(s) < 10){
      return false
    }

    let obj = wx.createSelectorQuery();
     obj.selectAll('.honournav_items').boundingClientRect()
     obj.exec(res => {
       const domobj = res[0][0]
       const left = domobj.left
       const width = domobj.width
       let offsetLeft = 0
       if(endx < 0){
         endx = 0
       }else if(endx > 350){
         endx = 350
       } 
        if (that.data.direction == 'R') { // 左滑相当于上一页   
          offsetLeft =  endx - statrx
          offsetLeft = left + offsetLeft 
          if(offsetLeft > 15){
            offsetLeft = 0
          }
          // console.log("左滑",offsetLeft)//这里大家可以根据需求调用接口
        } else if (that.data.direction == 'L') { //右滑相当于下一页
          offsetLeft = endx - statrx
          offsetLeft = left + offsetLeft 
          if(width < Math.abs(offsetLeft) + 350){
            offsetLeft = -(width -350)
          }
          // console.log("右滑",offsetLeft)//这里大家可以根据需求调用接口
        } else { // 相当于滑动不成立,清空driection
          that.setData({
            direction: ''
          })
        }

        const navitemsStyle = 'transform: translateX('+ offsetLeft *2 +'rpx);transition-duration: 0.3s;'
        that.setData({
           navitemsStyle :navitemsStyle
         })
     })
    
   
    
  },
  // 滑动角度限制
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 / Math,atan()返回数据的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  },
  //获取荣誉列表
  getHonourList(type){
    const scenicDetailItem = scenicDetail()
    const senddata = {
      scenery_id : scenicDetailItem.id
    }
    if(type !== 0 && type !== undefined){
      senddata.type = type
    }
    getHonourList(senddata).then(res =>{
      this.setData({
        listData : res
      })
    })
  },
  stopEvent(){
    return false
  },
  // 显示获得新荣誉弹出窗口
  openNoticeBody(){
    this.setData({
      shownoticeBody:true
    })
  },
  // 关闭获得荣誉弹出窗口
  closenNotice(){
    this.setData({
      shownoticeBody:false
    })
  },
  // 打开类别选择窗口
  showMoreTypeWrap(){
    this.setData({
      showMoreTypes:true
    })
  },
  // 关闭类别选择窗口
  closeMoreType(){
    this.setData({
      showMoreTypes:false
    })
  },
  // 选择荣誉类别
  // changeMoreNav(e){
  //   const index = parseFloat(e.currentTarget.dataset.index)
  //   const type = parseFloat(e.currentTarget.dataset.type)
  //   this.setData({
  //     sindex:index,
  //     showMoreTypes:false
  //   })
  //   this.setNavOffset(index)
  //   this.getHonourList(type)
  // },
  
  changeNav(e){
    let tindex = 0
    let type = 0
    if(e){
       tindex = parseFloat(e.currentTarget.dataset.index);
       type = parseFloat(e.currentTarget.dataset.type)
    }
    const that = this
    that.setData({
      sindex:tindex
    })
    that.setNavOffset(tindex)
    this.getHonourList(type)

  },
  // 设置导航条偏移
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
        offleft = l * (tindex - 2) + 40
      }else{
        offleft = l * (tindex - 3) + 40
      }

      navitemsStyle = 'transform: translateX(-'+ offleft +'rpx);transition-duration: 0.3s;'
      that.setData({
        navitemsStyle : navitemsStyle
      })  
    })
  }
})