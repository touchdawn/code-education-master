<template>
  <view class="form-content">
    <u-toast ref="uToast"></u-toast>
    <u-form>
      <u-form-item label="" label-width="80" borderBottom>
        <u--text :text="homeworkForm.HwTitle"></u--text>
      </u-form-item>
    </u-form>
    <u-form :model="homeworkForm" ref="uForm" label-width="40"
            v-for="(form, index) in homeworkForm.mainInfo" style="border-bottom: 3rpx solid #bdbdbd;margin-top: 6%; ">
      <u-form-item :label="'题'+(index+1)" prop="courseName" v-if="form.type === 'gapFill'">
        <u-text :text="form.question"/>
      </u-form-item>
      <u-form-item label="答案" prop="courseIntro"  v-if="form.type === 'gapFill'">
        <u--textarea v-model="homeworkForm.answer[index]" placeholder="请输入答案" count />
      </u-form-item>

      <u-form-item :label="'题'+(index+1) " prop="courseName" v-if="form.type === 'thinking'">
        <u-text :text="form.question"/>
      </u-form-item>
      <u-form-item label="答案" prop="courseIntro"  v-if="form.type === 'thinking'">
        <u--textarea disabled :v-model="setThinkAnswer(index)" placeholder="思考题,不需要作答" count />
      </u-form-item>



      <u-form-item :label="'题'+(index+1)" prop="courseName" v-if="form.type === 'select'">
        <u-text :text="form.question"  placeholder="请输入题目" count/>
      </u-form-item>
      <u-form v-for="(childForm , childIndex) in form.selectList">
        <u-form-item :label="childForm.name" prop="courseName" v-if="form.type === 'select'">
          <u-text :text="childForm.input" />
        </u-form-item>
      </u-form>

      <u-form-item label="答案:" prop="courseName" v-if="form.type === 'select'">
        <u-radio-group v-model="homeworkForm.answer[index]"  v-if="form.type === 'select'">
          <u-radio
              :customStyle="{marginRight: '16px'}"
              v-for="(item, index) in form.selectList"
              :key="index"
              :label="item.name"
              :name="item.name"
          >
          </u-radio>
        </u-radio-group>
      </u-form-item>
    </u-form>
    <u-button @click="submit" style="margin-top: 4%;">提交</u-button>
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
      homeworkForm:{
        HwTitle:'作业标题',
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
  },
  methods:{
    setThinkAnswer(index){
      this.homeworkForm.answer[index] = 'ThinkQuestion!&$'
      return this.homeworkForm.answer[index]
    },

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