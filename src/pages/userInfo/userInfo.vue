<template>
  <view class="profile" >
    <u-navbar title="个人信息" :background="background">
    </u-navbar>
    <!-- 第一组cell -->
    <u-cell-group class="profile-content"  style=" margin-left: 5%; width: 90%;">
        <!-- 头像 -->
        <u-cell title="头像" :arrow="false" style="margin-top: 10rpx;">
          <view class="right-icon" slot="right-icon">
            <!-- 剪裁头像 -->
            <image class="avatar" :src="userInfo.avatar" mode="scaleToFill" style="width: 100rpx;height: 100rpx;" @click="avatarClicked"/>
            <!--          <u-icon name="camera" class="camera"></u-icon>-->
          </view>
        </u-cell>
      <u-cell title="姓名" :value="userInfo.name" style="margin-top: 30rpx;"></u-cell>
      <!-- 昵称 -->
        <u-cell title="昵称" :arrow="false" @tap="nickNameChange('nickName')" style="margin-top: 30rpx;">
          <view class="nick-left" slot="right-icon" style="display: flex">
            <!-- 编辑状态 -->
            <u-input v-if="isEdit" class="edit-input" v-model="userInfo.nickName" input-align='right' :focus="true"
                     :clearable="false" @confirm="inputNameChange('nickName')"></u-input>
            <!-- 一开始为非编辑状态 -->
            <block v-else>
              <view class="" style="margin-right: 10rpx;">{{userInfo.nickName}}</view>
              <u-icon name="edit-pen" color="#a2a2a2"></u-icon>
            </block>
          </view>
        </u-cell>
        <!-- 性别 -->
<!--        <u-cell title="性别" :arrow="false">-->
<!--          <view class="nick-right" slot="right-icon">-->
<!--            <u-radio-group v-model="userInfo.gender" @change="radioGroupChange">-->
<!--              <u-radio :name="1">男生</u-radio>-->
<!--              <u-radio :name="0">女生</u-radio>-->
<!--            </u-radio-group>-->
<!--          </view>-->
<!--        </u-cell>-->
        <!-- 个性签名 -->
<!--        <u-cell title="个性签名" @tap="signatureChange">-->
<!--        </u-cell>-->

      <u-cell title="手机号" :value="userInfo.phone" style="margin-top: 30rpx;"></u-cell>
      <u-cell title="邮箱" :value="userInfo.email" style="margin-top: 30rpx;" @click="emailClicked()"></u-cell>
      <u-button type="success" style="margin-top: 30rpx;" @click="submitClicked()">提交</u-button>
      <u-button type="warning" style="margin-top: 30rpx;" @click="changePasswordClicked()">修改密码</u-button>
      <u-button type="error" style="margin-top: 60rpx;" @click="deleteMyAccount">注销账号</u-button>
    </u-cell-group>
    <!-- 个性签名模态框 confirm点击确认触发-->
    <u-modal v-model="signShow" :show-cancel-button="true" title="个性签名" @confirm="signChange('personalSignature')">
      <view class="slot-content">
        <u-input v-model="userInfo.personalSignature" type="textarea" :border="true" height="150" :auto-height="true">
        </u-input>
      </view>
    </u-modal>
    <u-toast ref="uToast" />
<!--    <view >-->
<!--      <u-modal :show="changeEmailShow" title="提示" content='content'></u-modal>-->
<!--&lt;!&ndash;      <u-button @click="changeEmailShow = true">打开</u-button>&ndash;&gt;-->
<!--    </view>-->
  </view>


</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import global from "@/common/common";
import {pathToBase64} from "image-tools";
import {convertBase64ToBlob} from "@/common/fileTransfer";
import clone from "uview-ui/libs/luch-request/utils/clone";
// import {
//   Encrypt,
//   EncryptMd5
// } from '@/utils/aes/aes.js'
// import userApi from '@/service/mine.js'
// import tokenApi from '@/service/token.js'
export default {
  data() {
    return {
      avatarWithoutUrlBeforeChange:'',
      uploadToken:"",
      changeEmailShow:false,
      userDt:{},
      userId:-1,
      userInfo:{
        avatar:"",
        nickName:"nick",
        gender:1
      },
      background: {
        backgroundColor: '#f5f5f5'
      },
      isEdit: false, //最初为非编辑状态
      signShow: false,//个性签名模态框
    }
  },
  computed: {
    // ...mapState({
    //   userInfo: state => state.user.userInfo
    // })
  },
  created() {
    var that = this
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const userLocalDataValue = uni.getStorageSync('userLocalData');
      if(userLocalDataValue){
        this.userDt = JSON.parse(userLocalDataValue)
      }
    }catch(e){}
    this.userId = parseInt(this.userDt.id)
    uni.request({
      url:global.commonLocalServer+"/users/getById/" + this.userId,
      method:"GET",
      header:{
        'token':that.userDt.token
      },
      success:function(res){
        that.userInfo = res.data.data
        that.avatarWithoutUrlBeforeChange = that.userInfo.avatar
        that.userInfo.avatar = global.storageUrl + that.userInfo.avatar
        console.log(that.userInfo)
        // that.detail.imgUrl = global.storageUrl + that.detail.imgUrl
      }
    })
  },


  methods: {
    submitClicked(){
      if (this.userInfo.avatar !== global.storageUrl + this.avatarWithoutUrlBeforeChange){
        console.log("检测到头像发生了改变")
        this.uploadAvatar()
      } else {
        this.uploadUserData(this.avatarWithoutUrlBeforeChange)
      }
    },

    async uploadAvatar() {
      var that = this
      let fileName = "avatar" + "_" + this.userDt.id + "_" + Date.parse(new Date())
      await pathToBase64(this.userInfo.avatar).then(base64 => {
        this.base64Result = base64;
      }).catch(error => {
        console.error(error)
      })
      this.picFile = new File([convertBase64ToBlob(this.base64Result)],fileName);
      // let data = new FormData();
      // await data.append('token', that.uploadToken)
      // await data.append("file", that.picFile);
      return new Promise( (resolve, reject) => {
        console.log(that.userInfo.avatar)
        let a = uni.uploadFile({
          url:'http://up-cn-east-2.qiniup.com',
          filePath:that.userInfo.avatar,
          formData: {
             'key':fileName,
             "token":that.uploadToken
          },
          success: (res) => {
            console.log(JSON.parse(res.data).key)
            that.uploadUserData(JSON.parse(res.data).key)
          }
        })
      })
    },

    uploadUserData(avatarWithoutUrl){
      let that = this
      console.log(that.userInfo)
      let infoClone = clone(that.userInfo)
      console.log(infoClone)
      infoClone.avatar = avatarWithoutUrl
      uni.request({
        method:"POST",
        url:global.commonLocalServer + '/users/updateUserById',
        header:{
          'token':that.userDt.token
        },
        data: infoClone,
        success: (res) => {
          console.log(res)
          this.$refs.uToast.show({
            message:'修改成功',
          })
        }
        })
    },

    avatarClicked(){
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.userInfo.avatar = res.tempFilePaths[0]
          let token = global.getLocalUserToken()
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

    emailClicked(){
      // console.log(item)
      this.$refs.uToast.show({
        message:'修改邮箱请联系管理员',
      })

    },

    changePasswordClicked(){
      uni.navigateTo({url: '/pages/userInfo/changePassword/changePassword'})
    },

    deleteMyAccount() {
      let that = this
      this.uploadUserData()



      // this.userInfo.avatar = "http://r8otjafce.bkt.clouddn.com/Vue%E3%80%81Vuejs%E6%95%99%E7%A8%8B.jpg"
    },
    ...mapActions(['changeUserInfoActions']),
    //获取用户信息请求 刷新vuex
    getUserInfo() {
      var that = this
      uni.request({
        url:global.commonLocalServer+"/files/getToken",
        method:"GET",
        header:{
          // 'Access-Control-Allow-Origin':'*',
          "content-type":"application/json",
          'token':that.userDt.token
        },
        success:function(res){
          that.token = res.data.data
          console.log(that.token)
        }
      })

    },
    //更新用户信息请求
    updateProfile(info) {
      //console.log(this.userInfo[info]) //测试名
      // tokenApi.createToken().then(res => { //请求到防止重复提交的token的接口后，再请求更新profile
      //   let params = {
      //     //比如avatar: this.userInfo[avatar] 就是找到this.userInfo.avatar
      //     [info]: this.userInfo[info],
      //     id: this.userInfo.id,
      //     token: res.data.token
      //   }
      //   //console.log(params)
      //   if (res.meta.code === '200') {
      //     userApi.updateProfile(params).then(res => {
      //       if (res.meta.code === '200') {
      //         //提示更新用户信息成功
      //         this.$refs.uToast.show({
      //           title: '更新用户信息成功',
      //           type: 'success',
      //           icon: false
      //         })
      //         //**刷新vuex中数据 渲染
      //         this.getUserInfo()
      //         //console.log(this.userInfo.nickName)
      //       }
      //     }).catch(err => {
      //       this.$refs.uToast.show({
      //         title: err.meta.msg,
      //         type: 'error',
      //         icon: false
      //       })
      //     })
      //   }
      // })
    },
    //点击cell框修改昵称
    nickNameChange(nickName) {
      //点击变成编辑状态
      this.isEdit = !this.isEdit
      if (!this.isEdit) { //点击后，为false也就是非编辑状态，才发送请求更新数据
        console.log(this.userInfo.nickName)
        this.updateProfile(nickName)
      }
    },
    //input框点击完成确认修改昵称
    inputNameChange(nickName){
      this.updateProfile(nickName)
      this.isEdit = false//改为非编辑状态
    },
    //更新性别
    radioGroupChange(e) { //e为v-model绑定的0/1
      console.log(e);//0,1
      console.log(this.userInfo.gender)//0,1
      this.updateProfile('gender')
    },
    //修改个人签名
    signatureChange(){
      this.signShow=true
    },
    //在模态框中提交个人签名
    signChange(Signature){
      this.updateProfile(Signature)
    }
  }
}
</script>
