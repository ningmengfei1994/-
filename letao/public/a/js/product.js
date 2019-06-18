$(function() {
    $.ajax({
        type: "get",
        url: "/product/queryProductDetailList",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function(res) {
            console.log(res);
            var html = template('productTpl', res);
            $('#bordered').html(html);



        }
    });

    // 获取二级分类
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function(res) {
            // console.log(res);
            var html = template('productTql', res);
            $('#proDesc').html(html);


        }
    });

    var imageArray = [];

    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            // console.log(data);

            imageArray.push(data.result);

        }
    });

    $('#addProduct').on('click', function() {

        var proName = $.trim($("[name='proName']").val());
        var oldPrice = $.trim($("[name='oldPrice']").val());
        var price = $.trim($("[name='price']").val());
        var proDesc = $.trim($("[name='proDesc']").val());
        var size = $.trim($("[name='size']").val());
        var num = $.trim($("[name='num']").val());
        var brandId = $.trim($("[name='brandId']").val());

        if (proName == 0) {
            alert('请输入产品名称');
            return;
        }
        if (proDesc == 0) {
            alert('请输入产品描述');
            return;
        }
        if (num == 0) {
            alert('请输入产品用户库存');
            return;
        }
        if (size == 0) {
            alert('请输入产品尺码');
            return;
        }


        if (oldPrice == 0) {
            alert('请输入老价格');
            return;
        }
        if (price == 0) {
            alert('请输入产品价格');
            return;
        }
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                brandId: brandId,
                statu: 1,
                pic: imageArray
            },
            success: function(res) {

                if (res.success) {

                    location.reload();

                } else {

                    alert(res.message);

                }

            }
        })

    });
})