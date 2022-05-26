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
      <view class="d-flex flex-column  " style="padding-right: 10rpx; width: 900rpx">
        <view style="margin-top: 10rpx; position: relative" @click="cardClicked(item,index)">

          <view class="u-line-1" style="font-size: 32rpx; ">
            <!--              <text style="margin-right: 5%;" >[新]</text>-->
            <!--              <u-icon name="info-circle-fill"></u-icon>-->
            {{item.homeworkName}}
          </view>
<!--          <view class="u-line-1 " >{{item.senderNickName}}</view>-->
        </view>
        <view class=" margin-top-xs">
          <text class="gray-color" style="font-size: 26rpx" >{{item.createAt}}</text>
<!--          <view class="a-end">-->
          <text style="font-size: 30rpx; margin-left: 57%;" v-if="item.doneFlag === '0' && authority==='readOnly' ">
            待完成</text>
          <text style="font-size: 30rpx; margin-left: 22%; color: #1aad16"
                v-if="item.doneFlag === '1' && authority==='readOnly'" >
            {{timeTransfer(item.doneTime)}}已完成</text>
<!--          </view>-->
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
    let that = this
    this.courseId = e.courseId
    console.log('作业load')
    console.log(e.courseId)
    // #ifdef MP-WEIXIN
    this.getHwList()
    this.getAuthority()
    // #endif
    uni.$on('freshStudentHw',function(data){
      console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
      that.getHwList();
      that.$u.toast('添加成功！')
    })
    uni.$on('teacherRefreshHwList',function(data){
      console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
      that.getHwList();
    })
  },
  created() {
    console.log('作业create')
    console.log()
    try{
      const value = uni.getStorageSync('userLocalData');
      if(value){
        this.userDt = JSON.parse(value)
      }
    }catch(e){}
    // #ifndef MP-WEIXIN
    this.getHwList()
    this.getAuthority()
    // #endif
  },
  methods:{
    cardClicked(item,index){
      console.log(item)
      if (this.authority==='readOnly'){
        if(item.doneFlag === '0'){
          uni.navigateTo({
            url: '/pages/student/homework/doHomework' + '?hwId=' + item.id
          })
        } else {
          uni.navigateTo({
            url: '/pages/student/homework/readHomework' + '?hwId=' + item.id + '&userId=' + this.userDt.id
          })
        }
      } else if (this.authority==='creator') {
        uni.navigateTo({
          url: '/pages/teacher/homework/homeworkStatistics' + '?hwId=' + item.id
        })
      }

    },
    addNewHomeworkClicked(){
      uni.navigateTo({
        url: '/pages/teacher/homework/addHomework' + '?courseId=' + this.courseId
      })
    },
    getHwList(){
      let that = this
      uni.request({
        url:global.commonLocalServer +  '/homework/getHomeworkByCourseId/'+this.courseId + '/' + that.userDt.id,
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
    timeTransfer(str){
      var n = parseInt(str);
      var D = new Date(n);
      var year = D.getFullYear();//四位数年份

      var month = D.getMonth()+1;//月份(0-11),0为一月份
      month = month<10?('0'+month):month;

      var day = D.getDate();//月的某一天(1-31)
      day = day<10?('0'+day):day;

      var hours = D.getHours();//小时(0-23)
      hours = hours<10?('0'+hours):hours;

      var minutes = D.getMinutes();//分钟(0-59)
      minutes = minutes<10?('0'+minutes):minutes;

      // var seconds = D.getSeconds();//秒(0-59)
      // seconds = seconds<10?('0'+seconds):seconds;
      // var week = D.getDay();//周几(0-6),0为周日
      // var weekArr = ['周日','周一','周二','周三','周四','周五','周六'];

      var now_time = year+'-'+month+'-'+day+' '+hours+':'+minutes;
      return now_time;
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