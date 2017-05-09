/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-11-05
 * Time: 17:17:40
 * Contact: 55342775@qq.com
 */

define(function(require, exports, module) {
	var $ =require('$');
	var COM = require("common.js");
	var Handlebars = require("handlebars");
	var NEWSINFO = {
		id:0,
		init:function(id,div,type){
			this.id = id;
			this.content = div;
			this.type = type;
			this.reload();
			this.bindEvent();
		},
		reload:function(){
			var _this = this;
			COM.getTemp("commentList","comment").done(function(temp){
				COM.get('/service/comment.asp?action=getComment',{id:_this.id,type:_this.type},function(result){
					var template = Handlebars.compile(temp);
					var html = template(result);
					$('.commentList',_this.content).html(html);
					_this.overfow($('.commentList',_this.content));
				});
			});
		},
		overfow:function (commentList){
			$(commentList).find('.item').each(function(){
				var item = $(".com_right",this);
				if(item.height()>100){
					item.height(100).append('<div class="expand"><i></i><span>点击展开</span></div>');
				}
			});
		},
		bindEvent:function(){
			var _this = this;
			$('.commentList').delegate('.expand','click',function(){
				$(this).parent().height('auto');
				$(this).remove();
			});
			$('.js-submit-comment').click(function(){
				var param = {};
				param.comment = $('.txtcomment').val();
				param.type=_this.type;
				param.id = _this.id;
				COM.post("/service/comment.asp?action=addComment",param,function(result){
						$('.txtcomment').val('');
						_this.reload();
				});
			});
		}
	};
	module.exports = NEWSINFO;
});