$(function() {
    // 获取二级分类
    // 当前页码
    var page = 1;
    // 显示条数
    var pageSize = 10;
    // 总页码数
    var totalPage = 0;

    getData();

    // 上一页
    $('#prevBtn').on('click', function() {
        page--;
        if (page < 1) {
            page = 1;
            alert('已经是第一页了');
            return;
        }
        getData();

    })

    // 下一页
    $('#nextBtn').on('click', function() {
        page++;
        if (page > totalPage) {
            page = totalPage;
            alert('已经最后一页了');
            return;
        }
        getData();
    })

    function getData() {
        // 发送请求
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(res) {
                // console.log(res);
                // 总页数
                totalPage = Math.ceil(res.total / pageSize);
                // console.log(totalPage);

                var html = template('categoryTpl', res);
                // console.log(html);

                $('#category-second').html(html);

            }
        });
    }



    // 添加分类
    // 获取一级分类名字
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },

        success: function(res) {
            console.log(res);
            var html = template('categoryFirstTpl', res);
            $('#categoryFirstBox').html(html);

        }
    });





    // 上传图片
    var previewImg = "";
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {

            console.log(data.result.picAddr);

            // 上传图片预览
            $('#preview').attr("src", data.result.picAddr);

            previewImg = data.result.picAddr;

        }
    });

    // 设置保存提交按钮
    $('#modal').on('click', function() {
        var categoryId = $.trim($('#categoryFirstBox').val());
        var brandName = $.trim($('#brandName').val());

        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: {
                categoryId: categoryId,
                brandName: brandName,
                brandLogo: previewImg,
                hot: 0
            },
            success: function(res) {
                // console.log(res);
                if (res.success) {
                    location.reload();
                }

            }
        });
    })

})