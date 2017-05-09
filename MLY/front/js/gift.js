	/*
*礼物商场JS
*日期：2013/5/10
*作者：田想兵 55342775@qq.com
*/
	$(function(){
		if( $(".giftTitle .model .rt").hasClass("current") ){
			$(".giftTitle .model .rt").css("backgroundPosition","-490px -46px");
			$(".giftTitle .model .rt i").css("backgroundPosition","-269px -70px");
		}
	});
	$(function(){
		$("#receiveBox .tipMsg").tipMsg({top:10,left:13});
		$("select").sSelect();
		$(function(){
			if( $(".giftTitle .model .rt").hasClass("current") ){
				$(".giftTitle .model .rt").css("backgroundPosition","-490px -46px");
				$(".giftTitle .model .rt i").css("backgroundPosition","-269px -70px");
			}
		});
		$(".linkReceive").click(function(){		
			//bind gift info
			showGiftDialog.call(this);
			return false;
		});

		$(".linkReceive2").click(function(){		
			//bind gift info
			showGiftDialog.call(this,1);
			return false;
		});
/*
		$(".linkReceive2").click(function(){		
			//bind gift info
			var item = $(this).closest(".item");
			$("[id='hd_giftId']").val(item.attr("ref"));
 			$("#receiveBox .img img").attr("src",item.find(".giftImg img").attr("src"));
			var tmp = item.find(".gname").clone();
			tmp.find("span").remove();
 			$("#receiveBox .name").html(tmp.html());
			$("#receiveBox .name").next().html(item.find(".name").html());
			$("#receiveBox .lft p").html(item.find(".zengyan div").html());
			if( $(this).attr("type")=="0"){
				$("#addNewAddress").show();
				$("#selectAddress").hide();
			}else{
				$("#addNewAddress").hide();
				$("#selectAddress").show();
			};
			var dialog = new Boxy($("#receiveBox"),{modal:true});
			return false;
		});
		*/
		$("a.btnCreate").click(function(){
			$(this).next("input").click();
			return false;
		});
	});
	
	$("#addressform .tipMsg").tipMsg({top:15,left:13});
	$("select").sSelect();
	$(function(){
		if( $(".giftTitle .model .rt").hasClass("current") ){
			$(".giftTitle .model .rt").css("backgroundPosition","-490px -46px");
			$(".giftTitle .model .rt i").css("backgroundPosition","-269px -70px");
		}
	});
	$(".addesslist table tr:not(.current) td").hover(function(){
		$(this).closest("tr").css({backgroundColor:"#E8F1FF"}).find(".default").show();
	},function(){
		$(this).closest("tr").css({backgroundColor:"#EFF7FA"}).find(".default").hide();
	});
	$("#btnSubmit").click(function(){
		$(this).next().click();
	});
	$("#addressform").submit(function(){
		if($.trim($("#txtname").val()).length==0){
			alert("姓名不能为空");
			$("#txtname").focus();
			return false;
		}
		if($.trim($("#sel_city").val())=="-1"){
			alert("地区不能为空");
			return false;
		}
		if($.trim($("#txtaddress").val()).length==0){
			alert("详细地址不能为空");
			$("#txtaddress").focus();
			return false;
		}
		if($.trim($("#txttel").val()).length==0){
			alert("联系电话不能为空");
			$("#txttel").focus();
			return false;
		}
		return true;
	});
	$(".addesslist table tr .update").click(function(){
		var row = $(this).closest("tr");
		$("#txtname").val(row.find("td").eq(0).html()).blur().attr("readonly","readonly");
		//$("#sel_city").val(row.find("td").eq(1).attr("ref")).blur();
		$("#txtaddress").val(row.find("td").eq(2).html()).blur();
		$("#txttel").val(row.find("td").eq(3).html()).blur();
		$("select").sSelect();
		$("#hd_addressid").val(row.attr("ref"));
		var arr = row.find("td").eq(1).attr("ref").split(",");
		$("#sel_province").val(arr[0]);
		selectChange($("#sel_province"),function(){
			$("#sel_city").val(arr[1]);
			selectChange($("#sel_city"),function(){
				$("#sel_area").val(arr[2]);
						$("select").sSelect();
			})
		});
		return false;
	});
	$(".linkage").change(function(){
			var _this = this;
			selectChange(_this);
	});
	function selectChange(_this,callback){		
			var ajaxData = {};
			ajaxData[$(_this).attr("param")] = $(_this).val();
			var ajaxurl = $(_this).attr('ajaxurl');
			ajaxData.type ="ajax";
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(_this).attr('ajaxtype')||"get",
				dataType:"json",
					cache:false,
				success:function(result){
					if (result.state==1){
						var actionDom = $(_this).attr("action").split(",");
						for (var i = 0 ,l= actionDom.length; i<l ; i++ ){
							$("#"+ actionDom[i]).html(result.data[i]);
						}
						$("select").sSelect();
						if (callback){
							callback.call(_this);
						}
					}else{
						alert(result.msg);
					}
				},error:function(){
					alert("网络故障，请重试！");
				}
			});
	}
	$(".addressList .item").click(function(){
		$(this).siblings().removeClass("current");
		$(this).addClass("current");
		$("#hd_selAddress").val($(this).attr("ref"));
	});
	$(".linkAddAdrress").click(function(){
		$("#selectAddress").hide();
		$("#addNewAddress").show();
		return false;
	});

	/*选择女生*/
	$(".selectGirl").click(function(){
		$("#hd_giftid").val($(this).closest("dl").attr("ref")||$("#hd_giftid").val());
		var ifram= $("#selectGirlBox").find("iframe");
		ifram.attr("src",ifram.attr("href"));
		var boxy = new Boxy($("#selectGirlBox"),{modal:true});
	});
	
$(".grilslistbox .item a").click(function(){
	var item = $(this);
	$(".grilslistbox .item a").removeClass("current");
	item.addClass("current");
	parent.$("#hd_girlid").val(item.attr("ref"));
	return false;
});
$("#selectGirlForm").submit(function(){
	if ($("#hd_girlid").val()==""){
		alert("请点击女生头像选择女生!");
		return false;
	}
});
/*礼物详情*/
$(".staticupdown img").click(function(){
	var bigImg =$(this).attr("bigimg")|| $(this).attr("src");
	$(".bigImg img").attr("src",bigImg);
	$(this).closest(".item").addClass("current").siblings().removeClass("current");
	$(".bigImg i").show().css("top",$(this).offset().top - $(".bigImg").offset().top +23);
	return false;
});
$(".staticupdown .up,.staticupdown .down").click(function(){
	var cur= $(".staticupdown .current");
	var val= $(cur).offset().top - $(".bigImg").offset().top +23;
	if (val < 0 || val > $(".bigImg").height() ){
		$(".bigImg i").hide();
	}else{
		$(".bigImg i").show().css("top",$(cur).offset().top - $(".bigImg").offset().top +23);
	}
});

$(".btnpayit").click(function(){
	var payid= new Boxy($("#payit"),{modal:true});
	return false;
});
$("#payit .btnCreate").click(function(){
	location.href=$(this).attr("href");
});

$(".presentcenter .tipMsg").tipMsg({top:40,left:13});
if($().ComputeNumber){
	var obj = $("#txt_paymsg").ComputeNumber({
		changeCallBack:function(num){
			$(".presentcentertitle .counter em").html(140-num);
			$("#txt_paymsg").val($("#txt_paymsg").val().substr(0,140));
		},isByte:false
	});
};
/*领取成功*/
if($("#hd_tips").val()==1){
	var dialog =  new Boxy($("#giftTips"),{modal:true});
}
function showGiftDialog(isrz){
	var _self = this;
	var item = $(this).closest(".item");
	$("[id='hd_giftId']").val(item.attr("ref"));
	$("#receiveBox .img img,#videoAuthentication .img img").attr("src",item.find(".giftImg img").attr("src"));
	var tmp = item.find(".gname").clone();
	tmp.find("span").remove();
	$("#receiveBox .name,#videoAuthentication .name").html(tmp.html());
	$("#receiveBox .name,#videoAuthentication .name").next().html(item.find(".name").html());
	$("#receiveBox .lft p,#videoAuthentication  .lft p").html(item.find(".zengyan div").html());
	if( $(this).attr("type")=="0"){
		$("#addNewAddress").show();
		$("#selectAddress").hide();
		var dialog = new Boxy($("#receiveBox"),{modal:true});
	}else if ($(this).attr("type")=="1"){
		$("#addNewAddress").hide();
		$("#selectAddress").show();
		var dialog = new Boxy($("#receiveBox"),{modal:true});
	}else{
		var dialog = new Boxy($("#videoAuthentication"),{modal:true});
		webcam.set_quality( 100 ); // JPEG quality (1 - 100)
		webcam.set_shutter_sound( false ); // play shutter click sound
		$(".videocam .flash").html(webcam.get_html(420, 339, 420,339));

		$(".photograph").click(function(){
			$(".videocam .loading").show();
			webcam.snap( $("#hd_actionUrl").val(),my_completion_handler);
		});
		function my_completion_handler(data){
			//console.log(msg);
			$(".videocam .loading").hide();
			var data = $.parseJSON(data);
			if (data.state==1){
				$(".prev").show().html('<img src="'+data.data+'"/>');
				$(".photograph").hide();
				$(".resetphoto").show();
			}else{
				$.alert(data.msg,0);
			}
			webcam.reset();
		}
		$(".resetphoto").click(function(){
			$(".photograph").show();
			$(".resetphoto").hide();		
			$(".prev").hide();
		});		
		/*视频认证*/
		$("#videoAuthentication .next").click(function(){	
			$(this).closest(".boxy-wrapper").find(".close").click();
			var form  = $(this).closest("form");
			var ajaxurl = form.attr("action");
			var method = form.attr("method");
			var domtype=$(this).attr("alerttype")||1;
			var data = form.serialize();
			var _this = this;
			$.ajax({
				url:ajaxurl,
				data:data,
				type:method,
				dataType:"json",
				success:function(result){
					if (result.state==1){
						$.alert(result.msg,domtype,function(){			
							$(_self).attr("type",0);
							isrz ? null:showGiftDialog.call(_self);
						});
					}else{
						$.alert(result.msg,0);				
					}
				},error:function(){
						$.alert("网络故障,请刷新页面后重试!",0);	
				}
			});
			return false;
		});
	}
};