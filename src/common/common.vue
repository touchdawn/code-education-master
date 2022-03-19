<template>

</template>

<script type="text/javascript">
// 定义一些公共的属性和方法
const httpUrl = 'http://39.105.17.99:8080/'

const storageUrl = 'http://r8otjafce.bkt.clouddn.com/'

const commonLocalhost = ""

const commonLocalServer = "http://localhost:8083"

function commonFun() {
  console.log("公共方法")
}
// 暴露出这些属性和方法
export default {
  httpUrl,
  storageUrl,
  commonLocalServer,
  commonFun
}
</script>

<style scoped>

</style>