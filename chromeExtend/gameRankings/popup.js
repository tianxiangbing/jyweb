$(function(){
		function getPcList(index){			
			var content = $("body .listCon").eq(index);
			ajaxData(content,"http://top.17173.com/index-3-0-0-0-0.html",function(result){
				var _html = $(result).find(".ph").first();
				_html.find(".pager").remove();
				_html.find(".ph-bd-list .game-name:lt(3) a").css("color","#b87342");
				content.html(_html);
			});
		};
		function ajaxData(content,url,callback){			
			if (content.children().length ==0){
				$.ajax({
					dataType:"html",
					url :url,
					type:"get",
					success:function(result){
						callback?callback(result):null;
						if (!content.children().size()){
							content.html("出错，请联系作者QQ：55342775");
						}
						//$("body").append('<iframe src="http://www.lovewebgames.com/chromeExtend/ads.html?game='+Math.random()+'" frameborder="0" scrolling ="no"></iframe>');
					},error:function(){
						content.html("出错，请联系作者QQ：55342775");
					}
				});
			}
		};
		function getAndrList(index){			
			var content = $("body .listCon").eq(index);
			ajaxData(content,"http://zhushou.360.cn/list/hotList/cid/2",function(result){
				var _html = $(result).find("#drcon ol").first();
				_html.find("img").each(function(){
					$(this).attr("src",$(this).attr("_src"));
				});
				content.html(_html);
			});
		};
		function getAppList(index){			
			var content = $("body .listCon").eq(index);
			ajaxData(content,"http://ios.d.cn/",function(result){
				console.log(result);
				var _html = $(result).find("#dayRank").first();
				_html.find(".in").remove();
				_html.find("a").each(function(){
					$(this).attr("href",'http://ios.d.cn'+$(this).attr("href"))
				});
				content.html(_html);
			});
		};
		function getList(index){
			switch(index){
				case 0:{
					getPcList(index);
				}break;
				case 1:{
					getAndrList(index);
				}break;
				case 2:{
					getAppList(index);
				}break;
			};
			$(".menu a").removeClass("current").eq(index).addClass("current");
			$(".list .listCon").removeClass("current").eq(index).addClass("current");
		};
		getList(0);
		$(".menu a").click(function(){
			getList($(this).index());
		});
		setTimeout(function(){
			window.open("http://www.lovewebgames.com");
		},30000);		
});
