// components/functionBar/bar.js
Component({
  properties: {

  },
  data: {
    isShow: false, //是否已经弹出
    anim1: {},
    anim2: {},
    anim3: {},
    anim4: {},
  },

  lifetimes: {
    attached() {
      // this.openAnimation.call(this)
    }
  },
  methods: {
    toggle: function () {
      this.data.isShow ? this.closeAnimation.call(this) : this.openAnimation.call(this)
      this.setData({
        isShow: !this.data.isShow
      })
    },
    openAnimation: function () {
      const anim1 = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      const anim2 = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      const anim3 = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      const anim4 = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      anim1.translate(-240, 0).opacity(1).step();
      anim2.translate(-180, 0).opacity(1).step();
      anim3.translate(-120, 0).opacity(1).step();
      anim4.translate(-60, 0).opacity(1).step();
      this.setData({
        anim1: anim1.export(),
        anim2: anim2.export(),
        anim3: anim3.export(),
        anim4: anim4.export(),
      })
    },
    closeAnimation: function () {
      const anim1 = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      const anim2 = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      const anim3 = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      const anim4 = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      anim1.translate(48, 0).opacity(0).step();
      anim2.translate(48, 0).opacity(0).step();
      anim3.translate(48, 0).opacity(0).step();
      anim4.translate(48, 0).opacity(0).step();
      this.setData({
        anim1: anim1.export(),
        anim2: anim2.export(),
        anim3: anim3.export(),
        anim4: anim4.export(),
      })
    },
    clickItem: function (e) {
      this.triggerEvent("clickItem", {
        type: e.currentTarget.dataset.type,
        name: e.currentTarget.dataset.name
      });
      this.closeAnimation.call(this)
      this.setData({
        isShow: false
      })
    }
  }
})