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
    modelUrls: ['http://file.ysr.uninote.com.cn/images/Character_Red.glb', 'https://threejs.org/examples/models/gltf/Stork.glb', 'http://file.ysr.uninote.com.cn/images/RobotExpressive.glb'],
    testPicArr: []
  },
  lifetimes: {
    attached() {
      wx.showLoading({
        title: '加载中',
      })
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.setData({
          // https://file.ysr.uninote.com.cn/resource/shuiguai.gltf
          datas: [{
            url: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/marker/2dmarker-test.jpg',
            model: 'https://threejs.org/examples/models/gltf/Stork.glb',
            // model: 'https://file.ysr.uninote.com.cn/resource/shuiguai.gltf',
            key: '2dmarker'
          }, {
            url: 'https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg',
            model: 'http://file.ysr.uninote.com.cn/images/RobotExpressive.glb',
            // model: 'https://file.ysr.uninote.com.cn/resource/shuiguai.glb',
            key: 'dongwuyuan'
          }]
        }, () => {
          this.data.datas.forEach(item => {
            this.download(item.url, item.key)
          })
          this.initModelUrl()
          wx.hideLoading()
        })
      }, 2000)
    },
    detached() {
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

    downloadPicture(data) {

    },
    download(url, field) {
      const _this = this
      //文件名设置为时间戳
      let fileName = new Date().valueOf();
      wx.downloadFile({ //下载图片到本地
        url: url,
        filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.jpeg',
        success(res) {
          if (res.statusCode === 200) {
            _this.data.testPicArr.push(res.filePath)
            _this.setData({
              [field]: res.filePath,
              testPicArr: _this.data.testPicArr
            })
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
    addMarker(tempPath, field) {
      const _this = this
      const fs = wx.getFileSystemManager()
      // 此处如果为jpeg,则后缀名也需要改成对应后缀
      const dateString = new Date().valueOf()
      const filePath = `${wx.env.USER_DATA_PATH}/${dateString}-marker-ar.jpeg`
      fs.saveFile({
        filePath,
        tempFilePath: tempPath,
        success: () => {
          let markerId = _this.session.addMarker(filePath)
          _this.data.pictureAndMarkerId.push({
            markerId,
            key: field
          })
          _this.setData({
            pictureAndMarkerId: _this.data.pictureAndMarkerId
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
  },
})