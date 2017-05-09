/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-11-06
 * Time: 17:43:35
 * Contact: 55342775@qq.com
 */

define(function(require, exports, module) {
	var $ = require('$');
	var COM = require("common.js");
	var Handlebars = require("handlebars");
	var ACTIVE = {
		init: function(id) {
			var _this = this;
			_this.id = id;
			COM.tabCallback.activeInfo = function(div) {
				_this.div = div;
				COM.getTemp("activeInfo", "active").done(function(temp) {
					COM.get('/service/active.asp?action=info', {
						id: id
					}, function(result) {
						var template = Handlebars.compile(temp);
						var html = template(result);
						div.html(html);
						require.async('./comment.js', function(comment) {
							comment.init(id, div, 2);
						});
						_this.bindMember();
						_this.bindEvent();
					});
				});
			};
			_this.div = COM.addTab("#activeInfo", "活动详情", "activeInfo", "active");
			// COM.tabCallback.publishActive = function(div) {
			// 	_this.div = COM.addTab("#publishActive", "活动详情", "publishActive", "active");
			// };
		},
		bindMember: function() {
			var _this = this;
			COM.get('/service/active.asp?action=getMember', {
				id: _this.id
			}, function(result) {
				COM.getTemp('activeMember', 'active').done(function(temp) {
					var template = Handlebars.compile(temp);
					var html = template(result);
					_this.div.find('.activeMember').html(html);
					if (_this.div.find('.activeMember li[email="' + $.cookie('email') + '"]').size()) {
						// if ($(this).data('email') == $.cookie('email')) {
						$('.js-add-member').addClass('btnDisabled').val('已经参加');
						$('.js-del-member').show();
					} else {
						$('.js-add-member').removeClass('btnDisabled').val('我要参加');
						$('.js-del-member').hide();
						// }
					}
				});
			});
		},
		bindEvent: function() {
			var _this = this;
			_this.div.find('.js-add-member').click(function() {
				if (!$(this).hasClass('btnDisabled')) {
					COM.post("/service/active.asp?action=addMember", {
						id: _this.id
					}, function(result) {
						_this.bindMember();
					});
				}
			});
			_this.div.find('.js-del-member').click(function() {
				COM.post("/service/active.asp?action=delMember", {
					id: _this.id
				}, function(result) {
					_this.bindMember();
				});
			});
		}
	}
	module.exports = ACTIVE;
})