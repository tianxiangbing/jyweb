/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-11-05
 * Time: 16:49:01
 * Contact: 55342775@qq.com
 */
var Temp = Temp || {};
Temp.commentList = "\
{{#each data}}\
<div class=\"item\">\
<div class=\"com_left\">{{email}} 在 {{publishtime}} 说：</div>\
<div class=\"com_right breakWord\"><pre>{{comment}}</pre></div>\
</div>\
{{/each}}\
";