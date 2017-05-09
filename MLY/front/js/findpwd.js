/*
*用户找回密码模块JS
*日期：2013/3/11
*作者：田想兵 55342775@qq.com
*/
$(function(){
	$(".tipMsg2").tipMsg({top:15,left:13});
	var validateObj = {phone:false,imgValidate:true,dxValidate:false,pwd:false,pwd2:false};
	$(".findPwdBox .row[msg] input").focus(function(){
		var content = $(this).closest(".row");
		showTip(2,content.find(".tip"),content.attr("msg"));
		checkButton();
	});
	$("#txt_Phone").blur(function(){
		var content = $(this).closest(".row");
		if (!/^1\d{10}$/.test($(this).val())){
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
						showTip(0,content.find(".tip"),"手机号码不存在，请重新输入。");
						validateObj.phone=false;
					}
				},error:function(){
					showTip(0,content.find(".tip"),"网络故障，请重新输入的验证码");
					validateObj.phone=false;
				}
			});
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
						validateObj.imgValidate=true;
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
		if (!/^1\d{10}$/.test($('#txt_Phone').val())){
			alert("请先输入正确的手机号");
			$('#txt_Phone').focus();
			return false;
		}
		var ajaxData = {};
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
						$(_self).hide();
						$(".imgValidateRow").show();
						validateObj.imgValidate=false;
						//setGetCodeBtn(_self,60,true);
					}else{
						alert(result.msg);
					}
				},error:function(err){
					console.log(err)
					alert("网络故障，请重新获取。");
				}
			});
	});
	function setGetCodeBtn(obj,sec,isHidden){
		var i = sec;
		var timer = setInterval(function(){
			$(obj).addClass('enabled').find("input").val('('+i+'秒后)重新获取');
			i -- ;
			if (i == 0){
				clearInterval(timer);
				$(obj).removeClass("enabled").find("input").val('点击免费获取');
				if (isHidden){
					$(obj).hide();
					$(".imgValidateRow").show();
					validateObj.imgValidate=false;
				}
			}
		},1000);
	}
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
			ajaxData . type ="ajax";
			var ajaxurl = $(this).attr('ajaxurl');
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(this).attr('ajaxtype')||"get",
				dataType:"json",
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
	}
	$(".findPwdBox .row[msg] input").keyup(function(){
		checkButton();
	}).blur(checkButton);
	$("#findPwdForm").submit(function(){
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
	}
	$(".validate a").click(function(){
		var src = $(".validate img").attr("src").split("?")[0];
		$(".validate img").attr("src",src+"?rnd="+Math.random());
	});
});