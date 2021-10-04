//用法：不用触发直接调用里面的函数；
$(function () {
    getuserinfo();
});

function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem("token") || ''
        },
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            renderAvater(res.data);
        },
        //挂载进同一文件
        // complete:function(aa){
        //     if(aa.responseJSON.status === 1 ||aa.responseJSON.message=="身份认证失败！"){
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
};

//替换名字和头像
function renderAvater(userdata) {
    let name = userdata.nickname || userdata.username;
    $('#wlecaom').html("欢迎" + name);
    console.log(userdata.user_pic);
    if (userdata.user_pic !== null) {
        //attr属性可以替换属性
        $(".layui-nav-img").attr('src', userdata.user_pic).show();
        $(".avava").hide();
    } else {
        let usernameonr = userdata.username[0];
        $(".avava").html(usernameonr).show();
        $(".layui-nav-img").hide();

    }
}

let layer = layui.layer;
//点击按钮触发退出；
$('#btntc').on('click', function () {
    layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
    });
})