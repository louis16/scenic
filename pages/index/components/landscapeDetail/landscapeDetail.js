import commonBehavior from '../../../../behaviors/commonBehavior'
import {
  getTaskDetail
} from '../../../../util/api';
import {
  permission_request,
  showToast,
  formatOption
} from '../../../../util/util';
const {
  taskType,
  taskStatus,
  rewwardsType,
  getDistance
} = require("../../../../util/constants");
const app = getApp()
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
      this.setData({
        imgUrl: `${this.data.filePath}/${this.data.item.image}`
      })
    }
  },
  data: {
    taskType: taskType,
    taskStatus: taskStatus,
    rewwardsType: rewwardsType
  },
  methods: {
    questTap(event) {
      const item = event.currentTarget.dataset.item
      const questStatus = item.status //任务完成状态 1>未完成，2>已完成，3>已过期
      const type = item.trigger_type //任务类型 1>AR，2>定位，3>扫码
      if (questStatus == 1) {
        this.handleTask(item.id, type)
      } else if (questStatus == 2) {
        showToast({
          title: '已完成当前任务',
        })
      } else if (questStatus == 3) {
        showToast({
          title: '当前任务已过期',
        })
      }
    },
    async handleTask(id, type) { //type 1>AR，2>定位，3>扫码
      if (type == 1) {

      } else if (type == 2) {
        let hasPermission = await permission_request("scope.userLocation", "地理位置")
        let hasNear = false
        if (hasPermission) {
          let temp = app.globalData.positionWatchLists.filter(item => item.id == id)
          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            let dis = getDistance(element, {
              lat: 30.7400153,
              lng: 104.0825747
            })
            if (dis < element.accuracy * 1000) {
              hasNear = true
              getTaskDetail(element.id).then(taskDetail => {
                const data = formatOption(taskDetail)
                wx.navigateTo({
                  url: '/pages/taskTrigger/taskTrigger',
                  success: function (res) {
                    res.eventChannel.emit('acceptDataFromOpenerPage', {
                      data: {
                        ...data,
                        complete_id: id
                      },
                    })
                  }
                })
              })
              break
            }
          }
          hasNear ? showToast({
            title: 'done',
            icon: 'none'
          }) : showToast({
            title: '暂未到达任务地点',
            icon: 'none'
          })
        } else {
          //没有权限，并拒绝了申请权限
          showToast({
            title: '暂无定位权限，无法计算位置信息',
            icon: 'none'
          })
        }
        getTaskDetail(id).then(res => {
          console.log(res)
        })
      } else if (type == 3) {
        wx.scanCode({
          success: function (res) {
            showToast({
              title: res.result,
              icon: "none"
            })
          }
        })
      }
    }
  }
})