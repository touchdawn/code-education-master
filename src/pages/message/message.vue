<template>
  <view >
    <!--    搜索框-->
    <!--    <u-search placeholder="输入想学的" class="px-20"-->
    <!--              v-model="lessonName"  @custom="searchClicked()"></u-search>-->
    <u-toast ref="uToast" />



    <view style="text-align:center; margin-top: 3%; padding-bottom: 3%;;
     font-size: 40rpx;">
      <text >消息</text>
    </view>
    <u-tabs  ref="tabs" active-color="#1CBBB4" :bold="false" font-size="28" :list="tabs"
             :current="currentIndex" @change="clickTabs" :is-scroll="false" swiperWidth="750">
    </u-tabs>

   <view class="bg-white" style="width: 750rpx;" v-if="currentIndex === i" v-for="(m, i) in tabs" :key="i">

    <view class="px-20 border-bottom" v-if="m.id === 0"
          style="margin-top: 10rpx;">

<!--      我的消息-->
      <view v-for="(item,index) in messageList" v-if="messageList.length !== 0 && item.senderId !== 1"
            class=" u-border-radius d-flex a-center"
            style="height: 200rpx; border-bottom: 3rpx solid #bdbdbd;">
        <view>
          <u-badge :isDot="true" type="error" v-if="item.isRead === 1"></u-badge>
          <image class="u-border-radius flex-shrink " @click="cardClicked(item,index)"
               :src="item.senderAvatar" style="width: 100rpx;height: 100rpx; margin-left: 20rpx; margin-right: 40rpx;"></image>

        </view>
        <view class="d-flex flex-column j-sb " style="padding-right: 10rpx;height: 80%">
          <view style="margin-top: 10rpx; position: relative" @click="cardClicked(item,index)">

            <view class="u-line-1" style="font-size: 32rpx; margin-bottom: 5rpx;">
<!--              <text style="margin-right: 5%;" >[新]</text>-->
<!--              <u-icon name="info-circle-fill"></u-icon>-->
              {{item.title}}
            </view>
            <view class="u-line-1 " >{{item.senderNickName}}</view>
          </view>
          <view class="d-flex  align-center uni-row margin-top-xs">
              <text class="gray-color" style="margin-bottom: 10rpx;font-size: 26rpx" >{{item.sendTime}}</text>
<!--            <view class="a-end">-->
<!--              <u-icon name="trash" style="position: absolute; right: 40rpx; margin-bottom: 20rpx;"-->
<!--                      @click = deleteFav(item)>-->
<!--              </u-icon>-->
<!--            </view>-->
          </view>
        </view>
      </view>
   </view>

      <view class="px-20 border-bottom" v-if="m.id === 1"
            style="margin-top: 10rpx;">
        <!--      系统消息-->
        <view v-for="(item,index) in messageList" v-if="messageList.length !== 0 && item.senderId === 1"
              class=" u-border-radius d-flex a-center"
              style="height: 200rpx; border-bottom: 3rpx solid #bdbdbd;">
          <view>
            <u-badge :isDot="true" type="error" v-if="item.isRead === 1"></u-badge>
            <image class="u-border-radius flex-shrink " @click="cardClicked(item,index)"
                   :src="item.senderAvatar" style="width: 100rpx;height: 100rpx; margin-left: 20rpx; margin-right: 40rpx;"></image>

          </view>
          <view class="d-flex flex-column j-sb " style="padding-right: 10rpx;height: 80%">
            <view style="margin-top: 10rpx; position: relative" @click="cardClicked(item,index)">

              <view class="u-line-1" style="font-size: 32rpx; margin-bottom: 5rpx;">
                <!--              <text style="margin-right: 5%;" >[新]</text>-->
                <!--              <u-icon name="info-circle-fill"></u-icon>-->
                {{item.title}}
              </view>
              <view class="u-line-1 " >{{item.senderNickName}}</view>
            </view>
            <view class="d-flex  align-center uni-row margin-top-xs">
              <text class="gray-color" style="margin-bottom: 10rpx;font-size: 26rpx" >{{item.sendTime}}</text>
              <!--            <view class="a-end">-->
              <!--              <u-icon name="trash" style="position: absolute; right: 40rpx; margin-bottom: 20rpx;"-->
              <!--                      @click = deleteFav(item)>-->
              <!--              </u-icon>-->
              <!--            </view>-->
            </view>
          </view>
        </view>
      </view>


      </view>
    <view v-if="messageList.length  === 0" style="text-align:center">
      <view >
        <image style="width: 200px; height: 200px; margin-top: 15%;"
               :src="noResult()" ></image>
      </view>
      <text style="color: #8f8f8f;  margin-top:7%; font-size: 40rpx;">暂无消息</text>
    </view>

    <view>
      <!-- 提示窗示例 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog type="error" cancelText="取消" confirmText="删除"
                          title="警告" content="确认取消收藏吗？"
                          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
    <tab-bar :msg="msg"></tab-bar>
  </view>
</template>

<script>
import global from "@/common/common";
import HLessonsListRow from "@/components/h-lessons-list-row/h-lessons-list-row";
import TabBar from "@/pages/commomComponent/tabBar";

export default {
  name: "myFavourite",
  components: {TabBar, HLessonsListRow},
  data() {
    return {
      msg:1,
      lessonName:"node",
      temp:{
        deleteFavId:-1,
        courseId: -1
      },
      messageList:[
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
      tabs: [{
        id: 0,
        name: '我的消息'
      }, {
        id: 1,
        name: '系统通知'
      }],
      currentIndex: 0,
    }
  },

  created() {
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const value = uni.getStorageSync('userLocalData');
      if(value){
        // console.log(value)
        this.userDt = JSON.parse(value)
      }
    }catch(e){}
    this.getLists()
  },
  onLoad (e) { //option为object类型，会序列化上个页面传递的参数
    var that = this
    console.log(e)
    this.lessonName = e.lessonName
    uni.$on('messageUpdate',function(data){
      console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
      that.messageList = []
      that.getLists()
      that.$u.toast("删除成功")
    })
  },
  methods: {

    clickTabs(item){
      console.log(item)
      console.log(this.detail)
      let index = item.index
      this.currentIndex = item.index
      if (index === 2) {
      } else {
        if(index === 1){
        }
      }
    },

    cardClicked(item,index){
      this.messageList[index].isRead = 0
      // this.$set(this.messageList,index,0)

      uni.navigateTo({
        url:'/pages/message/messageDetail/readMessage'+"?messageId="+item.messageId
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
      let uploadData = {}
      uploadData.userId = that.userDt.id
      uploadData.favouriteId = that.temp.deleteFavId
      uploadData.courseId = that.temp.courseId
      uploadData.action = "delete"
      let header = {token:that.userDt.token}
      console.log("upload:")
      console.log(uploadData)
      uni.request({
        method:'POST',
        url: global.commonLocalServer + "/fav/addFavourite",
        data:uploadData,
        header:header,
        success: function (res){
          console.log("res:")
          console.log(res)
          that.messageList = []
          that.getLists()
        }
      })
    },

    getLists(){
      var that = this
      uni.request({
        method:'GET',
        url: global.commonLocalServer+ '/message/getMyMessage/' + that.userDt.id,
        header : {'token': that.userDt.token},
        success: function (res) {
          // if (res.data.data !== null)
          // that.messageList = res.data.data
          that.messageList = that.addQiniuUrl(res.data.data)

          console.log(that.messageList)

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
          listInput[i].senderAvatar = global.storageUrl + listInput[i].senderAvatar
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