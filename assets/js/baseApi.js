//这是jquery发请求时候的前置调用，
// 可以当成node。js的中间件概念

$.ajaxPrefilter((options)=>{
    //拼接地址
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
})