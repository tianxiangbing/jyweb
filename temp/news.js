/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-10-20
 * Time: 15:49:27
 * Contact: 55342775@qq.com
 */
var Temp = Temp || {};
Temp.typeList = "<div class=\"sortList\">\
			{{#each data}}\
				<div class=\"item\">\
						<h2 data-id=\"{{id}}\">{{typename}}</h2>\
						<p>{{desc}}</p>\
						<div class=\"newslist\" data-typename={{typename}} data-index={{@index}}>\
						</div>\
				</div>\
			{{/each}}\
		</div>";
Temp.topNews = "{{#each data}}\
				<a href=\"javascript:void(0);\" data-id=\"{{id}}\">{{title}}</a>\
				{{/each}}";
Temp.publish ="<div class=\"main\">\
					<table class=\"w100p\">\
						<tr>\
							<th><span class=\"color-red mgr5\"> *</span>标题：</th><td><input type=\"text\" name=\"title\" class=\"textbox w100p\"/></td>\
						</tr>\
						<tr>\
							<th><span class=\"color-red mgr5\"> *</span>内容：</th><td><textarea class=\" w100p editor h400\" name=\"content\"></textarea></td>\
						</tr>\
						<tr>\
							<th>简介：</th><td><textarea class=\" w100p textbox\" name=\"desc\"></textarea></td>\
						</tr>\
						<tr>\
							<th>转自?：</th><td><input type=\"text\" name=\"source\" class=\"textbox w100p\"/></td>\
						</tr>\
						<tr>\
							<th><span class=\"color-red mgr5\"> *</span>类型：</th><td>\
							{{#each typeData}}\
							<label><input type=\"radio\" value=\"{{id}}\" checked name=\"typename\" data-title=\"{{typename}}\" class=\"\"/>{{typename}}</label>\
							{{/each}}\
							</td>\
						</tr>\
					</table>\
					<div class=\"dialog-action\">\
						<input type=\"button\" class=\"input-button js-news-submit\" id=\"save\" value=\"提 交\">\
						<input type=\"button\" class=\"input-button sub-button js-news-close \" data-id=\"\" id=\"close\" value=\"取 消\">\
					</div>\
				</div>";