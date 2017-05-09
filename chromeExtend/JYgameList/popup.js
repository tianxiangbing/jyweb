$(function(){
		$.ajax({
			dataType:"html",
			url :"http://www.lovewebgames.com/games.html",
			type:"get",
			success:function(result){
				var _html = $(result).find("#main_content");
				var img = _html.find("img");
				img.each(function(){
					var p = $(this).attr("src","http://www.lovewebgames.com/"+$(this).attr("src")).parent();
					if ( /^\//.test(p.attr("href")) ){
						p.attr("href","http://www.lovewebgames.com/"+p.attr("href"));
					}
				});
				_html.find("a").attr("target","_blank");
				$("body").append(_html);
			}
		});
});