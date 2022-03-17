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
import { pathToBase64, base64ToPath } from 'image-tools'
import {convertBase64ToBlob} from 'common/fileTransfer'

export default {

  data() {
    return {
      imgsrc:"https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png",
      base64Result:"",
      picFile:""
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
    async buttonClick(e) {
//整体思路：先转成base64(通过image-tools组件)再转成blob
      await pathToBase64(this.imgsrc)
          .then(base64 => {
            // console.log(base64)
            this.base64Result = base64;
          })
          .catch(error => {
            console.error(error)
       })
      this.picFile = new File([convertBase64ToBlob(this.base64Result)], 'annnnnnnonymous.png');
      // console.log(this.picFile)
      const file = this.imgsrc;
      const key = "ymous.png";
      const token = "lBWb8CP90dSUR-ljomttFgKaJZYntGMCEKk8Oqt2:KtPayTr5kXPzIx9XGFtVb6dBIrg=:eyJzY29wZSI6InRlc3QtMjAyMjAzMTMiLCJkZWFkbGluZSI6MTY0NzUzNDY2NX0="; //从服务器拿的并存在本地data里
      // let formData = new FormData();
      // formData.append("file",this.imgsrc.raw)
      // console.log("formdata:")
      // console.log(formData)
      const putExtra = {
        fname: '',
        params: {},
        mimeType: ['image/png', 'image/jpeg', 'image/gif'],
      };
      const config = {
        useCdnDomain: false, //使用cdn加速
      };
      const observable = qiniu.upload(this.picFile, key, token, putExtra, config);
      observable.subscribe({
        next: (result) => {
          // 主要用来展示进度
          console.warn(result);
        },
        error: (e) => {
          console.log(e)
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