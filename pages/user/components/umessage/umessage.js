// pages/user/components/umessage/umessage.js
const app = getApp()
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    message:{
      type:String,
      value:''
    },
    messagetype:{
      type:String,
      value:''
    },
    hideClose:{
      type:Boolean,
      value:false
    },
    showtype:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    umessagebg:app.globalData.fileUserUrl+'umessage-bg.png',
  },
  attached() {
    if(this.data.hideClose){
      const that = this
      setTimeout(()=>{      
        this.triggerEvent('closeMessage')   
        that.triggerEvent('gotoPage')   
      },3000)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closeumessage:function(){
      this.triggerEvent('closeMessage')   
    }
  }
})
