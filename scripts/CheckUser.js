/********
创建人：田想兵  博客：http://www.cnblogs.com/tianxiangbing/
创建日期:2010
个人主站：http://www.lovewebgames.com
联系QQ：55342775
************/
$(function () {
    jtip($(".txt_name"), "由6-16位英文字母及数字组成，首位为字母!", 3);
    jtip($(".txt_nickName"), "由至少2个的汉字或4个字母以上组成!", 3);
    jtip($(".txt_pwd"), "6-20位长度的字符组成!", 3);
    jtip($(".txt_QQ"), "QQ号码是好友找到您的最快捷方式!", 3);
    jtip($(".txt_email"), "修改密码的依据!", 3);

    var $inputText = $(".login_input");
    $inputText.each(function () {
        var colorTemp = $(this).css("background-color");
        $(this).focus(function () {
            $(this).css("background-color", "#FFF");
        });
        $(this).blur(function () {
            $(this).css("background-color", colorTemp);
        });
    });

    var v1 = false; var v2 = false; var v3 = false; var v4 = false; var v5 = false; var v6 = false; var v7 = false;
    ///用户名
    $(".txt_name").blur(function () {
        var valname = /^\w+$/;
        if (!valname.test($(".txt_name")[0].value)) { jtip($(".txt_name"), "格式错误,由数字、字母(不分大小写)或下划线组成，并只能以字母、和数字开头结尾。", 0); v1 = false; }
        else
            if ($(".txt_name")[0].value.length >= 6 && $(".txt_name")[0].value.length <= 16) {
                //                $.ajax({ cache: false, type: "POST", dataType: "html", url: "/UserCheck.ashx", data: { name: $.trim($(".txt_name").val()) }, success: function (r) {
                //                    //jtip($("#txt_name"), r, 1);                            
                //                    if (parseInt(r) > 0) {
                jtip($(".txt_name"), "", 1); v1 = true;
                //                    } else {
                //                        jtip($(".txt_name"), "该用户名已存在!", 0); v1 = false;
                //                    }
                //                }, error: function (ex) { jtip($("#txt_name"), "系统忙!", 0); v1 = false; }
                //                });
                //               $.post("UserCheck.ashx", { name: $.trim($("#txt_name").val()),rnd:new Date() }, function (r) { alert("a" + r); });
            } else {
                jtip($(".txt_name"), "用户名长度要在6-16位之间", 0); v1 = false;
            }
    });
    $(".txt_name").focus(function () {
        jtip($(".txt_name"), "请输入您的通行证，长度为6-16个字符，由数字、字母(不分大小写)或并只能以字母、和数字开头结尾。", 2);
    });
    $(".txt_nickName").focus(function () {
        jtip($(".txt_nickName"), "请输入您的昵称!", 2);
    });
    $(".txt_pwd").focus(function () {
        jtip($(".txt_pwd"), "请输入6-20位长度的密码", 2);
    });
    $(".txt_pwd_again").focus(function () {
        jtip($(".txt_pwd_again"), "请确认密码", 2);
    });
    ///密码
    $(".txt_pwd").blur(function () {
        if ($(this).val().length < 6 || $(this).val().length > 20) {
            jtip($(this), "密码长度应在6-20位之间", 0); v2 = false;
        } else { jtip($(this), "", 1); v2 = true; }
    });
    ///重复密码
    $(".txt_pwd_again").blur(function () {
        if ($(this).val() != $(".txt_pwd").val()) {
            jtip($(this), "两次密码输入的格式不一致!", 0); v3 = false;
        } else { jtip($(this), "正确!", 1); v3 = true; }
    });
    $(".txt_email").focus(function () {
        jtip($(".txt_email"), "如果您的密码遗失或者帐户被盗，可通过此邮箱获取密码信息并修改密码。请务必使用真实有效邮箱。", 2);
    });
    //邮箱
    $(".txt_email").blur(function () {
        var vali = /\w+@\w+[.]\w+/;
        if (vali.test($(this).val())) {
            jtip($(this), "", 1); v4 = true;
        } else {
            jtip($(this), "电子邮件的格式不正确!", 0); v4 = false;
        }
    });
    $(".txt_QQ").focus(function () {
        jtip($(".txt_QQ"), "为了保证您的帐户安全, 并且在帐号管理的多项操作中(例如：重置安全邮箱，设置二次密码等)都需要提供您的QQ号，请务必如实填写。未填写真实注册资料还将可能无法参与官方举办的任何活动。", 2);
    });
    ///姓名
    $(".txt_nickName").blur(function () {
        if ($(this).val().len() < 4 || $(this).val().len() > 20) {
            jtip($(this), "请正确填写昵称", 0); v5 = false;
        } else { jtip($(this), "", 1); v5 = true; }
    });
    $(".txt_Code").focus(function () {
        jtip($(".txt_Code"), "请填写验证码!", 2);
    });
    ///验证码
    $(".txt_Code").blur(function () {
        if ($(".txt_Code").val().length == 0) {
            jtip($(this), "请填写验证码!", 0); v7 = false;
        } else {
            var vali = /(^\w{4}$)/;
            if (vali.test($(this).val())) {
                jtip($(this), "", 1); v7 = true;
            } else {
                jtip($(this), "验证码格式不正确!", 0); v7 = false;
            }
        }
        // $("#jt_" + $(".txt_Code").attr("id")).css("left", parseInt(150));
    });
    $(".txt_QQ").blur(function () {
        var vali = /(^[1-9]\d{4,10}$)/;
        if (vali.test($(this).val())) {
            jtip($(this), "", 1); v6 = true;
        } else {
            jtip($(this), "QQ格式不正确!", 0); v6 = false;
        }
    });
    $(".btnSumbit").click(function () {
        $(".txt_name").blur();
        $(".txt_nickName").blur();
        $(".txt_pwd").blur();
        $(".txt_pwd_again").blur();
        $(".txt_email").blur();
        $(".txt_QQ").blur();
        $(".txt_Code").blur();
        if (v1 && v2 && v3 && v4 && v5 && v7) {
            return true;
        } else {
            return false;
        }
    });
});
