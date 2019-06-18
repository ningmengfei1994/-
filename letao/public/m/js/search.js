$(function() {

    /*
    	实现用户点击搜索按钮跳转到搜索结果页
    		
    		1.给搜索按钮添加点击事件
    		2.获取用户输入的搜索关键字
    		3.判断用户是否输入了搜索关键字
    		4.如果用户没有输入 阻止跳转 并且给出提示
    		5.如果用户输入了 跳转到搜索结果页面 并且要将用户输入的关键字带到这个页面去

    */

    $('#search-btn').on('click', function() {

        // 用户输入的搜索关键字
        var keyword = $('#keyword').val();

        // 用户输入了关键字
        if (keyword == "") {
            alert('请输入搜索商品的关键字');
            return;
        } else {
            // 将用户输入的关键字存到数组中
            keyArr.push(keyword);

            // 将关键字数组存储在本地，把数组包装成字符串
            localStorage.setItem('keyArr', JSON.stringify(keyArr));
            // 输入关键字后跳转的界面
            location.href = "search-result.html?keyword=" + keyword;
        }

    });


    /*
    	实现历史关键字存储

    		1.准备一个存储关键字的数组
    		2.当用户点击搜索按钮的时候 将用户输入的关键字追加到数组中
    		3.将数组存储在本地存储中
    		4.在页面一上来的时候 判断本地存储中是否有已经存储的关键字
    		5.将数据和HTML拼接 将数据展示在页面中

    */

    // 存储关键字的数组
    var keyArr = [];
    // 判断本地储存里有keyArr这一项的话
    if (localStorage.getItem('keyArr')) {
        // 把用户输入的关键字包装成数组
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        // 把用户输入的光健字包装成数组
        var html = template('historyTpl', { result: keyArr })
            // 把用户输入的关键字渲染到ul中
        $('#history-box').html(html);

    }

    /*
    	实现清空历史

    		1.给元素添加点击事件
    		2.清空页面中的数据 清空本地存储中的数据
    */

    $('#clearBtn').on('click', function() {
        // 点击清空历史按钮把ul中历史输入清空
        $('#history-box').html("");

        localStorage.removeItem("keyArr");

    });


});