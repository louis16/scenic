import commonBehavior from '../../../../behaviors/commonBehavior'
import {
  goodComposition
} from '../../../../util/api'
import {
  getStorageSync,
  SCENICDETAIL
} from '../../../../util/util'

const app = getApp()
const eventBus = app.globalData.bus
Component({
  behaviors: [commonBehavior],
  properties: {
    itemData: {
      type: Object
    },
  },
  lifetimes: {
    attached() {
      const {
        filePath,
        itemData
      } = this.data
      this.setData({
        imgPath: `${filePath}/${itemData.item.image}`,
      })
    }
  },
  data: {},
  methods: {
    close() {
      this.triggerEvent('closeItem', {
        closeItem: true
      })
    },
    composition(event) {
      const pid = event.currentTarget.dataset.pid
      let detail = JSON.parse(getStorageSync(SCENICDETAIL));
      goodComposition({
        id: pid,
        scenery_id: detail.id
      }).then((res) => {
        eventBus.emit('refreshTask') //刷新物品接口
        if (res.rewards && res.rewards.length > 0) {
          this.setData({
            showRewards: true,
            rewards: res.rewards
          })
        } else {
          this.close()
        }
      })
    },
    closePage() {
      this.close()
    }
  }
})