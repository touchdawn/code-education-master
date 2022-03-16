<template>
  <view>
    <text>message</text>
    <tab-bar :msg="msg"></tab-bar>
  </view>
</template>

<script>
import TabBar from "@/pages/commomComponent/tabBar";
export default {
  name: "message",
  components: {TabBar},
  data(){
    return{
      msg:1
    }
  }
}
</script>

<style scoped>

</style>