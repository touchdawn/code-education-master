<template>
  <view>
<!--    <view-->
<!--        class="d-flex flex-row align-center"-->
<!--        style=" border-bottom: 3rpx solid #bdbdbd; padding-bottom: 2%; margin-bottom: 2%; margin-top: 3%;">-->
<!--      <image class="u-border-radius flex-shrink " @click="cardClicked(item)"-->
<!--             :src="senderMessage.senderAvatar" style="width: 100rpx;height: 100rpx; margin-left: 40rpx; margin-right: 20rpx;"></image>-->
<!--      <view class="  align-center " style="padding-right: 10rpx;font-size: 32rpx;">-->
<!--        <view style="font-size: 42rpx; margin-bottom: 10rpx;">{{senderMessage.senderName}}</view>-->
<!--        <text >{{senderMessage.sendTime}}</text>-->
<!--      </view>-->
<!--    </view>-->
    <u-toast ref="uToast" />
    <view style="margin-left: 6%;margin-top: 6%; width: 88%">
      <view style="font-weight:bold; margin-bottom: 6%;">
        <u--text size="23" lineHeight="33"
                 :text="'回复：'+senderMessage.title"></u--text>
      </view>
      <view style="margin-bottom: 10%;">
        <u--text size="16" lineHeight="33"
                 text="主题："></u--text>
        <u-input  v-model="replyMessageTitle" placeholder="请输入标题"
                  count height="120" style="margin-top: 3%;"></u-input>
      </view>
      <u--textarea  v-model="replyMessage" placeholder="请输入内容"
                count height="120"></u--textarea>

      <view style="margin-top: 10%; display:flex; ">
        <u-button type="warning" style="width: 40%;" @click="goBackClicked">取消</u-button>
        <u-button type="primary"  style="width: 40%;" @click="sendClicked">发送</u-button>

      </view>
    </view>

    <view>
      <!-- 发送提示窗 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog type="primary" cancelText="取消" confirmText="发送"
                          title="确认" content="确认发送吗？"
                          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
    <view>
      <!-- 取消提示框 -->
      <uni-popup ref="navigateBackConfirmDialog" type="dialog">
        <uni-popup-dialog type="warning" cancelText="取消" confirmText="确认"
                          title="确认" content="确认返回吗？"
                          @confirm="navigateBackConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import global from "@/common/common";

export default {
  name: "replyMessage",
  data(){
    return{
      userDt:{},
      senderMessage:{
        messageId:'',
        title:'',
        senderId:''
      },
      replyMessageTitle:"",
      replyMessage:"",

    }
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
  },
  onLoad(e){
    console.log(e)
    this.senderMessage.messageId = e.senderMsgId
    this.senderMessage.title = e.title
    this.senderMessage.senderId = e.senderId
  },
  methods:{
    goBackClicked(){
      if (global.isEmpty(this.replyMessageTitle) && global.isEmpty(this.replyMessage) ){
        uni.navigateBack({delta:1})
      } else {
        this.$refs.navigateBackConfirmDialog.open()
      }
    },
    navigateBackConfirm() {
      this.senderMessage = {}
      this.replyMessageTitle = ''
      this.replyMessage = ''
      uni.navigateBack({delta:1})
    },
    sendClicked(){
      console.log(this.senderMessage.messageId)
      if (this.checkInput() === true){
        this.$refs.alertDialog.open()
      }
    },
    dialogConfirm(){
      var that = this
      let uploadData = {}
      uploadData.senderId = that.userDt.id
      uploadData.parentMessageId = that.senderMessage.messageId
      uploadData.receiverId = that.senderMessage.senderId
      uploadData.title = that.replyMessageTitle
      uploadData.content = that.replyMessage
      uploadData.method = 'reply'

      let header = {token:that.userDt.token}
      console.log("upload:")
      console.log(uploadData)
      uni.request({
        method:'POST',
        url: global.commonLocalServer + "/message/addMessage",
        data:uploadData,
        header:header,
        success: function (res){
          console.log("res:")
          console.log(res)
        }
      })
    },

    checkInput(){
      if(global.isEmpty(this.replyMessageTitle)){
        this.$u.toast("请填写标题！")
        return false
      } else if (global.isEmpty(this.replyMessage)) {
        this.$u.toast("请填写内容！")
        return false
      } else {
        return true
      }
    }

  }
}
</script>

<style scoped>

</style>