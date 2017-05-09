/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-10-22
 * Time: 17:08:38
 * Contact: 55342775@qq.com
 */
define(function(require, exports, module) {
	var $ =require('$');
	var COM = require("common.js");
	var Handlebars = require("handlebars");
	var NEWSINFO = {
		div:null,
		init:function(id){
			var _this = this;
			COM.tabCallback.newsInfo =function(div){
				_this.div =div;
				COM.getTemp("newsInfo","newsinfo").done(function(temp){
					COM.get('/service/news.asp?action=newsInfo',{id:id},function(result){
						var template = Handlebars.compile(temp);
						var html = template(result);
						div.html(html);
						require.async('./comment.js', function(comment) {
							comment.init(id,div,1);
						});
					});
				});
			}
			_this.div = COM.addTab("#newsInfo","文章详情","newsInfo","newsInfo");
		}
	};
	module.exports= NEWSINFO;
});