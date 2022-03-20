<template>
  <view class="wrap">
    <!--    自定义导航-->
    <u-navbar
        title="个人中心"
        :autoBack="true"
    >
    </u-navbar>
    <view class="top" style="margin-top: 50rpx;"></view>
    <view class="content">
      <view class="title" style="margin-bottom: 50rpx;">注册</view>
<!--      <u-form ref="form1" :model="registerData" :ref="rules">-->
        <u-form ref="form1" :rules="rules" :model="registerData">
        <u-form-item label="姓名" borderBottom prop="name"  >
          <u-input v-model="registerData.name" placeholder="请输入姓名" required="true" />
        </u-form-item>
        <u-form-item label="手机" borderBottom prop="phone">
          <u-input v-model="registerData.phone" placeholder="请输入手机号" />
        </u-form-item>
        <u-form-item label="邮箱" prop="email">
          <u-input type="email" v-model="registerData.email" placeholder="请输入邮箱" />
          <u-button class="getSmsCode" style="width: 170rpx;margin-left: 20rpx;" @click="getEmail">发送验证码</u-button>
        </u-form-item>
          <u-form-item label="验证码" prop="verifyCode">
            <u-input type="verifyCode" v-model="registerData.verifyCode" placeholder="请输入验证码" />
          </u-form-item>
        <u-form-item label="密码" prop="password">
          <u-input type="password" v-model="registerData.password" placeholder="请输入密码" />
        </u-form-item>
        <u-form-item label="确认密码"  prop="passwordConfirm">
          <u-input type="password" v-model="registerData.passwordConfirm" placeholder="确认密码" />
        </u-form-item>
      </u-form>
      <u-gap height="30"></u-gap>
      <button @click="register" class="getSmsCode">注册</button>
      <view class="alternative">
      </view>
    </view>
  </view>
</template>

<script>

import axios from "axios";
import global from 'common/common'

export default {
  data() {
    return {
      registerData:{
        name:'',
        phone:'',
        password: '',
        passwordConfirm: '',
        verifyCode:"",
        email:'',
        codeFromServer:'',
        tampFromServer:''
      },
      rules: {
        'name': {
          type: 'string',
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change']
        },
        'phone': {
          type: 'string',
          required: true,
          message: '请填写手机号',
          trigger: ['blur', 'change']
        },
        'password': {
          type: 'string',
          required: true,
          message: '请填写密码',
          trigger: ['blur', 'change']
        },
        'passwordConfirm': {
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
  created() {
    this.registerData={
      name:'',
      phone:'',
      password: '',
      passwordConfirm: '',
      verifyCode:"",
      email:'',
      codeFromServer:'',
      tampFromServer:''
    }
  },
  methods: {
    checkFormData(){ //判断输入合法
      let checkPhone = !this.registerData.phone.isEmpty
      let checkName = !this.registerData.name.isEmpty
      let checkEmail = !this.registerData.email.isEmpty
      let checkVerify = !this.registerData.verifyCode.isEmpty
      let password = !this.registerData.password.isEmpty
      let passwordConfirm = !this.registerData.passwordConfirm.isEmpty
      let pwd = (this.registerData.password === this.registerData.passwordConfirm)
      if (!pwd){
        this.$u.toast('两次密码不匹配');
      }
      let res = (checkPhone && checkName && checkEmail && checkVerify && password && passwordConfirm && pwd)
      console.log(res)
      return res
    },

    register() {
      let that = this;
      if (that.checkFormData()){
        uni.request({
          url:global.commonLocalServer+"/users/register",
          method:"POST",
          data: that.registerData,
          success:(res) =>{
            console.log(res)
            if (res.data.flag === "T"){
              that.registerData.codeFromServer = res.data.code
              that.registerData.tampFromServer = res.data.tamp
              that.$u.toast('注册成功');
              localStorage.setItem('userLocalData',JSON.stringify(res.data))
              uni.redirectTo({
                    url: '/pages/index/index'
              });
            } else {
              that.$u.toast(res.data.errorInfo);
            }
          }
        })
      }

      // this.$refs.form1.validate().then(res => {
      //   console.log(this.registerData)
      //   let that = this;
      //   let postData = that.registerData;
      //   if (that.registerData.password === that.registerData.passwordConfirm){
      //     axios.post(global.commonLocalServer + '/users/register',postData).then(function (res){
      //       console.log(res)
      //       if (res.data.flag === "T"){
      //         console.log('success')
      //         localStorage.setItem('userLocalData',JSON.stringify(res.data))
      //         console.log(localStorage)
      //         uni.redirectTo({
      //           url: '/pages/index/index'
      //         });
      //         // that.$u.toast('注册成功');
      //       }else {
      //         that.$u.toast('错误');
      //       }
      //     })
      //   } else {
      //     that.$u.toast('两次密码不匹配');
      //   }
      // }).catch(errors => {
      //   uni.$u.toast('请填写222')
      // })
    },

    getEmail(){
      if(this.registerData.email !== null && this.registerData.email !== ""){
        var that = this
        uni.request({
          url:global.commonLocalServer+"/sendEmail",
          method:"POST",
          data: {
            email: that.registerData.email
          },
          success:(res) =>{
            console.log(res)
            if (res.data.flag === "T"){
              that.registerData.codeFromServer = res.data.code
              that.registerData.tampFromServer = res.data.tamp
              that.$u.toast('发送成功,请注意查收');
            } else {
              that.$u.toast(res.data.errorInfo);
            }
          }
        })
      }
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

