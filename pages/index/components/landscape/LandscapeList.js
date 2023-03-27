import commonBehavior from "../../../../behaviors/commonBehavior"

Component({
  behaviors: [commonBehavior],
  properties: {
    list: {
      type: Array,
      value: [],
    }
  },

  data: {},

  methods: {
    goLandscapeDetail(event) {
      const item = event.currentTarget.dataset.item
      this.triggerEvent('showLandScapeDetail', {
        item
      })
    }
  }
})