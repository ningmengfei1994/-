$(function() {


    // 获取验证码
    $('#getCode').on('tap', function() {
        $.ajax({
            type: "get",
            url: '/user/vCodeForUpdatePassword',
            success: function(res) {
                // 将认证码显示在控制台中
                console.log(res);
            }
        });
    });
    /**
     * 修改密码
     * 1.获取修改密码按钮并添加点击事件
     * 2.获取用户输入的信息
     * 3.对用户输入的信息做校验
     * 4.调用修改密码接口 实现修改密码功能
     * 5.跳转到登录页面 重新登录
     */
    // 设置点击事件
    $('#modify-btn').on('tap', function() {
        // 获取需要传的参数
        // 原密码
        var originPass = $('#originPass').val();
        // 第一遍密码
        var newPass = $('#newPass').val();
        // 确认密码
        var confirmNewPass = $('#confirmNewPass').val();
        // 认证码
        var vCode = $('#vCode').val();


        // 判断校检
        // 判断原密码不为空
        if (!originPass) {
            mui.toast('请输入原密码');
            return;
        };
        // 判断两次密码输入的是否一致
        if (newPass != confirmNewPass) {
            mui.toast('两次输入密码不一致');
            return;
        };
        // // 判断认证码不为空
        // if (!vCode) {
        //     mui.toast('请输入认证码');
        //     return;
        // };

        // 发送请求
        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function(res) {
                if (res.success) {

                    mui.toast("修改密码成功");

                    setTimeout(function() {
                        location.href = "login.html";
                    }, 2000)
                }
            }
        });
    })



})