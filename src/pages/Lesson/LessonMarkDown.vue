<template>
  <view>
    <view class="content">
      <joMarkdown :nodes="markdownData"></joMarkdown>
    </view>
<!--    <u-button @click="getFIle">dddd</u-button>-->
  </view>
</template>

<script>

import joMarkdown from '@/components/jo-markdown/decode.vue';
import markdownFunc from '@/components/jo-markdown/index.js';
import global from "@/common/common";
export default {
  name: "LessonMarkDown",
  components: {
    joMarkdown
  },
  data() {
    return {
      markdownData: {},
      md:"",
      fileUrl:''
    };
  },
  onLoad(e) {
    console.log('url赋值中')
    this.fileUrl = e.fileUrl
    this.getFIle()

    // this.markdownData = markdownFunc(markdown, 'markdown');
    // this.md = markdown
  },
  created() {
  },
  methods: {
    getFIle(){
      var that = this
      console.log('requesting')
      uni.request({
        url: global.storageUrl + that.fileUrl ,
        success: res => {
          console.log(res)
          that.markdownData = markdownFunc(res.data, 'markdown');
        }
      });
    }

  }
};

</script>

<style scoped>

</style>