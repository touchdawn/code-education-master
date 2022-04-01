<template>
  <view class="wrap">
    <!--    自定义导航-->
<!--    <u-navbar-->
<!--        title="个人中心"-->
<!--    >-->
<!--    </u-navbar>-->
    <u-toast ref="uToast"></u-toast>
    <view class="top"  style="margin-top: 50rpx;"></view>
    <view class="content">
      <view class="title" style="margin-bottom: 50rpx;">欢迎登录</view>
      <u-form ref="form1" :rules="rules" :model="loginData">
        <u-form-item label="邮箱" prop="email">
          <u-input v-model="loginData.email" placeholder="邮箱" />
        </u-form-item>
        <u-form-item label="密码" prop="password">
          <u-input type="password" v-model="loginData.password" placeholder="请输入密码" />
        </u-form-item>
      </u-form>
      <u-gap height="30"></u-gap>
      <button @click="submit" class="getSmsCode">登录</button>
      <view class="alternative">
        <view class="password" @click="passwordLogin()">忘记密码</view>
        <view class="issue" @click="registerClicked()">注册</view>
      </view>
    </view>
  </view>
</template>
<script>

// import axios from "axios";
import global from 'common/common'

export default {
  data() {
    return {
      loginData:{
        phone:'',
        email: '',
        password: '',
      },
      rules: {
        'email': {
          type: 'string',
          required: true,
          message: '请填写邮箱',
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
    // submit() {
    //   this.$post({
    //     url: '/security/session',
    //     data: {
    //       username: this.userName,
    //       password: this.password,
    //     },
    //   }).then(res => {
    //     if (res.data.code == 0) {
    //       uni.setStorage({
    //         key: 'fx-auth-token',
    //         data: res.data.ok.token,
    //       });
    //       this.$u.route({
    //         type: 'switchTab',
    //         url: '/pages/function/function'
    //       })
    //     } else {
    //       uni.showToast({
    //         title: '用户名或密码错误！',
    //         icon: 'none',
    //       })
    //     };
    //     uni.setStorage({
    //       key: 'user',
    //       data: JSON.stringify(res.data.ok.data),
    //     });
    //   }).catch(err => {
    //     uni.showToast({
    //       title: '用户名或密码错误异常！',
    //       icon: 'none',
    //     })
    //   })
    // },
    submit() {
      let that = this
      if (that.checkInputData()) {
        uni.request({
          method: "GET",
          url: global.commonLocalServer + "/users/login",
          data: that.loginData,
          success: function (res) {
            console.log(res)
            if (res.data.flag === "T") {

              try {
                uni.setStorageSync('userLocalData', JSON.stringify(res.data.data));
              } catch (e) {
                // error
              }

              // // #ifdef H5
              // localStorage.setItem('userLocalData', JSON.stringify(res.data.data))
              // // #endif
              // // #ifdef  MP-WEIXIN
              // wx.setStorageSync('userLocalData', JSON.stringify(res.data.data));
              // // #endif
              uni.navigateTo({url: '/pages/index/index'})
              // that.$router.replace({path: 'pages/index/index'})
            } else {
              that.$u.toast(res.data.errorInfo);
            }
          },
          fail: function (err) {
            uni.$u.toast(err)
          }
        })

      }
    },

      // this.$refs.form1.validate().then(res => {
      //   let that = this;
      //   axios.get(global.commonLocalServer+'/users/login',{params:that.loginData}).then(function (res){
      //     console.log(res.data.flag)
      //     console.log(res.data)
      //     if (res.data.flag === "T"){
      //       console.log('success')
      //       localStorage.setItem('userLocalData',JSON.stringify(res.data))
      //       that.$router.replace({path:'pages/index/index'})
      //     }else {
      //       that.$u.toast(res.data.errorInfo);
      //     }
      //   })
      // }).catch(errors => {
      //   uni.$u.toast('请填写')
      // })
      //
      // },

    checkInputData(){
      if (global.isEmpty(this.loginData.email)){
        uni.$u.toast('请填写邮箱')
        return false
      } else if (global.isEmpty(this.loginData.password)){
        uni.$u.toast('请填写密码')
        return false
      } else {
        return true
      }
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

