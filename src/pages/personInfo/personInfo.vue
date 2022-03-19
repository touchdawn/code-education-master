<template>
  <view>
    <view class="userback">
      <img src="https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png">
      <view class="userName" style="margin-top: 20rpx">{{userData.userName}}</view>
      <view class="userOrgan" style="margin-top: 20rpx">{{userData.nickName}}</view>
      <view class="">
        <view class="">
          <view class="content">软件版本</view>
          <view class="action">2.0.0</view>
        </view>
      </view>
    </view>
<!--    <view class="btn-row">-->
<!--      <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>-->
<!--      <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>-->
<!--    </view>-->
    <u-button @click="upLoadClicked">上传</u-button>
    <tab-bar :msg="msg"></tab-bar>
  </view>
</template>

<script>
import TabBar from "@/pages/commomComponent/tabBar";

export default {
  name: "personInfo",
  components: {TabBar},
  data(){
    return {
      msg:2,
      userData:{
        userName:"",
        nickName:"",
        phone:"",
      }
    }
  },
  created() {
    let userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    console.log(userDt)
    this.userData.userName=userDt.data.name
    console.log(this.userData.userName)
    this.userData.nickName=userDt.data.nickName
    this.userData.phone=userDt.data.phone
    console.log(this.userData)
  },
  methods: {
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
  text-align: center
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
  font-size: 0.9rem;
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