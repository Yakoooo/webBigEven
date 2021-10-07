$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $('#filebtn').on('click', function () {
        console.log("触发时间")
        $('#file').click();
    })

    //指向一个文件选择器
    $("#file").on('change', function (e) {
        //获取文件
        var file = e.target.files[0]
        //转化为文件路径
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    $("#upLoadimg").on('click',function(e){
        e.preventDefault();

        var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data:{avatar:dataURL},
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败");
                }
                layer.msg('更新成功');
                window.parent.getuserinfo();
            }
        });
    } )
})