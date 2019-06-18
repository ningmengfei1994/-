$(function() {
    var isEdit = Number(getParamsByUrl(location.href, 'isEdit'));
    if (isEdit) {
        // 编辑操作
        if (localStorage.getItem("editAddress")) {
            var address = JSON.parse(localStorage.getItem("editAddress"));
            var html = template("editTpl", address);
            $('#editForm').html(html);
        }
    } else {
        // 添加操作
        var html = template("editTpl", {});
        $('#editForm').html(html);
    }





    // 三级联动
    // 创建picker选择器
    var picker = new mui.PopPicker({ layer: 3 });

    // 为picker选择器添加数据
    picker.setData(cityData);

    // 当用户敲击文本框的时候
    $('#selectCity').on('tap', function() {

        // 显示picker选择器
        picker.show(function(selectItems) {

            // 将用户选择的内容显示在文本框中
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });

    });

    // 实现添加收货地址
    /**
     * 添加收货地址
     * 1.获取收货地址管理按钮并且添加点击事件
     * 2.获取用户输入的表单信息
     * 3.对用户输入的表单信息进行校验
     * 4.调用添加收货地址接口 实现功能
     * 5.跳转回收货地址列表页面
     */
    $('#addAddress').on('tap', function() {
        // 收货人姓名
        var username = $('#username').val();
        // 邮政编码
        var postCode = $('#postCode').val();
        // 联动选项
        var selectCity = $('#selectCity').val();
        // 详细地址
        var detail = $('#detail').val();


        // 校检
        // 校检收货人姓名
        if (!username) {
            mui.toast("请输入收货人姓名");
            return;
        }
        // 校检邮政编码
        if (!postCode) {
            mui.toast("请输入邮政编码");
            return;
        }

        var data = {
            address: selectCity,
            addressDetail: detail,
            recipients: username,
            postcode: postCode
        };


        if (isEdit) {
            // 编辑操作
            var url = '/address/addAddress';
            data.id = address.id;
        } else {
            // 添加操作
            var url = '/address/addAddress';
        }

        // 发送请求
        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function(response) {
                console.log(response);

                if (response.success) {
                    if (isEdit) {
                        mui.toast("添加修改成功");
                    } else {
                        mui.toast("添加添加成功");
                    }
                    // 两秒后跳转adress页面
                    setTimeout(function() {
                        location.href = "adress.html";
                    }, 2000)

                }

            }
        });

    })
})