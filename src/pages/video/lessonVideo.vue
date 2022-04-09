<template>

  <view>
    <!--    自定义导航-->
    <u-navbar
        title="个人中心"
        @rightClick="rightClick"
        :autoBack="true"
    >
    </u-navbar>
    <view class="uni-padding-wrap uni-common-mt" >
      <view class="">
        <video id="myVideo" :src="videoData.src" style="margin-top: 40rpx;width: 100%"
               :danmu-list="danmuList" enable-danmu danmu-btn controls :title="videoData.title"
               vslide-gesture-in-fullscreen></video>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "lessonVideo",
  data(){
    return {
      videoData:{
        title:"h5(html5)+css3+移动端前端视频教程",
        src:"http://ra2q5rhzl.hd-bkt.clouddn.com/h5%28html5%29%2Bcss3%2B%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%89%8D%E7%AB%AF%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B%20-1.mp4"
      },
      danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
        {
          text: '第 3s 出现的弹幕',
          color: '#ff00ff',
          time: 3
        }
      ],
      danmuValue: ''
    }
  }
}
</script>

<style scoped>

</style>