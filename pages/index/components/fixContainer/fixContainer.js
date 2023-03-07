const app = getApp();
Component({
  properties: {
    top: {
      type: Number,
    },
    height: {
      type: Number,
    },
    right: {
      type: Boolean,
      value: true,
    },

  },

  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
  },
  methods: {
    callPhone() {
      wx.makePhoneCall({
        phoneNumber: "23456789",
      });
    },
    itemClick(event) {
      const type = event.currentTarget.dataset.type;
      this.triggerEvent("layerClick", { type });
    },
    progressClick() {
      wx.showToast({
        title: "任务",
      });
    },
  },
});
