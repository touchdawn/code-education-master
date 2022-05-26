<template>
  <view class="form-content">
    <u-toast ref="uToast"></u-toast>
    <u-form :model="form" ref="uForm" label-width="90">
      <u-form-item label="教学名称" prop="sectionName">
        <u-input v-model="form.sectionName" />
      </u-form-item>
      <u-form-item label="上传教学视频" prop="courseCover">
        <image class="cover" v-if="unUploaded" :src=" videoWithUrl" mode="scaleToFill" style="width: 400rpx;height: 300rpx;" @click="coverClicked"/>
        <video class="cover" v-if="!unUploaded" :src=" videoWithUrl" mode="scaleToFill" style="width: 400rpx;height: 300rpx;" @click="coverClicked"></video>
      </u-form-item>
    </u-form>

    <view>
      <u-button @click="submit">
        <text v-if="!isUploading">提交审核</text>
        <u-loading-icon v-if="isUploading" mode="circle" style="margin-left: 20rpx;" text="上传中"></u-loading-icon>
      </u-button>
    </view>
  </view>
</template>

<script>
import global from "@/common/common";
import {pathToBase64} from "image-tools";
import {convertBase64ToBlob} from "@/common/fileTransfer";
import clone from "uview-ui/libs/luch-request/utils/clone";

export default {
  name: "uploadNewVideo",
  data (){
    return{
      unUploaded:true,
      isUploading:false,
      lessonId:-2,
      courseId:-1,
      videoWithUrl:'',
      uploadToken:'',
      form: {
        sectionName: '',
        courseCover: 'courseDefaultCover.png',
      },
    }
  },
  onLoad (e) { //option为object类型，会序列化上个页面传递的参数
    console.log(e)
    this.lessonId = parseInt(e.lessonId)
    this.courseId = parseInt(e.courseId)
    const {
      windowHeight,
      windowWidth
    } = uni.getSystemInfoSync();
    this.pageHeight = windowHeight / windowWidth * 750;
  },
  created() {
    this.videoWithUrl = global.storageUrl + this.form.courseCover
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const userLocalDataValue = uni.getStorageSync('userLocalData');
      if(userLocalDataValue){
        this.userDt = JSON.parse(userLocalDataValue)
      }
    }catch(e){}
  },
  methods:{
    coverClicked(){
      var that = this
      uni.chooseVideo({
        count: 1,
        sizeType: ['original', 'compressed'],
        success: function (res) {
          console.log(res)
          that.videoWithUrl = res.tempFilePath
          let token = global.getLocalUserToken()
          uni.request({
            url: global.commonLocalServer + "/files/getToken",
            method: "GET",
            header: {
              'token': token
            },
            success: function (res) {
              that.unUploaded = false
              console.log(res.data.data)
              that.uploadToken = res.data.data
            }
          })
        }
      })
    },
    
    async submit() {
      this.isUploading = true
      console.log(this.form)
      if (this.checkUploadData()) {
        await this.uploadSectionVideo()
      }
    },

    async uploadSectionVideo() {
      var that = this
      let fileName = "video" + "_" + this.userDt.id + "_" + Date.parse(new Date())
      // await pathToBase64(this.videoWithUrl).then(base64 => {
      //   this.base64Result = base64;
      // }).catch(error => {
      //   console.error(error)
      // })
      //this.picFile = new File([convertBase64ToBlob(this.base64Result)],fileName);
      return new Promise( (resolve, reject) => {
        let a = uni.uploadFile({
          url:'http://up-cn-east-2.qiniup.com',
          filePath:that.videoWithUrl,
          formData: {
            'key':fileName,
            "token":that.uploadToken
          },
          success: (res) => {
            console.log(JSON.parse(res.data).key)
            that.isUploading = false
            // that.uploadUserData(JSON.parse(res.data).key)
            that.addNewSectionVideo(JSON.parse(res.data).key)
          }
        })
      })
    },

    addNewSectionVideo(videoWithoutUrl) {
      let that = this
      let infoClone = clone(that.form)
      infoClone.lessonVideo = videoWithoutUrl
      infoClone.creatorId = that.userDt.id
      infoClone.parentId = that.lessonId
      infoClone.courseId = that.courseId
      console.log(infoClone)
      uni.request({
        method:"POST",
        url:global.commonLocalServer + '/lesson/addNewSectionVideo',
        header:{
          'token':that.userDt.token
        },
        data: infoClone,

        success: (res) => {
          console.log(res)
          if(res.data.flag === "T"){
            this.$refs.uToast.show({
              message:'提交成功!',
            })
            that.isUploading = false
            uni.navigateBack({delta: 1})
            uni.$emit('updateEditCourse',{msg:'页面更新'})
          } else {
            this.$refs.uToast.show({
              message:'提交失败，请退出后重试',
            })
          }

        }
      })
    },
    
    checkUploadData(){
      console.log(this.videoWithUrl)
      if (global.isEmpty(this.form.sectionName)){
        this.$refs.uToast.show({
          message:'请填写教学名称！',
        })
        this.isUploading = false
        return false
      } else if (this.videoWithUrl === global.storageUrl + 'courseDefaultCover.png' || this.unUploaded){
        this.$refs.uToast.show({
          message:'请上传视频！',
        })
        this.isUploading = false
        return false
      } else {
        return true
      }
    },
  }
}
</script>

<style scoped lang="scss">
.form-content {
  padding: 30px;
}
</style>