$(function() {
    // 获取详细信息商品数据
    // 产品id
    var id = getParamsByUrl(location.href, 'id');
    // console.log(id);
    // 库存数量
    var kucunNum = 0;
    // 产品id
    var productId = 0;

    $.ajax({
        type: "get",
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function(res) {
            console.log(res);
            // 库存数量
            kucunNum = res.num;
            // 产品id
            productId = res.id;

            var html = template('productTpl', res);
            $('#product-box').html(html);
            // console.log(res);


            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
            console.log(gallery.slider());

        }
    });



    // 设置尺码点击效果样式
    var size = null;
    $('#product-box').on('tap', '.size span', function() {

        $(this).addClass('active').siblings('span').removeClass('active');

        // 用户选择的尺码
        size = $(this).html();

    });


    // 数量增加出减少
    // 设置输入数量的输入框
    var oInp = $('#inp');

    // 设置点击加号事件
    $('#increase').on('tap', function() {
        // 获取输入框的数量值
        var num = oInp.val();
        num++;
        if (num > kucunNum) {
            num = kucunNum;
        }
        oInp.val(num);

    })

    // 设置点击减号的事件
    $('#reduce').on('tap', function() {
        // 获取输入框的数量值
        var num = oInp.val();
        num--;
        if (num < 1) {
            num = 1;
        }
        oInp.val(num);

    })


    // 添加购物车页面
    // 设置点击事件
    $('#addCart').on('tap', function() {
        // 校验是否选择尺码
        if (!size) {
            alert('请选择尺码');
            return;
        }

        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: productId,
                num: kucunNum,
                size: size
            },
            success: function(res) {
                // console.log(res);
                if (res.success) {
                    mui.confirm("加入购物车成功,跳转到购物车?", function(message) {
                        if (message.index) {

                            // 跳转到购物车
                            location.href = "cart.html";

                        }
                    })
                }


            }
        });


    })














})