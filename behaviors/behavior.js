import {
  createScopedThreejs
} from './threejs-miniprogram'
import {
  registerGLTFLoader
} from './gltf-loader'
import cloneGltf from './gltf-clone'
const MODEL_URL1 = 'http://file.ysr.uninote.com.cn/images/Stork.glb'
const MODEL_URL2 = 'https://threejs.org/examples/models/gltf/Stork.glb'
// const MODEL_URL2 = 'https://kivicube-asset.kivisense.com/model/gltf/2.0/unify/J1Oclk00PtmdOQHZasfowV3-GXO7bD4s/J1Oclk00PtmdOQHZasfowV3-GXO7bD4s.gltf'
const MODEL_URL3 = 'http://file.ysr.uninote.com.cn/images/RobotExpressive.glb' // RobotExpressive helmet.glb Stork.glb

export default function getBehavior() {
  return Behavior({
    data: {
      width: 1,
      height: 1,
      fps: 0,
      memory: 0,
      cpu: 0,
    },
    methods: {
      onReady() {
        wx.createSelectorQuery()
          .select('#webgl')
          .node()
          .exec(res => {
            this.canvas = res[0].node
            const calcSize = (width, height) => {
              this.canvas.width = width
              this.canvas.height = height
              this.setData({
                width,
                height,
              })
            }
            calcSize(this.data.windowWidth, this.data.windowHeight - this.data.navHeight)
            this.initVK()
          })
      },
      onUnload() {
        if (this._texture) {
          this._texture.dispose()
          this._texture = null
        }
        if (this.renderer) {
          this.renderer.dispose()
          this.renderer = null
        }
        if (this.scene) {
          this.scene.dispose()
          this.scene = null
        }
        if (this.camera) this.camera = null
        if (this.model) this.model = null
        if (this._insertModel) this._insertModel = null
        if (this._insertModels) this._insertModels = null
        if (this.planeBox) this.planeBox = null
        if (this.mixers) {
          this.mixers.forEach(mixer => mixer.uncacheRoot(mixer.getRoot()))
          this.mixers = null
        }
        if (this.clock) this.clock = null

        if (this.THREE) this.THREE = null
        if (this._tempTexture && this._tempTexture.gl) {
          this._tempTexture.gl.deleteTexture(this._tempTexture)
          this._tempTexture = null
        }
        if (this._fb && this._fb.gl) {
          this._fb.gl.deleteFramebuffer(this._fb)
          this._fb = null
        }
        if (this._program && this._program.gl) {
          this._program.gl.deleteProgram(this._program)
          this._program = null
        }
        if (this.canvas) this.canvas = null
        if (this.gl) this.gl = null
        if (this.session) this.session = null
        if (this.anchor2DList) this.anchor2DList = []
      },
      loadTest() {
        console.log('------------------load test')

        let THREE = this.THREE;
        const loader = new THREE.GLTFLoader()
        loader.load(MODEL_URL1, gltf => {
          let model = {
            scene: gltf.scene,
            animations: gltf.animations,
          }
          console.log('model', model, 3333333333)
          this.MODEL3 = model
        }, (onProgress) => {
          console.log('onProgress', onProgress)
        }, (onError) => {
          console.log('onError', onError, 4444)
        })

      },
      loadTest3() {
        console.log('------------------load test3')

        let THREE = this.THREE;
        const loader = new THREE.GLTFLoader()
        loader.load(MODEL_URL3, gltf => {
          let model = {
            scene: gltf.scene,
            animations: gltf.animations,
          }
          console.log('model', model, 3333333333)
          this.MODEL3 = model

        }, (onProgress) => {
          console.log('onProgress', onProgress)
        }, (onError) => {
          console.log('onError', onError, 4444)
        })

      },
      initModel3(THREE, addModelFunc, url) {

        const loader = new THREE.GLTFLoader()
        loader.load(url, gltf => {
          let model = {
            scene: gltf.scene,
            animations: gltf.animations,
          }
          console.log('model', model, 3333333333)
          this.MODEL3 = model

          addModelFunc({}, 2, 3)
        }, (onProgress) => {
          console.log('onProgress', onProgress)
        }, (onError) => {
          console.log('onError', onError, 3333333333)
        })
      },

      initVK() {
        // 初始化 threejs
        this.initTHREE()
        // 自定义初始化
        if (this.init) this.init()

        this.loadRender("", MODEL_URL1);
      },

      loadRender(event, url2) {
        let url = url2 || event.currentTarget.dataset.url;
        console.log('load------------', url);
        const THREE = this.THREE
        const updateMatrix = (object, m) => {
          object.matrixAutoUpdate = false
          // object.matrix.fromArray(m)
        }
        const addModel = (anchor, rotate, type) => {
          let modelRef = null
          if (type === 3) {
            modelRef = this.MODEL3
          } else if (type === 2) {
            modelRef = this.MODEL2
          } else if (type === 1) {
            modelRef = this.MODEL1
          }
          console.log(modelRef, type, 'FDsafasdfasfdsaf')
          const size = {
            width: 5,
            height: 5
          }
          if (!modelRef) {
            console.warn('this.model 还没加载完成 ！！！！！', modelRef, `${type}${type}${type}`)
            return
          }

          let object = new THREE.Object3D()
          const model = this.getRobot(type)
          object.add(model)
          object._id = Number((Math.random() * 1000).toFixed(0))
          object._size = size

          // 适配 焦点
          this.camera.position.set(object.position.x, object.position.y, object.position.z);
          this.camera.position.add(new THREE.Vector3(100.0, 100.0, 100.0));
          this.camera.lookAt(object.position);
          this.camera.updateMatrix();

          updateMatrix(object, anchor.transform)
          this.planeBox.add(object)
        }
        const session = this.session = wx.createVKSession({
          track: {
            plane: {
              mode: 3
            },
            marker: true,
          },
          version: 'v1',
          gl: this.gl
        })
        this.clock = new THREE.Clock()

        session.start(err => {
          if (err) return console.error('VK error: ', err)
          console.log('@@@@@@@@ VKSession.version', session.version)
          const canvas = this.canvas
          const calcSize = (width, height) => {
            console.log(`canvas size: width = ${width} , height = ${height}`)
            this.canvas.width = width / 2
            this.canvas.height = height / 2
            this.setData({
              width,
              height,
            })
          }
          session.on('resize', () => {
            calcSize(this.data.windowWidth, this.data.windowHeight - this.data.navHeight)
          })
          // 平面集合
          const planeBox = this.planeBox = new THREE.Object3D()
          this.scene.add(planeBox)

          //同时加载多个模型
          this.initModel3(THREE, addModel, url)

          //限制调用帧率
          let fps = 30
          let fpsInterval = 1000 / fps
          let last = Date.now()
          // 逐帧渲染
          const onFrame = timestamp => {
            let now = Date.now()
            const mill = now - last
            // 经过了足够的时间
            if (mill > fpsInterval) {
              last = now - (mill % fpsInterval); //校正当前时间
              const frame = session.getVKFrame(canvas.width, canvas.height)
              if (frame) {
                this.render(frame)
              }
            }
            session.requestAnimationFrame(onFrame)
          }
          session.requestAnimationFrame(onFrame)
        })
      },

      initTHREE() {
        const THREE = this.THREE = createScopedThreejs(this.canvas)
        registerGLTFLoader(THREE)
        // 场景
        const scene = this.scene = new THREE.Scene()

        // 相机
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.width / this.canvas.height, 1, 1000)
        scene.add(this.camera);
        console.log("camera add scene ok");

        // 光源
        const light1 = new THREE.HemisphereLight(0xffffff, 0x444444) // 半球光
        light1.position.set(0, 0.2, 0)
        scene.add(light1)
        const light2 = new THREE.DirectionalLight(0xffffff) // 平行光
        light2.position.set(0, 0.2, 0.1)
        scene.add(light2)
        // 渲染层
        const renderer = this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        })
        renderer.gammaOutput = true
        renderer.gammaFactor = 2.2
      },

      updateAnimation() {
        console.log("=========== updateAnimation");
        const dt = this.clock.getDelta()
        if (this.mixers) this.mixers.forEach(mixer => mixer.update(dt))
      },

      copyRobot(type) {
        const model = type === 1 ? this.MODEL1 : type === 2 ? this.MODEL2 : this.MODEL3
        console.log("copyRobot: ", model, `${type}${type}${type}${type}${type}${type}${type}`)

        const THREE = this.THREE;

        const {
          scene,
          animations
        } = cloneGltf(model, THREE);

        scene.position.set(3, 6, -5)

        // 动画混合器
        const mixer = new THREE.AnimationMixer(scene)
        for (let i = 0; i < animations.length; i++) {
          const clip = animations[i]
          // 播放动画：默认 只播放第一个
          if (i === 0) {
            const action = mixer.clipAction(clip)
            action.play()
          }
        }
        this.mixers = this.mixers || []
        this.mixers.push(mixer)
        scene._mixer = mixer
        return scene
      },

      getRobot(type) {
        const THREE = this.THREE
        const model = new THREE.Object3D()
        model.add(this.copyRobot(type))

        this._insertModels = this._insertModels || []
        this._insertModels.push(model)
        if (this._insertModels.length > 5) {
          const needRemove = this._insertModels.splice(0, this._insertModels.length - 5)
          needRemove.forEach(item => {
            if (item._mixer) {
              const mixer = item._mixer
              this.mixers.splice(this.mixers.indexOf(mixer), 1)
              mixer.uncacheRoot(mixer.getRoot())
            }
            if (item.parent) item.parent.remove(item)
          })
        }
        return model
      },
    },
  })
}