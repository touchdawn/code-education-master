<template>
  <u-tabbar
      :value="nowPage"
      @change="change1"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="false"
  >
    <u-tabbar-item text="首页" icon="home" @click="click0" ></u-tabbar-item>
    <u-tabbar-item text="消息" icon="chat" @click="click1" ></u-tabbar-item>
    <u-tabbar-item text="我的" icon="account" @click="click2" ></u-tabbar-item>
  </u-tabbar>
</template>

<script>
export default {
  props:{
    msg:Number
  },
  name: "tabBar",
  data(){
    return{
      nowPage:-2,
    }
  },
  created() {
    console.log(this.msg)
    this.nowPage=this.msg
  },
  methods: {
    click0(info) {
      if (info !== this.nowPage) {
        uni.navigateTo({
          url: '/pages/index/index'
        });
      }
    },

    click1(info){
      if (info !== this.nowPage) {
        uni.navigateTo({
          url: '/pages/message/message'
        });
      }
    },
    click2(info) {
      if (info !== this.nowPage) {
        uni.navigateTo({
          url: '/pages/personInfo/personInfo'
        });
        // this.nowPage = 2
      }
    },
    change1(info){
      // // console.log("okk")
      // console.log(info)
      // this.nowPage = info
      // if (info === 1) {
      //   uni.redirectTo({
      //     url: '/pages/message/message'
      //   });
      // } else if (info === 0) {
      // uni.redirectTo({
      //   url: '/pages/index/index'
      // });
      // }else if (info === 2) {
      //   uni.redirectTo({
      //     url: '/pages/login/login'
      //   });
      // }
    },
  }
}
</script>

<style scoped>

</style>