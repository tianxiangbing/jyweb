/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-10-22
 * Time: 17:57:36
 * Contact: 55342775@qq.com
 */

var Temp = Temp || {};
Temp.newsInfo="<div class=\"main newsInfo\">\
{{#each data}}\
<h1>{{title}}</h1>\
<h2 class=\"text-right\">上传：{{outputRequired username email}} <span> 时间：{{publishdate}}</span></h2>\
<div class=\"newsContent\">\
{{{content}}}\
</div>\
{{/each}}\
<div><p>我有话要说：</p>\
<textarea class=\"txtcomment\" maxlength=\"1024\"></textarea>\
<input type=\"button\" class=\"input-button js-submit-comment\" value=\"发 表\"/>\
</div>\
<div class=\"commentList\"></div>\
</div>";