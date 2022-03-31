<template>
  <view>
    <u-toast ref="uToast" />

    <view
          class="d-flex flex-row align-center"
          style=" border-bottom: 3rpx solid #bdbdbd; padding-bottom: 2%; margin-bottom: 2%; margin-top: 3%;">
      <image class="u-border-radius flex-shrink "
             :src="senderMessage.senderAvatar" style="width: 100rpx;height: 100rpx; margin-left: 40rpx; margin-right: 20rpx;"></image>
      <view class="  align-center " style="padding-right: 10rpx;font-size: 32rpx;">
        <view style="font-size: 42rpx; margin-bottom: 10rpx;">{{senderMessage.senderName}}</view>
        <text >{{senderMessage.sendTime}}</text>
      </view>
    </view>

    <view style="margin-left: 6%;margin-top: 8%; width: 88%">
      <view style="font-weight:bold; margin-bottom: 6%;">
      <u--text size="24" lineHeight="33"
               :text="senderMessage.title"></u--text>
      </view>
      <u--text size="18" lineHeight="33"
               :text="senderMessage.content"></u--text>
    </view>

    <u-tabbar
        :value="1"
        :fixed="true"
        :placeholder="true"
        :safeAreaInsetBottom="false"
    >
      <u-tabbar-item text="删除" icon="trash" @click="deleteClicked" ></u-tabbar-item>
      <u-tabbar-item text="回复" icon="edit-pen" @click="replyClicked" ></u-tabbar-item>
    </u-tabbar>

    <view>
      <!-- 发送提示窗 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog type="error" cancelText="取消" confirmText="确认"
                          title="警告" content="确认删除吗？"
                          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import global from "@/common/common";

export default {
  name: "readMessage",
  data(){
    return{
      userDt:{},
      senderMessage:{
        messageId:'',
        title:"",
        content:"",
        senderAvatar:"http://r8otjafce.bkt.clouddn.com/avatar_2_1648269437000",
        senderName:"",
        sendTime:"",
        senderNickName:""
      }
    }
  },

  created() {
    this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    this.getMessageById()
  },

  onLoad(e){
    this.senderMessage.messageId = e.messageId
    console.log(this.senderMessage.messageId)
  },

  methods:{
    getMessageById(){
      let that = this
      uni.request({
        method:'GET',
        header:{'token':that.userDt.token},
        url: global.commonLocalServer + '/message/getMessageById/' + that.senderMessage.messageId,
        success: function (res) {
          console.log(res)
          that.senderMessage = res.data.data
          that.senderMessage.senderAvatar = global.storageUrl + res.data.data.senderAvatar
        }
      })
    },
    deleteClicked (){
      this.$refs.alertDialog.open()
    },
    dialogConfirm(){
      var that = this
      let uploadData = {}
      uploadData.messageId = that.senderMessage.messageId
      uploadData.method = 'deleteByReceiver'

      let header = {token:that.userDt.token}
      console.log("upload:")
      console.log(uploadData)
      uni.request({
        method:'POST',
        url: global.commonLocalServer + "/message/postChangeMessage",
        data:uploadData,
        header:header,
        success: function (res){
          console.log("res:")
          console.log(res)
          if (res.data.flag === 'T') {
            uni.$emit('messageUpdate',{msg:'页面更新'})
            uni.navigateBack({delta: 1})
          } else {
            that.$u.toast("删除失败")
          }
        }
      })
    },
    replyClicked () {
      uni.navigateTo({
        url:'/pages/message/messageDetail/replyMessage'
            + '?title=' + this.senderMessage.title
            + '&senderMsgId=' + this.senderMessage.messageId
            + '&senderId=' + this.senderMessage.senderId
      })
    }
  }
}
</script>

<style scoped>

</style>