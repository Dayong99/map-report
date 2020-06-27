<template>
  <div>
    <canvas id="canvas" width="780" height="300"></canvas>
    <div>{{parmas}}</div>
    <button @click="test">点击</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        parmas: [
          {"lon":124,"lat":28,"qiya":1,"wendu":21,"shidu":31,"diwen":41,"jiangshui":51},
          {"lon":123,"lat":27,"qiya":2,"wendu":22,"shidu":32,"diwen":42,"jiangshui":52},
          {"lon":125,"lat":26,"qiya":3,"wendu":23,"shidu":33,"diwen":43,"jiangshui":53},
          {"lon":122,"lat":25,"qiya":4,"wendu":24,"shidu":34,"diwen":44,"jiangshui":54}
          ],
        py: Number,
        px: Number,
        xMin: Number,
        xMax: Number,
        yMin: Number,
        yMax: Number,
      };
    },
    created() {

    },
    mounted () {
      this.get();
    },
    methods: {
      get() {
        // const { data : res } = await this.axios('http://192.168.1.2:8301/' +
        //   'convection/api/autostation/show?basic=' +
        //   '1&encrypt=1&time=2020-01-02%2014%3A50%3A00')
        // this.parmas = res.data

        let pyArr = []
        let pxArr = []
        for(let i =0;i<this.parmas.length;i++){
          this.px = Object.values(this.parmas[i])[0]
          pxArr.push(this.px)
          this.py = Object.values(this.parmas[i])[1]
          pyArr.push(this.py)
        }

        this.xMax = Math.max.apply(Math,pxArr)
        this.xMin = Math.min.apply(Math,pxArr)
        this.yMax = Math.max.apply(Math,pyArr)
        this.yMin = Math.min.apply(Math,pyArr)

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.font = "12px serif";
        const scaleX = canvas.height/(this.xMax - this.xMin)*0.7
        const scaleY = canvas.height/(this.yMax - this.yMin)*0.7
        const firstParmsX = 17*(Math.sin((360/5*0)*Math.PI/180)).toFixed(1)
        console.log(firstParmsX)
        const firstParmsY = 17*(Math.cos((360/5*0)*Math.PI/180)).toFixed(1)
        console.log(firstParmsY)
        const secondParmsX = 17*(Math.sin((360/5*1)*Math.PI/180)).toFixed(1)
        console.log(secondParmsX)
        const secondParmsY = 17*(Math.cos((360/5*1)*Math.PI/180)).toFixed(1)
        console.log(secondParmsY)
        const thirdParmsX = 17*(Math.sin((360/5*2)*Math.PI/180)).toFixed(1)
        console.log(thirdParmsX)
        const thirdParmsY = 17*(Math.cos((360/5*2)*Math.PI/180)).toFixed(1)
        console.log(thirdParmsY)
        const fourthParmsX = 17*(Math.sin((360/5*3)*Math.PI/180)).toFixed(1)
        console.log(fourthParmsX)
        const fourthParmsY = 17*(Math.cos((360/5*3)*Math.PI/180)).toFixed(1)
        console.log(fourthParmsY)
        const fifthParmsX = 17*(Math.sin((360/5*4)*Math.PI/180)).toFixed(1)
        console.log(fifthParmsX)
        const fifthParmsY = 17*(Math.cos((360/5*4)*Math.PI/180)).toFixed(1)
        console.log(fifthParmsY)

        for(let i =0;i<this.parmas.length;i++) {
          // 地点
          ctx.fillRect((pxArr[i] - this.xMin)*scaleX + 40, (pyArr[i] - this.yMin)*scaleY + 40,4,4)
          // 参数
          ctx.fillText(Object.values(this.parmas[i])[2],(pxArr[i] - this.xMin)*scaleX + 40 + firstParmsX,
            (pyArr[i] - this.yMin)*scaleY + 40 + firstParmsY + 8)
          ctx.fillText(Object.values(this.parmas[i])[3],(pxArr[i] - this.xMin)*scaleX + 40 + secondParmsX,
            (pyArr[i] - this.yMin)*scaleY + 40 + secondParmsY  +2)
          ctx.fillText(Object.values(this.parmas[i])[4],(pxArr[i] - this.xMin)*scaleX + 40 + thirdParmsX,
            (pyArr[i] - this.yMin)*scaleY + 40 + thirdParmsY)
          ctx.fillText(Object.values(this.parmas[i])[5],(pxArr[i] - this.xMin)*scaleX + 40 + fourthParmsX - 4,
            (pyArr[i] - this.yMin)*scaleY + 40 + fourthParmsY)
          ctx.fillText(Object.values(this.parmas[i])[6],(pxArr[i] - this.xMin)*scaleX + 40 + fifthParmsX - 6,
            (pyArr[i] - this.yMin)*scaleY + 40 + fifthParmsY  +2)

        }
      },
      test() {
        this.$router.push('test')
      }
    }
  };
</script>

<style scoped>
  #canvas{
    border:1px solid darkolivegreen;
  }

</style>
