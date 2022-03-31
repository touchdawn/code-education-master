<template>
  <view>
    <view
          class="d-flex flex-row align-center"
          style=" border-bottom: 3rpx solid #bdbdbd; padding-bottom: 2%; margin-bottom: 2%; margin-top: 3%;">
      <image class="u-border-radius flex-shrink " @click="cardClicked(item)"
             :src="senderMessage.senderAvatar" style="width: 100rpx;height: 100rpx; margin-left: 40rpx; margin-right: 20rpx;"></image>
      <view class="  align-center " style="padding-right: 10rpx;font-size: 32rpx;">
        <view style="font-size: 42rpx; margin-bottom: 10rpx;">{{senderMessage.senderName}}</view>
        <text >{{senderMessage.sendTime}}</text>
      </view>
    </view>

    <view style="margin-left: 6%;margin-top: 8%; width: 88%">
      <view style="font-weight:bold; margin-bottom: 6%;">
      <u--text size="26" lineHeight="33"
               :text="senderMessage.title"></u--text>
      </view>
      <u--text size="16" lineHeight="33"
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
        title:"Tesla正在招聘: Data Analyst Intern",
        content:"随着移动应用的快速增长和广泛竞争，如果都使用原生系统开发，无疑会增加开发难度，拉长应用交付" +
            "的时间，uni-app的出现成为开发者的福音，它是一个使用 Vue.js 开发前端应用的框架，开发者编写一套代码，就" +
            "能发布到iOS、Android、Web（响应式）、以及各种小程序（包括微信/支付宝等）等多个平台。",
        senderAvatar:"http://r8otjafce.bkt.clouddn.com/avatar_2_1648269437000",
        senderName:"门吉",
        sendTime:"2022-3-31",
        senderNickName:"sddddd"
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