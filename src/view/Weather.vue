<template>
  <div>
    <canvas id="canvas" width="780" height="300"></canvas>
    <div>{{parmas}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        parmas: [],
        py: Number,
        px: Number,
        xMin: Number,
        xMax: Number,
        yMin: Number,
        yMax: Number,
      };
    },
    created() {
      this.get();
    },
    methods: {
      async get() {
        const { data : res } = await this.axios('http://192.168.1.2:8301/' +
          'convection/api/autostation/show?basic=' +
          '1&encrypt=1&time=2020-01-02%2014%3A50%3A00')
        this.parmas = res.data

        let pyArr = []
        let pxArr = []
        for(let i =0;i<this.parmas.length;i++){
          this.px = Object.values(this.parmas[i])[2]
          pxArr.push(this.px)
          this.py = Object.values(this.parmas[i])[3]
          pyArr.push(this.py)
        }

        this.xMax = Math.max.apply(Math,pxArr)
        this.xMin = Math.min.apply(Math,pxArr)
        this.yMax = Math.max.apply(Math,pyArr)
        this.yMin = Math.min.apply(Math,pyArr)
        console.log(this.xMax);
        console.log(this.xMin);
        console.log(this.yMax);
        console.log(this.yMin);
        console.log(pxArr);
        console.log(pyArr);

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';

        for(let i =0;i<this.parmas.length;i++) {
          ctx.fillRect((pxArr[i] - this.xMin)*100,(pyArr[i] - this.yMin)*100,4,4)
          // ctx.fillRect(125,29,4,4)
          console.log(pxArr[i]);
          console.log(pyArr[i]);
        }
      }
    }
  };
</script>

<style scoped>
  #canvas{
    border:1px solid darkolivegreen;
  }

</style>
