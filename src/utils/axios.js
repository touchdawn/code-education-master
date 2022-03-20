// import Vue from 'vue’
// import axios from 'axios’
//
// // create an axios instance
// const service = axios.create({undefined
//     baseURL: 'https://simplicity.sankuanedu.com’, // url = base url + request url
// //withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
//     timeout: 6000, // request timeout
//         crossDomain: true
// })
//
// // request拦截器,在请求之前做一些处理
// service.interceptors.request.use(
//     config => {undefined
// // if (store.state.token) {undefined
// // // 给请求头添加user-token
// // config.headers[“user-token”] = store.state.token;
// // }
//         console.log('请求成功’)
//         return config;
//     },
//     error => {undefined
//         console.log(error); // for debug
//         return Promise.reject(error);
//     }
// );
//
// //配置成功后的拦截器
// // service.interceptors.response.use(res => {undefined
// // if (res.data.status<=350) {undefined
// // return res.data
// // } else {undefined
// // return Promise.reject(res.data.msg);
// // }
// // }, error => {undefined
// // if (error.response.status) {undefined
// // switch (error.response.status) {undefined
// // case 401:
// // break;
// // default:
// // break;
// // }
// // }
// // return Promise.reject(error)
// // })
