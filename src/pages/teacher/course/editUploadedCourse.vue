<template>

  <view class="uni-pages">
    <u-toast ref="uToast"></u-toast>

    <u-form  ref="uForm" label-width="90" style="margin-left: 5%; width: 90%">
      <u-form-item label="课程名称:" prop="courseName" style="margin-top: 40rpx;">
<!--        <text>{{courseName}}</text>-->
        <u--input v-model="courseName" ></u--input>
      </u-form-item>
      <u-form-item label="课程介绍:" prop="courseName" style="margin-top: 30rpx; margin-bottom: 2%;">
<!--        <text>{{detail.introduction}}</text>-->
        <u--textarea v-model="detail.introduction"></u--textarea>
      </u-form-item>
    </u-form>
    <view style=" display:flex; border-bottom: 2rpx solid #CCCCCC">
      <u-button type="primary"  style="width: 40%; margin-bottom: 4%;" @click="sendClicked">修改</u-button>
    </view>
<!--    <form>-->
<!--      <view class="uni-form-item uni-column" >-->
<!--        <view  style="height:90rpx;line-height:90rpx;-->
<!--                     font-size: 33rpx; color: #0E151D">-->
<!--          课程名称：-->
<!--        </view>-->
<!--        <view class="title padding-left text-df"-->
<!--              style="height:40rpx;line-height:30rpx; margin-left: 40rpx;-->
<!--                     font-size: 33rpx; color: #0E151D">{{courseName}}</view>-->
<!--      </view>-->

<!--      <view class="uni-form-item uni-column">-->
<!--        <view  style="height:90rpx;line-height:90rpx;-->
<!--                     font-size: 33rpx; color: #0E151D">-->
<!--          课程介绍：-->
<!--        </view>-->
<!--        <view class="title padding-left text-df"-->
<!--              style="height:50rpx;line-height:30rpx; margin-left: 40rpx;-->
<!--                     font-size: 33rpx; color: #0E151D">{{detail.introduction}}</view>-->
<!--      </view>-->
<!--    </form>-->

    <view style="background-color: #f1f1f1;width: 750rpx;">
      <view v-for="(n,j) in detail.chapter" :key="j">
        <view class="uni-row margin-left u-border-bottom align-center">
          <text class="padding-left text-df" style="height:100rpx;line-height:90rpx;font-size: 33rpx;">{{n.TITLE}}</text>
          <u-button style="margin-right: 5%; width: 18%" :plain="true"
                    size="mini" type="error" @click="deleteChapterClicked(n)"> 删除本章</u-button>
        </view>
        <view class="bg-white">
          <view v-for="(c,k) in n.child" :key="k">
            <view
                  class="uni-row margin-left u-border-bottom align-center" style="height:80rpx;">
              <!--                  <image :src="chapterIcon(c)" style="width: 40rpx;height: 40rpx;"></image>-->
              <text class="flex-sub margin-left-xs margin-right text-df"
                    :class="'text-black'"
                    :style=" '#1CBBB4'" style="font-size: 33rpx; margin-left: 40rpx;">{{c.TITLE}}</text>
              <u-button style="margin-right: 5%; width: 18%" :plain="true" v-if="c.STATUS === 1"
                        size="mini" type="error" @click="deleteClicked(c)">删除本节</u-button>
              <text style="margin-right: 2%; width: 18%"  v-if="c.STATUS === 0"
                        type="error" @click="deleteClicked(c)">待审核</text>
            </view>
          </view>
          <view class="uni-row margin-left u-border-bottom align-center" style="height:80rpx;">
            <text class="flex-sub margin-left-xs margin-right text-df"
                  @click="addNewSectionClicked(detail.chapter[j])"
                  :class="'text-blue'"
                  :style=" '#1CBBB4'" style="font-size: 28rpx;
                  width: 80%;
                     text-align:center;">+ 添加《{{detail.chapter[j].TITLE}}》章节的新教学</text>
          </view>
        </view>
      </view>
      <view class="padding-left text-df" @click="newChapterClicked"
            style="height:90rpx;line-height:90rpx; color: #2C405A">
        <text style="font-size: 33rpx;" :class="'text-blue'">+ 添加新章节</text>
      </view>
    </view>

    <view>
      <!-- 取消提示框 -->
      <uni-popup ref="deleteConfirmDialog" type="dialog">
        <uni-popup-dialog type="error" cancelText="取消" confirmText="确认"
                          title="确定删除？" :content="temp.deleteMsg"
                          @confirm="deleteConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>


    <u-action-sheet
        :show="showChoose"
        :actions="actions"
        title="请选择课程类型"
        @close="showChoose = false"
        @select="typeSelect"
    >
    </u-action-sheet>
  </view>
</template>

<script>
import global from "@/common/common";

export default {
  name: "editUploadedCourse",
  data(){
    return{
      userDt:{},
      showChoose:false,
      courseId:-1,
      courseName:'',
      changeData:{
        courseName:'',
        introduction:''
      },
      temp:{
        lessonId:-1,
        deleteId:-1,
        deleteMsg:'确定删除吗？'
      },
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
      actions: [
        {
          name: '视频课程',
        },
        {
          name: '图文课程(MarkDown)',
        },
        // {
        //   name: '图文音频课程（暂不支持）',
        // },
      ],
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
    this.getAllData();
    if (this.currentIndex === 2) {
      this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100) - uni.upx2px(140);
    } else {
      this.listHeight = uni.upx2px(this.pageHeight) - uni.upx2px(100);
    }
  },
  onLoad (e) { //option为object类型，会序列化上个页面传递的参数
    var that = this
    console.log(e)
    this.courseId = parseInt(e.courseId)
    this.courseName = e.courseName
    const {
      windowHeight,
      windowWidth
    } = uni.getSystemInfoSync();
    this.pageHeight = windowHeight / windowWidth * 750;
    uni.$on('updateEditCourse',function(data){
      console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
      if (data.msg === '页面更新') {
        that.detail = {}
        that.getAllData();
        that.$u.toast('添加成功！')
      }
    })
  },
  methods:{
    deleteClicked(c){
      console.log(c)
      this.temp.deleteId = c.ID
      this.$refs.deleteConfirmDialog.open()

    },
    deleteChapterClicked(c) {
      console.log(c)
      this.temp.deleteId = c.ID
      this.temp.deleteMsg="删除后其下子项目将一并删除"
      this.$refs.deleteConfirmDialog.open()

    },
    addNewSectionClicked(e){
      // console.log(e)
      this.temp.lessonId = e.ID
      this.showChoose = true
    },

    deleteConfirm(){
      var that = this
      let header = {token:that.userDt.token}
      uni.request({
        method:'GET',
        url: global.commonLocalServer + "/lesson/deleteSection/" + that.temp.deleteId,
        header:header,
        success: function (res){
          console.log("res:")
          console.log(res)
          if (res.data.flag === 'T') {
            that.refreshList()
          }
        }
      })
    },

    refreshList() {
      this.detail = {}
      this.getAllData();
    },

    typeSelect(e) {
      var that = this
      console.log(e.name)
      if (e.name === '视频课程') {
        uni.navigateTo({
          url: '/pages/teacher/course/uploadNewSection/uploadNewVideo' + '?lessonId=' + that.temp.lessonId + "&courseId=" + that.courseId
        })
      } else if (e.name === '图文课程(MarkDown)'){
        uni.navigateTo({
          url: '/pages/teacher/course/uploadNewSection/uploadNewMarkDown' + '?lessonId=' + that.temp.lessonId + "&courseId=" + that.courseId
        })
      }

      // this.model1.userInfo.sex = e.name
      // this.$refs.form1.validateField('userInfo.sex')
    },

    newChapterClicked(){
      uni.navigateTo({
        url: '/pages/teacher/course/addNewChapter' + '?courseName=' + this.courseName + "&courseId=" + this.courseId
      })
    },


    getAllData(){
      var that = this
      uni.request({
        url:global.commonLocalServer+"/lesson/getCourseAllInfo/" + that.courseId + "/" + that.userDt.id,
        method:"GET",
        header:{
          'token':that.userDt.token
        },
        success:function(res){
          console.log(res)
          that.detail = res.data.data
          console.log(that.detail)
          that.detail.imgUrl = global.storageUrl + that.detail.imgUrl
          // that.detail.chapter[that.detail.chapter.length] = {"TITLE":"添加新章节"}
          console.log(that.detail)
          that.changeData.introduction = that.detail.introduction
          that.changeData.courseName = that.courseName
        }
      })
    },
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