<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <view>
    <view class="flex align-center py-2">
      <text class="font-md font-weight-bold">{{lessonId}}</text>
    </view>
  </view>
  <view class="uni-pages">
<!--    <button @click="test3ee">3ee</button>-->
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

<!--    <scroll-view v-if="detail" scroll-y="auto" style="width: 750rpx;"-->
<!--                 :style="{height: listHeight + 'px'}">-->
      <view class="bg-white" style="width: 750rpx;" v-if="currentIndex === i" v-for="(m, i) in tabs" :key="i">
<!--介绍-->
        <view v-if="m.id === 0">
          <view class="padding-lr padding-tb-sm" style="height: 230rpx">
            <view class="margin-top-xs">
<!--              <text style="font-size:32rpx; margin-bottom: 40rpx; font-size: 40rpx;">{{detail.courseName}}</text>-->
              <u--text  style="margin-bottom: 10rpx;" :text="detail.courseName" size="20" lineHeight="30"></u--text>

              <!--              <view class="uni-row">-->
<!--                <my-rate :score="4"></my-rate>-->
<!--                <text class="text-df"-->
<!--                      style="color:#70788C;margin-left:5rpx">5分</text>-->
<!--                <text class="text-df margin-left-sm"-->
<!--                      style="color:#70788C;">5人在学</text>-->
<!--                <view  class="uni-row">-->
<!--&lt;!&ndash;                  <text class="text-df" style="color:#70788C">适学人群</text>&ndash;&gt;-->
<!--&lt;!&ndash;                  <text class="text-df margin-left-sm">2222</text>&ndash;&gt;-->

<!--                </view>-->
<!--              </view>-->
            </view>

            <view class="uni-row">
              <view style="width:345rpx;height:80rpx;">
                <view class="uni-row">
<!--                  <text class="text-df" style="color:#70788C">有效期</text>-->
<!--                  <text class="text-df margin-left-sm">1年</text>-->
<!--                  <text class="text-df" style="color:#70788C;margin-left:20rpx;">|</text>-->
<!--                  <text class="text-df ">1课时</text>-->
                </view>

<!--                <view class="uni-row">-->
<!--                  <view class="text-df" style="color:#70788C; ">老 师</view>-->
<!--                  <view class="d-flex" style="flex-direction: row;">-->
<!--                    <image :src = "getTeacherAvatar()" style="width: 80rpx; height: 80rpx;"></image>-->
<!--                    <text class="text-df margin-left-sm" style="display:inline">{{detail.teacherName}}</text>-->
<!--                  </view>-->
<!--                </view>-->
                <view class="uni-row align-center" style="height: 80rpx; width: 400rpx">
                  <image
                         :src="getTeacherAvatar()"
                         style="height: 80rpx; width: 80rpx; border-radius: 100rpx; margin-right: 20rpx;" />
                  <view  style="width:308rpx;">
                    <text class="text-lg"
                          style="color:#70788C;height:40rpx">{{detail.teacherName}}</text>
                    <text class="margin-left-xs text-sm text-gray">{{detail.createTime}}</text>
                  </view>

                  <!--                  点赞-->
<!--                  <view class="flex-sub align-end">-->
<!--                    &lt;!&ndash;                    <my-rate :score="comt.id"></my-rate>&ndash;&gt;-->
<!--                    <view class="uni-row align-center margin-top-xs">-->
<!--                      <text class="margin-right-xs text-sm"-->
<!--                            style="color:#A4A9B2;">{{comt.voteNumber === null ? 0 : comt.voteNumber}}</text>-->
<!--                      <u-icon-->
<!--                          @click="voteComment(comt.id,l,comt.voted,comt)"-->
<!--                          :name="comt.voted === false ? 'heart' : 'heart-fill'" color="#dd6161">-->
<!--                      </u-icon>-->
<!--                    </view>-->
<!--                  </view>-->
                </view>
              </view>
<!--              <view v-if="true" class="uni-row justify-end align-end"-->
<!--                    style="width:345rpx;height:80rpx;">-->
<!--                <text class="text-lg"-->
<!--                      style="margin-top:18rpx;color:#e13b29;margin-bottom:4rpx;">¥</text>-->
<!--                <text class="margin-left-xs"-->
<!--                      style="font-size:50rpx;color:#e13b29;">100</text>-->
<!--              </view>-->
              <view class="flex-sub align-end" >
                <!--                    <my-rate :score="comt.id"></my-rate>-->
                <view class="uni-row align-center margin-top-xs">
                  <text class="text-sm"
                        style="color:#A4A9B2;font-size: 40rpx;">{{detail.favNum}}</text>
                  <u-icon
                      @click="addFavourite()"
                      :name="detail.isFavourite === false ? 'star' : 'star-fill'" color="#F8D100FF" size="28">
                  </u-icon>
                  <text class="text-sm"
                        style="color:#A4A9B2;font-size: 40rpx;"> | </text>
                  <u-icon
                      @click="chatClicked()"
                      name="chat"  size="28">
                  </u-icon>
                  <text class="text-sm"
                        style="color:#A4A9B2;font-size: 40rpx;"> | </text>
                  <u-icon
                      @click="homeworkClicked()"
                      name="order"  size="28">

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
<!--            <text class="text-lg">{{detail.introduction}}</text>-->
            <u--text class="text-lg" :text="detail.introduction" lineHeight="30" size="17"></u--text>
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
                        >{{c.TITLE}}</text>
                  <text v-if="true" class="iconfont text-df text-green"
                        style="height:90rpx;line-height:90rpx;width:80rpx;">免费</text>
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
            <text style="color: #8f8f8f;  margin-top:5%; font-size: 40rpx;">添加第一条评论吧~</text>
          </view>

          <view class="padding-top-sm padding-lr-sm" style="margin-bottom: 150rpx;">
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
                  <image @click="replyComment(comt)"
                      :src="getSrc(comt.avatar)"
                      style="width: 64rpx;height: 64rpx; border-radius: 100rpx;" />
                  <view class="margin-left uni-row align-center" @click="replyComment(comt)" style="width:308rpx;" >
                    <text class="text-lg" @click="replyComment(comt)"
                          style="color:#70788C;height:40rpx">{{comt.userName}}</text>
                    <text class="margin-left-xs text-sm text-gray">{{comt.createTime}}</text>
                  </view>

<!--                  点赞-->
                  <view class="flex-sub align-end">
<!--                    <my-rate :score="comt.id"></my-rate>-->
                    <view class="uni-row align-center margin-top-xs">
                      <text class="margin-right-xs text-sm"
                            style="color:#A4A9B2;">{{comt.voteNumber === null ? 0 : comt.voteNumber}}</text>
                      <u-icon
                          @click="voteComment(comt.id,l,comt.voted,comt)"
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
                        <text class="text-lg" @click="replyComment(comt)">{{comt.content}}</text>
                        <u-icon name="trash" style="position: absolute; right: 20rpx;"
                        v-if="comt.userId === userDt.id"  @click = deleteComment(comt)>
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
                          <text class="text-df" >{{r.content}}</text>
                          <u-icon name="trash" style="position: absolute; right: 40rpx;"
                                  v-if="comt.userId === userDt.id" @click = deleteComment(r)>
                          </u-icon>
                        </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <text style="text-align:center; margin-top: 40rpx;" v-if="commentList.length > 0">没有更多评论了~</text>
          </view>

          <view v-if="detail && currentIndex === 2 "
                class="tabbar padding-lr-sm padding-tb-xs justify-center "
                style="flex-direction: column;height: 100rpx; position: fixed;bottom: 0rpx; width: 100%;
          background-color: rgb(28, 187, 180);
          ">
            <!--      <view class="uni-row align-center">-->
            <!--        <text class="text-sm text-white">课程评分：</text>-->
            <!--        <view>-->
            <!--          <u-rate :count="5" v-model="score" active-color="#FAC923" inactive-color="#ffffff"></u-rate>-->
            <!--        </view>-->
            <!--      </view>-->
            <view class="margin-top-xs" >
              <u-search v-model="commentInfo.content" search-icon="edit-pen-fill" search-icon-color="#909399" :placeholder="commentInfo.placeholder"
                        height="30" :show-action="true" action-text="提交" :focus="commentFocus" @blur="commentInputBlur"
                        :action-style="{color: '#ffffff'} "
                        @custom="addComment()" style="padding-bottom: 8rpx;" > </u-search>
            </view>
          </view>


          </view>

      </view>
<!--    </scroll-view>-->


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


    <view>
      <!-- 提示窗示例 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog type="error" cancelText="取消" confirmText="删除"
                          title="警告" content="确认删除该评论吗？"
                          @confirm="dialogConfirm"
                          ></uni-popup-dialog>
      </uni-popup>
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
      commentFocus:false,
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
      commentInfo: {
        placeholder:'请点评一下吧',
        parentId:-1,
        content:'',
      },
      temp:{
        deleteCourseId:-1,
      },
      currentIndex: 0,
      shopCount: 0,
      tabList: [],
      detail: {
        favouriteId:-2,
        teacherId:-1,
        favNum:0,
        teacherAvatar:'', // ←一定要有，不然会请求undefined
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
        {
          createTime: "",
          votes: 0,
          id: -1,
          avatar: "default%20avatar.png",
          userName: "",
          userId: -1,
          content: "22",
          voteNumber:-1,
          voted:false,
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
    // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
    try{
      const value = uni.getStorageSync('userLocalData');
      if(value){
        // console.log(value)
        this.userDt = JSON.parse(value)
      }
    }catch(e){}
    console.log(this.userDt)
    // this.getComment()
    this.getAllData();
    if (this.currentIndex === 2) {
      this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
    } else {
      this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100);
    }
  },
  onLoad (e) { //option为object类型，会序列化上个页面传递的参数
    console.log(e)
    var that = this
    uni.$on('sendMessageSuccess',function(data){
      // that.$u.toast("发送成功")
      that.test3ee(that)
      this.$u.toast(
          "添加成功!"
      )
      // console.log(222)
    })
    this.lessonId = e.LessonId
    // this.LessonName = e.LessonName
    const {
      windowHeight,
      windowWidth
    } = uni.getSystemInfoSync();
    this.pageHeight = windowHeight / windowWidth * 750;
  },
  methods:{
    homeworkClicked(){
      uni.navigateTo({
        url:'/pages/teacher/homework/allHomework'+"?courseId="+this.lessonId
      })
    },
    test3ee(that){
      this.$u.toast(
          "添加成功!"
      )
    },

    chatClicked(){
      var that = this
      uni.navigateTo({
        url: '/pages/message/messageDetail/sendMessage' + '?teacherId=' + that.detail.teacherId + "&teacherName=" + that.detail.teacherName
      })
    },

    addFavourite(){
      // console.log(comt.voted)
      var that = this
      let uploadData = {}
      uploadData.userId = that.userDt.id
      uploadData.courseId = that.lessonId


      uploadData.favouriteId = that.detail.favouriteId
      uploadData.action = that.detail.isFavourite === false ?"add":"delete"


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
          if (uploadData.action === "add"){
            that.detail.favouriteId = res.data.data
            that.detail.favNum ++
            that.detail.isFavourite = true
          } else {
            that.detail.favouriteId = -1
            that.detail.favNum --
            that.detail.isFavourite = false
          }
        }
      })
    },

    voteComment(id,l,voted,comt){
      console.log(comt.voted)
      var that = this
      let uploadData = {}
      uploadData.userId = that.userDt.id
      uploadData.commentId = id
      uploadData.courseId = that.lessonId
      uploadData.voteId = comt.voteId
      uploadData.action = comt.voted === false ?"vote":"delete"
      let header = {token:that.userDt.token}
      console.log("upload:")
      console.log(uploadData)
      uni.request({
        method:'POST',
        url: global.commonLocalServer + "/vote/addVote",
        data:uploadData,
        header:header,
        success: function (res){
          console.log("res:")
          console.log(res)
          if (uploadData.action === "vote"){
            that.commentList[l].voteId = res.data.data
            that.commentList[l].voteNumber ++
            that.commentList[l].voted = true
          } else {
            that.commentList[l].voteId = -1
            that.commentList[l].voteNumber --
            that.commentList[l].voted = false
          }
        }
      })
    },

    replyComment(comt){
      console.log(comt)
      this.commentInfo.placeholder = "回复@"+comt.userName
      this.commentInfo.parentId = comt.id
      console.log(this.commentInfo.parentId)
      this.commentFocus = true
    },
    commentInputBlur(){
      console.log('blur')
      setTimeout( this.resetCommentInfo,100 )
    },
    resetCommentInfo(){
      this.commentInfo.placeholder ='请点评一下吧'
      this.commentInfo.parentId = -1
      this.commentFocus = false
    },
    getComment(){
      var that = this
      uni.request({
        method:'GET',
        url:global.commonLocalServer+"/comment/getComment/" + that.lessonId + "/" + that.userDt.id,
        header:{'token':that.userDt.token},
        success:function(res){
          // for (let i = 0; i < res.data.data.length; i++){
          //   that.$set(that.commentList,i,res.data.data[i])
          // }
          console.log(res)
          that.commentList = res.data.data
        }
      })
    },
    addComment(){
      var that = this
      console.log(that.commentInfo)
      if (!global.isEmpty(that.commentInfo.content)){
        let upCommentData={}
        upCommentData.comment = that.commentInfo.content
        upCommentData.parentId = that.commentInfo.parentId
        upCommentData.creatorId = that.userDt.id
        upCommentData.courseId = that.lessonId
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

    getSrc(avatar){
      return global.storageUrl + avatar
    },

    clickTabs(item){
      console.log(item)
      let index = item.index
      this.currentIndex = item.index
      if (index === 2) {
        this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
        this.getComment()
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
        url:global.commonLocalServer+"/lesson/getCourseInfo/" + that.lessonId + "/" + that.userDt.id,
        method:"GET",
        header:{
          'token':that.userDt.token
        },
        success:function(res){
          that.detail = res.data.data
          // console.log(that.detail)
          that.detail.imgUrl = global.storageUrl + that.detail.imgUrl
          that.tabs[2].name = '评价(' + that.detail.totalComment + ")"
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

    deleteComment(comt){
      console.log(comt.id)
      this.temp.deleteCourseId = comt.id
      this.$refs.alertDialog.open()

    },

    dialogConfirm(){
      let that = this
      uni.request({
        method:'GET',
        url:global.commonLocalServer + "/comment/deleteComment/" + that.temp.deleteCourseId,
        header:{"token":that.userDt.token},
        success:function(res){
          console.log(res)
          if (res.data.flag === 'T'){
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
      clearInterval(this.timer);
    },

    noComment(){
      console.log(global.storageUrl + "noComment.png")
      return global.storageUrl + 'noComment.png'
    },

    getTeacherAvatar(){
      return global.storageUrl + this.detail.teacherAvatar
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