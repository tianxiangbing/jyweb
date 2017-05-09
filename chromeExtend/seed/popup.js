$(function(){
		function ajaxData(content,url,callback){			
			if (content.children().length ==0){
				$.ajax({
					dataType:"html",
					url :url,
					type:"get",
					success:function(result){
						callback?callback(result):null;
						if (!content.children().size()){
							content.html('出错，请联系<a target="_blank" href="http://www.lovewebgames.com">网站</a>');
						}
						//$("body").append('<iframe src="http://www.lovewebgames.com/chromeExtend/ads.html?game='+Math.random()+'" frameborder="0" scrolling ="no"></iframe>');
					},error:function(){
						content.html('出错，请联系<a target="_blank" href="http://www.lovewebgames.com">网站</a>');
					}
				});
			}
		};
		function getVideoList(content){			
			ajaxData(content,"http://www.onemaya.com/archiver/?fid-41.html",function(result){
				var _html = $(result).find(".simpletable").first();
				_html.find("a").each(function(){
					$(this).attr("_href",'http://www.onemaya.com/'+$(this).attr("href"));
				}).click(function(){
					$(".list").hide();
					$(".detail").show();
					getDetail($(this).attr("_href"));
					return false;
				});
				_html.find("i").remove();
				content.html(_html);
			});
		};
		function getDetail(link){
			var content = $(".detail .content");
			ajaxData(content,link,function(result){
				result.replace();
				var temp= /\[img\][\w:\/\.\-]*\[\/img\]/g;
				result=result.replace(temp,function(m){
					var s =  m.replace(/\[img\]/g,"").replace(/\[\/img\]/g,"");
					return '<img src="'+s+'"/>';
				});			
				var _html = $(result).find(".t_msg").first();
				content.html(_html);
			});
		}
		$(".return").click(function(){
			$(".detail").hide();
			$(".detail .content").html('');
			$(".list").show();
		});
		getVideoList($(".list"));
		setTimeout(function(){
			window.open("http://www.lovewebgames.com");
		},600000);		
});
