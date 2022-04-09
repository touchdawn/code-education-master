<template>
  <view class="form-content">
    <u-toast ref="uToast"></u-toast>
    <u-form>
      <u-form-item label="" label-width="80"  style="margin-bottom: 1%;">
        <u--text :text="homeworkForm.HwTitle" size="23"></u--text>
      </u-form-item>
    </u-form>
    <u-form :model="homeworkForm" ref="uForm" label-width="80"
            v-for="(form, index) in homeworkForm.mainInfo" style="border-top: 3rpx solid #bdbdbd; ">
      <u-form-item :label="'题'+(index+1)" prop="courseName" label-width="40" v-if="form.type === 'gapFill'">
        <u-text :text="form.question"/>
      </u-form-item>
      <u-form-item label="我的答案：" prop="courseIntro"  v-if="form.type === 'gapFill'">
        <u--text :text="studentAnswer[index]" />
      </u-form-item>
      <u-form-item label="正确答案：" prop="courseIntro"
                   v-if="form.type === 'gapFill' && studentAnswer[index] !== homeworkForm.correctAnswer[index]">
        <u--text :text="homeworkForm.correctAnswer[index]" color="red" />
      </u-form-item>

      <u-form-item label="结果:" prop="courseIntro"  label-width="50"
                   v-if="form.type === 'gapFill' && studentAnswer[index] === homeworkForm.correctAnswer[index]">
        <u--text text="正确" color="green" />
      </u-form-item>

      <u-form-item :label="'题'+(index+1)" prop="courseName" label-width="40" v-if="form.type === 'thinking'">
        <u-text :text="form.question"/>
      </u-form-item>
      <u-form-item label="" prop="courseIntro"  v-if="form.type === 'thinking'">
          <u-text text="思考题，无需作答" />
      </u-form-item>

      <u-form-item :label="'题'+(index+1)" prop="courseName" label-width="40" v-if="form.type === 'select'">
        <u-text :text="form.question"/>
      </u-form-item>
      <u-form v-for="(childForm , childIndex) in form.selectList" label-width="20" >
        <u-form-item :label="childForm.name" prop="courseName" v-if="form.type === 'select'">
          <u-text :text="childForm.input" />
        </u-form-item>
      </u-form>

      <u-form-item label="我的答案：" prop="courseName" v-if="form.type === 'select'">
        <u-text :text="studentAnswer[index]" />
<!--        <u-radio-group v-model="studentAnswer[index]"  v-if="form.type === 'select'">-->
<!--          <u-radio-->
<!--              :disabled="studentAnswer[index]"-->
<!--              :customStyle="{marginRight: '16px'}"-->
<!--              v-for="(item, index) in form.selectList"-->
<!--              :key="index"-->
<!--              :label="item.name"-->
<!--              :name="item.name"-->
<!--          >-->
<!--          </u-radio>-->
<!--        </u-radio-group>-->
      </u-form-item>
      <u-form-item label="正确答案：" prop="courseIntro"  v-if="form.type === 'select' && studentAnswer[index] !== homeworkForm.correctAnswer[index]">
        <u--text :text="homeworkForm.correctAnswer[index]" color="red" />
      </u-form-item>
      <u-form-item label="结果:" prop="courseIntro" label-width="50"
                   v-if="form.type === 'select' && studentAnswer[index] === homeworkForm.correctAnswer[index]">
        <u--text text="正确" color="green" />
      </u-form-item>
    </u-form>
  </view>

</template>

<script>
import global from "@/common/common";

export default {
  name: "doHomework",
  data(){
    return{
      userDt:{},
      hwId:-1,
      studentAnswer:[],
      homeworkForm:{
        HwTitle:'作业标题',
        correctAnswer:[],
        mainInfo:[
          {
            question:'question1',
            answer:'ansasn',
            type:'gapFill'
          },
          {
            question:'question2',
            type:'select',
            selectAnswer:1,
            selectList: [{
              name: 'A',
              input:'input1',
            },
              {
                name: 'B',
                input:'input2',
              },
              {
                name: 'C',
                input:'input3',
              },
              {
                name: 'D',
                input:'input3',
              }
            ],
          }
        ],
        answer:[]
      }

    }
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
    this.getHomework()
    this.getAnswer()
  },
  methods:{
    submit(){
      // console.log(this.addHomeworkForm)
      let formData={}
      formData.homeworkRel = this.hwId
      formData.creatorId = this.userDt.id
      formData.answer = JSON.stringify(this.homeworkForm.answer)
      console.log(formData)
      let that = this
      uni.request({
        method:'POST',
        url:global.commonLocalServer +"/homework/addStudentHomeworkAnswer",
        header: {token: this.userDt.token},
        data:formData,
        success:function (res) {
          console.log(res)
        }
      })
    },
    getHomework(){
      let that = this
      uni.request({
        method:'GET',
        url: global.commonLocalServer + "/homework/getHomeworkByHwId/" + that.hwId,
        header:{token:that.userDt.token},
        success: function (res){
          console.log(res)
          that.homeworkForm.mainInfo = JSON.parse(res.data.data.question)
          that.homeworkForm.HwTitle = res.data.data.homeworkName
          that.homeworkForm.correctAnswer = JSON.parse(res.data.data.answer)
          // console.log(questionList)
        }
      })
    },
    getAnswer(){
      let that = this
      uni.request({
        method:'GET',
        url: global.commonLocalServer + "/homework/getStudentAnswer/" + that.hwId + '/' + that.userDt.id,
        header:{token:that.userDt.token},
        success: function (res){
          console.log(234)
          console.log(res)
          that.studentAnswer = res.data.data
          // console.log(questionList)
        }
      })
    }
  }

}
</script>

<style scoped>
.form-content {
  padding: 10px;
}
</style>