<template>
  <view style="background-color: #f2f2f2;padding-top: 10rpx;" >
<!--    <YSteps lineNum='0' color='#fff' backgroundColor='#000fff' :infoList='list'></YSteps>-->
    <view class="bg" :style="getStyle()">
      <view class="steps">
        <view class="steps_item" v-for="(i, index) in list">
          <view class="s_r">
            <view class="line" :style="{backgroundColor:index !== 0?backgroundColor:'rgba(0,0,0,0)'}"></view>
            <view class="index" :style="{backgroundColor:backgroundColor,color:color}">
              {{ index + 1 }}
            </view>
            <view class="line" :style="{backgroundColor:index !== infoList.length-1?backgroundColor:'rgba(0,0,0,0)'}"></view>
          </view>
          <view class="s_l" >
            <view class="" @tap="listItemClicked(index)">
              <text style="width: 100rpx">{{ i.courseName }}</text>
<!--              <view :style="{WebkitLineClamp:lineNum!==0?lineNum:''}">{{ i.info }}</view>-->


              <view class=" u-border-radius d-flex a-center"
                    style="height: 200rpx; margin-bottom: 10rpx;" >
                <image class="u-border-radius flex-shrink mx-20"
                       :src="addQiniuUrl(i.courseUrl)" style="width: 260rpx;height: 160rpx;"></image>
                <view class="d-flex flex-column j-sb " style="padding-right: 10rpx;height: 80%">
                  <view style="margin-top: 10rpx;">
                    <view class="u-line-1" style="font-size: 32rpx; margin-bottom: 5rpx;">{{ i.title }}</view>
                    <view class="u-line-1 gray-color" style="font-size: 26rpx;">{{ i.recommendReason }}</view>
                  </view>
                  <view class="d-flex w-100" >
                    <view class="d-flex a-end" >
                      <text style="margin-bottom: 10rpx;margin-right: 110rpx;">{{i.createTime}}</text>
                    </view>
                    <view>
                      <u-button type="primary" size="mini"
                                style="margin-top: 30rpx; width: 130rpx;" text="添加到收藏"></u-button>
                    </view>
                  </view>
                </view>
              </view>



            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
// import YSteps from '../../components/Y-Steps/Y-Steps.vue'
import global from "@/common/common";

export default {
  components: {
    // YSteps
  },
  data() {
    return {
      userDt:{},
      skillMapId:-1,
      infoList: [],
      color: '#fff',
      backgroundColor: '#ff3838',
      lineNum:5,
      list: [

        {
          recommendReason:"什么是面向对象",
          courseName:'5分钟通俗讲解面向对象编程',
          createTime: '220-1-4',
        },


      ]
    };

  },
  onLoad(e){
    this.skillMapId = e.id
  },
  created() {
    try{
      const userLocalDataValue = uni.getStorageSync('userLocalData');
      if(userLocalDataValue){
        this.userDt = JSON.parse(userLocalDataValue)
      }
    }catch(e){}
    this.getCourseList()
  },
  methods: {
    test1(){
      console.log(333)
    },
    getCourseList(){
      var that = this
      uni.request({
        url: global.commonLocalServer + '/skillMap/getSkillMapById/' + that.skillMapId,
        method:'GET',
        header:{token:that.userDt.token},
        success:function (res){
          console.log(res)
          that.list = res.data.data
        }
      })
    },

    listItemClicked(index){
      console.log("链接课程ID:")
      console.log(this.list[index])
      console.log(this.list[index].courseId)
      uni.navigateTo({
        url:'/pages/Lesson/LessonInfo'+"?LessonId="+this.list[index].courseId
      })
    },

    addQiniuUrl(input){
      // console.log(global.storageUrl + input)
      return global.storageUrl + input
    },

    getStyle(){
      let bgImgStr = global.storageUrl + "python_dbdb.png"
      return 'background-image: url(' +  bgImgStr +')' ;
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #f2f2f2;
}

.bg {
  margin: 20upx 0;
  background-color: #f2f2f2;
  //background-image: url('http://ra2q5rhzl.hd-bkt.clouddn.com/python_dbdb.png');
  background-position:center  center;
  background-attachment:fixed;
  background-repeat: no-repeat;
  display: flex;
}

.steps {
  display: flex;
  flex-direction: column;

  .steps_item {
    display: flex;

    .s_r {
      padding: 0 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .line {
        flex: 1;
        width: 5rpx;
        background-color: #fff;
      }

      .index {
        width: 40rpx;
        height: 40rpx;
        font-size: 12px;
        text-align: center;
        line-height: 40rpx;
        border-radius: 50rpx;
      }
    }

    .s_l {
      display: flex;
      flex-direction: column;
      padding: 20rpx 0;

      .info_item {
        background-color: #FFFFFF;
        margin-right: 30upx;
        border-radius: 10upx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30upx;
        box-shadow: 0 10rpx 30rpx #ddd;

        text {
          font-size: 18px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
        }

        view {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;

          flex-direction: column;
        }
      }

      .info_item:active {
        background-color: #f4f4f4;
      }
    }
  }
}


// .steps {
// 	display: flex;
// 	flex-direction: column;
// 	margin: 0 30upx;

// 	.steps_item {
// 		display: flex;
// 		align-items:center ;
// 		background-color: #fff;
// 		margin-top: 10rpx;
// 		.s_r {
// 			display: flex;
// 			flex-direction: column;
// 			align-items: center;
// 			height: 100%;
// 			background-color: #f3f;
// 			flex: 1;
// 			view {
// 				height: 100%;
// 				display: flex;
// 				flex: 1;
// 				height: 100%;
// 				width: 5upx;
// 			}

// 			text {
// 				display: flex;
// 				flex-direction: column;
// 				align-items: center;
// 				width: 40upx;
// 				line-height: 40upx;
// 				height: 40upx;
// 				border-radius: 50%;
// 				background-color: #ff3838;
// 				color: #ffffff;
// 				font-size: 10px;
// 			}
// 		}
// 	}
// }

// .info_list {
// 	display: flex;
// 	flex-direction: column;
// 	flex: 1;

// 	.info_item {
// 		background-color: #fff;
// 		height: 200upx;
// 		margin: 20upx 0;
// 		margin-right: 30upx;
// 		border-radius: 10upx;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		padding: 0 30upx;

// 		text {
// 			font-size: 18px;
// 			font-family: PingFangSC-Medium, PingFang SC;
// 			font-weight: 500;
// 			color: rgba(51, 51, 51, 1);
// 			line-height: 25px;
// 		}

// 		view {
// 			font-size: 14px;
// 			font-family: PingFangSC-Regular, PingFang SC;
// 			font-weight: 400;
// 			color: rgba(102, 102, 102, 1);
// 			line-height: 20px;
// 			overflow: hidden;
// 			text-overflow: ellipsis;
// 			display: -webkit-box;
// 			-webkit-line-clamp: 2;
// 			flex-direction: column;
// 		}
// 	}

// 	.info_item:active {
// 		opacity: 0.6;
// 	}
// }
</style>
