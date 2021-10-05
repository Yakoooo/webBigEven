$(() => {
    //引入
    const form = layui.form;
    const layer = layui.layer;

    //类似过滤器
    form.verify({
        nameLength: function (value) {
            if (value.length > 6) {
                return '长度不能大于6'
            }
        }
    });

    //获取用户信息
    getUserInfo();

    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("获取用户信息失败")
                }
                console.log(res);

                form.val('user_tab_info', res.data);
            }
        })
    }

    $("#btn").on('click', function (e) {
        e.preventDefault();
        //调用方法获取用户信息覆盖
        getUserInfo();
    });

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败");
                }
                console.log($('.layui-form').serialize())

                // layer.msg('更新成功');

                window.parent.getuserinfo();
            }
        });
        
    })
});