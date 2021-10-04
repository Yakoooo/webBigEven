$(function () {
    $('#link-login').on('click', function () {
        $('.loginbox').hide();
        $('.regbox').show();
    });
    $('#link-reg').on('click', function () {
        $('.loginbox').show();
        $('.regbox').hide();
    });

    //获取layui对象
    const form = layui.form;
    const layer = layui.layer;
    // 设定规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须到6到12位，不能有空格'],
        repwd: function (value) {
            let sum = $('.regbox [name=password]').val();
            console.log(sum)
            if (sum != value) {
                return "两次密码不一样"
            }
        }
    });

    //监听注册表单的提交事件
    $('#regSubmit').on('submit', (e) => {
        //阻止默认行为
        e.preventDefault();
        //发请求
        $.post('/api/reguser',
            { username: $('.regbox [name=user]').val(), password: $('.regbox [name=password]').val() },
            (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功");
                //模拟点击事件
                $('.links').click();
            })
    })

    //监听登录的提交事件
    $('#loginSubmit').on('submit', (e) => {
        //阻止默认行为
        e.preventDefault();
        //发请求
        $.post('/api/login',
            { username: $('.loginbox [name=user]').val(), password: $('.loginbox [name=password]').val() },
            (res) => {
                if (res.status != 0) {
                    return layer.msg('登录失败');
                }
                layer.msg("登录成功");

                localStorage.setItem("token",res.token);

                location.href = '/index.html'
            })
    })
})