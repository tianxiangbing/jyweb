/*
*用户登录模块JS
*日期：2013/2/28
*作者：田想兵 55342775@qq.com
*/
$(function(){
	$(".tipMsg").tipMsg({top:13,left:36});
	$(".tipMsg2").tipMsg({top:15,left:13});
	var loginCounter = 0;
	var isLoading = 0;
	/*重置文本框*/
	$("#txt_userPhone").val("");
	$("#txt_userPwd").val("");
	$("#txt_userValidate").val("");
	$(".loginButton").hover(function(){
		$(this).css({"background-position":"-10px -64px"});
	},function(){
		$(this).css({"background-position":"-10px -10px"});
	}).click(function(){
		var phone = $("#txt_userPhone").val();
		var pwd =  $("#txt_userPwd").val();
		var validate  =  $("#txt_userValidate").val();
		var remember = $("#chk_remember:checked").val()|| 0;
		var refer_url = $("#refer_url").val()|| "";
		if ($.trim(phone).length==0){
			errorMsg("请输入手机号码!");
			return false;
		}
		if (!/^1\d{10}$/.test(phone)){
			errorMsg("手机号码格式错误，请重新输入。");
			return false;
		}
		if (pwd.length==0){
			errorMsg("请输入密码!");
			return false;
		}
		if ( $(".validateContent:visible").length>0 ){
			//$(".validateContent").show();
			if ($.trim(validate).length!==4){
				errorMsg("请输入4位验证码。");
				return false;
			}
		}
		var _self = this;
		if (isLoading){
			return false;
		}
		$(_self).val("正在加载...");
		isLoading = 1;
		var form = $("#loginFrom");
		/*
		json:{'state':1,'msg':'','data':[]}
		*/
		var ajaxData = {};
		token = $("input[name='YII_CSRF_TOKEN']").val();
		ajaxData[$("#txt_userPhone").attr("name")]=phone;
		ajaxData[$("#txt_userPwd").attr("name")]=pwd;
		ajaxData[$("#txt_userValidate").attr("name")]=validate;
		ajaxData[$("#chk_remember").attr("name")]=remember;
		ajaxData[$("input[name='YII_CSRF_TOKEN']").attr("name")]=token;
		ajaxData[$("#refer_url").attr("name")]=refer_url;
		ajaxData.type="ajax";
		$.ajax({
			url:form.attr("action"),
			data:ajaxData,
			type:form.attr("method"),
			dataType:"json",
			complete:function(){
				$(_self).val("登 录");
				isLoading = 0;
			},
			success:function(result){
				if (result.state==1){
					location.href = refer_url;
				}else if (result.state===2 ){
						$(".validateContent").show();
						errorMsg(result.msg);
				}else if (result.state == 0){
						errorMsg(result.msg);
				}else{
						errorMsg(result.msg);
				}
			}
		});
		$(".errorTip").hide();
		return false;
	});
	$(".loginTable .inputText").keydown(function(e){
		if (e.keyCode==27){
			$(".loginButton").trigger("click");
		}
	});
	function errorMsg(msg){
		$(".errorTip").show().find("p").html(msg);
	}
	$(".errorTip s").click(function(){
		$(this).parent().hide(100);
	});
	$(".validate a").click(function(){
		var src = $(".validate img").attr("src").split("?")[0];
		$(".validate img").attr("src",src+"?rnd="+Math.random());
	});
});


function addfavorite(){
   if (document.all){
      window.external.addFavorite('http://www.baidu.com','收藏夹');
   }else if (window.sidebar){
      window.sidebar.addPanel('百度一下', 'http://www.baidu.com', "");
   }else{
   		alert("该浏览器不支持自动收藏功能，请同时按 Ctrl+d 收藏");
   }
}