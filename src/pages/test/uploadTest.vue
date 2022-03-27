<template>
  <view>
    <text>dddd</text>

    <input type="file" @change="changeHandler">

    <u-button @click="buttonClick">确认</u-button>

    <view>
      <image :src="imgsrc"
           style="width:200rpx; height: 200rpx;"
      @tap="imgClick"/>
    </view>

    <u-upload
        :fileList="fileList2"
        @afterRead="imgClick2"
        name="2"
        multiple
        :maxCount="1"
    ></u-upload>

    <u-button @click="getToken">getToken</u-button>


  </view>
</template>

<script>
import * as qiniu from 'qiniu-js'
import { pathToBase64, base64ToPath } from 'image-tools'
import {convertBase64ToBlob} from 'common/fileTransfer'
import axios, {Axios} from "axios";
import global from 'common/common'


export default {

  data() {
    return {
      token:"",
      fileList2:[],
      imgsrc:"https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png",
      base64Result:"",
      picFile:"",
      fileName:""
    }
  },
  methods:{
    getToken(){
      axios.get(global.commonLocalServer+"/files/getToken").then(res=>{
        this.token = res.data.data
        console.log(this.token)
      })
    },



    imgClick(){
      var that = this
      that.getToken()
      uni.chooseFile({
        count:1,
        success: function (res) {
          console.log(JSON.stringify(res.tempFilePaths));
          that.fileName = res.tempFiles[0].name
          that.imgsrc = res.tempFilePaths[0];
          // console.log(that.imgsrc)
        }
      })
    },

    imgClick2(event){
      var that = this
      that.getToken()
      console.log(event)
          // console.log(JSON.stringify(res.tempFilePaths));
      that.fileName = event.file[0].name
      console.log(that.fileName)
      that.imgsrc = event.file[0].url;
      console.log(that.imgsrc)
    },

    async buttonClick(e) {
//整体思路：先转成base64(通过image-tools组件)再转成blob
      var that = this
      // await that.getToken()
      console.log(this.token)

      await pathToBase64(this.imgsrc).then(base64 => {
            this.base64Result = base64;
          }).catch(error => {
            console.error(error)
          })
      this.picFile = new File([convertBase64ToBlob(this.base64Result)], this.fileName);
      let key = that.fileName;
      console.log(key)
      const token = that.token; //从服务器拿的并存在本地data里
      const putExtra = {
        fname: '',
        params: {},
        mimeType: ['image/png', 'image/jpeg', 'image/gif','video/mp4'],
      };
      const config = {
        useCdnDomain: false, //使用cdn加速
      };
      // this.uploadImgToQiniu(this.picFile)
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
          console.log(res);
        },
      });

      const options = {
        quality: 0.92,
        noCompressIfLarger: true
        // maxWidth: 1000,
        // maxHeight: 618
      }
      // qiniu.compressImage(file, options).then(data => {
      //   const observable = qiniu.upload(data.dist, key, token, putExtra, config)
      //   const subscription = observable.subscribe(observer) // 上传开始
      // })
    },

    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${event.name}`].length
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this[`fileList${event.name}`][fileListLen]
        this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileListLen++
      }
    },

    uploadImgToQiniu(file) {
      let that = this
      const axioInstance = axios.create({withCredentials:false});
      let data = new FormData();
      data.append('token','lBWb8CP90dSUR-ljomttFgKaJZYntGMCEKk8Oqt2:PT7aHGSo0ieLdx1wnXUsli_sayg=:eyJzY29wZSI6InRlc3QtMjAyMjAzMTMiLCJkZWFkbGluZSI6MTY0NzU5Nzc4Mn0=')
      data.append("file",file);
      axioInstance({
        method:'POST',
        url:'http://up-cn-east-2.qiniup.com',
        data:data,
        timeout:30000,
        onUploadProgress:(e)=>{
          var complete = (e.loaded / e.total);
          if (complete < 1){

          }
        }
        }).then(data =>{
        console.log("OK")
      })
    }

    // uploadFilePromise(url) {
    //   console.log(url)
    //   url = "https://csdnimg.cn/medal/qixiebiaobing1@240.png"
    //   return new Promise((resolve, reject) => {
    //     let a = uni.uploadFile({
    //       header:"http(s)://up-cn-east-2.qiniup.com",
    //       url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
    //       filePath: url,
    //       name: 'file',
    //       formData: {
    //         upload_token:'lBWb8CP90dSUR-ljomttFgKaJZYntGMCEKk8Oqt2:4sdZzVvgfzKHIj3nQTPAvbTYkH0=:eyJzY29wZSI6InRlc3QtMjAyMjAzMTMiLCJkZWFkbGluZSI6MTY0NzU2NzMxNH0=',
    //         fileName: 'test',
    //       },
    //       success: (res) => {
    //         setTimeout(() => {
    //           resolve(res.data.data)
    //         }, 1000)
    //       }
    //     });
    //   })
    // },
  }


}
</script>

<style scoped>

</style>