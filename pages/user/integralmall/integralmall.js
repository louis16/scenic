// pages/user/integralmall/integralmall.js
const { getStorageSync } = require('../../../util/util')
const { getGoodsList,getGoodsDetail,exchangeGoods,scenicDetail } = require('../common/api.js')
const { formatTime } = require('../common/index')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowUslide:false,
    isshowMessage:false,
    isshowconfirm:false,
    messagetype:'ok',
    showtype:'',
    message:'',
    umessageTitle:app.globalData.fileUserUrl+'u-m-umessage-title.png',
    filePath:app.globalData.fileUrl+'/',
    tempList:[],
    count:1,
    goodsList:[],
    detailData:[],
    amount:0,
    confirmMessage:'',
    navHeight: app.globalData.navHeight, //导航栏高度
    points:0,
    newexchange:'',
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.getGoodsList()   
      const userInfo = JSON.parse(getStorageSync('USERINFO'))
      userInfo.age = this.getAge(userInfo.birthday)
      this.setData({
        userInfo : userInfo
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
  //获取积分商城列表
  getGoodsList(){
    const scenicDetailItem = scenicDetail()
    getGoodsList({scenery_id:scenicDetailItem.id}).then(res => {
      const goods = res.goods
      goods.map(item =>{
          item.showName = this.formatCouponname(item)
      })
      //【明媚的小桃子】兑换了 1张 麻辣烤肠券
      let coupon_type = ''
      if(res.record_coupon_type == 2){
        coupon_type = '兑换券'
      }else if(res.record_coupon_type == 1){
        coupon_type = '优惠券'
      }else if(res.record_coupon_type == 3){
        coupon_type = '代金券'
      }
     if(coupon_type != '' && res.record_coupon_name != null){
      this.setData({
        goodsList : goods,
        points:res.points,
        newexchange:`【${res.record_coupon_name}】兑换了 1 张 ${coupon_type}`
      })
     }else{
      this.setData({
        goodsList : goods,
        points:res.points      
      })
     }
      
      
    })
  },
  // 选择兑换数量
  setExchangeCount(e){
    const type = e.currentTarget.dataset.type
    let thisCount = parseInt(this.data.count)
    if(type == 0){
      if(thisCount > 1){
        thisCount -= 1
      }
    }else{
       thisCount += 1
    }
    const amount = this.data.detailData.point * thisCount
    this.setData({
      amount : amount,
      count:thisCount,
      confirmMessage:'您是否确认消耗'+ amount +'积分兑换'+ thisCount +'张'+this.data.detailData.showName+'？',
    })
  },
  // 打开兑换窗口
  showExchangeItem(e){
    const {id} = e.currentTarget.dataset
    getGoodsDetail(id).then(res => {
      if(res.stock_status == 0){
        this.setData({
          isshowMessage:true,
          message: '抱歉，'+res.showName + '已售罄',
          messagetype:'error',
          showtype:''
        })
      }else{
        res.showName = this.formatCouponname(res)
        res.expiry_finish_at = formatTime(res.expiry_finish_at,'Y年M月D日 h:m:s')
        this.setData({
          count:1,
          amount:res.point,
          detailData : res,
          confirmMessage:'您是否确认消耗'+ res.point +'积分兑换1张'+res.showName+'？',
          isshowUslide:true
        })
        const uslide = this.selectComponent('#uslide')
        uslide.showUslide()
      }
    })
  },
  // 设置输出商品名称
  formatCouponname(item){
    if(item.coupon_type == 1){
      // return item.coupon_amount + '元代金券'
      return  '代金券'
    }else if(item.coupon_type == 3){
      // return item.coupon_amount + '折优惠券'
      return '优惠券'
    }else{
      return item.coupon_name
    }
  },
  // 关闭兑换窗口 子组件调用
  shUslide(o){
    this.setData({
      isshowUslide:o.detail.isshowSlide
    })
  },

  // 显示确认兑换窗口
  showconfirm(){
    this.setData({
      isshowUslide:false,
      isshowMessage:true,
      isshowconfirm:true,
      showtype:'confirm'
    })
  },
  // 设置兑换数量
  setCount(e){
    let count = parseInt(e.detail.value)
    if(isNaN(count)||count <= 0){
      count = 1
    }else if(count > 999){
      count = 999
    }
    const amount = this.data.detailData.point * count
    this.setData({
      amount : amount,
      count:count,
      confirmMessage:'您是否确认消耗'+ amount +'积分兑换'+ count +'张'+this.data.detailData.showName+'？',
    })
  },
  // 提交兑换请求
  submitExchange(){
    const that = this
    exchangeGoods(this.data.detailData.id,{amount:this.data.count}).then(res => {
      that.setData({
        isshowconfirm:false,
        messagetype:'error',
        showtype:'success'
        
      })      
    }).catch(error =>{
      if(error.errors){ 
          that.setData({
            isshowMessage:true,
            isshowconfirm:false,
            messagetype:'error',
            showtype:'message',
            message:error.errors[0]
          })      
      }
    })
    
  },
    // 关闭返回对话弹出 子组件调用
  closeMessage(){
    this.setData({
      isshowUslide:false,
      isshowMessage:false,
      isshowconfirm:false,
      messagetype:'',
      showtype:'',
      message:'',
    })
  },
    // 获取年龄
    getAge(s){
      let returnAge;
      const birthday = new Date(s)
      const birthYear = birthday.getFullYear();
      const birthMonth = birthday.getMonth() + 1;
      const birthDay = birthday.getDate() + 1;
     
      const d = new Date();
      const nowYear = d.getFullYear();
      const nowMonth = d.getMonth() + 1;
      const nowDay = d.getDate();
     
      if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
      }
      else{
        const ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
          if(nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay;//日之差
            if(dayDiff < 0){
              returnAge = ageDiff - 1;
            }else{
              returnAge = ageDiff ;
            }
          }else{
            var monthDiff = nowMonth - birthMonth;//月之差
            if(monthDiff < 0){
              returnAge = ageDiff - 1;
            }else{
              returnAge = ageDiff ;
            }
          }
        }
        else
        {
          returnAge = -1;//出生日期不能大于今天
        }
      }
      return returnAge;
    }
})