// pages/user/ranking/ranking.js
const app = getApp()
const { getRanksType,getRanksList,scenicDetail } = require('../common/api')
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
    fileUrl:app.globalData.fileUrl + '/',
    typeItmes:[],
    rankTData:[],
    rewardsData:{},
    rankData:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getRanksType()
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
  // 获取荣誉类别
  getRanksType(){
    const scenicDetailItem = scenicDetail()
    getRanksType({scenery_id:scenicDetailItem.id}).then(res => {
      this.setData({
        typeItmes : res
      })
      this.getRanksList(res[0].id)
      this.changeMoreNav()
    })
  },
   // 获取荣誉列表
  getRanksList(rank_id){
    const scenicDetailItem = scenicDetail()
    getRanksList({scenery_id:scenicDetailItem.id,rank_id:rank_id}).then(res => {
      const rankTData = []
      const rankData = []
      res.ranks.map((item,index) => {
        if(index < 3){
          rankTData.push(item)
        }else{
          rankData.push(item)
        }
      })
      

      if(res.rewards.length > 0){
        let rewards = res.rewards[0]
        if(!Array.isArray(rewards.rewards)){
          rewards = Object.value(rewards.rewards)
        }
        const rankNum = ['一','二','三','四','五','六','七','八','九','十']
        rewards.showRankNum = rankNum[rewards.rank -1]
        this.setData({
          rewardsData : rewards,
          shownoticeBody : true
        })
        console.log(res);    
      }

      this.setData({
        rankTData : rankTData,
        rankData:rankData
      })
      // this.changeMoreNav()
    })
  },
  // 阻止点击蒙蔽
  stopEvent(){
    return false
  },
  // 弹出获取前十排名弹出窗口
  openNoticeBody(){
    this.setData({
      shownoticeBody:true
    })
  },
  // 关闭获取前十排名弹出窗口
  closenNotice(){
    this.setData({
      shownoticeBody:false
    })
  },
  // 打开全部排行榜类型选择弹出窗口
  showMoreTypeWrap(){
    this.setData({
      showMoreTypes:true
    })
  },
   // 关闭全部排行榜类型选择弹出窗口
  closeMoreType(){
    this.setData({
      showMoreTypes:false
    })
  },
   // 选择排行榜类型排行榜
  changeMoreNav(e){
    const index = e ? parseInt(e.currentTarget.dataset.index) : 0
    const typeid = e ? parseInt(e.currentTarget.dataset.id) : 0
    this.setData({
      sindex:index,
      showMoreTypes:false
    })
    if(typeid !== 0){
      this.getRanksList(typeid)
    }

    this.setNavOffset(index)
  },
  // 设置排行榜类别导航条位置
  setNavOffset(tindex){
    const that = this
    let obj = wx.createSelectorQuery();
    obj.selectAll('.rankingnav_items > .tab').boundingClientRect()
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
     obj.selectAll('.rankingnav_items').boundingClientRect()
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

})