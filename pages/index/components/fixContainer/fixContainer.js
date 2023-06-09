const app = getApp();
const eventBus = app.globalData.bus
Component({
  properties: {
    top: {
      type: Number,
    },
    height: {
      type: Number,
    },
    right: {
      type: Boolean,
      value: true,
    },
    overview: {
      type: Object,
      value: null,
      observer: function (n) {
        if (n) {
          const total = n.total_unlock * 1 + n.total_unfinish * 1 + n.total_finished * 1;
          this.setData({
            unlock_h: n.total_unlock / total * 100,
            unfinish_h: n.total_unfinish / total * 100,
            finished_h: n.total_finished / total * 100,
          })
        }
      }
    }
  },

  lifetimes: {
    attached() {
      eventBus.on('closeProgress', () => {
        this.setData({
          showTask: false,
          showContent: false
        })
      })
    },
    detached() {
      eventBus.off('closeProgress')
    }
  },
  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
    showTask: false,
    showContent: false
  },
  methods: {
    callPhone() {
      this.triggerEvent("showSoS")
    },
    currentLocation() {
      this.triggerEvent("currentLocation")
    },
    itemClick(event) {
      const type = event.currentTarget.dataset.type;
      this.triggerEvent("layerClick", {
        type
      });
    },
    progressClick() {
      this.setData({
        showTask: !this.data.showTask
      }, () => {
        if (this.data.showTask) {
          let timer = setTimeout(() => {
            this.setData({
              showContent: true
            })
            clearTimeout(timer)
          }, 160)
        } else {
          this.setData({
            showContent: false
          })
        }
      })
    },
    openTask() {
      this.triggerEvent("openTaskList", {});
    }
  },
});