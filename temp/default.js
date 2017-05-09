/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-10-09
 * Time: 14:23:23
 * Contact: 55342775@qq.com
 */
var Temp = Temp || {};
Temp.top = "<div id=\"head\">\
<div id=\"directory\" class=\"fl \">目录：<a href=\"#index\" class=\"actived\" data-callback=\"index\">首页</a><a href=\"#publish\" data-callback=\"publish\" data-usejs=\"news\" class=\"\">发布文章</a><a href=\"#publishActive\" data-callback=\"publishActive\" data-usejs=\"activeNew\" class=\"\">发起活动</a></div>\
{{#equals state true}}\
<a href=\"javascript:void(0);\">{{userInfo.email}}</a> 登陆时间：{{userInfo.lastlogindate}} \
 <a id=\"loginout\" href=\"javascript:void(0);\">注销</a>\
{{else}}\
<a id=\"login\" href=\"javascript:void(0);\">登录</a> \
<a id=\"regist\" href=\"javascript:void(0);\">注册</a>\
{{/equals}}\
</div>";
Temp.bottom = "<div id=\"foot\">\
{{date}}\
</div>";
Temp.login="\
        <div id=\"dv_login\" class=\"\">\
            <table width=\"400px\">\
                <tr>\
                    <td class=\"lable\">用户名：</td>\
                    <td><input type=\"text\" required rule=\"email\" maxlength=\"32\" class=\"textbox\" placeholder=\"请输入注册时的邮箱名称\" value=\"\" id=\"txt_name\"/></td>\
                </tr>\
                <tr>\
                    <td class=\"lable\">密码：</td>\
                    <td><input type=\"password\" required minlength=\"6\" maxlength=\"32\" class=\"textbox\" value=\"\" id=\"txt_pwd\"/></td>\
                </tr>\
                <tr>\
                    <td class=\"lable\"></td>\
                    <td>还没有账号？<a id=\"regist\" href=\"javascript:void(0);\">注册</a>\</td>\
                </tr>\
            </table>\
            <div class=\"dialog-action\">\
                <input type=\"button\" class=\"input-button js-dialog-submit\" id=\"save\" value=\"登 录\">\
                <input type=\"button\" class=\"input-button sub-button js-dialog-close \" id=\"close\" value=\"取 消\">\
            </div>\
        </div>";
Temp.regist = "<div id=\"dv_regist\" class=\"hide\">\
            <table width=\"400px\">\
                <tr>\
                    <td class=\"lable\">用户名：</td>\
                    <td><input type=\"text\" class=\"textbox\" placeholder=\"请输入邮箱名称\" value=\"\" id=\"txt_name\"/></td>\
                </tr>\
                <tr>\
                    <td class=\"lable\">昵称：</td>\
                    <td><input type=\"text\" required maxlength=\"32\" class=\"textbox\" placeholder=\"请输入昵称\" value=\"\" id=\"txt_name\"/></td>\
                </tr>\
                <tr>\
                    <td class=\"lable\">密码：</td>\
                    <td><input type=\"password\" class=\"textbox\" value=\"\" id=\"txt_pwd\"/></td>\
                </tr>\
                <tr>\
                    <td class=\"lable\">所在公司：</td>\
                    <td><input type=\"text\" class=\"textbox\" value=\"\" id=\"txt_corp\"/></td>\
                </tr>                \
            </table>\
            <div class=\"dialog-action\">\
                <input type=\"button\" class=\"input-button js-dialog-submit\" id=\"save\" value=\"注 册\">\
                <input type=\"button\" class=\"input-button sub-button js-dialog-close \" id=\"close\" value=\"取 消\">\
            </div>\
        </div>";
