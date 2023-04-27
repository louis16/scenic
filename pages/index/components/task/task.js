
const animation = require('../../../../util/animation')
// 背包组件逻辑
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: 'Hello, World!'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    slideDown: {},
    slideUp: {},
  },
  attached(){
    this.setData({
      slideDown: animation.slideDown,
      slideUp: animation.slideUp
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
