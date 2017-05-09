//document.domain = "mly.com";
(function($){
	var version ="1.0";
	
	var imScript = $("#imScript") ;

	var imTempHTML = '<div id="imContent">\
									<div class="imBody">\
										<h2><span class="imHead"><img src="'+imScript.attr("faceDir")+'/huatong.png" width="60px" height="60px"/></span><span class="imName">暂无好友</span><i></i></h2>\
										<ul class="imUserList">\
											<!--<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>\
											<li><img src="../uploads/Koala.jpg"/><span>陈雪儿</span></li>-->\
										</ul>\
										<div class="imRight">\
											<div class="imContentList">\
												<!--<div class="imItem">\
													<div class="imMsgLeft">\
														<a class="imBorderImg"><img src="../uploads/Koala.jpg" width="40px" height="40px"/></a>\
														<div class="imMsgContent"><i></i><div class="imMsg">你吃饭了吗？我想你了，你来陪我吧！</div></div>\
													</div>\
													<div class="imMsgRight"><div class="imMsgContent"><i></i><div class="imMsg">你吃饭了吗？我想你了，你来陪我吧！</div></div></div>\
													<div class="imMsgLeft">\
														<a class="imBorderImg"><img src="../uploads/Koala.jpg" width="40px" height="40px"/></a>\
														<div class="imMsgContent"><i></i><div class="imMsg">你吃饭了吗？我想你了，你来陪我吧！</div></div>\
													</div>\
													<div class="imMsgRight"><div class="imMsgContent"><i></i><div class="imMsg">你吃饭了吗？我想你了，你来陪我吧！</div></div></div>\
													<div class="imMsgLeft">\
														<a class="imBorderImg"><img src="../uploads/Koala.jpg" width="40px" height="40px"/></a>\
														<div class="imMsgContent"><i></i><div class="imMsg">你吃饭了吗？我想你了，你来陪我吧！</div></div>\
													</div>\
													<div class="imMsgRight"><div class="imMsgContent"><i></i><div class="imMsg">你吃饭了吗？我想你了，你来陪我吧！</div></div></div>\
												</div>-->\
											</div>\
											<div class="imHobbyList">\
												<div class="imHobbyBorder">\
													<h4>打破僵局</h4>\
													<p class="sameHobby">打造良好的第一印象吧！您和 <em class="imName">阿娇</em> 有一个共同的爱好：</p>\
													<div class="interestlist clearfix">\
													<!--\
														<li ref="1" style=""><span><i class="icon0"></i><s></s>哈士奇1</span></li>\
														<li ref="2" style=""><span><i class="icon1"></i><s></s>哈士奇2</span></li>\
														<li ref="8" class="normal" style=""><span><i class="icon1"></i><s></s>哈士奇8</span></li>\
														<li ref="9" class="normal" style=""><span><i class="icon0"></i><s></s>哈士奇9</span></li>\
														<li ref="1" style=""><span><i class="icon1"></i><s></s>哈士奇</span></li>\
														<li ref="1" style=""><span><i class="icon0"></i><s></s>哈士奇</span></li>\
														-->\
													</div>\
													<p>何不从此聊起呢？或者您也可以赠送 <a>约会礼物</a> 来打动她<br/>（70%的女性会对赠送者产生信任，和其出去约会）</p>\
												</div>\
											</div>\
											<div class="imInputMsg">\
												<div class="imAction clearfix">\
													<div id="imFaceList"><i></i></div>\
													<a href="javascript:void(0);" class="imFace">表情</a>\
													<a href="javascript:void(0);" id="imSendImg" class="imSendImg">传图片</a>\
													<span class="imSplit"></span>\
													<a href="javascript:void(0);" class="imHobby">对方爱好</a>\
												</div>\
												<div class="imInput">\
													<textarea id="txt_imMsg" maxLength="600"></textarea><a class="imBtnSend">发送</a>\
												</div>\
											</div>\
										</div>\
									</div>\
								</div>\
								<div id="imToolbar">聊天窗口</div>';
	
	//插入HTML
	$("body").append(imTempHTML);
	
	//配置信息
	var CONFIG ={
		userListContent :$("#imContent .imUserList")
		,ajaxUrl : imScript.attr("ajaxUrl")
		,ajaxDataType:"json"
		,ajaxType:"post"
		,token:imScript.attr("token")//"69f77564133b386cec63625dc385d1ac" //9ed038e4798ed15fab66211b2eb78df4
		,pageSize:6
		,faceDir:imScript.attr("faceDir")
		,upfileSwf:imScript.attr("upfileSwf")
		,upbtnImg:imScript.attr("upbtnImg")
		,isVip: imScript.attr("isVip")
		,serviceUrl :imScript.attr("serviceUrl")
	};
	/*
	var User =function (){
		this.id;
		this.nick;
		this.avatar ;
		this.hobbies;
		this.online;
	};
	*/
	//console.log($("#imScript").attr("token"))
	var FaceArr = [{'lei':"泪"},{'touxiao':"偷笑"},{'haha':"哈哈"},{'shiwang':"失望"},{'shuai':"衰"},{'nu':"怒"},{'zhuakuang':"抓狂"},{'aini':"爱你"},{'dahaqian':"打哈欠"},{'zuoguilian':"做鬼脸"},{'baibai':"拜拜"},{'yiwen':"疑问"},{'ku':"酷"},{'huaxin':"花心"},{'zhutou':"猪头"},{'lai':"来"},{'ok':"ok"},{'xin':"心"},{'shangxin':"伤心"},{'ganbei':"干杯"},{'yueliang':"月亮"},{'beishang':"悲伤"},{'xixi':"嘻嘻"},{'han':"汗"},{'sikao':"思考"},{'guzhang':"鼓掌"},{'taikaixin':"太开心"},{'wabishi':"挖鼻屎"},{'chijing':"吃惊"},{'yun':"晕"},{'yinxian':"阴险"},{'shuijiao':"睡觉"},{'bishi':"鄙视"},{'fennu':"愤怒"},{'chanzui':"馋嘴"},{'bizui':"闭嘴"},{'hehe':"呵呵"},{'haixiu':"害羞"},{'weiqu':"委屈"},{'youhengheng':"右哼哼"},{'xu':"嘘"},{'tu':"吐"},{'qian':"钱"},{'kelian':"可怜"},{'heng':"哼"},{'qinqin':"亲亲"},{'shengbing':"生病"},{'kun':"困"},{'shudaizi':"书呆子"},{'erhuo':"二货"},{'nanhai':"男孩"},{'nvhai':"女孩"},{'aoteman':"奥特曼"},{'buyao':"不要"},{'good':"good"},{'ruo':"弱"},{'quantou':"拳头"},{'woshou':"握手"},{'zan':"赞"},{'ye':"耶"},{'zuicha':"最差"},{'fahongbao':"发红包"},{'xiayu':"下雨"},{'taiyang':"太阳"},{'xue':"雪"},{'dangao':"蛋糕"},{'zhong':"钟"},{'binggun':"冰棍"},{'feiji':"飞机"},{'fengshan':"风扇"},{'dianying':"电影"},{'kafei':"咖啡"},{'shoutao':"手套"},{'wennuanmaozi':"温暖帽子"},{'liwu':"礼物"},{'huatong':"话筒"},{'qiche':"汽车"},{'weibo':"围脖"},{'zhaoxiangji':"照相机"},{'fuyun':"浮云"},{'yinyue':"音乐"},{'shouji':"手机"},{'xianhua':"鲜花"}];

	//请求参数
	var RequestJson =function(cmd,params){
		params =params ||"";
		return '{"version":"'+version+'","cmd":"'+cmd+'" ,"params":{'+params+'},"token":"'+CONFIG.token+'"}';
	};
	var UserList  = [];
	//公共的ajax请求
	function ajax(requestJson,callback,errorback){		
		ajax.data = ajax.data ||[] ;
		for (var i = 0,l = ajax.data.length;i <l;i++){
			if ( ajax.data[i] == requestJson ){
				return;
			}
		};
		var f = null;
		$.ajax({
			type:CONFIG.ajaxType,
			dataType:CONFIG.ajaxDataType,
			url:CONFIG.ajaxUrl,					
			data:"packet_type=json&packet="+requestJson,
			success:function(result){		
				if (result.success){
					callback?callback(result):null;
				}else{
					errorback?errorback(result):null;
				}
			},error:function(e){
				console.error(e);
			},complete:function(e){				
				for (var i = 0,l = ajax.data.length;i <l;i++){
					if ( ajax.data[i] == requestJson ){
						delete ajax.data[i] ;
						break;
					}
				};
				f?f.call(null):null;
			}
		});
		return {
			done:function(d){
				f=d||f;
			}
		}
	}
	//获取好友列表
	function getFirendList(){		
		var requestJson = RequestJson("getFriendsListJs","");		
		ajax(requestJson,function(result){
				UserList = result.result;
				initFriendTree();
				//$(CONFIG.userListContent).find("li").first().click();
		});		
	};
	getFirendList();
	//格式化好友列表
	function initFriendTree(){
		var _html = '';
		for (var i = 0 ,l = UserList.length; i <l ;i++ ){
			var user = UserList [i];
			_html +='<li ref="'+user.id+'"><img src="'+user.avatar+'"><span>'+user.nick+'</span></li>';
		}
		CONFIG.userListContent.html(_html);
	};
	//绑定事件
	function bindEvent(){
		//好友列表点击
		$(".imUserList").delegate("li","click",function(e){
			var userId = $(this).attr("ref");
			$(".imHead img").attr("src",$(this).find("img").attr("src"));
			$(".imName").html($(this).find("span").html());
			$(this).removeClass("hasMsg");
			$(".imUserList li").removeClass("current");
			$(this).addClass("current");
			if ($(".imContentList .imItem[ref='"+userId+"']").length==0){
				var tmp = $('<div ref="'+userId+'" class="imItem"/>');
				tmp.append('<a class="lookmore hide">查看更多</a>');
				tmp.scroll(function(e){
					var top = $(this).scrollTop();
					if (top==0 && $(".imContentList .imItem[ref='"+userId+"'] .lookmore:visible").size()){
						var last = tmp.children("div").first();
						setTimeout(function(){
							//console.log(new Date())
							getChatHistory(userId,function(l){
								var ttop= Math.abs(last.position().top);
								//tmp.scrollTop(ttop);
							},function(h){
								tmp.scrollTop(h);
							});	
						},1000);
					}
				});
				$(".imContentList").append(tmp);
				getChatHistory(userId,function(l){
					$(".imContentList .imItem[ref='"+userId+"']").scrollTop(99999);
					if (!l){
						getHobbies(userId);
					}
				});	
			} else 	if (!$(".imContentList .imItem[ref='"+userId+"'] div").size()){
				$(".imHobbyList").show();
				//获取兴趣爱好
				getHobbies(userId);
			}else{
				$(".imContentList").show();
				$(".imHobbyList").hide();
				$(".imContentList .imItem").hide();	
				$(".imContentList .imItem[ref='"+userId+"']").show();
				$(".imContentList .imItem[ref='"+userId+"']").scrollTop(99999);
			};
			
		//上传图片
			if ($("#imSendImg").size()>0){
				$("#imSendImg").uploadify({
					height        : 17,
					swf              : CONFIG.upfileSwf,//$("#hd_swf").val(),
					uploader      : CONFIG.ajaxUrl,//{"version":"1.0","cmd":"doSendMessage" ,"params":{"to":100,"type": 3002,"body":""},"token":"69f77564133b386cec63625dc385d1ac"}
					formData	  : {packet_type:"json",packet:'\{\"version\":\"1.0\",\"cmd\":\"doSendMessage\" ,"params":\{"to":'+$(".imUserList li.current").attr("ref")+',"type": 3002,"body":""\},"token":"'+CONFIG.token+'"\}'},
					fileObjName  :"file",
					width         : 16,
					fileSizeLimit:"10MB",
					buttonImage  :CONFIG.upbtnImg,//$("#hd_uploaderbtnImage").val(),
					queueID:"queueID",
					fileTypeExts:"*.jpg; *.png; *.gif;*,jpeg",
					fileTypeDesc:"jpg,png,gif图片",
					multi:false,
					onUploadStart:function(){
						//$("#queueID").height(45);
						$("#txt_imMsg").val("正在上传");
					},
					onUploadSuccess:function(file, data, response){
						$("#txt_imMsg").val("");
						data = $.parseJSON(data);
						var userId = $(".imUserList li.current").attr("ref");
						var imItem =$(".imContentList .imItem[ref='"+userId+"']");
						formatChatRecords(imItem,[data.result],userId,"append");
						imItem.scrollTop(99999);
					},onUploadError:function(){
						alert("上传失败，请尝试重新上传!")
					}
				});
			};
			
			if($('#imContent .imUserList li[ref="'+userId+'"].hasMsg').size()==0){
				$("#imToolbar").removeClass("hasNews").html("聊天窗口");
			};

			$(document).click(function(){
				$("#imContent").hide("fast");
			});
			$("#imToolbar,#imContent").click(function(e){
				e.stopPropagation();
			});
			return false;
		});
		//关闭
		$("#imContent h2 i").click(function(){
			$("#imContent ").hide("fast");
		});
		//打开
		$("#imToolbar").click(function(){
			$("#imContent ").show("fast");
			if($('#imContent .imUserList li[ref].hasMsg').size()==0){
				$("#imToolbar").removeClass("hasNews").html("聊天窗口");
			};
			if ($('#imContent .imUserList li[ref].current').size()==0){
				$(CONFIG.userListContent).find("li").first().click();
			};
			return false;
		});
		//发送消息
		$("#imContent .imBtnSend").click(function(){
			var body = $("#txt_imMsg").val().replace('\n','');
			sendMessage(3000,body);
		});
		$("#txt_imMsg").keydown(function(e){
			if(e.keyCode ==13 ){
				var body = $("#txt_imMsg").val().replace('\n','');
				sendMessage(3000,body);
			}
		});
		//表情
		$("#imContent .imFace").click(function(){
			$("#imFaceList").toggle("fast");
		});
		$("#imFaceList").delegate("img","click",function(){
			var val = $("#txt_imMsg").focus().val();
			$("#txt_imMsg").val( val +"[" + $(this).attr("title") +"]");
			$("#imFaceList").hide("fast");
		});
		//兴趣爱好
		$(".imHobby").click(function(){
			var userId =  $(".imUserList li.current").attr("ref");
			if ( !userId ){
				return false;
			};
			if (!$(".imHobbyList:visible").size()){
				$(".imHobbyList").show("fast");
				getHobbies( userId );
			}else{
				if ($(".imContentList .imItem[ref='"+userId+"']:visible div").length > 0){
					$(".imHobbyList").hide("fast");
				}
			}
		});
	};
	bindEvent();
	//发送消息
	function sendMessage(type,body){
		body = body.replace(/\"/g,'“');
		if (sendMessage.isSend || $.trim(body).length === 0){
			return;
		};
		sendMessage.isSend = true;
		var userId = $(".imUserList li.current").attr("ref");
		if (!userId){
			return;
		};
		if ( CONFIG.isVip != 1 ){			
			var msg = '您不是Vip会员，不能使用聊天功能，请<a href="'+CONFIG.serviceUrl+'">升级会员</a>';
			 $(".imContentList .imItem[ref]").hide();
			var imItem = $(".imContentList .imItem[ref='"+userId+"']").show();
			if (imItem.size() ==0 ){
				$(".imContentList").append('');
			}
			imItem.append('<div msgid="000" class="imMsgRight"><div class="imMsgContent"><i></i><div class="imMsg">'+msg+'</div></div></div>');
			imItem.scrollTop(99999);	
			$("#txt_imMsg").val('');
			sendMessage.isSend = false;
			$(".imHobbyList").hide();
			return false;
		};
		//var body = $("#txt_imMsg").val().replace('\n','');
		var type = type||3000;
		var requestJson = RequestJson("doSendMessage",'"to":'+userId+',"type": '+type+',"body":"'+body+'"');		
		if (type === 3002){
			requestJson= RequestJson("doSendMessage",'"to":'+userId+',"type": '+type+',"body":"'+body+'"');		
		};
		ajax(requestJson,function(result){
			var msg = [result.result];
			var imItem = $(".imContentList .imItem[ref='"+userId+"']");
			formatChatRecords(imItem,msg,userId,"append").done(function(){
				imItem.scrollTop(99999);	
			});
			$("#txt_imMsg").val('');
			sendMessage.isSend = false;
			$(".imHobbyList").hide();
		},function(result){			
			if (result.code=='5092001'){
				alert('你们暂时不是好友！');
				return false;
			}
		}).done(function(){
			sendMessage.isSend = false;
		});
	};
	//获取历史记录
	function getChatHistory(userId,callback,previewCallback){
		var imItem = $(".imContentList .imItem[ref='"+userId+"']");
		var lastTime = imItem.attr("lastTime") || 0;
		var pageIndex = imItem.attr("pageIndex") || 1;
		var requestJson = RequestJson("getChatRecordsJs",'"userId":'+userId+', "startTime":'+ lastTime +',"startIndex":'+pageIndex+',"size": '+CONFIG.pageSize+'');		
		ajax(requestJson,function(result){
			var msgList = result.result.msgList;
			var length = msgList.length;
			if (length){
				$(".imContentList").show();
				$(".imHobbyList").hide();
				$(".imContentList .imItem").hide();	
				imItem.attr("lastTime", result.result.serverTime);
				pageIndex++;
				imItem.attr("pageIndex", pageIndex);
				imItem.show();				
				//callback?callback(length):null;
			};			
			if (result.result.totalCount >CONFIG.pageSize * (pageIndex-1)){
				$(".imContentList .imItem[ref='"+userId+"'] .lookmore").show();
				imItem.css("paddingTop",30).height(320);
			}else{
				$(".imContentList .imItem[ref='"+userId+"'] .lookmore").hide();
				imItem.css("paddingTop",0).height(350);
			};
			formatChatRecords(imItem,msgList,userId,"prepend").done(function(h){
				//console.info(h)
				previewCallback ? previewCallback(h) :null;
				callback?callback(length):null;				
			});
		});		
	};
	//获取兴趣爱好
	function getHobbies (userId){
		$(".imHobbyList").show();
		if ($(".imHobbyList .imHobbyBorder[ref='"+userId+"'] ").size()){	
			$(".imHobbyList .imHobbyBorder").hide();
			$(".imHobbyList .imHobbyBorder[ref='"+userId+"'] ").show();
			return;
		}else{		
			var tmp = $('<div ref="'+userId+'" class="imHobbyBorder"/>');
			tmp .html('<h4>打破僵局</h4>\
				<p class="sameHobby">打造良好的第一印象吧！您和 '+$(".imName").first().html()+' 有一个共同的爱好：</p>\
				<div class="interestlist clearfix"></div>')
			$(".imHobbyList").append(tmp);				
		}
		var requestJson = RequestJson("getFriendHobbies",'"userId":'+userId);		
		ajax(requestJson,function(result){
			var _html = '';
			var hcounter = 0;
			for (var i = 0 ,l = result.result.hobbies.length ; i < l ; i ++ ){
				var hobby = result.result.hobbies [i];
				var same = "normal";
				for (var j = 0 ,len =result .result.sameHobbies.length; j <len ; j ++  ){
					var item = result .result.sameHobbies[j];
					if (item== hobby.id){
						same= "";
						hcounter++;
					};
				};
				_html += '<li ref="1" class="'+same+'"><span><i class="icon0"></i><s></s>'+hobby.name+'</span></li>'
			};
			$(".imHobbyList .imHobbyBorder").hide();			
			$(".imHobbyList .imHobbyBorder[ref='"+userId+"'] ").show().find(".interestlist").html(_html);
			if ( result.result.hobbies.length==0 ){
				$(".sameHobby",$(".imHobbyList .imHobbyBorder[ref='"+userId+"'] ")).html("对方没有选择兴趣爱好。");
			}else if (hcounter == 0){
				$(".sameHobby",$(".imHobbyList .imHobbyBorder[ref='"+userId+"'] ")).html("您和"+$(".imName").first().html()+"有 0 个共同的爱好");
			}else if(hcounter >0){
				$(".sameHobby",$(".imHobbyList .imHobbyBorder[ref='"+userId+"'] ")).html("您和"+$(".imName").first().html()+"有 "+hcounter+" 个共同的爱好");
			};
		});
	};
	
	//格式化时间日期
	function formatDateString(date){
		var d=new Date(date);
		var s="";
		s+=d.getFullYear()+"-";
		s+=(d.getMonth()+1)+"-";
		s+=d.getDate()+" ";
		s+=d.getHours()+":";
		s+=d.getMinutes();
		return s;
	};
	//格式化聊天记录
	function formatChatRecords(content,msgList,userId,method){
		var _html = '<div class="clearfix">';
		var f = null,hc = null;
		formatChatRecords[userId] = formatChatRecords[userId]||{};
		formatChatRecords[userId].lastDate = formatChatRecords[userId].lastDate || +new Date() ;
		for (var i =  msgList.length-1; i>=0; i-- ){
			//for (var i =  0 ,l=msgList.length; i<l; i++ ){
			var msg = msgList [i];
			//console.log(formatDateString(new Date(msg.id)));
			if (Math.abs( msg.id - formatChatRecords[userId].lastDate) >= 30*60*1000){
				_html+= '<div class="imDate">'+ formatDateString(new Date(msg.id))+'</div>';
				formatChatRecords[userId].lastDate = msg.id;
				//console.info( formatDateString(new Date(msg.id)));
			}
			splashScreen($('#imContent .imUserList li[ref="'+userId+'"]').not(".current").addClass("hasMsg"),"hasMsg","hasMsg");
			switch(msg.type){
				case 3001:{//语音消息
					if (msg.from.id == userId){
						_html += '<div class="imMsgLeft" msgId="'+msg.id+'">\
								<a class="imBorderImg" href="'+ msg.from.avatar +'" target="_blank"><img src="'+msg.from.avatar+'" width="40px" height="40px"/></a>\
								<div class="imMsgContent"><i></i><div class="imMsg"><a class="downloadSoft" target="_blank">语音消息</a></div></div>\
							</div>';
					}else{
						_html += '<div class="imMsgRight" msgId="'+msg.id+'">\
										<div class="imMsgContent">\
											<i></i><div class="imMsg">\
											<a class="downloadSoft" target="_blank">语音消息</a>\
													</div>\
											</div>\
										</div>';
					}
				}break;
				case 3002:{//图片消息
					if (msg.from.id == userId){
					_html += '<div class="imMsgLeft" msgId="'+msg.id+'">\
							<a class="imBorderImg" href="'+ msg.from.avatar +'"  target="_blank"><img src="'+msg.from.avatar+'" width="40px" height="40px"/></a>\
							<div class="imMsgContent"><i></i><div class="imMsg"><a target="_blank" href="'+msg.body+'"><img src="'+msg.body+'_200x200" /></a></div></div>\
						</div>';
					}else{
						_html += '<div class="imMsgRight" msgId="'+msg.id+'">\
									<div class="imMsgContent"><i></i><div class="imMsg"><a target="_blank" href="'+msg.body+'"><img src="'+msg.body+'_200x200" /></a></div></div></div>';
					}
				}break;
				default:{
					msg.body = convertFace(msg.body);
					if (msg.from.id == userId){
						_html += '<div class="imMsgLeft" msgId="'+msg.id+'">\
								<a class="imBorderImg" href="'+ msg.from.avatar +'"  target="_blank"><img src="'+msg.from.avatar+'" width="40px" height="40px"/></a>\
								<div class="imMsgContent"><i></i><div class="imMsg">'+msg.body+'</div></div>\
							</div>';
					}else{
						_html += '<div class="imMsgRight" msgId="'+msg.id+'"><div class="imMsgContent"><i></i><div class="imMsg">'+msg.body+'</div></div></div>';
					}
				}break;
			};
		};
		_html +=  '</div>';
		var tmp =$(_html);
		$(content)[method](tmp);
		if($('#imContent .imUserList li[ref="'+userId+'"].hasMsg').size()>0 || $("#imContent:visible").size()==0){
			$("#imToolbar").addClass("hasNews").html("有新消息");
			splashScreen($("#imToolbar"),"hasNews","hasNews");
		}
		if ($(tmp).find("img").size()){
			loadImg($(tmp).find("img")).done(function(){
				//$(".imContentList .imItem[ref='"+userId+"']").scrollTop(99999);
				var height = $(tmp).height();
				//console.log( $(tmp).outerHeight())
				f ? f .call( this,height ):null;
			})
		}else{
			setTimeout(function(){ 
				var height = 0 ;
				$(tmp).each(function(){
					height += $(this).outerHeight();
				});
				f ? f .call(this,height ):null;
			});
		};
		return {
			done:function(d){
				f = d ||f;
			}
		}
	};
	//监听消息
	function ListenMessage(info){
		var requestJson = RequestJson("doListeningMessage",'"clientType":"web"');		
		ajax(requestJson,function(result){
			var msg = result.result;
			for (var i =0 ,l = msg.length; i<l ;i++ ){
				var item = msg [i];
				if (item.from.id!==0){
					var imItem = $(".imContentList .imItem[ref='"+item.from.id+"']");
					formatChatRecords(imItem,[item],item.from.id,"append");
					imItem.scrollTop(99999);
					$("#txt_imMsg").val('');
					sendMessage.isSend = false;
					$(".imHobbyList").hide();
				}
			};
			ListenMessage();
		});//.done(ListenMessage);
	};
	ListenMessage();
	
	/*加载图片*/
	function loadImg(img){
		if ($(".tmpImgPos").size()==0){
			var tmpImgPos = $("<div class='tmpImgPos'></div>");
			$("body").append(tmpImgPos);
		}
		var f = null;
		var l  = $(img).length;
		var k = 0;
		$.each($(img),function(i){
			var p = $(this).parent();
			$(".tmpImgPos").append($(this));
			//var tmpImg = $('<img src="'+$(this).attr("src")+'"/>');
			var _this = this;
			if (_this.onreadystatechange !== undefined){
				_this.onreadystatechange = function(){
					if (_this.readyState=="loaded" ||_this.readyState=="complete"){			
						p.append($(_this).attr("h",$(_this).height()));	
						k ++;
						if( l == k){
							f?f.call(_this):null;
						}
						//f?f.call(_this):null;
					}
				}
			}else{
				$(_this).bind("load",function(){
						p.append($(_this).attr("h",$(_this).height()));	
					k ++;
					//f?f.call(_this):null;
					if( l == k){
						f?f.call(_this):null;
					}
				})
			};
		});
		return {
			done:function(d){
				f=d||f;
			}
		}
	};
	(function(arr){
		var _html  = '';
		for (var i =0 ,l = arr.length; i <l ; i++ ){
			var item = arr[i];
			var k =0;
			for(var j in item){
				if (k ==0){
					var url = CONFIG.faceDir + j+".png"
					_html +='<img src="'+url+'" title="'+item[j]+'"/>';
				};
				k++;
			}
		};
		$("#imFaceList").append(_html);
	})(FaceArr);
	
		//表情转换
		function convertFace(msg){
			var len=FaceArr.length;
			msg = htmlEncode(msg);
			msg=msg.replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp;");
			var re = new RegExp("((((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*)","igm");
			//msg = msg.replace(re,"$1".link("$1"));
			var regexp = new RegExp("(((http[s]{0,1}|ftp)://)|(www\\.))[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+?:_/=<>]*)?", "gi");
			var regexp =/(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&amp;(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?/igm;
			msg=msg.replace(regexp,function (m){
				if (/^www/.test(m)){
					return '<a href="http://'+m+'" target="_blank">'+m+'</a>';
				}else{
					return '<a href="'+m+'" target="_blank">'+m+'</a>';
				}
			});			
			for(var i =0;i<len;i++){
				for (var item in FaceArr[i]){
					var alt=FaceArr[i][item];
					var temp= new RegExp("\\["+alt+"\\]","g");
					msg=msg.replace(temp,'<span><img style="height:32px;" title="'+alt+'" src="' + CONFIG.faceDir + item + '.png" alt="['+ alt +']"/></span>');					
				}
			};
			return msg;
		};
		function htmlEncode(str){
			return str.replace(/&/,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
		};
		//闪屏
		function splashScreen(msgTextBox,color,stopColor){
			var ii=0;
			var tto;
			var color=color||'imSplashSendMsg';
			var stopColor=stopColor||'';
			function splash(){
				tto=setInterval(function(){
					msgTextBox.toggleClass(color);
					ii++;
					//console.log(msgTextBox.css('background-color'));
					if(ii>=4){
						clearInterval(tto); 
						msgTextBox.addClass(stopColor);
					}
				},200);
			};
			splash();
		};
		$(".webim").click(function(){
			var userId = $(this).attr("ref");
			$("#imContent ").show("fast");
			if($('#imContent .imUserList li[ref].hasMsg').size()==0){
				$("#imToolbar").removeClass("hasNews").html("聊天窗口");
			};
			$(CONFIG.userListContent).find("li[ref='"+userId+"']").click();
			return false;
		});
})(jQuery);
