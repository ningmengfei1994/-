$(function() {
    // 当前页数
    var page = 1;
    // 每页条数
    var pageSize = 10;
    // 总页数
    totalPage = 0;
    getData();

    //下一页	
    $('#next').on('click', function() {

        page++;

        if (page > totalPage) {

            page = totalPage;

            alert('已经是最后一页了');

            return;
        }

        getData();

    });


    //上一页	
    $('#prev').on('click', function() {

        page--;

        if (page < 1) {

            page = 1;

            alert('已经是第一页了');

            return;
        }

        getData();

    });




    // 封装发送数据
    function getData() {
        $.ajax({
            type: "get",
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },

            success: function(res) {
                console.log(res);

                // 总页数
                totalPage = Math.ceil(res.total / pageSize);
                var html = template("categoryFirstTpl", res);

                $('#categoryFirstBox').html(html);

            }
        });
    }


    /**
     * 添加一级分类
     * 1.获取一级分类保存按钮 并添加点击事件
     * 2.获取用户输入的分类名称 并且检验
     * 3.调用添加一级分类接口 实现功能
     * 4.刷新页面
     */
    $('#save').on('click', function() {
        // 获取输入数据
        var categoryFirstName = $.trim($('#categoryFirstName').val());
        if (!categoryFirstName) {
            alert('请输入添加的一级分类名称');
            return;
        }


        $.ajax({
            type: "post",
            url: '/category/addTopCategory',
            data: {
                categoryName: categoryFirstName
            },
            success: function(res) {
                // console.log(res);
                // 判断成功后刷新
                if (res.success) {
                    // 添加成功刷新页面
                    location.reload();
                }

            }
        });
    })

})