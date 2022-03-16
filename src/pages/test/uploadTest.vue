<template>
  <view>
    <text>dddd</text>
    <input type="file" @change="changeHandler">
    <u-button @click="buttonClick">ddddd</u-button>
    <view >
      <img :src="imgsrc"
      @tap="imgClick"/>
    </view>


  </view>
</template>

<script>
import * as qiniu from 'qiniu-js'
export default {

  data() {
    return {
      imgsrc:"https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png",
    }
  },
  methods:{
    imgClick(){
      var that = this
      uni.chooseImage({
        count:1,
        success: function (res) {

          console.log(JSON.stringify(res.tempFilePaths));
          that.imgsrc = res.tempFilePaths[0];
        }
      })
    },
    buttonClick(e) {
      const file = this.imgsrc;
      const key = "yess.png";
      const token = "lBWb8CP90dSUR-ljomttFgKaJZYntGMCEKk8Oqt2:0SSfWDrbNObtS7SVesz98E7hdKQ=:eyJzY29wZSI6InRlc3QtMjAyMjAzMTMiLCJkZWFkbGluZSI6MTY0NzQ0NTg4MH0="; //从服务器拿的并存在本地data里
      const putExtra = {
        fname: '',
        params: {},
        mimeType: ['image/png', 'image/jpeg', 'image/gif'],
      };
      const config = {
        useCdnDomain: false, //使用cdn加速
      };
      const observable = qiniu.upload(file, key, token, putExtra, config);
      observable.subscribe({
        next: (result) => {
          // 主要用来展示进度
          console.warn(result);
        },
        error: () => {
          this.$notify('上传图片失败');
        },
        complete: (res) => {
          console.log(res.key);
        },
      });

      // const options = {
      //   quality: 0.92,
      //   noCompressIfLarger: true
      //   // maxWidth: 1000,
      //   // maxHeight: 618
      // }
      // qiniu.compressImage(file, options).then(data => {
      //   const observable = qiniu.upload(data.dist, key, token, putExtra, config)
      //   const subscription = observable.subscribe(observer) // 上传开始
      // })
    },
  }


}
</script>

<style scoped>

</style>