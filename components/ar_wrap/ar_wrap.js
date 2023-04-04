import getBehavior from '../../behaviors/behavior'
import commonBehavior from '../../behaviors/commonBehavior'
import yuvBehavior from '../../behaviors/yuvBehavior'

const NEAR = 0.001
const FAR = 1000

Component({
  behaviors: [getBehavior(), yuvBehavior, commonBehavior],
  data: {
    theme: 'light',
    pictureAndMarkerId: [],
    modelUrls: ['http://file.ysr.uninote.com.cn/images/Character_Red.glb', 'https://threejs.org/examples/models/gltf/Stork.glb', 'http://file.ysr.uninote.com.cn/images/RobotExpressive.glb']
  },
  lifetimes: {
    detached() {
      console.log("页面detached")
      if (wx.offThemeChange) {
        wx.offThemeChange()
      }
    },
    ready() {
      console.log("页面准备完全")
    },
  },
  methods: {
    init() {
      this.initGL()
    },

    downloadPicture() {
      return this.initTest();
      let data = [{
        url: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/marker/2dmarker-test.jpg',
        key: 'imgUrl'
      }, {
        url: 'https://wujianar.oss-cn-hongkong.aliyuncs.com/a98a405c28c144c0b43ac5ce4ed7db0c/b0f131e8818348eeb160e081a936c578.jpg',
        key: 'imgUrl2'
      }, {
        url: 'https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg',
        key: 'imgUrl3'
      }]
      data.forEach(item => {
        this.download(item.url, item.key)
      })
    },
    download(url, field) {
      const _this = this
      //文件名设置为时间戳
      let fileName = new Date().valueOf();
      wx.downloadFile({ //下载图片到本地
        url: url,
        filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.jpeg',
        success(res) {
          console.log('downloadFile', res)
          if (res.statusCode === 200) {
            _this.setData({
              [field]: res.filePath,
            })
            console.log('传入：', res.filePath, '字段', field)
            let timer = setTimeout(() => {
              _this.addMarker(res.filePath, field)
              clearTimeout(timer)
            }, 200)
          }
        }
      })
    },
    render(frame) {
      this.renderGL(frame)
      const camera = frame.camera
      // 相机
      if (camera) {
        this.camera.matrixAutoUpdate = false
        this.camera.matrixWorldInverse.fromArray(camera.viewMatrix)
        this.camera.matrixWorld.getInverse(this.camera.matrixWorldInverse)
        const projectionMatrix = camera.getProjectionMatrix(NEAR, FAR)
        this.camera.projectionMatrix.fromArray(projectionMatrix)
        this.camera.projectionMatrixInverse.getInverse(this.camera.projectionMatrix)
      }
      // 更新动画
      this.updateAnimation()
      this.renderer.autoClearColor = false
      this.renderer.render(this.scene, this.camera)
      this.renderer.state.setCullFace(this.THREE.CullFaceNone)
    },
    addMarker(temp, field) {
      console.log('接收：', temp, '字段', field)
      const _this = this
      const fs = wx.getFileSystemManager()
      // 此处如果为jpeg,则后缀名也需要改成对应后缀
      const dateString = new Date().valueOf()
      const filePath = `${wx.env.USER_DATA_PATH}/${dateString}-marker-ar.jpeg`
      fs.saveFile({
        filePath,
        tempFilePath: temp,
        success: () => {
          let markerId = _this.session.addMarker(filePath)
          _this.data.pictureAndMarkerId.push({
            markerId,
            key: field
          })
          _this.setData({
            pictureAndMarkerId: this.data.pictureAndMarkerId
          })
        },
        fail: res => {
          console.error(res)
        }
      })
    },
    removeMarker() {
      if (this.markerId) {
        this.session.removeMarker(this.markerId)
        this.markerId = null
      }
    },
    getAllMarker() {
      console.log(this.session.getAllMarker(), this.data.pictureAndMarkerId)
    },
  },
})