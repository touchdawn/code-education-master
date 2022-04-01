<template>
  <view class="wrap">
    <view class="content">
      <u-toast ref="uToast"></u-toast>
<!--      <view class="title" style="margin-bottom: 50rpx;">欢迎登录</view>-->
      <u-form ref="form1"  :model="userData">

        <u-form-item label="密码" prop="oldPassword">
          <u-input type="password" v-model="userData.oldPassword" placeholder="请输入密码" />
        </u-form-item>

        <u-form-item label="新密码" prop="newPassword">
          <u-input type="password" v-model="userData.newPassword" placeholder="新密码" />
        </u-form-item>

        <u-button type="success" style="margin-top: 30rpx;" @click="confirmClick()">确认</u-button>

      </u-form>
    </view>
  </view>
</template>

<script>
import clone from "uview-ui/libs/luch-request/utils/clone";
import global from "@/common/common";

export default {
name: "changePassword",
  data(){
    return{
      userDt:{},
      userData:{
        oldPassword: '',
        newPassword:''
      },
      rules: {
        'oldPassword': {
          type: 'string',
          required: true,
          message: '请填写旧密码',
          trigger: ['blur', 'change']
        },
        'newPassword': {
          type: 'string',
          required: true,
          message: '请填写新密码',
          trigger: ['blur', 'change']
        },
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
    console.log(this.userDt)
  },
  methods:{
    confirmClick(){
      var that = this
      let uploadData = clone(this.userData)
      uploadData.id = this.userDt.id
      // uploadData.push("id",this.userDt.id)
      if (that.checkUpdateForm()){
        uni.request({
          method:"POST",
          url:global.commonLocalServer + '/users/changePassword',
          header:{
            'token':that.userDt.token
          },
          data : uploadData,
          success: (res) => {
            console.log(res)
            if (res.data.flag === "T"){
              that.$refs.uToast.show({
                message:'修改成功',
              })
              that.userData={
                oldPassword: '',
                newPassword:''
              }
              // uni.navigateBack({
              //   delta: 1
              // });
            } else {
              that.$refs.uToast.show({
                message:'密码错误',
              })
            }
          }
        })
      }
    },

    checkUpdateForm(){
      if(global.isEmpty(this.userData.newPassword) || global.isEmpty(this.userData.oldPassword)) {
        this.$refs.uToast.show({
          message:'请填写！',
        })
        return false
      } else if (this.userData.oldPassword === this.userData.newPassword) {
        this.$refs.uToast.show({
          message:'新旧密码不能一样！',
        })
        return false
      } else if (this.userData.newPassword.length < 6){
        this.$refs.uToast.show({
          message:'密码不能少于六位！',
        })
        return false
      }
      return true
    }

  }
}
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
