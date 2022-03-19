// // create an axios instance
// import Vue from 'vue'
// import axios from "axios";
// import global from "@/common/common";
//
// const service = axios.create({
//     baseURL:global.commonLocalServer , // url = base url + request url
//     withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
//     timeout: 6000, // request timeout
//     crossDomain: true
// })
//
//
// // request拦截器,在请求之前做一些处理
// service.interceptors.request.use(
//     config => {
//         var localStorage = JSON.parse(window.localStorage.getItem("userLocalData"))
//         console.log(localStorage)
//         if (localStorage !== '' && localStorage !== null && localStorage !== undefined) {
//             // 给请求头添加user-token
//             config.headers["token"] =JSON.parse(window.localStorage.getItem("userLocalData")).data.token;
//         }
//         console.log('请求拦截成功')
//         return config;
//     },
//     error => {
//         console.log(error); // for debug
//         return Promise.reject(error);
//     }
// );
// //配置成功后的拦截器
// service.interceptors.response.use(res => {
//     console.log(res)
//     if (res.data.sign === "registerSuccess") {
//         return res
//     } else {
//         return Promise.reject(res.data.msg);
//     }
// }, error => {
//     // if (error.response.status) {
//     //     switch (error.response.status) {
//     //         case 401:
//     //             break;
//     //         default:
//     //             break;
//     //     }
//     // }
//     return Promise.reject(error)
// })
//
//
//
// axios.defaults.adapter = function(config) {
//     return new Promise((resolve, reject) => {
//         console.log(config)
//         var settle = require('axios/lib/core/settle');
//         var buildURL = require('axios/lib/helpers/buildURL');
//         uni.request({
//             method: config.method.toUpperCase(),
//             url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
//             header: config.headers,
//             data: config.data,
//             dataType: config.dataType,
//             responseType: config.responseType,
//             sslVerify: config.sslVerify,
//             complete: function complete(response) {
//                 console.log("执行完成：", response)
//                 response = {
//                     data: response.data,
//                     status: response.statusCode,
//                     errMsg: response.errMsg,
//                     header: response.header,
//                     config: config
//                 };
//
//                 settle(resolve, reject, response);
//             }
//         })
//     })
// }
//
// // export default service
