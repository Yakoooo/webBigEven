//这是jquery发请求时候的前置调用，
// 可以当成node。js的中间件概念
//提前拿到ajax的配置对象
$.ajaxPrefilter((options) => {
    //拼接地址
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // options.url = "http://www.liulongbin.top:3007" + options.url;

    //统一的请求头
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = { Authorization: localStorage.getItem("token") || '' }
    }

    options.complete = function (aa) {
        if (aa.responseJSON.status === 1 && aa.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})