<template>
  <view>
    <view class="userback">
      <image :src="displayAvatar" style="width: 200rpx; height: 200rpx; margin-top: 20%;border-radius: 50%;"/>
      <view style="display: flex; align-items: center;margin-top: 100rpx;justify-content: center;">
        <view class="userName" style="margin-right: 3%; margin-left: 3%;">{{userData.name}}</view>
        <u-tag text="学员" size="mini" type="primary" v-if="userDt.type === 0"></u-tag>
        <u-tag text="教员" size="mini" type="success" v-if="userDt.type === 1"></u-tag>

      </view>
      <view class="userOrgan" style="margin-top: 20rpx">{{userData.nickName}}</view>
      <view class="">
        <view class="" style="margin-top: 40rpx;">
          <view class="content" @click="showLocalStorage">软件版本</view>
          <view class="action">3.1.5</view>
        </view>
      </view>
    </view>

<!--    <view class="btn-row">-->
<!--      <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>-->
<!--      <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>-->
<!--    </view>-->

    <u-button @click="changePersonInfoClicked" type="primary">修改个人信息</u-button>

<!--    <u-button @click="upLoadClicked">上传</u-button>-->


    <u-button @click="enrollNewCourseClicked" v-if="userDt.type !== 0">新开课程</u-button>

    <u-button @click="myCourseClicked" v-if="userDt.type === 1">我的课程</u-button>

    <u-button @click="myFavClicked">我的收藏夹</u-button>

    <u-button @click="applyForTeacherClicked" v-if="userDt.type === 0">申请成为教师</u-button>
    <tab-bar :msg="msg"></tab-bar>
  </view>
</template>

<script>
import TabBar from "@/pages/commomComponent/tabBar";
import global from "@/common/common";

export default {
  name: "personInfo",
  components: {TabBar},
  data(){
    return {
      userDt:{},
      refreshUserData:false,
      msg:2,
      displayAvatar:"",
      userData:{
        userName:"",
        nickName:"",
        phone:"",
      }
    }
  },

  watch:{
    refreshUserData(newVal,oldVal){
      console.log('new' + newVal)
      if (newVal){
        this.refreshData()
      }
    }
  },

  // updated : function(){
  //   console.log("898697")
  // },
  // computed: {
  //   // 计算属性的 getter
  //   refreshUserData: function () {
  //     console.log('new' )
  //     this.refreshData()
  //   }
  // },

  onLoad(){
    console.log("loaded")
    var that = this
    uni.$on('refreshUserData',function(data){
      console.log('caught')
      that.refreshUserData = true
    })
  },
  created() {
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const userLocalDataValue = uni.getStorageSync('userLocalData');
      if(userLocalDataValue){
        // console.log(value)
        this.userDt = JSON.parse(userLocalDataValue)
      }
    }catch(e){}
    // console.log(userDt)
    // this.userData = userDt.data
    // this.userData.userName=userDt.data.name
    // this.userData.nickName=userDt.data.nickName
    // this.userData.phone=userDt.data.phone
    // console.log(that.userDt.token)
    this.requestUserData()
  },
  methods: {
    refreshData(){
      console.log('success')
      this.userData = {}
      this.requestUserData()
    },

    requestUserData(){
      let that = this
      uni.request({
        url: global.commonLocalServer + '/users/getById/' + that.userDt.id,
        method:"GET",
        header:{'token':that.userDt.token},
        success: function (res){
          console.log(res)
          that.userData = res.data.data
          that.displayAvatar = global.storageUrl +  res.data.data.avatar
        }
      })
    },

    showLocalStorage(){
      try{
        const value = uni.getStorageSync('userLocalData');
        if(value){
          this.userDt = JSON.parse(value)
          console.log(this.userDt)
        }
      }catch(e){}
    },

    applyForTeacherClicked() {
      uni.navigateTo({
        url:'/pages/student/applyForTeacher'
      })
    },

    changePersonInfoClicked(){
      uni.navigateTo({
        url: '/pages/userInfo/userInfo'
      });
    },
    enrollNewCourseClicked(){
      uni.navigateTo({
        url: '/pages/teacher/course/enrollNewCourse'
      });
    },

    myCourseClicked(){
      uni.navigateTo({
        url: '/pages/teacher/course/myCourse'
      });
    },

    myFavClicked(){
      uni.navigateTo({
        url: '/pages/personInfo/myFavourite/myFavourite'
      });
    },

    upLoadClicked(){
      uni.navigateTo({
        url: '/pages/files/uploadMyVideo'
      });
    }
    // ...mapMutations(['logout']),
    // bindLogin() {
    //   uni.navigateTo({
    //     url: '../login/login',
    //   });
    // },
    // bindLogout() {
    //   this.logout();
    //   /**
    //    * 如果需要强制登录跳转回登录页面
    //    */
    //   if (this.forcedLogin) {
    //     uni.reLaunch({
    //       url: '../login/login',
    //     });
    //   }
    // }
  }
}
</script>

<style scoped>
.userback {
  height: 800rpx;
  background-image: url('http://r8otjafce.bkt.clouddn.com/bg1.jpg');
  background-size: 100%;
  text-align: center;
  font-size: 40rpx;
}

.userback img {
  margin: auto;
  border-radius: 51rpx;
  margin-top: 21%;
  width: 97rpx;
  height: 97rpx;
}
.userName{
  color: #111111;
  font-size: 40rpx;
}
.userOrgan{
}
uni-button[type=primary] {
  margin: 0 4%;
  background-image: linear-gradient(to top, #66b7f9,#1c82d4);
}
.cu-list.menu-avatar>.cu-item {
  height: 37rpx;
  background: none;
}
.cu-list.menu-avatar>.cu-item .content {
  left: 18rpx;
}
.cu-list.menu-avatar>.cu-item .action {
  width: 42rpx;
}
.cu-list.menu-avatar {
  height: 195rpx;
}
</style>