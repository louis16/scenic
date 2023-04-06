// pages/index/components/message/message.js
Component({
  properties: {
    list: {
      type: Array,
      value: [{
        text: '亲爱的游客'
      }, {
        text: '亲爱的游客，为了感谢您光临天子奇石景亲爱的游客'
      }, {
        text: '亲爱的游客，，为了感谢您光临天子奇石景亲爱了感谢您光临天子奇石景'
      }, {
        text: '亲爱的游客，为了感谢'
      }, {
        text: '亲爱的游客，为了感谢您光临天子奇石景亲爱的游客了感谢您光临天子奇石景亲爱的游客了感谢您光临天子奇石景'
      }, ]
    }
  },

  data: {
    currentType: 'inform',
    showMore: [],
    currentIndex: -1
  },
  lifetimes: {
    ready() {
      // this.checkFold()
    }
  },
  methods: {
    changeTab(event) {
      let type = event.currentTarget.dataset.type
      this.setData({
        currentType: type
      })
    },
    checkFold() {
      let arr = []
      const _this = this
      const query = wx.createSelectorQuery().in(this);
      query.selectAll(".content-wrap").boundingClientRect(res => {
        this.width = res[0].width
      }).exec()
      query.selectAll(".message-content").boundingClientRect(res => {
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          arr.push(this.width < element.width)
        }
        _this.setData({
          showMore: arr
        })
      }).exec()
    },
    changeExpand(event) {
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
    }
  },
})