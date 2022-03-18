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
          :fileList="fileList2"
          @afterRead="imgClick2"
          name="2"
          multiple
          :maxCount="1"
      ></u-upload>

      <u-button class="getSmsCode" @click="confirmAndSubmit">确认上传</u-button>


    </view>
  </view>
</template>

<script>

import axios from "axios";
import {pathToBase64} from "image-tools";
import {convertBase64ToBlob} from "@/common/fileTransfer";
import * as qiniu from "qiniu-js";

export default {
  data() {
    return {
      fileList2:[],

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
  onLoad() {

  },
  methods: {

    getToken(){
      axios.get("http://localhost:8082/files/getToken").then(res=>{
        this.token = res.data.data
        console.log(this.token)
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
        axios.get('http://localhost:8082/users/login',{params:that.loginData}).then(function (res){
          console.log(res.data.flag)
          console.log(res.data)
          if (res.data.flag === "T"){
            console.log('success')
            localStorage.setItem('access-admin',JSON.stringify(res.data))
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

