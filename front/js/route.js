/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-11-14
 * Time: 10:28:56
 * Contact: 55342775@qq.com
 */
define(function(require, exports, module){
	var Route = {
		getParam:function(key,type){
			var type = type || "#";
			return param(key,type);
		}
	};
	//参数
	function param() {
	    var Url = top.location.href;
	    var u, g, StrBack = '';
	    if (arguments[arguments.length - 1] == "#")
	        u = Url.split("#");
	    else
	        u = Url.split("?");
	    if (u.length == 1) g = '';
	    else g = u[1];
	    if (g != '') {
	        gg = g.split("&");
	        var MaxI = gg.length;
	        str = arguments[0] + "=";
	        for (i = 0; i < MaxI; i++) {
	            if (gg[i].indexOf(str) == 0) {
	                StrBack = gg[i].replace(str, "");
	                break;
	            }
	        }
	    }
	    return StrBack;
	}
	module.exports = Route;
})