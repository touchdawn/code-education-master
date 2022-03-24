<template>
  <view>
    <view class="userback">
      <img :src="displayAvatar" style="width: 200rpx; height: 200rpx;">
      <view class="userName" style="margin-top: 100rpx;">{{userData.name}}</view>
      <view class="userOrgan" style="margin-top: 20rpx">{{userData.nickName}}</view>
      <view class="">
        <view class="" style="margin-top: 40rpx;">
          <view class="content">软件版本</view>
          <view class="action">2.0.0</view>
        </view>
      </view>
    </view>

<!--    <view class="btn-row">-->
<!--      <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>-->
<!--      <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>-->
<!--    </view>-->

    <u-button @click="changePersonInfoClicked" type="primary">修改个人信息</u-button>

    <u-button @click="upLoadClicked">上传</u-button>
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
      msg:2,
      displayAvatar:"",
      userData:{
        userName:"",
        nickName:"",
        phone:"",
      }
    }
  },

  onLoad(){
    console.log("loaded")
  },
  created() {
    console.log(JSON.parse(window.localStorage.getItem("userLocalData")))
    this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    // console.log(userDt)
    // this.userData = userDt.data
    // this.userData.userName=userDt.data.name
    // this.userData.nickName=userDt.data.nickName
    // this.userData.phone=userDt.data.phone
    let that = this
    console.log(that.userDt.token)
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
  methods: {
    changePersonInfoClicked(){
      uni.navigateTo({
        url: '/pages/userInfo/userInfo'
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