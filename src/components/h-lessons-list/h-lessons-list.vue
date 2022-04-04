<template>
  <view class="px-20 d-flex j-sb flex-wrap" style="margin-top: 40rpx;">
<!--    <text>{{ restLessonList2 }}787</text>-->
    <view v-for="(i,index) in restLessonList2" class="shadow" key="key"
          style="border-top-right-radius: 10rpx; border-top-left-radius: 10rpx;
              width: 345rpx; margin-bottom: 30rpx;">
      <!--          <view class="">-->
      <image :src="i.imgUrl"
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
import global from "@/common/common";

export default {
  name: "h-lessons-list",
  components: {HOprice, HPprice},
  data(){
    return{
      restLessonList2:[]
    }
  },
  onLoad(){
    console.log('child loaded')
  },
  created() {
    console.log('child created')
    this.restLessonList2 = []
    var that = this
    try {
      const res = uni.getStorageSync('restLessonList');
      if (res) {
        console.log(res);
        for (var i = 0; i<res.data.length; i++) {
          that.$set(that.restLessonList2,i,res.data[i])
        }
        console.log(that.restLessonList2)
          // this.restLessonList = res.data
        // for (var j = 0; j<this.restLessonList.length; j++){
        //   this.restLessonList[j].imgUrl = global.storageUrl + this.restLessonList[j].imgUrl
        // }
      }
    } catch (e) {
      // error
    }

    // uni.getStorage({
    //   key: 'restLessonList',
    //   success: function (res) {
    //     console.log(res.data);
    //     this.restLessonList = res.data
    //     for (var i = 0; i<this.restLessonList.length; i++){
    //       this.restLessonList[i].imgUrl = global.storageUrl + this.restLessonList[i].imgUrl
    //     }
    //     console.log(this.restLessonList)
    //   }
    // });
  },
  methods:{
    addQiniuUrl(input){
      console.log(global.storageUrl + input)
      return global.storageUrl + input
    }
  }
}
</script>

<style scoped>

</style>