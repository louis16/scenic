const app = getApp()

const plugin = requirePlugin('routePlan');
let key = 'WAIBZ-ZM3KF-V6KJU-JMI5K-M3JV7-XYFVT'; //使用在腾讯位置服务申请的key
let referer = '游界原始人'; //调用插件的app的名称
Component({
  properties: {
    list: {
      type: Array,
    }
  },

  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
  },

  methods: {
    itemClick(e) {
      const item = e.currentTarget.dataset.item
      let endPoint = JSON.stringify({ //终点
        'name': item.name,
        'latitude': item.lat,
        'longitude': item.lng
      });
      let mode = 'walking'
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&mode=' + mode
      });
      this.triggerEvent("closeInput")
    }
  }
})