import commonBehavior from '../../../../behaviors/commonBehavior'
Component({
  behaviors: [commonBehavior],
  properties: {
    itemData: {
      type: Object
    }
  },

  lifetimes: {
    attached() {
      const {filePath,itemData} = this.data
      this.setData({
        imgPath:`${filePath}/${itemData.item.image}`
      })
      // setTimeout(() => {
      // 	this.setData({
      // 		content: false
      // 	})
      // }, 800)
    }
  },
  data: {
    list: [{}, {}, {}, {}],
    content: true
  },
  methods: {
    close() {
      this.triggerEvent('closeItem', {
        closeItem: true
      })
    },
  }
})