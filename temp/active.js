/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-11-06
 * Time: 16:18:20
 * Contact: 55342775@qq.com
 */
var Temp = Temp || {};
Temp.activeList = "<div class=\"active clearfix\"><span>活动：</span>\
{{#each data}}\
<a href=\"javascript:void(0);\" data-id=\"{{id}}\" title=\"{{title}}\">【{{starttime}}】{{title}}</a>\
{{/each}}\
</div>";
Temp.activeInfo = "<div class=\"main activeInfo\">\
{{#each data}}\
<h1>{{title}}</h1>\
<div class=\"fl\"><img src=\"/source/active.png\"/></div><div class=\"fl\"><p > <span class=\"label\"> 时间：</span><span class=\"fl tleft\">{{starttime}}-{{endtime}}</span></p>\
<p > <span class=\"label\"> 地点：</span><span class=\"fl tleft\">{{place}}</span></p>\
<div class=\"clearfix clear\"><span class=\"label\">活动详情：</span><div class=\"activeContent breakWord\">\
{{{desc}}}\
</div></div></div>\
<p class=\"clear activeaction\"><input type=\"button\" class=\"input-button js-add-member\" value=\"我要参加\"/> <a class=\"js-del-member hide\">取消</a></p>\
{{/each}}\
<div class=\"activeMember\"></div>\
<div class=\"clear\"><p>我有话要说：</p>\
<textarea class=\"txtcomment\" maxlength=\"1024\"></textarea>\
<input type=\"button\" class=\"input-button js-submit-comment\" value=\"发 表\"/>\
</div>\
<div class=\"commentList\"></div>\
</div>";
Temp.activeMember = "<div><label>活动成员({{count}}人参加)：</label><ul class=\"clearfix\">{{#each data}}<li email=\"{{outputRequired username email}}\">{{email}}</li>{{/each}}</ul></div>"
Temp.publishActive="<div class=\"main\">\
					<table class=\"w100p\">\
						<tr>\
							<th><span class=\"color-red mgr5\"> *</span>活动名称：</th><td><input type=\"text\" name=\"title\" class=\"textbox w100p\"/></td>\
						</tr>\
						<tr>\
							<th>活动时间：</th><td><input type=\"text\" placeholder=\"开始时间\" name=\"stime\" class=\"textbox w100 js-starttime\"/> - <input type=\"text\" placeholder=\"结束时间\" name=\"etime\" class=\"textbox w100 js-endtime\"/></td>\
						</tr>\
						<tr>\
							<th>活动地点：</th><td><input type=\"text\" name=\"place\" class=\"textbox w100p\"/></td>\
						</tr>\
						<tr>\
							<th><span class=\"color-red mgr5\"> *</span>活动介绍：</th><td><textarea class=\" w100p editor h400\" name=\"content\"></textarea></td>\
						</tr>\
					</table>\
					<div class=\"dialog-action\">\
						<input type=\"button\" class=\"input-button js-active-submit\" id=\"save\" value=\"创建活动\">\
						<input type=\"button\" class=\"input-button sub-button js-active-close \" data-id=\"\" id=\"close\" value=\"取 消\">\
					</div>\
				</div>";