// pages/commonTemplate/templateComp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object,
      value:{},
      observer:function(n){
        console.log(n,111)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})