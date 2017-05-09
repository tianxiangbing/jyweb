/*
*用户注册模块JS
*日期：2013/3/12
*作者：田想兵 55342775@qq.com
*/
$(function(){
	var selector = null,imgWidth=0,imgHeight =0;
	$(".tipMsg2").tipMsg({top:15,left:13});
	var validateObj = {phone:false,imgValidate:true,dxValidate:false,pwd:false,pwd2:false,nick:false,isgree:true};
	$(".findPwdBox .row[msg] input").focus(function(){
		var content = $(this).closest(".row");
		showTip(2,content.find(".tip"),content.attr("msg"));
		checkButton();
	});
	$("#txt_Phone").blur(function(){
		var content = $(this).closest(".row");
		if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test($(this).val())){
			showTip(0,content.find(".tip"),"手机号码格式错误，请重新输入。");
			validateObj.phone=false;
			return false;
		}else{
			var ajaxData = {};
			ajaxData[$(this).attr("name")] = $(this).val();
			var ajaxurl = $(this).attr('ajaxurl');
			ajaxData . type ="ajax";
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(this).attr('ajaxtype')||"get",
				dataType:"json",
				success:function(result){
					if (result.state==1){
						showTip(1,content.find(".tip"));
						$("#btn_getCode").parent().show();
						validateObj.phone=true;
					}else{
						showTip(0,content.find(".tip"),"手机号码已存在，请重新输入。");
						validateObj.phone=false;
					}
				},error:function(){
					showTip(0,content.find(".tip"),"网络故障，请重新输入的验证码");
					validateObj.phone=false;
				}
			});
		}
	});
	$("#txt_nick").blur(function(){
		var content = $(this).closest(".row");
		var len =$(this).val().replace(/[^\x00-\xff]/g,"**").length;
		if (len <2 ||len >20){
			showTip(0,content.find(".tip"),"请输入2到20个字符长度的昵称。");
			validateObj.nick=false;
			return false;
		}else{
			showTip(1,content.find(".tip"));
			validateObj.nick=true;
		}
	});

	$("#txt_pwd").blur(function(){
		var content = $(this).closest(".row");
		if ($(this).val().length <6 ||$(this).val().length >20){
			showTip(0,content.find(".tip"),"请输入6到20个长度的密码。");
			validateObj.pwd=false;
			return false;
		}else{
			showTip(1,content.find(".tip"));
			validateObj.pwd=true;
		}
	});
	$("#txt_pwd2").blur(function(){
		var content = $(this).closest(".row");
		if ($(this).val().length ==0 ){
			showTip(0,content.find(".tip"),"请重复输入密码。");
			validateObj.pwd2=false;
			return false;
		}else
			if ($(this).val() !== $("#txt_pwd").val()){
				showTip(0,content.find(".tip"),"两次输入密码不一致。");
				validateObj.pwd2=false;
				return false;
			}else{
				showTip(1,content.find(".tip"));
				validateObj.pwd2=true;
			}		
	});
	$("#txt_validate").blur(function(){
		var content = $(this).closest(".row");
		if ($(this).val().length !== 4 ){
			showTip(0,content.find(".tip"),"请输入正确的验证码");
			validateObj.imgValidate=false;
			return false;
		}else{			
			var ajaxData = {};
			ajaxData[$(this).attr("name")] = $(this).val();
			var ajaxurl = $(this).attr('ajaxurl');
			ajaxData . type ="ajax";
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(this).attr('ajaxtype')||"get",
				dataType:"json",
				success:function(result){
					if (result.state==1){
						showTip(1,content.find(".tip"));
						$("#btn_getCode").parent().show();
					}else{
						showTip(0,content.find(".tip"),"请输入正确的验证码");
						validateObj.imgValidate=false;
					}
				},error:function(){
					showTip(0,content.find(".tip"),"网络故障，请重新输入的验证码");					
					validateObj.imgValidate=false;
				}
			});
		}
	});
	$("#btn_getCode").parent().click(function(){
		var _self = this;
		if ($(_self).hasClass("enabled")){
			return false;
		}
		if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test($('#txt_Phone').val())){
			alert("请先输入正确的手机号");
			$('#txt_Phone').focus();
			return false;
		}
		var ajaxData = {};
		token = $("input[name='YII_CSRF_TOKEN']").val();
		ajaxData[$("input[name='YII_CSRF_TOKEN']").attr("name")]=token;
			ajaxData[$('#txt_Phone').attr("name")] = $('#txt_Phone').val();
			var ajaxurl = $(this).attr('ajaxurl');
			ajaxData[$("#txt_validate").attr("name")] = $("#txt_validate").val();
			ajaxData . type ="ajax";
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(this).attr('ajaxtype')||"get",
				dataType:"json",
				cache:false,
				success:function(result){
					if (result.state==1){						
						setGetCodeBtn(_self,60);
					}else if (result.state==2){
						setGetCodeBtn(_self,60,true);
					}else{
						alert(result.msg);
					}
				},error:function(err){
					//console.log(err);
					alert("网络故障，请重新获取。");
				}
			});
	});
	function setGetCodeBtn(obj,sec,isHidden){
		if (isHidden){
			$(obj).hide();
			$(".imgValidateRow").show();
			validateObj.imgValidate=false;
		}
		var i = sec;
		var timer = setInterval(function(){
			$(obj).addClass('enabled').find("input").val('('+i+'秒后)重新获取');
			i -- ;
			if (i == 0){
				clearInterval(timer);
				$(obj).removeClass("enabled").find("input").val('点击免费获取');
			}
		},1000);
	};
	$("#txt_DxValidate").blur(function(){
		var content = $(this).closest(".row");
		if ($(this).val().length !== 6 ){
			showTip(0,content.find(".tip"),"请输入正确的短信验证码");
			validateObj.dxValidate=false;
			return false;
		}else{	
			var ajaxData = {};
			ajaxData[$(this).attr("name")] = $(this).val();
			ajaxData[$('#txt_Phone').attr("name")] = $('#txt_Phone').val();
			ajaxData[$('#txt_nick').attr("name")] = $('#txt_nick').val();
			ajaxData[$("#txt_validate").attr("name")] = $("#txt_validate").val();
			ajaxData . type ="ajax";
			var ajaxurl = $(this).attr('ajaxurl');
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(this).attr('ajaxtype')||"get",
				dataType:"json",
				cache:true,
				success:function(result){
					if (result.state==1){
						showTip(1,content.find(".tip"));
						validateObj.dxValidate=true;
					}else{
						showTip(0,content.find(".tip"),"请输入正确的验证码");
						validateObj.dxValidate=false;
					}
				},error:function(){
					showTip(0,content.find(".tip"),"网络故障，请重新输入的验证码");
					validateObj.dxValidate=false;
				}
			});
		}
	});
	function checkButton(){
		var isvalidate= true;
		//console.log(validateObj)
		for (var o in validateObj ){
			if (validateObj [o] ==false){
				isvalidate=false;
			}
		}
		if (isvalidate){
			$("#btn_success").addClass("actived");
			return true;
		}else{
			$("#btn_success").removeClass("actived");
			return false;
		}
	};
	$("#chk_rd").click(function(){
		validateObj.isgree =$(this).attr("checked");
	});
	$(".findPwdBox .row[msg] input").keyup(function(){
		checkButton();
	}).blur(checkButton);
	$("#registForm1").submit(function(){
		return checkButton();
	});
	function showTip(type,tip,msg){
		tip.removeClass("ok").removeClass("wrong").removeClass("ts");
		if (type===1){
			tip.addClass("ok").html('');
		}else if (type == 0){
			tip.addClass("wrong").html("<i></i><s></s>"+ msg);
		}else{
			tip.addClass("ts").html("<i></i>"+ msg);
		}
	};
	/*(function(){
		var str="";
		for (var i =16;i <60 ;i ++ ){
			str +="<option value='"+i+"'>"+i+"岁</option>";
		}
		$("#sel_age").append(str);
	})();
	*/
	$("#sel_area").change(function(){
		var ajaxData = {};
			ajaxData[$(this).attr("name")] = $(this).val();
			ajaxData . type ="ajax";
			var ajaxurl = $(this).attr('ajaxurl');
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(this).attr('ajaxtype')||"get",
				dataType:"json",
				cache:true,
				success:function(result){
					if (result.state==1){
						var data = result.data;
						var str = "";
						for (var i = 0 ,l = data.length;i<l ; i++){
							str += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
						}
						$("#sel_city").html(str).sSelect();
					}
				},error:function(){
					alert("网络故障,请刷新后重试.");
				}
			});
	});

	$("select").sSelect();
	
	function checkUserInfo(){
		var isgo= true;		
		$("select").each(function(){
			if ($(this).val()=="-1"){
				isgo= false;
			}
		});
		if (isgo){
			$("#btn_success").addClass("actived");
		}else{
			$("#btn_success").removeClass("actived");
		}
		return isgo;
	};
	function checkSelect(){		
		if ($(this).val()=="-1"){
			$(this).closest(".right").find(".tip").removeClass("ok").addClass("wrong").show();
		}else{
			$(this).closest(".right").find(".tip").removeClass("wrong").addClass("ok").show();
		}
		checkUserInfo();
	};
	$("#registForm2 select").change(checkSelect);
	$("#registForm2").submit(function(){
		return checkUserInfo();
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
	};
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
	};
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
						//$(".upload").height(0);
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
					$(".smallCut .imgsrc").html($(img).clone());
					//selector?selector.setOptions({remove:true}):null;
					selector=$("#sourseImg img").imgAreaSelect({ instance: true,aspectRatio: '1:1', handles: true,show:true,autoHide:false,hide:false,persistent:true,x1: 10, y1: 10, x2:110, y2: 110 ,minHeight:10,maxHeight:300,
						fadeSpeed: 200, onSelectChange:function(img,sel){ 
							preview(img,sel,$(".cutImg"),512,512);
							preview(img,sel,$(".smallCut"),180,180);
						},onInit:function(img,sel){ 
							preview(img,sel,$(".cutImg"),512,512);
							preview(img,sel,$(".smallCut"),180,180);
						}
					});
				}else{
					alert(data.msg);
				}
			},onUploadError:function(){
				alert("上传失败，请尝试重新上传!")
			}
		});
	};
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