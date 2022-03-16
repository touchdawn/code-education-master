<template>
  <view class="px-20" style="margin-top: 30rpx">
    <view v-for="(i,index) in 10" class="shadow u-border-radius d-flex a-center" style="height: 200rpx;padding: 10rpx; margin-bottom: 30rpx;">
      <image class="img-160 u-border-radius flex-shrink mx-20" src="http://1.15.117.159/wp-content/uploads/2020/05/代价函数三维.jpg"></image>
      <view class="d-flex flex-column j-sb h-100" style="padding-right: 10rpx;">
        <view style="margin-top: 10rpx;">
          <view class="u-line-1" style="font-size: 32rpx; margin-bottom: 5rpx;">数据仿真处理</view>
          <view class="u-line-1 gray-color" style="font-size: 26rpx;">数据仿真处理数据仿真处理数据仿真处理数据仿真处理数据仿真处理</view>
        </view>
        <view class="d-flex j-sb w-100">
          <view class="d-flex a-end">
            <h-pprice></h-pprice>
            <h-oprice></h-oprice>
          </view>
          <view>
            <u-button type="primary" size="mini" text="立即购买"></u-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "h-lessons-list-row"
}
</script>

<style scoped>

</style>