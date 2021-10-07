$(function () {
    //定义q的页面数据-用于发服务器；

    const form = layui.form;
    const layer = layui.layer;
    const laypage = layui.laypage;

    q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    };

    init_List();
    init_title();

    //获取文章
    function init_List() {
        $.ajax({
            type: "GET",
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.massage)
                }
                console.log("获取成功")
                console.log(res)
                let mb = template('init_List', res);
                $('#art_tmp_list').html(mb);
                renderpage(res.total);
            }
        });
    }

    //获取分类
    function init_title() {
        $.ajax({
            type: "GET",
            url: '/my/article/cates',
            data: q,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.massage)
                }
                let ma = template('init_title', res);
                $('[name=cate_id]').html(ma);
                form.render();
            }
        });
    }

    $('#select_id').on('submit', function (e) {
        e.preventDefault()

        q.cate_id = $('[name=cate_id').val();
        q.state = $('[name=state').val();

        console.log(q);

        init_List();
    });

    function renderpage(tatoea) {
        console.log("渲染前页码" + q.pagenum)
        laypage.render({
            elem: 'pege_body',
            count: tatoea, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 6, 8],
            jump: function (obj, frist) {
                console.log('切换' + obj.limit)
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!frist) {
                    init_List();
                }
            }
        });
    }

    $('body').on('click', "#shanchu", function () {
        let len = $(".btn_delete").length;
        let artId = $(this).attr('artId');
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: '/my/article/delete/' + artId,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("删除成功");

                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum-1;
                    }
                    init_List();
                    layer.close(index);
                }
            })
        });
    })
})