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
export default {
  name: "LessonMarkDown",
  components: {
    joMarkdown
  },
  data() {
    return {
      url: 'http://r8otjafce.bkt.clouddn.com/test3.md',
      markdownData: {},
      md:"",
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
        url: 'http://r8otjafce.bkt.clouddn.com/test3.md',
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