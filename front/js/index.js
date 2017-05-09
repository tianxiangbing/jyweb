/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-09-28
 * Time: 10:53:07
 * Contact: 55342775@qq.com
 */
define(function(require, exports, module) {
	var $ = require('$');
	var Handlebars = require("handlebars");

	var COM = require("common.js");
	COM.tabCallback.index = function() {
		COM.get("/service/news.asp", {
			action: "getType"
		}, function(result) {
			COM.getTemp("typeList", "news").done(function(temp) {
				var template = Handlebars.compile(temp);
				var html = template(result);
				$("#main").html(html);
			});
			/*
			for (var i = 0, l = result.data.length; i < l; i++) {
				var item = result.data[i];
				(function(i) {
					COM.get("/service/news.asp", {
						action: "GetTopNews",
						typename: item.typename
					}, function(result) {
						(function(i) {
							// console.log('a')
							COM.getTemp("topNews", "news").done(function(temp) {
								// console.log(result)
								var template = Handlebars.compile(temp);
								var html = template(result);
								var con = $(".newslist").eq(i);
								con.html(html);
								con.find("a").click(function() {
									var id = $(this).data('id');
									COM.newsInfo(id);
								});
							});
						})(i);
					});
				})(i);
			};
			*/
			COM.get("/service/news.asp",{action:"getnewslist"},function(result){
				COM.getTemp("topNews", "news").done(function(temp) {
					// console.log(result)
					var obj = {};
					for (var i = 0,l = result.data.length;i<l;i++){
						obj[result.data[i].typename]= obj[result.data[i].typename ]||[];
						obj[result.data[i].typename].push (result.data[i]);
					}
					$(".newslist").each(function(){
						var template = Handlebars.compile(temp);
						var html = template({data:obj[$(this).data("typename")]});
						var con = $(this);
						con.html(html);
						con.find("a").click(function() {
							var id = $(this).data('id');
							COM.location("newsInfo",id);
							// COM.newsInfo(id);
						});
					})
				});
			});
		},null,true);
		COM.get("/service/active.asp",{action:"getTop"},function(result){
			COM.getTemp("activeList", "active").done(function(temp) {
				var template = Handlebars.compile(temp);
				var html = template(result);
				$("#active").html(html);
				$("#active").find("a").click(function() {
					var id = $(this).data('id');
					// COM.activeInfo(id);
					COM.location("activeInfo",id);
				});
			});
		});
	};
	//COM.tabCallback.index();
});