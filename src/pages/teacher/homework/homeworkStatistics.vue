<template>
  <view>
<!--    <view class="title">{{homeworkData.homeworkName}}</view>-->
    <u--text :text="homeworkData.homeworkName" size="20" align="center"></u--text>
    <page-pagination mode="simple" style="margin-top: 5%;"
                     :total="statisticDataList.length * 10"
                     :currentPage="page.currentPage" @change="change"></page-pagination>

    <view>

      <view style="display:flex; justify-content: center">
        <canvas style="width: 600rpx; height: 600rpx; margin-left: 50rpx;margin-right: 50rpx;" canvas-id="homeownerCanvas" class="homeowner-canvas_charts"></canvas>
      </view>
    </view>

    <u-form  ref="uForm" label-width="80"
             style="border-top: 3rpx solid #bdbdbd; margin-left: 5%;margin-right: 5%;">

<!--      填空题-->
      <u-form-item :label="'题'+page.currentPage" prop="courseName" label-width="40" v-if="questionList[page.currentPage - 1].type === 'gapFill'">
        <u-text :text="questionList[page.currentPage - 1].question"   />
      </u-form-item>
      <u-form-item label="正确答案：" prop="courseIntro"
                   v-if="questionList[page.currentPage - 1].type === 'gapFill'">
        <u--text :text="correctAnswerList[page.currentPage - 1]"/>
      </u-form-item>


<!--      选择题-->
      <u-form-item :label="'题'+page.currentPage" prop="courseName" label-width="40" v-if="questionList[page.currentPage - 1].type === 'select'">
        <u-text :text="questionList[page.currentPage - 1].question" size="20" />
      </u-form-item>
      <u-form  label-width="20" >
        <u-form-item :label="item.name"
                     prop="courseName" v-for="(item,index) in questionList[page.currentPage - 1].selectList"
                     v-if="questionList[page.currentPage - 1].type === 'select'">
<!--          <u-text :text="item.input" />-->
          <u-text :text="item.input" />
          <u-text :text="editSelectItem(item,index)" />

        </u-form-item>
      </u-form>


      <u-form-item label="正确答案：" prop="courseIntro"  v-if="questionList[page.currentPage - 1].type === 'select' ">
        <u--text :text="correctAnswerList[page.currentPage - 1]"/>
      </u-form-item>

    </u-form>




  </view>
</template>

<script>
import global from "@/common/common";
import pagePagination from "@/components/page-pagination/components/page-pagination/page-pagination";
import canvas from "@/common/canvas";
export default {
  components:{pagePagination},
  name: "homeworkStatistics",
  data() {
    return {
      userDt:{},
      page: {
        total: 10,
        pageSize: 10,
        currentPage: 1,
      },
      selectOptionStatList:[],
      homeworkData:{
        answer: "",
        courseRel: -1,
        createAt: "",
        creatorId: -1,
        deleteFlag: -1,
        homeworkName: "",
        id: -1,
        question: ""
      },
      questionList:[{type:''}],
      correctAnswerList:[],
      statisticDataList:[],
      data:[
        {
          "money": 3 ,
          "value": 0.3,
          "color": "#f8aba6",
          "title": "错误"
        },
        {
          "money": 7 ,
          "value": 0.7,
          "color": "#afdfe4",
          "title": "正确"
        }
      ]
    }
  },

  onReady(){
    // canvas.canvasGraph('homeownerCanvas',this.data,10)
  },
  created() {
    try{
      const value = uni.getStorageSync('userLocalData');
      if(value){
        // console.log(value)
        this.userDt = JSON.parse(value)
      }
    }catch(e){}
    this.getstatisticData()
  },
  methods: {
    getstatisticData(){
      let that = this
      uni.request({
        url:global.commonLocalServer + '/homework/getHwStatistic/' + 4,
        header:{token:that.userDt.token},
        method:'GET',
        success:function (res) {
          console.log(res)
          that.homeworkData = res.data.data.homeworkData
          that.statisticDataList = res.data.data.statisticData

          that.questionList = JSON.parse(that.homeworkData.question)
          that.correctAnswerList = JSON.parse(that.homeworkData.answer)

          console.log('ques')
          console.log( that.questionList)
          console.log('ans')

          that.page.pageSize = 20
          that.processData(0)
        }
      })
    },
    editSelectItem(item,index){
      // console.log(item)
      return  "(" + this.selectOptionStatList[index] + "人选择）"
    },
    processData(index){
      let correctNum = this.statisticDataList[index].correctNumber
      let incorrectNum = this.statisticDataList[index].incorrectNumber
      let sum = correctNum + incorrectNum
      let correctValue = correctNum/sum
      let incorrectValue = incorrectNum/sum
      this.data[1].value = correctValue
      this.data[1].money = correctNum
      this.data[0].value = incorrectValue
      this.data[0].money = incorrectNum
      console.log(this.data)
      this.selectOptionStatList  = JSON.parse(this.statisticDataList[index].allAnswer);
      // console.log(parse)
      canvas.canvasGraph('homeownerCanvas',this.data,sum)
    },

    change(currentPage, type) {
      this.page.currentPage = currentPage;
      this.processData(currentPage-1)
      console.log("点击了" + type + "，当前页：" + currentPage);
    }
  },
}
</script>

<style scoped>
.content {
  padding-bottom: 100rpx;
}

.title {
  font-size: 28rpx;
  line-height: 32rpx;
  padding: 45rpx 30rpx 18rpx;
  color: rgba(69, 90, 100, 0.6);
}
</style>