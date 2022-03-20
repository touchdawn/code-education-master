<template>
<view>
  <view>
    <view class="flex align-center py-2">
      <text class="font-md font-weight-bold">{{lessonId}}</text>
    </view>
  </view>
</view>
</template>

<script>
export default {
  name: "LessonInfo",
  data(){
    return{
      lessonId:0,
    }
  },

  onLoad (e) { //option为object类型，会序列化上个页面传递的参数
    this.lessonId = e.LessonId
  },
  methods:{

  }

}
</script>

<style scoped>

</style>