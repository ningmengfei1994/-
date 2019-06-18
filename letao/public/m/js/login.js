$(function() {
    // * 用户登录
    // * 1.获取登录按钮并且添加点击事件
    // * 2.获取到用户输入的表单信息
    // * 3.调用登录接口实现登录var email=$("#email").val();

    // * 4.如果用户登录成功跳转到会员中心
    $('#login-btn').on('click', function() {
        var password = $('#password').val();
        var username = $('#username').val();

        if (!username) {
            mui.toast("请输入用户名");
            return;
        }

        if (!password) {
            mui.toast("请输入密码");
            return;
        }

        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                password: password,
                username: username
            },
            beforeSend: function() {
                $('#login-btn').html("正在登录...");
            },
            success: function(res) {
                if (res.success) {
                    mui.toast("登录成功");

                    $('#login-btn').html("登录");

                    setTimeout(function() {
                        location.href = "user.html";
                    }, 2000);
                } else {
                    mui.toast("登录失败");
                    $('#login-btn').html('登录');
                }

            }
        })


    });
    // console.log(location.href);

});