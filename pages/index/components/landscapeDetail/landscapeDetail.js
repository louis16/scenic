import commonBehavior from '../../../../behaviors/commonBehavior'
const {
  taskType,
  taskStatus
} = require("../../../../util/constants");
Component({
  behaviors: [commonBehavior],
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  lifetimes: {
    attached() {
      console.log(taskStatus, this.data.item.status)
      this.setData({
        imgUrl: `${this.data.filePath}/${this.data.item.image}`
      })
    }
  },
  data: {
    taskType: taskType,
    taskStatus: taskStatus
  },
  methods: {

  }
})