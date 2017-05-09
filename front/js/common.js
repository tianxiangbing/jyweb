/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-10-09
 * Time: 14:20:28
 * Contact: 55342775@qq.com
 */

define(function(require, exports, module) {
	var $ = require('$');
	var Handlebars = require("handlebars");
	var Route = require('./route.js');
	require('cookie');
	Handlebars.registerHelper('outputRequired', function(){
		return COM.outputRequired.apply(null,Array.prototype.slice.call(arguments , 0));
	});
	var MENU={
		"index":{usejs:"index",text:"首页",callback:"index"}
		,"publish":{usejs:"news",text:"发布文章",callback:"publish"}
		,"publishActive":{usejs:"activeNew",text:"发起活动",callback:"publishActive"}
	};
	// console.log($.cookie("a",1))
	// console.log($.cookie("a"))
	var COM = {
		formatDate: function(date, format) {
			var _this = date;
			format = format || "yyyy-MM-dd hh:mm:ss";
			var o = {
				"M+": _this.getMonth() + 1, //month 
				"d+": _this.getDate(), //day 
				"h+": _this.getHours(), //hour 
				"m+": _this.getMinutes(), //minute 
				"s+": _this.getSeconds(), //second 
				"q+": Math.floor((_this.getMonth() + 3) / 3), //quarter 
				"S": _this.getMilliseconds() //millisecond 
			}

			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
			}

			for (var k in o) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format;
		},
		TEMPSOURCE: {},
		//文章详情
		newsInfo:function(id){
			require.async('./newsInfo.js', function(newsInfo) {
				 newsInfo.init(id);
			});
		},
		//活动详情
		activeInfo:function(id){
			require.async('./active.js', function(activeInfo) {
				activeInfo.init(id);
			});
		},
		getTemp: function(key, source) {
			var _this = this;
			var f = null;
			// if(key=="topNews") debugger;
			if (this.TEMPSOURCE[source] && this.TEMPSOURCE[source].state == 1) {
				//加载完成
				setTimeout(function() {
					f && f.call(null, Temp[key]);
				});
			} else {
				if (_this.TEMPSOURCE[source] && _this.TEMPSOURCE[source].state == 0) {
					//加载中
					_this.TEMPSOURCE[source].callback = _this.TEMPSOURCE[source].callback || [];
					_this.TEMPSOURCE[source].callback.push(function() {
						f && f.call(null, Temp[key]);
					});
					//回调加入队列
				} else {
					//第一次加载
					_this.TEMPSOURCE[source] = {
						state: 0
					};
					_this.TEMPSOURCE[source].callback = _this.TEMPSOURCE[source].callback || [];
					_this.TEMPSOURCE[source].callback.push(function() {
						f && f.call(null, Temp[key]);
					});
					$.ajax({
						type:"get",
						dataType:"script",
						url:"/temp/" + source + ".js", 
						cache:"true",
						success:function(result){
							_this.TEMPSOURCE[source].state = 1;
							for (var i = 0, l = _this.TEMPSOURCE[source].callback.length; i < l; i++) {
								_this.TEMPSOURCE[source].callback[i]();
							}
						}
					});
				}
			}

			return {
				done: function(d) {
					f = d;
				}
			}
		},
		checkLogin: function(user) {
			var _this = this;
			user.action = "login";
			return _this.post("/service/login.asp", user, function(result) {
				if (result.state == true) {
					$.cookie('uid', result.userInfo.id ,{expires:30});
					$.cookie('email', result.userInfo.email ,{expires:30});
					$.cookie("password", result.userInfo.password ,{expires:30});
				}
			});
		},
		initTop: function(data) {
			var _this = this;
			var dtd = $.Deferred();
			this.getTemp("top", "default").done(function(temp) {
				var template = Handlebars.compile(temp);
				var obj = data || {},
					user = {};
				user.email = $.cookie('email');
				user.password = $.cookie("password");
				user.ismd5 = true;
				if (user.email && user.password && !data) {
					_this.checkLogin(user).done(function(obj) {
						var html = template(obj.content)
						$("#head").size() ? $("#head").replaceWith(html) : $("body").prepend(html);
						if (obj.content.state == true) {
							$('#dv_login').trigger('close');
						}
						dtd.resolve();
					});
				} else {
					obj = data;
					var html = template(obj)
					$("#head").size() ? $("#head").replaceWith(html) : $("body").prepend(html);
					if (obj && obj.state == true) {
						$('#dv_login').trigger('close');
					}
					dtd.resolve();
				};
			});
			return dtd;
		},
		initBottom: function() {
			var _this = this;
			_this.getTemp("bottom", "default").done(function(temp) {
				var template = Handlebars.compile(temp);
				var html = template({
					date: _this.formatDate(new Date(), "yyyy年MM月dd日  hh点mm分ss秒")
				})
				$("body").append(html);
				setInterval(function() {
					$("#foot").html(_this.formatDate(new Date(), "yyyy年MM月dd日  hh点mm分ss秒"));
				}, 1000);
			});
		},
		dialog: function(div, option) {
			require.async("dialog", function() {
				var options = $.extend({
					width: "auto",
					modal: true
				}, option);
				var dialog;
				options = $.extend(options, {
					open: function(e, ui) {
						var p = $(e.target);
						$('.js-dialog-close', p).click(function() {
							dialog.dialog("close");
							// options.cancel && options.cancel.call();
						});
						$('.js-dialog-submit', p).click(function() {
							options.submit && options.submit.call(dialog, $(this).closest(".ui-dialog"));
						})
						option && option.open && option.open.apply(this, Array.prototype.slice.call(arguments, 1));
					},
					close: function(e, ui) {
						$('.ui-dialog .js-dialog-close', dialog).unbind('click');
						$('.ui-dialog .js-dialog-submit', dialog).unbind('click');
						options.cancel && options.cancel.call(dialog, $(".ui-dialog", dialog));
					}
				});
				dialog = $(div).dialog(options);
				$(dialog).bind('close', function() {
					$(dialog).dialog("close");
				});
			});
		},
		post: function(url, param, success, error,cache) {
			return this.ajax(url, param, success, error, "post",cache);
		},
		get: function(url, param, success, error,cache) {
			return this.ajax(url, param, success, error, "get",cache);
		},
		ajax: function(url, param, success, error, type,cache) {
			var param = $.extend({}, param);
			cache = cache||false;
			return $.ajax({
				url: url,
				data: param,
				dataType: "json",
				type: type,
				cache:cache,
				success: function(result) {
					if (!result.hasError) {
						success && success.call(this, result.content)
					} else {
						error && error.call(this, result);
						alert(result.content)
					}
				},
				error: function() {
					error && error.call(this, "500");
				}
			});
		},
		loginout: function() {
			var _this = this;
			$('body').delegate("#loginout", "click", function() {
				$.removeCookie("email");
				$.removeCookie("password");
				_this.initTop();
			});
		},
		login: function() {
			var _this = this;
			$('body').delegate("#login", "click", function() {
				_this.getTemp("login", "default").done(function(temp) {
					_this.dialog(temp, {
						width: "auto",
						title:"填写登录信息",
						cancel: function() {
							// console.log('cancel')
						},
						submit: function(doc) {
							// console.log('submit')
							var dialog = this;
							var param = {};
							param.action = "login";
							param.email = $(doc).find("#txt_name").val();
							param.password = $(doc).find("#txt_pwd").val();
							_this.post("/service/login.asp", param, function(result) {
								if (result.state == -1) {
									alert("密码不对！");
								}
								if (result.state == 0) {
									alert('用户名不存在，您可能需要注册一个新账号！');
								}
								if (result.state == true) {
									$.cookie('email', result.userInfo.email,{expires:30});
									$.cookie("password", result.userInfo.password,{expires:30});
									_this.initTop(result);
									$(dialog).dialog("close");
								}
							})
						}
					});
				});
			});
		},
		closeDialog: function() {
			$(".ui-dialog-titlebar-close").trigger("click");
		},
		regist: function() {
			var _this = this;
			$('body').delegate("#regist", "click", function() {
				_this.getTemp("regist", "default").done(function(temp) {
					_this.dialog(temp, {
						width: "auto",
						title:"填写注册信息",
						submit: function(doc) {
							var param = {};
							param.action = "regist";
							param.email = $(doc).find("#txt_name").val();
							param.password = $(doc).find("#txt_pwd").val();
							param.corp = $(doc).find("#txt_corp").val();
							var dialog = this;
							_this.post("/service/login.asp", param, function(result) {
								if (result.state == 0) {
									alert('用户名存在，您可能需要换一个名称！');
								} else if (result.state == true) {
									$.cookie('uid', result.userInfo.id);
									$.cookie('email', result.userInfo.email);
									$.cookie("password", result.userInfo.password);
									_this.initTop(result);
									dialog.dialog("close");
								}
							})
						}
					});
				});
			});
		},
		tabCallback:{
			index:function(){
				// require.async('./index.js', function(index) {
				// });
				setTimeout(function(){
					COM.tabCallback.index ();
				});
			}
		},
		addTab: function(divId, title,callbackname,usejs) {
			var div = $( divId);
			var _this = this;
			if (div.size() == 0) {
				var last = $('.body').children().last();
				div = $('<div id="' + divId.replace('#','') + '" class="container clearfix" data-title=\"' + title + '\"/>');
				$('.body').append(div);
				div.css("left", (parseInt(last.position().left) + last.width()));
				if($("#directory").find("[href='"+divId+"']").size() == 0){
					$("#directory").append('<a href="' + divId + '" data-title=\"'+title+'\" data-callback=\"'+callbackname+'\" data-usejs=\"'+usejs+'\">' + title + '</a>');
				}
			}
			if(this.tabCallback[callbackname]){
				_this.tabCallback[callbackname].call(null,div);
			}else{
				require.async("./"+usejs+".js",function(js){
					js.init();
					_this.tabCallback[callbackname].call(null,div);
				});
			}
			this.animate(div);
			return div;
		},
		animate: function(div) {
			if (typeof div == "string") {
				div = $(div);
			}
			$("#directory a[href='#"+div.prop("id")+"']").siblings().removeClass('actived');
			$("#directory a[href='#"+div.prop("id")+"']").addClass('actived');
			$(".body").animate({
				left: -parseInt(div.position().left)
			}, 1000,function(){
				$(document).scrollTop(0);
			});
		},
		directory: function() {
			var _this = this;
			$('body').delegate('#directory a', 'click', function() {
				// _this.addTab($(this).attr('href'),$(this).html(),$(this).data('callback'),$(this).data('usejs'));
				_this.location($(this).attr('href'),null,"menu");
				return false;
			});
		}, //构建参数
		serializeFormToObj: function(form) {
			var result = {},
				tempObj = {};
			$(form).find('*[name]').each(function(i, v) {
				var nameSpace,
					name = $(v).attr('name'),
					val = $(v).val(),
					tempArr = [];
				if (name == '') {
					return;
				}

				//处理radio add by yhx  2014-06-18
				if ($(v).attr("type") == "radio") {
					var tempradioVal = null;
					$("input[name='" + name + "']:radio").each(function() {
						if ($(this).is(":checked"))
							tempradioVal = $(this).val();
					});
					if (tempradioVal) {
						val = tempradioVal;
					} else {
						val = "";
					}
				}

				//构建参数
				if (name.match(/\./)) {
					tempArr = name.split('.');
					nameSpace = tempArr[0];
					if (tempArr.length == 3) {
						tempObj[tempArr[1]] = tempObj[tempArr[1]] || {};
						tempObj[tempArr[1]][tempArr[2]] = val;
					} else {
						tempObj[tempArr[1]] = val;
					}
					if (!result[nameSpace]) {
						result[nameSpace] = tempObj;
					} else {
						result[nameSpace] = $.extend({}, result[nameSpace], tempObj);
					}

				} else {
					result[name] = val;
				}

			});
			var obj = {};
			for (var o in result) {
				var v = result[o];
				if (typeof v == "object") {
					obj[o] = JSON.stringify(v);
				} else {
					obj[o] = result[o]
				}
			}
			return obj;
		}
		,route:function(){
			var action = Route.getParam("action");
			var id = Route.getParam("id");
			// console.log(action)
			var type = Route.getParam('type');
			if(type==="menu"&&MENU[action]){
				this.addTab("#"+action,MENU[action].text,MENU[action].callback,MENU[action].usejs);
			}else{
				if(this[action] && action!=""){
					this[action](id);
				}else{
					this.tabCallback.index();
				}
			}
		}
		,location:function(action,id,type){
			action = action.replace('#',"");
			id=id||"";
			type=type||"";
			location.href="#action="+action+"&id="+id+"&type="+type;
			this.route();
		}
		,outputRequired:function(){
			var args = Array.prototype.slice.call(arguments ,0);
			for (var i =0,l= args.length; i<l; i++) {
				if(args[i]){
					return arguments[i];
				}
			};
		}
	};
	Handlebars.registerHelper('equals', function(v1, v2, options) {
		if (v1 == v2) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	COM.initTop().done(function(){
		COM.directory();
		COM.route();
	});
	COM.initBottom();
	COM.login();
	COM.loginout();
	COM.regist();
	module.exports = COM;

});