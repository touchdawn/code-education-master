<template>
  <view class="flex">
    <view class="u-course-stars_bg" style="margin-top:6rpx;">
      <view class="u-course-stars_active" :style="{width: wStyle}"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    score: {
      type: [Number,String],
      default: 5.0
    }
  },
  data() {
    return {
      width: 172
    }
  },
  computed: {
    wStyle () {
      const width = parseInt(parseFloat(172 / 5) * parseFloat(this.score));
      return width + 'rpx'
    }
  }
}
</script>

<style lang="scss" scoped>
.u-course-stars_bg {
  display: block;
  position: relative;
  width: 172rpx;
  height: 26rpx;
  background: url('@/static/image/star.png') center center no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
}
.u-course-stars_active {
  background: url('@/static/image/star_active.png') 0 0 no-repeat;
  -webkit-background-size: 172rpx 172rpx;
  background-size: 172rpx;
  height: 26rpx;
  position: absolute;
  top: 0rpx;
  left: 0rpx;
}
</style>
