<template>
  <view class="form-content">
    <u-toast ref="uToast"></u-toast>
    <u-form :model="form" ref="uForm" label-width="90">
      <u-form-item label="课程名" prop="courseName">
        <u-input v-model="form.courseName" />
      </u-form-item>
      <u-form-item label="简介" prop="courseIntro">
        <u--textarea v-model="form.courseIntro" placeholder="请输入内容" count />
      </u-form-item>
      <u-form-item label="课程类型" prop="tag">
<!--        <u-input v-model="globalStorage" />-->
        <picker :range="array" mode="multiSelector" @columnchange="pickerChange">
          <view class="uni-input" >{{array[1][index2]}}</view>
        </picker>
      </u-form-item>
      <u-form-item label="上传课程封面" prop="courseCover">
        <image class="cover" :src="imageWithUrl" mode="scaleToFill" style="width: 400rpx;height: 300rpx;" @click="coverClicked"></image>
      </u-form-item>
    </u-form>

    <u-button @click="submit">提交审核</u-button>
  </view>
</template>

<script>
import global from "@/common/common";
import {pathToBase64} from "image-tools";
import {convertBase64ToBlob} from "@/common/fileTransfer";
import clone from "uview-ui/libs/luch-request/utils/clone";

export default {
  data() {
    // const currentDate = this.getDate({
    //   format: true
    // })
    return {
      userDt:{},

      title: 'picker',
      array:[["请选择"], ["请选择"]],
      secondChosenNo:0, //二级的index
      index1: 1,
      index2: 0,
      // date: currentDate,
      time: '12:01',

      // children1:["1","2","3","4"],
      // children2:["5","6","7","8"],

      globalStorage:global.storageUrl,
      uploadToken:'',
      imageWithUrl:'',
      form: {
        courseName: '',
        courseIntro: '',
        courseCover: 'courseDefaultCover.png',
        courseTag:'',
      },
      rules: {
        courseName: [{
          required: true,
          message: '请输入课程名',
          // 可以单个或者同时写两个触发验证方式
          trigger: 'blur'
        }],
        courseIntro: [{
          required: true,
          min: 5,
          message: '简介不能少于5个字',
          trigger: 'blur'
        }],

        courseCover: [{
          required: true,
          message: '请添加封面',
          trigger: ['change', 'blur'],
        },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // this.$u.test.courseCover()就是返回true或者false的
              return this.$u.test.courseCover(value);
            },
            message: '手机号码不正确',
            // 触发器可以同时用blur和change
            trigger: ['change', 'blur'],
          }
        ]
      }
    };
  },
  methods: {
    pickerChange(e){
      // console.log(e.detail)
      var that = this
      let newColumn = e.detail.column
      let newValue = e.detail.value
      if (newColumn === 0){ //拖动的一级栏
        console.log(this.array[newColumn][newValue])
        uni.request({
          method:"GET",
          url: global.commonLocalServer + "/getByTagName",
          data: {"tagName":this.array[0][newValue]},
          header:{'token':that.userDt.token},
          success:function(res){
            console.log(res.data.data)
            console.log(that.array[1])
            that.$set(that.array,1,res.data.data)

            // that.array[1] = res.data.data
            // console.log(that.array[1])
          }
        })
        // if (newValue === 1){
        //   this.array[1] = this.children2
        // } else if (newValue === 0) {
        //   this.array[1] = this.children1
        // }

      } else if (newColumn === 1) { //拖动的二级栏
        that.index2 = e.detail.value
        that.secondChosenNo = e.detail.value
      }
      // this.index1 = 1
      // console.log(this.array[e.detail.column][e.detail.value])
    },
    coverClicked(){
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.imageWithUrl = res.tempFilePaths[0]
          let token = that.userDt.token
          uni.request({
            url: global.commonLocalServer + "/files/getToken",
            method: "GET",
            header: {
              'token': token
            },
            success: function (res) {
              console.log(res.data.data)
              that.uploadToken = res.data.data
            }
          })
        }
      })
    },

    getTagList(){
      let that = this
      uni.request({
        method:"GET",
        url: global.commonLocalServer + "/getAllTags",
        header:{'token':that.userDt.token},
        success:function(res){
          that.$set(that.array,0,res.data.data)
          // that.array[0] = res.data.data
        }
      })
    },

    async submit() {
      // this.$refs.uForm.validate(valid => {
      //   if (valid) {
      //     console.log('验证通过');
      //   } else {
      //     console.log('验证失败');
      //   }
      // });
      if (this.checkUploadData()) {
        // #ifndef MP-WEIXIN
        await this.uploadCourseCover()
        // #endif

        // #ifdef MP-WEIXIN
        await this.uploadCourseCoverWX()
        // #endif

      }
    },

    checkUploadData(){
      console.log(this.imageWithUrl)
      console.log(this.array[1][this.secondChosenNo])
      if (global.isEmpty(this.form.courseName) || global.isEmpty(this.form.courseIntro)){
        this.$refs.uToast.show({
          message:'请填写信息！',
        })
        return false
      } else if (this.imageWithUrl === global.storageUrl + 'courseDefaultCover.png'){
        this.$refs.uToast.show({
          message:'请上传封面！',
        })
        return false
      } else if (this.array[1][this.secondChosenNo] === '请选择'){
        this.$refs.uToast.show({
          message:'请选择课程类型！',
        })
        return false
      } else {
        return true
      }
    },

    async uploadCourseCover() {
      var that = this
      let fileName = "cover" + "_" + this.userDt.id + "_" + Date.parse(new Date())
      await pathToBase64(this.imageWithUrl).then(base64 => {
        this.base64Result = base64;
      }).catch(error => {
        console.error(error)
      })
      console.log('uploadCourseCover')
      return new Promise( (resolve, reject) => {
        uni.uploadFile({
          url:'http://up-cn-east-2.qiniup.com',
          filePath:that.imageWithUrl,
          formData: {
            'key':fileName,
            "token":that.uploadToken
          },
          success: (res) => {
            console.log(JSON.parse(res.data).key)
            // that.uploadUserData(JSON.parse(res.data).key)
            that.addNewCourse(JSON.parse(res.data).key)
          }
        })
      })
    },
    // 微信特供
    async uploadCourseCoverWX() {
      console.log('uploadCourseCoverWX')
      var that = this
      let fileName = "cover" + "_" + this.userDt.id + "_" + Date.parse(new Date())
      // await pathToBase64(this.imageWithUrl).then(base64 => {
      //   this.base64Result = base64;
      // }).catch(error => {
      //   console.error(error)
      // })
      console.log('uploadCourseCover')
      return new Promise( (resolve, reject) => {
        wx.uploadFile({
          url:'http://up-cn-east-2.qiniup.com',
          filePath:that.imageWithUrl,
          formData: {
            'key':fileName,
            "token":that.uploadToken
          },
          success: (res) => {
            console.log('微信上传成功')
            console.log(JSON.parse(res.data).key)
            // that.uploadUserData(JSON.parse(res.data).key)
            that.addNewCourse(JSON.parse(res.data).key)
          }
        })
      })
    },




    addNewCourse(coverWithoutUrl) {
      let that = this
      let infoClone = clone(that.form)
      infoClone.courseCover = coverWithoutUrl
      infoClone.courseTag = that.array[1][that.secondChosenNo]
      infoClone.creatorId = that.userDt.id
      console.log(infoClone)
      uni.request({
        method:"POST",
        url:global.commonLocalServer + '/lesson/addNewCourse',
        header:{
          'token':that.userDt.token
        },
        data: infoClone,
        success: (res) => {
          console.log(res)
          if(res.data.flag === "T"){
            this.$refs.uToast.show({
              message:'提交成功,正在审核中',
            })
          } else {
            this.$refs.uToast.show({
              message:'提交失败，请退出后重试',
            })
          }

        }
      })
    }

  },


  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  created() {
    this.imageWithUrl = global.storageUrl + this.form.courseCover
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const userLocalDataValue = uni.getStorageSync('userLocalData');
      if(userLocalDataValue){
        this.userDt = JSON.parse(userLocalDataValue)
      }
    }catch(e){}

  },

  // #ifndef  MP-WEIXIN
  onReady() {
    this.$refs.uForm.setRules(this.rules);
    this.getTagList()
  },
  // #endif

  // #ifdef  MP-WEIXIN
  onLoad(){
    // this.$refs.uForm.setRules(this.rules);
    this.getTagList()
  }
  // #endif
};
</script>

<style scoped lang="scss">
.form-content {
  padding: 30px;
}
</style>
