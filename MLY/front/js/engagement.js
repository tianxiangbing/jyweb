/*约会对象*/
$(function(){
	function bindHover(){
		$(".yhdx .content3").hover(function(){
			$(this).find(".content4").show();
		},function(){
			$(this).find(".content4").hide();
		});
	};
	bindHover();
	$(".report").click(function(){
		$("#hd_ruserid").val($(this).attr("ref"));
		var dialog = new Boxy(
				$("#reportBox")
				,{
					modal:true
				}
			);
	});
	$(".pullBlack").click(function(){
		$("#hd_buserid").val($(this).attr("ref"));
		var dialog = new Boxy(
				$("#pullBlackBox")
				,{
					modal:true
				}
			);
	});
	/*
	//滚动加载
	if ($().scrollLoad){
		$(".yhdx .item").scrollLoad({totalPage:$("#ajaxPageWidget_totalPage").val(), readyCallback:bindHover,loading:$(".pagerLoad"),ajaxUrl:$("#ajaxPageWidget_ajaxUrl").val(),ajaxData:{lastReqTime:$("#ajaxPageWidget_lastReqTime").val()},pageIndex:parseInt($("#ajaxPageWidget_pageIndex").val())+1});
	}
	*/
	$(".responseList .yhsy").click(function(){
		$(this).find("i").toggleClass("extend");
		$(this).closest(".item").find(".syconten").toggle();
		$(this).closest(".item").find(".syanswer").toggle();
	});
});