
function addfavorite() {
    if (document.all) {
        window.external.addFavorite(window.location.href, "五子棋www.lovewebgames.com");
    }
    else if (window.sidebar)
    { window.sidebar.addPanel('五子棋www.lovewebgames.com', window.location, ""); }
}
$(document).ready(function () {
    //setTimeout(function () { window.open("http://www.lovewebgames.com"); }, 600000);
    $("body").append("本游戏仅供学习用，版权归<a href='http://www.lovewebgames.com' target='_blank'>爱上网页游戏</a>所有,交流QQ群:5678537(满),70210212,12940903;请<a href='javascript:addfavorite()'>收藏本站</a>");
//    $.post("act.ashx", { act: "getUrl" }, function (rr) {
//        //alert(rr);
//        //var currUrl = "localhost:3056";
//        var currUrl = "www.lovewebgames.com";
//        if (rr != currUrl) {
//            window.location = "http://www.lovewebgames.com";
//        }
//    });
    var play = 1; //1是黑棋;
    var status = 0; //0是等待,1是开始,2是自己下
    var map; //map定时器
    var time; //定时获取游戏是否开始或结束
    var timePlay; //定时获取用户列表
    LoadMap();
    function LoadMap() {
        $("#qp").html("");
        //13*13;
        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 19; j++) {
                $("#qp").append('<div class="Lattice" name="0" cords="' + i + ',' + j + '"></div>');
            }
        }
        $("#qp>.Lattice").click(function () {
            if ($(this).attr("name") == "0" && status == 2) {
                status = 1;
                if (play == 1) {
                    $(this).addClass("back2");
                } else {
                    $(this).addClass("white2");
                }
                document.title = "~_~等待对方走...";
                goto($(this));
            }
        });
    }
    $("#AdmitDefeat").click(function () {
        if (status != 0) {
            $.post("act.ashx", { act: "AdmitDefeat", username: $("#username").val(), play: play }, function () {
                alert("您已认输!");
            });
        }
    });
    $("#ready").click(function () {
        if ($("#username").val().length != 0) {
            $.post("act.ashx", { act: "changeStatus", value: "1", username: $("#username").val() }, function (r) {            
                if (parseInt(r) == 2) {
                    //getmap();
                    alert("回到游戏");
                    $("#ready").css("display", "none");
                    status = 1;
                    getPlay();
                }
                if (parseInt(r) == -2) {
                    alert("游戏正在进行");
                    status = 0;
                }
                if (parseInt(r) == 1) {
                    status = 1;
                    alert("游戏开始，黑棋先走");
                    $("#ready").css("display", "none");
                    $("#AdmitDefeat").css("display", "");
                    getPlay();
                }
                if (parseInt(r) == 0) {
                    status = 1;
                    alert("等待对方开始游戏");
                    $("#ready").css("display", "none");
                    $("#AdmitDefeat").css("display", "");
                }
                getPlayer();
            })
        } else {
            $("#username").focus();
            alert("请输入用户昵称!");
        }
    });
    function getPlay() {
        $.post("act.ashx", { act: "getPlay", username: $("#username").val() }, function (res) {
            if (status != 0) {
                play = res;
                if (play == 1) {
                    $("#role").html("我是黑棋选手");
                } else {
                    $("#role").html("我是白棋选手");
                    play = 2;
                }
            }
        });
    }
    function getGotoPlay() {
        $.post("act.ashx", { act: "getGotoPlay" }, function (a) {
            var b = a.split(",")[0];
            var c = a.split(",")[1];
            if (parseInt(b) == 1) {
                $("#tip").html("由黑棋下");
            } else {
                $("#tip").html("由白棋下");
            }
            if (parseInt(b) == play && status != 0) {
                status = 2;
                document.title = "^.^该我走了....";
            } else {
                document.title = "~_~等待对方走...";
            }
            $("#scoll").css("width", c * 10);
            //$("#scoll").animate({ width: "600px" }, 60000 - c * 1000);
        });
    }
    function goto(obj) {
        //alert(play);
        $.post("act.ashx", { act: "goto", username: $("#username").val(), cords: $(obj).attr("cords"), play: play }, function (a) {
            if (a > 0) {
                a = a == 3 ? 1 : 2;
                stop(a);
            }
        });
    }
    function getmap() {
        $.post("act.ashx", { act: "getMap" }, function (arr) {
            draw(arr);
        });
    }
    function getInfo() {
        //getPlay();
        if (status != 0) {
            getGotoPlay();
        }
    }
    function getPlayer() {
        $.post("act.ashx", { act: "getPlayer" }, function (a) {
            var str = a.split("|");
            $("#online").html("");
            for (var i = 0; i < str.length - 1; i++) {
                var color = str[i].split(",")[1] == 1 ? "黑棋" : "白棋";
                var playstatus = str[i].split(",")[2] == 1 ? "已准备" : "围观";
                $("#online").html($("#online").html() + "<br/>用户：" + str[i].split(",")[0] + ";颜色：" + color + ";状态：" + playstatus);
            }
        });
    }
    function isStart() {
        $.post("act.ashx", { act: "isStart" }, function (a) {
            var b = a.split(',')[0];
            if (parseInt(b) == 1) {
                clearInterval(time);
                getPlay();
                info = setInterval(getInfo, 5000);
                if (status != 0) {
                    map = setInterval(getmap, 5000);
                } else {
                    map = setInterval(getmap, 6000);
                }
                time = setInterval(isOver, 5000);
            } else {
                $("#ready").css("display", "");
            }
        });
    }
    function isOver() {
        clearInterval(time);
        $.post("act.ashx", { act: "isStart" }, function (a) {
            //alert(a);
            if (parseInt(a.split(",")[0]) == 0) {
                //alert(a);
                var winner = parseInt(a.split(",")[1]);
                stop(winner);
                document.title = "游戏已结束，请重新准备";
            } else {
                time = setInterval(isOver, 5000);
            }
        });
    }
    function stop(a) {
        status = 0;
        clearInterval(time);
        clearInterval(map);
        time = setInterval(isStart, 5000);
        $("#ready").css("display", "");
        $("#AdmitDefeat").css("display", "none");
        if (a == play) { alert("你经过千山万水，终于取得了最后的胜利!"); }
        else {
            var showname = (a == 1 || a == 3) ? "黑棋" : "白棋";
            alert("让人感到意外的是竟然[" + showname + "]获得了最后的胜利，真是世事无常啊!");
        }
        LoadMap();
        getPlayer();
    }
    function draw(arr) {
        var str = arr.split("|");
        LoadMap();
        //$("#qp").html("");
        for (var i = 0; i < 19; i++) {
            var s = str[i].split(",");
            for (var j = 0; j < 19; j++) {
                if (s[j] != "0") {
                    $("[cords='" + i + "," + j + "']").attr("name", s[j]);
                }
                //$("#qp").append('<div class="Lattice" name="' + s[j] + '" cords="' + i + ',' + j + '"></div>');
            }
        }
        $("[name='1']").addClass("back");
        $("[name='2']").addClass("white");
        $("[name='3']").addClass("back2");
        $("[name='4']").addClass("white2");
    }
    isStart();
    getPlayer();
    var info;
    time = setInterval(isStart, 5000);
    timePlay = setInterval(getPlayer, 10000);
    $("#chat").html(' <iframe src="http://www.lovewebgames.com/chat.aspx?w=400&h=300" frameborder="0" style="height:320px;width:300px; overflow:hidden;" scrolling="no"></iframe>');
    //$("#cnzz").html('<script src="http://s16.cnzz.com/stat.php?id=2348521&web_id=2348521&show=pic" language="JavaScript"></script>');
});