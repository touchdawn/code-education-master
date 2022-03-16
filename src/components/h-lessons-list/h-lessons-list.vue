<template>
  <view class="px-20 d-flex j-sb flex-wrap" style="margin-top: 40rpx;">
    <view v-for="(i,index) in 4" class="shadow"
          style="border-top-right-radius: 10rpx; border-top-left-radius: 10rpx;
              width: 345rpx; margin-bottom: 30rpx;">
      <!--          <view class="">-->
      <image src="http://1.15.117.159/wp-content/uploads/2021/06/BEA9A1ED-81F9-4F34-82CB-C433B663D624.jpeg"
             class="img-345" ></image>
      <view class="px-10">
        <view class="u-line-1 font-weight black-color my-10" style="font-size: 28rpx">乐高教学</view>
        <view class="u-line-1 gray-color" style="font-size: 24rpx;">乐高描述乐高描述乐高描述乐高描述乐高描述乐高描述乐高描述乐高描述</view>
      </view>

      <view class="d-flex j-sb px-20" style="margin-top: 5rpx;">
        <view class="d-flex a-end">
          <h-pprice></h-pprice>
          <h-oprice></h-oprice>
        </view>
      </view>
      <u-icon name="shopping-cart" color="#1bbf80" size="36" style=""></u-icon>

      <!--        </view>-->
    </view>
  </view>

</template>

<script>
import HPprice from "@/components/h-pprice/h-pprice";
import HOprice from "@/components/h-oprice/h-oprice";
export default {
  name: "h-lessons-list",
  components: {HOprice, HPprice}
}
</script>

<style scoped>

</style>