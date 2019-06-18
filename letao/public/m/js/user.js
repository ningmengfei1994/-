// 保存用户信息
var userInfo = null;

$.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    // 同步操作实现页面不闪出会员中心
    async: false,
    success: function(res) {
        // console.log(res);

        // 用户还没登录点击会员中心就先登录
        // 判断传回来的数据有error数据，或者error等于400，说明没有登录
        if (res.error && res.error == 400) {
            location.href = "login.html";
        }

        userInfo = res;






    }
});



$(function() {
    /**
     * 退出登录
     * 1.获取到退出登录按钮并添加点击事件
     * 2.调用退出登录接口实现 退出登录
     * 3.如果退出成功 跳转到首页
     */

    $('#logout').on('click', function() {

        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function(res) {
                // console.log(res);

                if (res.success) {
                    mui.toast("退出登录成功");
                    setTimeout(function() {
                        location.href = "index.html";
                    }, 2000)
                }

            }
        })

    });
    // 拼接模板
    if (userInfo) {
        var html = template('userTpl', userInfo);
        // 展示用户信息
        $('#userInfoBox').html(html);
    }



});