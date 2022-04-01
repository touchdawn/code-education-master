<template>
  <view class="form-content" style="width: 90%; margin-left: 5%">
    <u-toast ref="uToast"></u-toast>

    <u-form :model="form" ref="uForm" label-width="90">
      <u-form-item label="课程名:" prop="courseName" style="margin-top: 40rpx;">
        <text>{{form.courseName}}</text>
      </u-form-item>
      <u-form-item label="章节名:" prop="courseName" style="margin-top: 30rpx;">
        <u-input v-model="form.chapterName" />
      </u-form-item>
    </u-form>

    <u-button @click="submit" type="primary" style="margin-top: 40rpx;">添加</u-button>
  </view>
</template>

<script>
import global from "@/common/common";

export default {
  name: "addNewChapter",
  data(){
    return{
      userDt:{},
      form: {
        courseId:'',
        courseName: '',
        chapterName:''
      },
    }
  },
  created() {
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const userLocalDataValue = uni.getStorageSync('userLocalData');
      if(userLocalDataValue){
        this.userDt = JSON.parse(userLocalDataValue)
      }
    }catch(e){}
    // this.getAllData();
    // if (this.currentIndex === 2) {
    //   this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
    // } else {
    //   this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100);
    // }
  },
  onLoad (e) { //option为object类型，会序列化上个页面传递的参数
    this.form.courseName = e.courseName
    this.form.courseId = e.courseId
    console.log(e)
    // this.courseId = parseInt(e.courseId)
    // this.courseName = e.courseName
    // const {
    //   windowHeight,
    //   windowWidth
    // } = uni.getSystemInfoSync();
    // this.pageHeight = windowHeight / windowWidth * 750;
  },

  methods:{
    submit(){
      var that = this
      console.log(that.form.chapterName)
      if (global.isEmpty(that.form.chapterName) || that.form.chapterName === ''){
        that.$u.toast("请输入章节名！");
      } else {
        uni.request({
          url:global.commonLocalServer+"/lesson/addNewChapter",
          method:"POST",
          header:{
            'token':that.userDt.token
          },
          data:that.form,
          success:function(res){
            console.log(res)
            if(res.data.flag === "T"){
              that.$u.toast(
                "提交成功!"
              )
              uni.navigateBack({delta: 1})
              uni.$emit('updateEditCourse',{msg:'页面更新'})
            }
          }
        })
      }

    }
  }

}
</script>

<style scoped>

</style>