// pages/user/components/umessage/umessage.js
Component({
  options: {
    multipleSlots: true,
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
    showtype:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  created() {
  
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
