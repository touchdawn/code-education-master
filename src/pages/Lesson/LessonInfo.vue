<template>
<view>
  <view>
    <view class="flex align-center py-2">
      <text class="font-md font-weight-bold">{{lessonId}}</text>
    </view>
  </view>
  <view class="uni-pages">
    <u-toast ref="uToast"></u-toast>
    <u-navbar title="课程详情" :isFixed="false"></u-navbar>
    <view v-if="detail">
      <video id="myVideo" @play="onPlay" @pause="onPause" autoplay page-gesture
             enable-progress-gesture
             enable-play-gesture
             :initial-time="initialTime"
             v-if="videoOn"
             :src="videoUrl"
             controls :show-center-play-btn="true" style="width: 750rpx;height: 450rpx;"></video>
      <img :src="detail.imgUrl" style="width: 100%" v-if="imgOn"/>
    </view>
    <u-tabs v-if="detail" ref="tabs" active-color="#1CBBB4" :bold="false" font-size="28" :list="tabs"
                   :current="currentIndex" @change="clickTabs" :is-scroll="false" swiperWidth="750">
    </u-tabs>
    <scroll-view v-if="detail" scroll-y="auto" style="width: 750rpx;"
                 :style="{height: listHeight + 'px'}">
      <view class="bg-white" style="width: 750rpx;" v-if="currentIndex === i" v-for="(m, i) in tabs" :key="i">

<!--介绍-->
        <view v-if="m.id === 0">
          <view class="padding-lr padding-tb-sm">
            <view class="margin-top-xs">
              <text class="text-lg" style="font-size:32rpx;">{{LessonName}}</text>
              <view class="uni-row">
                <my-rate :score="4"></my-rate>
                <text class="text-df"
                      style="color:#70788C;margin-left:5rpx">5分</text>
                <text class="text-df margin-left-sm"
                      style="color:#70788C;">5人在学</text>
                <view  class="uni-row">
                  <text class="text-df" style="color:#70788C">适学人群</text>
                  <text class="text-df margin-left-sm">2222</text>
                </view>
              </view>
            </view>

            <view class="uni-row">
              <view style="width:345rpx;height:80rpx;">
                <view class="uni-row">
                  <text class="text-df" style="color:#70788C">有效期</text>
                  <text class="text-df margin-left-sm">1年</text>
                  <text class="text-df" style="color:#70788C;margin-left:20rpx;">|</text>
                  <text class="text-df margin-left-sm">1课时</text>
                </view>

                <view class="uni-row">
                  <text class="text-df" style="color:#70788C">老 师</text>
                  <text class="text-df margin-left-sm">teacher</text>
                </view>
              </view>
              <view v-if="true" class="uni-row justify-end align-end"
                    style="width:345rpx;height:80rpx;">
                <text class="text-lg"
                      style="margin-top:18rpx;color:#e13b29;margin-bottom:4rpx;">¥</text>
                <text class="margin-left-xs"
                      style="font-size:50rpx;color:#e13b29;">100</text>
              </view>
            </view>

          </view>
          <u-gap bg-color="#f1f1f1" height="20"></u-gap>
          <view class="margin-top-sm padding-lr bg-white padding-tb-sm">
            <view class="text-lg">课程介绍</view>
<!--            <u-parse class="margin-top-sm" :html="detail.content"></u-parse>-->
                <text>{{detail.introduction}}</text>
          </view>
        </view>

<!--目录-->
        <view style="background-color: #f1f1f1;width: 750rpx;" v-if="m.id === 1">
          <view v-for="(n,j) in detail.chapter" :key="j">
            <text class="padding-left text-df" style="height:90rpx;line-height:90rpx;">{{n.TITLE}}</text>
            <view class="bg-white">
              <view v-for="(c,k) in n.child" :key="k">
                <view @click="onSectionClick(c)"
                      class="uni-row margin-left u-border-bottom align-center" style="height:100rpx;">
<!--                  <image :src="chapterIcon(c)" style="width: 40rpx;height: 40rpx;"></image>-->
                  <text class="flex-sub margin-left-xs margin-right text-df"
                        :class="'text-gray'"
                        :style=" '#1CBBB4'">{{c.TITLE}}</text>
                  <text v-if="true" class="iconfont text-df text-green"
                        style="height:90rpx;line-height:90rpx;width:80rpx;">免费</text>
                </view>
              </view>
            </view>
          </view>
        </view>

<!--评价-->
        <view v-if="m.id === 2">
          <view class="padding-top-sm padding-lr-sm">
<!--            <view class="uni-row justify-between">-->
<!--              <text class="text-df">全部评价</text>-->
<!--              <text class="margin-left-sm text-df text-gray">共1个评价</text>-->
<!--            </view>-->
<!--            <view class="uni-row justify-between margin-top-sm">-->
<!--              <view class="uni-row">-->
<!--                <text-->
<!--                    style="font-size: 120rpx;height:120rpx;line-height: 120rpx;">2</text>-->
<!--                <text class="margin-left-xs"-->
<!--                      style="font-size: 40rpx;height:120rpx;line-height: 170rpx;">星</text>-->
<!--              </view>-->
<!--              <view class="uni-row flex-sub">-->
<!--                <view class="uni-row align-center" style="height:120rpx;">-->
<!--                  <image src="/static/image/p_star.png" style="height:104rpx;width:100rpx" />-->
<!--                </view>-->
<!--                <view class="margin-left-sm flex-sub" style="height:120rpx;"-->
<!--                      >-->
<!--                  <view v-if="comment_info.list.length > 0" v-for="(a,mi) in comment_info.list"-->
<!--                        :key="mi" style="height: 24rpx;">-->
<!--                    <u-line-progress inactive-color="#e6eaf2" active-color="#a4a9b2"-->
<!--                                     :show-percent="false" :percent="a.percentage" height="8" width="350"-->
<!--                                     style="height: 8rpx;">-->
<!--                    </u-line-progress>-->
<!--                  </view>-->
<!--                </view>-->
<!--              </view>-->
<!--            </view>-->

            <view class="margin-top-sm">
              <view v-if="commentList.length > 0" v-for="(comt,l) in commentList" :key="l"
                    class="margin-tb">
                <view class="uni-row align-center" style="height: 80rpx;">
                  <image
                      :src="getSrc(comt.avatar)"
                      style="width: 64rpx;height: 64rpx; border-radius: 100rpx;" />
                  <view class="margin-left uni-row align-center" style="width:308rpx;">
                    <text class="text-lg"
                          style="color:#70788C;height:40rpx">{{comt.userName}}</text>
                    <text class="margin-left-xs text-sm text-gray">{{comt.createTime}}</text>
                  </view>
                  <view class="flex-sub align-end">
<!--                    <my-rate :score="comt.id"></my-rate>-->
                    <view class="uni-row align-center margin-top-xs">
                      <text class="margin-right-xs text-sm"
                            style="color:#A4A9B2;">{{comt.votes == null ? 0 : comt.votes}}</text>
                      <u-icon
                          @click="agreeComment(comt.id,l,comt.is_agree,comt.agree_num == null ? 0 : comt.agree_num)"
                          :name="comt.is_agree === 0 ? 'heart' : 'heart-fill'" color="#dd6161">
                      </u-icon>
                    </view>
                  </view>
                </view>

                <view style="margin-top: 10rpx;margin-left: 94rpx;">
                  <text class="text-lg">{{comt.content}}</text>
                  <view v-if="comt.child.length > 0" class="margin-top-sm">
                    <view v-for="(r,ri) in comt.child" :key="ri"
                          class="radius padding-lr-sm padding-top-sm"
                          :class="[ri + 1 === comt.child.length ? 'padding-bottom' : '']"
                          style="background-color: #f3f4f7;">
                      <view class="uni-row align-center" style="height: 60rpx;">
                        <image :src="getSrc(r.avatar)"
                               style="width: 40rpx;height: 40rpx; border-radius: 100rpx;" />
                        <view class="uni-row margin-left-sm align-center" style="width:308rpx;">
                          <text style="color:#70788C;">{{r.userName }}</text>
                        </view>
                        <view class="flex-sub align-end">
                          <text class="margin-left-xs text-sm text-gray">{{r.createTime}}</text>
                        </view>
                      </view>
                      <rich-text :nodes="r.content" class="text-df"></rich-text>
                    </view>
                  </view>
                </view>

              </view>
            </view>
          </view>
          </view>

      </view>
    </scroll-view>


<!--    <view v-if="currentIndex === 1 " class="tabbar">-->
<!--      &lt;!&ndash; #ifdef H5 || APP-PLUS &ndash;&gt;-->
<!--      <view class="tab" @click="navToWebView('客服中心',zzConfig.yzf)">-->
<!--        <image src="/static/icon/kf.png" style="width: 40rpx;height: 40rpx;"></image>-->
<!--        <text class="title">客服</text>-->
<!--      </view>-->
<!--      &lt;!&ndash; #endif &ndash;&gt;-->
<!--      &lt;!&ndash; #ifdef MP &ndash;&gt;-->
<!--      <view class="tab">-->
<!--        <button open-type="contact" show-message-card="true" class="clearBtn" type="default">-->
<!--          <image src="/static/icon/kf.png" style="width: 40rpx;height: 40rpx;"></image>-->
<!--          <text class="title">客服</text>-->
<!--        </button>-->
<!--      </view>-->
<!--      &lt;!&ndash; #endif &ndash;&gt;-->

<!--      <view class="tab boderleft" @click="addCart('/pages/user/order/detail/detail')">-->
<!--        <image src="/static/icon/gwc.png" style="width: 40rpx;height: 40rpx;"></image>-->
<!--        <text class="title">购物车</text>-->
<!--        <text class="i-notice" v-if="shopCount > 0">{{shopCount > 99 ? 99 : shopCount}}</text>-->
<!--      </view>-->
<!--      <view class="cart" @click="addCart">-->
<!--        <text class="bar-bottom">加入购物车</text>-->
<!--      </view>-->
<!--      <view class="pay" @click="addCart('/pages/user/order/detail/detail')">-->
<!--        <text class="bar-bottom">{{detail.price > 0 ? '立即购买' : '免费好课'}}</text>-->
<!--      </view>-->
<!--    </view>-->

    <view v-if="detail && currentIndex === 2 "
          class="tabbar padding-lr-sm padding-tb-xs justify-center"
          style="flex-direction: column;height: 140rpx;background-color: rgb(28, 187, 180);">
<!--      <view class="uni-row align-center">-->
<!--        <text class="text-sm text-white">课程评分：</text>-->
<!--        <view>-->
<!--          <u-rate :count="5" v-model="score" active-color="#FAC923" inactive-color="#ffffff"></u-rate>-->
<!--        </view>-->
<!--      </view>-->
      <view class="margin-top-xs">
        <u-search v-model="content" search-icon="edit-pen-fill" search-icon-color="#909399" placeholder="请点评一下吧"
                  height="30" :show-action="true" action-text="提交" :action-style="{color: '#ffffff'}"
                  @custom="addComment"></u-search>
      </view>
    </view>
  </view>
</view>
</template>

<script>
  import Vue from 'vue';
  import myRate from '@/components/my-ui/my-rate/my-rate';
  import global from "@/common/common";

export default {
  components: {
    myRate
  },
  name: "LessonInfo",
  data(){
    return{
      initialTime:10,
      videoOn:false,
      videoUrl:'',
      imgOn:true,
      lessonId:0,
      lessonName:"",
      userDt:{},
      background: {
        backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
      },
      id: 0,
      chapter_id: 0,
      timer: null,
      score: 5,
      content:'',
      currentIndex: 0,
      shopCount: 0,
      tabList: [],
      detail: {
        chapter:[
          {
            title:"tttt",
            child:[
              {
                id: "2222",
                title:"child1"
              },
            ]
          },
          {title:"2222243d"},
          {title:"3434343"}
        ]
      },
      comment_info: {
        list:[
          {percentage:1}
        ]
      },
      listHeight: 0,
      tabs: [{
        id: 0,
        name: '介绍'
      }, {
        id: 1,
        name: '目录'
      }, {
        id: 2,
        name: '评价'
      }],
      loadStatus: 'loading',
      commentList: [
        // {
        //   headimgurl:null,
        //   nickname:"nickname",
        //   atime:"atime",
        //   score:2,
        //   id:4,
        //   replyList:[
        //     {
        //       title:"title",
        //       atime:"atime"
        //     }
        //   ]
        // },
        // {
        //   headimgurl:null,
        //   nickname:"nickname",
        //   atime:"atime",
        //   score:2,
        //   id:4,
        //   replyList:[
        //     {
        //       title:"title",
        //       atime:"atime"
        //     }
        //   ]
        // }
        {
          createTime: "",
          votes: 0,
          id: -1,
          avatar: "default%20avatar.png",
          userName: "",
          userId: -1,
          content: "22",
          child: [
            {
              createTime: "a",
              votes: 0,
              id: 2,
              avatar: "default%20avatar.png",
              userName: "test032003",
              userId: -1,
              content: "sss"
            },
          ]
        },
      ],
      page: 1
    }
  },
  created() {
    this.currentIndex = 0
    this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    console.log(this.userDt)
    this.getComment()
    this.getAllData();
    if (this.currentIndex === 2) {
      this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
    } else {
      this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100);
    }
  },
  onLoad (e) { //option为object类型，会序列化上个页面传递的参数
    console.log(e)
    this.lessonId = e.LessonId
    this.LessonName = e.LessonName
    const {
      windowHeight,
      windowWidth
    } = uni.getSystemInfoSync();
    this.pageHeight = windowHeight / windowWidth * 750;
    // console.log(e)
  },
  methods:{
    getComment(){
      var that = this
      uni.request({
        method:'GET',
        url:global.commonLocalServer+"/comment/getComment/" + that.lessonId,
        header:{'token':that.userDt.token},
        success:function(res){
          console.log(res)
          that.commentList = res.data.data
          // if(res.data.flag === "T"){
          //   that.$u.toast(
          //       "提交成功!"
          //   )
          // }
        }
      })
    },
    addComment(){
      var that = this
      console.log(this.content)
      if (!global.isEmpty(this.content)){
        let upCommentData={}
        upCommentData.comment = this.content
        upCommentData.creatorId = this.userDt.id
        upCommentData.courseId = that.lessonId
        upCommentData.parentId = -1
        console.log(upCommentData)
        uni.request({
          method:'POST',
          url:global.commonLocalServer+"/comment/addComment",
          header:{'token':that.userDt.token},
          data:upCommentData,
          success:function(res){
            console.log(res)
            if(res.data.flag === "T"){
              that.$u.toast(
                  "添加成功!"
              )
            }
          }
        })
      } else {
        that.$u.toast("请输入评论！");
      }
    },

    getSrc(avatar){
      console.log(global.storageUrl + avatar)
      return global.storageUrl + avatar
    },

    clickTabs(item){
      console.log(item)
      let index = item.index
      this.currentIndex = item.index
      if (index === 2) {
        this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
      } else {
        if(index === 1){
        }
        this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100);
      }
    },

    onSectionClick(c){
      console.log(c)
      if(c.TYPE === "video"){
        this.imgOn = false
        this.videoOn = true
        this.videoUrl = global.storageUrl + c.URL
      } else if (c.TYPE ==="MD") {
        console.log('mdmd')
        uni.navigateTo({
          url:'/pages/Lesson/LessonMarkDown'+"?fileUrl="+c.URL
        })
      }

    },

    getAllData(){
      var that = this
      uni.request({
        url:global.commonLocalServer+"/lesson/getCourseInfo/" + this.lessonId,
        method:"GET",
        header:{
          'token':that.userDt.token
        },
        success:function(res){
          that.detail = res.data.data
          console.log(that.detail)
          that.detail.imgUrl = global.storageUrl + that.detail.imgUrl
          console.log(that.detail)
        }
      })
    },

    addStudyLog() {
      // this.$http.post(this.$api.course.addStudyLog, {
      //   course_id: this.detail.id,
      //   chapter_id: this.chapter_id,
      //   study_time: 30
      // });
    },

    tabPageCurrentTabSelected(index) {
      const me = this;
      this.currentIndex = index;
      this.currentId = this.tabs[index].id;
      console.log(this.currentId)
      // if (this.detail.is_open === 1) {
        if (index === 2) {
          this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
        } else {
          this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100);
        }
      // }
    },

    onPlay() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.addStudyLog();
      }, 30000);
    },

    onPause() {
      clearInterval(this.timer);
    }
  }

}
</script>

<style scoped>
/*@import url("src/common/uni.scss");*/

.tabbar {
  flex-direction: row;
  height: 100rpx;
}

.tab {
  width: 120rpx;
  justify-content: center;
  align-items: center;
  position: relative;
}

.boderleft {
  border-left-style: solid;
  border-left-width: 1rpx;
  border-left-color: #e5e5e5;
}

.title {
  font-size: 18rpx;
  color: #999;
  margin-top: 5rpx;
}

.cart {
  flex: 1;
  background-color: #f85;
  align-items: center;
  justify-content: center;
}

.pay {
  flex: 1;
  background-color: #FF4563;
  align-items: center;
  justify-content: center
}

.collage {
  flex: 1;
  background-color: #FF6F85;
  align-items: center;
  justify-content: center
}

.bar-bottom {
  color: #fff;
  text-align: center;
  font-size: 28rpx;
}

.clearBtn {
  margin: 0;
  padding: 0;
  line-height: 28rpx;
  background-color: #FFFFFF;
}

.clearBtn::after {
  position: unset !important;
  border: unset;
}

.i-notice {
  position: absolute;
  top: 2rpx;
  right: 20rpx;
  height: 30rpx;
  width: 30rpx;
  border-radius: 100rpx;
  font-size: 18rpx;
  line-height: 30rpx;
  text-align: center;
  color: #fff;
  background-color: #f00;
}
.uni-flex {
  display: flex;
}

.uni-flex-item {
  flex: 1;
}

.uni-row {
  flex-direction: row;
}

.uni-c {
  align-items: center;
}

.uni-c-center {
  align-items: center;
  justify-content: center;
}

.uni-space-between {
  align-items: center;
  justify-content: space-between;
}

.uni-column {
  flex-direction: column;
}

.uni-pages {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 750upx;
  flex: 1;
  background-color: #FFFFFF;
}

body,page {
  min-height: 100%;
  display: flex;
}
/* #ifdef MP-BAIDU */
page {
  width: 100%;
  height: 100%;
  display: block;
}

swan-template {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */
/* 默认启动flex布局 */
view,
text,
scroll-view {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

</style>