Page({

  data: {

    latitude: 23.099994,

    longitude: 113.324520,

    markers: [{
        id: 1,
        width: 30,
        height: 30,
        latitude: 23.099994,
        longitude: 113.324520,
        name: 'T.I.T 创意园',
        iconPath: 'https://file.ysr.uninote.com.cn/images/qr_codes/ea0a1bb6d8bc32b1e43820d1a26e6199.png'
      },
      {
        id: 2,
        width: 30,
        height: 30,
        latitude: 23.099994,
        longitude: 113.344520,
        iconPath: 'http://file.ysr.uninote.com.cn/images/items/8c0629b76952637dad472266291d55d9.png'
      }, {
        id: 3,
        width: 30,
        height: 30,
        latitude: 23.099994,
        longitude: 113.304320,
        iconPath: 'http://file.ysr.uninote.com.cn/images/items/6c86d33d696221e6fa0097b01db226d6.png'

      }
    ],


  },

  onReady: function (e) {

    this.mapCtx = wx.createMapContext('myMap')

  },

  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })

  },

  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },

  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.099994,
        longitude: 113.304320,
      }]
    })
  }
})