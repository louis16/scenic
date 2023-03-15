// components/scrollnews/scrollnews.js
const app = getApp();
Component({
  properties: {
    top: {
      type: Number,
      value: 0,
    },
    canClose: {
      type: Boolean,
      value: true
    }
  },

  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
    hidden: false
  },

  methods: {
    closeMessage() {
      this.setData({
        hidden: true
      })
    }
  },
});