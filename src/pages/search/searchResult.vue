<template>
  <view >
    <!--    搜索框-->
    <u-search placeholder="输入想学的" class="px-20"
              v-model="lessonName"  @custom="searchClicked()"></u-search>
        <view class="px-20" style="margin-top: 30rpx;">
          <view v-for="(item,index) in searchResultList" v-if="searchResultList.length !== 0"
                class="shadow u-border-radius d-flex a-center"
                style="height: 200rpx; margin-bottom: 30rpx;" @click="cardClicked(item)">
            <image class="u-border-radius flex-shrink mx-20" :src="item.imgUrl" style="width: 260rpx;height: 160rpx;"></image>
            <view class="d-flex flex-column j-sb " style="padding-right: 10rpx;height: 80%">
              <view style="margin-top: 10rpx;">
                <view class="u-line-1" style="font-size: 32rpx; margin-bottom: 5rpx;">{{item.lessonName}}</view>
                <view class="u-line-1 gray-color" style="font-size: 26rpx;">{{item.courseIntroduction}}</view>
              </view>
              <view class="d-flex w-100">
                <view class="d-flex a-end">
                  <text style="margin-bottom: 10rpx;margin-right: 110rpx;">{{item.createAt}}</text>
                </view>
<!--                <view>-->
<!--                  <u-button type="primary" size="mini" @click="editCourseClicked(item,1)"-->
<!--                            style="margin-top: 30rpx; width: 130rpx;" text="编辑教学"></u-button>-->
<!--                </view>-->
              </view>
            </view>
          </view>
        </view>
    <view v-if="searchResultList.length  === 0" style="text-align:center">
        <view >
          <image style="width: 200px; height: 200px; margin-top: 15%;"
                 :src="noResult()" ></image>
        </view>
        <text style="color: #8f8f8f;  margin-top:7%; font-size: 40rpx;">搜索不到哦~</text>
    </view>
  </view>
</template>

<script>
import global from "@/common/common";
import HLessonsListRow from "@/components/h-lessons-list-row/h-lessons-list-row";

export default {
  name: "searchResult",
  components: {HLessonsListRow},
  data() {
    return {
      lessonName:"node",
      searchResultList:[
        {
          id:1,
          name:"1hao",
          intro:"1hao1hao",
          date:"yyyy-mm-dd",
          url: global.storageUrl + '%E9%BB%91%E9%A9%ACpink.jpg',
          courseIntroduction:''
        },
      ],
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
  onLoad (e) { //option为object类型，会序列化上个页面传递的参数
    console.log(e)
    this.lessonName = e.lessonName
  },
  methods: {
    cardClicked(item){
      // console.log(item)
      uni.navigateTo({
        url:'/pages/Lesson/LessonInfo'+"?LessonId="+item.id + "&LessonName="+item.lessonName
      })
    },
    searchClicked(){
      this.getLists()
    },
    getLists(){
      var that = this
      console.log( that.lessonName)
      uni.request({
        method:'GET',
        url: global.commonLocalServer+ '/lesson/searchLesson/' + that.lessonName,
        header : {'token': that.userDt.token},
        success: function (res) {
          // if (res.data.data !== null)
          that.searchResultList = that.addQiniuUrl(res.data.data)
          console.log(that.searchResultList)

        }
      })
    },
    click(item,which) {
      console.log('item', item);
      this.now = item.id
    },

    addQiniuUrl(listInput){
      if (listInput.length >0){
        for (let i=0;i<listInput.length;i++){
          listInput[i].imgUrl = global.storageUrl + listInput[i].imgUrl
          listInput[i].createAt = listInput[i].createAt.substring(0,10)
        }
        return listInput
      } else {
        return []
      }

    },

    noResult() {
      return global.storageUrl + 'noResultGray.png'
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