<template>

</template>

<script type="text/javascript">
// 定义一些公共的属性和方法
const httpUrl = 'http://39.105.17.99:8080/'

const storageUrl = 'http://ra2q5rhzl.hd-bkt.clouddn.com/'
// const storageUrl = 'http://r9pcezjhx.bkt.clouddn.com/'

const commonLocalhost = ""

// const commonLocalServer = "http://192.168.50.149:8083"
const commonLocalServer = "http://touchdawn.asuscomm.com:8083"

function commonFun() {
  console.log("公共方法")
}

function getLocalUserToken() {
  try{
    const value1 = uni.getStorageSync('userLocalData');
    if(value1){
      // console.log(JSON.parse(value1))
      return JSON.parse(value1).token
    }
  }catch(e){}
}

function getUploadToken(){
  let that = this
  let token = this.getLocalUserToken()
  uni.request({
    url:that.commonLocalServer+"/files/getToken",
    method:"GET",
    header:{
      'token': token
    },
    success:function(res){
      console.log(res)
      return res
     }
  })
}

function isEmpty (obj) {
  if (!obj && obj !== 0) { return true }
  if (typeof obj === 'string') {
    return obj === ''
  } else if (obj instanceof Array) {
    return obj.length === 0
  }
  return false
}
// 暴露出这些属性和方法
export default {
  httpUrl,
  storageUrl,
  commonLocalServer,
  commonFun,
  getUploadToken,
  getLocalUserToken,
  isEmpty
}
</script>

<style scoped>

</style>