<template>
  <view class="" style="margin-top: 30rpx; margin-bottom: 30rpx; position: relative">
    <view class="font-weight" style="text-align: center;font-size: 36rpx; margin-bottom: 20rpx;">{{title}}</view>
    <view class="">
      <view class="gray-color d-flex j-center w-100"
            style="position: absolute;padding:10rpx;font-size: 20rpx;text-align: center; font-size: 20rpx">
        <text class="px-5" style="background-color: #F8f8f8; margin-top: -24rpx;letter-spacing: 4rpx">{{desc}}</text>
      </view>
      <view class="d-flex">
        <view class="" style="flex: 1;background-image: linear-gradient(to right,rgba(27,191,128,0),rgba(27,191,128,1)); height: 5rpx"></view>
        <view class="" style="flex: 1;background-image: linear-gradient(to left,rgba(27,191,128,0),rgba(27,191,128,1)); height: 5rpx"></view>
      </view>
    </view>
  </view>

</template>

<script>
export default {
  name: "h-rec-title",
  props:{
    title: {
      type:String,
      default: '优选好物'
    },
    desc:{
      type:String,
      default: 'YOU XUAN HAO WU'
    }
  }
}
</script>

<style scoped>

</style>