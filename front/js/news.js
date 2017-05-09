/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-10-21
 * Time: 14:21:07
 * Contact: 55342775@qq.com
 */
define(function(require, exports, module) {
	var $ =require('$');
	var COM = require("common.js");
	var Handlebars = require("handlebars");
	var NEWS = {
		div:null,
		init:function(){
			var _this = this;
			COM.tabCallback.publish=function(div){
				_this.div =div;
				COM.getTemp("publish","news").done(function(temp){
					COM.get('/service/news.asp?action=getType',{},function(result){
						var data={typeData:result.data} ;
						var template = Handlebars.compile(temp);
						var html = template(data);
						div.html(html);
						seajs.use(path+'/css/editor/jquery.wysiwyg.css');
						require.async('./editor/jquery.wysiwyg.js',function(){
							$('.editor').each(function(){
								$(this).wysiwyg({initialMinHeight:300,initialContent:$(this).val(),autoGrow:true, controls:"bold,italic,|,undo,redo,|,insertImage"});
							})
						});
						_this.bindSubmit();
					});
				});
			}
		}
		,bindSubmit:function(){
			var _this = this;
			$(".js-news-submit",_this.div).click(function(){
				// console.log('submit')
				var param = COM.serializeFormToObj(_this.div);
				param.typename = $('[name="typename"]:checked').data('title');
				COM.post( "/service/news.asp?action=addnews",param,function(result){
					// COM.newsInfo(result.id);
					COM.location("newsInfo",result.id);
				});
			});
		}
	};
	module.exports= NEWS;
});