// pages/index/components/goodsList.js
const app = getApp()
Component({
  properties: {
    list: {
      type: Array,
      required: true,
      default: [],
    }
  },

  data: {
    filePath: app.globalData.fileUrl
  },

  methods: {
    goodItemClick(detail) {
      this.triggerEvent("goodclick", {
        ...detail.currentTarget.dataset.item
      })
    }
  }
})