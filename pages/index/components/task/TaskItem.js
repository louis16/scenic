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
  showToast,
  formatOption,
  getMyLocation
} = require("../../../../util/util");
const plugin = requirePlugin('routePlan');
let key = 'WAIBZ-ZM3KF-V6KJU-JMI5K-M3JV7-XYFVT'; //使用在腾讯位置服务申请的key
let referer = '游界原始人'; //调用插件的app的名称
const app = getApp()
Component({
  properties: {
    status: {
      type: String,
      value: ""
    },
    showMoreInfo: {
      type: Boolean,
      value: true
    },
    location: {
      type: Object,
      value: {}
    }
  },
  data: {
    selected: [], // // 这里表示列表项是否展开，默认初始时此数组的元素全为fasle，表示都没展开
    active: null, // 当前展开的项的index值
    rewwardsType: rewwardsType,
    taskStatus: taskStatus,
    taskType: taskType
  },

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
    handleQrCode(result, id) {
      let temp = app.globalData.qrCodeWatchLists.filter(item => {
        if (item.key == result) {
          return item
        }
      })
      if (temp.length === 0) {
        showToast({
          title: "未匹配到任务数据",
          icon: "none"
        })
        return
      }
      getTaskDetail(temp[0].id).then(taskDetail => {
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
    },
    async goFinish(event) {
      let type = event.currentTarget.dataset.tasktype;
      let id = event.currentTarget.dataset.id;
      let finished = event.currentTarget.dataset.finished;
      let max = event.currentTarget.dataset.max;
      let alert = event.currentTarget.dataset.alert;
      if (finished >= (max || 10000000)) {
        showToast({
          title: alert || '当前任务完成数以达到最大,无法继续参与',
          icon: 'none'
        })
        return
      }
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
          getMyLocation().then(res => {
            if (res) {
              for (let index = 0; index < temp.length; index++) {
                const element = temp[index];
                let dis = getDistance(element, {
                  lat: res.latitude,
                  lng: res.longitude,
                })
                if (dis < element.accuracy) {
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
                !hasNear && showToast({
                  title: '暂未到达任务地点',
                  icon: 'none'
                })
              }
            } else {
              showToast({
                title: '暂未获取到当前位置信息',
                icon: 'none'
              })
              return
            }
          })
        } else {
          //没有权限，并拒绝了申请权限
          showToast({
            title: '暂无定位权限，无法计算位置信息',
            icon: 'none'
          })
        }
        hideLoading();
      } else if (type == 3) {
        const _this = this
        wx.scanCode({
          success: function (res) {
            _this.handleQrCode(res.result, id)
          }
        })
      }
    },
    startNavigate() {
      if (this.data.location) {
        let endPoint = JSON.stringify({ //终点
          'name': this.data.location.name || this.data.location.landscape_name,
          'latitude': this.data.location.lat,
          'longitude': this.data.location.lng
        });
        let mode = 'walking'
        wx.navigateTo({
          url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&mode=' + mode
        });
      }
    }
  }
})