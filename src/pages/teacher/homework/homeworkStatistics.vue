<template>
  <view>
<!--    <view class="title">{{homeworkData.homeworkName}}</view>-->
    <u--text :text="homeworkData.homeworkName" size="20" align="center"></u--text>
    <page-pagination mode="simple" style="margin-top: 5%;"
                     :total="statisticDataList.length * 10"
                     :currentPage="page.currentPage" @change="change"></page-pagination>

    <view>
      <view  v-show="!sumEmpty "  style="display:flex; justify-content: center">
        <canvas style="width: 600rpx; height: 600rpx; margin-left: 50rpx;margin-right: 50rpx;" canvas-id="homeownerCanvas" class="homeowner-canvas_charts"></canvas>
      </view>
    </view>


    <view  ref="uForm"
             style="border-top: 3rpx solid #bdbdbd; margin-left: 5%;margin-right: 5%;">

<!--      填空题-->
      <view  v-if="questionList[page.currentPage - 1].type === 'gapFill'" style="margin-top: 5%;margin-bottom: 5%;">

        <u-text :text="'题'+page.currentPage" size="20" style="margin-bottom: 4%;"></u-text>
        <u-text :text="questionList[page.currentPage - 1].question" size="18" lineHeight="25" />
      </view>
      <view  v-if="questionList[page.currentPage - 1].type === 'gapFill'">
        <u-text :text="'答案'" size="20" style="margin-bottom: 4%;" ></u-text>
        <u--text :text="correctAnswerList[page.currentPage - 1]" size="18" lineHeight="25" />
      </view>

      <!--      思考题-->
      <view  v-if="questionList[page.currentPage - 1].type === 'thinking'" style="margin-top: 5%;margin-bottom: 5%;">

        <u-text :text="'思考题'+page.currentPage" size="20" style="margin-bottom: 4%;"></u-text>
        <u-text :text="questionList[page.currentPage - 1].question" size="18" lineHeight="25" />
      </view>


<!--      选择题-->
      <view  v-if="questionList[page.currentPage - 1].type === 'select'">
        <u-text :text="'题'+page.currentPage" size="20" style="margin-top: 5%;margin-bottom: 3%;"></u-text>
        <u-text :text="questionList[page.currentPage - 1].question" size="20" lineHeight="25"  style="margin-bottom: 5%;"/>
      </view>
      <view >
        <view  v-for="(item,index) in questionList[page.currentPage - 1].selectList" 
                     v-if="questionList[page.currentPage - 1].type === 'select'" style="display:grid;  grid-template-columns: 550rpx 300rpx;  grid-template-rows: 20rpx 20rpx 20rpx 20rpx; ">
          <u-text :text="item.name + '.' + item.input" size="18" ></u-text>
<!--          <u-text :text="item.input" />-->
          <u-text :text="editSelectItem(item,index)" size="18"  />
        </view>
      </view>


      <view v-if="questionList[page.currentPage - 1].type === 'select' ">
        <u--text :text="'正确答案：'"  size="20"></u--text>
        <u--text :text="correctAnswerList[page.currentPage - 1]"  size="18"  style="margin-top: 3%;" />
      </view>

    </view>




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
      hwId:-1,
      sumEmpty:false,
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
  mounted(){
    console.log('mount')
  },
  beforeUpdate() {
    console.log(233)
  },
  onLoad(e){
    this.hwId = e.hwId
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
        url:global.commonLocalServer + '/homework/getHwStatistic/' + this.hwId,
        header:{token:that.userDt.token},
        method:'GET',
        success:function (res) {
          console.log(res)
          that.homeworkData = res.data.data.homeworkData
          that.statisticDataList = res.data.data.statisticData

          that.questionList = JSON.parse(that.homeworkData.question)
          that.correctAnswerList = JSON.parse(that.homeworkData.answer)

          console.log('ques')
          console.log( that.questionList.length)
          console.log('ans')

          that.page.pageSize = that.questionList.length * 10
          that.processData(0)
        }
      })
    },
    editSelectItem(item,index){
      // console.log(item)
      return  "(" + this.selectOptionStatList[index] + "人选择)"
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
      console.log('data')

      console.log(this.data)
      console.log(sum)
      this.selectOptionStatList  = JSON.parse(this.statisticDataList[index].allAnswer);
      // console.log(parse)
      if(sum !== 0){
        console.log('false')
        canvas.canvasGraph('homeownerCanvas',this.data,sum)
        this.sumEmpty = false //弃用
      } else {
        let data1 = [
          {
            "money": 0,
            "value": 1,
            "color": "#afdfe4",
            "title": "正确"
          },
        ]
        console.log('empty')
        canvas.canvasGraph('homeownerCanvas',data1,0)
        this.sumEmpty = false //弃用
      }
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