$(function(){
    const form = layui.form;
    const layer = layui.layer;

    form.verify({
        pwd:[/^[\S]{6,12}$/,'输入在6-12位之间'],
        newpadverify:function(vuale){
            if( $("[name='oldPwd']").val() === vuale){
                return "两次密码一致"
            }
        },
        repadverify:function(vuale){
            if( $("[name='newpwd']").val() == vuale){
                console.log($("[name='newPwd']").val())
                console.log(vuale)
                console.log($("[name='newpwd']").val() == vuale)
                return "两次密码不一致"
            }
        },
    });

    $('.layui-form').on("submit",function(e){

        e.preventDefault();

        console.log("运行了方法");
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败");
                }

                layer.msg('更新成功');

                $('.layui-form')[0].reset();
            }
        });
    })
})