<template>
<view class="form-content">
  <view class="px-20" style=" border-top: 3rpx solid #bdbdbd; ">
    <view v-for="(item,index) in homeworkList" v-if="homeworkList.length !== 0"
          class=" u-border-radius d-flex a-center"
          style="height: 150rpx; margin-left: 5%;width: 90%; border-bottom: 3rpx solid #bdbdbd;">
<!--      <view>-->
<!--        <u-badge :isDot="true" type="error" v-if="item.isRead === 1"></u-badge>-->
<!--        <image class="u-border-radius flex-shrink " @click="cardClicked(item,index)"-->
<!--               :src="item.senderAvatar" style="width: 100rpx;height: 100rpx; margin-left: 20rpx; margin-right: 40rpx;"></image>-->
<!--      </view>-->
      <view class="d-flex flex-column  " style="padding-right: 10rpx;">
        <view style="margin-top: 10rpx; position: relative" @click="cardClicked(item,index)">

          <view class="u-line-1" style="font-size: 32rpx; ">
            <!--              <text style="margin-right: 5%;" >[新]</text>-->
            <!--              <u-icon name="info-circle-fill"></u-icon>-->
            {{item.homeworkName}}
          </view>
<!--          <view class="u-line-1 " >{{item.senderNickName}}</view>-->
        </view>
        <view class="d-flex  align-center uni-row margin-top-xs">
          <text class="gray-color" style="font-size: 26rpx" >{{item.createAt}}</text>
          <!--            <view class="a-end">-->
          <!--              <u-icon name="trash" style="position: absolute; right: 40rpx; margin-bottom: 20rpx;"-->
          <!--                      @click = deleteFav(item)>-->
          <!--              </u-icon>-->
          <!--            </view>-->
        </view>
      </view>
    </view>

    <view v-if="homeworkList.length  === 0" style="text-align:center">
      <view >
        <image style="width: 270px; height: 200px; margin-top: 33%; margin-bottom: 7%;"
               :src="noResult()" ></image>
      </view>
      <text style="color: #8f8f8f; font-size: 40rpx;" v-if="authority==='readOnly'">老师还未布置作业哦~</text>
      <text style="color: #8f8f8f; font-size: 40rpx;" v-if="authority==='creator'">您还未布置作业哦~</text>

    </view>
    <u-button style="margin-top: 10%;" v-if="authority === 'creator'" type="primary"
              @click="addNewHomeworkClicked">添加新作业</u-button>
  </view>


</view>
</template>

<script>
import global from "@/common/common";

export default {
  name: "allHomework",
  data() {
    return{
      userDt:{},
      courseId:-1,
      authority:'readOnly',
      homeworkList:[
        {
          id:1,
          title:"Python专题训练-数组的使用",
          senderNickName:"1hao1hao",
          createAt:"yyyy-mm-dd",
          url: global.storageUrl + '%E9%BB%91%E9%A9%ACpink.jpg',
          courseIntroduction:''
        },{
          id:1,
          title:"Python专题训练-数组的使用",
          senderNickName:"1hao1hao",
          createAt:"yyyy-mm-dd",
          url: global.storageUrl + '%E9%BB%91%E9%A9%ACpink.jpg',
          courseIntroduction:''
        },
      ],
    }
  },
  onLoad(e){
    this.courseId = e.courseId
    console.log(e.courseId)
  },
  created() {
    try{
      const value = uni.getStorageSync('userLocalData');
      if(value){
        this.userDt = JSON.parse(value)
      }
    }catch(e){}
    this.getHwList()
    this.getAuthority()
  },
  methods:{
    cardClicked(item,index){
      console.log(item)
      uni.navigateTo({
        url: '/pages/student/homework/doHomework' + '?hwId=' + item.id
      })
    },
    addNewHomeworkClicked(){
      uni.navigateTo({
        url: '/pages/teacher/homework/addHomework' + '?courseId=' + this.courseId
      })
    },
    getHwList(){
      let that = this
      uni.request({
        url:global.commonLocalServer +  '/homework/getHomeworkByCourseId/'+this.courseId,
        header:{token:that.userDt.token},
        method:'GET',
        success:function (res){
          console.log(res)
          that.homeworkList = res.data.data
        }
      })
    },
    getAuthority(){
      let that = this
      uni.request({
        url:global.commonLocalServer + '/homework/checkAuthority/' + that.courseId + "/" + that.userDt.id,
        header:{token:that.userDt.token},
        method:'GET',
        success: function (res){
          console.log(res)
          that.authority = res.data.data
        }
      })
    },
    noResult() {
      return global.storageUrl + 'noHomework.png'
    }
  }
}
</script>

<style scoped>
.form-content {
  padding: 10px;
}
</style>