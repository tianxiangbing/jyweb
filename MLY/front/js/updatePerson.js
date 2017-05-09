	/*
*个人页修改JS
*日期：2013/4/1
*作者：田想兵 55342775@qq.com
*/

	function deleteImg(callback){	
		//删除
		var ajaxData = {};
		ajaxData[$(this).attr("name")] = $(this).closest(".item").attr("cid");
		var ajaxurl = $(this).attr('ajaxurl');
		ajaxData . type ="ajax";
		var _this= this;
		$.ajax({
			url:ajaxurl,
			data:ajaxData,
			type:$(this).attr('ajaxtype')||"get",
			dataType:"json",
			success:function(result){
				if (result.state==1){
					$(_this).closest(".item").remove();
					callback?callback():null;
				}
			}
		});
	}
	$(".lightboxlist .item .img .act span").click(function(){
		if ($(this).hasClass("del")){
			if($(".item[cid]").size() === 1){
				alert("只剩一张图片了，不能再删了。");
				return false;
			}
			if ($(this).closest(".item").attr("istop")==1 ){
				if (confirm("封面照删除将默认以相册第一张图设为封面，是否确认删除？")){
					deleteImg.call(this,function(){
						$(".item[cid]").eq(0).find(".img").append('<span class="topimg"></span>');
						$(".personal .leftInfo .img img").attr("src",$(".item[cid]").eq(0).find("img").attr("src"));
					});
				}
				return false;
			}
			if (confirm("是否确定删除？")){
				deleteImg.call(this);
				return false;
			}
		}else{
			//设置封面
			var ajaxData = {};
			ajaxData[$(this).attr("name")] = $(this).closest(".item").attr("cid");
			var ajaxurl = $(this).attr('ajaxurl');
			ajaxData . type ="ajax";
			var _this= this;
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(this).attr('ajaxtype')||"get",
				dataType:"json",
				success:function(result){
					if (result.state==1){
						$(".item[cid]").find('.topimg').remove();
						$(_this).closest(".item").attr("istop",1);
						$(_this).closest(".item").find(".img").append('<span class="topimg"></span>');
						var src =result.data || $(_this).closest(".item").find("img").attr("src");
						$(".item[cid]").find('.setTop').removeClass("hide");
						$(_this).addClass("hide");
						$(".personalcenter .left dt img").attr("src",src);
					}
				}
			});
		}
		return false;
	});
	$(".interestedit").StaticPager($(".sortpager"),null,15);
	$(".interest .editContent .title .item").click(function(){
		var index= $(this).index();
		$(this).siblings().removeClass("current").end().addClass("current");
		$(".interest .editContent .interestedit").hide().eq(index).show();
	});
	$(".interest .editContent .interestlist li").click(function(){
		var ishas = $("#hasInterest").find("li[ref='"+$(this).attr("ref")+"']").size();
		if (!ishas){
			$(this).removeClass("normal");
			var tmp = $(this).clone();
			tmp.find("span").append("<a/>");
			tmp.find("span").css("paddingRight",25);
			$("#hasInterest").append(tmp);
		}
	});
	$("#edit5").click(function(){
		if ($(this).text()=='编辑'){
			//$("#hasInterest li").live("mouseover",function(){
				if(!$("#hasInterest li").find("a").size()){
					$("#hasInterest li span").append("<a/>");
				}
				$("#hasInterest li span").css("paddingRight",25);
				$("#hasInterest li").find("a").show();
			//});
			//$("#hasInterest li").live("mouseout",function(){
			//	$(this).find("a").hide();
			//});
		}else{
			//$("#hasInterest li").die("mouseout").die("mouseover");			
			//$("#hasInterest li").find("a").hide();
			$("#hasInterest li span").css("paddingRight",10);		
			//未完待续……。
			var str = [];
			$("#hasInterest li").each(function(){
				str.push( $(this).attr("ref") );
			});
			$("#listid").val(str.join(','));
		}
	});
	$("#hasInterest li a").live("click",function(){
		var ref = $(this).closest("li").attr("ref");
		$("#hasInterest li[ref='"+ref+"']").remove();
		$(".interest .editContent .interestlist li[ref='"+ref+"']").addClass("normal");
	});
	if($().ComputeNumber){
		var obj = $("#txt_quest").ComputeNumber({
			changeCallBack:function(num){
				/*
				var n = 70-num;
				if (n<0){
					$(".editContent .counter em").css({color:"#E44443"});
					isNum = false;
				}else if(num==0){
					isNum = false;
				}else{
					$("#txt_quest").css({borderColor:"#E0E0E0"});
					$(".editContent .counter em").css({color:"#808080"});
					isNum = true;
				}
				*/
				$(".editContent .counter em").html(70-num);
				$("#txt_quest").val($("#txt_quest").val().substr(0,70));
			},isByte:false
		});
	};	
	if($().AutoInput && $(".editContent .manifesto span").size()){
		$(".editContent .manifesto span").AutoInput({tipMsg:$(".editContent .manifesto em"),type:0,input:$("#txt_quest")});
	};
	if($().AutoInput && $(".manifesto a").size()){
		$(".manifesto a").AutoInput({tipMsg:$(".manifesto p"),type:$(".manifesto a").attr("type"),input:$("#txt_publishContent")});
	};
	$(".editact").click(function(){
		var p = $(this).closest(".edit");
		if ($(this).find("em").html()=="编辑"){
			var v = p.children("span").hide().html();
			p.find(".editContent2").show().focus().find("input,textarea").focus();
			$(this).addClass("saveBtn").find("em").html("保存");
			$(p).next(".manifesto").show();
			$(p).find("b").show();
			if($().ComputeNumber){
				var obj = $("#txt_qiming").ComputeNumber({
					changeCallBack:function(num){
						$(p).find("b").html(70-num);
					},isByte:false
				});
			};
			$("#txt_qiming").focus();
		}else{
			$(p).find("b").hide();
			$(p).next(".manifesto").hide();
			//save..	
			var ajaxData = {};
			ajaxData[p.find(".inputText").attr("name")] = p.find(".inputText").val();
			var ajaxurl = $(this).attr('ajaxurl');
			ajaxData . type ="ajax";
			var _this= this;
			$.ajax({
				url:ajaxurl,
				data:ajaxData,
				type:$(this).attr('ajaxtype')||"get",
				dataType:"json",
				success:function(result){
					if (result.state==1){
						p.find(".editContent2").hide();
						p.children("span").show().text(p.find(".inputText").val());
						$(_this).removeClass("saveBtn").find("em").html("编辑");
						p.closest(".boxy-wrapper").find(".close").click();						
						checkInterest();
					}
				}
			});
		}
	});
	$("#edit3").click(function(){
		new Boxy($("#editinterest"),{modal:true});
	});
	$("#editinterest").find(".saveBtn").click(function(){
		var tmp = $("#hasInterest").clone();
		//tmp.find("span").css("paddingRight",3);
		$(".titlec .interestlist").html(tmp.html());
	});
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
	$("#edit2").click(function(){
		var dialog = new Boxy($("#editData"),{modal:true});
		$("#registForm2").submit(function(){
			var xm = $(".editXm").val();//姓名
			var age = $("#sel_age").val();//年龄
			var constellation = $("#sel_constellation").val();//星座
			var bodyHeight = $("#sel_bodyHeight").val();
			var bodyWeight = $("#sel_bodyWeight").val();
			var city = $("#sel_city").val();
			var job = $("#sel_job").val();
			var income = $("#sel_income").val();//年收入
			var buybus = $("#sel_buybus").val();//购车情况

			var stature  = $("#sel_stature").val();//身材
			var qualities = $("#sel_qualities").val();//气质

			if ($.trim(xm).length == 0){
				$.alert("请填写姓名!");
				return false;
			}
			if (age == "-1"){
				$.alert("请选择年龄!");
				return false;
			}
			if (constellation == "-1"){
				$.alert("请选择星座!");
				return false;
			}
			if (bodyHeight == "-1"){
				$.alert("请选择身高!");
				return false;
			}
			if (bodyWeight == "-1"){
				$.alert("请选择体重!");
				return false;
			}
			if (city == "-1"){
				$.alert("请选择所在地!");
				return false;
			}
			if (job == "-1"){
				$.alert("请选择工作!");
				return false;
			}
			if (income == "-1" &&  $("#sel_income").size() ){
				$.alert("请选择年收入!");
				return false;
			}
			if (buybus == "-1" &&  $("#sel_buybus").size() ){
				$.alert("请选择购车情况!");
				return false;
			}
			if (stature == "-1" &&  $("#sel_stature").size() ){
				$.alert("请选择身材!");
				return false;
			}
			if (qualities == "-1" &&  $("#sel_qualities").size() ){
				$.alert("请选择气质!");
				return false;
			}

		});
	});
	/*
	$(function(){
		if ($(".overInterestlist .interestlist").height() > $(".overInterestlist").height()){
			$(".interestLookMore").css("display","block");
		}else{
			$(".interestLookMore").hide();
		};
		$(".interestLookMore").click(function(){
			$(this).hide();
			$(".overInterestlist").height($(".overInterestlist .interestlist").height()) ;
		});
	});
	*/