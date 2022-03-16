<template>
  <tab-bar :msg="msg"></tab-bar>
</template>

<script>
import TabBar from "@/pages/commomComponent/tabBar";

export default {
  name: "personInfo",
  components: {TabBar},
  data(){
    return {
      msg:2
    }
  }
}
</script>

<style scoped>

</style>