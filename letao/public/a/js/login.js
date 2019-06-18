// 判断是否登录状态
$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    async: false,
    success: function(res) {
        if (res.success) {
            location.href = 'user.html';
        }
    }
});

$(function() {

    // 设置点击事件
    $('#login-button').on('click', function() {
        // 获取用户名密码
        var username = $.trim($('#username').val());
        var password = $.trim($('#password').val());

        // 校验
        if (!username) {
            alert('请输入用户名');
            return;
        }
        if (!password) {
            alert('请输入密码');
            return;
        }

        // 发送ajax
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: {
                username: username,
                password: password
            },

            success: function(res) {
                console.log(res);
                if (res.success) {

                    location.href = "user.html";
                }
                if (res.message) {
                    alert("用户名不存在! ");
                }

            }
        });
    })






})