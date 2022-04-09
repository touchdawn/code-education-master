<template>
  <view class="form-content">
    <u-toast ref="uToast"></u-toast>
    <u-form>
      <u-form-item label="作业标题" label-width="80" borderBottom>
        <u-input v-model="addHomeworkForm.HwTitle"></u-input>
      </u-form-item>
    </u-form>
    <u-form :model="addHomeworkForm" ref="uForm" label-width="40"
            v-for="(form, index) in addHomeworkForm.mainInfo" style="border-bottom: 3rpx solid #bdbdbd;margin-top: 6%; ">
      <u-form-item :label="'题'+(index+1)" prop="courseName" v-if="form.type === 'gapFill'">
        <u-textarea v-model="form.question"  placeholder="请输入题目" count/>
      </u-form-item>
      <u-form-item label="答案" prop="courseIntro"  v-if="form.type === 'gapFill'">
        <u--textarea v-model="addHomeworkForm.answer[index]" placeholder="请输入答案" count />
      </u-form-item>

      <u-form-item :label="'题'+(index+1)" prop="courseName" v-if="form.type === 'thinking'">
        <u-textarea v-model="form.question"  placeholder="请输入题目" count/>
      </u-form-item>

      <u-form-item :label="'题'+(index+1)" prop="courseName" v-if="form.type === 'select'">
        <u-textarea v-model="form.question"  placeholder="请输入题目" count/>
      </u-form-item>
      <u-form v-for="(childForm , childIndex) in form.selectList">
        <u-form-item :label="childForm.name" prop="courseName" v-if="form.type === 'select'">
          <u-input v-model="childForm.input" placeholder="请输入选项" />
        </u-form-item>
      </u-form>

      <u-form-item label="答案:" prop="courseName" v-if="form.type === 'select'">
        <u-radio-group v-model="addHomeworkForm.answer[index]"  v-if="form.type === 'select'">
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


      <u-button @click="deleteDynamic(index)" type="error"

                style="margin-bottom: 3%; width: 100rpx" size="small">删除</u-button>

    </u-form>
    <view style="display:flex; justify-content: space-between; margin-top: 7%;">
      <u-button @click="addNewGapFill" type="primary" style="width: 30%">添加填空题</u-button>
      <u-button @click="addNewSelect" type="success" style="width: 30%">添加选择题</u-button>
      <u-button @click="addNewThinking" type="primary" style="width: 30%">添加思考题</u-button>
    </view>

    <u-button @click="submit" style="margin-top: 4%;">提交</u-button>
  </view>
</template>

<script>
import global from "@/common/common";

export default {
  name: "homework",
  data(){
    return{
      userDt:{},
      courseId:-1,
      form: {
        courseName: '',
        courseIntro: '',
        courseCover: 'courseDefaultCover.png',
        courseTag:'',
      },
      addHomeworkForm:{
        HwTitle:'',
        mainInfo:[
          // {
          //   question:'question1',
          //   answer:'ansasn',
          //   type:'gapFill'
          // },
          // {
          //   question:'question2',
          //   type:'select',
          //   selectAnswer:1,
          //   selectList: [{
          //     name: 'A',
          //     input:'input1',
          //   },
          //     {
          //       name: 'B',
          //       input:'input2',
          //     },
          //     {
          //       name: 'C',
          //       input:'input3',
          //     },
          //     {
          //       name: 'D',
          //       input:'input3',
          //     }
          //   ],
          // }
        ],
        answer:[]
      }
    }
  },
  onLoad(e){
    this.courseId = e.courseId
  },
  created() {
    try{
      const value = uni.getStorageSync('userLocalData');
      if(value){
        // console.log(value)
        this.userDt = JSON.parse(value)
      }
    }catch(e){}
  },
  methods:{
    submit(){
      // console.log(this.addHomeworkForm)
      let formData={}
      formData.courseRel = this.courseId
      formData.creatorId = this.userDt.id
      formData.homeworkName = this.addHomeworkForm.HwTitle
      formData.answer = JSON.stringify(this.addHomeworkForm.answer)
      formData.question = JSON.stringify(this.addHomeworkForm.mainInfo)
      console.log(formData)
      let that = this
      uni.request({
        method:'POST',
        url:global.commonLocalServer +"/homework/addHomework",
        header: {token: this.userDt.token},
        data:formData,
        success:function (res) {
          console.log(res)
        }
      })
    },

    addNewGapFill(){
      this.addHomeworkForm.mainInfo.push({
        question: '',
        // answer:'',
        type:'gapFill'
      })
      this.addHomeworkForm.answer.push('')
    },

    addNewThinking(){
      this.addHomeworkForm.mainInfo.push({
        question: '',
        type:'thinking'
      })
      this.addHomeworkForm.answer.push('ThinkQuestion!&$')
    },

    addNewSelect(){
      this.addHomeworkForm.mainInfo.push(
        {
          question:'',
          // answer:'',
          type:'select',
          // selectAnswer:'',
          selectList: [{
              name: 'A',
              input:'',
          },
          {
              name: 'B',
              input:'',
          },
          {
              name: 'C',
              input:'',
          },
          {
              name: 'D',
              input:'',
          }],

      })
      this.addHomeworkForm.answer.push('A')
    },
    deleteDynamic(index){
      this.addHomeworkForm.mainInfo.splice(index, 1)
      this.addHomeworkForm.answer.splice(index, 1)

    }
  }
}
</script>

<style scoped>
.form-content {
  padding: 30px;
}
</style>