<template>
<view>
  <u-tabs :list="list1" @click="click"></u-tabs>

  <view class="bg-white"  v-if="currentIndex === i" v-for="(m, i) in list1" :key="i">
    <view v-if="now === 0">
      <view class="px-20" style="margin-top: 30rpx;">
        <view v-for="(item,index) in passedList" class="shadow u-border-radius d-flex a-center"
              style="height: 200rpx; margin-bottom: 30rpx;" >

          <image class="u-border-radius flex-shrink mx-20" @click="cardClicked(item)"
                 :src="item.imgUrl" style="width: 260rpx;height: 160rpx;"></image>

          <view style="padding-right: 10rpx;height: 80%">
            <view style="margin-top: 10rpx;" @click="cardClicked(item)">
              <view class="u-line-1" style="font-size: 32rpx; margin-bottom: 5rpx;">{{item.lessonName}}</view>
              <view class="u-line-1 gray-color" style="font-size: 26rpx;">{{item.courseIntroduction}}</view>
            </view>
<!--              <view class="d-flex a-end" @click="cardClicked(item)">-->
<!--                <text style="margin-bottom: 10rpx;margin-right: 110rpx;">{{item.createAt}}</text>-->
<!--              </view>-->
              <view style="display:flex;">
                <u-button type="success" size="mini" @click="editHomeworkClicked(item,1)"
                          style="margin-top: 30rpx; width: 130rpx;" text="查看作业"></u-button>
                <u-button type="primary" size="mini" @click="editCourseClicked(item)"
                          style="margin-top: 30rpx; width: 130rpx; margin-left: 5%" text="编辑教学"></u-button>
              </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="now === 1">
      <view class="px-20" style="margin-top: 30rpx">
        <view v-for="(item,index) in unpassedList" class="shadow u-border-radius d-flex a-center"
              style="height: 200rpx;padding: 10rpx; margin-bottom: 30rpx;">
          <image class="u-border-radius flex-shrink mx-20"
                 :src="item.imgUrl" style="width: 260rpx;height: 160rpx;"></image>
          <view class="d-flex flex-column j-sb " style="padding-right: 10rpx;height: 80%">
            <view style="margin-top: 10rpx;">
              <view class="u-line-1" style="font-size: 32rpx; margin-bottom: 5rpx;">{{item.lessonName}}</view>
              <view class="u-line-1 gray-color" style="font-size: 26rpx;">{{item.courseIntroduction}}</view>
            </view>
            <view class="d-flex  w-100">
              <view class="d-flex a-end">
                <text style="margin-bottom: 10rpx;margin-right: 110rpx;">{{item.createAt}}</text>
              </view>
<!--              <view>-->
<!--                <u-button type="primary" size="mini" @click="editCourseClicked(item,2)"-->
<!--                          style="margin-top: 30rpx; width: 130rpx;" text="编辑教学"></u-button>-->
<!--              </view>-->
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

</view>
</template>

<script>
import global from "@/common/common";
import HLessonsListRow from "@/components/h-lessons-list-row/h-lessons-list-row";

export default {
  name: "myCourse",
  components: {HLessonsListRow},
  data() {
    return {
      passedList:[
        {
          id:1,
          name:"1hao",
          intro:"1hao1hao",
          date:"yyyy-mm-dd",
          url: global.storageUrl + '%E9%BB%91%E9%A9%ACpink.jpg',
          courseIntroduction:''
        },
      ],
      unpassedList:[],
      now:0,
      list1: [{
        id: 0,
        name: '已过审'
      }, {
        id: 1,
        name: '审核中'
      }],
      currentIndex: 0,
    }
  },

  created() {
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const userLocalDataValue = uni.getStorageSync('userLocalData');
      if(userLocalDataValue){
        this.userDt = JSON.parse(userLocalDataValue)
      }
    }catch(e){}
    this.getLists()
  },

  methods: {
    cardClicked(item){
      // console.log(item)
      uni.navigateTo({
        url:'/pages/Lesson/LessonInfo'+"?LessonId="+item.id + "&LessonName="+item.lessonName
      })
    },

    editCourseClicked(item){
      console.log(item)
      uni.navigateTo({
        url:'/pages/teacher/course/editUploadedCourse'+"?courseId="+item.id +"&courseName="+item.lessonName
      })
    },
    editHomeworkClicked(item){
      console.log(item)
      uni.navigateTo({
        url:'/pages/teacher/homework/allHomework'+"?courseId="+item.id
      })
    },
    getLists(){
      var that = this
      uni.request({
        method:'GET',
        url: global.commonLocalServer+ '/lesson/getLessonByTeacherId/' + that.userDt.id,
        header : {'token': that.userDt.token},
        success: function (res) {
          that.passedList = that.addQiniuUrl(res.data.data.checkPassedList)
          that.unpassedList = that.addQiniuUrl(res.data.data.checkingList)
          console.log(that.passedList)

        }
      })
    },
    click(item,which) {
      console.log('item', item);
      this.now = item.id
    },

    addQiniuUrl(listInput){
      console.log(listInput)
      console.log(listInput.length)
      if (listInput.length >0){
        for (let i=0;i<listInput.length;i++){
          listInput[i].imgUrl = global.storageUrl + listInput[i].imgUrl
          listInput[i].createAt = listInput[i].createAt.substring(0,10)
        }
        return listInput
      } else {
        return []
      }

    }
  }
}
</script>

<style scoped>
/*.grid-text {*/
/*  font-size: 14px;*/
/*  color: #909399;*/
/*  padding: 10rpx 0 20rpx 0rpx;*/
/*  !* #ifndef APP-PLUS *!*/
/*  box-sizing: border-box;*/
/*  !* #endif *!*/
/*}*/

/*.cateRight{*/
/*  border-right: 1rpx solid #CCCCCC;*/
/*}*/
/*.cateBottom{*/
/*  border-bottom: 1rpx solid #CCCCCC;*/
/*}*/
</style>