<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <view>
      <view class="flex align-center py-2">
        <text class="font-md font-weight-bold">{{lessonId}}</text>
      </view>
    </view>
    <view class="uni-pages">
      <!-- #ifdef H5 -->
      <u-navbar title="课程详情" :isFixed="false"></u-navbar>
      <!-- #endif -->
      <view class="img">
        <video id="myVideo" @play="onPlay" @pause="onPause" @timeupdate="recordCurrentTime" autoplay
               page-gesture enable-progress-gesture enable-play-gesture :initial-time="initialTime" v-if="videoOn"
               :src="videoUrl" controls :show-center-play-btn="true" style="width: 750rpx;height: 450rpx;"></video>
        <image :src="imgs" style="width: 100%;height: 500rpx"   v-if="!videoOn"/>
      </view>
      <u-tabs v-if="detail" ref="tabs" active-color="#1CBBB4" :bold="false" font-size="28" :list="tabs"
              :current="currentIndex" @change="clickTabs" :is-scroll="false" swiperWidth="750">
      </u-tabs>

      <!--    <scroll-view v-if="detail" scroll-y="auto" style="width: 750rpx;"-->
      <!--                 :style="{height: listHeight + 'px'}">-->
      <view class="bg-white" style="width: 750rpx;" v-if="currentIndex === i" v-for="(m, i) in tabs" :key="i">
        <!--介绍-->
        <view v-if="m.id === 0">
          <view class="padding-lr padding-tb-sm" style="height: 230rpx">
            <view class="margin-top-xs">
              <!--              <text style="font-size:32rpx; margin-bottom: 40rpx; font-size: 40rpx;">{{detail.courseName}}</text>-->
              <u--text style="margin-bottom: 10rpx;" :text="detail.courseName" size="20" lineHeight="30">
              </u--text>

            </view>

            <view class="uni-row">
              <view style="width:345rpx;height:80rpx;">

                <view class="uni-row align-center"
                      style="height: 80rpx; width: 400rpx; padding-top: 15%;">
                  <image :src="getTeacherAvatar()"
                         style="height: 80rpx; width: 80rpx; border-radius: 100rpx; margin-right: 20rpx;" />
                  <view style="width:308rpx;">
                    <text class="text-lg"
                          style="color:#70788C;height:40rpx">{{detail.teacherName}}</text>
                    <text class="margin-left-xs text-sm text-gray">{{detail.createTime}}</text>
                  </view>
                </view>
              </view>
              <view class="flex-sub align-end">
                <!--                    <my-rate :score="comt.id"></my-rate>-->
                <view class="uni-row align-center margin-top-xs">
                  <text class="text-sm"
                        style="color:#A4A9B2;font-size: 40rpx;">{{detail.favNum}}</text>
                  <u-icon
                      @click="addFavourite()"
                      :name="detail.isFavourite === false ? 'star' : 'star-fill'" color="#F8D100FF" size="28">
                  </u-icon>
                  <text class="text-sm" style="color:#A4A9B2;font-size: 40rpx;"> | </text>
                  <u-icon @click="chatClicked()" name="chat" size="28">
                  </u-icon>
                  <text class="text-sm" style="color:#A4A9B2;font-size: 40rpx;"> | </text>
                  <u-icon @click="homeworkClicked()" name="order" size="28">

                  </u-icon>
                </view>

                <view class="uni-row align-center margin-top-xs">
                  <text class="text-sm"
                        style="color:#A4A9B2;font-size: 40rpx;">{{detail.likeNum}}</text>
                  <u-icon @click="addLike()"
                          :name="detail.isLike === false ? 'thumb-up' : 'thumb-up-fill'"
                          :color="detail.isLike === false ?'#000000':'#5af'" size="28">
                  </u-icon>
                  <text class="text-sm" style="color:#A4A9B2;font-size: 40rpx;"> | </text>
                  <u-icon @click="addDislike()"
                          :name="detail.isDislike === false ? 'thumb-down' : 'thumb-down-fill'"
                          :color="detail.isDislike === false ?'#000000':'#5af'" size="28">
                  </u-icon>
                  <text class="text-sm" style="color:#A4A9B2;font-size: 40rpx;"> | </text>
                  <u-icon @click="addSubscribe()"
                          :name="detail.isSubscribe === false ? 'bell' : 'bell-fill'"
                          :color="detail.isSubscribe === false ?'#000000':'#f8a900'" size="28">
                  </u-icon>
                </view>
              </view>
            </view>

          </view>
          <u-gap bg-color="#f1f1f1" height="20"></u-gap>
          <view class="margin-top-sm padding-lr bg-white padding-tb-sm">
            <view style="display:flex;">
              <text class="text-xl" style="margin-bottom: 20rpx;">课程介绍</text>
            </view>
            <u--text class="text-lg" :text="detail.introduction" lineHeight="30" size="17"></u--text>
          </view>
        </view>

<!--目录-->
        <view style="background-color: #f1f1f1;width: 750rpx;" v-if="m.id === 1">
          <u-button @click="changeToCurrent"> 从之前断点开始 </u-button>
          <view v-for="(n,j) in detail.chapter" :key="j">
            <text class="padding-left text-df" style="height:90rpx;line-height:90rpx;">{{n.TITLE}}</text>
            <view class="bg-white">
              <view v-for="(c,k) in n.child" :key="k">
                <view @click="onSectionClick(c)"
                      class="uni-row margin-left u-border-bottom align-center" style="height:100rpx;">
                  <text class="flex-sub margin-left-xs margin-right text-df">{{c.TITLE}}</text>
                  <text v-if="c.ID === detail.currentLesson" class="iconfont text-df text-green"
                        style="height:90rpx;line-height:90rpx;width:80rpx;">当前</text>
                </view>
              </view>
            </view>
          </view>
        </view>

<!--评价-->
        <view v-if="m.id === 2">
<!--          如果没有评论-->
          <view class="image-content" style="align-items: center; " v-if="commentList.length === 0">
            <image style="width: 300px; height: 200px; margin-top: 15%;" :src="noComment()"
                   @error="imageError"></image>
            <text style="color: #8f8f8f;  margin-top:5%; font-size: 40rpx;"
                  @click="test3ee()">添加第一条评论吧~</text>
          </view>

          <view class="padding-top-sm padding-lr-sm" style="margin-bottom: 150rpx;">

            <view class="margin-top-sm">
              <view v-if="commentList.length > 0" v-for="(comt,l) in commentList" :key="l"
                    class="margin-tb">
                <view class="uni-row align-center" style="height: 80rpx;">
                  <image @click="replyComment(comt)" :src="getSrc(comt.avatar)"
                         style="width: 64rpx;height: 64rpx; border-radius: 100rpx;" />
                  <view class="margin-left uni-row align-center" @click="replyComment(comt)"
                        style="width:308rpx;">
                    <text class="text-lg" @click="replyComment(comt)"
                          style="color:#70788C;height:40rpx">{{comt.userName}}</text>
                    <text class="margin-left-xs text-sm text-gray">{{comt.createTime}}</text>
                  </view>

<!--                  点赞-->
                  <view class="flex-sub align-end">
                    <view class="uni-row align-center margin-top-xs">
                      <text class="margin-right-xs text-sm"
                            style="color:#A4A9B2;">{{comt.voteNumber === null ? 0 : comt.voteNumber}}</text>
                      <u-icon @click="voteComment(comt.id,l,comt.voted,comt)"
                              :name="comt.voted === false ? 'heart' : 'heart-fill'" color="#dd6161">
                      </u-icon>
                    </view>
                  </view>
                </view>


                <view style="margin-top: 10rpx;margin-left: 94rpx;">
<!--                  父评论-->
                  <view>
                    <view class="flex-sub">
                      <view class="uni-row align-center margin-top-xs">
                        <text class="text-lg"
                              @click="replyComment(comt)">{{comt.content}}</text>
                        <u-icon name="trash" style="position: absolute; right: 20rpx;"
                                v-if="comt.userId === userDt.id" @click=deleteComment(comt)>
                        </u-icon>
                      </view>
                    </view>
                  </view>
<!--                  子评论-->
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
                      <!--                      <rich-text :nodes="r.content" class="text-df"></rich-text>-->
                      <view class="uni-row align-center margin-top-xs ">
                        <text class="text-df">{{r.content}}</text>
                        <u-icon name="trash" style="position: absolute; right: 40rpx;"
                                v-if="comt.userId === userDt.id" @click=deleteComment(r)>
                        </u-icon>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <text style="text-align:center; margin-top: 40rpx;"
                  v-if="commentList.length > 0">没有更多评论了~</text>
          </view>

          <view v-if="detail && currentIndex === 2 "
                class="tabbar padding-lr-sm padding-tb-xs justify-center " style="flex-direction: column;height: 100rpx; position: fixed;bottom: 0rpx; width: 100%;
          background-color: rgb(28, 187, 180);
          ">
            <!--      <view class="uni-row align-center">-->
            <!--        <text class="text-sm text-white">课程评分：</text>-->
            <!--        <view>-->
            <!--          <u-rate :count="5" v-model="score" active-color="#FAC923" inactive-color="#ffffff"></u-rate>-->
            <!--        </view>-->
            <!--      </view>-->
            <view class="margin-top-xs">
              <u-search v-model="commentInfo.content" search-icon="edit-pen-fill"
                        search-icon-color="#909399" :placeholder="commentInfo.placeholder" height="30"
                        :show-action="true" action-text="提交" :focus="commentFocus" @blur="commentInputBlur"
                        :action-style="{color: '#ffffff'} " @custom="addComment()"
                        style="padding-bottom: 8rpx;"> </u-search>
            </view>
          </view>

         </view>

      </view>


      <view>
        <!-- 提示窗示例 -->
        <uni-popup ref="alertDialog" type="dialog">
          <uni-popup-dialog type="error" cancelText="取消" confirmText="删除" title="警告" content="确认删除该评论吗？"
                            @confirm="dialogConfirm"></uni-popup-dialog>
        </uni-popup>
      </view>

    </view>
  </view>
</template>

<script>
  import Vue from 'vue';
  import myRate from '@/components/my-ui/my-rate/my-rate';
  import global from "@/common/common";
  import {awint} from "@/components/jo-markdown/parse/parse2/entities/maps/entities";

export default {
  components: {
    myRate
  },
  name: "LessonInfo",
  data() {
    return {
      initialTime: 0,
      doIt: false,
      currentSectionId: -1,
      userServerStorageId: -1,
      commentFocus: false,
      videoOn: false,
      videoUrl: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
      imgOn: true,
      lessonId: 0,
      lessonName: "",
      userDt: {},
      currentTime: 0,
      background: {
        backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
      },
      id: 0,
      chapter_id: 0,
      timer: null,
      imgs:"",
      score: 5,
      commentInfo: {
        placeholder: '请点评一下吧',
        parentId: -1,
        content: '',
      },
      temp: {
        deleteCourseId: -1,
        currentLessonId: -1,
      },
      currentIndex: 0,
      shopCount: 0,
      tabList: [],
      detail: {
        currentLesson: -1,
        favouriteId: -2,
        teacherId: -1,
        favNum: 0,
        imgUrl: 'http://ra2q5rhzl.hd-bkt.clouddn.com/1647790222000cut.JPG',
        teacherAvatar: '', // ←一定要有，不然会请求undefined
        chapter: [{
          title: "tttt",
          child: [{
            id: "2222",
            title: "child1"
          }, ]
        },
          {
            title: "2222243d"
          },
          {
            title: "3434343"
          }
        ]
      },
      comment_info: {
        list: [{
          percentage: 1
        }]
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
        name: '互动'
      }],
      loadStatus: 'loading',
      commentList: [{
        createTime: "",
        votes: 0,
        id: -1,
        avatar: "default%20avatar.png",
        userName: "",
        userId: -1,
        content: "22",
        voteNumber: -1,
        voted: false,
        child: [{
          createTime: "a",
          votes: 0,
          id: 2,
          avatar: "default%20avatar.png",
          userName: "test032003",
          userId: -1,
          content: "sss"
        }, ]
      }, ],
      page: 1
    }
  },

  // #ifndef  MP-WEIXIN
  onBackPress() {
    console.log('back')
    uni.setStorageSync('currentLocalId', this.lessonId)
    this.setLocalUserData()
  },
  // #endif

  // #ifdef  MP-WEIXIN
  onUnload(){
    console.log('wxBack')
    uni.setStorageSync('currentLocalId', this.lessonId)
    this.setLocalUserData()
  },
  // #endif

  created() {
    this.currentIndex = 0
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    //获取token

    try {
      const value = uni.getStorageSync('userLocalData');
      if (value) {
        this.userDt = JSON.parse(value)
        console.log('用户本地信息获取成功')
      }

      //删除本地userCourseCurrentTime
      this.refreshUserData()

      //从后端获取
      this.getLocalUserData()
    } catch (e) {}
    // #ifdef  H5
    this.getAllData();
    // #endif
    if (this.currentIndex === 2) {
      this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
    } else {
      this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100);
    }
  },

  watch: {
    doIt(newVal, oldVal) {
      console.log('doIt!')
      if (newVal) {
        this.test3ee()
        // this.doIt = false
      }
    }
  },

  onLoad(e) { //option为object类型，会序列化上个页面传递的参数
    console.log(e)
    var that = this
    // uni.$on('sendMessageSuccess',function(data){
    //   // that.$u.toast("发送成功")
    //   that.test3ee(that)
    //   this.$u.toast(
    //       "添加成功!"
    //   )
    // })

    uni.$on('videoAutoStart', function(data) {
      console.log('caught1')
      that.doIt = true
      // that.currentIndex = 1
    })



    console.log('onload++++++++++++++++++++++++++')
    console.log(e.LessonId)
    this.lessonId = e.LessonId
    // this.LessonName = e.LessonName

	console.log('hahaha');

	
	// #ifndef H5
	console.log('ndef H5');
	const value = uni.getStorageSync('userLocalData');
	if (value) {
	  this.userDt = JSON.parse(value)
	  console.log('非H5用户本地信息获取成功V2')
	}
	console.log();
    this.getAllData(this.userDt.token);
  // #endif
	
	// #ifdef H5
	console.log('def H5');
	// #endif
    const {
      windowHeight,
      windowWidth
    } = uni.getSystemInfoSync();
    this.pageHeight = windowHeight / windowWidth * 750;
  },

  methods: {
    homeworkClicked() {
      uni.navigateTo({
        url: '/pages/teacher/homework/allHomework' + "?courseId=" + this.lessonId
      })
    },
    test3ee(that) {
      console.log(999)
      this.$u.toast(
          "添加成功!"
      )
    },

    changeToCurrent() {
      // const currentPoint = uni.getStorageSync('userCourseCurrentTime')
      // var map=JSON.parse(currentPoint);
      if (this.currentSectionId === -1) {
        console.log("没有找到之前存的断点！")
        this.$u.toast("没有找到历史记录!")
        return null
      } else {
        let URL = this.findVideoBySectionId(this.currentSectionId)
        console.log(URL)
        this.videoUrl = global.storageUrl + URL
        console.log(this.videoUrl)
        this.initialTime = this.currentTime
        this.imgOn = false
        this.videoOn = true
      }
    },

    getLocalUserData() {
      var that = this
      console.log('getLocalUserData============')
      //获取后端数据，若没有则创建
      uni.request({
        url: global.commonLocalServer + "/userData/getUserData/" + that.userDt.id,
        method: 'GET',
        header: {
          token: that.userDt.token
        },
        success: function(res) {
          console.log(res)
          //如果后端有数据
          if (res.data.flag === 'T') {
            try {
              //存在本地中
              uni.setStorageSync('userCourseCurrentTime', res.data.data.userData);
              that.userServerStorageId = res.data.data.id
              console.log("存后端localData成功")
            } catch (e) {
              console.log("error")
            }
          } else {
            console.log("userCourseCurrentTime不存在，开始创建")
            try {
              // uni.setStorageSync('userCourseCurrentTime',JSON.stringify({'userId':this.userDt.id}));
              uni.setStorageSync('userCourseCurrentTime', '');
              console.log("userCourseCurrentTime空创建成功")
            } catch (e) {
              console.log("error")
            }
          }

          //获取当前断点数据
          const currentPoint = uni.getStorageSync('userCourseCurrentTime')
          if (currentPoint !== '' && currentPoint !== null) {
            let currentSection = JSON.parse(currentPoint)[that.lessonId]
            console.log('当前课程断点数据：')
            console.log(currentSection)
            if (currentSection !== null && currentSection !== '' && currentSection !==
                undefined) {
              that.currentTime = currentSection.currentTime
              console.log('sectionId:' + currentSection.sectionId)
              that.currentSectionId = currentSection.sectionId
              that.temp.currentLessonId = currentSection.sectionId
            } else { //第一次看这门课的话
              that.currentTime = 0
              that.currentSectionId = -1
              console.log("没找到当前课程的历史记录")
            }
          } else { //第一次注册的话
            that.currentTime = 0
            that.currentSectionId = -1
            console.log("没找到用户的历史记录")
          }
        }
      })
    },

    //传给后端保存
    setLocalUserData() {
      var that = this
      var sendData = {}
      sendData.userId = that.userDt.id
      sendData.userData = uni.getStorageSync('userCourseCurrentTime')
      sendData.id = that.userServerStorageId
      sendData.latestCourseId = that.lessonId
      console.log('向后端存储cookie')
      console.log(sendData)
      uni.request({
        url: global.commonLocalServer + "/userData/addUserData",
        method: 'POST',
        header: {
          token: that.userDt.token
        },
        data: sendData,
        success: function(res) {
          console.log(res)
        }
      })
    },


    addCurrentInfo() {
      console.log('往detail中添加历史ID')
      this.detail.currentLesson = this.temp.currentLessonId
    },

    refreshUserData() {
      uni.removeStorage({
        key: 'userCourseCurrentTime',
        success() {
          console.log('删除成功')
        }
      })
    },
    //记录当前时间
    recordCurrentTime(e) {
      // console.log(e)
      // uni.removeStorage({
      //   key:'userCourseCurrentTime',
      //   success() {
      //     console.log('删除成功')
      //   }
      // })
      // try {
      const value = uni.getStorageSync('userCourseCurrentTime');
      if (value === null || value === '') {
        console.log("userCourseCurrentTime不存在，开始创建")
        try {
          uni.setStorageSync('userCourseCurrentTime', JSON.stringify({}));
          console.log("userCourseCurrentTime创建成功")
        } catch (e) {
          console.log("error")
        }
      }
      ////////////////以上基本不会用到////////////
      //存用户视频当前信息到本地
      //参数：{课程ID:{章节ID:X,当前时间:X}}
      const value1 = uni.getStorageSync('userCourseCurrentTime');

      var map = JSON.parse(value1);
      var key = this.lessonId.toString();
      console.log(map)
      // console.log(value)
      let userCourseCurrentTime = {
        "currentTime": e.detail.currentTime,
        "sectionId": this.currentSectionId
      }
      this.currentTime = e.detail.currentTime
      map[key] = userCourseCurrentTime
      console.log(map)
      try {
        uni.setStorageSync('userCourseCurrentTime', JSON.stringify(map));
      } catch (e) {
        console.log("error")
      }
      // const value2 = uni.getStorageSync('userCourseCurrentTime');
      // let ttk = 'courseId:4'
      // console.log(JSON.parse(value2)[ttk])
      // } catch (e){
      //   console.log(e)
      // }
    },

    chatClicked() {
      var that = this
      uni.navigateTo({
        url: '/pages/message/messageDetail/sendMessage' + '?teacherId=' + that.detail.teacherId +
            "&teacherName=" + that.detail.teacherName
      })
    },

    addFavourite() {
      var that = this
      let uploadData = {}
      uploadData.userId = that.userDt.id
      uploadData.courseId = that.lessonId
      uploadData.favouriteId = that.detail.favouriteId
      uploadData.action = that.detail.isFavourite === false ? "add" : "delete"
      let header = {
        token: that.userDt.token
      }
      console.log("upload:")
      console.log(uploadData)
      uni.request({
        method: 'POST',
        url: global.commonLocalServer + "/fav/addFavourite",
        data: uploadData,
        header: header,
        success: function(res) {
          console.log("res:")
          console.log(res)
          if (uploadData.action === "add") {
            that.detail.favouriteId = res.data.data
            that.detail.favNum++
            that.detail.isFavourite = true
            that.$u.toast("收藏成功！")
          } else {
            that.detail.favouriteId = -1
            that.detail.favNum--
            that.detail.isFavourite = false
            that.$u.toast("取消成功！")
          }
        }
      })
    },

    voteComment(id, l, voted, comt) {
      console.log(comt.voted)
      var that = this
      let uploadData = {}
      uploadData.userId = that.userDt.id
      uploadData.commentId = id
      uploadData.courseId = that.lessonId
      uploadData.voteId = comt.voteId
      uploadData.action = comt.voted === false ? "vote" : "delete"
      let header = {
        token: that.userDt.token
      }
      console.log("upload:")
      console.log(uploadData)
      uni.request({
        method: 'POST',
        url: global.commonLocalServer + "/vote/addVote",
        data: uploadData,
        header: header,
        success: function(res) {
          console.log("res:")
          console.log(res)
          if (uploadData.action === "vote") {
            that.commentList[l].voteId = res.data.data
            that.commentList[l].voteNumber++
            that.commentList[l].voted = true
          } else {
            that.commentList[l].voteId = -1
            that.commentList[l].voteNumber--
            that.commentList[l].voted = false
          }
        }
      })
    },

    replyComment(comt) {
      console.log(comt)
      this.commentInfo.placeholder = "回复@" + comt.userName
      this.commentInfo.parentId = comt.id
      console.log(this.commentInfo.parentId)
      this.commentFocus = true
    },
    commentInputBlur() {
      console.log('blur')
      setTimeout(this.resetCommentInfo, 100)
    },
    resetCommentInfo() {
      this.commentInfo.placeholder = '请点评一下吧'
      this.commentInfo.parentId = -1
      this.commentFocus = false
    },
    getComment() {
      var that = this
      uni.request({
        method: 'GET',
        url: global.commonLocalServer + "/comment/getComment/" + that.lessonId + "/" + that.userDt.id,
        header: {
          'token': that.userDt.token
        },
        success: function(res) {
          // for (let i = 0; i < res.data.data.length; i++){
          //   that.$set(that.commentList,i,res.data.data[i])
          // }
          console.log(res)
          that.commentList = res.data.data
        }
      })
    },
    addComment() {
      var that = this
      console.log(that.commentInfo)
      if (!global.isEmpty(that.commentInfo.content)) {
        let upCommentData = {}
        upCommentData.comment = that.commentInfo.content
        upCommentData.parentId = that.commentInfo.parentId
        upCommentData.creatorId = that.userDt.id
        upCommentData.courseId = that.lessonId
        console.log(upCommentData)
        uni.request({
          method: 'POST',
          url: global.commonLocalServer + "/comment/addComment",
          header: {
            'token': that.userDt.token
          },
          data: upCommentData,
          success: function(res) {
            console.log(res)
            if (res.data.flag === "T") {
              that.$u.toast(
                  "添加成功!"
              )
              that.commentInfo.placeholder = '请点评一下吧'
              that.commentInfo.parentId = -1
              that.commentInfo.content = ''
              that.commentList = []
              that.getComment()

            }
          }
        })
      } else {
        that.$u.toast("请输入评论！");
      }
    },

    getSrc(avatar) {
      return global.storageUrl + avatar
    },

    clickTabs(item) {
      console.log(item)
      console.log(this.detail)
      let index = item.index
      this.currentIndex = item.index
      if (index === 2) {
        this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
        this.getComment()
      } else {
        if (index === 1) {}
        this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100);
      }
    },

    onSectionClick(c) {
      console.log(c)
      this.detail.currentLesson = c.ID
      if (c.TYPE === "video") {
        this.imgOn = false
        this.videoOn = true
        console.log(c)
        console.log(this.currentIndex)
        this.currentSectionId = c.ID
        this.videoUrl = global.storageUrl + c.URL
      } else if (c.TYPE === "MD") {
        uni.navigateTo({
          url: '/pages/Lesson/LessonMarkDown' + "?fileUrl=" + c.URL
        })
      }
    },

    getAllData() {
      var that = this
      console.log('getAllData +++++++++++++')
      console.log(that.lessonId)
      uni.request({
        url: global.commonLocalServer + "/lesson/getCourseInfo/" + that.lessonId + "/" + that.userDt.id,
        method: "GET",
        header: {
          'token': that.userDt.token
        },
        success: function(res) {
          console.log(that.userDt.token)
          console.log('获取数据成功-------------------------------------------------------')
          console.log(res)
          // that.detail.imgUrl = global.storageUrl + res.data.data.imgUrl
          that.detail = res.data.data
          that.detail.imgUrl = global.storageUrl + res.data.data.imgUrl
          that.imgs = that.detail.imgUrl

          console.log(that.detail)
          that.tabs[2].name = '互动(' + that.detail.totalComment + ")"
          that.addCurrentInfo()
        }
      })
    },

    findVideoBySectionId(idInput) {
      let flag = 0 //找到了就为1
      let res = ""
      this.detail.chapter.forEach(i => {
        console.log(i)
        i.child.forEach(j => {
          if (j.ID === idInput) {
            console.log('当前的视频为' + j.URL)
            flag = 1
            res = j.URL
          }
        })
      })
      if (flag === 0) {
        console.log("没找到断点数据！")
        return this.detail.chapter.child[0].URL
      } else {
        return res
      }
    },


    addStudyLog() {
      // this.$http.post(this.$api.course.addStudyLog, {
      //   course_id: this.detail.id,
      //   chapter_id: this.chapter_id,
      //   study_time: 30
      // });
    },

    addLike() {
      var that = this
      if (that.detail.isLike === false) {
        uni.request({
          method: 'GET',
          header: {
            token: that.userDt.token
          },
          url: global.commonLocalServer + '/redis/addCourseLike/' + that.lessonId + '/' + that.userDt
              .id,
          success: function(res) {
            console.log(res)
            that.detail.isLike = true
            that.detail.isDislike = false
            that.detail.likeNum++
            that.$u.toast("点赞成功！")
          }
        })
      } else {
        uni.request({
          method: 'GET',
          header: {
            token: that.userDt.token
          },
          url: global.commonLocalServer + '/redis/cancelCourseLike/' + that.lessonId + '/' + that
              .userDt.id,
          success: function(res) {
            console.log(res)
            that.detail.isLike = false
            that.detail.likeNum--
            that.$u.toast("取消成功！")
          }
        })
      }
    },

    addDislike() {
      var that = this
      if (that.detail.isDislike === false) {
        uni.request({
          method: 'GET',
          header: {
            token: that.userDt.token
          },
          url: global.commonLocalServer + '/redis/addCourseDislike/' + that.lessonId + '/' + that
              .userDt.id,
          success: function(res) {
            console.log(res)
            that.detail.isLike = false
            that.detail.isDislike = true
            that.detail.likeNum = (that.detail.likeNum === 0 ? 0 : that.detail.likeNum - 1)
            that.$u.toast("点踩成功！")

          }
        })
      } else {
        uni.request({
          method: 'GET',
          header: {
            token: that.userDt.token
          },
          url: global.commonLocalServer + '/redis/cancelCourseDislike/' + that.lessonId + '/' + that
              .userDt.id,
          success: function(res) {
            console.log(res)
            that.detail.isDislike = false
            that.detail.likeNum = (that.detail.likeNum === 0 ? 0 : that.detail.likeNum + 1)
            that.$u.toast("取消成功！")

          }
        })
      }
    },

    addSubscribe() {
      var that = this
      if (that.detail.isSubscribe === false) {
        uni.request({
          method: 'GET',
          header: {
            token: that.userDt.token
          },
          url: global.commonLocalServer + '/redis/addCourseSubscribe/' + that.lessonId + '/' + that
              .userDt.id,
          success: function(res) {
            console.log(res)
            that.detail.isSubscribe = true
            that.$u.toast("订阅成功！")
          }
        })
      } else {
        uni.request({
          method: 'GET',
          header: {
            token: that.userDt.token
          },
          url: global.commonLocalServer + '/redis/cancelCourseSubscribe/' + that.lessonId + '/' +
              that.userDt.id,
          success: function(res) {
            console.log(res)
            that.detail.isSubscribe = false
            that.$u.toast("取消订阅成功！")

          }
        })
      }
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

    deleteComment(comt) {
      console.log(comt.id)
      this.temp.deleteCourseId = comt.id
      this.$refs.alertDialog.open()

    },

    dialogConfirm() {
      let that = this
      uni.request({
        method: 'GET',
        url: global.commonLocalServer + "/comment/deleteComment/" + that.temp.deleteCourseId,
        header: {
          "token": that.userDt.token
        },
        success: function(res) {
          console.log(res)
          if (res.data.flag === 'T') {
            that.$u.toast(
                "删除成功!"
            )
            that.commentList = []
            that.getComment()
            // that.currentIndex = 2

          }
        }
      })
    },

    onPlay() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.addStudyLog();
      }, 30000);
    },

    onPause() {
      console.log('paused')
      // clearInterval(this.timer);
    },

    noComment() {
      console.log(global.storageUrl + "noComment.png")
      return global.storageUrl + 'noComment.png'
    },

    getTeacherAvatar() {
      if (this.detail.teacherAvatar === '' || this.detail.teacherAvatar === null) {
        return global.storageUrl + 'defaultAvatar.png'
      } else {
        return global.storageUrl + this.detail.teacherAvatar
      }
      // return global.storageUrl + this.detail.teacherAvatar
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

body,
page {
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
