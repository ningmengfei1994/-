$(function() {
    // 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //    获取一级分类数据
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function(response) {
            // 获取后台数据
            var str = template("category1", response);
            // console.log(response);
            // 把接收的数据渲染到links里
            $('#links').html(str);

            // 当rows数据为真时默认选中第一项，渲染第一项数据
            if (response.rows.length) {
                // 获取第一个一级分类id
                var id = response.rows[0].id;
                // 给第一个添加样式
                $('#links').children('a').eq(0).addClass('active');
                // 传给二级分类获取数据
                category(id);

            }
        }

    });
    // 给一级分类添加点击事件
    $('#links').on('click', 'a', function() {
        // 获取点击过得id
        var id = $(this).attr('data-id');
        // 给点击过得一级分类添加样式
        $(this).addClass('active').siblings().removeClass('active');
        // 点击过得一级分类id传给日及分类获取数据
        category(id);
    })

    // 封装二级分类，让一级分类调用传入id
    function category(id) {
        // 获取二级数据分类
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: { 'id': id },
            success: function(response) {
                //   获取后台数据
                var html = template('category2', response);
                // console.log(response);
                // 渲染到ul中
                $('.brand-list').html(html);
            }
        });

    }

});