// const { createProxyMiddleware } = require('http-proxy-middleware')
// export const baseURL = process.env.REACT_APP_URL
// console.log(baseURL);
// module.exports = function (app) {
//   app.use(
//     // 代理标识
//     '/api',
//     // 代理配置
//     createProxyMiddleware({
//       // 目标服务器地址
//       target: baseURL,
//       changeOrigin: true,
//       pathRewrite: {
// 		// 去掉接口中的 /api 前缀
//         '^/api': ''
//       }
//     })
//   )
// }
const { createProxyMiddleware } = require('http-proxy-middleware');
const baseURL = process.env.REACT_APP_URL
console.log(baseURL);
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: baseURL,
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};
