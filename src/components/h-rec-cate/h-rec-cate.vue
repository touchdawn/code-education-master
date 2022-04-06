<template>
  <!--    推荐分类-->
  <view style="margin-top: 30rpx;">
    <view>
      <view class="d-flex j-sb px-20" style="height: 340rpx;width: 100%;background-color: #1BBF80">
        <view class="white-color d-flex flex-column" >
          <text style="font-size: 26rpx; padding: 20rpx 0 10rpx 0; border-bottom: 3rpx solid #FFFFFF;">热门语言 从零开始</text>
          <text class="font-weight" style="font-size: 36rpx; margin-top: 20rpx">编程学习路线</text>
        </view>
      </view>
      <!--      <view class="bg-white-color shadow u-border-radius d-flex flex-wrap"-->
      <!--            style="width: 710rpx;height: 350rpx;margin: -175rpx auto 30rpx;">-->
      <!--        <view v-for="(i,index) in 4" class="">-->
      <!--          <view :class="[index % 2 === 0 ? 'cateRight' : '',(index === 0 || index === 1) ? 'cateBottom' : '']"-->
      <!--                class="d-flex j-sb" style="width: 355rpx;height: 175rpx;">-->
      <!--            <view class="black-color" style="margin-top: 30rpx; margin-left: 20rpx;">-->
      <!--              <text style="border-bottom: 2rpx solid #1BBF80;padding-bottom: 10rpx;font-size: 30rpx">安卓应用开发</text>-->
      <!--            </view>-->

      <!--            <image src="http://chatiba.com/theme/chatiba/default/static/image/ctb.png"-->
      <!--              class="img-160 a-self-end" ></image>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->

      <view class="bg-white-color shadow u-border-radius d-flex flex-wrap j-sa"
            style="width: 710rpx;height: 300rpx;margin: -175rpx auto 30rpx;">
        <!--        <view class="" v-for="(i,index) in 4">-->
        <view class="h-100 d-flex flex-column j-sb py-20 a-center"
              style="flex: 1; height: 300rpx; border-right: 1rpx solid #CCCCCC" @click="viewClicked"
        >
          <text class="font-weight" style="margin-top: 20rpx;padding-bottom: 10rpx;font-size: 26rpx; border-bottom: 2rpx solid #1BBF80">Python</text>
          <image src="http://r8otjafce.bkt.clouddn.com/pythonLogo.png"
                 class="img-160" ></image>
        </view>

        <view class="h-100 d-flex flex-column j-sb py-20 a-center"
              style="flex: 1; height: 300rpx; border-right: 1rpx solid #CCCCCC"
        >
          <image src="http://r8otjafce.bkt.clouddn.com/cppLogo.png"
                 class="img-160" ></image>
          <text class="font-weight" style="margin-top: 20rpx;padding-bottom: 10rpx;font-size: 26rpx; border-bottom: 2rpx solid #1BBF80">CPP</text>
        </view>

        <view class="h-100 d-flex flex-column j-sb py-20 a-center"
              style="flex: 1; height: 300rpx; border-right: 1rpx solid #CCCCCC"
        >
          <text class="font-weight" style="margin-top: 20rpx;padding-bottom: 10rpx;font-size: 26rpx; border-bottom: 2rpx solid #1BBF80">JavaScript</text>
          <image src="http://r8otjafce.bkt.clouddn.com/JavaScriptLogo.png"
                 class="img-160" ></image>
        </view>

        <view class="h-100 d-flex flex-column j-sb py-20 a-center"
              style="flex: 1; height: 300rpx"
        >
          <image src="http://r8otjafce.bkt.clouddn.com/javaLogo.png"
                 class="img-160" ></image>
          <text class="font-weight" style="margin-top: 20rpx;padding-bottom: 10rpx;font-size: 26rpx; border-bottom: 2rpx solid #1BBF80">Java</text>
        </view>

        <!--        </view>-->
      </view>
      <!--    <h-lessons-list></h-lessons-list>-->
    </view>
  </view>
</template>

<script>
import HLessonsList from "@/components/h-lessons-list/h-lessons-list";
export default {
  name: "h-rec-cate",
  components: {HLessonsList},
  methods:{
    viewClicked(){
      uni.navigateTo({
        url:'/pages/skillMap/skillMap'+"?id="+'1'
      })
    }
  }
}

</script>

<style scoped>

</style>