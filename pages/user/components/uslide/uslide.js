// pages/user/components/uslide/uslide.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    height:{
      type:String,
      value:'-1200rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    slideAnimation:{},
    offsetHeight:'-1200rpx',
    // offsetHeight:'0rpx',
    isshowSlide:true
  },
  created(){
    this.setData({
      offsetHeight:this.data.height
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    animationCall:function(){
      if(!this.data.isshowSlide){
        this.triggerEvent('shUslide',{isshowSlide:this.data.isshowSlide})
      }  
      this.setData({
        isshowSlide : !this.data.isshowSlide
      })  
    },
    changeModalStatus:function(isshowSlide){
      const that = this
      const slideAnimation = wx.createAnimation({
        duration: 100,
        timingFunction: "linear",
      });
      if(isshowSlide){   
        slideAnimation.bottom('0rpx').step()
        that.setData({
          slideAnimation: slideAnimation.export(),
        });     
      }else{  
        slideAnimation.bottom(that.data.offsetHeight).step()
        that.setData({
          slideAnimation: slideAnimation.export(),
        }); 
        
        // let query = wx.createSelectorQuery().in(that);
        // query.select('.uslide-main').boundingClientRect(rect=>{
        //   let clientHeight = rect.height;
        //   let clientWidth = rect.width;
        //   let ratio = 750 / clientWidth;
        //   let height = clientHeight * ratio;
        //   const sheight = '-'+(height+100) +'rpx'
        //   slideAnimation.bottom(sheight).step()
        //   that.setData({
        //     offsetHeight:sheight,
        //    slideAnimation: slideAnimation.export(),
        //  });
        // }).exec();   
      }  
      setTimeout(()=>{
          this.animationCall()
      },100)
    },
    showUslide:function(){
      const isshowSlide = this.data.isshowSlide
      this.changeModalStatus(isshowSlide)
    }
 
  }
})
