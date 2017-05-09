	/*
*好友JS
*日期：2013/4/23
*作者：田想兵 55342775@qq.com
*/

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


	var validateObj ={pwd:false,cpwd:false,pwd2:false};
	$(".tipMsg2").tipMsg({top:12,left:13});
	$(".content .row[msg] input").focus(function(){
		var content = $(this).closest(".row");
		showTip(2,content.find(".tip"),content.attr("msg"));
		checkButton();
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
	}
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
	$("#txt_cpwd").blur(function(){
		var content = $(this).closest(".row");
		if ($(this).val().length <6 ||$(this).val().length >20){
			showTip(0,content.find(".tip"),"请输入6到20个长度的密码。");
			validateObj.cpwd=false;
			return false;
		}else{
			showTip(1,content.find(".tip"));
			validateObj.cpwd=true;
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
	$(".content .row[msg] input").keyup(function(){
		checkButton();
	}).blur(checkButton);

	$(".engagement .blacklist .item .avatar").hover(function(){$(".del",this).show();},function(){$(".del",this).hide();});

	/*地点分页*/
$(".engagement .content .sort").StaticPager($(".sortpager"));