<template>
  <view>

    <uni-popup ref="popup" type="bottom">
      <view class="pop">
        <input type="text" :focus = 'setfocus' placeholder="ssss">
        <button type="default" > send</button>
      </view>
    </uni-popup>

    <text>message</text>
    <tab-bar :msg="msg"></tab-bar>
    <view class="container">
      <uni-card is-full :is-shadow="false">
        <text class="uni-h6">弹出层组件用于弹出一个覆盖到页面上的内容，使用场景如：底部弹出分享弹窗、页面插屏广告等。</text>
      </uni-card>
      <uni-section title="基本示例" type="line">
        <view class="example-body box">
          <button class="button" type="dangerous" @click="reply()"><text class="button-text">右侧</text></button>

          <button class="button" type="primary" @click="toggle('top')"><text class="button-text">顶部</text></button>
          <button class="button" type="primary" @click="toggle('bottom')"><text class="button-text">底部</text></button>
          <button class="button" type="primary" @click="toggle('center')"><text class="button-text">居中</text></button>
          <button class="button" type="primary" @click="toggle('left')"><text class="button-text">左侧</text></button>
          <button class="button" type="primary" @click="toggle('right')"><text class="button-text">右侧</text></button>
        </view>
      </uni-section>

      <uni-section title="提示消息" type="line">
        <view class="example-body box">
          <button class="button popup-success" @click="messageToggle('success')"><text
              class="button-text success-text">成功</text></button>
          <button class="button popup-error" @click="messageToggle('error')"><text
              class="button-text error-text">失败</text></button>
          <button class="button popup-warn" @click="messageToggle('warn')"><text
              class="button-text warn-text">警告</text></button>
          <button class="button popup-info" @click="messageToggle('info')"><text
              class="button-text info-text">信息</text></button>
        </view>
      </uni-section>


      <uni-section title="对话框示例" type="line" class="hideOnPc">
        <view class="example-body box">
          <button class="button popup-success" @click="dialogToggle('success')"><text
              class="button-text success-text">成功</text></button>
          <button class="button popup-error" @click="dialogToggle('error')"><text
              class="button-text error-text">失败</text></button>
          <button class="button popup-warn" @click="dialogToggle('warn')"><text
              class="button-text warn-text">警告</text></button>
          <button class="button popup-info" @click="dialogToggle('info')"><text
              class="button-text info-text">信息</text></button>
        </view>
      </uni-section>

      <uni-section title="输入框示例" type="line" padding>
        <view class="dialog-box">
          <text class="dialog-text">输入内容：{{ value }}</text>
        </view>
        <button class="button" type="primary" @click="inputDialogToggle"><text
            class="button-text">输入对话框</text></button>

      </uni-section>
      <uni-section title="底部分享示例" type="line" padding>
        <button class="button" type="primary" @click="shareToggle"><text class="button-text">分享模版示例</text></button>
      </uni-section>
      <view>
        <!-- 普通弹窗 -->
        <uni-popup ref="popup" background-color="#fff" @change="change">
          <view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
              class="text">popup 内容</text></view>
        </uni-popup>
      </view>

      <view>
        <!-- 提示信息弹窗 -->
        <uni-popup ref="message" type="message">
          <uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
        </uni-popup>
      </view>

      <view>
        <!-- 提示窗示例 -->
        <uni-popup ref="alertDialog" type="dialog">
          <uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="通知" content="欢迎使用 uni-popup!" @confirm="dialogConfirm"
                            @close="dialogClose"></uni-popup-dialog>
        </uni-popup>
      </view>

      <view>
        <!-- 输入框示例 -->
        <uni-popup ref="inputDialog" type="dialog">
          <uni-popup-dialog ref="inputClose"  mode="input" title="输入内容" value="对话框预置提示内容!"
                            placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
        </uni-popup>
      </view>

      <view>
        <!-- 分享示例 -->
        <uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
          <uni-popup-share></uni-popup-share>
        </uni-popup>
      </view>
    </view>

  </view>
</template>

<script>
import TabBar from "@/pages/commomComponent/tabBar";
import UniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup";
export default {
  name: "message",
  components: {UniPopup, TabBar},
  data(){
    return{
      msg:1,
      setfocus:false,
      type: 'center',
      msgType: 'success',
      messageText: '这是一条成功提示',
      value: ''
    }
  },
  methods: {
    reply(){
      this.setfocus = true
    },
    change(e) {
      console.log('当前模式：' + e.type + ',状态：' + e.show);
    },
    toggle(type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.open(type)
    },
    messageToggle(type) {
      this.msgType = type
      this.messageText = `这是一条${type}消息提示`
      this.$refs.message.open()
    },
    dialogToggle(type) {
      this.msgType = type
      this.$refs.alertDialog.open()
    },
    dialogConfirm() {
      console.log('点击确认')
      this.messageText = `点击确认了 ${this.msgType} 窗口`
      this.$refs.message.open()
    },
    inputDialogToggle() {
      this.$refs.inputDialog.open()
    },
    dialogClose() {
      console.log('点击关闭')
    },
    dialogInputConfirm(val) {
      uni.showLoading({
        title: '3秒后会关闭'
      })

      setTimeout(() => {
        uni.hideLoading()
        console.log(val)
        this.value = val
        // 关闭窗口后，恢复默认内容
        this.$refs.inputDialog.close()
      }, 3000)
    },
    shareToggle() {
      this.$refs.share.open()
    }
  }

}
</script>

<style scoped>
.pop{
  width: 750rpx;height:100rpx;background-color: #FFFFFF;
  display: flex;
  padding: 20rpx;
  box-sizing: border-box;
}
.pop button{
  font-size: 24rpx;height: 60rpx;margin-left: 10rpx;width:120rpx;
}
.pop input{
  width: 600rpx;height: 60rpx;border: 1rpx solid #999999;
  padding: 0 10rpx;
  box-sizing: border-box;
}
</style>