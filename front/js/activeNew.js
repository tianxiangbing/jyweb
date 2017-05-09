/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-11-07
 * Time: 10:56:06
 * Contact: 55342775@qq.com
 */
define(function(require, exports, module) {
	var $ = require('$');
	var COM = require("common.js");
	var Handlebars = require("handlebars");
	var Calendar = require("calendar");
	var ACTIVE = {
		div: null,
		init: function() {
			var _this = this;
			COM.tabCallback.publishActive = function(div) {
				_this.div = div;
				COM.getTemp("publishActive", "active").done(function(temp) {
					var template = Handlebars.compile(temp);
					var html = template({});
					div.html(html);
					seajs.use(path + '/css/editor/jquery.wysiwyg.css');
					require.async('./editor/jquery.wysiwyg.js', function() {
						$('.editor').each(function() {
							$(this).wysiwyg({
								initialMinHeight: 300,
								initialContent: $(this).val(),
								autoGrow: true,
								controls: "bold,italic,|,undo,redo"
							});
						})
					});
					seajs.use("calendar.css", function() {
						var now = new Date()
						var t1 = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
						//var t2 = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
						var c1 = new Calendar({
							trigger: '.js-starttime',
							range: [t1, null],
							format: 'YYYY MM-DD HH:mm:ss'
						})
						var c2 = new Calendar({
							trigger: '.js-endtime',
							range: [null, null],
							format: 'YYYY MM-DD HH:mm:ss'
						})

						c1.on('selectDate', function(date) {
							c2.range([date, null]);
						});

						c2.on('selectDate', function(date) {
							c1.range([t1, date]);
						});
					});
					_this.bindSubmit();
				});
			}
		},
		bindSubmit: function() {
			var _this = this;
			$(".js-active-submit", _this.div).click(function() {
				// console.log('submit')
				var param = COM.serializeFormToObj(_this.div);
				COM.post("/service/active.asp?action=add", param, function(result) {
					// COM.activeInfo(result.id);
					COM.location("activeInfo",result.id);
				});
			});

		}
	};
	module.exports = ACTIVE;
});