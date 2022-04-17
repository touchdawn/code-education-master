<template>
  <view >
    <!--    搜索框-->
<!--    <u-search placeholder="输入想学的" class="px-20"-->
<!--              v-model="lessonName"  @custom="searchClicked()"></u-search>-->

    <view class="px-20" style="margin-top: 30rpx;">
      <view v-for="(item,index) in favList" v-if="favList.length !== 0"
            class="shadow u-border-radius d-flex a-center"
            style="height: 200rpx; margin-bottom: 30rpx;">
        <image class="u-border-radius flex-shrink mx-20" @click="cardClicked(item)"
               :src="item.imgUrl" style="width: 260rpx;height: 160rpx;"></image>
        <view class="d-flex flex-column j-sb " style="padding-right: 10rpx;height: 80%">
          <view style="margin-top: 10rpx;" @click="cardClicked(item)">
            <view class="u-line-1" style="font-size: 32rpx; margin-bottom: 5rpx;">{{item.lessonName}}</view>
            <view class="u-line-1 gray-color" style="font-size: 26rpx;">{{item.courseIntroduction}}</view>
          </view>
          <view class="d-flex  align-center uni-row margin-top-xs">
            <view class="d-flex a-end" @click="cardClicked(item)">
              <text style="margin-bottom: 10rpx;">{{momentTimeTransfer(item.createAt)}}</text>
            </view>
              <view class="a-end">
                <u-icon name="trash" style="position: absolute; right: 40rpx; margin-bottom: 20rpx;"
                         @click = deleteFav(item)>
                </u-icon>
<!--                <u-button   type="primary" size="mini" @click="editCourseClicked(item,1)"-->
<!--                          style="margin-top: 30rpx; width: 130rpx; margin-left: 90rpx;" text="编辑教学"></u-button>-->
              </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="favList.length  === 0" style="text-align:center">
      <view >
        <image style="width: 200px; height: 200px; margin-top: 15%;"
               :src="noResult()" ></image>
      </view>
      <text style="color: #8f8f8f;  margin-top:7%; font-size: 40rpx;">搜索不到哦~</text>
    </view>

    <view>
      <!-- 提示窗示例 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog type="error" cancelText="取消" confirmText="删除"
                          title="警告" content="确认取消订阅吗？"
                          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import global from "@/common/common";
import HLessonsListRow from "@/components/h-lessons-list-row/h-lessons-list-row";
import moment from 'moment';

export default {
  name: "mySubscribe",
  components: {HLessonsListRow},
  data() {
    return {
      lessonName:"node",
      temp:{
        deleteFavId:-1,
        courseId: -1
      },
      favList:[
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
        // console.log(value)
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

    deleteFav(item){
      console.log(item)
      this.temp.deleteFavId = item.favId
      this.temp.courseId = item.id
      this.$refs.alertDialog.open()
    },
    dialogConfirm(){
      var that = this

      let header = {token:that.userDt.token}
      uni.request({
        method:'GET',
        url: global.commonLocalServer + "/redis/cancelCourseSubscribe/" + that.temp.courseId + '/' + that.userDt.id,
        header:header,
        success: function (res){
          console.log("res:")
          console.log(res)
          that.favList = []
          that.getLists()
        }
      })
    },

    getLists(){
      var that = this
      uni.request({
        method:'GET',
        url: global.commonLocalServer+ '/redis/getSubCourseByUserId/' + that.userDt.id,
        header : {'token': that.userDt.token},
        success: function (res) {
          // if (res.data.data !== null)
          // that.favList = res.data.data
          console.log(res)
          that.favList = that.addQiniuUrl(res.data.data)

          console.log(that.favList)

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
        }
        return listInput
      } else {
        return []
      }

    },

    noResult() {
      return global.storageUrl + 'noResultGray.png'
    },
    momentTimeTransfer(input){
      return moment(input).format('YYYY年MM月DD日 HH:mm:ss')
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