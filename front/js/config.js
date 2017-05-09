/*
 *@配置文件
 *@create 2014.7.3
 *@author :txb
 *@mail :55342775@qq.com
 */
var path = '/front';
seajs.config({
	paths: {
		arale: 'http://static.alipayobjects.com/arale',
		gallery:"http://assets.spmjs.org/gallery",
		front: path
	},
	alias: {
		"$":"front/js/jquery-1.11.1.min.js",
		"jquery":"front/js/jquery-1.11.1.min.js",
		"base.css":"front/css/base.css",
		"handlebars":"front/js/handlebars-v2.0.0.js",
		"dialog":"front/js/jquery-ui.dialog.min.js",
		"dialog.css":"front/css/jquery-ui.dialog.min.css",
		"calendar": "arale/calendar/1.0.0/calendar",
		"calendar.css": "arale/calendar/1.0.0/calendar.css",
		"cookie":"front/js/jquery.cookie.js"
	}
});
seajs.use(['base.css',"dialog.css"]);
