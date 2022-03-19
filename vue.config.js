// vue.config.js，如没有此文件则手动创建
module.exports = {
    transpileDependencies: ['uview-ui'],

        // devServer:{
        //     port:'8083',
        //     disableHostCheck:true,
        //     proxy:{
        //         '/dpc':{
        //             target:'http://localhost:8083',
        //             changeOrigin:true,
        //             pathRewrite:{
        //                 '^/dpc': ''
        //             }
        //         }
        //     }
        // }


//         devServer: {
//             open: true,
//             overlay: {
//                 warnings: false,
//                 errors: true
//             },
//             // 3.开发环境进行http的代理
//             //  ========关键部分=========
//             proxy: {
//                 // 匹配 url 路径的开头
//                 '/api': {
// // 标识符号（自定义）  请求的路径只要是/api开头都会代理到下面这个target网站。
// // 例如：'/api/xxxx' 会代理到 http://localhost:8095/api/xxxx
//                     target: 'http://localhost:8083',     //请求的接口的基本路径
//                     changeOrigin: true,    //是否修改请求头中的host
//                     pathRewrite: { '^/api': '/' }          //标识符重写（重要！在后端接收到请求的接口路径时要把前端添加的'/api'标识符去掉，不然找不到对应的接口）
//                 }
//             }
//         },
//         //  ========关键部分=========
//         configureWebpack: () => {},


}