<template>
  <view>
    <!-- 2.0.19支持autoBack，默认为false -->
<!--    自定义导航-->
<!--      <u-navbar-->
<!--          title="个人中心"-->
<!--          @rightClick="rightClick"-->
<!--          :autoBack="true"-->
<!--      >-->
<!--      </u-navbar>-->
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
    <view style="margin-top: 20rpx;">
      <u-notice-bar :text="text1"></u-notice-bar>
    </view>
<!--    <view>{{admin.data.name}}</view>-->
<!--    宫格布局组件-->
    <view>
      <u-grid
          :border="false"
          col="5"
      >
        <u-grid-item
            v-for="(listItem,listIndex) in gridList"
            :key="listIndex"
        >
          <u-icon
              :customStyle="{paddingTop:20+'rpx'}"
              :name="listItem.name"
              :size="22"
          ></u-icon>
          <text class="grid-text">{{listItem.title}}</text>
        </u-grid-item>
      </u-grid>
      <u-toast ref="uToast" />
    </view>
<!--    搜索框-->
    <u-search placeholder="日照香炉生紫烟" class="px-20"
              v-model="keyword" style="margin-top: 30rpx;"></u-search>

<!--推荐分类-->
  <h-rec-cate></h-rec-cate>

  <h-lessons-list></h-lessons-list>

<!--    自定义标题组件-->
    <h-rec-title title="猜你喜欢" desc="GUESS YOU LIKE"></h-rec-title>

<!--    商品列表样式2-->
<!--    <u-gap height="5" bg-color="#f8f8f8"></u-gap>-->
    <h-lessons-list-row></h-lessons-list-row>

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
    components: {TabBar, HLessonsListRow, HOprice, HRecTitle, HLessonsList, HRecCate, HPprice},
    data() {
			return {
        lessonList:[],
        lessonImgList:[],
        userDt:{},
        msg:0,
        nowPage: 0,
        admin:'',
				title: 'Hello',
        banner:banner,
        bgColor: '#ffffff',
        gridList: gridList,
        text1: 'uView UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用',
        keyword: '',
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

		onLoad() {

		},

    created() {
      var that = this
      this.userDt = JSON.parse(window.localStorage.getItem("userLocalData")).data
      uni.request({
        url:global.commonLocalServer+"/lesson/getAllLessons",
        method:"GET",
        header:{
          "content-type":"application/json",
          'token':this.userDt.token
        },
        success:function(res){
          that.lessonList = res.data.data
          console.log(that.lessonList[0].IMG_URL)
          for(var i=0; i<that.lessonList.length;i++){
            that.lessonImgList.push(that.lessonList[i].IMG_URL)
          }
        }
      })    },

    methods: {
      swiperClicked(index){
        console.log("链接课程ID:")
        console.log(this.lessonList[index].LESSON_REL)
        uni.navigateTo({
          url:'/pages/Lesson/LessonInfo'+"?LessonId="+this.lessonList[index].LESSON_REL
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