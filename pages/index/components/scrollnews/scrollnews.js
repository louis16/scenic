// components/scrollnews/scrollnews.js
const app = getApp();
Component({
  properties: {
    top: {
      type: Number,
      value: 0,
    },
  },

  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
  },

  methods: {},
});
