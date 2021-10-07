$(function () {

    const form = layui.form;
    const layer = layui.layer;

    init_add();

    function init_add() {
        $.ajax({
            type: "GET",
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.massage)
                }
                let tmp = template('init_tmp', res)
                $("#art_tmp_list").html(tmp)
            }
        });
    }

    //添加弹出层
    let addIndex = null;
    $("#btnAddCate").on('click', function () {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $("#tmpAdd").html()
        });
    });

    //编辑弹出层
    let aeditIndex = null;
    $("body").on('click', '.btn_eidt', function () {
        aeditIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $("#tmpedit").html()
        });

        let artId = $(this).attr('edit_id');

        if (artId < 0) {
            layer.close(aeditIndex);
            return layer.msg("id异常");
        }

        $.ajax({
            method: "GET",
            url: '/my/article/cates/' + artId,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("该分类异常")
                }
                form.val('tmpedit_val', res.data)
            }
        })

    });

    //添加类别
    //id选择器 id 获取代理，因为这个表格是动态渲染的，用一个任意父级代理
    $('body').on('submit', '#tmpAdd_body', function (e) {

        e.preventDefault();

        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("添加失败")
                }
                layer.msg("添加成功");

                layer.close(addIndex);

                init_add();
            }
        })
    });

    //修改类别
    //id获取代理，因为这个表格是动态渲染的，用一个任意父级代理
    $('body').on('submit', '#tmpedit_body', function (e) {

        e.preventDefault();

        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("更新失败")
                }
                layer.msg("更新成功");

                layer.close(aeditIndex);

                init_add();
            }
        })
    });

    //删除
    $("body").on('click', '.btn_delete', function () {
        console.log('触发')
        let artId = $(this).attr('edit_id');

        if (artId < 0) {
            layer.close(aeditIndex);
            return layer.msg("id异常");
        }

        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: '/my/article/deletecate/' + artId,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg(tres.massage)
                    }
                    layer.msg("删除成功");
                    layer.close(index);
                    init_add();
                }
            })
        });

    });
})