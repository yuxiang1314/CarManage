const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  //devApi可改，是需要进行修改路径的后缀，会被pathRewrite替换重写
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000", //服务器地址
      changeOrigin: true,  //是否需要改变源主机头为目标的url
      pathRewrite: {
        //路径替换
        "^/api": "", // axios 访问/api2 == target + /api ， 重写请求，所有访问/api的请求，都会被解析为""的请求，然后直接请求到服务器的地址
      },
    })
  );
};

// 主要原理：把本地跑起来的服务理解为A，A发起请求，希望去自己所在的服务的/api路径下找到一个东西，但是该文件不存在，因此会报错。
// 但是此时来了一个代理商B，B可以帮助A转发请求，帮助A获取到真正想要获取到的资源。此时设置了约定，主要A发出的请求中带有/api，那么B就会帮助A转发，但是上述方法中，有一个pathRewrite方法，用于重写路径，此时会去掉存在的/api
