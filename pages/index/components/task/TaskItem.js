const {
  getTaskDetail
} = require("../../../../util/api");
const {
  rewwardsType,
  taskStatus,
  taskType,
  getDistance
} = require("../../../../util/constants");
const {
  showLoading,
  hideLoading,
  permission_request,
  showToast
} = require("../../../../util/util");
const app = getApp()
const eventBus = app.globalData.bus
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    quests: {
      type: Array,
      value: []
    },
    status: {
      type: String,
      value: ""
    },
    landscape_name: {
      type: String,
      value: ""
    },
    facility_name: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: [false, false, false, false, false], // // 这里表示列表项是否展开，默认初始时此数组的元素全为fasle，表示都没展开
    active: null, // 当前展开的项的index值
    rewwardsType: rewwardsType,
    taskStatus: taskStatus,
    taskType: taskType
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击列表,收缩与展示
    onListClick(event) {
      let index = event.currentTarget.dataset.index;
      let active = this.data.active;

      this.setData({
        [`selected[${index}]`]: !this.data.selected[`${index}`],
        active: index,
      });

      // 如果点击的不是当前展开的项，则关闭当前展开的项
      // 这里就实现了点击一项，隐藏另一项
      if (active !== null && active !== index) {
        this.setData({
          [`selected[${active}]`]: false,
        });
      }
    },
    async goFinish(event) {
      let type = event.currentTarget.dataset.tasktype;
      let id = event.currentTarget.dataset.id;
      console.log(type, id)
      //type 1:AR识别，2：定位，3：扫码
      if (type == 1) {
        showToast({
          title: 'AR任务',
          icon: 'none'
        })
      } else if (type == 2) {
        showLoading({
          title: '距离计算中...'
        })
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
            if (dis < element.accuracy) {
              hasNear = true
              getTaskDetail(element.id).then(taskDetail => {
                wx.navigateTo({
                  url: '/pages/taskTrigger/taskTrigger',
                  success: function (res) {
                    res.eventChannel.emit('acceptDataFromOpenerPage', {
                      data: {
                        ...taskDetail,
                        complete_id: id
                      },
                    })
                  }
                })
              })
              break
            }
          }
          hideLoading()
          hasNear ? showToast({
            title: 'doneeee',
            icon: 'none'
          }) : showToast({
            title: '暂未到达任务地点',
            icon: 'none'
          })
        } else {
          hideLoading()
          //没有权限，并拒绝了申请权限
          showToast({
            title: '暂无定位权限，无法计算位置信息',
            icon: 'none'
          })
        }
      } else if (type == 3) {
        getTaskDetail(id).then(taskDetail => {
          let temp = taskDetail.questions[0].options.map(item => {
            return {
              ...item,
              name: item.k,
              value: item.v
            }
          })
          taskDetail.questions[0].options = temp
          wx.navigateTo({
            url: '/pages/taskTrigger/taskTrigger',
            success: function (res) {
              res.eventChannel.emit('acceptDataFromOpenerPage', {
                data: {
                  ...taskDetail,
                  complete_id: id
                },
              })
            }
          })
        })
      }
    }
  }
})