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
    this.fileUrl = e.fileUrl

    // this.markdownData = markdownFunc(markdown, 'markdown');
    // this.md = markdown
  },
  created() {
    this.getFIle()
  },
  methods: {
    getFIle(){
      var that = this
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