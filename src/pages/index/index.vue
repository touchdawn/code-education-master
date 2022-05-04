<template>
  <view>
<!-- #ifdef MP-WEIXIN -->
  <view style="margin-top: 9%;"></view>
<!-- #endif -->
<!--轮播图组件-->
    <view class="u-demo-block " >
      <u-swiper
          :list="lessonImgList"
          previousMargin="30"
          nextMargin="30"
          circular
          :autoplay="true"
          radius="5"
          bgColor="#ffffff"
          style = "margin-top: 50rpx"
          @click="swiperClicked"
          height="400rpx"
      ></u-swiper>
    </view>
<!--    通知组件-->
    <view style="margin-top: 10rpx; margin-bottom: 10rpx;">
      <u-notice-bar :text="text1" @click="goToRecent()"></u-notice-bar>
    </view>
<!--    <div class="shadow" style="position: fixed; z-index: 20; right: 0; background-color: #eeeeee;-->
<!--        display: flex; justify-content: center; align-items: center;-->
<!--        padding-left: 20px; border-radius: 15px 0 0 15px; height: 40px; top: 650rpx">-->
<!--      <svg t="1651676924139" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1371" width="30" height="30"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" p-id="1372" fill="#1BBF80"></path><path d="M708.266667 465.066667l-234.666667-134.4c-8.533333-4.266667-17.066667-6.4-25.6-6.4-29.866667 0-53.333333 23.466667-53.333333 53.333333v268.8c0 8.533333 2.133333 19.2 6.4 25.6 10.666667 17.066667 27.733333 27.733333 46.933333 27.733333 8.533333 0 17.066667-2.133333 25.6-6.4l234.666667-134.4c8.533333-4.266667 14.933333-10.666667 19.2-19.2 6.4-12.8 8.533333-27.733333 4.266666-40.533333-2.133333-14.933333-10.666667-25.6-23.466666-34.133333z m-249.6 162.133333V396.8L661.333333 512l-202.666666 115.2z" p-id="1373" fill="#1BBF80"></path></svg>-->
<!--    </div>-->

    <div class="shadow"  @click="goToRecent()" style="position: fixed; z-index: 20; right: 15rpx; background-color: #eeeeee;
        display: flex; justify-content: center; align-items: center;
         border-radius: 30rpx 30rpx 30rpx 30rpx; height: 60rpx;width: 60rpx; top: 630rpx; ">
      <svg t="1651676924139" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1371" width="30" height="30"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" p-id="1372" fill="#1BBF80"></path><path d="M708.266667 465.066667l-234.666667-134.4c-8.533333-4.266667-17.066667-6.4-25.6-6.4-29.866667 0-53.333333 23.466667-53.333333 53.333333v268.8c0 8.533333 2.133333 19.2 6.4 25.6 10.666667 17.066667 27.733333 27.733333 46.933333 27.733333 8.533333 0 17.066667-2.133333 25.6-6.4l234.666667-134.4c8.533333-4.266667 14.933333-10.666667 19.2-19.2 6.4-12.8 8.533333-27.733333 4.266666-40.533333-2.133333-14.933333-10.666667-25.6-23.466666-34.133333z m-249.6 162.133333V396.8L661.333333 512l-202.666666 115.2z" p-id="1373" fill="#1BBF80"></path></svg>
    </div>
<!--    <view>{{admin.data.name}}</view>-->

<!--    宫格布局组件-->
<!--    <view>-->
<!--      <u-grid-->
<!--          :border="false"-->
<!--          col="5"-->
<!--      >-->
<!--        <u-grid-item-->
<!--            v-for="(listItem,listIndex) in gridList"-->
<!--            :key="listIndex"-->
<!--        >-->
<!--          <u-icon-->
<!--              :customStyle="{paddingTop:20+'rpx'}"-->
<!--              :name="listItem.name"-->
<!--              :size="22"-->
<!--          ></u-icon>-->
<!--          <text class="grid-text">{{listItem.title}}</text>-->
<!--        </u-grid-item>-->
<!--      </u-grid>-->
<!--      <u-toast ref="uToast" />-->
<!--    </view>-->

<!--    搜索框-->
    <u-search placeholder="输入想学的" class="px-20"
              v-model="keyword" @custom="searchClicked()"></u-search>

<!--推荐分类-->
    <h-rec-cate></h-rec-cate>

    <view class="px-20 d-flex j-sb flex-wrap" style="margin-top: 40rpx;">
      <!--    <text>{{ restLessonList2 }}787</text>-->
      <view v-for="(i,index) in restLessonList" class="shadow"
            style="border-top-right-radius: 10rpx; border-top-left-radius: 10rpx;
              width: 345rpx; margin-bottom: 30rpx;" @click="listItemClicked(index)" >
        <!--          <view class="">-->
        <image :src="addQiniuUrl(i.imgUrl)"
               style="height: 220rpx; width: 400rpx"></image>
        <view class="px-10">
          <view class="u-line-1 font-weight black-color" style="font-size: 28rpx; margin-top: 10rpx;">{{ i.lessonName }}</view>
          <view class="u-line-1 gray-color" style="font-size: 24rpx; margin-bottom: 15rpx;">{{i.courseIntroduction}}</view>
        </view>

<!--        <view class="d-flex j-sb px-20" style="margin-top: 5rpx;">-->
<!--          <view class="d-flex a-end">-->
<!--            <h-pprice></h-pprice>-->
<!--            <h-oprice></h-oprice>-->
<!--          </view>-->
<!--        </view>-->
<!--        <u-icon name="shopping-cart" color="#1bbf80" size="36" style=""></u-icon>-->


        <!--        </view>-->
      </view>
    </view>




<!--  <h-lessons-list></h-lessons-list>-->

<!--    自定义标题组件-->
    <h-rec-title title="猜你喜欢" desc="GUESS YOU LIKE"></h-rec-title>

<!--    商品列表样式2-->
<!--    <u-gap height="5" bg-color="#f8f8f8"></u-gap>-->
<!--    <h-lessons-list-row></h-lessons-list-row>-->

    <u-back-top :scrollTop="scrollTop" :mode="mode" :icon-style="iconStyle"></u-back-top>
<!--    上拉加载更多-->
    <u-loadmore :status="status" :icon-type="icontype" :load-text="loadtext" />
<!--    <view class="" style="width: 100%; height: 400rpx;"></view>-->
    <tab-bar :msg="msg"></tab-bar>
<!--    <u-tabbar-->
<!--        :value="nowPage"-->
<!--        @change="change1"-->
<!--        :fixed="true"-->
<!--        :placeholder="true"-->
<!--        :safeAreaInsetBottom="false"-->
<!--    >-->
<!--      <u-tabbar-item text="首页" icon="home" @click="click1" ></u-tabbar-item>-->
<!--      <u-tabbar-item text="消息" icon="chat" @click="click1" ></u-tabbar-item>-->
<!--      <u-tabbar-item text="我的" icon="account" @click="click1" ></u-tabbar-item>-->
<!--    </u-tabbar>-->
  </view>

</template>

<script>
	import HRecCate from "@/components/h-rec-cate/h-rec-cate";
  import HLessonsList from "@/components/h-lessons-list/h-lessons-list";
  import HRecTitle from "@/components/h-rec-title/h-rec-title";
  import HOprice from "@/components/h-oprice/h-oprice";
  import HPprice from "@/components/h-pprice/h-pprice";
  import HLessonsListRow from "@/components/h-lessons-list-row/h-lessons-list-row";
  import banner from "@/common/data/swiper"
  import gridList from "@/common/data/gridList";
  import TabBar from "@/pages/commomComponent/tabBar";
  import global from "@/common/common";

  export default {
    components: {TabBar, HLessonsListRow, HOprice, HRecTitle,  HRecCate, HPprice},
    data() {
			return {
        latestCourseId:-1,
        lessonList:[],
        restLessonList:[],
        lessonImgList:[],
        swiperNumber:4,
        userDt:{},
        msg:0,
        nowPage: 0,
        admin:'',
				title: 'Hello',
        banner:banner,
        bgColor: '#ffffff',
        gridList: gridList,
        text1: '欢迎使用一站式教培平台，您可以在这里学习、练习、与教师互动，提升自己的能力。让我们一起进步！有问题请联系管理员，感谢您的使用！',
        scrollTop:0,
        mode:'square',
        iconStyle:{
          fontSize:'32rpx',
          color:'#1bbf80'
        },
        status:'loadmore',
        icontype:'flower',
        loadtext:{
          status: 'loadmore',
          loadingText: '努力加载中',
          loadmoreText: '轻轻上拉',
          nomoreText: '实在没有了'
        }
        // bgColor:{
        //     backgroundImage:'linear-gradient(45deg, rgb(0,0,0), rgb(141,198,63))'
        // }
        // list2: [{
        //   image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        //   title: '昨夜星辰昨夜风，画楼西畔桂堂东',
        // },{
        //   image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        //   title: '身无彩凤双飞翼，心有灵犀一点通'
        // },{
        //   image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        //   title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        // }],
      }
		},
    onPageScroll(e) {
      this.scrollTop = e.scrollTop
    },

    onReachBottom() {
      console.log(111)
      this.status = 'loadingText'
      setTimeout(()=>{
        this.addLessons()
      },1000)
    },

    created() {
      var that = this
      try{
        const value = uni.getStorageSync('userLocalData');
        if(value){
          // console.log(value)
          console.log(JSON.parse(value))
          this.userDt = JSON.parse(value)
        }
      }catch(e){}

      this.getLocalUserData()
      // this.userDt = JSON.parse(window.localStorage.getItem("userLocalData"))
      uni.request({
        url:global.commonLocalServer+"/lesson/getRandLessons/" + 100,
        method:"GET",
        header:{
          "content-type":"application/json",
          'token':that.userDt.token
        },
        success:function(res){
          that.lessonList = res.data.data
          for(var i=0; i < that.swiperNumber; i++){
            // for(var i=0; i<that.lessonList.length;i++){
              that.lessonImgList.push(global.storageUrl + that.lessonList[i].imgUrl)
          }
          that.restLessonList = that.lessonList.splice(that.swiperNumber + 1) //前四个做轮播图，后面的添加到列表里
          console.log(that.restLessonList)

          // try {
          //   uni.setStorageSync('restLessonList', that.restLessonList);
          // } catch (e) {
          //   // error
          // }
        }
      })
    },

    onLoad(){
      console.log('index loaded')
    },

    methods: {
      goToRecent(){
        console.log(uni.getStorageSync('currentLocalId'))
        let tempId = uni.getStorageSync('currentLocalId')
        if (tempId === null || tempId === '' || tempId === -1 || tempId === undefined){
          console.log("没有")
        }else {
          this.latestCourseId = tempId
        }
        if (this.latestCourseId === -1){
          console.log("没有")
        } else {
          uni.navigateTo({
            url:'/pages/Lesson/LessonInfo'+"?LessonId="+this.latestCourseId + "&LessonName=ggg"
          })
          uni.$emit('videoAutoStart',{msg:'断点开始'})
        }
      },

      test68(){
        console.log(686868)
      },

      getLocalUserData() {
        console.log('getLocalUserData==========')
        var that = this
        //获取后端数据，若没有则创建
        uni.request({
          url: global.commonLocalServer + "/userData/getUserData/" + that.userDt.id,
          method: 'GET',
          header: {token: that.userDt.token},
          success: function (res) {
            console.log(res)
            that.latestCourseId = res.data.data.latestCourseId
            //如果后端有数据this.latestCourseId
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
          }
        })
      },

      searchClicked(){
        if (this.keyword !== '')
        {
          var that = this
          uni.navigateTo({
            url: '/pages/search/searchResult' + '?lessonName=' + that.keyword
          })
          that.keyword = ''
        }
      },
      addQiniuUrl(input){
        // console.log(global.storageUrl + input)
        return global.storageUrl + input
      },
      swiperClicked(index){
        console.log("链接课程ID:")
        console.log(this.lessonList[index])
        console.log(this.lessonList[index].lessonId)
        uni.navigateTo({
          url:'/pages/Lesson/LessonInfo'+"?LessonId="+this.lessonList[index].lessonId + "&LessonName="+this.lessonList[index].lessonName.toString()
        })
      },

      listItemClicked(index){
        console.log("链接课程ID:")
        console.log(this.restLessonList[index])
        console.log(this.restLessonList[index].lessonId)
        uni.navigateTo({
          url:'/pages/Lesson/LessonInfo'+"?LessonId="+this.restLessonList[index].lessonId + "&LessonName="+this.restLessonList[index].lessonName.toString()
        })
      },
      rightClick() {
        console.log('rightClick');
      },
      leftClick() {
        console.log('leftClick');
      },
      addLessons(){
        // for (let i=0;i<10;i++){
        //   let index = this.$u.random(0,5)
        //   let item = this.gridList[index]
        //   this.gridList.push(item)
        //   console.log(index)
        // }
      }
    }
	}
</script>

<style>
.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}

.cateRight{
  border-right: 1rpx solid #CCCCCC;
}
.cateBottom{
  border-bottom: 1rpx solid #CCCCCC;
}
</style>

<!--"{-->
<!--"flag":"T","errorCode":"","errorInfo":"","sign":"registerSuccess",-->
<!--"data":{-->
<!--"id":12,"-->
<!--name":"3167",-->
<!--"nickName":null,-->
<!--"phone":"31671111111",-->
<!--"avatar":null,-->
<!--"email":null,-->
<!--"password":"111111",-->
<!--"status":null,-->
<!--"type":null,-->
<!--"createdAt":"2022-03-16T05:16:16.643+00:00",-->
<!--"updatedAt":"2022-03-16T05:16:16.643+00:00",-->
<!--"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyUGhvbmUiOiIzMTY3MTExMTExMSIsInN1YiI6ImFkbWluLXRlc3QiLCJleHAiOjE2NDc0OTQxNzYsImp0aSI6ImExZTdlODFiLWZiMTUtNGQxMy1hM2U4LTJkMjRmYTA0ZDg4YSJ9.XkXRJuc-7n6ziDVCW1xfh2RKGV_3DNkYYr7p5hxpzOk"-->
<!--}-->
<!--}"-->