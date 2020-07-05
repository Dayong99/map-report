<template>
  <div>
    <div id="cesiumContainer"></div>
    <!--    <canvas id="canvas"></canvas>-->
    <!--        <canvas id="canvas" :width="getWidth" :height="getHeight"></canvas>-->
  </div>
</template>

<script>
  import * as Cesium from 'cesium'

  export default {
    data () {
      return {
        parmas: [
          {
            'lon': 117.201,
            'lat': 31.8517,
            'qiya': 117.201,
            'wendu': 31.8517,
            'shidu': 50,
            'diwen': 1,
            'jiangshui': 9999
          },
          {
            'lon': 117.349,
            'lat': 31.9783,
            'qiya': 117.349,
            'wendu': 31.9783,
            'shidu': 25,
            'diwen': 1,
            'jiangshui': 9999
          },
          {
            'lon': 121.645,
            'lat': 31.0247,
            'qiya': 121.645,
            'wendu': 31.0247,
            'shidu': 4.5,
            'diwen': 1,
            'jiangshui': 9999
          },
          {
            'lon': 124.914,
            'lat': 29.0717,
            'qiya': 124.914,
            'wendu': 29.0717,
            'shidu': 44.5,
            'diwen': 1,
            'jiangshui': 9999
          }
        ],
        py: Number,
        px: Number,
        xMin: Number,
        xMax: Number,
        yMin: Number,
        yMax: Number,

        // westNum: Number,

        canvasUrl: '',
        scaleLevelL: '',

        getWidth: 775,
        getHeight: 295,
        scaleX: '',
        scaleY: '',
        radius: 15,
        firstParmsX: Number,
        firstParmsY: Number,
        secondParmsX: Number,
        secondParmsY: Number,
        thirdParmsX: Number,
        thirdParmsY: Number,
        fourthParmsX: Number,
        fourthParmsY: Number,
        fifthParmsX: Number,
        fifthParmsY: Number,
        img: '',
        arr: []
      }
    },
    created () {

    },
    mounted () {
      this.get()
    },
    watch: {
      scaleLevelL (newVal) {
        console.log(this.scaleLevelL)
        this.removeLayer()
        if (newVal === 2) {
          this.getWidth = 775 / 1.3
          this.getHeight = 295 / 1.3
          this.getLayer()
        } else if (newVal === 3) {
          this.removeLayer()
          this.getWidth = 775
          this.getHeight = 295
          this.getLayer()
        } else if (newVal === 4) {
          this.removeLayer()
          this.getWidth = 775 / 0.35
          this.getHeight = 295 / 0.35
          this.getLayer()
        } else if (newVal === 5) {
          this.removeLayer()
          this.getWidth = 775 / 0.28
          this.getHeight = 295 / 0.28
          this.getLayer()
        } else if (newVal === 6) {
          this.removeLayer()
          this.getWidth = 775 / 0.16
          this.getHeight = 295 / 0.16
          this.getLayer()
        } else if (newVal === 7) {
          this.removeLayer()
          this.getWidth = 775 / 0.12
          this.getHeight = 295 / 0.12
          this.getLayer()
        } else if (newVal === 8) {
          this.removeLayer()
          this.getWidth = 775 / 0.07
          this.getHeight = 295 / 0.07
          this.getLayer()
        } else if (newVal === 9) {
          this.removeLayer()
          this.getWidth = 775 / 0.0476
          this.getHeight = 295 / 0.0476
          this.getLayer()
        } else if (newVal === 10) {
          this.removeLayer()
          this.getWidth = 775 / 0.048
          this.getHeight = 295 / 0.048
          this.getLayer()
        }
      }
    },
    methods: {
      // 获取cesium
      getCesium () {
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YWQ2NGZkNC0yYjYzLTRiNzEtOWJjMi01Y2I5NGJlMzEyZGQiLCJpZCI6Mjk4NjAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTI4MTI1NTR9.-zUaIBAgYOlJ-36v2q9uy2BK4xPendbHEbX8JjKav-s'
        window.earth = new Cesium.Viewer('cesiumContainer', {
          imageryProvider: Cesium.createWorldImagery({
            style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
          }),
          baseLayerPicker: false,
        })
      },

      //获取数据
      get () {
        // const { data : res } = await this.axios('http://192.168.1.2:8301/' +
        //   'convection/api/autostation/show?basic=' +
        //   '1&encrypt=1&time=2020-01-02%2014%3A50%3A00')
        // this.parmas = res.data

        this.getCesium()
        // 获取camera的高度
        // 根据camera高度近似计算当前层级
        // 监听地图移动完成事件
        window.earth.camera.moveStart.addEventListener(() => {
          let height = Math.ceil(window.earth.camera.positionCartographic.height)
          let A = 40487.57
          let B = 0.00007096758
          let C = 91610.74
          let D = -40467.74
          this.scaleLevelL = Math.round(D + (A - D) / (1 + Math.pow(height / C, B)))
          // console.log(this.scaleLevelL)
        },)
      },

      // 获得canvas
      getCanvas () {
        const pyArr = []
        const pxArr = []
        for (let i = 0; i < this.parmas.length; i++) {
          this.px = Object.values(this.parmas[i])[2]
          pxArr.push(this.px)
          this.py = Object.values(this.parmas[i])[3]
          pyArr.push(this.py)
        }
        this.xMax = Math.max.apply(Math, pxArr)
        this.xMin = Math.min.apply(Math, pxArr)
        this.yMax = Math.max.apply(Math, pyArr)
        this.yMin = Math.min.apply(Math, pyArr)

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.style.width = 775 + 'px'
        canvas.style.width = 295 + 'px'
        canvas.width = this.getWidth
        canvas.height = this.getHeight
        ctx.font = 'normal normal 550 17px serif'

        // 放大倍数
        let scale = 0.08
        this.scaleX = canvas.width / (this.xMax - this.xMin) * scale
        this.scaleY = canvas.height / (this.yMax - this.yMin) * scale

        // 矩形范围
        let west = this.xMin + (this.xMax - this.xMin) / 2 - (this.xMax - this.xMin) / scale / 2
        let south = this.yMin + (this.yMax - this.yMin) / 2 - (this.yMax - this.yMin) / scale / 2
        let east = this.xMin + (this.xMax - this.xMin) / 2 + (this.xMax - this.xMin) / scale / 2
        let north = this.yMin + (this.yMax - this.yMin) / 2 + (this.yMax - this.yMin) / scale / 2

        // 参数位置
        this.firstParmsX = this.radius * (Math.sin((0) * Math.PI / 180)).toFixed(1)
        this.firstParmsY = this.radius * (Math.cos((0) * Math.PI / 180)).toFixed(1)
        this.secondParmsX = this.radius * (Math.sin((360 / 5) * Math.PI / 180)).toFixed(1)
        this.secondParmsY = this.radius * (Math.cos((360 / 5) * Math.PI / 180)).toFixed(1)
        this.thirdParmsX = this.radius * (Math.sin((360 / 5 * 2) * Math.PI / 180)).toFixed(1)
        this.thirdParmsY = this.radius * (Math.cos((360 / 5 * 2) * Math.PI / 180)).toFixed(1)
        this.fourthParmsX = this.radius * (Math.sin((360 / 5 * 3) * Math.PI / 180)).toFixed(1)
        this.fourthParmsY = this.radius * (Math.cos((360 / 5 * 3) * Math.PI / 180)).toFixed(1)
        this.fifthParmsX = this.radius * (Math.sin((360 / 5 * 4) * Math.PI / 180)).toFixed(1)
        this.fifthParmsY = this.radius * (Math.cos((360 / 5 * 4) * Math.PI / 180)).toFixed(1)

        // 向canvas映射地点、参数
        for (let i = 0; i < this.parmas.length; i++) {
          // 地点
          ctx.fillStyle = '#f94b52'
          ctx.fillRect((pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2, (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2, 4, 4)
          // 参数1
          for (let i = 0; i < this.parmas.length; i++) {
            ctx.fillStyle = '#a200ec'
            ctx.fillText('' + Object.values(this.parmas[i])[2], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.firstParmsX - 30,
              (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.firstParmsY + 10,)
          }
          // 参数2
          for (let i = 0; i < this.parmas.length; i++) {
            ctx.fillStyle = '#289434'
            ctx.fillText('' + Object.values(this.parmas[i])[3], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.secondParmsX + 3,
              (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.secondParmsY + 2)
          }
          // 参数3
          for (let i = 0; i < this.parmas.length; i++) {
            ctx.fillStyle = '#3a24ed'
            ctx.fillText('' + Object.values(this.parmas[i])[4], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.thirdParmsX,
              (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.thirdParmsY)
          }
          // 参数4
          for (let i = 0; i < this.parmas.length; i++) {
            ctx.fillStyle = '#e01549'
            ctx.fillText('' + Object.values(this.parmas[i])[5], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.fourthParmsX - 10,
              (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.fourthParmsY)
          }
          // 参数5
          for (let i = 0; i < this.parmas.length; i++) {
            ctx.fillStyle = '#1b5cf7'
            ctx.fillText('' + Object.values(this.parmas[i])[6], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.fifthParmsX - 35,
              (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.fifthParmsY + 2)
          }
        }
        // canvas.toBlob(function (blob) {
        //     var a = document.createElement('a')
        //     var body = document.getElementsByTagName('body')
        //     document.body.appendChild(a)
        //     a.download = 'img' + '.jpg'
        //     a.href = window.URL.createObjectURL(blob)
        //
        //     a.click()
        //     document.body.removeChild('a')
        // })
        return {
          canvas: canvas,
          west: west,
          south: south,
          east: east,
          north: north,
        }
      },

      // 清除图层
      removeLayer () {
        // let oneLayer = this.getLayer()
        // window.earth.imageryLayers.remove(oneLayer)
        this.arr.forEach(item => {
          window.earth.imageryLayers.remove(item)
        })
        this.arr = []
      },

      // 获得图层，将canvas画到cesium上
      getLayer () {
        // 从getCanvas()中获取canvas的url
        // 从getCanvas()中获取canvas的四角
        let west = this.getCanvas().west
        let south = this.getCanvas().south
        let east = this.getCanvas().east
        let north = this.getCanvas().north

        let layers = window.earth.scene.imageryLayers
        let blackMarble = layers.addImageryProvider(
          new Cesium.IonImageryProvider({ assetId: 3812 })
        )

        blackMarble.alpha = 0

        blackMarble.brightness = 0

        const layerLoad = layers.addImageryProvider(
          new Cesium.SingleTileImageryProvider({
            url: this.getCanvas().canvas.toDataURL(),
            rectangle: Cesium.Rectangle.fromDegrees(west, south, east, north),
          }),
        )
        // window.earth.imageryLayers.remove(layerLoad)
        // return layerLoad
        this.arr.push(layerLoad)
      },

      // 清除canvas
      removeCanvas () {
        // document.getElementById("canvas").clearCanvas()
        // let c = document.getElementById("canvas");
        // let cxt = c.getContext("2d");
        // c.height = c.height;
        // this.getCanvas().setAttribute('height', '2')
        // this.getCanvas().getContext("2d").clear()
        // this.getCanvas().width = this.getCanvas().width
        // let oneCanvas = document.getElementById("canvas");
        // let ctx = oneCanvas.getContext("2d");
        // // oneCanvas = ''
        // // ctx = ''
        // oneCanvas.style.width = 0 + 'px'
        // oneCanvas.style.width = 0 + 'px'
        // ctx.font = '';
        //
        //     let oneCanvas = this.getCanvas()
        //     oneCanvas = ''
      },
    },
  }
</script>

<style scoped>
  #canvas {
    border: 1px solid #0c6f58;
  }
</style>
