//计算长度
String.prototype.len=function() { return this.replace(/[^\x00-\xff]/g, "**").length; }
$(function () {
    var $inputText = $(".login_input");
    $inputText.each(function () {
        var colorTemp = $(this).css("background-color");
        $(this).focus(function () {
            $(this).css("background-color", "#FFF");
        }).blur(function () {
            $(this).css("background-color", colorTemp);
        }).hover(function () { $(this).css("background-color", "#FFF"); }, function () { $(this).css("background-color", colorTemp); });
    });
    dongtaiMore();
    function dongtaiMore() {
        if (document.getElementById("lookMore"))
            if ($(window).scrollTop() + $(window).height() > $("#lookMore").offset().top) {
                if ($("#lookMore").attr("status") != "loading") {
                    $("#lookMore").attr("status", "loading");
                    var url = $("#lookMore").attr("href");
                    var type = querystring(url, "type");
                    var page = parseInt(querystring(url, "page"));
                    var user = querystring(url, "user");
                    $.get("/ashx/getLog.ashx?type=" + type + "&page=" + page + "&user=" + user, {  }, function (result) {
                        if (result.length > 30) {
                            $("#lookMore").parent().before($(result));
                            $("#lookMore").attr("status", "");
                            $("#lookMore").attr("href", $("#lookMore").attr("href").replace(/page=\d/, "page=" + (page + 1)));
                        } else {
                            $(".lookMore").remove();
                        }
                    });
                }
            }
    }
    $(window).scroll(dongtaiMore);
})
var zIndex =0;
/////提示
function jtip(obj, value, status) {
    var obj = $(obj);
    var tipsArea = obj.parents(".form-item").children(".tips-area");

    if (tipsArea.children("#jt_" + obj.attr("id")).length == 0) {
        tipsArea.html("<span class='jtip' id='jt_" + obj.attr("id") + "'>" + value + "</span>");
    } else {
        $("#jt_" + obj.attr("id")).html(value);
    }
    switch (status) {
        case 0:
            $("#jt_" + obj.attr("id")).attr("class", "error_tip");
            break;
        case 1:
            $("#jt_" + obj.attr("id")).attr("class", "ok_tip");
            break;
        case 3:
            $("#jt_" + obj.attr("id")).attr("class", "nonetip");
            break;
        default:
            $("#jt_" + obj.attr("id")).attr("class", "tip");
            break;
    }
    $("#jt_" + obj.attr("id")).css("z-index", zIndex + 1);
    zIndex++;
    //$("#jt_" + $obj.attr("id")).css("top", getAbsoluteTop($(obj)[0]));
    //$("#jt_" + $obj.attr("id")).css("left", getAbsoluteLeft($(obj)[0]) + parseInt($(obj)[0].offsetWidth));

    //$obj.parent().css("position", "relative");
    //$("#jt_" + $obj.attr("id")).css("left", parseInt($(obj).get(0).offsetWidth) + 5);
    //$("#jt_" + $obj.attr("id")).css("top", "0px");
}
function getAbsoluteLeft(object) {
    // Get an object left position from the upper left viewport corner
    o =object
    oLeft = o.offsetLeft            // Get left position from the parent object
    while (o.offsetParent != null) {   // Parse the parent hierarchy up to the document element
        oParent = o.offsetParent    // Get parent object reference
        oLeft += oParent.offsetLeft // Add parent left position
        o = oParent
    }
    return oLeft
}
function getAbsoluteTop(object) {
    // Get an object top position from the upper left viewport corner
    o = object;
    oTop = 0;
    if (o.offsetParent) {
        o = o.offsetParent;
    }
    while (o) { // Parse the parent hierarchy up to the document element
        oTop += o.offsetTop; // Add parent top position
        o = o.offsetParent;
    }
    return oTop
}

function querystring(uri, val) {
    var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
    return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
}
function isnull(v, defaultValue) {
    if (v == null || !v)
        return defaultValue;
    else
        return v;
}
function add(username) {
    $.post("/ashx/friend.ashx", { act: "add", username: username }, function (r) {
        switch (parseInt(r)) {
            case -2:
                {
                    alert("请先登录!");
                } break;
            case 1:
                {
                    alert("加为好友申请成功!");
                } break;
            case 0:
            case -1:
                {
                    alert("操作失败!");
                } break;
            case 4:
                {
                    alert("自己不能加自己!");
                } break;
        }
    });
    return false;
}
function agreeFriend(fr_id) {
    $.post("/ashx/friend.ashx", { act: "agree", fr_id: fr_id }, function (r) {
        switch (parseInt(r)) {
            case -2:
                {
                    alert("请先登录!");
                } break;
            case -3:
                {
                    alert("黑名单成员!");
                } break;
            case 1:
                {
                    alert("操作成功!");
                } break;
            case 0:
                {
                    alert("无该条申请记录!");
                } break;
            case -9:
                {
                    alert("已是好友!");
                } break;
        }
    });
    return false;
}
//忽略
function Ignore(fr_id) {
    $.post("/ashx/friend.ashx", { act: "Ignore", fr_id: fr_id }, function (r) {
        switch (parseInt(r)) {
            case -2:
                {
                    alert("请先登录!");
                } break;
            case 1:
                {
                    alert("操作成功!");
                } break;
            case 0:
                {
                    alert("已是好友，无法忽略!");
                } break;
            case -1:
                {
                    alert("操作失败!");
                } break;
        }
    });
    return false;
}