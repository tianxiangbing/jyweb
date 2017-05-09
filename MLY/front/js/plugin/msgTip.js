/*
*文本框提示文字插件
*日期：2013/2/27
*作者：田想兵 55342775@qq.com
*用例：$(".tipMsg").tipMsg({top:12,left:12});
*/
	(function($){
		$.fn.tipMsg=function(style){
			$(this).each(function(){	
				var self = this;
				$(this).val("");
				$(this).wrap('<div class="_tipMsg" style="position:relative;float:left;"></div>');
				var next = $('<div style="position:absolute;top:8px;left:8px;" class="txtTip">'+$(this).attr("msg")+'</div>');
				next.css( $.extend({},style) );
				$(this).after(next);
				$(this).next().click(function(){
					$(self).focus();
				});
				$(this).focus(function(){
					$(this).addClass("txtFocus");
					$(this).next().css({color:"#dddddd"});
				}).blur(function(){
					$(this).removeClass("txtFocus");
					$(this).next().css({color:"#aaa"});
					$(this).val().length>0 ? next.hide():next.show();
				}).keyup(function(){
					$(this).val().length>0 ? next.hide():next.show();
				})
			});
		}
	})(jQuery);
	