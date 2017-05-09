	/*
*新手任务JS
*日期：2013/7/17
*作者：田想兵 55342775@qq.com
*/
$(function(){
	/*发布约会*/
	var task01,task02,task03,task00;
	task00 = new Boxy($("#task04"),{modal:true,closeable:false});	
	$(".sendInvite").live('click',function(){
		task00.hide();
		task01 = new Boxy($("#task01"),{modal:true,closeable:false});	
		if ($().tipMsg){
			$(".boxy-wrapper .tipMsg").tipMsg({top:12,left:32});
		};		
		if($().AutoInput && $(".manifesto a").size()){
			$(".manifesto a").AutoInput({tipMsg:$(".manifesto p"),type:$(".manifesto a").attr("type"),input:$("#txt_publishContent")});
		};
		var jqContent  = $(this).closest("dl");
		$(".selectHotelImage").attr("src",$(".Yavatar",jqContent).attr("src"));
		$(".selectHotelName").html($(".Yname",jqContent).html());
		$("#place_id").val(jqContent.attr("cid"));
	});
	//返回
	$(".backSelect").click(function(){
		task00.show();
		task01.hide();
	});
	var pageIndex =1;
	$(".changePage").click(function(){
		var ajaxurl = $(this).attr("ajaxUrl");
		var method= $(this).attr("method");
		var data ={pageIndex:pageIndex}
		$.ajax({
			url:ajaxurl,
			type:method,
			dataType:"json",
			data:data,
			success:function(result){
				if (result.state==1){
					if (result.data.placeList .length >0){
						pageIndex ++;
					}else{
						pageIndex =1;
					};
					var list = result.data.placeList;
					for (var i =0,l = list.length; i < l;i++ ){
						var item = list[i];
						var jqContent = $(".YhotelList").children().eq(i);
						jqContent.attr("cid",item.id)
						$(".Yavatar",jqContent).attr("src",item.avatar);
						$(".Yname",jqContent).html(item.name);
						$(".YdatingExponent",jqContent).html(item.datingExponent);
						$(".YhumanExponent",jqContent).html(item.humanExponent);
						$(".Ycost",jqContent).html('￥'+item.cost);
						$(".Yaddress",jqContent).html(item.address);
					}
				}else{
					$.alert(result.msg);
				}
			}
		});
	});	
	//$(".changePage").click();
	$("a.btnSubmit").click(function(){
		$(this).next().click();
	});
	$("#pulish_public_dating").submit(function(){
			var form  = $(this);
			var ajaxurl = form.attr("action");
			var method = form.attr("method");
			var data = form.serialize();
			if (form.find("textarea[errmsg]").size()>0){
				if($.trim(form.find("textarea[errmsg]").val()).length==0 ){
					$.alert(form.find("textarea[errmsg]").attr("errmsg"));
					return false;
				}
			}
			ajaxpost();
			function ajaxpost(){
				$.ajax({
					url:ajaxurl,
					data:data,
					type:method,
					dataType:"json",
					success:function(result){
						if (result.state==1){							
							task01.hide();
							task03 = new Boxy($("#task03"),{modal:true});
						}else{
							$.alert(result.msg,0);				
						}
					},error:function(){
							$.alert("网络故障,请刷新页面后重试!",0);	
					}
				});		
			};

		return false;
	});
	//new Boxy($("#task02"),{modal:true});
	//new Boxy($("#task03"),{modal:true});
	$(".actContent .close").click(function(){
		location.reload();
	});
});