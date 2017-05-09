	/*
*男生主页JS
*日期：2013/4/1
*作者：田想兵 55342775@qq.com
*/
	$(".model li").click(function(){
		var index = $(this).index();
		$(this).siblings().removeClass("current");
		$(this).addClass("current").parent().removeClass("mc1").addClass("mc"+index);
	});
	function bindSelectType(){
		$(".menu a").each(function(){
			if($(this).hasClass("current")){
				var y = parseInt( $(this).css("backgroundPositionY"))+45;
				$(this).css({"backgroundPositionY":y+"px"});
			}
			$(this).not(".current").hover(function(){			
				var y = parseInt( $(this).css("backgroundPositionY"))-45;
				$(this).css({"backgroundPositionY":y+"px"});
			},function(){
				var y = parseInt( $(this).css("backgroundPositionY"))+45;
				$(this).css({"backgroundPositionY":y+"px"});
			});		
		});
	}
	bindSelectType();

	$(".waitlist a").hover(function(e){
		var title = $(this).attr("title");
		$(this).append('<span class="tipbg"><i></i><span>'+title+'</span></span>');
		return false;
	},function(){
		$(this).find("span").remove();
	});
	$(".publish input").click(function(){
		return false;
	});
	$(".list .item").hover(function(){
		$(this).addClass("itemhover");
	},function(){
		$(this).removeClass("itemhover");
	});
//滚动加载
if ($().scrollLoad){
	$(".hotellist2,.hotellist,#boylist").scrollLoad({totalPage:$("#ajaxPageWidget_totalPage").val(), loading:$(".pager"),ajaxUrl:$("#ajaxPageWidget_ajaxUrl").val(),ajaxData:{lastReqTime:$("#ajaxPageWidget_lastReqTime").val()},pageIndex:parseInt($("#ajaxPageWidget_pageIndex").val())+1});
}

//地图弹出层
$(".maplink").click(function(e){
	var options = $.extend({modal:true}, options || {});
	var id ="mapWindow_"+(+new Date());
	var dialog = new Boxy("<div class='mapWindow' id='"+id+"'></div>", options);
	var thisPoint = $(this).attr("point").split(',');
	
	var map = new BMap.Map(id);
	 map.enableScrollWheelZoom(true);
	 map.addControl(new BMap.NavigationControl());
	 var point = new BMap.Point(thisPoint[0], thisPoint[1]);
	 map.centerAndZoom(point, 14);
	 var marker1 = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker1);              // 将标注添加到地图中
	return false;
});

//举报拉黑
$("#btn_report").click(function(){
	var dialog = new Boxy(
			$("#reportBox")
			,{
				modal:true
			}
		);
});
$("#btn_pullBlack").click(function(){
	var dialog = new Boxy(
			$("#pullBlackBox")
			,{
				modal:true
			}
		);
});

/*绘会弹窗2013/4/17*/
	$(".createEng").click(function(){
		var dialog = new Boxy($("#publishBox"),{modal:true});
		var isNum = false;
		if($().ComputeNumber){
			var obj = $(".boxy-wrapper #txt_publishContent").ComputeNumber({
				changeCallBack:function(num){
					var n = 60-num;
					if (n<0){
						$(".boxy-wrapper .counter em").css({color:"#E44443"});
						isNum = false;
					}else if(num==0){
						isNum = false;
					}else{
						$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E0E0E0"});
						$(".boxy-wrapper .counter em").css({color:"#808080"});
						isNum = true;
					}
					$(".boxy-wrapper .counter em").html(60-num);
				},isByte:true
			});
		}
		if ($().tipMsg){
			$(".boxy-wrapper .tipMsg").tipMsg({top:12,left:12});
		}
		$(".boxy-wrapper .btnCreate").click(function(){
			if (isNum){
				return true;
			}else
			{
				$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E44443",backgroundColor:"#FFbbbb"}).next().css({color:"#000"});
				setTimeout(function(){
					$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E0E0E0",backgroundColor:"#FFF"}).next().css({color:"#aaa"});
					setTimeout(function(){
					$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E44443",backgroundColor:"#FFbbbb"}).next().css({color:"#000"});
					setTimeout(function(){
						$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E0E0E0",backgroundColor:"#FFF"}).next().css({color:"#aaa"});
					},100);
					},100);
				},100);
				return false;		
			}
		});
	});
	$(".hotellist .item .img").click(function(){
		var dialog = new Boxy($("#inviteBox"),{modal:true});
		var isNum = false;
		if($().ComputeNumber){
			var obj = $(".boxy-wrapper #txt_publishContent").ComputeNumber({
				changeCallBack:function(num){
					var n = 60-num;
					if (n<0){
						$(".boxy-wrapper .counter em").css({color:"#E44443"});
						isNum = false;
					}else if(num==0){
						isNum = false;
					}else{
						$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E0E0E0"});
						$(".boxy-wrapper .counter em").css({color:"#808080"});
						isNum = true;
					}
					$(".boxy-wrapper .counter em").html(60-num);
				},isByte:true
			});
		}
		if ($().tipMsg){
			$(".boxy-wrapper .tipMsg").tipMsg({top:12,left:12});
		}
		$(".boxy-wrapper .btnCreate").click(function(){
			if (isNum){
				return true;
			}else
			{
				$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E44443",backgroundColor:"#FFbbbb"}).next().css({color:"#000"});
				setTimeout(function(){
					$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E0E0E0",backgroundColor:"#FFF"}).next().css({color:"#aaa"});
					setTimeout(function(){
					$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E44443",backgroundColor:"#FFbbbb"}).next().css({color:"#000"});
					setTimeout(function(){
						$(".boxy-wrapper #txt_publishContent").css({borderColor:"#E0E0E0",backgroundColor:"#FFF"}).next().css({color:"#aaa"});
					},100);
					},100);
				},100);
				return false;		
			}
		});
	});
	//上传照片
	$("#btn_uploadPhoto").click(function(){
		var dialog = new Boxy(
			$("#uploadImgBox")
			,{
				modal:true
			}
		);
		$(".close").click(function(){
			$("#btn_uploadifyAgain").click();
		});
		function preview(img, selection,view,w,h) {
			if (!selection.width || !selection.height)
				return;
			
			var scaleX = w / selection.width;
			var scaleY = h / selection.height;
			$('img',view).css({
				width: Math.round(scaleX * $("#sourseImg img").width()),
				height: Math.round(scaleY * $("#sourseImg img").height()),
				marginLeft: -Math.round(scaleX * selection.x1),
				marginTop: -Math.round(scaleY * selection.y1)
			});
			var sx =  imgWidth /$("#sourseImg img").width();
			var sy = imgHeight /$("#sourseImg img").height();
			$("#hd_positionX").val(Math.round(sx * selection.x1));
			$("#hd_positionY").val(Math.round( selection.y1* sy  ));
			$("#hd_width").val( Math.round( selection.width /$("#sourseImg img").width()*imgWidth));
		}
	function imgLoadedCall(img){
		var width = img.width;
		var height = img.height;
		imgWidth = width;
		imgHeight = height;
		if (width>height){
			$(this).width(300);
			$(this).height(height*300/width);
		}else{
			$(this).height(300);
			$(this).width(width*300/height);
		}
	}
	if ($("#uploadify").size()>0){
		$("#uploadify").uploadify({
			height        : 43,
			swf              : $("#hd_swf").val(),
			uploader      : $("#hd_uploader").val()+"?token="+$("#hd_token").val(),
			width         : 246,
			fileSizeLimit:"10MB",
			buttonText  : "上传图片",
			queueID:"queueID",
			fileTypeExts:"*.jpg; *.png; *.gif;*,jpeg",
			fileTypeDesc:"jpg,png,gif图片",
			multi:false,
			onUploadStart:function(){
				//$("#queueID").height(45);
			},
			onUploadSuccess:function(file, data, response){
				data = $.parseJSON(data);
				if (data.state == 1){	
					//$("#queueID").height(0);			
					setTimeout(function(){
						$(".upload").height(0);
						$(".upload div.uploadify").height(0).css({"overflow":"hidden"});
						});
					$(".upload2").show();
					var img = new Image();
					img.src = data.data.url;
					$("#hd_img").val(data.data.url);
					if (img.complete){
						imgLoadedCall.call(img,img);
					}else{
						img.onload=function(){
							imgLoadedCall.call(this,img);						
							img.onload = null;
						}
					}
					$("#sourseImg").removeClass("sourseImg").find("span").html(img);
					$(".defaultImg").hide("slow");
					$(".cutImg").show("slow").find(".border .imgsrc").html($(img).clone());
					//$(".smallCut .imgsrc").html($(img).clone());
					//selector?selector.setOptions({remove:true}):null;
					selector=$("#sourseImg img").imgAreaSelect({ instance: true,aspectRatio: '1:1', handles: true,show:true,autoHide:false,hide:false,persistent:true,x1: 10, y1: 10, x2:110, y2: 110 ,minHeight:10,maxHeight:300,
						fadeSpeed: 200, onSelectChange:function(img,sel){ 
							preview(img,sel,$(".cutImg"),512,512);
							//preview(img,sel,$(".smallCut"),180,180);
						},onInit:function(img,sel){ 
							preview(img,sel,$(".cutImg"),512,512);
							//preview(img,sel,$(".smallCut"),180,180);
						}
					});
				}else{
					alert(data.msg);
				}
			},onUploadError:function(){
				alert("上传失败，请尝试重新上传!")
			}
		});
	}
	$("#btn_uploadifyAgain").click(function(){
		$('#uploadify').uploadify('cancel', '*');
		selector.remove();
		$("#sourseImg").addClass("sourseImg").find("span").html("");
		selector?selector.setOptions({remove:true}):null;
		$(".cutImg").hide("slow");
		$(".defaultImg").show("slow");
		$(".upload2").hide();
		$(".upload div.uploadify").height(69);
		$(".upload").height('auto');
		$('#uploadify').uploadify('cancel', '*');
		$("#hd_img").val('');
	});
	$("#btn_successUpload").click(function(){
		if($("#hd_img").val()==""){
			alert("请先上传图片");
			return false;
		}
	});
	});
/*小地图*/
$(function(){
	if ($("#hotelMap").size()>0){
		var map = new BMap.Map("hotelMap");
		var thisPoint = $(".maplink").attr("point").split(',');
		var point = new BMap.Point(thisPoint[0], thisPoint[1]);
		 map.centerAndZoom(point, 14);
		var myIcon = new BMap.Icon("http://api.map.baidu.com/images/marker_red_sprite.png", new BMap.Size(10,10));
		var marker2 = new BMap.Marker(point);  // 创建标注
		map.addOverlay(marker2); 
	}
});