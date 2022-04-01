<template>
  <view class="wrap">
    <!--    自定义导航-->
        <u-navbar
            title="上传视频"
        >
        </u-navbar>
    <view class="top"  style="margin-top: 50rpx;"></view>
    <view class="content">
      <u-form ref="form1" :rules="rules" :model="videoData">
        <u-form-item label="视频名称" prop="phone">
          <u-input v-model="videoData.videoName" placeholder="视频名称" />
        </u-form-item>
        <u-form-item label="所属课程" prop="courseId">
          <u-input type="password" v-model="videoData.courseId" placeholder="所属课程" />
        </u-form-item>
      </u-form>
      <u-gap height="30"></u-gap>

      <u-upload
          :fileList="fileList1"
          @afterRead="afterRead"
          @delete="deletePic"
          name="1"
          :maxCount="10"
      ></u-upload>
      <u-button class="getSmsCode" @click="getToken">token</u-button>

      <u-button class="getSmsCode" @click="confirmAndSubmit">确认上传</u-button>

<!--      <u-button class="getSmsCode" @click="dated">确认上传</u-button>-->

    </view>
  </view>
</template>

<script>

import axios from "axios";
import {pathToBase64} from "image-tools";
import {convertBase64ToBlob} from "@/common/fileTransfer";
import global from 'common/common'
import * as qiniu from "qiniu-js";

export default {
  data() {
    return {
		userDt:{},
      token:"",
      fileList1:[],
      fileList2:[],
      picFile:"",
      videoData:{
        videoName:'',
        courseId: '',
        password: '',
      },
      rules: {
        'phone': {
          type: 'string',
          required: true,
          message: '请填写手机号',
          trigger: ['blur', 'change']
        },
        'password': {
          type: 'string',
          required: true,
          message: '请填写密码',
          trigger: ['blur', 'change']
        },
      },

    }
  },
  computed: {

  },
  created() {
    this.getToken()
  	// this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const value = uni.getStorageSync('userLocalData');
      if(value){
        // console.log(value)
        this.userDt = JSON.parse(value)
      }
    }catch(e){}

  },
  onLoad() {

  },
  methods: {

    // 删除图片
    deletePic(event) {
      console.log()
    },

    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      console.log(event)

      let lists = [].concat(event.file)
      console.log(lists)
      let fileListLen = this[`fileList${event.name}`].length
      console.log(fileListLen)
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
        console.log(`fileList${event.name}`)
        console.log(item)
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url,event)
        console.log(result)
        let item = this[`fileList${event.name}`][fileListLen]
        this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileListLen++
      }
    },

    async uploadFilePromise(url, event) {
      var that = this
      await pathToBase64(this.imgsrc).then(base64 => {
        this.base64Result = base64;
      }).catch(error => {
        console.error(error)
      })
      this.picFile = new File([convertBase64ToBlob(this.base64Result)], event.file.name);

      console.log(url)
      // let data = new FormData();
      // await data.append('token', that.token)
      // await data.append("file", that.picFile);
      // console.log(data)

      return new Promise((resolve, reject) => {
        console.log("event")
        console.log(event)
        // var fileName = event.file.name
        let a = uni.uploadFile({
          url: 'http://up-cn-east-2.qiniup.com', // 仅为示例，非真实的接口地址
          filePath: event.file.thumb,
          formData: {
            'key':Date.parse(new Date()) + event.file.name,
            "token":that.token
          },
          success: (res) => {
            console.log(res)
            setTimeout(() => {
              resolve(res.statusCode)
              let postData = {
                url:JSON.parse(res.data).key,
                createId:that.userDt.id
              }
              axios.post(global.commonLocalServer+"/files/addNewFile",postData,{
                headers:{
                  "token":that.userDt.token
                },
              }).then(res =>{
                console.log(res)
                if (res.data.flag === 'T'){
                  console.log("数据库添加成功")
                } else {
                  that.$u.toast('错误');
                }
              })
              console.log("上传成功，地址为" + JSON.parse(res.data).key)
            }, 1000)
          }
        });
      })
    },




    getToken(){
      // fetch(global.commonLocalServer+"/files/getToken",{
      //   method:"GET",
      //   headers:{'token':this.userDt.token},
      // }).then(res =>{
      //   return res.json()
      // }).then(res=>{
      //   console.log(res)
      // })

      // axios.get(global.commonLocalServer+"/files/getToken",
      //     {headers:{'token':this.userDt.token}}).then(res=>{
      //   this.token = res.data.data
      //   console.log(res)
      // })
      var that = this
      uni.request({
        url:global.commonLocalServer+"/files/getToken",
        method:"GET",
        header:{
          // 'Access-Control-Allow-Origin':'*',
          "content-type":"application/json",
          'token':that.userDt.token
        },
        success:function(res){
          that.token = res.data.data
          console.log(that.token)
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

    async confirmAndSubmit(e) {
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


    submit() {
      this.$refs.form1.validate().then(res => {
        let that = this;
        axios.get(global.commonLocalServer+'/users/login',{params:that.loginData}).then(function (res){
          console.log(res.data.flag)
          console.log(res.data)
          if (res.data.flag === "T"){
            console.log('success')
            // localStorage.setItem('userLocalData',JSON.stringify(res.data))
            that.$router.replace({path:'pages/index/index'})
          }else {
            that.$u.toast(res.data.errorInfo);
          }
        })
      }).catch(errors => {
        uni.$u.toast('请填写')
      })

    },
    registerClicked(type) {
      this.$router.replace({path:'pages/register/register'})

      this.$u.toast('开发中，敬请期待');
    },
    goPage(url) {
      this.$u.route({
        url: url
      })
    },

  }
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 28rpx;

  .content {
    width: 600rpx;
    margin: 0 auto;
    padding-top: 80rpx;

    .title {
      text-align: left;
      font-size: 60rpx;
      font-weight: 500;
      margin-bottom: 100rpx;
    }

    input {
      text-align: left;
      margin-bottom: 10rpx;
      padding-bottom: 6rpx;
    }

    .tips {
      color: $u-info;
      font-size: 20rpx;
      margin-bottom: 60rpx;
      margin-top: 30rpx;
    }

    .getSmsCode {
      background-color: rgb(253, 243, 208);
      color: $u-tips-color;
      border: none;
      font-size: 30rpx;
      padding: 12rpx 0;

      &::after {
        border: none;
      }
    }

    .alternative {
      color: $u-tips-color;
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
    }
  }

  .bottom {
    .loginType {
      display: flex;
      padding: 260rpx 150rpx 150rpx 150rpx;
      justify-content: space-between;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $u-content-color;
        font-size: 28rpx;
      }
    }

    .hint {
      padding: 20rpx 40rpx;
      font-size: 20rpx;
      color: $u-tips-color;

      .link {
        color: $u-warning;
      }
    }
  }
}
</style>

