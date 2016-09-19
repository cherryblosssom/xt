// 用户信息
var project = {
		isTest : true
}
var user = {};

$.ajax({
    type: "POST",
    url: "../User/GetLoginUser",
    async: false,
    dataType: "json",
    success: function (data) {
        if (!data || data.length == 0) {
            location.href = "Login";
            return;
        }
        user = {
            id: data.ID,
            username: data.UserName,
            rolename: data.NickName,
            logintime: getNowFormatDate(),
            icon: data.Icon
        };
    },
    error: function () {
    	if(project.isTest){
    		user = {
    			      id: "1",
    			      username: "Lao Zheng",
    			      rolename: "老郑",
    			      logintime: getNowFormatDate(),
    			      icon: "/js/admin-lte/img/user2-160x160.jpg"
    			};
    	} else {
    		location.href = "/Home/Login";
    	}
    }
});

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

// 菜单信息
var menus = { "items": [{ name: "系统管理", url: "", icon: "", isEndNode: false, children: [
                                    { name: "用户管理", url: "/user/list", icon: "" },
                                    { name: "角色管理", url: "/role/list", icon: "" },
                                    { name: "菜单管理", url: "/menu/list", icon: "" }
                                ]
}
                        ]
};

// 渲染
var html = template('userinfo', user);
var userhtml = template('user', user);
var menuhtml = template('menu', menus);

document.getElementById('userinfo-box').innerHTML = html;
document.getElementById('user-box').innerHTML = userhtml;
document.getElementById('menu-box').innerHTML = menuhtml;

function exit() {
    if (confirm('确定注销当前用户吗？')) {
        location.href = '../login';
    }
}

$(function () {
    initView();
    initEvent();
});

// 初始化 视图
function initView() {
    $("#fixedlayout").trigger("click");
    $(window).resize(function () {
        $("#main-content").css({ height: $(".content-wrapper").height() + "px" });
        $("#main-content iframe").css({ height: $(".content-wrapper").height() - 105 + "px" });
    });
    $("#main-content").css({ height: $(".content-wrapper").height() + "px" });
    $("#main-content iframe").css({ height: $(".content-wrapper").height() - 105 + "px" });
//                             .attr("src","../home");
}

// 初始化 事件
function initEvent() {
}

function openTab(url,name) {
    $("#main-tabs li a").text(name);
    $("#main-content iframe").css({ height: $(".content-wrapper").height() - 105 + "px" })
                    .attr("src", url);
    // window.location.reload();
}